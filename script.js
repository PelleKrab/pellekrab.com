const typedNameElement = document.getElementById("typed-name");
const cursorElement = document.getElementById("cursor");

const nameToType = "./Pelle_Krabbenhoeft";
let currentIndex = 0;

function typeNextCharacter() {
    if (currentIndex < nameToType.length) {
        typedNameElement.textContent += nameToType[currentIndex];
        currentIndex++;
        setTimeout(typeNextCharacter, 100); // Adjust typing speed here
    } else {
        cursorElement.style.display = "none";
    }
}

typeNextCharacter();

// Blinking cursor effect
setInterval(() => {
    cursorElement.style.display = cursorElement.style.display === "none" ? "inline" : "none";
}, 500);
