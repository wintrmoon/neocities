const prompt = document.querySelector(".prompt");
const selectorLinks = document.querySelectorAll(".selector-list a");
const allLinks = document.querySelectorAll("a");
let index = 0;
let usingKeyboard = false;

// update the prompt line
function updatePrompt(label = "") {
  prompt.innerHTML = `&gt; ${label} <span class="cursor">█</span>`;
}

// update the visual highlight for keyboard mode
function updateHighlight() {
  selectorLinks.forEach((link) => {
    link.classList.remove("keyboard-highlight");
  });

  if (usingKeyboard) {
    selectorLinks[index].classList.add("keyboard-highlight");
  }
}

// initialize only if elements exist
if (selectorLinks.length > 0) {
  updatePrompt(selectorLinks[index].dataset.label);
  updateHighlight();
  selectorLinks[index].focus();
}

// keyboard navigation (only for selector-list)
document.addEventListener("keydown", (e) => {
  if (["ArrowUp", "ArrowDown", "Enter"].includes(e.key)) {
    if (!usingKeyboard) {
      usingKeyboard = true;
      document.body.classList.add("keyboard-mode");
    }
    e.preventDefault();
    if (e.key === "ArrowDown") {
      index = (index + 1) % selectorLinks.length;
    } else if (e.key === "ArrowUp") {
      index = (index - 1 + selectorLinks.length) % selectorLinks.length;
    } else if (e.key === "Enter") {
      selectorLinks[index].click();
      return;
    }
    selectorLinks[index].focus();
    updatePrompt(selectorLinks[index].dataset.label);
    updateHighlight();
  }
});

// detect mouse movement to switch to mouse mode
// use passive listener for better scroll performance
let mouseMoveTimeout;
document.addEventListener(
  "mousemove",
  () => {
    // Debounce to avoid excessive calls
    clearTimeout(mouseMoveTimeout);
    mouseMoveTimeout = setTimeout(() => {
      if (usingKeyboard) {
        usingKeyboard = false;
        document.body.classList.remove("keyboard-mode");
        updateHighlight();
        updatePrompt("");
      }
    }, 50);
  },
  { passive: true }
);

// mouse hover for ALL links
allLinks.forEach((link) => {
  link.addEventListener("mouseenter", () => {
    const label = link.dataset.label || link.textContent.trim();
    updatePrompt(label);
  });

  link.addEventListener("mouseleave", () => {
    if (!usingKeyboard) {
      updatePrompt("");
    }
  });
});

// LOADING ANIMATION
document.addEventListener("DOMContentLoaded", () => {
  const content = document.querySelector(".terminal-content");
  const loadingContainer = document.querySelector("#loading-container");
  const commandLine = document.querySelector(".command");

  // exit early if elements don't exist
  if (!content || !loadingContainer || !commandLine) return;

  const customMessage = document.body.dataset.loading || "ACCESSING FILE...";

  const messages = [
    "ESTABLISHING UPLINK...",
    "VERIFYING USER CREDENTIALS...",
    "DECRYPTING LOG FILE...",
    "CHECKING DATA INTEGRITY...",
    "SYNCING TIME WITH VAULT SERVER...",
    "CLEANING MEMORY SECTORS...",
    "SCANNING DATA SECTORS... OK",
    "DECRYPTING ENTRIES... DONE",
  ];

  // pick 1-2 random messages instead of just 1
  const shuffled = messages.sort(() => 0.5 - Math.random()).slice(0, 2);
  const loadingSequence = [customMessage, ...shuffled, "DONE"];

  // Initially hide main content but keep layout
  content.style.opacity = "0";
  content.style.display = "block";
  content.style.transition = "opacity 0.8s ease";
  loadingContainer.innerHTML = "";

  // add click-to-skip functionality
  let skipAnimation = false;
  const skipHandler = () => {
    skipAnimation = true;
  };
  document.addEventListener("click", skipHandler, { once: true });

  // faster typewriter function
  const typeLine = (element, msg, bold = false, callback) => {
    // if animation skipped, show immediately
    if (skipAnimation) {
      element.innerHTML = bold ? `<strong>${msg}</strong>` : msg;
      if (callback) callback();
      return;
    }

    if (bold) {
      element.innerHTML = "<strong></strong>";
    } else {
      element.textContent = "";
    }

    const target = bold ? element.querySelector("strong") : element;
    let idx = 0;

    const typeNextChar = () => {
      // check skip flag during animation
      if (skipAnimation) {
        target.textContent = msg;
        if (callback) callback();
        return;
      }

      if (idx < msg.length) {
        target.textContent += msg[idx];
        const delay = msg[idx] === "." ? 80 : 20;
        idx++;
        setTimeout(typeNextChar, delay);
      } else if (callback) {
        callback();
      }
    };

    typeNextChar();
  };

  // recursive function to type loading lines
  let currentLine = 0;
  const nextLine = () => {
    if (currentLine >= loadingSequence.length) {
      // fade in the terminal content after last loading line
      requestAnimationFrame(() => {
        content.style.opacity = "1";
      });
      return;
    }

    const msg = loadingSequence[currentLine];
    const isBold = currentLine === loadingSequence.length - 1;

    // create new line element
    const line = document.createElement("div");
    line.className = "loading-line";
    loadingContainer.appendChild(line);

    typeLine(line, msg, isBold, () => {
      // shorter random delay
      const randomDelay = skipAnimation ? 0 : Math.floor(Math.random() * 150) + 50;
      setTimeout(nextLine, randomDelay);
    });

    currentLine++;
  };

  // start by typing the command line
  typeLine(commandLine, commandLine.textContent, false, () => {
    // initial delay
    setTimeout(nextLine, skipAnimation ? 0 : 200);
  });
});

// fade out when clicking a link
const terminalLinks = document.querySelectorAll(".terminal a");

terminalLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    // skip fade if target is _blank
    if (link.target === "_blank") return;

    e.preventDefault();
    const targetUrl = link.href;

    const terminal = document.querySelector(".terminal");
    const separator = terminal.querySelector(".separator");

    // fade all children except the separator
    Array.from(terminal.children).forEach((child) => {
      if (child !== separator) {
        child.style.transition = "opacity 0.3s ease";
        child.style.opacity = "0";
      }
    });

    // navigate after fade
    setTimeout(() => {
      window.location.href = targetUrl;
    }, 300);
  });
});

// FIX: scroll to top when page loads
window.addEventListener("load", () => {
  // Prevent browser from restoring scroll position
  if ("scrollRestoration" in history) {
    history.scrollRestoration = "manual";
  }
  window.scrollTo(0, 0);
});

// FIX: reset opacity when navigating back
window.addEventListener("pageshow", (event) => {
  // check if page is loaded from cache (back/forward button)
  if (event.persisted) {
    const terminal = document.querySelector(".terminal");
    const content = document.querySelector(".terminal-content");

    // Reset all opacity
    if (terminal) {
      Array.from(terminal.children).forEach((child) => {
        child.style.opacity = "1";
      });
    }

    if (content) {
      content.style.opacity = "1";
    }

    window.scrollTo(0, 0);
  }
});

// fixes the sticky background color
const stickies = document.querySelectorAll(".prompt-field, .empty-space");

function updateStickyBG() {
  stickies.forEach((el) => {
    const rect = el.getBoundingClientRect();
    const offsetBottom = parseFloat(getComputedStyle(el).bottom) || 0;

    const isSticking = Math.abs(window.innerHeight - rect.bottom - offsetBottom) < 1;

    if (isSticking) {
      el.style.backgroundColor = "#001900";
    } else {
      el.style.backgroundColor = "transparent";
    }
  });
}

// update on scroll and resize
window.addEventListener("scroll", updateStickyBG);
window.addEventListener("resize", updateStickyBG);

updateStickyBG();
