
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


    // Темы

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


    // О сохранении тем

    const info = document.createElement("div");
    info.classList.add("SECTION_CONTENT");
    info.innerHTML = "Темы сохраняются локально (если разрешено браузером), и загружаются на любой странице, даже если на ней не предусмотрены темы.";
    document.getElementById("themeChooser").appendChild(info);

    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        setThemeRapidly(JSON.parse(savedTheme));
    }
    else {
        setTheme(themes[0]);
    }


    // Постепенно убираем подсказки

    const hints = document.querySelectorAll('.SECTION_HINT');

    hints.forEach(hint => {
        hint.style.opacity = 0;
    });


    // А также закрываем экран загрузки

    const loadingScreen = document.getElementById("loadingScreen");

    setTimeout(() => {
        loadingScreen.style.opacity = 0;
    }, 150);
}


function toggleThemeChooser() {
    const themeChooser = document.getElementById("themeChooserWindow");
    themeChooser.classList.toggle('HIDDEN');
}