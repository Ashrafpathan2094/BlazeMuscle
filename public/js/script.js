function pageInit(){
    if(window.location.pathname === "/workout"){
        document.getElementById("defaultOpen").click();
    }
}

pageInit();

// ------------------------------------------
// ---------         Sign Up        ---------
// ------------------------------------------

function validateSignUp(){

    const phoneNumber = $('#phone-number');
    const password = $('#password');
    const confirmPassword = $('#password_confirmation');

    if(phoneNumber.val().length !== 10 ){
        alert("Enter Phone Number with 10 digits");
        event.preventDefault();
    }
    if(password.val() !== confirmPassword.val()){
        alert("Entered Password does not match");
        event.preventDefault();
    }

}

// ------------------------------------------
// ---------         Workout        ---------
// ------------------------------------------

function openTab(evt, cityName) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(cityName).style.display = "block";
    evt.currentTarget.className += " active";
}

function toggleLog(event,name){

    event.preventDefault();
    var logRequest = new XMLHttpRequest();
    logRequest.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200){

            if($(event.target).text().trim() === 'Remove from Log'){
                $(event.target).text('Add to Log');
            } else if($(event.target).text().trim() === 'Add to Log'){
                $(event.target).text('Remove from Log');
            }

        }
    }

    var query = '/log?items='+name;
    logRequest.open('post',query);
    if($(event.target).text().trim() === 'Remove from Log'){
        logRequest.setRequestHeader('removeItem','true');
    }
    logRequest.send();

}

// ------------------------------------------
// ---------    Log                 ---------
// ------------------------------------------

function clearLog(){

    var clearRequest = new XMLHttpRequest();
    clearRequest.onreadystatechange = function(){
        if(this.status == 200 && this.readyState == 4){
            $('#log-list').html("<h3>Log is Empty! &nbsp; Select items from workout to add.</h3>");
        }
    }
    clearRequest.open('post','/log?items=[]');
    clearRequest.setRequestHeader('clearLog','true');
    clearRequest.send();
}

function removeItem(name){

    var removeRequest = new XMLHttpRequest();
    var mouseEventTarget = $(event.target);
    
    removeRequest.onreadystatechange = function(){
        if(this.status == 200 && this.readyState == 4){
            mouseEventTarget.closest("tr.item").html("");            
        }
    }

    removeRequest.open('post','/log?items='+name);
    removeRequest.setRequestHeader('removeItem','true');
    removeRequest.send();

}

function save() {
    event.preventDefault();
    if($('#log-list').html() === '<h3>Log is Empty! &nbsp; Select items from workout to add.</h3>'){
        alert('Add workout items to log.');
    } else {
        var logs = [];
        $('tr.item').each(function(element){
            var name = $(this).find('.exercise-name').text();
            var set = $(this).find('input.set-box').val();
            var reps = $(this).find('input.rep-box').val();
            var weight = $(this).find('input.weight-box').val();
            var item = {
                name,
                set,
                reps,
                weight
            }
            logs.push(item);
        });
        var redirect = function(url, method) {
            var form = document.createElement('form');
            document.body.appendChild(form);
            form.method = method;
            form.action = url;
            form.submit();
        };
        // console.log(logs);
        redirect('/history?items='+JSON.stringify(logs), 'post');
    }    
}

function increment(){
    var quantityTextbox =$(event.currentTarget).parent().prev();
    var quantity = parseInt(quantityTextbox.val());
    if(quantity < 10){
        quantity++;
        quantityTextbox.val(parseInt(quantityTextbox.val())+1);
        quantityTextbox.text(quantityTextbox.val());
    }
}

function decrement(){
    var quantityTextbox =$(event.currentTarget).parent().next();
    var quantity = parseInt(quantityTextbox.val());
    if(quantity > 1){
        quantity--;
        quantityTextbox.val(parseInt(quantityTextbox.val())-1);
        quantityTextbox.text(quantityTextbox.val());
    }
}

function validateQuantity(event){

    const quantityTextbox = $(event.target);
    if(!(quantityTextbox.val() > 10 && quantityTextbox.val() < 1)){
        alert('Quantity must be in the range of 1 to 10.');
        quantityTextbox.val(1);
    }
    
}

// ------------------------------------------------------
// -------------      Dashboard      --------------------
// ------------------------------------------------------

$('#myModal').on('show.bs.modal', function (event) {
    var button = $(event.relatedTarget); 
    var message = button.data('message');
    var modal = $(this);
    modal.find('.message').text(message);
});

// ------------------------------------------------------
// -------------     User Management---------------------
// ------------------------------------------------------

function validateAction(){
    var choice = confirm('Do you want to proceed?');
    if(choice === false){
        event.preventDefault();
    }
}