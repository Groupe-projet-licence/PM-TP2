# Soutiens-moi! 🎓🤝

**Soutiens-moi!** est une plateforme mobile hybride (Ionic + Laravel) de **tutorat pair-à-pair**, destinée aux étudiants.  
Elle permet de **rechercher un tuteur**, **planifier une session**, **poser des questions (FAQ)**, **échanger par chat** et **donner du feedback**.

---

## 🚀 Fonctionnalités principales

- 🔍 **Recherche de tuteurs** par compétence
- 👨‍🏫 **Sessions de tutorat** avec planification
- 💬 **Chat en temps réel** (1-to-1)
- 📚 **FAQ communautaire** (questions / réponses)
- ⭐ **Feedback et évaluation des tuteurs**
- 👤 **Authentification et profils (étudiant/tuteur)**
- 🌐 **API sécurisée avec Laravel Sanctum**

---

## 🛠️ Stack technique

### 🧠 Backend – Laravel 10
- Laravel Sanctum (auth API sécurisée)
- MySQL (base de données)
- Relations entre `users`, `skills`, `sessions`, `messages`, `feedbacks`, `faq-posts`, etc.
- Middleware & gestion CSRF
- CORS configuré pour développement mobile

### 📱 Frontend – Ionic + Angular
- Gestion des vues : Register / Login / Home / Search / Chat / FAQ / Profile / Planification
- Authentification via Storage + Bearer token
- Appel des endpoints Laravel avec `HttpClient`
- Responsive UI respectant les maquettes fournies

---

## 📁 Structure du projet

```
soutiensmoi-backend/
├── app/Http/Controllers/
├── app/Models/
├── routes/api.php
├── database/migrations/
├── .env
└── config/cors.php

soutiensmoi-frontend/
├── src/app/
│   ├── auth/ (register, login)
│   ├── pages/ (home, search, faq, chat, etc.)
│   ├── services/ (auth.service.ts, ...)
├── src/environments/
│   ├── environment.ts
│   └── environment.prod.ts
└── capacitor.config.ts
```

---

## ⚙️ Installation (Développement)

### 🐘 Backend Laravel

```bash
cd soutiensmoi-backend
composer install
cp .env.example .env
php artisan key:generate

# Configurer .env :
APP_URL=http://192.168.43.42:8000
SANCTUM_STATEFUL_DOMAINS=localhost:8100,192.168.43.42:8100

# Base de données
php artisan migrate
php artisan serve --host=192.168.43.42 --port=8000
```

### 📲 Frontend Ionic

```bash
cd soutiensmoi-frontend
npm install
ionic build
npx cap sync
ionic serve --host=192.168.43.42
```

---

## 📦 Compilation APK Android

```bash
ionic build
npx cap sync android
npx cap open android
```

Dans Android Studio :
- Activer `usesCleartextTraffic`
- Build APK ou déployer via câble USB

---

## 🔒 Sécurité

- Authentification avec tokens Sanctum
- CSRF sécurisé avec cookie `XSRF-TOKEN`
- Middleware Laravel pour vérification
- Configuration CORS multi-IP


## 📌 Remarques

- Le backend est optimisé pour la compatibilité mobile en local (avec IP réseau)
- Il est conseillé de tester sur **appareil réel** ou **émulateur Android**
- Le projet respecte les bonnes pratiques d’architecture Angular + Laravel

---

## 📄 Licence

Ce projet est réalisé dans le cadre d’un TP universitaire — tous droits réservés au groupe Soutiens-moi!