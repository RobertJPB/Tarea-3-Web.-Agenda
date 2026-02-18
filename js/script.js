const URL = "http://www.raydelto.org/agenda.php";

const inputNombre = document.getElementById("nombre");
const inputApellido = document.getElementById("apellido");
const inputTelefono = document.getElementById("telefono");
const btnGuardar = document.getElementById("btnGuardar");
const lista = document.getElementById("listaContactos");

async function cargarContactos() {
    try {
        const response = await fetch(URL);
        const contactos = await response.json();

        lista.innerHTML = "";

        contactos.forEach(contacto => {
            const div = document.createElement("div");
            div.className = "contacto-card";
            div.innerHTML = `
                <h4>${contacto.nombre} ${contacto.apellido}</h4>
                <p>Teléfono: ${contacto.telefono}</p>
            `;
            lista.appendChild(div);
        });

    } catch (error) {
        console.error("Error al cargar contactos:", error);
    }
}

async function guardarContacto() {

    const nombre = inputNombre.value.trim();
    const apellido = inputApellido.value.trim();
    const telefono = inputTelefono.value.trim();

    if (!nombre || !apellido || !telefono) {
        alert("Debe completar todos los campos.");
        return;
    }

    const nuevoContacto = {
        nombre: nombre,
        apellido: apellido,
        telefono: telefono
    };

    try {

        btnGuardar.disabled = true;
        btnGuardar.textContent = "Guardando...";

        const response = await fetch(URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(nuevoContacto)
        });

        let resultado = null;

        try {
            resultado = await response.json();
            console.log("Respuesta del servidor:", resultado);
        } catch {
            console.warn("El servidor no devolvió un JSON válido.");
        }

        inputNombre.value = "";
        inputApellido.value = "";
        inputTelefono.value = "";

        await cargarContactos();

    } catch (error) {
        console.error("Error al guardar contacto:", error);
        alert("Ocurrió un error al guardar el contacto.");
    } finally {
        btnGuardar.disabled = false;
        btnGuardar.textContent = "Guardar";
    }
}

btnGuardar.addEventListener("click", guardarContacto);

cargarContactos();
