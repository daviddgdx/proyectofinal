const pool = require('../config/bd');

const detallePedidoModelo = {
  obtenerTodos: async () => {
    const [filas] = await pool.query('SELECT * FROM detalle_pedido');
    return filas;
  },

  obtenerPorId: async (id) => {
    const [filas] = await pool.query(
      'SELECT * FROM detalle_pedido WHERE id_detalle = ?',
      [id]
    );
    return filas[0];
  },

  obtenerDetallePorPedido: async (idPedido) => {
    const [filas] = await pool.query(
      `
      SELECT
        dp.id_detalle,
        dp.id_pedido,
        pe.fecha_pedido,
        pe.canal,
        pr.nombre AS nombre_producto,
        dp.cantidad,
        dp.precio_unitario,
        (dp.cantidad * dp.precio_unitario) AS subtotal
      FROM detalle_pedido dp
      INNER JOIN productos pr ON dp.id_producto = pr.id_producto
      INNER JOIN pedidos pe ON dp.id_pedido = pe.id_pedido
      WHERE dp.id_pedido = ?
      `,
      [idPedido]
    );
    return filas;
  },

  obtenerResumenPorProducto: async () => {
    const [filas] = await pool.query(`
      SELECT
        pr.id_producto,
        pr.nombre AS nombre_producto,
        SUM(dp.cantidad) AS total_unidades,
        SUM(dp.cantidad * dp.precio_unitario) AS total_vendido
      FROM detalle_pedido dp
      INNER JOIN productos pr ON dp.id_producto = pr.id_producto
      INNER JOIN pedidos pe ON dp.id_pedido = pe.id_pedido
      GROUP BY pr.id_producto, pr.nombre
      ORDER BY total_vendido DESC
    `);
    return filas;
  },

  crear: async ({ id_pedido, id_producto, cantidad, precio_unitario }) => {
    const [resultado] = await pool.query(
      'INSERT INTO detalle_pedido (id_pedido, id_producto, cantidad, precio_unitario) VALUES (?, ?, ?, ?)',
      [id_pedido, id_producto, cantidad, precio_unitario]
    );
    return resultado.insertId;
  },

  actualizar: async (id, { id_pedido, id_producto, cantidad, precio_unitario }) => {
    const [resultado] = await pool.query(
      'UPDATE detalle_pedido SET id_pedido = ?, id_producto = ?, cantidad = ?, precio_unitario = ? WHERE id_detalle = ?',
      [id_pedido, id_producto, cantidad, precio_unitario, id]
    );
    return resultado.affectedRows;
  },

  eliminar: async (id) => {
    const [resultado] = await pool.query(
      'DELETE FROM detalle_pedido WHERE id_detalle = ?',
      [id]
    );
    return resultado.affectedRows;
  }
};

module.exports = detallePedidoModelo;