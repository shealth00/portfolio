// server.js — static file server + the contact form's backend.
//
// The frontend never talks to Supabase directly and never sees a database
// key: it POSTs to /api/contact on this same origin, and this server makes
// the Supabase call itself with the service_role key, which lives only in
// this process's environment (SUPABASE_SERVICE_KEY), never in a response
// sent to the browser.

require('dotenv').config();
const path = require('path');
const express = require('express');
const { createClient } = require('@supabase/supabase-js');

const app = express();
const PORT = process.env.PORT || 3000;

const supabase =
  process.env.SUPABASE_URL && process.env.SUPABASE_SERVICE_KEY
    ? createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_KEY)
    : null;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.post('/api/contact', async (req, res) => {
  const { name, email, project, message } = req.body || {};
  if (!name || !email || !message) {
    return res.status(400).json({ error: 'name, email, and message are required' });
  }
  if (!supabase) {
    console.warn('Contact form submitted but SUPABASE_URL / SUPABASE_SERVICE_KEY are not set — dropping:', { name, email, project });
    return res.status(503).json({ error: 'Contact storage is not configured yet' });
  }

  const { error } = await supabase
    .from('contact_submissions')
    .insert({ name, email, project_type: project || null, message });

  if (error) {
    console.error('Failed to store contact submission:', error.message);
    return res.status(500).json({ error: 'Could not store submission' });
  }
  res.json({ ok: true });
});

app.get('/healthz', (req, res) => res.json({ ok: true }));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Portfolio server listening on port ${PORT}`);
});
