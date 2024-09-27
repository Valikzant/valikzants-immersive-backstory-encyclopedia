
document.addEventListener('DOMContentLoaded', function () {
  const expandableContent = document.querySelectorAll('.SECTION_CONTENT.EXPANDABLE');

  expandableContent.forEach(section => {
    section.addEventListener('click', function () {
      this.classList.toggle('EXPANDED');
    });
  });

  const logoSymbols = "☰ ☱ ☲ ☳ ☴ ☵ ☶ ☷".split(' ');
  const changingLetters = document.querySelectorAll('.LETTER_CHANGING');

  function updateSymbols() {
    changingLetters.forEach(element => {
      const randomSymbol = logoSymbols[Math.floor(Math.random() * logoSymbols.length)];
      element.textContent = randomSymbol;
    });
  }

  // Функция обновления символов

  setInterval(updateSymbols, 1000); // Обновляем символы каждую секунду

  // Начальное обновление символов

  updateSymbols();

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
    }, 50 * i);
  }
  if (localStorage.getItem('themeSaving')) {
    localStorage.setItem('theme', JSON.stringify(theme));
  }
}


function setThemeRapidly(theme) {
  const body = document.querySelector('body');
  const properties = ['--text', '--solid', '--main', '--second'];

  for (let i = 0; i < properties.length; i++) {
    body.style.setProperty(properties[i], theme[properties[i].substring(2)]);
  }

  if (localStorage.getItem('themeSaving')) {
    localStorage.setItem('theme', JSON.stringify(theme));
  }
}


window.onload = function () {

  document.getElementById("themeChooser").innerHTML = "";


  // Удаляем сохранённую тему для тех, у кого она была сохранена без функции

  if (!localStorage.getItem('themeSaving')) {
    localStorage.removeItem('theme');
  }


  // Добавляем переключатель сохранения темы

  const buttonNest = document.createElement("div");
  buttonNest.classList.add("SECTION_CONTENT");
  buttonNest.style.setProperty("justify-content", "center");
  buttonNest.style.setProperty("min-height", "95px");
  buttonNest.style.setProperty("margin", "0px 0px 10px 0px");
  buttonNest.innerHTML = "Переключение сохранения тем:";
  const saveButton = document.createElement("div");
  saveButton.classList.add("SECTION_BUTTON");
  if (localStorage.getItem('themeSaving')) {
    saveButton.innerHTML = "Сохранение тем включено";
  }
  else {
    saveButton.innerHTML = "Сохранение тем выключено";
  }
  saveButton.style.setProperty("justify-content", "center");
  saveButton.style.setProperty("self-align", "center");
  saveButton.onclick = function () {
    localStorage.removeItem('theme');
    console.info(localStorage.getItem('themeSaving'))
    if (localStorage.getItem('themeSaving')) {
      localStorage.removeItem('themeSaving');
      saveButton.innerHTML = "Сохраненная тема удалена";
    }
    else {
      localStorage.setItem('themeSaving', true);
      saveButton.innerHTML = "После выбора тема запомнится";
    }
  }
  buttonNest.appendChild(saveButton);
  document.getElementById("themeChooser").appendChild(buttonNest);


  // О сохранении тем

  const info = document.createElement("div");
  info.classList.add("SECTION_CONTENT");
  info.innerHTML = "Если сохранение тем включено, то они сохраняются в локальное хранилище браузера (при возможности). Сохранённые темы игнорируют тему по-умолчанию, которая задается автором страницы.";
  document.getElementById("themeChooser").appendChild(info);


  // Темы

  for (let i = 0; i < themes.length; i++) {
    const theme_button = document.createElement("div");
    theme_button.classList.add("CONTENT_THEME_PREVIEW");
    theme_button.style.setProperty("--preview-text", themes[i].text);
    theme_button.style.setProperty("--preview-solid", themes[i].solid);
    theme_button.style.setProperty("--preview-main", themes[i].main);
    theme_button.style.setProperty("--preview-second", themes[i].second);
    theme_button.innerHTML = themes[i].name;
    theme_button.onclick = function () {
      setTheme(themes[i]);
    }
    document.getElementById("themeChooser").appendChild(theme_button);
  }


  // Загружаем тему

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
  }, 200);
}


function toggleThemeChooser() {
  const themeChooser = document.getElementById("themeChooserWindow");
  themeChooser.classList.toggle('HIDDEN');
}