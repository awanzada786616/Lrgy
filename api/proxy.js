export default async function handler(req, res) {
    // 1. CORS Headers (Browser Access)
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    // 2. ✅ NEW CORRECT API KEY
    const API_KEY = "do8gqs2k2w81go6tyt0468bif2ruog8h"; 

    try {
        // 3. Query Parameters
        const queryParams = new URLSearchParams(req.query);
        
        // Remove old key if passed from frontend, and use the secure one
        queryParams.delete("api_key");
        queryParams.append("api_key", API_KEY);

        // 4. OTPGET URL
        const targetUrl = `http://otpget.com/stubs/handler_api.php?${queryParams.toString()}`;

        // 5. Fetch
        const response = await fetch(targetUrl);
        const data = await response.text();

        // 6. Response
        res.status(200).send(data);

    } catch (error) {
        res.status(500).json({ error: "Server Error", details: error.message });
    }
}
