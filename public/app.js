// app.js — category filter pills for the Writing section, and the contact
// form (POSTs to this app's own /api/contact endpoint, which is the only
// thing that talks to Supabase — no database keys ever reach the browser).

(function () {
  const pills = document.querySelectorAll('.pill');
  const cards = document.querySelectorAll('#samples .card');
  pills.forEach((pill) => {
    pill.addEventListener('click', () => {
      pills.forEach((p) => p.classList.remove('active'));
      pill.classList.add('active');
      const filter = pill.dataset.filter;
      cards.forEach((card) => {
        const cats = (card.dataset.cat || '').split(' ');
        card.style.display = filter === 'all' || cats.includes(filter) ? '' : 'none';
      });
    });
  });
})();

(function () {
  const form = document.getElementById('contact-form');
  const status = document.getElementById('cf-status');
  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const payload = {
      name: document.getElementById('cf-name').value.trim(),
      email: document.getElementById('cf-email').value.trim(),
      project: document.getElementById('cf-project').value,
      message: document.getElementById('cf-message').value.trim(),
    };
    if (!payload.name || !payload.email || !payload.message) return;

    const submitBtn = form.querySelector('button[type="submit"]');
    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending…';
    status.hidden = true;

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error('Request failed');
      status.textContent = 'Thanks — your message is in. I’ll reply soon.';
      status.className = 'form-status ok';
      status.hidden = false;
      form.reset();
    } catch (err) {
      status.textContent = 'Something went wrong sending that — please try again in a moment.';
      status.className = 'form-status err';
      status.hidden = false;
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = 'Send';
    }
  });
})();
