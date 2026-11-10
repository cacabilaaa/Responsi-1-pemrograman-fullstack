
import { useState, useEffect } from "react";

function BarangForm({ show, onClose, onSave, editBarang }) {
  const [kode, setKode] = useState("");
  const [nama, setNama] = useState("");
  const [kategori, setKategori] = useState("Elektronik");
  const [stok, setStok] = useState(0);
  const [satuan, setSatuan] = useState("Pcs");
  const [lokasi, setLokasi] = useState("");
  const [minimum, setMinimum] = useState(5);

  useEffect(() => {
    if (editBarang) {
      setKode(editBarang.kode);
      setNama(editBarang.nama);
      setKategori(editBarang.kategori);
      setStok(editBarang.stok);
      setSatuan(editBarang.satuan);
      setLokasi(editBarang.lokasi);
      setMinimum(editBarang.minimum);
    } else {
      setKode("");
      setNama("");
      setKategori("Elektronik");
      setStok(0);
      setSatuan("Pcs");
      setLokasi("");
      setMinimum(5);
    }
  }, [editBarang, show]);

  if (!show) return null;

  function handleSubmit(e) {
    e.preventDefault();

    onSave({
      kode,
      nama,
      kategori,
      stok: Number(stok),
      satuan,
      lokasi,
      minimum: Number(minimum),
    });

    onClose();
  }

  return (
    <div className="modal-overlay">
      <div className="task-modal">
        <h4>{editBarang ? "Edit Barang" : "Tambah Barang"}</h4>

        <form onSubmit={handleSubmit}>
          <label className="form-label">Kode Barang</label>
          <input
            className="form-control mb-3"
            value={kode}
            onChange={(e) => setKode(e.target.value)}
            required
          />

          <label className="form-label">Nama Barang</label>
          <input
            className="form-control mb-3"
            value={nama}
            onChange={(e) => setNama(e.target.value)}
            required
          />

          <label className="form-label">Kategori</label>
          <select
            className="form-select mb-3"
            value={kategori}
            onChange={(e) => setKategori(e.target.value)}
          >
            <option>Elektronik</option>
            <option>Peralatan sekolah</option>
            <option>Perlengkapan Gudang</option>
            <option>Furniture</option>
            <option>Lainnya</option>
          </select>

          <label className="form-label">Jumlah Stok</label>
          <input
            type="number"
            min="0"
            className="form-control mb-3"
            value={stok}
            onChange={(e) => setStok(e.target.value)}
            required
          />

          <label className="form-label">Satuan</label>
          <select
            className="form-select mb-3"
            value={satuan}
            onChange={(e) => setSatuan(e.target.value)}
          >
            <option>Pcs</option>
            <option>Unit</option>
            <option>Kotak</option>
            <option>Pack</option>
            <option>Dus</option>
          </select>

          <label className="form-label">Lokasi Penyimpanan</label>
          <input
            className="form-control mb-3"
            value={lokasi}
            onChange={(e) => setLokasi(e.target.value)}
            placeholder="Contoh: Rak A1"
            required
          />

          <label className="form-label">Stok Minimum</label>
          <input
            type="number"
            min="0"
            className="form-control mb-3"
            value={minimum}
            onChange={(e) => setMinimum(e.target.value)}
            required
          />

          <div className="d-flex justify-content-end gap-2">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onClose}
            >
              Batal
            </button>

            <button type="submit" className="btn btn-primary">
              Simpan Barang
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default BarangForm;
