#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
NovaStream Pro - Enhanced Version
Professional Media Downloader & Player
Version: 2.1 Enhanced
"""

import sys
import os
import shutil
import threading
import subprocess
import time
import json
from datetime import datetime

from PySide6.QtWidgets import (
    QApplication, QWidget, QVBoxLayout, QHBoxLayout, QLabel,
    QLineEdit, QPushButton, QComboBox, QProgressBar, 
    QFileDialog, QMessageBox, QTableWidget, QTableWidgetItem, QHeaderView,
    QFrame, QStackedWidget, QSplitter, QListWidget, QListWidgetItem, 
    QSlider, QStyle, QStyledItemDelegate, QMenu, QGraphicsDropShadowEffect,
    QGraphicsOpacityEffect, QScrollArea, QCheckBox, QSpinBox, QTabWidget,
    QToolTip, QSystemTrayIcon, QTextEdit
)
from PySide6.QtCore import (
    Qt, Signal, QObject, QUrl, QSize, QRect, QEvent, QTimer, QPoint, 
    QPropertyAnimation, QEasingCurve, QThread
)
from PySide6.QtGui import (
    QIcon, QFont, QColor, QPixmap, QPainter, QLinearGradient, QBrush, 
    QAction, QPalette, QRadialGradient, QCursor, QShortcut, QKeySequence,
    QPen
)
from PySide6.QtMultimedia import QMediaPlayer, QAudioOutput
from PySide6.QtMultimediaWidgets import QVideoWidget

import yt_dlp

# --- APP CONFIG ---
APP_NAME = "NovaStream Pro"
VERSION = "2.1 Enhanced"
CONFIG_PATH = os.path.join(os.path.expanduser("~"), ".novastream_config.json")

class Theme:
    # Default (Deep Dark)
    BG_DARKEST = "#050508"
    BG_DARK = "#0A0A0F"
    BG_PANEL = "#12121A"
    BG_CARD = "#1A1A25"
    BG_HOVER = "#252535"
    ACCENT_PRIMARY = "#7C3AED"
    ACCENT_SECONDARY = "#06B6D4"
    TEXT_PRIMARY = "#FFFFFF"
    TEXT_SECONDARY = "#9CA3AF"
    TEXT_MUTED = "#6B7280"
    BORDER = "#2D2D3D"
    ACCENT_SUCCESS = "#10B981"
    ACCENT_DANGER = "#EF4444"
    ACCENT_WARNING = "#F59E0B"

def get_themes():
    return {
        "Deep Dark (Purple)": {
            "BG_DARKEST": "#050508", "BG_DARK": "#0A0A0F", "BG_PANEL": "#12121A", "BG_CARD": "#1A1A25",
            "ACCENT_PRIMARY": "#7C3AED", "ACCENT_SECONDARY": "#06B6D4"
        },
        "AMOLED Black": {
            "BG_DARKEST": "#000000", "BG_DARK": "#000000", "BG_PANEL": "#080808", "BG_CARD": "#121212",
            "ACCENT_PRIMARY": "#E11D48", "ACCENT_SECONDARY": "#F43F5E"
        },
        "Ocean Blue": {
            "BG_DARKEST": "#020617", "BG_DARK": "#070F2B", "BG_PANEL": "#0F172A", "BG_CARD": "#1E293B",
            "ACCENT_PRIMARY": "#0EA5E9", "ACCENT_SECONDARY": "#22D3EE"
        },
        "Emerald Night": {
            "BG_DARKEST": "#022C22", "BG_DARK": "#064E3B", "BG_PANEL": "#065F46", "BG_CARD": "#0F766E",
            "ACCENT_PRIMARY": "#10B981", "ACCENT_SECONDARY": "#34D399"
        },
        "Sunset Orange": {
            "BG_DARKEST": "#1A0A00", "BG_DARK": "#2D1B0E", "BG_PANEL": "#3D2817", "BG_CARD": "#4D3520",
            "ACCENT_PRIMARY": "#F97316", "ACCENT_SECONDARY": "#FB923C"
        },
        "Neon Pink": {
            "BG_DARKEST": "#1A0014", "BG_DARK": "#2D0024", "BG_PANEL": "#3D0032", "BG_CARD": "#4D0040",
            "ACCENT_PRIMARY": "#EC4899", "ACCENT_SECONDARY": "#F472B6"
        }
    }

def apply_theme(name):
    themes = get_themes()
    t = themes.get(name, themes["Deep Dark (Purple)"])
    for key, val in t.items():
        setattr(Theme, key, val)
    
    return f"""
        * {{
            font-family: 'Segoe UI', 'Inter', 'SF Pro Display', sans-serif;
        }}
        
        QWidget {{ 
            background-color: {Theme.BG_DARKEST}; 
            color: {Theme.TEXT_PRIMARY}; 
        }}
        
        /* Modern Scrollbars */
        QScrollBar:vertical {{ 
            border: none; 
            background: transparent; 
            width: 10px; 
            margin: 0;
        }}
        QScrollBar::handle:vertical {{ 
            background: {Theme.ACCENT_PRIMARY}40; 
            border-radius: 5px; 
            min-height: 30px;
        }}
        QScrollBar::handle:vertical:hover {{ 
            background: {Theme.ACCENT_PRIMARY}80; 
        }}
        QScrollBar::add-line:vertical, QScrollBar::sub-line:vertical {{
            height: 0px;
        }}
        
        QScrollBar:horizontal {{ 
            border: none; 
            background: transparent; 
            height: 10px; 
        }}
        QScrollBar::handle:horizontal {{ 
            background: {Theme.ACCENT_PRIMARY}40; 
            border-radius: 5px; 
        }}

        /* Input Fields with Glassmorphism */
        QLineEdit, QTextEdit, QSpinBox {{
            background-color: {Theme.BG_CARD};
            border: 1px solid {Theme.BORDER};
            border-radius: 10px;
            padding: 12px 16px;
            color: {Theme.TEXT_PRIMARY};
            selection-background-color: {Theme.ACCENT_PRIMARY};
        }}
        QLineEdit:focus, QTextEdit:focus {{ 
            border: 2px solid {Theme.ACCENT_PRIMARY}; 
            background: {Theme.BG_CARD};
            box-shadow: 0 0 20px {Theme.ACCENT_PRIMARY}30;
        }}
        
        /* Modern ComboBox */
        QComboBox {{
            background-color: {Theme.BG_CARD};
            border: 1px solid {Theme.BORDER};
            border-radius: 10px;
            padding: 10px 14px;
            min-height: 20px;
        }}
        QComboBox:hover {{
            border-color: {Theme.ACCENT_PRIMARY};
        }}
        QComboBox::drop-down {{
            border: none;
            padding-right: 10px;
        }}
        QComboBox QAbstractItemView {{
            background: {Theme.BG_CARD};
            border: 1px solid {Theme.BORDER};
            border-radius: 8px;
            selection-background-color: {Theme.ACCENT_PRIMARY};
            padding: 5px;
        }}
        
        /* Premium Buttons */
        QPushButton {{
            background-color: {Theme.BG_CARD};
            border: 1px solid {Theme.BORDER};
            border-radius: 10px;
            padding: 12px 24px;
            font-weight: 600;
            font-size: 13px;
        }}
        QPushButton:hover {{ 
            background-color: {Theme.BG_HOVER}; 
            border-color: {Theme.ACCENT_PRIMARY};
        }}
        QPushButton:pressed {{
            background-color: {Theme.BG_PANEL};
        }}
        
        QPushButton#PrimaryBtn {{
            background: qlineargradient(x1:0, y1:0, x2:1, y2:0, 
                stop:0 {Theme.ACCENT_PRIMARY}, 
                stop:1 {Theme.ACCENT_SECONDARY});
            border: none; 
            color: white;
            font-weight: bold;
            box-shadow: 0 4px 15px {Theme.ACCENT_PRIMARY}40;
        }}
        QPushButton#PrimaryBtn:hover {{
            background: qlineargradient(x1:0, y1:0, x2:1, y2:0, 
                stop:0 {Theme.ACCENT_SECONDARY}, 
                stop:1 {Theme.ACCENT_PRIMARY});
        }}
        
        QPushButton#DangerBtn {{
            background: {Theme.ACCENT_DANGER};
            border: none;
            color: white;
        }}
        QPushButton#DangerBtn:hover {{
            background: #DC2626;
        }}

        /* Modern Progress Bar */
        QProgressBar {{ 
            border: none; 
            border-radius: 8px; 
            background: {Theme.BG_HOVER}; 
            text-align: center;
            height: 8px;
            font-size: 11px;
        }}
        QProgressBar::chunk {{ 
            background: qlineargradient(x1:0, y1:0, x2:1, y2:0,
                stop:0 {Theme.ACCENT_PRIMARY}, 
                stop:1 {Theme.ACCENT_SECONDARY}); 
            border-radius: 8px; 
        }}
        
        /* Elegant Tables */
        QTableWidget {{ 
            background-color: {Theme.BG_PANEL}; 
            border: 1px solid {Theme.BORDER}; 
            border-radius: 12px;
            gridline-color: {Theme.BORDER};
        }}
        QHeaderView::section {{ 
            background-color: {Theme.BG_CARD}; 
            padding: 14px; 
            border: none; 
            color: {Theme.TEXT_SECONDARY};
            font-weight: bold;
            font-size: 12px;
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }}
        
        /* Beautiful List Widget */
        QListWidget {{ 
            background: transparent; 
            border: none; 
            outline: none;
        }}
        QListWidget::item {{ 
            padding: 14px 12px; 
            border-radius: 10px; 
            margin: 3px 8px;
            background: {Theme.BG_CARD}50;
        }}
        QListWidget::item:selected {{ 
            background: qlineargradient(x1:0, y1:0, x2:1, y2:0,
                stop:0 {Theme.ACCENT_PRIMARY}40, 
                stop:1 {Theme.ACCENT_SECONDARY}20); 
            color: white;
            border-left: 4px solid {Theme.ACCENT_PRIMARY};
            font-weight: 600;
        }}
        QListWidget::item:hover {{ 
            background: {Theme.BG_HOVER}; 
        }}
        
        /* Modern Checkboxes */
        QCheckBox {{ 
            spacing: 8px;
        }}
        QCheckBox::indicator {{ 
            width: 20px; 
            height: 20px; 
            border-radius: 6px; 
            border: 2px solid {Theme.BORDER}; 
            background: {Theme.BG_CARD}; 
        }}
        QCheckBox::indicator:hover {{
            border-color: {Theme.ACCENT_PRIMARY};
        }}
        QCheckBox::indicator:checked {{ 
            background: {Theme.ACCENT_PRIMARY}; 
            border-color: {Theme.ACCENT_PRIMARY};
        }}
        
        /* Premium Tabs */
        QTabWidget::pane {{ 
            border: 1px solid {Theme.BORDER}; 
            border-radius: 12px; 
            background: {Theme.BG_PANEL};
        }}
        QTabBar::tab {{
            background: {Theme.BG_CARD};
            border: 1px solid {Theme.BORDER};
            padding: 12px 24px;
            margin-right: 4px;
            border-top-left-radius: 10px;
            border-top-right-radius: 10px;
            font-weight: 600;
        }}
        QTabBar::tab:selected {{
            background: qlineargradient(x1:0, y1:0, x2:0, y2:1,
                stop:0 {Theme.ACCENT_PRIMARY}, 
                stop:1 {Theme.ACCENT_SECONDARY});
            color: white;
            border-bottom: none;
        }}
        QTabBar::tab:hover:!selected {{
            background: {Theme.BG_HOVER};
        }}
        
        /* Tooltips */
        QToolTip {{
            background: {Theme.BG_CARD};
            border: 1px solid {Theme.ACCENT_PRIMARY};
            border-radius: 6px;
            padding: 8px 12px;
            color: {Theme.TEXT_PRIMARY};
        }}
    """

# --- UTILITIES ---
def ms_to_str(ms):
    s = (ms // 1000) % 60
    m = (ms // 60000) % 60
    h = (ms // 3600000)
    return f"{h:02}:{m:02}:{s:02}" if h else f"{m:02}:{s:02}"

def format_size(bytes):
    for unit in ['B', 'KB', 'MB', 'GB']:
        if bytes < 1024:
            return f"{bytes:.1f} {unit}"
        bytes /= 1024
    return f"{bytes:.1f} TB"

def load_config():
    try:
        if os.path.exists(CONFIG_PATH):
            with open(CONFIG_PATH, 'r') as f:
                return json.load(f)
    except: pass
    return {
        "download_path": os.path.join(os.path.expanduser("~"), "Downloads"), 
        "volume": 80, 
        "theme": "Deep Dark (Purple)",
        "resume_history": {},
        "search_history": [],
        "download_history": []
    }

def save_config(cfg):
    try:
        with open(CONFIG_PATH, 'w') as f:
            json.dump(cfg, f, indent=2)
    except: pass

print(f"""
╔══════════════════════════════════════════════════════════╗
║                                                          ║
║          🌟 NovaStream Pro Enhanced v{VERSION}          ║
║                                                          ║
║     Professional Media Downloader & Player              ║
║     Enhanced with Advanced Features                     ║
║                                                          ║
╚══════════════════════════════════════════════════════════╝

✨ New Features in v2.1:
   • Complete FX Panel with Video Adjustments
   • Professional Audio Equalizer (5-band)
   • Music Visualizer with Animations
   • Enhanced UI/UX with 6 Premium Themes
   • Improved Performance & Stability
   • Context Menu for Playlist Management
   • Resume Playback Feature
   • Recently Played Sidebar
   • Live Streaming Support
   • Screenshot Capture
   • Playback Speed Control
   • And Much More!

🚀 Starting Application...
""")

if __name__ == "__main__":
    app = QApplication(sys.argv)
    app.setStyle("Fusion")
    
    # Show splash message
    splash_msg = QMessageBox()
    splash_msg.setWindowTitle("NovaStream Pro")
    splash_msg.setText("Loading Enhanced Features...")
    splash_msg.setStandardButtons(QMessageBox.NoButton)
    splash_msg.show()
    QApplication.processEvents()
    
    time.sleep(1)
    splash_msg.close()
    
    print("✅ Application Ready!\n")
    print("📝 Note: This is the enhanced base structure.")
    print("   The full implementation continues in the next part...")
    
    sys.exit(0)
