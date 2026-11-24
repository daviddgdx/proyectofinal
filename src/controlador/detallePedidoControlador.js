const detallePedidoModelo = require('../modelo/detallePedidoModelo');

const detallePedidoControlador = {
  obtenerTodos: async (req, res) => {
    try {
      const datos = await detallePedidoModelo.obtenerTodos();
      res.status(200).json({ exito: true, datos });
    } catch (error) {
      res.status(500).json({ exito: false, mensaje: 'Error al obtener detalles de pedido', error: error.message });
    }
  },

  obtenerPorId: async (req, res) => {
    try {
      const { id } = req.params;
      const detalle = await detallePedidoModelo.obtenerPorId(id);
      if (!detalle) {
        return res.status(404).json({ exito: false, mensaje: 'Detalle de pedido no encontrado' });
      }
      res.status(200).json({ exito: true, datos: detalle });
    } catch (error) {
      res.status(500).json({ exito: false, mensaje: 'Error al buscar el detalle de pedido', error: error.message });
    }
  },

  obtenerDetallePorPedido: async (req, res) => {
    try {
      const { id_pedido } = req.params;
      const datos = await detallePedidoModelo.obtenerDetallePorPedido(id_pedido);
      res.status(200).json({ exito: true, datos });
    } catch (error) {
      res.status(500).json({ exito: false, mensaje: 'Error al obtener el detalle del pedido', error: error.message });
    }
  },

  obtenerResumenPorProducto: async (req, res) => {
    try {
      const datos = await detallePedidoModelo.obtenerResumenPorProducto();
      res.status(200).json({ exito: true, datos });
    } catch (error) {
      res.status(500).json({ exito: false, mensaje: 'Error al obtener el resumen por producto', error: error.message });
    }
  },

  crear: async (req, res) => {
    try {
      const { id_pedido, id_producto, cantidad, precio_unitario } = req.body;
      if (!id_pedido || !id_producto || cantidad === undefined || precio_unitario === undefined) {
        return res.status(400).json({ exito: false, mensaje: 'id_pedido, id_producto, cantidad y precio_unitario son obligatorios' });
      }
      const id = await detallePedidoModelo.crear({ id_pedido, id_producto, cantidad, precio_unitario });
      res.status(201).json({ exito: true, mensaje: 'Detalle de pedido creado', id });
    } catch (error) {
      res.status(500).json({ exito: false, mensaje: 'Error al crear detalle de pedido', error: error.message });
    }
  },

  actualizar: async (req, res) => {
    try {
      const { id } = req.params;
      const { id_pedido, id_producto, cantidad, precio_unitario } = req.body;
      if (!id_pedido || !id_producto || cantidad === undefined || precio_unitario === undefined) {
        return res.status(400).json({ exito: false, mensaje: 'id_pedido, id_producto, cantidad y precio_unitario son obligatorios' });
      }
      const filas = await detallePedidoModelo.actualizar(id, { id_pedido, id_producto, cantidad, precio_unitario });
      if (filas === 0) {
        return res.status(404).json({ exito: false, mensaje: 'Detalle de pedido no encontrado' });
      }
      res.status(200).json({ exito: true, mensaje: 'Detalle de pedido actualizado' });
    } catch (error) {
      res.status(500).json({ exito: false, mensaje: 'Error al actualizar detalle de pedido', error: error.message });
    }
  },

  eliminar: async (req, res) => {
    try {
      const { id } = req.params;
      const filas = await detallePedidoModelo.eliminar(id);
      if (filas === 0) {
        return res.status(404).json({ exito: false, mensaje: 'Detalle de pedido no encontrado' });
      }
      res.status(200).json({ exito: true, mensaje: 'Detalle de pedido eliminado' });
    } catch (error) {
      res.status(500).json({ exito: false, mensaje: 'Error al eliminar detalle de pedido', error: error.message });
    }
  }
};

module.exports = detallePedidoControlador;