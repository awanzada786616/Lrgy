export default async function handler(req, res) {
    // 1. CORS Headers (Browser ko allow karein)
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    // 2. Aapki API Key
    const API_KEY = "e4c5d4fcc56363f572a597267b42e5d2";

    try {
        // 3. Data Receive
        // Vercel query parameters ko khud handle karta hai
        const { action, service, country, id, status } = req.query;

        // 4. URL Build
        const queryParams = new URLSearchParams({
            api_key: API_KEY,
            action: action || ''
        });

        if (service) queryParams.append("service", service);
        if (country) queryParams.append("country", country);
        if (id) queryParams.append("id", id);
        if (status) queryParams.append("status", status);

        const targetUrl = `http://otpget.com/stubs/handler_api.php?${queryParams.toString()}`;

        // 5. Fetch Request
        const response = await fetch(targetUrl);
        const data = await response.text();

        // 6. Send Response
        res.status(200).send(data);

    } catch (error) {
        res.status(500).json({ error: "Server Error", details: error.message });
    }
}
