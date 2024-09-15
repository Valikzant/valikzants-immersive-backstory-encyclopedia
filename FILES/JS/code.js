
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
    /*fix for mobile browsers*/
    setTimeout(() => {
        section.scrollIntoView(true);
    }, 10);
    setTimeout(() => {
        window.scrollBy(0, -75);
    }, 10);
    
}

function setTheme(theme) {
    const body = document.querySelector('body');
    body.style.setProperty('--text', theme.text);
    body.style.setProperty('--solid', theme.solid);
    body.style.setProperty('--main', theme.main);
    body.style.setProperty('--second', theme.second);

    localStorage.setItem('theme', JSON.stringify(theme));
}

window.onload = function() { 
    document.getElementById("themeChooser").innerHTML = "";
    for (let i = 0; i < themes.length; i++) {
        const theme_button = document.createElement("div");
        theme_button.classList.add("CONTENT_THEME_PREVIEW");
        theme_button.style.setProperty("--preview-text", themes[i].text);
        theme_button.style.setProperty("--preview-solid", themes[i].solid);
        theme_button.style.setProperty("--preview-main", themes[i].main);
        theme_button.style.setProperty("--preview-second", themes[i].second);
        theme_button.innerHTML = themes[i].name;
        theme_button.onclick = function() {
            setTheme(themes[i]);
        }
        document.getElementById("themeChooser").appendChild(theme_button);
    }

    /*info section that themes saves across pages*/

    const info = document.createElement("div");
    info.classList.add("SECTION_CONTENT");
    info.innerHTML = "Темы сохраняются локально (если разрешено браузером), и загружаются на любой странице, даже если на ней не предусмотрены темы.";
    document.getElementById("themeChooser").appendChild(info);
    
    const close_button = document.createElement("div");
    close_button.classList.add("SECTION_BUTTON");
    close_button.innerHTML = "Закрыть";
    close_button.onclick = function() {
        toggleThemeChooser();
    }
    document.getElementById("themeChooser").appendChild(close_button);

    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        setTheme(JSON.parse(savedTheme));
    }
    else {
        setTheme(themes[0]);
    }
}

/* theme chooser opener */
function toggleThemeChooser() {
    const themeChooser = document.getElementById("themeChooserWindow");
    themeChooser.classList.toggle('HIDDEN');
}