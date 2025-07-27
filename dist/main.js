"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
const path = __importStar(require("path"));
let mainWindow = null;
function createWindow() {
    // Get primary display dimensions
    const primaryDisplay = electron_1.screen.getPrimaryDisplay();
    const { width, height } = primaryDisplay.workAreaSize;
    mainWindow = new electron_1.BrowserWindow({
        width: 380, // Increased from 300
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
electron_1.ipcMain.on('window-minimize', () => {
    if (mainWindow) {
        mainWindow.minimize();
    }
});
electron_1.ipcMain.on('window-close', () => {
    if (mainWindow) {
        mainWindow.close();
    }
});
// Initialize app
electron_1.app.whenReady().then(() => {
    createWindow();
    // Add this to help debug
    console.log('App is ready, window should be created');
});
// Keep app running in background on Windows
electron_1.app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        electron_1.app.quit();
    }
});
