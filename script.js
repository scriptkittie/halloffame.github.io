document.addEventListener("DOMContentLoaded", function() {
    // Load content based on the URL hash if present
    if (window.location.hash) {
        const target = window.location.hash.substring(1);
        const menuItem = document.getElementById(target);
        if (menuItem) {
            loadContent(menuItem.getAttribute('data-content'));
            document.getElementById('content').scrollIntoView();
        }
    }
    
    // Event listener for menu items
    document.querySelectorAll('.menu-item').forEach(item => {
        item.addEventListener('click', function() {
            const content = document.getElementById('content');
            const header = document.querySelector('.header h1');
            
            // Check if the item clicked is the characters menu item
            if (this.id === 'menu-item-characters') {
                goToCharacters();
            } else {
                // Update the main content
                loadContent(this.getAttribute('data-content'));
            }

            // Update the header text
            header.textContent = this.textContent;

            // Check if the new content includes the contact form
            const contactForm = document.getElementById('contact-form');
            if (contactForm) {
                addFormSubmissionHandler();
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

    // Check if the contact form is initially present on the page load
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        addFormSubmissionHandler();
    }
});

function goToCharacters() {
    window.location.href = 'index.html#menu-item-characters';
}

function loadContent(content) {
    document.getElementById('content').innerHTML = content;
}

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
});
