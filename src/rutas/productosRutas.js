const express = require('express');
const router = express.Router();
const productosControlador = require('../controlador/productosControlador');

router.get('/', productosControlador.obtenerTodos);
router.get('/categoria', productosControlador.obtenerConCategoria);
router.get('/:id', productosControlador.obtenerPorId);
router.post('/', productosControlador.crear);
router.put('/:id', productosControlador.actualizar);
router.delete('/:id', productosControlador.eliminar);

module.exports = router;