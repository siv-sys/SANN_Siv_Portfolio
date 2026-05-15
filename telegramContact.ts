type ContactPayload = {
  name?: unknown;
  email?: unknown;
  subject?: unknown;
  message?: unknown;
};

type ContactResult = {
  ok: boolean;
  status: number;
  error?: string;
};

const cleanText = (value: unknown, maxLength: number) => {
  if (typeof value !== 'string') {
    return '';
  }

  return value.trim().replace(/\r\n/g, '\n').slice(0, maxLength);
};

export async function sendTelegramContact(payload: ContactPayload): Promise<ContactResult> {
  const telegramBotToken = process.env.TELEGRAM_BOT_TOKEN ?? process.env.VITE_TELEGRAM_BOT_TOKEN;
  const telegramChatId = process.env.TELEGRAM_CHAT_ID ?? process.env.VITE_TELEGRAM_CHAT_ID;

  if (!telegramBotToken || !telegramChatId) {
    return { ok: false, status: 503, error: 'Telegram is not configured.' };
  }

  const name = cleanText(payload.name, 120);
  const email = cleanText(payload.email, 160);
  const subject = cleanText(payload.subject, 120);
  const message = cleanText(payload.message, 1500);

  if (!name || !email || !message) {
    return { ok: false, status: 400, error: 'Name, email, and message are required.' };
  }

  const text = [
    'New portfolio message',
    `Name: ${name}`,
    `Email: ${email}`,
    `Subject: ${subject || 'Portfolio message'}`,
    '',
    message,
  ].join('\n');

  try {
    const telegramResponse = await fetch(`https://api.telegram.org/bot${telegramBotToken}/sendMessage`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: telegramChatId,
        text,
      }),
    });

    if (!telegramResponse.ok) {
      const errorText = await telegramResponse.text();
      console.error('Telegram request failed:', errorText);
      return { ok: false, status: 502, error: 'Telegram request failed.' };
    }

    return { ok: true, status: 200 };
  } catch (error) {
    console.error('Contact request failed:', error);
    return { ok: false, status: 502, error: 'Contact request failed.' };
  }
}
