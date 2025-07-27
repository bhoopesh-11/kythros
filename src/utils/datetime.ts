// src/utils/datetime.ts

export function formatTimestamp(timestamp: number): string {
    const date = new Date(timestamp);
    return date.toLocaleString();
}

export function calculateDuration(start: number, end: number): string {
    const duration = end - start;
    const hours = Math.floor(duration / 3600000);
    const minutes = Math.floor((duration % 3600000) / 60000);
    return `${hours}h ${minutes}m`;
}

export function getCurrentTimestamp(): number {
    return Date.now();
}