const pedidosModelo = require('../modelo/pedidosModelo');

const pedidosControlador = {
  obtenerTodos: async (req, res) => {
    try {
      const datos = await pedidosModelo.obtenerTodos();
      res.status(200).json({ exito: true, datos });
    } catch (error) {
      res.status(500).json({ exito: false, mensaje: 'Error al obtener pedidos', error: error.message });
    }
  },

  obtenerPorId: async (req, res) => {
    try {
      const { id } = req.params;
      const pedido = await pedidosModelo.obtenerPorId(id);
      if (!pedido) {
        return res.status(404).json({ exito: false, mensaje: 'Pedido no encontrado' });
      }
      res.status(200).json({ exito: true, datos: pedido });
    } catch (error) {
      res.status(500).json({ exito: false, mensaje: 'Error al buscar el pedido', error: error.message });
    }
  },

  obtenerConCliente: async (req, res) => {
    try {
      const datos = await pedidosModelo.obtenerConCliente();
      res.status(200).json({ exito: true, datos });
    } catch (error) {
      res.status(500).json({ exito: false, mensaje: 'Error al obtener pedidos con cliente', error: error.message });
    }
  },

  crear: async (req, res) => {
    try {
      const { id_cliente, id_empleado, fecha_pedido, canal } = req.body;
      if (!fecha_pedido || !canal) {
        return res.status(400).json({ exito: false, mensaje: 'La fecha_pedido y el canal son obligatorios' });
      }
      const id = await pedidosModelo.crear({ id_cliente, id_empleado, fecha_pedido, canal });
      res.status(201).json({ exito: true, mensaje: 'Pedido creado', id });
    } catch (error) {
      res.status(500).json({ exito: false, mensaje: 'Error al crear pedido', error: error.message });
    }
  },

  actualizar: async (req, res) => {
    try {
      const { id } = req.params;
      const { id_cliente, id_empleado, fecha_pedido, canal } = req.body;
      if (!fecha_pedido || !canal) {
        return res.status(400).json({ exito: false, mensaje: 'La fecha_pedido y el canal son obligatorios' });
      }
      const filas = await pedidosModelo.actualizar(id, { id_cliente, id_empleado, fecha_pedido, canal });
      if (filas === 0) {
        return res.status(404).json({ exito: false, mensaje: 'Pedido no encontrado' });
      }
      res.status(200).json({ exito: true, mensaje: 'Pedido actualizado' });
    } catch (error) {
      res.status(500).json({ exito: false, mensaje: 'Error al actualizar pedido', error: error.message });
    }
  },

  eliminar: async (req, res) => {
    try {
      const { id } = req.params;
      const filas = await pedidosModelo.eliminar(id);
      if (filas === 0) {
        return res.status(404).json({ exito: false, mensaje: 'Pedido no encontrado' });
      }
      res.status(200).json({ exito: true, mensaje: 'Pedido eliminado' });
    } catch (error) {
      res.status(500).json({ exito: false, mensaje: 'Error al eliminar pedido', error: error.message });
    }
  }
};

module.exports = pedidosControlador;