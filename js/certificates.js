// === FUNCIONALIDADES DEL SISTEMA DE CERTIFICADOS ===

// Variables globales para certificados
let cursoSeleccionado = '';
let tipoCertificadoSeleccionado = 'digital';
let precioSeleccionado = 25.00;

// Función para abrir el modal de certificado
function abrirModalCertificado(curso) {
    cursoSeleccionado = curso;
    const modal = document.getElementById('certificado-modal');
    if (modal) {
        modal.style.display = 'flex';

        // Configurar título del curso
        const cursoTitulos = {
            'archivistica-basica': 'Curso de Archivística Básica',
            'gestion-documental': 'Gestión Documental Sector Público',
            'preservacion-digital': 'Conservación y Preservación Digital'
        };

        const tituloElement = document.getElementById('curso-titulo');
        if (tituloElement) {
            tituloElement.textContent = cursoTitulos[curso] || 'Curso';
        }

        // Mostrar paso 1
        mostrarPaso(1);
    }
}

// Función para cerrar el modal de certificado
function cerrarModalCertificado() {
    const modal = document.getElementById('certificado-modal');
    if (modal) {
        modal.style.display = 'none';
        // Resetear formulario
        const form = document.getElementById('certificado-form');
        if (form) {
            form.reset();
        }
        mostrarPaso(1);
    }
}

// Función para mostrar un paso específico
function mostrarPaso(pasoNumero) {
    // Ocultar todos los pasos
    document.querySelectorAll('.cert-paso').forEach(paso => {
        paso.classList.remove('active');
    });

    // Mostrar paso seleccionado
    const pasoElement = document.getElementById(`paso-${pasoNumero}`);
    if (pasoElement) {
        pasoElement.classList.add('active');
    }
}

// Función para ir al siguiente paso
function siguientePaso(pasoNumero) {
    if (pasoNumero === 2) {
        // Validar selección de tipo de certificado
        const tipoSeleccionado = document.querySelector('input[name="tipo-certificado"]:checked');
        if (tipoSeleccionado) {
            tipoCertificadoSeleccionado = tipoSeleccionado.value;
            precioSeleccionado = tipoSeleccionado.value === 'digital' ? 25.00 : 45.00;

            // Actualizar precio en el resumen
            const precioResumen = document.getElementById('precio-resumen');
            const totalResumen = document.getElementById('total-resumen');
            if (precioResumen) precioResumen.textContent = `S/ ${precioSeleccionado.toFixed(2)}`;
            if (totalResumen) totalResumen.innerHTML = `<strong>S/ ${precioSeleccionado.toFixed(2)}</strong>`;
        }
    }

    mostrarPaso(pasoNumero);
}

// Función para ir al paso anterior
function anteriorPaso(pasoNumero) {
    mostrarPaso(pasoNumero);
}

// Función para procesar el pago
function procesarPago() {
    // Validar formulario de pago
    const numeroTarjeta = document.getElementById('numero-tarjeta')?.value;
    const fechaExpiracion = document.getElementById('fecha-expiracion')?.value;
    const cvv = document.getElementById('cvv')?.value;
    const nombreTarjeta = document.getElementById('nombre-tarjeta')?.value;

    if (!numeroTarjeta || !fechaExpiracion || !cvv || !nombreTarjeta) {
        mostrarNotificacion('Por favor completa todos los campos de pago.', 'error');
        return;
    }

    // Simular procesamiento de pago
    const btnPagar = document.querySelector('#paso-3 .btn-primary');
    if (btnPagar) {
        btnPagar.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Procesando...';
        btnPagar.disabled = true;
    }

    setTimeout(() => {
        // Simular pago exitoso
        mostrarPaso(4);

        // Actualizar preview del certificado
        const nombres = document.getElementById('nombres')?.value || '';
        const apellidoPaterno = document.getElementById('apellido-paterno')?.value || '';
        const apellidoMaterno = document.getElementById('apellido-materno')?.value || '';

        const certNombrePreview = document.getElementById('cert-nombre-preview');
        if (certNombrePreview) {
            certNombrePreview.textContent = `${nombres} ${apellidoPaterno} ${apellidoMaterno}`;
        }

        const cursoTitulos = {
            'archivistica-basica': 'Archivística Básica',
            'gestion-documental': 'Gestión Documental Sector Público',
            'preservacion-digital': 'Conservación y Preservación Digital'
        };

        const certCursoPreview = document.getElementById('cert-curso-preview');
        if (certCursoPreview) {
            certCursoPreview.textContent = cursoTitulos[cursoSeleccionado] || 'Curso';
        }

        // Mostrar fecha actual
        const certFecha = document.getElementById('cert-fecha');
        if (certFecha) {
            const fechaActual = new Date();
            const opcionesFecha = { year: 'numeric', month: 'long', day: 'numeric' };
            certFecha.textContent = fechaActual.toLocaleDateString('es-ES', opcionesFecha);
        }

    }, 2000); // Simular 2 segundos de procesamiento
}

// Función para descargar certificado
function descargarCertificado() {
    // Crear contenido del certificado en formato HTML
    const nombres = document.getElementById('nombres')?.value || '';
    const apellidoPaterno = document.getElementById('apellido-paterno')?.value || '';
    const apellidoMaterno = document.getElementById('apellido-materno')?.value || '';
    const nombreCompleto = `${nombres} ${apellidoPaterno} ${apellidoMaterno}`;

    const cursoTitulos = {
        'archivistica-basica': 'Archivística Básica',
        'gestion-documental': 'Gestión Documental Sector Público',
        'preservacion-digital': 'Conservación y Preservación Digital'
    };
    const cursoNombre = cursoTitulos[cursoSeleccionado] || 'Curso';

    const fechaActual = new Date().toLocaleDateString('es-ES', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    // Crear contenido HTML del certificado
    const certificadoHTML = `
        <!DOCTYPE html>
        <html lang="es">
        <head>
            <meta charset="UTF-8">
            <title>Certificado - ${cursoNombre}</title>
            <style>
                body {
                    font-family: 'Times New Roman', serif;
                    margin: 0;
                    padding: 40px;
                    background: #f8fafc;
                }
                .certificado {
                    background: white;
                    border: 3px solid #2563eb;
                    border-radius: 20px;
                    padding: 60px;
                    max-width: 800px;
                    margin: 0 auto;
                    box-shadow: 0 10px 30px rgba(0,0,0,0.1);
                    position: relative;
                }
                .certificado::before {
                    content: '';
                    position: absolute;
                    top: 20px;
                    left: 20px;
                    right: 20px;
                    bottom: 20px;
                    border: 2px solid #e5e7eb;
                    border-radius: 15px;
                    pointer-events: none;
                }
                .header {
                    text-align: center;
                    margin-bottom: 40px;
                }
                .logo {
                    font-size: 2.5rem;
                    color: #2563eb;
                    margin-bottom: 20px;
                }
                .titulo-principal {
                    font-size: 2rem;
                    font-weight: bold;
                    color: #1f2937;
                    margin-bottom: 10px;
                }
                .subtitulo {
                    font-size: 1.2rem;
                    color: #6b7280;
                    margin-bottom: 40px;
                }
                .certifica {
                    font-size: 1.5rem;
                    text-align: center;
                    margin: 40px 0;
                    font-style: italic;
                    color: #374151;
                }
                .nombre {
                    font-size: 2.5rem;
                    text-align: center;
                    margin: 40px 0;
                    font-weight: bold;
                    color: #1f2937;
                    text-transform: uppercase;
                    letter-spacing: 2px;
                }
                .curso {
                    text-align: center;
                    margin: 40px 0;
                }
                .curso-texto {
                    font-size: 1.3rem;
                    color: #6b7280;
                    margin-bottom: 20px;
                }
                .curso-nombre {
                    font-size: 2rem;
                    font-weight: bold;
                    color: #2563eb;
                    text-transform: uppercase;
                }
                .detalles {
                    display: flex;
                    justify-content: space-between;
                    margin: 60px 0 40px 0;
                    padding: 0 40px;
                }
                .detalle-item {
                    text-align: center;
                }
                .detalle-label {
                    font-size: 0.9rem;
                    color: #6b7280;
                    margin-bottom: 5px;
                }
                .detalle-valor {
                    font-size: 1.1rem;
                    font-weight: bold;
                    color: #1f2937;
                }
                .footer {
                    text-align: center;
                    margin-top: 60px;
                    padding-top: 40px;
                    border-top: 2px solid #e5e7eb;
                }
                .firmas {
                    display: flex;
                    justify-content: space-between;
                    margin: 40px 0;
                    padding: 0 60px;
                }
                .firma {
                    text-align: center;
                    flex: 1;
                }
                .firma-linea {
                    border-top: 1px solid #374151;
                    margin: 40px 20px 10px 20px;
                }
                .firma-texto {
                    font-size: 0.9rem;
                    color: #374151;
                }
                .codigo-verificacion {
                    background: #f3f4f6;
                    padding: 20px;
                    border-radius: 10px;
                    margin-top: 30px;
                    font-family: monospace;
                    font-size: 1.2rem;
                    letter-spacing: 2px;
                }
                .fecha-emision {
                    text-align: center;
                    margin-top: 30px;
                    font-size: 1.1rem;
                    color: #6b7280;
                }
            </style>
        </head>
        <body>
            <div class="certificado">
                <div class="header">
                    <div class="logo">
                        <i class="fas fa-certificate"></i>
                    </div>
                    <div class="titulo-principal">Instituto de Formación Archivística del Perú</div>
                    <div class="subtitulo">Certificado de Aprobación</div>
                </div>

                <div class="certifica">Certifica que</div>

                <div class="nombre">${nombreCompleto}</div>

                <div class="curso">
                    <div class="curso-texto">Ha completado satisfactoriamente el curso de</div>
                    <div class="curso-nombre">${cursoNombre}</div>
                </div>

                <div class="detalles">
                    <div class="detalle-item">
                        <div class="detalle-label">Horas Académicas</div>
                        <div class="detalle-valor">40 horas</div>
                    </div>
                    <div class="detalle-item">
                        <div class="detalle-label">Créditos</div>
                        <div class="detalle-valor">4</div>
                    </div>
                    <div class="detalle-item">
                        <div class="detalle-label">Calificación</div>
                        <div class="detalle-valor">95/100</div>
                    </div>
                </div>

                <div class="firmas">
                    <div class="firma">
                        <div class="firma-linea"></div>
                        <div class="firma-texto">Director Académico</div>
                        <div class="firma-texto">Dr. Carlos Mendoza</div>
                    </div>
                    <div class="firma">
                        <div class="firma-linea"></div>
                        <div class="firma-texto">Rector</div>
                        <div class="firma-texto">Dra. Ana García</div>
                    </div>
                </div>

                <div class="codigo-verificacion">
                    Código de Verificación: ${generarCodigoVerificacion()}
                </div>

                <div class="fecha-emision">
                    Lima, ${fechaActual}
                </div>
            </div>
        </body>
        </html>
    `;

    // Crear blob y descargar
    const blob = new Blob([certificadoHTML], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Certificado_${cursoNombre.replace(/\s+/g, '_')}_${Date.now()}.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    // Cerrar modal
    cerrarModalCertificado();

    // Mostrar notificación de éxito
    mostrarNotificacion('Certificado descargado exitosamente', 'success');
}

// Función para generar código de verificación
function generarCodigoVerificacion() {
    const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let codigo = '';
    for (let i = 0; i < 12; i++) {
        codigo += caracteres.charAt(Math.floor(Math.random() * caracteres.length));
    }
    return codigo;
}

// Función para mostrar notificaciones
function mostrarNotificacion(mensaje, tipo = 'success') {
    const notificacion = document.createElement('div');
    notificacion.className = `notificacion ${tipo}`;
    notificacion.innerHTML = `
        <i class="fas fa-${tipo === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
        <span>${mensaje}</span>
    `;

    document.body.appendChild(notificacion);

    // Animar entrada
    setTimeout(() => notificacion.classList.add('show'), 100);

    // Remover después de 3 segundos
    setTimeout(() => {
        notificacion.classList.remove('show');
        setTimeout(() => notificacion.remove(), 300);
    }, 3000);
}

// Inicializar funcionalidades cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    // Formatear número de tarjeta
    const numeroTarjetaInput = document.getElementById('numero-tarjeta');
    if (numeroTarjetaInput) {
        numeroTarjetaInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
            let formattedValue = '';
            for (let i = 0; i < value.length; i++) {
                if (i > 0 && i % 4 === 0) {
                    formattedValue += ' ';
                }
                formattedValue += value[i];
            }
            e.target.value = formattedValue;
        });
    }

    // Formatear fecha de expiración
    const fechaExpiracionInput = document.getElementById('fecha-expiracion');
    if (fechaExpiracionInput) {
        fechaExpiracionInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            if (value.length >= 2) {
                value = value.substring(0, 2) + '/' + value.substring(2, 4);
            }
            e.target.value = value;
        });
    }

    // Cambiar formulario de pago según método seleccionado
    document.querySelectorAll('input[name="metodo-pago"]').forEach(radio => {
        radio.addEventListener('change', function() {
            const metodo = this.value;
            const formularioPago = document.getElementById('formulario-pago');

            if (formularioPago) {
                if (metodo === 'transferencia') {
                    formularioPago.innerHTML = `
                        <div class="transferencia-info">
                            <h5>Datos para Transferencia Bancaria</h5>
                            <div class="banco-info">
                                <p><strong>Banco:</strong> Banco de Crédito del Perú</p>
                                <p><strong>Cuenta:</strong> 123-456789-012</p>
                                <p><strong>CCI:</strong> 00212300456789012</p>
                                <p><strong>Titular:</strong> Instituto de Formación Archivística del Perú</p>
                            </div>
                            <p class="transferencia-nota">Una vez realizada la transferencia, envía el comprobante al correo: pagos@ifap.edu.pe</p>
                        </div>
                    `;
                } else if (metodo === 'paypal') {
                    formularioPago.innerHTML = `
                        <div class="paypal-info">
                            <p>Serás redirigido a PayPal para completar el pago de forma segura.</p>
                            <div class="paypal-logo">
                                <i class="fab fa-paypal"></i>
                                <span>PayPal</span>
                            </div>
                        </div>
                    `;
                } else {
                    // Restaurar formulario de tarjeta
                    formularioPago.innerHTML = `
                        <div class="form-row">
                            <div class="form-group">
                                <label for="numero-tarjeta">Número de Tarjeta *</label>
                                <input type="text" id="numero-tarjeta" placeholder="1234 5678 9012 3456" maxlength="19">
                            </div>
                            <div class="form-group">
                                <label for="fecha-expiracion">Fecha de Expiración *</label>
                                <input type="text" id="fecha-expiracion" placeholder="MM/AA" maxlength="5">
                            </div>
                        </div>
                        <div class="form-row">
                            <div class="form-group">
                                <label for="cvv">CVV *</label>
                                <input type="text" id="cvv" placeholder="123" maxlength="4">
                            </div>
                            <div class="form-group">
                                <label for="nombre-tarjeta">Nombre en la Tarjeta *</label>
                                <input type="text" id="nombre-tarjeta" placeholder="JUAN CARLOS PEREZ">
                            </div>
                        </div>
                    `;

                    // Re-agregar event listeners
                    setTimeout(() => {
                        const numeroTarjetaInput = document.getElementById('numero-tarjeta');
                        const fechaExpiracionInput = document.getElementById('fecha-expiracion');

                        if (numeroTarjetaInput) {
                            numeroTarjetaInput.addEventListener('input', function(e) {
                                let value = e.target.value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
                                let formattedValue = '';
                                for (let i = 0; i < value.length; i++) {
                                    if (i > 0 && i % 4 === 0) {
                                        formattedValue += ' ';
                                    }
                                    formattedValue += value[i];
                                }
                                e.target.value = value;
                            });
                        }

                        if (fechaExpiracionInput) {
                            fechaExpiracionInput.addEventListener('input', function(e) {
                                let value = e.target.value.replace(/\D/g, '');
                                if (value.length >= 2) {
                                    value = value.substring(0, 2) + '/' + value.substring(2, 4);
                                }
                                e.target.value = value;
                            });
                        }
                    }, 100);
                }
            }
        });
    });
});
