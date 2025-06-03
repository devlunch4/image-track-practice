const track = document.getElementById("image-track");

let mouseDownAt = 0;
let prevPercentage = 0;

const handleDown = (e) => (mouseDownAt = e.clientX || e.touches[0].clientX);
const handleUp = () => {
  mouseDownAt = 0;
  prevPercentage = parseFloat(track.dataset.percentage) || 0;
};

const handleMove = (e) => {
  if (!mouseDownAt) return;

  const clientX = e.clientX || e.touches[0].clientX;
  const delta = mouseDownAt - clientX;
  const maxDelta = window.innerWidth / 2;
  const percentage = (delta / maxDelta) * -100;
  const next = Math.max(Math.min(prevPercentage + percentage, 0), -100);

  track.dataset.percentage = next;

  track.animate(
    { transform: `translate(${next}%, -50%)` },
    { duration: 1200, fill: "forwards" }
  );

  for (const img of track.getElementsByClassName("image")) {
    img.animate(
      { objectPosition: `${100 + next}% center` },
      { duration: 1200, fill: "forwards" }
    );
  }
};

window.addEventListener("mousedown", handleDown);
window.addEventListener("touchstart", handleDown);
window.addEventListener("mouseup", handleUp);
window.addEventListener("touchend", handleUp);
window.addEventListener("mousemove", handleMove);
window.addEventListener("touchmove", handleMove);
