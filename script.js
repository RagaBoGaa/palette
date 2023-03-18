// ==================== Setup elements
const containerBox = document.querySelector(".box-container");
const generateBtn = document.querySelector(".btn");
let colorPalette = 20;

// ==================== Functions
const generateRandomColor = () => {
  containerBox.innerHTML = "";
  for (let i = 0; i < colorPalette; i++) {
    // Generating random hex color code and adds # to it.
    let randomColor = Math.random().toString(16).slice(3, 9);
    let fullColor = `#${randomColor}`;

    // Create a color box div (contains the colored div and span holds the hex value)
    let colorBox = document.createElement("div");
    colorBox.classList.add("color-box");
    colorBox.innerHTML = `<div class="rec" style = background-color:${fullColor}></div>
                          <span class="hex-color">${fullColor}</span>`;

    // Adds click event on the colorBox i created to run a function that copies the hex code
    containerBox.appendChild(colorBox);
    colorBox.addEventListener("click", () => copyColor(colorBox, fullColor));
  }
};
generateRandomColor();

const copyColor = (el, hex) => {
  const colorElement = el.querySelector(".hex-color");
  // Copies the value of hex value aka. (fullColor) and sets fallback for mobile browsers
  if (navigator.clipboard) {
    navigator.clipboard
      .writeText(hex)
      .then(() => {
        colorElement.innerHTML = "Copied!";
        setTimeout(() => {
          colorElement.innerText = hex;
        }, 1000);
      })
      .catch((error) => console.error("Failed to copy text: ", error));
  } else {
    var textarea = document.createElement("textarea");
    textarea.value = hex;
    document.body.appendChild(textarea);
    textarea.select();
    try {
      document.execCommand("copy");
      colorElement.innerHTML = "Copied!";
      setTimeout(() => {
        colorElement.innerText = hex;
      }, 1000);
    } catch (error) {
      console.error("Failed to copy text: ", error);
    }
    document.body.removeChild(textarea);
  }

  // ============ Read copied text from the clipboard
  /* navigator.clipboard
      .readText()
      .then((re) => {
        console.log("Hex code you copied is:", re);
      })
      .catch((error) => {
        console.error("Failed to copy the hex code:", error);
      }); */
};

// ==================== Events
generateBtn.addEventListener("click", generateRandomColor);
