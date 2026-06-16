# Alchemist-FE (Next.js + Shadcn UI)

Ini adalah repositori antarmuka (frontend) untuk proyek **Alchemist**. Proyek ini dibangun menggunakan arsitektur modern berbasis **Next.js** dan menggunakan **npm** sebagai *package manager* utama.

## 🚀 Teknologi Utama

Proyek ini menggunakan berbagai teknologi modern dan pustaka (*libraries*) berikut:

- **Framework**: [Next.js](https://nextjs.org/) (React Framework)
- **Package Manager**: npm
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **UI Components**: [Shadcn UI](https://ui.shadcn.com/) (berbasis Radix UI)
- **State Management**: [Redux Toolkit](https://redux-toolkit.js.org/) & [Redux Persist](https://github.com/rt2zz/redux-persist)
- **Data Fetching**: [TanStack React Query](https://tanstack.com/query/latest) & Axios
- **Form & Validation**: [React Hook Form](https://react-hook-form.com/) & [Zod](https://zod.dev/)
- **Animasi & Scrolling**: [GSAP](https://gsap.com/) & [Lenis](https://lenis.studiofreight.com/) (Smooth Scrolling)
- **Internationalization**: `i18next` & `react-i18next`

---

## 🛠️ Prasyarat (Prerequisites)

Sebelum menjalankan proyek ini, pastikan Anda telah menginstal **Node.js** dan **npm** di sistem Anda.

Anda dapat memverifikasi instalasi dengan menjalankan:
```bash
node -v
npm -v
```

---

## 💻 Cara Menjalankan Proyek Secara Lokal

Ikuti langkah-langkah di bawah ini untuk menjalankan *development server* di komputer Anda:

### 1. Kloning Repositori & Masuk ke Direktori
Pastikan Anda sudah berada di dalam folder proyek:
```bash
cd Alchemist-FE
```

### 2. Instalasi Dependensi (Dependencies)
Gunakan npm untuk menginstal semua paket yang dibutuhkan:
```bash
npm install
```

### 3. Menjalankan Development Server
Mulai server untuk tahap pengembangan:
```bash
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000) di browser Anda untuk melihat hasilnya. Proyek akan diperbarui secara otomatis ketika Anda mengedit file di dalam `src/`.

---

## 📦 Build untuk Produksi (Production)

Untuk melakukan *build* aplikasi ke versi produksi yang telah dioptimasi, jalankan perintah berikut:

```bash
# 1. Build aplikasi
npm run build

# 2. Jalankan server produksi
npm run start
```

---

## 🧹 Linting dan Formatting

Proyek ini dilengkapi dengan alat untuk memastikan kualitas kode agar tetap konsisten dan rapi:

- **Mengecek kode (Linting)**:
  ```bash
  npm run lint
  ```
- **Memperbaiki lint error secara otomatis**:
  ```bash
  npm run lint:fix
  ```
- **Memformat kode (Prettier)**:
  ```bash
  npm run format
  ```

---

## 📂 Struktur Direktori Utama

- `src/`: Berisi semua kode sumber aplikasi (komponen, halaman, state, API hook, tipe data, konfigurasi aplikasi).
- `public/`: Aset statis seperti gambar, font, dan ikon yang dapat diakses langsung oleh browser.
- `.env`: Variabel environment (harus disiapkan untuk URL API atau pengaturan *secret* lainnya).

---

Terima kasih! Jangan ragu untuk membuat *issue* atau bertanya kepada tim jika ada kendala saat proses integrasi maupun saat menjalankan proyek ini.
