 # 🗃️ Inventory Backend

Back-end REST API untuk aplikasi manajemen inventaris barang. Aplikasi ini dibangun menggunakan Node.js (Express.js) dan PostgreSQL, dengan fokus pada validasi logika bisnis, efisiensi query, serta struktur kode yang terorganisir.

### 🔧 Tech Stack
- Node.js + Express.js — Server-side framework

- PostgreSQL — Relational database

- Prisma ORM — Abstraksi query database

- Zod — Validasi data

- dotenv — Konfigurasi environment

- CORS & Helmet — Middleware keamanan

### 🚀 Fitur API 

📦 Barang

- GET /api/barang
Lihat semua barang (dengan filter kategori & stok minimum opsional).

- GET /api/barang/:id
Lihat detail satu barang berdasarkan ID.

- POST /api/barang
Tambah barang baru
Validasi: stok tidak boleh negatif, harga jual > harga beli

- PUT /api/barang/:id
Edit barang
Validasi: pengurangan stok tidak boleh < 0

- DELETE /api/barang/:id
Hapus barang
Hanya bisa jika stok = 0

## ⚙️ Cara Menjalankan Aplikasi

### 1. Clone Repo
git clone https://github.com/abdulrohman19/inventory-backend.git

### 2. move folder
cd inventory-backend

### 3. Install Dependencies
npm install

### 4. Setup .env
Buat file .env di root dan isi:
DATABASE_URL="postgresql://user:password@localhost:5432/inventory"

PORT=5001

### 5. Run App
npm run dev

📂 Struktur Folder

<img width="462" alt="image" src="https://github.com/user-attachments/assets/313a0ca7-712b-4f07-9736-9d965bbcc92f" />



