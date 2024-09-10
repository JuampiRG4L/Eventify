document.addEventListener("DOMContentLoaded", function() {
    // Definir las funciones antes de usarlas
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

    function getFieldName(input) {
        return input.placeholder;
    }

    function checkEmail(input) {
        const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
        return emailRegex.test(input.value.trim());
    }

    // Eventos del formulario de registro
    const regForm = document.querySelector('.form-container.register-container form');
    const usernameReg = document.getElementById('username');
    const emailReg = document.getElementById('email');
    const passwordReg = document.getElementById('password');

    if (regForm) {
        regForm.addEventListener('submit', function(e) {
            e.preventDefault();
            if (!checkRequired([usernameReg, emailReg, passwordReg])) {
                // Aquí puedes agregar código para enviar el formulario si todos los campos son válidos
            }
        });

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
    }

    // Asegúrate de tener definiciones similares para otros formularios o elementos
    // ...
});
