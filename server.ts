import 'dotenv/config';
import express, { type Request, type Response } from 'express';
import { existsSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { sendTelegramContact } from './telegramContact.ts';

const __dirname = dirname(fileURLToPath(import.meta.url));
const port = Number(process.env.PORT ?? 3000);
const app = express();

app.use(express.json({ limit: '16kb' }));

app.post('/api/contact', async (request: Request, response: Response) => {
  const result = await sendTelegramContact(request.body);
  response.status(result.status).json(result.ok ? { ok: true } : { error: result.error });
});

const distPath = join(__dirname, 'dist');

if (existsSync(distPath)) {
  app.use(express.static(distPath));
  app.get('*', (_request, response) => {
    response.sendFile(join(distPath, 'index.html'));
  });
}

app.listen(port, '0.0.0.0', () => {
  console.log(`Portfolio server running at http://localhost:${port}`);
});
