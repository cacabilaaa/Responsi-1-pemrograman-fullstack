
function Navbar({ onAdd, search, setSearch }) {
  return (
    <div className="navbar-custom">
      <div>
        <h4>Dashboard Inventaris</h4>
        <p>Kelola persediaan barang gudang dengan mudah.</p>
      </div>

      <div className="navbar-actions">
        <input
          type="text"
          className="form-control"
          placeholder="Cari barang..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <button className="btn btn-primary" onClick={onAdd}>
          <i className="bi bi-plus-lg"></i> Tambah Barang
        </button>
      </div>
    </div>
  );
}

export default Navbar;
