
// ========================== [ VARIABLES ] ==========================

// Оттенки получат цвета при подключении скрипта
var _L_HUES = []

// Темые получат цвета при подключении скрипта
var _L_THEMES = []

// Модификаторы шрифта
const _C_FONT_MODIFIERS = [
  {"font-modifier": 0.8}, 
  {"font-modifier": 1}, 
  {"font-modifier": 1.2}, 
  {"font-modifier": 1.4}
];

// Модификаторы интерфейса
const _C_INTERFACE_MODIFIERS = [
  {"interface-modifier": 0.4}, 
  {"interface-modifier": 0.5}, 
  {"interface-modifier": 0.7}, 
  {"interface-modifier": 0.85}
];

// Символы Лого
const _C_SYMBOLS = "☰ ☱ ☲ ☳ ☴ ☵ ☶ ☷".split(' ');

// ========================== [ FUNCTIONS ] ==========================

// [ INTERACTION WITH HTML ]

// Получение объекта по ID
function _F_INTERACT_WITH_HTML_GET_ELEMENT_BY_ID(_C_ID) {
  return document.getElementById(_C_ID);
}

// Получение объектов по классу
function _F_INTERACT_WITH_HTML_QUERY_SELECTOR_FROM(_C_ELEMENT, _C_CLASS) {
  return _C_ELEMENT.querySelectorAll(_C_CLASS);
}

// Выключение элемента по ID
function _F_INTERACT_WITH_HTML_DISABLE_ELEMENT_BY_ID(_C_ID) {
  const _C_ELEMENT = _F_INTERACT_WITH_HTML_GET_ELEMENT_BY_ID(_C_ID);
  if (!_C_ELEMENT.hasAttribute("disabled")) {
    _C_ELEMENT.setAttribute("disabled", "");
  }
}

// Включение элемента по ID
function _F_INTERACT_WITH_HTML_ENABLE_ELEMENT_BY_ID(_C_ID) {
  const _C_ELEMENT = _F_INTERACT_WITH_HTML_GET_ELEMENT_BY_ID(_C_ID);
  if (_C_ELEMENT.hasAttribute("disabled")) {
    _C_ELEMENT.removeAttribute("disabled");
  }
}

// Выключение кнопки по ID
function _F_INTERACT_WITH_HTML_DISABLE_BUTTON_BY_ID(_C_ID) {
  const _C_ELEMENT = _F_INTERACT_WITH_HTML_GET_ELEMENT_BY_ID(_C_ID);
  if (_C_ELEMENT.classList.contains("ACTIVE")) {
    _C_ELEMENT.classList.remove("ACTIVE");
  }
}

// Активация кнопки по ID
function _F_INTERACT_WITH_HTML_ENABLE_BUTTON_BY_ID(_C_ID) {
  const _C_ELEMENT = _F_INTERACT_WITH_HTML_GET_ELEMENT_BY_ID(_C_ID);
  if (!_C_ELEMENT.classList.contains("ACTIVE")) {
    _C_ELEMENT.classList.add("ACTIVE");
  }
}

// Скролл к элементу по ID
function _F_INTERACT_WITH_HTML_SCROLL_TO_ELEMENT_BY_ID(_C_ID) {
  const _C_CONTENT = _F_INTERACT_WITH_HTML_GET_ELEMENT_BY_ID("CONTENT");
  const _C_ELEMENT = _F_INTERACT_WITH_HTML_GET_ELEMENT_BY_ID(_C_ID);
  setTimeout(() => {
    _C_ELEMENT.scrollIntoView({ behavior: "auto", block: "start", inline: "nearest" });
    setTimeout(() => {
      _C_CONTENT.scrollBy(0, -15);
    }, 100);
  }, 100);
}

// [ LOCAL STORAGE ]

function _F_LOCAL_STORAGE_GET(_C_KEY) {
  return localStorage.getItem(_C_KEY);
}

function _F_LOCAL_STORAGE_SET(_C_KEY, _C_VALUE) {
  localStorage.setItem(_C_KEY, _C_VALUE);
}

// [ LOGO ]

// Обновление Логотипа
function _F_LOGO_UPDATE() {
  const _C_CHANGING = document.querySelectorAll('[id="LOGO_CHANGING_PART"]');
  _C_CHANGING.forEach((element) => {
    element.innerHTML = _C_SYMBOLS[Math.floor(Math.random() * _C_SYMBOLS.length)];
  });
}

// [ CUSTOMIZATION CHANGE ]

// Изменение оттенка
function _F_CUSTOMIZATION_CHANGE_HUE(_C_HUE = null, _L_HUES_LOCAL = null) {
  const _C_BODY = document.getElementById("body");
  if (_C_HUE == null && _L_HUES_LOCAL != null) {
    _C_BODY.style.setProperty("--hue", _L_HUES_LOCAL["hue"]);
  } else if (_C_HUE != null && _L_HUES_LOCAL == null) {
    _C_BODY.style.setProperty("--hue", _L_HUES[_C_HUE]["hue"]);
    _F_LOCAL_STORAGE_SET("hue", JSON.stringify(_L_HUES[_C_HUE]));
  }
}

// Изменение темы
function _F_CUSTOMIZATION_CHANGE_THEME(_C_THEME = null, _L_THEMES_LOCAL = null) {
  const _C_BODY = document.getElementById("body");
  if (_C_THEME == null && _L_THEMES_LOCAL != null) {
    _C_BODY.style.setProperty("--solid", _L_THEMES_LOCAL["solid"]);
    _C_BODY.style.setProperty("--light-shadow", _L_THEMES_LOCAL["light-shadow"]);
    _C_BODY.style.setProperty("--dark-shadow", _L_THEMES_LOCAL["dark-shadow"]);
    _C_BODY.style.setProperty("--text", _L_THEMES_LOCAL["text"]);
  } else if (_C_THEME != null && _L_THEMES_LOCAL == null) {
    _C_BODY.style.setProperty("--solid", _L_THEMES[_C_THEME]["solid"]);
    _C_BODY.style.setProperty("--light-shadow", _L_THEMES[_C_THEME]["light-shadow"]);
    _C_BODY.style.setProperty("--dark-shadow", _L_THEMES[_C_THEME]["dark-shadow"]);
    _C_BODY.style.setProperty("--text", _L_THEMES[_C_THEME]["text"]);
    _F_LOCAL_STORAGE_SET("theme", JSON.stringify(_L_THEMES[_C_THEME]));
  }
}

// Изменение модификатора шрифта
function _F_CUSTOMIZATION_CHANGE_FONT_MODIFIER(_C_FONT_MODIFIER) {
  const _C_BODY = document.getElementById("body");
  _C_BODY.style.setProperty("--font-modifier", _C_FONT_MODIFIERS[_C_FONT_MODIFIER]["font-modifier"]);
  _F_LOCAL_STORAGE_SET("font-modifier", _C_FONT_MODIFIER);

  const _C_FONT_SIZE_CHOOSERS = _F_INTERACT_WITH_HTML_QUERY_SELECTOR_FROM(
    _F_INTERACT_WITH_HTML_GET_ELEMENT_BY_ID("FONT_SIZE_CHOOSERS"),
    ".BUTTON"
  );
  _C_FONT_SIZE_CHOOSERS.forEach(_I_FONT_SIZE_CHOOSER => {
    _I_FONT_SIZE_CHOOSER.classList.remove("ACTIVE");
  });
  _C_FONT_SIZE_CHOOSERS[_C_FONT_MODIFIER].classList.add("ACTIVE");  
}

// Изменение модификатора интерфейса
function _F_CUSTOMIZATION_CHANGE_INTERFACE_MODIFIER(_C_INTERFACE_MODIFIER) {
  const _C_BODY = document.getElementById("body");
  _C_BODY.style.setProperty("--interface-modifier", _C_INTERFACE_MODIFIERS[_C_INTERFACE_MODIFIER]["interface-modifier"]);
  _F_LOCAL_STORAGE_SET("interface-modifier", _C_INTERFACE_MODIFIER);

  const _C_INTERFACE_SIZE_CHOOSERS = _F_INTERACT_WITH_HTML_QUERY_SELECTOR_FROM(
    _F_INTERACT_WITH_HTML_GET_ELEMENT_BY_ID("INTERFACE_SIZE_CHOOSERS"),
    ".BUTTON"
  );
  _C_INTERFACE_SIZE_CHOOSERS.forEach(_I_INTERFACE_SIZE_CHOOSER => {
    _I_INTERFACE_SIZE_CHOOSER.classList.remove("ACTIVE");
  });
  _C_INTERFACE_SIZE_CHOOSERS[_C_INTERFACE_MODIFIER].classList.add("ACTIVE");
}

// [ SETTINGS CHANGE ]

// Включение/Отключение сохранения кастомизации
function _F_SETTINGS_CHANGE_CUSTOMIZATION_SAVING(_C_MODE) {
  if (_C_MODE == "true") {
    _F_LOCAL_STORAGE_SET("customization-saving", "true");
    _F_INTERACT_WITH_HTML_ENABLE_BUTTON_BY_ID("CUSTOMIZATION_SAVING_CHOOSER_ON");
    _F_INTERACT_WITH_HTML_DISABLE_BUTTON_BY_ID("CUSTOMIZATION_SAVING_CHOOSER_OFF");
  } else {
    _F_LOCAL_STORAGE_SET("customization-saving", "false");
    _F_INTERACT_WITH_HTML_ENABLE_BUTTON_BY_ID("CUSTOMIZATION_SAVING_CHOOSER_OFF");
    _F_INTERACT_WITH_HTML_DISABLE_BUTTON_BY_ID("CUSTOMIZATION_SAVING_CHOOSER_ON");
  }
}

// Включение/Отключение анимаций 
function _F_SETTINGS_CHANGE_ANIMATIONS(_C_MODE) {
  const _C_BODY = document.getElementById("body");
  if (_C_MODE == "true") {
    _F_LOCAL_STORAGE_SET("animations", "true");
    _F_INTERACT_WITH_HTML_ENABLE_BUTTON_BY_ID("ANIMATION_TOGGLE_CHOOSER_ON");
    _F_INTERACT_WITH_HTML_DISABLE_BUTTON_BY_ID("ANIMATION_TOGGLE_CHOOSER_OFF");
    _C_BODY.style.setProperty("--transition-fast", "0.5s cubic-bezier(0.165, 0.84, 0.44, 1)");
    _C_BODY.style.setProperty("--transition-slow", '2s cubic-bezier(.11,.86,.59,.97)');
    _C_BODY.style.setProperty("--transition-long", '10s cubic-bezier(.32,.17,.5,1.07)');
  } else {
    _F_LOCAL_STORAGE_SET("animations", "false");
    _F_INTERACT_WITH_HTML_ENABLE_BUTTON_BY_ID("ANIMATION_TOGGLE_CHOOSER_OFF");
    _F_INTERACT_WITH_HTML_DISABLE_BUTTON_BY_ID("ANIMATION_TOGGLE_CHOOSER_ON");
    _C_BODY.style.setProperty("--transition-fast", 'none');
    _C_BODY.style.setProperty("--transition-slow", 'none');
    _C_BODY.style.setProperty("--transition-long", 'none');
  }
}

// Включение/Отключение подсказок
function _F_SETTINGS_CHANGE_HINTS(_C_MODE) {
  if (_C_MODE == "true") {
    _F_LOCAL_STORAGE_SET("hints", "true");
    _F_INTERACT_WITH_HTML_ENABLE_BUTTON_BY_ID("HINT_TOGGLE_CHOOSER_ON");
    _F_INTERACT_WITH_HTML_DISABLE_BUTTON_BY_ID("HINT_TOGGLE_CHOOSER_OFF");
  } else {
    _F_LOCAL_STORAGE_SET("hints", "false");
    _F_INTERACT_WITH_HTML_ENABLE_BUTTON_BY_ID("HINT_TOGGLE_CHOOSER_OFF");
    _F_INTERACT_WITH_HTML_DISABLE_BUTTON_BY_ID("HINT_TOGGLE_CHOOSER_ON");
  }
}
  
// [ TOGGLE WINDOWS ]

// CONTENT
function _F_TOGGLE_WINDOW_CONTENT() {
  const _C_CONTENT = _F_INTERACT_WITH_HTML_GET_ELEMENT_BY_ID("CONTENT");
  _C_CONTENT.classList.toggle('HIDDEN');

  const _C_BLOCKS = _F_INTERACT_WITH_HTML_QUERY_SELECTOR_FROM(document, ".BLOCK");
  _C_BLOCKS.forEach(_I_BLOCK => {
    if (_I_BLOCK.id == "THEMES" || _I_BLOCK.id == "SETTINGS" || _I_BLOCK.id == "AUTHOR") {
      if (!_I_BLOCK.classList.contains('HIDDEN')) {
        _I_BLOCK.classList.toggle('HIDDEN');
      }
    }

    if (_I_BLOCK.id == "CONTENT") {
      if (_I_BLOCK.classList.contains('HIDDEN')) {
        _I_BLOCK.classList.toggle('HIDDEN');
      }
    }
  });
}

// THEMES 
function _F_TOGGLE_WINDOW_THEMES() {
  const _C_THEMES = _F_INTERACT_WITH_HTML_GET_ELEMENT_BY_ID("THEMES");
  _C_THEMES.classList.toggle('HIDDEN');

  const _C_BLOCKS = _F_INTERACT_WITH_HTML_QUERY_SELECTOR_FROM(document, ".BLOCK");
  _C_BLOCKS.forEach(_I_BLOCK => {
    if (_I_BLOCK.id == "CONTENT" || _I_BLOCK.id == "SETTINGS" || _I_BLOCK.id == "AUTHOR") {
      if (!_I_BLOCK.classList.contains('HIDDEN')) {
        _I_BLOCK.classList.toggle('HIDDEN');
      }
    }

    if (_I_BLOCK.id == "THEMES") {
      if (_I_BLOCK.classList.contains('HIDDEN')) {
        _I_BLOCK.classList.toggle('HIDDEN');
      }
    }
  });
}

// SETTINGS
function _F_TOGGLE_WINDOW_SETTINGS() {
  const _C_SETTINGS = _F_INTERACT_WITH_HTML_GET_ELEMENT_BY_ID("SETTINGS");
  _C_SETTINGS.classList.toggle('HIDDEN');

  const _C_BLOCKS = _F_INTERACT_WITH_HTML_QUERY_SELECTOR_FROM(document, ".BLOCK");
  _C_BLOCKS.forEach(_I_BLOCK => {
    if (_I_BLOCK.id == "CONTENT" || _I_BLOCK.id == "THEMES" || _I_BLOCK.id == "AUTHOR") {
      if (!_I_BLOCK.classList.contains('HIDDEN')) {
        _I_BLOCK.classList.toggle('HIDDEN');
      }
    }

    if (_I_BLOCK.id == "SETTINGS") {
      if (_I_BLOCK.classList.contains('HIDDEN')) {
        _I_BLOCK.classList.toggle('HIDDEN');
      }
    } 
  });
}

// AUTHOR
function _F_TOGGLE_WINDOW_AUTHOR() {
  const _C_AUTHOR = _F_INTERACT_WITH_HTML_GET_ELEMENT_BY_ID("AUTHOR");
  _C_AUTHOR.classList.toggle('HIDDEN');

  const _C_BLOCKS = _F_INTERACT_WITH_HTML_QUERY_SELECTOR_FROM(document, ".BLOCK");
  _C_BLOCKS.forEach(_I_BLOCK => {
    if (_I_BLOCK.id == "CONTENT" || _I_BLOCK.id == "THEMES" || _I_BLOCK.id == "SETTINGS") {
      if (!_I_BLOCK.classList.contains('HIDDEN')) {
        _I_BLOCK.classList.toggle('HIDDEN');
      }
    }

    if (_I_BLOCK.id == "AUTHOR") {
      if (_I_BLOCK.classList.contains('HIDDEN')) {
        _I_BLOCK.classList.toggle('HIDDEN');
      }
    }
  });
}

// [ ON EVENT ]

// Показать подсказку
function _F_ON_EVENT_SHOW_TOOLTIP(event) {
  const _C_TOOLTIP = _F_INTERACT_WITH_HTML_GET_ELEMENT_BY_ID("TOOLTIP_HELP");
  const _C_TOOLTIP_TEXT = event.target.getAttribute("data-tooltip");
  _C_TOOLTIP.innerHTML = "<p>" + _C_TOOLTIP_TEXT + "</p>";

  const { clientX: _C_MOUSE_X, clientY: _C_MOUSE_Y } = event;
  const { innerWidth: _C_VIEWPORT_WIDTH, innerHeight: _C_VIEWPORT_HEIGHT } = window;
  
  const _C_TOOLTIP_X = (_C_MOUSE_X + 150 > _C_VIEWPORT_WIDTH) ? _C_MOUSE_X - 150 : _C_MOUSE_X;
  const _C_TOOLTIP_Y = (_C_MOUSE_Y + 100 > _C_VIEWPORT_HEIGHT) ? _C_MOUSE_Y - 100 : _C_MOUSE_Y;

  _C_TOOLTIP.style.top = _C_TOOLTIP_Y + "px";
  _C_TOOLTIP.style.left = _C_TOOLTIP_X + "px";

  _C_TOOLTIP.style.display = "block";
}

// Скрыть подсказку
function _F_ON_EVENT_HIDE_TOOLTIP() {
  const _C_TOOLTIP = _F_INTERACT_WITH_HTML_GET_ELEMENT_BY_ID("TOOLTIP_HELP");
  _C_TOOLTIP.style.display = "none";
}

// Изменение Layout
function _F_ON_EVENT_CHANGE_LAYOUT(_C_FORCE = null) {
  const _C_SIDEBAR = document.getElementById("SIDEBAR");
  const _C_BODY = document.getElementById("body");
  if (_C_FORCE == "desktop" || window.innerWidth > 768) {
    _C_BODY.style.setProperty("grid-template-rows", "auto 1fr auto");
    _C_BODY.style.setProperty("grid-template-areas", '"H H" "S C" "S С"');
    _F_INTERACT_WITH_HTML_ENABLE_BUTTON_BY_ID("LAYOUT_CHOOSER_DESKTOP");
    _F_INTERACT_WITH_HTML_DISABLE_BUTTON_BY_ID("LAYOUT_CHOOSER_MOBILE");
    _C_SIDEBAR.style.setProperty("flex-direction", "column");
  } else {
    _C_BODY.style.setProperty("grid-template-rows", "auto auto 1fr auto");
    _C_BODY.style.setProperty("grid-template-areas", '"H H" "С С" "C C" "S S"');
    _F_INTERACT_WITH_HTML_ENABLE_BUTTON_BY_ID("LAYOUT_CHOOSER_MOBILE");
    _F_INTERACT_WITH_HTML_DISABLE_BUTTON_BY_ID("LAYOUT_CHOOSER_DESKTOP");
    _C_SIDEBAR.style.setProperty("flex-direction", "row");
  }
}

// Починка несовместимых размеру экрана модификаторов
function _F_ON_EVENT_FIX_MODIFIERS() {
  if (window.innerWidth >= 768) {
    _F_INTERACT_WITH_HTML_ENABLE_ELEMENT_BY_ID("FONT_SIZE_CHOOSER_HUGE");
    _F_INTERACT_WITH_HTML_ENABLE_ELEMENT_BY_ID("INTERFACE_SIZE_CHOOSER_SMALL");
    _F_INTERACT_WITH_HTML_ENABLE_ELEMENT_BY_ID("INTERFACE_SIZE_CHOOSER_MEDIUM");
    return;
  }

  if (window.innerWidth < 768 && window.innerWidth >= 600) { // 768
    if (_F_LOCAL_STORAGE_GET("interface-modifier") == 0) {
      _F_CUSTOMIZATION_CHANGE_INTERFACE_MODIFIER(1);    
    }

    _F_INTERACT_WITH_HTML_DISABLE_ELEMENT_BY_ID("INTERFACE_SIZE_CHOOSER_SMALL");

    _F_INTERACT_WITH_HTML_ENABLE_ELEMENT_BY_ID("FONT_SIZE_CHOOSER_SMALL");
    _F_INTERACT_WITH_HTML_ENABLE_ELEMENT_BY_ID("INTERFACE_SIZE_CHOOSER_MEDIUM");
  } else if (window.innerWidth < 600 && window.innerWidth >= 0) { // 600
    if (_F_LOCAL_STORAGE_GET("interface-modifier") == 1) {
      _F_CUSTOMIZATION_CHANGE_INTERFACE_MODIFIER(2);    
    }
    if (_F_LOCAL_STORAGE_GET("font-modifier") == 3) {
      _F_CUSTOMIZATION_CHANGE_FONT_MODIFIER(2);
    }

    _F_INTERACT_WITH_HTML_DISABLE_ELEMENT_BY_ID("FONT_SIZE_CHOOSER_HUGE");
    _F_INTERACT_WITH_HTML_DISABLE_ELEMENT_BY_ID("INTERFACE_SIZE_CHOOSER_SMALL");
    _F_INTERACT_WITH_HTML_DISABLE_ELEMENT_BY_ID("INTERFACE_SIZE_CHOOSER_MEDIUM");
  }
}

// [ ON LOAD ]

// Настройка подсказок
function _F_ON_LOAD_SETUP_HINTS() {
  const _C_HELP_BUTTONS = _F_INTERACT_WITH_HTML_QUERY_SELECTOR_FROM(
    document, 
    ".BUTTON_HELP , .BUTTON.SIDEBAR"
  )
  const _C_HELP_HINTS = _F_INTERACT_WITH_HTML_QUERY_SELECTOR_FROM(
    document, 
    ".HINT"
  )

  if (_F_LOCAL_STORAGE_GET("hints") == "false") {
    _C_HELP_BUTTONS.forEach(_I_BUTTON => {
      _I_BUTTON.style.display = "none";
    });
    _C_HELP_HINTS.forEach(_I_HINT => {
      _I_HINT.style.display = "none";
    });
    return;
  }

  _C_HELP_BUTTONS.forEach(_I_BUTTON => {
    _I_BUTTON.addEventListener("mouseenter", _F_ON_EVENT_SHOW_TOOLTIP);
    _I_BUTTON.addEventListener("mouseleave", _F_ON_EVENT_HIDE_TOOLTIP);
  });
}

// Генерация цветов кнопок смены оттенков
function _F_ON_LOAD_GENERATE_AND_SAVE_HUES(_C_HUES_FROM_HTML) {
  _L_HUES = _C_HUES_FROM_HTML;

  const _C_HUE_CHOOSERS = _F_INTERACT_WITH_HTML_QUERY_SELECTOR_FROM(
    _F_INTERACT_WITH_HTML_GET_ELEMENT_BY_ID("HUE_CHOOSERS"), 
    ".BUTTON"
  );

  _C_HUE_CHOOSERS.forEach(function(_I_HUE_CHOOSER, _I_) {
    _I_HUE_CHOOSER.style.setProperty("background-color", 'rgb(' + _C_HUES[_I_]["hue"] + ')');
    _I_ += 1;
  });

  if (_F_LOCAL_STORAGE_GET("customization-saved") == 'false' || _F_LOCAL_STORAGE_GET("hue") == null) {
    _F_CUSTOMIZATION_CHANGE_HUE(0);
  }
}

// Генерация цветов кнопок выбора темы
function _F_ON_LOAD_GENERATE_AND_SAVE_THEMES(_C_THEMES_FROM_HTML) {
  _L_THEMES = _C_THEMES_FROM_HTML;

  const _C_THEME_CHOOSERS = _F_INTERACT_WITH_HTML_QUERY_SELECTOR_FROM(
    _F_INTERACT_WITH_HTML_GET_ELEMENT_BY_ID("THEME_CHOOSERS"), 
    ".BUTTON"
  );

  _C_THEME_CHOOSERS.forEach(function(_I_THEME_CHOOSER, _I_) {
    _I_THEME_CHOOSER.style.setProperty("background-color", 'rgb(' + _C_THEMES[_I_]["solid"] + ')');
    _I_ += 1;
  });

  if (_F_LOCAL_STORAGE_GET("customization-saved") == 'false' || _F_LOCAL_STORAGE_GET("theme") == null) {
    _F_CUSTOMIZATION_CHANGE_THEME(0);
  }
}

// ========================== [ INIT ] ==========================

// Инициализация
document.addEventListener('DOMContentLoaded', function () {

  // Добавление ивентов и интервалов функциям 
  setInterval(_F_LOGO_UPDATE, 2000); 
  _F_LOGO_UPDATE()
  window.addEventListener("resize", _F_ON_EVENT_CHANGE_LAYOUT);
  window.addEventListener("resize", _F_ON_EVENT_FIX_MODIFIERS);
  window.addEventListener("DOMContentLoaded", _F_ON_EVENT_FIX_MODIFIERS);
  window.addEventListener("DOMContentLoaded", _F_ON_EVENT_CHANGE_LAYOUT);
  window.addEventListener("DOMContentLoaded", _F_ON_LOAD_SETUP_HINTS);
  
  // Ставим при загрузке страницы значения в еще несуществующие переменные в памяти браузера
  if (_F_LOCAL_STORAGE_GET("customization-saving") == null) {
    _F_LOCAL_STORAGE_SET("customization-saving", "true");
  }
  if (_F_LOCAL_STORAGE_GET("animations") == null) {
    _F_LOCAL_STORAGE_SET("animations", "true");
  }
  if (_F_LOCAL_STORAGE_GET("hints") == null) {
    _F_LOCAL_STORAGE_SET("hints", "true");
  }
  if (_F_LOCAL_STORAGE_GET("font-modifier") == null) {
    _F_LOCAL_STORAGE_SET("font-modifier", 1);
  }
  if (_F_LOCAL_STORAGE_GET("interface-modifier") == null) {
    _F_LOCAL_STORAGE_SET("interface-modifier", 1);
  }

  // Если сохранение тем есть, то загружаем, если нет - удаляем сохранения
  if (_F_LOCAL_STORAGE_GET("customization-saving") == "true") {
    // Загрузка темы, если есть.
    if (_F_LOCAL_STORAGE_GET("theme") != null) {
      _F_CUSTOMIZATION_CHANGE_THEME(null, JSON.parse(_F_LOCAL_STORAGE_GET("theme")));
    }
    // Загрузка оттенка, если есть.
    if (_F_LOCAL_STORAGE_GET("hue") != null) {
      _F_CUSTOMIZATION_CHANGE_HUE(null, JSON.parse(_F_LOCAL_STORAGE_GET("hue")));
    }
  } else {
    localStorage.removeItem("theme");
    localStorage.removeItem("hue");
  }

  // Загрузка размера шрифта, если есть.
  if (_F_LOCAL_STORAGE_GET("font-modifier") != null) {
    _F_CUSTOMIZATION_CHANGE_FONT_MODIFIER(_F_LOCAL_STORAGE_GET("font-modifier"));
  }
  // Загрузка размера интерфейса, если есть.
  if (_F_LOCAL_STORAGE_GET("interface-modifier") != null) {
    _F_CUSTOMIZATION_CHANGE_INTERFACE_MODIFIER(_F_LOCAL_STORAGE_GET("interface-modifier"));
  }
  // Загрузка сохранения кастомизации, если есть.
  if (_F_LOCAL_STORAGE_GET("customization-saving") != null) {
    _F_SETTINGS_CHANGE_CUSTOMIZATION_SAVING(_F_LOCAL_STORAGE_GET("customization-saving"));
  }
  // Загрузка сохранения анимации, если есть.
  if (_F_LOCAL_STORAGE_GET("animations") != null) {
    _F_SETTINGS_CHANGE_ANIMATIONS(_F_LOCAL_STORAGE_GET("animations"));
  }
  // Загрузка сохранения подсказок, если есть.
  if (_F_LOCAL_STORAGE_GET("hints") != null) {
    _F_SETTINGS_CHANGE_HINTS(_F_LOCAL_STORAGE_GET("hints"));
  }

  // Завершение загрузки
  setTimeout(function () {
    const _C_LOADING_SCREEN = document.getElementById("LOADING_SCREEN");
    _C_LOADING_SCREEN.style.setProperty("opacity", "0");
  }, 1);
  setTimeout(function () {
    const _C_HINTS = document.querySelectorAll(".HINT");
    _C_HINTS.forEach(_I_HINT => {
      _I_HINT.style.setProperty("opacity", "0");
    });
  }, 1500);
});