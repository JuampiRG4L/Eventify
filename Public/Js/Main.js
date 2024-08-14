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
  const usernameErrorReg = document.getElementById('username-error');
  const emailErrorReg = document.getElementById('email-error');
  const passwordErrorReg = document.getElementById('password-error');

  // Selección de elementos del formulario de inicio de sesión
  const lgForm = document.querySelector(".login-container form");
  const emailLg = document.querySelector('.email-2');
  const passwordLg = document.querySelector('.password-2');
  const emailErrorLg = document.querySelector(".email-error-2");
  const passwordErrorLg = document.querySelector(".password-error-2");

  regForm.addEventListener('submit', async function(e) {
      e.preventDefault();
      if (!checkRequired([usernameReg, emailReg, passwordReg])) {
          const nombre = usernameReg.value;
          const correo = emailReg.value;
          const contraseña = passwordReg.value;
          const proveedor = 'local';
          const id_proveedor = null;

          const response = await fetch('/auth/register', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify({ nombre, correo, contraseña, proveedor, id_proveedor })
          });

          const data = await response.json();
          alert(data.message);
      }
  });

  lgForm.addEventListener('submit', async function(e) {
      e.preventDefault();
      if (!checkRequired([emailLg, passwordLg])) {
          const correo = emailLg.value;
          const contraseña = passwordLg.value;

          const response = await fetch('/auth/login', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify({ correo, contraseña })
          });

          const data = await response.json();
          alert(data.message);
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
      return !isValid;
  }

  function showError(input, message) {
      const formControl = input.parentElement; // Obtenemos el contenedor del input
      if (formControl) {
          formControl.className = 'form-control error'; // Cambiamos la clase para mostrar el error
          const small = formControl.querySelector('small'); // Obtenemos el elemento small
          if (small) {
              small.innerText = message; // Asignamos el mensaje de error
          }
      }
  }

  function showSuccess(input) {
      const formControl = input.parentElement;
      if (formControl) {
          formControl.className = 'form-control success'; // Cambiamos la clase para mostrar éxito
          const small = formControl.querySelector('small');
          if (small) {
              small.innerText = ''; // Limpiamos el mensaje de error
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
