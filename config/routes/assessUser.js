import express from 'express';
import assessUserController from '../../app/controllers/assessUser';

const router = express.Router();

router
  .route('/')
  .get(assessUserController.getAssessUsers)
  .post(assessUserController.createAssessUser);

module.exports = router;
