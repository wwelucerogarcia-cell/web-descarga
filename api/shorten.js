export default async function handler(req, res) {
    const targetUrl = req.query.url;

    if (!targetUrl) {
        return res.status(400).json({ status: "error", message: "Falta la URL de destino" });
    }

    const apiToken = "6501b727c9a7688ea517f5509bf399fbf78d32d5";
    const apiUrl = `https://shortxlinks.com/api?api=${apiToken}&url=${encodeURIComponent(targetUrl)}`;

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        if (data.status === "success" && data.shortenedUrl) {
            // Limpiamos barras de escape si el acortador las devuelve
            const urlLimpia = data.shortenedUrl.replace(/\\\\/g, '');
            return res.status(200).json({ status: "success", shortenedUrl: urlLimpia });
        } else {
            return res.status(500).json({ status: "error", message: "Error de respuesta del acortador" });
        }
    } catch (error) {
        return res.status(500).json({ status: "error", message: "Error interno del servidor" });
    }
}