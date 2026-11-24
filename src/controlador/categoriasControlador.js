const CategoriasModelo = require('../modelo/categoriasModelo');

class CategoriasControlador {
    static async obtenerCategorias(req, res) {
        try {
            const categorias = await CategoriasModelo.obtenerTodos();
            return res.status(200).json({ exito: true, datos: categorias });
        } catch (error) {
            return res.status(500).json({ exito: false, mensaje: 'Error al obtener las categorías' });
        }
    }

    static async obtenerCategoriaPorId(req, res) {
        try {
            const categoria = await CategoriasModelo.obtenerPorId(req.params.id);
            if (!categoria) {
                return res.status(404).json({ exito: false, mensaje: 'Categoría no encontrada' });
            }
            return res.status(200).json({ exito: true, datos: categoria });
        } catch (error) {
            return res.status(500).json({ exito: false, mensaje: 'Error al obtener la categoría' });
        }
    }

    static async crearCategoria(req, res) {
        try {
            const { nombre } = req.body || {};
            if (!nombre) {
                return res.status(400).json({ exito: false, mensaje: 'El nombre de la categoría es requerido' });
            }
            const categoria = await CategoriasModelo.crearCategoria(nombre);
            return res.status(201).json({ exito: true, datos: categoria });
        } catch (error) {
            return res.status(500).json({ exito: false, mensaje: 'Error al crear la categoría' });
        }
    }

    static async actualizarCategoria(req, res) {
        try {
            const { id } = req.params;
            const { campo, valor, nombre } = req.body || {};

            const campoFinal = campo || (nombre !== undefined ? 'nombre' : null);
            const valorFinal = valor !== undefined ? valor : nombre;

            if (!campoFinal || valorFinal === undefined) {
                return res.status(400).json({ exito: false, mensaje: 'Envía "campo" y "valor" (o "nombre") para actualizar' });
            }

            const existente = await CategoriasModelo.obtenerPorId(id);
            if (!existente) {
                return res.status(404).json({ exito: false, mensaje: 'Categoría no encontrada' });
            }

            const categoria = await CategoriasModelo.actualizarCategoria(id, campoFinal, valorFinal);
            return res.status(200).json({ exito: true, datos: categoria });
        } catch (error) {
            return res.status(500).json({ exito: false, mensaje: 'Error al actualizar la categoría' });
        }
    }

    static async eliminarCategoria(req, res) {
        try {
            const { id } = req.params;
            const existente = await CategoriasModelo.obtenerPorId(id);
            if (!existente) {
                return res.status(404).json({ exito: false, mensaje: 'Categoría no encontrada' });
            }
            await CategoriasModelo.eliminarCategoria(id);
            return res.status(200).json({ exito: true, mensaje: 'Categoría eliminada correctamente', datos: { id_categoria: id } });
        } catch (error) {
            return res.status(500).json({ exito: false, mensaje: 'Error al eliminar la categoría' });
        }
    }
}

module.exports = CategoriasControlador;