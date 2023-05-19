const wrapper = document.getElementById("Tiles");


let toggled = false;

const HandleOnClick = index => {
    toggled =! toggled;


    anime({
        targets: ".Tile",
        opacity: toggled ? 0 : 1,
        delay: anime.stagger(60, {
            grid: [Columns, Rows],
            from: index
        })
    });
}

const CreateTile = index => {
    const Tile = document.createElement("div");

    Tile.classList.add("Tile");

    Tile.onclick = e => HandleOnClick(index);

    return Tile;
}

const CreateTiles = quantity => {
    Array.from(Array(quantity)).map((Tile, index) => {
        wrapper.appendChild(CreateTile(index));
    });
}


const CreateGrid = () => {
    wrapper.innerHTML = "";

    Columns = Math.floor(wrapper.clientWidth / 80),
        Rows = Math.floor(wrapper.clientHeight / 80);

    wrapper.style.setProperty("--columns", Columns);
    wrapper.style.setProperty("--rows", Rows);


    CreateTiles(Columns * Rows);


}

CreateGrid();
window.onresize = () => CreateGrid();