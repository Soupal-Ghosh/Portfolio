const canvas = document.getElementById("matrixRain");
const ctx = canvas.getContext("2d");

canvas.height = window.innerHeight;
canvas.width = window.innerWidth;
window.addEventListener("DOMContentLoaded", () => {
  const lines = document.querySelectorAll("#boot-lines span");
  const bootScreen = document.getElementById("boot-screen");
  const mainContent = document.getElementById("main-content");

  let delay = 1000;

  lines.forEach((line, index) => {
    setTimeout(() => {
      line.style.opacity = 1;
    }, delay);
    delay += 1000;
  });

  // After final line + small delay, fade out boot screen and show main site
  setTimeout(() => {
    bootScreen.style.display = "none";
    mainContent.classList.remove("hidden");
    mainContent.classList.add("fade-up");
  }, delay + 100);
});


const letters =
  "01!~`@#$%^&*()_{}[]':;><..?/|ABCDEFGHIJKLMNOPQRSTUVWXYZ#$%&*abcdefghijklmnopqrstuvwxyz123456789_+=-";
const fontSize = 14;
const columns = canvas.width / fontSize;
const drops = Array.from({ length: columns }).fill(1);

function draw() {
  ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "#0F0";
  ctx.font = fontSize + "px monospace";

  for (let i = 0; i < drops.length; i++) {
    const text = letters[Math.floor(Math.random() * letters.length)];
    ctx.fillText(text, i * fontSize, drops[i] * fontSize);

    if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
      drops[i] = 0;
    }
    drops[i]++;
  }
}

setInterval(draw, 33);

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

//coming up effect
window.addEventListener("load", () => {
  setTimeout(() => {
    const main = document.getElementById("main-content");
    main.classList.remove("hidden");
    main.classList.add("fade-up");
  }, 2000); // 2 seconds delay
});

//terminal effect
const terminalInput = document.getElementById("terminal-input");
const terminalOutput = document.getElementById("terminal-output");
const typedSpan = document.getElementById("typed");
const ghostSpan = document.getElementById("ghost");

const validCommands = {
  about: "about",
  skills: "skills",
  projects: "projects",
  hackathons: "hackathons",
  stats: "stats",
  contact: "contact",
  clear: "clear"
};

let commandHistory = [];
let historyIndex = -1;
ghostSpan.textContent = "type a command...";

terminalInput.focus();
terminalInput.addEventListener("input", () => {
  const val = terminalInput.value.trim().toLowerCase();
  typedSpan.textContent = val;

  if (val === "") {
    ghostSpan.textContent = "type a command ...";
  } else {
    const match = Object.keys(validCommands).find(cmd => cmd.startsWith(val));
    ghostSpan.textContent = (match && match !== val) ? match.substring(val.length) : "";
  }
});


terminalInput.addEventListener("keydown", (e) => {
  const inputVal = terminalInput.value.trim().toLowerCase();

  // Tab: fill suggestion
  if (e.key === "Tab") {
    e.preventDefault();
    const match = Object.keys(validCommands).find(cmd => cmd.startsWith(inputVal));
    if (match) {
      terminalInput.value = match;
      typedSpan.textContent = match;
      ghostSpan.textContent = "";
    }
    return;
  }

  // Enter: run command
  if (e.key === "Enter") {
    const cmd = inputVal;
    terminalInput.value = "";
    typedSpan.textContent = "";
    ghostSpan.textContent = "";

    if (!cmd) return;

    // Add to history
    commandHistory.push(cmd);
    historyIndex = commandHistory.length;

    // Clear terminal
    if (cmd === "clear") {
      terminalOutput.textContent = "";
      commandHistory = [];
      historyIndex = -1;
      return;
    }

    // Valid command
    if (validCommands[cmd]) {
      const section = document.getElementById(validCommands[cmd]);
      if (section) {
        section.scrollIntoView({ behavior: "smooth" });
        terminalOutput.textContent = `✔ Navigated to '${cmd}' section...`;
      }
    } else {
      terminalOutput.innerHTML = `❌ Unknown command: <strong>${cmd}</strong><br>
      🔧 Try one of: ${Object.keys(validCommands).join(", ")}`;
    }
  }

  // Arrow ↑ and ↓ for history
  if (e.key === "ArrowUp") {
    if (commandHistory.length && historyIndex > 0) {
      historyIndex--;
      const prev = commandHistory[historyIndex];
      terminalInput.value = prev;
      typedSpan.textContent = prev;
    }
  }

  if (e.key === "ArrowDown") {
    if (commandHistory.length && historyIndex < commandHistory.length - 1) {
      historyIndex++;
      const next = commandHistory[historyIndex];
      terminalInput.value = next;
      typedSpan.textContent = next;
    } else {
      terminalInput.value = "";
      typedSpan.textContent = "";
      historyIndex = commandHistory.length;
    }
  }
});

//booting effect 
setTimeout(() => {
  const bootScreen = document.getElementById("boot-screen");
  bootScreen.style.display = "none";
  document.getElementById("main-content").classList.add("fade-up");
}, 4000);

//command history


