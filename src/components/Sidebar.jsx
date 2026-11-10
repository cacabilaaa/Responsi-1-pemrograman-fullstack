
function Sidebar() {
  return (
    <aside className="sidebar">
      <h3>StockFlow</h3>
      <p className="sidebar-subtitle">
        WAREHOUSE MANAGEMENT
      </p>

      <a href="#dashboard" className="active">
        <i className="bi bi-grid"></i> Dashboard
      </a>

      <a href="#barang">
        <i className="bi bi-box-seam"></i> Data Barang
      </a>

      <a href="#stok-masuk">
        <i className="bi bi-box-arrow-in-down"></i> Stok Masuk
      </a>

      <a href="#stok-keluar">
        <i className="bi bi-box-arrow-up"></i> Stok Keluar
      </a>

      <a href="#laporan">
        <i className="bi bi-file-earmark-bar-graph"></i> Laporan
      </a>
    </aside>
  );
}

export default Sidebar;
