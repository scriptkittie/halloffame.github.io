document.querySelectorAll('.menu-item').forEach(item => {
    item.addEventListener('click', function() {
        const content = document.getElementById('content');
        const header = document.querySelector('.header h1');
        
        // Update the main content
        content.innerHTML = this.getAttribute('data-content');
        
        // Update the header text
        header.textContent = this.textContent;

        // Check if the new content includes the contact form
        const contactForm = document.getElementById('contact-form');
        if (contactForm) {
            addFormSubmissionHandler();
        }

        // Update the URL hash
        const id = this.id || '';
        if (id) {
            window.location.hash = id;
        }
    });

    item.addEventListener('mouseover', function() {
        const blurb = document.getElementById('blurb');
        blurb.style.display = 'block';
        blurb.textContent = this.getAttribute('data-content');
        blurb.style.left = this.getBoundingClientRect().right + 'px';
        blurb.style.top = this.getBoundingClientRect().top + 'px';
    });

    item.addEventListener('mouseout', function() {
        document.getElementById('blurb').style.display = 'none';
    });
});

function addFormSubmissionHandler() {
    const form = document.getElementById('contact-form');
    const responseMessage = document.getElementById('response-message');

    form.addEventListener('submit', function(event) {
        event.preventDefault();

        const formData = new FormData(form);

        fetch('send_email.php', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                responseMessage.textContent = 'Message sent successfully!';
                responseMessage.classList.add('success');
                responseMessage.classList.remove('error');
            } else {
                responseMessage.textContent = 'Failed to send message. Please try again.';
                responseMessage.classList.add('error');
                responseMessage.classList.remove('success');
            }
            responseMessage.style.display = 'block';
        })
        .catch(error => {
            responseMessage.textContent = 'An error occurred. Please try again.';
            responseMessage.classList.add('error');
            responseMessage.classList.remove('success');
            responseMessage.style.display = 'block';
        });
    });
}

// Check if the contact form is initially present on the page load
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        addFormSubmissionHandler();
    }
});

// Smooth transition for character images
document.querySelectorAll('.character a').forEach(link => {
    link.addEventListener('click', function(event) {
        event.preventDefault();
        const href = this.getAttribute('href');
        document.body.classList.add('fade-out');
        setTimeout(() => {
            window.location.href = href;
        }, 1000); // Increased duration to make it more noticeable
    });
});

document.addEventListener('DOMContentLoaded', () => {
    document.body.classList.add('fade-in');

    // Handle URL hash on page load
    const hash = window.location.hash.substring(1);
    if (hash) {
        const menuItem = document.getElementById(hash);
        if (menuItem) {
            menuItem.click();
        }
    }
});
