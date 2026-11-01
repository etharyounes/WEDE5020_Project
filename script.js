document.addEventListener('DOMContentLoaded', () => {
    // --- 1. Lightbox Gallery Functionality ---
    const galleryImages = document.querySelectorAll('.gallery-img');
    if (galleryImages.length > 0) {
        const lightbox = document.createElement('div');
        lightbox.id = 'lightbox';
        lightbox.style.cssText = 'display:none; position:fixed; z-index:1000; top:0; left:0; width:100%; height:100%; background:rgba(0,0,0,0.8); text-align:center; justify-content:center; align-items:center;';
        
        const lightboxImg = document.createElement('img');
        lightboxImg.style.cssText = 'max-width:90%; max-height:80%; border-radius:8px;';
        lightbox.appendChild(lightboxImg);
        document.body.appendChild(lightbox);

        galleryImages.forEach(img => {
            img.style.cursor = 'pointer';
            img.addEventListener('click', () => {
                lightbox.style.display = 'flex';
                lightboxImg.src = img.src;
            });
        });

        lightbox.addEventListener('click', () => {
            lightbox.style.display = 'none';
        });
    }

    // --- 2. Dynamic Search Functionality ---
    const searchInput = document.getElementById('searchInput');
    const searchItems = document.querySelectorAll('.search-item');
    if (searchInput && searchItems.length > 0) {
        searchInput.addEventListener('input', (e) => {
            const term = e.target.value.toLowerCase();
            searchItems.forEach(item => {
                const text = item.textContent.toLowerCase();
                if (text.includes(term)) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    }

    // --- 3. Enquiry Form Validation & Processing ---
    const enquiryForm = document.getElementById('enquiryForm');
    if (enquiryForm) {
        enquiryForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('enqName').value.trim();
            const email = document.getElementById('enqEmail').value.trim();
            const service = document.getElementById('enqService').value;
            const responseDiv = document.getElementById('enqResponse');

            if (!name || !email || !service) {
                showError(responseDiv, 'Please fill in all required fields.');
                return;
            }

            if (!validateEmail(email)) {
                showError(responseDiv, 'Please enter a valid email address.');
                return;
            }

            let costMessage = 'Estimated cost for ' + service + ': Free community access or standard sponsorship rates apply.';
            responseDiv.style.color = 'green';
            responseDiv.textContent = 'Thank you, ' + name + '! Your enquiry has been processed successfully. ' + costMessage;
            enquiryForm.reset();
        });
    }

    // --- 4. Contact Form Validation & Email Simulation ---
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('contactName').value.trim();
            const email = document.getElementById('contactEmail').value.trim();
            const message = document.getElementById('contactMessage').value.trim();
            const responseDiv = document.getElementById('contactResponse');

            if (!name || !email || !message) {
                showError(responseDiv, 'All fields are mandatory for sending a message.');
                return;
            }

            if (!validateEmail(email)) {
                showError(responseDiv, 'Invalid email format.');
                return;
            }

            const recipient = 'info@greensprout.org';
            const subject = encodeURIComponent('Contact Message from ' + name);
            const body = encodeURIComponent(message + '\n\nSender Email: ' + email);
            
            responseDiv.style.color = 'green';
            responseDiv.textContent = 'Validation successful! Opening your email client to send the message...';
            
            setTimeout(() => {
                window.location.href = `mailto:${recipient}?subject=${subject}&body=${body}`;
            }, 1500);
        });
    }

    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    function showError(element, msg) {
        if (element) {
            element.style.color = 'red';
            element.textContent = msg;
        }
    }
});