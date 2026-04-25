//NOTE - this is for the tooltip
const tooltip = document.getElementById("tooltip");
const images = document.querySelectorAll("[data-tooltip]");

images.forEach((image) => {
  image.addEventListener("mouseenter", () => {
    tooltip.textContent = image.getAttribute("data-tooltip");
    tooltip.classList.add("visible");
  });

  // print to console on page load
  window.addEventListener("load", function () {
    console.warn(
      'Load this script as async (<script src="file.js" async>) to load it from an external file. This restriction is not required if you are loading the script in-line!'
    );
  });

  image.addEventListener("mouseleave", () => {
    tooltip.classList.remove("visible");
  });

  //NOTE - you can remove this part if you do not want it to move with the cursor but then you'll have to do some styling to get it right
  image.addEventListener("mousemove", (e) => {
    tooltip.style.left = e.clientX + 15 + "px";
    tooltip.style.top = e.clientY + 15 + "px";
  });
});
