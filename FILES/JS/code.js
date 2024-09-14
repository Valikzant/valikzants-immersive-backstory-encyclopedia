
document.addEventListener('DOMContentLoaded', function() {
    const expandableContent = document.querySelectorAll('.SECTION_CONTENT.EXPANDABLE');

    expandableContent.forEach(section => {
        section.addEventListener('click', function() {
            this.classList.toggle('EXPANDED');
        });
    });
});

function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    section.scrollIntoView({ behavior: 'smooth' });
    window.scrollBy(0, -75);
}