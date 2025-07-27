import { app, BrowserWindow, screen, ipcMain } from 'electron';
import * as path from 'path';

let mainWindow: BrowserWindow | null = null;

function createWindow() {
    // Get primary display dimensions
    const primaryDisplay = screen.getPrimaryDisplay();
    const { width, height } = primaryDisplay.workAreaSize;
    
    mainWindow = new BrowserWindow({
        width: 380,  // Increased from 300
        height: 580, // Increased from 400
        x: width - 400, // Adjusted position
        y: height - 600, // Adjusted position
        transparent: true,
        frame: false,
        skipTaskbar: true,
        alwaysOnTop: false,
        type: 'desktop',
        hasShadow: false,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            backgroundThrottling: false
        }
    });

    mainWindow.loadFile(path.join(__dirname, '../public/index.html'));
    
    // Make sure the window is visible
    mainWindow.show();
    mainWindow.focus();
    
    // Prevent clicking through the widget
    mainWindow.setIgnoreMouseEvents(false);
    
    // Log window position and size
    console.log('Window bounds:', mainWindow.getBounds());
    
    // Handle window close
    mainWindow.on('closed', () => {
        mainWindow = null;
    });
}

// IPC handlers for window controls
ipcMain.on('window-minimize', () => {
    if (mainWindow) {
        mainWindow.minimize();
    }
});

ipcMain.on('window-close', () => {
    if (mainWindow) {
        mainWindow.close();
    }
});

// Initialize app
app.whenReady().then(() => {
    createWindow();
    
    // Add this to help debug
    console.log('App is ready, window should be created');
});

// Keep app running in background on Windows
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});