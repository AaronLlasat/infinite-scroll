// Varible declaration
let photosArray = [];
let areImagesLoaded = false;
let imagesLoaded = 0;
let totalImages = 0;


// DOM Manipulation
const imageContainer = document.getElementById("image-container");
const loader = document.getElementById("loader");

// Unsplash API
let imageCount = 5;
let apiKey = config.API_KEY;
let apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${imageCount}`;

// Check if all images were loaded
const imageLoaded = () => {
    imagesLoaded++;
    if (imagesLoaded === totalImages) {
        areImagesLoaded = true;
        loader.hidden = true;
        imageCount = 30;
        apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${imageCount}`;
    }
}

// Helper Function to Set Attributes on DOM Elements
const setAttributes = (element, attributes) => {
    for (const key in attributes) {
        element.setAttribute(key, attributes[key]);
    }
}


// Create Elements For Links & Photos, Add to DOM
const displayPhotos = () => {
    imagesLoaded = 0;
    totalImages = photosArray.length;

    photosArray.forEach((photo) => {
        // Create <a> to link to Unsplash
        const item = document.createElement("a");;
        setAttributes(item, {
            href: photo.links.html,
            target: "_blank"
        })

        // Create <img> for photo
        const img = document.createElement("img");
        setAttributes(img, {
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description
        })

        // Event Listener to check when each scroll is finished loading all the images
        img.addEventListener("load", imageLoaded);

        // Put <img> inside <a>, then put both inside imageContainer Element
        item.appendChild(img);
        imageContainer.appendChild(item);
    });
}


// Get photos from Unsplash API
async function getPhotos(){
    try {
        const response = await fetch(apiUrl);
        photosArray = await response.json();
        displayPhotos();
    } catch (error) {
        console.log(error);
    }
}


// Infinite Scroll event
window.addEventListener("scroll", () =>{
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && areImagesLoaded) {
        getPhotos()
        areImagesLoaded = false;
    }
})

//On Load
getPhotos();