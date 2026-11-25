const CategoriasModelo = require('../modelo/categoriasModelo');

class CategoriasControlador {
  static async obtenerCategorias(req, res) {
    try {
      const datos = await CategoriasModelo.obtenerTodas();
      res.status(200).json({ exito: true, datos });
    } catch (error) {
      console.error(error);
      res.status(500).json({ exito: false, mensaje: 'Error al obtener las categorías' });
    }
  }

  static async obtenerCategoriaPorId(req, res) {
    try {
      const { id } = req.params;
      const categoria = await CategoriasModelo.obtenerPorId(id);
      if (!categoria) {
        return res.status(404).json({ exito: false, mensaje: 'Categoría no encontrada' });
      }
      res.status(200).json({ exito: true, datos: categoria });
    } catch (error) {
      console.error(error);
      res.status(500).json({ exito: false, mensaje: 'Error al obtener la categoría' });
    }
  }

  static async crearCategoria(req, res) {
    try {
      const { nombre } = req.body;
      if (!nombre || !nombre.trim()) {
        return res.status(400).json({
          exito: false,
          mensaje: 'El nombre de la categoría es requerido'
        });
      }
      const nueva = await CategoriasModelo.crear(nombre.trim());
      res.status(201).json({
        exito: true,
        mensaje: 'Categoría creada correctamente',
        datos: nueva
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ exito: false, mensaje: 'Error al crear la categoría' });
    }
  }

  static async actualizarCategoria(req, res) {
    try {
      const { id } = req.params;
      const { nombre } = req.body;
      if (!nombre || !nombre.trim()) {
        return res.status(400).json({
          exito: false,
          mensaje: 'El nombre de la categoría es requerido'
        });
      }
      const actualizada = await CategoriasModelo.actualizar(id, nombre.trim());
      if (!actualizada) {
        return res.status(404).json({ exito: false, mensaje: 'Categoría no encontrada' });
      }
      res.status(200).json({
        exito: true,
        mensaje: 'Categoría actualizada correctamente',
        datos: { id_categoria: Number(id), nombre: nombre.trim() }
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ exito: false, mensaje: 'Error al actualizar la categoría' });
    }
  }

  static async eliminarCategoria(req, res) {
    try {
      const { id } = req.params;
      const eliminada = await CategoriasModelo.eliminar(id);
      if (!eliminada) {
        return res.status(404).json({ exito: false, mensaje: 'Categoría no encontrada' });
      }
      res.status(200).json({
        exito: true,
        mensaje: 'Categoría eliminada correctamente'
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ exito: false, mensaje: 'Error al eliminar la categoría' });
    }
  }
}

module.exports = CategoriasControlador;