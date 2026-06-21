document.addEventListener("DOMContentLoaded", () => {
  // Cleaned up variable selectors for your native HTML elements
  const headerNode = document.getElementById("headerText");
  const subtitleNode = document.getElementById("subtitleText");
  const loadingText = document.getElementById("loadingText");
  const siteFooter = document.getElementById("siteFooter");
  const passwordScreen = document.getElementById("passwordScreen");

  let topWindowZ = 200;

  function bringToFront(win) {
    if (!win) return;

    topWindowZ += 1;
    win.style.setProperty("z-index", topWindowZ, "important");
  }

  function openWindow(win) {
    if (!win) return;

    win.classList.add("active");
    bringToFront(win);
  }

  function registerWindowFocus(win) {
    if (!win) return;

    /* win.addEventListener("mousedown", () => { */
    win.addEventListener(
      "pointerdown",
      () => {
        bringToFront(win);
      },
      true,
    );
  }

  const header1_Text = "JASMINE OF THE ROSE®";
  const header2_Text = "薔薇の茉莉®";

  const sub1_HTML =
    "Welcome to Jasmine Rose’s Portfolio Website<br>Version 2.13";
  const sub1_Shadow =
    "Welcome to Jasmine Rose’s Portfolio Website\nVersion 2.13";

  const sub2_HTML = "茉莉ローズのポートフォリオ･サイトにようこそ〜<br>ver.2.13";
  const sub2_Shadow = "茉莉ローズのポートフォリオ･サイトにようこそ〜\nver.2.13";

  let isFirstState = true;

  function runGlobalGlitch() {
    if (!headerNode || !subtitleNode) return;

    headerNode.classList.add("glitching");
    subtitleNode.classList.add("glitching");

    // --- TIMING TUNER 1: TEXT SWAP SPEED ---
    // Current Original: 800 (0.8 seconds)
    // Recommended Fast: 300 (0.3 seconds)
    setTimeout(() => {
      headerNode.innerText = isFirstState ? header2_Text : header1_Text;
      headerNode.setAttribute(
        "data-text",
        isFirstState ? header2_Text : header1_Text,
      );

      subtitleNode.innerHTML = isFirstState ? sub2_HTML : sub1_HTML;
      subtitleNode.setAttribute(
        "data-text",
        isFirstState ? sub2_Shadow : sub1_Shadow,
      );

      isFirstState = !isFirstState;
    }, 800);

    // --- TIMING TUNER 2: TOTAL GLITCH DURATION ---
    // Current Original: 1500 (1.5 seconds) -> [Set style.css to 1.5s]
    // Recommended Fast: 600  (0.6 seconds) -> [Set style.css to 0.6s]
    setTimeout(() => {
      headerNode.classList.remove("glitching");
      subtitleNode.classList.remove("glitching");
    }, 1500);
  }

  let glitchInterval;

  // --- TIMING TUNER 3: FIRST LOAD DELAY & LOOP GAP ---
  // 3850: When the first glitch hits after page entry (3.85 seconds) --2500
  // 5500: How long the text sits cleanly before repeating (5.5 seconds) --4500
  setTimeout(() => {
    runGlobalGlitch();
    glitchInterval = setInterval(runGlobalGlitch, 4500);
  }, 2500);

  function moveLoadingText() {
    if (!loadingText) return;
    const x = Math.random() * 80 + 5;
    const y = Math.random() * 75 + 5;
    loadingText.style.left = x + "vw";
    loadingText.style.top = y + "vh";
  }

  let dots = 3;

  function animateLoadingDots() {
    if (!loadingText) return;
    dots = (dots + 1) % 4;
    loadingText.textContent = "Loading" + ".".repeat(dots);
  }

  // --- TIMING TUNER 4: MATRIX BACKGROUND TEXT ---
  // 1800: Wait 1.8s to show the floating loading text layer -- 1450
  // 12000: Randomly teleport text coordinates every 12 seconds -- 4500 -- 3000
  // 500: Animate the typing loading dots every half-second
  setTimeout(() => {
    if (loadingText) {
      loadingText.style.opacity = "1";
      moveLoadingText();
    }
    setInterval(moveLoadingText, 3000);
    setInterval(animateLoadingDots, 500);
  }, 1450);

  let loginScreenShown = false;
  let interactionDetected = false;

  function showPasswordScreen() {
    if (loginScreenShown) return;
    loginScreenShown = true;

    window.removeEventListener("mousemove", triggerEarlyLoginScreen);
    window.removeEventListener("click", triggerEarlyLoginScreen);
    window.removeEventListener("touchstart", triggerEarlyLoginScreen);

    if (loadingText) loadingText.style.opacity = "0";
    if (siteFooter) siteFooter.classList.add("hidden");
    if (passwordScreen) passwordScreen.classList.add("active");

    // --- TIMING TUNER 5: WINDOW POPUP WAIT - 1st Hint Popup Box ---
    // Current Original: 6000 (6 seconds) --3750 --> 3300 --> 3000
    // Recommended Fast: 1500 (1.5 seconds)
    setTimeout(() => {
      openHintPopup();
    }, 3000);
  }

  // --- TIMING TUNER 6: SECURITY SCREEN GATEWAY ---
  // 13000: Auto-load login if user stays completely idle for 13 seconds --8000
  // 6000: Wait 6 seconds to trigger login if user interacts (moves/clicks) --1450 -- 1650
  // [Recommended Early Interaction Fast: 1000 (1 second)]
  const defaultLoginTimer = setTimeout(showPasswordScreen, 8000);

  function triggerEarlyLoginScreen() {
    if (interactionDetected || loginScreenShown) return;
    interactionDetected = true;
    clearTimeout(defaultLoginTimer);
    setTimeout(showPasswordScreen, 1450);
  }

  // --- POPUP OBJECT DEFINITIONS ---
  const hintPopup = document.getElementById("hintPopup");
  const hintYesButton = document.getElementById("hintYesButton");
  const hintNoButton = document.getElementById("hintNoButton");
  const hintCloseButton = document.getElementById("hintCloseButton");

  const surePopup = document.getElementById("surePopup");
  const sureYesButton = document.getElementById("sureYesButton");
  const sureNoButton = document.getElementById("sureNoButton");
  const sureCloseButton = document.getElementById("sureCloseButton");

  function openHintPopup() {
    if (hintPopup) hintPopup.classList.add("active");
  }

  function closeHintPopup() {
    if (hintPopup) hintPopup.classList.remove("active");
  }

  function openSurePopup() {
    if (surePopup) surePopup.classList.add("active");
  }

  function closeSurePopup() {
    if (surePopup) surePopup.classList.remove("active");
  }

  // --- INTERACTIVE BUTTON EVENT LISTENERS ---
  if (hintYesButton) {
    hintYesButton.addEventListener("click", () => {
      closeHintPopup();
      alert("Password Hint:\n\nType anything, Diva");
    });
  }

  // --- TIMING TUNER 7: RETRO WINDOW DIALOG TRANSITIONS - Confirmation Popup ---
  // Current Original: 4000 (4 seconds) before shifting boxes --1750 --> 650xx
  // Recommended Fast: 500  (0.5 seconds) for a snappy desktop feel
  if (hintNoButton) {
    hintNoButton.addEventListener("click", () => {
      closeHintPopup();
      setTimeout(openSurePopup, 500);
    });
  }

  if (hintCloseButton) {
    hintCloseButton.addEventListener("click", () => {
      closeHintPopup();
      setTimeout(openSurePopup, 500);
    });
  }

  if (sureYesButton) {
    sureYesButton.addEventListener("click", closeSurePopup);
  }

  if (sureNoButton) {
    sureNoButton.addEventListener("click", () => {
      closeSurePopup();
      if (hintPopup) {
        hintPopup.style.transform = "none";
        hintPopup.style.left = "62%";
        hintPopup.style.top = "58%";
      }
      setTimeout(openHintPopup, 250);
    });
  }

  if (sureCloseButton) {
    sureCloseButton.addEventListener("click", closeSurePopup);
  }

  // --- WINDOW DRAGGING ENGINE ---
  if (hintPopup) makeDraggable(hintPopup);
  if (surePopup) makeDraggable(surePopup);

  function makeDraggable(popup) {
    const titleBar = popup.querySelector(".hint-popup-title");
    if (!titleBar) return;

    let dragging = false;
    let offsetX = 0;
    let offsetY = 0;

    titleBar.addEventListener("mousedown", (e) => {
      // If a user clicks a close button inside the title bar, do not drag.
      if (
        e.target.tagName === "BUTTON" ||
        e.target.classList.contains("hint-close-button")
      )
        return;

      e.preventDefault();
      e.stopPropagation();

      dragging = true;
      const rect = popup.getBoundingClientRect();
      offsetX = e.clientX - rect.left;
      offsetY = e.clientY - rect.top;

      // Use !important because the folder window has top/left set with !important in CSS.
      popup.style.setProperty("transform", "none", "important");
      popup.style.setProperty("left", rect.left + "px", "important");
      popup.style.setProperty("top", rect.top + "px", "important");
    });

    window.addEventListener("mousemove", (e) => {
      if (!dragging) return;

      popup.style.setProperty("left", e.clientX - offsetX + "px", "important");
      popup.style.setProperty("top", e.clientY - offsetY + "px", "important");
    });

    window.addEventListener("mouseup", () => {
      dragging = false;
    });
  }

  // --- LIFECYCLE MONITORING LISTENERS ---
  window.addEventListener("mousemove", triggerEarlyLoginScreen);
  window.addEventListener("click", triggerEarlyLoginScreen);
  window.addEventListener("touchstart", triggerEarlyLoginScreen);

  // --- ACCESS KEY VALIDATION SYSTEM ---
  const desktopScreen = document.getElementById("desktopScreen");
  const passwordInput = document.querySelector(".password-input");
  const enterButton = document.querySelector(".login-button");

  function enterDesktop() {
    if (!passwordInput) return;
    const passwordValue = passwordInput.value.trim();

    if (passwordValue.length < 1) {
      alert("Please type something first, Diva.");
      return;
    }

    clearInterval(glitchInterval);

    const glitchContainer = document.querySelector(".glitch-container");
    if (glitchContainer) glitchContainer.style.display = "none";
    if (loadingText) loadingText.style.display = "none";
    if (siteFooter) siteFooter.style.display = "none";

    closeHintPopup();
    closeSurePopup();

    if (passwordScreen) passwordScreen.classList.remove("active");
    if (desktopScreen) desktopScreen.classList.add("active");

    // --- TASKBAR SYSTEM ENGINE ---
    const sysClock = document.getElementById("sysClock");
    const sysBattery = document.getElementById("sysBattery");
    const startBtn = document.getElementById("startButton");

    // 1. Live Military Clock Monitor (Updates every 1000ms)
    function runSystemClock() {
      const now = new Date();
      const hrs = String(now.getHours()).padStart(2, "0");
      const mins = String(now.getMinutes()).padStart(2, "0");
      const secs = String(now.getSeconds()).padStart(2, "0");

      if (sysClock) {
        sysClock.textContent = `${hrs}:${mins}:${secs}`;
      }
    }
    setInterval(runSystemClock, 1000);
    runSystemClock(); // Render time step instantly on startup

    // 2. Hardware Battery Integration API Routine
    if (sysBattery && navigator.getBattery) {
      navigator.getBattery().then((battery) => {
        function updateBatteryDisplay() {
          const level = Math.round(battery.level * 100);
          // Swaps matching status icon parameters based on power readings
          const icon = battery.charging ? "🔌" : "🔋";
          sysBattery.textContent = `${icon} ${level}%`;
        }
        updateBatteryDisplay();
        // Invisible listeners update numbers if the user plugs in their machine live
        battery.addEventListener("levelchange", updateBatteryDisplay);
        battery.addEventListener("chargingchange", updateBatteryDisplay);
      });
    }

    // 3. Start Menu Core Application Dialog Handler
    /*if (startBtn) {
    startBtn.addEventListener("click", () => {
      alert("DIANA OS • System Menu Initialized!\n\nWelcome back, Diva.");
    });
  }--- IGNORE --- */
  }

  if (new URLSearchParams(window.location.search).get("desktop") === "1") {
    loginScreenShown = true;
    clearTimeout(defaultLoginTimer);
    window.removeEventListener("mousemove", triggerEarlyLoginScreen);
    window.removeEventListener("click", triggerEarlyLoginScreen);
    window.removeEventListener("touchstart", triggerEarlyLoginScreen);
    if (passwordInput) passwordInput.value = "desktop";
    enterDesktop();
    window.history.replaceState({}, "", "index.html");
  }

  if (enterButton) {
    enterButton.addEventListener("click", enterDesktop);
  }

  if (passwordInput) {
    passwordInput.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        enterDesktop();
      }
    });
  }

  // --- RETRO SAFETY LOCK CLICK SYSTEM ---
  // Grabs any desktop icon that carries your 'disabled' class name
  const disabledIcons = document.querySelectorAll(".desktop-icon.disabled");

  disabledIcons.forEach((icon) => {
    // Intercepts any click event and completely kills it so nothing triggers
    icon.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      return false;
    });
  });

  // --- RETRO START MENU TOGGLE INTERACTION ENGINE ---
  const startBtn = document.getElementById("startButton");
  const startMenu = document.getElementById("startMenu");

  if (startBtn && startMenu) {
    // 1. Toggles open/close state when user clicks the primary taskbar Start button
    startBtn.addEventListener("click", (e) => {
      e.stopPropagation(); // Prevents wallpaper backdrop listeners from instantly re-closing it
      startMenu.classList.toggle("open");

      const taskbar = document.querySelector(".taskbar");

      if (startMenu.classList.contains("open")) {
        taskbar.classList.add("menu-on-top");
        bringToFront(startMenu);
      } else {
        taskbar.classList.remove("menu-on-top");
      }
    });

    // 2. Automatically hides the pop-up panel list if a user clicks outside onto the wallpaper screen
    document.addEventListener("click", (e) => {
      if (!startMenu.contains(e.target) && e.target !== startBtn) {
        startMenu.classList.remove("open");
        const taskbar = document.querySelector(".taskbar");
        if (taskbar) {
          taskbar.classList.remove("menu-on-top");
        }
      }
    });
  }

  // --- GRAPHIC DESIGN DIRECTORY WINDOW ENGINE ---
  const designTrigger = document.getElementById("graphicDesignTrigger");
  const desktopGraphicDesign = document.getElementById("desktopGraphicDesign");
  const designWindow = document.getElementById("graphicDesignWindow");
  const closeDesignBtn = document.getElementById("closeDesignWindowBtn");

  const lightbox = document.getElementById("imageLightbox");
  const enlargedImg = document.getElementById("enlargedImage");
  const closeLightboxBtn = document.getElementById("closeLightboxBtn");
  const prevLightboxBtn = document.getElementById("prevLightboxBtn");
  const nextLightboxBtn = document.getElementById("nextLightboxBtn");
  let thumbs = Array.from(document.querySelectorAll(".thumb"));
  let currentLightboxIndex = 0;

  function setDesignWindowStatus() {
    if (!designWindow) return;

    const itemsCount = designWindow.querySelectorAll(".portfolio-item").length;
    const statusField = document.getElementById("designStatusField");

    if (statusField) {
      statusField.textContent = `${itemsCount} object(s)`;
    }
  }

  function resetDesignWindowPosition() {
    if (!designWindow) return;

    designWindow.style.setProperty("top", "70px", "important");
    designWindow.style.setProperty("left", "calc(50% + 40px)", "important");
    designWindow.style.setProperty("width", "520px", "important");
    designWindow.style.setProperty("height", "380px", "important");
    designWindow.style.transform = "none";
  }

  function openGraphicDesignFolder() {
    if (!designWindow) return;

    const wasAlreadyOpen = designWindow.classList.contains("active");

    if (!wasAlreadyOpen) {
      resetDesignWindowPosition();
    }

    designWindow.classList.add("active");
    bringToFront(designWindow);
    setDesignWindowStatus();

    if (startMenu) {
      startMenu.classList.remove("open");
    }
  }

  if (designTrigger) {
    designTrigger.addEventListener("click", openGraphicDesignFolder);
  }

  if (desktopGraphicDesign) {
    desktopGraphicDesign.addEventListener("click", openGraphicDesignFolder);
  }

  // Close the Window Folder
  if (closeDesignBtn && designWindow) {
    closeDesignBtn.addEventListener("click", () => {
      designWindow.classList.remove("active");
    });
  }

  // Thumbnail Gallery Magnification / Carousel Engine
  function showLightboxImage(index) {
    if (!lightbox || !enlargedImg || thumbs.length === 0) return;

    currentLightboxIndex = (index + thumbs.length) % thumbs.length;

    enlargedImg.src =
      thumbs[currentLightboxIndex].dataset?.full ||
      thumbs[currentLightboxIndex].src;

    enlargedImg.alt = thumbs[currentLightboxIndex].alt || "Portfolio image";

    lightbox.classList.add("active");
    bringToFront(lightbox);
  }

  function closeLightbox() {
    if (lightbox) {
      lightbox.classList.remove("active");
    }

    if (prevLightboxBtn) {
      prevLightboxBtn.style.display = "";
    }

    if (nextLightboxBtn) {
      nextLightboxBtn.style.display = "";
    }
  }

  function showPreviousImage() {
    showLightboxImage(currentLightboxIndex - 1);
  }

  function showNextImage() {
    showLightboxImage(currentLightboxIndex + 1);
  }

  const designThumbs = Array.from(designWindow.querySelectorAll(".thumb"));

  designThumbs.forEach((img, index) => {
    img.addEventListener("click", () => {
      showLightboxImageFromList(designThumbs, index);
    });
  });

  if (prevLightboxBtn) {
    prevLightboxBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      showPreviousImage();
    });
  }

  if (nextLightboxBtn) {
    nextLightboxBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      showNextImage();
    });
  }

  if (closeLightboxBtn) {
    closeLightboxBtn.addEventListener("click", closeLightbox);
  }

  if (lightbox) {
    lightbox.addEventListener("click", (e) => {
      if (e.target === lightbox) closeLightbox();
    });
  }

  document.addEventListener("keydown", (e) => {
    if (!lightbox || !lightbox.classList.contains("active")) return;

    if (e.key === "Escape") {
      closeLightbox();
    }

    if (e.key === "ArrowLeft") {
      showPreviousImage();
    }

    if (e.key === "ArrowRight") {
      showNextImage();
    }
  });

  function showLightboxImageFromList(imageList, index) {
    if (!lightbox || !enlargedImg || imageList.length === 0) return;

    thumbs.length = 0;
    imageList.forEach((img) => thumbs.push(img));

    showLightboxImage(index);
  }

  function showSingleImageLightbox(img) {
    if (prevLightboxBtn) {
      prevLightboxBtn.style.display = "flex";
    }

    if (nextLightboxBtn) {
      nextLightboxBtn.style.display = "flex";
    }

    enlargedImg.src = img.dataset.full || img.src;
    enlargedImg.alt = img.alt || "";

    lightbox.classList.add("active");
    bringToFront(lightbox);
  }

  /* --- Portraits WINDOW & LIGHTBOX --- */

  const desktopPortraits = document.getElementById("desktopPortraits");
  const portraitsWindow = document.getElementById("portraitsWindow");
  const closePortraitsWindowBtn = document.getElementById(
    "closePortraitsWindowBtn",
  );
  /* const portraitThumbs = Array.from(document.querySelectorAll(".portrait-thumb")); */
  const portraitThumbs = Array.from(portraitsWindow.querySelectorAll(".thumb"));

  function resetPortraitsWindowPosition() {
    portraitsWindow.style.setProperty("top", "70px", "important");

    portraitsWindow.style.setProperty("left", "120px", "important");

    portraitsWindow.style.setProperty("width", "520px", "important");

    portraitsWindow.style.setProperty("height", "380px", "important");

    portraitsWindow.style.transform = "none";
  }

  /*
function openPortraitsFolder() {
  if (!portraitsWindow) return;

  portraitsWindow.classList.add("active");

  const statusField = document.getElementById("portraitsStatusField");
  if (statusField) {
    statusField.textContent = `${portraitThumbs.length} object(s)`;
  }
} 
*/

  function openPortraitsFolder() {
    if (!portraitsWindow) return;

    const wasAlreadyOpen = portraitsWindow.classList.contains("active");

    if (!wasAlreadyOpen) {
      resetPortraitsWindowPosition();
    }

    portraitsWindow.classList.add("active");
    bringToFront(portraitsWindow);

    const statusField = document.getElementById("portraitsStatusField");

    if (statusField) {
      statusField.textContent = `${portraitThumbs.length} object(s)`;
    }
  }

  if (desktopPortraits) {
    desktopPortraits.addEventListener("click", openPortraitsFolder);
  }

  if (closePortraitsWindowBtn) {
    closePortraitsWindowBtn.addEventListener("click", () => {
      portraitsWindow.classList.remove("active");
    });
  }

  const portraitsMenuTrigger = document.getElementById("portraitsMenuTrigger");

  if (portraitsMenuTrigger) {
    portraitsMenuTrigger.addEventListener("click", openPortraitsFolder);
  }

  portraitThumbs.forEach((img, index) => {
    img.addEventListener("click", () => {
      showLightboxImageFromList(portraitThumbs, index);
    });
  });

  if (portraitsWindow && typeof makeDraggable === "function") {
    makeDraggable(portraitsWindow);
  }

  if (portraitsWindow && typeof makeResizable === "function") {
    makeResizable(portraitsWindow);
  }

  // Connect the folder window into your existing drag-and-drop mechanics
  if (designWindow && typeof makeDraggable === "function") {
    makeDraggable(designWindow);
  }

  // --- FINAL BULLETPROOF RETRO EDGE-RESIZING INFRASTRUCTURE ---
  makeResizable(document.getElementById("graphicDesignWindow"));

  function makeResizable(win) {
    if (!win) return;

    const handles = win.querySelectorAll(".win-resizer");
    let isResizing = false;
    let currentHandle = null;

    let startWidth, startHeight, startX, startY, startLeft, startTop;
    const minW = 280;
    const minH = 200;

    handles.forEach((handle) => {
      handle.addEventListener("mousedown", (e) => {
        e.preventDefault();
        e.stopPropagation(); // Double-guarantees drag-and-drop code won't clash!

        isResizing = true;
        currentHandle = handle;

        // Grab precise active layout metrics right from the screen canvas
        const rect = win.getBoundingClientRect();
        startWidth = rect.width;
        startHeight = rect.height;
        startLeft = rect.left;
        startTop = rect.top;
        startX = e.clientX;
        startY = e.clientY;

        window.addEventListener("mousemove", handleResize);
        window.addEventListener("mouseup", stopResize);
      });
    });

    function handleResize(e) {
      if (!isResizing) return;

      const diffX = e.clientX - startX;
      const diffY = e.clientY - startY;

      // 1. Handling Left Side Sizing Dynamics (Adjusts width AND moves coordinates)
      if (
        currentHandle.classList.contains("win-resizer-l") ||
        currentHandle.classList.contains("win-resizer-bl")
      ) {
        const targetWidth = startWidth - diffX;
        if (targetWidth > minW) {
          win.style.setProperty("width", targetWidth + "px", "important");
          win.style.setProperty("left", startLeft + diffX + "px", "important");
        }
      }

      // 2. Handling Right Side Sizing Dynamics
      if (
        currentHandle.classList.contains("win-resizer-r") ||
        currentHandle.classList.contains("win-resizer-br")
      ) {
        const targetWidth = startWidth + diffX;
        if (targetWidth > minW) {
          win.style.setProperty("width", targetWidth + "px", "important");
        }
      }

      // 3. Handling Bottom / Vertical Length Sizing Dynamics
      if (
        currentHandle.classList.contains("win-resizer-b") ||
        currentHandle.classList.contains("win-resizer-bl") ||
        currentHandle.classList.contains("win-resizer-br")
      ) {
        const targetHeight = startHeight + diffY;
        if (targetHeight > minH) {
          win.style.setProperty("height", targetHeight + "px", "important");
        }
      }
    }

    function stopResize() {
      isResizing = false;
      window.removeEventListener("mousemove", handleResize);
      window.removeEventListener("mouseup", stopResize);
    }
  }

  const galleryCollections = [];

  function fileNameFromPath(path) {
    return decodeURIComponent(path.split("/").pop() || "image");
  }

  function buildResizers() {
    return `
      <div class="win-resizer win-resizer-l"></div>
      <div class="win-resizer win-resizer-r"></div>
      <div class="win-resizer win-resizer-b"></div>
      <div class="win-resizer win-resizer-bl"></div>
      <div class="win-resizer win-resizer-br"></div>
    `;
  }

  function registerExistingGalleryFolder({
    title,
    win,
    triggers = [],
    closeButton,
    statusField,
    left = "120px",
    top = "70px",
    width = "520px",
    height = "380px",
    resetOnOpen = true,
  }) {
    if (!win) return [];

    const folderThumbs = Array.from(win.querySelectorAll(".thumb"));
    galleryCollections.push({ title, thumbs: folderThumbs });

    function updateStatus() {
      if (statusField) {
        statusField.textContent = `${folderThumbs.length} object(s)`;
      }
    }

    function resetWindowPosition() {
      win.style.setProperty("left", left, "important");
      win.style.setProperty("top", top, "important");
      win.style.setProperty("width", width, "important");
      win.style.setProperty("height", height, "important");
      win.style.transform = "none";
    }

    function openGalleryFolder() {
      if (resetOnOpen && !win.classList.contains("active")) {
        resetWindowPosition();
      }

      updateStatus();
      openWindow(win);

      if (startMenu) {
        startMenu.classList.remove("open");
      }
    }

    triggers.forEach((trigger) => {
      trigger?.addEventListener("click", openGalleryFolder);
    });

    closeButton?.addEventListener("click", () => {
      win.classList.remove("active");
    });

    folderThumbs.forEach((img, index) => {
      img.addEventListener("click", () => {
        showLightboxImageFromList(folderThumbs, index);
      });
    });

    makeDraggable(win);
    makeResizable(win);
    registerWindowFocus(win);
    updateStatus();

    return folderThumbs;
  }

  function createGalleryWindow({
    id,
    title,
    images,
    left,
    top,
    triggers = [],
  }) {
    if (!desktopScreen) return null;

    const win = document.createElement("div");
    win.id = id;
    win.className = "hint-popup design-window-folder generated-gallery-window";
    win.style.setProperty("left", left, "important");
    win.style.setProperty("top", top, "important");
    win.style.setProperty("width", "520px", "important");
    win.style.setProperty("height", "380px", "important");
    win.style.transform = "none";

    const gridItems = images
      .map((image) => {
        const name = image.name || fileNameFromPath(image.full);
        return `
          <div class="portfolio-item">
            <img
              src="${image.thumb}"
              data-full="${image.full}"
              alt="${name}"
              class="thumb"
              loading="lazy"
            />
            <span class="file-name">${name}</span>
          </div>
        `;
      })
      .join("");

    win.innerHTML = `
      <div class="hint-popup-title">
        <span>${title}</span>
        <button class="hint-close-button" type="button">×</button>
      </div>
      ${buildResizers()}
      <div class="window-folder-body">
        <div class="portfolio-grid">${gridItems}</div>
      </div>
      <div class="window-status-bar">
        <div class="status-field">Calculating...</div>
      </div>
    `;

    desktopScreen.appendChild(win);

    const closeButton = win.querySelector(".hint-close-button");
    const statusField = win.querySelector(".status-field");

    registerExistingGalleryFolder({
      title: title.replace("C:\\", ""),
      win,
      triggers,
      closeButton,
      statusField,
      left,
      top,
    });

    return win;
  }

  const photographyImages = [
    {
      thumb: "images/thumbs/Vivi_Conomi_Doll.webp",
      full: "images/full/Vivi_Conomi_Doll.webp",
      name: "Vivi_Conomi_Doll.webp",
    },
    {
      thumb: "images/thumbs/Vivi_Conomi_Hanabi_Remix.webp",
      full: "images/full/Vivi_Conomi_Hanabi_Remix.webp",
      name: "Vivi_Conomi_Hanabi_Remix.webp",
    },
    {
      thumb: "images/thumbs/Vivi_Conomi_Spotify_AP.webp",
      full: "images/full/Vivi_Conomi_Spotify_AP.webp",
      name: "Vivi_Conomi_Spotify_Artist_Page.webp",
    },
    {
      thumb: "images/thumbs/Vivi_Conomi_Toumei_Suspend_02.jpg",
      full: "images/full/Vivi_Conomi_Toumei_Suspend_02.jpg",
      name: "Vivi_Conomi_Toumei_Suspend_02.jpg",
    },
    {
      thumb: "images/thumbs/Vivi_Conomi_Toumei_Suspend_01.webp",
      full: "images/full/Vivi_Conomi_Toumei_Suspend_01.webp",
      name: "Vivi_Conomi_Toumei_Suspend_01.webp",
    },
    {
      thumb: "images/thumbs/Vivi_Conomi_01.webp",
      full: "images/full/Vivi_Conomi_01.webp",
      name: "Vivi_Conomi_01.webp",
    },
    {
      thumb: "images/thumbs/Vivi_Conomi_02.webp",
      full: "images/full/Vivi_Conomi_02.webp",
      name: "Vivi_Conomi_02.webp",
    },
  ];

  const billboardImages = [
    {
      thumb: "images/thumbs/parkhouse_nagoya_01.webp",
      full: "images/full/parkhouse_nagoya_01.webp",
      name: "parkhouse_nagoya_01.webp",
    },
    {
      thumb: "images/full/Shibuya_Scramble_Square_01.webp",
      full: "images/full/Shibuya_Scramble_Square_01.webp",
      name: "Shibuya_Scramble_Square_01.webp",
    },
    {
      thumb: "images/full/Shibuya_Scramble_Square_02.webp",
      full: "images/full/Shibuya_Scramble_Square_02.webp",
      name: "Shibuya_Scramble_Square_02.webp",
    },
    {
      thumb: "images/full/Shibuya_Scramble_Square_03.webp",
      full: "images/full/Shibuya_Scramble_Square_03.webp",
      name: "Shibuya_Scramble_Square_03.webp",
    },
    {
      thumb: "images/full/Shibuya_Scramble_Square_04.webp",
      full: "images/full/Shibuya_Scramble_Square_04.webp",
      name: "Shibuya_Scramble_Square_04.webp",
    },
  ];

  const cmImages = [
    {
      thumb: "images/full/Shibuya_Scramble_Square_UC_KV.jpeg",
      full: "images/full/Shibuya_Scramble_Square_UC_KV.jpeg",
      name: "Shibuya_Scramble_Square_UC_KV.jpeg",
    },
    {
      thumb: "images/full/渋西デッキ_4.jpeg",
      full: "images/full/渋西デッキ_4.jpeg",
      name: "渋西デッキ_4.jpeg",
    },
    {
      thumb: "images/full渋西デッキ_2.jpeg",
      full: "images/full/渋西デッキ_2.jpeg",
      name: "渋西デッキ_2.jpeg",
    },
  ];
  /* COME BACK TO THIS LATER!!*/
  const videographyImages = [
    {
      thumb: "images/thumbs/5R_Bii_01.webp",
      full: "images/full/5R_Bii_01.webp",
      name: "5R_Bii_01.webp",
    },
    {
      thumb: "images/thumbs/5R_Bii_02.webp",
      full: "images/full/5R_Bii_02.jpg",
      name: "5R_Bii_02.jpg",
    },
    {
      thumb: "images/thumbs/Vivi_Conomi_Doll.webp",
      full: "images/full/Vivi_Conomi_Doll.webp",
      name: "Vivi_Conomi_Doll.webp",
    },
  ];

  const tvcmImages = [
    {
      thumb: "images/thumbs/Picnic_Atelier_会May.webp",
      full: "images/full/Picnic_Atelier_会May.webp",
      name: "Picnic_Atelier_会May.webp",
    },
    {
      thumb: "images/thumbs/Picnic_Atelier_会June.webp",
      full: "images/full/Picnic_Atelier_会June.webp",
      name: "Picnic_Atelier_会June.webp",
    },
    {
      thumb: "images/thumbs/Picnic_Atelier_デモ.webp",
      full: "images/full/Picnic_Atelier_デモ.webp",
      name: "Picnic_Atelier_demo.webp",
    },
  ];

  const dramaImages = [
    {
      thumb: "images/thumbs/PASHASTYLE_WhimsicalWisteria1.webp",
      full: "images/full/PASHASTYLE_WhimsicalWisteria1.jpg",
      name: "PASHASTYLE_WhimsicalWisteria1.jpg",
    },
    {
      thumb: "images/thumbs/PASHASTYLE_WhimsicalWisteria2.webp",
      full: "images/full/PASHASTYLE_WhimsicalWisteria2.jpg",
      name: "PASHASTYLE_WhimsicalWisteria2.jpg",
    },
    {
      thumb: "images/thumbs/PASHASTYLE_WhimsicalWisteria3.webp",
      full: "images/full/PASHASTYLE_WhimsicalWisteria3.jpg",
      name: "PASHASTYLE_WhimsicalWisteria3.jpg",
    },
  ];
  /* */
  createGalleryWindow({
    id: "photographyWindow",
    title: "C:\\Camera\\Photography",
    images: photographyImages,
    left: "130px",
    top: "90px",
    triggers: [
      document.getElementById("desktopPhotography"),
      document.getElementById("photographyMenuTrigger"),
    ],
  });

  createGalleryWindow({
    id: "billboardsWindow",
    title: "C:\\Model\\Billboards",
    images: billboardImages,
    left: "160px",
    top: "120px",
    triggers: [document.getElementById("desktopBillboards")],
  });

  createGalleryWindow({
    id: "cmsWindow",
    title: "C:\\Video\\CMs",
    images: cmImages,
    left: "190px",
    top: "150px",
    triggers: [document.getElementById("desktopCMs")],
  });

  createGalleryWindow({
    id: "videographyWindow",
    title: "C:\\Camera\\Videography",
    images: videographyImages,
    left: "220px",
    top: "180px",
    triggers: [document.getElementById("videographyMenuTrigger")],
  });

  createGalleryWindow({
    id: "tvcmWindow",
    title: "C:\\Video\\TVCM_PV_MV",
    images: tvcmImages,
    left: "250px",
    top: "110px",
    triggers: [document.getElementById("tvcmMenuTrigger")],
  });

  createGalleryWindow({
    id: "dramaWindow",
    title: "C:\\Video\\Drama_Movie",
    images: dramaImages,
    left: "280px",
    top: "140px",
    triggers: [document.getElementById("dramaMenuTrigger")],
  });

  const findMeTrigger = document.getElementById("findMeTrigger");
  const socialIcons = document.getElementById("socialIcons");
  const socialIconsColumnM2 = document.getElementById("socialIconsColumnM2");
  const socialIconsColumnM3 = document.getElementById("socialIconsColumnM3");
  const mapWindow = document.getElementById("mapWindow");
  const closeMapWindowBtn = document.getElementById("closeMapWindowBtn");

  if (findMeTrigger) {
    findMeTrigger.addEventListener("click", () => {
      if (socialIcons) {
        setTimeout(() => {
          socialIcons.classList.add("active");
        }, 150);
      }

      if (socialIconsColumnM2) {
        setTimeout(() => {
          socialIconsColumnM2.classList.add("active");
        }, 350);
      }

      if (socialIconsColumnM3) {
        setTimeout(() => {
          socialIconsColumnM3.classList.add("active");
        }, 550);
      }

      if (mapWindow) {
        mapWindow.classList.add("active");
        bringToFront(mapWindow);
      }
    });
  }

  if (closeMapWindowBtn && mapWindow) {
    closeMapWindowBtn.addEventListener("click", () => {
      mapWindow.classList.remove("active");
    });
  }

  if (mapWindow && typeof makeDraggable === "function") {
    makeDraggable(mapWindow);
  }

  const contactTrigger = document.getElementById("contactTrigger");
  const contactMenuTrigger = document.getElementById("contactMenuTrigger");

  const contactWindow = document.getElementById("contactWindow");

  const closeContactWindowBtn = document.getElementById(
    "closeContactWindowBtn",
  );

  const sendEmailBtn = document.getElementById("sendEmailBtn");

  function openContactWindow() {
    if (!contactWindow) return;
    contactWindow.classList.add("active");
    bringToFront(contactWindow);
    if (startMenu) startMenu.classList.remove("open");
    document.querySelector(".taskbar")?.classList.remove("menu-on-top");
  }

  contactTrigger?.addEventListener("click", openContactWindow);
  contactMenuTrigger?.addEventListener("click", openContactWindow);

  if (closeContactWindowBtn) {
    closeContactWindowBtn.addEventListener("click", () => {
      contactWindow.classList.remove("active");
    });
  }

  if (sendEmailBtn) {
    sendEmailBtn.addEventListener("click", () => {
      const subject = document.getElementById("contactSubject").value;

      const message = document.getElementById("contactMessage").value;

      window.location.href = `mailto:jasminerosetv@gmail.com?subject=${encodeURIComponent(
        subject,
      )}&body=${encodeURIComponent(message)}`;
    });
  }

  if (contactWindow && typeof makeDraggable === "function") {
    makeDraggable(contactWindow);
  }

  /* =========================================================
     PRINT — Start Menu "Print" opens 3 windows:
       1) Folder  -> thumbnail grid, click a thumb to open the
                     shared lightbox (arrow keys + Escape work
                     automatically, handled globally above).
       2) Magazine -> page-flip viewer, click a page to enlarge
                      it in the same shared lightbox.
       3) Catalog  -> same page-flip viewer as Magazine, just a
                      separate window/image set.
     ========================================================= */
  const printMenuTrigger = document.getElementById("printMenuTrigger");

  // A page image matching this path is treated as a blank spacer
  // and skipped when building the lightbox image list.
  const FILLER_IMAGE = "images/full/blank-image-filler2.png";

  /* ---------- 1) Folder window: thumbnail grid + lightbox ---------- */
  const printFolderWindow = document.getElementById("printFolderWindow");
  const closePrintFolderBtn = document.getElementById("closePrintFolderBtn");
  const printThumbs = Array.from(printFolderWindow.querySelectorAll(".thumb"));

  printThumbs.forEach((img, index) => {
    img.addEventListener("click", () => {
      showLightboxImageFromList(printThumbs, index);
    });
  });

  const printItems = document.querySelectorAll(
    "#printFolderWindow .portfolio-item",
  );
  const printStatusField = document.getElementById("printStatusField");

  if (printStatusField) {
    printStatusField.textContent = `${printItems.length} item(s)`;
  }

  closePrintFolderBtn?.addEventListener("click", () => {
    printFolderWindow.classList.remove("active");
  });

  makeDraggable(printFolderWindow);
  makeResizable(printFolderWindow);
  registerWindowFocus(printFolderWindow);

  /* ---------- Shared helper: page-flip viewer logic ----------
     Used by both the Magazine and Catalog windows below.
     `pages` entries are either:
       - ["left.jpg", "right.jpg"]  -> a 2-page spread
       - "fullpage.jpg"             -> a single full-bleed page
  ------------------------------------------------------------ */
  function showFlipPage(pages, index, pageEl, leftImg, rightImg) {
    const safeIndex = (index + pages.length) % pages.length;
    const page = pages[safeIndex];

    pageEl.classList.remove("flip");
    void pageEl.offsetWidth; // restart the CSS animation
    pageEl.classList.add("flip");

    if (Array.isArray(page)) {
      leftImg.src = page[0];
      rightImg.src = page[1];

      leftImg.style.display = "block";
      rightImg.style.display = "block";

      leftImg.style.width = "50%";
      rightImg.style.width = "50%";

      leftImg.style.objectFit = "cover";
      rightImg.style.objectFit = "cover";
    } else {
      leftImg.src = page;
      rightImg.style.display = "none";

      leftImg.style.display = "block";
      leftImg.style.width = "100%";
      leftImg.style.objectFit = "contain";
    }

    return safeIndex;
  }

  function buildLightboxListFromPages(pages) {
    const list = [];

    pages.forEach((page) => {
      const entries = Array.isArray(page) ? page : [page];

      entries.forEach((src) => {
        if (src === FILLER_IMAGE) return;
        list.push({ src });
      });
    });

    return list;
  }

  function openPageImageLightbox(clickedImg, pages) {
    if (!clickedImg || !clickedImg.src) return;

    const lightboxImages = buildLightboxListFromPages(pages);

    thumbs.length = 0;
    lightboxImages.forEach((img) => thumbs.push(img));

    currentLightboxIndex = thumbs.findIndex((img) =>
      clickedImg.src.includes(img.src),
    );
    if (currentLightboxIndex < 0) currentLightboxIndex = 0;

    if (prevLightboxBtn) prevLightboxBtn.style.display = "flex";
    if (nextLightboxBtn) nextLightboxBtn.style.display = "flex";

    showLightboxImage(currentLightboxIndex);
  }

  /* ---------- 2) Magazine window: page-flip + lightbox ---------- */
  const printMagazineWindow = document.getElementById("printMagazineWindow");
  const closePrintMagazineBtn = document.getElementById(
    "closePrintMagazineBtn",
  );
  const magazinePrevBtn = document.getElementById("magazinePrevBtn");
  const magazineNextBtn = document.getElementById("magazineNextBtn");
  const magazinePage = document.getElementById("magazinePage");
  const leftPageImage = document.getElementById("leftPageImage");
  const rightPageImage = document.getElementById("rightPageImage");

  // TODO: swap these for your own magazine spreads/pages.
  const magazinePages = [
    [
      "images/full/blank-image-filler2.png",
      "images/full/garb-seibu-crea-03.jpg",
    ],
    [
      "images/full/garb-seibu-crea-01.jpg",
      "images/full/garb-seibu-crea-02.jpg",
    ],
    "images/full/garb-seibu-crea-full.webp",
    [
      "images/full/blank-image-filler2.png",
      "images/full/JIMNYSTYLE_Vol10_cover.webp",
    ],
    "images/full/JIMNYSTYLE_Vol10_P004-P005.webp",
    "images/full/JIMNYSTYLE_Vol10_P006-P007.webp",
    /*
    "images/full/prince_tennis_21ss_apparelws.webp",
    [
      "images/full/prince_tennis_21ss_apparel15.webp",
      "images/full/prince_tennis_21ss_apparel10.webp",
    ],
    [
      "images/full/prince_tennis_21ss_apparel02.webp",
      "images/full/blank-image-filler2.png",
    ],
    */
    ["images/full/blank-image-filler2.png", "images/full/GOETHE_cover.webp"],
    ["images/full/GOETHE_01.webp", "images/full/GOETHE_02.webp"],
  ];

  let magazineIndex = 0;

  function showMagazinePage(index) {
    magazineIndex = showFlipPage(
      magazinePages,
      index,
      magazinePage,
      leftPageImage,
      rightPageImage,
    );
  }

  magazinePrevBtn?.addEventListener("click", () => {
    showMagazinePage(magazineIndex - 1);
  });

  magazineNextBtn?.addEventListener("click", () => {
    showMagazinePage(magazineIndex + 1);
  });

  leftPageImage?.addEventListener("click", () => {
    openPageImageLightbox(leftPageImage, magazinePages);
  });

  rightPageImage?.addEventListener("click", () => {
    openPageImageLightbox(rightPageImage, magazinePages);
  });

  closePrintMagazineBtn?.addEventListener("click", () => {
    printMagazineWindow.classList.remove("active");
  });

  makeDraggable(printMagazineWindow);
  makeResizable(printMagazineWindow);
  registerWindowFocus(printMagazineWindow);

  /* ---------- 3) Catalog window: page-flip + lightbox ---------- */
  const printCatalogWindow = document.getElementById("printCatalogWindow");
  const closePrintCatalogBtn = document.getElementById("closePrintCatalogBtn");
  const catalogPrevBtn = document.getElementById("catalogPrevBtn");
  const catalogNextBtn = document.getElementById("catalogNextBtn");
  const catalogPage = document.getElementById("catalogPage");
  const leftCatalogPageImage = document.getElementById("leftCatalogPageImage");
  const rightCatalogPageImage = document.getElementById(
    "rightCatalogPageImage",
  );

  // TODO: swap these for your own catalog spreads/pages (same format as magazinePages above).
  const catalogPages = [
    ["images/full/blank-image-filler2.png", "images/full/DrStretch_Box.webp"],
    "images/full/prince_tennis_21ss_apparelws.webp",
    [
      "images/full/prince_tennis_21ss_apparel15.webp",
      "images/full/prince_tennis_21ss_apparel10.webp",
    ],
  ];

  let catalogIndex = 0;

  function showCatalogPage(index) {
    catalogIndex = showFlipPage(
      catalogPages,
      index,
      catalogPage,
      leftCatalogPageImage,
      rightCatalogPageImage,
    );
  }

  catalogPrevBtn?.addEventListener("click", () => {
    showCatalogPage(catalogIndex - 1);
  });

  catalogNextBtn?.addEventListener("click", () => {
    showCatalogPage(catalogIndex + 1);
  });

  leftCatalogPageImage?.addEventListener("click", () => {
    openPageImageLightbox(leftCatalogPageImage, catalogPages);
  });

  rightCatalogPageImage?.addEventListener("click", () => {
    openPageImageLightbox(rightCatalogPageImage, catalogPages);
  });

  closePrintCatalogBtn?.addEventListener("click", () => {
    printCatalogWindow.classList.remove("active");
  });

  makeDraggable(printCatalogWindow);
  makeResizable(printCatalogWindow);
  registerWindowFocus(printCatalogWindow);

  /* ---------- Open all 3 Print windows from the Start Menu ---------- */
  printMenuTrigger?.addEventListener("click", () => {
    openWindow(printFolderWindow);
    openWindow(printMagazineWindow);
    openWindow(printCatalogWindow);

    showMagazinePage(magazineIndex);
    showCatalogPage(catalogIndex);

    if (startMenu) {
      startMenu.classList.remove("open");
    }
  });

  /* ===================== END PRINT ===================== */

  /* Composite stuff */
  const compositeTrigger = document.getElementById("compositeTrigger");

  const compositeWindow = document.getElementById("compositeWindow");
  const closeCompositeWindowBtn = document.getElementById(
    "closeCompositeWindowBtn",
  );
  const compositeImage = document.getElementById("compositeImage");

  const spinWindow1 = document.getElementById("spinWindow1");
  const closeSpinWindow1Btn = document.getElementById("closeSpinWindow1Btn");

  const spinWindow2 = document.getElementById("spinWindow2");
  const closeSpinWindow2Btn = document.getElementById("closeSpinWindow2Btn");

  const spinFrame1 = document.getElementById("spinFrame1");
  const spinFrame2 = document.getElementById("spinFrame2");
  const compositeVideoWindow = document.getElementById("compositeVideoWindow");
  const closeCompositeVideoWindowBtn = document.getElementById(
    "closeCompositeVideoWindowBtn",
  );
  const compositeVideoFrame = document.getElementById("compositeVideoFrame");

  makeDraggable(compositeWindow);
  makeDraggable(spinWindow1);
  makeDraggable(spinWindow2);
  makeDraggable(compositeVideoWindow);

  makeResizable(compositeWindow);
  makeResizable(spinWindow1);
  makeResizable(spinWindow2);
  makeResizable(compositeVideoWindow);
  registerWindowFocus(compositeVideoWindow);

  /* if (compositeTrigger) {
  compositeTrigger.addEventListener("click", () => {
    compositeWindow.classList.add("active");
    spinWindow1.classList.add("active");
    spinWindow2.classList.add("active");

    bringToFront(spinWindow1);
    bringToFront(spinWindow2);
    bringToFront(compositeWindow);
  });
} 

if (compositeTrigger) {
  compositeTrigger.addEventListener("click", () => {
    openWindow(spinWindow1);
    openWindow(spinWindow2);
    openWindow(compositeWindow);
  });
} */

  const compositeMenuTrigger = document.getElementById("compositeMenuTrigger");

  function loadSpinFrame(frame) {
    if (!frame) return;

    if (!frame.getAttribute("src")) {
      frame.setAttribute("src", frame.dataset.src);
    }
  }

  function openCompositeFiles() {
    loadSpinFrame(spinFrame2);
    openWindow(spinWindow2);

    setTimeout(() => {
      openWindow(compositeWindow);
    }, 250);

    setTimeout(() => {
      loadSpinFrame(spinFrame1);
      openWindow(spinWindow1);
    }, 500);

    setTimeout(() => {
      if (compositeVideoFrame && !compositeVideoFrame.src) {
        compositeVideoFrame.src = compositeVideoFrame.dataset.src;
      }
      openWindow(compositeVideoWindow);
    }, 750);

    if (startMenu) {
      startMenu.classList.remove("open");
    }
  }

  /* function openCompositeFiles() {

  openWindow(compositeWindow);

  setTimeout(() => {
    openWindow(spinWindow1);
  }, 250); /* 500 --slower, more dramatic ver. 

  setTimeout(() => {
    openWindow(spinWindow2);
  }, 500); /* 1000 

  if (startMenu) {
    startMenu.classList.remove("open");
  }

}
*/

  if (compositeTrigger) {
    compositeTrigger.addEventListener("click", openCompositeFiles);
  }

  if (compositeMenuTrigger) {
    compositeMenuTrigger.addEventListener("click", openCompositeFiles);
  }

  if (closeCompositeWindowBtn) {
    closeCompositeWindowBtn.addEventListener("click", () => {
      compositeWindow.classList.remove("active");
    });
  }

  closeCompositeVideoWindowBtn?.addEventListener("click", () => {
    compositeVideoWindow.classList.remove("active");
    compositeVideoFrame.removeAttribute("src");
  });

  if (closeSpinWindow1Btn) {
    closeSpinWindow1Btn.addEventListener("click", () => {
      spinWindow1.classList.remove("active");
    });
  }

  if (closeSpinWindow2Btn) {
    closeSpinWindow2Btn.addEventListener("click", () => {
      spinWindow2.classList.remove("active");
    });
  }

  if (compositeImage) {
    compositeImage.addEventListener("click", () => {
      showSingleImageLightbox(compositeImage);
    });
  }

  /* if (compositeImage) {
  compositeImage.addEventListener("click", () => {

    if (prevLightboxBtn) {
      prevLightboxBtn.style.display = "none";
    }

    if (nextLightboxBtn) {
      nextLightboxBtn.style.display = "none";
    }

    showLightboxImageFromList([compositeImage], 0);

  });
} */
  /* if (compositeImage) {
  compositeImage.addEventListener("click", () => {
    compositeImage.classList.toggle("zoomed");
  });
}

let zoomLevel = 1;

compositeImage.addEventListener("click", () => {

  zoomLevel += 0.5;

  if (zoomLevel > 3) {
    zoomLevel = 1;
  }

  compositeImage.style.transform =
    `scale(${zoomLevel})`;

});

if (zoomLevel > 1) {
  compositeImage.style.cursor = "zoom-out";
} else {
  compositeImage.style.cursor = "zoom-in";
}

if (compositeWindow && typeof makeDraggable === "function") {
  makeDraggable(compositeWindow);
}

if (spinWindow1 && typeof makeDraggable === "function") {
  makeDraggable(spinWindow1);
}

if (spinWindow2 && typeof makeDraggable === "function") {
  makeDraggable(spinWindow2);
}
  
let compositeZoom = 1;
let isDraggingCompositeImage = false;
let compositeStartX = 0;
let compositeStartY = 0;
let compositeOffsetX = 0;
let compositeOffsetY = 0;

function updateCompositeTransform() {
  compositeImage.style.transform =
    `translate(${compositeOffsetX}px, ${compositeOffsetY}px) scale(${compositeZoom})`;

  compositeImage.style.cursor =
    compositeZoom > 1 ? "grab" : "zoom-in";
}

if (compositeImage) {
  compositeImage.addEventListener("click", () => {
    if (isDraggingCompositeImage) return;

    compositeZoom += 0.5;

    if (compositeZoom > 3) {
      compositeZoom = 1;
      compositeOffsetX = 0;
      compositeOffsetY = 0;
    }

    updateCompositeTransform();
  });

  compositeImage.addEventListener("mousedown", (e) => {
    if (compositeZoom <= 1) return;

    e.preventDefault();

    isDraggingCompositeImage = false;

    compositeStartX = e.clientX - compositeOffsetX;
    compositeStartY = e.clientY - compositeOffsetY;

    compositeImage.style.cursor = "grabbing";

    const handleMove = (moveEvent) => {
      isDraggingCompositeImage = true;

      compositeOffsetX = moveEvent.clientX - compositeStartX;
      compositeOffsetY = moveEvent.clientY - compositeStartY;

      updateCompositeTransform();
      compositeImage.style.cursor = "grabbing";
    };

    const handleUp = () => {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("mouseup", handleUp);

      setTimeout(() => {
        isDraggingCompositeImage = false;
      }, 50);

      updateCompositeTransform();
    };

    window.addEventListener("mousemove", handleMove);
    window.addEventListener("mouseup", handleUp);
  });
} */

  /* otaku and games */
  const desktopOtaku = document.getElementById("desktopOtaku");
  const otakuWindow = document.getElementById("otakuWindow");
  const closeOtakuWindowBtn = document.getElementById("closeOtakuWindowBtn");
  const otakuThumbs = Array.from(otakuWindow.querySelectorAll(".thumb"));

  const minesweeperWindow = document.getElementById("minesweeperWindow");
  const closeMinesweeperWindowBtn = document.getElementById(
    "closeMinesweeperWindowBtn",
  );

  const minesweeperGame = document.getElementById("minesweeperGame");
  const resetMinesweeperBtn = document.getElementById("resetMinesweeperBtn");
  const mineScore = document.getElementById("mineScore");
  const mineTimer = document.getElementById("mineTimer");

  let mineTimerInterval = null;
  let mineSeconds = 0;
  let mineGameStarted = false;
  let mineGameOver = false;

  /* function buildMinesweeper() {
  if (!minesweeperGame) return;

  minesweeperGame.innerHTML = "";

  const size = 8;
  const mines = new Set();

  while (mines.size < 10) {
    mines.add(Math.floor(Math.random() * size * size));
  }

  for (let i = 0; i < size * size; i++) {
    const cell = document.createElement("button");
    cell.className = "mine-cell";

    cell.addEventListener("click", () => {
      if (cell.classList.contains("open")) return;

      cell.classList.add("open");

      if (mines.has(i)) {
        cell.textContent = "💣";
        alert("Game Over, Diva.");
        return;
      }

      cell.textContent = "";
    });

    minesweeperGame.appendChild(cell);
  }
}

if (resetMinesweeperBtn) {
  resetMinesweeperBtn.addEventListener("click", buildMinesweeper);
}
*/

  function buildMinesweeper() {
    if (!minesweeperGame) return;

    clearInterval(mineTimerInterval);
    mineTimerInterval = null;
    mineSeconds = 0;
    mineGameStarted = false;
    mineGameOver = false;

    minesweeperGame.innerHTML = "";

    const size = 8;
    const mineCount = 10;
    let mines = new Set();
    let minesPlaced = false;

    if (mineScore) mineScore.textContent = String(mineCount).padStart(3, "0");
    if (mineTimer) mineTimer.textContent = "000";
    if (resetMinesweeperBtn) resetMinesweeperBtn.textContent = "🙂";

    function startMineTimer() {
      if (mineGameStarted || mineGameOver) return;

      mineGameStarted = true;

      mineTimerInterval = setInterval(() => {
        mineSeconds += 1;

        if (mineTimer) {
          mineTimer.textContent = String(mineSeconds).padStart(3, "0");
        }
      }, 1000);
    }

    function placeMines(firstClickIndex) {
      mines = new Set();

      while (mines.size < mineCount) {
        const randomIndex = Math.floor(Math.random() * size * size);

        if (randomIndex === firstClickIndex) continue;

        mines.add(randomIndex);
      }

      minesPlaced = true;
    }

    function countNearbyMines(index) {
      const row = Math.floor(index / size);
      const col = index % size;
      let count = 0;

      for (let r = row - 1; r <= row + 1; r++) {
        for (let c = col - 1; c <= col + 1; c++) {
          if (r < 0 || r >= size || c < 0 || c >= size) continue;
          if (r === row && c === col) continue;

          const nearbyIndex = r * size + c;

          if (mines.has(nearbyIndex)) {
            count++;
          }
        }
      }

      return count;
    }

    function revealAllMines() {
      const cells = minesweeperGame.querySelectorAll(".mine-cell");

      cells.forEach((cell, index) => {
        if (mines.has(index)) {
          cell.classList.add("open");
          cell.textContent = "💣";
        }
      });
    }

    for (let i = 0; i < size * size; i++) {
      const cell = document.createElement("button");
      cell.className = "mine-cell";

      cell.addEventListener("click", () => {
        if (mineGameOver) return;
        if (cell.classList.contains("open")) return;

        if (!minesPlaced) {
          placeMines(i);
        }

        startMineTimer();

        cell.classList.add("open");

        if (mines.has(i)) {
          mineGameOver = true;

          revealAllMines();

          clearInterval(mineTimerInterval);
          mineTimerInterval = null;

          if (resetMinesweeperBtn) {
            resetMinesweeperBtn.textContent = "💀";
          }

          alert("Game Over, Babe.");
          return;
        }

        const nearbyMines = countNearbyMines(i);
        cell.textContent = nearbyMines > 0 ? nearbyMines : "";
      });

      minesweeperGame.appendChild(cell);
    }
  }

  if (resetMinesweeperBtn) {
    resetMinesweeperBtn.addEventListener("click", buildMinesweeper);
  }

  /* function openOtakuZone() {
  openWindow(otakuWindow);

  const statusField = document.getElementById("otakuStatusField");
  if (statusField) {
    statusField.textContent = `${otakuThumbs.length} object(s)`;
  }

  setTimeout(() => {
    openWindow(minesweeperWindow);
  }, 350);
} */

  function openOtakuZone() {
    buildMinesweeper();

    const wasAlreadyOpen = otakuWindow.classList.contains("active");

    if (!wasAlreadyOpen) {
      resetOtakuWindowPosition();
    }

    openWindow(otakuWindow);

    const statusField = document.getElementById("otakuStatusField");

    if (statusField) {
      statusField.textContent = `${otakuThumbs.length} object(s)`;
    }

    minesweeperWindow.style.setProperty("left", "750px", "important");

    minesweeperWindow.style.setProperty("top", "100px", "important");

    minesweeperWindow.style.transform = "none";
    setTimeout(() => {
      openWindow(minesweeperWindow);
    }, 350);
  }

  if (desktopOtaku) {
    desktopOtaku.addEventListener("click", openOtakuZone);
  }

  if (closeOtakuWindowBtn) {
    closeOtakuWindowBtn.addEventListener("click", () => {
      otakuWindow.classList.remove("active");
    });
  }

  if (closeMinesweeperWindowBtn) {
    closeMinesweeperWindowBtn.addEventListener("click", () => {
      minesweeperWindow.classList.remove("active");
    });
  }

  otakuThumbs.forEach((img, index) => {
    img.addEventListener("click", () => {
      showLightboxImageFromList(otakuThumbs, index);
    });
  });

  function resetOtakuWindowPosition() {
    otakuWindow.style.setProperty(
      "top",
      "calc(35%)" /*    "calc(50% + 120px)",   */,
      "important",
    );

    otakuWindow.style.setProperty("left", "175px", "important");

    otakuWindow.style.setProperty("width", "520px", "important");

    otakuWindow.style.setProperty("height", "380px", "important");

    otakuWindow.style.transform = "none";
  }

  makeDraggable(otakuWindow);
  makeResizable(otakuWindow);
  makeDraggable(minesweeperWindow);

  registerWindowFocus(otakuWindow);
  registerWindowFocus(minesweeperWindow);

  /* FULL Portfolio - Picture Viewer Folder Popup */
  /* FULL Portfolio - Picture Viewer Folder Popup */
  const portfolioMenuTrigger = document.getElementById("portfolioMenuTrigger");
  const portfolioViewerWindow = document.getElementById(
    "portfolioViewerWindow",
  );
  const closePortfolioViewerBtn = document.getElementById(
    "closePortfolioViewerBtn",
  );
  const portfolioPreviewImage = document.getElementById(
    "portfolioPreviewImage",
  );
  const portfolioPathText = document.getElementById("portfolioPathText");
  const portfolioFileList = document.getElementById("portfolioFileList");
  const portfolioFullViewBtn = document.getElementById("portfolioFullViewBtn");
  const portfolioZoomInBtn = document.getElementById("portfolioZoomInBtn");
  const portfolioZoomOutBtn = document.getElementById("portfolioZoomOutBtn");
  const portfolioMiniPreview = document.getElementById("portfolioMiniPreview");
  const portfolioStretchToggle = document.getElementById(
    "portfolioStretchToggle",
  );
  const portfolioFirstBtn = document.getElementById("portfolioFirstBtn");
  const portfolioPrevBtn = document.getElementById("portfolioPrevBtn");
  const portfolioNextBtn = document.getElementById("portfolioNextBtn");
  const portfolioLastBtn = document.getElementById("portfolioLastBtn");
  const portfolioCounter = document.getElementById("portfolioCounter");
  const portfolioViewerClock = document.getElementById("portfolioViewerClock");
  const portfolioSearchBtn = document.getElementById("portfolioSearchBtn");
  const portfolioSearchInput = document.getElementById("portfolioSearchInput");
  const portfolioMediaFilter = document.getElementById("portfolioMediaFilter");
  const portfolioMediaButtons = Array.from(
    document.querySelectorAll("[data-media-type]"),
  );
  const portfolioImageFrame = document.querySelector(".portfolio-image-frame");
  const portfolioVideoFrame = document.getElementById("portfolioVideoFrame");
  const portfolioEmptyPreview = document.getElementById(
    "portfolioEmptyPreview",
  );

  let portfolioZoom = 1;
  let portfolioLightboxImages = [];
  let currentPortfolioMode = "images";
  const portfolioFolderCovers = new Map();
  const FEATURED_VIDEO_ID = "pOU5lAFrP4E";
  const VIDEO_PLAYLIST_ID = "PLgibMqq8ReXBiuYBk5Mt5GBcrZ4P1dC4o";

  makeResizable(portfolioViewerWindow);

  function selectPortfolioImage(img, title, fileName, item) {
    document.querySelectorAll(".portfolio-file").forEach((f) => {
      f.classList.remove("active");
    });

    item.classList.add("active");

    portfolioPreviewImage.src = img.dataset.full || img.src;
    portfolioPreviewImage.dataset.full = img.dataset.full || img.src;
    if (portfolioMiniPreview) {
      const folderCover = portfolioFolderCovers.get(title) || img;
      portfolioMiniPreview.src = folderCover.dataset.full || folderCover.src;
    }

    portfolioImageFrame.classList.remove("video-mode", "empty-mode");
    portfolioVideoFrame.removeAttribute("src");
    setImageControlsEnabled(true);

    portfolioPathText.value = `C:\\Portfolio\\${title}\\${fileName}`;

    portfolioZoom = 1;
    portfolioPreviewImage.style.transform = "scale(1)";
    const selectedIndex = currentPortfolioIndex();
    if (portfolioCounter) {
      portfolioCounter.textContent = `${selectedIndex + 1} / ${visiblePortfolioFiles().length}`;
    }
  }

  function addPortfolioGroup(title, images) {
    if (!portfolioFileList || images.length === 0) return;

    const folder = document.createElement("div");
    folder.className = "portfolio-folder-title";
    folder.textContent = "📁 " + title;
    folder.dataset.group = title;
    portfolioFileList.appendChild(folder);

    portfolioFolderCovers.set(title, images[0]);
    let firstItem = null;

    images.forEach((img) => {
      const item = document.createElement("div");
      item.className = "portfolio-file";
      item.dataset.group = title;

      const fileName =
        img.closest(".portfolio-item")?.querySelector(".file-name")
          ?.textContent || img.src.split("/").pop();

      item.textContent = fileName;
      item.dataset.filename = fileName.toLowerCase();

      item.addEventListener("click", () => {
        selectPortfolioImage(img, title, fileName, item);
      });

      portfolioFileList.appendChild(item);
      portfolioLightboxImages.push(img);
      if (!firstItem) firstItem = item;
    });

    folder.addEventListener("click", () => firstItem?.click());
  }

  function populatePortfolioViewer() {
    if (!portfolioFileList) return;

    portfolioFileList.innerHTML = "";
    portfolioLightboxImages = [];
    portfolioFolderCovers.clear();

    addPortfolioGroup("Portraits", portraitThumbs);
    addPortfolioGroup("Otaku", otakuThumbs);
    addPortfolioGroup("Graphic Design", designThumbs);
    addPortfolioGroup("Print", printThumbs);

    galleryCollections.forEach((collection) => {
      addPortfolioGroup(collection.title, collection.thumbs);
    });

    portfolioFileList.querySelector(".portfolio-file")?.click();
  }

  function visiblePortfolioFiles() {
    return Array.from(
      portfolioFileList.querySelectorAll(".portfolio-file"),
    ).filter((item) => item.style.display !== "none");
  }

  function setImageControlsEnabled(enabled) {
    [
      portfolioFullViewBtn,
      portfolioZoomInBtn,
      portfolioZoomOutBtn,
      portfolioStretchToggle,
    ].forEach((control) => {
      if (control) control.disabled = !enabled;
    });
    if (!enabled) {
      portfolioStretchToggle.checked = false;
      portfolioPreviewImage.classList.remove("stretched");
    }
  }

  function setActivePortfolioItem(item) {
    portfolioFileList.querySelectorAll(".portfolio-file").forEach((file) => {
      file.classList.toggle("active", file === item);
    });
  }

  function selectPortfolioVideo(item, title, fileName, videoUrl, thumbnail) {
    setActivePortfolioItem(item);
    portfolioImageFrame.classList.remove("empty-mode");
    portfolioImageFrame.classList.add("video-mode");
    portfolioVideoFrame.src = videoUrl;
    portfolioPathText.value = `C:\\Portfolio\\Video\\${title}\\${fileName}`;
    portfolioMiniPreview.src = thumbnail;
    setImageControlsEnabled(false);
    const selectedIndex = currentPortfolioIndex();
    portfolioCounter.textContent = `${selectedIndex + 1} / ${visiblePortfolioFiles().length}`;
  }

  function addPortfolioVideoGroup(
    title,
    fileName,
    thumbnail,
    featured = false,
  ) {
    const folder = document.createElement("div");
    folder.className = "portfolio-folder-title";
    folder.dataset.group = title;
    folder.textContent = `📁 ${title}`;

    const item = document.createElement("div");
    item.className = "portfolio-file";
    item.dataset.group = title;
    item.dataset.filename = fileName.toLowerCase();
    item.textContent = fileName;

    const videoUrl = featured
      ? `https://www.youtube-nocookie.com/embed/${FEATURED_VIDEO_ID}?list=${VIDEO_PLAYLIST_ID}&rel=0`
      : `https://www.youtube-nocookie.com/embed/videoseries?list=${VIDEO_PLAYLIST_ID}`;
    item.addEventListener("click", () => {
      selectPortfolioVideo(item, title, fileName, videoUrl, thumbnail);
    });
    folder.addEventListener("click", () => item.click());
    portfolioFileList.append(folder, item);
  }

  function populateVideoViewer() {
    portfolioFileList.innerHTML = "";
    portfolioLightboxImages = [];
    addPortfolioVideoGroup(
      "CMs",
      "Featured_CM_pOU5lAFrP4E.mp4",
      `https://i.ytimg.com/vi/${FEATURED_VIDEO_ID}/hqdefault.jpg`,
      true,
    );
    addPortfolioVideoGroup(
      "TVCM_PV_MV",
      "TVCM_PV_MV_Playlist.youtube",
      "images/thumbs/Picnic_Atelier_会May.webp",
    );
    addPortfolioVideoGroup(
      "Drama_Movie",
      "Drama_Movie_Playlist.youtube",
      "images/thumbs/PASHASTYLE_WhimsicalWisteria1.webp",
    );
    addPortfolioVideoGroup(
      "Videography",
      "Videography_Playlist.youtube",
      "images/thumbs/5R_Bii_01.webp",
    );
    portfolioFileList.querySelector(".portfolio-file")?.click();
  }

  function populatePlaceholderLibrary(mode) {
    const label = mode === "audio" ? "Audio" : "Music";
    const icon = mode === "audio" ? "🔊" : "🎵";
    const cover =
      mode === "audio" ? "icons/icon-voice.webp" : "icons/icon-music.webp";
    const fileName = `${label}_Library_Ready`;
    portfolioFileList.innerHTML = "";
    portfolioLightboxImages = [];
    const folder = document.createElement("div");
    folder.className = "portfolio-folder-title";
    folder.dataset.group = label;
    folder.textContent = `📁 ${label} Files`;
    const item = document.createElement("div");
    item.className = "portfolio-file";
    item.dataset.group = label;
    item.dataset.filename = fileName.toLowerCase();
    item.textContent = `${icon} ${fileName}`;
    item.addEventListener("click", () => {
      setActivePortfolioItem(item);
      portfolioVideoFrame.removeAttribute("src");
      portfolioImageFrame.classList.remove("video-mode");
      portfolioImageFrame.classList.add("empty-mode");
      portfolioEmptyPreview.textContent = `${label} files can be added here when they are ready.`;
      portfolioMiniPreview.src = cover;
      portfolioPathText.value = `C:\\Portfolio\\${label}\\`;
      portfolioCounter.textContent = "1 / 1";
      setImageControlsEnabled(false);
    });
    folder.addEventListener("click", () => item.click());
    portfolioFileList.append(folder, item);
    item.click();
  }

  function navigatePortfolio(targetIndex) {
    const items = visiblePortfolioFiles();
    if (!items.length) return;
    const boundedIndex = Math.max(0, Math.min(targetIndex, items.length - 1));
    items[boundedIndex]?.click();
    items[boundedIndex]?.scrollIntoView({ block: "nearest" });
  }

  function currentPortfolioIndex() {
    return Math.max(
      0,
      visiblePortfolioFiles().findIndex((item) =>
        item.classList.contains("active"),
      ),
    );
  }

  function filterPortfolioFiles() {
    const query = portfolioSearchInput.value.trim().toLowerCase();
    const files = Array.from(
      portfolioFileList.querySelectorAll(".portfolio-file"),
    );
    files.forEach((item) => {
      item.style.display =
        !query || item.dataset.filename.includes(query) ? "" : "none";
    });
    portfolioFileList
      .querySelectorAll(".portfolio-folder-title")
      .forEach((folder) => {
        const hasVisibleFile = files.some(
          (item) =>
            item.dataset.group === folder.dataset.group &&
            item.style.display !== "none",
        );
        folder.style.display = hasVisibleFile ? "" : "none";
      });
    const visible = visiblePortfolioFiles();
    if (
      visible.length &&
      !visible.includes(
        portfolioFileList.querySelector(".portfolio-file.active"),
      )
    ) {
      visible[0].click();
    }
    if (!visible.length) {
      portfolioCounter.textContent = "0 / 0";
    }
  }

  function switchPortfolioMode(mode) {
    currentPortfolioMode = mode;
    portfolioMediaFilter.value = mode;
    portfolioMediaButtons.forEach((button) => {
      button.classList.toggle("active", button.dataset.mediaType === mode);
    });
    document.querySelectorAll("[data-library-mode]").forEach((folder) => {
      folder.classList.toggle("active", folder.dataset.libraryMode === mode);
    });
    portfolioSearchInput.value = "";
    if (mode === "images") populatePortfolioViewer();
    else if (mode === "video") populateVideoViewer();
    else populatePlaceholderLibrary(mode);
  }

  function openPortfolioViewer() {
    switchPortfolioMode(currentPortfolioMode);
    openWindow(portfolioViewerWindow);

    if (startMenu) {
      startMenu.classList.remove("open");
    }
  }

  if (portfolioMenuTrigger) {
    portfolioMenuTrigger.addEventListener("click", openPortfolioViewer);
  }

  if (closePortfolioViewerBtn) {
    closePortfolioViewerBtn.addEventListener("click", () => {
      portfolioViewerWindow.classList.remove("active");
    });
  }

  portfolioSearchBtn?.addEventListener("click", () => {
    portfolioSearchInput.focus();
    portfolioSearchInput.select();
  });
  portfolioSearchInput?.addEventListener("input", filterPortfolioFiles);
  portfolioMediaFilter?.addEventListener("change", () => {
    switchPortfolioMode(portfolioMediaFilter.value);
  });
  portfolioMediaButtons.forEach((button) => {
    button.addEventListener("click", () => {
      switchPortfolioMode(button.dataset.mediaType);
    });
  });
  document.querySelectorAll("[data-library-mode]").forEach((folder) => {
    folder.addEventListener("click", () => {
      switchPortfolioMode(folder.dataset.libraryMode);
    });
  });

  if (portfolioZoomInBtn) {
    portfolioZoomInBtn.addEventListener("click", () => {
      if (!portfolioPreviewImage.src) return;

      portfolioZoom = Math.min(portfolioZoom + 0.25, 3);
      portfolioPreviewImage.style.transform = `scale(${portfolioZoom})`;
    });
  }

  if (portfolioZoomOutBtn) {
    portfolioZoomOutBtn.addEventListener("click", () => {
      if (!portfolioPreviewImage.src) return;

      portfolioZoom = Math.max(portfolioZoom - 0.25, 0.5);
      portfolioPreviewImage.style.transform = `scale(${portfolioZoom})`;
    });
  }

  portfolioStretchToggle?.addEventListener("change", () => {
    portfolioPreviewImage.classList.toggle(
      "stretched",
      portfolioStretchToggle.checked,
    );
  });

  portfolioFirstBtn?.addEventListener("click", () => navigatePortfolio(0));
  portfolioPrevBtn?.addEventListener("click", () =>
    navigatePortfolio(currentPortfolioIndex() - 1),
  );
  portfolioNextBtn?.addEventListener("click", () =>
    navigatePortfolio(currentPortfolioIndex() + 1),
  );
  portfolioLastBtn?.addEventListener("click", () =>
    navigatePortfolio(visiblePortfolioFiles().length - 1),
  );

  function updatePortfolioClock() {
    if (!portfolioViewerClock) return;
    const now = new Date();
    portfolioViewerClock.textContent = [
      now.getHours(),
      now.getMinutes(),
      now.getSeconds(),
    ]
      .map((part) => String(part).padStart(2, "0"))
      .join(":");
  }
  updatePortfolioClock();
  setInterval(updatePortfolioClock, 1000);

  if (portfolioFullViewBtn) {
    portfolioFullViewBtn.addEventListener("click", () => {
      if (!portfolioPreviewImage.src) return;

      thumbs.length = 0;
      portfolioLightboxImages.forEach((img) => thumbs.push(img));

      currentLightboxIndex = thumbs.findIndex((img) => {
        return (
          (img.dataset.full || img.src) === portfolioPreviewImage.dataset.full
        );
      });

      if (currentLightboxIndex < 0) currentLightboxIndex = 0;

      if (prevLightboxBtn) prevLightboxBtn.style.display = "flex";
      if (nextLightboxBtn) nextLightboxBtn.style.display = "flex";

      showLightboxImage(currentLightboxIndex);
    });
  }

  makeDraggable(portfolioViewerWindow);
  makeResizable(portfolioViewerWindow);
  registerWindowFocus(portfolioViewerWindow);

  /*fake arrrow scroll feature
  --got rid of it cuz it was annoying to make

  const portfolioScrollUp = document.getElementById("portfolioScrollUp");

  const portfolioScrollDown = document.getElementById("portfolioScrollDown");

  portfolioScrollUp?.addEventListener("click", () => {
    portfolioFileList.scrollBy({
      top: -80,
      behavior: "smooth",
    });
  });

  portfolioScrollDown?.addEventListener("click", () => {
    portfolioFileList.scrollBy({
      top: 80,
      behavior: "smooth",
    });
  });
  */

  /* ~ */
  [
    lightbox,
    hintPopup,
    surePopup,
    designWindow,
    portraitsWindow,
    mapWindow,
    contactWindow,
    compositeWindow,
    spinWindow1,
    spinWindow2,
  ].forEach(registerWindowFocus);
});
