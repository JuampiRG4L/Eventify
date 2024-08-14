document.addEventListener("DOMContentLoaded", function() {
    const registerButton = document.getElementById("register");
    const loginButton = document.getElementById("login");
    const container = document.getElementById("container");

    registerButton.addEventListener("click", () => {
        container.classList.add("right-panel-active");
    });

    loginButton.addEventListener("click", () => {
        container.classList.remove("right-panel-active");
    });

    const regForm = document.querySelector('.form-container.register-container form');
    const usernameReg = document.getElementById('username');
    const emailReg = document.getElementById('email');
    const passwordReg = document.getElementById('password');
    const usernameErrorReg = document.getElementById('username-error');
    const emailErrorReg = document.getElementById('email-error');
    const passwordErrorReg = document.getElementById('password-error');

    regForm.addEventListener('submit', function(e) {
        e.preventDefault();
        if (!checkRequired([usernameReg, emailReg, passwordReg])) {
            // Aquí puedes agregar código para enviar el formulario si todos los campos son válidos
        }
    });

    const lgForm = document.querySelector('.form-container.login-container form');
    const emailLg = document.querySelector('.form-container.login-container .email-2');
    const passwordLg = document.querySelector('.form-container.login-container .password-2');
    const emailErrorLg = document.querySelector(".email-error-2");
    const passwordErrorLg = document.querySelector(".password-error-2");

    lgForm.addEventListener('submit', function(e) {
        e.preventDefault();
        if (!checkRequired([emailLg, passwordLg])) {
            // Aquí puedes agregar código para enviar el formulario si todos los campos son válidos
        }
    });

    function checkRequired(inputs) {
        let isValid = true;
        inputs.forEach(input => {
            if (input.value.trim() === '') {
                showError(input, `${getFieldName(input)} es requerido.`);
                isValid = false;
            } else {
                showSuccess(input);
            }
        });
        return isValid;
    }

    function showError(input, message) {
        const formControl = input.parentElement;
        formControl.className = 'form-control error';
        const small = formControl.querySelector('small');
        small.innerText = message;
    }

    function showSuccess(input) {
        const formControl = input.parentElement;
        formControl.className = 'form-control success';
        const small = formControl.querySelector('small');
        small.innerText = '';
    }

    function getFieldName(input) {
        return input.placeholder;
    }

    function checkEmail(input) {
        const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
        return emailRegex.test(input.value.trim());
    }

    usernameReg.addEventListener("input", function() {
        if (usernameReg.value.trim().length < 4) {
            showError(usernameReg, "El nombre de usuario debe tener al menos 4 caracteres.");
        } else if (usernameReg.value.trim().length > 20) {
            showError(usernameReg, "El nombre de usuario no debe exceder los 20 caracteres.");
        } else {
            showSuccess(usernameReg);
        }
    });

    emailReg.addEventListener("input", function() {
        if (!checkEmail(emailReg)) {
            showError(emailReg, "El email no es válido.");
        } else {
            showSuccess(emailReg);
        }
    });

    passwordReg.addEventListener("input", function() {
        if (passwordReg.value.trim().length < 8) {
            showError(passwordReg, "La contraseña debe tener al menos 8 caracteres.");
        } else if (passwordReg.value.trim().length > 20) {
            showError(passwordReg, "La contraseña no debe exceder los 20 caracteres.");
        } else {
            showSuccess(passwordReg);
        }
    });

    emailLg.addEventListener("input", function() {
        if (!checkEmail(emailLg)) {
            showError(emailLg, "El email no es válido.");
        } else {
            showSuccess(emailLg);
        }
    });

    passwordLg.addEventListener("input", function() {
        if (passwordLg.value.trim().length < 8) {
            showError(passwordLg, "La contraseña debe tener al menos 8 caracteres.");
        } else if (passwordLg.value.trim().length > 20) {
            showError(passwordLg, "La contraseña no debe exceder los 20 caracteres.");
        } else {
            showSuccess(passwordLg);
        }
    });
});
