export default async function handler(req, res) {
    const targetUrl = req.query.url;

    if (!targetUrl) {
        return res.status(400).json({ status: "error", message: "Falta la URL de destino" });
    }

    const apiToken = "41e5605486c9e414ce65cfadaa46b1444ca99c62";
    const apiUrl = `https://linkpays.in/api?api=${apiToken}&url=${encodeURIComponent(targetUrl)}`;

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        if (data.status === "success" && (data.shortenedUrl || data.shortened_url)) {
            const rawUrl = data.shortenedUrl || data.shortened_url;
            const urlLimpia = rawUrl.replace(/\\\\/g, '');
            return res.status(200).json({ status: "success", shortenedUrl: urlLimpia });
        } else {
            return res.status(500).json({ status: "error", message: "Error de respuesta del acortador" });
        }
    } catch (error) {
        return res.status(500).json({ status: "error", message: "Error interno del servidor" });
    }
}