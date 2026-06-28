// src/components/blogs/ClinicBlogPage.jsx
import React, { useState, useEffect } from 'react';

function ClinicBlogPage({ citySlug, cityName, stateName }) {
  // ==================== SEO EFFECTS ====================
  useEffect(() => {
    // Dynamic page title
    document.title = `Clinic Website in ${cityName} - Complete Guide 2026 | Orbnix`;
    
    // Meta description
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', `Build a professional clinic website in ${cityName} with patient portal, online booking, WhatsApp automation & telemedicine. Starting ₹25,000. 100% code ownership. Free consultation.`);
    }
    
    // Open Graph description
    const ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) {
      ogDesc.setAttribute('content', `Complete guide to clinic website development in ${cityName}. Features include patient portal, online booking, WhatsApp automation, telemedicine & analytics. Free consultation.`);
    }
    
    // Canonical URL
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', `https://www.orbnix.in/blog/clinic-website-${citySlug}`);
    
    // Article Schema
    let articleLd = document.querySelector('#clinic-article-ld');
    if (!articleLd) {
      articleLd = document.createElement('script');
      articleLd.id = 'clinic-article-ld';
      articleLd.type = 'application/ld+json';
      document.head.appendChild(articleLd);
    }
    articleLd.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Article",
      "headline": `Complete Clinic Website & Patient Portal Development in ${cityName} - 2026`,
      "description": `Build a professional clinic website in ${cityName} with patient portal, online booking, WhatsApp automation and telemedicine. Starting ₹25,000. 100% code ownership.`,
      "author": {
        "@type": "Organization",
        "name": "Orbnix",
        "url": "https://www.orbnix.in"
      },
      "publisher": {
        "@type": "Organization",
        "name": "Orbnix",
        "logo": {
          "@type": "ImageObject",
          "url": "https://www.orbnix.in/logo.png"
        }
      },
      "datePublished": new Date().toISOString().split('T')[0],
      "dateModified": new Date().toISOString().split('T')[0],
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": `https://www.orbnix.in/blog/clinic-website-${citySlug}`
      }
    });
    
    // FAQ Schema
    let faqLd = document.querySelector('#clinic-faq-ld');
    if (!faqLd) {
      faqLd = document.createElement('script');
      faqLd.id = 'clinic-faq-ld';
      faqLd.type = 'application/ld+json';
      document.head.appendChild(faqLd);
    }
    faqLd.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": `How long does it take to build a clinic website in ${cityName}?`,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "We deliver standard clinic websites in 7-14 days. Complex patient portals with full telemedicine take 4-6 weeks. We provide a fixed timeline in writing before we start."
          }
        },
        {
          "@type": "Question",
          "name": `Will my patients be able to book appointments online in ${cityName}?`,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes! All our clinic websites include online appointment booking with automated reminders via WhatsApp and SMS. This reduces phone calls by up to 70%."
          }
        },
        {
          "@type": "Question",
          "name": `Do I own the website code and patient data?`,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "100% yes. We hand over all source code, domain credentials, and hosting access. Your patient data stays on your servers - we never share or sell it."
          }
        },
        {
          "@type": "Question",
          "name": `Can I manage the clinic website myself in ${cityName}?`,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes! We provide CMS training so you can update content, add doctors, manage bookings, and post health articles without any technical knowledge."
          }
        }
      ]
    });
    
    // Cleanup
    return () => {
      const articleEl = document.querySelector('#clinic-article-ld');
      if (articleEl) articleEl.remove();
      const faqEl = document.querySelector('#clinic-faq-ld');
      if (faqEl) faqEl.remove();
    };
  }, [citySlug, cityName]);

  // ==================== STATE ====================
  const [selectedFeature, setSelectedFeature] = useState(null);
  const [faqOpen, setFaqOpen] = useState(null);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [appointmentData, setAppointmentData] = useState({
    name: '', phone: '', email: '', date: '', time: ''
  });
  const [demoPatient, setDemoPatient] = useState(null);
  const [demoPrescription, setDemoPrescription] = useState(null);
  const [demoBookingSuccess, setDemoBookingSuccess] = useState(false);
  const [demoReviewSent, setDemoReviewSent] = useState(false);
  const [shareSuccess, setShareSuccess] = useState(false);

  // ==================== DATA ====================
  const demoPatients = [
    { id: 1, name: "Priya Sharma", age: 34, lastVisit: "15 May 2026", condition: "Hypertension", phone: "+91 98765 43210" },
    { id: 2, name: "Rahul Verma", age: 45, lastVisit: "12 May 2026", condition: "Diabetes Type 2", phone: "+91 87654 32109" },
    { id: 3, name: "Ananya Patel", age: 28, lastVisit: "10 May 2026", condition: "Asthma", phone: "+91 76543 21098" }
  ];

  const whyData = [
    {
      icon: "📱",
      title: "Patients Search Online First",
      desc: "93% of patients in India search online before choosing a doctor. If you're not on Google, you're invisible.",
      stat: "93%",
      statLabel: "Patients search online first"
    },
    {
      icon: "📞",
      title: "Reduce Phone Calls by 70%",
      desc: "Online booking answers patient questions automatically, freeing your staff for patient care.",
      stat: "70%",
      statLabel: "Reduction in phone calls"
    },
    {
      icon: "⭐",
      title: "Build Trust Before First Visit",
      desc: "A professional website builds trust before patients walk through your door.",
      stat: "4.9★",
      statLabel: "Average rating from online patients"
    },
    {
      icon: "🏥",
      title: "Compete with Modern Clinics",
      desc: `Clinics with websites get 3x more new patients. Don't fall behind in ${cityName}.`,
      stat: "3x",
      statLabel: "More patients with a website"
    }
  ];

  const features = [
    { 
      id: 'portal',
      icon: '👤', 
      title: 'Patient Portal', 
      desc: 'Patients view medical history, download prescriptions, access lab reports, and book appointments 24/7.',
      benefits: ['24/7 Access', 'Medical History', 'Prescription Downloads', 'Lab Reports'],
      color: '#2563EB'
    },
    { 
      id: 'booking',
      icon: '📅', 
      title: 'Smart Appointment Booking', 
      desc: 'Real-time doctor availability with automated SMS/WhatsApp reminders. Reduce no-shows by 60%.',
      benefits: ['Real-time Availability', 'Auto Reminders', '60% Less No-shows', 'Calendar Sync'],
      color: '#7C3AED'
    },
    { 
      id: 'prescription',
      icon: '💊', 
      title: 'Digital Prescriptions', 
      desc: 'Create, store and share prescriptions digitally. Patients never lose them again.',
      benefits: ['PDF Downloads', 'WhatsApp Sharing', 'Medication Reminders', 'Refill Requests'],
      color: '#10B981'
    },
    { 
      id: 'whatsapp',
      icon: '💬', 
      title: 'WhatsApp Automation', 
      desc: 'Automated appointment confirmations, follow-ups, review requests and patient support.',
      benefits: ['98% Open Rate', 'Auto Reminders', 'Review Requests', 'Patient Support'],
      color: '#25D366'
    },
    { 
      id: 'analytics',
      icon: '📊', 
      title: 'Clinic Analytics', 
      desc: 'Track patient retention, visit frequency, Google Reviews and revenue in real-time.',
      benefits: ['Patient Retention', 'Visit Tracking', 'Review Monitoring', 'Revenue Reports'],
      color: '#F59E0B'
    },
    { 
      id: 'telemedicine',
      icon: '📱', 
      title: 'Telemedicine', 
      desc: 'Video consultation booking with secure platform and digital prescriptions.',
      benefits: ['Video Consultations', 'Pre-forms', 'Secure Platform', 'Digital Reports'],
      color: '#EC4899'
    }
  ];

  const faqs = [
    {
      q: `How long does it take to build a clinic website in ${cityName}?`,
      a: `We deliver standard clinic websites in 7-14 days. Complex patient portals take 4-6 weeks. We provide a fixed timeline in writing before we start.`
    },
    {
      q: `Will my patients be able to book appointments online?`,
      a: `Yes! All our clinic websites include online appointment booking with automated reminders via WhatsApp and SMS. This reduces phone calls by up to 70%.`
    },
    {
      q: `Do I own the website code and patient data?`,
      a: `100% yes. We hand over all source code, domain credentials, and hosting access. Your patient data stays on your servers - we never share or sell it.`
    },
    {
      q: `Can I manage the website myself?`,
      a: `Yes! We provide CMS training so you can update content, add doctors, manage bookings, and post health articles without any technical knowledge.`
    }
  ];

  const comparisonData = [
    ["Price Range", "₹8K-₹20K", "₹25K-₹60K", "₹1L-₹5L"],
    ["Patient Portal", "❌ No", "✅ Yes", "✅ Yes"],
    ["WhatsApp Integration", "⚠️ Basic", "✅ Advanced", "✅ Yes"],
    ["SEO Optimization", "⚠️ Basic", "✅ Full", "✅ Yes"],
    ["Code Ownership", "⚠️ Sometimes", "✅ Always", "⚠️ Often No"],
    ["Support", "⚠️ 1-2 weeks", "✅ 30 days free", "✅ 90 days paid"],
    ["Timeline", "⚠️ 2-4 weeks", "✅ 7-14 days", "⚠️ 4-8 weeks"],
    ["Patient App", "❌ No", "✅ Yes", "✅ Yes"],
    ["Telemedicine", "❌ No", "✅ Yes", "✅ Yes"]
  ];

  // ==================== FUNCTIONS ====================
  const handleDemoPatientClick = (patient) => {
    setDemoPatient(patient);
    setDemoPrescription({
      patient: patient.name,
      date: new Date().toLocaleDateString(),
      medicines: [
        { name: "Amlodipine 5mg", dosage: "1 tablet daily", duration: "30 days" },
        { name: "Losartan 50mg", dosage: "1 tablet daily", duration: "30 days" }
      ],
      doctor: "Dr. Priya Sharma",
      clinic: `${cityName} Health Clinic`
    });
  };

  const handleDemoBooking = () => {
    setDemoBookingSuccess(true);
    setTimeout(() => setDemoBookingSuccess(false), 3000);
  };

  const handleSendReview = () => {
    setDemoReviewSent(true);
    setTimeout(() => setDemoReviewSent(false), 3000);
  };

  const handleFeatureClick = (featureId) => {
    setSelectedFeature(selectedFeature === featureId ? null : featureId);
  };

  const toggleFaq = (index) => {
    setFaqOpen(faqOpen === index ? null : index);
  };

  const handleAppointmentBooking = (e) => {
    e.preventDefault();
    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
      setShowBookingModal(false);
    }, 2000);
  };

  const handleShare = (platform) => {
    const url = window.location.href;
    const text = `Looking for a clinic website in ${cityName}? Check out this complete guide! 🏥`;
    
    const shareUrls = {
      whatsapp: `https://wa.me/?text=${encodeURIComponent(text + ' ' + url)}`,
      twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`
    };
    
    window.open(shareUrls[platform], '_blank', 'width=600,height=400');
    setShareSuccess(true);
    setTimeout(() => setShareSuccess(false), 2000);
  };

  // ==================== COUNTER ====================
  const Counter = ({ end, suffix = '' }) => {
    const [count, setCount] = useState(0);
    useEffect(() => {
      let start = 0;
      const duration = 1500;
      const steps = 60;
      const increment = end / steps;
      const timer = setInterval(() => {
        start += increment;
        if (start >= end) {
          setCount(end);
          clearInterval(timer);
        } else {
          setCount(Math.floor(start));
        }
      }, duration / steps);
      return () => clearInterval(timer);
    }, [end]);
    return <span>{count}{suffix}</span>;
  };

  // ==================== BOOKING MODAL ====================
  const BookingModal = () => (
    <div style={{
      position: 'fixed',
      inset: 0,
      background: 'rgba(0,0,0,0.6)',
      backdropFilter: 'blur(8px)',
      zIndex: 9999,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '1rem',
      animation: 'fadeIn 0.3s ease'
    }} onClick={() => setShowBookingModal(false)}>
      <div style={{
        background: '#fff',
        borderRadius: '20px',
        maxWidth: '500px',
        width: '100%',
        maxHeight: '90vh',
        overflow: 'auto',
        padding: '2rem',
        position: 'relative',
        animation: 'slideIn 0.3s ease'
      }} onClick={e => e.stopPropagation()}>
        <button
          onClick={() => setShowBookingModal(false)}
          style={{
            position: 'absolute',
            top: '1rem',
            right: '1rem',
            background: 'none',
            border: 'none',
            fontSize: '1.5rem',
            cursor: 'pointer',
            color: '#64748B'
          }}
        >
          ✕
        </button>

        <h2 style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: '1.5rem', fontWeight: 800, marginBottom: '0.5rem' }}>
          Book Free Consultation
        </h2>
        <p style={{ color: '#64748B', marginBottom: '1.5rem' }}>
          Get a free consultation for your {cityName} clinic website
        </p>

        {showSuccess ? (
          <div style={{ textAlign: 'center', padding: '2rem 0' }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>✅</div>
            <h3 style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: '1.2rem', fontWeight: 700, color: '#10B981' }}>Booking Confirmed!</h3>
            <p style={{ color: '#64748B', marginTop: '0.5rem' }}>We'll contact you within 24 hours</p>
          </div>
        ) : (
          <form onSubmit={handleAppointmentBooking}>
            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#334155', marginBottom: '0.35rem' }}>Your Name *</label>
              <input
                type="text"
                required
                value={appointmentData.name}
                onChange={e => setAppointmentData({...appointmentData, name: e.target.value})}
                style={{
                  width: '100%',
                  padding: '0.7rem',
                  border: '1.5px solid #E2E8F0',
                  borderRadius: '10px',
                  fontSize: '0.9rem',
                  outline: 'none'
                }}
                placeholder="Dr. Sharma"
              />
            </div>
            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#334155', marginBottom: '0.35rem' }}>WhatsApp Number *</label>
              <input
                type="tel"
                required
                value={appointmentData.phone}
                onChange={e => setAppointmentData({...appointmentData, phone: e.target.value})}
                style={{
                  width: '100%',
                  padding: '0.7rem',
                  border: '1.5px solid #E2E8F0',
                  borderRadius: '10px',
                  fontSize: '0.9rem',
                  outline: 'none'
                }}
                placeholder="+91 98765 43210"
              />
            </div>
            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#334155', marginBottom: '0.35rem' }}>Email</label>
              <input
                type="email"
                value={appointmentData.email}
                onChange={e => setAppointmentData({...appointmentData, email: e.target.value})}
                style={{
                  width: '100%',
                  padding: '0.7rem',
                  border: '1.5px solid #E2E8F0',
                  borderRadius: '10px',
                  fontSize: '0.9rem',
                  outline: 'none'
                }}
                placeholder="clinic@email.com"
              />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginBottom: '1rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#334155', marginBottom: '0.35rem' }}>Preferred Date</label>
                <input
                  type="date"
                  value={appointmentData.date}
                  onChange={e => setAppointmentData({...appointmentData, date: e.target.value})}
                  style={{
                    width: '100%',
                    padding: '0.6rem',
                    border: '1.5px solid #E2E8F0',
                    borderRadius: '10px',
                    fontSize: '0.85rem',
                    outline: 'none'
                  }}
                />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#334155', marginBottom: '0.35rem' }}>Preferred Time</label>
                <select
                  value={appointmentData.time}
                  onChange={e => setAppointmentData({...appointmentData, time: e.target.value})}
                  style={{
                    width: '100%',
                    padding: '0.6rem',
                    border: '1.5px solid #E2E8F0',
                    borderRadius: '10px',
                    fontSize: '0.85rem',
                    outline: 'none',
                    background: '#fff'
                  }}
                >
                  <option value="">Select time</option>
                  <option value="10:00 AM">10:00 AM</option>
                  <option value="11:00 AM">11:00 AM</option>
                  <option value="12:00 PM">12:00 PM</option>
                  <option value="2:00 PM">2:00 PM</option>
                  <option value="3:00 PM">3:00 PM</option>
                  <option value="4:00 PM">4:00 PM</option>
                </select>
              </div>
            </div>
            <button
              type="submit"
              style={{
                width: '100%',
                padding: '0.9rem',
                background: 'linear-gradient(135deg, #2563EB, #7C3AED)',
                color: '#fff',
                border: 'none',
                borderRadius: '12px',
                fontWeight: 700,
                fontSize: '1rem',
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
              onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-2px)'}
              onMouseLeave={e => e.currentTarget.style.transform = 'none'}
            >
              Book Free Consultation →
            </button>
          </form>
        )}
      </div>
    </div>
  );

  // ==================== MAIN RENDER ====================
  return (
    <div style={{
      maxWidth: "860px",
      margin: "0 auto",
      padding: "5rem 1.5rem 3rem",
      fontFamily: "'Manrope', sans-serif",
      color: "#0F172A"
    }}>
      
      {/* ===== BREADCRUMB ===== */}
      <nav style={{ fontSize: ".8rem", color: "#64748B", marginBottom: "1.5rem" }}>
        <a href="/" style={{ color: "#2563EB", textDecoration: "none" }}>Home</a>
        <span style={{ margin: "0 0.5rem" }}>›</span>
        <a href="/blog" style={{ color: "#2563EB", textDecoration: "none" }}>Blog</a>
        <span style={{ margin: "0 0.5rem" }}>›</span>
        <span style={{ color: "#0F172A" }}>Clinic Website in {cityName}</span>
      </nav>

      {/* ===== SHARE BUTTONS ===== */}
      <div style={{ display: "flex", justifyContent: "flex-end", gap: "0.5rem", marginBottom: "1rem" }}>
        <span style={{ fontSize: "0.75rem", color: "#64748B", marginRight: "auto", alignSelf: "center" }}>
          Share this guide:
        </span>
        {[
          { id: 'whatsapp', icon: '💬', label: 'WhatsApp' },
          { id: 'twitter', icon: '🐦', label: 'X' },
          { id: 'linkedin', icon: '🔗', label: 'LinkedIn' },
          { id: 'facebook', icon: '👍', label: 'Facebook' }
        ].map(platform => (
          <button
            key={platform.id}
            onClick={() => handleShare(platform.id)}
            style={{
              padding: "0.4rem 0.6rem",
              background: "#F8FAFC",
              border: "1px solid #E2E8F0",
              borderRadius: "8px",
              fontSize: "0.75rem",
              cursor: "pointer",
              transition: "all 0.2s",
              display: "flex",
              alignItems: "center",
              gap: "0.25rem"
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = "#EFF6FF";
              e.currentTarget.style.borderColor = "#2563EB";
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = "#F8FAFC";
              e.currentTarget.style.borderColor = "#E2E8F0";
            }}
          >
            {platform.icon} <span style={{ fontSize: "0.7rem", display: "none", "@media(min-width:480px)": { display: "inline" } }}>{platform.label}</span>
          </button>
        ))}
      </div>

      {/* ===== HERO ===== */}
      <h1 style={{
        fontFamily: "'Bricolage Grotesque', sans-serif",
        fontSize: "clamp(1.8rem, 4vw, 2.6rem)",
        fontWeight: 800,
        lineHeight: 1.15,
        marginBottom: "1rem"
      }}>
        Why Every Clinic in {cityName} Needs a Professional Website in 2026
      </h1>
      
      <p style={{ fontSize: "1.05rem", lineHeight: 1.8, color: "#334155", marginBottom: "1.5rem" }}>
        Patients in {cityName} search online before choosing a healthcare provider. If your clinic doesn't have a professional website, you're losing patients to competitors every single day.
      </p>

      {/* ===== TABLE OF CONTENTS ===== */}
      <div style={{
        background: "#F8FAFC",
        padding: "1.25rem",
        borderRadius: "12px",
        border: "1px solid #E2E8F0",
        marginBottom: "2rem"
      }}>
        <div style={{ fontWeight: 700, marginBottom: "0.5rem", fontSize: "0.9rem" }}>📑 In This Guide</div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "0.25rem", fontSize: "0.85rem", lineHeight: 2 }}>
          {[
            "📊 Why Your Clinic Needs a Website",
            "📈 The Real Impact",
            "🏥 Web Development Options",
            "⭐ Why Orbnix",
            "🚀 Features",
            "🎮 Interactive Demo",
            "📊 Orbnix by Numbers",
            "❓ FAQ",
            "📅 Get Started"
          ].map(item => (
            <div key={item} style={{ color: "#475569" }}>• {item}</div>
          ))}
        </div>
      </div>

      {/* ===== SECTION 1: WHY ===== */}
      <h2 style={{
        fontFamily: "'Bricolage Grotesque', sans-serif",
        fontSize: "1.5rem",
        fontWeight: 700,
        marginTop: "2rem",
        marginBottom: "0.5rem"
      }}>
        📊 Why Your {cityName} Clinic Needs a Website
      </h2>
      <p style={{ color: "#64748B", marginBottom: "1.5rem" }}>
        The healthcare landscape has changed. Here's why a website is no longer optional:
      </p>
      
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "1rem" }}>
        {whyData.map((item, index) => (
          <div
            key={index}
            style={{
              background: "#fff",
              borderRadius: "14px",
              padding: "1.25rem",
              border: "1.5px solid #E2E8F0",
              transition: "all 0.3s"
            }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = "translateY(-4px)";
              e.currentTarget.style.boxShadow = "0 8px 24px rgba(0,0,0,0.08)";
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = "none";
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            <div style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>{item.icon}</div>
            <div style={{ fontWeight: 700, fontSize: "1rem", marginBottom: "0.25rem" }}>{item.title}</div>
            <div style={{ fontSize: "0.85rem", color: "#64748B", marginBottom: "0.75rem" }}>{item.desc}</div>
            <div style={{
              background: "#2563EB10",
              borderRadius: "8px",
              padding: "0.5rem",
              textAlign: "center"
            }}>
              <div style={{ fontSize: "1.5rem", fontWeight: 900, color: "#2563EB" }}>{item.stat}</div>
              <div style={{ fontSize: "0.7rem", color: "#64748B" }}>{item.statLabel}</div>
            </div>
          </div>
        ))}
      </div>

      {/* ===== SECTION 2: IMPACT ===== */}
      <h2 style={{
        fontFamily: "'Bricolage Grotesque', sans-serif",
        fontSize: "1.5rem",
        fontWeight: 700,
        marginTop: "2.5rem",
        marginBottom: "0.5rem"
      }}>
        📈 The Real Impact of a Professional Website
      </h2>
      <p style={{ color: "#64748B", marginBottom: "1.5rem" }}>
        Here's what happens when clinics in India invest in a professional online presence:
      </p>

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
        gap: "1rem",
        marginBottom: "1.5rem"
      }}>
        {[
          { icon: "📈", value: "340%", label: "Increase in website traffic", color: "#2563EB" },
          { icon: "📅", value: "80%", label: "Reduction in phone calls", color: "#10B981" },
          { icon: "⭐", value: "4.9★", label: "Average Google Rating", color: "#F59E0B" },
          { icon: "💰", value: "₹2L+", label: "Monthly revenue from online bookings", color: "#EC4899" },
          { icon: "👥", value: "60%", label: "Less no-shows with reminders", color: "#7C3AED" },
          { icon: "📱", value: "98%", label: "WhatsApp open rate for reminders", color: "#25D366" }
        ].map(stat => (
          <div
            key={stat.label}
            style={{
              background: "#fff",
              borderRadius: "12px",
              padding: "1rem",
              textAlign: "center",
              border: "1.5px solid #E2E8F0",
              transition: "all 0.3s"
            }}
            onMouseEnter={e => {
              e.currentTarget.style.borderColor = stat.color;
              e.currentTarget.style.transform = "translateY(-2px)";
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = "#E2E8F0";
              e.currentTarget.style.transform = "none";
            }}
          >
            <div style={{ fontSize: "2rem", marginBottom: "0.25rem" }}>{stat.icon}</div>
            <div style={{ fontSize: "1.5rem", fontWeight: 900, color: stat.color }}>{stat.value}</div>
            <div style={{ fontSize: "0.75rem", color: "#64748B" }}>{stat.label}</div>
          </div>
        ))}
      </div>

      {/* ===== SECTION 3: COMPARISON ===== */}
      <h2 style={{
        fontFamily: "'Bricolage Grotesque', sans-serif",
        fontSize: "1.5rem",
        fontWeight: 700,
        marginTop: "2.5rem",
        marginBottom: "0.5rem"
      }}>
        🏥 Web Development Options in {cityName}
      </h2>
      <p style={{ color: "#64748B", marginBottom: "1.5rem" }}>
        Here's how Orbnix compares to other options in {cityName}:
      </p>

      <div style={{ overflowX: "auto" }}>
        <table style={{
          width: "100%",
          borderCollapse: "collapse",
          fontSize: "0.82rem",
          borderRadius: "12px",
          overflow: "hidden",
          border: "1.5px solid #E2E8F0"
        }}>
          <thead>
            <tr style={{ background: "#F8FAFC" }}>
              <th style={{ padding: "0.75rem", textAlign: "left", fontWeight: 700 }}>Feature</th>
              <th style={{ padding: "0.75rem", textAlign: "center", fontWeight: 700 }}>Freelancers</th>
              <th style={{ padding: "0.75rem", textAlign: "center", fontWeight: 700, background: "#EFF6FF" }}>⭐ Orbnix</th>
              <th style={{ padding: "0.75rem", textAlign: "center", fontWeight: 700 }}>Big Agencies</th>
            </tr>
          </thead>
          <tbody>
            {comparisonData.map((row, index) => (
              <tr key={index} style={{ background: index % 2 === 0 ? "#fff" : "#F8FAFC" }}>
                <td style={{ padding: "0.6rem 0.75rem", fontWeight: 600, borderBottom: "1px solid #F1F5F9" }}>{row[0]}</td>
                <td style={{ padding: "0.6rem 0.75rem", textAlign: "center", borderBottom: "1px solid #F1F5F9" }}>{row[1]}</td>
                <td style={{ padding: "0.6rem 0.75rem", textAlign: "center", borderBottom: "1px solid #F1F5F9", background: "#EFF6FF", fontWeight: 700, color: "#2563EB" }}>{row[2]}</td>
                <td style={{ padding: "0.6rem 0.75rem", textAlign: "center", borderBottom: "1px solid #F1F5F9" }}>{row[3]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ===== SECTION 4: WHY ORBNIX ===== */}
      <h2 style={{
        fontFamily: "'Bricolage Grotesque', sans-serif",
        fontSize: "1.5rem",
        fontWeight: 700,
        marginTop: "2.5rem",
        marginBottom: "0.5rem"
      }}>
        ⭐ Why Orbnix is the Best Choice for {cityName} Clinics
      </h2>
      <p style={{ color: "#64748B", marginBottom: "1.5rem" }}>
        Here's what makes Orbnix different from other web development companies:
      </p>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "1rem" }}>
        {[
          { icon: "🔒", title: "100% Code Ownership", desc: "You own everything. We hand over all source code, domain, and hosting credentials. No lock-in, ever." },
          { icon: "💰", title: "Fixed Pricing", desc: "No hidden costs. We quote a fixed price before we start. If scope doesn't change, the price doesn't change." },
          { icon: "⚡", title: "Fast Delivery", desc: "Your clinic website goes live in 7-14 days. Full patient portal in 4-6 weeks." },
          { icon: "📱", title: "Mobile-First Design", desc: "80% of your patients search on mobile. We design for phones first." },
          { icon: "🔍", title: "SEO Optimized", desc: `Your website ranks on Google for "clinic in ${cityName}" searches from day one.` },
          { icon: "🇮🇳", title: "Built for India", desc: "We understand Indian clinics, WhatsApp-first communication, and local payment gateways." },
          { icon: "🛡️", title: "30-Day Free Support", desc: "Free bug fixes and support for 30 days after launch. We don't disappear." },
          { icon: "🤝", title: "50% Pay on Delivery", desc: "You pay only 50% upfront. The rest is due only when you're satisfied." }
        ].map(item => (
          <div
            key={item.title}
            style={{
              background: "#fff",
              borderRadius: "12px",
              padding: "1rem",
              border: "1.5px solid #E2E8F0",
              transition: "all 0.3s"
            }}
            onMouseEnter={e => {
              e.currentTarget.style.borderColor = "#2563EB";
              e.currentTarget.style.transform = "translateY(-2px)";
              e.currentTarget.style.boxShadow = "0 8px 24px rgba(37,99,235,0.08)";
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = "#E2E8F0";
              e.currentTarget.style.transform = "none";
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            <div style={{ fontSize: "1.5rem", marginBottom: "0.25rem" }}>{item.icon}</div>
            <div style={{ fontWeight: 700, fontSize: "0.95rem", marginBottom: "0.25rem" }}>{item.title}</div>
            <div style={{ fontSize: "0.85rem", color: "#64748B" }}>{item.desc}</div>
          </div>
        ))}
      </div>

      {/* ===== SECTION 5: FEATURES ===== */}
      <h2 style={{
        fontFamily: "'Bricolage Grotesque', sans-serif",
        fontSize: "1.5rem",
        fontWeight: 700,
        marginTop: "2.5rem",
        marginBottom: "0.5rem"
      }}>
        🚀 Features Your {cityName} Clinic Website Will Include
      </h2>
      <p style={{ color: "#64748B", marginBottom: "1.5rem" }}>
        Click any feature to see more details:
      </p>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "1rem" }}>
        {features.map(feature => (
          <div
            key={feature.id}
            onClick={() => handleFeatureClick(feature.id)}
            style={{
              background: selectedFeature === feature.id ? "#fff" : "#F8FAFC",
              borderRadius: "14px",
              padding: "1.25rem",
              border: selectedFeature === feature.id ? `2px solid ${feature.color}` : "1.5px solid #E2E8F0",
              cursor: "pointer",
              transition: "all 0.3s"
            }}
            onMouseEnter={e => {
              if (selectedFeature !== feature.id) {
                e.currentTarget.style.transform = "translateY(-4px)";
                e.currentTarget.style.boxShadow = "0 8px 24px rgba(0,0,0,0.08)";
              }
            }}
            onMouseLeave={e => {
              if (selectedFeature !== feature.id) {
                e.currentTarget.style.transform = "none";
                e.currentTarget.style.boxShadow = "none";
              }
            }}
          >
            <div style={{ fontSize: "2rem", marginBottom: "0.25rem" }}>{feature.icon}</div>
            <div style={{ fontWeight: 700, fontSize: "0.95rem" }}>{feature.title}</div>
            <div style={{ fontSize: "0.85rem", color: "#64748B" }}>{feature.desc}</div>
            
            {selectedFeature === feature.id && (
              <div style={{
                marginTop: "0.75rem",
                padding: "0.75rem",
                background: `${feature.color}10`,
                borderRadius: "8px",
                border: `1px solid ${feature.color}20`,
                animation: "fadeIn 0.3s ease"
              }}>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "0.3rem" }}>
                  {feature.benefits.map(b => (
                    <span key={b} style={{
                      background: "#fff",
                      padding: "0.15rem 0.6rem",
                      borderRadius: "4px",
                      fontSize: "0.7rem",
                      fontWeight: 600,
                      color: feature.color,
                      border: `1px solid ${feature.color}20`
                    }}>
                      {b}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* ===== SECTION 6: DEMO ===== */}
      <h2 style={{
        fontFamily: "'Bricolage Grotesque', sans-serif",
        fontSize: "1.5rem",
        fontWeight: 700,
        marginTop: "2.5rem",
        marginBottom: "0.5rem"
      }}>
        🎮 Try the Clinic Portal Demo
      </h2>
      <p style={{ color: "#64748B", marginBottom: "1.5rem" }}>
        Click on a patient below to see how the clinic portal works:
      </p>

      <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem", marginBottom: "1.5rem" }}>
        {demoPatients.map(patient => (
          <div
            key={patient.id}
            onClick={() => handleDemoPatientClick(patient)}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "0.75rem 1rem",
              background: demoPatient?.id === patient.id ? "#EFF6FF" : "#fff",
              borderRadius: "10px",
              border: demoPatient?.id === patient.id ? "2px solid #2563EB" : "1.5px solid #E2E8F0",
              cursor: "pointer",
              transition: "all 0.2s"
            }}
            onMouseEnter={e => {
              if (demoPatient?.id !== patient.id) {
                e.currentTarget.style.borderColor = "#2563EB";
                e.currentTarget.style.transform = "translateX(4px)";
              }
            }}
            onMouseLeave={e => {
              if (demoPatient?.id !== patient.id) {
                e.currentTarget.style.borderColor = "#E2E8F0";
                e.currentTarget.style.transform = "none";
              }
            }}
          >
            <div>
              <div style={{ fontWeight: 600 }}>{patient.name}</div>
              <div style={{ fontSize: "0.8rem", color: "#64748B" }}>{patient.condition} · Last visit: {patient.lastVisit}</div>
            </div>
            <div style={{ fontSize: "0.8rem", color: "#64748B" }}>
              {demoPatient?.id === patient.id ? "👈 Selected" : "Click to view →"}
            </div>
          </div>
        ))}
      </div>

      {demoPatient && (
        <div style={{
          background: "#F8FAFC",
          borderRadius: "16px",
          padding: "1.5rem",
          border: "1.5px solid #E2E8F0",
          animation: "fadeIn 0.3s ease"
        }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem", flexWrap: "wrap", gap: "0.5rem" }}>
            <div>
              <div style={{ fontSize: "1.2rem", fontWeight: 700 }}>{demoPatient.name}</div>
              <div style={{ fontSize: "0.85rem", color: "#64748B" }}>{demoPatient.age} years · {demoPatient.condition}</div>
            </div>
            <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
              <button
                onClick={handleDemoBooking}
                style={{
                  padding: "0.4rem 0.8rem",
                  background: "#2563EB",
                  color: "#fff",
                  border: "none",
                  borderRadius: "8px",
                  fontSize: "0.75rem",
                  fontWeight: 600,
                  cursor: "pointer"
                }}
              >
                📅 Book Appointment
              </button>
              <button
                onClick={handleSendReview}
                style={{
                  padding: "0.4rem 0.8rem",
                  background: "#10B981",
                  color: "#fff",
                  border: "none",
                  borderRadius: "8px",
                  fontSize: "0.75rem",
                  fontWeight: 600,
                  cursor: "pointer"
                }}
              >
                ⭐ Send Review Reminder
              </button>
            </div>
          </div>

          {demoBookingSuccess && (
            <div style={{
              background: "#D1FAE5",
              borderRadius: "8px",
              padding: "0.75rem",
              marginBottom: "1rem",
              color: "#065F46",
              fontWeight: 600,
              fontSize: "0.9rem",
              animation: "fadeIn 0.3s ease"
            }}>
              ✅ Appointment booked · WhatsApp confirmation sent
            </div>
          )}

          {demoReviewSent && (
            <div style={{
              background: "#FEF3C7",
              borderRadius: "8px",
              padding: "0.75rem",
              marginBottom: "1rem",
              color: "#92400E",
              fontWeight: 600,
              fontSize: "0.9rem",
              animation: "fadeIn 0.3s ease"
            }}>
              ⭐ Google Review reminder sent via WhatsApp
            </div>
          )}

          {demoPrescription && (
            <div style={{
              background: "#fff",
              borderRadius: "12px",
              padding: "1rem",
              border: "1px solid #E2E8F0",
              marginTop: "0.75rem"
            }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.5rem" }}>
                <div style={{ fontWeight: 700, fontSize: "0.9rem" }}>💊 Prescription</div>
                <div style={{ fontSize: "0.75rem", color: "#64748B" }}>{demoPrescription.date}</div>
              </div>
              <div style={{ fontSize: "0.8rem", color: "#64748B", marginBottom: "0.5rem" }}>
                Dr. {demoPrescription.doctor} · {demoPrescription.clinic}
              </div>
              <div style={{ borderTop: "1px solid #E2E8F0", paddingTop: "0.5rem" }}>
                {demoPrescription.medicines.map((med, idx) => (
                  <div key={idx} style={{ display: "flex", justifyContent: "space-between", padding: "0.3rem 0", borderBottom: "1px solid #F1F5F9" }}>
                    <span style={{ fontWeight: 600 }}>{med.name}</span>
                    <span style={{ fontSize: "0.85rem", color: "#64748B" }}>{med.dosage} · {med.duration}</span>
                  </div>
                ))}
              </div>
              <div style={{ marginTop: "0.5rem", fontSize: "0.75rem", color: "#10B981", display: "flex", gap: "0.5rem" }}>
                <span>📱 Sent via WhatsApp</span>
                <span>•</span>
                <span>📄 Download PDF</span>
              </div>
            </div>
          )}

          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(80px, 1fr))",
            gap: "0.5rem",
            marginTop: "0.75rem",
            padding: "0.75rem",
            background: "#fff",
            borderRadius: "12px",
            border: "1px solid #E2E8F0"
          }}>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: "1.1rem", fontWeight: 700, color: "#2563EB" }}>4</div>
              <div style={{ fontSize: "0.65rem", color: "#64748B" }}>Visits</div>
            </div>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: "1.1rem", fontWeight: 700, color: "#10B981" }}>98%</div>
              <div style={{ fontSize: "0.65rem", color: "#64748B" }}>Adherence</div>
            </div>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: "1.1rem", fontWeight: 700, color: "#F59E0B" }}>4.8★</div>
              <div style={{ fontSize: "0.65rem", color: "#64748B" }}>Rating</div>
            </div>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: "1.1rem", fontWeight: 700, color: "#EC4899" }}>2</div>
              <div style={{ fontSize: "0.65rem", color: "#64748B" }}>Reminders</div>
            </div>
          </div>
        </div>
      )}

      {!demoPatient && (
        <div style={{
          textAlign: "center",
          padding: "2rem",
          color: "#94A3B8",
          background: "#F8FAFC",
          borderRadius: "12px",
          border: "1.5px dashed #E2E8F0"
        }}>
          👆 Click on a patient above to see the portal in action
        </div>
      )}

      {/* ===== SECTION 7: NUMBERS ===== */}
      <h2 style={{
        fontFamily: "'Bricolage Grotesque', sans-serif",
        fontSize: "1.5rem",
        fontWeight: 700,
        marginTop: "2.5rem",
        marginBottom: "0.5rem"
      }}>
        📊 Orbnix by the Numbers
      </h2>
      <p style={{ color: "#64748B", marginBottom: "1.5rem" }}>
        Real results from clinics across India:
      </p>

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
        gap: "1rem",
        marginBottom: "1.5rem"
      }}>
        {[
          { value: "50+", label: "Clinic Websites Built", icon: "🏥" },
          { value: "4.9★", label: "Average Client Rating", icon: "⭐" },
          { value: "80%", label: "Phone Call Reduction", icon: "📞" },
          { value: "14 Days", label: "Average Delivery", icon: "⚡" },
          { value: "100%", label: "Code Ownership", icon: "🔒" },
          { value: "₹2Cr+", label: "Revenue Generated", icon: "💰" }
        ].map(stat => (
          <div
            key={stat.label}
            style={{
              background: "#fff",
              borderRadius: "14px",
              padding: "1.25rem",
              textAlign: "center",
              border: "1.5px solid #E2E8F0",
              transition: "all 0.3s"
            }}
            onMouseEnter={e => {
              e.currentTarget.style.borderColor = "#2563EB";
              e.currentTarget.style.transform = "translateY(-4px)";
              e.currentTarget.style.boxShadow = "0 8px 24px rgba(0,0,0,0.08)";
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = "#E2E8F0";
              e.currentTarget.style.transform = "none";
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            <div style={{ fontSize: "2rem" }}>{stat.icon}</div>
            <div style={{ fontSize: "1.5rem", fontWeight: 900, color: "#2563EB" }}>{stat.value}</div>
            <div style={{ fontSize: "0.8rem", color: "#64748B" }}>{stat.label}</div>
          </div>
        ))}
      </div>

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
        gap: "1rem",
        background: "#F8FAFC",
        borderRadius: "16px",
        padding: "1.5rem",
        border: "1.5px solid #E2E8F0"
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
          <span style={{ fontSize: "2rem" }}>🏆</span>
          <div>
            <div style={{ fontWeight: 700, fontSize: "0.9rem" }}>0 Missed Deadlines</div>
            <div style={{ fontSize: "0.8rem", color: "#64748B" }}>100% on-time delivery</div>
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
          <span style={{ fontSize: "2rem" }}>💬</span>
          <div>
            <div style={{ fontWeight: 700, fontSize: "0.9rem" }}>98% Client Satisfaction</div>
            <div style={{ fontSize: "0.8rem", color: "#64748B" }}>From 50+ clinic projects</div>
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
          <span style={{ fontSize: "2rem" }}>🔄</span>
          <div>
            <div style={{ fontWeight: 700, fontSize: "0.9rem" }}>30-Day Free Support</div>
            <div style={{ fontSize: "0.8rem", color: "#64748B" }}>After every launch</div>
          </div>
        </div>
      </div>

      {/* ===== SECTION 8: FAQ ===== */}
      <h2 style={{
        fontFamily: "'Bricolage Grotesque', sans-serif",
        fontSize: "1.5rem",
        fontWeight: 700,
        marginTop: "2.5rem",
        marginBottom: "0.5rem"
      }}>
        ❓ Frequently Asked Questions
      </h2>
      <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
        {faqs.map((faq, index) => (
          <div
            key={index}
            style={{
              background: "#fff",
              borderRadius: "12px",
              border: faqOpen === index ? "2px solid #2563EB" : "1.5px solid #E2E8F0",
              overflow: "hidden",
              transition: "all 0.3s"
            }}
          >
            <button
              onClick={() => toggleFaq(index)}
              style={{
                width: "100%",
                padding: "1rem 1.25rem",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                background: "none",
                border: "none",
                cursor: "pointer",
                fontFamily: "'Manrope', sans-serif",
                fontSize: "0.95rem",
                fontWeight: faqOpen === index ? 700 : 600,
                color: faqOpen === index ? "#2563EB" : "#0F172A",
                textAlign: "left"
              }}
            >
              {faq.q}
              <span style={{
                fontSize: "1.2rem",
                transition: "transform 0.3s",
                transform: faqOpen === index ? "rotate(180deg)" : "none"
              }}>
                {faqOpen === index ? "−" : "+"}
              </span>
            </button>
            {faqOpen === index && (
              <div style={{
                padding: "0 1.25rem 1.25rem",
                color: "#475569",
                fontSize: "0.9rem",
                lineHeight: 1.7,
                animation: "fadeIn 0.3s ease"
              }}>
                {faq.a}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* ===== SECTION 9: CTA ===== */}
      <div style={{
        background: "linear-gradient(135deg, #0F172A, #1E3A8A)",
        borderRadius: "16px",
        padding: "2.5rem 2rem",
        textAlign: "center",
        marginTop: "2.5rem"
      }}>
        <h3 style={{ color: "#fff", fontSize: "1.4rem", fontWeight: 800, marginBottom: "0.5rem" }}>
          🚀 Ready to Transform Your {cityName} Clinic?
        </h3>
        <p style={{ color: "rgba(255,255,255,0.8)", marginBottom: "1.5rem", maxWidth: "550px", marginLeft: "auto", marginRight: "auto" }}>
          Free consultation. Fixed pricing. 7-14 day delivery. 100% code ownership.
        </p>
        <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
          <button
            onClick={() => setShowBookingModal(true)}
            style={{
              padding: "0.9rem 2rem",
              background: "#F97316",
              color: "#fff",
              border: "none",
              borderRadius: "12px",
              fontWeight: 700,
              fontSize: "1rem",
              cursor: "pointer",
              boxShadow: "0 4px 16px rgba(249,115,22,0.4)",
              transition: "all 0.2s"
            }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = "translateY(-3px)";
              e.currentTarget.style.boxShadow = "0 8px 24px rgba(249,115,22,0.5)";
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = "none";
              e.currentTarget.style.boxShadow = "0 4px 16px rgba(249,115,22,0.4)";
            }}
          >
            Book Free Consultation →
          </button>
          <a
            href="https://wa.me/919358812928"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              padding: "0.9rem 2rem",
              background: "rgba(255,255,255,0.1)",
              color: "#fff",
              border: "1.5px solid rgba(255,255,255,0.2)",
              borderRadius: "12px",
              fontWeight: 700,
              fontSize: "1rem",
              textDecoration: "none",
              transition: "all 0.2s"
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = "rgba(255,255,255,0.2)";
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = "rgba(255,255,255,0.1)";
            }}
          >
            💬 WhatsApp Us
          </a>
        </div>
        <div style={{ display: "flex", justifyContent: "center", gap: "1.5rem", flexWrap: "wrap", marginTop: "1rem" }}>
          <span style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.8rem" }}>📞 +91 93588 12928</span>
          <span style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.8rem" }}>✉️ hello@orbnix.in</span>
          <span style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.8rem" }}>⏱️ 24hr Response</span>
        </div>
      </div>

      {/* ===== MODAL ===== */}
      {showBookingModal && <BookingModal />}

      {/* ===== CSS ANIMATIONS ===== */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideIn {
          from { 
            opacity: 0;
            transform: scale(0.95) translateY(10px);
          }
          to { 
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }
      `}</style>
    </div>
  );
}

export default ClinicBlogPage;