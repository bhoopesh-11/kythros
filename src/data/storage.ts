// src/data/storage.ts

export function saveStudySession(sessionData: any): void {
    const sessions = getStudySessions();
    sessions.push(sessionData);
    localStorage.setItem('studySessions', JSON.stringify(sessions));
}

export function getStudySessions(): any[] {
    const sessions = localStorage.getItem('studySessions');
    return sessions ? JSON.parse(sessions) : [];
}

export function clearStudySessions(): void {
    localStorage.removeItem('studySessions');
}