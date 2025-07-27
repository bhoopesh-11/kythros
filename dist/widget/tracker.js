"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Tracker = void 0;
class Tracker {
    constructor() {
        this.studySessions = [];
        this.currentSession = null;
    }
    startSession() {
        if (!this.currentSession) {
            this.currentSession = {
                start: new Date(),
                end: new Date() // Initialize with current date, will update on stop
            };
            console.log("Study session started.");
        }
        else {
            console.log("A study session is already in progress.");
        }
    }
    stopSession() {
        if (this.currentSession) {
            this.currentSession.end = new Date();
            this.studySessions.push(this.currentSession);
            console.log("Study session stopped.");
            this.currentSession = null;
        }
        else {
            console.log("No study session is currently in progress.");
        }
    }
    getSessions() {
        return this.studySessions;
    }
    getCurrentSession() {
        return this.currentSession;
    }
}
exports.Tracker = Tracker;
