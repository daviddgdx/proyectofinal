
const express = require('express');
const router = express.Router();

const CategoriasControlador = require('../controlador/categoriasControlador');

// Consultar todas las categorias
router.get('/', CategoriasControlador.obtenerCategorias);

// Consultar una categoria por ID
router.get('/:id', CategoriasControlador.obtenerCategoriaPorId);

// Crear una categoria
router.post('/', CategoriasControlador.crearCategoria);

// Actualizar una categoria
router.put('/:id', CategoriasControlador.actualizarCategoria);

// Eliminar una categoria
router.delete('/:id', CategoriasControlador.eliminarCategoria);

module.exports = router;
