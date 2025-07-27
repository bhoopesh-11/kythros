"use strict";
// src/utils/datetime.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatTimestamp = formatTimestamp;
exports.calculateDuration = calculateDuration;
exports.getCurrentTimestamp = getCurrentTimestamp;
function formatTimestamp(timestamp) {
    const date = new Date(timestamp);
    return date.toLocaleString();
}
function calculateDuration(start, end) {
    const duration = end - start;
    const hours = Math.floor(duration / 3600000);
    const minutes = Math.floor((duration % 3600000) / 60000);
    return `${hours}h ${minutes}m`;
}
function getCurrentTimestamp() {
    return Date.now();
}
