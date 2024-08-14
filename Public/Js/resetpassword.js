document.addEventListener("DOMContentLoaded", () => {
    const resetPasswordForm = document.getElementById('resetPasswordForm');
    const newPasswordForm = document.getElementById('newPasswordForm');
    const resetEmail = document.getElementById('reset-email');
    const resetEmailError = document.getElementById('reset-email-error');
    const newPassword = document.getElementById('new-password');
    const newPasswordError = document.getElementById('new-password-error');
    const confirmPassword = document.getElementById('confirm-password');
    const confirmPasswordError = document.getElementById('confirm-password-error');

    // Enviar enlace de restablecimiento
    resetPasswordForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const email = resetEmail.value;
      if (!validateEmail(email)) {
        showError(resetEmail, resetEmailError, "El correo electrónico no es válido.");
        return;
      }

      try {
        const response = await fetch('/auth/request-reset-password', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ correo: email })
        });

        const data = await response.json();
        alert(data.message);
      } catch (error) {
        console.error(error);
      }
    });

    // Cambiar contraseña
    newPasswordForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const password = newPassword.value;
      const confirm = confirmPassword.value;

      if (password !== confirm) {
        showError(confirmPassword, confirmPasswordError, "Las contraseñas no coinciden.");
        return;
      }

      if (password.length < 8) {
        showError(newPassword, newPasswordError, "La contraseña debe tener al menos 8 caracteres.");
        return;
      }

      const urlParams = new URLSearchParams(window.location.search);
      const token = urlParams.get('token');

      try {
        const response = await fetch('/auth/reset-password', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ token, contraseña: password })
        });

        const data = await response.json();
        alert(data.message);
      } catch (error) {
        console.error(error);
      }
    });

    function showError(input, errorElement, message) {
      input.parentElement.className = 'form-control error';
      errorElement.innerText = message;
    }

    function hideError(input, errorElement) {
      input.parentElement.className = 'form-control';
      errorElement.innerText = '';
    }

    function validateEmail(email) {
      const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
      return emailRegex.test(email.trim());
    }
});
