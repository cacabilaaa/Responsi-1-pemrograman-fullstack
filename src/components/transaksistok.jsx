
import { useState } from "react";

function TransaksiStok({ barang, jenis, onTransaksi }) {
  const [barangId, setBarangId] = useState("");
  const [jumlah, setJumlah] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    if (!barangId || Number(jumlah) <= 0) {
      alert("Pilih barang dan masukkan jumlah yang valid.");
      return;
    }

    onTransaksi(Number(barangId), jenis, Number(jumlah));
    setBarangId("");
    setJumlah("");
  }

  return (
    <form onSubmit={handleSubmit} className="row g-3 mb-4">
      <div className="col-md-5">
        <label className="form-label">Pilih Barang</label>
        <select
          className="form-select"
          value={barangId}
          onChange={(e) => setBarangId(e.target.value)}
          required
        >
          <option value="">-- Pilih Barang --</option>
          {barang.map((item) => (
            <option key={item.id} value={item.id}>
              {item.kode} - {item.nama} (Stok: {item.stok})
            </option>
          ))}
        </select>
      </div>

      <div className="col-md-4">
        <label className="form-label">Jumlah</label>
        <input
          type="number"
          min="1"
          className="form-control"
          value={jumlah}
          onChange={(e) => setJumlah(e.target.value)}
          placeholder="Masukkan jumlah"
          required
        />
      </div>

      <div className="col-md-3 d-flex align-items-end">
        <button
          type="submit"
          className={`btn w-100 ${
            jenis === "masuk" ? "btn-success" : "btn-warning"
          }`}
        >
          {jenis === "masuk" ? "Simpan Stok Masuk" : "Simpan Stok Keluar"}
        </button>
      </div>
    </form>
  );
}

export default TransaksiStok;
