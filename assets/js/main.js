/* â”€â”€ NAV â”€â”€ */
function toggleMenu(){
  const navLinks = document.getElementById('navLinks');
  const hamburger = document.querySelector('.hamburger');
  navLinks.classList.toggle('open');
  hamburger.classList.toggle('active');
  document.body.classList.toggle('menu-open', navLinks.classList.contains('open'));
}

function closeMenu(){
  const navLinks = document.getElementById('navLinks');
  const hamburger = document.querySelector('.hamburger');
  navLinks.classList.remove('open');
  hamburger.classList.remove('active');
  document.body.classList.remove('menu-open');
}

document.querySelectorAll('#navLinks a').forEach(a => {
  a.addEventListener('click', () => {
    closeMenu();
  });
});

document.addEventListener('click', (e) => {
  const navLinks = document.getElementById('navLinks');
  const hamburger = document.querySelector('.hamburger');
  if (window.innerWidth > 768 || !navLinks.classList.contains('open')) return;
  if (navLinks.contains(e.target) || hamburger.contains(e.target)) return;
  closeMenu();
});

/* â”€â”€ SCROLL REVEAL â”€â”€ */
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => { if(e.isIntersecting){ e.target.classList.add('visible'); }});
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

/* â”€â”€ NAV SCROLL â”€â”€ */
window.addEventListener('scroll', () => {
  document.getElementById('navbar').style.background =
    window.scrollY > 50 ? 'rgba(13,42,26,.97)' : 'rgba(26,74,46,.92)';
  
  /* Show/hide scroll to top button */
  const btn = document.getElementById('scrollToTopBtn');
  const threshold = window.innerWidth <= 768 ? 100 : 300;
  if (window.scrollY > threshold) {
    btn.classList.add('show');
  } else {
    btn.classList.remove('show');
  }
});

/* â”€â”€ SCROLL TO TOP â”€â”€ */
document.getElementById('scrollToTopBtn').addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

/* â”€â”€ MODAL â”€â”€ */
function openModal(){
  document.getElementById('modalOverlay').classList.add('active');
  document.getElementById('formView').style.display = 'block';
  document.getElementById('successView').style.display = 'none';
  document.body.style.overflow = 'hidden';
}
function closeModal(){
  document.getElementById('modalOverlay').classList.remove('active');
  document.body.style.overflow = '';
}
function closeOnOverlay(e){
  if(e.target === document.getElementById('modalOverlay')) closeModal();
}
document.addEventListener('keydown', e => { if(e.key==='Escape') closeModal(); });

/* â”€â”€ SUBMIT â”€â”€ */
function submitForm(){
  const name    = document.getElementById('name').value.trim();
  const mobile  = document.getElementById('mobile').value.trim();
  const enquiry = document.getElementById('enquiry').value;
  const message = document.getElementById('message').value.trim();

  if(!name)    { alert('Please enter your name.'); return; }
  if(!mobile)  { alert('Please enter your mobile number.'); return; }
  if(!enquiry) { alert('Please select an enquiry type.'); return; }

  /* Build HTML table for email body (mailto fallback) */
  const table = `
  <table border="1" cellpadding="10" cellspacing="0" style="border-collapse:collapse;width:100%;font-family:sans-serif;">
    <thead style="background:#2d6a4f;color:#fff;">
      <tr><th colspan="2">Shetkari Irrigation - New Enquiry</th></tr>
    </thead>
    <tbody>
      <tr><td><strong>Name</strong></td><td>${name}</td></tr>
      <tr><td><strong>Mobile</strong></td><td>${mobile}</td></tr>
      <tr><td><strong>Enquiry Type</strong></td><td>${enquiry}</td></tr>
      <tr><td><strong>Message</strong></td><td>${message || '-'}</td></tr>
      <tr><td><strong>Date</strong></td><td>${new Date().toLocaleString('en-IN')}</td></tr>
    </tbody>
  </table>`;

  /* Show summary in modal */
  document.getElementById('summaryTable').innerHTML = table.replace(/<table/,'<table style="font-size:.8rem"');

  /* Open mailto (replace with actual backend / EmailJS as needed) */
  const subject = encodeURIComponent(`New Enquiry from ${name} - ${enquiry}`);
  const body    = encodeURIComponent(
    `New Enquiry Received\n\nName: ${name}\nMobile: ${mobile}\nEnquiry Type: ${enquiry}\nMessage: ${message || '-'}\nDate: ${new Date().toLocaleString('en-IN')}`
  );
  window.location.href = `mailto:contact@shetkariirrigation.com?subject=${subject}&body=${body}`;

  /* Show success */
  document.getElementById('formView').style.display  = 'none';
  document.getElementById('successView').style.display = 'block';

  /* Reset */
  ['name','mobile','message'].forEach(id => document.getElementById(id).value = '');
  document.getElementById('enquiry').selectedIndex = 0;
<<<<<<< HEAD
}
=======
}
>>>>>>> master
