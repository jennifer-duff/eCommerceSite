'use strict'

let searchBar = document.querySelector('#searchBar');
let searchForm = document.querySelector('#searchContainer');
let searchGoArrow = document.querySelector('#searchGoArrow');

searchGoArrow.addEventListener('click', () => {
    let query = searchBar.value;
    window.location.href = `/search/q=${query}`;
})

searchBar.addEventListener('keypress', (event) => {
    if(event.key === 'Enter'){
        console.log('enter key pressed');
        let query = searchBar.value;
        window.location.href = `/search/q=${query}`;
    }
})

