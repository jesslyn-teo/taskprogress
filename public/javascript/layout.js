//////////////////////////////////////////////////////
// USED IN INDEX.HTML PAGE
//////////////////////////////////////////////////////
var i = 0;
var txt = [`Coding`, `BED`, `SP`, `Learning`, `DIT`];
var speed = 1000; // typing speed in milliseconds (increase for slower typing)
var currentWord = 0; // index of the current word being displayed
var displayText = "We Love "; // constant text to be displayed in the typewriter

// function to simulate a typewriter effect
function typeWriter() {
    var word = txt[currentWord];

    // updates only the changing word
    displayText = "We Love " + word;

    // displays the text in the designated element
    document.getElementById("typewriter").innerHTML = displayText;

    // logic for switching to the next word
    currentWord = (currentWord + 1) % txt.length;

    // the next iteration of the typewriter effect
    setTimeout(typeWriter, speed);
}

// start the typewriter effect
typeWriter();

