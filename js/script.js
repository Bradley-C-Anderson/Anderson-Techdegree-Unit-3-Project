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
    })

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
            totalCost += parseInt(cost);
            totalOutput.innerHTML = `Total: $${totalCost}`;
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
        } else {
          element.style.display = "none";
        }
    }

    function createListener(validator) {
        return (e) => {
            const text = e.target.value;
            const valid = validator(text);
            const showTip = text !== "" && !valid;
            console.log(text);
            const tooltip = e.target.nextElementSibling;
            showOrHideTip(showTip, tooltip);
        };
    }

    function isValidName(name) {
        return (name.trim() !== '');
    }

    // Must be a valid email address
    function isValidEmail(email) {
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

    const emailInput = document.getElementById('email');

    emailInput.addEventListener("blur", createListener(isValidEmail));

    const ccNumInput = document.getElementById('cc-num');

    ccNumInput.addEventListener("blur", createListener(isValidCC));

    const zip = document.getElementById('zip');

    zip.addEventListener("blur", createListener(isValidZip));

    const cvv = document.getElementById('cvv');

    cvv.addEventListener("blur", createListener(isValidCVV));

});//end of DOMContentLoaded listener