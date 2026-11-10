
import { useState, useEffect } from "react";
import $ from "jquery";

import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import BarangForm from "./components/barangForm";
import BarangList from "./components/barangList";
import TransaksiStok from "./components/transaksistok";

import "./App.css";

function App() {
  const [barang, setBarang] = useState([
    {
      id: 1,
      kode: "BRG001",
      nama: "Laptop",
      kategori: "Elektronik",
      stok: 15,
      satuan: "Unit",
      lokasi: "Rak A1",
      minimum: 5,
    },
    {
      id: 2,
      kode: "BRG002",
      nama: "Mouse Wireless",
      kategori: "Elektronik",
      stok: 4,
      satuan: "Pcs",
      lokasi: "Rak A2",
      minimum: 5,
    },
  ]);

  const [riwayat, setRiwayat] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editBarang, setEditBarang] = useState(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    $("#welcomeBanner").hide().fadeIn(700);
  }, []);

  // Menyimpan barang baru atau perubahan barang
  function saveBarang(data) {
    if (editBarang) {
      setBarang((prev) =>
        prev.map((item) =>
          item.id === editBarang.id
            ? { ...item, ...data }
            : item
        )
      );
    } else {
      setBarang((prev) => [
        ...prev,
        { id: Date.now(), ...data },
      ]);
    }

    setEditBarang(null);
  }

  // Menghapus barang
  function deleteBarang(id) {
    const yakin = window.confirm(
      "Apakah kamu yakin ingin menghapus barang ini?"
    );

    if (yakin) {
      setBarang((prev) =>
        prev.filter((item) => item.id !== id)
      );
    }
  }

  // Membuka form edit barang
  function handleEdit(item) {
    setEditBarang(item);
    setShowForm(true);
  }

  // Mencatat stok masuk dan stok keluar
  function handleStock(item, jenis) {
    const jumlah = Number(
      window.prompt(`Masukkan jumlah stok ${jenis}:`)
    );

    if (!Number.isInteger(jumlah) || jumlah <= 0) {
      window.alert("Jumlah harus berupa angka bulat lebih dari 0.");
      return;
    }

    if (jenis === "keluar" && jumlah > item.stok) {
      window.alert("Stok tidak mencukupi!");
      return;
    }

    setBarang((prev) =>
      prev.map((data) =>
        data.id === item.id
          ? {
              ...data,
              stok:
                jenis === "masuk"
                  ? data.stok + jumlah
                  : data.stok - jumlah,
            }
          : data
      )
    );

    setRiwayat((prev) => [
      {
        id: Date.now(),
        kode: item.kode,
        nama: item.nama,
        jenis,
        jumlah,
        waktu: new Date().toLocaleString("id-ID"),
      },
      ...prev,
    ]);
  }

function prosesTransaksi(id, jenis, jumlah) {
  const item = barang.find((data) => data.id === id);

  if (!item) {
    alert("Barang tidak ditemukan.");
    return;
  }

  if (jenis === "keluar" && jumlah > item.stok) {
    alert("Stok tidak mencukupi!");
    return;
  }

  setBarang((prev) =>
    prev.map((data) =>
      data.id === id
        ? {
            ...data,
            stok:
              jenis === "masuk"
                ? data.stok + jumlah
                : data.stok - jumlah,
          }
        : data
    )
  );

  setRiwayat((prev) => [
    {
      id: Date.now(),
      kode: item.kode,
      nama: item.nama,
      jenis,
      jumlah,
      waktu: new Date().toLocaleString("id-ID"),
    },
    ...prev,
  ]);

  alert(
    jenis === "masuk"
      ? "Stok berhasil ditambahkan!"
      : "Stok berhasil dikurangi!"
  );
}

  // Pencarian barang
  const filteredBarang = barang.filter((item) =>
    `${item.kode} ${item.nama} ${item.kategori}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  // Statistik inventaris
  const totalJenis = barang.length;

  const totalStok = barang.reduce(
    (total, item) => total + item.stok,
    0
  );

  const stokMenipis = barang.filter(
    (item) => item.stok > 0 && item.stok <= item.minimum
  ).length;

  const stokHabis = barang.filter(
    (item) => item.stok === 0
  ).length;

  const totalMasuk = riwayat
    .filter((item) => item.jenis === "masuk")
    .reduce((total, item) => total + item.jumlah, 0);

  const totalKeluar = riwayat
    .filter((item) => item.jenis === "keluar")
    .reduce((total, item) => total + item.jumlah, 0);

  return (
    <div className="app-container">
      <Sidebar />

      <main className="main-content">
        <Navbar
          onAdd={() => {
            setEditBarang(null);
            setShowForm(true);
          }}
          search={search}
          setSearch={setSearch}
        />

        {/* Sambutan */}
        <section className="welcome-banner" id="welcomeBanner">
          <h3>Selamat Datang di StockFlow!</h3>
          <p>
            Sistem Manajemen Inventaris Barang Gudang.
            Pantau dan kelola persediaan barang dengan mudah.
          </p>
        </section>

        {/* Ringkasan */}
        <section id="dashboard" className="row mt-4">
          <div className="col-md-3 col-6 mb-3">
            <div className="stat-card">
              <p>Total Jenis Barang</p>
              <h2>{totalJenis}</h2>
              <small>Jenis inventaris</small>
            </div>
          </div>

          <div className="col-md-3 col-6 mb-3">
            <div className="stat-card">
              <p>Total Stok</p>
              <h2>{totalStok}</h2>
              <small>Seluruh satuan barang</small>
            </div>
          </div>

          <div className="col-md-3 col-6 mb-3">
            <div className="stat-card">
              <p>Stok Menipis</p>
              <h2 className="text-warning">{stokMenipis}</h2>
              <small>Perlu segera diperiksa</small>
            </div>
          </div>

          <div className="col-md-3 col-6 mb-3">
            <div className="stat-card">
              <p>Stok Habis</p>
              <h2 className="text-danger">{stokHabis}</h2>
              <small>Barang tidak tersedia</small>
            </div>
          </div>
        </section>

        {/* Data barang */}
        <section className="content-card mt-4" id="barang">
          <div className="section-heading">
            <div>
              <h4>Data Inventaris Barang</h4>
              <p className="text-muted">
                Daftar barang yang tersimpan di gudang.
              </p>
            </div>

            <button
              className="btn btn-primary"
              onClick={() => {
                setEditBarang(null);
                setShowForm(true);
              }}
            >
              + Tambah Barang
            </button>
          </div>

          <BarangList
            barang={filteredBarang}
            onEdit={handleEdit}
            onDelete={deleteBarang}
            onStock={handleStock}
          />
        </section>

        {/* Riwayat stok masuk */}
        <section className="content-card mt-4" id="stok-masuk">
          <h4>Riwayat Stok Masuk</h4>
          <p className="text-muted">
            Total barang masuk: {totalMasuk}
            <TransaksiStok
            barang={barang}
            jenis="masuk"
            onTransaksi={prosesTransaksi}/>
          </p>

          <div className="table-responsive">
            <table className="table table-hover">
              <thead>
                <tr>
                  <th>Kode</th>
                  <th>Nama Barang</th>
                  <th>Jumlah Masuk</th>
                  <th>Waktu</th>
                </tr>
              </thead>
              <tbody>
                {riwayat
                  .filter((item) => item.jenis === "masuk")
                  .map((item) => (
                    <tr key={item.id}>
                      <td>{item.kode}</td>
                      <td>{item.nama}</td>
                      <td>+{item.jumlah}</td>
                      <td>{item.waktu}</td>
                    </tr>
                  ))}

                {!riwayat.some((item) => item.jenis === "masuk") && (
                  <tr>
                    <td colSpan="4" className="text-center text-muted">
                      Belum ada transaksi stok masuk.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>

        {/* Riwayat stok keluar */}
        <section className="content-card mt-4" id="stok-keluar">
          <h4>Riwayat Stok Keluar</h4>
          <p className="text-muted">
            Total barang keluar: {totalKeluar}
            <TransaksiStok
            barang={barang}
            jenis="keluar"
            onTransaksi={prosesTransaksi}/>
          </p>

          <div className="table-responsive">
            <table className="table table-hover">
              <thead>
                <tr>
                  <th>Kode</th>
                  <th>Nama Barang</th>
                  <th>Jumlah Keluar</th>
                  <th>Waktu</th>
                </tr>
              </thead>
              <tbody>
                {riwayat
                  .filter((item) => item.jenis === "keluar")
                  .map((item) => (
                    <tr key={item.id}>
                      <td>{item.kode}</td>
                      <td>{item.nama}</td>
                      <td>-{item.jumlah}</td>
                      <td>{item.waktu}</td>
                    </tr>
                  ))}

                {!riwayat.some((item) => item.jenis === "keluar") && (
                  <tr>
                    <td colSpan="4" className="text-center text-muted">
                      Belum ada transaksi stok keluar.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>

        {/* Laporan */}
        <section className="content-card mt-4" id="laporan">
          <h4>Laporan Inventaris</h4>
          <p className="text-muted">
            Ringkasan persediaan barang gudang saat ini.
          </p>

          <div className="row">
            <div className="col-md-4 mb-3">
              <div className="report-item">
                <span>Total Jenis Barang</span>
                <h3>{totalJenis}</h3>
              </div>
            </div>

            <div className="col-md-4 mb-3">
              <div className="report-item">
                <span>Total Stok Masuk</span>
                <h3>{totalMasuk}</h3>
              </div>
            </div>

            <div className="col-md-4 mb-3">
              <div className="report-item">
                <span>Total Stok Keluar</span>
                <h3>{totalKeluar}</h3>
              </div>
            </div>
          </div>
        </section>

        {/* Form barang */}
        <BarangForm
          show={showForm}
          onClose={() => {
            setShowForm(false);
            setEditBarang(null);
          }}
          onSave={saveBarang}
          editBarang={editBarang}
        />
      </main>
    </div>
  );
}

export default App;
