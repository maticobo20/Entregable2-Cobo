const express = require("express");
const fs = require("fs");
const path = require("path");
const app = express();
const PORT = 3000;

// Servir la carpeta public como archivos públicos
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());

// Ruta API para incrementar contador (via URL param)
app.post("/api/reproducir/:sonido", (req, res) => {
    const sonido = req.params.sonido;

    const filePath = path.join(__dirname, "reproducciones.json");

    // Leer el archivo
    fs.readFile(filePath, "utf8", (err, data) => {
        if (err) return res.status(500).json({ error: "Error al leer archivo" });

        let conteo = {};
        try {
            conteo = JSON.parse(data || "{}");
        } catch (e) {
            conteo = {};
        }

        conteo[sonido] = (conteo[sonido] || 0) + 1;

        fs.writeFile(filePath, JSON.stringify(conteo, null, 2), (err) => {
            if (err) return res.status(500).json({ error: "Error al guardar" });

            res.json({ sonido, contador: conteo[sonido] });
        });
    });
});

// Ruta para obtener contador
app.get("/api/contador/:sonido", (req, res) => {
    const sonido = req.params.sonido;
    const filePath = path.join(__dirname, "reproducciones.json");

    fs.readFile(filePath, "utf8", (err, data) => {
        if (err) return res.json({ contador: 0 });

        let conteo = {};
        try {
            conteo = JSON.parse(data || "{}");
        } catch (e) {
            conteo = {};
        }

        res.json({ contador: conteo[sonido] || 0 });
    });
});

// Ruta para resetear contadores
app.post("/api/reset", (req, res) => {
    const filePath = path.join(__dirname, "reproducciones.json");
    fs.writeFile(filePath, "{}", (err) => {
        if (err) return res.status(500).json({ error: "No se pudo resetear" });
        res.json({ mensaje: "Contadores reseteados" });
    });
});

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en: http://localhost:${PORT}`);
});