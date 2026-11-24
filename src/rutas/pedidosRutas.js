const express = require('express');
const router = express.Router();
const pedidosControlador = require('../controlador/pedidosControlador');

router.get('/', pedidosControlador.obtenerTodos);
router.get('/cliente', pedidosControlador.obtenerConCliente);
router.get('/:id', pedidosControlador.obtenerPorId);
router.post('/', pedidosControlador.crear);
router.put('/:id', pedidosControlador.actualizar);
router.delete('/:id', pedidosControlador.eliminar);

module.exports = router;