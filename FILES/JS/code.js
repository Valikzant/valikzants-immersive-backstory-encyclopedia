
//TODO Надо сделать автоматическую генерацию кнопок цветов, которые будут браться с html-файла автора страницы.

// Списки

// Оттенки получат цвета при подключении скрипта
var _L_HUES = []

// Темые получат цвета при подключении скрипта
var _L_THEMES = []

const _C_FONT_MODIFIERS = [
  {"font-modifier": 0.8}, 
  {"font-modifier": 1}, 
  {"font-modifier": 1.2}, 
  {"font-modifier": 1.4}
];

const _C_INTERFACE_MODIFIERS = [
  {"interface-modifier": 0.4}, 
  {"interface-modifier": 0.5}, 
  {"interface-modifier": 0.7}, 
  {"interface-modifier": 0.85}
];

// Инициализация
document.addEventListener('DOMContentLoaded', function () {

  const _C_SYMBOLS = "☰ ☱ ☲ ☳ ☴ ☵ ☶ ☷".split(' ');
  const _C_CHANGING = document.querySelectorAll('[id="LOGO_CHANGING_PART"]');

  // Функция обновления символов
  function _F_UPDATE_LOGO() {
    _C_CHANGING.forEach(_I_ELEMENT => {
      const _C_RANDOM_SYMBOL = _C_SYMBOLS[Math.floor(Math.random() * _C_SYMBOLS.length)];
      _I_ELEMENT.textContent = _C_RANDOM_SYMBOL;
    });
  }
  setInterval(_F_UPDATE_LOGO, 1000); 
  _F_UPDATE_LOGO();

  // Кастомизация

  // Ставим при загрузке страницы значения в еще несуществующие переменные в памяти браузера

  if (localStorage.getItem("customization-saved") == null) {
    localStorage.setItem("customization-saved", "true");
  }
  if (localStorage.getItem("animations") == null) {
    localStorage.setItem("animations", "true");
  }
  if (localStorage.getItem("hints") == null) {
    localStorage.setItem("hints", "true");
  }
  if (localStorage.getItem("font-modifier") == null) {
    localStorage.setItem("font-modifier", 1);
  }
  if (localStorage.getItem("interface-modifier") == null) {
    localStorage.setItem("interface-modifier", 1);
  }

  // Если сохранение тем есть, то загружаем, если нет - удаляем сохранения
  if (localStorage.getItem("customization-saved") == "true") {
    // Загрузка темы, если есть.
    if (localStorage.getItem("theme") != null) {
      _F_LOAD_THEME(JSON.parse(localStorage.getItem("theme")));
    }

    // Загрузка оттенка, если есть.
    if (localStorage.getItem("hue") != null) {
      _F_LOAD_HUE(JSON.parse(localStorage.getItem("hue")));
    }
  } else {
    localStorage.removeItem("theme");
    localStorage.removeItem("hue");
  }

  // Загрузка размера шрифта, если есть.
  if (localStorage.getItem("font-modifier") != null) {
    _F_CHANGE_FONT_MODIFIER(localStorage.getItem("font-modifier"));
  }

  // Загрузка размера интерфейса, если есть.
  if (localStorage.getItem("interface-modifier") != null) {
    _F_CHANGE_INTERFACE_MODIFIER(localStorage.getItem("interface-modifier"));
  }

  // Загрузка сохранения кастомизации, если есть.
  if (localStorage.getItem("customization-saved") != null) {
    _F_LOAD_CUSTOMIZATION_SAVING(localStorage.getItem("customization-saved"));
  }

  // Загрузка сохранения анимации, если есть.
  if (localStorage.getItem("animations") != null) {
    _F_LOAD_ANIMATIONS(localStorage.getItem("animations"));
  }

  // Загрузка сохранения подсказок, если есть.
  if (localStorage.getItem("hints") != null) {
    _F_LOAD_HINTS(localStorage.getItem("hints"));
  }

  // Завершение загрузки
  setTimeout(function () {
    const _C_LOADING_SCREEN = document.getElementById("LOADING_SCREEN");
    _C_LOADING_SCREEN.style.setProperty("opacity", "0");
  }, 150);
  setTimeout(function () {
    const _C_HINTS = document.querySelectorAll(".HINT");
    _C_HINTS.forEach(_I_HINT => {
      _I_HINT.style.setProperty("opacity", "0");
    });
  }, 1700);


});

// ONLOAD FUNCTIONS

// Генерация цветов кнопок

// Смена цвета кнопок оттенка
function _F_GENERATE_HUE_BUTTONS(_C_HUES) {
  // Записываем в переменную оттенков цвета с сайта, которые передались по функции.
  _L_HUES = _C_HUES;

  // Находим блок с оттенками для последующей записи цветов
  const _C_HUE_CHOOSER = document.getElementById("HUE_CHOOSERS");
  const _C_HUE_CHOOSERS = _C_HUE_CHOOSER.querySelectorAll(".BUTTON");

  // Записываем цвета в кнопки
  _C_HUE_CHOOSERS.forEach(function(_I_HUE_CHOOSER, _I_) {
    _I_HUE_CHOOSER.style.setProperty("background-color", 'rgb(' + _C_HUES[_I_]["main"] + ')');
    _I_ += 1;
  })

  // Если у пользователя отключено сохранение кастомизации, то загружаем первый оттенок из списка
  if (localStorage.getItem("customization-saved") == 'false' || localStorage.getItem("hue") == null) {

    _F_SHIFT_HUE(0);

  }
}

// Смена цвета кнопок фона
function _F_GENERATE_THEME_BUTTONS(_C_THEMES) {
  // Записываем в переменную тем цвета, которые передались по функции.
  _L_THEMES = _C_THEMES;

  // Настрой блок с темами для последующей записи цветов
  const _C_THEME_CHOOSER = document.getElementById("THEME_CHOOSERS");
  const _C_THEME_CHOOSERS = _C_THEME_CHOOSER.querySelectorAll(".BUTTON");

  // Записываем цвета в кнопки
  _C_THEME_CHOOSERS.forEach(function(_I_THEME_CHOOSER, _I_) {
    _I_THEME_CHOOSER.style.setProperty("background-color", 'rgb(' + _C_THEMES[_I_]["solid"] + ')');
    _I_ += 1;
  })

  // Если у пользователя отключено сохранение кастомизации, то загружаем первую тему из списка
  if (localStorage.getItem("customization-saved") == 'false' || localStorage.getItem("theme") == null) {

    _F_SWITCH_THEME(0);
    
  }
}

// Загрузка оттенка
function _F_LOAD_HUE(_L_HUES) {

  // Находим тело с переменными
  const _C_BODY = document.getElementById("body");

  // Смена оттенка
  _C_BODY.style.setProperty("--main", _L_HUES["main"]);
}

// Загрузка темы
function _F_LOAD_THEME(_L_THEMES) {

  // Находим тело с переменными
  const _C_BODY = document.getElementById("body");

  // Смена темы
  _C_BODY.style.setProperty("--solid", _L_THEMES["solid"]);
  _C_BODY.style.setProperty("--light-shadow", _L_THEMES["light-shadow"]);
  _C_BODY.style.setProperty("--dark-shadow", _L_THEMES["dark-shadow"]);
  _C_BODY.style.setProperty("--text", _L_THEMES["text"]);
}

// Загрузка сохранения кастомизации
function _F_LOAD_CUSTOMIZATION_SAVING(_C_MODE) {
  _F_SWITCH_CUSTOMIZATION_SAVING(_C_MODE);
}

// Загрузка сохранения анимации
function _F_LOAD_ANIMATIONS(_C_MODE) {
  _F_SWITCH_ANIMATIONS(_C_MODE);
}

// Загрузка сохранения подсказок
function _F_LOAD_HINTS(_C_MODE) {
  _F_SWITCH_HINTS(_C_MODE);
}

// ON EVENTS FUNCTIONS

// Подсказки
document.addEventListener("DOMContentLoaded", function() {

  const _C_HELP_BUTTONS = document.querySelectorAll(".BUTTON_HELP , .BUTTON.SIDEBAR");
  const _C_HELP_HINTS = document.querySelectorAll(".HINT");
  const _C_TOOLTIP = document.getElementById("TOOLTIP_HELP");

  if (localStorage.getItem("hints") == "false") {
    _C_HELP_BUTTONS.forEach(_I_BUTTON => {
      _I_BUTTON.style.display = "none";
    });
    _C_HELP_HINTS.forEach(_I_HINT => {
      _I_HINT.style.display = "none";
    });
    return;
  }

  _C_HELP_BUTTONS.forEach(_I_BUTTON => {
    _I_BUTTON.addEventListener("mouseenter", function(event) {
      const _C_VIEWPORT_WIDTH = window.innerWidth;
      const _C_VIEWPORT_HEIGHT = window.innerHeight;
      const _C_MOUSE_X = event.clientX;
      const _C_MOUSE_Y = event.clientY;

      // Получаем текст подсказки
      const _C_HELP_TEXT = _I_BUTTON.getAttribute("data-tooltip");
      _C_TOOLTIP.innerHTML = "<p>" + _C_HELP_TEXT + "</p>";

      // Определяем расстояние от курсора до правого края экрана
      const _C_SPACE_ON_RIGHT = _C_VIEWPORT_WIDTH - _C_MOUSE_X;
      const _C_SPACE_ON_LEFT = _C_MOUSE_X;
      const _C_SPACE_ON_BOTTOM = _C_VIEWPORT_HEIGHT - _C_MOUSE_Y;
      const _C_SPACE_ON_TOP = _C_MOUSE_Y;
      let _V_TOOLTIP_X = _C_MOUSE_X;
      let _V_TOOLTIP_Y = _C_MOUSE_Y;
      
      // Определяем позицию подсказки по X и Y
      if (_C_SPACE_ON_BOTTOM < _C_SPACE_ON_TOP) {
        _V_TOOLTIP_Y = _C_MOUSE_Y - 100;
      } else {
        _V_TOOLTIP_Y = _C_MOUSE_Y;
      }

      if (_C_SPACE_ON_RIGHT < _C_SPACE_ON_LEFT) {
        _V_TOOLTIP_X = _C_MOUSE_X - 150;
      } else {
        _V_TOOLTIP_X = _C_MOUSE_X;
      }

      // Показываем подсказку в позиции курсора
      _C_TOOLTIP.style.left = `${_V_TOOLTIP_X}px`;
      _C_TOOLTIP.style.top = `${_V_TOOLTIP_Y}px`;
      _C_TOOLTIP.style.display = "block";
    });

    _I_BUTTON.addEventListener("mouseleave", function() {
      _C_TOOLTIP.style.display = "none";
    });
  });
});

// Проверка минимально или максимально доступного шрифта/размера интерфейса при изменении размеров экрана
window.addEventListener('resize', _F_FIX_MODIFIERS);
window.addEventListener('DOMContentLoaded', _F_FIX_MODIFIERS); 
window.addEventListener('click', _F_FIX_MODIFIERS);
  
function _F_FIX_MODIFIERS () {
  _F_CHANGE_FONT_MODIFIER(localStorage.getItem("font-modifier"));
  _F_CHANGE_INTERFACE_MODIFIER(localStorage.getItem("interface-modifier"));

  // 768px - максимально доступный шрифт 2 минимально доступный интерфейс 1 
  // 600px - максимально доступный шрифт 2 минимально доступный интерфейс 2 
  // 480px - максимально доступный шрифт 2 минимально доступный интерфейс 2
  // 360px - максимально доступный шрифт 2 минимально доступный интерфейс 2


  // Блокируем кнопки, если пользователь выбирает несочетаемые настройки

  // Переключение размеров шрифта и интерфейса в зависимости от размера экрана

  if (window.innerWidth >= 768) {

    _F_ENABLE_ELEMENT("FONT_SIZE_CHOOSER_HUGE");
    _F_ENABLE_ELEMENT("INTERFACE_SIZE_CHOOSER_SMALL");
    _F_ENABLE_ELEMENT("INTERFACE_SIZE_CHOOSER_MEDIUM");

  }

  if (window.innerWidth < 768 && window.innerWidth >= 600) { // 768

    if (localStorage.getItem("interface-modifier") == 0) {
      _F_CHANGE_INTERFACE_MODIFIER(1);
    }

    _F_DISABLE_ELEMENT("INTERFACE_SIZE_CHOOSER_SMALL");

    _F_ENABLE_ELEMENT("FONT_SIZE_CHOOSER_HUGE");
    _F_ENABLE_ELEMENT("INTERFACE_SIZE_CHOOSER_MEDIUM");

  } else if (window.innerWidth < 600 && window.innerWidth > 0) { // 600

    if (localStorage.getItem("font-modifier") == 3) {
      _F_CHANGE_FONT_MODIFIER(2);
    }
    if (localStorage.getItem("interface-modifier") == 1) {
      _F_CHANGE_INTERFACE_MODIFIER(2);
    }

    _F_DISABLE_ELEMENT("FONT_SIZE_CHOOSER_HUGE");
    _F_DISABLE_ELEMENT("INTERFACE_SIZE_CHOOSER_SMALL");
    _F_DISABLE_ELEMENT("INTERFACE_SIZE_CHOOSER_MEDIUM");

  } 

}

// Изменение расположения элементов между режимами десктопа и мобильного

window.addEventListener('resize', _F_CHANGE_LAYOUT);
window.addEventListener('DOMContentLoaded', _F_CHANGE_LAYOUT); 

function _F_CHANGE_LAYOUT(_C_FORCE = null) {
  
  // Находим тело с переменными
  const _C_BODY = document.getElementById("body");

  // Берём Сайдбар
  const _C_SIDEBAR = document.getElementById("SIDEBAR");

  // Смена расположения
  if (_C_FORCE == "desktop") {
    _C_BODY.style.setProperty("grid-template-rows", "auto 1fr auto");
    _C_BODY.style.setProperty("grid-template-areas", '"H H" "S C" "S С"');
    _F_ENABLE_BUTTON("LAYOUT_CHOOSER_DESKTOP");
    _F_DISABLE_BUTTON("LAYOUT_CHOOSER_MOBILE");
    _C_SIDEBAR.style.setProperty("flex-direction", "column");
  } else if (_C_FORCE == "mobile") {
    _C_BODY.style.setProperty("grid-template-rows", "auto auto 1fr auto");
    _C_BODY.style.setProperty("grid-template-areas", '"H H" "С С" "C C" "S S"');
    _F_ENABLE_BUTTON("LAYOUT_CHOOSER_MOBILE");
    _F_DISABLE_BUTTON("LAYOUT_CHOOSER_DESKTOP");
    _C_SIDEBAR.style.setProperty("flex-direction", "row");
  } else {
    _F_DISABLE_BUTTON("LAYOUT_CHOOSER_DESKTOP");
    _F_DISABLE_BUTTON("LAYOUT_CHOOSER_MOBILE");
    if (window.innerWidth >= 768) {
      _C_BODY.style.setProperty("grid-template-rows", "auto 1fr auto");
      _C_BODY.style.setProperty("grid-template-areas", '"H H" "S C" "S С"');
      _C_SIDEBAR.style.setProperty("flex-direction", "column");
    } else {
      _C_BODY.style.setProperty("grid-template-rows", "auto auto 1fr auto");
      _C_BODY.style.setProperty("grid-template-areas", '"H H" "С С" "C C" "S S"');
      _C_SIDEBAR.style.setProperty("flex-direction", "row");
    }
  }
}

// FUNCTIONS

// Взаимодействие с элементами

// Выключение элемента
function _F_DISABLE_ELEMENT(_C_ELEMENT_ID) {
  document.getElementById(_C_ELEMENT_ID).setAttribute("disabled", "");
}

// Включение элемента
function _F_ENABLE_ELEMENT(_C_ELEMENT_ID) {
  document.getElementById(_C_ELEMENT_ID).removeAttribute("disabled");
}

// Активация кнопки
function _F_ENABLE_BUTTON(_C_BUTTON_ID) {
  document.getElementById(_C_BUTTON_ID).classList.add("ACTIVE");
}

// Деактивация кнопки
function _F_DISABLE_BUTTON(_C_BUTTON_ID) {
  document.getElementById(_C_BUTTON_ID).classList.remove("ACTIVE");
}

// Расширение элемента
function _F_EXPAND_ELEMENT(_C_ELEMENT_ID) {
  document.getElementById(_C_ELEMENT_ID).classList.toggle("EXPANDED");
}

// Скролл к элементу
function _F_SCROLL_TO_ELEMENT(_C_ELEMENT_ID) {
  const _C_CONTENT = document.getElementById("CONTENT");
  const _C_ELEMENT = document.getElementById(_C_ELEMENT_ID)
  setTimeout(() => {
    _C_ELEMENT.scrollIntoView({ behavior: 'auto', block: 'start', inline: 'nearest' });
    setTimeout(() => {
      _C_CONTENT.scrollBy(0, -18);
    }, 100);
  }, 100);
}

// Кастомизация

// Смещение оттенка
function _F_SHIFT_HUE(_V_HUE) {

  // Находим тело с переменными
  const _C_BODY = document.getElementById("body");

  // Смена оттенка
  _C_BODY.style.setProperty("--main", _L_HUES[_V_HUE]["main"]);

  // Сохраняем выбранный оттенок
  localStorage.setItem("hue", JSON.stringify(_L_HUES[_V_HUE]));
}


// Переключение тем
function _F_SWITCH_THEME(_V_THEME) {

  // Находим тело с переменными
  const _C_BODY = document.getElementById("body");

  // Смена темы
  _C_BODY.style.setProperty("--solid", _L_THEMES[_V_THEME]["solid"]);
  _C_BODY.style.setProperty("--light-shadow", _L_THEMES[_V_THEME]["light-shadow"]);
  _C_BODY.style.setProperty("--dark-shadow", _L_THEMES[_V_THEME]["dark-shadow"]);
  _C_BODY.style.setProperty("--text", _L_THEMES[_V_THEME]["text"]);

  // Сохраняем выбранную тему
  localStorage.setItem("theme", JSON.stringify(_L_THEMES[_V_THEME]));
}


// Модификатор размера шрифта
function _F_CHANGE_FONT_MODIFIER(_V_FONT_MODIFIER) {

  // Находим тело с переменными
  const _C_BODY = document.getElementById("body");

  // Смена размера шрифта
  _C_BODY.style.setProperty("--font-modifier", _C_FONT_MODIFIERS[_V_FONT_MODIFIER]["font-modifier"]);

  // Сохраняем выбранный размер шрифта
  localStorage.setItem("font-modifier", _V_FONT_MODIFIER);

  // В зависимости от порядка модификатора (0, 1, 2, 3) добавляем кнопке шрифта класс SPECIAL, чтобы отображать какая выбрана
  const _C_FONT_SIZE_CHOOSER = document.getElementById("FONT_SIZE_CHOOSERS");
  const _C_FONT_SIZE_CHOOSERS = _C_FONT_SIZE_CHOOSER.querySelectorAll(".BUTTON");
  _C_FONT_SIZE_CHOOSERS.forEach(_I_FONT_SIZE_CHOOSER => {
    _I_FONT_SIZE_CHOOSER.classList.remove("ACTIVE");
  });
  _C_FONT_SIZE_CHOOSERS[_V_FONT_MODIFIER].classList.add("ACTIVE");
}


// Модификатор размера интерфейса
function _F_CHANGE_INTERFACE_MODIFIER(_V_INTERFACE_MODIFIER) {

  // Находим тело с переменными
  const _C_BODY = document.getElementById("body");

  // Смена размера интерфейса
  _C_BODY.style.setProperty("--interface-modifier", _C_INTERFACE_MODIFIERS[_V_INTERFACE_MODIFIER]["interface-modifier"]);

  // Сохраняем выбранный размер интерфейса
  localStorage.setItem("interface-modifier", _V_INTERFACE_MODIFIER);

  // В зависимости от порядка модификатора (0, 1, 2, 3) добавляем кнопке интерфейса класс SPECIAL, чтобы отображать какая выбрана
  const _C_INTERFACE_SIZE_CHOOSER = document.getElementById("INTERFACE_SIZE_CHOOSERS");
  const _C_INTERFACE_SIZE_CHOOSERS = _C_INTERFACE_SIZE_CHOOSER.querySelectorAll(".BUTTON");
  _C_INTERFACE_SIZE_CHOOSERS.forEach(_I_INTERFACE_SIZE_CHOOSER => {
    _I_INTERFACE_SIZE_CHOOSER.classList.remove("ACTIVE");
  });
  _C_INTERFACE_SIZE_CHOOSERS[_V_INTERFACE_MODIFIER].classList.add("ACTIVE");
}


// Настройки

// Включение/Отключение сохранения кастомизации
function _F_SWITCH_CUSTOMIZATION_SAVING(_C_MODE) {

  // Сохраняем кастомизацию и показываем активированную кнопку.
  if (_C_MODE == "false") {
    localStorage.setItem("customization-saved", "false");
    _F_ENABLE_BUTTON("CUSTOMIZATION_SAVING_CHOOSER_OFF")
    _F_DISABLE_BUTTON("CUSTOMIZATION_SAVING_CHOOSER_ON")
  } else if (_C_MODE == "true") {
    localStorage.setItem("customization-saved", "true");
    _F_ENABLE_BUTTON("CUSTOMIZATION_SAVING_CHOOSER_ON")
    _F_DISABLE_BUTTON("CUSTOMIZATION_SAVING_CHOOSER_OFF")
  }
}

// Включение/Отключение анимаций
function _F_SWITCH_ANIMATIONS(_C_MODE) {

  // Находим тело с переменными
  const _C_BODY = document.getElementById("body");

  // Сохраняем анимацию и показываем активированную кнопку.
  if (_C_MODE == "false") {
    _C_BODY.style.setProperty("--transition-fast", 'none');
    _C_BODY.style.setProperty("--transition-slow", 'none');
    _C_BODY.style.setProperty("--transition-long", 'none');
    localStorage.setItem("animations", "false");
    _F_ENABLE_BUTTON("ANIMATION_TOGGLE_CHOOSER_OFF")
    _F_DISABLE_BUTTON("ANIMATION_TOGGLE_CHOOSER_ON")
  } else if (_C_MODE == "true") {
    _C_BODY.style.setProperty("--transition-fast", '0.5s cubic-bezier(0.165, 0.84, 0.44, 1)');
    _C_BODY.style.setProperty("--transition-slow", '2s cubic-bezier(.11,.86,.59,.97)');
    _C_BODY.style.setProperty("--transition-long", '10s cubic-bezier(.32,.17,.5,1.07)');
    localStorage.setItem("animations", "true");
    _F_ENABLE_BUTTON("ANIMATION_TOGGLE_CHOOSER_ON")
    _F_DISABLE_BUTTON("ANIMATION_TOGGLE_CHOOSER_OFF")
  }
}

// Включение/Отключение подсказок
function _F_SWITCH_HINTS(_C_MODE) {
  
  // Сохраняем подсказки и показываем активированную кнопку.
  if (_C_MODE == "false") {
    localStorage.setItem("hints", "false");
    _F_ENABLE_BUTTON("HINT_TOGGLE_CHOOSER_OFF")
    _F_DISABLE_BUTTON("HINT_TOGGLE_CHOOSER_ON")
  } else if (_C_MODE == "true") {
    localStorage.setItem("hints", "true");
    _F_ENABLE_BUTTON("HINT_TOGGLE_CHOOSER_ON")
    _F_DISABLE_BUTTON("HINT_TOGGLE_CHOOSER_OFF")
  }
}

// AUTHOR
function _F_TOGGLE_AUTHOR() {

  // Показываем блок автора
  const _C_AUTHOR = document.getElementById("AUTHOR");
  _C_AUTHOR.classList.toggle('HIDDEN');

  // Прячем другие блоки, если есть
  const _C_BLOCKS = document.querySelectorAll('.BLOCK');
  _C_BLOCKS.forEach(_I_BLOCK => {
    if (_I_BLOCK.id == "CONTENT" || _I_BLOCK.id == "THEMES" || _I_BLOCK.id == "SETTINGS") {
      if (!_I_BLOCK.classList.contains('HIDDEN')) {
        _I_BLOCK.classList.toggle('HIDDEN');
      }
    }

    // Не даём скрыть самого автора, если остальные блоки тоже скрыты
    if (_I_BLOCK.id == "AUTHOR") {
      if (_I_BLOCK.classList.contains('HIDDEN')) {
        _I_BLOCK.classList.toggle('HIDDEN');
      }
    }
  });
}


// CONTENT
function _F_TOGGLE_CONTENT() {

  // Показываем блок контента
  const _C_CONTENT = document.getElementById("CONTENT");
  _C_CONTENT.classList.toggle('HIDDEN');

  // Прячем другие блоки, если есть
  const _C_BLOCKS = document.querySelectorAll('.BLOCK');
  _C_BLOCKS.forEach(_I_BLOCK => {
    if (_I_BLOCK.id == "THEMES" || _I_BLOCK.id == "SETTINGS" || _I_BLOCK.id == "AUTHOR") {
      if (!_I_BLOCK.classList.contains('HIDDEN')) {
        _I_BLOCK.classList.toggle('HIDDEN');
      }
    }

    // Не даём скрыть сам контент, если остальные блоки тоже скрыты
    if (_I_BLOCK.id == "CONTENT") {
      if (_I_BLOCK.classList.contains('HIDDEN')) {
        _I_BLOCK.classList.toggle('HIDDEN');
      }
    }
  });
}


// THEMES
function _F_TOGGLE_THEMES() {

  // Показываем блок тем
  const _C_THEMESS = document.getElementById("THEMES");
  _C_THEMESS.classList.toggle('HIDDEN');

  // Прячем другие блоки, если есть
  const _C_BLOCKS = document.querySelectorAll('.BLOCK');
  _C_BLOCKS.forEach(_I_BLOCK => {
    if (_I_BLOCK.id == "CONTENT" || _I_BLOCK.id == "SETTINGS" || _I_BLOCK.id == "AUTHOR") {
      if (!_I_BLOCK.classList.contains('HIDDEN')) {
        _I_BLOCK.classList.toggle('HIDDEN');
      }
    }

    // Не даём скрыть сами темы, если остальные блоки тоже скрыты
    if (_I_BLOCK.id == "THEMES") {
      if (_I_BLOCK.classList.contains('HIDDEN')) {
        _I_BLOCK.classList.toggle('HIDDEN');
      }
    }
  });
}


// SETTINGS
function _F_TOGGLE_SETTINGS() {

  // Показываем блок настроек
  const _C_SETTINGS = document.getElementById("SETTINGS");
  _C_SETTINGS.classList.toggle('HIDDEN');

  // Прячем другие блоки, если есть
  const _C_BLOCKS = document.querySelectorAll('.BLOCK');
  _C_BLOCKS.forEach(_I_BLOCK => {
    if (_I_BLOCK.id == "CONTENT" || _I_BLOCK.id == "THEMES" || _I_BLOCK.id == "AUTHOR") {
      if (!_I_BLOCK.classList.contains('HIDDEN')) {
        _I_BLOCK.classList.toggle('HIDDEN');
      }
    }

    // Не даём скрыть сами настройки, если остальные блоки тоже скрыты
    if (_I_BLOCK.id == "SETTINGS") {
      if (_I_BLOCK.classList.contains('HIDDEN')) {
        _I_BLOCK.classList.toggle('HIDDEN');
      }
    }
  });
}



/*
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
Old code*/

/*
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
Old code*/

/*
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
Old code*/

/*
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
Old code*/

/*
function toggleThemeChooser() {
  const themeChooser = document.getElementById("themeChooserWindow");
  themeChooser.classList.toggle('HIDDEN');
}
Old code*/