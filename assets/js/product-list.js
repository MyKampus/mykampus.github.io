function ShimmeringBadge({ text }) {
    const badge = document.createElement('div');
    badge.className = 'popular-badge';
    badge.textContent = text;
    return badge;
  }
  
  function ProductCard({ title, description, price, popular, primaryUrl, secondaryUrl }) {
    const card = document.createElement('div');
    card.className = 'product-card';
  
    if (popular) {
      card.appendChild(ShimmeringBadge({ text: "Paling populer" }));
    }
  
    card.innerHTML = `
      <h3 class="product-title">${title}</h3>
      <p class="product-description">${description}</p>
      <p class="product-price">Rp ${price.toLocaleString()}</p>
      <div class="button-group">
        <div class="primary-button-wrapper">
          <button class="primary-button">Cekout</button>
          <button class="toggle-button">
            <span class="toggle-icon">▼</span>
          </button>
        </div>
      </div>
    `;
  
    const primaryButton = card.querySelector('.primary-button');
    primaryButton.addEventListener('click', () => window.open(primaryUrl, '_blank'));
  
    const toggleButton = card.querySelector('.toggle-button');
    const toggleIcon = toggleButton.querySelector('.toggle-icon');
    let isOpen = false;
  
    toggleButton.addEventListener('click', () => {
      isOpen = !isOpen;
      toggleIcon.classList.toggle('open', isOpen);
      
      if (isOpen) {
        const secondaryButton = document.createElement('button');
        secondaryButton.className = 'secondary-button';
        secondaryButton.textContent = 'Cekout via Stripe';
        secondaryButton.addEventListener('click', () => window.open(secondaryUrl, '_blank'));
        card.querySelector('.button-group').appendChild(secondaryButton);
      } else {
        const secondaryButton = card.querySelector('.secondary-button');
        if (secondaryButton) {
          secondaryButton.remove();
        }
      }
    });
  
    return card;
  }
  
  function ProductList() {
    const products = [
        {
          title: "Review Dokumen Aplikasi",
          description: "Review dokumen aplikasi (CV, statement of purpose, research proposal, dll.). Feedback diberikan dalam waktu 48-72 jam. Feedback berupa saran tertulis perbaikan dan penyesuaian untuk meningkatkan kualitas aplikasi Anda.",
          price: 399000,
          popular: false,
          primaryUrl: "https://checkout.xendit.co/od/mykampus-review-dokumen-aplikasi-2024",
          secondaryUrl: "https://buy.stripe.com/bIY9Cd7Jcb6Uebu145",
        },
        {
          title: "Aksel Persiapan Berkas (Springboard)",
          description: "3 sesi review dan feedback yang dimoderasi mentor selama 2 minggu (untuk CV/resume, statement of purpose, dan mockup aplikasi) + sesi final. Peserta upload dokumen 24 jam sebelum pertemuan.",
          price: 599000,
          popular: false,
          primaryUrl: "https://checkout.xendit.co/od/mykampus-springboard-2024",
          secondaryUrl: "https://buy.stripe.com/5kAg0B4x04Iw4AUbII",
        },
        {
          title: "One-on-One Mentoring",
          description: "4 sesi pertemuan jarak jauh (melalui Zoom) selama 1 jam setiap 2 minggu. 1 sesi pertemuan mendalam dengan 1 tujuan dan kebutuhan Anda. Akan ada diskusi mendalam tentang pilihan kampus, proses aplikasi, dan persiapan keberangkatan.",
          price: 899000,
          popular: true,
          primaryUrl: "https://checkout.xendit.co/od/mykampus-1on1-mentoring-2024",
          secondaryUrl: "https://buy.stripe.com/14k5lX9Rk0sg9Ve6oq",
        },
        {
          title: "Group Consultations",
          description: "4 sesi bimbingan per kelompok untuk maksimal 4 organ. Tiap pertemuan berdurasi 2 jam (melalui Zoom) selama 1,5-2 jam, setiap bulan. Sesi bimbingan bersama membahas berbagai aspek dari perencanaan, aplikasi kampus, dan persiapan studi.",
          price: 2999000,
          popular: false,
          primaryUrl: "https://checkout.xendit.co/od/mykampus-group-consultations-2024",
          secondaryUrl: "https://buy.stripe.com/14kdStbZsfnaaZi5kn",
        },
      ];
  
    const container = document.getElementById('product-list');
    const grid = document.createElement('div');
    grid.className = 'grid';
  
    products.forEach(product => {
      grid.appendChild(ProductCard(product));
    });
  
    container.appendChild(grid);
  }
  
  document.addEventListener('DOMContentLoaded', ProductList);