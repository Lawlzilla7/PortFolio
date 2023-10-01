// Get the element with id "Tiles"
const wrapper = document.getElementById("Tiles");

// Initialize a variable to keep track of whether the tiles are toggled or not
let toggled = false;

// Function to handle click event on a tile
const HandleOnClick = index => {
  // Toggle the value of toggled
  toggled = !toggled;

  document.querySelector("#FrontPage").classList.toggle("toggled");
  // Use anime.js library to animate the opacity of elements with class "Tile"
  anime({
    targets: ".Tile",
    opacity: toggled ? 0 : 1,
    delay: anime.stagger(60, {
      grid: [Columns, Rows],
      from: index
    })
  });
}

// Function to create a tile element
const CreateTile = index => {
  // Create a div element
  const Tile = document.createElement("div");

  // Add class "Tile" to the div element
  Tile.classList.add("Tile");

  // Set onclick event listener on the div element to call HandleOnClick function with index as argument
  Tile.onclick = e => HandleOnClick(index);

  // Return the div element
  return Tile;
}

// Function to create multiple tile elements and append them to wrapper element
const CreateTiles = quantity => {
  // Create an array of length quantity and map over it
  Array.from(Array(quantity)).map((Tile, index) => {
    // Append a new tile element created by calling CreateTile function with index as argument to wrapper element
    wrapper.appendChild(CreateTile(index));
  });
}

// Function to create a grid of tiles
const CreateGrid = () => {
  // Clear the innerHTML of wrapper element
  wrapper.innerHTML = "";

  // Calculate the number of columns and rows based on the size of wrapper element and size of each tile (80px)
  Columns = Math.floor(wrapper.clientWidth / 80),
    Rows = Math.floor(wrapper.clientHeight / 80);

  // Set CSS variables --columns and --rows on wrapper element to Columns and Rows respectively
  wrapper.style.setProperty("--columns", Columns);
  wrapper.style.setProperty("--rows", Rows);

  // Call CreateTiles function with Columns * Rows as argument to create a grid of tiles
  CreateTiles(Columns * Rows);
}

// Call CreateGrid function to create initial grid of tiles
CreateGrid();
// Set onresize event listener on window object to call CreateGrid function when window is resized
window.onresize = () => CreateGrid();


