# 🎮 Pixel V-Card Game Developer Portfolio

Ein **V-Card-Style Portfolio** für werdende Game Developer im Pixel-Art-Design. Inspiriert von Mistral.ai, mit einer klaren Trennung zwischen Profilinformationen (links) und Inhaltssektionen (rechts). Auf mobilen Geräten wird die linke Seite zuerst angezeigt und füllt 100% der Breite aus.

## 📸 Vorschau

![Portfolio Preview](https://img.shields.io/badge/Status-Online-brightgreen) [Live Demo](#) (Ersetze mit deiner GitHub Pages URL)

## ✨ Features

### 🎨 **Design**
- **V-Card Layout** - Klare Trennung zwischen Profil (links) und Content (rechts)
- **Pixel-Art Character** - Animiertes Profilbild mit braunen Haaren und grau-braunen Augen
- **Pixel-Art Hintergrund** - Nostalgisches 8-Bit/16-Bit Look & Feel
- **Scanlines Overlay** - Retro-Feeling wie alte CRT-Monitore
- **Dark Theme** - Augenfreundliches Design mit Akzentfarben

### 📱 **Responsive Layout**
- **Desktop (>1200px):** Zweispaltiges V-Card-Design
- **Tablet (768px-1200px):** Einspaltig, Profil oben, Content unten
- **Mobile (<768px):** Profil nimmt 100% Breite ein, Content beim Scrollen

### 🎭 **Animationen & Interaktionen**
- **Animierter Pixel-Character** - Augen folgen der Maus, Blinzeln, Mundbewegungen, Kopfneigung
- **Smooth Scroll** - Sanftes Scrollen zu den Sektionen
- **Scroll Animations** - Elemente erscheinen beim Scrollen
- **Hover Effekte** - Interaktive Elemente reagieren auf Mausbewegungen
- **Partikel-Animationen** - Dekorative Partikel im Hintergrund
- **Preloader** - Animierter Ladebildschirm

### 📋 **Inhaltssektionen**
- **Über mich** - Persönliche Beschreibung
- **Beruflicher Werdegang** - Timeline mit Stationen
- **Schulischer Werdegang** - Bildungshintergrund
- **Zertifikate** - Mit Links zu den Zertifikaten
- **Projekte** - Mit Tags, Status und Links (Demo, Code, Docs)

## 🚀 Schnellstart

### 1. Repository klonen

```bash
git clone https://github.com/tishutox/SWISS.git
cd SWISS
```

### 2. Persönliche Daten anpassen

Öffne die Datei `index.html` und passe folgende Platzhalter an:

#### **Profil-Informationen (Links Panel)**
| Element | Suche nach | Ersetze mit |
|---------|------------|-------------|
| **Name** | `MAX MUSTERMANN` | Dein Vor- und Nachname |
| **Titel** | `Game Developer` | Dein Berufstitel |
| **Geburtsdatum** | `01. Januar 2000` | Dein Geburtsdatum |
| **Standort** | `Deutschland` | Dein Standort |
| **E-Mail** | `max@mustermann.dev` | Deine E-Mail-Adresse |

#### **Social Links**
| Plattform | Suche nach | Ersetze mit |
|-----------|------------|-------------|
| GitHub | `https://github.com/tishutox` | Dein GitHub-Profil |
| LinkedIn | `https://linkedin.com/in/max-mustermann` | Dein LinkedIn-Profil |
| E-Mail | `mailto:max@mustermann.dev` | Deine E-Mail (mailto:Link) |

#### **Skills (Tags)**
Ersetze die Tags im `<div class="tags-container">` mit deinen tatsächlichen Fähigkeiten:
```html
<span class="tag">Unity</span>
<span class="tag">C#</span>
<span class="tag">Pixel Art</span>
<!-- Weitere Skills hinzufügen -->
```

#### **Beruflicher Werdegang**
Passe die Timeline-Items im `<div class="timeline">` an:
```html
<div class="timeline-item">
    <div class="timeline-marker"></div>
    <div class="timeline-content">
        <h3 class="timeline-title">Dein Jobtitel</h3>
        <p class="timeline-company">Firmenname</p>
        <p class="timeline-date">Zeitraum</p>
        <p class="timeline-description">Beschreibung...</p>
    </div>
</div>
```

#### **Schulischer Werdegang**
Passe die Education-Items an:
```html
<div class="education-item">
    <div class="education-icon">🏫</div>
    <div class="education-info">
        <h3 class="education-title">Abschluss</h3>
        <p class="education-school">Schule/Universität</p>
        <p class="education-date">Zeitraum</p>
    </div>
</div>
```

#### **Zertifikate**
Passe die Zertifikat-Karten an und füge Links hinzu:
```html
<div class="certificate-card">
    <div class="certificate-icon">📜</div>
    <div class="certificate-info">
        <h3 class="certificate-title">Zertifikatsname</h3>
        <p class="certificate-issuer">Aussteller</p>
        <p class="certificate-date">Datum</p>
    </div>
    <a href="DEIN_LINK_HIER" class="certificate-link" target="_blank">
        <span>🔗 Zertifikat anzeigen</span>
    </a>
</div>
```

#### **Projekte**
Passe die Projekt-Karten an:
```html
<div class="project-card">
    <div class="project-header">
        <h3 class="project-title">Projektname</h3>
        <div class="project-status">Abgeschlossen/In Entwicklung</div>
    </div>
    <p class="project-description">Projektbeschreibung...</p>
    <div class="project-tags">
        <span class="project-tag">Tag1</span>
        <span class="project-tag">Tag2</span>
    </div>
    <div class="project-links">
        <a href="DEMO_LINK" class="project-link" target="_blank">
            <span>🔗 Demo</span>
        </a>
        <a href="CODE_LINK" class="project-link" target="_blank">
            <span>💻 Code</span>
        </a>
    </div>
</div>
```

### 3. Design anpassen (optional)

In der Datei `styles.css` kannst du:

#### **Farben ändern**
```css
:root {
    --accent: #ef233c;        /* Haupt-Akzentfarbe (Rot) */
    --accent-secondary: #4cc9f0; /* Sekundärfarbe (Blau) */
    --accent-tertiary: #f39c12; /* Tertiärfarbe (Orange) */
    
    /* Pixel-Character Farben */
    --skin-light: #f5d5b0;     /* Hellere Haut */
    --skin-medium: #e8c4a0;    /* Mittlere Haut */
    --skin-dark: #d4a574;      /* Dunkle Haut */
    --hair-light: #5c4033;     /* Hellere Haare */
    --hair-dark: #3a2519;      /* Dunkle Haare */
    --eye-iris: #4a3728;      /* Augenfarbe (dunkelbraun) */
    --shirt: #4a6fa5;         /* Hemdfarbe */
}
```

#### **Pixel-Character anpassen**
Der Character besteht aus CSS-Elementen. Du kannst die Formen und Farben anpassen:
```css
/* Kopf */
.pixel-head {
    background: var(--skin-light);
    border-radius: 50% 50% 45% 45% / 60% 60% 40% 40%;
}

/* Haare */
.pixel-hair {
    background: var(--hair-dark);
    border-radius: 50% 50% 0 0 / 100% 100% 0 0;
}

/* Augen */
.pixel-eye {
    background: var(--text-primary); /* Augenweiß */
}
.eye-iris {
    background: var(--eye-iris); /* Iris-Farbe */
}
```

### 4. Lokale Vorschau

Einfach die `index.html` in deinem Browser öffnen oder einen lokalen Server starten:

```bash
# Mit Python
python -m http.server 8000

# Mit Node.js (npx)
npx serve

# Mit PHP
php -S localhost:8000
```

Dann öffne [http://localhost:8000](http://localhost:8000) in deinem Browser.

## 📂 Projektstruktur

```
SWISS/
├── index.html          # Haupt-HTML-Datei (V-Card Layout)
├── styles.css          # Alle Styles und Animationen
├── script.js           # JavaScript für Interaktivität
├── .github/
│   └── workflows/
│       └── deploy.yml  # GitHub Actions für Deployment
├── .gitignore          # Git Ignore Regeln
└── README.md           # Diese Datei
```

## 🔧 Deployment

### GitHub Pages (empfohlen)

1. Stelle sicher, dass du auf dem `main`-Branch bist
2. Gehe zu den Repository-Einstellungen auf GitHub
3. Navigiere zu **"Pages"** (unter "Settings")
4. Wähle als Source: **`gh-pages`** Branch
5. Speichere die Einstellungen

Dein Portfolio wird dann unter `https://[dein-username].github.io/SWISS/` verfügbar sein.

### Alternative: Netlify/Vercel

1. Lade dein Projekt auf GitHub hoch
2. Erstelle ein neues Projekt auf Netlify oder Vercel
3. Verbinde dein GitHub-Repository
4. Wähle den `main`-Branch aus
5. Deploy!

## 🎨 Design-Anpassungen

### Layout anpassen

In `styles.css` findest du die Layout-Variablen:
```css
:root {
    --left-panel-width: 350px;    /* Breite des linken Panels */
    --right-panel-min-width: 500px; /* Minimale Breite des rechten Panels */
    --gap-size: 2rem;             /* Abstand zwischen den Panels */
}
```

### Neue Sektionen hinzufügen

Füge einfach neue `<section>`-Elemente mit der Klasse `vcard-section` im rechten Panel hinzu:
```html
<section class="vcard-section" id="new-section">
    <div class="section-header">
        <h2 class="section-title">
            <span class="section-icon">🎯</span>
            NEUE SEKTION
        </h2>
        <div class="section-divider"></div>
    </div>
    <div class="section-content">
        <p>Inhalt hier...</p>
    </div>
</section>
```

### Navigation hinzufügen

Füge Links zur Navigation im linken Panel oder als separate Navigationsleiste hinzu:
```html
<!-- Im linken Panel -->
<div class="nav-section">
    <h3 class="nav-title">NAVIGATION</h3>
    <div class="nav-links">
        <a href="#about" class="nav-link">Über mich</a>
        <a href="#career" class="nav-link">Karriere</a>
        <a href="#education" class="nav-link">Bildung</a>
        <a href="#certificates" class="nav-link">Zertifikate</a>
        <a href="#projects" class="nav-link">Projekte</a>
    </div>
</div>
```

## 🎮 Easter Eggs & Features

- **👁️ Augen folgen der Maus** - Der Pixel-Character schaut deiner Maus hinterher
- **😊 Blinzeln & Mundbewegungen** - Der Character blinzelt und bewegt den Mund
- **🎯 Kopfneigung** - Der Kopf neigt sich leicht hin und her
- **⌨️ Tastatur-Navigation** - Drücke `ESC` um nach oben zu scrollen
- **📱 Touch-Gesten** - Wische nach oben/unten für schnelles Scrollen
- **💻 Console Easter Egg** - Öffne die Browser-Konsole für eine Überraschung!

## 🛠️ Technologien

- **HTML5** - Struktur
- **CSS3** - Styling, Animationen, Responsive Design
- **JavaScript (Vanilla)** - Interaktivität, Animationen
- **Google Fonts** - Press Start 2P (Pixel-Font) & Roboto Mono
- **GitHub Actions** - Automatisches Deployment

## 📝 Changelog

### v2.0.0 (2024)
- Neues V-Card-Design
- Pixel-Character mit Augenbewegungen
- Responsive Layout für alle Geräte
- Beruflicher Werdegang als Timeline
- Schulischer Werdegang als Grid
- Zertifikate mit Links
- Projekte mit Tags und Status

### v1.0.0 (2024)
- Initiales Release
- Pixel-Art Design
- Responsive Layout
- Animationen und Interaktionen

## 🤝 Mitwirken

Falls du Verbesserungen vorschlagen möchtest:

1. Forke das Repository
2. Erstelle einen neuen Branch (`git checkout -b feature/amazing-feature`)
3. Commite deine Änderungen (`git commit -m 'Add amazing feature'`)
4. Push zum Branch (`git push origin feature/amazing-feature`)
5. Öffne einen Pull Request

## 📄 Lizenz

Dieses Projekt ist unter der MIT-Lizenz lizenziert.

## 📞 Kontakt

- **GitHub**: [@tishutox](https://github.com/tishutox)
- **E-Mail**: [Deine E-Mail hier eintragen]

---

⭐ **Star dieses Repository, wenn es dir gefällt!** ⭐

*Made with ❤️ and Pixel Art*
