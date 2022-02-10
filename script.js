const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];


// unsplash api
const count = 5;
const apiKey ='FakuwVxQK58tJmOoyxCYfA76krFPjBSzifSDXpCACwc';
const apiUrl = `https://api.unsplash.com/photos/?client_id=${apiKey}&count=${count}`;

// check if all images were loaded
function imageLoaded() {
    
     imagesLoaded++;
     
     if (imagesLoaded === totalImages){
         ready = true;
         loader.hidden = true; 
    
         count = 30;
       

    }
 }

// helper function to set attributes on dom elements
function setAttributes(element, attributes) {
    for (const key in attributes) {
        element.setAttribute(key, attributes[key]);
    }
}

// create elements for links and photos ,add to DOm
function displayPhotos() {
    imagesLoaded = 0;
    totalImages = photosArray.length;
    

    // run function for each object in photosArray
    photosArray.forEach((photo) => {


// create <a> to link unsplash
const item = document.createElement('a')
setAttributes(item, {
href: photo.links.html,
target: '_blank',
});
// Create <img> for photo
const img = document.createElement('img');
setAttributes(img, {
    src: photo.urls.regular,
    alt: photo.alt_description,
    title: photo.alt_description,

    
});
// Event listener, check when each is finished loading
img.addEventListener('load', imageLoaded);

// Put <img> inside <a> ,then put both sides imageContainer Element
item.appendChild(img);
imageContainer.appendChild(item);

    });
}

// get photos from unsplash api
async function getPhotos() {
    try {
        const response = await fetch(apiUrl);
        photosArray = await response.json();
       displayPhotos();
       
    } catch (error) {
        // catch error here

    }
    // check to see if scrolling near bottom of page ,load more photos
    window.addEventListener('scroll', () => {
        if (window.innerHeight+ window.scrollY >= document.body.offsetHeight-1000 && ready) {
            ready = false;
            getPhotos();

        }
    });
}
// on load
getPhotos();