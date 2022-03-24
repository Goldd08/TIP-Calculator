
const costumer = document.getElementById('input-costumer');
const customtip = document.getElementById('custom-tip');
const bill = document.getElementById('input-bill');
const tipbuttons = document.querySelectorAll('.tips');

const results = document.querySelectorAll('.value');
const errormessage = document.querySelector('.error-message');
const resetbutton = document.querySelector('.reset');


bill.addEventListener('input', Billvalue);
tipbuttons.forEach(button => {
button.addEventListener('click', handleClick);
});


customtip.addEventListener('input', CustomTipValues);

costumer.addEventListener('input', PeopleValue);

resetbutton.addEventListener('click', reset);

// ----------------


let BillAmount = 0.0;
let tipAmount = 0.15;
let CustomPeopleValue = 1;


function validateFloat(s)
{
    var rgx = /^[0-9]*[0-9]*$/;
    return s.match(rgx);
}

function validateint(s){
    var rgx = /^[0-9]*$/;
    return s.match(rgx);

}




function Billvalue(){
    if (bill.value.includes(','))
    {
        bill.value = bill.value.replace(',', '.');
    }

    if(!validateFloat(bill.value))
    {
        bill.value = bill.value.substring(0, bill.value.length-1);
    }
 

    BillAmount = parseFloat(bill.value);


   
    Tipformula();

    
}

function handleClick()
{
    tipbuttons.forEach(button => {
        button.classList.remove('btn-active');


        if(event.target.innerHTML == button.innerHTML)
        {
            button.classList.add('btn-active');
            tipAmount = parseFloat(button.innerHTML)/100;
        }
    });


    customtip.value = '';
    Tipformula();
 

}


function CustomTipValues()
{
    if(!validateint(customtip.value))
    {
        customtip.value = customtip.value.substring(0, customtip.value.length-1);
    }

    tipAmount = parseFloat(customtip.value/100);

    tipbuttons.forEach(button => {
        button.classList.remove('button-active');
    });

    if(customtip.value !== '' )
    {
        Tipformula();
    }

}



function PeopleValue()
{
    if(!validateint(costumer.value))
    {
        costumer.value = costumer.value.substring(0, costumer.value.length-1);
    }


    CustomPeopleValue = parseFloat(costumer.value);


    if(PeopleValue <= 0)
    {
        errormessage.classList.add('show-error-message');
        setTimeout(function(){

            errormessage.classList.remove('show-error-message');
        }, 3000);
    }

    Tipformula();
    


}


function Tipformula(){
    if (CustomPeopleValue >=1 ){
        let tipTotal = BillAmount * tipAmount / CustomPeopleValue;
        let total = BillAmount * (tipAmount + 1) / CustomPeopleValue;
        results[0].innerHTML = '$' + tipTotal.toFixed(2);
        results[1].innerHTML = '$' + total.toFixed(2);
    }
}


function reset()
{
    bill.value = '0.0';
    Billvalue();

    tipbuttons[2].click();

    costumer.value='1';
    PeopleValue();
}