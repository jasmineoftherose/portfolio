document.addEventListener("DOMContentLoaded", () => {
  // Cleaned up variable selectors for your native HTML elements
  const headerNode = document.getElementById("headerText");
  const subtitleNode = document.getElementById("subtitleText");
  const loadingText = document.getElementById("loadingText");
  const siteFooter = document.getElementById("siteFooter");
  const passwordScreen = document.getElementById("passwordScreen");

  const header1_Text = "JASMINE OF THE ROSE®";
  const header2_Text = "薔薇の茉莉®";

  const sub1_HTML = "Welcome to Jasmine Rose’s Portfolio Website<br>Version 2.13";
  const sub1_Shadow = "Welcome to Jasmine Rose’s Portfolio Website\nVersion 2.13";

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
      headerNode.setAttribute("data-text", isFirstState ? header2_Text : header1_Text);

      subtitleNode.innerHTML = isFirstState ? sub2_HTML : sub1_HTML;
      subtitleNode.setAttribute("data-text", isFirstState ? sub2_Shadow : sub1_Shadow);

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
      dragging = true;
      const rect = popup.getBoundingClientRect();
      offsetX = e.clientX - rect.left;
      offsetY = e.clientY - rect.top;

      popup.style.transform = "none";
      popup.style.left = rect.left + "px";
      popup.style.top = rect.top + "px";
    });

    window.addEventListener("mousemove", (e) => {
      if (!dragging) return;
      popup.style.left = (e.clientX - offsetX) + "px";
      popup.style.top = (e.clientY - offsetY) + "px";
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
    const hrs = String(now.getHours()).padStart(2, '0');
    const mins = String(now.getMinutes()).padStart(2, '0');
    const secs = String(now.getSeconds()).padStart(2, '0');
    
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
    });

    // 2. Automatically hides the pop-up panel list if a user clicks outside onto the wallpaper screen
    document.addEventListener("click", (e) => {
      if (!startMenu.contains(e.target) && e.target !== startBtn) {
        startMenu.classList.remove("open");
      }
    });
  }


  
});
