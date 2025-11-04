const bodyEl = document.querySelector("body");

bodyEl.addEventListener("mousemove", (event) => {
  const xPos = event.pageX;
  const yPos = event.pageY;

  const spanEl = document.createElement("span");
  spanEl.style.left = `${xPos}px`;
  spanEl.style.top = `${yPos}px`;

  // random size
  const size = Math.random() * 60 + 20;
  spanEl.style.width = `${size}px`;
  spanEl.style.height = `${size}px`;

  // random hue (color)
  const hue = Math.floor(Math.random() * 360);
  spanEl.style.filter = `hue-rotate(${hue}deg)`;

  // add heart
  bodyEl.appendChild(spanEl);

  // remove after animation ends
  setTimeout(() => {
    spanEl.remove();
  }, 3000);
});
