function generateColor() {
  const container = document.querySelector(".container");
  const colorHexText = document.querySelector(".colorHex");

  // Generate random color
  let randNum = Math.floor(Math.random() * 0xffffff)
    .toString(16)
    .padEnd(6, "0");

  // Set background color
  container.style.background = "#" + randNum;

  // Update the color hex text
  colorHexText.innerText = "#" + randNum;

  // Calculate luminance of the background color
  const r = parseInt(randNum.substring(0, 2), 16);
  const g = parseInt(randNum.substring(2, 4), 16);
  const b = parseInt(randNum.substring(4, 6), 16);

  // Formula to calculate luminance based on RGB values
  const luminance = 0.2126 * r + 0.7152 * g + 0.0722 * b;

  // Invert the text color based on luminance (dark or light background)
  if (luminance < 128) {
    colorHexText.style.color = "white"; // Dark background
  } else {
    colorHexText.style.color = "black"; // Light background
  }
}
