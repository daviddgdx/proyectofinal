const pool = require('../config/bd');

const clientesModelo = {
  obtenerTodos: async () => {
    const [filas] = await pool.query('SELECT * FROM clientes');
    return filas;
  },

  obtenerPorId: async (id) => {
    const [filas] = await pool.query(
      'SELECT * FROM clientes WHERE id_cliente = ?',
      [id]
    );
    return filas[0];
  },

  crear: async ({ nombre, ciudad, fecha_registro }) => {
    const [resultado] = await pool.query(
      'INSERT INTO clientes (nombre, ciudad, fecha_registro) VALUES (?, ?, ?)',
      [nombre, ciudad, fecha_registro]
    );
    return resultado.insertId;
  },

  actualizar: async (id, { nombre, ciudad, fecha_registro }) => {
    const [resultado] = await pool.query(
      'UPDATE clientes SET nombre = ?, ciudad = ?, fecha_registro = ? WHERE id_cliente = ?',
      [nombre, ciudad, fecha_registro, id]
    );
    return resultado.affectedRows;
  },

  eliminar: async (id) => {
    const [resultado] = await pool.query(
      'DELETE FROM clientes WHERE id_cliente = ?',
      [id]
    );
    return resultado.affectedRows;
  }
};

module.exports = clientesModelo;