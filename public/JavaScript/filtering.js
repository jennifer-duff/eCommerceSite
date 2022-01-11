'use strict'
let filterBox = document.querySelector('#categoryFilter');
let allItems = document.querySelectorAll('.productBox');

function filter(){
    let category = filterBox.options[filterBox.selectedIndex].text;
    // handle pants & dresses
    if (category === 'Tops'){
        category = 'tops';
    }
    else if (category === 'Pants & Dresses'){
        category = 'pantsAndDresses';
    }
    else if (category === 'Outerwear'){
        category = 'outerwear';
    }
    else if (category === 'Shoes'){
        category = 'shoes';
    }
    console.log(category);

    let rawFilteredItems = document.querySelectorAll(`.${category}`);
    let filteredItems = [];
    for (let i=0; i < rawFilteredItems.length; i++){
        filteredItems.push(rawFilteredItems[i]);
    }

    if (category === 'All Clothing'){
        for (let item in allItems){
            allItems[item].style.display = 'inline-block';
        }
    }
    else {
        for (let item in allItems){
            console.log(allItems[item]);
            if (filteredItems.includes(allItems[item])){
                allItems[item].style.display = 'inline-block';
            }
            else{
                allItems[item].style.display = 'none';
            } 
        }
    }
}

filterBox.addEventListener('input', filter);