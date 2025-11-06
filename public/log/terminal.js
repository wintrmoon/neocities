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

// Initialize
updatePrompt(selectorLinks[index].dataset.label);
updateHighlight();
selectorLinks[index].focus();

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
document.addEventListener("mousemove", () => {
  if (usingKeyboard) {
    usingKeyboard = false;
    document.body.classList.remove("keyboard-mode");
    updateHighlight();
    updatePrompt("");
  }
});

// mouse hover for ALL links
allLinks.forEach((link) => {
  link.addEventListener("mouseenter", () => {
    const label = link.dataset.label || link.textContent.trim();
    updatePrompt(label);
  });

  // clear prompt when mouse leaves the link
  link.addEventListener("mouseleave", () => {
    if (!usingKeyboard) {
      updatePrompt("");
    }
  });
});

// System stats - uptime counter
const startTime = Date.now();
const uptimeElement = document.getElementById("uptime");

if (uptimeElement) {
  setInterval(() => {
    const elapsed = Math.floor((Date.now() - startTime) / 1000);
    const hours = Math.floor(elapsed / 3600);
    const minutes = Math.floor((elapsed % 3600) / 60);
    const seconds = elapsed % 60;
    uptimeElement.textContent = `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  }, 1000);
}

// Local timestamp
const timestampElement = document.getElementById("local-time");

if (timestampElement) {
  function updateTimestamp() {
    const now = new Date();
    const formatted = now.toLocaleString("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    });
    timestampElement.textContent = formatted;
  }
  updateTimestamp();
  setInterval(updateTimestamp, 1000);
}

// fake loading
document.addEventListener("DOMContentLoaded", () => {
  const content = document.querySelector(".terminal-content");
  const loadingContainer = document.querySelector("#loading-container");
  const commandLine = document.querySelector(".command");

  const customMessage = document.body.dataset.loading || "ACCESSING FILE...";

  const messages = [
    "ESTABLISHING UPLINK...",
    "VERIFYING USER CREDENTIALS...",
    "LOADING SYSTEM MODULES...",
    "DECRYPTING LOG FILE...",
    "CALIBRATING SENSORS...",
    "CHECKING DATA INTEGRITY...",
    "SYNCING TIME WITH VAULT SERVER...",
    "OPTIMIZING NEURAL NETWORK...",
    "RUNNING DIAGNOSTICS...",
    "CLEANING MEMORY SECTORS...",
    "CHECKING MEMORY BANKS... OK",
    "SCANNING DATA SECTORS... OK",
    "DECRYPTING ENTRIES... DONE",
    "LOADING USER PROFILE... OK",
    "VERIFYING INTEGRITY... OK",
  ];

  // pick 2 random messages
  const shuffled = messages.sort(() => 0.5 - Math.random()).slice(0, 2);

  // full loading sequence after the command line
  const loadingSequence = [customMessage, ...shuffled, "DONE"];

  // Initially hide main content but keep layout
  content.style.opacity = "0";
  content.style.display = "block";
  content.style.transition = "opacity 0.8s ease";

  // Clear loading container
  loadingContainer.innerHTML = "";

  // typewriter function
  const typeLine = (element, msg, bold = false, callback) => {
    if (bold) {
      element.innerHTML = "<strong></strong>";
    } else {
      element.textContent = "";
    }

    const target = bold ? element.querySelector("strong") : element;
    let idx = 0;

    const typeNextChar = () => {
      if (idx < msg.length) {
        target.textContent += msg[idx];
        const delay = msg[idx] === "." ? 120 : 30; // slower on dots
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
      const randomDelay = Math.floor(Math.random() * 400) + 100; // random delay before next line
      setTimeout(nextLine, randomDelay);
    });

    currentLine++;
  };

  // start by typing the command line
  typeLine(commandLine, commandLine.textContent, false, () => {
    // after command typed, start loading sequence after a small delay
    setTimeout(nextLine, 300);
  });
});

// fade out when clicking a link
const terminalLinks = document.querySelectorAll(".terminal a");

terminalLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    // skip fade if target is _blank
    if (link.target === "_blank") return;

    e.preventDefault(); // prevent instant navigation
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
    }, 300); // match transition duration
  });
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
