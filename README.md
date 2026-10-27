# YUNIFEST 2026 — Official Website & Registration Portal
### YBN University, Ranchi, Jharkhand, India
**Dates:** December 10, 11 and 12, 2026  
**Theme:** Technology, Culture, Creativity and Celebration  
**Tagline:** One Campus. Three Days. Endless Possibilities.  
**Registration Fee:** ₹0 (Free Entry across all eligible events)  
**Mandatory Entry Condition:** Valid Physical College / University ID card is required for all participants.

---

## 1. Implemented Routes & Features

| Route | Page / Feature | Description |
| :--- | :--- | :--- |
| `/` | **Festival Home** | Cinematic animated hero, live countdown to Dec 10 2026, fest overview, 3-day preview, coordinators list, official rules, campus venue/transit map, and FAQs. |
| `/events` | **Events Explorer** | Complete catalogue of 15+ official events. Real-time search, filters by eligibility (Inter-College vs YBN only), day, and category. Modal with full rules and direct registration link. |
| `/schedule` | **Three-Day Programme** | Interactive timeline with tabs for Day 1 (Tech & Innovation), Day 2 (Cultural Showcases), Day 3 (Grand Finale & DJ), and Schedule TBA (Quiz & Poster Making). |
| `/register` | **Participant Registration** | **Step 1:** Prominent selection between **Option A (YBN Student)** and **Option B (Other College Student)**.<br>**Step 2:** Form with auto-filtered eligible events, dynamic fields (Solo/Duo/Group for Dance/Singing, BGMI/Free Fire IGN & ID for Gaming, Team roster for Treasure Hunting), validation, and duplicate prevention. |
| `/register/success` | **Pass & Confirmation** | Celebratory confetti, official Registration Reference (`YUNI-2026-XXXX`), scannable verification QR Code badge, participant summary, and one-click PDF print/save. |
| `/admin/login` | **Organizer Portal Login** | Secure authentication for committee and faculty mentors. Compatible with Supabase Auth with quick evaluation switcher (`organizer@ybn.edu.in` / `yunifest2026`). |
| `/admin` | **Protected Organizer Dashboard** | Real-time metric cards (total entries, YBN vs visiting college split, status counts), **Treasure Hunting capacity tracker (capped at 25 entries)**, search & multi-filter table, detail inspect modal, status toggles (Confirmed/Pending/Waitlisted/Rejected), Excel-compatible CSV export, event controls (schedule/venue/capacity/gate toggles), and downloadable live registration vector QR generator. |

---

## 2. Core Organizing Committee & Verbatim Coordinators

- **Dance Competition:** Student Coordinator: Antara Chakraborty; Faculty Coordinator: Sheetal Sir.
- **Singing Competition:** Student Coordinator: Varshana Chatterjee; Faculty Coordinator: Dr. Madhumati Mam.
- **Treasure Hunting:** Student Coordinator: Agrani Shrivastava; Faculty Coordinator: Dr. Sapna Kasari.
- **Food Stall & Flea Market:** Student Coordinator: Meenu Mahato; Faculty Coordinator: Dr. Rachna Kumari.
- **Gaming Tournament (Free Fire & BGMI):** Student Coordinator: Rounak Dubey; Faculty Coordinator: Neha Lakra Mam.
- **Mimicry & Stand-up Comedy:** Student Coordinator: Astha Kachhap; Faculty Coordinator: Abhilasha Mam.
- **Model Presentation & Poster Making:** Student Coordinator: Aryan Sharma; Faculty Coordinator: Dr. Asha Puran Mam.
- **Ramp Walk / Fashion Show:** Student Coordinator: Megha Kumari; Faculty Coordinator: Namrata Mam.
- **Face Painting:** Student Coordinator: Anmol Kumar; Faculty Coordinator: Dr. Chinnmaya Mam.

---

## 3. Database Schema & Security (Supabase PostgreSQL)

The complete SQL schema script is located at `supabase/schema.sql`.

### Tables Configured:
1. `events`: Stores event slugs, titles, categories, day allocations, timings, capacity settings (`capacity`, `capacity_unit`), coordinators, and rules.
2. `registrations`: Stores `registration_code`, `participant_type`, personal identification, institutional data, dynamic `event_specific_data` JSONB, ID card confirmation, consent, and `registration_status`. Enforces unique composite constraint `(event_id, student_id_number, email)` to prevent duplicate entries.
3. `admin_users`: Maps authorized organizer accounts to `auth.users(id)` with role checks.

### Row Level Security (RLS):
- **Events:** Public read access; write/update access restricted to users confirmed via `is_organizer_admin()`.
- **Registrations:** Public insert-only access for new registrations with validation constraints (`id_card_confirmed = true`, `consent = true`). Public SELECT access is denied to protect student privacy. Only verified admins can view, update status, or export records.
- **Dual Mode Architecture:** When Supabase credentials are not yet added to `.env`, the system automatically defaults to a persistent `localStorage` store so the entire website, registration flow, QR generation, and admin dashboard function without network errors. Once `.env` is configured, it automatically connects to live Supabase!

---

## 4. Setup & Running Locally

### Step 1: Install Dependencies
```bash
npm install
```

### Step 2: Start Development Server
```bash
npm run dev
```

### Step 3: Production Build
```bash
npm run build
npm run preview
```

---

## 5. Steps to Create the First Authorized Admin Account

1. Go to your [Supabase Dashboard](https://supabase.com/dashboard).
2. Open the **SQL Editor** and run the contents of `supabase/schema.sql`.
3. Open **Authentication** -> **Users** and click **Add User** -> **Create User** with an official organizer email (e.g. `organizer@ybn.edu.in`) and a secure password.
4. Copy the generated `User UID` from the Auth table.
5. In the **SQL Editor**, execute:
   ```sql
   INSERT INTO public.admin_users (user_id, email, role)
   VALUES ('<COPIED_USER_UID>', 'organizer@ybn.edu.in', 'superadmin');
   ```
6. Add your Supabase project keys to `.env`:
   ```env
   VITE_SUPABASE_URL=https://your-project.supabase.co
   VITE_SUPABASE_ANON_KEY=your-anon-key
   ```
7. Log in via `/admin/login` using those credentials.
