Wellness Tracker Dashboard - EmergencyyCall

Dashboard untuk tracking perjalanan kesehatan mental pengguna platform EmergencyyCall.

---

@ Framework & Tools yang Digunakan

* React 19 - Library JavaScript untuk membangun user interface
* Vite - Build tool untuk mempercepat proses development
* Tailwind CSS v3 - Utility-first CSS framework untuk styling
* Recharts 2.5.0 - Library untuk visualisasi data mood dalam bentuk chart
* Lucide React - Icon library yang modern dan ringan
* React Hooks (useState, useEffect) - Untuk latihan dasar state management

---

@ Alasan Pemilihan Desain & Struktur Komponen

Desain Visual

* Warna gradient rose-orange-pink: Memberikan nuansa hangat dan menenangkan, sesuai tema mental health
* Rounded corners & soft shadows: Menambah kesan friendly dan mudah diakses
* Smooth animations & transitions: Latihan membuat pengalaman visual yang halus dan interaktif

Struktur Komponen

* StatCard sebagai reusable component: Latihan penggunaan props (icon, title, value, gradient) untuk komponen yang fleksibel
* Component isolation: Setiap section (Stats, Chart, Quote, Activities) dibuat terpisah untuk mempelajari struktur modular
* Single responsibility: Tiap komponen difokuskan hanya pada satu fungsi tertentu

Responsiveness

* Menggunakan pendekatan mobile-first dengan grid system yang responsif
* Breakpoints di `md:` dan `lg:` untuk menyesuaikan tampilan di tablet dan desktop

---

@ Rencana Integrasi dengan Backend (Konsep Pembelajaran)

Bagian ini masih berupa rancangan konsep, karena saya belum mengimplementasikan backend secara nyata. Tujuannya untuk memahami bagaimana frontend dapat berkomunikasi dengan API nantinya.

```javascript
// 1. Data sesi konseling
GET /api/user/sessions
Response: {
  totalSessions: number,
  currentMonth: number,
  averageDuration: number
}

// 2. Data mood tracking mingguan
GET /api/user/mood?range=weekly
Response: {
  data: [
    { date: "2025-10-21", mood: 6, day: "Senin" },
    ...
  ]
}

// 3. Aktivitas terkini
GET /api/user/activities?limit=4
Response: {
  activities: [
    {
      id: string,
      date: string,
      type: "counseling" | "checkin" | "journal",
      title: string,
      duration: string
    }
  ]
}

// 4. Quote motivasi
GET /api/quotes/daily
Response: { quote: string }
```

Data Fetching Strategy (Konsep)

* Berencana menggunakan React Query untuk belajar data fetching dan caching
* Menambahkan loading states dan error handling untuk UX yang lebih baik
* Simulasi auto-refresh data setiap 60 detik

State Management

* Saat ini menggunakan React Hooks untuk manajemen state lokal
* Ke depannya bisa belajar Context API atau Zustand untuk global state

Authentication (Rencana Belajar)

* Rencana untuk memahami integrasi JWT token di backend
* Melatih penggunaan Protected routes dengan React Router
* Simulasi auto-refresh token untuk session management
