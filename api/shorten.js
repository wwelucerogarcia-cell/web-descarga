export default async function handler(req, res) {
    const targetUrl = req.query.url;

    if (!targetUrl) {
        return res.status(400).json({ status: "error", message: "Falta la URL de destino" });
    }

    const apiToken = "39e6ae1438012937951f714ae9a2944e";
    const apiUrl = `https://earnads.net/api?api=${apiToken}&url=${encodeURIComponent(targetUrl)}`;

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        // Verificamos el formato que devuelve EarnAds (suele usar status "success" o "error")
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