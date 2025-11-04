const bodyEl = document.querySelector("body");

// Function to create heart
function createHeart(x, y) {
  const spanEl = document.createElement("span");
  spanEl.style.left = `${x}px`;
  spanEl.style.top = `${y}px`;

  // Random size (smaller for mobile)
  const size = Math.random() * 40 + 20;
  spanEl.style.width = `${size}px`;
  spanEl.style.height = `${size}px`;

  // Random color hue
  const hue = Math.floor(Math.random() * 360);
  spanEl.style.filter = `hue-rotate(${hue}deg)`;

  bodyEl.appendChild(spanEl);

  // Remove after animation
  setTimeout(() => {
    spanEl.remove();
  }, 3000);
}

// Desktop mouse move
bodyEl.addEventListener("mousemove", (event) => {
  createHeart(event.pageX, event.pageY);
});

// Mobile touch move
bodyEl.addEventListener("touchmove", (event) => {
  const touch = event.touches[0];
  createHeart(touch.pageX, touch.pageY);
});

// Also create heart on tap/click
bodyEl.addEventListener("click", (event) => {
  createHeart(event.pageX, event.pageY);
});
