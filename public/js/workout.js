function openCity(evt, cityName) {
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

document.getElementById("defaultOpen").click();

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
