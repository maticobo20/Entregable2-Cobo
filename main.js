let audio;
const btnModoOscuro = document.getElementById("modoOscuroBtn");
const buscador = document.getElementById("buscador");
const reset = document.getElementById("resetContadores");
const cards = document.querySelectorAll(".card");

//Buscador por texto

buscador.addEventListener("input", (evt) => {
    const valor = evt.target.value.toLowerCase();
    cards.forEach(card => {
        const texto = card.textContent.toLowerCase();
        card.style.display = texto.includes(valor) ? "block" : "none";
    });
});

//Reset de contadores (localStorage)

reset.addEventListener("click", () => {
    cards.forEach(card => {
        const sonido = card.getAttribute("data-sound");
        localStorage.removeItem("contador_" + sonido);
        const contador0 = card.querySelector(".contador");
        if (contador0) contador0.textContent = "Reproducciones: 0";
    });
    console.log("Contadores Reiniciados");
});

//Mostrar contadores guardados

function actualizarContador(card, sonido) {
    const contador = JSON.parse(localStorage.getItem("contador_" + sonido)) || 0;
    card.querySelector(".contador").textContent = `Reproducciones: ${contador}`;
}

cards.forEach(card => {
    const sonido = card.getAttribute("data-sound");
    actualizarContador(card, sonido);
});

//Reproducir mp3

cards.forEach(card => {
    card.addEventListener("click", () => {
        const sonido = card.getAttribute("data-sound");

        if (audio) {
            audio.pause();
            audio.currentTime = 0;
        }
        audio = new Audio(`sounds/${sonido}.mp3`);
        audio.play();

        let contador = JSON.parse(localStorage.getItem("contador_" + sonido)) || 0;
        contador++;
        localStorage.setItem("contador_" + sonido, contador);

        actualizarContador(card, sonido);
        console.log(`Reproduciendo: ${sonido}.mp3 - Veces: ${contador}`);
    })
})

//Modo Oscuro

btnModoOscuro.addEventListener("click", () => {
    document.body.classList.toggle("modo-oscuro");
    const modo = document.body.classList.contains("modo-oscuro") ? "oscuro" : "claro";
    localStorage.setItem("modo", modo);
});

window.addEventListener("DOMContentLoaded", () => {
    if (localStorage.getItem("modo") === "oscuro") {
        document.body.classList.add("modo-oscuro");
    }
});