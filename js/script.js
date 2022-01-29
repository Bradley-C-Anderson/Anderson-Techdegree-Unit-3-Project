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

    console.log(payment);
    //paymentChoice[0].style.display = 'none';
    //console.log(paymentChoice.getElementsByTagName('option'));


});//end of DOMContentLoaded listener