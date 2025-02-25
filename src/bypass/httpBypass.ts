import axios from 'axios';
import { getRandomProxy, getRandomUserAgent } from '../utils';

export async function httpBypass(targetUrl: string) {
    const proxy = getRandomProxy();
    const userAgent = getRandomUserAgent();

    try {
        const response = await axios.get(targetUrl, {
            proxy: {
                host: proxy.host,
                port: proxy.port
            },
            headers: {
                'User-Agent': userAgent,
                'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
                'Accept-Language': 'en-US,en;q=0.5',
                'Connection': 'keep-alive'
            }
        });

        console.log(`Bypassed HTTP protection for ${targetUrl}`);
        return response.data;
    } catch (error) {
        console.error(`Failed to bypass HTTP protection: ${error.message}`);
        return null;
    }
}
