# Formulario de Clientes - Botonera Digital

Formulario profesional para la recolección de información de clientes de Botonera Digital.

## 🚀 Características

- ✨ Diseño moderno y responsivo
- 🌓 Modo claro/oscuro
- 📱 Optimizado para móviles
- 📤 Envío directo a WhatsApp
- 💾 Persistencia de datos
- 🖼️ Previsualización de imágenes
- 🔒 Validación de formularios
- 🎨 Personalización de estilos

## 🛠️ Tecnologías

- HTML5
- CSS3 (Variables CSS, Flexbox, Grid)
- JavaScript (ES6+)
- LocalStorage API
- FileReader API

## 📦 Instalación

1. Clona el repositorio:
```bash
git clone https://github.com/generadordebotoneras/FORMULARIO-CLIENTES-NUEVOS.git
```

2. Abre `index.html` en tu navegador o usa un servidor local.

## ⚙️ Configuración

1. Abre `script.js`
2. Reemplaza `YOUR_PHONE_NUMBER` con tu número de WhatsApp (incluyendo código de país)
3. Personaliza los estilos en `styles.css` si lo deseas

## 🎨 Personalización

### Colores
Los colores principales se pueden modificar en `styles.css`:

```css
:root {
    --primary-color: #4a90e2;
    --secondary-color: #2c3e50;
    --accent-color: #e74c3c;
    /* ... otros colores ... */
}
```

### Tipos de Negocio
Puedes modificar las opciones del selector de tipo de negocio en `index.html`:

```html
<select id="tipo_negocio" name="tipo_negocio" required>
    <option value="">Seleccione el tipo de negocio</option>
    <option value="floristeria">Floristería</option>
    <!-- ... otras opciones ... -->
</select>
```

## 📱 Uso

1. El cliente completa el formulario
2. Los datos se validan automáticamente
3. Al enviar, se genera un mensaje formateado
4. Se redirige a WhatsApp con el mensaje preformateado

## 🔒 Seguridad

- Validación de formularios en el cliente
- Headers de seguridad configurados en Netlify
- No se almacenan datos sensibles
- HTTPS forzado

## 🌐 Despliegue

El sitio está configurado para desplegarse automáticamente en Netlify cuando se hace push a la rama main.

## 📄 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para más detalles.

## 👥 Contribución

1. Fork el proyecto
2. Crea tu rama de características (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📞 Soporte

Para soporte, envía un email a [tu-email@dominio.com] o abre un issue en GitHub. 