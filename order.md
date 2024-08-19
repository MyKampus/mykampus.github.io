---
layout: order
title: Pemesanan dan Harga
permalink: order
description: Pesan layanan MyKampus disini. Setelah memilih paket yang sesuai, Anda akan diarahkan ke halaman pembayaran. 
image: /assets/img/mykampus-sidebar.jpeg
---

<link rel="stylesheet" href="{{ '/assets/css/mykampus.css' | relative_url }}">

## Proses Pemesanan

1. **Pilih Paket Layanan**: Pilih paket layanan konsultasi yang sesuai dengan kebutuhan Anda.
2. **Isi Informasi**: Isi informasi kontak dan detail pembayaran Anda.
3. **Pembayaran**: Lakukan pembayaran melalui Stripe, platform pembayaran yang aman dan terpercaya.
4. **Konfirmasi**: Setelah pembayaran berhasil, Anda akan menerima email konfirmasi dan petunjuk selanjutnya.
5. **Mulai Konsultasi**: Tim kami akan menghubungi Anda untuk mengatur jadwal konsultasi sesuai dengan paket yang Anda pilih.

## Pilihan Layanan Konsultasi

<div id="product-list" class="grid">
  {% for product in site.data.products %}
    <div class="product-card">
      {% if product.popular %}
        <div class="popular-badge">Paling populer</div>
      {% endif %}
      <h3 class="product-title">{{ product.title }}</h3>
      <p class="product-description">{{ product.description }}</p>
      <p class="product-price">Rp. {{ product.price }}</p>
      <div class="button-group">
        <div class="primary-button-wrapper">
          <button class="primary-button" onclick="window.open('{{ product.primaryUrl }}', '_blank')">Cekout</button>
          <button class="toggle-button" onclick="toggleSecondaryButton(this)">
            <span class="toggle-icon">▼</span>
          </button>
        </div>
        <button class="secondary-button" style="display: none;" onclick="window.open('{{ product.secondaryUrl }}', '_blank')">Cekout via Stripe</button>
      </div>
    </div>
  {% endfor %}
</div>

<script>
function toggleSecondaryButton(button) {
  const card = button.closest('.product-card');
  const secondaryButton = card.querySelector('.secondary-button');
  const toggleIcon = button.querySelector('.toggle-icon');
  
  if (secondaryButton.style.display === 'none') {
    secondaryButton.style.display = 'block';
    toggleIcon.style.transform = 'rotate(180deg)';
  } else {
    secondaryButton.style.display = 'none';
    toggleIcon.style.transform = 'rotate(0deg)';
  }
}
</script>

## Pertanyaan
Punya pertanyaan? Silakan [hubungi kami](/kontak) untuk informasi lebih lanjut.