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

  crear: async ({ nombre, correo, telefono, direccion }) => {
    const [resultado] = await pool.query(
      'INSERT INTO clientes (nombre, correo, telefono, direccion) VALUES (?, ?, ?, ?)',
      [nombre, correo, telefono, direccion]
    );
    return resultado.insertId;
  },

  actualizar: async (id, { nombre, correo, telefono, direccion }) => {
    const [resultado] = await pool.query(
      'UPDATE clientes SET nombre = ?, correo = ?, telefono = ?, direccion = ? WHERE id_cliente = ?',
      [nombre, correo, telefono, direccion, id]
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