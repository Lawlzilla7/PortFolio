// Get the element with id "ItemContainer"
const track = document.getElementById("ItemContainer");

// Function to handle mouse down event
const handleOnDown = e => {
  // Set the value of the data attribute "mouseDownAt" to the current x position of the mouse
  track.dataset.mouseDownAt = e.clientX;
};

// Function to handle mouse up event
const handleOnUp = () => {
  // Reset the value of the data attribute "mouseDownAt" to 0
  track.dataset.mouseDownAt = "0";
  // Set the value of the data attribute "prevPercentage" to the current value of the data attribute "percentage"
  track.dataset.prevPercentage = track.dataset.percentage;
}

// Function to handle mouse move event
const handleOnMove = e => {
  // If the value of the data attribute "mouseDownAt" is 0, return and do nothing
  if(track.dataset.mouseDownAt === "0") return;

  // Calculate the difference between the current x position of the mouse and the value of the data attribute "mouseDownAt"
  const mouseDelta = parseFloat(track.dataset.mouseDownAt) - e.clientX,
    // Calculate half of the window's inner width
    maxDelta = window.innerWidth / 2;

  // Calculate the percentage based on mouseDelta and maxDelta
  const percentage = (mouseDelta / maxDelta) * -100,
    // Calculate the next percentage by adding percentage to the value of the data attribute "prevPercentage"
    nextPercentageUnconstrained = parseFloat(track.dataset.prevPercentage) + percentage,
    // Constrain nextPercentage between -100 and 0
    nextPercentage = Math.max(Math.min(nextPercentageUnconstrained, 0), -100);

  // Set the value of the data attribute "percentage" to nextPercentage
  track.dataset.percentage = nextPercentage;

  // Animate track element's transform property
  track.animate({
    transform: `translate(${nextPercentage}%, -50%)`
  }, { duration: 800, fill: "forwards" });

  // Get all elements with class "ProjectImage" within track element
  for(const image of track.getElementsByClassName("ProjectImage")) {
    // Animate image element's objectPosition property
    image.animate({
      objectPosition: `${100 + nextPercentage}% center`
    }, { duration: 800, fill: "forwards" });
  }
}

// Set event listeners for mouse and touch events on window object
window.onmousedown = e => handleOnDown(e);
window.ontouchstart = e => handleOnDown(e.touches[0]);
window.onmouseup = e => handleOnUp(e);
window.ontouchend = e => handleOnUp(e.touches[0]);
window.onmousemove = e => handleOnMove(e);
window.ontouchmove = e => handleOnMove(e.touches[0]);
