const express = require('express');
const router = express.Router();
const clientesControlador = require('../controlador/clientesControlador');

router.get('/', clientesControlador.obtenerTodos);
router.get('/:id', clientesControlador.obtenerPorId);
router.post('/', clientesControlador.crear);
router.put('/:id', clientesControlador.actualizar);
router.delete('/:id', clientesControlador.eliminar);

module.exports = router;