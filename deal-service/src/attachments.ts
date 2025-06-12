import express from 'express';
import { publish } from './nats';

const router = express.Router();

router.post('/deal/:id/attachment', async (req, res) => {
  // In reality we'd stream to S3 and invoke ClamAV lambda.
  const { id } = req.params;
  const file = req.files?.file; // using any file middleware
  if (!file) return res.status(400).send('no file');
  await publish('ATTACHMENT_ADDED', { dealId: id, name: file.name, size: file.size, mime: file.mimetype });
  res.json({ ok: true });
});

export default router;
