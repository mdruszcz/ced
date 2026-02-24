# 🧭 Coaching Dashboard — Cédric Charlier

Tableau de bord personnel d'accompagnement à la reconversion professionnelle post-burnout.

![React](https://img.shields.io/badge/React-18-blue) ![Tailwind](https://img.shields.io/badge/Tailwind-3.4-blue) ![Vite](https://img.shields.io/badge/Vite-5-purple)

## 🚀 Démarrage rapide

```bash
# 1. Installer les dépendances
npm install

# 2. Lancer le serveur de dev
npm run dev

# 3. Ouvrir http://localhost:5173
```

## 📦 Build pour production

```bash
npm run build
# Les fichiers sont dans dist/
```

## 🌐 Déployer sur GitHub Pages

```bash
# 1. Build
npm run build

# 2. Pousser le dossier dist/ sur la branche gh-pages
npx gh-pages -d dist
```

Ou utiliser Vercel / Netlify : connecter le repo et le déploiement est automatique.

## 📁 Structure

```
coaching-dashboard/
├── public/
│   └── cedric.jpg          ← Photo de profil
├── src/
│   ├── App.jsx             ← Composant principal (SPA)
│   ├── main.jsx            ← Point d'entrée React
│   └── index.css           ← Tailwind imports
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
└── postcss.config.js
```

## 🎨 Sections

| Section | Contenu |
|---------|---------|
| **Profil** | Radar chart, bar chart, double casquette Logistique/Data + Marketing, parcours chronologique |
| **Stratégie** | 4 phases interactives, cadre légal Réintégration 3.0, point stratégique clé |
| **Opportunités** | 7 pistes classées par adéquation, employeurs, formations |
| **Bien-être** | Mantras rotatifs, conseils reconstruction, diagnostic burnout, ressources |

## 🛠 Technologies

- **React 18** + **Vite 5**
- **Tailwind CSS 3.4**
- **Recharts** (graphiques)
- **Lucide React** (icônes)
- **Google Fonts** : DM Serif Display + Plus Jakarta Sans
