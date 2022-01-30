document.addEventListener('DOMContentLoaded', () => {
    const nameInput = document.getElementById('name');
    nameInput.focus();

    const otherJob = document.getElementById('other-job-role');
    otherJob.style.display = 'none';

    const jobTitle = document.getElementById('title');
    jobTitle.addEventListener('change', (e) => {
        if(jobTitle.value === 'other'){
            otherJob.style.display = 'block';
        } else {
            otherJob.style.display = 'none';
        }
    });


    const shirtColor = document.getElementById('color');
    shirtColor.disabled = true;
    //console.log(shirtColor.selectedIndex);

    const shirtDesigns = document.getElementById('design');
    shirtDesigns.addEventListener('change', (e) => {
        //get all the options
        const shirtOptions = document.getElementById('color').getElementsByTagName('option');
        shirtColor.disabled = false;
        if (shirtDesigns.value === 'js puns'){
            for (let i = 0; i < shirtOptions.length; i++){
                //console.log(shirtOptions[i].getAttribute('data-theme'));
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
    let totalCost = 0;
    const activities = document.getElementById('activities');
    activities.addEventListener('change', (e) => {
        const totalOutput = document.getElementById('activities-cost');
        //console.log(totalOutput.innerHTML);
        //This gets the cost of each event signed up for
        const cost = e.target.getAttribute('data-cost');
        if(e.target.checked){
            checkboxes[0].parentElement.parentElement.style.border = 'initial';
            totalCost += parseInt(cost);
            totalOutput.innerHTML = `Total: $${totalCost}`;
            activities.lastElementChild.style.display = 'none';
        } else if (e.target.checked === false){
            totalCost -= parseInt(cost);
            totalOutput.innerHTML = `Total: $${totalCost}`;
        }
    });

    const payment = document.getElementById('payment');
    const creditCardInfo = document.getElementById('credit-card');
    const payPal = document.getElementById('paypal');
    const bitcoin = document.getElementById('bitcoin');

    payPal.style.display = 'none';
    bitcoin.style.display = 'none';

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


    function showOrHideTip(show, element) {
        // show element when show is true, hide when false
        if (show) {
          element.style.display = "inherit";
          element.previousElementSibling.style.border = 'solid';
          //element.previousElementSibling.style.borderColor = 'red';
          element.parentElement.classList.add('not-valid');
          element.parentElement.classList.remove('valid');
        } else {
          element.style.display = "none";
          element.previousElementSibling.style.border = 'initial';
          //element.previousElementSibling.style.borderColor = 'black';
          element.parentElement.classList.remove('not-valid');
          element.parentElement.classList.add('valid');
        }
    }

    function createListener(validator) {
        return (e) => {
            const text = e.target.value;
            const valid = validator(text);
            const showTip = text === "" || !valid;
            //console.log(text);
            const tooltip = e.target.nextElementSibling;
            showOrHideTip(showTip, tooltip);
        };
    }

    function isValidName(name) {
        return (name.trim() !== '');
    }

    function isValidJob(job){
        return( job.trim() !== '');
    };

    // Must be a valid email address
    function isValidEmail(email) {
        //found on https://www.w3resource.com/javascript/form/email-validation.php
        return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/i.test(email);
    }

    function isValidCC(ccNum){
        return /^[0-9]{13,16}$/.test(ccNum);
    }

    function isValidZip(zip){
        return /^[0-9]{5}$/.test(zip);
    }

    function isValidCVV(cvv){
        return /^[0-9]{3}$/.test(cvv);
    }

    nameInput.addEventListener("blur", createListener(isValidName));
    

    otherJob.addEventListener("blur", createListener(isValidJob));
    
    const emailInput = document.getElementById('email');

    emailInput.addEventListener("blur", createListener(isValidEmail));

    const ccNumInput = document.getElementById('cc-num');

    ccNumInput.addEventListener("blur", createListener(isValidCC));

    const zip = document.getElementById('zip');

    zip.addEventListener("blur", createListener(isValidZip));

    const cvv = document.getElementById('cvv');

    cvv.addEventListener("blur", createListener(isValidCVV));

    const form = document.getElementsByTagName('form');
    //console.log(form);

    const hint = document.getElementsByClassName('hint');

    const checkboxes = activities.getElementsByTagName('input');

    form[0].addEventListener('submit', (e) => {

        if(!isValidName(nameInput.value)){
            e.preventDefault();
            console.log('Validate Name');
            showOrHideTip(true, nameInput.nextElementSibling);
        }
        if(!isValidEmail(emailInput.value)){
            e.preventDefault();
            console.log('Validate email');
            showOrHideTip(true, emailInput.nextElementSibling);
        }
        let isChecked = false;
        for(let i = 0; i < checkboxes.length; i++){
            if(checkboxes[i].checked){
                isChecked = true;
            }
        }
        if(!isChecked){
            e.preventDefault();
            console.log('no Checks');
            activities.lastElementChild.style.display = 'block';
            //checkboxes[0].parentElement.parentElement.style.border = 'solid';
            //checkboxes[0].parentElement.parentElement.style.borderColor = 'red';
            checkboxes[0].parentElement.parentElement.parentElement.classList.add('not-valid')
            checkboxes[0].parentElement.parentElement.parentElement.classList.remove('valid')
        }else{
            activities.lastElementChild.style.display = 'none';
            //checkboxes[0].parentElement.parentElement.style.border = 'initial';
            checkboxes[0].parentElement.parentElement.parentElement.classList.add('valid')
            checkboxes[0].parentElement.parentElement.parentElement.classList.remove('not-valid')
        }

        if(payment.value === 'credit-card'){
            if(!isValidCC(ccNumInput.value)){
                showOrHideTip(true, ccNumInput.nextElementSibling);
            }
            if(!isValidZip(zip.value)){
                showOrHideTip(true, zip.nextElementSibling);
            }
            if(!isValidCVV(cvv.value)){
                showOrHideTip(true, cvv.nextElementSibling);
            }
        }
      

        
        
    });

});//end of DOMContentLoaded listener