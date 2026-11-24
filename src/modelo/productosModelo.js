const pool = require('../config/bd');

const productosModelo = {
  obtenerTodos: async () => {
    const [filas] = await pool.query('SELECT * FROM productos');
    return filas;
  },

  obtenerPorId: async (id) => {
    const [filas] = await pool.query(
      'SELECT * FROM productos WHERE id_producto = ?',
      [id]
    );
    return filas[0];
  },

  obtenerConCategoria: async () => {
    const [filas] = await pool.query(`
      SELECT p.id_producto, p.nombre, p.id_categoria, c.nombre AS nombre_categoria, p.precio, p.costo, p.stock
      FROM productos p
      INNER JOIN categorias c ON p.id_categoria = c.id_categoria
    `);
    return filas;
  },

  crear: async ({ nombre, id_categoria, precio, costo, stock }) => {
    const [resultado] = await pool.query(
      'INSERT INTO productos (nombre, id_categoria, precio, costo, stock) VALUES (?, ?, ?, ?, ?)',
      [nombre, id_categoria, precio, costo, stock]
    );
    return resultado.insertId;
  },

  actualizar: async (id, { nombre, id_categoria, precio, costo, stock }) => {
    const [resultado] = await pool.query(
      'UPDATE productos SET nombre = ?, id_categoria = ?, precio = ?, costo = ?, stock = ? WHERE id_producto = ?',
      [nombre, id_categoria, precio, costo, stock, id]
    );
    return resultado.affectedRows;
  },

  eliminar: async (id) => {
    const [resultado] = await pool.query(
      'DELETE FROM productos WHERE id_producto = ?',
      [id]
    );
    return resultado.affectedRows;
  }
};

module.exports = productosModelo;