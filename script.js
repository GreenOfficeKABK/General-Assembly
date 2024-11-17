const canvas = document.getElementById('paintCanvas');
const ctx = canvas.getContext('2d');


let lastX = null;
let lastY = null;
let brushSize = window.innerWidth > 768 ? 80 : 40;


const strokes = [];


function setupCanvas() {
  const dpr = window.devicePixelRatio || 1;
  canvas.width = window.innerWidth * dpr;
  canvas.height = window.innerHeight * dpr;
  ctx.scale(dpr, dpr);

  brushSize = window.innerWidth > 768 ? 80 : 40;
}


window.addEventListener('load', setupCanvas);
window.addEventListener('resize', setupCanvas);


function paint(e) {
  const rect = canvas.getBoundingClientRect();
  const x = (e.clientX || e.touches[0].clientX) - rect.left;
  const y = (e.clientY || e.touches[0].clientY) - rect.top;

  if (lastX !== null && lastY !== null) {
    const distance = Math.hypot(x - lastX, y - lastY);


    const step = Math.max(2, brushSize / 12); 
    const steps = Math.floor(distance / step);

    const stepX = (x - lastX) / steps;
    const stepY = (y - lastY) / steps;

    for (let i = 0; i < steps; i++) {
      const currentX = lastX + stepX * i;
      const currentY = lastY + stepY * i;

      strokes.push({
        x: currentX,
        y: currentY,
        size: brushSize,
        opacity: 0.95,
        timestamp: Date.now(),
      });
    }
  }

  lastX = x;
  lastY = y;
}


function resetPosition() {
  lastX = null;
  lastY = null;
}


function fadeOutStrokes() {
  const now = Date.now();
  ctx.clearRect(0, 0, canvas.width, canvas.height);


  for (let i = strokes.length - 1; i >= 0; i--) {
    const stroke = strokes[i];
    const elapsed = (now - stroke.timestamp) / 1000;

    if (elapsed > 15) {
 
      strokes.splice(i, 1);
      continue;
    }


    const remainingOpacity = 0.95 * (1 - elapsed / 15);
    stroke.opacity = remainingOpacity;


    ctx.fillStyle = `rgba(0, 175, 0, ${stroke.opacity})`; 
    ctx.beginPath();
    ctx.arc(stroke.x, stroke.y, stroke.size, 0, Math.PI * 2);
    ctx.fill();
  }


  requestAnimationFrame(fadeOutStrokes);
}


fadeOutStrokes();


document.addEventListener('mousemove', paint);
document.addEventListener('touchmove', (e) => {
  paint(e);
  e.preventDefault();
});


document.addEventListener('mouseup', resetPosition);
document.addEventListener('touchend', resetPosition);


setupCanvas();




//______



const colonElements = document.querySelectorAll("#colon");
setInterval(() => {
    colonElements.forEach(colon => {
      colon.style.visibility = colon.style.visibility === "visible" ? "hidden" : "visible";
    });
  }, 1450);


  
//______




const imageUrls = [
    'images/brush.svg',
    'images/chair.svg',
    'images/cup.svg',
    'images/table.svg'
  ];


  function createRandomImage() {

    const randomImageUrl = imageUrls[Math.floor(Math.random() * imageUrls.length)];


    const img = document.createElement("img");
    img.src = randomImageUrl;
    img.classList.add("random-image");


    const xPos = Math.random() * (window.innerWidth - 50);
    const yPos = Math.random() * (window.innerHeight - 50);
    img.style.left = `${xPos}px`;
    img.style.top = `${yPos}px`;


    document.body.appendChild(img);


    setTimeout(() => {
      img.style.opacity = "0";
      setTimeout(() => img.remove(), 500); 
    }, 2000);
  }


  function startRandomImagePopups() {
    setInterval(createRandomImage, 1000); 
  }

  // Start generating image popups
  startRandomImagePopups();
