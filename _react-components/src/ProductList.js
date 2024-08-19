import React, { useState } from 'react';

const styles = {
  productCard: {
    backgroundColor: 'white',
    borderRadius: '8px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    padding: '1.5rem',
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    position: 'relative',
  },
  productTitle: {
    fontSize: '1.25rem',
    fontWeight: 'bold',
    marginBottom: '0.75rem',
  },
  productDescription: {
    fontSize: '0.875rem',
    color: '#4a5568',
    marginBottom: '1rem',
    flexGrow: 1,
  },
  productPrice: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    color: '#2C7A7B',
    marginBottom: '0.75rem',
  },
  buttonGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
  },
  primaryButtonWrapper: {
    display: 'flex',
    gap: '0.25rem',
  },
  primaryButton: {
    flexGrow: 1,
    backgroundColor: '#2C7A7B',
    color: 'white',
    padding: '0.75rem',
    borderRadius: '9999px 0 0 9999px',
    fontWeight: 600,
    border: 'none',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  },
  secondaryButton: {
    backgroundColor: '#38A169',
    color: 'white',
    padding: '0.75rem',
    borderRadius: '9999px',
    fontWeight: 600,
    border: 'none',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
    width: '100%',
  },
  toggleButton: {
    backgroundColor: '#2C7A7B',
    color: 'white',
    padding: '0.75rem',
    borderRadius: '0 9999px 9999px 0',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: 'none',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
    width: '48px',
  },
  toggleIcon: {
    transition: 'transform 0.3s',
    fontSize: '0.75rem',
  },
  toggleIconOpen: {
    transform: 'rotate(180deg)',
  },
  popularBadge: {
    position: 'absolute',
    top: '0.5rem',
    right: '0.5rem',
    background: 'linear-gradient(90deg, #CBD5E0, #EDF2F7, #CBD5E0)',
    color: '#4A5568',
    fontSize: '0.75rem',
    padding: '0.25rem 0.75rem',
    borderRadius: '9999px',
    fontWeight: 600,
    animation: 'shimmer 2s infinite linear',
  },
};

const ShimmeringBadge = ({ text }) => (
  <div style={styles.popularBadge}>
    {text}
  </div>
);

const ProductCard = ({ title, description, price, popular, primaryUrl, secondaryUrl }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div style={styles.productCard}>
      {popular && <ShimmeringBadge text="Paling populer" />}
      <h3 style={styles.productTitle}>{title}</h3>
      <p style={styles.productDescription}>{description}</p>
      <p style={styles.productPrice}>Rp {price.toLocaleString()}</p>
      <div style={styles.buttonGroup}>
        <div style={styles.primaryButtonWrapper}>
          <button 
            onClick={() => window.open(primaryUrl, '_blank')}
            style={styles.primaryButton}
          >
            Cekout
          </button>
          <button 
            onClick={() => setIsOpen(!isOpen)}
            style={styles.toggleButton}
          >
            <span style={{...styles.toggleIcon, ...(isOpen ? styles.toggleIconOpen : {})}}>▼</span>
          </button>
        </div>
        {isOpen && (
          <button 
            onClick={() => window.open(secondaryUrl, '_blank')}
            style={styles.secondaryButton}
          >
            Cekout via Stripe
          </button>
        )}
      </div>
    </div>
  );
};

const ProductList = () => {
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

  return (
    <div style={{ maxWidth: '1152px', margin: '0 auto', padding: '1.5rem' }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
        {products.map((product, index) => (
          <ProductCard key={index} {...product} />
        ))}
      </div>
    </div>
  );
};

export default ProductList;