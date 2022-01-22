'use strict'
const emailInput = document.querySelector('#emailInput');
const submitBtn = document.querySelector('#submitEmailBtn');
const whoopsMsg = document.querySelector('#whoops');

let emailRegEx = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

submitBtn.addEventListener('click', () => {
    console.log(emailInput.value);
    if (emailRegEx.test(emailInput.value) === false){
        whoopsMsg.style.color = 'var(--brandDarkPink)';
    }
    else{
        whoopsMsg.style.color = 'var(--brandPurple)';
        window.location.href = '/contact_thankyou';
    }
})