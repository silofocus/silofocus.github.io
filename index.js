/* Tagline randomization */
const taglines = [
    "Your digital health spa.",
    "Stay present.",
    "Goodbye screen addiction."
];

let tagline = taglines[Math.floor(Math.random() * taglines.length)];
document.getElementById("tagline").innerText = tagline


/* Gradient animation */
gsap.to('#logo-gradient', {
  xPercent: 100,
  repeat: -1,
  duration: 15,
  ease: "none"
});
