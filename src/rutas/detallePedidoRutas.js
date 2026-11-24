const express = require('express');
const router = express.Router();
const detallePedidoControlador = require('../controlador/detallePedidoControlador');

router.get('/', detallePedidoControlador.obtenerTodos);
router.get('/resumen/productos', detallePedidoControlador.obtenerResumenPorProducto);
router.get('/pedido/:id_pedido', detallePedidoControlador.obtenerDetallePorPedido);
router.get('/:id', detallePedidoControlador.obtenerPorId);
router.post('/', detallePedidoControlador.crear);
router.put('/:id', detallePedidoControlador.actualizar);
router.delete('/:id', detallePedidoControlador.eliminar);

module.exports = router;