import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import type { IncomingMessage } from 'node:http';
import { fileURLToPath, URL } from 'node:url';
import { defineConfig, loadEnv } from 'vite';
import { sendTelegramContact } from './telegramContact';

const readJsonBody = async (request: IncomingMessage) => {
  const chunks: Buffer[] = [];

  for await (const chunk of request) {
    chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk));
  }

  return JSON.parse(Buffer.concat(chunks).toString('utf8'));
};

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '.', '');

  return {
    plugins: [
      {
        name: 'telegram-contact-api',
        configureServer(server) {
          server.middlewares.use('/api/contact', async (request, response, next) => {
            if (request.method !== 'POST') {
              next();
              return;
            }

            try {
              const body = await readJsonBody(request);
              const result = await sendTelegramContact(body);
              response.statusCode = result.status;
              response.setHeader('Content-Type', 'application/json');
              response.end(JSON.stringify(result.ok ? { ok: true } : { error: result.error }));
            } catch (error) {
              console.error('Contact request failed:', error);
              response.statusCode = 400;
              response.setHeader('Content-Type', 'application/json');
              response.end(JSON.stringify({ error: 'Invalid contact request.' }));
            }
          });
        },
      },
      react(),
      tailwindcss(),
    ],
    define: {
      'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY),
    },
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('.', import.meta.url)),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify - file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
    },
  };
});
