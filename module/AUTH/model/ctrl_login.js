console.log("hola ctrl_login.js")

// return false;

function login() {
    if (validate_login() != 0) {
        alert('Validación de login correcta');
    }
}

function key_login() {
    $(".login-button").keypress(function(e) {
        var code = (e.keyCode ? e.keyCode : e.which);
        if (code == 13) {
            e.preventDefault();
            login();
        }
    });
}

function button_login() {
    $('.login-button').on('click', function(e) {
        e.preventDefault();
        login();
    });
}

function validate_login() {
    var error = false;

    if (document.getElementById('username').value.length === 0) {
        document.getElementById('error_username_log').innerHTML = "* Escribe un nombre de usuario o correo electrónico";
        error = true;
    } else {
        if (document.getElementById('username').value.length < 5) {
            document.getElementById('error_username_log').innerHTML = "* El nombre de usuario debe tener 5 caracteres como minimo";
            error = true;
        } else {
            document.getElementById('error_username_log').innerHTML = "";
        }
    }

    if (document.getElementById('password').value.length === 0) {
        document.getElementById('error_pwd_log').innerHTML = "* Escribe una contraseña para iniciar sesión";
        error = true;
    } else {
        document.getElementById('error_pwd_log').innerHTML = "";
    }

    if (error == true) {
        return 0;
    }
}

// alert

$(document).ready(function(){
    key_login()
    button_login()
});