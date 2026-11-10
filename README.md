# StockFlow

## Dashboard Manajemen Inventaris Barang Gudang

StockFlow merupakan aplikasi berbasis web yang digunakan untuk mengelola data inventaris barang gudang. Aplikasi ini membantu pengguna dalam memantau jumlah stok barang, mencatat transaksi stok masuk dan stok keluar, serta melihat laporan persediaan barang.

## Fitur Aplikasi

1. **Dashboard** – Menampilkan ringkasan total jenis barang, total stok, stok menipis, dan stok habis.
2. **Data Barang** – Menampilkan, menambahkan, mengedit, menghapus, dan mencari data barang.
3. **Stok Masuk** – Mencatat transaksi barang masuk dan menambahkan jumlah stok secara otomatis.
4. **Stok Keluar** – Mencatat transaksi barang keluar dan mengurangi jumlah stok secara otomatis.
5. **Riwayat Transaksi** – Menampilkan catatan transaksi stok masuk dan stok keluar.
6. **Laporan Inventaris** – Menampilkan ringkasan persediaan barang gudang.

## Teknologi yang Digunakan

- HTML
- CSS
- JavaScript
- React JS 19
- Bootstrap
- Bootstrap Icons
- jQuery
- Vite

## Cara Menjalankan Aplikasi

1. Pastikan Node.js sudah terinstal di komputer.
2. Buka folder proyek menggunakan Visual Studio Code.
3. Buka terminal pada Visual Studio Code.
4. Jalankan perintah berikut untuk menginstal dependencies:

   ```bash
   npm install
   ```

5. Jalankan aplikasi menggunakan perintah:

   ```bash
   npm run dev
   ```

6. Buka alamat lokal yang muncul pada terminal, biasanya:

   `http://localhost:5173/`

## Struktur Folder

```text
task-manager/
├── public/
├── src/
│   ├── components/
│   │   ├── Sidebar.jsx
│   │   ├── Navbar.jsx
│   │   ├── BarangForm.jsx
│   │   ├── BarangList.jsx
│   │   └── TransaksiStok.jsx
│   ├── App.jsx
│   ├── App.css
│   └── main.jsx
├── index.html
├── package.json
├── package-lock.json
└── README.md
```

## Pengelolaan Data

Aplikasi ini menggunakan React State untuk mengelola data inventaris dan transaksi secara sementara di sisi pengguna (client-side). Data akan kembali ke kondisi awal ketika halaman dimuat ulang karena belum menggunakan database permanen.

## Tujuan Pembuatan

Aplikasi StockFlow dibuat sebagai pemenuhan tugas Responsi Pemrograman Fullstack dengan menerapkan konsep pengembangan aplikasi web interaktif menggunakan React JS dan teknologi pendukung lainnya.