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

    // Selección de elementos del formulario de registro
    const regForm = document.querySelector(".register-container form");
    const usernameReg = document.getElementById('username');
    const emailReg = document.getElementById('email');
    const passwordReg = document.getElementById('password');
    const roleSelect = document.getElementById('role'); // Selección del rol
    const usernameErrorReg = document.getElementById('username-error');
    const emailErrorReg = document.getElementById('email-error');
    const passwordErrorReg = document.getElementById('password-error');

    // Selección de elementos del formulario de inicio de sesión
    const lgForm = document.querySelector(".login-container form");
    const emailLg = document.getElementById('login-email');
    const passwordLg = document.getElementById('login-password');
    const emailErrorLg = document.getElementById("login-email-error");
    const passwordErrorLg = document.getElementById("login-password-error");

    // Registro de usuario
    regForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        if (!checkRequired([usernameReg, emailReg, passwordReg])) {
            const nombre = usernameReg.value;
            const correo = emailReg.value;
            const contraseña = passwordReg.value;
            const proveedor = 'local';
            const id_proveedor = null;  // Si no se necesita, puedes dejarlo como null
            const rol = roleSelect.value;  // Obtener el valor seleccionado del rol

            try {
                const response = await fetch('/register', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ nombre, correo, contraseña, proveedor, id_proveedor, rol })
                });

                const data = await response.json();
                if (response.ok) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Registro Exitoso',
                        text: data.message,
                    });
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: data.message,
                    });
                }
            } catch (error) {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Ocurrió un error durante el registro.',
                });
            }
        }
    });

    // Inicio de sesión
lgForm.addEventListener('submit', async function(e) {
    e.preventDefault();
    if (!checkRequired([emailLg, passwordLg])) {
        const correo = emailLg.value;
        const contraseña = passwordLg.value;

        try {
            const response = await fetch('/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ correo, contraseña })
            });

            const data = await response.json();
            if (response.ok) {
                Swal.fire({
                    icon: 'success',
                    title: 'Inicio de Sesión Exitoso',
                    text: data.message,
                }).then(() => {
                    // Redirige según el rol del usuario
                    if (data.rol === 'admin') {
                        window.location.href = '/admin/dashboard';
                    } else {
                        window.location.href = '/index'; // O la ruta que desees para usuarios normales
                    }
                });
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: data.message,
                });
            }
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Ocurrió un error durante el inicio de sesión.',
            });
        }
    }
});

    // Validación de campos requeridos
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
        return !isValid;
    }

    function showError(input, message) {
        const formControl = input.parentElement;
        if (formControl) {
            formControl.className = 'form-control error';
            const small = formControl.querySelector('small');
            if (small) {
                small.innerText = message;
            }
        }
    }

    function showSuccess(input) {
        const formControl = input.parentElement;
        if (formControl) {
            formControl.className = 'form-control success';
            const small = formControl.querySelector('small');
            if (small) {
                small.innerText = '';
            }
        }
    }

    function getFieldName(input) {
        return input.placeholder;
    }

    function checkEmail(input) {
        const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
        return emailRegex.test(input.value.trim());
    }

    // Validación en tiempo real
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
