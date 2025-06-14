const express = require('express');
const router = express.Router();
const { syncProdToCrm } = require('../controllers/syncProdToCrm.js')
const verifyHeaderToken = require('../middleware/authMiddleware.js')
const orderController = require('../controllers/orderController.js')
const dateOrder = require('../controllers/dateSyncController.js')
const syncController = require('../controllers/syncOrder.js');
const  syncDate  = require('../controllers/dateSyncProdToCrm.js');
const { syncOrderById } = require('../controllers/syncOrderById.js');

router.post('/syncOrderById',verifyHeaderToken, syncOrderById);
router.post('/syncCrmByDate',verifyHeaderToken, syncDate.syncOrdersByDate);
router.post('/itemCount',verifyHeaderToken, syncController.getOrdersWithItems);
router.post('/syncCrm',verifyHeaderToken, syncProdToCrm);
router.post('/dateItems',verifyHeaderToken,dateOrder.getDateOrdersWithItems);
router.post('/create', orderController.createOrSyncOrder);

module.exports = router;
