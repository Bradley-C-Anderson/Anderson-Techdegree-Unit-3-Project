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
    console.log(shirtColor.selectedIndex);

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




});//end of DOMContentLoaded listener