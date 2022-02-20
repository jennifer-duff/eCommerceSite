'use strict'

const menuIcon = document.querySelector('#menuIcon');
const mobileNavArrow = document.querySelector('#mobileNavArrow');
// const mobileNav = document.querySelector('#mobileNav');
const nav = document.querySelector('nav');

const searchIcon = document.querySelector('#searchIcon');
const searchArrow = document.querySelector('#searchArrow');
const mobileSearchBar = document.querySelector('#mobileSearchBar');
const searchContainer = document.querySelector('#searchContainer');
// const searchBarLabel = document.querySelector('#searchBarLabel');
let windowWidth = window.innerWidth;
console.log(windowWidth);

window.addEventListener('resize', () => {
    windowWidth = window.innerWidth;
    if(windowWidth > 525){
        mobileSearchBar.style.display = 'none';
        searchArrow.style.display = 'none';
    }
    if(windowWidth > 950){
        mobileNavArrow. style.display = 'none';
    }
})


// handle clicks on menu icon
window.addEventListener('click', (event) =>{
    if ((windowWidth <= 950) && event.target === menuIcon || event.target === nav){
        nav.style.display = 'flex';
        mobileNavArrow.style.display = 'inline-block';
    }
    else if((windowWidth <= 950) && !(event.target === menuIcon || event.target === nav)){
        nav.style.display = 'none';
        mobileNavArrow. style.display = 'none';
    }
})


window.addEventListener('click', (event) =>{
    if((windowWidth <= 525) && (event.target === searchIcon || event.target === searchContainer)){
        console.log('search icon clicked')
        mobileSearchBar.style.display = 'inline-block';
        searchArrow.style.display = 'inline-block';
    }
    else if((windowWidth <= 525) && (!event.target === searchIcon || !event.target === searchContainer)){
        console.log('clicked elsewhere')
        mobileSearchBar.style.display = 'none';
        searchArrow.style.display = 'none';
    }
})



// function searchClickListener(){
//     searchBarInput.style.display = 'inline-block';
//     searchArrow.style.display = 'inline-block';
// }