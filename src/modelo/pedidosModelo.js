const pool = require('../config/bd');

const pedidosModelo = {
  obtenerTodos: async () => {
    const [filas] = await pool.query('SELECT * FROM pedidos');
    return filas;
  },

  obtenerPorId: async (id) => {
    const [filas] = await pool.query(
      'SELECT * FROM pedidos WHERE id_pedido = ?',
      [id]
    );
    return filas[0];
  },

  obtenerConCliente: async () => {
    const [filas] = await pool.query(`
      SELECT p.id_pedido, p.id_cliente, c.nombre AS nombre_cliente, p.fecha_pedido, p.canal
      FROM pedidos p
      INNER JOIN clientes c ON p.id_cliente = c.id_cliente
    `);
    return filas;
  },

  crear: async ({ id_cliente, id_empleado, fecha_pedido, canal }) => {
    const [resultado] = await pool.query(
      'INSERT INTO pedidos (id_cliente, id_empleado, fecha_pedido, canal) VALUES (?, ?, ?, ?)',
      [id_cliente, id_empleado, fecha_pedido, canal]
    );
    return resultado.insertId;
  },

  actualizar: async (id, { id_cliente, id_empleado, fecha_pedido, canal }) => {
    const [resultado] = await pool.query(
      'UPDATE pedidos SET id_cliente = ?, id_empleado = ?, fecha_pedido = ?, canal = ? WHERE id_pedido = ?',
      [id_cliente, id_empleado, fecha_pedido, canal, id]
    );
    return resultado.affectedRows;
  },

  eliminar: async (id) => {
    const [resultado] = await pool.query(
      'DELETE FROM pedidos WHERE id_pedido = ?',
      [id]
    );
    return resultado.affectedRows;
  }
};

module.exports = pedidosModelo;