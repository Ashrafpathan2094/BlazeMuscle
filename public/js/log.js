function init(){
    setListeners();
}

function setListeners(){
    $('#empty-log').on('click',clearLog);
}

function clearLog(){

    var clearRequest = new XMLHttpRequest();
    clearRequest.onreadystatechange = function(){
        if(this.status == 200 && this.readyState == 4){
            $('#log-list').html("<h3>Cart is Empty! &nbsp; Select items from menu to add.</h3>");
        }
    }
    clearRequest.open('post','/log?items=[]');
    clearRequest.setRequestHeader('clearLog','true');
    clearRequest.send();
}

function removeItem(event,name){

    var removeRequest = new XMLHttpRequest();
    var mouseEventTarget = $(event.target);
    
    removeRequest.onreadystatechange = function(){
        if(this.status == 200 && this.readyState == 4){
            mouseEventTarget.closest("tr.row.log-item").html("");            
        }
    }

    removeRequest.open('post','/log?items='+name);
    removeRequest.setRequestHeader('removeItem','true');
    removeRequest.send();

}

function save() {
    event.preventDefault();
    if($('#log-list').html() === '<h3>Cart is Empty! &nbsp; Select items from menu to add.</h3>'){
        alert('Add menu items to cart.');
    } else {
        var logs = {};
        logs.items = [];
        $('div.row.log-list').each(function(element){
            var name = $(this).find('h3.exercise-name').text();
            var set = $(this).find('input.set-box').val();
            var reps = $(this).find('input.reps-box').val();
            var item = {
                name,
                set,
                reps
            }
            logs.items.push(item);
        });
        var redirect = function(url, method) {
            var form = document.createElement('form');
            document.body.appendChild(form);
            form.method = method;
            form.action = url;
            form.submit();
        };
        
        redirect('/history?items='+JSON.stringify(logs), 'post');
    }    
}

function increment(event){
    
    var quantityTextbox =$(event.currentTarget).prev();
    var quantity = parseInt(quantityTextbox.val());
    if(quantity < 10){
        quantity++;
        quantityTextbox.val(parseInt(quantityTextbox.val())+1);
        quantityTextbox.text(quantityTextbox.val());
    }
}

function decrement(event){
    var quantityTextbox =$(event.currentTarget).next();
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

init();