const btnModoOscuro = document.getElementById("modoOscuroBtn");
const buscador = document.getElementById("buscador");
const reset = document.getElementById("resetContadores");
const cards = document.querySelectorAll(".card");
const contenedorTarjetas = document.getElementById("soundboard")

const frases = [
    {
        texto: "¿Qué estás haciendo en mi pantano?",
        personaje: "Shrek",
        sonido: "shrek1",
        imagen: "shrek1.jpg"
    },
    {
        texto: "Los ogros son como las cebollas",
        personaje: "Shrek",
        sonido: "shrek2",
        imagen: "shrek2.jpg"
    },
    {
        texto: "No tengo amigos",
        personaje: "Shrek",
        sonido: "shrek3",
        imagen: "shrek3.jpg"
    },
    {
        texto: "¡Oye Shrek!",
        personaje: "Burro",
        sonido: "burro1",
        imagen: "burro1.jpg"
    },
    {
        texto: "¿Puedo quedarme contigo?",
        personaje: "Burro",
        sonido: "burro2",
        imagen: "burro2.jpg"
    },
    {
        texto: "A trotar y a trotar",
        personaje: "Burro",
        sonido: "burro3",
        imagen: "burro3.jpg"
    },
    {
        texto: "Me ofendiste Shrek",
        personaje: "Burro",
        sonido: "burro4",
        imagen: "burro4.jpg"
    },
    {
        texto: "Eso hacen los amigos",
        personaje: "Burro",
        sonido: "burro5",
        imagen: "burro5.jpg"
    },
    {
        texto: "Botones de gomitas",
        personaje: "Jengibre",
        sonido: "jengibre1",
        imagen: "jengibre1.jpg"
    },
    {
        texto: "Trompetas",
        personaje: "Trompetas",
        sonido: "trompetas1",
        imagen: "trompetas1.jpg"
    }
];

// Crear tarjetas y reproducir audios
let audio;

function crearTarjetas() {
    contenedorTarjetas.innerHTML = "";
    frases.forEach(frase => {
        const card = document.createElement("div");
        card.classList.add("card");
        card.setAttribute("data-sound", frase.sonido);

        card.innerHTML = `
        <img src="img/${frase.imagen}" alt="${frase.personaje}">
        <h3>${frase.personaje}</h3>
        <p>${frase.texto}</p>
        <button class="btnReproducir">Reproducir</button>
        <button class="btnDetener">Detener</button>
        <p class="contador">Reproducciones: 0</p>
        `;

        contenedorTarjetas.appendChild(card);

        const btnReproducir = card.querySelector(".btnReproducir");
        const btnDetener = card.querySelector(".btnDetener");
        const contador = card.querySelector(".contador")

        let count = 0;

        btnReproducir.addEventListener("click", () => {
            if (audio) {
                audio.pause();
                audio = null;
            }

            audio = new Audio(`sounds/${frase.sonido}.mp3`);
            audio.play().catch(err => {
                console.error("Error al reproducir:", err);
                alert("No se pudo reproducir el audio.");
            });

            count++;
            contador.textContent = `Reproducciones: ${count}`;
        });

        btnDetener.addEventListener("click", () => {
            if (audio) {
                audio.pause();
                audio.currentTime = 0;
            }
        });
    });
}

crearTarjetas();

function obtenerTarjetas() {
    return document.querySelectorAll(".card");
}

// Buscador por texto
buscador.addEventListener("input", (evt) => {
    const valor = evt.target.value.toLowerCase();
    const cards = obtenerTarjetas();
    cards.forEach(card => {
        const texto = card.textContent.toLowerCase();
        card.style.display = texto.includes(valor) ? "block" : "none";
    });
});

// Reset de contadores
reset.addEventListener("click", async () => {
    try {
        const res = await fetch("/api/reset", { method: "POST" });
        if (!res.ok) throw new Error("Error al resetear contadores");
        const data = await res.json();

        const cards = obtenerTarjetas();
        cards.forEach(card => {
            card.querySelector(".contador").textContent = `Reproducciones: 0`;
        });

        Swal.fire({
            icon: 'success',
            text: 'Contadores reiniciados',
            timer: 1000,
            showConfirmButton: false
        });
    } catch (error) {
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'No se pudo resetear contadores en el servidor'
        });
    }
});

// Mostrar contadores
async function actualizarContador(card, sonido) {
    try {
        const res = await fetch(`/api/contador/${sonido}`);
        const data = await res.json();
        card.querySelector(".contador").textContent = `Reproducciones: ${data.contador}`;
    } catch (err) {
        console.warn("No se pudo obtener contador para", sonido);
    }
}

cards.forEach(card => {
    const sonido = card.getAttribute("data-sound");
    actualizarContador(card, sonido);
});

// Modo Oscuro
btnModoOscuro.addEventListener("click", () => {
    const modoOscuro = !document.body.classList.contains("modo-oscuro");

    document.body.classList.toggle("modo-oscuro");
    const modo = modoOscuro ? "oscuro" : "claro";
    localStorage.setItem("modo", modo);

    Swal.fire({
        title: modo === "oscuro" ? "Modo oscuro activado" : "Modo claro activado",
        toast: true,
        position: "bottom-end",
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
        icon: "info"
    });
});

window.addEventListener("DOMContentLoaded", () => {
    if (localStorage.getItem("modo") === "oscuro") {
        document.body.classList.add("modo-oscuro");
    }
});