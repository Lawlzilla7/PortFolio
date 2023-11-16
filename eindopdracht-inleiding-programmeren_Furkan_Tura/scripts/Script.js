//test too see if script is working
console.log("!!!");
//#region var declaration

//Main window
var CanvasVar = document.getElementById("CanvasElement");
var Context = CanvasVar.getContext("2d");

//Zoom window
var Zoom = document.getElementById("ZoomElement");
var ZoomContext = Zoom.getContext("2d");

//Confetti 
var ConffettiRight = document.querySelector(".Confetti-right");
var ConffettiLeft = document.querySelector(".Confetti-left");
ConffettiLeft.src = '';
ConffettiRight.src = '';

//image source and declaration
var Scale = 1;
var Img = new Image();
Img.src = './images/found_images/waldokleiner.png';

//Selectors for images
var Dief = document.querySelector(".Dief");
var Stoereman = document.querySelector(".Stoereman");
var wallie = document.querySelector(".wallie");
var Tovenaar = document.querySelector(".Tovenaar");
var Toren = document.querySelector(".Toren");

//Check found status
var DiefFound = false;
var StoeremanFound = false;
var wallieFound = false;
var TovenaarFound = false;
var TorenFound = false;

var h1 = document.querySelector(".Win");

//code for zoom window ignore itself to drag
Zoom.style.pointerEvents = "none";

var ModalWindow = document.querySelector(".Modal");
var ModalContent = document.querySelector(".Modal-Content");
var CloseModal = document.querySelector(".Close-Modal");

var ModalH1 = document.querySelector(".Uitleg");
var ModalP = document.querySelector("p");
var ModalButton = document.querySelector(".ModalRetry");

ModalButton.style.display = "none";
//#endregion

//Buttons array with all parameters set like placement, size and color for debugging
var buttons = [{
        x: 15,
        y: 200,
        width: 80,
        height: 50,
        color: 'blue'
    },
    {
        x: 315,
        y: 500,
        width: 50,
        height: 100,
        color: 'red'
    },
    {
        x: 770,
        y: 215,
        width: 50,
        height: 100,
        color: 'orange'
    },
    {
        x: 260,
        y: 200,
        width: 50,
        height: 50,
        color: 'black'
    }, {
        x: 860,
        y: 20,
        width: 100,
        height: 100,
        color: 'green'
    }
];

//onload initialise image and scaling to the canvas size using naturalwidth
Img.onload = function () {
    //Get aspect ratio from image to avoid scaling artifacts when scaling down
    CanvasVar.width = this.naturalWidth;
    CanvasVar.height = this.naturalHeight;
    //same goes for zoom window
    ZoomContext.width = this.naturalWidth;
    ZoomContext.height = this.naturalHeight;
    //draw image on 0,0 from top left
    Context.drawImage(Img, 0, 0);
    Draw_Image();
}


//pop up window when loading the page with instsructions
CloseModal.addEventListener("click", function () {
    ModalWindow.style.display = "none";
})

//when moving mouse places a second canvas that is more "zoomed in"
CanvasVar.addEventListener("mousemove", function (i) {
    ZoomContext.fillStyle = "white";
    ZoomContext.fillRect(0, 0, ZoomContext.width, ZoomContext.height);

    //slides the second canvas image so you can see most of the canvas
    var dx = Math.min(Math.max(i.x - 450, 0), CanvasVar.width + 50);
    var dy = Math.min(Math.max(i.y - 0, -250), CanvasVar.height + 50);

    //draw image minus previous local vars with offsets
    ZoomContext.drawImage(CanvasVar, -dx, -dy, CanvasVar.width, CanvasVar.height);

    //mouse cursor middle of zoom window
    var zoomTop = i.pageY - 170;
    var zoomLeft = i.pageX - 250;

    //styling
    Zoom.style.top = zoomTop + "px";
    Zoom.style.left = zoomLeft + "px";
    Zoom.style.display = "block";
});
//remove zoom window when off main canvas
CanvasVar.addEventListener("mouseout", function () {
    Zoom.style.display = "none";
});

//draw background image 
function Draw_Image() {
    Context.clearRect(0, 0, CanvasVar.width, CanvasVar.height);
    Context.save();
    Context.drawImage(Img, 0, 0, CanvasVar.width, CanvasVar.height);

    //draw buttons for debugging
    // for (var i = 0; i < buttons.length; i++) {
    //     var button = buttons[i];
    //     Context.fillStyle = button.color;
    //     Context.fillRect(button.x + button.height, button.y + button.width, button.width, button.height);
    // }
    Context.restore();
}

//clickable areas, when the mouse is in between certain coords on the canvas and you click the left mouse button,
//run the handleButtonClick function with the buttons array plus index
CanvasVar.addEventListener('click', function (event) {
    //Gets canvas data from DOM
    var rect = CanvasVar.getBoundingClientRect();
    //coords from top left divided by scale so that is on the correct place even when scaled down like in my case
    var x = (event.clientX - rect.left) / Scale;
    var y = (event.clientY - rect.top) / Scale;

    //place buttons using parameters from buttons array
    for (var i = 0; i < buttons.length; i++) {
        var button = buttons[i];
        if (x >= button.x && x <= button.x + button.width && y >= button.y && y <= button.y + button.height) {
            handleButtonClick(i);
            break;
        }
    }
});

//buttons switch case with all the logic per button click
function handleButtonClick(buttonIndex) {
    switch (buttonIndex) {
        case 0:
            //console.log('Dief found');
            Dief.style.opacity = "1";
            DiefFound = true;
            Wincheck();
            break;
        case 1:
            //console.log('Stoereman found');
            Stoereman.style.opacity = "1";
            StoeremanFound = true;
            Wincheck();
            break;
        case 2:
            //console.log('Wallie found');
            wallie.style.opacity = "1";
            wallieFound = true;
            Wincheck();
            break;
        case 3:
            //console.log('Tovenaar found');
            Tovenaar.style.opacity = "1";
            TovenaarFound = true;
            // console.log(TovenaarFound);
            Wincheck();
            break;
        case 4:
            //console.log('Toren found');
            Toren.style.opacity = "1";
            TorenFound = true;
            Wincheck();
            break;
    }
}

//checks per button click and logic after all are found
function Wincheck() {
    if (DiefFound === true && StoeremanFound === true && wallieFound === true && TovenaarFound === true && TorenFound === true) {
        h1.textContent = "Gewonnen Gefeliciteerd";
        console.log("DONE!")
        //conffetti gif source
        ConffettiLeft.src = './images/found_images/confetti-left.gif';
        ConffettiRight.src = './images/found_images/confetti-right.gif';

        //makes the gif bigger after you win
        ConffettiRight.style.width = "40vw"
        ConffettiLeft.style.width = "40vw"
        //Removes the zoom window on ending
        Zoom.parentNode.removeChild(Zoom);

        //Turns the pop up window visible after winning and changes the text and sizes to make them a bit bigger
        ModalWindow.style.display = "block";

        //Modal win title text and size
        ModalH1.textContent = "GEWONNEN!";
        ModalH1.style.color = "#f4f4f4";
        ModalH1.style.fontSize = "48px";

        //Modal win text size
        ModalP.textContent = "Gefeliciteerd je hebt ze allemaal gevonden!"
        ModalP.style.fontSize = "36px";
        ModalP.style.color = "#f4f4f4";

        //Turns the retry button on and changes the class of the window to Modal-Win for the animated background
        ModalButton.style.display = "block";
        ModalButton.addEventListener('click', function () {
            location.reload();
        });
        ModalContent.classList = 'Modal-Win';
    } else {
        //plays the gif when you 
        ConffettiLeft.src = './images/found_images/confetti-left.gif';
        ConffettiRight.src = './images/found_images/confetti-right.gif';
        setTimeout(() => {
            ConffettiLeft.src = '';
            ConffettiRight.src = '';
        }, 1800);
    }
}

//#region debugging
// var h1 = document.querySelector('.Coords');
// CanvasVar.addEventListener('mousemove', function (event) {
//     var x = event.clientX - CanvasVar.offsetLeft;
//     var y = event.clientY - CanvasVar.offsetTop;
//     //h1.innerHTML = "x: " + x + ", y: " + y;
// });

//function to go through all images in the remaining div and prints them in the console used for debugging
// function GetAllImages() {
//     var className = document.querySelectorAll('.Remaining_Image');
//     var classNamelength = className.length;
//     var ImageArray = new Array();

//     for (var i = 0; i < classNamelength; i++) {
//         ImageArray[i] = className[i].id;
//     }
//     console.log(ImageArray.length);
// }
// GetAllImages();
//#endregion