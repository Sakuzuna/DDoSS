import { Worker } from 'worker_threads';
import { saveAttackLog } from './database';

export function startAttack(targetUrl: string, method: string) {
    const worker = new Worker('./src/worker.ts', {
        workerData: { targetUrl, method }
    });

    worker.on('message', (message) => {
        console.log(message);
        saveAttackLog(targetUrl, method, message); 
    });

    worker.on('error', (error) => {
        console.error(`Worker error: ${error.message}`);
    });

    worker.on('exit', (code) => {
        if (code !== 0) {
            console.error(`Worker stopped with exit code ${code}`);
        }
    });
}
