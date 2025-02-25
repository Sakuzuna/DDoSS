import fs from 'fs';

const socks4Proxies = fs.readFileSync('./data/socks4.txt', 'utf8').split('\n').filter(line => line.trim());

const userAgents = fs.readFileSync('./data/uas.txt', 'utf8').split('\n').filter(line => line.trim());

export function getRandomProxy() {
    const proxy = socks4Proxies[Math.floor(Math.random() * socks4Proxies.length)].split(':');
    return {
        host: proxy[0],
        port: parseInt(proxy[1]),
        type: 4
    };
}

export function getRandomUserAgent() {
    return userAgents[Math.floor(Math.random() * userAgents.length)];
}
