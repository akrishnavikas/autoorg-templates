document.addEventListener('DOMContentLoaded', () => {
  const detailPage = document.querySelector('.detail-page');
  if (!detailPage) return;

  const panels = [...document.querySelectorAll('.step-panel')];
  const tabs = [...document.querySelectorAll('.step-tab')];
  const autonomyRadios = [...document.querySelectorAll('input[name="autonomy"]')];
  const sideAutonomy = document.getElementById('sideAutonomy');
  const reviewAutonomy = document.getElementById('reviewAutonomy');
  const toast = document.getElementById('toast');

  function showStep(step) {
    panels.forEach(p => p.classList.toggle('active', p.dataset.panel === step));
    tabs.forEach(t => t.classList.toggle('active', t.dataset.step === step));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  tabs.forEach(tab => tab.addEventListener('click', () => showStep(tab.dataset.step)));
  document.querySelectorAll('.next-step').forEach(btn => btn.addEventListener('click', () => showStep(btn.dataset.next)));
  document.querySelectorAll('.prev-step').forEach(btn => btn.addEventListener('click', () => showStep(btn.dataset.prev)));

  function syncAutonomy() {
    const checked = autonomyRadios.find(r => r.checked);
    if (!checked) return;
    sideAutonomy.textContent = checked.value;
    reviewAutonomy.textContent = checked.value;
  }
  autonomyRadios.forEach(r => r.addEventListener('change', syncAutonomy));

  const sampleButton = document.getElementById('fillSamples');
  if (sampleButton) {
    sampleButton.addEventListener('click', () => {
      document.querySelectorAll('[data-sample]').forEach(el => {
        el.value = el.dataset.sample;
      });
      sampleButton.textContent = 'Sample values reset ✓';
      setTimeout(() => sampleButton.textContent = 'Use sample values', 1800);
    });
  }

  function getFormSnapshot() {
    const snapshot = {};
    document.querySelectorAll('[data-key]').forEach(el => { snapshot[el.dataset.key] = el.value; });
    const checked = document.querySelector('input[name="autonomy"]:checked');
    snapshot.autonomy = checked ? checked.value : '';
    snapshot.tools = [...document.querySelectorAll('[data-tool]:checked')].map(el => el.dataset.tool);
    snapshot.delegation = {};
    document.querySelectorAll('.delegation-row').forEach(row => {
      const task = row.querySelector('strong')?.textContent.trim();
      const selected = row.querySelector('input:checked');
      if (task && selected) snapshot.delegation[task] = selected.value;
    });
    return snapshot;
  }

  function renderToast(title, message) {
    toast.querySelector('strong').textContent = title;
    toast.querySelector('p').textContent = message;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 3000);
  }

  document.getElementById('previewButton')?.addEventListener('click', () => {
    const snapshot = getFormSnapshot();
    console.info('AutoOrg demo configuration snapshot:', snapshot);
    renderToast('Demo preview ready', 'Configuration snapshot generated locally. No backend action was executed.');
  });

  document.getElementById('demoSpawn')?.addEventListener('click', () => {
    renderToast('Spawn is simulated', 'This UI intentionally does not create an organization or contact external services.');
  });

  syncAutonomy();
});
