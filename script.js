document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('formulario-botonera');
    const submitButton = form.querySelector('.btn-submit');
    const themeToggle = document.getElementById('themeToggle');

    // Theme Toggle
    function initTheme() {
        const savedTheme = localStorage.getItem('theme') || 'light';
        document.documentElement.setAttribute('data-theme', savedTheme);
        themeToggle.textContent = savedTheme === 'dark' ? '☀️' : '🌙';
    }

    themeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        themeToggle.textContent = newTheme === 'dark' ? '☀️' : '🌙';
    });

    // File Upload Preview
    function handleFileUpload(input, previewId) {
        const preview = document.getElementById(previewId);
        preview.innerHTML = '';

        if (input.files) {
            Array.from(input.files).forEach(file => {
                if (file.type.startsWith('image/')) {
                    const reader = new FileReader();
                    reader.onload = function(e) {
                        const img = document.createElement('img');
                        img.src = e.target.result;
                        preview.appendChild(img);
                    };
                    reader.readAsDataURL(file);
                }
            });
        }
    }

    document.getElementById('logo').addEventListener('change', function() {
        handleFileUpload(this, 'logoPreview');
    });

    document.getElementById('imagenes').addEventListener('change', function() {
        handleFileUpload(this, 'imagenesPreview');
    });

    // Form Persistence
    function saveFormData() {
        const formData = new FormData(form);
        const formDataObject = {};
        formData.forEach((value, key) => {
            if (key !== 'logo' && key !== 'imagenes') {
                formDataObject[key] = value;
            }
        });
        localStorage.setItem('formData', JSON.stringify(formDataObject));
    }

    function loadFormData() {
        const savedData = localStorage.getItem('formData');
        if (savedData) {
            const formData = JSON.parse(savedData);
            Object.keys(formData).forEach(key => {
                const input = form.elements[key];
                if (input) {
                    input.value = formData[key];
                }
            });
        }
    }

    // Create message elements
    const successMessage = document.createElement('div');
    successMessage.className = 'success-message';
    successMessage.textContent = '¡Formulario enviado con éxito!';
    form.insertBefore(successMessage, form.firstChild);

    const errorMessage = document.createElement('div');
    errorMessage.className = 'error-message';
    errorMessage.textContent = 'Por favor, complete todos los campos requeridos.';
    form.insertBefore(errorMessage, form.firstChild);

    // Form validation
    function validateForm() {
        const requiredFields = form.querySelectorAll('[required]');
        let isValid = true;

        requiredFields.forEach(field => {
            if (!field.value.trim()) {
                isValid = false;
                field.classList.add('invalid');
            } else {
                field.classList.remove('invalid');
            }
        });

        return isValid;
    }

    // Handle form submission
    form.addEventListener('submit', async function(e) {
        e.preventDefault();

        if (!validateForm()) {
            errorMessage.style.display = 'block';
            successMessage.style.display = 'none';
            return;
        }

        // Show loading state
        submitButton.classList.add('loading');
        submitButton.disabled = true;
        submitButton.textContent = 'Enviando...';

        try {
            // Collect form data
            const formData = new FormData(form);
            const formDataObject = {};
            formData.forEach((value, key) => {
                formDataObject[key] = value;
            });

            // Format message for WhatsApp
            const whatsappMessage = formatWhatsAppMessage(formDataObject);
            const whatsappUrl = `https://wa.me/573226060533?text=${encodeURIComponent(whatsappMessage)}`;

            // Show success message
            successMessage.style.display = 'block';
            errorMessage.style.display = 'none';
            
            // Save form data before reset
            saveFormData();
            
            // Reset form
            form.reset();
            document.getElementById('logoPreview').innerHTML = '';
            document.getElementById('imagenesPreview').innerHTML = '';

            // Redirect to WhatsApp after 2 seconds
            setTimeout(() => {
                window.open(whatsappUrl, '_blank');
            }, 2000);

        } catch (error) {
            console.error('Error:', error);
            errorMessage.textContent = 'Hubo un error al enviar el formulario. Por favor, intente nuevamente.';
            errorMessage.style.display = 'block';
            successMessage.style.display = 'none';
        } finally {
            // Reset button state
            submitButton.classList.remove('loading');
            submitButton.disabled = false;
            submitButton.textContent = 'Enviar Información';
        }
    });

    // Format message for WhatsApp
    function formatWhatsAppMessage(data) {
        let message = '📱 *Nuevo Formulario de Botonera Digital*\n\n';
        
        // Basic Information
        message += '*Información Básica:*\n';
        message += `🏢 Tipo de Negocio: ${data.tipo_negocio}\n`;
        message += `🌐 Idioma: ${data.idioma}\n\n`;
        
        // Project Instructions
        message += '*Instrucciones del Proyecto:*\n';
        message += `🎨 Instrucción de diseño: ${data.instruccion_diseno}\n`;
        message += `📝 Instrucción de contexto: ${data.instruccion_contexto}\n`;
        if (data.instruccion_programacion) message += `⚙️ Instrucción de programación: ${data.instruccion_programacion}\n`;
        if (data.instruccion_configuracion) message += `🔧 Instrucción de configuración: ${data.instruccion_configuracion}\n\n`;

        // Other Services
        if (data.otros_servicios) {
            message += '*Otros Servicios:*\n';
            message += `${data.otros_servicios}\n\n`;
        }

        // Business Links
        message += '*Enlaces del Negocio:*\n';
        if (data.google_reviews) message += `⭐ LINK GOOGLE CALIFICACIONES: ${data.google_reviews}\n`;
        if (data.facebook) message += `📘 LINK FACEBOOK FAN PAGE: ${data.facebook}\n`;
        if (data.instagram) message += `📸 LINK INSTAGRAM EMPRESA: ${data.instagram}\n`;
        if (data.tiktok) message += `🎵 TIK TOK: ${data.tiktok}\n`;
        if (data.youtube) message += `🎥 CANAL DE YOUTUBE: ${data.youtube}\n`;
        if (data.archivo_pdf) message += `📎 ARCHIVO PDF: ${data.archivo_pdf}\n`;
        if (data.sitio_web) message += `🌐 LINK SITIO WEB: ${data.sitio_web}\n`;
        if (data.canal_whatsapp) message += `📱 CANAL DE NOVEDADES DE WHATSAPP: ${data.canal_whatsapp}\n`;
        if (data.catalogo_whatsapp) message += `📚 CATALOGO DE WHATSAPP: ${data.catalogo_whatsapp}\n`;
        if (data.enlace_whatsapp) message += `💬 ENLACE WHATSAPP: ${data.enlace_whatsapp}\n`;
        if (data.coordenadas) message += `📍 CORDENADAS: ${data.coordenadas}\n`;
        if (data.carpeta_drive) message += `📁 CARPETA DE DRIVE: ${data.carpeta_drive}\n\n`;

        // Materials and Resources
        message += '*Materiales y Recursos:*\n';
        if (data.productos) message += `📦 Productos: ${data.productos}\n`;
        if (data.servicios) message += `🛠️ Servicios: ${data.servicios}\n`;
        if (data.imagen_corporativa) message += `🎨 Imagen corporativa: ${data.imagen_corporativa}\n`;
        if (data.contenido_apoyo) message += `📝 Contenido de apoyo: ${data.contenido_apoyo}\n`;
        if (data.entregables) message += `📋 Entregables: ${data.entregables}\n`;

        return message;
    }

    // Real-time validation
    const inputs = form.querySelectorAll('input, textarea, select');
    inputs.forEach(input => {
        input.addEventListener('input', function() {
            if (this.hasAttribute('required')) {
                if (this.value.trim()) {
                    this.classList.remove('invalid');
                    this.classList.add('valid');
                } else {
                    this.classList.remove('valid');
                    this.classList.add('invalid');
                }
            }
        });
    });

    // Initialize
    initTheme();
    loadFormData();
});