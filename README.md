# 🎮 Pixel Game Developer Portfolio

Ein schlichtes, aber ansprechendes Portfolio für werdende Game Developer im Pixel-Art-Stil. Dieses Portfolio zeigt deine Fähigkeiten, Projekte und Persönlichkeit auf eine kreative und nostalgische Weise.

## 📸 Vorschau

![Portfolio Preview](https://img.shields.io/badge/Status-Online-brightgreen) [Live Demo](#) (Ersetze mit deiner GitHub Pages URL)

## ✨ Features

- **Pixel-Art Design** - Nostalgisches 8-Bit/16-Bit Look & Feel
- **Responsive Layout** - Optimiert für alle Geräte (Desktop, Tablet, Mobile)
- **Animierte Elemente** - Smooth Scroll, Hover-Effekte, Partikel-Animationen
- **Interaktive Navigation** - Einfache Bedienung mit Tastatur und Touch
- **Skill-Darstellung** - Übersichtliche Anzeige deiner Fähigkeiten
- **Kontaktsektion** - Links zu GitHub, LinkedIn und E-Mail
- **Preloader** - Animierter Ladebildschirm
- **Dark Theme** - Augenfreundliches Design

## 🚀 Schnellstart

### 1. Repository klonen

```bash
git clone https://github.com/tishutox/SWISS.git
cd SWISS
```

### 2. Persönliche Daten anpassen

Öffne die Datei `index.html` und passe folgende Platzhalter an:

- **Name**: Suche nach `MAX MUSTERMANN` und ersetze mit deinem Namen
- **Geburtsdatum**: Suche nach `01. Januar 2000` 
- **GitHub Link**: Suche nach `https://github.com/tishutox` und ersetze mit deinem GitHub-Profil
- **LinkedIn Link**: Suche nach `https://linkedin.com/in/max-mustermann` und ersetze mit deinem LinkedIn-Profil
- **E-Mail**: Suche nach `max.mustermann@example.com` und ersetze mit deiner E-Mail
- **Beschreibung**: Passe den Text in den `<p>`-Tags im About-Bereich an
- **Skills**: Aktualisiere die Skill-Items im Skills-Bereich

### 3. Design anpassen (optional)

In der Datei `styles.css` kannst du:

- **Farben ändern**: Bearbeite die CSS-Variablen am Anfang der Datei
- **Schriftarten**: Ändere die Font-Families
- **Animationen**: Passe die Keyframes und Animation-Dauern an

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
├── index.html          # Haupt-HTML-Datei
├── styles.css          # Alle Styles und Animationen
├── script.js           # JavaScript für Interaktivität
├── .github/
│   └── workflows/
│       └── deploy.yml  # GitHub Actions für Deployment
└── README.md           # Diese Datei
```

## 🔧 Deployment

### GitHub Pages (empfohlen)

1. Stelle sicher, dass du auf dem `main`-Branch bist
2. Gehe zu den Repository-Einstellungen auf GitHub
3. Navigiere zu "Pages" (unter "Settings")
4. Wähle als Source: `gh-pages` Branch
5. Speichere die Einstellungen

Dein Portfolio wird dann unter `https://[dein-username].github.io/SWISS/` verfügbar sein.

### Alternative: Netlify/Vercel

1. Lade dein Projekt auf GitHub hoch
2. Erstelle ein neues Projekt auf Netlify oder Vercel
3. Verbinde dein GitHub-Repository
4. Wähle den `main`-Branch aus
5. Deploy!

## 🎨 Design-Anpassungen

### Farben ändern

In `styles.css` findest du die CSS-Variablen:

```css
:root {
    --primary: #2b2d42;
    --secondary: #8d99ae;
    --accent: #ef233c;
    --accent-secondary: #4cc9f0;
    /* ... weitere Variablen */
}
```

### Pixel-Character anpassen

Der Character im Hero-Bereich besteht aus CSS-Boxen. Du kannst die Farben und Formen in `styles.css` anpassen:

```css
.character-head {
    background: var(--pixel-4);
    /* ... */
}
```

### Neue Skills hinzufügen

Füge einfach neue `<div>`-Elemente mit der Klasse `skill-item` im Skills-Bereich hinzu:

```html
<div class="skill-item" data-skill="NewSkill">
    <span class="skill-icon">🎮</span>
    <span class="skill-name">New Skill</span>
</div>
```

## 🎮 Easter Eggs

- **Konsole**: Öffne die Browser-Konsole für eine Überraschung!
- **Tastatur**: Drücke `ESC` um nach oben zu scrollen
- **Touch**: Wische nach oben/unten für schnelles Scrollen

## 🛠️ Technologien

- **HTML5** - Struktur
- **CSS3** - Styling, Animationen, Responsive Design
- **JavaScript (Vanilla)** - Interaktivität, Animationen
- **Google Fonts** - Press Start 2P (Pixel-Font)
- **GitHub Actions** - Automatisches Deployment

## 📝 Changelog

### v1.0.0 (2024)
- Initiales Release
- Pixel-Art Design
- Responsive Layout
- Animationen und Interaktionen
- GitHub Pages Deployment

## 🤝 Mitwirken

Falls du Verbesserungen vorschlagen möchtest:

1. Forke das Repository
2. Erstelle einen neuen Branch (`git checkout -b feature/amazing-feature`)
3. Commite deine Änderungen (`git commit -m 'Add amazing feature'`)
4. Push zum Branch (`git push origin feature/amazing-feature`)
5. Öffne einen Pull Request

## 📄 Lizenz

Dieses Projekt ist unter der MIT-Lizenz lizenziert - siehe [LICENSE](LICENSE) für Details.

## 📞 Kontakt

- **GitHub**: [@tishutox](https://github.com/tishutox)
- **E-Mail**: [Deine E-Mail hier eintragen]

---

⭐ **Star dieses Repository, wenn es dir gefällt!** ⭐

*Made with ❤️ and Pixel Art*
