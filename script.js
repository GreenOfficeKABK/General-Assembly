//PAINTING

// const canvas = document.getElementById('paintCanvas');
// const ctx = canvas.getContext('2d');

// // Initialize the hue and direction for extremely subtle gradient cycling
// let greenHue = 175; // Start in the middle of the subtle range
// let hueDirection = 0.1; // Controls brightening and darkening

// // Variables to track the last position and brush size
// let lastX = null;
// let lastY = null;
// let brushSize = window.innerWidth > 768 ? 80 : 40; // Set brush size based on screen width

// // Function to set up and resize the canvas
// function setupCanvas() {
//     canvas.width = window.innerWidth;
//     canvas.height = window.innerHeight;
//     // Update brush size if the screen is resized
//     brushSize = window.innerWidth > 768 ? 80 : 40;
// }

// // Call setupCanvas on load and on resize
// window.addEventListener('load', setupCanvas);
// window.addEventListener('resize', setupCanvas);

// // Function to get a very subtly changing green shade with an even slower rate of change
// function getGradientGreen() {
//     // Adjust green shade within an extremely narrow range, with a very slow change rate
//     greenHue += hueDirection * 0.02; // Slower rate of change

//     // Reverse direction if it hits the subtle bounds
//     if (greenHue >= 180 || greenHue <= 170) {
//         hueDirection *= -1;
//     }

//     // Set color with a high opacity for a smooth, solid look
//     return `rgba(0, ${greenHue}, 0, 0.95)`;
// }

// // Function to handle the painting effect with a larger, continuous brush stroke
// function paint(e) {
//     const rect = canvas.getBoundingClientRect();
//     const x = (e.clientX || e.touches[0].clientX) - rect.left;
//     const y = (e.clientY || e.touches[0].clientY) - rect.top;

//     // If there is a last position, draw large circles from the last position to the current position
//     if (lastX !== null && lastY !== null) {
//         const distance = Math.hypot(x - lastX, y - lastY);
//         const stepX = (x - lastX) / distance;
//         const stepY = (y - lastY) / distance;

//         // Draw larger circles between last position and current position
//         for (let i = 0; i < distance; i++) {
//             const currentX = lastX + stepX * i;
//             const currentY = lastY + stepY * i;
//             ctx.fillStyle = getGradientGreen();
//             ctx.beginPath();
//             ctx.arc(currentX, currentY, brushSize, 0, Math.PI * 2); // Dynamic brush radius
//             ctx.fill();
//         }
//     }

//     // Update last position to the current position
//     lastX = x;
//     lastY = y;
// }

// // Reset last position when the user stops painting (mouse up or touch end)
// function resetPosition() {
//     lastX = null;
//     lastY = null;
// }

// // Listen for mousemove or touchmove events to paint
// canvas.addEventListener('mousemove', paint);
// canvas.addEventListener('touchmove', (e) => {
//     paint(e);
//     e.preventDefault(); // Prevents scrolling on touch devices
// });

// // Listen for mouseup or touchend to reset last position
// canvas.addEventListener('mouseup', resetPosition);
// canvas.addEventListener('touchend', resetPosition);

const canvas = document.getElementById('paintCanvas');
    const ctx = canvas.getContext('2d');

    // Initialize the hue and direction for extremely subtle gradient cycling
    let greenHue = 175;  // Start in the middle of the subtle range
    let hueDirection = 0.1;

    // Variables to track the last position and brush size
    let lastX = null;
    let lastY = null;
    let brushSize = window.innerWidth > 768 ? 80 : 40;

    // Function to set up and resize the canvas
    function setupCanvas() {
      // Adjust for high-DPI screens
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      ctx.scale(dpr, dpr);

      // Update brush size based on screen width
      brushSize = window.innerWidth > 768 ? 80 : 40;
    }

    // Call setupCanvas on load and on resize
    window.addEventListener('load', setupCanvas);
    window.addEventListener('resize', setupCanvas);

    // Function to get a subtle green shade with an even slower rate of change
    function getGradientGreen() {
      greenHue += hueDirection * 0.05;
      if (greenHue >= 180 || greenHue <= 175) {
        hueDirection *= -1;
      }
      return `rgba(0, ${greenHue}, 0, .95)`;
    }

    // Function to handle the painting effect with a larger, continuous brush stroke
    function paint(e) {
      const rect = canvas.getBoundingClientRect();
      const x = (e.clientX || e.touches[0].clientX) - rect.left;
      const y = (e.clientY || e.touches[0].clientY) - rect.top;

      if (lastX !== null && lastY !== null) {
        const distance = Math.hypot(x - lastX, y - lastY);
        const stepX = (x - lastX) / distance;
        const stepY = (y - lastY) / distance;

        // Draw larger circles between last position and current position
        for (let i = 0; i < distance; i++) {
          const currentX = lastX + stepX * i;
          const currentY = lastY + stepY * i;
          ctx.fillStyle = getGradientGreen();
          ctx.beginPath();
          ctx.arc(currentX, currentY, brushSize, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      lastX = x;
      lastY = y;
    }

    // Reset last position when the user stops painting (mouse up or touch end)
    function resetPosition() {
      lastX = null;
      lastY = null;
    }

    // Listen for mousemove or touchmove events to paint
    document.addEventListener('mousemove', paint);
    document.addEventListener('touchmove', (e) => {
      paint(e);
      e.preventDefault();
    });

    // Listen for mouseup or touchend to reset last position
    document.addEventListener('mouseup', resetPosition);
    document.addEventListener('touchend', resetPosition);

    // Set up the canvas initially
    setupCanvas();

//COLON FLICKER

// Get a reference to the colon element
// const colon = document.getElementById("colon");
const colonElements = document.querySelectorAll("#colon");

// Toggle the visibility of the colon every second
setInterval(() => {
    colonElements.forEach(colon => {
      colon.style.visibility = colon.style.visibility === "visible" ? "hidden" : "visible";
    });
  }, 1450);


  




// Array of image URLs to randomly select from
const imageUrls = [
    'images/brush.svg',
    'images/chair.svg',
    'images/cup.svg',
    'images/table.svg'
  ];

  // Function to create an image element with random attributes
  function createRandomImage() {
    // Select a random image URL
    const randomImageUrl = imageUrls[Math.floor(Math.random() * imageUrls.length)];

    // Create the image element
    const img = document.createElement("img");
    img.src = randomImageUrl;
    img.classList.add("random-image");

    // Position image randomly within the viewport
    const xPos = Math.random() * (window.innerWidth - 50);
    const yPos = Math.random() * (window.innerHeight - 50);
    img.style.left = `${xPos}px`;
    img.style.top = `${yPos}px`;

    // Append the image to the document body
    document.body.appendChild(img);

    // Remove the image after a few seconds with a fade-out effect
    setTimeout(() => {
      img.style.opacity = "0"; // Trigger CSS transition for fade-out
      setTimeout(() => img.remove(), 500); // Remove the element after fade-out
    }, 2000);
  }

  // Function to periodically create images
  function startRandomImagePopups() {
    setInterval(createRandomImage, 1000); // Generate an image every second
  }

  // Start generating image popups
  startRandomImagePopups();