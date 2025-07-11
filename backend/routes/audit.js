import Router from 'express';
const router =Router();
import {fetchAudit, editAuditInfo} from '../controller/audit.js';
router.get('/fetchAudit', fetchAudit);
router.post('/editAudit/:id', editAuditInfo); 
export default router;