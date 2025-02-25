import axios from 'axios';
import { getRandomProxy, getRandomUserAgent } from '../utils';

export async function firewallBypass(targetUrl: string) {
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
                'X-Forwarded-For': proxy.host, 
                'Referer': 'https://google.com' 
            }
        });

        console.log(`Bypassed Firewall protection for ${targetUrl}`);
        return response.data;
    } catch (error) {
        console.error(`Failed to bypass Firewall protection: ${error.message}`);
        return null;
    }
}
