# PawCare – Smart Animal Wellness and Veterinary Assistance Platform

A local full-stack animal wellness and veterinary assistance application built with React, TypeScript, Vite, Express and a persistent JSON database.

## Requirements
- Node.js 20.19+ (Node.js 22 LTS recommended)
- npm 10+
- Visual Studio Code

## Start on Windows
1. Extract the ZIP to a normal writable folder (do not run it from inside the ZIP preview).
2. Open the `PawCare` folder in Visual Studio Code.
3. Open **Terminal → New Terminal**.
4. Install dependencies:

   ```powershell
   npm install
   ```

5. Start the application:

   ```powershell
   npm run dev
   ```

6. Open `http://localhost:3000`.

If port 3000 is already in use, close the previous PawCare terminal with `Ctrl+C`, or change `PORT` in `.env` and restart.

## First-time administrator setup
1. Open the sign-in screen and choose **Admin Setup**.
2. Create the first administrator using your own name, email and password.
3. Admin Setup is locked after the first administrator is created. There is no public admin registration.
4. Sign in with the new administrator account.

## Registering accounts
- **Animal Owner:** choose Animal Owner registration and complete the form.
- **Veterinary Doctor:** choose Doctor registration and provide qualification, specialization, veterinary registration number, clinic information and the required degree certificate. The account remains pending until an administrator reviews and approves it.
- **Administrator:** created only through one-time Admin Setup.

There are intentionally **no default/demo users**. Create your own accounts through the application.

## Main capabilities
- Separate role-based workspaces for Admin, Veterinary Doctor and Animal Owner.
- Doctor credential review, certificate preview/download and approval/rejection workflow.
- Animal profiles and photo uploads for multiple domestic species.
- Appointment booking and management.
- Doctor consultations, patient records and care workflows.
- Health monitoring, vaccination/medication records, care schedule, nutrition, emergency information and reports.
- Responsive navigation and a dedicated Doctor Consultations screen.
- Environmental sections are not shown in the Admin or Animal Owner navigation.

## Local files
- `.data/petsense.db.json` – local application database (starts empty).
- `.data/sessions.json` – local login sessions (starts empty).
- `public/uploads/` – uploaded profile photos and doctor verification documents.
- `.env` – local runtime configuration. The included file contains no API key or production secret.

Back up `.data` and `public/uploads` before deleting or moving the project. Do not share a real `.env` containing secrets publicly. `GEMINI_API_KEY` is optional and only needed for Gemini-powered sound analysis; other core workflows do not require it.

## Build and type checks
```powershell
npm run build
npm run lint
```

## Notes
This project is intended for local academic demonstration. Before public deployment, configure HTTPS, secure production secrets, backups, email-based password reset and production-grade database storage. PawCare supports animal-care record keeping and veterinary assistance workflows; it does not replace diagnosis by a qualified veterinary professional.
