// MENU HAMBURGUESA 
    document.addEventListener('DOMContentLoaded', () => {
        const menuham = document.querySelector('.menuham');
        const navlinks = document.querySelector('.navlinks');
  
    menuham.addEventListener('click', () => {
        navlinks.classList.toggle('activo');
        menuham.classList.toggle('open');
        });
    });

// CARGAR ARCHIVO JSON
function cargarArticuloDesdeJSON() {
    fetch('../assets/others/datos.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al cargar el archivo JSON');
            }
            return response.json();
        })
        .then(data => {
            const articleElement = document.getElementById('artjson');

            articleElement.innerHTML = `
                <h4>${data.titulo}</h4>
                <p>${data.descripcion}</p>
            `;
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

document.addEventListener('DOMContentLoaded', cargarArticuloDesdeJSON);

// GALERIA DINAMICA
function cargarGaleria() {
    const galeria = document.querySelector('.galeria');

    if (!galeria) {
        console.error('No se encontró el contenedor .galeria');
        return;
    }

    const imagenes = [
        'image1.jpg',
        'image2.jpg',
        'image3.jpg',
        'image4.jpg',
        'image5.jpg'
    ];
// CREACION DE ELEMENTO Y DARLE ESTILO
    galeria.innerHTML = '';
    imagenes.forEach((img) => {
        const imgElement = document.createElement('img');
        imgElement.src = `../assets/images/${img}`;
        imgElement.alt = `Imagen`;
        imgElement.style.width = "100%";
        imgElement.style.objectFit = "cover";
        galeria.appendChild(imgElement);
    });

    let index = 0;
    const totalImages = imagenes.length;

    function showImage(index) {
        const offset = -index * 100;
        galeria.style.transform = `translateX(${offset}%)`;
    }

    function nextImage() {
        index = (index < totalImages - 1) ? index + 1 : 0;
        showImage(index);
    }

    document.querySelector('.prev').addEventListener('click', () => {
        index = (index > 0) ? index - 1 : totalImages - 1;
        showImage(index);
    });

    document.querySelector('.next').addEventListener('click', () => {
        nextImage();
    });

    // ENSEÑAR PRIMER IMAGEN
    showImage(index);

    // AÑADIMOS INTERVALO DE 3 SEGUNDOS
    setInterval(nextImage, 3000);
}

document.addEventListener('DOMContentLoaded', cargarGaleria);

// PRESUPUESTO
    document.addEventListener('DOMContentLoaded', () => {
        const form = document.getElementById('presupuestoForm');
        const productoSelect = document.getElementById('producto');
        const plazoInput = document.getElementById('plazo');
        const extrasCheckboxes = document.querySelectorAll('input[name="extra"]');
        const presupuestoFinalElement = document.getElementById('presupuestoFinal');

        function validarFormulario(event) {
            event.preventDefault();

    // VALIDACIONES
    //NOMBRE
            const nombre = document.getElementById('nombre').value;
                if (!/^[A-Za-zÁÉÍÓÚáéíóú]+$/.test(nombre) || nombre.length > 15) {
                    alert('Nombre inválido: debe contener solo letras y tener un máximo de 15 caracteres.');
                    return false;
        }

    // APELLIDO
            const apellido = document.getElementById('apellido').value;
            if (!/^[A-Za-zÁÉÍÓÚáéíóú]+$/.test(apellido) || apellido.length > 40) {
                alert('Apellido inválido: debe contener solo letras y tener un máximo de 40 caracteres.');
                return false;
        }

    // TELEFONO
            const telefono = document.getElementById('telefono').value;
            if (!/^\d{9}$/.test(telefono)) {
                alert('Teléfono inválido: debe contener solo 9 dígitos.');
                return false;
        }

    // CONDICIONES
            const condicionesAceptadas = document.getElementById('condiciones').checked;
            if (!condicionesAceptadas) {
                alert('Debes aceptar las condiciones de privacidad.');
                return false;
        }

            alert('Formulario enviado con éxito');
            return true;
        }

// CALCULO DE PRESUPUESTO
// DESCUENTO DEL 10%
        function calcularPresupuesto() {
            let total = parseFloat(productoSelect.value);
            let plazo = parseInt(plazoInput.value) || 0;
            let descuento = plazo > 3 ? 0.9 : 1;
        
// AÑADIR EXTRAS
            extrasCheckboxes.forEach((checkbox) => {
                if (checkbox.checked) {
                    total += parseFloat(checkbox.value);
        }
        });

            total *= descuento;

// ACTUALIZAR PRESUPUESTO FINAL
            presupuestoFinalElement.textContent = total.toFixed(2);
        }

        productoSelect.addEventListener('change', calcularPresupuesto);
        plazoInput.addEventListener('input', calcularPresupuesto);
        extrasCheckboxes.forEach((checkbox) => {
            checkbox.addEventListener('change', calcularPresupuesto);
    });

        form.addEventListener('submit', validarFormulario);
});

// MAPA DINAMICO
function initMap() {
    // COORDENADAS DE NUESTRA LOCACION
    const businessLatLng = [41.3851, 2.1734];

    // CREACION DEL MAPA
    const map = L.map('map').setView(businessLatLng, 14);

    // AÑADIR OPENSTREETMAP
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    // MARCADOR
    L.marker(businessLatLng).addTo(map)
        .bindPopup('<b>Seigro</b><br>Calle Falsa 123, Barcelona.')
        .openPopup();

    // OBTENEMOS LA GEOLOCALIZACION DEL CLIENTE
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const clientLatLng = [position.coords.latitude, position.coords.longitude];

    // MARCADOR
                L.marker(clientLatLng, {icon: L.icon({iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png', iconSize: [25, 41], iconAnchor: [12, 41]})})
                    .addTo(map)
                    .bindPopup('Tu ubicación.')
                    .openPopup();

            },
            () => {
                alert("No se pudo obtener la ubicación del cliente.");
            }
        );
    } else {
        alert("La geolocalización no está soportada por este navegador.");
    }
}

// INICIAR EL MAPA AL CARGAR LA PAGINA
window.onload = initMap;