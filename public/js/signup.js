function validateSignUp(){
    
    const signUpButton = $('.btn.sign-up-button');
        signUpButton.on("click",function(event){
            const phoneNumber = $('#phone-number');
            const password = $('#password');
            const confirmPassword = $('#password_confirmation');
    
            if(phoneNumber.val().length < 10 ){
                alert("Enter Phone Number with 10 digits");
                event.preventDefault();
            }
            if(password.val() !== confirmPassword.val()){
                alert("Entered Password does not match");
                event.preventDefault();
            }
    });

}

validateSignUp();