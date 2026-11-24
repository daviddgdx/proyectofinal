const productosModelo = require('../modelo/productosModelo');

const productosControlador = {
  obtenerTodos: async (req, res) => {
    try {
      const datos = await productosModelo.obtenerTodos();
      res.status(200).json({ exito: true, datos });
    } catch (error) {
      res.status(500).json({ exito: false, mensaje: 'Error al obtener productos', error: error.message });
    }
  },

  obtenerPorId: async (req, res) => {
    try {
      const { id } = req.params;
      const producto = await productosModelo.obtenerPorId(id);
      if (!producto) {
        return res.status(404).json({ exito: false, mensaje: 'Producto no encontrado' });
      }
      res.status(200).json({ exito: true, datos: producto });
    } catch (error) {
      res.status(500).json({ exito: false, mensaje: 'Error al buscar el producto', error: error.message });
    }
  },

  obtenerConCategoria: async (req, res) => {
    try {
      const datos = await productosModelo.obtenerConCategoria();
      res.status(200).json({ exito: true, datos });
    } catch (error) {
      res.status(500).json({ exito: false, mensaje: 'Error al obtener productos con categoría', error: error.message });
    }
  },

  crear: async (req, res) => {
    try {
      const { nombre, id_categoria, precio, costo, stock } = req.body;
      if (!nombre || precio === undefined || costo === undefined || stock === undefined) {
        return res.status(400).json({ exito: false, mensaje: 'Nombre, precio, costo y stock son obligatorios' });
      }
      const id = await productosModelo.crear({ nombre, id_categoria, precio, costo, stock });
      res.status(201).json({ exito: true, mensaje: 'Producto creado', id });
    } catch (error) {
      res.status(500).json({ exito: false, mensaje: 'Error al crear producto', error: error.message });
    }
  },

  actualizar: async (req, res) => {
    try {
      const { id } = req.params;
      const { nombre, id_categoria, precio, costo, stock } = req.body;
      if (!nombre || precio === undefined || costo === undefined || stock === undefined) {
        return res.status(400).json({ exito: false, mensaje: 'Nombre, precio, costo y stock son obligatorios' });
      }
      const filas = await productosModelo.actualizar(id, { nombre, id_categoria, precio, costo, stock });
      if (filas === 0) {
        return res.status(404).json({ exito: false, mensaje: 'Producto no encontrado' });
      }
      res.status(200).json({ exito: true, mensaje: 'Producto actualizado' });
    } catch (error) {
      res.status(500).json({ exito: false, mensaje: 'Error al actualizar producto', error: error.message });
    }
  },

  eliminar: async (req, res) => {
    try {
      const { id } = req.params;
      const filas = await productosModelo.eliminar(id);
      if (filas === 0) {
        return res.status(404).json({ exito: false, mensaje: 'Producto no encontrado' });
      }
      res.status(200).json({ exito: true, mensaje: 'Producto eliminado' });
    } catch (error) {
      res.status(500).json({ exito: false, mensaje: 'Error al eliminar producto', error: error.message });
    }
  }
};

module.exports = productosControlador;