// Check number inputs

function isNumber(value) {
    if (isNaN(value) && value != "") {
      return false;
    } else {
      return true;
    }
}

//Show error ! mark

function showError(element_id){
    $('#error-'+element_id).removeClass('not-visible');
}

//Remove error ! mark

function removeError(element_id){
    $('#error-'+element_id).addClass('not-visible');
}

// Check Error

function checkError(value, id){
    if(!isNumber(value)){
        showError(id);
    } else {
        removeError(id);
    }
}

$('#gross_income').on('input', function(){
    checkError($(this).val(), this.id);
});

$('#extra_income').on('input', function(){
    checkError($(this).val(), this.id);
});

$('#deductions').on('input', function(){
    checkError($(this).val(), this.id);
});

$('#age').on('input', function(){
    removeError('age');
});


// Form submit

function displayResult(result, event){
    $('#amount').text(result);
    $('#result').removeClass('not-visible');
    $('#result').addClass('result-container');
    event.preventDefault();
}

$('#close').click(function(){
    location.reload();
});

function calculateIncome(gr, ex, de, ag){
    let income = gr + ex - de;
    let result = 0;
    let tax = 0;
    if(income<=800000){
        result = income;
    }
    else{
        switch(ag){
            case 1: 
                tax = .3 * (income-800000);
                result = income-tax;
                break;

            case 2: 
                tax = .4 * (income-800000);
                result = income-tax;
                break;

            case 3: 
                tax = .1 * (income-800000);
                result = income-tax;
                break;
        }
    }
    return result;
}

function ageSelected(){
    if($('#age').find(':selected').val()==="null")
        return false;
    else
        return true;
}

function processForm(event){
    let gross_income = parseFloat($('#gross_income').val());
    let extra_income = parseFloat($('#extra_income').val());
    let deductions = parseFloat($('#deductions').val());
    let age_group = parseInt($('#age').find(':selected').val());
        
    if(!(gross_income>0))
        gross_income = 0;

    if(!(extra_income>0))
        extra_income = 0;

    if(!(deductions>0))
        deductions = 0;

    const result = calculateIncome(gross_income, extra_income, deductions, age_group);
    displayResult(result, event);
}

$('#submit').on('click', function(event){
    if(!ageSelected()){
        showError('age');
        $('#age').focus();
        return false;
    } else {
        processForm(event);
    }
});