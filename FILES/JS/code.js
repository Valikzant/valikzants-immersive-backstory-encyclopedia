
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
    setTimeout(() => {
        section.scrollIntoView({ behavior: 'auto', block: 'start', inline: 'nearest' });
        if (sectionId.startsWith('story_')) {
            setTimeout(() => {
                window.scrollBy(0, -150);
            }, 100);
        }
    }, 100);
}

function setTheme(theme) {
    const body = document.querySelector('body');
    const properties = ['--text', '--solid', '--main', '--second'];

    for (let i = 0; i < properties.length; i++) {
        const transition = `all 0.5s ease`;
        body.style.setProperty(`transition`, transition);
        setTimeout(() => {
            body.style.setProperty(properties[i], theme[properties[i].substring(2)]);
        } , 50 * i);   
    }

    localStorage.setItem('theme', JSON.stringify(theme));
}

function setThemeRapidly(theme) {
    const body = document.querySelector('body');
    const properties = ['--text', '--solid', '--main', '--second'];

    for (let i = 0; i < properties.length; i++) {
        body.style.setProperty(properties[i], theme[properties[i].substring(2)]);
    }

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
        setThemeRapidly(JSON.parse(savedTheme));
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