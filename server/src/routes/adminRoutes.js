import express from 'express';
import * as adminCtrl from '../controllers/adminController.js';
import auth from '../middleware/auth.js';
const router = express.Router();

router.use(auth);

router.post('/forms', adminCtrl.createForm);
router.get('/forms', adminCtrl.listForms);
router.get('/forms/:id', adminCtrl.getForm);
router.put('/forms/:id', adminCtrl.updateForm);
router.delete('/forms/:id', adminCtrl.deleteForm);
router.get('/forms/:formId/submissions', adminCtrl.listSubmissions);

export default router;
