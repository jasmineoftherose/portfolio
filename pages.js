(() => {
  const shell = document.querySelector(".page-shell");
  const main = document.querySelector(".page-main");
  const title = document.querySelector(".page-title")?.textContent.trim() || "Jasmine of the Rose";
  if (!shell || !main) return;

  const pageIcons = {
    Model: "icons/icon-model.webp",
    Voice: "icons/icon-voice.webp",
    Camera: "icons/icon-photography.webp",
    Music: "icons/icon-music.webp",
    Art: "icons/icon-graphicdesign.webp",
    News: "icons/icon-news.webp",
    About: "icons/icon-about.webp",
    Portfolio: "icons/icon-computer.webp",
    Contact: "icons/icon-contact.webp"
  };
  const icon = pageIcons[title] || "icons/icon-computer.webp";

  const titlebar = document.createElement("header");
  titlebar.className = "window-titlebar";
  titlebar.innerHTML = `<img src="${icon}" alt=""><strong>Jasmine of the Rose - ${title}</strong><div class="window-controls"><button class="window-control" type="button" aria-label="Minimize">_</button><button class="window-control" type="button" aria-label="Maximize">□</button><a class="window-control" href="index.html?desktop=1" aria-label="Close">×</a></div>`;
  document.querySelector(".page-nav").after(titlebar);

  const pages = [
    ["Model", "model.html", "icons/icon-model.webp"],
    ["Voice", "voice.html", "icons/icon-voice.webp"],
    ["Camera", "camera.html", "icons/icon-photography.webp"],
    ["Music", "music.html", "icons/icon-music.webp"],
    ["Art", "art.html", "icons/icon-graphicdesign.webp"],
    ["News", "news.html", "icons/icon-news.webp"],
    ["About", "about.html", "icons/icon-about.webp"],
    ["Portfolio", "portfolio.html", "icons/icon-computer.webp"],
    ["Contact", "contact.html", "icons/icon-contact.webp"]
  ];
  const currentFile = location.pathname.split("/").pop() || "index.html";
  const taskbar = document.createElement("footer");
  taskbar.className = "page-taskbar";
  taskbar.innerHTML = `
    <div class="taskbar-left">
      <div class="page-start-wrap">
        <nav class="page-start-menu" id="pageStartMenu" aria-label="Start menu">
          <div class="page-start-stripe"><span>DIANA OS95 ver 2.13</span></div>
          <div class="page-start-content">
            ${pages.map(([label, href, src]) => `<a class="page-start-item${currentFile === href ? " active" : ""}" href="${href}"><img src="${src}" alt="">${label}</a>`).join("")}
            <div class="page-start-separator"></div>
            <a class="page-start-item" href="index.html?desktop=1"><img src="icons/icon-computer.webp" alt="">Main Desktop</a>
          </div>
        </nav>
        <button class="task-start" id="pageStartButton" type="button" aria-expanded="false" aria-controls="pageStartMenu"><img src="icons/dianastartlogo2.webp" alt=""><span>Start</span></button>
      </div>
      <span class="taskbar-divider" aria-hidden="true"></span>
      <div class="quick-launch-apps">
        <a class="app-slot desktop-shortcut" href="index.html?desktop=1" aria-label="Return to main desktop" title="Main Desktop"><img src="icons/icon-computer.webp" alt=""></a>
        <button class="app-slot" type="button" aria-label="Files" title="Files">📁</button>
        <button class="app-slot" type="button" aria-label="Music" title="Music">🎵</button>
        <button class="app-slot" type="button" aria-label="Save" title="Save">💾</button>
        <button class="app-slot" type="button" aria-label="Internet" title="Internet">🌐</button>
        <button class="app-slot" type="button" aria-label="Messages" title="Messages">💬</button>
      </div>
    </div>
    <div class="taskbar-right">
      <div class="sys-tray-item battery-status" id="pageBattery">🔋 100%</div>
      <div class="sys-tray-icons"><span title="Cellular Signal Strength">📶</span><span title="Bluetooth Connected">🛜</span><span title="WiFi Link Active">⚡</span></div>
      <span class="taskbar-divider" aria-hidden="true"></span>
      <time class="sys-tray-item military-clock" aria-label="Current time"></time>
    </div>`;
  document.body.append(taskbar);

  const startButton = taskbar.querySelector("#pageStartButton");
  const startMenu = taskbar.querySelector("#pageStartMenu");
  const setStartMenu = (open) => {
    startMenu.classList.toggle("open", open);
    startButton.setAttribute("aria-expanded", String(open));
    taskbar.classList.toggle("menu-on-top", open);
  };
  startButton.addEventListener("click", (event) => {
    event.stopPropagation();
    setStartMenu(!startMenu.classList.contains("open"));
  });
  document.addEventListener("click", (event) => {
    if (!startMenu.contains(event.target) && event.target !== startButton) setStartMenu(false);
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && startMenu.classList.contains("open")) setStartMenu(false);
  });

  const clock = taskbar.querySelector(".military-clock");
  const updateClock = () => {
    const now = new Date();
    clock.textContent = [now.getHours(), now.getMinutes(), now.getSeconds()].map((part) => String(part).padStart(2, "0")).join(":");
  };
  updateClock();
  setInterval(updateClock, 1000);

  const batteryDisplay = taskbar.querySelector("#pageBattery");
  if (batteryDisplay && navigator.getBattery) {
    navigator.getBattery().then((battery) => {
      const updateBattery = () => {
        batteryDisplay.textContent = `${battery.charging ? "🔌" : "🔋"} ${Math.round(battery.level * 100)}%`;
      };
      updateBattery();
      battery.addEventListener("levelchange", updateBattery);
      battery.addEventListener("chargingchange", updateBattery);
    });
  }

  const galleryLinks = [...document.querySelectorAll(".gallery-item[href]")];
  if (galleryLinks.length) {
    const lightbox = document.createElement("div");
    lightbox.className = "page-lightbox";
    lightbox.setAttribute("role", "dialog");
    lightbox.setAttribute("aria-label", "Image viewer");
    lightbox.innerHTML = `<button class="lightbox-close" type="button" aria-label="Close">×</button><button class="lightbox-arrow lightbox-prev" type="button" aria-label="Previous image">‹</button><img alt=""><button class="lightbox-arrow lightbox-next" type="button" aria-label="Next image">›</button><div class="lightbox-caption"></div>`;
    document.body.append(lightbox);
    const image = lightbox.querySelector("img");
    const caption = lightbox.querySelector(".lightbox-caption");
    let activeIndex = 0;

    const show = (index) => {
      activeIndex = (index + galleryLinks.length) % galleryLinks.length;
      const link = galleryLinks[activeIndex];
      image.src = link.href;
      image.alt = link.querySelector("img")?.alt || "Portfolio image";
      caption.textContent = `${activeIndex + 1} / ${galleryLinks.length}  ${link.querySelector("span")?.textContent || ""}`;
      lightbox.classList.add("active");
    };
    const close = () => lightbox.classList.remove("active");
    galleryLinks.forEach((link, index) => link.addEventListener("click", (event) => { event.preventDefault(); show(index); }));
    lightbox.querySelector(".lightbox-close").addEventListener("click", close);
    lightbox.querySelector(".lightbox-prev").addEventListener("click", () => show(activeIndex - 1));
    lightbox.querySelector(".lightbox-next").addEventListener("click", () => show(activeIndex + 1));
    lightbox.addEventListener("click", (event) => { if (event.target === lightbox) close(); });
    document.addEventListener("keydown", (event) => {
      if (!lightbox.classList.contains("active")) return;
      if (event.key === "Escape") close();
      if (event.key === "ArrowLeft") show(activeIndex - 1);
      if (event.key === "ArrowRight") show(activeIndex + 1);
    });
  }

  document.querySelectorAll("[data-email-form]").forEach((form) => {
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const data = new FormData(form);
      const subject = encodeURIComponent(data.get("subject") || "");
      const body = encodeURIComponent(data.get("message") || "");
      location.href = `mailto:jasminerosetv@gmail.com?subject=${subject}&body=${body}`;
    });
  });
})();
