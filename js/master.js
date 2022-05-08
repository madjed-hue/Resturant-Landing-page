// check if there is colors options in local storage
let mainColors = localStorage.getItem("color_option");

if (mainColors !== null) {
  // console.log('local storage is not empty you can set it in root now');
  // console.log(localStorage.getItem("color_option"));

  document.documentElement.style.setProperty("--main--color", mainColors);

  //remove active class from all colors list items(li)
  document.querySelectorAll(".colors-list li").forEach((element) => {
    element.classList.remove("active");

    //add active class on element with data-colors === local storage item
    if (element.dataset.color === mainColors) {
      //add active class
      element.classList.add("active");
    }
  });
}

//random background option
let backgroundOption = true;

// variable to controle the background interval
let backgroundInterval;

//check if there is local storge random background item
let backgroundLocalItem = localStorage.getItem("background_option");

//check if local storage background is not empty (has value)
if (backgroundLocalItem !== null) {
  if (backgroundLocalItem === "true") {
    backgroundOption = true;
  } else {
    backgroundOption = false;
  }

  // remove active class from all span
  document.querySelectorAll(".random-backgrounds span").forEach((element) => {
    element.classList.remove("active");
  });

  if (backgroundLocalItem === "true") {
    document.querySelector(".random-backgrounds .yes").classList.add("active");
  } else {
    document.querySelector(".random-backgrounds .no").classList.add("active");
  }
}

//toggle spin icon on gear
document.querySelector(".toggle-settings .fa-gear").onclick = function () {
  //toggle class fa-gear to spin around itself
  this.classList.toggle("fa-spin");

  //toggle class open on the main settings-box
  document.querySelector(".settings-box").classList.toggle("open");
};

//switch colors
const colorsLi = document.querySelectorAll(".colors-list li");
colorsLi.forEach((li) => {
  //cick on every list items (li)
  li.addEventListener("click", (e) => {
    //set color on root
    document.documentElement.style.setProperty(
      "--main--color",
      e.target.dataset.color
    );

    //set color on local storage
    localStorage.setItem("color_option", e.target.dataset.color);

    handleActive(e);
  });
});

//switch background
const randBackgroundEl = document.querySelectorAll(".random-backgrounds span");
randBackgroundEl.forEach((span) => {
  //cick on every list items (li)
  span.addEventListener("click", (e) => {
    handleActive(e);

    if (e.target.dataset.background === "yes") {
      backgroundOption = true;

      randomizeImgs();

      localStorage.setItem("background_option", true);
    } else {
      backgroundOption = false;

      clearInterval(backgroundInterval);

      localStorage.setItem("background_option", false);
    }
  });
});

//selecting landing page element
let landingPage = document.querySelector(".landing-page");

// Get array of images
let imgsArray = [
  "food1.png",
  "food2.jpg",
  "food3.jpeg",
  "food4.jpg",
  "food5.jpg",
  "food6.jpg",
];

//function to randomize images

function randomizeImgs() {
  if (backgroundOption === true) {
    backgroundInterval = setInterval(() => {
      //get random number
      let randomNumber = Math.floor(Math.random() * imgsArray.length);

      //change background image url
      landingPage.style.backgroundImage =
        'url("imgs/' + imgsArray[randomNumber] + '")';
    }, 5000);
  }
}

randomizeImgs();

//skills animation ---------------------------------------------------

//select skills selectr

let ourSkills = document.querySelector(".skills");

window.onscroll = function () {
  //skill offset top

  let skillsOffsetTop = ourSkills.offsetTop;

  //skills outer Height

  let skillsOuterHeight = ourSkills.offsetHeight;

  // skills window height

  let windowHeight = this.innerHeight;

  // window scroll top

  let windowScrollTop = this.pageYOffset;

  if (windowScrollTop > skillsOffsetTop + skillsOuterHeight - windowHeight) {
    let allSkills = document.querySelectorAll(
      ".skill-box .skill-progress span"
    );

    allSkills.forEach((skill) => {
      skill.style.width = skill.dataset.progress;
    });
  }
};

// greate popup for images
let ourGallery = document.querySelectorAll(".gallery img");

ourGallery.forEach((img) => {
  img.addEventListener("click", (e) => {
    // Create popup overlay element
    let overlay = document.createElement("div");

    //add class to the overlay created
    overlay.className = "popup-overlay";

    //append overlay to the body
    document.body.appendChild(overlay);

    //create the popupBox
    let popupBox = document.createElement("div");

    //add class to popupBox
    popupBox.className = "popup-box";

    if (img.alt !== null) {
      //create heading
      let imageHeading = document.createElement("h3");

      //create text for heading
      let imageText = document.createTextNode(img.alt);

      //append the text to heading
      imageHeading.appendChild(imageText);

      // append the heading to the popupBox
      popupBox.appendChild(imageHeading);
    }

    //create the image
    let popupImage = document.createElement("img");

    //set image src
    popupImage.src = img.src;

    //Add image to popup Box
    popupBox.appendChild(popupImage);

    //append popup box to the body
    document.body.appendChild(popupBox);

    //create the close span
    let closeButton = document.createElement("span");

    //create the close button text
    let closeButtonText = document.createTextNode("X");

    //append text to close button
    closeButton.appendChild(closeButtonText);

    //Add class to Close Button
    closeButton.className = "close-button";

    //Add close button to popupBox
    popupBox.appendChild(closeButton);
  });
});

// clopse the popup
document.addEventListener("click", function (e) {
  if (e.target.className == "close-button") {
    // Remove the popup
    e.target.parentNode.remove();

    //Remove Overlay
    document.querySelector(".popup-overlay").remove();
  }
});

// select All Bullets
const allBullets = document.querySelectorAll(".nav-bullets .bullet");

// select All Links
const allLinks = document.querySelectorAll(".links a");

//Handle active classes
function handleActive(ev) {
  //remove active class from all childrens
  ev.target.parentElement.querySelectorAll(".active").forEach((element) => {
    element.classList.remove("active");
  });

  //add class active to the selected element
  ev.target.classList.add("active");
}

//bullets option in local storage
let bulletsSpan = document.querySelectorAll(".bullets-option span");

let bulletsContainer = document.querySelector(".nav-bullets");

let bulletLocalItem = localStorage.getItem("bullets_option");

if (bulletLocalItem !== null) {
  bulletsSpan.forEach((span) => {
    span.classList.remove("active");
  });

  if (bulletLocalItem === "block") {
    bulletsContainer.style.display = "block";

    document.querySelector(".bullets-option .yes").classList.add("active");
  } else {
    bulletsContainer.style.display = "none";

    document.querySelector(".bullets-option .no").classList.add("active");
  }
}

bulletsSpan.forEach((span) => {
  span.addEventListener("click", (e) => {
    if (span.dataset.display === "show") {
      bulletsContainer.style.display = "block";

      localStorage.setItem("bullets_option", "block");
    } else {
      bulletsContainer.style.display = "none";

      localStorage.setItem("bullets_option", "none");
    }

    handleActive(e);
  });
});

let burgerIcon = document.querySelector(".burger-icon");
let linksBurger = document.querySelector(".links-burger");
let burgerSpan = document.querySelector(".burger-span");
burgerIcon.addEventListener("click", function () {
  linksBurger.classList.toggle("open");
  burgerSpan.classList.toggle("open");
});
//triggre niceScroll option

// $("html").niceScroll();
