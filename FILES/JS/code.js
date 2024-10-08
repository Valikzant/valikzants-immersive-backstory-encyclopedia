
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
async function _F_INTERACT_WITH_HTML_GET_ELEMENT_BY_ID(_C_ID) {
  return document.getElementById(_C_ID);
}

// Получение объектов по классу
async function _F_INTERACT_WITH_HTML_QUERY_SELECTOR_FROM(_C_ELEMENT, _C_CLASS) {
  return _C_ELEMENT.querySelectorAll(_C_CLASS);
}

// Выключение элемента по ID
async function _F_INTERACT_WITH_HTML_DISABLE_ELEMENT_BY_ID(_C_ID) {
  const _C_ELEMENT = await _F_INTERACT_WITH_HTML_GET_ELEMENT_BY_ID(_C_ID);
  if (!_C_ELEMENT.hasAttribute("disabled")) {
    _C_ELEMENT.setAttribute("disabled", "");
  }
}

// Включение элемента по ID
async function _F_INTERACT_WITH_HTML_ENABLE_ELEMENT_BY_ID(_C_ID) {
  const _C_ELEMENT = await _F_INTERACT_WITH_HTML_GET_ELEMENT_BY_ID(_C_ID);
  if (_C_ELEMENT.hasAttribute("disabled")) {
    _C_ELEMENT.removeAttribute("disabled");
  }
}

// Выключение кнопки по ID
async function _F_INTERACT_WITH_HTML_DISABLE_BUTTON_BY_ID(_C_ID) {
  const _C_ELEMENT = await _F_INTERACT_WITH_HTML_GET_ELEMENT_BY_ID(_C_ID);
  if (_C_ELEMENT.classList.contains("ACTIVE")) {
    _C_ELEMENT.classList.remove("ACTIVE");
  }
}

// Активация кнопки по ID
async function _F_INTERACT_WITH_HTML_ENABLE_BUTTON_BY_ID(_C_ID) {
  const _C_ELEMENT = await _F_INTERACT_WITH_HTML_GET_ELEMENT_BY_ID(_C_ID);
  if (!_C_ELEMENT.classList.contains("ACTIVE")) {
    _C_ELEMENT.classList.add("ACTIVE");
  }
}

// Скролл к элементу по ID
async function _F_INTERACT_WITH_HTML_SCROLL_TO_ELEMENT_BY_ID(_C_ID) {
  const _C_CONTENT = await _F_INTERACT_WITH_HTML_GET_ELEMENT_BY_ID("CONTENT");
  const _C_ELEMENT = await _F_INTERACT_WITH_HTML_GET_ELEMENT_BY_ID(_C_ID);
  setTimeout(() => {
    _C_ELEMENT.scrollIntoView({ behavior: "auto", block: "start", inline: "nearest" });
    setTimeout(() => {
      _C_CONTENT.scrollBy(0, -15);
    }, 10);
    setTimeout(() => {
      _C_ELEMENT.scrollIntoView({ behavior: "auto", block: "start", inline: "nearest" });
    }, 10);
    setTimeout(() => {
      _C_CONTENT.scrollBy(0, -15);
    }, 10);
  }, 10);
}

// Открытие и закрытие страниц по списку текущих страниц
async function _F_INTERACT_WITH_HTML_OPEN_CLOSE_PAGES(_C_PAGE_ID = null) {
  const _C_STORY_PAGES = await _F_INTERACT_WITH_HTML_QUERY_SELECTOR_FROM(document, ".PAGE");
  if (_C_PAGE_ID == null) {
    _C_STORY_PAGES.forEach(_I_PAGE => {
      if (_I_PAGE.id == "start") {return;}
      _I_PAGE.classList.add("CLOSED");
    });
  } else {
    _C_STORY_PAGES.forEach(_I_PAGE => {
      if (_I_PAGE.id == _C_PAGE_ID) {
        _I_PAGE.classList.remove("CLOSED");
        _F_INTERACT_WITH_HTML_SCROLL_TO_ELEMENT_BY_ID(_I_PAGE.id)
      } else {
        _I_PAGE.classList.add("CLOSED");
      }
    });
  }
}

// [ LOCAL STORAGE ]

async function _F_LOCAL_STORAGE_GET(_C_KEY) {
  return localStorage.getItem(_C_KEY);
}

async function _F_LOCAL_STORAGE_SET(_C_KEY, _C_VALUE) {
  localStorage.setItem(_C_KEY, _C_VALUE);
}

// [ LOGO ]

// Обновление Логотипа
async function _F_LOGO_UPDATE() {
  const _C_CHANGING = document.querySelectorAll('[id="LOGO_CHANGING_PART"]');
  _C_CHANGING.forEach((element) => {
    element.innerHTML = _C_SYMBOLS[Math.floor(Math.random() * _C_SYMBOLS.length)];
  });
}

// [ CUSTOMIZATION CHANGE ]

// Изменение оттенка
async function _F_CUSTOMIZATION_CHANGE_HUE(_C_HUE = null, _L_HUES_LOCAL = null) {
  const _C_BODY = document.getElementById("body");
  if (_C_HUE == null && _L_HUES_LOCAL != null) {
    _C_BODY.style.setProperty("--hue", _L_HUES_LOCAL["hue"]);
  } else if (_C_HUE != null && _L_HUES_LOCAL == null) {
    _C_BODY.style.setProperty("--hue", _L_HUES[_C_HUE]["hue"]);
    await _F_LOCAL_STORAGE_SET("hue", JSON.stringify(_L_HUES[_C_HUE]));
  }
}

// Изменение темы
async function _F_CUSTOMIZATION_CHANGE_THEME(_C_THEME = null, _L_THEMES_LOCAL = null) {
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
    await _F_LOCAL_STORAGE_SET("theme", JSON.stringify(_L_THEMES[_C_THEME]));
  }
}

// Изменение модификатора шрифта
async function _F_CUSTOMIZATION_CHANGE_FONT_MODIFIER(_C_FONT_MODIFIER) {
  const _C_BODY = document.getElementById("body");
  _C_BODY.style.setProperty("--font-modifier", _C_FONT_MODIFIERS[_C_FONT_MODIFIER]["font-modifier"]);
  await _F_LOCAL_STORAGE_SET("font-modifier", _C_FONT_MODIFIER);

  const _C_FONT_SIZE_CHOOSERS = await _F_INTERACT_WITH_HTML_QUERY_SELECTOR_FROM(
    await _F_INTERACT_WITH_HTML_GET_ELEMENT_BY_ID("FONT_SIZE_CHOOSERS"),
    ".BUTTON"
  );
  _C_FONT_SIZE_CHOOSERS.forEach(_I_FONT_SIZE_CHOOSER => {
    _I_FONT_SIZE_CHOOSER.classList.remove("ACTIVE");
  });
  _C_FONT_SIZE_CHOOSERS[_C_FONT_MODIFIER].classList.add("ACTIVE");  
}

// Изменение модификатора интерфейса
async function _F_CUSTOMIZATION_CHANGE_INTERFACE_MODIFIER(_C_INTERFACE_MODIFIER) {
  const _C_BODY = document.getElementById("body");
  _C_BODY.style.setProperty("--interface-modifier", _C_INTERFACE_MODIFIERS[_C_INTERFACE_MODIFIER]["interface-modifier"]);
  await _F_LOCAL_STORAGE_SET("interface-modifier", _C_INTERFACE_MODIFIER);

  const _C_INTERFACE_SIZE_CHOOSERS = await _F_INTERACT_WITH_HTML_QUERY_SELECTOR_FROM(
    await _F_INTERACT_WITH_HTML_GET_ELEMENT_BY_ID("INTERFACE_SIZE_CHOOSERS"),
    ".BUTTON"
  );
  _C_INTERFACE_SIZE_CHOOSERS.forEach(_I_INTERFACE_SIZE_CHOOSER => {
    _I_INTERFACE_SIZE_CHOOSER.classList.remove("ACTIVE");
  });
  _C_INTERFACE_SIZE_CHOOSERS[_C_INTERFACE_MODIFIER].classList.add("ACTIVE");
}

// Изменения css
async function _F_CUSTOMIZATION_CHANGE_CLASSES_FILE(_C_CLASSES_FILE_PARAMETER) {
  const _C_CLASSES_FILE_LINK = await _F_INTERACT_WITH_HTML_GET_ELEMENT_BY_ID("CLASSES_CSS_FILE");
  const _C_TEXT_BLOCKS_FILE_LINK = await _F_INTERACT_WITH_HTML_GET_ELEMENT_BY_ID("TEXT_BLOCKS_CSS_FILE");

  _F_INTERACT_WITH_HTML_DISABLE_BUTTON_BY_ID("CLASSES_STYLE_CHOOSER_MODERN");
  _F_INTERACT_WITH_HTML_DISABLE_BUTTON_BY_ID("CLASSES_STYLE_CHOOSER_SIMPLE");
  _F_INTERACT_WITH_HTML_DISABLE_BUTTON_BY_ID("CLASSES_STYLE_CHOOSER_MINIMAL");
  _F_INTERACT_WITH_HTML_DISABLE_BUTTON_BY_ID("CLASSES_STYLE_CHOOSER_LEGACY");

  if (_C_CLASSES_FILE_PARAMETER == "modern") {
    _F_INTERACT_WITH_HTML_ENABLE_BUTTON_BY_ID("CLASSES_STYLE_CHOOSER_MODERN");
  } else if (_C_CLASSES_FILE_PARAMETER == "simple") {
    _F_INTERACT_WITH_HTML_ENABLE_BUTTON_BY_ID("CLASSES_STYLE_CHOOSER_SIMPLE");
  } else if (_C_CLASSES_FILE_PARAMETER == "minimal") {
    _F_INTERACT_WITH_HTML_ENABLE_BUTTON_BY_ID("CLASSES_STYLE_CHOOSER_MINIMAL");
  } else if (_C_CLASSES_FILE_PARAMETER == "legacy") {
    _F_INTERACT_WITH_HTML_ENABLE_BUTTON_BY_ID("CLASSES_STYLE_CHOOSER_LEGACY");
  }
  
  if (_C_CLASSES_FILE_LINK != null) {
    const _C_CLASSES_FILE_LINK_HREF = _C_CLASSES_FILE_LINK.getAttribute("href");
    const _C_CLASSES_FILE_LINK_HREF_PARTS = _C_CLASSES_FILE_LINK_HREF.split('/');
    const _C_CLASSES_FILE_NAME_WITH_PARAMS = _C_CLASSES_FILE_LINK_HREF_PARTS[_C_CLASSES_FILE_LINK_HREF_PARTS.length - 1];
    const [_C_CLASSES_FILE_NAME, _C_CLASSES_FILE_PARAMS] = _C_CLASSES_FILE_NAME_WITH_PARAMS.split('?');
    const _C_CLASSES_NEW_FILE_NAME = `classes_${_C_CLASSES_FILE_PARAMETER}.css`;
    _C_CLASSES_FILE_LINK_HREF_PARTS[_C_CLASSES_FILE_LINK_HREF_PARTS.length - 1] = _C_CLASSES_FILE_PARAMS ? `${_C_CLASSES_NEW_FILE_NAME}?${_C_CLASSES_FILE_PARAMS}` : _C_CLASSES_NEW_FILE_NAME;
    const _C_CLASSES_FILE_LINK_HREF_NEW = _C_CLASSES_FILE_LINK_HREF_PARTS.join('/');
    _C_CLASSES_FILE_LINK.setAttribute('href', _C_CLASSES_FILE_LINK_HREF_NEW);
  }

  if (_C_TEXT_BLOCKS_FILE_LINK != null) {
    const _C_TEXT_BLOCKS_FILE_LINK_HREF = _C_TEXT_BLOCKS_FILE_LINK.getAttribute("href");
    const _C_TEXT_BLOCKS_FILE_LINK_HREF_PARTS = _C_TEXT_BLOCKS_FILE_LINK_HREF.split('/');
    const _C_TEXT_BLOCKS_FILE_NAME_WITH_PARAMS = _C_TEXT_BLOCKS_FILE_LINK_HREF_PARTS[_C_TEXT_BLOCKS_FILE_LINK_HREF_PARTS.length - 1];
    const [_C_TEXT_BLOCKS_FILE_NAME, _C_TEXT_BLOCKS_FILE_PARAMS] = _C_TEXT_BLOCKS_FILE_NAME_WITH_PARAMS.split('?');
    const _C_TEXT_BLOCKS_NEW_FILE_NAME = `textblocks_${_C_CLASSES_FILE_PARAMETER}.css`;
    _C_TEXT_BLOCKS_FILE_LINK_HREF_PARTS[_C_TEXT_BLOCKS_FILE_LINK_HREF_PARTS.length - 1] = _C_TEXT_BLOCKS_FILE_PARAMS ? `${_C_TEXT_BLOCKS_NEW_FILE_NAME}?${_C_TEXT_BLOCKS_FILE_PARAMS}` : _C_TEXT_BLOCKS_NEW_FILE_NAME;
    const _C_TEXT_BLOCKS_FILE_LINK_HREF_NEW = _C_TEXT_BLOCKS_FILE_LINK_HREF_PARTS.join('/');
    _C_TEXT_BLOCKS_FILE_LINK.setAttribute('href', _C_TEXT_BLOCKS_FILE_LINK_HREF_NEW);
  }

  _F_LOCAL_STORAGE_SET("classes-parameter", _C_CLASSES_FILE_PARAMETER);
}


// [ SETTINGS CHANGE ]

// Включение/Отключение сохранения кастомизации
async function _F_SETTINGS_CHANGE_CUSTOMIZATION_SAVING(_C_MODE) {
  if (_C_MODE == "true") {
    await _F_LOCAL_STORAGE_SET("customization-saved", "true");
    await _F_INTERACT_WITH_HTML_ENABLE_BUTTON_BY_ID("CUSTOMIZATION_SAVING_CHOOSER_ON");
    await _F_INTERACT_WITH_HTML_DISABLE_BUTTON_BY_ID("CUSTOMIZATION_SAVING_CHOOSER_OFF");
  } else {
    await _F_LOCAL_STORAGE_SET("customization-saved", "false");
    await _F_INTERACT_WITH_HTML_ENABLE_BUTTON_BY_ID("CUSTOMIZATION_SAVING_CHOOSER_OFF");
    await _F_INTERACT_WITH_HTML_DISABLE_BUTTON_BY_ID("CUSTOMIZATION_SAVING_CHOOSER_ON");
  }
}

// Включение/Отключение анимаций 
async function _F_SETTINGS_CHANGE_ANIMATIONS(_C_MODE) {
  const _C_BODY = document.getElementById("body");
  if (_C_MODE == "true") {
    await _F_LOCAL_STORAGE_SET("animations", "true");
    await _F_INTERACT_WITH_HTML_ENABLE_BUTTON_BY_ID("ANIMATION_TOGGLE_CHOOSER_ON");
    await _F_INTERACT_WITH_HTML_DISABLE_BUTTON_BY_ID("ANIMATION_TOGGLE_CHOOSER_OFF");
    _C_BODY.style.setProperty("--transition-fast", "0.5s cubic-bezier(0.165, 0.84, 0.44, 1)");
    _C_BODY.style.setProperty("--transition-slow", '2s cubic-bezier(.11,.86,.59,.97)');
    _C_BODY.style.setProperty("--transition-long", '10s cubic-bezier(.32,.17,.5,1.07)');
  } else {
    await _F_LOCAL_STORAGE_SET("animations", "false");
    await _F_INTERACT_WITH_HTML_ENABLE_BUTTON_BY_ID("ANIMATION_TOGGLE_CHOOSER_OFF");
    await _F_INTERACT_WITH_HTML_DISABLE_BUTTON_BY_ID("ANIMATION_TOGGLE_CHOOSER_ON");
    _C_BODY.style.setProperty("--transition-fast", 'none');
    _C_BODY.style.setProperty("--transition-slow", 'none');
    _C_BODY.style.setProperty("--transition-long", 'none');
  }
}

// Включение/Отключение подсказок
async function _F_SETTINGS_CHANGE_HINTS(_C_MODE) {
  if (_C_MODE == "true") {
    await _F_LOCAL_STORAGE_SET("hints", "true");
    await _F_INTERACT_WITH_HTML_ENABLE_BUTTON_BY_ID("HINT_TOGGLE_CHOOSER_ON");
    await _F_INTERACT_WITH_HTML_DISABLE_BUTTON_BY_ID("HINT_TOGGLE_CHOOSER_OFF");
  } else {
    await _F_LOCAL_STORAGE_SET("hints", "false");
    await _F_INTERACT_WITH_HTML_ENABLE_BUTTON_BY_ID("HINT_TOGGLE_CHOOSER_OFF");
    await _F_INTERACT_WITH_HTML_DISABLE_BUTTON_BY_ID("HINT_TOGGLE_CHOOSER_ON");
  }
}

// [ TOGGLE WINDOWS ]

// CONTENT
async function _F_TOGGLE_WINDOW_CONTENT() {
  const _C_CONTENT = await _F_INTERACT_WITH_HTML_GET_ELEMENT_BY_ID("CONTENT");
  _C_CONTENT.classList.toggle('HIDDEN');

  const _C_BLOCKS = await _F_INTERACT_WITH_HTML_QUERY_SELECTOR_FROM(document, ".BLOCK");
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
async function _F_TOGGLE_WINDOW_THEMES() {
  const _C_THEMES = await _F_INTERACT_WITH_HTML_GET_ELEMENT_BY_ID("THEMES");
  _C_THEMES.classList.toggle('HIDDEN');

  const _C_BLOCKS = await _F_INTERACT_WITH_HTML_QUERY_SELECTOR_FROM(document, ".BLOCK");
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
async function _F_TOGGLE_WINDOW_SETTINGS() {
  const _C_SETTINGS = await _F_INTERACT_WITH_HTML_GET_ELEMENT_BY_ID("SETTINGS");
  _C_SETTINGS.classList.toggle('HIDDEN');

  const _C_BLOCKS = await _F_INTERACT_WITH_HTML_QUERY_SELECTOR_FROM(document, ".BLOCK");
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
async function _F_TOGGLE_WINDOW_AUTHOR() {
  const _C_AUTHOR = await _F_INTERACT_WITH_HTML_GET_ELEMENT_BY_ID("AUTHOR");
  _C_AUTHOR.classList.toggle('HIDDEN');

  const _C_BLOCKS = await _F_INTERACT_WITH_HTML_QUERY_SELECTOR_FROM(document, ".BLOCK");
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
async function _F_ON_EVENT_SHOW_TOOLTIP(event) {
  const _C_TOOLTIP = await _F_INTERACT_WITH_HTML_GET_ELEMENT_BY_ID("TOOLTIP_HELP");
  const _C_TOOLTIP_TEXT = event.target.getAttribute("data-tooltip");
  _C_TOOLTIP.innerHTML = "<p>" + _C_TOOLTIP_TEXT + "</p>";

  const { clientX: _C_MOUSE_X, clientY: _C_MOUSE_Y } = event;
  const { innerWidth: _C_VIEWPORT_WIDTH, innerHeight: _C_VIEWPORT_HEIGHT } = window;
  
  const _C_TOOLTIP_X = (_C_MOUSE_X + 200 > _C_VIEWPORT_WIDTH) ? _C_MOUSE_X - 100 : _C_MOUSE_X;
  const _C_TOOLTIP_Y = (_C_MOUSE_Y + 200 > _C_VIEWPORT_HEIGHT) ? _C_MOUSE_Y - 100 : _C_MOUSE_Y;

  _C_TOOLTIP.style.top = _C_TOOLTIP_Y + "px";
  _C_TOOLTIP.style.left = _C_TOOLTIP_X + "px";

  _C_TOOLTIP.style.display = "block";
}

// Скрыть подсказку
async function _F_ON_EVENT_HIDE_TOOLTIP() {
  const _C_TOOLTIP = await _F_INTERACT_WITH_HTML_GET_ELEMENT_BY_ID("TOOLTIP_HELP");
  _C_TOOLTIP.style.display = "none";
}

// Изменение Layout
async function _F_ON_EVENT_CHANGE_LAYOUT(_C_FORCE = null) {
  const _C_SIDEBAR = document.getElementById("SIDEBAR");
  const _C_BODY = document.getElementById("body");
  if (_C_FORCE == "desktop" || window.innerWidth > 768) {
    _C_BODY.style.setProperty("grid-template-rows", "auto 1fr auto");
    _C_BODY.style.setProperty("grid-template-areas", '"H H" "S C" "S С"');
    await _F_INTERACT_WITH_HTML_ENABLE_BUTTON_BY_ID("LAYOUT_CHOOSER_DESKTOP");
    await _F_INTERACT_WITH_HTML_DISABLE_BUTTON_BY_ID("LAYOUT_CHOOSER_MOBILE");
    _C_SIDEBAR.style.setProperty("flex-direction", "column");
  } else {
    _C_BODY.style.setProperty("grid-template-rows", "auto auto 1fr auto");
    _C_BODY.style.setProperty("grid-template-areas", '"H H" "С С" "C C" "S S"');
    await _F_INTERACT_WITH_HTML_ENABLE_BUTTON_BY_ID("LAYOUT_CHOOSER_MOBILE");
    await _F_INTERACT_WITH_HTML_DISABLE_BUTTON_BY_ID("LAYOUT_CHOOSER_DESKTOP");
    _C_SIDEBAR.style.setProperty("flex-direction", "row");
  }
}

// Починка несовместимых размеру экрана модификаторов
async function _F_ON_EVENT_FIX_MODIFIERS() {

  const _C_WINDOW_WIDTH = window.innerWidth;

  if (_C_WINDOW_WIDTH >= 768) {
    await _F_INTERACT_WITH_HTML_ENABLE_ELEMENT_BY_ID("INTERFACE_SIZE_CHOOSER_SMALL");
    await _F_INTERACT_WITH_HTML_ENABLE_ELEMENT_BY_ID("INTERFACE_SIZE_CHOOSER_MEDIUM");
    return;
  }

  if (_C_WINDOW_WIDTH < 768 && _C_WINDOW_WIDTH >= 600) { // 768
    if (await _F_LOCAL_STORAGE_GET("interface-modifier") == 0) {
      await _F_CUSTOMIZATION_CHANGE_INTERFACE_MODIFIER(1);    
    }

    await _F_INTERACT_WITH_HTML_DISABLE_ELEMENT_BY_ID("INTERFACE_SIZE_CHOOSER_SMALL");

    await _F_INTERACT_WITH_HTML_ENABLE_ELEMENT_BY_ID("FONT_SIZE_CHOOSER_SMALL");
    await _F_INTERACT_WITH_HTML_ENABLE_ELEMENT_BY_ID("INTERFACE_SIZE_CHOOSER_MEDIUM");
  } else if (_C_WINDOW_WIDTH < 600 && _C_WINDOW_WIDTH >= 0) { // 600
    if (await _F_LOCAL_STORAGE_GET("interface-modifier") == 1) {
      await _F_CUSTOMIZATION_CHANGE_INTERFACE_MODIFIER(2);    
    }

    await _F_INTERACT_WITH_HTML_DISABLE_ELEMENT_BY_ID("INTERFACE_SIZE_CHOOSER_SMALL");
    await _F_INTERACT_WITH_HTML_DISABLE_ELEMENT_BY_ID("INTERFACE_SIZE_CHOOSER_MEDIUM");
  }
}

// [ ON LOAD ]

// Настройка подсказок
async function _F_ON_LOAD_SETUP_HINTS() {
  const _C_HELP_BUTTONS = await _F_INTERACT_WITH_HTML_QUERY_SELECTOR_FROM(
    document, 
    ".BUTTON_HELP , .BUTTON.SIDEBAR"
  )
  const _C_HELP_HINTS = await _F_INTERACT_WITH_HTML_QUERY_SELECTOR_FROM(
    document, 
    ".HINT"
  )

  if (await _F_LOCAL_STORAGE_GET("hints") == "false") {
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
async function _F_ON_LOAD_GENERATE_AND_SAVE_HUES(_C_HUES_FROM_HTML) {
  _L_HUES = _C_HUES_FROM_HTML;

  const _C_HUE_CHOOSERS = await _F_INTERACT_WITH_HTML_QUERY_SELECTOR_FROM(
    await _F_INTERACT_WITH_HTML_GET_ELEMENT_BY_ID("HUE_CHOOSERS"), 
    ".BUTTON"
  );

  _C_HUE_CHOOSERS.forEach(function(_I_HUE_CHOOSER, _I_) {
    _I_HUE_CHOOSER.style.setProperty("background-color", 'rgb(' + _C_HUES[_I_]["hue"] + ')');
    _I_ += 1;
  });

  if (await _F_LOCAL_STORAGE_GET("customization-saved") == 'false' || await _F_LOCAL_STORAGE_GET("hue") == null) {
    await _F_CUSTOMIZATION_CHANGE_HUE(0);
  }
}

// Генерация цветов кнопок выбора темы
async function _F_ON_LOAD_GENERATE_AND_SAVE_THEMES(_C_THEMES_FROM_HTML) {
  _L_THEMES = _C_THEMES_FROM_HTML;

  const _C_THEME_CHOOSERS = await _F_INTERACT_WITH_HTML_QUERY_SELECTOR_FROM(
    await _F_INTERACT_WITH_HTML_GET_ELEMENT_BY_ID("THEME_CHOOSERS"), 
    ".BUTTON"
  );

  _C_THEME_CHOOSERS.forEach(function(_I_THEME_CHOOSER, _I_) {
    _I_THEME_CHOOSER.style.setProperty("background-color", 'rgb(' + _C_THEMES[_I_]["solid"] + ')');
    _I_ += 1;
  });

  if (await _F_LOCAL_STORAGE_GET("customization-saved") == 'false' || await _F_LOCAL_STORAGE_GET("theme") == null) {
    await _F_CUSTOMIZATION_CHANGE_THEME(0);
  }
}

// ========================== [ INIT ] ==========================

// Инициализация
document.addEventListener('DOMContentLoaded', async function () {

  // Добавление ивентов и интервалов функциям 
  setInterval(_F_LOGO_UPDATE, 2000); 
  _F_LOGO_UPDATE()
  window.addEventListener("resize", _F_ON_EVENT_CHANGE_LAYOUT);
  window.addEventListener("resize", _F_ON_EVENT_FIX_MODIFIERS);
  window.addEventListener("orientationchange", _F_ON_EVENT_CHANGE_LAYOUT);
  window.addEventListener("orientationchange", _F_ON_EVENT_FIX_MODIFIERS);
  window.addEventListener("DOMContentLoaded", _F_ON_EVENT_FIX_MODIFIERS);
  window.addEventListener("DOMContentLoaded", _F_ON_EVENT_CHANGE_LAYOUT);
  window.addEventListener("DOMContentLoaded", _F_ON_LOAD_SETUP_HINTS);
  
  // Ставим при загрузке страницы значения в еще несуществующие переменные в памяти браузера
  if (await _F_LOCAL_STORAGE_GET("customization-saved") == null) { await _F_LOCAL_STORAGE_SET("customization-saved", "true");}
  if (await _F_LOCAL_STORAGE_GET("animations") == null) { await _F_LOCAL_STORAGE_SET("animations", "true");}
  if (await _F_LOCAL_STORAGE_GET("hints") == null) { await _F_LOCAL_STORAGE_SET("hints", "true");}
  if (await _F_LOCAL_STORAGE_GET("font-modifier") == null) { await _F_LOCAL_STORAGE_SET("font-modifier", 1);}
  if (await _F_LOCAL_STORAGE_GET("interface-modifier") == null) { await _F_LOCAL_STORAGE_SET("interface-modifier", 1);}
  if (await _F_LOCAL_STORAGE_GET("classes-parameter") == null) { await _F_LOCAL_STORAGE_SET("classes-parameter", "modern");}

  // Если сохранение тем есть, то загружаем, если нет - удаляем сохранения
  if (await _F_LOCAL_STORAGE_GET("customization-saved") == "true") {
    // Загрузка темы, если есть.
    if (await _F_LOCAL_STORAGE_GET("theme") != null) {
      await _F_CUSTOMIZATION_CHANGE_THEME(null, JSON.parse(await _F_LOCAL_STORAGE_GET("theme")));
    }
    // Загрузка оттенка, если есть.
    if (await _F_LOCAL_STORAGE_GET("hue") != null) {
      await _F_CUSTOMIZATION_CHANGE_HUE(null, JSON.parse(await _F_LOCAL_STORAGE_GET("hue")));
    }
  } else {
    localStorage.removeItem("theme");
    localStorage.removeItem("hue");
  }

  _F_INTERACT_WITH_HTML_OPEN_CLOSE_PAGES();

  const _C_UNLOADED_BLOCKS = await _F_INTERACT_WITH_HTML_QUERY_SELECTOR_FROM(document, ".UNLOADED");
  _C_UNLOADED_BLOCKS.forEach(_I_UNLOADED_BLOCK => {
    setTimeout(function () {
      _I_UNLOADED_BLOCK.classList.remove("UNLOADED");
    }, 10)
  });

  if (await _F_LOCAL_STORAGE_GET("classes-parameter") != null) {
    await _F_CUSTOMIZATION_CHANGE_CLASSES_FILE(await _F_LOCAL_STORAGE_GET("classes-parameter"));
  }
  if (await _F_LOCAL_STORAGE_GET("font-modifier") != null) {
    await _F_CUSTOMIZATION_CHANGE_FONT_MODIFIER(await _F_LOCAL_STORAGE_GET("font-modifier"));
  }
  if (await _F_LOCAL_STORAGE_GET("interface-modifier") != null) {
    await _F_CUSTOMIZATION_CHANGE_INTERFACE_MODIFIER(await _F_LOCAL_STORAGE_GET("interface-modifier"));
  }
  if (await _F_LOCAL_STORAGE_GET("customization-saved") != null) {
    await _F_SETTINGS_CHANGE_CUSTOMIZATION_SAVING(await _F_LOCAL_STORAGE_GET("customization-saved"));
  }
  if (await _F_LOCAL_STORAGE_GET("animations") != null) {
    await _F_SETTINGS_CHANGE_ANIMATIONS(await _F_LOCAL_STORAGE_GET("animations"));
  }
  if (await _F_LOCAL_STORAGE_GET("hints") != null) {
    await _F_SETTINGS_CHANGE_HINTS(await _F_LOCAL_STORAGE_GET("hints"));
  }

  // Завершение загрузки
  setTimeout(function () {
    const _C_LOADING_SCREEN = document.getElementById("LOADING_SCREEN");
    _C_LOADING_SCREEN.style.setProperty("opacity", "0");
  }, 100);
  setTimeout(function () {
    const _C_HINTS = document.querySelectorAll(".HINT");
    _C_HINTS.forEach(_I_HINT => {
      _I_HINT.style.setProperty("opacity", "0");
    });
  }, 1500);
});

// ========================== [ END ] ==========================

// ========================== [ TESTS ] ==========================