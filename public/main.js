let audio;
let tiempoInterval = null
let segundos = 0;
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
    Swal.fire({
        icon: 'success',
        text: 'Contadores reiniciados',
        timer: 1000,
        showConfirmButton: false
    });
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
    const sonido = card.getAttribute("data-sound");
    const btnReproducir = card.querySelector(".btnReproducir");
    const btnDetener = card.querySelector(".btnDetener")

    actualizarContador(card, sonido);

    if (btnReproducir) {
        btnReproducir.addEventListener("click", async (event) => {
            clearInterval(tiempoInterval);
            segundos = 0;

            console.log("Iniciando contador")
            tiempoInterval = setInterval(() => {
                segundos++;
                console.log(`Tiempo reproducido: ${segundos}s`);
            }, 1000);

            event.stopPropagation();
            btnReproducir.disabled = true;
        
            if (audio) {
                audio.pause();
                audio = null;
            }

            btnReproducir.classList.add("reproduciendo");
            setTimeout(() => {
                btnReproducir.classList.remove("reproduciendo");
            }, 1000);

        audio = new Audio(`sounds/${sonido}.mp3`);

        audio.addEventListener("ended", () => {
            clearInterval(tiempoInterval);
            console.log("Audio finalizado.");
        });

        audio.play().then(() => {
                let contador = JSON.parse(localStorage.getItem("contador_" + sonido)) ?? 0;
                contador++;
                localStorage.setItem("contador_" + sonido, contador);
                actualizarContador(card, sonido);
                Swal.fire({
                    title: `Sonando`,
                    text: `${sonido}.mp3`,
                    icon: `info`,
                    toast: true,
                    position: `top-end`,
                    showConfirmButton: false,
                    timer: 4000,
                    timerProgressBar: true
                });
                console.log(`Reproduciendo: ${sonido}.mp3 - Reproducciones: ${contador}`)
            }).catch((error) => {
                clearInterval(tiempoInterval);
                console.error("Error al reproducir el sonido")
                Swal.fire({
                    icon: `error`,
                    title: `Error al reproducir el sonido`,
                    text: `No se pudo reproducir: ${sonido}.mp3`
                });
            }).finally(() => {
                btnReproducir.disabled = false;
            });
        });
    }
    if (btnDetener) {
        btnDetener.addEventListener("click", () => {
            if(audio) {
                audio.pause();
                audio.currentTime = 0;
                audio = null;
            }

            clearInterval(tiempoInterval);
            console.log("Temporalizador detenido");

            Swal.fire({
                toast: true,
                position: `top-end`,
                icon: `info`,
                title: `Sonido detenido`,
                showConfirmButton: false,
                timer: 2000,
                timerProgressBar: true
            });
            
            if (btnReproducir){
                btnReproducir.disabled = false;
            }
            
            btnDetener.classList.add("deteniendo");
            setTimeout(() => {
                btnDetener.classList.remove("deteniendo");
            }, 500);
        });
    }
});

//Modo Oscuro

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