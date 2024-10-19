

/*.............................................................................
.                                  ИНФОРМАЦИЯ                                 .
.............................................................................*/
/*
! НАЧАЛО БЛОКА

* ФАЙЛ:  CORE.JS
* АВТОР:   Valikzant

* ОПИСАНИЕ
Ядро моего сайта.

! КОНЕЦ БЛОКА
*/
/*.............................................................................
.                                  СОГЛАШЕНИЯ                                 .
.............................................................................*/
/*
! НАЧАЛО БЛОКА

* НАЗНАЧЕНИЕ ТИПА ДЛЯ ПОСТОЯННО ИСПОЛЬЗУЕМЫХ ПЕРЕМЕННЫХ
V_ : Переменная      (Изменяется во время выполнения)
C_ : Константа       (Не изменяется во время выполнения)
D_ : Словарь         (Для хранения данных)
L_ : Список          (Для хранения данных)
S_ : Строка          (Хранит текст)
F_ : Функция         (Выполняет код)
I_ : Итератор цикла  (Для цикла)

* НАЗНАЧЕНИЕ ТИПА ДЛЯ ВРЕМЕННО ИСПОЛЬЗУЕМЫХ ПЕРЕМЕННЫХ
v_ : Переменная      (Изменяется во время выполнения)
c_ : Константа       (Не изменяется во время выполнения)
d_ : Словарь         (Для хранения данных)
l_ : Список          (Для хранения данных)
s_ : Строка          (Хранит текст)
f_ : Функция         (Выполняет код)
i_ : Итератор цикла  (Для цикла)

* НАИМЕНОВАНИЕ ПОСТОЯННО ИСПОЛЬЗУЕМЫХ ПЕРЕМЕННЫХ
V_NAME_HERE : Название

* НАИМЕНОВАНИЕ ВРЕМЕННО ИСПОЛЬЗУЕМЫХ ПЕРЕМЕННЫХ
v_NameHere : Название 

! КОНЕЦ БЛОКА
*/
/*.............................................................................
.                                  ПЕРЕМЕННЫЕ                                 .
.............................................................................*/
// ! НАЧАЛО БЛОКА

// Оттенки получат цвета при подключении скрипта
var L_HUES = []

// Темые получат цвета при подключении скрипта
var L_THEMES = []

// Модификаторы шрифта
const C_FONT_MODIFIERS = [
  {"font-modifier": 0.8}, 
  {"font-modifier": 1}, 
  {"font-modifier": 1.2}, 
  {"font-modifier": 1.4}
];

// Модификаторы интерфейса
const C_INTERFACE_MODIFIERS = [
  {"interface-modifier": 0.4}, 
  {"interface-modifier": 0.5}, 
  {"interface-modifier": 0.7}, 
  {"interface-modifier": 0.85}
];

// Символы Лого
const C_SYMBOLS = "☰ ☱ ☲ ☳ ☴ ☵ ☶ ☷".split(' ');

// Символы экрана загрузки
const C_LOADING_SYMBOLS = "- = ≡ ☰ ✓".split(' ');

// ! КОНЕЦ БЛОКА
/*.............................................................................
.                                    ФУНКЦИИ                                  .
.............................................................................*/
// ! НАЧАЛО БЛОКА

// [ INTERACTION WITH HTML ]

// Получение объекта по ID
async function F_INTERACT_WITH_HTML_GET_ELEMENT_BY_ID(c_ElementId) {
  return document.getElementById(c_ElementId);
}

// Получение объектов по классу
async function F_INTERACT_WITH_HTML_QUERY_SELECTOR_FROM(c_Element, c_Class) {
  return c_Element.querySelectorAll(c_Class);
}

// Выключение элемента по ID
async function F_INTERACT_WITH_HTML_DISABLE_ELEMENT_BY_ID(c_ElementId) {
  const c_Element = await F_INTERACT_WITH_HTML_GET_ELEMENT_BY_ID(c_ElementId);
  if (!c_Element.hasAttribute("disabled")) {
    c_Element.setAttribute("disabled", "");
  }
}

// Включение элемента по ID
async function F_INTERACT_WITH_HTML_ENABLE_ELEMENT_BY_ID(c_ElementId) {
  const c_Element = await F_INTERACT_WITH_HTML_GET_ELEMENT_BY_ID(c_ElementId);
  if (c_Element.hasAttribute("disabled")) {
    c_Element.removeAttribute("disabled");
  }
}

// Выключение кнопки по ID
async function F_INTERACT_WITH_HTML_DISABLE_BUTTON_BY_ID(c_ElementId) {
  const c_Element = await F_INTERACT_WITH_HTML_GET_ELEMENT_BY_ID(c_ElementId);
  if (c_Element.classList.contains("ACTIVE")) {
    c_Element.classList.remove("ACTIVE");
  }
}

// Активация кнопки по ID
async function F_INTERACT_WITH_HTML_ENABLE_BUTTON_BY_ID(c_ElementId) {
  const c_Element = await F_INTERACT_WITH_HTML_GET_ELEMENT_BY_ID(c_ElementId);
  if (!c_Element.classList.contains("ACTIVE")) {
    c_Element.classList.add("ACTIVE");
  }
}

// Скролл к элементу по ID
async function F_INTERACT_WITH_HTML_SCROLL_TO_ELEMENT_BY_ID(c_ElementId) {
  const c_Content = await F_INTERACT_WITH_HTML_GET_ELEMENT_BY_ID("CONTENT");
  const c_Element = await F_INTERACT_WITH_HTML_GET_ELEMENT_BY_ID(c_ElementId);
  setTimeout(() => {
    c_Element.scrollIntoView({ behavior: "auto", block: "start", inline: "nearest" });
    setTimeout(() => {
      c_Content.scrollBy(0, -15);
    }, 10);
    setTimeout(() => {
      c_Element.scrollIntoView({ behavior: "auto", block: "start", inline: "nearest" });
    }, 10);
    setTimeout(() => {
      c_Content.scrollBy(0, -15);
    }, 10);
  }, 10);
}

// Открытие и закрытие страниц по списку текущих страниц
async function F_INTERACT_WITH_HTML_OPEN_CLOSE_PAGES(c_PageId = null, c_SidebarButton = null) {
  const c_SidebarButtons = await F_INTERACT_WITH_HTML_QUERY_SELECTOR_FROM(document, ".SIDEBAR.BUTTON");
  if (c_SidebarButton != null) {
    c_SidebarButtons.forEach(i_Button => {
      if (i_Button == c_SidebarButton) {
        i_Button.classList.add("ACTIVE");
      } else {
        i_Button.classList.remove("ACTIVE");
      }
    })
  }
  const c_StoryPages = await F_INTERACT_WITH_HTML_QUERY_SELECTOR_FROM(document, ".PAGE");
  if (c_PageId == null) {
    c_StoryPages.forEach(i_Page => {
      if (i_Page.id == "start") {
        c_SidebarButtons[1].classList.add("ACTIVE");
        return;
      }
      i_Page.classList.add("CLOSED");
    });
  } else {
    c_StoryPages.forEach(i_Page => {
      if (i_Page.id == c_PageId) {
        i_Page.classList.remove("CLOSED");
        F_INTERACT_WITH_HTML_SCROLL_TO_ELEMENT_BY_ID(i_Page.id)
      } else {
        i_Page.classList.add("CLOSED");
      }
    });
  }
}

// [ LOCAL STORAGE ]

async function F_LOCAL_STORAGE_GET(c_Key) {
  return localStorage.getItem(c_Key);
}

async function F_LOCAL_STORAGE_SET(c_Key, c_Value) {
  localStorage.setItem(c_Key, c_Value);
}

// [ LOGO ]

// Обновление Логотипа
async function F_LOGO_UPDATE() {
  const c_ChangingSymbols = document.querySelectorAll('[id="LOGO_CHANGING_PART"]');
  c_ChangingSymbols.forEach((element) => {
    element.innerHTML = C_SYMBOLS[Math.floor(Math.random() * C_SYMBOLS.length)];
  });
}

// [ LOADING ]

// Последовательное отображение символов загрузки внутри окна #LOADING_SCREEN
async function F_LOADING_UPDATE() {
  const c_LoadingScreen = await F_INTERACT_WITH_HTML_GET_ELEMENT_BY_ID("LOADING_SCREEN");
  console.debug(c_LoadingScreen);
  console.debug('loading symbols: ', C_LOADING_SYMBOLS);
  for (let i = 0; i < C_LOADING_SYMBOLS.length; i++) {
    setTimeout(function () {
      c_LoadingScreen.innerHTML = '<h1>' + C_LOADING_SYMBOLS[i] + '</h1>';
    }, 150 * i);
  }
}

// [ CUSTOMIZATION CHANGE ]

// Изменение оттенка
async function F_CUSTOMIZATION_CHANGE_HUE(c_Hue = null, l_HuesLocal = null) {
  const c_Body = document.getElementById("body");
  if (c_Hue == null && l_HuesLocal != null) {
    c_Body.style.setProperty("--hue", l_HuesLocal["hue"]);
  } else if (c_Hue != null && l_HuesLocal == null) {
    c_Body.style.setProperty("--hue", L_HUES[c_Hue]["hue"]);
    await F_LOCAL_STORAGE_SET("hue", JSON.stringify(L_HUES[c_Hue]));
  }
}

// Изменение темы
async function F_CUSTOMIZATION_CHANGE_THEME(c_Theme = null, l_ThemesLocal = null) {
  const c_Body = document.getElementById("body");
  if (c_Theme == null && l_ThemesLocal != null) {
    c_Body.style.setProperty("--solid", l_ThemesLocal["solid"]);
    c_Body.style.setProperty("--light-shadow", l_ThemesLocal["light-shadow"]);
    c_Body.style.setProperty("--dark-shadow", l_ThemesLocal["dark-shadow"]);
    c_Body.style.setProperty("--text", l_ThemesLocal["text"]);
  } else if (c_Theme != null && l_ThemesLocal == null) {
    c_Body.style.setProperty("--solid", L_THEMES[c_Theme]["solid"]);
    c_Body.style.setProperty("--light-shadow", L_THEMES[c_Theme]["light-shadow"]);
    c_Body.style.setProperty("--dark-shadow", L_THEMES[c_Theme]["dark-shadow"]);
    c_Body.style.setProperty("--text", L_THEMES[c_Theme]["text"]);
    await F_LOCAL_STORAGE_SET("theme", JSON.stringify(L_THEMES[c_Theme]));
  }
}

// Изменение модификатора шрифта
async function F_CUSTOMIZATION_CHANGE_FONT_MODIFIER(c_FontModifier) {
  const c_Body = document.getElementById("body");
  c_Body.style.setProperty("--font-modifier", C_FONT_MODIFIERS[c_FontModifier]["font-modifier"]);
  await F_LOCAL_STORAGE_SET("font-modifier", c_FontModifier);

  const c_FontSizeChoosers = await F_INTERACT_WITH_HTML_QUERY_SELECTOR_FROM(
    await F_INTERACT_WITH_HTML_GET_ELEMENT_BY_ID("FONT_SIZE_CHOOSERS"),
    ".BUTTON"
  );
  c_FontSizeChoosers.forEach(i_FontSizeChooser => {
    i_FontSizeChooser.classList.remove("ACTIVE");
  });
  c_FontSizeChoosers[c_FontModifier].classList.add("ACTIVE");  
}

// Изменение модификатора интерфейса
async function F_CUSTOMIZATION_CHANGE_INTERFACE_MODIFIER(c_InterfaceModifier) {
  const c_Body = document.getElementById("body");
  c_Body.style.setProperty("--interface-modifier", C_INTERFACE_MODIFIERS[c_InterfaceModifier]["interface-modifier"]);
  await F_LOCAL_STORAGE_SET("interface-modifier", c_InterfaceModifier);

  const c_InterfaceSizeChoosers = await F_INTERACT_WITH_HTML_QUERY_SELECTOR_FROM(
    await F_INTERACT_WITH_HTML_GET_ELEMENT_BY_ID("INTERFACE_SIZE_CHOOSERS"),
    ".BUTTON"
  );
  c_InterfaceSizeChoosers.forEach(i_InterfaceSizeChooser => {
    i_InterfaceSizeChooser.classList.remove("ACTIVE");
  });
  c_InterfaceSizeChoosers[c_InterfaceModifier].classList.add("ACTIVE");
}

// Изменения css
async function F_CUSTOMIZATION_CHANGE_CLASSES_FILE(c_CssFilesParameter) {
  const c_ClassesFileLink = await F_INTERACT_WITH_HTML_GET_ELEMENT_BY_ID("ELEMENTS_STYLE_CSS_FILE");
  const c_TextBlocksFileLink = await F_INTERACT_WITH_HTML_GET_ELEMENT_BY_ID("TEXT_BLOCKS_CSS_FILE");

  F_INTERACT_WITH_HTML_DISABLE_BUTTON_BY_ID("CLASSES_STYLE_CHOOSER_MODERN");
  F_INTERACT_WITH_HTML_DISABLE_BUTTON_BY_ID("CLASSES_STYLE_CHOOSER_SIMPLE");
  F_INTERACT_WITH_HTML_DISABLE_BUTTON_BY_ID("CLASSES_STYLE_CHOOSER_MINIMAL");
  F_INTERACT_WITH_HTML_DISABLE_BUTTON_BY_ID("CLASSES_STYLE_CHOOSER_LEGACY");

  if (c_CssFilesParameter == "modern") {
    F_INTERACT_WITH_HTML_ENABLE_BUTTON_BY_ID("CLASSES_STYLE_CHOOSER_MODERN");
  } else if (c_CssFilesParameter == "simple") {
    F_INTERACT_WITH_HTML_ENABLE_BUTTON_BY_ID("CLASSES_STYLE_CHOOSER_SIMPLE");
  } else if (c_CssFilesParameter == "minimal") {
    F_INTERACT_WITH_HTML_ENABLE_BUTTON_BY_ID("CLASSES_STYLE_CHOOSER_MINIMAL");
  } else if (c_CssFilesParameter == "legacy") {
    F_INTERACT_WITH_HTML_ENABLE_BUTTON_BY_ID("CLASSES_STYLE_CHOOSER_LEGACY");
  }
  
  if (c_ClassesFileLink != null) {
    const c_ClassesFileLinkHref = c_ClassesFileLink.getAttribute("href");
    const c_ClassesFileLinkHrefParts = c_ClassesFileLinkHref.split('/');
    const c_ClassesFileNameWithParams = c_ClassesFileLinkHrefParts[c_ClassesFileLinkHrefParts.length - 1];
    const [c_ClassesFileName, c_ClassesFileParams] = c_ClassesFileNameWithParams.split('?');
    const c_ClassesNewFileName = `ELEMENTS_STYLE_${c_CssFilesParameter}.css`;
    c_ClassesFileLinkHrefParts[c_ClassesFileLinkHrefParts.length - 1] = c_ClassesFileParams ? `${c_ClassesNewFileName}?${c_ClassesFileParams}` : c_ClassesNewFileName;
    const c_ClassesFileLinkHrefNew = c_ClassesFileLinkHrefParts.join('/');
    c_ClassesFileLink.setAttribute('href', c_ClassesFileLinkHrefNew);
  }

  if (c_TextBlocksFileLink != null) {
    const c_TextBlocksFileLinkHref = c_TextBlocksFileLink.getAttribute("href");
    const c_TextBlocksFileLinkHrefParts = c_TextBlocksFileLinkHref.split('/');
    const c_TextBlocksFileNameWithParams = c_TextBlocksFileLinkHrefParts[c_TextBlocksFileLinkHrefParts.length - 1];
    const [c_TextBlocksFileName, c_TextBlocksFileParams] = c_TextBlocksFileNameWithParams.split('?');
    const c_TextBlocksNewFileName = `TEXT_SECTIONS_${c_CssFilesParameter}.css`;
    c_TextBlocksFileLinkHrefParts[c_TextBlocksFileLinkHrefParts.length - 1] = c_TextBlocksFileParams ? `${c_TextBlocksNewFileName}?${c_TextBlocksFileParams}` : c_TextBlocksNewFileName;
    const c_TextBlocksFileLinkHrefNew = c_TextBlocksFileLinkHrefParts.join('/');
    c_TextBlocksFileLink.setAttribute('href', c_TextBlocksFileLinkHrefNew);
  }

  F_LOCAL_STORAGE_SET("classes-parameter", c_CssFilesParameter);
}


// [ SETTINGS CHANGE ]

// Включение/Отключение сохранения кастомизации
async function F_SETTINGS_CHANGE_CUSTOMIZATION_SAVING(c_Mode) {
  if (c_Mode == "true") {
    await F_LOCAL_STORAGE_SET("customization-saved", "true");
    await F_INTERACT_WITH_HTML_ENABLE_BUTTON_BY_ID("CUSTOMIZATION_SAVING_CHOOSER_ON");
    await F_INTERACT_WITH_HTML_DISABLE_BUTTON_BY_ID("CUSTOMIZATION_SAVING_CHOOSER_OFF");
  } else {
    await F_LOCAL_STORAGE_SET("customization-saved", "false");
    await F_INTERACT_WITH_HTML_ENABLE_BUTTON_BY_ID("CUSTOMIZATION_SAVING_CHOOSER_OFF");
    await F_INTERACT_WITH_HTML_DISABLE_BUTTON_BY_ID("CUSTOMIZATION_SAVING_CHOOSER_ON");
  }
}

// Включение/Отключение анимаций 
async function F_SETTINGS_CHANGE_ANIMATIONS(c_Mode) {
  const c_Body = document.getElementById("body");
  if (c_Mode == "true") {
    await F_LOCAL_STORAGE_SET("animations", "true");
    await F_INTERACT_WITH_HTML_ENABLE_BUTTON_BY_ID("ANIMATION_TOGGLE_CHOOSER_ON");
    await F_INTERACT_WITH_HTML_DISABLE_BUTTON_BY_ID("ANIMATION_TOGGLE_CHOOSER_OFF");
    c_Body.style.setProperty("--transition-fast", "0.5s cubic-bezier(0.165, 0.84, 0.44, 1)");
    c_Body.style.setProperty("--transition-slow", '2s cubic-bezier(.11,.86,.59,.97)');
    c_Body.style.setProperty("--transition-long", '10s cubic-bezier(.32,.17,.5,1.07)');
  } else {
    await F_LOCAL_STORAGE_SET("animations", "false");
    await F_INTERACT_WITH_HTML_ENABLE_BUTTON_BY_ID("ANIMATION_TOGGLE_CHOOSER_OFF");
    await F_INTERACT_WITH_HTML_DISABLE_BUTTON_BY_ID("ANIMATION_TOGGLE_CHOOSER_ON");
    c_Body.style.setProperty("--transition-fast", 'none');
    c_Body.style.setProperty("--transition-slow", 'none');
    c_Body.style.setProperty("--transition-long", 'none');
  }
}

// Включение/Отключение подсказок
async function F_SETTINGS_CHANGE_HINTS(c_Mode) {
  if (c_Mode == "true") {
    await F_LOCAL_STORAGE_SET("hints", "true");
    await F_INTERACT_WITH_HTML_ENABLE_BUTTON_BY_ID("HINT_TOGGLE_CHOOSER_ON");
    await F_INTERACT_WITH_HTML_DISABLE_BUTTON_BY_ID("HINT_TOGGLE_CHOOSER_OFF");
  } else {
    await F_LOCAL_STORAGE_SET("hints", "false");
    await F_INTERACT_WITH_HTML_ENABLE_BUTTON_BY_ID("HINT_TOGGLE_CHOOSER_OFF");
    await F_INTERACT_WITH_HTML_DISABLE_BUTTON_BY_ID("HINT_TOGGLE_CHOOSER_ON");
  }
}

// [ TOGGLE WINDOWS ]

// CONTENT
async function F_TOGGLE_WINDOW_CONTENT() {
  const c_Content = await F_INTERACT_WITH_HTML_GET_ELEMENT_BY_ID("CONTENT");
  c_Content.classList.toggle('HIDDEN');

  const c_Blocks = await F_INTERACT_WITH_HTML_QUERY_SELECTOR_FROM(document, ".BLOCK");
  c_Blocks.forEach(i_Block => {
    if (i_Block.id == "THEMES" || i_Block.id == "SETTINGS" || i_Block.id == "AUTHOR") {
      if (!i_Block.classList.contains('HIDDEN')) {
        i_Block.classList.toggle('HIDDEN');
      }
    }

    if (i_Block.id == "CONTENT") {
      if (i_Block.classList.contains('HIDDEN')) {
        i_Block.classList.toggle('HIDDEN');
      }
    }
  });
}

// THEMES 
async function F_TOGGLE_WINDOW_THEMES() {
  const c_Themes = await F_INTERACT_WITH_HTML_GET_ELEMENT_BY_ID("THEMES");
  c_Themes.classList.toggle('HIDDEN');

  const c_Blocks = await F_INTERACT_WITH_HTML_QUERY_SELECTOR_FROM(document, ".BLOCK");
  c_Blocks.forEach(i_Block => {
    if (i_Block.id == "CONTENT" || i_Block.id == "SETTINGS" || i_Block.id == "AUTHOR") {
      if (!i_Block.classList.contains('HIDDEN')) {
        i_Block.classList.toggle('HIDDEN');
      }
    }

    if (i_Block.id == "THEMES") {
      if (i_Block.classList.contains('HIDDEN')) {
        i_Block.classList.toggle('HIDDEN');
      }
    }
  });
}

// SETTINGS
async function F_TOGGLE_WINDOW_SETTINGS() {
  const c_Settings = await F_INTERACT_WITH_HTML_GET_ELEMENT_BY_ID("SETTINGS");
  c_Settings.classList.toggle('HIDDEN');

  const c_Blocks = await F_INTERACT_WITH_HTML_QUERY_SELECTOR_FROM(document, ".BLOCK");
  c_Blocks.forEach(i_Block => {
    if (i_Block.id == "CONTENT" || i_Block.id == "THEMES" || i_Block.id == "AUTHOR") {
      if (!i_Block.classList.contains('HIDDEN')) {
        i_Block.classList.toggle('HIDDEN');
      }
    }

    if (i_Block.id == "SETTINGS") {
      if (i_Block.classList.contains('HIDDEN')) {
        i_Block.classList.toggle('HIDDEN');
      }
    } 
  });
}

// AUTHOR
async function F_TOGGLE_WINDOW_AUTHOR() {
  const c_Author = await F_INTERACT_WITH_HTML_GET_ELEMENT_BY_ID("AUTHOR");
  c_Author.classList.toggle('HIDDEN');

  const c_Blocks = await F_INTERACT_WITH_HTML_QUERY_SELECTOR_FROM(document, ".BLOCK");
  c_Blocks.forEach(i_Block => {
    if (i_Block.id == "CONTENT" || i_Block.id == "THEMES" || i_Block.id == "SETTINGS") {
      if (!i_Block.classList.contains('HIDDEN')) {
        i_Block.classList.toggle('HIDDEN');
      }
    }

    if (i_Block.id == "AUTHOR") {
      if (i_Block.classList.contains('HIDDEN')) {
        i_Block.classList.toggle('HIDDEN');
      }
    }
  });
}

// [ ON EVENT ]

// Показать подсказку
async function F_ON_EVENT_SHOW_TOOLTIP(event) {
  const c_ToolTip = await F_INTERACT_WITH_HTML_GET_ELEMENT_BY_ID("TOOLTIP_HELP");
  const c_TooltipText = event.target.getAttribute("data-tooltip");
  c_ToolTip.innerHTML = "<p>" + c_TooltipText + "</p>";

  const { clientX: c_MouseX, clientY: c_MouseY } = event;
  const { innerWidth: c_ViewPortWidth, innerHeight: c_ViewPortHeight } = window;
  
  const c_ToolTipX = (c_MouseX + 200 > c_ViewPortWidth) ? c_MouseX - 100 : c_MouseX;
  const c_ToolTipY = (c_MouseY + 200 > c_ViewPortHeight) ? c_MouseY - 100 : c_MouseY;

  c_ToolTip.style.top = c_ToolTipY + "px";
  c_ToolTip.style.left = c_ToolTipX + "px";

  c_ToolTip.style.display = "block";
}

// Скрыть подсказку
async function F_ON_EVENT_HIDE_TOOLTIP() {
  const c_ToolTip = await F_INTERACT_WITH_HTML_GET_ELEMENT_BY_ID("TOOLTIP_HELP");
  c_ToolTip.style.display = "none";
}

// Изменение Layout
async function F_ON_EVENT_CHANGE_LAYOUT(C_FORCE = null) {
  const c_SideBar = document.getElementById("SIDEBAR");
  if (c_SideBar == null) { return; }
  const c_Body = document.getElementById("body");
  if (C_FORCE == "desktop" || window.innerWidth > 768) {
    c_Body.style.setProperty("grid-template-rows", "auto 1fr auto");
    c_Body.style.setProperty("grid-template-areas", '"H H" "S C" "S С"');
    await F_INTERACT_WITH_HTML_ENABLE_BUTTON_BY_ID("LAYOUT_CHOOSER_DESKTOP");
    await F_INTERACT_WITH_HTML_DISABLE_BUTTON_BY_ID("LAYOUT_CHOOSER_MOBILE");
    c_SideBar.style.setProperty("flex-direction", "column");
  } else {
    c_Body.style.setProperty("grid-template-rows", "auto auto 1fr auto");
    c_Body.style.setProperty("grid-template-areas", '"H H" "S S" "C C" "C C"');
    await F_INTERACT_WITH_HTML_ENABLE_BUTTON_BY_ID("LAYOUT_CHOOSER_MOBILE");
    await F_INTERACT_WITH_HTML_DISABLE_BUTTON_BY_ID("LAYOUT_CHOOSER_DESKTOP");
    c_SideBar.style.setProperty("flex-direction", "row");
  }
}

// Починка несовместимых размеру экрана модификаторов
async function F_ON_EVENT_FIX_MODIFIERS() {

  const c_WindowWidth = window.innerWidth;

  if (c_WindowWidth >= 768) {
    await F_INTERACT_WITH_HTML_ENABLE_ELEMENT_BY_ID("INTERFACE_SIZE_CHOOSER_SMALL");
    await F_INTERACT_WITH_HTML_ENABLE_ELEMENT_BY_ID("INTERFACE_SIZE_CHOOSER_MEDIUM");
    return;
  }

  if (c_WindowWidth < 768 && c_WindowWidth >= 600) { // 768
    if (await F_LOCAL_STORAGE_GET("interface-modifier") == 0) {
      await F_CUSTOMIZATION_CHANGE_INTERFACE_MODIFIER(1);    
    }

    await F_INTERACT_WITH_HTML_DISABLE_ELEMENT_BY_ID("INTERFACE_SIZE_CHOOSER_SMALL");

    await F_INTERACT_WITH_HTML_ENABLE_ELEMENT_BY_ID("FONT_SIZE_CHOOSER_SMALL");
    await F_INTERACT_WITH_HTML_ENABLE_ELEMENT_BY_ID("INTERFACE_SIZE_CHOOSER_MEDIUM");
  } else if (c_WindowWidth < 600 && c_WindowWidth >= 0) { // 600
    if (await F_LOCAL_STORAGE_GET("interface-modifier") == 1) {
      await F_CUSTOMIZATION_CHANGE_INTERFACE_MODIFIER(2);    
    }

    await F_INTERACT_WITH_HTML_DISABLE_ELEMENT_BY_ID("INTERFACE_SIZE_CHOOSER_SMALL");
    await F_INTERACT_WITH_HTML_DISABLE_ELEMENT_BY_ID("INTERFACE_SIZE_CHOOSER_MEDIUM");
  }
}

// [ ON LOAD ]

// Настройка подсказок
async function F_ON_LOAD_SETUP_HINTS() {
  const c_HelpButtons = await F_INTERACT_WITH_HTML_QUERY_SELECTOR_FROM(
    document, 
    ".BUTTON_HELP , .BUTTON.SIDEBAR"
  )
  const c_HelpHints = await F_INTERACT_WITH_HTML_QUERY_SELECTOR_FROM(
    document, 
    ".HINT"
  )

  if (await F_LOCAL_STORAGE_GET("hints") == "false") {
    c_HelpButtons.forEach(i_Button => {
      if (i_Button.classList.contains("SIDEBAR")) { return; }
      i_Button.style.display = "none";
    });
    c_HelpHints.forEach(i_Hint => {
      i_Hint.style.display = "none";
    });
  }

  c_HelpButtons.forEach(i_Button => {
    i_Button.addEventListener("mouseenter", F_ON_EVENT_SHOW_TOOLTIP);
    i_Button.addEventListener("mouseleave", F_ON_EVENT_HIDE_TOOLTIP);
  });
}

// Генерация цветов кнопок смены оттенков
async function F_ON_LOAD_GENERATE_AND_SAVE_HUES(c_HuesFromHtml) {
  L_HUES = c_HuesFromHtml;

  const c_HueChoosers = await F_INTERACT_WITH_HTML_QUERY_SELECTOR_FROM(
    await F_INTERACT_WITH_HTML_GET_ELEMENT_BY_ID("HUE_CHOOSERS"), 
    ".BUTTON"
  );

  c_HueChoosers.forEach(function(i_HueChooser, I_) {
    i_HueChooser.style.setProperty("background-color", 'rgb(' + C_HUES[I_]["hue"] + ')');
    I_ += 1;
  });

  if (await F_LOCAL_STORAGE_GET("customization-saved") == 'false' || await F_LOCAL_STORAGE_GET("hue") == null) {
    await F_CUSTOMIZATION_CHANGE_HUE(0);
  }
}

// Генерация цветов кнопок выбора темы
async function F_ON_LOAD_GENERATE_AND_SAVE_THEMES(C_THEMES_FROM_HTML) {
  L_THEMES = C_THEMES_FROM_HTML;

  const c_ThemeChoosers = await F_INTERACT_WITH_HTML_QUERY_SELECTOR_FROM(
    await F_INTERACT_WITH_HTML_GET_ELEMENT_BY_ID("THEME_CHOOSERS"), 
    ".BUTTON"
  );

  c_ThemeChoosers.forEach(function(i_ThemeChooser, I_) {
    i_ThemeChooser.style.setProperty("background-color", 'rgb(' + C_THEMES[I_]["solid"] + ')');
    I_ += 1;
  });

  if (await F_LOCAL_STORAGE_GET("customization-saved") == 'false' || await F_LOCAL_STORAGE_GET("theme") == null) {
    await F_CUSTOMIZATION_CHANGE_THEME(0);
  }
}

// ! КОНЕЦ БЛОКА
/*.............................................................................
.                               ИНИЦИАЛИЗАЦИЯ                                 .
.............................................................................*/
// ! НАЧАЛО БЛОКА

// Инициализация
document.addEventListener('DOMContentLoaded', async function () {

  // Добавление ивентов и интервалов функциям 
  setInterval(F_LOGO_UPDATE, 2000); 
  F_LOGO_UPDATE()
  F_LOADING_UPDATE()
  window.addEventListener("resize", F_ON_EVENT_CHANGE_LAYOUT);
  window.addEventListener("resize", F_ON_EVENT_FIX_MODIFIERS);
  window.addEventListener("orientationchange", F_ON_EVENT_CHANGE_LAYOUT);
  window.addEventListener("orientationchange", F_ON_EVENT_FIX_MODIFIERS);
  window.addEventListener("DOMContentLoaded", F_ON_EVENT_FIX_MODIFIERS);
  window.addEventListener("DOMContentLoaded", F_ON_EVENT_CHANGE_LAYOUT);
  window.addEventListener("DOMContentLoaded", F_ON_LOAD_SETUP_HINTS);
  
  // Ставим при загрузке страницы значения в еще несуществующие переменные в памяти браузера
  if (await F_LOCAL_STORAGE_GET("customization-saved") == null) { await F_LOCAL_STORAGE_SET("customization-saved", "true");}
  if (await F_LOCAL_STORAGE_GET("animations") == null) { await F_LOCAL_STORAGE_SET("animations", "true");}
  if (await F_LOCAL_STORAGE_GET("hints") == null) { await F_LOCAL_STORAGE_SET("hints", "true");}
  if (await F_LOCAL_STORAGE_GET("font-modifier") == null) { await F_LOCAL_STORAGE_SET("font-modifier", 1);}
  if (await F_LOCAL_STORAGE_GET("interface-modifier") == null) { await F_LOCAL_STORAGE_SET("interface-modifier", 1);}
  if (await F_LOCAL_STORAGE_GET("classes-parameter") == null) { await F_LOCAL_STORAGE_SET("classes-parameter", "modern");}

  // Если сохранение тем есть, то загружаем, если нет - удаляем сохранения
  if (await F_LOCAL_STORAGE_GET("customization-saved") == "true") {
    // Загрузка темы, если есть.
    if (await F_LOCAL_STORAGE_GET("theme") != null) {
      await F_CUSTOMIZATION_CHANGE_THEME(null, JSON.parse(await F_LOCAL_STORAGE_GET("theme")));
    }
    // Загрузка оттенка, если есть.
    if (await F_LOCAL_STORAGE_GET("hue") != null) {
      await F_CUSTOMIZATION_CHANGE_HUE(null, JSON.parse(await F_LOCAL_STORAGE_GET("hue")));
    }
  } else {
    localStorage.removeItem("theme");
    localStorage.removeItem("hue");
  }

  F_INTERACT_WITH_HTML_OPEN_CLOSE_PAGES();

  if (await F_LOCAL_STORAGE_GET("classes-parameter") != null) {
    await F_CUSTOMIZATION_CHANGE_CLASSES_FILE(await F_LOCAL_STORAGE_GET("classes-parameter"));
  }
  if (await F_LOCAL_STORAGE_GET("font-modifier") != null) {
    await F_CUSTOMIZATION_CHANGE_FONT_MODIFIER(await F_LOCAL_STORAGE_GET("font-modifier"));
  }
  if (await F_LOCAL_STORAGE_GET("interface-modifier") != null) {
    await F_CUSTOMIZATION_CHANGE_INTERFACE_MODIFIER(await F_LOCAL_STORAGE_GET("interface-modifier"));
  }
  if (await F_LOCAL_STORAGE_GET("customization-saved") != null) {
    await F_SETTINGS_CHANGE_CUSTOMIZATION_SAVING(await F_LOCAL_STORAGE_GET("customization-saved"));
  }
  if (await F_LOCAL_STORAGE_GET("animations") != null) {
    await F_SETTINGS_CHANGE_ANIMATIONS(await F_LOCAL_STORAGE_GET("animations"));
  }
  if (await F_LOCAL_STORAGE_GET("hints") != null) {
    await F_SETTINGS_CHANGE_HINTS(await F_LOCAL_STORAGE_GET("hints"));
  }

  // Завершение загрузки
  setTimeout(function () {
    const c_LoadingScreen = document.getElementById("LOADING_SCREEN");
    c_LoadingScreen.style.setProperty("opacity", "0");
  }, 700);
  setTimeout(function () {
    const c_Hints = document.querySelectorAll(".HINT");
    c_Hints.forEach(i_Hint => {
      i_Hint.style.setProperty("opacity", "0");
    });
  }, 1500);

  const c_UnloadedBlocks = await F_INTERACT_WITH_HTML_QUERY_SELECTOR_FROM(document, ".UNLOADED");
  c_UnloadedBlocks.forEach(i_UnloadedBlock => {
    setTimeout(function () {
      i_UnloadedBlock.classList.remove("UNLOADED");
    }, 100)
  });

});

// ! КОНЕЦ БЛОКА