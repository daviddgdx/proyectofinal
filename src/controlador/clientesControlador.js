const clientesModelo = require('../modelo/clientesModelo');

const clientesControlador = {
  obtenerTodos: async (req, res) => {
    try {
      const datos = await clientesModelo.obtenerTodos();
      res.status(200).json({ exito: true, datos });
    } catch (error) {
      res.status(500).json({ exito: false, mensaje: 'Error al obtener clientes', error: error.message });
    }
  },

  obtenerPorId: async (req, res) => {
    try {
      const { id } = req.params;
      const cliente = await clientesModelo.obtenerPorId(id);
      if (!cliente) {
        return res.status(404).json({ exito: false, mensaje: 'Cliente no encontrado' });
      }
      res.status(200).json({ exito: true, datos: cliente });
    } catch (error) {
      res.status(500).json({ exito: false, mensaje: 'Error al buscar el cliente', error: error.message });
    }
  },

  crear: async (req, res) => {
    try {
      const { nombre, correo, telefono, direccion } = req.body;
      if (!nombre) {
        return res.status(400).json({ exito: false, mensaje: 'El nombre es obligatorio' });
      }
      const id = await clientesModelo.crear({ nombre, correo, telefono, direccion });
      res.status(201).json({ exito: true, mensaje: 'Cliente creado', id });
    } catch (error) {
      res.status(500).json({ exito: false, mensaje: 'Error al crear cliente', error: error.message });
    }
  },

  actualizar: async (req, res) => {
    try {
      const { id } = req.params;
      const { nombre, correo, telefono, direccion } = req.body;
      if (!nombre) {
        return res.status(400).json({ exito: false, mensaje: 'El nombre es obligatorio' });
      }
      const filas = await clientesModelo.actualizar(id, { nombre, correo, telefono, direccion });
      if (filas === 0) {
        return res.status(404).json({ exito: false, mensaje: 'Cliente no encontrado' });
      }
      res.status(200).json({ exito: true, mensaje: 'Cliente actualizado' });
    } catch (error) {
      res.status(500).json({ exito: false, mensaje: 'Error al actualizar cliente', error: error.message });
    }
  },

  eliminar: async (req, res) => {
    try {
      const { id } = req.params;
      const filas = await clientesModelo.eliminar(id);
      if (filas === 0) {
        return res.status(404).json({ exito: false, mensaje: 'Cliente no encontrado' });
      }
      res.status(200).json({ exito: true, mensaje: 'Cliente eliminado' });
    } catch (error) {
      res.status(500).json({ exito: false, mensaje: 'Error al eliminar cliente', error: error.message });
    }
  }
};

module.exports = clientesControlador;