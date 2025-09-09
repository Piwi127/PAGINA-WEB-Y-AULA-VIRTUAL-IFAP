document.addEventListener('DOMContentLoaded', () => {
    const forms = document.querySelectorAll('form');

    // Función para mostrar mensaje de error
    function showError(input, message) {
        const formGroup = input.closest('.form-group');
        const errorDisplay = formGroup.querySelector('.error-message');
        if (!errorDisplay) {
            const newError = document.createElement('div');
            newError.classList.add('error-message');
            newError.style.color = 'red';
            newError.style.fontSize = '0.85em';
            newError.style.marginTop = '0.3em';
            formGroup.appendChild(newError);
            newError.textContent = message;
            newError.style.display = 'block'; // Asegura que el mensaje sea visible
        } else {
            errorDisplay.textContent = message;
            errorDisplay.style.display = 'block'; // Asegura que el mensaje sea visible
        }
        input.classList.add('invalid');
    }

    // Función para ocultar mensaje de error
    function hideError(input) {
        const formGroup = input.closest('.form-group');
        const errorDisplay = formGroup.querySelector('.error-message');
        if (errorDisplay) {
            errorDisplay.style.display = 'none'; // Oculta el mensaje
        }
        input.classList.remove('invalid');
    }

    // Validación de campo requerido
    function validateRequired(input) {
        if (input.value.trim() === '') {
            showError(input, 'Este campo es obligatorio.');
            return false;
        }
        hideError(input);
        return true;
    }

    // Validación de email
    function validateEmail(input) {
        if (!validateRequired(input)) return false;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(input.value.trim())) {
            showError(input, 'Por favor, introduce un email válido.');
            return false;
        }
        hideError(input);
        return true;
    }

    // Validación de longitud mínima (opcional, si se necesita)
    function validateMinLength(input, minLength) {
        if (!validateRequired(input)) return false;
        if (input.value.trim().length < minLength) {
            showError(input, `Debe tener al menos ${minLength} caracteres.`);
            return false;
        }
        hideError(input);
        return true;
    }

    forms.forEach(form => {
        const inputs = form.querySelectorAll('input, select, textarea');
        const submitButton = form.querySelector('button[type="submit"]');

        // Validación de contraseña
        function validatePassword(passwordInput) {
            if (!validateRequired(passwordInput)) return false;
            const password = passwordInput.value;
            // Mínimo 8 caracteres, al menos una mayúscula, una minúscula, un número y un caracter especial
            const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
            if (!passwordRegex.test(password)) {
                showError(passwordInput, 'La contraseña debe tener al menos 8 caracteres, incluyendo mayúsculas, minúsculas, números y símbolos.');
                return false;
            }
            hideError(passwordInput);
            return true;
        }

        // Validación de confirmación de contraseña
        function validateConfirmPassword(confirmPasswordInput, passwordInput) {
            if (!validateRequired(confirmPasswordInput)) return false;
            if (confirmPasswordInput.value !== passwordInput.value) {
                showError(confirmPasswordInput, 'Las contraseñas no coinciden.');
                return false;
            }
            hideError(confirmPasswordInput);
            return true;
        }

        inputs.forEach(input => {
            input.addEventListener('blur', () => {
                if (input.hasAttribute('required')) {
                    validateRequired(input);
                }
                if (input.type === 'email') {
                    validateEmail(input);
                }
                if (input.id === 'password') {
                    validatePassword(input);
                }
                if (input.id === 'confirm_password') {
                    const passwordInput = form.querySelector('#password');
                    validateConfirmPassword(input, passwordInput);
                }
            });

            input.addEventListener('input', () => {
                hideError(input);
                if (input.id === 'password') {
                    validatePassword(input); // Validar en tiempo real para feedback de fortaleza
                }
                if (input.id === 'confirm_password') {
                    const passwordInput = form.querySelector('#password');
                    validateConfirmPassword(input, passwordInput);
                }
            });
        });

        form.addEventListener('submit', (e) => {
            e.preventDefault();
            let formIsValid = true;

            inputs.forEach(input => {
                if (input.hasAttribute('required')) {
                    if (!validateRequired(input)) {
                        formIsValid = false;
                    }
                }
                if (input.type === 'email') {
                    if (!validateEmail(input)) {
                        formIsValid = false;
                    }
                }
                if (input.id === 'password') {
                    if (!validatePassword(input)) {
                        formIsValid = false;
                    }
                }
                if (input.id === 'confirm_password') {
                    const passwordInput = form.querySelector('#password');
                    if (!validateConfirmPassword(input, passwordInput)) {
                        formIsValid = false;
                    }
                }
            });

            if (formIsValid) {
                submitButton.disabled = true; // Deshabilitar el botón al enviar
                // Determinar el texto del botón basado en el formulario
                const originalButtonText = form.id === 'contact-form' ? 'Enviar Mensaje' : 'Crear Cuenta';
                submitButton.textContent = 'Enviando...'; // Cambiar texto del botón

                // Simular envío de formulario (reemplazar con lógica real, ej. fetch/XHR)
                setTimeout(() => {
                    alert('Formulario enviado con éxito!');
                    form.reset(); // Resetear el formulario
                    submitButton.disabled = false; // Habilitar el botón
                    submitButton.textContent = originalButtonText; // Restaurar texto original
                    // Eliminar todos los mensajes de error restantes
                    form.querySelectorAll('.error-message').forEach(el => el.remove());
                    form.querySelectorAll('.invalid').forEach(el => el.classList.remove('invalid'));
                }, 1500);
            } else {
                alert('Por favor, corrige los errores en el formulario.');
            }
            // Asegurarse de que todos los campos sean validados al intentar enviar
            inputs.forEach(input => {
                // Re-validar todos los campos para asegurar que los mensajes de error se muestren correctamente
                if (input.hasAttribute('required')) {
                    validateRequired(input);
                }
                if (input.type === 'email') {
                    validateEmail(input);
                }
                if (input.id === 'password') {
                    validatePassword(input);
                }
                if (input.id === 'confirm_password') {
                    const passwordInput = form.querySelector('#password');
                    validateConfirmPassword(input, passwordInput);
                }
            });
        });
    });
});

// === FUNCIONALIDAD DE MODALES ===
document.addEventListener('DOMContentLoaded', () => {
    // Funciones para manejar modales
    function openModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.add('show');
            document.body.style.overflow = 'hidden'; // Prevenir scroll del body
        }
    }

    function closeModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.remove('show');
            document.body.style.overflow = 'auto'; // Restaurar scroll del body
        }
    }

    // Event listeners para abrir modales
    const terminosLink = document.getElementById('terminos-link');
    const privacidadLink = document.getElementById('privacidad-link');

    if (terminosLink) {
        terminosLink.addEventListener('click', (e) => {
            e.preventDefault();
            openModal('terminos-modal');
        });
    }

    if (privacidadLink) {
        privacidadLink.addEventListener('click', (e) => {
            e.preventDefault();
            openModal('privacidad-modal');
        });
    }

    // Event listeners para cerrar modales
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('modal-close') || e.target.classList.contains('modal')) {
            const modalId = e.target.getAttribute('data-modal') || e.target.id;
            if (modalId) {
                closeModal(modalId);
            } else if (e.target.classList.contains('modal')) {
                // Cerrar modal al hacer click en el overlay
                e.target.classList.remove('show');
                document.body.style.overflow = 'auto';
            }
        }
    });

    // Cerrar modal con tecla Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            const openModal = document.querySelector('.modal.show');
            if (openModal) {
                openModal.classList.remove('show');
                document.body.style.overflow = 'auto';
            }
        }
    });

    // Funciones para aceptar términos
    window.aceptarTerminos = function() {
        const checkbox = document.getElementById('terminos');
        if (checkbox) {
            checkbox.checked = true;
        }
        closeModal('terminos-modal');
    };

    window.aceptarPrivacidad = function() {
        closeModal('privacidad-modal');
    };
});

// === FUNCIONALIDAD DE BARRA DE FORTALEZA DE CONTRASEÑA ===
document.addEventListener('DOMContentLoaded', () => {
    const passwordInput = document.getElementById('password');
    const strengthBar = document.querySelector('.strength-bar');
    const strengthText = document.querySelector('.strength-text');

    if (passwordInput && strengthBar && strengthText) {
        passwordInput.addEventListener('input', () => {
            const password = passwordInput.value;
            const strength = calculatePasswordStrength(password);
            updateStrengthIndicator(strength);
        });
    }

    function calculatePasswordStrength(password) {
        let score = 0;

        // Longitud
        if (password.length >= 8) score += 20;
        if (password.length >= 12) score += 10;

        // Minúsculas
        if (/[a-z]/.test(password)) score += 15;

        // Mayúsculas
        if (/[A-Z]/.test(password)) score += 15;

        // Números
        if (/\d/.test(password)) score += 15;

        // Caracteres especiales
        if (/[@$!%*?&]/.test(password)) score += 15;

        // Variedad de caracteres
        if (password.length >= 10 && /[a-z]/.test(password) && /[A-Z]/.test(password) && /\d/.test(password) && /[@$!%*?&]/.test(password)) {
            score += 10;
        }

        return Math.min(score, 100);
    }

    function updateStrengthIndicator(strength) {
        strengthBar.style.width = strength + '%';

        if (strength < 30) {
            strengthBar.style.background = '#ef4444'; // Rojo
            strengthText.textContent = 'Muy débil';
            strengthText.style.color = '#ef4444';
        } else if (strength < 50) {
            strengthBar.style.background = '#f59e0b'; // Naranja
            strengthText.textContent = 'Débil';
            strengthText.style.color = '#f59e0b';
        } else if (strength < 70) {
            strengthBar.style.background = '#eab308'; // Amarillo
            strengthText.textContent = 'Regular';
            strengthText.style.color = '#eab308';
        } else if (strength < 90) {
            strengthBar.style.background = '#10b981'; // Verde claro
            strengthText.textContent = 'Fuerte';
            strengthText.style.color = '#10b981';
        } else {
            strengthBar.style.background = '#059669'; // Verde oscuro
            strengthText.textContent = 'Muy fuerte';
            strengthText.style.color = '#059669';
        }
    }
});