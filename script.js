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

    enlargedImg.src = thumbs[currentLightboxIndex].src;
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

    enlargedImg.src = img.src;
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

  const contactWindow = document.getElementById("contactWindow");

  const closeContactWindowBtn = document.getElementById(
    "closeContactWindowBtn",
  );

  const sendEmailBtn = document.getElementById("sendEmailBtn");

  if (contactTrigger) {
    contactTrigger.addEventListener("click", () => {
      contactWindow.classList.add("active");
      bringToFront(contactWindow);
    });
  }

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

  makeDraggable(compositeWindow);
  makeDraggable(spinWindow1);
  makeDraggable(spinWindow2);

  makeResizable(compositeWindow);
  makeResizable(spinWindow1);
  makeResizable(spinWindow2);

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

  let portfolioZoom = 1;

  makeResizable(portfolioViewerWindow);

  function selectPortfolioImage(img, title, fileName, item) {
    document.querySelectorAll(".portfolio-file").forEach((f) => {
      f.classList.remove("active");
    });

    item.classList.add("active");

    portfolioPreviewImage.src = img.src;
    portfolioPathText.value = `C:\\Portfolio\\${title}\\${fileName}`;

    portfolioZoom = 1;
    portfolioPreviewImage.style.transform = "scale(1)";
  }

  function addPortfolioGroup(title, images) {
    if (!portfolioFileList || images.length === 0) return;

    const folder = document.createElement("div");
    folder.className = "portfolio-folder-title";
    folder.textContent = "📁 " + title;
    portfolioFileList.appendChild(folder);

    images.forEach((img) => {
      const item = document.createElement("div");
      item.className = "portfolio-file";

      const fileName =
        img.closest(".portfolio-item")?.querySelector(".file-name")
          ?.textContent || img.src.split("/").pop();

      item.textContent = fileName;

      item.addEventListener("click", () => {
        selectPortfolioImage(img, title, fileName, item);
      });

      portfolioFileList.appendChild(item);
    });
  }

  function populatePortfolioViewer() {
    if (!portfolioFileList) return;

    portfolioFileList.innerHTML = "";

    addPortfolioGroup("Graphic Design", designThumbs);
    addPortfolioGroup("Portraits", portraitThumbs);
    addPortfolioGroup("Otaku", otakuThumbs);
  }

  function openPortfolioViewer() {
    populatePortfolioViewer();
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

  if (portfolioFullViewBtn) {
    portfolioFullViewBtn.addEventListener("click", () => {
      if (!portfolioPreviewImage.src) return;

      showSingleImageLightbox(portfolioPreviewImage);
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
