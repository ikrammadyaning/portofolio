# 1. 📦 Definisi Stack & Arsitektur

## Framework dan Build Tool

Pada proyek ini saya menggunakan React.js versi 19 sebagai framework utama untuk membangun antarmuka website. Untuk proses development dan build, saya menggunakan Vite versi 8 karena prosesnya lebih cepat dan ringan dibandingkan build tool lainnya. Selain itu, fitur Hot Module Replacement (HMR) yang dimiliki Vite membuat perubahan kode dapat langsung terlihat tanpa perlu menjalankan ulang aplikasi.

## Bahasa Pemrograman

Seluruh aplikasi dibuat menggunakan JavaScript dengan sintaks JSX. Saya tidak menggunakan TypeScript pada proyek ini. File komponen menggunakan ekstensi `.jsx`, sedangkan file yang berisi data dan context menggunakan ekstensi `.js`.

## Library yang Digunakan

Beberapa library tambahan yang digunakan pada proyek ini antara lain:

* **react-router-dom** digunakan untuk mengatur navigasi antar halaman.
* **react-icons** digunakan untuk menampilkan berbagai ikon yang dibutuhkan pada tampilan website.

## Struktur Folder

Struktur folder dibuat dengan tujuan agar kode lebih rapi dan mudah dikelola. Folder `components` digunakan untuk menyimpan komponen yang dapat digunakan kembali, folder `pages` digunakan untuk halaman utama website, folder `data` digunakan untuk menyimpan data statis, sedangkan folder `context` digunakan untuk pengelolaan state global seperti tema dan autentikasi pengguna.

## Alasan Pemisahan Komponen

Saya memisahkan komponen berdasarkan fungsi dan tanggung jawab masing-masing. Misalnya, komponen `ProjectSection` bertugas mengatur logika slider project, sedangkan `ProjectCard` hanya bertugas menampilkan informasi satu project.

Dengan pemisahan seperti ini, kode menjadi lebih mudah dibaca, lebih mudah diperbaiki jika terjadi kesalahan, dan lebih mudah dikembangkan ketika ingin menambah fitur baru.

## Alasan Pemisahan Data

Data seperti daftar project, riwayat pendidikan, skill, dan testimoni disimpan pada folder `data`. Tujuannya agar komponen hanya fokus menampilkan data tanpa harus menyimpan isi datanya secara langsung.

Dengan cara ini, ketika ingin menambah atau mengubah data, saya hanya perlu mengedit file data tanpa harus mengubah komponen yang menampilkannya.

## Alasan Pemisahan CSS

Setiap komponen memiliki file CSS masing-masing agar styling lebih terorganisir. Saya menggunakan CSS biasa sehingga seluruh selector masih bersifat global. Oleh karena itu saya menggunakan penamaan class yang konsisten untuk menghindari benturan antar style.

## Cara Kerja Aplikasi

Aplikasi dimulai dari file `App.jsx` yang membungkus seluruh halaman dengan `ThemeProvider`, `AuthProvider`, dan `BrowserRouter`.

Navigasi antar halaman menggunakan React Router. Semua halaman utama ditampilkan melalui komponen `Layout` yang berisi Navbar, Footer, dan area konten utama.

Untuk pengelolaan state global, saya menggunakan React Context melalui `ThemeContext` dan `AuthContext`. Data seperti status login, tema website, dan data buku tamu disimpan menggunakan Local Storage sehingga tetap tersimpan walaupun browser ditutup.
