
function BarangList({ barang, onEdit, onDelete, onStock }) {
  function getStatus(item) {
    if (item.stok === 0) return "Habis";
    if (item.stok <= item.minimum) return "Menipis";
    return "Tersedia";
  }

  return (
    <div className="table-responsive">
      <table className="table table-hover align-middle">
        <thead>
          <tr>
            <th>Kode</th>
            <th>Nama Barang</th>
            <th>Kategori</th>
            <th>Stok</th>
            <th>Lokasi</th>
            <th>Status</th>
            <th>Aksi</th>
          </tr>
        </thead>

        <tbody>
          {barang.map((item) => {
            const status = getStatus(item);

            return (
              <tr key={item.id}>
                <td>{item.kode}</td>
                <td>
                  <strong>{item.nama}</strong>
                  <br />
                  <small className="text-muted">{item.satuan}</small>
                </td>
                <td>{item.kategori}</td>
                <td>{item.stok}</td>
                <td>{item.lokasi}</td>
                <td>
                  <span
                    className={`stock-badge ${
                      status === "Habis"
                        ? "stock-empty"
                        : status === "Menipis"
                        ? "stock-low"
                        : "stock-available"
                    }`}
                  >
                    {status}
                  </span>
                </td>
                <td>
                  <div className="d-flex flex-wrap gap-1">
                    <button
                      className="btn btn-sm btn-success"
                      title="Stok masuk"
                      onClick={() => onStock(item, "masuk")}
                    >
                      +
                    </button>

                    <button
                      className="btn btn-sm btn-warning"
                      title="Stok keluar"
                      onClick={() => onStock(item, "keluar")}
                    >
                      -
                    </button>

                    <button
                      className="btn btn-sm btn-outline-primary"
                      onClick={() => onEdit(item)}
                    >
                      Edit
                    </button>

                    <button
                      className="btn btn-sm btn-outline-danger"
                      onClick={() => onDelete(item.id)}
                    >
                      Hapus
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}

          {barang.length === 0 && (
            <tr>
              <td colSpan="7" className="text-center text-muted py-4">
                Data barang tidak ditemukan.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default BarangList;
