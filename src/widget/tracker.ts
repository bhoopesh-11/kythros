export class Tracker {
    private studySessions: { start: Date; end: Date }[] = [];
    private currentSession: { start: Date; end: Date } | null = null;

    startSession(): void {
        if (!this.currentSession) {
            this.currentSession = { 
                start: new Date(),
                end: new Date() // Initialize with current date, will update on stop
            };
            console.log("Study session started.");
        } else {
            console.log("A study session is already in progress.");
        }
    }

    stopSession(): void {
        if (this.currentSession) {
            this.currentSession.end = new Date();
            this.studySessions.push(this.currentSession);
            console.log("Study session stopped.");
            this.currentSession = null;
        } else {
            console.log("No study session is currently in progress.");
        }
    }

    getSessions(): { start: Date; end: Date }[] {
        return this.studySessions;
    }

    getCurrentSession(): { start: Date; end: Date } | null {
        return this.currentSession;
    }
}