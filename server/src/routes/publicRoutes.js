import express from 'express';
import * as pub from '../controllers/publicController.js';

const router = express.Router();

router.get('/forms', pub.getFormsList);
router.get('/forms/:id', pub.fetchFormDefinition);
router.post('/forms/:id/submit', pub.submitForm);

export default router;
