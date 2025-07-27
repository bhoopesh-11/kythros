"use strict";
// src/data/storage.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.saveStudySession = saveStudySession;
exports.getStudySessions = getStudySessions;
exports.clearStudySessions = clearStudySessions;
function saveStudySession(sessionData) {
    const sessions = getStudySessions();
    sessions.push(sessionData);
    localStorage.setItem('studySessions', JSON.stringify(sessions));
}
function getStudySessions() {
    const sessions = localStorage.getItem('studySessions');
    return sessions ? JSON.parse(sessions) : [];
}
function clearStudySessions() {
    localStorage.removeItem('studySessions');
}
