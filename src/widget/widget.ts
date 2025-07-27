export class Widget {
    private element: HTMLElement;
    private currentSession: Date | null = null;
    private sessionList: HTMLElement;

    constructor() {
        this.element = document.createElement('div');
        this.element.className = 'study-tracker-widget';
        document.body.appendChild(this.element);
        this.sessionList = document.createElement('div');
        this.initializeUI();
    }

    private initializeUI(): void {
        this.element.innerHTML = `
            <div class="widget-container">
                <h2>Study Tracker</h2>
                <div class="current-session">
                    <p>Current Session: <span id="current-session">None</span></p>
                </div>
                <div class="controls">
                    <button id="start-button">Start Session</button>
                    <button id="stop-button" disabled>Stop Session</button>
                </div>
                <div id="session-list"></div>
            </div>
        `;

        const startButton = document.getElementById('start-button') as HTMLButtonElement;
        const stopButton = document.getElementById('stop-button') as HTMLButtonElement;

        if (startButton && stopButton) {
            startButton.addEventListener('click', () => this.startSession());
            stopButton.addEventListener('click', () => this.stopSession());
        }
    }

    startSession(): void {
        this.currentSession = new Date();
        const currentSessionElement = document.getElementById('current-session');
        const startButton = document.getElementById('start-button') as HTMLButtonElement;
        const stopButton = document.getElementById('stop-button') as HTMLButtonElement;

        if (currentSessionElement && startButton && stopButton) {
            currentSessionElement.innerText = this.currentSession.toLocaleTimeString();
            startButton.disabled = true;
            stopButton.disabled = false;
        }
    }

    stopSession(): void {
        const endSession = new Date();
        const sessionDuration = this.currentSession ? 
            (endSession.getTime() - this.currentSession.getTime()) / 1000 : 0;
        
        if (this.currentSession) {
            this.logSession(this.currentSession, endSession, sessionDuration);
        }

        const currentSessionElement = document.getElementById('current-session');
        const startButton = document.getElementById('start-button') as HTMLButtonElement;
        const stopButton = document.getElementById('stop-button') as HTMLButtonElement;

        if (currentSessionElement && startButton && stopButton) {
            currentSessionElement.innerText = 'None';
            startButton.disabled = false;
            stopButton.disabled = true;
        }

        this.currentSession = null;
    }

    private logSession(start: Date, end: Date, duration: number): void {
        const listItem = document.createElement('div');
        listItem.className = 'session-item';
        listItem.innerText = `Session: ${duration.toFixed(0)}s (${start.toLocaleTimeString()} - ${end.toLocaleTimeString()})`;
        const sessionList = document.getElementById('session-list');
        if (sessionList) {
            sessionList.appendChild(listItem);
        }
    }
}