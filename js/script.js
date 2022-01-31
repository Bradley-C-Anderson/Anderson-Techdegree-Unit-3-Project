document.addEventListener('DOMContentLoaded', () => {
    //name element
    const nameInput = document.getElementById('name');
    //bring focus to the name element on page load
    nameInput.focus();
    
    //other job element, does not show on page load
    const otherJob = document.getElementById('other-job-role');
    otherJob.style.display = 'none';

    //job title element, if user chooses other will show other job element
    const jobTitle = document.getElementById('title');
    jobTitle.addEventListener('change', (e) => {
        if(jobTitle.value === 'other'){
            otherJob.style.display = 'initial';
        } else {
            otherJob.style.display = 'none';
        }
    });

    //shirt color object, disabled on page load
    const shirtColor = document.getElementById('color');
    shirtColor.disabled = true;

    //shirt design opject and listener. On change, will show the correct colors 
    const shirtDesigns = document.getElementById('design');
    shirtDesigns.addEventListener('change', (e) => {
        //get all the options
        const shirtOptions = document.getElementById('color').getElementsByTagName('option');
        shirtColor.disabled = false;
        //Show the correct color
        if (shirtDesigns.value === 'js puns'){
            for (let i = 0; i < shirtOptions.length; i++){
                if(shirtOptions[i].getAttribute('data-theme') === 'js puns'){
                    shirtOptions[i].style.display = 'block'
                    shirtColor.selectedIndex = 0;
                } 
                if(shirtOptions[i].getAttribute('data-theme') === 'heart js'){
                    shirtOptions[i].style.display = 'none'
                } 
            }
        }

        if (shirtDesigns.value === 'heart js'){
            for (let i = 0; i < shirtOptions.length; i++){
                //console.log(shirtOptions[i].getAttribute('data-theme'));
                if(shirtOptions[i].getAttribute('data-theme') === 'js puns'){
                    shirtOptions[i].style.display = 'none'
                } 
                if(shirtOptions[i].getAttribute('data-theme') === 'heart js'){
                    shirtOptions[i].style.display = 'block'
                    shirtColor.selectedIndex = 0;
                } 
            }
        }
    });
    //initialize var numChecks that keeps track of how many boxes are checked for activities.
    let numChecks = 0;
    //function that shows if there is at lease one checkbox checked. Will show 
    function areAnyChecked(){
        if(numChecks > 0){
            activitiesBox.previousElementSibling.classList.add('valid');
            activitiesBox.previousElementSibling.classList.remove('not-valid');
            activitiesBox.nextElementSibling.nextElementSibling.style.display = 'none';
        } else {
            activitiesBox.previousElementSibling.classList.add('not-valid');
            activitiesBox.previousElementSibling.classList.remove('valid');
            activitiesBox.nextElementSibling.nextElementSibling.style.display = 'block';
        }
    }

    //initialize total cost  
    let totalCost = 0;
    //listener for activities
    const activities = document.getElementById('activities');
    activities.addEventListener('change', (e) => {
        const totalOutput = document.getElementById('activities-cost');
        //This gets the cost of each event signed up for
        const cost = e.target.getAttribute('data-cost');
        if(e.target.checked){
            checkboxes[0].parentElement.parentElement.style.border = 'initial';
            totalCost += parseInt(cost);
            totalOutput.innerHTML = `Total: $${totalCost}`;
            activities.lastElementChild.style.display = 'none';
            numChecks += 1;
        } else if (e.target.checked === false){
            totalCost -= parseInt(cost);
            totalOutput.innerHTML = `Total: $${totalCost}`;
            numChecks -= 1; 
        }
        areAnyChecked();
    });

    
    //Create elements for payment, CC Info, PayPay, and BitCoin
    const payment = document.getElementById('payment');
    const creditCardInfo = document.getElementById('credit-card');
    const payPal = document.getElementById('paypal');
    const bitcoin = document.getElementById('bitcoin');

    payPal.style.display = 'none';
    bitcoin.style.display = 'none';
    //Payment listener to Hide CC info if PayPay or Bitcoin is selected and show CC into if it is selected.
    payment.addEventListener('change', (e) => {
        if(payment.value === 'paypal' ){
            creditCardInfo.style.display = 'none';
            payPal.style.display = 'block';
            bitcoin.style.display = 'none';
        } else if (payment.value === 'credit-card'){
            creditCardInfo.style.display = 'block';
            payPal.style.display = 'none';
            bitcoin.style.display = 'none';
        } else if (payment.value === 'bitcoin'){
            creditCardInfo.style.display = 'none';
            payPal.style.display = 'none';
            bitcoin.style.display = 'block';
        }
    });

    //Function to Show Tip if invalid value from user or hide tip if the value is valid.
    function showOrHideTip(show, element) {
        // show element when show is true, hide when false
        if (show) {
          element.style.display = "inherit";
          element.parentElement.classList.add('not-valid');
          element.parentElement.classList.remove('valid');
        } else {
          element.style.display = "none";
          element.previousElementSibling.style.border = 'initial';
          element.parentElement.classList.remove('not-valid');
          element.parentElement.classList.add('valid');
        }
    }
    //listener to get text from input and show the correct tip if value is incorrect.
    function createListener(validator) {
        return (e) => {
            const text = e.target.value;
            const valid = validator(text);
            const showTip = text === "" || !valid;
            const tooltip = e.target.nextElementSibling;
            showOrHideTip(showTip, tooltip);
        };
    }
    //validate if name has at least one character
    function isValidName(name) {
        return (name.trim() !== '');
    }

    //Validate email address
    function isValidEmail(email) {
        //found on https://www.w3resource.com/javascript/form/email-validation.php
        return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/i.test(email);
    }
    //Validate that credit card number is 13-16 digits.
    function isValidCC(ccNum){
        return /^[0-9]{13,16}$/.test(ccNum);
    }
    //Validate the zip code if 5 digits
    function isValidZip(zip){
        return /^[0-9]{5}$/.test(zip);
    }
    //Validate the CVV is 3 digits.
    function isValidCVV(cvv){
        return /^[0-9]{3}$/.test(cvv);
    }
    //Event listener for name input to validate value.
    nameInput.addEventListener("input", createListener(isValidName));
    //Create emailInput element and validate value.
    const emailInput = document.getElementById('email');
    emailInput.addEventListener("input", createListener(isValidEmail));
    //Create ccNumInput element and validate value.
    const ccNumInput = document.getElementById('cc-num');
    ccNumInput.addEventListener("input", createListener(isValidCC));
    //Create zip element and validate value.
    const zip = document.getElementById('zip');
    zip.addEventListener("input", createListener(isValidZip));
    //Create CVV element and validate value.
    const cvv = document.getElementById('cvv');
    cvv.addEventListener("input", createListener(isValidCVV));
    //Create form element
    const form = document.getElementsByTagName('form');
    //Get all checkbox elements
    const checkboxes = activities.getElementsByTagName('input');
    //Create 
    const activitiesBox = document.getElementById('activities-box');
    
    //Listener to submit entire form
    form[0].addEventListener('submit', (e) => {
        //On submission if nameInput is not valid, will show tip and prevent submission.
        if(!isValidName(nameInput.value)){
            e.preventDefault();
            showOrHideTip(true, nameInput.nextElementSibling);
        }
        //On submission if email is not valid, will show tip and prevent submission.
        if(!isValidEmail(emailInput.value)){
            e.preventDefault();
            showOrHideTip(true, emailInput.nextElementSibling);
        }
        //On submission if no activities are checked, will show tip and prevent submission.
        areAnyChecked();
        
        ////On submission if credit card is selected and if CC Number, zip, or CVV is not valid, will show tip and prevent submission.
        if(payment.value === 'credit-card'){
            if(!isValidCC(ccNumInput.value)){
                e.preventDefault();
                showOrHideTip(true, ccNumInput.nextElementSibling);
            }
            if(!isValidZip(zip.value)){
                e.preventDefault();
                showOrHideTip(true, zip.nextElementSibling);
            }
            if(!isValidCVV(cvv.value)){
                e.preventDefault();
                showOrHideTip(true, cvv.nextElementSibling);
            }
        }
    });

    //add focus class to checkboxes label on focus (tab into) and remove when focus out (tab away)
    for(let i = 0; i < checkboxes.length; i++){
        checkboxes[i].addEventListener('focus', (e) => {
        checkboxes[i].parentElement.classList.add('focus');
    });
    checkboxes[i].addEventListener('focusout', (e) => {
        checkboxes[i].parentElement.classList.remove('focus');
    });
}

    
});//end of DOMContentLoaded listener