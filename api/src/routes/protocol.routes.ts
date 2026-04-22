import { Router } from 'express';
import * as lendingController from '../controllers/lending.controller';
import { requireRole } from '../middleware/rbac';

const router: Router = Router();

/**
 * @openapi
 * /protocol/stats:
 *   get:
 *     summary: Get protocol-level statistics
 *     description: Returns cached protocol analytics sourced from the smart contract state.
 *     tags:
 *       - Protocol
 *     responses:
 *       200:
 *         description: Protocol statistics
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ProtocolStatsResponse'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.get('/stats', lendingController.protocolStats);
router.get('/pause-status', requireRole('operator'), lendingController.getPauseStatus);
router.post('/pause', requireRole('admin'), lendingController.setManualPause);
router.post('/resume', requireRole('admin'), lendingController.resumeProtocol);
router.get('/roles', requireRole('operator'), lendingController.listRoleAssignments);
router.post('/roles/assign', requireRole('admin'), lendingController.assignAccessRole);
router.post('/roles/revoke', requireRole('admin'), lendingController.revokeAccessRole);

export default router;
