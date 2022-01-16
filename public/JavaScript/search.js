'use strict'

let searchBar = document.querySelector('#searchBar');
let searchForm = document.querySelector('#searchContainer');

searchBar.addEventListener('input', () => {
    let query = searchBar.value;
    searchForm.action = `/search/q=${query}`;
})

