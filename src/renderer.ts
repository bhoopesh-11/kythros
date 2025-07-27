import { Widget } from './widget/widget';
import { Tracker } from './widget/tracker';

// Define session type for better type safety
interface StudySession {
    start: Date;
    end: Date;
}

document.addEventListener('DOMContentLoaded', () => {
    const studyTrackerWidget = new Widget();
    const studyTracker = new Tracker();

    // Handle start button clicks
    const startButton = document.getElementById('start-button');
    startButton?.addEventListener('click', () => {
        studyTracker.startSession();
        updateDisplay();
    });

    // Handle stop button clicks
    const stopButton = document.getElementById('stop-button');
    stopButton?.addEventListener('click', () => {
        studyTracker.stopSession();
        updateDisplay();
    });

    // Update display function
    function updateDisplay() {
        const currentSession = studyTracker.getCurrentSession();
        const sessionsHistory = studyTracker.getSessions();
        
        // Update current session display
        const currentSessionElement = document.getElementById('current-session');
        if (currentSessionElement && currentSession) {
            const duration = Math.floor(
                (new Date().getTime() - currentSession.start.getTime()) / 1000
            );
            currentSessionElement.textContent = `${duration} seconds`;
        }

        // Update sessions list
        const sessionsList = document.getElementById('sessions-list');
        if (sessionsList) {
            sessionsList.innerHTML = '';
            sessionsHistory.forEach(session => {
                const duration = Math.floor(
                    (session.end.getTime() - session.start.getTime()) / 1000
                );
                const sessionElement = document.createElement('div');
                sessionElement.className = 'session-item';
                sessionElement.textContent = `${duration} seconds`;
                sessionsList.appendChild(sessionElement);
            });
        }

        // Update sessions grid
        const sessionsGrid = document.getElementById('sessions-grid');
        if (sessionsGrid) {
            sessionsGrid.innerHTML = '';
            
            // Create 35 boxes (5 weeks worth)
            for (let i = 0; i < 35; i++) {
                const box = document.createElement('div');
                box.className = 'session-box';
                
                // Find if there was a session on this day
                const sessionCount = sessionsHistory.filter(session => {
                    const dayDiff = Math.floor((Date.now() - session.start.getTime()) / (1000 * 60 * 60 * 24));
                    return dayDiff === i;
                }).length;

                // Set intensity based on session count
                if (sessionCount > 0) {
                    const level = Math.min(Math.ceil(sessionCount / 2), 4);
                    box.className += ` level-${level}`;
                } else {
                    box.className += ' level-0';
                }
                
                sessionsGrid.appendChild(box);
            }
        }
    }

    // Update display every second if there's an active session
    setInterval(() => {
        const currentSession = studyTracker.getCurrentSession();
        if (currentSession) {
            updateDisplay();
        }
    }, 1000);
});