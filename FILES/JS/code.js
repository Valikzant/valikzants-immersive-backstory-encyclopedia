document.addEventListener('DOMContentLoaded', function() {
    const expandableSections = document.querySelectorAll('.BODY_SECTION.EXPANDABLE');
    
    expandableSections.forEach(section => {
        section.addEventListener('click', function() {
            this.classList.toggle('EXPANDED');
        });
    });
});