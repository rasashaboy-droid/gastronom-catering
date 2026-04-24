// Yandex Cloud Function: принимает заявки с сайта и шлёт в Telegram.
// BOT_TOKEN и CHAT_ID берутся из переменных окружения функции.
// В коде секретов нет — безопасно.

const BOT_TOKEN = process.env.BOT_TOKEN;
const CHAT_ID = process.env.CHAT_ID;
// Список разрешённых origin'ов через запятую — кто может слать заявки.
// Пример: "https://rasashaboy-droid.github.io,https://gastronom-catering.ru"
const ALLOWED_ORIGINS = (process.env.ALLOWED_ORIGINS || '').split(',').map(s => s.trim()).filter(Boolean);

// Простейший rate-limit: храним in-memory (сбрасывается при перезапуске функции).
// Более серьёзный вариант — через Yandex Database или Redis.
const RL_WINDOW_MS = 60 * 1000; // 1 минута
const RL_MAX = 5;                // максимум 5 заявок с одного IP за минуту
const rlMap = new Map();

const cleanStr = (s, max = 500) => String(s || '').replace(/[<>]/g, '').slice(0, max).trim();

const getOrigin = (event) => {
  const headers = event.headers || {};
  return headers.origin || headers.Origin || headers.ORIGIN || '';
};

const corsHeaders = (origin) => {
  const allowed = ALLOWED_ORIGINS.length === 0 || ALLOWED_ORIGINS.includes(origin);
  return {
    'Access-Control-Allow-Origin': allowed ? origin || '*' : 'null',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Max-Age': '86400',
  };
};

const labelForSource = (source) => ({
  'quote-modal-price':      'Расчёт стоимости (модалка)',
  'quote-modal-menu':       'Индивидуальное меню (модалка)',
  'quote-modal-gastroboxes':'Заказ гастробоксов (модалка)',
  'quiz':                   'Квиз-калькулятор',
  'consult':                'Остались вопросы? (карточка)',
  'final-cta':              'Финальная форма (низ страницы)',
  'cart':                   'Оформление заказа (корзина)',
}[source] || source || 'Заявка с сайта');

const formatRub = (n) => {
  const num = Number(n);
  if (!Number.isFinite(num)) return '—';
  return num.toLocaleString('ru-RU') + ' ₽';
};

const budgetLabel = (b) => ({
  low: '600–1 200 ₽',
  mid: '1 200 – 2 000 ₽',
  high: '2 000 – 3 000 ₽',
  top: '3 000+ ₽',
}[b] || b || '—');

const eventLabel = (e) => ({
  bday: 'День рождения',
  wedding: 'Свадьба',
  banket: 'Банкет',
  corporate: 'Корпоратив',
  party: 'Вечеринка',
  other: 'Другое',
}[e] || e || '—');

const formatMessage = (data) => {
  const lines = [];
  lines.push(`🔔 <b>Новая заявка</b> — ${labelForSource(data.source)}`);
  lines.push('');

  if (data.name)  lines.push(`👤 <b>Имя:</b> ${cleanStr(data.name, 100)}`);
  if (data.phone) lines.push(`📱 <b>Телефон:</b> ${cleanStr(data.phone, 40)}`);

  const q = data.quiz || {};
  if (q.event)  lines.push(`🎉 <b>Событие:</b> ${eventLabel(q.event)}`);
  if (q.people) lines.push(`👥 <b>Гостей:</b> ${cleanStr(q.people, 20)}`);
  if (q.budget) lines.push(`💰 <b>Бюджет на персону:</b> ${budgetLabel(q.budget)}`);

  if (data.format) lines.push(`📦 <b>Формат:</b> ${cleanStr(data.format, 50)}`);

  // Позиции корзины
  const c = data.cart || {};
  if (Array.isArray(c.items) && c.items.length > 0) {
    lines.push('');
    lines.push(`🛒 <b>Позиции в корзине:</b>`);
    c.items.slice(0, 50).forEach((it) => {
      const nm = cleanStr(it && it.name, 120);
      const qty = Number(it && it.qty) || 0;
      const price = Number(it && it.price) || 0;
      const sum = qty * price;
      if (nm && qty > 0) {
        lines.push(`• ${nm} — ${qty} × ${formatRub(price)} = <b>${formatRub(sum)}</b>`);
      }
    });
    if (c.items.length > 50) {
      lines.push(`…и ещё ${c.items.length - 50}`);
    }
    if (c.count) lines.push(`<b>Всего позиций:</b> ${Number(c.count) || 0}`);
    if (c.total != null) lines.push(`<b>Итого:</b> ${formatRub(c.total)}`);
  }

  lines.push('');
  if (data.page)    lines.push(`🔗 <i>${cleanStr(data.page, 300)}</i>`);
  if (data.referer) lines.push(`↪️ <i>Откуда: ${cleanStr(data.referer, 300)}</i>`);

  const ts = new Date().toLocaleString('ru-RU', { timeZone: 'Europe/Moscow' });
  lines.push(`🕒 <i>${ts} МСК</i>`);

  return lines.join('\n');
};

const sendToTelegram = async (text) => {
  const url = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;
  const body = JSON.stringify({
    chat_id: CHAT_ID,
    text,
    parse_mode: 'HTML',
    disable_web_page_preview: true,
  });
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body,
  });
  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Telegram API ${res.status}: ${err}`);
  }
};

const checkRateLimit = (ip) => {
  const now = Date.now();
  const entry = rlMap.get(ip) || { count: 0, start: now };
  if (now - entry.start > RL_WINDOW_MS) {
    entry.count = 0;
    entry.start = now;
  }
  entry.count += 1;
  rlMap.set(ip, entry);
  return entry.count <= RL_MAX;
};

module.exports.handler = async (event) => {
  const origin = getOrigin(event);
  const cors = corsHeaders(origin);

  // Preflight
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 204, headers: cors, body: '' };
  }

  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, headers: cors, body: JSON.stringify({ ok: false, error: 'method not allowed' }) };
  }

  // Origin check (если список пуст — пропускаем)
  if (ALLOWED_ORIGINS.length > 0 && !ALLOWED_ORIGINS.includes(origin)) {
    return { statusCode: 403, headers: cors, body: JSON.stringify({ ok: false, error: 'origin not allowed' }) };
  }

  // Rate limit по IP
  const ip = (event.headers && (event.headers['X-Forwarded-For'] || event.headers['x-forwarded-for']) || '').split(',')[0].trim() || 'unknown';
  if (!checkRateLimit(ip)) {
    return { statusCode: 429, headers: cors, body: JSON.stringify({ ok: false, error: 'too many requests' }) };
  }

  let data;
  try {
    data = JSON.parse(event.body || '{}');
  } catch (e) {
    return { statusCode: 400, headers: cors, body: JSON.stringify({ ok: false, error: 'bad json' }) };
  }

  // Honeypot: если заполнено скрытое поле — молча игнорируем (бот)
  if (data.hp_field) {
    return { statusCode: 200, headers: cors, body: JSON.stringify({ ok: true }) };
  }

  // Минимальная валидация: нужен телефон
  const phoneDigits = String(data.phone || '').replace(/\D/g, '');
  if (phoneDigits.length < 10) {
    return { statusCode: 400, headers: cors, body: JSON.stringify({ ok: false, error: 'phone required' }) };
  }

  try {
    const text = formatMessage(data);
    await sendToTelegram(text);
    return { statusCode: 200, headers: cors, body: JSON.stringify({ ok: true }) };
  } catch (e) {
    console.error('Telegram send failed:', e);
    return { statusCode: 500, headers: cors, body: JSON.stringify({ ok: false, error: 'delivery failed' }) };
  }
};
