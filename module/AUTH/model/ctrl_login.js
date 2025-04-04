// console.log("hola ctrl_login.js")
// return false;

function login() {
    // console.log("hola login")
    if (validate_login() != 0) {
        // alert('Validación de login correcta');
        var data = $('.login-form').serialize();
        ajaxPromise('module/AUTH/ctrl/ctrl_auth.php?op=login', 'POST', 'JSON', data)
            .then(function(login) {
                console.log('Login: ', login)
                if (login == "error_user") {
                    document.getElementById('error_username_log').innerHTML = "El usario no existe, asegurase de que lo a escrito correctamente"
                } else if (login == "error_pwd") {
                    document.getElementById('error_pwd_log').innerHTML = "La contraseña es incorrecta"
                } else {
                    localStorage.setItem("token", login);
                    Swal.fire({
                        title: "Has iniciado sesión",
                        text: "Pulsa en Continuar para ver todos nuestros productos",
                        icon: "success",
                        confirmButtonText: "Continuar"
                    }).then((result) => {
                        if (result.isConfirmed) {
                            window.location.href = "index.php";
                        }
                    });

                    // if (localStorage.getItem('redirect_like')) {
                    //     setTimeout(' window.location.href = "index.php?module=ctrl_shop&op=list"; ', 1000);
                    // } else {
                    //     setTimeout(' window.location.href = "index.php?module=ctrl_home&op=list"; ', 1000);
                    // }
                }
            }).catch(function(textStatus) {
                if (console && console.log) {
                    console.log("La solicitud ha fallado: " + textStatus);
                }
            });
    }
}

function key_login() {
    // console.log("hola key_login")
    $(".login-button").keypress(function(e) {
        var code = (e.keyCode ? e.keyCode : e.which);
        if (code == 13) {
            e.preventDefault();
            login();
        }
    });
}

function button_login() {
    // console.log("hola button_login")
    $('.login-button').on('click', function(e) {
        e.preventDefault();
        login();
    });
}

function validate_login() {
    // console.log("hola validate_login")
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