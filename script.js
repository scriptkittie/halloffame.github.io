document.querySelectorAll('.menu-item').forEach(item => {
    item.addEventListener('click', function() {
        const content = document.getElementById('content');
        const header = document.querySelector('.header h1');
        
        // Update the main content
        content.innerHTML = `<p>${this.getAttribute('data-content')}</p>`;
        
        // Update the header text
        header.textContent = this.textContent;
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