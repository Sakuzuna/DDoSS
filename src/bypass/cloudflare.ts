import axios from 'axios';
import { getRandomProxy, getRandomUserAgent } from '../utils';

export async function cloudflareBypass(targetUrl: string) {
    const proxy = getRandomProxy();
    const userAgent = getRandomUserAgent();

    try {
        const challengeResponse = await axios.get(targetUrl, {
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

        const cookies = challengeResponse.headers['set-cookie'];

        const response = await axios.get(targetUrl, {
            proxy: {
                host: proxy.host,
                port: proxy.port
            },
            headers: {
                'User-Agent': userAgent,
                'Cookie': cookies.join('; ')
            }
        });

        console.log(`Bypassed Cloudflare protection for ${targetUrl}`);
        return response.data;
    } catch (error) {
        console.error(`Failed to bypass Cloudflare protection: ${error.message}`);
        return null;
    }
}
