function playSound(e) {
  // Grabs event.code elements from HTML
  const audio = document.querySelector(`audio[data-key="${e.code}"]`);
  const key = document.querySelector(`.key[data-key="${e.code}"]`);

  // If no audio is bound to a keypress, stop function
  if (!audio) return;

  key.classList.add("playing");
  audio.currentTime = 0;
  audio.play();

  // Fallback to fix a "feature" where if the key was held it wouldn't get its class removed, and this ensures it does
  setTimeout(() => key.classList.remove("playing"), 70);
}

function removeTransform(e) {
  if (e.propertyName !== "transform") return;
  e.target.classList.remove("playing");
}

function setupListeners() {
  const keys = document.querySelectorAll(".key");

  // Event listener that ties the keypresses to the sound that will play
  window.addEventListener("keydown", playSound);

  // Checks for when the transition has ended and runs function to remove the "playing" class
  keys.forEach((key) => {
    key.addEventListener("transitionend", removeTransform);
  });
}

setupListeners();

// Function that creates then appends buttons and audio to body of HTML
function createDrumButtonsAndAudio(buttonData) {
  const buttonContainer = document.querySelector("#drumButtons");

  buttonData.forEach(({ key, soundName }) => {
    // Create button
    const button = document.createElement("button");
    button.classList.add("key");
    button.setAttribute("data-key", key);

    // Create kbd for the key label
    const label = key.slice(-1);
    const kbd = document.createElement("kbd");
    kbd.textContent = label;

    // Add kbd and sound name to the button
    const soundText = document.createTextNode(soundName);
    button.appendChild(kbd);
    button.appendChild(soundText);

    // Append button to the button section
    buttonContainer.append(button);

    // Create audio
    const soundSrc = `sounds/${soundName.toLowerCase()}.wav`;
    const audio = document.createElement("audio");
    audio.setAttribute("data-key", key);
    audio.setAttribute("src", soundSrc);
    audio.setAttribute("preload", "auto");

    // Append audio to the body (IMPORTANT! function playSound will not work without audio in the body)
    document.body.appendChild(audio);
  });
}

// Button & Audio data blueprint
const drumData = [
  {
    key: "KeyQ",
    soundName: "CLAP",
  },
  {
    key: "KeyW",
    soundName: "HIHAT",
  },
  {
    key: "KeyE",
    soundName: "KICK",
  },
  {
    key: "KeyR",
    soundName: "OPENHAT",
  },
  {
    key: "KeyT",
    soundName: "RIDE",
  },
  {
    key: "KeyY",
    soundName: "SNARE",
  },
  {
    key: "KeyU",
    soundName: "TINK",
  },
  {
    key: "KeyI",
    soundName: "TOM",
  },
];

createDrumButtonsAndAudio(drumData);
