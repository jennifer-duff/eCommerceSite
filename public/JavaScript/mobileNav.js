'use strict'
const desktopNavLinks = document.querySelector('#desktopNavLinks');

const menuIcon = document.querySelector('#menuIcon');
const mobileNavArrow = document.querySelector('#mobileNavArrow');
const mobileNavLinks = document.querySelector('#mobileNavLinks');


const searchIcon = document.querySelector('#searchIcon');
const mobileSearchIcon = document.querySelector('#mobileSearchIcon');
const searchArrow = document.querySelector('#searchArrow');
// const mobileSearchBar = document.querySelector('#mobileSearchBar');
const searchContainer = document.querySelector('#searchContainer');
const searchInputDiv = document.querySelector('#searchInputDiv');
const searchBarLabel = document.querySelector('#searchBarLabel');
let windowWidth = window.innerWidth;

// handle clicks on menu Icon/mobile nav
window.addEventListener('click', (event) => {
    if(event.target === menuIcon || event.target === mobileNavLinks){
        mobileNavLinks.style.display = 'flex';
        mobileNavArrow.style.display = 'block'
    }
    else{
        mobileNavLinks.style.display = 'none';
        mobileNavArrow.style.display = 'none'
    }
})

// hide mobile nav on resize
window.addEventListener('resize', () => {
    if(window.innerWidth >= 950){
        mobileNavLinks.style.display = 'none';
        mobileNavArrow.style.display = 'none';
        menuIcon.style.display = 'none'
    }
    else{
        menuIcon.style.display = 'inline';
    }

})

// handle mobile re-arrangement of search
window.addEventListener('click', (event) =>{
    // console.log(event.target);
    if((window.innerWidth <= 570) && (event.target === searchIcon ||event.target === searchContainer || event.target === searchBar)){
        console.log("SEARCH CLICKED");
        searchInputDiv.style.display = 'inline-block';
    }
    else if((window.innerWidth <= 570) && !(event.target === searchIcon || event.target === searchContainer || event.target === searchBar)){
        searchInputDiv.style.display = 'none';;
    }
})


