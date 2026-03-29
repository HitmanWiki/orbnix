import { useState, useEffect, useRef, Component } from "react";
import { BrowserRouter, useNavigate, useLocation } from "react-router-dom";

// ─── FONTS & GLOBAL STYLES ──────────────────────────────────────────────────
const GlobalStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&family=Bricolage+Grotesque:opsz,wght@12..96,400;12..96,600;12..96,700;12..96,800&family=JetBrains+Mono:wght@400;500&display=swap');
    *,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
    html{scroll-behavior:smooth;}
    body{font-family:'Manrope',sans-serif;background:#fff;color:#0F172A;overflow-x:hidden;}
    ::-webkit-scrollbar{width:4px;}
    ::-webkit-scrollbar-thumb{background:#2563EB;border-radius:4px;}
    a{text-decoration:none;color:inherit;}
    @keyframes float{0%,100%{transform:translateY(0);}50%{transform:translateY(-12px);}}
    @keyframes pulse{0%,100%{box-shadow:0 0 0 0 rgba(16,185,129,.5);}60%{box-shadow:0 0 0 8px rgba(16,185,129,0);}}
    @keyframes ticker{from{transform:translateX(0);}to{transform:translateX(-50%);}}
    @keyframes blink{0%,100%{opacity:1;}50%{opacity:0;}}
    @keyframes slideInRight{from{opacity:0;transform:translateX(20px);}to{opacity:1;transform:translateX(0);}}
    @media(max-width:768px){
      .social-sidebar{display:none!important;}
    }
    @keyframes fadeIn{from{opacity:0;}to{opacity:1;}}
    @keyframes slideIn{from{opacity:0;transform:scale(.96);}to{opacity:1;transform:scale(1);}}
    html,body,#root{width:100%;min-height:100vh;}
    section{width:100%;box-sizing:border-box;}
    svg{max-width:100%;height:auto;}

    /* ── RESPONSIVE UTILITIES ── */
    .nav-links{display:flex;}
    .nav-ctas{display:flex;}
    .hamburger{display:none;}
    .hero-grid{display:flex;flex-wrap:wrap;gap:2.5rem;align-items:center;}
    .hero-text{flex:1 1 380px;min-width:0;}
    .hero-visual{flex:1 1 320px;min-width:0;display:flex;align-items:center;justify-content:center;}
    .grid-2{display:grid;grid-template-columns:1fr 1.5fr;gap:3rem;align-items:start;}
    .grid-services{display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:1.25rem;}
    .grid-portfolio{display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:1.25rem;}
    .grid-testimonials{display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:1.25rem;}
    .grid-pricing{display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:1.25rem;}
    .grid-blog{display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:1.25rem;}
    .grid-cases{display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:1.25rem;}
    .grid-kpis{display:grid;grid-template-columns:repeat(auto-fit,minmax(140px,1fr));gap:.85rem;}
    .grid-stats{display:grid;grid-template-columns:repeat(auto-fit,minmax(160px,1fr));gap:1.5rem;}
    .grid-form-2{display:grid;grid-template-columns:1fr 1fr;gap:0 1rem;}
    .grid-budget{display:grid;grid-template-columns:1fr 1fr;gap:0 1rem;}
    .footer-grid{display:grid;grid-template-columns:2.2fr 1fr 1fr 1fr;gap:2.5rem;}
    .services-detail-grid{display:grid;grid-template-columns:1fr 1fr;gap:2.5rem;align-items:flex-start;}
    .phone-row{display:flex;justify-content:center;align-items:center;gap:2.5rem;flex-wrap:wrap;}
    .trust-row{display:flex;justify-content:center;gap:3rem;flex-wrap:wrap;}
    .demos-row{display:flex;gap:1rem;flex-wrap:wrap;}
    .work-header-row{display:flex;align-items:flex-end;justify-content:space-between;flex-wrap:wrap;gap:1rem;}
    .hero-stats-row{display:flex;gap:2rem;flex-wrap:wrap;}
    .hero-ctas{display:flex;gap:.85rem;flex-wrap:wrap;}
    .contact-info-item{display:flex;gap:1rem;align-items:flex-start;margin-bottom:1.5rem;}
    .pricing-intl-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:1rem;}
    .nav-mobile-menu{display:none;}

    @media(max-width:1024px){
      .footer-grid{grid-template-columns:1fr 1fr;}
      .grid-2{grid-template-columns:1fr;}
      .services-detail-grid{grid-template-columns:1fr;}
    }
    @media(max-width:768px){
      .nav-links{display:none!important;}
      .nav-ctas{display:none!important;}
      .hamburger{display:flex!important;}
      .nav-mobile-menu{display:flex;flex-direction:column;position:fixed;top:68px;left:0;right:0;background:#fff;border-bottom:1px solid #E2E8F0;z-index:998;padding:1rem 1.5rem;gap:.5rem;box-shadow:0 8px 32px rgba(0,0,0,.1);}
      .hero-grid{flex-direction:column;gap:2rem;padding:48px 5% 40px!important;}
      .hero-visual{display:none!important;}
      .hero-text{flex:none;width:100%;}
      .grid-2{grid-template-columns:1fr;gap:2rem;}
      .grid-form-2{grid-template-columns:1fr;}
      .grid-budget{grid-template-columns:1fr;}
      .footer-grid{grid-template-columns:1fr 1fr;gap:1.5rem;}
      .trust-row{gap:1.5rem;}
      .phone-row{gap:1.5rem;}
      .services-detail-grid{grid-template-columns:1fr;}
      .work-header-row{flex-direction:column;align-items:flex-start;}
      .hero-stats-row{gap:1.25rem;}
      h1{font-size:clamp(1.8rem,7vw,2.5rem)!important;}
      .section-pad{padding:50px 5%!important;}
      .section-pad-sm{padding:36px 5%!important;}
    }

    /* ── CARD HOVER EFFECTS (replaces inline onMouseEnter DOM mutation) ── */
    .card-hover{transition:all .3s cubic-bezier(.4,0,.2,1);}
    .card-hover:hover{transform:translateY(-5px);box-shadow:0 16px 48px rgba(37,99,235,.13);}
    .demo-btn:hover{border-color:#2563EB!important;background:#EFF6FF!important;transform:translateY(-2px);}
    .demo-btn{transition:all .2s;}
    .nav-link-item{transition:color .18s;}
    .nav-link-item:hover{color:#2563EB!important;}

    @media(max-width:480px){
      .footer-grid{grid-template-columns:1fr;}
      .grid-pricing{grid-template-columns:1fr;}
      .hero-ctas{flex-direction:column;}
      .hero-ctas button{width:100%!important;}
      .grid-kpis{grid-template-columns:1fr 1fr;}
      .trust-row{justify-content:space-around;}
      .nav-logo-text{font-size:1rem!important;}
    }
  `}</style>
);

// ─── COLORS ─────────────────────────────────────────────────────────────────
const C = {
  blue:"#2563EB", blueL:"#3B82F6", blueLL:"#EFF6FF",
  violet:"#7C3AED", violetL:"#8B5CF6", violetLL:"#F5F3FF",
  orange:"#F97316", orangeLL:"#FFF7ED",
  green:"#10B981", greenLL:"#ECFDF5",
  pink:"#EC4899", pinkLL:"#FDF2F8",
  yellow:"#F59E0B", yellowLL:"#FFFBEB",
  t:"#0F172A", t2:"#334155", t3:"#64748B", t4:"#94A3B8",
  bg:"#fff", bg2:"#F8FAFC", border:"#E2E8F0", border2:"#CBD5E1",
};

// ─── MODULE-LEVEL DATA (outside components — no re-creation on render) ────────

const HOME_TICKER = [
  "🌐 Web Development India","📱 Mobile App Development","🤖 AI Chatbot Development",
  "🛒 E-Commerce Websites","🏥 Clinic & Hospital Websites","🏫 School & College Websites",
  "🏰 Hotel Booking Websites","⚖️ CA Firm Websites","✏️ Architect Portfolios",
  "🏭 Manufacturer & Exporter Websites","🔮 Astrologer Websites","🍽️ Restaurant Websites",
  "🏠 Real Estate Portals","📚 EdTech & LMS Platforms","✂️ Salon Booking Systems",
  "💊 Pharmacy Websites","🚗 Car Dealer Websites","🚚 Logistics Company Websites",
  "🏋️ Gym & Fitness Websites","🎭 Wedding Planner Websites","⚡ Solar Company Websites",
  "🌾 Agriculture & Agritech","💬 WhatsApp CRM & Automation","📈 SEO & Digital Marketing",
  "⚙️ Custom ERP & CRM Software","🛡️ Insurance Company Websites","🎓 University Websites",
  "🔧 Home Services Websites","🚢 Export & Import Websites","💰 Finance & NBFC Portals",
  "🧴 Beauty Brand Websites","🌐 NGO & Trust Websites","React · Next.js · Flutter · Node.js",
  "Razorpay · WhatsApp API · Shopify · Firebase","Serving All of India · Remote-First",
];

const HOME_SERVICES = [
  { name:"Web Development",          key:"web",       icon:"🌐", color:"#2563EB", bg:"#EFF6FF",
    desc:"Websites for clinics, schools, hotels, CA firms, restaurants, real estate, factories, architects & 50+ industries — built to convert visitors to paying customers.",
    tags:["React","Next.js","WordPress","SEO-ready"] },
  { name:"Mobile App Development",   key:"mobile",    icon:"📱", color:"#7C3AED", bg:"#F5F3FF",
    desc:"Android & iOS apps using Flutter and React Native. Booking apps, delivery apps, field-service apps, customer portals — submitted to Play Store & App Store.",
    tags:["Flutter","React Native","Android","iOS"] },
  { name:"AI Agents & Chatbots",     key:"ai",        icon:"🤖", color:"#10B981", bg:"#ECFDF5",
    desc:"GPT-4o/Claude-powered AI chatbots that answer questions, capture leads, book appointments, take orders, and handle support — connected to WhatsApp.",
    tags:["GPT-4o","Claude API","WhatsApp","Lead Gen"] },
  { name:"E-Commerce & D2C Stores",  key:"ecommerce", icon:"🛒", color:"#F97316", bg:"#FFF7ED",
    desc:"Shopify, WooCommerce, and custom online stores with Razorpay/UPI/COD, GST invoices, inventory management, order tracking, and WhatsApp notifications.",
    tags:["Shopify","WooCommerce","Razorpay","D2C"] },
  { name:"UI/UX Design",             key:"design",    icon:"🎨", color:"#EC4899", bg:"#FDF2F8",
    desc:"Figma wireframes, high-fidelity prototypes, design systems, landing page design, and brand identity for startups and enterprises.",
    tags:["Figma","Framer","Tailwind CSS","Branding"] },
  { name:"SEO & Digital Marketing",  key:"seo",       icon:"📈", color:"#F59E0B", bg:"#FEF3C7",
    desc:"Local SEO for Indian businesses, Google Business Profile, technical SEO, content marketing, Google Ads, Meta Ads, and monthly rank tracking.",
    tags:["Google SEO","Local SEO","Google Ads","Content"] },
  { name:"Custom ERP & CRM",         key:"saas",      icon:"⚙️", color:"#0EA5E9", bg:"#F0F9FF",
    desc:"Custom inventory management, billing software, HR portals, school ERP, hospital management systems, and fleet tracking dashboards.",
    tags:["Custom ERP","CRM","Billing","Dashboard"] },
  { name:"WhatsApp CRM & Automation",key:"whatsapp",  icon:"💬", color:"#25D366", bg:"#F0FDF4",
    desc:"WhatsApp Business API integration, automated follow-ups, broadcast campaigns, chatbot + human handoff, lead nurturing, and payment collection.",
    tags:["WhatsApp API","Automation","CRM","Broadcasts"] },
  { name:"No-Code & Quick Launch",   key:"nocode",    icon:"⚡", color:"#7C3AED", bg:"#F5F3FF",
    desc:"Fast launch using Webflow, Framer, or Bubble — ideal for MVPs, landing pages, event pages, and portfolio sites. Live in 3–7 days.",
    tags:["Webflow","Framer","Bubble","Fast Delivery"] },
  { name:"IT Support & AMC",         key:"support",   icon:"🛠️", color:"#64748B", bg:"#F8FAFC",
    desc:"Monthly AMC plans for hosting, security, uptime monitoring, content updates, bug fixes, and technical support. Starting ₹3,500/month.",
    tags:["Hosting","Security","Maintenance","Support"] },
];

const HOME_PORTFOLIO = [
  { id:"restaurant", name:"Savoria Restaurant",  cat:"Web Development",    desc:"Full restaurant site with live menu ordering, table booking, reservations, food delivery integration and Zomato-style UI.", bg:"linear-gradient(135deg,#FFF7ED,#FEF3C7)", accent:"#F97316", preview:"🍽️" },
  { id:"clinic",     name:"LifeCare Clinic",     cat:"Healthcare",          desc:"Doctor booking system with specialist profiles, slot selection and appointment management.", bg:"linear-gradient(135deg,#ECFDF5,#D1FAE5)", accent:"#10B981", preview:"🏥" },
  { id:"school",     name:"Bright Future Academy",cat:"Education",          desc:"School website with admissions enquiry, board results, facility showcase and fee info.", bg:"linear-gradient(135deg,#DBEAFE,#EFF6FF)", accent:"#2563EB", preview:"🏫" },
  { id:"hotel",      name:"Royal Haveli Resort", cat:"Hospitality",         desc:"Heritage hotel with room showcase, direct booking system and amenity listings.", bg:"linear-gradient(135deg,#FEF3C7,#FFF7ED)", accent:"#D97706", preview:"🏰" },
  { id:"ecommerce",  name:"ShopNova Fashion",    cat:"E-Commerce",          desc:"Modern fashion store with cart, filters, payment, and order tracking.", bg:"linear-gradient(135deg,#EFF6FF,#F5F3FF)", accent:"#2563EB", preview:"🛍️" },
  { id:"ca",         name:"Sharma & Associates", cat:"CA / Professional",   desc:"CA firm website with service listings, team profiles, tax deadline tracker and enquiry form.", bg:"linear-gradient(135deg,#DBEAFE,#EFF6FF)", accent:"#1E3A8A", preview:"⚖️" },
  { id:"architect",  name:"Studio Srivastava",   cat:"Architecture",        desc:"Architect portfolio with project gallery, design process walkthrough and client enquiry.", bg:"linear-gradient(135deg,#F5F3FF,#FAF5FF)", accent:"#7C3AED", preview:"✏️" },
  { id:"factory",    name:"Precision Industries",cat:"Manufacturing",       desc:"B2B manufacturer site with product catalogue, certifications and RFQ form.", bg:"linear-gradient(135deg,#F8FAFC,#F1F5F9)", accent:"#0F172A", preview:"🏭" },
  { id:"astrologer", name:"Pandit Suresh Shastri",cat:"Astrology / Vastu", desc:"Astrologer website with service packages, testimonials and consultation booking.", bg:"linear-gradient(135deg,#1E1B4B,#312E81)", accent:"#F59E0B", preview:"🔮" },
  { id:"ai",         name:"SupportBot AI",       cat:"AI Agent",            desc:"Live AI chatbot with GPT-4 — answers real questions about Orbnix.", bg:"linear-gradient(135deg,#ECFDF5,#EFF6FF)", accent:"#10B981", preview:"🤖" },
  { id:"dashboard",  name:"Analytix SaaS",       cat:"SaaS Platform",       desc:"Full analytics dashboard with charts, live orders, and client management.", bg:"linear-gradient(135deg,#EFF6FF,#F5F3FF)", accent:"#7C3AED", preview:"📊" },
  { id:"app",        name:"FitFlow Mobile App",  cat:"Mobile App",          desc:"3-screen fitness app UI with live step counter, workout planner and stats.", bg:"linear-gradient(135deg,#F5F3FF,#FDF2F8)", accent:"#7C3AED", preview:"📱" },
  { id:"realestate", name:"PropSearch Portal",   cat:"Real Estate",         desc:"Property listing portal with advanced filters, maps, and lead capture.", bg:"linear-gradient(135deg,#0F172A11,#EFF6FF)", accent:"#2563EB", preview:"🏠" },
  { id:"lms",        name:"LearnHub LMS",        cat:"EdTech Platform",     desc:"Full online learning platform with courses, enrollment, and progress tracking.", bg:"linear-gradient(135deg,#1E1B4B22,#F5F3FF)", accent:"#7C3AED", preview:"📚" },
  { id:"booking",    name:"LuxeCuts Salon",      cat:"Booking System",      desc:"Multi-step booking flow with service selection, slot picker & WhatsApp confirm.", bg:"linear-gradient(135deg,#F5F3FF,#1E1B4B22)", accent:"#7C3AED", preview:"✂️" },
];

const HOME_TESTIMONIALS = [
  { name:"Dr. Anjali Mehta", role:"Owner, LifeCare Clinic — Jaipur", quote:"Orbnix built our clinic website with online doctor booking in just 10 days. Our appointment calls dropped 70% — patients now book online directly. Best investment for our clinic.", avBg:"linear-gradient(135deg,#10B981,#059669)", av:"AM" },
  { name:"Ramesh Sharma", role:"Director, Bright Future Academy — Jaipur", quote:"Our school website now ranks on page 1 for 'CBSE school Jaipur'. Admission enquiries have tripled since launch. The online admission form alone saves our staff 4 hours every day.", avBg:"linear-gradient(135deg,#1E40AF,#3B82F6)", av:"RS" },
  { name:"Priya Agarwal", role:"Founder, StyleHub E-Commerce — Mumbai", quote:"Our Shopify store with Razorpay integration went live in 14 days. We did ₹4.2L in sales the first month. Orbnix understood Indian payment flows and WhatsApp order notifications perfectly.", avBg:"linear-gradient(135deg,#EC4899,#F97316)", av:"PA" },
  { name:"Rajiv Gupta", role:"MD, Precision Industries Pvt Ltd — Jaipur", quote:"We needed to reach international buyers. Orbnix built our manufacturer website with product catalogue and RFQ system. We received 3 genuine export enquiries from Germany and UAE within 45 days.", avBg:"linear-gradient(135deg,#0F172A,#334155)", av:"RG" },
  { name:"Sunita Joshi", role:"Proprietor, Royal Haveli Resort — Jaipur", quote:"We were paying 22% commission to MakeMyTrip on every booking. After our direct booking website, 38% of bookings now come directly. We saved over ₹15 lakhs in OTA commission in 6 months.", avBg:"linear-gradient(135deg,#92400E,#D97706)", av:"SJ" },
  { name:"CA Arun Verma", role:"Partner, Verma & Associates CA Firm — Delhi", quote:"Our CA firm website now ranks for 'GST filing Delhi' and 'company registration Delhi'. We get 8–12 fresh leads every month from Google — clients we never would have reached through referrals alone.", avBg:"linear-gradient(135deg,#1E3A8A,#2563EB)", av:"AV" },
];

const WORK_CASES = [
  { title:"Savoria Restaurant Website",   cat:"Web Development",    result:"Online orders up 340% · Table bookings via website · Zomato integration · 4.9★ Google reviews", col:"#F97316", bg:"#FFF7ED", emoji:"🍽️", tags:["React","Node.js","Razorpay","Zomato API"] },
  { title:"ShopNova Fashion E-Commerce",  cat:"E-Commerce",          result:"₹8.2L revenue first month · 1,200 orders · WhatsApp COD alerts · GST invoices automated", col:"#2563EB", bg:"#EFF6FF", emoji:"🛍️", tags:["Shopify","Razorpay","WhatsApp","GST"] },
  { title:"AnalytiX SaaS Dashboard",      cat:"SaaS Platform",       result:"500+ paying users in 90 days · Stripe billing · Multi-tenant · 99.9% uptime", col:"#7C3AED", bg:"#F5F3FF", emoji:"📊", tags:["React","Node.js","PostgreSQL","Stripe"] },
  { title:"FitFlow Fitness Mobile App",   cat:"Mobile App",          result:"15K downloads in 60 days · 4.8★ Play Store · Push notifications · In-app payments", col:"#EC4899", bg:"#FDF2F8", emoji:"📱", tags:["Flutter","Firebase","Razorpay","Android/iOS"] },
  { title:"PropSearch Real Estate Portal",cat:"Real Estate",          result:"2,400+ property listings · WhatsApp lead bot · 180 agent signups · Page 1 SEO", col:"#0EA5E9", bg:"#F0F9FF", emoji:"🏠", tags:["Next.js","Maps API","WhatsApp","SEO"] },
  { title:"LearnHub EdTech LMS",          cat:"EdTech Platform",      result:"10K students in 90 days · 4.8★ app rating · Course payments · Certificate generation", col:"#EC4899", bg:"#FDF2F8", emoji:"🎓", tags:["React","Node.js","Stripe","Video Streaming"] },
  { title:"LifeCare Clinic Website",      cat:"Healthcare",           result:"400% more online bookings · 80% fewer phone calls · Ranks #1 for 'clinic Jaipur' · 4.9★", col:"#10B981", bg:"#ECFDF5", emoji:"🏥", tags:["React","WhatsApp Booking","SEO","Google Maps"] },
  { title:"Bright Future Academy School", cat:"Education",            result:"3x admission enquiries · ₹45L added fee collection · Online admissions · Board results page", col:"#2563EB", bg:"#EFF6FF", emoji:"🏫", tags:["Next.js","CMS","SEO","Online Forms"] },
  { title:"Royal Haveli Resort Hotel",    cat:"Hospitality",          result:"35% direct bookings · Saved ₹18L OTA commission · Razorpay booking · 4.9★ TripAdvisor", col:"#D97706", bg:"#FEF3C7", emoji:"🏰", tags:["Next.js","Razorpay","Direct Booking","SEO"] },
  { title:"Sharma & Associates CA Firm",  cat:"Professional Services", result:"5x online leads · 200% growth in GST clients · Ranks for 'CA firm Jaipur' · 12 new clients/month", col:"#1E3A8A", bg:"#DBEAFE", emoji:"⚖️", tags:["React","Local SEO","WhatsApp","Lead Forms"] },
  { title:"Studio Srivastava Architect",  cat:"Architecture",         result:"120% more project enquiries · Portfolio ranked on Google · ₹1.2Cr project pipeline", col:"#7C3AED", bg:"#F5F3FF", emoji:"✏️", tags:["React","Portfolio CMS","SEO","Enquiry System"] },
  { title:"Precision Industries B2B",     cat:"Manufacturing",        result:"22 new export buyers · $4M export orders from website · ISO cert display · RFQ automation", col:"#475569", bg:"#F1F5F9", emoji:"🏭", tags:["Next.js","B2B","Export SEO","RFQ System"] },
  { title:"Pandit Suresh Astrologer",     cat:"Astrology & Vastu",    result:"1,200+ bookings/month · ₹8L monthly revenue · Ranks for 'astrologer Jaipur' · WhatsApp booking", col:"#7C3AED", bg:"#F5F3FF", emoji:"🔮", tags:["React","Booking System","Razorpay","SEO"] },
  { title:"LuxeCuts Salon Booking",       cat:"Beauty & Wellness",    result:"3x bookings · 90% no-shows eliminated · WhatsApp reminders · Staff scheduling dashboard", col:"#7C3AED", bg:"#F5F3FF", emoji:"✂️", tags:["React","Booking Calendar","WhatsApp","Staff Portal"] },
  { title:"SupportBot AI Chatbot",        cat:"AI Agent",             result:"72% queries resolved without human · ₹2.4L support cost saved monthly · GPT-4o powered", col:"#10B981", bg:"#ECFDF5", emoji:"🤖", tags:["GPT-4o","Claude API","WhatsApp","Lead Capture"] },
];

const SERVICES_LIST = [
  { name:"Web Design & Development", icon:"🌐", col:"#2563EB", bg:"#EFF6FF",
    price:"₹25,000", intl:"$500", time:"7–14 days",
    desc:"Custom-coded, mobile-first websites for every industry. React, Next.js, WordPress. Includes on-page SEO, Google Analytics, WhatsApp button, sitemap, and 30-day support. We build for clinics, schools, hotels, CA firms, architects, restaurants, real estate, factories, pharmacies, car dealers, gyms, logistics firms, and 50+ more Indian industries.",
    tags:["React","Next.js","WordPress","Tailwind CSS","Mobile-First","SEO","WhatsApp","Razorpay"],
    feats:["Mobile-first, responsive design on all devices","On-page SEO — title tags, schema markup, sitemap","WhatsApp click-to-chat button built in","Google Analytics & Search Console setup","30-day post-launch support included","You own 100% of the code and domain"] },
  { name:"E-Commerce & Online Stores", icon:"🛒", col:"#F97316", bg:"#FFF7ED",
    price:"₹40,000", intl:"$800", time:"14–21 days",
    desc:"Shopify, WooCommerce, and fully custom online stores. Razorpay/UPI/COD checkout, GST invoice automation, WhatsApp order notifications, inventory management, and abandoned cart recovery. For D2C brands, B2B wholesalers, and retail chains.",
    tags:["Shopify","WooCommerce","Razorpay","UPI","COD","GST Invoicing","WhatsApp Alerts","Inventory"],
    feats:["Razorpay / UPI / COD payment integration","Automated GST invoice generation","WhatsApp order confirmation alerts","Product catalogue with variants & filters","Inventory management dashboard","Abandoned cart recovery emails"] },
  { name:"Mobile App Development", icon:"📱", col:"#7C3AED", bg:"#F5F3FF",
    price:"₹80,000", intl:"$1,500", time:"4–10 weeks",
    desc:"Android and iOS apps using Flutter and React Native. Booking apps, delivery apps, service apps, customer portals. Firebase push notifications, GPS tracking, payment integration, and Play Store/App Store submission.",
    tags:["Flutter","React Native","Android","iOS","Firebase","GPS","Push Notifications","App Store"],
    feats:["Single codebase for Android + iOS (Flutter)","Firebase push notifications","GPS & location tracking","Razorpay in-app payment","Play Store & App Store submission","Free 60-day bug-fix support"] },
  { name:"AI Chatbot & Agent Development", icon:"🤖", col:"#10B981", bg:"#ECFDF5",
    price:"₹40,000", intl:"$800", time:"7–14 days",
    desc:"GPT-4o and Claude-powered AI chatbots and agents. Lead qualification, appointment booking, FAQ automation, order taking, and WhatsApp handoff. Trained on your business data. For clinics, e-commerce, real estate, and SaaS companies.",
    tags:["GPT-4o","Claude API","WhatsApp API","Lead Gen","Appointment Bot","FAQ Automation"],
    feats:["Trained on your business data & FAQs","Handles lead capture & qualification","Books appointments automatically","Escalates to WhatsApp for human handoff","Works 24/7 — no staff cost","Embeds on website + WhatsApp"] },
  { name:"UI/UX Design & Branding", icon:"🎨", col:"#EC4899", bg:"#FDF2F8",
    price:"₹15,000", intl:"$300", time:"5–10 days",
    desc:"Figma wireframes, high-fidelity UI prototypes, mobile-first responsive design systems, landing page design, and complete brand identity (logo, colours, typography). For startups, product companies, and redesigns.",
    tags:["Figma","UI Design","UX Research","Branding","Logo","Design System","Landing Page"],
    feats:["Figma wireframes + high-fidelity prototypes","Mobile-first responsive design system","Logo, colour palette & typography kit","Landing page design optimised for conversion","Handoff-ready files for any developer","Unlimited revisions until approved"] },
  { name:"Custom ERP, CRM & SaaS", icon:"⚙️", col:"#0EA5E9", bg:"#F0F9FF",
    price:"₹1,50,000", intl:"$2,500", time:"8–16 weeks",
    desc:"Custom-built business software: inventory management, billing & accounting tools, HR & payroll, school ERP, hospital management, fleet tracking, vendor portals, and multi-tenant SaaS platforms. Built on React + Node.js + PostgreSQL.",
    tags:["React","Node.js","PostgreSQL","Multi-tenant","ERP","CRM","Billing","SaaS"],
    feats:["Custom-built for your exact workflow","Role-based access control","Real-time dashboards & reports","Razorpay billing & subscription management","Cloud-hosted on AWS / Vercel","Full source code ownership"] },
  { name:"SEO & Digital Marketing", icon:"📈", col:"#F59E0B", bg:"#FEF3C7",
    price:"₹12,000/mo", intl:"$250/mo", time:"Ongoing",
    desc:"Technical SEO audits, local SEO for Indian businesses, Google Business Profile setup and optimisation, keyword research, content creation, backlink building, Google Search Console, and monthly ranking reports.",
    tags:["Technical SEO","Local SEO","Google Business Profile","Content","Backlinks","Google Ads"],
    feats:["Full technical SEO audit every month","Local SEO for '[service] [city]' keywords","Google Business Profile management","2 SEO blog posts per month","Monthly rank tracking report","Google Ads management (optional add-on)"] },
  { name:"WhatsApp CRM & Automation", icon:"💬", col:"#25D366", bg:"#F0FDF4",
    price:"₹8,000/mo", intl:"$150/mo", time:"3–7 days setup",
    desc:"WhatsApp Business API integration. Automated follow-up sequences, broadcast campaigns, chatbot + human handoff, lead pipeline management, and payment links on WhatsApp.",
    tags:["WhatsApp Business API","Meta","Broadcast","Chatbot","Lead Pipeline","Payment Links"],
    feats:["Official WhatsApp Business API setup","Automated follow-up sequences","Broadcast campaigns to contacts","Chatbot + human agent handoff","Payment collection via WhatsApp","Lead pipeline with tags & notes"] },
  { name:"No-Code & Quick Launch", icon:"⚡", col:"#7C3AED", bg:"#F5F3FF",
    price:"₹12,000", intl:"$250", time:"3–7 days",
    desc:"Fast websites using Webflow, Framer, Bubble, or Carrd. Ideal for landing pages, event pages, portfolio sites, and MVPs. Live in 3–7 days, no compromise on design quality.",
    tags:["Webflow","Framer","Bubble","No-Code","Landing Page","MVP","Fast Delivery"],
    feats:["Live in 3–7 days guaranteed","Webflow / Framer / Bubble / Carrd","SEO-ready from day one","Custom domain setup included","Mobile responsive out of the box","Easy to edit yourself after handover"] },
  { name:"IT Support & Maintenance AMC", icon:"🛠️", col:"#64748B", bg:"#F8FAFC",
    price:"₹3,500/mo", intl:"$75/mo", time:"Same-day response",
    desc:"Monthly AMC for your existing website or app: hosting management, SSL renewal, security patches, uptime monitoring, content updates, speed optimisation, and bug fixes.",
    tags:["Hosting","SSL","Security","Uptime","Bug Fixes","Content Updates","Priority Support"],
    feats:["Hosting & SSL certificate management","Security patches & updates","Uptime monitoring with alerts","Up to 5 content changes per month","Page speed optimisation","Priority WhatsApp support"] },
  { name:"IT Consulting & Strategy", icon:"🧠", col:"#0F172A", bg:"#F1F5F9",
    price:"₹5,000/hr", intl:"$75/hr", time:"Flexible",
    desc:"Technology strategy for startups and SMEs: tech stack selection, architecture review, digital transformation roadmap, cost optimisation, and product roadmap planning.",
    tags:["Strategy","Architecture","Tech Stack","Digital Transformation","CTO as a Service"],
    feats:["Tech stack selection & architecture review","Digital transformation roadmap","Vendor & tool evaluation","Product roadmap planning","Team hiring & process guidance","CTO-as-a-Service for startups"] },
];

const ABOUT_TEAM = [
  { name:"Orbnix Team",   role:"Full-Stack Engineers", emoji:"👨‍💻", desc:"Senior React, Node.js, Flutter developers with 5–10 years experience. All in-house, no outsourcing." },
  { name:"Design Studio", role:"UI/UX Designers",      emoji:"🎨", desc:"Figma-first designers who obsess over conversion rates, accessibility, and mobile-first experiences." },
  { name:"AI Lab",        role:"AI/ML Engineers",       emoji:"🤖", desc:"GPT-4, LangChain, Gemini specialists. We've shipped 20+ production AI agents across India." },
  { name:"Growth Team",   role:"SEO & Marketing",       emoji:"📈", desc:"Technical SEO specialists who've ranked 50+ pages on Google Page 1 for competitive Indian keywords." },
];

const ABOUT_VALUES = [
  { icon:"🔒", title:"Code Ownership — Always",   desc:"Your code is yours. Every project. No exceptions. Written into every contract." },
  { icon:"💰", title:"Fixed Pricing — No Surprises",desc:"We quote fixed prices before we start. If scope doesn't change, the price doesn't change." },
  { icon:"⚡", title:"Speed Without Compromise",   desc:"Fast timelines because we have dedicated project teams — not single developers juggling 10 clients." },
  { icon:"🤝", title:"Honest Advice First",        desc:"If your idea has a problem, we'll tell you. We'd rather lose a project than deliver something that fails." },
  { icon:"🇮🇳", title:"Built for India",           desc:"We understand Indian payment gateways, GST compliance, regional languages, and Indian user behaviour." },
  { icon:"🌍", title:"Global Standards",           desc:"Indian prices don't mean Indian quality. Our code and design meet the same standards as $200/hr agencies." },
];


// ─── TYPED HEADING ───────────────────────────────────────────────────────────
const words = ["Websites","Mobile Apps","AI Agents","SaaS Platforms","E-Commerce Stores","Custom ERPs"];
function Typed() {
  const [idx, setIdx] = useState(0);
  const [txt, setTxt] = useState("");
  const [del, setDel] = useState(false);
  useEffect(() => {
    const w = words[idx];
    const speed = del ? 35 : 80;
    const t = setTimeout(() => {
      if (!del && txt.length < w.length) setTxt(w.slice(0, txt.length + 1));
      else if (!del && txt.length === w.length) setTimeout(() => setDel(true), 1800);
      else if (del && txt.length > 0) setTxt(w.slice(0, txt.length - 1));
      else { setDel(false); setIdx((idx + 1) % words.length); }
    }, speed);
    return () => clearTimeout(t);
  }, [txt, del, idx]);
  return (
    <span style={{background:"linear-gradient(135deg,#F97316,#EC4899)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",backgroundClip:"text"}}>
      {txt}<span style={{display:"inline-block",width:3,height:"0.9em",background:"#F97316",verticalAlign:"middle",borderRadius:2,animation:"blink .7s steps(1) infinite",marginLeft:2}}/>
    </span>
  );
}

// ─── NAV ─────────────────────────────────────────────────────────────────────
function Nav({ page, setPage }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);
  const links = [["Home","home"],["Products","products"],["About","about"],["Work","work"],["Blog","blog"],["Services","services"],["Pricing","pricing"],["Contact","contact"]];
  return (
    <>
      <nav style={{position:"fixed",top:0,left:0,right:0,zIndex:999,height:68,display:"flex",alignItems:"center",justifyContent:"space-between",padding:"0 4%",background:"rgba(255,255,255,.95)",backdropFilter:"blur(20px)",borderBottom:`1px solid ${C.border}`,boxShadow:scrolled?"0 4px 24px rgba(0,0,0,.08)":"none",transition:"box-shadow .3s"}}>
        <div style={{display:"flex",alignItems:"center",gap:10,cursor:"pointer"}} onClick={()=>{setPage("home");setMobileOpen(false);}}>
          <svg width="32" height="32" viewBox="0 0 40 40" fill="none">
            <circle cx="20" cy="20" r="9" stroke="url(#nl)" strokeWidth="2" fill="none"/>
            <circle cx="20" cy="20" r="15" stroke="url(#nl)" strokeWidth="1" fill="none" opacity=".4"/>
            <ellipse cx="20" cy="20" rx="19" ry="7" stroke="url(#nl2)" strokeWidth="1.2" fill="none" opacity=".6" transform="rotate(-30 20 20)"/>
            <circle cx="20" cy="20" r="3.5" fill="url(#nl)"/>
            <defs>
              <linearGradient id="nl" x1="2" y1="2" x2="38" y2="38" gradientUnits="userSpaceOnUse">
                <stop stopColor="#2563EB"/><stop offset=".5" stopColor="#7C3AED"/><stop offset="1" stopColor="#EC4899"/>
              </linearGradient>
              <linearGradient id="nl2" x1="0" y1="20" x2="40" y2="20" gradientUnits="userSpaceOnUse">
                <stop stopColor="#2563EB" stopOpacity="0"/><stop offset=".5" stopColor="#7C3AED"/><stop offset="1" stopColor="#2563EB" stopOpacity="0"/>
              </linearGradient>
            </defs>
          </svg>
          <span className="nav-logo-text" style={{fontFamily:"'Bricolage Grotesque',sans-serif",fontSize:"1.2rem",fontWeight:800,background:"linear-gradient(135deg,#2563EB,#7C3AED,#EC4899)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",backgroundClip:"text",letterSpacing:".02em"}}>ORBNIX</span>
        </div>
        <ul className="nav-links" style={{listStyle:"none",gap:".2rem",margin:0,padding:0}}>
          {links.map(([label,key])=>(
            <li key={key}><button onClick={()=>setPage(key)} style={{fontSize:".875rem",fontWeight:600,color:page===key?C.blue:C.t3,padding:".4rem .85rem",borderRadius:8,background:page===key?C.blueLL:"transparent",border:"none",cursor:"pointer",fontFamily:"'Manrope',sans-serif",transition:"all .2s"}}>{label}</button></li>
          ))}
        </ul>
        <div className="nav-ctas" style={{gap:".75rem"}}>
          <button onClick={()=>setPage("work")} style={{fontSize:".875rem",fontWeight:700,padding:".5rem 1.2rem",borderRadius:10,background:"transparent",color:C.blue,border:`1.5px solid ${C.blue}`,cursor:"pointer",fontFamily:"'Manrope',sans-serif"}}>View Work</button>
          <button onClick={()=>setPage("contact")} style={{fontSize:".875rem",fontWeight:700,padding:".6rem 1.4rem",borderRadius:10,background:"linear-gradient(135deg,#2563EB,#7C3AED)",color:"#fff",border:"none",cursor:"pointer",fontFamily:"'Manrope',sans-serif",boxShadow:"0 4px 16px rgba(37,99,235,.3)"}}>Get a Quote →</button>
        </div>
        <button className="hamburger" onClick={()=>setMobileOpen(!mobileOpen)} style={{display:"none",background:"transparent",border:`1.5px solid ${C.border}`,borderRadius:8,width:40,height:40,alignItems:"center",justifyContent:"center",cursor:"pointer",flexDirection:"column",gap:5}}>
          <span style={{width:18,height:2,background:C.t,borderRadius:2,display:"block"}}/>
          <span style={{width:18,height:2,background:C.t,borderRadius:2,display:"block"}}/>
          <span style={{width:18,height:2,background:C.t,borderRadius:2,display:"block"}}/>
        </button>
      </nav>
      {mobileOpen && (
        <div className="nav-mobile-menu">
          {links.map(([label,key])=>(
            <button key={key} onClick={()=>{setPage(key);setMobileOpen(false);}} style={{textAlign:"left",fontSize:".95rem",fontWeight:600,color:page===key?C.blue:C.t2,padding:".65rem .75rem",borderRadius:8,background:page===key?C.blueLL:"transparent",border:"none",cursor:"pointer",fontFamily:"'Manrope',sans-serif"}}>{label}</button>
          ))}
          <div style={{display:"flex",gap:".5rem",marginTop:".5rem",paddingTop:".75rem",borderTop:`1px solid ${C.border}`}}>
            <button onClick={()=>{setPage("work");setMobileOpen(false);}} style={{flex:1,fontSize:".875rem",fontWeight:700,padding:".6rem",borderRadius:10,background:"transparent",color:C.blue,border:`1.5px solid ${C.blue}`,cursor:"pointer",fontFamily:"'Manrope',sans-serif"}}>View Work</button>
            <button onClick={()=>{setPage("contact");setMobileOpen(false);}} style={{flex:1,fontSize:".875rem",fontWeight:700,padding:".6rem",borderRadius:10,background:"linear-gradient(135deg,#2563EB,#7C3AED)",color:"#fff",border:"none",cursor:"pointer",fontFamily:"'Manrope',sans-serif"}}>Get a Quote</button>
          </div>
        </div>
      )}
    </>
  );
}

// ─── DEMO COMPONENTS ──────────────────────────────────────────────────────────
// ─── DEMO COMPONENTS — FULL WEBSITE PREVIEWS ─────────────────────────────────
// Each demo renders a full scrollable website homepage — nav, hero, sections, footer

function DemoRestaurant() {
  const [tab, setTab] = useState("menu");
  const [cart, setCart] = useState([]);
  const menu = [
    { id:1, cat:"Starters", name:"Tandoori Platter", price:650, tag:"Chef's Pick", emoji:"🍢" },
    { id:2, cat:"Starters", name:"Paneer Tikka",     price:420, tag:"Veg",         emoji:"🧀" },
    { id:3, cat:"Mains",    name:"Laal Maas",        price:780, tag:"Spicy",       emoji:"🥘" },
    { id:4, cat:"Mains",    name:"Dal Baati Churma", price:520, tag:"Traditional", emoji:"🍛" },
    { id:5, cat:"Desserts", name:"Ghewar Brûlée",    price:350, tag:"Fusion",      emoji:"🍮" },
    { id:6, cat:"Drinks",   name:"Aam Panna Mojito", price:220, tag:"Mocktail",    emoji:"🍹" },
  ];
  const cats = ["All", ...new Set(menu.map(m => m.cat))];
  const filtered = tab === "All" ? menu : menu.filter(m => m.cat === tab);
  const total = cart.reduce((s, i) => s + i.price, 0);
  const addToCart = (item) => setCart(c => [...c, item]);

  return (
    <div style={{fontFamily:"'Manrope',sans-serif",minHeight:"100vh",background:"#FFFBF5",overflowY:"auto"}}>
      {/* NAV */}
      <nav style={{background:"#7C2D12",padding:"0 2rem",height:60,display:"flex",alignItems:"center",justifyContent:"space-between",position:"sticky",top:0,zIndex:50}}>
        <div style={{display:"flex",alignItems:"center",gap:10}}>
          <span style={{fontSize:"1.5rem"}}>🌸</span>
          <span style={{fontFamily:"'Bricolage Grotesque',sans-serif",fontSize:"1.2rem",fontWeight:900,color:"#fff",letterSpacing:"-.01em"}}>Savoria</span>
        </div>
        <div style={{display:"flex",gap:"1.5rem"}}>
          {["Menu","About","Reservations","Contact"].map(n => (
            <span key={n} style={{color:"rgba(255,255,255,.8)",fontSize:".85rem",fontWeight:600,cursor:"pointer"}}>{n}</span>
          ))}
        </div>
        <div style={{background:"#fbbf24",color:"#7c2d12",padding:".4rem 1.1rem",borderRadius:20,fontWeight:800,fontSize:".82rem",cursor:"pointer"}}>
          Book Table
        </div>
      </nav>

      {/* HERO */}
      <div style={{background:"linear-gradient(135deg,#7C2D12 0%,#92400E 50%,#B45309 100%)",padding:"5rem 2rem",textAlign:"center",position:"relative",overflow:"hidden"}}>
        <div style={{position:"absolute",inset:0,background:"url('data:image/svg+xml,<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 100 100\"><circle cx=\"20\" cy=\"20\" r=\"40\" fill=\"rgba(255,255,255,.03)\"/><circle cx=\"80\" cy=\"80\" r=\"60\" fill=\"rgba(255,255,255,.02)\"/></svg>')",backgroundSize:"cover"}}/>
        <div style={{position:"relative"}}>
          <div style={{display:"inline-block",background:"rgba(251,191,36,.2)",border:"1px solid rgba(251,191,36,.4)",borderRadius:20,padding:".3rem 1rem",fontSize:".75rem",color:"#fbbf24",marginBottom:"1.2rem",letterSpacing:".1em"}}>JAIPUR · EST. 2018</div>
          <h1 style={{fontFamily:"'Bricolage Grotesque',sans-serif",fontSize:"clamp(2.5rem,6vw,4.5rem)",fontWeight:900,color:"#fff",marginBottom:"1rem",lineHeight:1.05}}>Fine Dining<br/><span style={{color:"#fbbf24"}}>Reimagined</span></h1>
          <p style={{color:"rgba(255,255,255,.75)",fontSize:"1.1rem",maxWidth:500,margin:"0 auto 2rem",lineHeight:1.7}}>Authentic Rajasthani flavours with a modern culinary twist. Fresh ingredients. Handcrafted cocktails. Unforgettable evenings.</p>
          <div style={{display:"flex",gap:"1rem",justifyContent:"center",flexWrap:"wrap"}}>
            <div style={{background:"#fbbf24",color:"#7c2d12",padding:".85rem 2rem",borderRadius:12,fontWeight:800,fontSize:".95rem",cursor:"pointer"}}>Reserve a Table →</div>
            <div style={{background:"rgba(255,255,255,.1)",color:"#fff",padding:".85rem 2rem",borderRadius:12,fontWeight:700,fontSize:".95rem",border:"1.5px solid rgba(255,255,255,.25)",cursor:"pointer"}}>View Menu</div>
          </div>
        </div>
      </div>

      {/* STATS BAR */}
      <div style={{background:"#fff",padding:"1.5rem 2rem",display:"flex",justifyContent:"center",gap:"3rem",flexWrap:"wrap",boxShadow:"0 4px 24px rgba(0,0,0,.06)"}}>
        {[["500+","Happy Guests/Month"],["4.9★","Google Rating"],["12","Years of Excellence"],["50+","Menu Items"]].map(([n,l]) => (
          <div key={l} style={{textAlign:"center"}}>
            <div style={{fontFamily:"'Bricolage Grotesque',sans-serif",fontSize:"1.8rem",fontWeight:900,color:"#7c2d12"}}>{n}</div>
            <div style={{fontSize:".8rem",color:"#6b7280",fontWeight:600}}>{l}</div>
          </div>
        ))}
      </div>

      {/* MENU */}
      <div style={{padding:"3rem 2rem",maxWidth:900,margin:"0 auto"}}>
        <h2 style={{fontFamily:"'Bricolage Grotesque',sans-serif",fontSize:"2rem",fontWeight:900,color:"#1c0a00",textAlign:"center",marginBottom:"2rem"}}>Our Menu</h2>
        <div style={{display:"flex",gap:".75rem",marginBottom:"2rem",justifyContent:"center",flexWrap:"wrap"}}>
          {cats.map(c => (
            <div key={c} onClick={() => setTab(c)} style={{padding:".5rem 1.25rem",borderRadius:20,fontWeight:700,fontSize:".85rem",cursor:"pointer",background: tab===c ? "#7c2d12" : "#f3f4f6",color: tab===c ? "#fff" : "#374151",transition:"all .15s"}}>{c}</div>
          ))}
        </div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(250px,1fr))",gap:"1rem"}}>
          {filtered.map(item => (
            <div key={item.id} style={{background:"#fff",borderRadius:16,padding:"1.25rem",border:"1.5px solid #f3e8d8",boxShadow:"0 2px 8px rgba(0,0,0,.04)"}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:".5rem"}}>
                <span style={{fontSize:"2rem"}}>{item.emoji}</span>
                <span style={{background:"#fef3c7",color:"#92400e",borderRadius:8,padding:".2rem .6rem",fontSize:".7rem",fontWeight:700}}>{item.tag}</span>
              </div>
              <div style={{fontFamily:"'Bricolage Grotesque',sans-serif",fontWeight:800,fontSize:"1rem",color:"#1c0a00",marginBottom:".25rem"}}>{item.name}</div>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginTop:".75rem"}}>
                <span style={{fontWeight:800,color:"#7c2d12",fontSize:"1.05rem"}}>₹{item.price}</span>
                <div onClick={() => addToCart(item)} style={{background:"#7c2d12",color:"#fff",padding:".35rem .9rem",borderRadius:8,fontSize:".8rem",fontWeight:700,cursor:"pointer"}}>+ Add</div>
              </div>
            </div>
          ))}
        </div>
        {cart.length > 0 && (
          <div style={{position:"sticky",bottom:16,background:"#7c2d12",color:"#fff",borderRadius:16,padding:"1rem 1.5rem",display:"flex",justifyContent:"space-between",alignItems:"center",marginTop:"1.5rem",boxShadow:"0 8px 32px rgba(124,45,18,.4)"}}>
            <span style={{fontWeight:700}}>{cart.length} item{cart.length>1?"s":""} in cart</span>
            <span style={{fontWeight:900,fontSize:"1.1rem"}}>₹{total} →</span>
          </div>
        )}
      </div>

      {/* ABOUT STRIP */}
      <div style={{background:"#7c2d12",padding:"3rem 2rem",textAlign:"center"}}>
        <h2 style={{fontFamily:"'Bricolage Grotesque',sans-serif",fontSize:"1.8rem",fontWeight:900,color:"#fff",marginBottom:".75rem"}}>A Table for Every Occasion</h2>
        <p style={{color:"rgba(255,255,255,.7)",maxWidth:500,margin:"0 auto 1.5rem",lineHeight:1.7}}>Private dining rooms, rooftop terrace, live ghazal evenings every Friday. Make a reservation and experience Savoria.</p>
        <div style={{display:"inline-block",background:"#fbbf24",color:"#7c2d12",padding:".75rem 2rem",borderRadius:12,fontWeight:800,cursor:"pointer"}}>Book Your Table Tonight →</div>
      </div>

      {/* FOOTER */}
      <div style={{background:"#1c0a00",padding:"2rem",display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:"1rem"}}>
        <div style={{color:"rgba(255,255,255,.5)",fontSize:".8rem"}}>© 2025 Savoria Restaurant, Jaipur</div>
        <div style={{color:"rgba(255,255,255,.5)",fontSize:".8rem"}}>📍 MI Road, Jaipur · 📞 +91 98765 43210</div>
        <div style={{color:"#fbbf24",fontSize:".75rem",fontWeight:700}}>Website by Orbnix</div>
      </div>
    </div>
  );
}

function DemoHotel() {
  const [month, setMonth] = useState("Mar 2025");
  const [guests, setGuests] = useState(2);
  const rooms = [
    { name:"Deluxe Room", size:"320 sq ft", price:4500, tag:"Best Value", emoji:"🛏️", features:["King Bed","City View","Free WiFi","Breakfast"] },
    { name:"Heritage Suite", size:"520 sq ft", price:8500, tag:"Most Popular", emoji:"🏰", features:["King Bed","Courtyard View","Butler","Spa Access"] },
    { name:"Royal Haveli Suite", size:"900 sq ft", price:14000, tag:"Luxury", emoji:"👑", features:["2 Bedrooms","Private Pool","Personal Chef","Airport Transfer"] },
  ];
  return (
    <div style={{fontFamily:"'Manrope',sans-serif",minHeight:"100vh",background:"#fafaf8",overflowY:"auto"}}>
      {/* NAV */}
      <nav style={{background:"rgba(255,255,255,.95)",backdropFilter:"blur(10px)",padding:"0 2rem",height:64,display:"flex",alignItems:"center",justifyContent:"space-between",borderBottom:"1px solid #e7e5e0",position:"sticky",top:0,zIndex:50}}>
        <div style={{display:"flex",alignItems:"center",gap:10}}>
          <span style={{fontSize:"1.4rem"}}>🏰</span>
          <div>
            <div style={{fontFamily:"'Bricolage Grotesque',sans-serif",fontSize:"1.1rem",fontWeight:900,color:"#1a1208",lineHeight:1}}>Royal Haveli</div>
            <div style={{fontSize:".65rem",color:"#a0926e",letterSpacing:".1em",fontWeight:600}}>RESORT & SPA</div>
          </div>
        </div>
        <div style={{display:"flex",gap:"1.5rem"}}>
          {["Rooms","Dining","Spa","Experiences","Gallery"].map(n => (
            <span key={n} style={{color:"#5c4a2a",fontSize:".85rem",fontWeight:600,cursor:"pointer"}}>{n}</span>
          ))}
        </div>
        <div style={{background:"#8B5E3C",color:"#fff",padding:".5rem 1.25rem",borderRadius:8,fontWeight:700,fontSize:".82rem",cursor:"pointer"}}>Check Availability</div>
      </nav>

      {/* HERO */}
      <div style={{background:"linear-gradient(to bottom, rgba(20,12,4,.5) 0%, rgba(20,12,4,.2) 50%, rgba(20,12,4,.7) 100%), linear-gradient(135deg,#3d2b1f 0%,#6b4423 100%)",padding:"6rem 2rem",textAlign:"center",position:"relative"}}>
        <div style={{position:"absolute",inset:0,display:"flex",alignItems:"center",justifyContent:"center",fontSize:"8rem",opacity:.05}}>🏯</div>
        <div style={{position:"relative"}}>
          <div style={{display:"inline-block",border:"1px solid rgba(212,175,55,.5)",borderRadius:4,padding:".35rem 1.2rem",fontSize:".72rem",color:"#d4af37",marginBottom:"1.5rem",letterSpacing:".2em",fontWeight:600}}>UDAIPUR · RAJASTHAN · INDIA</div>
          <h1 style={{fontFamily:"'Bricolage Grotesque',sans-serif",fontSize:"clamp(2.5rem,6vw,5rem)",fontWeight:900,color:"#fff",marginBottom:"1rem",lineHeight:1.05}}>Stay Like<br/><span style={{color:"#d4af37"}}>Royalty</span></h1>
          <p style={{color:"rgba(255,255,255,.75)",fontSize:"1.1rem",maxWidth:520,margin:"0 auto 2.5rem",lineHeight:1.75}}>A 19th century haveli restored to its original grandeur. 42 heritage rooms, a rooftop pool and a Michelin-starred restaurant.</p>
          {/* BOOKING BAR */}
          <div style={{background:"rgba(255,255,255,.95)",borderRadius:16,padding:"1.25rem 1.5rem",display:"inline-flex",gap:"1rem",flexWrap:"wrap",alignItems:"center",boxShadow:"0 8px 40px rgba(0,0,0,.3)"}}>
            {[["Check-In","15 Mar 2025"],["Check-Out","18 Mar 2025"],["Guests",guests+" Adults"]].map(([label,val]) => (
              <div key={label} style={{textAlign:"left",minWidth:110}}>
                <div style={{fontSize:".7rem",color:"#9ca3af",fontWeight:700,marginBottom:".2rem",letterSpacing:".05em"}}>{label.toUpperCase()}</div>
                <div style={{fontWeight:700,color:"#1a1208",fontSize:".95rem"}}>{val}</div>
              </div>
            ))}
            <div style={{background:"#8B5E3C",color:"#fff",padding:".75rem 1.75rem",borderRadius:10,fontWeight:800,fontSize:".9rem",cursor:"pointer",whiteSpace:"nowrap"}}>Search Rooms</div>
          </div>
        </div>
      </div>

      {/* ROOMS */}
      <div style={{padding:"4rem 2rem",maxWidth:1000,margin:"0 auto"}}>
        <h2 style={{fontFamily:"'Bricolage Grotesque',sans-serif",fontSize:"2rem",fontWeight:900,color:"#1a1208",textAlign:"center",marginBottom:".5rem"}}>Our Rooms & Suites</h2>
        <p style={{textAlign:"center",color:"#7c6a4e",marginBottom:"2.5rem"}}>Every room tells a story. Every stay, a memory.</p>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(280px,1fr))",gap:"1.5rem"}}>
          {rooms.map(r => (
            <div key={r.name} style={{background:"#fff",borderRadius:20,overflow:"hidden",border:"1.5px solid #e7e5e0",boxShadow:"0 4px 20px rgba(0,0,0,.05)"}}>
              <div style={{background:"linear-gradient(135deg,#3d2b1f,#8B5E3C)",height:160,display:"flex",alignItems:"center",justifyContent:"center",fontSize:"4rem",position:"relative"}}>
                {r.emoji}
                <div style={{position:"absolute",top:12,right:12,background:"#d4af37",color:"#1a1208",borderRadius:8,padding:".2rem .7rem",fontSize:".7rem",fontWeight:800}}>{r.tag}</div>
              </div>
              <div style={{padding:"1.25rem"}}>
                <div style={{fontFamily:"'Bricolage Grotesque',sans-serif",fontWeight:800,fontSize:"1.1rem",color:"#1a1208",marginBottom:".2rem"}}>{r.name}</div>
                <div style={{fontSize:".8rem",color:"#7c6a4e",marginBottom:"1rem"}}>{r.size}</div>
                <div style={{display:"flex",flexWrap:"wrap",gap:".4rem",marginBottom:"1rem"}}>
                  {r.features.map(f => (
                    <span key={f} style={{background:"#faf7f2",border:"1px solid #e7e5e0",borderRadius:6,padding:".2rem .6rem",fontSize:".72rem",color:"#5c4a2a",fontWeight:600}}>✓ {f}</span>
                  ))}
                </div>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                  <div><span style={{fontFamily:"'Bricolage Grotesque',sans-serif",fontWeight:900,fontSize:"1.3rem",color:"#8B5E3C"}}>₹{r.price.toLocaleString()}</span><span style={{fontSize:".75rem",color:"#9ca3af"}}>/night</span></div>
                  <div style={{background:"#8B5E3C",color:"#fff",padding:".5rem 1.1rem",borderRadius:8,fontWeight:700,fontSize:".82rem",cursor:"pointer"}}>Book Now</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* AMENITIES */}
      <div style={{background:"#3d2b1f",padding:"3rem 2rem",textAlign:"center"}}>
        <h2 style={{fontFamily:"'Bricolage Grotesque',sans-serif",fontSize:"1.8rem",fontWeight:900,color:"#d4af37",marginBottom:"2rem"}}>World-Class Amenities</h2>
        <div style={{display:"flex",justifyContent:"center",gap:"2.5rem",flexWrap:"wrap"}}>
          {["🌊 Rooftop Pool","🧖 Ayurvedic Spa","🍽️ Fine Dining","🏋️ Fitness Centre","🎭 Cultural Evenings","🚗 Airport Transfers"].map(a => (
            <div key={a} style={{color:"rgba(255,255,255,.8)",fontSize:".9rem",fontWeight:600}}>{a}</div>
          ))}
        </div>
      </div>

      {/* FOOTER */}
      <div style={{background:"#1a1208",padding:"2rem",display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:"1rem"}}>
        <div style={{color:"rgba(255,255,255,.4)",fontSize:".8rem"}}>© 2025 Royal Haveli Resort, Udaipur</div>
        <div style={{color:"#d4af37",fontSize:".75rem",fontWeight:700}}>Website by Orbnix</div>
      </div>
    </div>
  );
}

function DemoClinic() {
  const [tab, setTab] = useState("doctors");
  const doctors = [
    { name:"Dr. Priya Sharma", spec:"Cardiologist", exp:"15 yrs", rating:"4.9", slots:["9:00 AM","11:30 AM","4:00 PM"], emoji:"👩‍⚕️" },
    { name:"Dr. Rahul Verma",  spec:"Orthopaedic",  exp:"12 yrs", rating:"4.8", slots:["10:00 AM","2:00 PM","5:30 PM"], emoji:"👨‍⚕️" },
    { name:"Dr. Ananya Patel", spec:"Paediatrician",exp:"8 yrs",  rating:"5.0", slots:["9:30 AM","1:00 PM","4:30 PM"], emoji:"👩‍⚕️" },
  ];
  const [booked, setBooked] = useState(null);
  return (
    <div style={{fontFamily:"'Manrope',sans-serif",minHeight:"100vh",background:"#f0f9ff",overflowY:"auto"}}>
      {/* NAV */}
      <nav style={{background:"#fff",padding:"0 2rem",height:64,display:"flex",alignItems:"center",justifyContent:"space-between",borderBottom:"1px solid #e0f2fe",position:"sticky",top:0,zIndex:50,boxShadow:"0 2px 12px rgba(0,0,0,.04)"}}>
        <div style={{display:"flex",alignItems:"center",gap:10}}>
          <div style={{width:36,height:36,background:"linear-gradient(135deg,#0ea5e9,#0284c7)",borderRadius:10,display:"flex",alignItems:"center",justifyContent:"center",fontSize:"1.1rem"}}>❤️</div>
          <div>
            <div style={{fontFamily:"'Bricolage Grotesque',sans-serif",fontSize:"1.1rem",fontWeight:900,color:"#0c4a6e",lineHeight:1}}>LifeCare Clinic</div>
            <div style={{fontSize:".65rem",color:"#0ea5e9",letterSpacing:".08em",fontWeight:600}}>MULTISPECIALITY HOSPITAL</div>
          </div>
        </div>
        <div style={{display:"flex",gap:"1.5rem"}}>
          {["Home","Doctors","Services","Lab Tests","Contact"].map(n => (
            <span key={n} style={{color:"#374151",fontSize:".85rem",fontWeight:600,cursor:"pointer"}}>{n}</span>
          ))}
        </div>
        <div style={{background:"#0ea5e9",color:"#fff",padding:".5rem 1.25rem",borderRadius:8,fontWeight:700,fontSize:".82rem",cursor:"pointer"}}>📞 Emergency</div>
      </nav>

      {/* HERO */}
      <div style={{background:"linear-gradient(135deg,#0c4a6e 0%,#0369a1 60%,#0ea5e9 100%)",padding:"4rem 2rem",position:"relative",overflow:"hidden"}}>
        <div style={{position:"absolute",right:"-5%",top:"-20%",width:"45%",height:"140%",background:"rgba(255,255,255,.04)",borderRadius:"50%"}}/>
        <div style={{maxWidth:800,margin:"0 auto",display:"grid",gridTemplateColumns:"1fr 1fr",gap:"2rem",alignItems:"center"}}>
          <div>
            <div style={{display:"inline-block",background:"rgba(251,191,36,.2)",border:"1px solid rgba(251,191,36,.4)",borderRadius:20,padding:".3rem 1rem",fontSize:".72rem",color:"#fbbf24",marginBottom:"1.2rem",letterSpacing:".1em",fontWeight:700}}>TRUSTED BY 10,000+ PATIENTS</div>
            <h1 style={{fontFamily:"'Bricolage Grotesque',sans-serif",fontSize:"clamp(2rem,5vw,3.2rem)",fontWeight:900,color:"#fff",marginBottom:"1rem",lineHeight:1.1}}>Your Health,<br/>Our <span style={{color:"#7dd3fc"}}>Priority</span></h1>
            <p style={{color:"rgba(255,255,255,.75)",lineHeight:1.7,marginBottom:"1.75rem",fontSize:".95rem"}}>Book appointments with top specialists, get lab results online and manage your family's health — all in one place.</p>
            <div style={{display:"flex",gap:".75rem",flexWrap:"wrap"}}>
              <div style={{background:"#fff",color:"#0369a1",padding:".75rem 1.5rem",borderRadius:10,fontWeight:800,fontSize:".88rem",cursor:"pointer"}}>Book Appointment →</div>
              <div style={{background:"rgba(255,255,255,.12)",color:"#fff",padding:".75rem 1.5rem",borderRadius:10,fontWeight:700,fontSize:".88rem",border:"1.5px solid rgba(255,255,255,.25)",cursor:"pointer"}}>View Doctors</div>
            </div>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:".75rem"}}>
            {[["30+","Specialists"],["10K+","Patients"],["4.9★","Rating"],["24/7","Emergency"]].map(([n,l]) => (
              <div key={l} style={{background:"rgba(255,255,255,.1)",borderRadius:14,padding:"1.1rem",textAlign:"center",border:"1.5px solid rgba(255,255,255,.15)"}}>
                <div style={{fontFamily:"'Bricolage Grotesque',sans-serif",fontSize:"1.6rem",fontWeight:900,color:"#fff"}}>{n}</div>
                <div style={{fontSize:".75rem",color:"rgba(255,255,255,.65)",fontWeight:600}}>{l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* SERVICES STRIP */}
      <div style={{background:"#fff",padding:"1.5rem 2rem",boxShadow:"0 4px 20px rgba(0,0,0,.04)"}}>
        <div style={{display:"flex",justifyContent:"center",gap:"1.5rem",flexWrap:"wrap"}}>
          {["🫀 Cardiology","🦴 Orthopaedics","👶 Paediatrics","🧠 Neurology","👁️ Ophthalmology","🦷 Dentistry"].map(s => (
            <div key={s} style={{background:"#f0f9ff",color:"#0369a1",borderRadius:10,padding:".5rem 1rem",fontSize:".82rem",fontWeight:700,cursor:"pointer"}}>{s}</div>
          ))}
        </div>
      </div>

      {/* DOCTORS */}
      <div style={{padding:"3rem 2rem",maxWidth:900,margin:"0 auto"}}>
        <h2 style={{fontFamily:"'Bricolage Grotesque',sans-serif",fontSize:"2rem",fontWeight:900,color:"#0c4a6e",textAlign:"center",marginBottom:".5rem"}}>Our Doctors</h2>
        <p style={{textAlign:"center",color:"#64748b",marginBottom:"2.5rem"}}>Book an appointment directly — online or in-clinic</p>
        {doctors.map(doc => (
          <div key={doc.name} style={{background:"#fff",borderRadius:18,padding:"1.5rem",marginBottom:"1rem",border:"1.5px solid #e0f2fe",display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:"1rem",boxShadow:"0 2px 12px rgba(0,0,0,.04)"}}>
            <div style={{display:"flex",gap:"1rem",alignItems:"center"}}>
              <div style={{width:60,height:60,background:"linear-gradient(135deg,#0ea5e9,#0284c7)",borderRadius:16,display:"flex",alignItems:"center",justifyContent:"center",fontSize:"2rem"}}>{doc.emoji}</div>
              <div>
                <div style={{fontFamily:"'Bricolage Grotesque',sans-serif",fontWeight:800,fontSize:"1.05rem",color:"#0c4a6e"}}>{doc.name}</div>
                <div style={{fontSize:".82rem",color:"#0ea5e9",fontWeight:700}}>{doc.spec}</div>
                <div style={{fontSize:".78rem",color:"#64748b"}}>{doc.exp} experience · ⭐ {doc.rating}</div>
              </div>
            </div>
            <div style={{display:"flex",gap:".5rem",flexWrap:"wrap"}}>
              {doc.slots.map(slot => (
                <div key={slot} onClick={() => setBooked(doc.name + " · " + slot)} style={{background: booked===doc.name+" · "+slot ? "#0ea5e9" : "#f0f9ff",color: booked===doc.name+" · "+slot ? "#fff" : "#0369a1",borderRadius:8,padding:".4rem .9rem",fontSize:".78rem",fontWeight:700,cursor:"pointer",border:"1.5px solid #bae6fd",transition:"all .15s"}}>{slot}</div>
              ))}
            </div>
          </div>
        ))}
        {booked && <div style={{background:"#dcfce7",border:"1.5px solid #86efac",borderRadius:12,padding:"1rem 1.5rem",textAlign:"center",color:"#166534",fontWeight:700}}>✅ Appointment booked — {booked}</div>}
      </div>

      {/* FOOTER */}
      <div style={{background:"#0c4a6e",padding:"2rem",display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:"1rem"}}>
        <div style={{color:"rgba(255,255,255,.5)",fontSize:".8rem"}}>© 2025 LifeCare Clinic · All Rights Reserved</div>
        <div style={{color:"#7dd3fc",fontSize:".75rem",fontWeight:700}}>Website by Orbnix</div>
      </div>
    </div>
  );
}

function DemoSchool() {
  const [tab, setTab] = useState("about");
  const stats = [["2,400+","Students"],["180+","Faculty"],["98%","Board Results"],["Est. 1994","30 Years"]];
  const programs = [
    { name:"Pre-Primary (Nursery–KG)", age:"3–5 years", icon:"🎨", desc:"Play-based learning with Montessori methodology. Activity rooms, storytelling and creative arts." },
    { name:"Primary School (I–V)", age:"6–10 years", icon:"📚", desc:"Strong foundation in Maths, Science, English and Hindi. Sports, music and coding introduced." },
    { name:"Middle School (VI–VIII)", age:"11–13 years", icon:"🔬", desc:"Subject specialisation, science labs, debate club and leadership programmes." },
    { name:"Secondary (IX–X)", age:"14–15 years", icon:"🏆", desc:"CBSE board preparation with 98% pass rate. Individual mentoring and career guidance." },
  ];
  return (
    <div style={{fontFamily:"'Manrope',sans-serif",minHeight:"100vh",background:"#fafffe",overflowY:"auto"}}>
      {/* NAV */}
      <nav style={{background:"#fff",padding:"0 2rem",height:64,display:"flex",alignItems:"center",justifyContent:"space-between",borderBottom:"1px solid #e2e8f0",position:"sticky",top:0,zIndex:50,boxShadow:"0 2px 8px rgba(0,0,0,.04)"}}>
        <div style={{display:"flex",alignItems:"center",gap:10}}>
          <div style={{width:40,height:40,background:"linear-gradient(135deg,#15803d,#16a34a)",borderRadius:10,display:"flex",alignItems:"center",justifyContent:"center",fontSize:"1.3rem"}}>🎓</div>
          <div>
            <div style={{fontFamily:"'Bricolage Grotesque',sans-serif",fontSize:"1.05rem",fontWeight:900,color:"#14532d",lineHeight:1}}>Bright Future Academy</div>
            <div style={{fontSize:".6rem",color:"#16a34a",letterSpacing:".08em",fontWeight:700}}>CBSE AFFILIATED · JAIPUR</div>
          </div>
        </div>
        <div style={{display:"flex",gap:"1.5rem"}}>
          {["Home","About","Admissions","Academics","Gallery","Contact"].map(n => (
            <span key={n} style={{color:"#374151",fontSize:".82rem",fontWeight:600,cursor:"pointer"}}>{n}</span>
          ))}
        </div>
        <div style={{background:"#15803d",color:"#fff",padding:".5rem 1.25rem",borderRadius:8,fontWeight:700,fontSize:".82rem",cursor:"pointer"}}>Apply Now</div>
      </nav>

      {/* HERO */}
      <div style={{background:"linear-gradient(135deg,#14532d 0%,#15803d 50%,#16a34a 100%)",padding:"5rem 2rem",textAlign:"center",position:"relative",overflow:"hidden"}}>
        <div style={{position:"absolute",top:-80,right:-60,width:320,height:320,background:"rgba(255,255,255,.05)",borderRadius:"50%"}}/>
        <div style={{position:"absolute",bottom:-60,left:-40,width:240,height:240,background:"rgba(255,255,255,.04)",borderRadius:"50%"}}/>
        <div style={{position:"relative"}}>
          <div style={{display:"inline-block",background:"rgba(251,191,36,.2)",border:"1px solid rgba(251,191,36,.4)",borderRadius:20,padding:".3rem 1rem",fontSize:".72rem",color:"#fbbf24",marginBottom:"1.5rem",letterSpacing:".1em",fontWeight:700}}>ADMISSIONS OPEN 2025–26</div>
          <h1 style={{fontFamily:"'Bricolage Grotesque',sans-serif",fontSize:"clamp(2.2rem,5.5vw,4rem)",fontWeight:900,color:"#fff",marginBottom:"1rem",lineHeight:1.1}}>Shaping Tomorrow's<br/><span style={{color:"#bbf7d0"}}>Leaders Today</span></h1>
          <p style={{color:"rgba(255,255,255,.75)",fontSize:"1.05rem",maxWidth:540,margin:"0 auto 2.5rem",lineHeight:1.75}}>A CBSE-affiliated institution committed to holistic education — academic excellence, sports, arts and moral values since 1994.</p>
          <div style={{display:"flex",gap:"1rem",justifyContent:"center",flexWrap:"wrap"}}>
            <div style={{background:"#fff",color:"#15803d",padding:".85rem 2rem",borderRadius:12,fontWeight:800,fontSize:".95rem",cursor:"pointer"}}>Apply for Admission →</div>
            <div style={{background:"rgba(255,255,255,.12)",color:"#fff",padding:".85rem 2rem",borderRadius:12,fontWeight:700,fontSize:".95rem",border:"1.5px solid rgba(255,255,255,.25)",cursor:"pointer"}}>Download Prospectus</div>
          </div>
        </div>
      </div>

      {/* STATS */}
      <div style={{background:"#fff",padding:"1.75rem 2rem",display:"flex",justifyContent:"center",gap:"3rem",flexWrap:"wrap",boxShadow:"0 4px 20px rgba(0,0,0,.05)"}}>
        {stats.map(([n,l]) => (
          <div key={l} style={{textAlign:"center"}}>
            <div style={{fontFamily:"'Bricolage Grotesque',sans-serif",fontSize:"2rem",fontWeight:900,color:"#15803d"}}>{n}</div>
            <div style={{fontSize:".8rem",color:"#6b7280",fontWeight:600}}>{l}</div>
          </div>
        ))}
      </div>

      {/* PROGRAMS */}
      <div style={{padding:"3.5rem 2rem",maxWidth:1000,margin:"0 auto"}}>
        <h2 style={{fontFamily:"'Bricolage Grotesque',sans-serif",fontSize:"2rem",fontWeight:900,color:"#14532d",textAlign:"center",marginBottom:".5rem"}}>Academic Programmes</h2>
        <p style={{textAlign:"center",color:"#6b7280",marginBottom:"2.5rem"}}>Structured curriculum from Nursery to Class X</p>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(220px,1fr))",gap:"1.25rem"}}>
          {programs.map(p => (
            <div key={p.name} style={{background:"#f0fdf4",borderRadius:18,padding:"1.5rem",border:"1.5px solid #bbf7d0"}}>
              <div style={{fontSize:"2.2rem",marginBottom:".75rem"}}>{p.icon}</div>
              <div style={{fontFamily:"'Bricolage Grotesque',sans-serif",fontWeight:800,fontSize:"1rem",color:"#14532d",marginBottom:".25rem"}}>{p.name}</div>
              <div style={{display:"inline-block",background:"#dcfce7",color:"#15803d",borderRadius:8,padding:".15rem .6rem",fontSize:".7rem",fontWeight:700,marginBottom:".75rem"}}>{p.age}</div>
              <div style={{color:"#4b7c5a",fontSize:".85rem",lineHeight:1.6}}>{p.desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* NOTICE BOARD */}
      <div style={{background:"#f0fdf4",padding:"2.5rem 2rem"}}>
        <div style={{maxWidth:900,margin:"0 auto"}}>
          <h2 style={{fontFamily:"'Bricolage Grotesque',sans-serif",fontSize:"1.6rem",fontWeight:900,color:"#14532d",marginBottom:"1.5rem",textAlign:"center"}}>📋 Latest Notices</h2>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(260px,1fr))",gap:"1rem"}}>
            {[
              ["15 Mar","Annual Day — Registration Open","All parents invited. Register by 20 March."],
              ["12 Mar","Board Exam Schedule","Class X practicals from 18 March. Check portal."],
              ["10 Mar","Admissions 2025–26","Last date for Class I admissions: 31 March 2025."],
            ].map(([date,title,sub]) => (
              <div key={title} style={{background:"#fff",borderRadius:12,padding:"1.1rem",border:"1.5px solid #bbf7d0"}}>
                <div style={{fontSize:".72rem",color:"#16a34a",fontWeight:700,marginBottom:".4rem"}}>{date}</div>
                <div style={{fontWeight:700,color:"#14532d",fontSize:".92rem",marginBottom:".3rem"}}>{title}</div>
                <div style={{fontSize:".8rem",color:"#64748b"}}>{sub}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <div style={{background:"#14532d",padding:"2rem",display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:"1rem"}}>
        <div style={{color:"rgba(255,255,255,.5)",fontSize:".8rem"}}>© 2025 Bright Future Academy · CBSE Affiliation No. 1730456</div>
        <div style={{color:"#86efac",fontSize:".75rem",fontWeight:700}}>Website by Orbnix</div>
      </div>
    </div>
  );
}

function DemoEcommerce() {
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [filter, setFilter] = useState("All");
  const products = [
    { id:1, name:"Anarkali Ethnic Set", price:2499, orig:3999, cat:"Ethnic", tag:"Best Seller", emoji:"👗", rating:4.8, reviews:234 },
    { id:2, name:"Cotton Kurti — Printed", price:799, orig:1299, cat:"Kurti", tag:"New", emoji:"👘", rating:4.6, reviews:89 },
    { id:3, name:"Silk Saree — Banarasi", price:5499, orig:7999, cat:"Saree", tag:"Premium", emoji:"🥻", rating:4.9, reviews:156 },
    { id:4, name:"Lehenga Set — Bridal", price:8999, orig:14999, cat:"Ethnic", tag:"Wedding", emoji:"💃", rating:4.7, reviews:67 },
    { id:5, name:"Casual Summer Dress", price:1299, orig:1999, cat:"Western", tag:"Trending", emoji:"👒", rating:4.5, reviews:312 },
    { id:6, name:"Palazzo Set — Floral", price:1099, orig:1799, cat:"Kurti", tag:"Sale", emoji:"🌸", rating:4.4, reviews:178 },
  ];
  const cats = ["All","Ethnic","Kurti","Saree","Western"];
  const filtered = filter === "All" ? products : products.filter(p => p.cat === filter);
  const discount = (p, o) => Math.round((1-p/o)*100);

  return (
    <div style={{fontFamily:"'Manrope',sans-serif",minHeight:"100vh",background:"#fdf2f8",overflowY:"auto"}}>
      {/* NAV */}
      <nav style={{background:"#fff",padding:"0 2rem",height:60,display:"flex",alignItems:"center",justifyContent:"space-between",borderBottom:"1px solid #fce7f3",position:"sticky",top:0,zIndex:50,boxShadow:"0 2px 8px rgba(0,0,0,.04)"}}>
        <div style={{fontFamily:"'Bricolage Grotesque',sans-serif",fontSize:"1.3rem",fontWeight:900,color:"#9d174d",letterSpacing:"-.02em"}}>Miraa <span style={{color:"#ec4899"}}>Fashion</span></div>
        <div style={{display:"flex",gap:"1.5rem"}}>
          {["New Arrivals","Ethnic","Western","Sale","About"].map(n => (
            <span key={n} style={{color:"#374151",fontSize:".82rem",fontWeight:600,cursor:"pointer"}}>{n}</span>
          ))}
        </div>
        <div style={{display:"flex",gap:"1rem",alignItems:"center"}}>
          <span style={{cursor:"pointer",fontSize:"1.1rem"}}>🔍</span>
          <span style={{cursor:"pointer",fontSize:"1.1rem"}}>♡</span>
          <div style={{background:"#9d174d",color:"#fff",padding:".4rem 1rem",borderRadius:8,fontWeight:700,fontSize:".82rem",cursor:"pointer",display:"flex",alignItems:"center",gap:".4rem"}}>
            🛒 {cart.length}
          </div>
        </div>
      </nav>

      {/* HERO BANNER */}
      <div style={{background:"linear-gradient(135deg,#9d174d 0%,#be185d 50%,#ec4899 100%)",padding:"4rem 2rem",position:"relative",overflow:"hidden"}}>
        <div style={{position:"absolute",right:"-5%",top:"-30%",width:"40%",height:"160%",background:"rgba(255,255,255,.05)",borderRadius:"50%"}}/>
        <div style={{maxWidth:600,position:"relative"}}>
          <div style={{display:"inline-block",background:"rgba(251,191,36,.25)",border:"1px solid rgba(251,191,36,.5)",borderRadius:20,padding:".3rem 1rem",fontSize:".72rem",color:"#fef08a",marginBottom:"1.2rem",letterSpacing:".1em",fontWeight:700}}>SUMMER SALE — UP TO 40% OFF</div>
          <h1 style={{fontFamily:"'Bricolage Grotesque',sans-serif",fontSize:"clamp(2rem,5vw,3.8rem)",fontWeight:900,color:"#fff",marginBottom:"1rem",lineHeight:1.1}}>Wear Your<br/><span style={{color:"#fce7f3"}}>Confidence</span></h1>
          <p style={{color:"rgba(255,255,255,.75)",fontSize:"1rem",marginBottom:"2rem",lineHeight:1.7}}>Curated ethnic and contemporary fashion. Free shipping above ₹999. Easy 30-day returns.</p>
          <div style={{display:"flex",gap:".75rem",flexWrap:"wrap"}}>
            <div style={{background:"#fff",color:"#9d174d",padding:".85rem 2rem",borderRadius:12,fontWeight:800,fontSize:".95rem",cursor:"pointer"}}>Shop Now →</div>
            <div style={{background:"rgba(255,255,255,.15)",color:"#fff",padding:".85rem 2rem",borderRadius:12,fontWeight:700,fontSize:".95rem",border:"1.5px solid rgba(255,255,255,.3)",cursor:"pointer"}}>View Sale</div>
          </div>
        </div>
      </div>

      {/* TRUST BADGES */}
      <div style={{background:"#fff",padding:"1rem 2rem",display:"flex",justifyContent:"center",gap:"2.5rem",flexWrap:"wrap",borderBottom:"1px solid #fce7f3"}}>
        {["🚚 Free Shipping ₹999+","↩️ 30-Day Returns","✅ 100% Authentic","💳 Easy EMI Available"].map(b => (
          <span key={b} style={{fontSize:".82rem",color:"#6b7280",fontWeight:600}}>{b}</span>
        ))}
      </div>

      {/* PRODUCTS */}
      <div style={{padding:"2.5rem 2rem",maxWidth:1100,margin:"0 auto"}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"1.5rem",flexWrap:"wrap",gap:"1rem"}}>
          <h2 style={{fontFamily:"'Bricolage Grotesque',sans-serif",fontSize:"1.6rem",fontWeight:900,color:"#9d174d"}}>New Arrivals</h2>
          <div style={{display:"flex",gap:".5rem",flexWrap:"wrap"}}>
            {cats.map(c => (
              <div key={c} onClick={() => setFilter(c)} style={{padding:".4rem 1rem",borderRadius:20,fontWeight:700,fontSize:".8rem",cursor:"pointer",background: filter===c ? "#9d174d" : "#fce7f3",color: filter===c ? "#fff" : "#9d174d",transition:"all .15s"}}>{c}</div>
            ))}
          </div>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(220px,1fr))",gap:"1.25rem"}}>
          {filtered.map(p => (
            <div key={p.id} style={{background:"#fff",borderRadius:18,overflow:"hidden",border:"1.5px solid #fce7f3",boxShadow:"0 2px 12px rgba(0,0,0,.04)"}}>
              <div style={{background:"linear-gradient(135deg,#fce7f3,#fbcfe8)",height:180,display:"flex",alignItems:"center",justifyContent:"center",fontSize:"5rem",position:"relative",cursor:"pointer"}}>
                {p.emoji}
                <div style={{position:"absolute",top:10,left:10,background:"#9d174d",color:"#fff",borderRadius:6,padding:".15rem .6rem",fontSize:".7rem",fontWeight:800}}>{p.tag}</div>
                <div onClick={() => setWishlist(w => w.includes(p.id) ? w.filter(i=>i!==p.id) : [...w,p.id])} style={{position:"absolute",top:8,right:10,fontSize:"1.3rem",cursor:"pointer"}}>{wishlist.includes(p.id) ? "❤️" : "🤍"}</div>
              </div>
              <div style={{padding:"1rem"}}>
                <div style={{fontWeight:700,fontSize:".9rem",color:"#1f2937",marginBottom:".3rem"}}>{p.name}</div>
                <div style={{fontSize:".75rem",color:"#9ca3af",marginBottom:".5rem"}}>⭐ {p.rating} · {p.reviews} reviews</div>
                <div style={{display:"flex",alignItems:"center",gap:".5rem",marginBottom:".75rem"}}>
                  <span style={{fontWeight:900,color:"#9d174d",fontSize:"1.05rem"}}>₹{p.price}</span>
                  <span style={{textDecoration:"line-through",color:"#9ca3af",fontSize:".82rem"}}>₹{p.orig}</span>
                  <span style={{background:"#fce7f3",color:"#9d174d",borderRadius:6,padding:".1rem .4rem",fontSize:".7rem",fontWeight:800}}>{discount(p.price,p.orig)}% OFF</span>
                </div>
                <div onClick={() => setCart(c => c.includes(p.id) ? c : [...c,p.id])} style={{background: cart.includes(p.id) ? "#15803d" : "#9d174d",color:"#fff",padding:".55rem",borderRadius:10,fontWeight:700,fontSize:".82rem",textAlign:"center",cursor:"pointer",transition:"background .15s"}}>
                  {cart.includes(p.id) ? "✓ Added to Cart" : "Add to Cart"}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* FOOTER */}
      <div style={{background:"#9d174d",padding:"2rem",display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:"1rem"}}>
        <div style={{color:"rgba(255,255,255,.5)",fontSize:".8rem"}}>© 2025 Miraa Fashion · All Rights Reserved</div>
        <div style={{color:"#fbcfe8",fontSize:".75rem",fontWeight:700}}>Website by Orbnix</div>
      </div>
    </div>
  );
}

function DemoRealEstate() {
  const [tab, setTab] = useState("buy");
  const [priceRange, setPriceRange] = useState("All");
  const props = [
    { id:1, name:"3 BHK Luxury Apartment", area:"Vaishali Nagar, Jaipur", price:"₹85 Lakh", size:"1,450 sq ft", type:"Apartment", tag:"Ready to Move", emoji:"🏢", features:["3 BHK","2 Bath","Parking","Gym"] },
    { id:2, name:"4 BHK Villa — Gated", area:"Mansarovar, Jaipur", price:"₹1.8 Cr", size:"2,800 sq ft", type:"Villa", tag:"Premium", emoji:"🏡", features:["4 BHK","3 Bath","Garden","Pool"] },
    { id:3, name:"2 BHK Modern Flat", area:"Malviya Nagar, Jaipur", price:"₹52 Lakh", size:"950 sq ft", type:"Apartment", tag:"Best Deal", emoji:"🏠", features:["2 BHK","2 Bath","Parking","Security"] },
    { id:4, name:"Penthouse — City View", area:"C-Scheme, Jaipur", price:"₹3.2 Cr", size:"4,200 sq ft", type:"Penthouse", tag:"Luxury", emoji:"🏙️", features:["5 BHK","4 Bath","Terrace","Staff Qtrs"] },
  ];
  return (
    <div style={{fontFamily:"'Manrope',sans-serif",minHeight:"100vh",background:"#f8fafc",overflowY:"auto"}}>
      {/* NAV */}
      <nav style={{background:"#fff",padding:"0 2rem",height:64,display:"flex",alignItems:"center",justifyContent:"space-between",borderBottom:"1px solid #e2e8f0",position:"sticky",top:0,zIndex:50,boxShadow:"0 2px 8px rgba(0,0,0,.04)"}}>
        <div style={{display:"flex",alignItems:"center",gap:8}}>
          <span style={{fontSize:"1.4rem"}}>🏠</span>
          <div>
            <div style={{fontFamily:"'Bricolage Grotesque',sans-serif",fontSize:"1.1rem",fontWeight:900,color:"#0f172a",lineHeight:1}}>PropSearch</div>
            <div style={{fontSize:".6rem",color:"#2563eb",letterSpacing:".08em",fontWeight:700}}>JAIPUR REAL ESTATE</div>
          </div>
        </div>
        <div style={{display:"flex",gap:"1.5rem"}}>
          {["Buy","Rent","New Projects","Agents","EMI Calculator"].map(n => (
            <span key={n} style={{color:"#374151",fontSize:".82rem",fontWeight:600,cursor:"pointer"}}>{n}</span>
          ))}
        </div>
        <div style={{background:"#2563eb",color:"#fff",padding:".5rem 1.25rem",borderRadius:8,fontWeight:700,fontSize:".82rem",cursor:"pointer"}}>List Property</div>
      </nav>

      {/* HERO + SEARCH */}
      <div style={{background:"linear-gradient(135deg,#0f172a 0%,#1e3a8a 60%,#2563eb 100%)",padding:"4.5rem 2rem",position:"relative",overflow:"hidden"}}>
        <div style={{position:"absolute",right:"-10%",top:"-20%",width:"50%",height:"140%",background:"rgba(255,255,255,.03)",borderRadius:"50%"}}/>
        <div style={{textAlign:"center",position:"relative"}}>
          <h1 style={{fontFamily:"'Bricolage Grotesque',sans-serif",fontSize:"clamp(2rem,5vw,3.8rem)",fontWeight:900,color:"#fff",marginBottom:"1rem",lineHeight:1.1}}>Find Your Dream Home<br/><span style={{color:"#93c5fd"}}>in Jaipur</span></h1>
          <p style={{color:"rgba(255,255,255,.7)",fontSize:"1rem",marginBottom:"2rem"}}>10,000+ verified properties. Trusted by 50,000+ buyers.</p>
          {/* SEARCH BAR */}
          <div style={{background:"#fff",borderRadius:16,padding:"1.25rem",display:"inline-flex",gap:".75rem",flexWrap:"wrap",alignItems:"center",boxShadow:"0 8px 40px rgba(0,0,0,.25)",maxWidth:700,width:"100%"}}>
            <div style={{display:"flex",gap:".4rem",flexShrink:0}}>
              {["buy","rent"].map(t => (
                <div key={t} onClick={() => setTab(t)} style={{padding:".45rem 1.1rem",borderRadius:8,fontWeight:700,fontSize:".82rem",cursor:"pointer",background: tab===t ? "#2563eb" : "#f1f5f9",color: tab===t ? "#fff" : "#374151",textTransform:"capitalize",transition:"all .15s"}}>{t.charAt(0).toUpperCase()+t.slice(1)}</div>
              ))}
            </div>
            <input placeholder="Search locality, project, or builder..." style={{flex:1,border:"1.5px solid #e2e8f0",borderRadius:8,padding:".6rem 1rem",fontSize:".88rem",outline:"none",minWidth:180}} />
            <select style={{border:"1.5px solid #e2e8f0",borderRadius:8,padding:".6rem .8rem",fontSize:".82rem",color:"#374151",background:"#f8fafc"}}>
              <option>All Types</option><option>Apartment</option><option>Villa</option><option>Plot</option>
            </select>
            <div style={{background:"#2563eb",color:"#fff",padding:".65rem 1.5rem",borderRadius:10,fontWeight:800,fontSize:".88rem",cursor:"pointer",whiteSpace:"nowrap"}}>🔍 Search</div>
          </div>
        </div>
      </div>

      {/* STATS */}
      <div style={{background:"#fff",padding:"1.5rem 2rem",display:"flex",justifyContent:"center",gap:"3rem",flexWrap:"wrap",boxShadow:"0 4px 20px rgba(0,0,0,.04)"}}>
        {[["10K+","Properties Listed"],["50K+","Happy Buyers"],["500+","Verified Agents"],["₹200Cr+","Properties Sold"]].map(([n,l]) => (
          <div key={l} style={{textAlign:"center"}}>
            <div style={{fontFamily:"'Bricolage Grotesque',sans-serif",fontSize:"1.8rem",fontWeight:900,color:"#2563eb"}}>{n}</div>
            <div style={{fontSize:".8rem",color:"#6b7280",fontWeight:600}}>{l}</div>
          </div>
        ))}
      </div>

      {/* LISTINGS */}
      <div style={{padding:"3rem 2rem",maxWidth:1100,margin:"0 auto"}}>
        <h2 style={{fontFamily:"'Bricolage Grotesque',sans-serif",fontSize:"1.8rem",fontWeight:900,color:"#0f172a",marginBottom:"2rem"}}>Featured Properties in Jaipur</h2>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(280px,1fr))",gap:"1.5rem"}}>
          {props.map(p => (
            <div key={p.id} style={{background:"#fff",borderRadius:20,overflow:"hidden",border:"1.5px solid #e2e8f0",boxShadow:"0 4px 20px rgba(0,0,0,.05)",cursor:"pointer"}}>
              <div style={{background:"linear-gradient(135deg,#1e3a8a,#2563eb)",height:180,display:"flex",alignItems:"center",justifyContent:"center",fontSize:"5rem",position:"relative"}}>
                {p.emoji}
                <div style={{position:"absolute",top:12,left:12,background:"#fbbf24",color:"#0f172a",borderRadius:6,padding:".2rem .7rem",fontSize:".7rem",fontWeight:800}}>{p.tag}</div>
                <div style={{position:"absolute",bottom:12,right:12,background:"rgba(0,0,0,.5)",color:"#fff",borderRadius:6,padding:".2rem .7rem",fontSize:".72rem",fontWeight:700}}>{p.type}</div>
              </div>
              <div style={{padding:"1.25rem"}}>
                <div style={{fontFamily:"'Bricolage Grotesque',sans-serif",fontWeight:800,fontSize:"1rem",color:"#0f172a",marginBottom:".25rem"}}>{p.name}</div>
                <div style={{fontSize:".8rem",color:"#2563eb",fontWeight:600,marginBottom:".5rem"}}>📍 {p.area}</div>
                <div style={{fontSize:".78rem",color:"#64748b",marginBottom:".75rem"}}>{p.size}</div>
                <div style={{display:"flex",flexWrap:"wrap",gap:".35rem",marginBottom:".75rem"}}>
                  {p.features.map(f => <span key={f} style={{background:"#eff6ff",color:"#2563eb",borderRadius:6,padding:".15rem .5rem",fontSize:".7rem",fontWeight:600}}>{f}</span>)}
                </div>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                  <span style={{fontFamily:"'Bricolage Grotesque',sans-serif",fontWeight:900,fontSize:"1.2rem",color:"#0f172a"}}>{p.price}</span>
                  <div style={{background:"#2563eb",color:"#fff",padding:".45rem 1rem",borderRadius:8,fontWeight:700,fontSize:".8rem",cursor:"pointer"}}>View Details</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* FOOTER */}
      <div style={{background:"#0f172a",padding:"2rem",display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:"1rem"}}>
        <div style={{color:"rgba(255,255,255,.4)",fontSize:".8rem"}}>© 2025 PropSearch · Jaipur's Most Trusted Real Estate Platform</div>
        <div style={{color:"#93c5fd",fontSize:".75rem",fontWeight:700}}>Website by Orbnix</div>
      </div>
    </div>
  );
}

function DemoCA() {
  const services = [
    { icon:"📊", title:"GST Filing & Compliance", desc:"Monthly, quarterly and annual GST returns. GSTR-1, GSTR-3B, annual reconciliation.", price:"₹2,500/month" },
    { icon:"📁", title:"Income Tax Returns", desc:"ITR filing for individuals, firms and companies. Tax planning and audit support.", price:"From ₹1,500" },
    { icon:"🏢", title:"Company Registration", desc:"Pvt Ltd, LLP, OPC, Partnership firm registration with MCA. End-to-end compliance.", price:"From ₹8,000" },
    { icon:"📋", title:"Accounting & Bookkeeping", desc:"Monthly accounts, P&L, balance sheet, payroll and MIS reports for your business.", price:"₹5,000/month" },
    { icon:"🔍", title:"Tax Audit & Statutory Audit", desc:"Statutory audit under Companies Act. Tax audit u/s 44AB. RERA audit.", price:"On request" },
    { icon:"🤝", title:"Business Advisory", desc:"Startup advisory, valuation, due diligence, financial projections and investor decks.", price:"₹3,000/hr" },
  ];
  const team = [
    { name:"CA Rajesh Sharma", qual:"FCA, DISA", exp:"22 years", spec:"Taxation & Audit", emoji:"👨‍💼" },
    { name:"CA Priya Gupta", qual:"ACA, CS", exp:"14 years", spec:"Company Law & GST", emoji:"👩‍💼" },
    { name:"CA Anil Verma", qual:"FCA, MBA", exp:"18 years", spec:"Business Advisory", emoji:"👨‍💼" },
  ];
  return (
    <div style={{fontFamily:"'Manrope',sans-serif",minHeight:"100vh",background:"#fafafa",overflowY:"auto"}}>
      {/* NAV */}
      <nav style={{background:"#1a2744",padding:"0 2rem",height:64,display:"flex",alignItems:"center",justifyContent:"space-between",position:"sticky",top:0,zIndex:50}}>
        <div style={{display:"flex",alignItems:"center",gap:10}}>
          <div style={{width:36,height:36,background:"#d4af37",borderRadius:8,display:"flex",alignItems:"center",justifyContent:"center",fontFamily:"'Bricolage Grotesque',sans-serif",fontWeight:900,color:"#1a2744",fontSize:".9rem"}}>S&A</div>
          <div>
            <div style={{fontFamily:"'Bricolage Grotesque',sans-serif",fontSize:"1rem",fontWeight:900,color:"#fff",lineHeight:1}}>Sharma & Associates</div>
            <div style={{fontSize:".6rem",color:"#d4af37",letterSpacing:".08em",fontWeight:600}}>CHARTERED ACCOUNTANTS</div>
          </div>
        </div>
        <div style={{display:"flex",gap:"1.5rem"}}>
          {["Home","Services","Team","Clients","Contact"].map(n => (
            <span key={n} style={{color:"rgba(255,255,255,.8)",fontSize:".82rem",fontWeight:600,cursor:"pointer"}}>{n}</span>
          ))}
        </div>
        <div style={{border:"1.5px solid #d4af37",color:"#d4af37",padding:".5rem 1.25rem",borderRadius:8,fontWeight:700,fontSize:".82rem",cursor:"pointer"}}>Get Consultation</div>
      </nav>

      {/* HERO */}
      <div style={{background:"linear-gradient(135deg,#1a2744 0%,#243563 60%,#2e4080 100%)",padding:"5rem 2rem",position:"relative",overflow:"hidden"}}>
        <div style={{position:"absolute",right:"-5%",top:"-20%",width:"40%",height:"140%",background:"rgba(212,175,55,.05)",borderRadius:"50%"}}/>
        <div style={{maxWidth:900,margin:"0 auto",display:"grid",gridTemplateColumns:"1.2fr 1fr",gap:"3rem",alignItems:"center"}}>
          <div>
            <div style={{display:"inline-block",background:"rgba(212,175,55,.15)",border:"1px solid rgba(212,175,55,.3)",borderRadius:20,padding:".3rem 1rem",fontSize:".72rem",color:"#d4af37",marginBottom:"1.5rem",letterSpacing:".1em",fontWeight:700}}>JAIPUR · EST. 2002 · ICAI REGISTERED</div>
            <h1 style={{fontFamily:"'Bricolage Grotesque',sans-serif",fontSize:"clamp(2rem,4.5vw,3.5rem)",fontWeight:900,color:"#fff",marginBottom:"1rem",lineHeight:1.1}}>Trusted CA Firm<br/>for <span style={{color:"#d4af37"}}>Every Business</span></h1>
            <p style={{color:"rgba(255,255,255,.7)",lineHeight:1.75,marginBottom:"2rem",fontSize:".95rem"}}>From GST filing to company registration, audit and financial advisory — Sharma & Associates has guided 500+ businesses since 2002.</p>
            <div style={{display:"flex",gap:".75rem",flexWrap:"wrap"}}>
              <div style={{background:"#d4af37",color:"#1a2744",padding:".85rem 2rem",borderRadius:10,fontWeight:800,fontSize:".9rem",cursor:"pointer"}}>Book Free Consultation →</div>
              <div style={{background:"rgba(255,255,255,.08)",color:"#fff",padding:".85rem 2rem",borderRadius:10,fontWeight:700,fontSize:".9rem",border:"1.5px solid rgba(255,255,255,.2)",cursor:"pointer"}}>Our Services</div>
            </div>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"1rem"}}>
            {[["500+","Clients Served"],["22","Years Experience"],["100%","ICAI Compliant"],["24hr","Response Time"]].map(([n,l]) => (
              <div key={l} style={{background:"rgba(255,255,255,.07)",borderRadius:14,padding:"1.25rem",textAlign:"center",border:"1.5px solid rgba(212,175,55,.2)"}}>
                <div style={{fontFamily:"'Bricolage Grotesque',sans-serif",fontSize:"1.8rem",fontWeight:900,color:"#d4af37"}}>{n}</div>
                <div style={{fontSize:".72rem",color:"rgba(255,255,255,.55)",fontWeight:600,marginTop:".2rem"}}>{l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* SERVICES */}
      <div style={{padding:"4rem 2rem",maxWidth:1100,margin:"0 auto"}}>
        <h2 style={{fontFamily:"'Bricolage Grotesque',sans-serif",fontSize:"1.8rem",fontWeight:900,color:"#1a2744",textAlign:"center",marginBottom:".5rem"}}>Our Services</h2>
        <p style={{textAlign:"center",color:"#64748b",marginBottom:"2.5rem"}}>Comprehensive financial and compliance services for businesses of all sizes</p>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(300px,1fr))",gap:"1.25rem"}}>
          {services.map(s => (
            <div key={s.title} style={{background:"#fff",borderRadius:16,padding:"1.5rem",border:"1.5px solid #e2e8f0",boxShadow:"0 2px 12px rgba(0,0,0,.04)"}}>
              <div style={{fontSize:"2rem",marginBottom:".75rem"}}>{s.icon}</div>
              <div style={{fontFamily:"'Bricolage Grotesque',sans-serif",fontWeight:800,fontSize:"1rem",color:"#1a2744",marginBottom:".5rem"}}>{s.title}</div>
              <div style={{color:"#64748b",fontSize:".85rem",lineHeight:1.6,marginBottom:".75rem"}}>{s.desc}</div>
              <div style={{fontWeight:800,color:"#d4af37",fontSize:".9rem"}}>{s.price}</div>
            </div>
          ))}
        </div>
      </div>

      {/* TEAM */}
      <div style={{background:"#f8fafc",padding:"3.5rem 2rem"}}>
        <div style={{maxWidth:900,margin:"0 auto"}}>
          <h2 style={{fontFamily:"'Bricolage Grotesque',sans-serif",fontSize:"1.8rem",fontWeight:900,color:"#1a2744",textAlign:"center",marginBottom:"2.5rem"}}>Our Partners</h2>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(260px,1fr))",gap:"1.25rem"}}>
            {team.map(t => (
              <div key={t.name} style={{background:"#fff",borderRadius:16,padding:"1.5rem",textAlign:"center",border:"1.5px solid #e2e8f0",boxShadow:"0 2px 8px rgba(0,0,0,.04)"}}>
                <div style={{width:64,height:64,background:"linear-gradient(135deg,#1a2744,#2e4080)",borderRadius:20,display:"flex",alignItems:"center",justifyContent:"center",fontSize:"2rem",margin:"0 auto 1rem"}}>{t.emoji}</div>
                <div style={{fontFamily:"'Bricolage Grotesque',sans-serif",fontWeight:800,fontSize:"1rem",color:"#1a2744",marginBottom:".2rem"}}>{t.name}</div>
                <div style={{fontSize:".78rem",color:"#d4af37",fontWeight:700,marginBottom:".3rem"}}>{t.qual}</div>
                <div style={{fontSize:".78rem",color:"#64748b"}}>{t.exp} · {t.spec}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <div style={{background:"#1a2744",padding:"2rem",display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:"1rem"}}>
        <div style={{color:"rgba(255,255,255,.4)",fontSize:".8rem"}}>© 2025 Sharma & Associates · ICAI Reg. No. 012345N</div>
        <div style={{color:"#d4af37",fontSize:".75rem",fontWeight:700}}>Website by Orbnix</div>
      </div>
    </div>
  );
}

function DemoAI() {
  const [msgs, setMsgs] = useState([
    { from:"bot", text:"Hi! I'm the SupportBot for TechStore. How can I help you today? 😊" },
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const replies = {
    "order": "I can help with your order! Please share your Order ID and I'll check the status right away. 📦",
    "return": "Our return policy allows returns within 30 days of delivery. Would you like me to initiate a return request? 🔄",
    "price": "We have products starting from ₹499. Would you like to browse our latest deals and offers? 🏷️",
    "delivery": "Standard delivery takes 3–5 business days. Express delivery (1–2 days) is available for ₹99 extra. 🚚",
    "support": "Our support team is available 9 AM – 9 PM, 7 days a week. You can also reach us at +91 98765 43210. 📞",
    "default": "Thanks for reaching out! Let me connect you with a specialist for that query. They'll respond within 2 hours. ✅",
  };
  const getReply = (msg) => {
    const m = msg.toLowerCase();
    if (m.includes("order") || m.includes("track")) return replies.order;
    if (m.includes("return") || m.includes("refund")) return replies.return;
    if (m.includes("price") || m.includes("cost") || m.includes("how much")) return replies.price;
    if (m.includes("deliver") || m.includes("shipping")) return replies.delivery;
    if (m.includes("support") || m.includes("contact") || m.includes("help")) return replies.support;
    return replies.default;
  };
  const send = () => {
    if (!input.trim()) return;
    const userMsg = input.trim();
    setMsgs(m => [...m, { from:"user", text:userMsg }]);
    setInput("");
    setTyping(true);
    setTimeout(() => {
      setTyping(false);
      setMsgs(m => [...m, { from:"bot", text:getReply(userMsg) }]);
    }, 1200);
  };

  return (
    <div style={{fontFamily:"'Manrope',sans-serif",height:"100%",background:"#f8fafc",display:"flex",flexDirection:"column"}}>
      {/* HEADER */}
      <div style={{background:"linear-gradient(135deg,#1e3a8a,#2563eb)",padding:"1rem 1.5rem",display:"flex",alignItems:"center",gap:"1rem"}}>
        <div style={{width:44,height:44,background:"rgba(255,255,255,.15)",borderRadius:14,display:"flex",alignItems:"center",justifyContent:"center",fontSize:"1.4rem"}}>🤖</div>
        <div>
          <div style={{fontFamily:"'Bricolage Grotesque',sans-serif",fontWeight:800,fontSize:"1.05rem",color:"#fff"}}>SupportBot</div>
          <div style={{fontSize:".75rem",color:"rgba(255,255,255,.7)",display:"flex",alignItems:"center",gap:".4rem"}}><span style={{width:7,height:7,background:"#4ade80",borderRadius:"50%",display:"inline-block"}}/>Online · Avg reply 30 sec</div>
        </div>
        <div style={{marginLeft:"auto",background:"rgba(255,255,255,.1)",color:"#fff",borderRadius:8,padding:".35rem .9rem",fontSize:".75rem",fontWeight:700}}>AI Powered</div>
      </div>

      {/* QUICK ACTIONS */}
      <div style={{padding:".75rem 1rem",background:"#fff",borderBottom:"1px solid #e2e8f0",display:"flex",gap:".5rem",flexWrap:"wrap"}}>
        {["Track Order","Return/Refund","Delivery Info","Talk to Agent"].map(q => (
          <div key={q} onClick={() => { setInput(q); }} style={{background:"#eff6ff",color:"#2563eb",borderRadius:20,padding:".35rem .9rem",fontSize:".75rem",fontWeight:700,cursor:"pointer",border:"1px solid #bfdbfe"}}>{q}</div>
        ))}
      </div>

      {/* MESSAGES */}
      <div style={{flex:1,padding:"1rem",overflowY:"auto",display:"flex",flexDirection:"column",gap:".75rem",maxHeight:340}}>
        {msgs.map((m, i) => (
          <div key={i} style={{display:"flex",justifyContent: m.from==="user" ? "flex-end" : "flex-start",gap:".5rem",alignItems:"flex-end"}}>
            {m.from==="bot" && <div style={{width:30,height:30,background:"linear-gradient(135deg,#1e3a8a,#2563eb)",borderRadius:10,display:"flex",alignItems:"center",justifyContent:"center",fontSize:".9rem",flexShrink:0}}>🤖</div>}
            <div style={{background: m.from==="user" ? "#2563eb" : "#fff",color: m.from==="user" ? "#fff" : "#0f172a",borderRadius: m.from==="user" ? "16px 4px 16px 16px" : "4px 16px 16px 16px",padding:".65rem 1rem",fontSize:".88rem",maxWidth:"75%",lineHeight:1.5,boxShadow:"0 2px 8px rgba(0,0,0,.06)",border: m.from==="bot" ? "1px solid #e2e8f0" : "none"}}>
              {m.text}
            </div>
          </div>
        ))}
        {typing && (
          <div style={{display:"flex",alignItems:"center",gap:".5rem"}}>
            <div style={{width:30,height:30,background:"linear-gradient(135deg,#1e3a8a,#2563eb)",borderRadius:10,display:"flex",alignItems:"center",justifyContent:"center",fontSize:".9rem"}}>🤖</div>
            <div style={{background:"#fff",borderRadius:"4px 16px 16px 16px",padding:".65rem 1rem",border:"1px solid #e2e8f0",display:"flex",gap:".3rem",alignItems:"center"}}>
              {[0,1,2].map(i => <div key={i} style={{width:7,height:7,background:"#94a3b8",borderRadius:"50%",animation:`bounce .8s ${i*0.15}s infinite`}}/>)}
            </div>
          </div>
        )}
      </div>

      {/* INPUT */}
      <div style={{padding:"1rem",background:"#fff",borderTop:"1px solid #e2e8f0",display:"flex",gap:".75rem",alignItems:"center"}}>
        <input value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key==="Enter" && send()} placeholder="Type your message..." style={{flex:1,border:"1.5px solid #e2e8f0",borderRadius:12,padding:".65rem 1rem",fontSize:".88rem",outline:"none",fontFamily:"'Manrope',sans-serif"}}/>
        <div onClick={send} style={{background:"#2563eb",color:"#fff",width:42,height:42,borderRadius:12,display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",fontSize:"1.1rem",flexShrink:0}}>→</div>
      </div>

      {/* POWERED BY */}
      <div style={{background:"#f8fafc",padding:".5rem",textAlign:"center",borderTop:"1px solid #e2e8f0"}}>
        <span style={{fontSize:".72rem",color:"#94a3b8",fontWeight:600}}>Powered by Orbnix AI · orbnix.in</span>
      </div>
    </div>
  );
}

function DemoDashboard() {
  const data = [
    { month:"Oct", rev:45000, orders:89 }, { month:"Nov", rev:62000, orders:124 },
    { month:"Dec", rev:88000, orders:178 }, { month:"Jan", rev:54000, orders:107 },
    { month:"Feb", rev:71000, orders:142 }, { month:"Mar", rev:95000, orders:190 },
  ];
  const maxRev = Math.max(...data.map(d => d.rev));
  const kpis = [
    { label:"Total Revenue", val:"₹4,15,000", change:"+23%", up:true, icon:"💰" },
    { label:"Total Orders", val:"830", change:"+18%", up:true, icon:"📦" },
    { label:"Active Customers", val:"1,240", change:"+31%", up:true, icon:"👥" },
    { label:"Avg Order Value", val:"₹500", change:"-4%", up:false, icon:"🛒" },
  ];
  return (
    <div style={{fontFamily:"'Manrope',sans-serif",minHeight:"100%",background:"#0f172a",color:"#fff",padding:"1.5rem",overflowY:"auto"}}>
      {/* HEADER */}
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"1.5rem",flexWrap:"wrap",gap:"1rem"}}>
        <div>
          <div style={{fontFamily:"'Bricolage Grotesque',sans-serif",fontSize:"1.3rem",fontWeight:900,color:"#fff"}}>Analytics Dashboard</div>
          <div style={{fontSize:".78rem",color:"#64748b"}}>Last 6 months · Updated just now</div>
        </div>
        <div style={{display:"flex",gap:".5rem"}}>
          {["7D","1M","6M","1Y"].map(p => (
            <div key={p} style={{background: p==="6M" ? "#2563eb" : "rgba(255,255,255,.06)",color: p==="6M" ? "#fff" : "#94a3b8",borderRadius:8,padding:".35rem .8rem",fontSize:".78rem",fontWeight:700,cursor:"pointer"}}>{p}</div>
          ))}
        </div>
      </div>

      {/* KPI CARDS */}
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(180px,1fr))",gap:"1rem",marginBottom:"1.5rem"}}>
        {kpis.map(k => (
          <div key={k.label} style={{background:"rgba(255,255,255,.05)",borderRadius:16,padding:"1.25rem",border:"1px solid rgba(255,255,255,.08)"}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:".75rem"}}>
              <span style={{fontSize:"1.5rem"}}>{k.icon}</span>
              <span style={{background: k.up ? "rgba(74,222,128,.15)" : "rgba(248,113,113,.15)",color: k.up ? "#4ade80" : "#f87171",borderRadius:8,padding:".2rem .6rem",fontSize:".72rem",fontWeight:700}}>{k.change}</span>
            </div>
            <div style={{fontFamily:"'Bricolage Grotesque',sans-serif",fontSize:"1.6rem",fontWeight:900,color:"#fff",lineHeight:1}}>{k.val}</div>
            <div style={{fontSize:".75rem",color:"#64748b",marginTop:".3rem"}}>{k.label}</div>
          </div>
        ))}
      </div>

      {/* BAR CHART */}
      <div style={{background:"rgba(255,255,255,.04)",borderRadius:16,padding:"1.5rem",border:"1px solid rgba(255,255,255,.07)",marginBottom:"1.5rem"}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"1.5rem"}}>
          <div style={{fontFamily:"'Bricolage Grotesque',sans-serif",fontWeight:800,fontSize:"1rem",color:"#fff"}}>Monthly Revenue</div>
          <div style={{fontSize:".75rem",color:"#64748b"}}>Oct 2024 — Mar 2025</div>
        </div>
        <div style={{display:"flex",alignItems:"flex-end",gap:"1rem",height:160}}>
          {data.map(d => (
            <div key={d.month} style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",gap:".4rem"}}>
              <div style={{fontSize:".68rem",color:"#64748b",fontWeight:600}}>₹{(d.rev/1000).toFixed(0)}K</div>
              <div style={{width:"100%",background: d.month==="Mar" ? "#2563eb" : "rgba(255,255,255,.12)",borderRadius:"6px 6px 0 0",height: (d.rev/maxRev*120)+"px",minHeight:8,transition:"height .3s",position:"relative",overflow:"hidden"}}>
                {d.month==="Mar" && <div style={{position:"absolute",inset:0,background:"linear-gradient(180deg,#3b82f6,#1d4ed8)"}}/>}
              </div>
              <div style={{fontSize:".72rem",color:"#94a3b8",fontWeight:600}}>{d.month}</div>
            </div>
          ))}
        </div>
      </div>

      {/* RECENT ORDERS */}
      <div style={{background:"rgba(255,255,255,.04)",borderRadius:16,padding:"1.5rem",border:"1px solid rgba(255,255,255,.07)"}}>
        <div style={{fontFamily:"'Bricolage Grotesque',sans-serif",fontWeight:800,fontSize:"1rem",color:"#fff",marginBottom:"1.25rem"}}>Recent Orders</div>
        {[
          { id:"#4521", customer:"Priya S.", product:"Anarkali Set", amount:"₹2,499", status:"Delivered" },
          { id:"#4520", customer:"Rahul V.", product:"Silk Saree", amount:"₹5,499", status:"Shipped" },
          { id:"#4519", customer:"Ananya P.", product:"Kurti Pack", amount:"₹1,598", status:"Processing" },
        ].map(o => (
          <div key={o.id} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:".75rem 0",borderBottom:"1px solid rgba(255,255,255,.06)",flexWrap:"wrap",gap:".5rem"}}>
            <div style={{display:"flex",gap:".75rem",alignItems:"center"}}>
              <span style={{fontFamily:"'JetBrains Mono',monospace",fontSize:".78rem",color:"#2563eb",fontWeight:700}}>{o.id}</span>
              <div>
                <div style={{fontSize:".85rem",fontWeight:600,color:"#fff"}}>{o.customer}</div>
                <div style={{fontSize:".75rem",color:"#64748b"}}>{o.product}</div>
              </div>
            </div>
            <div style={{display:"flex",gap:"1rem",alignItems:"center"}}>
              <span style={{fontWeight:700,color:"#fff",fontSize:".88rem"}}>{o.amount}</span>
              <span style={{background: o.status==="Delivered" ? "rgba(74,222,128,.15)" : o.status==="Shipped" ? "rgba(96,165,250,.15)" : "rgba(251,191,36,.15)",color: o.status==="Delivered" ? "#4ade80" : o.status==="Shipped" ? "#60a5fa" : "#fbbf24",borderRadius:8,padding:".2rem .7rem",fontSize:".72rem",fontWeight:700}}>{o.status}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function DemoApp() {
  const [screen, setScreen] = useState("home");
  const [logged, setLogged] = useState(false);
  const workouts = [
    { name:"Morning HIIT", duration:"30 min", cal:280, level:"Medium", emoji:"🏃", complete:true },
    { name:"Yoga Flow", duration:"45 min", cal:180, level:"Easy", emoji:"🧘", complete:true },
    { name:"Upper Body", duration:"50 min", cal:320, level:"Hard", emoji:"💪", complete:false },
    { name:"Evening Run", duration:"35 min", cal:250, level:"Medium", emoji:"🌆", complete:false },
  ];
  return (
    <div style={{fontFamily:"'Manrope',sans-serif",height:"100%",background:"#0f172a",display:"flex",flexDirection:"column",maxWidth:380,margin:"0 auto"}}>
      {/* STATUS BAR */}
      <div style={{background:"#0f172a",padding:".5rem 1.25rem",display:"flex",justifyContent:"space-between",fontSize:".72rem",color:"rgba(255,255,255,.5)"}}>
        <span>9:41 AM</span><span>●●●●  WiFi  🔋</span>
      </div>

      {screen==="home" && (
        <div style={{flex:1,overflowY:"auto",padding:"0 1.25rem 1.25rem"}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",paddingTop:".5rem",marginBottom:"1.5rem"}}>
            <div>
              <div style={{fontSize:".78rem",color:"rgba(255,255,255,.5)"}}>Good morning 👋</div>
              <div style={{fontFamily:"'Bricolage Grotesque',sans-serif",fontWeight:900,color:"#fff",fontSize:"1.3rem"}}>Rahul</div>
            </div>
            <div style={{width:40,height:40,background:"linear-gradient(135deg,#f97316,#ec4899)",borderRadius:12,display:"flex",alignItems:"center",justifyContent:"center",fontSize:"1.2rem"}}>🏋️</div>
          </div>

          {/* TODAY RING */}
          <div style={{background:"linear-gradient(135deg,#1e3a8a,#7c3aed)",borderRadius:20,padding:"1.5rem",marginBottom:"1.25rem",textAlign:"center"}}>
            <div style={{fontSize:".75rem",color:"rgba(255,255,255,.6)",marginBottom:".25rem",letterSpacing:".08em"}}>TODAY'S PROGRESS</div>
            <div style={{fontFamily:"'Bricolage Grotesque',sans-serif",fontSize:"3rem",fontWeight:900,color:"#fff",lineHeight:1}}>580</div>
            <div style={{color:"rgba(255,255,255,.6)",fontSize:".8rem",marginBottom:"1rem"}}>of 800 cal goal</div>
            <div style={{background:"rgba(255,255,255,.15)",borderRadius:10,height:8,overflow:"hidden"}}>
              <div style={{background:"linear-gradient(90deg,#4ade80,#22c55e)",height:"100%",width:"72%",borderRadius:10}}/>
            </div>
            <div style={{display:"flex",justifyContent:"space-around",marginTop:"1rem"}}>
              {[["💧","2.1L","Water"],["🔥","580","Calories"],["👣","7,240","Steps"]].map(([e,v,l]) => (
                <div key={l} style={{textAlign:"center"}}>
                  <div style={{fontSize:"1rem"}}>{e}</div>
                  <div style={{fontWeight:800,color:"#fff",fontSize:".88rem"}}>{v}</div>
                  <div style={{fontSize:".65rem",color:"rgba(255,255,255,.5)"}}>{l}</div>
                </div>
              ))}
            </div>
          </div>

          {/* WORKOUTS */}
          <div style={{fontFamily:"'Bricolage Grotesque',sans-serif",fontWeight:800,color:"#fff",fontSize:"1rem",marginBottom:".75rem"}}>Today's Workouts</div>
          {workouts.map(w => (
            <div key={w.name} style={{background: w.complete ? "rgba(74,222,128,.08)" : "rgba(255,255,255,.05)",borderRadius:14,padding:"1rem",marginBottom:".6rem",display:"flex",justifyContent:"space-between",alignItems:"center",border: w.complete ? "1px solid rgba(74,222,128,.2)" : "1px solid rgba(255,255,255,.07)"}}>
              <div style={{display:"flex",gap:".75rem",alignItems:"center"}}>
                <span style={{fontSize:"1.5rem"}}>{w.emoji}</span>
                <div>
                  <div style={{fontWeight:700,color:"#fff",fontSize:".88rem"}}>{w.name}</div>
                  <div style={{fontSize:".72rem",color:"#64748b"}}>{w.duration} · {w.cal} cal · {w.level}</div>
                </div>
              </div>
              <div style={{width:24,height:24,borderRadius:8,background: w.complete ? "#22c55e" : "rgba(255,255,255,.1)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:".75rem"}}>{w.complete ? "✓" : ""}</div>
            </div>
          ))}
        </div>
      )}

      {/* BOTTOM NAV */}
      <div style={{background:"rgba(255,255,255,.05)",backdropFilter:"blur(10px)",borderTop:"1px solid rgba(255,255,255,.08)",padding:".75rem 1.25rem",display:"flex",justifyContent:"space-around"}}>
        {[["🏠","Home"],["📊","Stats"],["💪","Workout"],["👤","Profile"]].map(([icon,label]) => (
          <div key={label} onClick={() => setScreen(label.toLowerCase())} style={{textAlign:"center",cursor:"pointer"}}>
            <div style={{fontSize:"1.2rem"}}>{icon}</div>
            <div style={{fontSize:".6rem",color: screen===label.toLowerCase() ? "#60a5fa" : "rgba(255,255,255,.4)",fontWeight:700,marginTop:".1rem"}}>{label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function DemoBooking() {
  const [step, setStep] = useState(1);
  const [selected, setSelected] = useState({ service: null, stylist: null, date: null, time: null });
  const services = [
    { id:1, name:"Haircut & Style", duration:"45 min", price:600, emoji:"✂️" },
    { id:2, name:"Hair Colour", duration:"90 min", price:2200, emoji:"🎨" },
    { id:3, name:"Keratin Treatment", duration:"120 min", price:3500, emoji:"✨" },
    { id:4, name:"Facial & Cleanup", duration:"60 min", price:1200, emoji:"💆" },
  ];
  const stylists = [
    { id:1, name:"Priya Sharma", spec:"Colouring Expert", rating:"4.9", emoji:"👩" },
    { id:2, name:"Aarav Singh", spec:"Hair Styling", rating:"4.8", emoji:"👨" },
    { id:3, name:"Meera Patel", spec:"Skin & Beauty", rating:"5.0", emoji:"👩" },
  ];
  const slots = ["10:00","11:30","13:00","14:30","16:00","17:30"];
  const [booked, setBooked] = useState(false);

  return (
    <div style={{fontFamily:"'Manrope',sans-serif",minHeight:"100%",background:"#0f0a0a",color:"#fff",display:"flex",flexDirection:"column"}}>
      {/* HEADER */}
      <div style={{background:"linear-gradient(135deg,#2d0a0a,#4a1010)",padding:"1.25rem 1.5rem",display:"flex",alignItems:"center",gap:".75rem"}}>
        <span style={{fontSize:"1.5rem"}}>✂️</span>
        <div>
          <div style={{fontFamily:"'Bricolage Grotesque',sans-serif",fontWeight:900,fontSize:"1.1rem",color:"#fff"}}>LuxeCuts Salon</div>
          <div style={{fontSize:".72rem",color:"rgba(255,255,255,.5)"}}>Book your appointment in 60 seconds</div>
        </div>
      </div>

      {/* PROGRESS */}
      <div style={{background:"rgba(255,255,255,.05)",padding:".75rem 1.5rem",display:"flex",gap:".5rem",alignItems:"center"}}>
        {["Service","Stylist","Date & Time","Confirm"].map((s,i) => (
          <div key={s} style={{display:"contents"}}>
            <div style={{display:"flex",alignItems:"center",gap:".35rem"}}>
              <div style={{width:22,height:22,borderRadius:"50%",background: step>i+1 ? "#22c55e" : step===i+1 ? "#e11d48" : "rgba(255,255,255,.1)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:".65rem",fontWeight:800}}>
                {step>i+1 ? "✓" : i+1}
              </div>
              <span style={{fontSize:".72rem",color: step===i+1 ? "#fff" : "rgba(255,255,255,.4)",fontWeight:600}}>{s}</span>
            </div>
            {i<3 && <div style={{flex:1,height:1,background:"rgba(255,255,255,.1)"}}/>}
          </div>
        ))}
      </div>

      <div style={{flex:1,padding:"1.25rem",overflowY:"auto"}}>
        {step===1 && (
          <div>
            <div style={{fontFamily:"'Bricolage Grotesque',sans-serif",fontWeight:800,fontSize:"1.05rem",color:"#fff",marginBottom:"1rem"}}>Choose a Service</div>
            {services.map(s => (
              <div key={s.id} onClick={() => setSelected(p=>({...p,service:s}))} style={{background: selected.service?.id===s.id ? "rgba(225,29,72,.15)" : "rgba(255,255,255,.05)",borderRadius:14,padding:"1rem 1.25rem",marginBottom:".6rem",display:"flex",justifyContent:"space-between",alignItems:"center",cursor:"pointer",border: selected.service?.id===s.id ? "1.5px solid rgba(225,29,72,.5)" : "1.5px solid rgba(255,255,255,.06)"}}>
                <div style={{display:"flex",gap:".75rem",alignItems:"center"}}>
                  <span style={{fontSize:"1.5rem"}}>{s.emoji}</span>
                  <div>
                    <div style={{fontWeight:700,color:"#fff",fontSize:".9rem"}}>{s.name}</div>
                    <div style={{fontSize:".72rem",color:"rgba(255,255,255,.4)"}}>{s.duration}</div>
                  </div>
                </div>
                <span style={{fontWeight:800,color:"#e11d48",fontSize:".95rem"}}>₹{s.price}</span>
              </div>
            ))}
          </div>
        )}
        {step===2 && (
          <div>
            <div style={{fontFamily:"'Bricolage Grotesque',sans-serif",fontWeight:800,fontSize:"1.05rem",color:"#fff",marginBottom:"1rem"}}>Choose a Stylist</div>
            {stylists.map(s => (
              <div key={s.id} onClick={() => setSelected(p=>({...p,stylist:s}))} style={{background: selected.stylist?.id===s.id ? "rgba(225,29,72,.15)" : "rgba(255,255,255,.05)",borderRadius:14,padding:"1rem",marginBottom:".6rem",display:"flex",gap:"1rem",alignItems:"center",cursor:"pointer",border: selected.stylist?.id===s.id ? "1.5px solid rgba(225,29,72,.5)" : "1.5px solid rgba(255,255,255,.06)"}}>
                <div style={{width:44,height:44,background:"linear-gradient(135deg,#4a1010,#e11d48)",borderRadius:12,display:"flex",alignItems:"center",justifyContent:"center",fontSize:"1.4rem"}}>{s.emoji}</div>
                <div>
                  <div style={{fontWeight:700,color:"#fff"}}>{s.name}</div>
                  <div style={{fontSize:".75rem",color:"rgba(255,255,255,.5)"}}>{s.spec} · ⭐ {s.rating}</div>
                </div>
                {selected.stylist?.id===s.id && <div style={{marginLeft:"auto",color:"#e11d48",fontWeight:800}}>✓</div>}
              </div>
            ))}
          </div>
        )}
        {step===3 && (
          <div>
            <div style={{fontFamily:"'Bricolage Grotesque',sans-serif",fontWeight:800,fontSize:"1.05rem",color:"#fff",marginBottom:"1rem"}}>Pick Date & Time</div>
            <div style={{display:"flex",gap:".5rem",marginBottom:"1rem",flexWrap:"wrap"}}>
              {["Sat, 15 Mar","Sun, 16 Mar","Mon, 17 Mar","Tue, 18 Mar"].map(d => (
                <div key={d} onClick={() => setSelected(p=>({...p,date:d}))} style={{background: selected.date===d ? "#e11d48" : "rgba(255,255,255,.06)",color:"#fff",borderRadius:10,padding:".5rem .9rem",fontSize:".78rem",fontWeight:700,cursor:"pointer",border: selected.date===d ? "1.5px solid #e11d48" : "1.5px solid rgba(255,255,255,.08)"}}>{d}</div>
              ))}
            </div>
            <div style={{fontFamily:"'Bricolage Grotesque',sans-serif",fontWeight:700,fontSize:".9rem",color:"rgba(255,255,255,.6)",marginBottom:".75rem"}}>Available Slots</div>
            <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:".5rem"}}>
              {slots.map(t => (
                <div key={t} onClick={() => setSelected(p=>({...p,time:t}))} style={{background: selected.time===t ? "#e11d48" : "rgba(255,255,255,.06)",color:"#fff",borderRadius:10,padding:".6rem",textAlign:"center",fontSize:".82rem",fontWeight:700,cursor:"pointer",border: selected.time===t ? "1.5px solid #e11d48" : "1.5px solid rgba(255,255,255,.08)"}}>{t}</div>
              ))}
            </div>
          </div>
        )}
        {step===4 && !booked && (
          <div>
            <div style={{fontFamily:"'Bricolage Grotesque',sans-serif",fontWeight:800,fontSize:"1.05rem",color:"#fff",marginBottom:"1.25rem"}}>Confirm Booking</div>
            <div style={{background:"rgba(255,255,255,.05)",borderRadius:16,padding:"1.25rem",border:"1px solid rgba(255,255,255,.08)"}}>
              {[["Service",selected.service?.name || "—"],["Stylist",selected.stylist?.name || "—"],["Date",selected.date || "—"],["Time",selected.time || "—"],["Amount","₹"+(selected.service?.price || 0)]].map(([l,v]) => (
                <div key={l} style={{display:"flex",justifyContent:"space-between",padding:".6rem 0",borderBottom:"1px solid rgba(255,255,255,.06)"}}>
                  <span style={{color:"rgba(255,255,255,.5)",fontSize:".85rem"}}>{l}</span>
                  <span style={{fontWeight:700,color:"#fff",fontSize:".85rem"}}>{v}</span>
                </div>
              ))}
            </div>
          </div>
        )}
        {booked && (
          <div style={{textAlign:"center",padding:"2rem 0"}}>
            <div style={{fontSize:"4rem",marginBottom:"1rem"}}>🎉</div>
            <div style={{fontFamily:"'Bricolage Grotesque',sans-serif",fontWeight:900,fontSize:"1.4rem",color:"#22c55e",marginBottom:".5rem"}}>Booking Confirmed!</div>
            <div style={{color:"rgba(255,255,255,.6)",fontSize:".9rem",lineHeight:1.6}}>See you at LuxeCuts on<br/><strong style={{color:"#fff"}}>{selected.date} at {selected.time}</strong></div>
          </div>
        )}
      </div>

      {/* BOTTOM BUTTON */}
      {!booked && (
        <div style={{padding:"1rem 1.5rem",borderTop:"1px solid rgba(255,255,255,.08)"}}>
          <div onClick={() => { if(step<4) setStep(s=>s+1); else setBooked(true); }} style={{background:"#e11d48",color:"#fff",borderRadius:14,padding:"1rem",textAlign:"center",fontWeight:800,fontSize:"1rem",cursor:"pointer"}}>
            {step<4 ? "Continue →" : "Confirm Booking"}
          </div>
        </div>
      )}
    </div>
  );
}

function DemoLMS() {
  const [tab, setTab] = useState("courses");
  const courses = [
    { id:1, title:"React & Next.js — Complete Course", instructor:"Arjun Dev", students:4820, rating:4.9, price:1999, progress:65, tag:"Bestseller", emoji:"⚛️" },
    { id:2, title:"Python for Data Science", instructor:"Dr. Priya R.", students:6240, rating:4.8, price:2499, progress:0, tag:"Hot", emoji:"🐍" },
    { id:3, title:"UI/UX Design Masterclass", instructor:"Sneha Patel", students:3180, rating:4.7, price:1499, progress:30, tag:"New", emoji:"🎨" },
    { id:4, title:"Node.js & MongoDB Backend", instructor:"Rahul Kumar", students:2950, rating:4.9, price:1799, progress:0, tag:"Trending", emoji:"🟢" },
  ];
  return (
    <div style={{fontFamily:"'Manrope',sans-serif",minHeight:"100vh",background:"#fafafa",overflowY:"auto"}}>
      <nav style={{background:"#fff",padding:"0 2rem",height:60,display:"flex",alignItems:"center",justifyContent:"space-between",borderBottom:"1px solid #e5e7eb",position:"sticky",top:0,zIndex:50}}>
        <div style={{fontFamily:"'Bricolage Grotesque',sans-serif",fontWeight:900,fontSize:"1.2rem",color:"#7c3aed"}}>Learn<span style={{color:"#0f172a"}}>Hub</span></div>
        <div style={{display:"flex",gap:"1.5rem"}}>
          {["Courses","My Learning","Instructors","Blog"].map(n => (
            <span key={n} style={{color:"#374151",fontSize:".82rem",fontWeight:600,cursor:"pointer"}}>{n}</span>
          ))}
        </div>
        <div style={{display:"flex",gap:".75rem"}}>
          <div style={{border:"1.5px solid #7c3aed",color:"#7c3aed",padding:".4rem 1rem",borderRadius:8,fontWeight:700,fontSize:".82rem",cursor:"pointer"}}>Log In</div>
          <div style={{background:"#7c3aed",color:"#fff",padding:".4rem 1rem",borderRadius:8,fontWeight:700,fontSize:".82rem",cursor:"pointer"}}>Sign Up Free</div>
        </div>
      </nav>

      {/* HERO */}
      <div style={{background:"linear-gradient(135deg,#4c1d95,#7c3aed,#6d28d9)",padding:"4rem 2rem",textAlign:"center"}}>
        <div style={{display:"inline-block",background:"rgba(255,255,255,.15)",borderRadius:20,padding:".3rem 1rem",fontSize:".72rem",color:"#ddd6fe",marginBottom:"1.2rem",letterSpacing:".08em",fontWeight:700}}>15,000+ STUDENTS · 120+ COURSES</div>
        <h1 style={{fontFamily:"'Bricolage Grotesque',sans-serif",fontSize:"clamp(2rem,5vw,3.5rem)",fontWeight:900,color:"#fff",marginBottom:"1rem",lineHeight:1.1}}>Learn Skills That<br/><span style={{color:"#c4b5fd"}}>Actually Pay</span></h1>
        <p style={{color:"rgba(255,255,255,.7)",fontSize:"1rem",maxWidth:500,margin:"0 auto 2rem",lineHeight:1.7}}>Industry-led courses in coding, design and business. Certificate on completion. Job placement support.</p>
        <div style={{display:"flex",gap:".75rem",justifyContent:"center",flexWrap:"wrap"}}>
          <div style={{background:"#fff",color:"#7c3aed",padding:".85rem 2rem",borderRadius:12,fontWeight:800,fontSize:".95rem",cursor:"pointer"}}>Explore Courses →</div>
          <div style={{background:"rgba(255,255,255,.1)",color:"#fff",padding:".85rem 2rem",borderRadius:12,fontWeight:700,fontSize:".95rem",border:"1.5px solid rgba(255,255,255,.25)",cursor:"pointer"}}>Try for Free</div>
        </div>
      </div>

      {/* COURSES */}
      <div style={{padding:"3rem 2rem",maxWidth:1100,margin:"0 auto"}}>
        <h2 style={{fontFamily:"'Bricolage Grotesque',sans-serif",fontSize:"1.8rem",fontWeight:900,color:"#0f172a",marginBottom:"2rem"}}>Popular Courses</h2>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(260px,1fr))",gap:"1.5rem"}}>
          {courses.map(c => (
            <div key={c.id} style={{background:"#fff",borderRadius:18,overflow:"hidden",border:"1.5px solid #e5e7eb",boxShadow:"0 4px 16px rgba(0,0,0,.05)"}}>
              <div style={{background:"linear-gradient(135deg,#4c1d95,#7c3aed)",height:140,display:"flex",alignItems:"center",justifyContent:"center",fontSize:"4rem",position:"relative"}}>
                {c.emoji}
                <div style={{position:"absolute",top:10,left:10,background:"#fbbf24",color:"#0f172a",borderRadius:6,padding:".15rem .6rem",fontSize:".7rem",fontWeight:800}}>{c.tag}</div>
              </div>
              <div style={{padding:"1.1rem"}}>
                <div style={{fontWeight:800,fontSize:".9rem",color:"#0f172a",marginBottom:".25rem",lineHeight:1.4}}>{c.title}</div>
                <div style={{fontSize:".75rem",color:"#6b7280",marginBottom:".5rem"}}>by {c.instructor} · ⭐ {c.rating} · {c.students.toLocaleString()} students</div>
                {c.progress > 0 && (
                  <div style={{marginBottom:".75rem"}}>
                    <div style={{display:"flex",justifyContent:"space-between",fontSize:".72rem",color:"#6b7280",marginBottom:".25rem"}}><span>Progress</span><span>{c.progress}%</span></div>
                    <div style={{background:"#f3f4f6",borderRadius:10,height:6,overflow:"hidden"}}>
                      <div style={{background:"#7c3aed",height:"100%",width:c.progress+"%",borderRadius:10}}/>
                    </div>
                  </div>
                )}
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                  <span style={{fontFamily:"'Bricolage Grotesque',sans-serif",fontWeight:900,fontSize:"1.1rem",color:"#7c3aed"}}>₹{c.price}</span>
                  <div style={{background: c.progress > 0 ? "#7c3aed" : "#7c3aed",color:"#fff",padding:".4rem .9rem",borderRadius:8,fontWeight:700,fontSize:".78rem",cursor:"pointer"}}>
                    {c.progress > 0 ? "Continue →" : "Enroll Now"}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div style={{background:"#7c3aed",padding:"2rem",display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:"1rem"}}>
        <div style={{color:"rgba(255,255,255,.5)",fontSize:".8rem"}}>© 2025 LearnHub · All Rights Reserved</div>
        <div style={{color:"#ddd6fe",fontSize:".75rem",fontWeight:700}}>Website by Orbnix</div>
      </div>
    </div>
  );
}

function DemoArchitect() {
  const projects = [
    { name:"Sharma Residence", type:"Residential Villa", location:"Jaipur", year:"2024", emoji:"🏡", tag:"Completed" },
    { name:"The Atrium Office", type:"Commercial Space", location:"Delhi", year:"2024", emoji:"🏢", tag:"Featured" },
    { name:"Nirvana Resort", type:"Hospitality", location:"Udaipur", year:"2023", emoji:"🏨", tag:"Award Winner" },
    { name:"Green Valley Apartments", type:"Residential Complex", location:"Pune", year:"2024", emoji:"🏘️", tag:"Ongoing" },
    { name:"Heritage Museum", type:"Public Space", location:"Jaipur", year:"2023", emoji:"🏛️", tag:"Completed" },
    { name:"Sky Café", type:"Interior Design", location:"Mumbai", year:"2024", emoji:"☁️", tag:"Featured" },
  ];
  return (
    <div style={{fontFamily:"'Manrope',sans-serif",minHeight:"100vh",background:"#fafaf8",overflowY:"auto"}}>
      <nav style={{background:"#fff",padding:"0 2rem",height:64,display:"flex",alignItems:"center",justifyContent:"space-between",borderBottom:"1px solid #e7e5e0",position:"sticky",top:0,zIndex:50}}>
        <div style={{fontFamily:"'Bricolage Grotesque',sans-serif",fontSize:"1.1rem",fontWeight:900,color:"#1c1917",letterSpacing:"-.01em"}}>Studio <span style={{fontWeight:400,color:"#78716c"}}>Srivastava</span></div>
        <div style={{display:"flex",gap:"2rem"}}>
          {["Work","Studio","Process","Contact"].map(n => (
            <span key={n} style={{color:"#57534e",fontSize:".85rem",fontWeight:600,cursor:"pointer",letterSpacing:".02em"}}>{n}</span>
          ))}
        </div>
        <div style={{border:"1px solid #1c1917",color:"#1c1917",padding:".5rem 1.25rem",borderRadius:4,fontWeight:600,fontSize:".82rem",cursor:"pointer",letterSpacing:".04em"}}>Enquire</div>
      </nav>

      {/* HERO */}
      <div style={{background:"#1c1917",padding:"6rem 2rem",position:"relative",overflow:"hidden"}}>
        <div style={{position:"absolute",inset:0,opacity:.08,fontSize:"20rem",display:"flex",alignItems:"center",justifyContent:"flex-end",paddingRight:"2rem",lineHeight:1}}>⬡</div>
        <div style={{position:"relative",maxWidth:700}}>
          <div style={{fontSize:".72rem",color:"#a8a29e",letterSpacing:".2em",marginBottom:"1.5rem",fontWeight:600}}>ARCHITECTURE & INTERIOR DESIGN · SINCE 2008</div>
          <h1 style={{fontFamily:"'Bricolage Grotesque',sans-serif",fontSize:"clamp(2.5rem,6vw,5rem)",fontWeight:900,color:"#fff",marginBottom:"1.25rem",lineHeight:1.0,letterSpacing:"-.03em"}}>We Design<br/>Spaces That<br/><span style={{color:"#d6d3d1"}}>Inspire.</span></h1>
          <p style={{color:"#a8a29e",fontSize:"1.05rem",maxWidth:480,lineHeight:1.75,marginBottom:"2.5rem"}}>Award-winning architecture and interior design. 150+ projects across India. From private residences to landmark commercial spaces.</p>
          <div style={{display:"flex",gap:"1rem",flexWrap:"wrap"}}>
            <div style={{background:"#fff",color:"#1c1917",padding:".9rem 2rem",borderRadius:4,fontWeight:700,fontSize:".9rem",cursor:"pointer",letterSpacing:".02em"}}>View Our Work →</div>
            <div style={{border:"1px solid rgba(255,255,255,.3)",color:"#fff",padding:".9rem 2rem",borderRadius:4,fontWeight:600,fontSize:".9rem",cursor:"pointer"}}>Download Portfolio</div>
          </div>
        </div>
      </div>

      {/* STATS */}
      <div style={{background:"#292524",padding:"2rem",display:"flex",justifyContent:"center",gap:"4rem",flexWrap:"wrap"}}>
        {[["150+","Projects"],["16","Years"],["12","Awards"],["8","Cities"]].map(([n,l]) => (
          <div key={l} style={{textAlign:"center"}}>
            <div style={{fontFamily:"'Bricolage Grotesque',sans-serif",fontSize:"2.2rem",fontWeight:900,color:"#fff"}}>{n}</div>
            <div style={{fontSize:".78rem",color:"#78716c",fontWeight:600,letterSpacing:".08em"}}>{l}</div>
          </div>
        ))}
      </div>

      {/* PORTFOLIO GRID */}
      <div style={{padding:"4rem 2rem",maxWidth:1100,margin:"0 auto"}}>
        <h2 style={{fontFamily:"'Bricolage Grotesque',sans-serif",fontSize:"2rem",fontWeight:900,color:"#1c1917",marginBottom:".5rem"}}>Selected Work</h2>
        <p style={{color:"#78716c",marginBottom:"2.5rem"}}>A curated selection from our portfolio</p>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(300px,1fr))",gap:"1.5rem"}}>
          {projects.map(p => (
            <div key={p.name} style={{background:"#1c1917",borderRadius:4,overflow:"hidden",cursor:"pointer",position:"relative",aspectRatio:"4/3",display:"flex",flexDirection:"column",justifyContent:"flex-end"}}>
              <div style={{position:"absolute",inset:0,display:"flex",alignItems:"center",justifyContent:"center",fontSize:"6rem",opacity:.3}}>{p.emoji}</div>
              <div style={{position:"absolute",top:12,right:12,background:"rgba(255,255,255,.9)",color:"#1c1917",borderRadius:4,padding:".2rem .7rem",fontSize:".7rem",fontWeight:800}}>{p.tag}</div>
              <div style={{background:"linear-gradient(to top,rgba(0,0,0,.9),transparent)",padding:"1.5rem",position:"relative"}}>
                <div style={{fontFamily:"'Bricolage Grotesque',sans-serif",fontWeight:800,fontSize:"1rem",color:"#fff",marginBottom:".25rem"}}>{p.name}</div>
                <div style={{fontSize:".78rem",color:"rgba(255,255,255,.5)"}}>{p.type} · {p.location} · {p.year}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* FOOTER */}
      <div style={{background:"#1c1917",padding:"2rem",display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:"1rem"}}>
        <div style={{color:"rgba(255,255,255,.3)",fontSize:".8rem"}}>© 2025 Studio Srivastava · All Rights Reserved</div>
        <div style={{color:"#a8a29e",fontSize:".75rem",fontWeight:700}}>Website by Orbnix</div>
      </div>
    </div>
  );
}

function DemoFactory() {
  const products = [
    { name:"Industrial Bearing Set", code:"IBS-4420", moq:"500 units", price:"₹180/unit", lead:"15 days", emoji:"⚙️" },
    { name:"Precision Gear Assembly", code:"PGA-7730", moq:"200 units", price:"₹420/unit", lead:"21 days", emoji:"🔩" },
    { name:"Hydraulic Pump Unit", code:"HPU-1150", moq:"50 units", price:"₹2,800/unit", lead:"30 days", emoji:"🔧" },
    { name:"Stainless Steel Flange", code:"SSF-3310", moq:"1000 units", price:"₹95/unit", lead:"10 days", emoji:"🛞" },
  ];
  const certs = ["ISO 9001:2015","ISO 14001","MSME Registered","Make in India","BIS Certified"];
  return (
    <div style={{fontFamily:"'Manrope',sans-serif",minHeight:"100vh",background:"#f8fafc",overflowY:"auto"}}>
      <nav style={{background:"#0f172a",padding:"0 2rem",height:64,display:"flex",alignItems:"center",justifyContent:"space-between",position:"sticky",top:0,zIndex:50}}>
        <div style={{display:"flex",alignItems:"center",gap:10}}>
          <span style={{fontSize:"1.5rem"}}>⚙️</span>
          <div>
            <div style={{fontFamily:"'Bricolage Grotesque',sans-serif",fontSize:"1.05rem",fontWeight:900,color:"#fff",lineHeight:1}}>Precision Engineering</div>
            <div style={{fontSize:".6rem",color:"#fbbf24",letterSpacing:".1em",fontWeight:700}}>SINCE 1998 · ISO CERTIFIED</div>
          </div>
        </div>
        <div style={{display:"flex",gap:"1.5rem"}}>
          {["Products","Capabilities","Quality","Export","Contact"].map(n => (
            <span key={n} style={{color:"rgba(255,255,255,.7)",fontSize:".82rem",fontWeight:600,cursor:"pointer"}}>{n}</span>
          ))}
        </div>
        <div style={{background:"#f97316",color:"#fff",padding:".5rem 1.25rem",borderRadius:8,fontWeight:700,fontSize:".82rem",cursor:"pointer"}}>Request Quote</div>
      </nav>

      {/* HERO */}
      <div style={{background:"linear-gradient(135deg,#0f172a 0%,#1e293b 60%,#334155 100%)",padding:"5rem 2rem",position:"relative",overflow:"hidden"}}>
        <div style={{position:"absolute",right:0,top:0,bottom:0,width:"40%",opacity:.05,fontSize:"15rem",display:"flex",alignItems:"center",justifyContent:"center"}}>⚙️</div>
        <div style={{position:"relative",maxWidth:700}}>
          <div style={{display:"inline-block",background:"rgba(251,191,36,.15)",border:"1px solid rgba(251,191,36,.3)",borderRadius:20,padding:".3rem 1rem",fontSize:".72rem",color:"#fbbf24",marginBottom:"1.5rem",letterSpacing:".1em",fontWeight:700}}>ISO 9001:2015 CERTIFIED · RAJASTHAN</div>
          <h1 style={{fontFamily:"'Bricolage Grotesque',sans-serif",fontSize:"clamp(2rem,5vw,3.5rem)",fontWeight:900,color:"#fff",marginBottom:"1rem",lineHeight:1.1}}>Precision-Engineered<br/><span style={{color:"#fbbf24"}}>Industrial Components</span></h1>
          <p style={{color:"rgba(255,255,255,.65)",lineHeight:1.75,marginBottom:"2rem",fontSize:".95rem",maxWidth:560}}>Manufacturing high-quality industrial components for automotive, aerospace and heavy engineering sectors since 1998. Export to 18 countries.</p>
          <div style={{display:"flex",gap:".75rem",flexWrap:"wrap"}}>
            <div style={{background:"#f97316",color:"#fff",padding:".9rem 2rem",borderRadius:10,fontWeight:800,fontSize:".9rem",cursor:"pointer"}}>Request Bulk Quote →</div>
            <div style={{background:"rgba(255,255,255,.08)",color:"#fff",padding:".9rem 2rem",borderRadius:10,fontWeight:700,fontSize:".9rem",border:"1.5px solid rgba(255,255,255,.15)",cursor:"pointer"}}>Download Catalogue</div>
          </div>
          <div style={{display:"flex",gap:"2.5rem",marginTop:"2.5rem",flexWrap:"wrap"}}>
            {[["25+","Years"],["500+","Products"],["18","Export Countries"],["50M+","Units/Year"]].map(([n,l]) => (
              <div key={l}><div style={{fontFamily:"'Bricolage Grotesque',sans-serif",fontSize:"1.8rem",fontWeight:900,color:"#fbbf24"}}>{n}</div><div style={{fontSize:".75rem",color:"rgba(255,255,255,.5)",fontWeight:600}}>{l}</div></div>
            ))}
          </div>
        </div>
      </div>

      {/* CERTIFICATIONS */}
      <div style={{background:"#fff",padding:"1rem 2rem",display:"flex",justifyContent:"center",gap:"1rem",flexWrap:"wrap",borderBottom:"1px solid #e2e8f0"}}>
        {certs.map(c => (
          <span key={c} style={{background:"#f0fdf4",color:"#15803d",border:"1px solid #bbf7d0",borderRadius:8,padding:".3rem .8rem",fontSize:".75rem",fontWeight:700}}>✓ {c}</span>
        ))}
      </div>

      {/* PRODUCTS */}
      <div style={{padding:"3rem 2rem",maxWidth:1100,margin:"0 auto"}}>
        <h2 style={{fontFamily:"'Bricolage Grotesque',sans-serif",fontSize:"1.8rem",fontWeight:900,color:"#0f172a",marginBottom:".5rem"}}>Featured Products</h2>
        <p style={{color:"#64748b",marginBottom:"2.5rem"}}>Custom manufacturing available. All products tested to industry standards.</p>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(260px,1fr))",gap:"1.25rem"}}>
          {products.map(p => (
            <div key={p.name} style={{background:"#fff",borderRadius:16,padding:"1.5rem",border:"1.5px solid #e2e8f0",boxShadow:"0 2px 12px rgba(0,0,0,.04)"}}>
              <div style={{fontSize:"2.5rem",marginBottom:"1rem"}}>{p.emoji}</div>
              <div style={{fontFamily:"'Bricolage Grotesque',sans-serif",fontWeight:800,fontSize:"1rem",color:"#0f172a",marginBottom:".25rem"}}>{p.name}</div>
              <div style={{fontFamily:"'JetBrains Mono',monospace",fontSize:".72rem",color:"#2563eb",background:"#eff6ff",borderRadius:6,padding:".2rem .6rem",display:"inline-block",marginBottom:".75rem"}}>{p.code}</div>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:".5rem",marginBottom:"1rem"}}>
                {[["MOQ",p.moq],["Price",p.price],["Lead Time",p.lead]].map(([l,v]) => (
                  <div key={l} style={{background:"#f8fafc",borderRadius:8,padding:".5rem .75rem"}}>
                    <div style={{fontSize:".65rem",color:"#94a3b8",fontWeight:700,marginBottom:".1rem"}}>{l}</div>
                    <div style={{fontSize:".82rem",fontWeight:700,color:"#0f172a"}}>{v}</div>
                  </div>
                ))}
              </div>
              <div style={{background:"#0f172a",color:"#fff",padding:".6rem",borderRadius:10,textAlign:"center",fontWeight:700,fontSize:".82rem",cursor:"pointer"}}>Request Quote</div>
            </div>
          ))}
        </div>
      </div>

      <div style={{background:"#0f172a",padding:"2rem",display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:"1rem"}}>
        <div style={{color:"rgba(255,255,255,.4)",fontSize:".8rem"}}>© 2025 Precision Engineering Co. · All Rights Reserved</div>
        <div style={{color:"#fbbf24",fontSize:".75rem",fontWeight:700}}>Website by Orbnix</div>
      </div>
    </div>
  );
}

function DemoAstrologer() {
  const [tab, setTab] = useState("services");
  const services = [
    { name:"Kundali Analysis", desc:"Detailed birth chart reading — career, marriage, health, finance.", duration:"60 min", price:"₹1,100", emoji:"⭐" },
    { name:"Numerology Report", desc:"Name & date analysis. Lucky numbers, colours and remedies.", duration:"45 min", price:"₹800", emoji:"🔢" },
    { name:"Vastu Consultation", desc:"Home & office Vastu analysis with correction remedies.", duration:"90 min", price:"₹2,500", emoji:"🏠" },
    { name:"Match Making", desc:"Detailed horoscope matching for marriage compatibility.", duration:"60 min", price:"₹1,500", emoji:"💑" },
  ];
  return (
    <div style={{fontFamily:"'Manrope',sans-serif",minHeight:"100vh",background:"#0d0714",overflowY:"auto"}}>
      <nav style={{background:"rgba(13,7,20,.9)",backdropFilter:"blur(10px)",padding:"0 2rem",height:64,display:"flex",alignItems:"center",justifyContent:"space-between",borderBottom:"1px solid rgba(139,92,246,.2)",position:"sticky",top:0,zIndex:50}}>
        <div style={{display:"flex",alignItems:"center",gap:8}}>
          <span style={{fontSize:"1.4rem"}}>🌙</span>
          <div style={{fontFamily:"'Bricolage Grotesque',sans-serif",fontSize:"1.1rem",fontWeight:900,color:"#fff"}}>Jyotish <span style={{color:"#a78bfa"}}>Wisdom</span></div>
        </div>
        <div style={{display:"flex",gap:"1.5rem"}}>
          {["Services","About","Testimonials","Contact"].map(n => (
            <span key={n} style={{color:"rgba(255,255,255,.7)",fontSize:".82rem",fontWeight:600,cursor:"pointer"}}>{n}</span>
          ))}
        </div>
        <div style={{background:"linear-gradient(135deg,#7c3aed,#a78bfa)",color:"#fff",padding:".5rem 1.25rem",borderRadius:8,fontWeight:700,fontSize:".82rem",cursor:"pointer"}}>Book Session</div>
      </nav>

      {/* HERO */}
      <div style={{padding:"5rem 2rem",textAlign:"center",position:"relative",overflow:"hidden"}}>
        <div style={{position:"absolute",inset:0,background:"radial-gradient(ellipse at 50% 0%, rgba(139,92,246,.2) 0%, transparent 70%)"}}/>
        <div style={{position:"relative"}}>
          <div style={{fontSize:"4rem",marginBottom:"1rem"}}>🌟</div>
          <div style={{display:"inline-block",background:"rgba(139,92,246,.15)",border:"1px solid rgba(139,92,246,.3)",borderRadius:20,padding:".3rem 1rem",fontSize:".72rem",color:"#a78bfa",marginBottom:"1.5rem",letterSpacing:".1em",fontWeight:700}}>VEDIC ASTROLOGY · 20+ YEARS EXPERIENCE</div>
          <h1 style={{fontFamily:"'Bricolage Grotesque',sans-serif",fontSize:"clamp(2rem,5vw,3.8rem)",fontWeight:900,color:"#fff",marginBottom:"1rem",lineHeight:1.1}}>Discover Your<br/><span style={{color:"#c4b5fd"}}>Cosmic Path</span></h1>
          <p style={{color:"rgba(255,255,255,.65)",fontSize:"1.05rem",maxWidth:520,margin:"0 auto 2.5rem",lineHeight:1.75}}>Authentic Vedic astrology, numerology and Vastu consultations. Guidance for life's most important decisions.</p>
          <div style={{display:"flex",gap:"1rem",justifyContent:"center",flexWrap:"wrap"}}>
            <div style={{background:"linear-gradient(135deg,#7c3aed,#a78bfa)",color:"#fff",padding:".9rem 2rem",borderRadius:12,fontWeight:800,fontSize:".95rem",cursor:"pointer"}}>Book Consultation →</div>
            <div style={{background:"rgba(255,255,255,.06)",color:"#fff",padding:".9rem 2rem",borderRadius:12,fontWeight:700,fontSize:".95rem",border:"1.5px solid rgba(139,92,246,.3)",cursor:"pointer"}}>Free Kundali</div>
          </div>
        </div>
      </div>

      {/* SERVICES */}
      <div style={{padding:"2rem",maxWidth:900,margin:"0 auto"}}>
        <h2 style={{fontFamily:"'Bricolage Grotesque',sans-serif",fontSize:"1.8rem",fontWeight:900,color:"#fff",textAlign:"center",marginBottom:"2rem"}}>Our Services</h2>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(240px,1fr))",gap:"1.25rem"}}>
          {services.map(s => (
            <div key={s.name} style={{background:"rgba(139,92,246,.08)",borderRadius:18,padding:"1.5rem",border:"1px solid rgba(139,92,246,.2)"}}>
              <div style={{fontSize:"2.5rem",marginBottom:"1rem"}}>{s.emoji}</div>
              <div style={{fontFamily:"'Bricolage Grotesque',sans-serif",fontWeight:800,fontSize:"1rem",color:"#fff",marginBottom:".5rem"}}>{s.name}</div>
              <div style={{color:"rgba(255,255,255,.55)",fontSize:".85rem",lineHeight:1.6,marginBottom:"1rem"}}>{s.desc}</div>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                <span style={{fontWeight:800,color:"#a78bfa",fontSize:".95rem"}}>{s.price}</span>
                <span style={{fontSize:".75rem",color:"rgba(255,255,255,.4)"}}>{s.duration}</span>
              </div>
              <div style={{background:"linear-gradient(135deg,#7c3aed,#a78bfa)",color:"#fff",padding:".55rem",borderRadius:10,textAlign:"center",fontWeight:700,fontSize:".82rem",cursor:"pointer",marginTop:".75rem"}}>Book Now</div>
            </div>
          ))}
        </div>
      </div>

      <div style={{background:"rgba(139,92,246,.1)",borderTop:"1px solid rgba(139,92,246,.2)",padding:"2rem",display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:"1rem",marginTop:"2rem"}}>
        <div style={{color:"rgba(255,255,255,.3)",fontSize:".8rem"}}>© 2025 Jyotish Wisdom · All Rights Reserved</div>
        <div style={{color:"#a78bfa",fontSize:".75rem",fontWeight:700}}>Website by Orbnix</div>
      </div>
    </div>
  );
}


// ─── DEMO REGISTRY ────────────────────────────────────────────────────────────
const demos = {
  restaurant: { title: "🍽️ Savoria Restaurant — Full Website",          comp: DemoRestaurant },
  ecommerce:  { title: "🛍️ Miraa Fashion — E-Commerce Store",           comp: DemoEcommerce  },
  ai:         { title: "🤖 SupportBot AI — Live Chat Demo",              comp: DemoAI         },
  dashboard:  { title: "📊 Analytics Dashboard — Business Metrics",      comp: DemoDashboard  },
  app:        { title: "📱 FitFlow — Mobile App Preview",                comp: DemoApp        },
  booking:    { title: "✂️ LuxeCuts Salon — Booking Flow",               comp: DemoBooking    },
  realestate: { title: "🏠 PropSearch — Real Estate Portal",             comp: DemoRealEstate },
  lms:        { title: "📚 LearnHub — Online Learning Platform",         comp: DemoLMS        },
  clinic:     { title: "🏥 LifeCare Clinic — Hospital Website",          comp: DemoClinic     },
  school:     { title: "🎓 Bright Future Academy — School Website",      comp: DemoSchool     },
  hotel:      { title: "🏰 Royal Haveli Resort — Hotel Website",         comp: DemoHotel      },
  ca:         { title: "⚖️ Sharma & Associates — CA Firm Website",       comp: DemoCA         },
  architect:  { title: "✏️ Studio Srivastava — Architect Portfolio",     comp: DemoArchitect  },
  factory:    { title: "⚙️ Precision Engineering — B2B Website",         comp: DemoFactory    },
  astrologer: { title: "🌙 Jyotish Wisdom — Astrologer Website",        comp: DemoAstrologer },
};

function DemoModal({ demo, onClose }) {
  if (!demo) return null;
  const Comp = demos[demo]?.comp;
  return (
    <div onClick={onClose} style={{position:"fixed",inset:0,background:"rgba(15,23,42,.85)",backdropFilter:"blur(12px)",zIndex:9000,display:"flex",alignItems:"center",justifyContent:"center",padding:"1rem",animation:"fadeIn .2s"}}>
      <div onClick={e=>e.stopPropagation()} style={{background:"#fff",borderRadius:20,overflow:"hidden",width:"100%",maxWidth:980,maxHeight:"92vh",display:"flex",flexDirection:"column",animation:"slideIn .25s",boxShadow:"0 32px 80px rgba(0,0,0,.35)"}}>
        <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:".85rem 1.25rem",background:"#F8FAFC",borderBottom:"1px solid #E2E8F0",flexShrink:0}}>
          <span style={{fontFamily:"'Bricolage Grotesque',sans-serif",fontWeight:800,fontSize:".9rem"}}>{demos[demo]?.title}</span>
          <button onClick={onClose} style={{width:32,height:32,borderRadius:8,border:"1.5px solid #E2E8F0",background:"#fff",cursor:"pointer",fontSize:"1rem",display:"flex",alignItems:"center",justifyContent:"center"}}>✕</button>
        </div>
        <div style={{overflowY:"auto",flex:1}}>{Comp && <Comp/>}</div>
      </div>
    </div>
  );
}

// ─── HOME PAGE ─────────────────────────────────────────────────────────────────
function Home({ setPage, openDemo, persona = "default", heroCopy, trackAction }) {
  const copy = heroCopy || HERO_COPY.default;
  const personaInfo = PERSONAS[persona] || PERSONAS.default;

  // Sort services — put persona-matched ones first
  const primKey = personaInfo.primary;
  const sortedServices = [...HOME_SERVICES].sort((a,b) => {
    const aMatch = a.key === primKey || a.key === persona ? -1 : 0;
    const bMatch = b.key === primKey || b.key === persona ? -1 : 0;
    return aMatch - bMatch;
  });

  return (
    <div style={{width:"100%",paddingTop:68}}>
      {/* HERO */}
      <section className="hero-grid section-pad" style={{padding:"60px 4% 55px",background:"linear-gradient(155deg,#F0F7FF 0%,#FAFBFF 45%,#FAF5FF 75%,#FFF1F5 100%)",position:"relative",width:"100%",boxSizing:"border-box"}}>
        <div style={{position:"absolute",width:500,height:500,borderRadius:"50%",background:"radial-gradient(circle,rgba(37,99,235,.09),transparent 70%)",top:-150,right:-50,pointerEvents:"none"}}/>
        <div className="hero-text" style={{zIndex:2}}>
          <div style={{display:"inline-flex",alignItems:"center",gap:".5rem",background:"#fff",border:"1.5px solid #DDE7FF",borderRadius:99,padding:".35rem 1rem .35rem .6rem",fontSize:".78rem",fontWeight:600,color:personaInfo.color,marginBottom:"1.75rem",boxShadow:`0 2px 12px ${personaInfo.color}18`}}>
            <span style={{width:8,height:8,borderRadius:"50%",background:"#10B981",animation:"pulse 1.8s ease infinite",display:"inline-block"}}/>
            {copy.badge || "Now Accepting New Projects · 100% Remote · Pan-India"}
          </div>
          <h1 style={{fontFamily:"'Bricolage Grotesque',sans-serif",fontSize:"clamp(2.2rem,4vw,3.4rem)",fontWeight:800,lineHeight:1.05,letterSpacing:"-.035em",color:"#0F172A",marginBottom:"1.5rem"}}>
            {copy.headline[0]}<br/>
            {persona === "default" ? <Typed/> : <span style={{background:`linear-gradient(135deg,${personaInfo.color},#EC4899)`,WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",backgroundClip:"text"}}>{copy.headline[1]}</span>}<br/>
            <span style={{background:"linear-gradient(135deg,#2563EB,#7C3AED,#EC4899)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",backgroundClip:"text"}}>{copy.headline[2]}</span>
          </h1>
          <p style={{fontSize:"1.05rem",color:C.t3,lineHeight:1.9,maxWidth:480,marginBottom:"2.5rem"}}>
            {copy.sub}
          </p>
          <div className="hero-ctas" style={{marginBottom:"2.5rem"}}>
            <button onClick={()=>setPage("contact")} style={{display:"inline-flex",alignItems:"center",gap:".5rem",background:`linear-gradient(135deg,${personaInfo.color},#7C3AED)`,color:"#fff",padding:".9rem 2rem",borderRadius:12,fontSize:".95rem",fontWeight:700,border:"none",cursor:"pointer",boxShadow:`0 6px 24px ${personaInfo.color}40`,fontFamily:"'Manrope',sans-serif"}}>{copy.cta}</button>
            <button onClick={()=>setPage("work")} style={{display:"inline-flex",alignItems:"center",gap:".5rem",background:"#fff",color:C.t,padding:".9rem 1.85rem",borderRadius:12,fontSize:".95rem",fontWeight:700,border:`1.5px solid ${C.border2}`,cursor:"pointer",fontFamily:"'Manrope',sans-serif",boxShadow:"0 1px 3px rgba(0,0,0,.08)"}}>See Our Work ↗</button>
          </div>
          <div className="hero-stats-row" style={{borderTop:`1px solid ${C.border}`,paddingTop:"1.5rem"}}>
            {[["50+","Projects Done"],["10+"],["100%","Code Ownership"]].map(([n,l])=>(
              <div key={l}><div style={{fontFamily:"'Bricolage Grotesque',sans-serif",fontSize:"1.8rem",fontWeight:800,color:C.t}}>{n.replace(/[+%]/g,"")}<span style={{color:C.blue}}>{n.includes("+")?"+":"%"}</span></div><div style={{fontSize:".75rem",color:C.t4,fontWeight:500,marginTop:".1rem"}}>{l}</div></div>
            ))}
          </div>
        </div>
        <div className="hero-visual" style={{zIndex:2,animation:"float 5s ease-in-out infinite"}}>
          <svg viewBox="0 0 480 380" fill="none" style={{width:"100%",maxWidth:480}}>
            <rect x="20" y="20" width="380" height="280" rx="18" fill="#fff" stroke="#E2E8F0" strokeWidth="1.5"/>
            <rect x="20" y="20" width="380" height="40" rx="18" fill="url(#hg1)"/>
            <rect x="20" y="44" width="380" height="16" fill="url(#hg1)"/>
            <circle cx="44" cy="40" r="5" fill="rgba(255,255,255,.4)"/>
            <circle cx="58" cy="40" r="5" fill="rgba(255,255,255,.25)"/>
            <circle cx="72" cy="40" r="5" fill="rgba(255,255,255,.15)"/>
            <rect x="96" y="32" width="200" height="16" rx="8" fill="rgba(255,255,255,.18)"/>
            <text x="196" y="44" fontFamily="JetBrains Mono,monospace" fontSize="8" fill="rgba(255,255,255,.8)" textAnchor="middle">orbnix.in/your-project</text>
            <rect x="40" y="76" width="160" height="12" rx="4" fill="#0F172A"/>
            <rect x="40" y="94" width="120" height="12" rx="4" fill="url(#hg1)"/>
            <rect x="40" y="114" width="180" height="6" rx="3" fill="#CBD5E1"/>
            <rect x="40" y="124" width="140" height="6" rx="3" fill="#CBD5E1"/>
            <rect x="40" y="142" width="90" height="24" rx="9" fill="url(#hg1)"/>
            <rect x="138" y="142" width="80" height="24" rx="9" fill="#fff" stroke="#E2E8F0" strokeWidth="1.5"/>
            <text x="85" y="158" fontFamily="Manrope,sans-serif" fontSize="8" fontWeight="700" fill="#fff" textAnchor="middle">Start Project</text>
            <text x="178" y="158" fontFamily="Manrope,sans-serif" fontSize="8" fontWeight="600" fill="#64748B" textAnchor="middle">View Work</text>
            <rect x="40" y="176" width="340" height="1" fill="#F1F5F9"/>
            <text x="80" y="196" fontFamily="Bricolage Grotesque,sans-serif" fontSize="16" fontWeight="800" fill="#0F172A" textAnchor="middle">50+</text>
            <text x="80" y="208" fontFamily="Manrope,sans-serif" fontSize="7" fill="#94A3B8" textAnchor="middle">Projects</text>
            <text x="190" y="196" fontFamily="Bricolage Grotesque,sans-serif" fontSize="16" fontWeight="800" fill="#0F172A" textAnchor="middle">10+</text>
            <text x="190" y="208" fontFamily="Manrope,sans-serif" fontSize="7" fill="#94A3B8" textAnchor="middle">Countries</text>
            <text x="300" y="196" fontFamily="Bricolage Grotesque,sans-serif" fontSize="16" fontWeight="800" fill="#0F172A" textAnchor="middle">100%</text>
            <text x="300" y="208" fontFamily="Manrope,sans-serif" fontSize="7" fill="#94A3B8" textAnchor="middle">Ownership</text>
            <rect x="265" y="72" width="115" height="200" rx="16" fill="#0F172A" stroke="#334155" strokeWidth="1.5"/>
            <rect x="274" y="82" width="97" height="180" rx="11" fill="url(#hg2)"/>
            <rect x="300" y="73" width="46" height="9" rx="4.5" fill="#0F172A"/>
            <rect x="282" y="98" width="80" height="9" rx="3" fill="rgba(255,255,255,.85)"/>
            <rect x="282" y="112" width="58" height="6" rx="3" fill="rgba(255,255,255,.45)"/>
            <rect x="282" y="124" width="80" height="42" rx="7" fill="rgba(255,255,255,.08)"/>
            <text x="322" y="148" fontFamily="Bricolage Grotesque,sans-serif" fontSize="14" fontWeight="800" fill="#fff" textAnchor="middle">₹4.8L</text>
            <text x="322" y="158" fontFamily="Manrope,sans-serif" fontSize="6" fill="rgba(255,255,255,.6)" textAnchor="middle">Revenue Today</text>
            <rect x="282" y="172" width="36" height="36" rx="6" fill="rgba(255,255,255,.08)"/>
            <rect x="322" y="172" width="36" height="36" rx="6" fill="rgba(255,255,255,.08)"/>
            <text x="300" y="192" fontFamily="Manrope,sans-serif" fontSize="6" fill="rgba(255,255,255,.5)" textAnchor="middle">Orders</text>
            <text x="300" y="202" fontFamily="Bricolage Grotesque,sans-serif" fontSize="10" fontWeight="800" fill="#fff" textAnchor="middle">284</text>
            <text x="340" y="192" fontFamily="Manrope,sans-serif" fontSize="6" fill="rgba(255,255,255,.5)" textAnchor="middle">Users</text>
            <text x="340" y="202" fontFamily="Bricolage Grotesque,sans-serif" fontSize="10" fontWeight="800" fill="#fff" textAnchor="middle">3.8K</text>
            <rect x="290" y="218" width="64" height="16" rx="6" fill="url(#hg1)"/>
            <rect x="0" y="96" width="132" height="42" rx="11" fill="#fff" stroke="#E2E8F0" strokeWidth="1"/>
            <circle cx="20" cy="117" r="14" fill="#ECFDF5"/>
            <text x="20" y="123" fontSize="12" textAnchor="middle">✅</text>
            <text x="42" y="111" fontFamily="Manrope,sans-serif" fontSize="8" fontWeight="700" fill="#0F172A">Live in 3 weeks</text>
            <text x="42" y="124" fontFamily="Manrope,sans-serif" fontSize="7" fill="#94A3B8">MediBook App</text>
            <rect x="0" y="330" width="132" height="42" rx="11" fill="#fff" stroke="#E2E8F0" strokeWidth="1"/>
            <circle cx="20" cy="351" r="14" fill="#F5F3FF"/>
            <text x="20" y="357" fontSize="12" textAnchor="middle">🤖</text>
            <text x="42" y="345" fontFamily="Manrope,sans-serif" fontSize="8" fontWeight="700" fill="#0F172A">AI Bot Live</text>
            <text x="42" y="358" fontFamily="Manrope,sans-serif" fontSize="7" fill="#94A3B8">300+ leads/day</text>
            <rect x="348" y="330" width="132" height="42" rx="11" fill="#fff" stroke="#E2E8F0" strokeWidth="1"/>
            <circle cx="368" cy="351" r="14" fill="#EFF6FF"/>
            <text x="368" y="357" fontSize="12" textAnchor="middle">🚀</text>
            <text x="390" y="345" fontFamily="Manrope,sans-serif" fontSize="8" fontWeight="700" fill="#0F172A">340% Traffic</text>
            <text x="390" y="358" fontFamily="Manrope,sans-serif" fontSize="7" fill="#94A3B8">PaySwift</text>
            <defs>
              <linearGradient id="hg1" x1="0" y1="0" x2="1" y2="1" gradientUnits="objectBoundingBox"><stop stopColor="#2563EB"/><stop offset=".5" stopColor="#7C3AED"/><stop offset="1" stopColor="#EC4899"/></linearGradient>
              <linearGradient id="hg2" x1="274" y1="82" x2="371" y2="262" gradientUnits="userSpaceOnUse"><stop stopColor="#1E293B"/><stop offset="1" stopColor="#0F172A"/></linearGradient>
            </defs>
          </svg>
        </div>
      </section>

      {/* TICKER */}
      <div style={{background:"linear-gradient(90deg,#2563EB,#7C3AED,#EC4899,#F97316,#2563EB)",padding:"2px"}}>
        <div style={{background:"#fff",overflow:"hidden"}}>
          <div style={{display:"flex",whiteSpace:"nowrap",animation:"ticker 38s linear infinite",padding:".65rem 0"}}>
            {[...HOME_TICKER,...HOME_TICKER].map((t,i)=>(
              <span key={i} style={{display:"inline-flex",alignItems:"center",gap:".65rem",padding:"0 1.75rem",fontSize:".78rem",fontWeight:600,color:C.t3}}>
                <span style={{width:5,height:5,borderRadius:"50%",background:"linear-gradient(135deg,#2563EB,#7C3AED)",display:"inline-block"}}/>
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* CLIENT LOGO STRIP */}
      <section style={{padding:"28px 4%",background:"#FAFBFC",borderBottom:`1px solid ${C.border}`,width:"100%",boxSizing:"border-box"}}>
        <div style={{maxWidth:1100,margin:"0 auto"}}>
          <div style={{display:"flex",alignItems:"center",gap:"2rem",flexWrap:"wrap",justifyContent:"center"}}>
            <div style={{fontFamily:"'JetBrains Mono',monospace",fontSize:".62rem",fontWeight:500,letterSpacing:".12em",textTransform:"uppercase",color:C.t4,whiteSpace:"nowrap",flexShrink:0}}>Trusted by</div>
            {["PaySwift","MediBook","Rajputana Crafts","Horizon Realty","FieldPulse","EduNest","LuxeCuts","PropSearch","LearnHub","ShopNova"].map((brand,i)=>(
              <div key={brand} style={{fontFamily:"'Bricolage Grotesque',sans-serif",fontWeight:800,fontSize:".82rem",color:C.t3,opacity:.55,letterSpacing:"-.02em",transition:"opacity .2s",whiteSpace:"nowrap",cursor:"default"}} onMouseEnter={e=>e.currentTarget.style.opacity="1"} onMouseLeave={e=>e.currentTarget.style.opacity=".55"}>{brand}</div>
            ))}
            <div style={{fontFamily:"'JetBrains Mono',monospace",fontSize:".62rem",fontWeight:500,letterSpacing:".12em",textTransform:"uppercase",color:C.t4,whiteSpace:"nowrap",flexShrink:0}}>& 40+ more</div>
          </div>
        </div>
      </section>

      {/* LIVE RESULTS NUMBERS */}
      <section style={{padding:"48px 4%",background:"linear-gradient(135deg,#0F172A,#1E293B)",width:"100%",boxSizing:"border-box"}}>
        <div style={{maxWidth:1100,margin:"0 auto"}}>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(160px,1fr))",gap:"1.5rem",textAlign:"center"}}>
            {[
              {n:"₹2Cr+",l:"Revenue generated for clients",icon:"💰"},
              {n:"50+",l:"Projects delivered on time",icon:"🚀"},
              {n:"4.9★",l:"Average client rating",icon:"⭐"},
              {n:"15 days",l:"Average website launch",icon:"⚡"},
              {n:"90+",l:"Average PageSpeed score",icon:"📊"},
              {n:"0",l:"Missed deadlines, ever",icon:"🎯"},
            ].map(s=>(
              <div key={s.l} style={{padding:"1rem"}}>
                <div style={{fontSize:"1.3rem",marginBottom:".5rem"}}>{s.icon}</div>
                <div style={{fontFamily:"'Bricolage Grotesque',sans-serif",fontSize:"1.75rem",fontWeight:800,color:"#fff",lineHeight:1}}>{s.n}</div>
                <div style={{fontSize:".72rem",color:"rgba(255,255,255,.4)",marginTop:".4rem",lineHeight:1.5}}>{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="section-pad" style={{padding:"70px 4%",background:"#fff",width:"100%",boxSizing:"border-box"}}>
        <div style={{maxWidth:1200,width:"100%",margin:"0 auto"}}>
          <span style={{display:"inline-flex",alignItems:"center",gap:".5rem",background:C.blueLL,color:C.blue,fontFamily:"'JetBrains Mono',monospace",fontSize:".7rem",fontWeight:500,letterSpacing:".14em",textTransform:"uppercase",padding:".3rem .9rem",borderRadius:99,marginBottom:"1rem"}}>What We Do</span>
          <h2 style={{fontFamily:"'Bricolage Grotesque',sans-serif",fontSize:"clamp(1.6rem,2.5vw,2.3rem)",fontWeight:800,letterSpacing:"-.03em",lineHeight:1.1,color:C.t}}>Everything to Build & <span style={{background:"linear-gradient(135deg,#2563EB,#7C3AED)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",backgroundClip:"text"}}>Grow Digitally</span></h2>
          <p style={{fontSize:"1rem",color:C.t3,lineHeight:1.85,maxWidth:520,marginTop:".75rem",marginBottom:"3rem"}}>End-to-end digital services under one roof — no more managing five vendors.</p>
          <div className="grid-services">
            {sortedServices.map((s,i)=>{
              const isMatch = (s.key === personaInfo.primary || s.key === persona) && persona !== "default" && i === 0;
              return (
              <div key={s.name} style={{minWidth:0,background:"#fff",border:`1.5px solid ${isMatch ? s.color+"55" : C.border}`,borderRadius:20,padding:"1.5rem",transition:"all .3s",cursor:"default",position:"relative"}} onMouseEnter={e=>{e.currentTarget.style.transform="translateY(-6px)";e.currentTarget.style.boxShadow=`0 16px 48px ${s.color}22`;e.currentTarget.style.borderColor="transparent";}} onMouseLeave={e=>{e.currentTarget.style.transform="none";e.currentTarget.style.boxShadow="none";e.currentTarget.style.borderColor=isMatch?s.color+"55":C.border;}}>
                {isMatch && <div style={{position:"absolute",top:"-10px",right:"14px",background:`linear-gradient(135deg,${s.color},#7C3AED)`,color:"#fff",fontSize:".6rem",fontWeight:800,fontFamily:"'JetBrains Mono',monospace",letterSpacing:".1em",padding:".22rem .65rem",borderRadius:99,boxShadow:`0 2px 10px ${s.color}44`}}>✦ FOR YOU</div>}
                <div style={{width:52,height:52,borderRadius:14,background:s.bg,display:"flex",alignItems:"center",justifyContent:"center",fontSize:"1.6rem",marginBottom:"1rem"}}>{s.icon}</div>
                <div style={{fontFamily:"'Bricolage Grotesque',sans-serif",fontSize:".95rem",fontWeight:800,color:C.t,marginBottom:".4rem"}}>{s.name}</div>
                <div style={{fontSize:".84rem",color:C.t3,lineHeight:1.75,marginBottom:".85rem"}}>{s.desc}</div>
                <div style={{display:"flex",flexWrap:"wrap",gap:".3rem"}}>
                  {s.tags.map(t=><span key={t} style={{background:s.bg,color:s.color,fontFamily:"'JetBrains Mono',monospace",fontSize:".62rem",padding:".2rem .55rem",borderRadius:5,fontWeight:500}}>{t}</span>)}
                </div>
              </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* STATS */}
      <section style={{width:"100%",boxSizing:"border-box",padding:"60px 5%",background:"linear-gradient(135deg,#2563EB,#7C3AED)"}}>
        <div className="grid-stats" style={{maxWidth:900,margin:"0 auto",textAlign:"center"}}>
          {[["50+","Projects Delivered"],["15+","Services"],["10+"],["100%","Code Ownership"]].map(([n,l])=>(
            <div key={l} style={{textAlign:"center"}}>
              <div style={{fontFamily:"'Bricolage Grotesque',sans-serif",fontSize:"2.8rem",fontWeight:800,color:"#fff"}}>{n}</div>
              <div style={{fontSize:".82rem",color:"rgba(255,255,255,.65)",fontWeight:500,marginTop:".3rem"}}>{l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* PORTFOLIO */}
      <section className="section-pad" style={{padding:"70px 4%",background:"#fff",width:"100%",boxSizing:"border-box"}}>
        <div style={{maxWidth:1200,width:"100%",margin:"0 auto"}}>
          <div className="work-header-row" style={{marginBottom:"3rem"}}>
            <div>
              <span style={{display:"inline-flex",alignItems:"center",gap:".5rem",background:C.orangeLL,color:C.orange,fontFamily:"'JetBrains Mono',monospace",fontSize:".7rem",fontWeight:500,letterSpacing:".14em",textTransform:"uppercase",padding:".3rem .9rem",borderRadius:99,marginBottom:"1rem"}}>Live Demos</span>
              <h2 style={{fontFamily:"'Bricolage Grotesque',sans-serif",fontSize:"clamp(1.6rem,2.5vw,2.3rem)",fontWeight:800,letterSpacing:"-.03em",color:C.t}}>Click to <span style={{background:"linear-gradient(135deg,#F97316,#EC4899)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",backgroundClip:"text"}}>Explore Live</span></h2>
              <p style={{fontSize:"1rem",color:C.t3,maxWidth:480,marginTop:".5rem",lineHeight:1.75}}>Every demo is a real, working product — click to interact fully.</p>
            </div>
            <button onClick={()=>setPage("work")} style={{background:"#fff",color:C.t,padding:".75rem 1.5rem",borderRadius:12,border:`1.5px solid ${C.border2}`,fontWeight:700,cursor:"pointer",fontSize:".9rem",fontFamily:"'Manrope',sans-serif",flexShrink:0}}>All Case Studies →</button>
          </div>
          <div className="grid-portfolio">
            {HOME_PORTFOLIO.map((p)=>(
              <div key={p.id} style={{borderRadius:18,overflow:"hidden",border:`1.5px solid ${C.border}`,background:"#fff",cursor:"pointer",transition:"all .3s"}} onClick={()=>openDemo(p.id)} onMouseEnter={e=>{e.currentTarget.style.transform="translateY(-6px)";e.currentTarget.style.boxShadow="0 16px 48px rgba(0,0,0,.1)";e.currentTarget.style.borderColor="transparent";}} onMouseLeave={e=>{e.currentTarget.style.transform="none";e.currentTarget.style.boxShadow="none";e.currentTarget.style.borderColor=C.border;}}>
                <div style={{height:160,background:p.bg,display:"flex",alignItems:"center",justifyContent:"center",position:"relative"}}>
                  <div style={{fontSize:"4rem"}}>{p.preview}</div>
                  <div style={{position:"absolute",inset:0,background:"rgba(15,23,42,.82)",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",opacity:0,transition:"opacity .25s"}} onMouseEnter={e=>e.currentTarget.style.opacity=1} onMouseLeave={e=>e.currentTarget.style.opacity=0}>
                    <div style={{background:"linear-gradient(135deg,#2563EB,#7C3AED)",color:"#fff",padding:".6rem 1.4rem",borderRadius:10,fontWeight:700,fontSize:".88rem",marginBottom:".4rem"}}>Open Live Demo →</div>
                    <div style={{color:"rgba(255,255,255,.6)",fontSize:".72rem"}}>Click to interact</div>
                  </div>
                  <div style={{position:"absolute",top:10,right:10,background:p.accent,color:"#fff",fontSize:".6rem",fontWeight:700,padding:".22rem .6rem",borderRadius:5,fontFamily:"'JetBrains Mono',monospace"}}>LIVE</div>
                </div>
                <div style={{padding:"1.25rem"}}>
                  <div style={{fontFamily:"'JetBrains Mono',monospace",fontSize:".62rem",fontWeight:500,letterSpacing:".1em",textTransform:"uppercase",color:p.accent,marginBottom:".25rem"}}>{p.cat}</div>
                  <div style={{fontFamily:"'Bricolage Grotesque',sans-serif",fontSize:".95rem",fontWeight:800,color:C.t,marginBottom:".3rem"}}>{p.name}</div>
                  <div style={{fontSize:".8rem",color:C.t3,lineHeight:1.6}}>{p.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* INDUSTRIES WE SERVE */}
      <section className="section-pad" style={{padding:"70px 4%",background:"#F8FAFC",width:"100%",boxSizing:"border-box"}}>
        <div style={{maxWidth:1200,width:"100%",margin:"0 auto"}}>
          <div style={{textAlign:"center",marginBottom:"3rem"}}>
            <span style={{display:"inline-flex",alignItems:"center",gap:".5rem",background:C.greenLL,color:C.green,fontFamily:"'JetBrains Mono',monospace",fontSize:".7rem",fontWeight:500,letterSpacing:".14em",textTransform:"uppercase",padding:".3rem .9rem",borderRadius:99,marginBottom:"1rem"}}>Industries</span>
            <h2 style={{fontFamily:"'Bricolage Grotesque',sans-serif",fontSize:"clamp(1.6rem,2.5vw,2.3rem)",fontWeight:800,letterSpacing:"-.03em",lineHeight:1.1,color:C.t,marginBottom:".75rem"}}>We Build for <span style={{background:"linear-gradient(135deg,#10B981,#2563EB)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",backgroundClip:"text"}}>Every Industry</span></h2>
            <p style={{fontSize:"1rem",color:C.t3,lineHeight:1.85,maxWidth:520,margin:"0 auto"}}>From hospitals to factories, schools to law firms — if your business needs a website, we've built for your industry.</p>
            <p style={{fontSize:".78rem",color:C.t3,maxWidth:700,margin:".6rem auto 0",lineHeight:1.8}}>Clinics · Hospitals · Doctors · Schools · Coaching · Hotels · Resorts · CA Firms · Chartered Accountants · Architects · Interior Designers · Factories · Exporters · Importers · Restaurants · Cafes · Food Delivery · Table Booking · Real Estate · Builders · Pharmacies · Car Dealers · Automobile Showrooms · Gyms · Logistics · Transport · Wedding Planners · Catering · Solar · Agritech · Kisan · Insurance · BFSI · NGOs · Ayurveda · Naturopathy · Homestays · Music Academies · Dance Classes · Photographers · Construction Contractors · Beauty Brands · Home Services · NBFC · Finance · EdTech · E-Commerce · D2C · SaaS · Mobile Apps · Zomato Integration · Swiggy Partners</p>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(130px,1fr))",gap:".85rem"}}>
            {[
              {emoji:"🏥",label:"Clinics & Hospitals",       id:"clinic"},
              {emoji:"🏫",label:"Schools & Coaching",        id:"school"},
              {emoji:"🏰",label:"Hotels & Resorts",          id:"hotel"},
              {emoji:"⚖️",label:"CA & Accounting Firms",     id:"ca"},
              {emoji:"✏️",label:"Architects & Designers",    id:"architect"},
              {emoji:"🏭",label:"Factories & Manufacturers", id:"factory"},
              {emoji:"🔮",label:"Astrologers & Vastu",       id:"astrologer"},
              {emoji:"🍽️",label:"Restaurants & Cafes",      id:"restaurant"},
              {emoji:"🛍️",label:"E-Commerce & D2C",         id:"ecommerce"},
              {emoji:"🏠",label:"Real Estate & Builders",    id:"realestate"},
              {emoji:"📚",label:"EdTech & Institutes",       id:"lms"},
              {emoji:"✂️",label:"Salons & Spas",             id:"booking"},
              {emoji:"💊",label:"Pharmacy & Chemists",       id:null},
              {emoji:"🚗",label:"Car Dealers & Showrooms",   id:null},
              {emoji:"⚡",label:"Solar & Renewable Energy",  id:null},
              {emoji:"🎓",label:"Colleges & Universities",   id:null},
              {emoji:"💰",label:"Finance, Loans & NBFC",     id:null},
              {emoji:"🌾",label:"Agriculture & Agritech",    id:null},
              {emoji:"🏋️",label:"Gyms & Fitness Centres",   id:null},
              {emoji:"🎭",label:"Events & Wedding Planners", id:null},
              {emoji:"🚚",label:"Logistics & Transport",     id:null},
              {emoji:"🏗️",label:"Construction & Contractors",id:null},
              {emoji:"🧴",label:"Beauty & Wellness Brands",  id:null},
              {emoji:"🔧",label:"Home Services & Repairs",   id:null},
              {emoji:"🚢",label:"Exporters & Importers",     id:null},
              {emoji:"🛡️",label:"Insurance & BFSI",         id:null},
              {emoji:"🎵",label:"Music & Dance Academies",   id:null},
              {emoji:"🏨",label:"Homestays & PG",            id:null},
              {emoji:"⚕️",label:"Ayurveda & Naturopathy",   id:null},
              {emoji:"📸",label:"Photographers & Studios",   id:null},
              {emoji:"🌐",label:"NGOs & Charitable Trusts",  id:null},
            ].map((ind)=>(
              <div key={ind.label}
                onClick={ind.id ? ()=>openDemo(ind.id) : undefined}
                style={{background:"#fff",borderRadius:14,padding:"1rem .75rem",textAlign:"center",border:`1.5px solid ${C.border}`,cursor:ind.id?"pointer":"default",transition:"all .25s",position:"relative"}}
                onMouseEnter={e=>{e.currentTarget.style.borderColor=C.blue;e.currentTarget.style.transform="translateY(-4px)";e.currentTarget.style.boxShadow=`0 12px 32px rgba(37,99,235,.12)`;}}
                onMouseLeave={e=>{e.currentTarget.style.borderColor=C.border;e.currentTarget.style.transform="none";e.currentTarget.style.boxShadow="none";}}>
                {ind.id && <div style={{position:"absolute",top:-7,right:8,background:`linear-gradient(135deg,${C.blue},${C.violet})`,color:"#fff",fontSize:".52rem",fontWeight:800,fontFamily:"'JetBrains Mono',monospace",letterSpacing:".08em",padding:".15rem .45rem",borderRadius:99}}>LIVE DEMO</div>}
                <div style={{fontSize:"1.75rem",marginBottom:".5rem"}}>{ind.emoji}</div>
                <div style={{fontSize:".72rem",fontWeight:700,color:C.t,lineHeight:1.3}}>{ind.label}</div>
              </div>
            ))}
          </div>
          <div style={{textAlign:"center",marginTop:"2.5rem"}}>
            <p style={{fontSize:".88rem",color:C.t3,marginBottom:"1rem"}}>Don't see your industry? We've worked with 50+ verticals.</p>
            <button onClick={()=>setPage("contact")} style={{background:"linear-gradient(135deg,#10B981,#2563EB)",color:"#fff",border:"none",borderRadius:12,padding:".8rem 2rem",fontFamily:"'Manrope',sans-serif",fontWeight:700,cursor:"pointer",fontSize:".9rem"}}>Tell Us About Your Business →</button>
          </div>
        </div>
      </section>
      
{/* WHY ORBNIX — PAN INDIA SECTION */}
      <section className="section-pad" style={{padding:"70px 4%",background:"#fff",width:"100%",boxSizing:"border-box"}}>
        <div style={{maxWidth:1200,width:"100%",margin:"0 auto"}}>
          <div style={{textAlign:"center",marginBottom:"3rem"}}>
            <span style={{display:"inline-flex",alignItems:"center",gap:".5rem",background:C.blueLL,color:C.blue,fontFamily:"'JetBrains Mono',monospace",fontSize:".7rem",fontWeight:500,letterSpacing:".14em",textTransform:"uppercase",padding:".3rem .9rem",borderRadius:99,marginBottom:"1rem"}}>Why Orbnix</span>
            <h2 style={{fontFamily:"'Bricolage Grotesque',sans-serif",fontSize:"clamp(1.6rem,2.5vw,2.3rem)",fontWeight:800,letterSpacing:"-.03em",color:C.t}}>Built for <span style={{background:"linear-gradient(135deg,#2563EB,#7C3AED)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",backgroundClip:"text"}}>Indian Founders</span></h2>
            <p style={{fontSize:".95rem",color:C.t3,maxWidth:520,margin:".75rem auto 0",lineHeight:1.85}}>We're a remote-first agency serving startups and businesses from Mumbai to Chennai, Delhi to Bengaluru — and internationally.</p>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(260px,1fr))",gap:"1.25rem",marginBottom:"3rem"}}>
            {[
              {icon:"🇮🇳",title:"Pan-India, Remote-First",desc:"We work with clients from Mumbai, Delhi, Bengaluru, Pune, Hyderabad, Chennai, Ahmedabad and everywhere in between — entirely remote with full transparency.",color:C.blue,bg:C.blueLL},
              {icon:"💸",title:"Startup-Friendly Pricing",desc:"Enterprise-quality software at Indian startup budgets. Websites from ₹25,000. Mobile apps from ₹80,000. Fixed quotes — no surprise invoices, ever.",color:C.green,bg:C.greenLL},
              {icon:"🔒",title:"You Own Everything",desc:"100% of the code, designs, and intellectual property is yours from day one. We write it in every contract. No lock-in, no ongoing platform fees.",color:C.violet,bg:C.violetLL},
              {icon:"⚡",title:"React & Next.js Experts",desc:"We build with the same tech stack as unicorns — React, Next.js, Flutter, Node.js. Fast, scalable, SEO-ready from the ground up.",color:C.orange,bg:C.orangeLL},
              {icon:"📈",title:"Built to Rank on Google",desc:"Every website we build is SEO-optimised at the code level — schema markup, Core Web Vitals, mobile-first. Your site should work even when you're not running ads.",color:C.pink,bg:C.pinkLL},
              {icon:"🤝",title:"Pay Only on Delivery",desc:"50% of payment is due only when we deliver. You're never paying for nothing. We're confident because we deliver. Every. Single. Time.",color:C.blue,bg:C.blueLL},
            ].map(w=>(
              <div key={w.title} style={{background:w.bg,borderRadius:18,padding:"1.5rem",border:`1.5px solid ${w.color}22`,transition:"all .25s"}} onMouseEnter={e=>{e.currentTarget.style.transform="translateY(-4px)";e.currentTarget.style.boxShadow=`0 12px 32px ${w.color}22`;}} onMouseLeave={e=>{e.currentTarget.style.transform="none";e.currentTarget.style.boxShadow="none";}}>
                <div style={{fontSize:"1.75rem",marginBottom:".85rem"}}>{w.icon}</div>
                <div style={{fontFamily:"'Bricolage Grotesque',sans-serif",fontWeight:800,fontSize:".95rem",color:C.t,marginBottom:".45rem"}}>{w.title}</div>
                <div style={{fontSize:".83rem",color:C.t3,lineHeight:1.75}}>{w.desc}</div>
              </div>
            ))}
          </div>
          {/* CITIES WE SERVE */}
          <div style={{background:"linear-gradient(135deg,#0F172A,#1E293B)",borderRadius:20,padding:"2.5rem",textAlign:"center"}}>
            <div style={{fontFamily:"'JetBrains Mono',monospace",fontSize:".68rem",color:"rgba(255,255,255,.4)",letterSpacing:".15em",textTransform:"uppercase",marginBottom:".85rem"}}>Serving Clients Across India & Globally</div>
            <div style={{display:"flex",flexWrap:"wrap",justifyContent:"center",gap:".75rem",marginBottom:"1.5rem"}}>
              {["Mumbai","Delhi","Bengaluru","Pune","Hyderabad","Chennai","Ahmedabad","Kolkata","Surat","Lucknow","USA","UK","UAE","Australia"].map(city=>(
                <span key={city} style={{background:"rgba(255,255,255,.08)",border:"1px solid rgba(255,255,255,.12)",borderRadius:99,padding:".3rem .9rem",fontSize:".78rem",fontWeight:600,color:"rgba(255,255,255,.75)",fontFamily:"'Manrope',sans-serif"}}>{city}</span>
              ))}
            </div>
            <p style={{color:"rgba(255,255,255,.5)",fontSize:".82rem",maxWidth:480,margin:"0 auto"}}>100% remote workflow — video calls, shared project boards, WhatsApp updates. Same quality whether you're in Mumbai or Manchester.</p>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="section-pad" style={{padding:"70px 4%",background:"linear-gradient(155deg,#F0F7FF,#FDF4FF)",width:"100%",boxSizing:"border-box"}}>
        <div style={{maxWidth:1200,width:"100%",margin:"0 auto"}}>
          <div style={{textAlign:"center",marginBottom:"3rem"}}>
            <span style={{display:"inline-flex",alignItems:"center",gap:".5rem",background:C.greenLL,color:C.green,fontFamily:"'JetBrains Mono',monospace",fontSize:".7rem",fontWeight:500,letterSpacing:".14em",textTransform:"uppercase",padding:".3rem .9rem",borderRadius:99,marginBottom:"1rem"}}>Client Love</span>
            <h2 style={{fontFamily:"'Bricolage Grotesque',sans-serif",fontSize:"clamp(1.6rem,2.5vw,2.3rem)",fontWeight:800,letterSpacing:"-.03em",color:C.t}}>Trusted by <span style={{background:"linear-gradient(135deg,#10B981,#2563EB)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",backgroundClip:"text"}}>Founders & Teams</span></h2>
          </div>
          <div className="grid-testimonials">
            {HOME_TESTIMONIALS.map((t)=>(
              <div key={t.name} style={{background:"#fff",borderRadius:20,padding:"1.75rem",border:`1.5px solid ${C.border}`,boxShadow:"0 1px 3px rgba(0,0,0,.06)",transition:"all .3s"}} onMouseEnter={e=>{e.currentTarget.style.transform="translateY(-4px)";e.currentTarget.style.boxShadow="0 12px 40px rgba(0,0,0,.1)";}} onMouseLeave={e=>{e.currentTarget.style.transform="none";e.currentTarget.style.boxShadow="0 1px 3px rgba(0,0,0,.06)";}}>
                <div style={{fontSize:".95rem",color:"#F59E0B",letterSpacing:2,marginBottom:".85rem"}}>★★★★★</div>
                <p style={{fontSize:".88rem",color:C.t2,lineHeight:1.85,fontStyle:"italic",marginBottom:"1.25rem"}}>"{t.text}"</p>
                <div style={{display:"flex",alignItems:"center",gap:".75rem"}}>
                  <div style={{width:42,height:42,borderRadius:"50%",background:t.avBg,display:"flex",alignItems:"center",justifyContent:"center",fontWeight:800,fontSize:".85rem",color:"#fff",flexShrink:0}}>{t.av}</div>
                  <div>
                    <div style={{fontWeight:700,fontSize:".88rem",color:C.t}}>{t.name}</div>
                    <div style={{fontSize:".72rem",color:C.t4,marginTop:".1rem"}}>{t.role}</div>
                    <span style={{display:"inline-block",background:t.badgeBg,color:t.badgeColor,fontFamily:"'JetBrains Mono',monospace",fontSize:".58rem",fontWeight:500,padding:".15rem .55rem",borderRadius:4,marginTop:".3rem"}}>{t.badge}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="trust-row" style={{marginTop:"3rem",padding:"2.25rem",background:"#fff",borderRadius:20,border:`1.5px solid ${C.border}`,boxShadow:"0 1px 3px rgba(0,0,0,.06)"}}>
            {[["50+","Happy Clients"],["4.9★","Avg Rating"],["100%","Recommend Us"],["0","Missed Deadlines"]].map(([n,l])=>(
              <div key={l} style={{textAlign:"center"}}>
                <div style={{fontFamily:"'Bricolage Grotesque',sans-serif",fontSize:"2.1rem",fontWeight:800,color:C.t}}>{n}</div>
                <div style={{fontSize:".78rem",color:C.t4,fontWeight:500,marginTop:".2rem"}}>{l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section className="section-pad" style={{padding:"70px 4%",background:C.bg2,width:"100%",boxSizing:"border-box"}}>
        <div style={{maxWidth:1200,width:"100%",margin:"0 auto"}}>
          <div style={{textAlign:"center",marginBottom:"3rem"}}>
            <span style={{display:"inline-flex",alignItems:"center",gap:".5rem",background:C.blueLL,color:C.blue,fontFamily:"'JetBrains Mono',monospace",fontSize:".7rem",fontWeight:500,letterSpacing:".14em",textTransform:"uppercase",padding:".3rem .9rem",borderRadius:99,marginBottom:"1rem"}}>Pricing</span>
            <h2 style={{fontFamily:"'Bricolage Grotesque',sans-serif",fontSize:"clamp(1.6rem,2.5vw,2.3rem)",fontWeight:800,letterSpacing:"-.03em",color:C.t}}>Transparent <span style={{background:"linear-gradient(135deg,#2563EB,#7C3AED)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",backgroundClip:"text"}}>Pricing</span></h2>
            <p style={{color:C.t3,marginTop:".75rem",fontSize:".95rem"}}>No hidden fees. Fixed quotes. 50% upfront, 50% on delivery.</p>
          </div>
          <div className="grid-pricing" style={{maxWidth:900,margin:"0 auto"}}>
            {[
              {name:"Starter",price:"₹25,000",note:"For individuals & small businesses",color:C.blue,feats:["5-page responsive website","Mobile optimised design","Contact form + WhatsApp","Basic SEO setup","15 days delivery"],pop:false},
              {name:"Growth",price:"₹55,000",note:"For businesses ready to scale",color:C.violet,feats:["Up to 15 pages + CMS/Blog","Advanced SEO + Analytics","Payment gateway (Razorpay)","30-day post-launch support","Speed & performance optimised"],pop:true},
              {name:"Enterprise",price:"Custom",note:"Apps, AI & complex software",color:C.green,feats:["Web & mobile apps","AI agents & automation","100% source code ownership","NDA & contracts available","Dedicated project manager"],pop:false},
            ].map((p)=>(
              <div key={p.name} style={{background:"#fff",border:p.pop?`2px solid ${C.blue}`:`1.5px solid ${C.border}`,borderRadius:20,padding:"2rem",position:"relative",boxShadow:p.pop?`0 0 0 5px rgba(37,99,235,.08),0 8px 32px rgba(0,0,0,.1)`:"none"}}>
                {p.pop&&<div style={{position:"absolute",top:-12,left:"50%",transform:"translateX(-50%)",background:"linear-gradient(90deg,#2563EB,#7C3AED)",color:"#fff",fontFamily:"'JetBrains Mono',monospace",fontSize:".62rem",fontWeight:700,padding:".25rem .9rem",borderRadius:99,whiteSpace:"nowrap"}}>⭐ MOST POPULAR</div>}
                <div style={{fontFamily:"'JetBrains Mono',monospace",fontSize:".7rem",color:C.t4,letterSpacing:".12em",textTransform:"uppercase",marginBottom:".65rem"}}>{p.name}</div>
                <div style={{fontFamily:"'Bricolage Grotesque',sans-serif",fontSize:p.price==="Custom"?"2rem":"2.6rem",fontWeight:800,color:C.t,lineHeight:1}}>{p.price}</div>
                <div style={{fontSize:".8rem",color:C.t4,margin:".35rem 0 1.25rem"}}>{p.note}</div>
                <div style={{height:1,background:C.border,margin:"1.1rem 0"}}/>
                {p.feats.map(f=>(
                  <div key={f} style={{display:"flex",alignItems:"flex-start",gap:".55rem",fontSize:".84rem",color:C.t3,marginBottom:".55rem",lineHeight:1.55}}>
                    <div style={{width:17,height:17,borderRadius:5,background:p.color+"22",flexShrink:0,display:"flex",alignItems:"center",justifyContent:"center",marginTop:".05rem"}}>
                      <svg width="9" height="9" viewBox="0 0 10 10"><path d="M2 5l2 2 4-4" stroke={p.color} strokeWidth="1.5" strokeLinecap="round" fill="none"/></svg>
                    </div>
                    {f}
                  </div>
                ))}
                <button onClick={()=>setPage("contact")} style={{display:"block",width:"100%",padding:".85rem",borderRadius:11,fontFamily:"'Manrope',sans-serif",fontSize:".9rem",fontWeight:700,cursor:"pointer",border:p.pop?"none":`1.5px solid ${C.border2}`,marginTop:"1.75rem",background:p.pop?`linear-gradient(135deg,${C.blue},${C.violet})`:"#fff",color:p.pop?"#fff":C.t,boxShadow:p.pop?"0 4px 16px rgba(37,99,235,.28)":"none"}}>
                  {p.price==="Custom"?"Let's Talk →":"Get Started →"}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section className="section-pad" style={{padding:"70px 4%",background:"linear-gradient(155deg,#F0F7FF,#FDF4FF)",width:"100%",boxSizing:"border-box"}}>
        <div className="grid-2" style={{maxWidth:1200,margin:"0 auto"}}>
          <div>
            <span style={{display:"inline-flex",alignItems:"center",gap:".5rem",background:C.violetLL,color:C.violet,fontFamily:"'JetBrains Mono',monospace",fontSize:".7rem",fontWeight:500,letterSpacing:".14em",textTransform:"uppercase",padding:".3rem .9rem",borderRadius:99,marginBottom:"1rem"}}>Get In Touch</span>
            <h2 style={{fontFamily:"'Bricolage Grotesque',sans-serif",fontSize:"clamp(1.85rem,3vw,2.5rem)",fontWeight:800,letterSpacing:"-.03em",color:C.t,marginBottom:"1.75rem"}}>Let's Build <span style={{background:"linear-gradient(135deg,#2563EB,#7C3AED)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",backgroundClip:"text"}}>Something Great</span></h2>
            {[["✉️",C.blueLL,"Email","hello@orbnix.in"],["📱",C.greenLL,"WhatsApp","+91 90798 81416"],["📍",C.orangeLL,"Location","India · 100% Remote-Friendly"]].map(([icon,bg,label,val])=>(
              <div key={label} className="contact-info-item">
                <div style={{width:44,height:44,borderRadius:13,background:bg,display:"flex",alignItems:"center",justifyContent:"center",fontSize:"1.1rem",flexShrink:0}}>{icon}</div>
                <div>
                  <div style={{fontFamily:"'JetBrains Mono',monospace",fontSize:".62rem",textTransform:"uppercase",letterSpacing:".09em",color:C.t4,marginBottom:".15rem"}}>{label}</div>
                  <div style={{fontSize:".9rem",fontWeight:600,color:C.t}}>{val}</div>
                </div>
              </div>
            ))}
            <div style={{marginTop:"1.25rem",padding:"1.5rem",background:"#fff",borderRadius:15,border:`1.5px solid ${C.border}`,boxShadow:"0 1px 3px rgba(0,0,0,.06)"}}>
              <div style={{fontSize:".82rem",fontWeight:700,color:C.t2,marginBottom:".75rem"}}>✅ Why clients choose Orbnix</div>
              {["Free 30-min discovery call","Exact quote before we start","50% payment only on delivery","You own 100% of the code","30 days post-launch support"].map(f=>(
                <div key={f} style={{fontSize:".83rem",color:C.t3,padding:".3rem 0",borderBottom:`1px dashed ${C.border}`}}>✓ &nbsp;{f}</div>
              ))}
            </div>
          </div>
          <ContactForm />
        </div>
      </section>

      {/* COMPARISON TABLE */}
      <section className="section-pad" style={{padding:"70px 4%",background:"#fff",width:"100%",boxSizing:"border-box"}}>
        <div style={{maxWidth:1000,width:"100%",margin:"0 auto"}}>
          <div style={{textAlign:"center",marginBottom:"3rem"}}>
            <span style={{display:"inline-flex",background:C.greenLL,color:C.green,fontFamily:"'JetBrains Mono',monospace",fontSize:".7rem",fontWeight:500,letterSpacing:".14em",textTransform:"uppercase",padding:".3rem .9rem",borderRadius:99,marginBottom:"1rem"}}>Why Choose Us</span>
            <h2 style={{fontFamily:"'Bricolage Grotesque',sans-serif",fontSize:"clamp(1.6rem,2.5vw,2.3rem)",fontWeight:800,letterSpacing:"-.03em",color:C.t}}>Orbnix vs Freelancer vs <span style={{background:"linear-gradient(135deg,#10B981,#2563EB)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",backgroundClip:"text"}}>Big Agency</span></h2>
            <p style={{color:C.t3,fontSize:".9rem",marginTop:".6rem"}}>Not all developers are equal. Here's the honest comparison.</p>
          </div>
          <div style={{overflowX:"auto"}}>
            <table style={{width:"100%",borderCollapse:"separate",borderSpacing:0,borderRadius:16,overflow:"hidden",border:`1.5px solid ${C.border}`,fontSize:".85rem"}}>
              <thead>
                <tr>
                  {["Feature","Freelancer","Big IT Agency","⭐ Orbnix"].map((h,i)=>(
                    <th key={h} style={{padding:"1rem 1.25rem",textAlign:i===0?"left":"center",background:i===3?"linear-gradient(135deg,#2563EB,#7C3AED)":i===0?"#F8FAFC":"#fff",color:i===3?"#fff":C.t,fontFamily:i===0?"'JetBrains Mono',monospace":"'Bricolage Grotesque',sans-serif",fontWeight:700,fontSize:i===0?".65rem":".88rem",textTransform:i===0?"uppercase":"none",letterSpacing:i===0?".1em":"normal",borderBottom:`2px solid ${i===3?"rgba(255,255,255,.2)":C.border}`}}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  ["Fixed price quote","❌ Varies wildly","❌ Changes often","✅ Always fixed"],
                  ["Code ownership","⚠️ Usually yes","❌ Often locked in","✅ Guaranteed in contract"],
                  ["Dedicated project manager","❌ No","✅ Yes","✅ Yes"],
                  ["Timeline reliability","⚠️ Unpredictable","⚠️ Slow (months)","✅ Committed dates"],
                  ["Post-launch support","❌ Rarely","💰 Extra cost","✅ 30 days free"],
                  ["Core Web Vitals optimised","❌ Rarely","⚠️ Sometimes","✅ Every project"],
                  ["SEO built into code","❌ Rarely","⚠️ Add-on","✅ Always included"],
                  ["WhatsApp updates","❌ Email only","❌ Email only","✅ Daily updates"],
                  ["50% pay on delivery","❌ Full upfront","❌ Milestone heavy","✅ Protected payment"],
                  ["Startup-friendly pricing","✅ Cheap","❌ ₹5L+","✅ From ₹25,000"],
                ].map(([feature,...vals],ri)=>(
                  <tr key={feature} style={{background:ri%2===0?"#FAFBFC":"#fff"}}>
                    <td style={{padding:".85rem 1.25rem",color:C.t2,fontWeight:600,borderRight:`1px solid ${C.border}`}}>{feature}</td>
                    {vals.map((v,ci)=>(
                      <td key={ci} style={{padding:".85rem 1.25rem",textAlign:"center",color:ci===2?C.blue:C.t3,fontWeight:ci===2?700:400,background:ci===2?"#EFF6FF33":undefined}}>{v}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div style={{textAlign:"center",marginTop:"2rem"}}>
            <button onClick={()=>setPage("contact")} style={{background:"linear-gradient(135deg,#2563EB,#7C3AED)",color:"#fff",border:"none",borderRadius:12,padding:".9rem 2.25rem",fontFamily:"'Manrope',sans-serif",fontWeight:700,cursor:"pointer",fontSize:".95rem",boxShadow:"0 6px 24px rgba(37,99,235,.3)"}}>Get a Free Quote — No Commitment →</button>
          </div>
        </div>
      </section>
      {/* HOW WE WORK */}
      <section className="section-pad" style={{padding:"70px 4%",background:C.bg2,width:"100%",boxSizing:"border-box"}}>
        <div style={{maxWidth:1200,width:"100%",margin:"0 auto"}}>
          <div style={{textAlign:"center",marginBottom:"3.5rem"}}>
            <span style={{display:"inline-flex",alignItems:"center",gap:".5rem",background:C.violetLL,color:C.violet,fontFamily:"'JetBrains Mono',monospace",fontSize:".7rem",fontWeight:500,letterSpacing:".14em",textTransform:"uppercase",padding:".3rem .9rem",borderRadius:99,marginBottom:"1rem"}}>Our Process</span>
            <h2 style={{fontFamily:"'Bricolage Grotesque',sans-serif",fontSize:"clamp(1.6rem,2.5vw,2.3rem)",fontWeight:800,letterSpacing:"-.03em",color:C.t}}>From Brief to <span style={{background:"linear-gradient(135deg,#7C3AED,#EC4899)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",backgroundClip:"text"}}>Live in Weeks</span></h2>
            <p style={{color:C.t3,fontSize:".95rem",maxWidth:480,margin:".65rem auto 0",lineHeight:1.85}}>A transparent, milestone-based process — so you always know what's happening and what's next.</p>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(200px,1fr))",gap:"1.5rem",position:"relative"}}>
            {[
              {step:"01",icon:"📞",title:"Discovery Call",desc:"Free 30-min call. We understand your goals, audience, and constraints — no jargon, no sales pitch.",time:"Day 1",color:C.blue},
              {step:"02",icon:"📋",title:"Fixed Quote",desc:"You receive a detailed proposal with exact scope, timeline, and fixed price. No hidden costs.",time:"Day 2–3",color:C.violet},
              {step:"03",icon:"🎨",title:"Design Sprint",desc:"We present 2–3 design directions. You choose, we refine. You approve before we write a single line of code.",time:"Week 1–2",color:C.pink},
              {step:"04",icon:"⚙️",title:"Development",desc:"Daily updates via WhatsApp. You see progress in real-time — not just at the end.",time:"Week 2–6",color:C.green},
              {step:"05",icon:"🔍",title:"QA & Testing",desc:"Cross-device testing, speed checks, SEO audit, and security review before we show you anything.",time:"Final week",color:C.orange},
              {step:"06",icon:"🚀",title:"Launch & Handover",desc:"We deploy, train you on the CMS, hand over all files and credentials. 30 days support begins.",time:"Launch day",color:C.blue},
            ].map((s,i)=>(
              <div key={s.step} style={{background:"#fff",borderRadius:18,padding:"1.5rem",border:`1px solid ${C.border}`,position:"relative",overflow:"hidden"}}>
                <div style={{position:"absolute",top:-12,right:12,fontFamily:"'Bricolage Grotesque',sans-serif",fontSize:"3.5rem",fontWeight:800,color:`${s.color}10`,lineHeight:1}}>{s.step}</div>
                <div style={{width:44,height:44,borderRadius:12,background:`${s.color}15`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:"1.3rem",marginBottom:"1rem"}}>{s.icon}</div>
                <div style={{fontFamily:"'JetBrains Mono',monospace",fontSize:".6rem",fontWeight:600,color:s.color,letterSpacing:".1em",textTransform:"uppercase",marginBottom:".35rem"}}>{s.time}</div>
                <div style={{fontFamily:"'Bricolage Grotesque',sans-serif",fontWeight:800,fontSize:".95rem",color:C.t,marginBottom:".45rem"}}>{s.title}</div>
                <div style={{fontSize:".82rem",color:C.t3,lineHeight:1.75}}>{s.desc}</div>
              </div>
            ))}
          </div>
          <div style={{marginTop:"2rem",background:"linear-gradient(135deg,#0F172A,#1E293B)",borderRadius:16,padding:"1.75rem 2.5rem",display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:"1rem"}}>
            <div>
              <div style={{fontFamily:"'Bricolage Grotesque',sans-serif",fontWeight:800,color:"#fff",fontSize:"1rem",marginBottom:".3rem"}}>Average project time: 3–6 weeks</div>
              <div style={{color:"rgba(255,255,255,.5)",fontSize:".83rem"}}>Starter website in 15 days · Full app in 6–12 weeks · AI bot in 2–4 weeks</div>
            </div>
            <button onClick={()=>setPage("contact")} style={{background:"linear-gradient(135deg,#2563EB,#7C3AED)",color:"#fff",border:"none",borderRadius:11,padding:".8rem 1.65rem",fontFamily:"'Manrope',sans-serif",fontWeight:700,cursor:"pointer",whiteSpace:"nowrap"}}>Start the Process →</button>
          </div>
        </div>
      </section>

      {/* FAQ — SEO RICH SNIPPETS */}
      <section className="section-pad" style={{padding:"70px 4%",background:"#fff",width:"100%",boxSizing:"border-box"}}>
        <div style={{maxWidth:860,width:"100%",margin:"0 auto"}}>
          <div style={{textAlign:"center",marginBottom:"3rem"}}>
            <span style={{display:"inline-flex",alignItems:"center",gap:".5rem",background:C.blueLL,color:C.blue,fontFamily:"'JetBrains Mono',monospace",fontSize:".7rem",fontWeight:500,letterSpacing:".14em",textTransform:"uppercase",padding:".3rem .9rem",borderRadius:99,marginBottom:"1rem"}}>FAQ</span>
            <h2 style={{fontFamily:"'Bricolage Grotesque',sans-serif",fontSize:"clamp(1.6rem,2.5vw,2.3rem)",fontWeight:800,letterSpacing:"-.03em",color:C.t}}>Everything You <span style={{background:"linear-gradient(135deg,#2563EB,#7C3AED)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",backgroundClip:"text"}}>Want to Know</span></h2>
          </div>
          <FaqAccordion />
        </div>
      </section>

      {/* FOLLOW US ON SOCIAL */}
      <section style={{padding:"56px 4%",background:"#0F172A",width:"100%",boxSizing:"border-box"}}>
        <div style={{maxWidth:1200,margin:"0 auto",textAlign:"center"}}>
          <div style={{fontFamily:"'JetBrains Mono',monospace",fontSize:".68rem",fontWeight:500,letterSpacing:".14em",textTransform:"uppercase",color:"rgba(255,255,255,.3)",marginBottom:".85rem"}}>Follow Orbnix</div>
          <h2 style={{fontFamily:"'Bricolage Grotesque',sans-serif",fontSize:"clamp(1.5rem,2.5vw,2rem)",fontWeight:800,letterSpacing:"-.03em",color:"#fff",marginBottom:".6rem"}}>Stay in the Loop — <span style={{background:"linear-gradient(135deg,#60A5FA,#A78BFA)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",backgroundClip:"text"}}>Follow Our Journey</span></h2>
          <p style={{color:"rgba(255,255,255,.45)",fontSize:".88rem",maxWidth:440,margin:"0 auto 2rem",lineHeight:1.7}}>Reels, tech tips, project reveals, offers & behind-the-scenes — all on our socials.</p>
          <div style={{display:"flex",flexWrap:"wrap",justifyContent:"center",gap:"1rem"}}>
            {SOCIALS.map(s=>(
              <a key={s.id} href={s.url} target="_blank" rel="noopener noreferrer"
                style={{display:"flex",alignItems:"center",gap:".65rem",padding:".75rem 1.4rem",borderRadius:14,background:"rgba(255,255,255,.06)",border:"1px solid rgba(255,255,255,.1)",color:"#fff",textDecoration:"none",fontFamily:"'Manrope',sans-serif",fontSize:".85rem",fontWeight:700,transition:"all .22s",backdropFilter:"blur(8px)"}}
                onMouseEnter={e=>{e.currentTarget.style.background=s.color+"25";e.currentTarget.style.borderColor=s.color+"80";e.currentTarget.style.transform="translateY(-3px)";e.currentTarget.style.boxShadow=`0 8px 24px ${s.color}33`;}}
                onMouseLeave={e=>{e.currentTarget.style.background="rgba(255,255,255,.06)";e.currentTarget.style.borderColor="rgba(255,255,255,.1)";e.currentTarget.style.transform="none";e.currentTarget.style.boxShadow="none";}}>
                <span style={{color:s.color}}>{s.icon}</span>
                {s.label}
              </a>
            ))}
          </div>
          <div style={{marginTop:"2rem",padding:"1.25rem 2rem",background:"rgba(255,255,255,.04)",borderRadius:14,border:"1px solid rgba(255,255,255,.08)",display:"inline-block"}}>
            <div style={{fontSize:".78rem",color:"rgba(255,255,255,.4)",fontFamily:"'JetBrains Mono',monospace",letterSpacing:".08em"}}>📸 @orbnix.in · 📺 @OrbnixIndia · 💼 Orbnix · 𝕏 @orbnix_in</div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{background:"#0F172A",color:"rgba(255,255,255,.85)",padding:"3.5rem 4% 2rem"}}>
        <div style={{maxWidth:1200,width:"100%",margin:"0 auto"}}>
          <div className="footer-grid" style={{marginBottom:"3rem"}}>
            <div>
              <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:".75rem"}}>
                <svg width="28" height="28" viewBox="0 0 40 40" fill="none"><circle cx="20" cy="20" r="9" stroke="url(#fl1)" strokeWidth="2" fill="none"/><circle cx="20" cy="20" r="15" stroke="url(#fl1)" strokeWidth="1" fill="none" opacity=".4"/><circle cx="20" cy="20" r="3.5" fill="url(#fl1)"/><defs><linearGradient id="fl1" x1="2" y1="2" x2="38" y2="38" gradientUnits="userSpaceOnUse"><stop stopColor="#60A5FA"/><stop offset="1" stopColor="#A78BFA"/></linearGradient></defs></svg>
                <span style={{fontFamily:"'Bricolage Grotesque',sans-serif",fontSize:"1.1rem",fontWeight:800,color:"#fff"}}>ORBNIX</span>
              </div>
              <p style={{fontSize:".83rem",color:"rgba(255,255,255,.5)",lineHeight:1.85,maxWidth:240}}>Full-stack IT development studio — 100% remote. Websites, mobile apps, AI agents & custom software for Indian startups & SMEs. Globally trusted.</p>
            </div>
            {[
              ["Services",["Web Development","App Development","AI Agents","E-Commerce","WhatsApp Marketing","IT Support & AMC"]],
              ["Company",["About Us","Our Work","Blog","Pricing","Contact"]],
              ["Contact",["hello@orbnix.in","WhatsApp Us","Book a Free Call","India · 100% Remote"]]
            ].map(([h,links])=>(
              <div key={h}>
                <h5 style={{fontSize:".72rem",fontWeight:700,textTransform:"uppercase",letterSpacing:".1em",color:"rgba(255,255,255,.35)",marginBottom:"1rem"}}>{h}</h5>
                {links.map(l=>{
                  const pageMap={"About Us":"about","Our Work":"work","Blog":"blog","Pricing":"pricing","Contact":"contact"};
                  const isPage = pageMap[l];
                  const isEmail = l.includes("@");
                  const isWA = l.includes("WhatsApp");
                  const isCall = l.includes("Call");
                  return (
                    <a key={l}
                      href={isEmail?"mailto:hello@orbnix.in":isWA?"https://wa.me/919079881416":undefined}
                      target={isWA?"_blank":undefined}
                      rel={isWA?"noopener noreferrer":undefined}
                      onClick={isPage?(e=>{e.preventDefault();setPage(isPage);}):undefined}
                      style={{display:"block",fontSize:".84rem",color:"rgba(255,255,255,.55)",marginBottom:".55rem",cursor:"pointer",textDecoration:"none"}}
                      onMouseEnter={e=>e.target.style.color="#fff"}
                      onMouseLeave={e=>e.target.style.color="rgba(255,255,255,.55)"}
                    >{l}</a>
                  );
                })}
              </div>
            ))}
          </div>
          <div style={{borderTop:"1px solid rgba(255,255,255,.08)",paddingTop:"1.75rem",display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:"1rem"}}>
            <p style={{fontSize:".78rem",color:"rgba(255,255,255,.35)"}}>© 2025 Orbnix. All rights reserved. · Best Web Development Agency in India · IT Company India · 100% Remote-Friendly</p>
            <SocialFooterRow />
          </div>
        </div>
      </footer>
    </div>
  );
}

// ─── FAQ ACCORDION ────────────────────────────────────────────────────────────
const FAQ_DATA = [
  { q:"How much does a website cost in India?",
    a:"Website pricing in India depends on complexity. A basic professional website costs ₹15,000–25,000. A website with booking or payment integration costs ₹30,000–60,000. An e-commerce store starts at ₹40,000. A mobile app starts at ₹80,000. A custom AI chatbot or ERP starts at ₹40,000–1,50,000. At Orbnix, our Web Starter package is ₹25,000 and includes mobile-responsive design, SEO setup, WhatsApp integration, and 30-day support." },
  { q:"How long does it take to build a website in India?",
    a:"A standard professional website (5–10 pages) takes 7–14 days at Orbnix. An e-commerce store with payment gateway takes 2–4 weeks. A mobile app takes 4–10 weeks depending on features. A custom SaaS platform or ERP takes 8–16 weeks. We give you a fixed timeline before starting and stick to it." },
  { q:"Can you build a website for my clinic or hospital?",
    a:"Yes — we specialise in clinic and hospital websites with online appointment booking, doctor profiles, service listings, WhatsApp booking integration, and Google Maps. Our healthcare websites are mobile-first and optimised to rank for 'clinic near me' and 'doctor [city]' searches. Pricing starts at ₹25,000." },
  { q:"Can you build a website for my school, college or coaching institute?",
    a:"Absolutely. We build CBSE/ICSE school websites with online admissions forms, board results display, fee structure pages, facilities gallery, and parent enquiry systems. Coaching institute websites include course listings, faculty profiles, and student testimonials. Pricing starts at ₹20,000." },
  { q:"Can you build a booking website for my hotel or resort?",
    a:"Yes — we build hotel and resort websites with direct booking systems (so you avoid 15–25% OTA commission from MakeMyTrip/OYO), room showcase pages, amenity listings, WhatsApp booking, and Razorpay payment integration. Our hotel clients typically recover the website cost within the first month through direct booking savings." },
  { q:"Do you build websites for CA firms and chartered accountants?",
    a:"Yes. We build CA firm websites with GST, ITR, audit, and company registration service pages — each individually optimised for search. We also add tax deadline calendars, team profiles with ICAI membership numbers, and online enquiry forms. Local SEO setup helps you rank for 'CA firm [your city]' searches." },
  { q:"Can you make a restaurant website with online ordering?",
    a:"Yes — we build restaurant websites with digital menus, online table booking, contact-free ordering, Razorpay/UPI payment, and kitchen display integration. We also integrate with Swiggy and Zomato partner APIs if needed. Pricing starts at ₹25,000." },
  { q:"Do you build e-commerce websites and online stores?",
    a:"Yes. We build custom e-commerce stores and Shopify/WooCommerce stores with product catalogues, Razorpay/UPI/COD payment, order tracking, WhatsApp order notifications, GST invoice generation, and multi-device responsive design. D2C brands, wholesalers, and retail stores are welcome." },
  { q:"What is the difference between a cheap ₹5,000 website and a professional website?",
    a:"A ₹5,000 template website typically has slow load times, no SEO, no mobile optimization, no custom domain, and no ongoing support. A professional website from Orbnix is custom-designed, mobile-first, SEO-optimised at the code level, fast-loading (Core Web Vitals compliant), and comes with 30-day post-launch support. The difference shows directly in Google rankings and conversion rates." },
  { q:"Do you work with clients outside Jaipur and Rajasthan?",
    a:"Yes — Orbnix is 100% remote-first. We work with clients across India: Mumbai, Delhi, Bangalore, Hyderabad, Chennai, Pune, Ahmedabad, Kolkata, Surat, Lucknow, and all Tier 2–3 cities. We also work with international clients in the USA, UK, UAE, Australia, and Canada. All communication is via WhatsApp, email, and video call." },
  { q:"Can you build a mobile app for my business?",
    a:"Yes — we build Android and iOS apps using Flutter and React Native. Whether it's a customer-facing app for your restaurant, clinic, or store, or an internal app for your field team, we handle design, development, backend API, and app store submission. Starting at ₹80,000 for a 3-screen MVP." },
  { q:"Do you offer SEO services with the website?",
    a:"Every website we build includes basic on-page SEO — title tags, meta descriptions, structured data/schema markup, sitemap, robots.txt, Google Search Console setup, and fast page speed (Core Web Vitals). We also offer monthly SEO retainers starting at ₹12,000/month for ongoing content, backlinks, and rank tracking." },
  { q:"Can you build an AI chatbot for my website?",
    a:"Yes. We build AI-powered chatbots and agents using GPT-4o/Claude APIs that can answer customer questions, qualify leads, book appointments, take orders, and escalate to WhatsApp. Used by clinics, e-commerce stores, real estate portals, and SaaS companies. Pricing starts at ₹40,000." },
  { q:"Do you build websites for factories and manufacturers?",
    a:"Yes — we build B2B manufacturer websites with product catalogues, technical specifications, certification display (ISO, BIS, CE), RFQ (request for quotation) forms, and export-focused SEO to attract international buyers from Google. Clients have received RFQs from Germany, UAE, and the USA within 60 days of launch." },
  { q:"What technologies do you use to build websites?",
    a:"We primarily use React and Next.js for the frontend, Node.js and Python (FastAPI/Django) for the backend, PostgreSQL and MongoDB for databases, and deploy on AWS, Vercel, or Netlify. For mobile apps we use Flutter. For e-commerce we use Shopify or custom WooCommerce. We use Tailwind CSS for design and integrate Razorpay, WhatsApp API, Google Maps, and Firebase as needed." },
  { q:"Do you offer website maintenance and IT support after launch?",
    a:"Yes — all projects include 30 days of free post-launch support. We also offer monthly AMC (Annual Maintenance Contract) plans starting at ₹3,500/month for hosting management, security updates, content changes, uptime monitoring, and technical support." },
];

function FaqAccordion() {
  const [open, setOpen] = useState(null);
  return (
    <div>
      {FAQ_DATA.map((f,i)=>(
              <div key={`f-${i}`} style={{borderBottom:`1px solid ${C.border}`,overflow:"hidden"}}>
          <button onClick={()=>setOpen(open===i?null:i)} style={{
            width:"100%",textAlign:"left",padding:"1.2rem 0",display:"flex",alignItems:"center",justifyContent:"space-between",gap:"1rem",
            background:"transparent",border:"none",cursor:"pointer",fontFamily:"'Manrope',sans-serif",
          }}>
            <span style={{fontWeight:700,fontSize:".95rem",color:open===i?C.blue:C.t,lineHeight:1.5,flex:1}}>{f.q}</span>
            <span style={{width:26,height:26,borderRadius:8,background:open===i?C.blueLL:"#F8FAFC",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,transition:"all .2s",color:open===i?C.blue:C.t3,fontSize:".9rem",fontWeight:700}}>
              {open===i?"−":"+"}
            </span>
          </button>
          {open===i && (
            <div style={{paddingBottom:"1.25rem",fontSize:".88rem",color:C.t3,lineHeight:1.85,animation:"fadeUp .2s ease"}}>
              {f.a}
            </div>
          )}
        </div>
      ))}
      <div style={{marginTop:"2rem",background:"linear-gradient(135deg,#EFF6FF,#F5F3FF)",borderRadius:14,padding:"1.4rem",textAlign:"center",border:`1px solid ${C.blue}18`}}>
        <div style={{fontWeight:700,color:C.t,marginBottom:".3rem",fontSize:".9rem"}}>Still have questions?</div>
        <div style={{color:C.t3,fontSize:".82rem",marginBottom:".85rem"}}>WhatsApp us or book a free 30-min call — no sales pressure, just honest answers.</div>
        <div style={{display:"flex",gap:".75rem",justifyContent:"center",flexWrap:"wrap"}}>
          <a href="https://wa.me/919079881416" target="_blank" rel="noopener noreferrer" style={{background:"#25D366",color:"#fff",padding:".55rem 1.2rem",borderRadius:9,fontFamily:"'Manrope',sans-serif",fontWeight:700,fontSize:".83rem",textDecoration:"none"}}>💬 WhatsApp Us</a>
          <a href="mailto:hello@orbnix.in" style={{background:C.blueLL,color:C.blue,padding:".55rem 1.2rem",borderRadius:9,fontFamily:"'Manrope',sans-serif",fontWeight:700,fontSize:".83rem",textDecoration:"none"}}>✉️ Email Us</a>
        </div>
      </div>
    </div>
  );
}

// ─── CONTACT FORM ──────────────────────────────────────────────────────────────
function ContactForm() {
  const [sent,setSent]=useState(false);
  const [form,setForm]=useState({name:"",email:"",phone:"",company:"",service:"",budget:"",timeline:"",message:""});
  const field=(label,key,type="text",placeholder="")=>(
    <div style={{marginBottom:"1rem"}}>
      <label style={{display:"block",fontSize:".76rem",fontWeight:600,color:C.t2,marginBottom:".35rem"}}>{label}</label>
      <input type={type} value={form[key]} placeholder={placeholder} onChange={e=>setForm({...form,[key]:e.target.value})} style={{width:"100%",padding:".7rem .9rem",background:C.bg2,border:`1.5px solid ${C.border}`,borderRadius:9,color:C.t,fontFamily:"'Manrope',sans-serif",fontSize:".875rem",outline:"none"}} onFocus={e=>e.target.style.borderColor="#2563EB"} onBlur={e=>e.target.style.borderColor=C.border}/>
    </div>
  );
  const select=(label,key,opts)=>(
    <div style={{marginBottom:"1rem"}}>
      <label style={{display:"block",fontSize:".76rem",fontWeight:600,color:C.t2,marginBottom:".35rem"}}>{label}</label>
      <select value={form[key]} onChange={e=>setForm({...form,[key]:e.target.value})} style={{width:"100%",padding:".7rem .9rem",background:C.bg2,border:`1.5px solid ${C.border}`,borderRadius:9,color:form[key]?C.t:C.t4,fontFamily:"'Manrope',sans-serif",fontSize:".875rem",outline:"none"}}>
        {opts.map(o=><option key={o} value={o==="Select..."?"":o}>{o}</option>)}
      </select>
    </div>
  );
  if(sent) return (
    <div style={{background:"#fff",borderRadius:22,padding:"3.5rem 2.25rem",border:`1.5px solid ${C.border}`,boxShadow:"0 8px 32px rgba(0,0,0,.1)",textAlign:"center"}}>
      <div style={{fontSize:"3rem",marginBottom:"1rem"}}>🚀</div>
      <h3 style={{fontFamily:"'Bricolage Grotesque',sans-serif",fontSize:"1.4rem",fontWeight:800,color:C.t,marginBottom:".65rem"}}>Message Sent!</h3>
      <p style={{color:C.t3,lineHeight:1.8,fontSize:".9rem"}}>Thanks {form.name.split(" ")[0]}! We'll get back within 24 hours.<br/>Check your WhatsApp/email for confirmation.</p>
      <button onClick={()=>{setSent(false);setForm({name:"",email:"",phone:"",company:"",service:"",budget:"",timeline:"",message:""});}} style={{marginTop:"1.75rem",background:"linear-gradient(135deg,#2563EB,#7C3AED)",color:"#fff",border:"none",borderRadius:11,padding:".8rem 2rem",fontFamily:"'Manrope',sans-serif",fontWeight:700,cursor:"pointer"}}>Send Another →</button>
    </div>
  );
  return (
    <div style={{background:"#fff",borderRadius:22,padding:"2.25rem",border:`1.5px solid ${C.border}`,boxShadow:"0 8px 32px rgba(0,0,0,.1)"}}>
      <div style={{marginBottom:"1.5rem"}}>
        <span style={{display:"inline-flex",background:C.blueLL,color:C.blue,fontFamily:"'JetBrains Mono',monospace",fontSize:".68rem",fontWeight:500,letterSpacing:".1em",textTransform:"uppercase",padding:".25rem .8rem",borderRadius:99}}>New Project</span>
        <div style={{fontFamily:"'Bricolage Grotesque',sans-serif",fontSize:"1.1rem",fontWeight:800,color:C.t,marginTop:".4rem"}}>Tell us about your project</div>
      </div>
      <div className="grid-form-2">
        {field("Your Name *","name","text","Rahul Sharma")}
        {field("Email Address *","email","email","rahul@company.com")}
        {field("WhatsApp Number","phone","tel","+91 98765 43210")}
        {field("Company Name","company","text","Optional")}
      </div>
      {select("Service Needed *","service",["Select...","Web Development","Mobile App","AI Agent / Automation","UI/UX Design","E-Commerce Store","Custom Software / ERP","Digital Marketing & SEO","Not sure — help me decide"])}
      <div className="grid-budget">
        {select("Budget","budget",["Select budget","Under ₹25,000","₹25K–₹75K","₹75K–₹2L","₹2L+","USD — Let's discuss"])}
        {select("Timeline","timeline",["Select timeline","ASAP","Within 1 month","1–3 months","Flexible"])}
      </div>
      <div style={{marginBottom:"1rem"}}>
        <label style={{display:"block",fontSize:".76rem",fontWeight:600,color:C.t2,marginBottom:".35rem"}}>Project Details *</label>
        <textarea value={form.message} onChange={e=>setForm({...form,message:e.target.value})} rows={4} placeholder="Describe your project — what you want to build, your goals, any existing tech..." style={{width:"100%",padding:".7rem .9rem",background:C.bg2,border:`1.5px solid ${C.border}`,borderRadius:9,color:C.t,fontFamily:"'Manrope',sans-serif",fontSize:".875rem",outline:"none",resize:"vertical"}} onFocus={e=>e.target.style.borderColor="#2563EB"} onBlur={e=>e.target.style.borderColor=C.border}/>
      </div>
      <button onClick={async()=>{
        if(!form.name||!form.email||!form.service)return alert("Please fill Name, Email and Service.");
        try{
          const res=await fetch("https://api.web3forms.com/submit",{
            method:"POST",
            headers:{"Content-Type":"application/json","Accept":"application/json"},
            body:JSON.stringify({
              access_key:"YOUR_WEB3FORMS_KEY",
              subject:`New Orbnix Enquiry — ${form.service} — ${form.name}`,
              from_name:"Orbnix Website",
              replyto:form.email,
              name:form.name,
              email:form.email,
              phone:form.phone||"Not provided",
              company:form.company||"Not provided",
              service:form.service,
              budget:form.budget||"Not specified",
              timeline:form.timeline||"Not specified",
              message:form.message,
            })
          });
          const data=await res.json();
          if(data.success){
            // Auto-reply to client
            await fetch("https://api.web3forms.com/submit",{
              method:"POST",
              headers:{"Content-Type":"application/json","Accept":"application/json"},
              body:JSON.stringify({
                access_key:"YOUR_WEB3FORMS_KEY",
                subject:"We received your enquiry — Orbnix",
                from_name:"Orbnix",
                to:form.email,
                replyto:"hello@orbnix.in",
                message:`Hi ${form.name.split(" ")[0]},\n\nThank you for reaching out to Orbnix!\n\nWe've received your enquiry for: ${form.service}\nBudget: ${form.budget||"To be discussed"}\nTimeline: ${form.timeline||"To be discussed"}\n\nOur team will review your requirements and get back to you within 24 hours.\n\nIn the meantime, feel free to WhatsApp us directly:\n+91 90798 81416\n\nBest regards,\nTeam Orbnix\nhello@orbnix.in | orbnix.in`,
              })
            });
            setSent(true);
          }
          else{alert("Something went wrong. Please WhatsApp us at +91 90798 81416");}
        }catch(e){alert("Network error. Please WhatsApp us at +91 90798 81416");}
      }} style={{width:"100%",padding:".95rem",background:"linear-gradient(135deg,#2563EB,#7C3AED)",color:"#fff",border:"none",borderRadius:11,fontFamily:"'Manrope',sans-serif",fontSize:".92rem",fontWeight:700,cursor:"pointer",boxShadow:"0 4px 16px rgba(37,99,235,.3)"}}>
        Send Message — It's Free →
      </button>
      <p style={{textAlign:"center",fontSize:".73rem",color:C.t4,marginTop:".65rem"}}>No spam · No obligation · Reply within 24 hours</p>
    </div>
  );
}

// ─── WORK PAGE ────────────────────────────────────────────────────────────────
function Work({ setPage, openDemo }) {

  return (
    <div style={{width:"100%",paddingTop:68,background:"#fff",minHeight:"100vh"}}>
      <section className="section-pad" style={{padding:"60px 4% 50px",background:"linear-gradient(155deg,#F0F7FF,#FDF4FF)",width:"100%",boxSizing:"border-box"}}>
        <div style={{maxWidth:1200,width:"100%",margin:"0 auto"}}>
          <span style={{display:"inline-flex",background:C.violetLL,color:C.violet,fontFamily:"'JetBrains Mono',monospace",fontSize:".7rem",fontWeight:500,letterSpacing:".14em",textTransform:"uppercase",padding:".3rem .9rem",borderRadius:99,marginBottom:"1rem"}}>Our Work</span>
          <h1 style={{fontFamily:"'Bricolage Grotesque',sans-serif",fontSize:"clamp(1.9rem,3.5vw,2.8rem)",fontWeight:800,letterSpacing:"-.035em",color:C.t,marginBottom:"1rem"}}>50+ Projects Across India. <span style={{background:"linear-gradient(135deg,#7C3AED,#EC4899)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",backgroundClip:"text"}}>Real Results.</span></h1>
          <p style={{fontSize:"1rem",color:C.t3,lineHeight:1.85,maxWidth:560}}>Every project was built for a real business that needed real results. No lorem ipsum. No fake metrics.</p>
          <div className="grid-kpis" style={{marginTop:"1.5rem"}}>
            {[["50+","Projects"],["₹2Cr+","Client ARR"],["4.8★","Avg Rating"],["0","Missed Deadlines"]].map(([n,l])=>(
              <div key={l} style={{background:"#fff",border:`1.5px solid ${C.border}`,borderRadius:13,padding:".9rem 1.25rem",boxShadow:"0 1px 3px rgba(0,0,0,.06)"}}>
                <div style={{fontFamily:"'Bricolage Grotesque',sans-serif",fontSize:"1.4rem",fontWeight:800,color:C.blue}}>{n}</div>
                <div style={{fontSize:".75rem",color:C.t4,marginTop:".1rem"}}>{l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="section-pad-sm" style={{padding:"40px 4%",background:"#fff",borderBottom:`1px solid ${C.border}`,width:"100%",boxSizing:"border-box"}}>
        <div style={{maxWidth:1200,width:"100%",margin:"0 auto"}}>
          <h2 style={{fontFamily:"'Bricolage Grotesque',sans-serif",fontSize:"1.2rem",fontWeight:800,marginBottom:"1.25rem",color:C.t}}>🎮 Interactive Live Demos</h2>
          <div className="demos-row">
            {[["restaurant","🍽️","Restaurant","Savoria"],["clinic","🏥","Clinic","LifeCare"],["school","🏫","School","Bright Future"],["hotel","🏰","Hotel","Royal Haveli"],["ecommerce","🛍️","E-Commerce","ShopNova"],["ca","⚖️","CA Firm","Sharma & Co"],["architect","✏️","Architect","Studio S."],["factory","🏭","Factory","Precision"],["astrologer","🔮","Astrologer","Pandit S."],["ai","🤖","AI Chatbot","SupportBot"],["dashboard","📊","Dashboard","Analytix"],["app","📱","Mobile App","FitFlow"],["booking","✂️","Booking","LuxeCuts"],["realestate","🏠","Real Estate","PropSearch"],["lms","📚","EdTech LMS","LearnHub"]].map(([id,emoji,label,sub])=>(
              <button key={id} onClick={()=>openDemo(id)} style={{display:"flex",flexDirection:"column",alignItems:"flex-start",gap:".15rem",background:C.bg2,border:`1.5px solid ${C.border}`,borderRadius:12,padding:".85rem 1rem",cursor:"pointer",fontFamily:"'Manrope',sans-serif",transition:"all .2s"}} onMouseEnter={e=>{e.currentTarget.style.borderColor="#2563EB";e.currentTarget.style.background="#EFF6FF";e.currentTarget.style.transform="translateY(-2px)";}} onMouseLeave={e=>{e.currentTarget.style.borderColor=C.border;e.currentTarget.style.background=C.bg2;e.currentTarget.style.transform="none";}}>
                <span style={{fontSize:"1.1rem"}}>{emoji}</span>
                <span style={{fontWeight:700,color:C.t,fontSize:".82rem"}}>{label}</span>
                <span style={{fontSize:".68rem",color:C.t4}}>{sub}</span>
                <span style={{fontSize:".6rem",background:C.blueLL,color:C.blue,padding:".12rem .45rem",borderRadius:4,fontFamily:"'JetBrains Mono',monospace",fontWeight:600}}>LIVE →</span>
              </button>
            ))}
          </div>
        </div>
      </section>
      <section className="section-pad" style={{padding:"40px 4%",background:C.bg2,width:"100%",boxSizing:"border-box"}}>
        <div style={{maxWidth:1200,width:"100%",margin:"0 auto"}}>
          <h2 style={{fontFamily:"'Bricolage Grotesque',sans-serif",fontSize:"1.2rem",fontWeight:800,marginBottom:"1.25rem",color:C.t}}>📋 Case Studies</h2>
          <div className="grid-cases">
            {WORK_CASES.map((c)=>(
              <div key={c.title} style={{background:"#fff",borderRadius:16,overflow:"hidden",border:`1.5px solid ${C.border}`,transition:"all .3s"}} onMouseEnter={e=>{e.currentTarget.style.transform="translateY(-5px)";e.currentTarget.style.boxShadow=`0 16px 48px ${c.col}20`;e.currentTarget.style.borderColor="transparent";}} onMouseLeave={e=>{e.currentTarget.style.transform="none";e.currentTarget.style.boxShadow="none";e.currentTarget.style.borderColor=C.border;}}>
                <div style={{height:80,background:c.bg,display:"flex",alignItems:"center",justifyContent:"space-between",padding:"0 1.25rem"}}>
                  <div style={{fontSize:"2.25rem"}}>{c.emoji}</div>
                  <span style={{fontFamily:"'JetBrains Mono',monospace",fontSize:".6rem",fontWeight:500,background:c.col+"22",color:c.col,padding:".2rem .65rem",borderRadius:5}}>{c.cat}</span>
                </div>
                <div style={{padding:"1.1rem"}}>
                  <div style={{fontFamily:"'Bricolage Grotesque',sans-serif",fontWeight:800,fontSize:".92rem",color:C.t,marginBottom:".5rem"}}>{c.title}</div>
                  <div style={{background:c.bg,borderRadius:7,padding:".55rem .75rem",fontSize:".75rem",color:c.col,fontWeight:600,lineHeight:1.55,marginBottom:".75rem"}}>{c.result}</div>
                  <div style={{display:"flex",flexWrap:"wrap",gap:".25rem"}}>
                    {c.tags.map(t=><span key={t} style={{fontFamily:"'JetBrains Mono',monospace",fontSize:".6rem",background:C.bg2,color:C.t3,padding:".15rem .45rem",borderRadius:4,border:`1px solid ${C.border}`}}>{t}</span>)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <div style={{textAlign:"center",padding:"2.5rem 5%",background:"#fff"}}>
        <p style={{color:C.t3,marginBottom:"1.1rem"}}>Ready to add your business to this list?</p>
        <button onClick={()=>setPage("contact")} style={{background:"linear-gradient(135deg,#2563EB,#7C3AED)",color:"#fff",border:"none",borderRadius:12,padding:".9rem 2.25rem",fontFamily:"'Manrope',sans-serif",fontSize:".95rem",fontWeight:700,cursor:"pointer",boxShadow:"0 6px 24px rgba(37,99,235,.35)"}}>Start Your Project →</button>
      </div>
    </div>
  );
}

// ─── BLOG PAGE (SEO OPTIMIZED) ────────────────────────────────────────────────
function Blog({ setPage, onCatClick }) {
  const [active,setActive]=useState(null);
  const [catFilter,setCatFilter]=useState("All");
  const openPost = (post) => { setActive(post.id); if(onCatClick) onCatClick(post.cat); };
  const posts=[
    { id:1,
      title:"Best Web Development Company in India 2025 — How to Choose the Right One",
      cat:"Web Development",
      metaDesc:"Searching for the best web development company in India? Orbnix builds custom websites from ₹25,000. React, Next.js, SEO-ready, 100% code ownership. Free quote in 24 hours.",
      time:"7 min", date:"Dec 20, 2025", emoji:"🌐",
      body:`India has thousands of web development companies — from solo freelancers on Fiverr to 500-person IT parks. Choosing the wrong one can cost you months of time and lakhs of rupees. Here's how to choose the right web development partner in India in 2025.

This guide will help you make an informed decision, and yes — we'll also tell you what makes Orbnix different.

What to look for in an Indian web development company:

1. Portfolio with real, measurable results
Anyone can show you a beautiful screenshot. What you want is proof the website actually helped a business grow. Ask for live URLs and specific results: traffic growth, conversion rates, revenue generated.

2. 100% code ownership in the contract
This is the single most important clause. Many web agencies in India keep your code and charge monthly "maintenance fees" forever. Demand a contract that explicitly states all source code, IP, and assets become yours upon project completion.

3. Mobile-first, India-optimised design
Over 78% of Indian internet users access the web on Android smartphones, often on slower 4G connections. Your website must be designed mobile-first, compressed for speed, and tested on real Indian devices and networks.

4. Google Core Web Vitals compliance
Google uses page speed and Core Web Vitals as direct ranking factors. A website that loads in 2 seconds will consistently outrank one that loads in 5 seconds, even if the slower site has better content.

5. Post-launch support policy
Bugs happen after launch. A trustworthy agency includes at least 30 days of free support. Ask about this before you sign anything.

Why startups and businesses across India choose Orbnix:

We've worked with founders and business owners from Mumbai, Delhi, Bengaluru, Pune, Hyderabad, Ahmedabad, Chennai, and more. Our clients range from early-stage startups to established SMEs.

Our approach:
- Free 30-minute discovery call — no obligation
- Fixed quote within 24 hours — no surprises
- 50% payment only on delivery — you're protected
- Complete source code handed over — always
- 30 days free post-launch support — standard in every project

Website packages: Starter ₹25,000 (5 pages, 15 days), Growth ₹55,000 (15 pages + CMS, 30 days), Enterprise — custom quote.

Tech stack: React, Next.js, Node.js, TypeScript, Tailwind CSS, PostgreSQL, MongoDB, Vercel, AWS.

The biggest mistake Indian businesses make when choosing a web company:

Choosing on price alone. A ₹8,000 website that doesn't rank on Google, doesn't load on mobile, and doesn't convert visitors — costs you far more in lost business than a ₹55,000 site that does all three.

Choose a partner who challenges your brief, not one who agrees with everything. If every idea you propose is "great" — they're not thinking.

Book a free call with Orbnix or WhatsApp us at +91 90798 81416. We work 100% remotely with clients across India.`},
    { id:2,
      title:"How Much Does a Website Cost in India? (2025 Honest Breakdown)",
      cat:"Pricing",
      metaDesc:"Complete breakdown of website development costs in India 2025. From ₹8,000 freelancer sites to ₹10L+ enterprise platforms. Transparent pricing from Orbnix.",
      time:"6 min", date:"Dec 15, 2025", emoji:"💰",
      body:`This is the most-asked question we get every week at Orbnix. Here's an honest, no-fluff answer.

The range: ₹8,000 to ₹15,00,000+

Yes, that's a massive range. Here's what actually determines where your project falls.

Tier 1: ₹8,000–₹20,000 (Freelancer / Template Sites)
What you get: A WordPress or Wix template with minimal customisation.
What you don't get: Custom design, SEO optimisation, performance tuning, or reliable post-launch support.
Risk: Template sites are often slow, hard to modify later, and may use pirated themes that get you flagged by Google.
Best for: Testing an idea before investing more.

Tier 2: ₹20,000–₹60,000 (Professional Agency — Starter to Growth)
What you get: Custom design based on your brand, mobile-first, fast loading, basic to advanced SEO, contact forms, WhatsApp integration.
This is Orbnix's most popular range. Our Starter package (₹25,000) and Growth package (₹55,000) fall here.
Best for: Most small to medium businesses in India.

Tier 3: ₹60,000–₹2,00,000 (Advanced Web Applications)
Includes: Custom CMS, blog, payment integration, user accounts, dashboards, complex animations.
Best for: Businesses with specific functional requirements.

Tier 4: ₹2,00,000+ (Enterprise Platforms)
Full-scale SaaS, ERP, multi-language, complex integrations, dedicated infrastructure.
Timeline: 3–6+ months.

What Orbnix charges (transparent pricing):
- Starter (5 pages, 15 days): ₹25,000
- Growth (15 pages + CMS, 30 days): ₹55,000
- Enterprise: Custom quote after discovery call

International pricing starts at $500 (USD) for Starter equivalent.

The hidden costs most agencies don't mention:
- Domain: ₹800–₹1,500/year
- Hosting: ₹3,000–₹15,000/year (we help you set this up)
- SSL certificate: Usually free (Let's Encrypt)
- Content writing: ₹500–₹2,000/page if you need it

At Orbnix, we tell you every cost upfront before you pay a single rupee.

The real question to ask: What's the cost of NOT having a good website?

A poorly-built ₹12,000 site that doesn't load on mobile, doesn't rank on Google, and doesn't convert visitors — costs you far more in lost business than a ₹55,000 site that does all three.

Want a free quote for your project? WhatsApp us or fill out the contact form.`},
    { id:3,
      title:"AI Agents for Small Businesses in India — A 2025 Practical Guide",
      cat:"AI & Automation",
      metaDesc:"Learn how AI agents can save Indian businesses 60-80% on support costs. Real examples from Mumbai, Delhi & Bengaluru businesses using WhatsApp AI bots in 2025.",
      time:"8 min", date:"Dec 10, 2025", emoji:"🤖",
      body:`AI agents are one of the most transformational technologies available to Indian small businesses right now — and most business owners have no idea how to actually use them.

This guide explains what AI agents are, what they can actually do for you, and what they cost.

What is an AI agent (in plain English)?
An AI agent is a software program that can understand natural language, make decisions, and take actions on your behalf — automatically.

The simplest example: a WhatsApp bot that answers customer questions, qualifies leads, and books appointments 24 hours a day, 7 days a week.

Real AI agent examples from Orbnix's projects:

1. Real Estate WhatsApp Bot (Delhi client)
Handles 300+ incoming WhatsApp leads daily. Asks qualifying questions (budget, location, timeline), sends property photos, and schedules site visits — all automatically. Result: 80% reduction in support costs.

2. Clinic Appointment Bot (Pune client)
Patients message on WhatsApp → bot checks doctor availability → books appointment → sends reminders. Zero phone calls needed. Result: Staff freed up for actual patient care.

3. E-Commerce Support Bot (Mumbai client)
Answers order status queries, return requests, and product questions. Resolves 70% of queries without human involvement. Result: ₹2.5L/month savings in support costs.

What AI agents can and cannot do in 2025:

Can do:
- Answer FAQ questions 24/7 in any language
- Qualify leads on WhatsApp, Instagram, or website chat
- Schedule and reschedule appointments
- Process basic orders and collect payment
- Send automated follow-ups and reminders
- Generate reports and summaries

Cannot do (yet):
- Fully replace human judgment in complex situations
- Handle completely novel situations outside their training
- Build relationships with high-value clients

What does an AI agent cost in India?
A well-built custom AI agent typically costs ₹40,000–₹1,50,000 depending on complexity. The ROI is usually visible within 60–90 days.

For comparison: One full-time support executive costs ₹15,000–₹25,000/month. A well-built AI agent replaces 60–80% of their routine work and costs the same as 2–3 months of salary to build.

Should YOUR business get an AI agent?
You probably should if:
- You receive 20+ routine customer queries per day
- You miss leads because you can't respond fast enough
- You're paying staff to answer the same questions repeatedly
- You need 24/7 availability but can't afford round-the-clock staff

Want to explore if an AI agent makes sense for your business? We offer a free 30-min consultation. WhatsApp +91 90798 81416.`},
    { id:4,
      title:"Mobile App Development Cost in India 2025 — Flutter vs React Native",
      cat:"Mobile Apps",
      metaDesc:"Complete guide to mobile app development costs in India 2025. Flutter vs React Native comparison. Real quotes from Orbnix — India's remote-first app development agency.",
      time:"7 min", date:"Dec 5, 2025", emoji:"📱",
      body:`Planning to build a mobile app in 2025? Here's everything you need to know about costs, technology choices, and timelines — specifically for Indian businesses.

How much does it cost to build a mobile app in India?

Basic app (1-2 features, simple UI): ₹50,000–₹1,00,000
Moderate complexity (5-8 features, API integration, payments): ₹80,000–₹2,50,000
Complex app (real-time features, AI, custom backend): ₹2,50,000–₹8,00,000+
Enterprise app with ML/AI: ₹8,00,000+

At Orbnix, our mobile app packages start at ₹80,000 for Flutter/React Native apps.

Flutter vs React Native in 2025 — Which should you choose?

Flutter (by Google):
Language: Dart
Performance: Excellent — compiles to native ARM code
UI consistency: Pixel-perfect on both iOS and Android
Best for: Apps with custom design, animations, or games
Our recommendation: Choose Flutter for 80% of projects

React Native (by Meta):
Language: JavaScript/TypeScript
Performance: Good for most apps, slightly behind Flutter for heavy animations
Advantage: If your team already knows JavaScript
Best for: Apps that need to look and feel exactly "native"

Why we default to Flutter at Orbnix:
1. Single codebase works on iOS, Android, and Web — reduces development cost by 30–40%
2. Better performance for animation-heavy apps
3. Google's backing ensures long-term maintenance
4. Dart is easy to learn for most developers

What drives app development costs up:
- Payment integration (Razorpay, Stripe, PhonePe): +₹15,000–₹30,000
- Push notifications setup: +₹10,000–₹20,000
- Admin dashboard: +₹20,000–₹50,000
- App Store and Play Store submission: +₹8,000–₹15,000
- Real-time features (chat, live updates): +₹30,000–₹80,000

Timeline for app development in India:
Simple app: 6–8 weeks
Moderate complexity: 10–14 weeks
Complex/enterprise: 16–24 weeks

What you must demand from your app developer:
1. You own all source code and IP
2. Apps submitted under YOUR developer accounts (not theirs)
3. Complete credentials handed over at project end
4. Clear warranty period for bugs

Ready to discuss your app idea? Get a free quote from Orbnix.`},
    { id:5,
      title:"SEO for Small Businesses in India — 2025 Complete Step-by-Step Guide",
      cat:"Digital Marketing",
      metaDesc:"Complete SEO guide for small businesses in India 2025. Learn how to rank on Google, get more leads, and grow organically. Free checklist included.",
      time:"9 min", date:"Nov 28, 2025", emoji:"🔍",
      body:`If your business isn't showing up on Google's first page, you are invisible. In India, where 93% of purchase decisions begin with a search, SEO is no longer optional — it's the highest-ROI marketing channel available to small businesses.

This guide is written for Indian founders and business owners who want to rank higher, get more inbound leads, and grow without spending crores on ads.

Why SEO is the best marketing investment for Indian businesses in 2025:
Paid ads stop the moment you stop paying. SEO compounds. A well-optimised page can bring you leads for 3–5 years from a single investment. For context, one of our clients gets 800+ organic visitors per month from a blog post we wrote 18 months ago.

Step 1: Google Business Profile (free, highest impact for local businesses)
If you have a physical location or serve customers in a specific city, your Google Business Profile is the single most impactful thing you can set up for free.

Optimise your profile:
- Upload 10+ high-quality photos of your premises, team, and work
- Collect genuine reviews — ask every satisfied customer
- Keep hours, address, website, and phone number 100% accurate
- Post updates at least weekly (Google rewards active profiles)
- Respond to every review, positive and negative

Target result: Appear in the "map pack" — the 3 businesses shown prominently at the top of Google for searches like "[your service] near me" or "[your service] in [city]."

Step 2: Keyword research for Indian audiences
Target keywords your actual customers search, not industry jargon. Use free tools like Google Search Console, Ubersuggest, or AnswerThePublic.

High-intent keyword patterns for Indian businesses:
- "[service] cost in India"
- "best [service] for small business India"
- "[service] company in [your city]"
- "[service] vs [alternative] India 2025"
- "affordable [service] India"

Include target keywords naturally in your page title, H1 heading, first paragraph, meta description, and image alt text.

Step 3: Technical SEO non-negotiables
Page speed: India's average mobile connection is 4G with variable quality. Aim for under 3 seconds on mobile. Test with Google PageSpeed Insights.
HTTPS: Google penalises unsecured (HTTP) sites. Get an SSL certificate — it's free via Let's Encrypt.
Mobile-first indexing: Google's index is mobile-first. If your site looks broken on Android, it will not rank.
Core Web Vitals: Google uses LCP, FID, and CLS as ranking signals. Your developer should know these.

Step 4: Content strategy that ranks
Write blog posts answering the exact questions your customers ask before buying. Proven formats for India:
- "How much does [service] cost in India?"
- "Best [tool/service] for [audience] in India 2025"
- "[Option A] vs [Option B] — which is better for Indian businesses?"
- "How to choose the right [service provider] in India"

Two consistent posts per month beats ten posts in one month. Google rewards consistency over spikes.

Step 5: Link building for Indian businesses
Get listed on: JustDial, IndiaMart, Sulekha, Clutch.co, GoodFirms, Yellow Pages India
Contribute to: Inc42, YourStory, Entrackr, Entrepreneur India (guest posts)
Collaborate with: Complementary businesses and industry associations for mutual links

Realistic SEO timeline for Indian businesses:
Month 1–2: Technical fixes, GBP optimisation, on-page SEO
Month 3–4: First ranking improvements for long-tail keywords
Month 6+: Significant, consistent organic traffic
Month 12+: High-intent keyword rankings generating daily inbound leads

Orbnix provides SEO services for startups and SMEs across India starting at ₹12,000/month. First month includes a full technical audit, keyword research, and competitor analysis.`},
    { id:6,
      title:"E-Commerce Website Cost in India 2025 — Shopify vs WooCommerce vs Custom",
      cat:"E-Commerce",
      metaDesc:"Complete guide to e-commerce website cost in India 2025. Compare Shopify, WooCommerce and custom online store development. Transparent pricing from Orbnix, India's remote-first web development agency.",
      time:"8 min", date:"Nov 20, 2025", emoji:"🛒",
      body:`If you're planning to sell online in India, you have three main choices: Shopify, WooCommerce (WordPress), or a completely custom-built store. Here's an honest comparison.

The bottom line upfront:
For most Indian small businesses: WooCommerce.
For product businesses wanting speed: Shopify.
For unique requirements: Custom.

Detailed comparison:

Shopify:
Monthly cost: $29–$299/month ($348–$3,588/year)
Setup cost with Indian agency: ₹30,000–₹1,20,000
Best for: Businesses with physical products wanting to start fast
India-specific issue: Transaction fees (2%) add up; Indian payment gateways require specific Shopify plan
Limitation: Monthly cost never goes away, even when sales are slow

WooCommerce (WordPress):
Monthly cost: ~₹500–₹1,500/month for hosting
Setup cost: ₹35,000–₹1,50,000
Best for: Indian businesses wanting full control, no monthly platform fee
India advantage: Native integration with Razorpay, PhonePe, Paytm, HDFC Payment Gateway
Flexibility: Can be modified to handle almost any requirement

Custom E-Commerce:
Cost: ₹1,50,000–₹10,00,000+
Timeline: 8–20 weeks
Best for: Businesses with unique workflows, B2B e-commerce, subscription models, or requirements that Shopify/WooCommerce can't handle

What Orbnix recommends for Indian e-commerce businesses:

Start with WooCommerce if:
- You want to keep costs low and own everything
- You need multiple Indian payment gateways
- You have custom product types or configurations
- You're comfortable with WordPress

Choose Shopify if:
- You're selling internationally (Shopify is much stronger for global)
- You want zero technical maintenance
- Your products are straightforward (no complex variants)

Go custom only when:
- Monthly revenue exceeds ₹10–15 lakhs and the platform limits you
- You need B2B features (invoicing, price lists, approvals)
- You're building a marketplace, not just a store

Orbnix e-commerce packages:
- WooCommerce starter: ₹40,000 (includes Razorpay, basic SEO, 20 products)
- Shopify setup: ₹35,000 (theme customisation + Indian payment setup)
- Custom store: From ₹1,50,000

All packages include: Payment gateway integration, mobile-optimised design, basic SEO, WhatsApp order notifications, and 30 days of post-launch support.

Get a free quote for your online store at hello@orbnix.in or WhatsApp +91 90798 81416.`},
    { id:7,
      title:"Why 70% of Indian Startups Choose the Wrong IT Agency (And How to Avoid It)",
      cat:"Business",
      metaDesc:"7 red flags to watch for when hiring an IT company in India. Real advice from Orbnix, India's remote-first web development agency with 50+ projects across India.",
      time:"5 min", date:"Nov 10, 2025", emoji:"🚨",
      body:`After completing 50+ projects across India, we've seen the same mistakes over and over. Here are the biggest red flags to watch for when hiring an IT agency.

Red Flag 1: No clear contract or IP clause
If an agency doesn't have a standard contract that clearly states you own all code and IP, walk away. This is the most common way businesses get trapped.

What to look for: A contract that explicitly says "all intellectual property, source code, designs, and assets created during this engagement become the exclusive property of the client upon full payment."

Red Flag 2: They quote extremely low to win the business
The cheapest quote almost never reflects the actual cost. Agencies that underprice win the project and then either:
a) Cut corners on quality
b) Add "change requests" that inflate the bill
c) Abandon the project when they realise they can't deliver profitably

A fair market rate for a 5-page custom website in India in 2025 is ₹20,000–₹40,000. Anyone quoting ₹5,000 is either a student or is lying to you.

Red Flag 3: No portfolio with live, working projects
Ask for links to websites they've built that are currently live. If they can't provide at least 5 live examples, that's a major concern.

Red Flag 4: They can't explain their tech choices
Ask: "Why are you recommending React over WordPress for my project?" A good agency will give you a clear, honest answer. An agency that just wants your money will say "it's the best technology" without explanation.

Red Flag 5: Payment structure heavily weighted upfront
Legitimate agencies charge 40–50% upfront (for project initiation) and 50–60% on delivery. If an agency wants 80–100% upfront with no milestone payments — that's a red flag.

Red Flag 6: No post-launch support included
Software always has bugs. A good agency includes at least 30 days of free bug fixing after launch. If they charge for every small fix from day one, you'll spend more on support than the project cost.

Red Flag 7: They tell you everything you want to hear
The best agencies will push back on bad ideas. If every single thing you suggest is "great" and "totally possible" — they're not thinking critically about your project.

What to do instead:
1. Ask for 5 live portfolio links
2. Request a fixed quote with clear deliverables
3. Ensure the contract includes IP/code ownership clause
4. Check for milestone-based payments
5. Confirm post-launch support period in writing

Orbnix ticks all these boxes. If you'd like a second opinion on a quote you've received, send it to hello@orbnix.in. We'll give you an honest assessment, free of charge.`},
    { id:8,
      title:"SaaS Product Development in India — What It Actually Costs in 2025",
      cat:"Custom Software",
      metaDesc:"Real breakdown of SaaS development costs in India 2025. How to build a SaaS product from ₹1.5L to ₹25L+. Includes Orbnix's process and tech stack.",
      time:"8 min", date:"Oct 30, 2025", emoji:"⚙️",
      body:`Building a SaaS product is one of the most exciting — and expensive — tech investments a founder can make. Here's an honest breakdown of what it actually costs in India in 2025.

First, what is SaaS?
Software-as-a-Service means software delivered over the internet, typically with a subscription pricing model. Examples: Zoho, Freshdesk, Notion, any tool you pay ₹X/month to use.

If you're building something that multiple businesses or users will pay a recurring subscription for — that's a SaaS product.

SaaS development cost tiers in India:

MVP (Minimum Viable Product):
Cost: ₹1,50,000–₹4,00,000
Timeline: 10–16 weeks
What you get: Core feature set, basic user authentication, one payment integration, admin dashboard
Best for: Validating your idea before full investment

Standard SaaS Product:
Cost: ₹4,00,000–₹12,00,000
Timeline: 16–28 weeks
What you get: Full feature set, multi-tenant architecture, onboarding flow, integrations, mobile-responsive
Best for: Launching a fundable product

Enterprise SaaS:
Cost: ₹12,00,000–₹40,00,000+
Timeline: 6–18 months
Includes: SSO, compliance (SOC2, GDPR), white-labelling, API marketplace, advanced analytics

What makes SaaS development expensive:

1. Multi-tenancy architecture — each customer's data must be isolated
2. Billing and subscription management — Stripe, Razorpay recurring billing
3. Onboarding flows — the user experience from signup to "aha moment"
4. Scalability — the system must handle 10 users and 10,000 users
5. Security — VAPT testing, encryption, audit logs

Orbnix's SaaS tech stack in 2025:
Frontend: Next.js (React), TypeScript, Tailwind CSS
Backend: Node.js with Fastify, or Python with FastAPI
Database: PostgreSQL (primary), Redis (caching), S3 (files)
Auth: NextAuth or Clerk
Payments: Razorpay (India), Stripe (international)
Infrastructure: AWS or GCP, with Terraform for IaC
CI/CD: GitHub Actions, Docker

Case study: FieldPulse SaaS (Bengaluru)
We built a full field-service management SaaS in 14 weeks for ₹3,20,000. The product launched with:
- Multi-tenant architecture supporting 50+ companies
- Mobile app for field agents (Flutter)
- Admin dashboard with analytics
- Razorpay subscription billing
- 99.9% uptime in first 6 months
Result: ₹2 Crore ARR within 6 months of launch.

Before you start building a SaaS product:
1. Validate with real customers (get 5 people to pay before you build)
2. Define your pricing model clearly
3. Identify your must-have vs nice-to-have features for MVP
4. Budget for 6 months of cloud infrastructure costs
5. Plan for ongoing development — SaaS is never "done"

Thinking about building a SaaS product? Start with a free discovery call at Orbnix. We'll help you scope your MVP and give you a realistic budget.`},
    { id:9,
      title:"Flutter vs React Native in 2025 — Which Is Better for Indian Apps?",
      cat:"Mobile Apps",
      metaDesc:"Flutter vs React Native: honest comparison for Indian app developers and startups in 2025. Performance, cost, hiring, community — everything you need to decide.",
      time:"7 min", date:"Oct 15, 2025", emoji:"📱",
      body:`If you're building a mobile app in India in 2025, you'll almost certainly choose between Flutter and React Native. Both are excellent cross-platform frameworks that let you build iOS and Android apps from a single codebase. Here's the honest comparison.

Our verdict upfront:
For most Indian startups and SMEs: Flutter.
For teams with existing React/JavaScript expertise: React Native.

Why we recommend Flutter for most projects:

1. Superior performance
Flutter compiles to native ARM code — it doesn't use a JavaScript bridge. This means smoother animations, faster load times, and better performance on lower-end Android devices (which is critical in India where many users have mid-range phones).

2. Consistent UI across Android & iOS
Flutter renders its own UI components — so your app looks identical on Samsung, OnePlus, Xiaomi, and iPhone. React Native uses native components, which can look and behave slightly differently across devices.

3. Strong community in India
The Flutter developer community in India is significantly larger than React Native. This means easier hiring, more tutorials in Hindi/regional languages, and more local conference resources.

4. Better for animations and custom UI
If your app needs custom animations, games, or highly designed interfaces — Flutter handles this far better than React Native.

When React Native makes more sense:

- Your team already knows React/JavaScript deeply
- You're integrating many third-party web libraries
- You need to share significant code logic with an existing web app (Next.js)
- You're working with a large existing React Native codebase

Real cost comparison for India:

Flutter app (single developer, 3 months): ₹1,50,000–₹3,50,000
React Native app (single developer, 3 months): ₹1,50,000–₹3,50,000

Cost is roughly equal. The difference is in developer availability: Flutter developers in India are more plentiful and increasingly experienced.

What Orbnix uses: We default to Flutter for all new mobile projects, with React Native when specifically requested or when code sharing with web is a priority. All our mobile apps support iOS 13+ and Android 6+.

Ready to build your app? We deliver Flutter apps starting at ₹80,000. WhatsApp +91 90798 81416 for a free scope assessment.`},
    { id:10,
      title:"Google Core Web Vitals — Why Your Indian Business Website Is Failing (And How to Fix It)",
      cat:"Web Development",
      metaDesc:"Core Web Vitals explained for Indian businesses 2025. Why LCP, FID, and CLS hurt your Google rankings and exactly how to fix them. Free checklist included.",
      time:"6 min", date:"Oct 5, 2025", emoji:"⚡",
      body:`Since 2021, Google has used Core Web Vitals as a direct ranking signal. Most Indian business websites fail these metrics badly — and their owners have no idea. Here's everything you need to know.

What are Core Web Vitals?

Core Web Vitals are three metrics Google uses to measure user experience:

LCP (Largest Contentful Paint) — How fast does the main content load?
Target: Under 2.5 seconds. Fail: Over 4 seconds.
Most Indian websites fail this because of uncompressed images and shared hosting.

FID (First Input Delay) / INP (Interaction to Next Paint) — How fast does the page respond to clicks?
Target: Under 200ms. Fail: Over 500ms.
Most Indian websites fail this because of excessive JavaScript from plugins and tracking scripts.

CLS (Cumulative Layout Shift) — Does the page jump around as it loads?
Target: Under 0.1. Fail: Over 0.25.
Most Indian websites fail this because of ads, banners, and fonts loading after the page appears.

Why this matters for your Google ranking:
Pages that pass Core Web Vitals rank measurably higher than pages that fail — especially on mobile. In India, where 78%+ of searches happen on mobile, this directly impacts whether customers find you or your competitor.

How to check your scores:
1. Go to PageSpeed Insights (free, by Google)
2. Enter your URL
3. Look at the "Field Data" section
4. Green = pass. Orange = needs improvement. Red = fail.

The 5 most common fixes for Indian websites:

1. Compress all images
Use WebP format instead of JPG/PNG. Images should be under 100KB for most pages.
Tools: Squoosh.app (free), Cloudinary (for dynamic images)

2. Switch to faster hosting
Most Indian websites are on cheap shared hosting. Move to:
- Vercel (free tier works for most sites)
- DigitalOcean ($12/month droplet)
- Hostinger Cloud (₹300/month)

3. Reduce JavaScript
Every plugin you add to WordPress loads more JavaScript. Audit your plugins — most sites have 20+ plugins when 5 would do.

4. Use a CDN
Content Delivery Network serves your images from servers closest to the user. Cloudflare's free plan is excellent for Indian websites.

5. Fix font loading
Add font-display: swap to your CSS and preload critical fonts. This prevents invisible text while fonts load.

Realistic timeline for Core Web Vitals improvement:
A website rewritten on React + Next.js by Orbnix passes Core Web Vitals on day one. Fixing an existing WordPress site typically takes 1–2 weeks of dedicated work.

Our websites consistently score 90+ on PageSpeed Insights. If yours doesn't, let's talk.`},
    { id:11,
      title:"WhatsApp Marketing for Indian Businesses in 2025 — Complete Strategy Guide",
      cat:"Digital Marketing",
      metaDesc:"WhatsApp marketing strategy for Indian businesses 2025. How to set up WhatsApp Business API, run broadcasts, and automate follow-ups. Real examples and costs.",
      time:"8 min", date:"Sep 25, 2025", emoji:"💬",
      body:`India has 500+ million WhatsApp users. It's the single most effective marketing channel for Indian businesses — with 98% open rates vs 22% for email. Here's how to use it properly in 2025.

Why WhatsApp is India's #1 marketing channel:
- 98% message open rate (vs 22% email, 5% social media)
- Indians check WhatsApp 23+ times per day on average
- Customers trust and expect WhatsApp communication
- Direct, personal channel — no algorithm throttling

WhatsApp Business vs WhatsApp Business API — what's the difference?

WhatsApp Business App (free):
Good for: Very small businesses, up to 500 contacts
Limitations: Manual sending, one device only, no bulk broadcast to large lists, no automation
Install from Play Store, set up catalogue, done.

WhatsApp Business API (paid):
Good for: Any business with 500+ customers
Enables: Broadcast to unlimited contacts, automated flows, chatbots, CRM integration, analytics
Cost: ₹0.20–₹0.80 per conversation depending on type and volume
Required: Business verification, Meta Business Manager account

How to build a WhatsApp marketing strategy:

Step 1: Build your opt-in list properly
Contacts must opt in — you cannot message people who haven't consented. Build your list via:
- "Send us a WhatsApp for 10% off" on your website
- QR code at your physical location
- "Reply YES to get exclusive deals" after a purchase
- Lead magnets (free guide → WhatsApp to receive it)

Step 2: Set up automated welcome flow
New contact → instant welcome message → ask what they need → route to right team or bot

Step 3: Broadcast campaigns (the real money)
Monthly/weekly broadcasts to your opt-in list:
- Festival offers (Diwali, Holi, Eid, Christmas)
- New product launches
- "Limited slots this month" urgency campaigns
- Re-engagement for dormant contacts

Step 4: WhatsApp Drip sequences
Like email drips but on WhatsApp:
Day 1: Welcome + what to expect
Day 3: Your best case study
Day 7: Specific offer with deadline
Day 14: "Last chance" reminder
Day 30: Check-in message

Real numbers from Orbnix clients:
- E-commerce client: 34% conversion rate on festival broadcast (vs 2% email)
- Real estate client: ₹85L in sales from single WhatsApp campaign
- Salon: 89% appointment confirmation rate via WhatsApp reminders (vs 40% phone)

What Orbnix can build for you:
Full WhatsApp Business API setup + CRM integration: ₹25,000 one-time
Monthly broadcast management + automation: ₹8,000/month
AI-powered WhatsApp bot (answers queries + qualifies leads): from ₹40,000

Ready to turn WhatsApp into your best sales channel? WhatsApp us (obviously) at +91 90798 81416.`},
    { id:12,
      title:"No-Code vs Custom Development — What's Right for Your Indian Startup in 2025?",
      cat:"Web Development",
      metaDesc:"No-code tools vs custom development for Indian startups 2025. When to use Webflow, Bubble, or Framer — and when you need custom code. Honest guide from Orbnix.",
      time:"6 min", date:"Sep 15, 2025", emoji:"🔧",
      body:`"Should I use Webflow or build it custom?" is one of the most common questions Indian founders ask us. The answer isn't as simple as "custom is always better." Here's how to think about it.

The honest truth about no-code in 2025:
No-code tools have become genuinely good. For the right use case, they can get you live in days rather than weeks — at a fraction of the cost. For the wrong use case, they'll hit a ceiling that costs you more to rebuild later than just building right the first time.

When No-Code is the right answer:

Use Webflow when:
- You need a marketing website (landing pages, company site, blog)
- You want the client to edit content without a developer
- Timeline is critical (launch in 1 week)
- Budget is under ₹15,000
- You don't need user accounts, complex logic, or external API integrations

Use Bubble when:
- You're building an MVP web application
- You want to validate your idea before investing in custom development
- Your app's logic is relatively standard (CRUD operations, user roles, basic workflows)
- Timeline matters more than performance at this stage

Use Framer when:
- You're building a stunning portfolio or creative studio site
- Design is your primary differentiator
- You need complex animations without custom CSS

When Custom Development is the right answer:

You need custom when:
- You have specific performance requirements (Core Web Vitals, SEO-critical)
- Your business logic is complex or unique
- You need custom integrations with Indian systems (GST APIs, bank APIs, OTP services)
- You're building something users will rely on daily
- You expect to scale to thousands of concurrent users
- You want 100% code ownership with no platform dependency

The real cost comparison for India:

Webflow site: ₹12,000–₹25,000 setup + ₹1,500–₹4,000/month hosting
Custom React site: ₹25,000–₹55,000 setup + ₹500–₹2,000/month hosting

Bubble MVP app: ₹20,000–₹50,000 setup + ₹2,500–₹8,000/month platform fee
Custom web app: ₹80,000–₹3,00,000 setup + ₹1,000–₹5,000/month infrastructure

Orbnix's recommendation:
Start no-code, plan to go custom. Launch on Webflow or Bubble to validate. Once you have revenue and product-market fit, rebuild on custom code for performance, scalability, and ownership.

We offer both. Our No-Code Rapid Launch starts at ₹12,000 (live in 5–7 days). Our custom React websites start at ₹25,000. We'll tell you honestly which is right for where you are today.`},
    { id:13,
      title:"Best Web Development Company in Mumbai — Top 5 Agencies Compared (2025)",
      cat:"Web Development",
      metaDesc:"Looking for a web development company in Mumbai? Compare the top 5 agencies by pricing, quality, and reviews. Orbnix offers custom websites from ₹25,000 with 100% code ownership.",
      time:"6 min", date:"Sep 5, 2025", emoji:"🏙️",
      body:`Mumbai is India's business capital — and finding the right web development company here is critical. With thousands of agencies in the city, from Andheri to BKC to Lower Parel, the choices are overwhelming and the quality wildly varies.

This guide compares what you should look for when choosing a Mumbai web development partner, and where Orbnix fits in.

What makes Mumbai businesses unique from a web perspective:

1. Competition is fierce. Mumbai markets are highly competitive — whether you're in finance, real estate, retail, or F&B. Your website can't just look good; it has to convert.

2. Mobile-first is non-negotiable. Mumbai has one of India's highest smartphone penetration rates. Over 80% of your customers will view your site on a phone.

3. Speed matters more here. Mumbai users are impatient. Research shows that Mumbai-based users have higher bounce rates than any other Indian city when pages load slowly.

What to look for in a Mumbai web development company:

Transparent pricing: Many Mumbai agencies have opaque pricing and bill by the hour. Demand a fixed-price quote before any work starts.

React/Next.js capability: If they're building on WordPress with a ₹3,000 theme, your site will be slow and hard to customise.

India-specific payment integration: Razorpay, PhonePe, PayU — your Mumbai customers expect UPI.

Post-launch support: Mumbai businesses move fast. You need a team that responds within hours, not days.

Why Mumbai businesses choose Orbnix:

We work 100% remotely — which means you get a dedicated senior team without the overheads of a physical Mumbai office. Our rates reflect this.

Typical outcomes for Mumbai clients:
- E-commerce clients: Average 40–60% improvement in mobile conversion rates
- Real estate portals: 3x increase in WhatsApp leads in first 90 days
- Restaurant sites: Online orders exceed walk-in revenue within 60 days

Our Mumbai-specific experience: We've delivered websites and apps for clients in South Mumbai, Bandra, Andheri, Powai, BKC, and Navi Mumbai.

Ready to build with us? WhatsApp +91 90798 81416 or email hello@orbnix.in. Quote delivered in 24 hours.`},
    { id:14,
      title:"Best Web Development Company in Bengaluru — What Startups Actually Need in 2025",
      cat:"Web Development",
      metaDesc:"Searching for a web development company in Bengaluru? Here's what Bengaluru startups need from a tech partner in 2025 — with honest pricing and quality comparison.",
      time:"5 min", date:"Aug 25, 2025", emoji:"🌆",
      body:`Bengaluru is India's startup capital. If you're building here — in Koramangala, HSR Layout, Indiranagar, or anywhere in the Bengaluru tech ecosystem — your standards for tech partners are higher than average.

This guide covers what Bengaluru startups and tech companies should expect from a web development partner, and why an increasing number of Bengaluru founders are choosing remote-first agencies over local ones.

What Bengaluru startups specifically need:

1. SaaS-capable development teams
Many Bengaluru companies aren't just building websites — they're building software products. You need a team that understands multi-tenant architecture, subscription billing, and API-first design.

2. Investor-ready design
If you're fundraising, your website is part of the pitch. Bengaluru investors judge technical credibility partly by the quality of your public-facing product.

3. Integration-first thinking
Bengaluru tech stacks are complex. Your new website or app needs to talk to Salesforce, HubSpot, Razorpay, Slack, or whatever tools are in your existing stack.

4. Post-launch velocity
Bengaluru moves fast. You need a tech partner who can ship an MVP in 6 weeks, then iterate weekly — not one who disappears after launch.

The case for a remote-first agency (vs a Bengaluru office agency):

Bengaluru has some of India's highest rent and talent costs. Local agencies pass these costs to you. Remote-first agencies like Orbnix operate leaner — so you get senior-level talent at significantly lower rates.

Orbnix's Bengaluru portfolio:
- FieldPulse SaaS: Built in 14 weeks, ₹2Cr ARR in 6 months
- EdTech platform for 10,000+ students
- Real estate portal with AI lead qualification bot

Our services are especially popular with Bengaluru-based:
- Early-stage startups (pre-seed to Series A)
- D2C brands scaling beyond ₹1Cr/month
- B2B SaaS companies building their first public-facing product

Book a free discovery call: hello@orbnix.in or WhatsApp +91 90798 81416.`},
    { id:15,
      title:"Web Development Costs in Delhi & NCR — Complete Guide for Businesses (2025)",
      cat:"Web Development",
      metaDesc:"How much does a website cost in Delhi NCR in 2025? Honest guide to web design pricing in Delhi, Gurgaon, and Noida — from freelancers to premium agencies.",
      time:"6 min", date:"Aug 15, 2025", emoji:"🏛️",
      body:`If you're a Delhi or NCR business looking to build a website or app, you've probably got quotes ranging from ₹8,000 to ₹3,00,000. Here's how to make sense of that range — and what you actually need to pay for quality in 2025.

The Delhi NCR web development market:

Delhi, Gurgaon, and Noida have a massive web development market — from individual freelancers in Lajpat Nagar to large IT companies in Cyber City. The range of quality and pricing is enormous.

What different price points get you in Delhi NCR:

₹5,000–₹15,000:
Template-based, usually WordPress with a free theme. Works for basic info sites. Not mobile-optimised, slow loading, impossible to customise properly. No SEO, no Google ranking potential.

₹15,000–₹40,000:
Custom-designed WordPress or basic React site. Reasonable for small businesses. Check if they include mobile optimisation, Google analytics setup, and at least 30 days support.

₹40,000–₹1,50,000:
This is where real quality begins. Custom React/Next.js development with proper architecture. Should include performance optimisation, SEO setup, CMS, and proper handover.

₹1,50,000+:
Full custom applications, SaaS products, complex e-commerce, or enterprise portals.

Delhi NCR-specific considerations:

B2B focus: Delhi NCR has India's highest concentration of B2B businesses — manufacturing, import/export, professional services. Your website needs to be credible for international buyers.

Hindi/bilingual content: Many Delhi NCR businesses need Hindi-language websites or bilingual support. Make sure your agency can handle this.

Government sector: Startups serving government clients need GIGW (Government of India Website Guidelines) compliance. Check if your agency knows what this is.

Why Delhi NCR businesses choose Orbnix:

100% remote means you get quality without the Gurgaon premium. We've served clients in Connaught Place, Cyber City, Noida Sector 62, and Greater Noida.

Our Delhi NCR client results:
- Horizon Realty: 300+ WhatsApp leads daily via AI bot
- Logistics company: 45% reduction in phone inquiries after self-service portal launch
- Export business: International credibility improved, 3 new UK clients in first 60 days

Get your free quote: hello@orbnix.in · WhatsApp +91 90798 81416`},

    { id:7,
      title:"Best Website for Clinics and Hospitals in India 2025 — Complete Guide",
      cat:"Healthcare",
      metaDesc:"Does your clinic need a website? Orbnix builds doctor websites with online appointment booking, WhatsApp integration and Google ranking from ₹25,000. Free quote in 24 hrs.",
      time:"6 min", date:"Jan 5, 2026", emoji:"🏥",
      body:`If you run a clinic, hospital, or private practice in India, your patients are searching for you online right now — and if you don't have a proper website, they're booking with your competitor.

This guide covers everything you need to know about getting a professional clinic website in India in 2025.

Why Does Your Clinic Need a Website?

1. Patients search online first
Google "best dentist in [your city]" right now. If you're not in the top results, you're invisible to hundreds of potential patients every month. A well-built, SEO-optimized website puts you there.

2. Reduce phone call volume by 60-80%
Most patient calls are about appointment availability, fees, and directions. A website with an online booking system answers all of these automatically. Our client MediBook Clinic reduced staff phone time by 80% after launching their website.

3. Build trust before the first visit
Patients make decisions about doctors based on trust. A professional website with doctor credentials, patient testimonials, and clear service information builds that trust before they even walk through your door.

What should a clinic website include?

Doctor profiles with qualifications and experience. Patients want to know who they're seeing — MBBS, MD, years of experience, specialisation. This is non-negotiable.

Online appointment booking. This should connect to your calendar (or WhatsApp) so patients can book without calling. For busy clinics, this alone is worth the entire website cost.

Service list with pricing transparency. Many patients in India choose doctors partly on cost. Clear pricing (at least ranges) reduces awkward fee discussions and filters in the right patients.

Patient reviews and testimonials. Google Reviews integration or manual testimonials. Social proof is critical in healthcare — people ask family and friends, but they also Google.

Location and timings. Sounds obvious but many clinic websites get this wrong. Use an embedded Google Map. List timings for every day of the week.

Mobile-first design. 78% of health-related searches in India happen on mobile. Your website must load fast and work perfectly on a ₹8,000 Android phone.

How much does a clinic website cost in India?

Basic clinic website: ₹15,000–25,000 — responsive design, doctor profiles, contact form, Google Map.
With appointment booking: ₹30,000–50,000 — online calendar, WhatsApp booking, SMS reminders.
With patient portal: ₹60,000–1,00,000 — prescription history, lab reports, payment gateway.

At Orbnix, our healthcare packages start at ₹25,000 and include mobile-first design, WhatsApp booking, and basic SEO setup.

What makes Orbnix right for your clinic?

We have built websites for clinics across India — from solo practitioners in Tier 3 cities to multi-specialty hospitals in metros. We understand NABH guidelines, the importance of patient confidentiality in content, and the trust signals that matter in Indian healthcare.

All our clinic websites include: 100% mobile responsive, WhatsApp booking integration, Google Business Profile setup, local SEO, and 30-day post-launch support.

Free consultation: hello@orbnix.in · WhatsApp +91 90798 81416`},

    { id:8,
      title:"School and College Website Design in India — What Parents Actually Look For",
      cat:"Education",
      metaDesc:"Need a school website in India? Orbnix builds CBSE and ICSE school websites with admissions portals, fee payment, results and parent communication from ₹25,000.",
      time:"5 min", date:"Jan 12, 2026", emoji:"🏫",
      body:`When parents search for schools for their children in India, your website is the first impression. Studies show parents spend an average of 8 minutes on a school website before deciding whether to call for a tour. Here's what they're looking for — and what most school websites get wrong.

What Parents Look for on a School Website

1. Admissions process — clearly explained
Parents want to know: What documents are needed? What are the fee structures? When does admission open? What is the selection process? Most school websites hide this information or bury it in PDFs from 2019. This is a huge missed opportunity.

2. Board results and academic track record
Parents in India are intensely focused on results. Your Class X and XII board results, toppers' names, and overall pass percentages should be front and centre. If your school consistently produces 90%+ scores, this is your biggest selling point.

3. Facilities and infrastructure
Swimming pool? Computer labs? Smart classrooms? Air-conditioned buses? Parents compare schools on these. A dedicated facilities page with photos and specifications converts enquiries into admissions.

4. Fee structure (at least approximate)
Many schools hide fees to force enquiry calls. This backfires — parents move on to schools that are upfront. You don't need to list every line item, but a ballpark figure for each class saves everyone time.

5. Teacher profiles and qualifications
Trust in teachers is fundamental. Brief profiles with qualifications and experience reassure parents that their children will be in capable hands.

6. Events and achievements
Sports day, science fair, cultural events, student achievements in competitions — these build a picture of school culture that fees and ranks can't communicate.

What most school websites get wrong

They are not mobile-friendly. More than 80% of school research in India happens on smartphones. If your website is not mobile-optimized, you are losing half your prospective parents.

They are not updated. A school website showing "Admissions Open 2022-23" in 2025 destroys credibility instantly.

They have no enquiry tracking. Good school websites capture leads — name, class, contact number — and feed them into a follow-up system. Most school websites just have a contact email that nobody checks.

How much does a school website cost in India?

Basic school website (5-10 pages): ₹20,000–35,000
With admissions portal and enquiry CRM: ₹40,000–65,000
With fee payment, results portal, parent login: ₹80,000–1,50,000

Orbnix builds school websites across India with online admissions, results display, fee structure pages, and Google-optimized SEO so parents in your city find you first.

Get a free quote: hello@orbnix.in · WhatsApp +91 90798 81416`},

    { id:9,
      title:"Hotel Website That Reduces OTA Commission — Direct Booking Guide for Indian Hotels",
      cat:"Hospitality",
      metaDesc:"Every booking via OYO or MakeMyTrip costs you 15-25% commission. Orbnix builds direct booking hotel websites from ₹35,000 that pay for themselves in the first month.",
      time:"7 min", date:"Jan 18, 2026", emoji:"🏰",
      body:`If you own a hotel, resort, homestay, or boutique property in India, Online Travel Agencies (OTAs) like MakeMyTrip, OYO, Goibibo, and Booking.com are eating 15–25% of every booking you make. On a ₹3,000/night room, that is ₹450–750 per booking — gone.

A professional hotel website with direct booking capability is the single highest-ROI investment a hotel can make in India right now.

The Math is Simple

Average room rate: ₹3,500/night
OTA commission: 20% = ₹700/booking
Rooms per month: 40 bookings
Monthly OTA fees: ₹28,000

A well-built direct booking website costs ₹35,000–50,000 total. It pays for itself in the first month if it captures just 5–6 additional direct bookings. Everything after that is pure profit.

What a hotel website needs to convert browsers to bookers

1. Beautiful room photography (or 3D virtual tours)
This is not a place to cut costs. Hire a hotel photographer for ₹5,000–8,000. Good photos will increase your booking conversion rate by 40–60%. Budget for this before the website.

2. Real-time room availability calendar
Guests must be able to see available dates instantly. If they cannot check availability without calling you, they will go to MakeMyTrip. Integrate a booking engine (we use ResAvenue, Staah, or custom-built options).

3. Direct booking incentives
Your website must clearly offer something OTAs cannot: free breakfast, airport pickup, early check-in, room upgrade. This is the #1 reason guests book direct. Promote it prominently.

4. GST-compliant invoice generation
For business travellers booking directly, automated GST invoices are a significant convenience advantage. Your direct booking system should handle this automatically.

5. Review integration
TripAdvisor and Google Reviews embedded on your website. Travellers trust peer reviews over hotel marketing copy.

Types of hotel websites Orbnix builds

Boutique hotels and heritage properties: Emphasis on story, visuals, and experience. Pricing: ₹35,000–60,000.
Budget and business hotels: Clean, fast, conversion-focused. Integrated OTA price comparison to show your direct rate is best. Pricing: ₹25,000–40,000.
Resorts and destination properties: Full experience — rooms, dining, activities, events, spa. Wedding and corporate enquiry portals. Pricing: ₹50,000–1,20,000.

Our hospitality client Royal Haveli in Jaipur moved 35% of bookings to direct in 4 months, saving ₹18 lakhs annually in OTA commissions.

Ready to start saving on commissions? hello@orbnix.in · WhatsApp +91 90798 81416`},

    { id:10,
      title:"Website for CA Firms and Chartered Accountants in India — Complete 2025 Guide",
      cat:"Professional Services",
      metaDesc:"CA firm website from ₹20,000. Orbnix builds GST, ITR and audit service websites for chartered accountants across India. SEO-optimized to rank for local CA searches.",
      time:"5 min", date:"Jan 25, 2026", emoji:"⚖️",
      body:`If you are a Chartered Accountant or run a CA firm in India, you are probably getting most of your clients through referrals. That is great — but referrals have a ceiling. A professional website opens a completely new channel: clients who are actively searching for a CA right now in your city.

The Opportunity for CA Firms Online

Every month in India, thousands of people search terms like:
- "CA near me [city name]"
- "GST registration [city name]"
- "ITR filing online India"
- "Company registration CA [city name]"
- "Tax audit services [city name]"

If your firm does not have a website, you are invisible to all of them. Your competitor with a basic WordPress site from 2018 is getting these leads for free.

What a CA firm website must include

Service pages for each practice area. GST, Income Tax, Audit, Company Registration, FEMA — each should have its own page with a detailed description. This is critical for SEO. Do not put all services on one page.

Transparent pricing (at least ranges). Clients searching online often shortlist based on approximate cost before calling. Showing "ITR Filing: starting ₹1,500" filters in the right clients and saves your reception staff dozens of screening calls per day.

Partner and team profiles. ICAI membership number, qualifications, years of experience. In CA services, credentials are the product. Show them prominently.

Tax calendar and compliance deadlines. A regularly-updated tax calendar page (GST deadlines, ITR deadlines, TDS due dates) positions you as an expert and is excellent for SEO — clients bookmark it and return to your site monthly.

Client testimonials. Business owners trust other business owners. 4-5 genuine testimonials about specific problems you solved (saved ₹X in tax, got GST registration in 3 days) are worth more than any marketing copy.

Online enquiry form with service selector. Let prospects tell you what they need before the first call. This dramatically improves your sales conversation quality.

Local SEO for CA firms

The most valuable thing your website can do is rank for "[service] + [your city]" queries. This requires:
- Google Business Profile setup and verification (free, critical)
- Location-specific content (a page that mentions your city name and area)
- Client reviews on Google (ask every satisfied client — this is free marketing)
- Schema markup for local business (we add this to all our CA firm websites)

A well-optimized CA website in a city like Jaipur can rank on page 1 for "CA firm Jaipur" within 3-4 months with consistent content.

Investment required

Basic CA firm website (8-12 pages): ₹20,000–30,000
With lead capture, WhatsApp integration, tax calendar: ₹30,000–45,000
With client portal for document sharing: ₹50,000–80,000

Get a quote for your CA firm: hello@orbnix.in · WhatsApp +91 90798 81416`},

    { id:11,
      title:"Portfolio Website for Architects and Interior Designers in India — 2025 Guide",
      cat:"Architecture",
      metaDesc:"Orbnix builds stunning architect portfolio websites with project galleries and client enquiry systems from ₹25,000. Rank on Google for architect searches in your city.",
      time:"5 min", date:"Feb 2, 2026", emoji:"✏️",
      body:`As an architect or interior designer in India, your work speaks for itself — but only if people can see it. A well-designed portfolio website is the difference between getting high-value residential and commercial projects and being limited to whoever walks in through referrals.

Why Architects and Designers Need a Professional Website in India

High-net-worth clients Google you. Before calling an architect for a ₹50 lakh home renovation, clients Google you extensively. They look at your portfolio, read about your design philosophy, check your credentials. If you only have an Instagram profile, serious clients move on.

Instagram is not enough. Instagram gives you reach, but no credibility depth. Clients cannot read about your process, download a brochure, or submit a project brief on Instagram. Your website is your digital studio — Instagram just drives traffic to it.

Project Google searches. "Best architect [city name]", "interior designer for office [city name]", "luxury home architect Rajasthan" — these are search queries with real intent behind them. A website gets you there.

What makes an architect website convert

1. Project showcase with context
Do not just show photos. For each project: describe the brief, the challenge, the design solution, materials used, area, location, and year. Clients are not buying photos — they are buying your problem-solving process.

2. Project categories
Residential, commercial, hospitality, institutional, heritage restoration. Clients want to see you have done their project type before. Categorise your portfolio clearly.

3. Your design philosophy
A 200-word statement about how you approach design. This attracts aligned clients and repels mismatched ones (saving you time on bad-fit projects).

4. Easy enquiry process
A simple form: project type, budget range, location, timeline. Pre-qualifies leads so you only get on calls with serious prospects.

5. COA registration and credentials
Council of Architecture registration, educational qualifications, awards, publications. Displayed prominently — these differentiate you from unauthorized "designers."

6. 3D rendering showcase
If you do photorealistic 3D renders, these are your most powerful sales tool. Showcase them prominently — they demonstrate technical capability and help clients visualize their project.

SEO for architects in India

Target keywords: "residential architect [city]", "interior designer [area/city]", "luxury home design [state]", "office interior designer [city]". These have genuine search volume and buyer intent.

Orbnix architect websites: From ₹25,000. Includes portfolio gallery with filtering, project detail pages, Google-optimized structure, and WhatsApp enquiry integration.

See a live demo or get a quote: hello@orbnix.in`},

    { id:12,
      title:"B2B Website for Indian Manufacturers and Exporters — Get International Buyers Online",
      cat:"Manufacturing",
      metaDesc:"Orbnix builds B2B manufacturer websites for Indian factories and exporters. Get found by international buyers on Google. Starting ₹30,000. Free consultation.",
      time:"6 min", date:"Feb 10, 2026", emoji:"🏭",
      body:`India is the world's factory floor for hundreds of product categories — from precision engineering to textiles, pharmaceuticals to handicrafts. But here is the problem: most Indian manufacturers and exporters are invisible online. They rely on agents, IndiaMART, and trade fairs. That is expensive, slow, and gives you zero control.

A professional B2B manufacturer website gives international and domestic buyers the ability to find you, evaluate your capabilities, and contact you directly — 24 hours a day, in any time zone.

What international buyers look for on a manufacturer website

1. Product catalogue with technical specifications
International buyers need product names, material grades, tolerances, dimensions, and finish options — not just photos. A well-structured product catalogue with downloadable technical datasheets is critical for getting serious RFQs.

2. Manufacturing certifications
ISO 9001, ISO 14001, CE Marking, BIS, REACH compliance, DGFT/IEC code — these need to be displayed prominently with valid dates. International buyers filter out manufacturers without verifiable certifications before sending an RFQ.

3. Production capacity and lead times
"We can produce 50,000 units/month with 7-day lead time for standard items" — buyers need to know if you can handle their volumes. A capacity page with your plant area, equipment list, and monthly capacity builds confidence.

4. Export experience and countries served
List the countries you already export to. "Supplying to Germany, USA, UAE, UK, Singapore since 2010" removes perceived risk dramatically for new buyers.

5. Quality control process
Incoming material inspection, in-process quality checks, final inspection protocols, testing equipment available. Buyers want to know how you ensure quality before they place a ₹50 lakh order.

6. RFQ form
Make it easy to send an enquiry: product name, quantity, delivery location, timeline, drawing/specification upload. A smooth RFQ process converts visitors into genuine business leads.

SEO strategy for Indian manufacturers

Target keywords: "[product name] manufacturer India", "[product] supplier India export", "[product] factory Rajasthan/Gujarat/Punjab" etc. These have excellent international buyer intent.

We have helped Indian manufacturers rank for their specific product keywords and receive RFQs from international buyers in Germany, the UAE, and the USA within 60 days of website launch.

Investment: ₹30,000–60,000 depending on product range and complexity. Always includes export SEO setup, Google-indexed product pages, and multi-currency enquiry handling.

Talk to us about your manufacturing business: hello@orbnix.in · WhatsApp +91 90798 81416`},

    { id:13,
      title:"Websites for Car Dealers, Pharmacies, Logistics & More — All Industries India 2025",
      cat:"Business",
      metaDesc:"Orbnix builds websites for car dealers, pharmacies, logistics companies, gyms, wedding planners, solar firms, insurance brokers, and 50+ industries across India. Free quote.",
      time:"6 min", date:"Mar 5, 2026", emoji:"🏢",
      body:`Orbnix builds professional websites for every type of business in India. Here is a quick overview of what we build for industries that are frequently asking us:

Car Dealers & Automobile Showrooms
A vehicle listing website with on-road price pages, EMI calculator, test drive booking form, and WhatsApp lead capture. Each model gets its own SEO page that ranks for "[model name] [city]" searches. We also build used car portals with dealer logins.

Pharmacies & Medical Stores (Chemists)
Local SEO-optimized pharmacy websites that rank for "pharmacy near me [area]" and "medicine delivery [city]". Includes WhatsApp order button, prescription upload, delivery area map, and CDSCO drug license display for trust. Helps pharmacies compete against PharmEasy and NetMeds in local search.

Logistics & Transport Companies
Websites for freight forwarders, courier companies, trucking operators, and warehousing firms. Includes route coverage map, fleet showcase, instant RFQ form, and GST/IEC compliance display. Ranks for "logistics company India", "transport service [route]" and "part load transport [city]" queries.

Gyms & Fitness Centres
Membership plan showcase, class timetable, trainer profiles, online membership enquiry, and Google Maps integration. Designed to rank for "gym near me", "fitness centre [city]", "gym membership [area]".

Wedding Planners & Event Management
Portfolio with past events, service packages (wedding, corporate, birthday), vendor network listing, and enquiry form with date/budget selector. Ranks for "wedding planner [city]", "event management company [city]".

Solar & Renewable Energy Companies
Solar panel product catalogue, EMI/savings calculator (how much you save vs grid power), installation service area, subsidy information (PM Surya Ghar scheme), and B2B commercial enquiry form. Ranks for "solar panel installation [city]", "solar company India".

Insurance Brokers & BFSI
Policy comparison tools, lead capture forms for term/health/motor insurance, IRDAI registration display, and calculator widgets. Ranks for "insurance agent [city]", "term insurance online India".

Agriculture & Agritech Companies
Product catalogues for seeds, pesticides, farming equipment, or agritech SaaS. Multi-language support (Hindi, regional languages). Kisan helpline integration. B2B bulk order forms for distributors.

Music & Dance Academies
Course listings, faculty profiles, student testimonials, online admission form, recital gallery, and Google Maps. Ranks for "music classes [city]", "dance academy [area]", "guitar classes near me".

NGOs & Charitable Trusts
Donation portal with Razorpay/UPI integration, project impact showcase, FCRA/80G certificate display for donor trust, volunteer registration, and annual report downloads.

For any business category not listed here — we have likely already built something similar. Start with a free consultation and we will show you examples from your industry.

Contact: hello@orbnix.in · WhatsApp +91 90798 81416`},
  ];
  // Article schema — hook must be unconditional (Rules of Hooks)
  const activePost = active !== null ? posts.find(p=>p.id===active) : null;
  useEffect(()=>{
    if (!activePost) return;
    let ld=document.querySelector('#orbnix-article-ld');
    if(!ld){ld=document.createElement('script');ld.id='orbnix-article-ld';ld.type='application/ld+json';document.head.appendChild(ld);}
    ld.textContent=JSON.stringify({"@context":"https://schema.org","@type":"Article","headline":activePost.title,"description":activePost.metaDesc,"author":{"@type":"Organization","name":"Orbnix","url":"https://orbnix.in"},"publisher":{"@type":"Organization","name":"Orbnix","logo":{"@type":"ImageObject","url":"https://www.orbnix.in/logo.png"}},"datePublished":activePost.date,"dateModified":activePost.date,"mainEntityOfPage":{"@type":"WebPage","@id":`https://orbnix.in/blog/${activePost.id}`}});
    return()=>{const el=document.querySelector('#orbnix-article-ld');if(el)el.remove();};
  },[active]);
  if (active !== null) {
    const post = activePost;
    const related = posts.filter(p=>p.id!==active&&p.cat===post.cat).slice(0,3);
    return (
      <div style={{width:"100%",paddingTop:68,minHeight:"100vh",background:"#fff"}}>
        <div style={{maxWidth:760,margin:"0 auto",padding:"50px 1.5rem"}}>
          {/* Breadcrumb */}
          <nav style={{fontSize:".75rem",color:C.t4,marginBottom:"1.5rem",display:"flex",alignItems:"center",gap:".4rem",flexWrap:"wrap"}}>
            <button onClick={()=>setPage("home")} style={{background:"none",border:"none",color:C.t4,cursor:"pointer",fontFamily:"'Manrope',sans-serif",fontSize:".75rem",padding:0}}>Home</button>
            <span>›</span>
            <button onClick={()=>setActive(null)} style={{background:"none",border:"none",color:C.t4,cursor:"pointer",fontFamily:"'Manrope',sans-serif",fontSize:".75rem",padding:0}}>Blog</button>
            <span>›</span>
            <span style={{color:C.t3}}>{post.cat}</span>
          </nav>
          <button onClick={()=>setActive(null)} style={{display:"flex",alignItems:"center",gap:".4rem",background:"transparent",border:"none",color:C.t3,fontWeight:600,cursor:"pointer",fontFamily:"'Manrope',sans-serif",fontSize:".875rem",marginBottom:"1.75rem"}}>← Back to Blog</button>
          <div style={{background:C.blueLL,borderRadius:8,padding:".85rem 1rem",marginBottom:"1.5rem",borderLeft:`3px solid ${C.blue}`}}>
            <div style={{fontSize:".72rem",fontWeight:600,color:C.blue,fontFamily:"'JetBrains Mono',monospace",marginBottom:".25rem"}}>META DESCRIPTION (SEO)</div>
            <p style={{fontSize:".82rem",color:C.t2,lineHeight:1.6}}>{post.metaDesc}</p>
          </div>
          <div style={{display:"flex",gap:".75rem",marginBottom:"1.1rem",alignItems:"center",flexWrap:"wrap"}}>
            <span style={{background:C.blueLL,color:C.blue,fontFamily:"'JetBrains Mono',monospace",fontSize:".62rem",fontWeight:500,padding:".22rem .65rem",borderRadius:99}}>{post.cat}</span>
            <span style={{fontSize:".78rem",color:C.t4}}>{post.date} · {post.time} read</span>
            <span style={{fontSize:".78rem",color:C.t4}}>· By Orbnix Team</span>
          </div>
          <h1 style={{fontFamily:"'Bricolage Grotesque',sans-serif",fontSize:"clamp(1.5rem,3vw,2rem)",fontWeight:800,lineHeight:1.2,letterSpacing:"-.02em",color:C.t,marginBottom:"1.75rem"}}>{post.emoji} {post.title}</h1>
          <div style={{borderLeft:`4px solid ${C.blue}`,paddingLeft:"1.1rem",marginBottom:"1.75rem",color:C.t3,fontStyle:"italic",fontSize:".88rem",lineHeight:1.75}}>
            By the Orbnix Team · Web Development Agency, India (Remote-First)
          </div>
          {post.body.split("\n\n").map((para,i)=>(
            <p key={`p-${i}`} style={{color:C.t2,lineHeight:1.9,fontSize:".9rem",marginBottom:"1.1rem"}}>{para}</p>
          ))}
          <div style={{background:"linear-gradient(135deg,#EFF6FF,#F5F3FF)",borderRadius:15,padding:"1.75rem",marginTop:"2.5rem",textAlign:"center"}}>
            <div style={{fontFamily:"'Bricolage Grotesque',sans-serif",fontWeight:800,fontSize:"1.05rem",color:C.t,marginBottom:".45rem"}}>Ready to work with us?</div>
            <p style={{color:C.t3,fontSize:".85rem",marginBottom:"1.1rem"}}>Free 30-min discovery call. No commitment. Serving startups & businesses across India & globally.</p>
            <button onClick={()=>setPage("contact")} style={{background:"linear-gradient(135deg,#2563EB,#7C3AED)",color:"#fff",border:"none",borderRadius:11,padding:".8rem 1.75rem",fontFamily:"'Manrope',sans-serif",fontWeight:700,cursor:"pointer"}}>Book a Free Call →</button>
          </div>
          {related.length>0&&(
            <div style={{marginTop:"3rem"}}>
              <div style={{fontFamily:"'Bricolage Grotesque',sans-serif",fontWeight:800,fontSize:"1rem",color:C.t,marginBottom:"1rem"}}>Related Articles</div>
              <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(200px,1fr))",gap:"1rem"}}>
                {related.map(r=>(
                  <div key={r.id} onClick={()=>openPost(r)} style={{background:C.bg2,borderRadius:12,padding:"1rem",cursor:"pointer",border:`1px solid ${C.border}`,transition:"all .2s"}} onMouseEnter={e=>{e.currentTarget.style.borderColor=C.blue;}} onMouseLeave={e=>{e.currentTarget.style.borderColor=C.border;}}>
                    <div style={{fontSize:"1.5rem",marginBottom:".5rem"}}>{r.emoji}</div>
                    <div style={{fontFamily:"'Bricolage Grotesque',sans-serif",fontWeight:700,fontSize:".82rem",color:C.t,lineHeight:1.35}}>{r.title}</div>
                    <div style={{fontSize:".7rem",color:C.t4,marginTop:".4rem"}}>{r.time} read →</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div style={{width:"100%",paddingTop:68,background:"#fff",minHeight:"100vh"}}>
      <section className="section-pad" style={{padding:"60px 4% 50px",background:"linear-gradient(155deg,#F0F7FF,#FDF4FF)",width:"100%",boxSizing:"border-box"}}>
        <div style={{maxWidth:1200,width:"100%",margin:"0 auto"}}>
          <span style={{display:"inline-flex",background:C.orangeLL,color:C.orange,fontFamily:"'JetBrains Mono',monospace",fontSize:".7rem",fontWeight:500,letterSpacing:".14em",textTransform:"uppercase",padding:".3rem .9rem",borderRadius:99,marginBottom:"1rem"}}>Orbnix Blog</span>
          <h1 style={{fontFamily:"'Bricolage Grotesque',sans-serif",fontSize:"clamp(2rem,4vw,2.75rem)",fontWeight:800,letterSpacing:"-.035em",color:C.t,marginBottom:"1rem"}}>Insights for <span style={{background:"linear-gradient(135deg,#F97316,#EC4899)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",backgroundClip:"text"}}>Indian Businesses</span></h1>
          <p style={{color:C.t3,lineHeight:1.85,maxWidth:520,marginBottom:"1rem"}}>Practical, SEO-rich guides on web design, apps, AI, and digital growth — written for startup founders & business owners across India.</p>
          <div style={{display:"flex",gap:".65rem",flexWrap:"wrap"}}>
            {["All","Web Development","Healthcare","Education","Hospitality","Professional Services","Architecture","Manufacturing","Automotive","Logistics","AI & Automation","Mobile Apps","Digital Marketing","E-Commerce","Business","Custom Software"].map(cat=>(
              <span key={cat} onClick={()=>setCatFilter(cat)} style={{background:catFilter===cat?C.blue:C.bg2,border:`1.5px solid ${catFilter===cat?C.blue:C.border}`,borderRadius:99,padding:".3rem .9rem",fontSize:".72rem",fontWeight:600,color:catFilter===cat?"#fff":C.t3,cursor:"pointer",transition:"all .2s"}}>{cat}</span>
            ))}
          </div>
        </div>
      </section>
      <section className="section-pad" style={{padding:"45px 4%",width:"100%",boxSizing:"border-box"}}>
        <div style={{maxWidth:1200,margin:"0 auto",display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(280px,1fr))",gap:"1.25rem"}}>
          {posts.filter(p=>catFilter==="All"||p.cat===catFilter).map(p=>(
            <div key={p.id} onClick={()=>openPost(p)} style={{background:"#fff",borderRadius:16,overflow:"hidden",border:`1.5px solid ${C.border}`,cursor:"pointer",transition:"all .3s"}} onMouseEnter={e=>{e.currentTarget.style.transform="translateY(-5px)";e.currentTarget.style.boxShadow="0 16px 48px rgba(0,0,0,.1)";e.currentTarget.style.borderColor="transparent";}} onMouseLeave={e=>{e.currentTarget.style.transform="none";e.currentTarget.style.boxShadow="none";e.currentTarget.style.borderColor=C.border;}}>
              <div style={{height:90,background:"linear-gradient(135deg,#F0F7FF,#F5F3FF)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"2.75rem"}}>{p.emoji}</div>
              <div style={{padding:"1.1rem"}}>
                <div style={{display:"flex",gap:".5rem",marginBottom:".55rem",alignItems:"center",flexWrap:"wrap"}}>
                  <span style={{background:C.blueLL,color:C.blue,fontFamily:"'JetBrains Mono',monospace",fontSize:".58rem",fontWeight:500,padding:".18rem .55rem",borderRadius:4}}>{p.cat}</span>
                  <span style={{fontSize:".7rem",color:C.t4}}>{p.time} read</span>
                </div>
                <h3 style={{fontFamily:"'Bricolage Grotesque',sans-serif",fontWeight:800,fontSize:".9rem",color:C.t,lineHeight:1.35,marginBottom:".5rem"}}>{p.title}</h3>
                <p style={{fontSize:".75rem",color:C.t3,lineHeight:1.55,marginBottom:".65rem"}}>{p.metaDesc}</p>
                <div style={{fontSize:".72rem",color:C.t4,display:"flex",justifyContent:"space-between"}}>
                  <span>{p.date}</span>
                  <span style={{color:C.blue,fontWeight:600}}>Read →</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

// ─── SERVICES PAGE ────────────────────────────────────────────────────────────
function Services({ setPage }) {

  return (
    <div style={{width:"100%",paddingTop:68,minHeight:"100vh",background:"#fff"}}>
      <section className="section-pad" style={{padding:"60px 4% 50px",background:"linear-gradient(155deg,#EFF6FF,#F5F3FF)",width:"100%",boxSizing:"border-box"}}>
        <div style={{maxWidth:1200,width:"100%",margin:"0 auto"}}>
          <h1 style={{fontFamily:"'Bricolage Grotesque',sans-serif",fontSize:"clamp(2rem,4vw,3rem)",fontWeight:800,letterSpacing:"-.035em",color:C.t,marginBottom:"1rem"}}>Best Web Development & IT Services in India — <span style={{background:"linear-gradient(135deg,#2563EB,#7C3AED)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",backgroundClip:"text"}}>All Services</span></h1>
          <p style={{color:C.t3,lineHeight:1.85,maxWidth:560}}>Award-quality web design, mobile apps, AI agents & digital marketing — built for Indian startups & SMEs. From idea to launch and beyond. Fixed pricing, 100% code ownership.</p>
        </div>
      </section>
      {SERVICES_LIST.map(s=>(
        <section key={s.name} className="section-pad-sm" style={{padding:"45px 4%",borderBottom:`1px solid ${C.border}`,width:"100%",boxSizing:"border-box"}}>
          <div className="services-detail-grid" style={{maxWidth:1200,margin:"0 auto"}}>
            <div>
              <h2 style={{fontFamily:"'Bricolage Grotesque',sans-serif",fontSize:"1.7rem",fontWeight:800,color:C.t,marginBottom:".65rem"}}>{s.name}</h2>
              <p style={{color:C.t3,lineHeight:1.85,marginBottom:"1.25rem"}}>{s.desc}</p>
              <ul style={{paddingLeft:0,listStyle:"none",marginBottom:"1.5rem"}}>
                {s.feats.map(f=>(
                  <li key={f} style={{display:"flex",alignItems:"flex-start",gap:".55rem",fontSize:".875rem",color:C.t2,marginBottom:".5rem",lineHeight:1.6}}>
                    <div style={{width:17,height:17,borderRadius:5,background:s.bg,flexShrink:0,display:"flex",alignItems:"center",justifyContent:"center",marginTop:".05rem"}}>
                      <svg width="9" height="9" viewBox="0 0 10 10"><path d="M2 5l2 2 4-4" stroke={s.col} strokeWidth="1.5" strokeLinecap="round" fill="none"/></svg>
                    </div>
                    {f}
                  </li>
                ))}
              </ul>
              <button onClick={()=>setPage("contact")} style={{background:`linear-gradient(135deg,${s.col},${s.col}bb)`,color:"#fff",border:"none",borderRadius:11,padding:".8rem 1.6rem",fontFamily:"'Manrope',sans-serif",fontWeight:700,cursor:"pointer",fontSize:".9rem",boxShadow:`0 4px 16px ${s.col}44`}}>Get a Quote →</button>
            </div>
            <div style={{background:s.bg,borderRadius:18,padding:"1.75rem",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"flex-start",textAlign:"center",border:`1.5px solid ${s.col}33`}}>
              <div style={{fontFamily:"'Bricolage Grotesque',sans-serif",fontSize:"2.25rem",fontWeight:800,color:s.col}}>{s.price}</div>
              <div style={{fontSize:".82rem",color:C.t3,marginTop:".3rem"}}>Starting from</div>
              <div style={{fontFamily:"'JetBrains Mono',monospace",fontSize:".78rem",color:s.col,marginTop:".4rem",background:"#fff",padding:".28rem .85rem",borderRadius:16}}>{s.priceUSD} for international</div>
              <div style={{display:"flex",gap:".4rem",flexWrap:"wrap",justifyContent:"center",marginTop:"1rem"}}>
                {["Fixed pricing","Code ownership","30-day support"].map(t=><span key={t} style={{fontSize:".68rem",background:"#fff",color:C.t3,padding:".22rem .6rem",borderRadius:16,border:`1px solid ${C.border}`}}>✓ {t}</span>)}
              </div>
            </div>
          </div>
        </section>
      ))}
    </div>
  );
}

// ─── PRICING PAGE ─────────────────────────────────────────────────────────────
function Pricing({ setPage }) {
  return (
    <div style={{width:"100%",paddingTop:68,minHeight:"100vh",background:C.bg2}}>
      <section className="section-pad" style={{padding:"60px 4%",background:"linear-gradient(155deg,#F0F7FF,#FDF4FF)",width:"100%",boxSizing:"border-box"}}>
        <div style={{maxWidth:1200,margin:"0 auto",textAlign:"center"}}>
          <h1 style={{fontFamily:"'Bricolage Grotesque',sans-serif",fontSize:"clamp(2.2rem,4vw,3rem)",fontWeight:800,letterSpacing:"-.035em",color:C.t}}>Website & App Development Pricing <span style={{background:"linear-gradient(135deg,#2563EB,#7C3AED)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",backgroundClip:"text"}}>India & Global</span></h1>
          <p style={{color:C.t3,lineHeight:1.85,maxWidth:520,margin:".75rem auto 0"}}>Fixed quotes. No hidden fees. 50% upfront, 50% on delivery. 100% code ownership. Serving startups & businesses across India & globally.</p>
        </div>
      </section>
      <section className="section-pad" style={{padding:"45px 4%",width:"100%",boxSizing:"border-box"}}>
        <div style={{maxWidth:1100,margin:"0 auto"}}>
          <h2 style={{fontFamily:"'Bricolage Grotesque',sans-serif",fontWeight:800,fontSize:"1.25rem",marginBottom:"1.25rem",color:C.t}}>🇮🇳 India Pricing (₹)</h2>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(220px,1fr))",gap:".9rem",marginBottom:"2.25rem"}}>
            {[["Website — Starter","₹25,000","5 pages, 15 days",C.blue],["Website — Growth","₹55,000","15 pages + CMS, 30 days",C.violet],["Mobile App","₹80,000+","Flutter/React Native, 6–12 wks",C.green],["AI Agent","₹40,000+","WhatsApp / web bot, 3–6 wks",C.green],["UI/UX Design","₹15,000+","Figma prototype, 1–2 wks",C.pink],["E-Commerce","₹40,000+","Shopify/WooCommerce, 2–4 wks",C.orange],["Custom ERP/CRM","₹1,50,000+","Full custom, 8–20 wks",C.blue],["SEO","₹12,000/mo","Min. 3 months",C.violet],["Tech Consulting","₹5,000/hr","CTO advisory",C.green]].map(([n,p,d,c])=>(
              <div key={n} style={{background:"#fff",borderRadius:13,padding:"1.1rem",border:`1.5px solid ${C.border}`,transition:"all .2s"}} onMouseEnter={e=>{e.currentTarget.style.borderColor=c;}} onMouseLeave={e=>{e.currentTarget.style.borderColor=C.border;}}>
                <div style={{fontFamily:"'Bricolage Grotesque',sans-serif",fontWeight:800,fontSize:"1.25rem",color:c,marginBottom:".15rem"}}>{p}</div>
                <div style={{fontWeight:700,color:C.t,fontSize:".86rem",marginBottom:".15rem"}}>{n}</div>
                <div style={{fontSize:".72rem",color:C.t4}}>{d}</div>
              </div>
            ))}
          </div>
          <h2 style={{fontFamily:"'Bricolage Grotesque',sans-serif",fontWeight:800,fontSize:"1.25rem",marginBottom:"1.25rem",color:C.t}}>🌍 International Pricing (USD)</h2>
          <div className="pricing-intl-grid" style={{marginBottom:"2.25rem"}}>
            {[["Web Starter","$500+"],["Web Growth","$1,000+"],["Mobile App","$1,500+"],["AI Agent","$800+"],["UI/UX","$300+"],["E-Commerce","$800+"],["Custom ERP","$2,500+"],["SEO","$250/mo"],["Consulting","$75/hr"]].map(([n,p])=>(
              <div key={n} style={{background:"#fff",borderRadius:13,padding:"1.1rem",border:`1.5px solid ${C.border}`}}>
                <div style={{fontFamily:"'Bricolage Grotesque',sans-serif",fontWeight:800,fontSize:"1.25rem",color:C.blue,marginBottom:".15rem"}}>{p}</div>
                <div style={{fontWeight:700,color:C.t,fontSize:".86rem"}}>{n}</div>
              </div>
            ))}
          </div>
          <div style={{background:"linear-gradient(135deg,#EFF6FF,#F5F3FF)",borderRadius:15,padding:"1.75rem",display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:"1rem"}}>
            <div>
              <div style={{fontFamily:"'Bricolage Grotesque',sans-serif",fontWeight:800,fontSize:"1.05rem",color:C.t}}>Not sure what you need?</div>
              <p style={{color:C.t3,fontSize:".85rem",marginTop:".3rem"}}>Free 30-min call — honest recommendation, no sales pressure.</p>
            </div>
            <button onClick={()=>setPage("contact")} style={{background:"linear-gradient(135deg,#2563EB,#7C3AED)",color:"#fff",border:"none",borderRadius:11,padding:".8rem 1.65rem",fontFamily:"'Manrope',sans-serif",fontWeight:700,cursor:"pointer",whiteSpace:"nowrap"}}>Book Free Call →</button>
          </div>
        </div>
      </section>
    </div>
  );
}

// ─── CONTACT PAGE ─────────────────────────────────────────────────────────────
function Contact() {
  return (
    <div style={{width:"100%",paddingTop:68,minHeight:"100vh",background:"linear-gradient(155deg,#F0F7FF,#FDF4FF)"}}>
      <section className="section-pad" style={{padding:"60px 4%",width:"100%",boxSizing:"border-box"}}>
        <div className="grid-2" style={{maxWidth:1200,margin:"0 auto"}}>
          <div>
            <span style={{display:"inline-flex",background:C.violetLL,color:C.violet,fontFamily:"'JetBrains Mono',monospace",fontSize:".7rem",fontWeight:500,letterSpacing:".14em",textTransform:"uppercase",padding:".3rem .9rem",borderRadius:99,marginBottom:"1rem"}}>Get In Touch</span>
            <h1 style={{fontFamily:"'Bricolage Grotesque',sans-serif",fontSize:"clamp(2rem,3.5vw,2.75rem)",fontWeight:800,letterSpacing:"-.03em",color:C.t,marginBottom:"1.5rem"}}>Best Web Design & Development Company in India — <span style={{background:"linear-gradient(135deg,#2563EB,#7C3AED)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",backgroundClip:"text"}}>Let's Build</span></h1>
            {[["✉️",C.blueLL,"Email","hello@orbnix.in"],["📱",C.greenLL,"WhatsApp","+91 90798 81416"],["📍",C.orangeLL,"Office","India · 100% Remote-Friendly"],["⏱️",C.violetLL,"Response","Within 24 hours"]].map(([icon,bg,label,val])=>(
              <div key={label} className="contact-info-item">
                <div style={{width:44,height:44,borderRadius:12,background:bg,display:"flex",alignItems:"center",justifyContent:"center",fontSize:"1.1rem",flexShrink:0}}>{icon}</div>
                <div>
                  <div style={{fontFamily:"'JetBrains Mono',monospace",fontSize:".62rem",textTransform:"uppercase",letterSpacing:".09em",color:C.t4,marginBottom:".15rem"}}>{label}</div>
                  <div style={{fontSize:".9rem",fontWeight:600,color:C.t}}>{val}</div>
                </div>
              </div>
            ))}
            <div style={{padding:"1.4rem",background:"#fff",borderRadius:14,border:`1.5px solid ${C.border}`,boxShadow:"0 1px 3px rgba(0,0,0,.06)",marginTop:"1rem"}}>
              <div style={{fontWeight:700,color:C.t2,marginBottom:".75rem",fontSize:".84rem"}}>✅ Why clients choose Orbnix</div>
              {["Free 30-min discovery call","Exact quote before we start","50% only on delivery","100% code ownership, forever","30 days post-launch support"].map(f=>(
                <div key={f} style={{fontSize:".83rem",color:C.t3,padding:".3rem 0",borderBottom:`1px solid ${C.border}`,display:"flex",alignItems:"center",gap:".45rem"}}><span style={{color:C.green,fontWeight:700}}>✓</span>{f}</div>
              ))}
            </div>
          </div>
          <ContactForm/>
        </div>
      </section>
    </div>
  );
}

// ─── ABOUT PAGE ───────────────────────────────────────────────────────────────
function About({ setPage }) {

  return (
    <div style={{width:"100%",paddingTop:68,minHeight:"100vh",background:"#fff"}}>
      {/* Hero */}
      <section style={{padding:"70px 4% 60px",background:"linear-gradient(155deg,#F0F7FF,#F5F3FF)",width:"100%",boxSizing:"border-box"}}>
        <div style={{maxWidth:1200,margin:"0 auto"}}>
          <span style={{display:"inline-flex",background:C.violetLL,color:C.violet,fontFamily:"'JetBrains Mono',monospace",fontSize:".7rem",fontWeight:500,letterSpacing:".14em",textTransform:"uppercase",padding:".3rem .9rem",borderRadius:99,marginBottom:"1.25rem"}}>About Orbnix</span>
          <h1 style={{fontFamily:"'Bricolage Grotesque',sans-serif",fontSize:"clamp(2rem,4vw,3rem)",fontWeight:800,letterSpacing:"-.035em",color:C.t,marginBottom:"1.25rem",maxWidth:700}}>We're a Remote-First IT Agency <span style={{background:"linear-gradient(135deg,#2563EB,#7C3AED)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",backgroundClip:"text"}}>Built for India's Growth</span></h1>
          <p style={{color:C.t3,lineHeight:1.9,maxWidth:580,fontSize:"1rem",marginBottom:"2.5rem"}}>Orbnix was founded with one mission: give Indian startups and SMEs access to the same quality of software that funded companies pay 10x more for — at honest, transparent prices.</p>
          <div style={{display:"flex",gap:"2.5rem",flexWrap:"wrap"}}>
            {[["50+","Projects delivered"],["12+","Industries served"],["100%","Code ownership"],["24hr","Quote turnaround"]].map(([n,l])=>(
              <div key={l}>
                <div style={{fontFamily:"'Bricolage Grotesque',sans-serif",fontSize:"2rem",fontWeight:800,color:C.blue}}>{n}</div>
                <div style={{fontSize:".78rem",color:C.t4,fontWeight:500}}>{l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* Mission */}
      <section style={{padding:"60px 4%",background:"#fff",width:"100%",boxSizing:"border-box"}}>
        <div style={{maxWidth:1200,margin:"0 auto",display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(300px,1fr))",gap:"3rem",alignItems:"center"}}>
          <div>
            <div style={{fontFamily:"'JetBrains Mono',monospace",fontSize:".68rem",color:C.blue,letterSpacing:".12em",textTransform:"uppercase",marginBottom:".75rem"}}>Our Story</div>
            <h2 style={{fontFamily:"'Bricolage Grotesque',sans-serif",fontSize:"clamp(1.5rem,2.5vw,2rem)",fontWeight:800,color:C.t,letterSpacing:"-.025em",marginBottom:"1rem",lineHeight:1.2}}>Started because we saw too many businesses get burned by bad agencies</h2>
            <p style={{color:C.t3,lineHeight:1.9,marginBottom:"1rem",fontSize:".9rem"}}>Across India, we kept seeing the same story: a business owner invested ₹1–3 lakhs in a website or app, received a half-finished product, got locked out of their own code, and was left with no support and no recourse.</p>
            <p style={{color:C.t3,lineHeight:1.9,marginBottom:"1.5rem",fontSize:".9rem"}}>Orbnix exists to be the alternative. Fixed prices. Full code ownership. Honest timelines. Real post-launch support. Not because it's a selling point — because it's simply the right way to work.</p>
            <button onClick={()=>setPage("contact")} style={{background:"linear-gradient(135deg,#2563EB,#7C3AED)",color:"#fff",border:"none",borderRadius:11,padding:".8rem 1.65rem",fontFamily:"'Manrope',sans-serif",fontWeight:700,cursor:"pointer",fontSize:".9rem"}}>Work with us →</button>
          </div>
          <div style={{background:"linear-gradient(135deg,#0F172A,#1E293B)",borderRadius:20,padding:"2rem",display:"grid",gridTemplateColumns:"1fr 1fr",gap:"1rem"}}>
            {[["🇮🇳","Pan-India","100% remote, serve clients nationwide"],["💻","Tech Stack","React · Flutter · Node · AI"],["⚡","Avg. Launch","15–45 days"],["🌍","Global","Clients in UK, US, UAE, AU"]].map(([ic,t,d])=>(
              <div key={t} style={{background:"rgba(255,255,255,.06)",borderRadius:12,padding:"1rem"}}>
                <div style={{fontSize:"1.4rem",marginBottom:".5rem"}}>{ic}</div>
                <div style={{fontFamily:"'Bricolage Grotesque',sans-serif",fontWeight:700,color:"#fff",fontSize:".85rem",marginBottom:".25rem"}}>{t}</div>
                <div style={{fontSize:".72rem",color:"rgba(255,255,255,.45)",lineHeight:1.5}}>{d}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* Values */}
      <section style={{padding:"60px 4%",background:C.bg2,width:"100%",boxSizing:"border-box"}}>
        <div style={{maxWidth:1200,margin:"0 auto"}}>
          <div style={{textAlign:"center",marginBottom:"2.5rem"}}>
            <h2 style={{fontFamily:"'Bricolage Grotesque',sans-serif",fontSize:"clamp(1.5rem,2.5vw,2rem)",fontWeight:800,color:C.t,letterSpacing:"-.025em"}}>How We <span style={{background:"linear-gradient(135deg,#2563EB,#7C3AED)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",backgroundClip:"text"}}>Operate</span></h2>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(260px,1fr))",gap:"1.25rem"}}>
            {ABOUT_VALUES.map(v=>(
              <div key={v.title} style={{background:"#fff",borderRadius:16,padding:"1.5rem",border:`1px solid ${C.border}`,transition:"all .25s"}} onMouseEnter={e=>{e.currentTarget.style.transform="translateY(-4px)";e.currentTarget.style.boxShadow="0 12px 32px rgba(37,99,235,.1)";}} onMouseLeave={e=>{e.currentTarget.style.transform="none";e.currentTarget.style.boxShadow="none";}}>
                <div style={{fontSize:"1.6rem",marginBottom:".85rem"}}>{v.icon}</div>
                <div style={{fontFamily:"'Bricolage Grotesque',sans-serif",fontWeight:800,color:C.t,fontSize:".92rem",marginBottom:".4rem"}}>{v.title}</div>
                <div style={{fontSize:".83rem",color:C.t3,lineHeight:1.75}}>{v.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* Team */}
      <section style={{padding:"60px 4%",background:"#fff",width:"100%",boxSizing:"border-box"}}>
        <div style={{maxWidth:1200,margin:"0 auto"}}>
          <div style={{textAlign:"center",marginBottom:"2.5rem"}}>
            <h2 style={{fontFamily:"'Bricolage Grotesque',sans-serif",fontSize:"clamp(1.5rem,2.5vw,2rem)",fontWeight:800,color:C.t,letterSpacing:"-.025em"}}>The Team Behind <span style={{background:"linear-gradient(135deg,#2563EB,#7C3AED)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",backgroundClip:"text"}}>Your Project</span></h2>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(240px,1fr))",gap:"1.25rem",marginBottom:"2.5rem"}}>
            {ABOUT_TEAM.map(t=>(
              <div key={t.name} style={{background:C.bg2,borderRadius:16,padding:"1.5rem",border:`1px solid ${C.border}`,textAlign:"center"}}>
                <div style={{fontSize:"2.5rem",marginBottom:".75rem"}}>{t.emoji}</div>
                <div style={{fontFamily:"'Bricolage Grotesque',sans-serif",fontWeight:800,color:C.t,fontSize:".95rem",marginBottom:".2rem"}}>{t.name}</div>
                <div style={{fontFamily:"'JetBrains Mono',monospace",fontSize:".62rem",color:C.blue,letterSpacing:".1em",textTransform:"uppercase",marginBottom:".65rem"}}>{t.role}</div>
                <div style={{fontSize:".82rem",color:C.t3,lineHeight:1.75}}>{t.desc}</div>
              </div>
            ))}
          </div>
          <div style={{textAlign:"center"}}>
            <button onClick={()=>setPage("contact")} style={{background:"linear-gradient(135deg,#2563EB,#7C3AED)",color:"#fff",border:"none",borderRadius:12,padding:".9rem 2.25rem",fontFamily:"'Manrope',sans-serif",fontWeight:700,cursor:"pointer",fontSize:".95rem",boxShadow:"0 6px 24px rgba(37,99,235,.3)"}}>Start Your Project →</button>
          </div>
        </div>
      </section>
    </div>
  );
}

// ─── COOKIE PERSONALISATION ENGINE ──────────────────────────────────────────
// Maps every user action → interest signal → personalised content

const INTEREST_MAP = {
  // page visits
  home:       [],
  work:       ["portfolio","tech"],
  blog:       ["content","research"],
  services:   ["services"],
  pricing:    ["pricing","intent_high"],
  contact:    ["intent_high","lead"],
  // demo / portfolio clicks
  restaurant: ["web","ecommerce","hospitality"],
  ecommerce:  ["ecommerce","web","retail"],
  ai:         ["ai","automation","chatbot"],
  dashboard:  ["saas","analytics","web"],
  app:        ["mobile","app"],
  booking:    ["web","hospitality","booking"],
  realestate: ["web","realestate"],
  lms:        ["web","edtech","mobile"],
  // blog categories
  "Web Development":  ["web","tech"],
  "AI & Automation":  ["ai","automation"],
  "Mobile Apps":      ["mobile","app"],
  "E-Commerce":       ["ecommerce","retail"],
  "Digital Marketing":["seo","marketing"],
  "Pricing":          ["pricing","intent_high"],
  "Custom Software":  ["saas","custom"],
  "Business":         ["business","consulting"],
};

const PERSONAS = {
  web:         { label:"Web Expert",      emoji:"🌐", primary:"web",      color:"#2563EB" },
  ecommerce:   { label:"eCommerce",       emoji:"🛒", primary:"ecommerce",color:"#F97316" },
  ai:          { label:"AI & Automation", emoji:"🤖", primary:"ai",       color:"#10B981" },
  mobile:      { label:"App Builder",     emoji:"📱", primary:"mobile",   color:"#7C3AED" },
  saas:        { label:"SaaS Builder",    emoji:"⚙️", primary:"saas",     color:"#7C3AED" },
  hospitality: { label:"Hospitality",     emoji:"🍽️", primary:"web",      color:"#F59E0B" },
  realestate:  { label:"Real Estate",     emoji:"🏠", primary:"realestate",color:"#2563EB" },
  edtech:      { label:"EdTech",          emoji:"📚", primary:"edtech",   color:"#7C3AED" },
  marketing:   { label:"Digital Marketer",emoji:"📈", primary:"marketing",color:"#EC4899" },
  default:     { label:"Visitor",         emoji:"👋", primary:"web",      color:"#2563EB" },
};

// Personalised hero copy per persona
const HERO_COPY = {
  default:    { badge:"Now Accepting New Projects · 100% Remote · Pan-India", headline:["Websites & Apps", "Built to Rank on Google", "& Convert Visitors"], sub:"Full-stack web development, mobile apps, AI chatbots, and e-commerce for clinics, schools, hotels, CA firms, restaurants, factories, and 50+ industries across India.", cta:"Get Free Consultation →" },
  ecommerce:  { badge:"E-Commerce · Shopify · WooCommerce · D2C", headline:["Online Stores", "That Actually Sell —", "Shopify & Custom"], sub:"Razorpay/UPI/COD checkout, WhatsApp order alerts, GST invoices, inventory sync. D2C and B2B stores built to rank and convert.", cta:"Build My Store →" },
  ai:         { badge:"AI Chatbot · GPT-4o · WhatsApp Agent · Lead Gen", headline:["AI Agents", "That Work 24/7 —", "GPT-4o Powered"], sub:"WhatsApp chatbots, lead qualification bots, appointment booking AI, and customer support agents. Starting ₹40,000.", cta:"See AI Demo →" },
  mobile:     { badge:"Flutter · React Native · Android · iOS", headline:["Mobile Apps", "for Android & iOS —", "from ₹80,000"], sub:"Booking apps, delivery apps, field-service apps, customer portals. Submitted to Play Store and App Store. Fixed-price contracts.", cta:"Get App Quote →" },
  saas:       { badge:"SaaS · ERP · CRM · Custom Software India", headline:["Custom SaaS", "ERP & CRM Built on", "React + Node.js"], sub:"Multi-tenant SaaS platforms, billing software, inventory systems, HR portals. From MVP to enterprise scale.", cta:"Discuss My Project →" },
  realestate: { badge:"Real Estate · Property Portal · Builder Website", headline:["Real Estate Websites", "That Generate Leads —", "WhatsApp + SEO"], sub:"Listing portals, WhatsApp lead bots, virtual tours, agent CRMs, and EMI calculators. Ranked for your city + property keywords.", cta:"See Real Estate Demo →" },
  edtech:     { badge:"School · Coaching · LMS · EdTech India", headline:["School & EdTech", "Websites That Fill", "Admissions"], sub:"CBSE school websites, online admission forms, fee payment, results display, and student portals. Ranked on Google.", cta:"See School Demo →" },
  hospitality:{ badge:"Hotel · Resort · Restaurant · Direct Booking", headline:["Hotel Websites", "That Cut OTA Commission", "by 30%+"], sub:"Hotel and restaurant websites with direct booking, Razorpay payment, table reservations, and Zomato/Swiggy integration.", cta:"See Hotel Demo →" },
  marketing:  { badge:"SEO · Google Ads · Digital Marketing India", headline:["Page 1 Google", "Rankings for Your", "Business in India"], sub:"Technical SEO, local SEO, Google Business Profile, content marketing, Google Ads. Rank for your service + your city.", cta:"Get SEO Audit →" },
  web:        { badge:"Best Web Design Company India · ₹25,000+", headline:["Professional Websites", "from ₹25,000 —", "React & Next.js"], sub:"Fast, SEO-ready, mobile-first websites for every type of Indian business. Free consultation. Delivery in 7–14 days.", cta:"Get Free Quote →" },
};

// Dynamic SEO keywords injected based on persona
const PERSONA_KEYWORDS = {
  web:       "custom website development India, React website agency India, Next.js developer India, professional website design India",
  ecommerce: "ecommerce website development India, Shopify developer India, WooCommerce store India, online store development India, Razorpay integration",
  ai:        "AI chatbot development India, WhatsApp bot India, AI agent builder India, automation bot India, GPT chatbot for business India",
  mobile:    "Flutter app development India, React Native app India, mobile app developer India, iOS Android app development India",
  saas:      "SaaS development company India, custom software development India, web application development India, startup tech partner India",
  hospitality:"restaurant website design India, booking system development India, hospitality tech India, hotel website development India",
  realestate: "real estate website development India, property portal development India, real estate app India, real estate AI bot India",
  edtech:    "LMS development India, edtech app development India, online learning platform India, education website development India",
  marketing: "SEO website development India, Next.js SEO agency India, technical SEO India, Core Web Vitals optimisation India",
  default:   "web development company India, IT agency India, website design India, app development India",
};

// ── Cookie helpers (7-day expiry) ──────────────────────────────────────────
const CK_KEY = "orbnix_prefs";
const CK_DAYS = 7;

function getCookie() {
  try {
    const m = document.cookie.match(new RegExp(`(?:^|; )${CK_KEY}=([^;]*)`));
    return m ? JSON.parse(decodeURIComponent(m[1])) : null;
  } catch { return null; }
}

function setCookie(data) {
  try {
    const exp = new Date(Date.now() + CK_DAYS * 864e5).toUTCString();
    document.cookie = `${CK_KEY}=${encodeURIComponent(JSON.stringify(data))};expires=${exp};path=/;SameSite=Lax`;
  } catch {}
}

function freshProfile() {
  return { scores:{}, visits:[], demos:[], blogs:[], firstSeen:Date.now(), lastSeen:Date.now(), sessions:1, topPersona:"default" };
}

function scoreSignals(signals, scores) {
  const s = { ...scores };
  signals.forEach(sig => { s[sig] = (s[sig] || 0) + 1; });
  return s;
}

function derivePersona(scores) {
  // Map raw signals → persona buckets
  const personaBuckets = {
    ecommerce:   (scores.ecommerce||0)*3 + (scores.retail||0)*2,
    ai:          (scores.ai||0)*3 + (scores.automation||0)*2 + (scores.chatbot||0)*2,
    mobile:      (scores.mobile||0)*3 + (scores.app||0)*2,
    saas:        (scores.saas||0)*3 + (scores.analytics||0),
    realestate:  (scores.realestate||0)*4,
    edtech:      (scores.edtech||0)*4,
    hospitality: (scores.hospitality||0)*3 + (scores.booking||0),
    marketing:   (scores.seo||0)*3 + (scores.marketing||0)*2,
    web:         (scores.web||0)*2 + (scores.tech||0),
  };
  const sorted = Object.entries(personaBuckets).sort((a,b)=>b[1]-a[1]);
  if (sorted[0][1] === 0) return "default";
  // Only assign a non-default persona if they have meaningful signal
  if (sorted[0][1] < 2) return "default";
  return sorted[0][0];
}

// ── useCookiePersona hook ─────────────────────────────────────────────────
function useCookiePersona(currentPage, demoClick, blogClick) {
  const [profile, setProfile] = useState(null);
  const [persona, setPersona] = useState("default");

  // Load on mount
  useEffect(() => {
    let p = getCookie() || freshProfile();
    p.lastSeen = Date.now();
    p.sessions = (p.sessions || 1) + 1;
    // Score current page
    const signals = INTEREST_MAP[currentPage] || [];
    p.scores = scoreSignals(signals, p.scores || {});
    if (!p.visits.includes(currentPage)) p.visits.push(currentPage);
    p.topPersona = derivePersona(p.scores);
    setCookie(p);
    setProfile(p);
    setPersona(p.topPersona);
  }, []);

  // Track page changes
  useEffect(() => {
    if (!profile) return;
    const p = { ...profile };
    const signals = INTEREST_MAP[currentPage] || [];
    p.scores = scoreSignals(signals, p.scores);
    if (!p.visits.includes(currentPage)) p.visits.push(currentPage);
    p.lastSeen = Date.now();
    p.topPersona = derivePersona(p.scores);
    setCookie(p);
    setProfile(p);
    setPersona(p.topPersona);
  }, [currentPage]);

  // Track demo clicks
  useEffect(() => {
    if (!demoClick || !profile) return;
    const p = { ...profile };
    const signals = INTEREST_MAP[demoClick] || [];
    p.scores = scoreSignals(signals, p.scores);
    if (!p.demos.includes(demoClick)) p.demos.push(demoClick);
    p.topPersona = derivePersona(p.scores);
    setCookie(p);
    setProfile(p);
    setPersona(p.topPersona);
  }, [demoClick]);

  // Track blog clicks
  useEffect(() => {
    if (!blogClick || !profile) return;
    const p = { ...profile };
    const signals = INTEREST_MAP[blogClick] || [];
    p.scores = scoreSignals(signals, p.scores);
    if (!p.blogs.includes(blogClick)) p.blogs.push(blogClick);
    p.topPersona = derivePersona(p.scores);
    setCookie(p);
    setProfile(p);
    setPersona(p.topPersona);
  }, [blogClick]);

  const trackAction = (key) => {
    const p = getCookie() || freshProfile();
    const signals = INTEREST_MAP[key] || [];
    p.scores = scoreSignals(signals, p.scores);
    p.topPersona = derivePersona(p.scores);
    setCookie(p);
    setProfile(p);
    setPersona(p.topPersona);
  };

  return { profile, persona, trackAction };
}

// ─── SEO META MANAGER ────────────────────────────────────────────────────────
const SEO_META = {
  home: {
    title: "Orbnix — Web Development Company Near You | Websites, Apps & AI Across India",
    description: "Looking for a web development company near you? Orbnix builds websites, mobile apps, AI chatbots and e-commerce stores for businesses across India — Delhi, Mumbai, Bangalore, Hyderabad, Chennai, Pune, Jaipur and beyond. Starting ₹25,000. Free consultation.",
    keywords: "web development company near me, web design company near me, IT company near me, tech company near me, website developer near me, app development company near me, web development company India, website design company India, website development agency India, best web design company India, affordable website design India, professional website design India, web developer India, React developer India, Next.js developer India, full stack developer India, mobile app development India, Flutter app development India, e-commerce website development India, Shopify developer India, AI chatbot development India, AI agent development India, WhatsApp chatbot India, custom software development India, SEO services India, digital marketing agency India, UI UX design agency India, website design cost India, clinic website design India, hospital website development India, school website design India, hotel website development India, CA firm website design India, architect website India, factory website India, manufacturer website India, astrologer website India, restaurant website India, real estate website India, edtech website India, salon booking website India, pharmacy website India, car dealer website India, logistics company website India, gym website India, wedding planner website India, solar company website India, web development company Jaipur, IT company Jaipur, software company India, website design Mumbai, web development Bangalore, web development Delhi, affordable web developer India, freelance web developer India, React website development India, Next.js website India, MERN stack developer India, Node.js developer India, Razorpay integration India, WhatsApp API integration India, best web development company India 2025, chartered accountant website India, agriculture website India, agritech website India, NGO website India, finance company website India"
  },
  about: {
    title: "About Orbnix — Remote-First Web Development Agency India | Our Team & Story",
    description: "Orbnix is India's remote-first web development agency. We build websites, apps, and digital products for startups, SMEs, and enterprises across India and internationally. Meet our team and learn our story.",
    keywords: "about Orbnix, web development agency India, Indian IT company, remote web developer India, software agency India, Jaipur web development company, best IT agency India, top web developers India"
  },
  work: {
    title: "Our Work — Web Development Portfolio India | Websites, Apps & AI Projects by Orbnix",
    description: "View Orbnix's portfolio of 80+ projects — restaurant websites, clinic booking systems, hotel direct booking, CA firm websites, school websites, e-commerce stores, AI chatbots, mobile apps, SaaS dashboards, and more. Real results, real ROI.",
    keywords: "web development portfolio India, website design examples India, clinic website example, school website design India, hotel booking website India, CA firm website example, restaurant website India, e-commerce portfolio India, mobile app portfolio India, AI chatbot portfolio India, React portfolio India, best web design portfolio India 2025"
  },
  services: {
    title: "Web Development Services India — Website, App, AI, E-Commerce, SEO | Orbnix",
    description: "Orbnix offers full-stack web development, mobile app development (Flutter/React Native), AI chatbot & agent development, e-commerce (Shopify/WooCommerce), SEO, UI/UX design, WhatsApp CRM, custom ERP/CRM, IT support, and no-code solutions. Serving all industries across India.",
    keywords: "web development services India, website design services India, mobile app development services India, Flutter developer India, React Native developer India, AI development services India, e-commerce development India, Shopify development India, WooCommerce India, SEO services India, digital marketing services India, UI UX design services India, WhatsApp CRM India, ERP development India, CRM software India, IT support India, no-code development India, website for clinic India, website for school India, website for hotel India, website for CA firm India, website for restaurant India, website for real estate India, website for factory India, website for astrologer India, website for gym India, website for salon India, website for pharmacy India, website for car dealer India, website for logistics company India, website for wedding planner India, website for college India, website for NGO India"
  },
  blog: {
    title: "Blog — Web Development & Digital Marketing Tips for Indian Businesses | Orbnix",
    description: "Free guides and SEO tips for Indian businesses: how to get a website, what to include, how much it costs, how to rank on Google. Covering clinics, schools, hotels, CA firms, architects, factories, restaurants, real estate, and 30+ more industries.",
    keywords: "web development blog India, website design tips India, SEO tips India, how to get a website India, website cost India, clinic website guide, school website India, hotel website tips, CA firm website, restaurant website guide, digital marketing India, Google ranking tips India, local SEO India"
  },
  pricing: {
    title: "Website Development Pricing India — Affordable Web Design Packages | Orbnix",
    description: "Transparent website design pricing for India. Web Starter from ₹25,000. Mobile App from ₹80,000. AI Agent from ₹40,000. E-Commerce from ₹40,000. Custom ERP/CRM from ₹1,50,000. International clients: starting $500. No hidden costs.",
    keywords: "website design price India, web development cost India, how much does a website cost India, website design packages India, affordable website design India, website design starting 25000, mobile app cost India, AI development price India, e-commerce website cost India, web development charges India, website design fees India, IT company pricing India"
  },
  products: {
    title: "Orbnix Products — School ERP, Web Apps & AI Solutions for Indian Institutions",
    description: "Explore Orbnix products — School ERP with AI, custom web apps, mobile apps and SaaS solutions built for Indian schools and businesses. 16+ modules, 7-day setup.",
    keywords: "school ERP India, school management software, AI school software, student management system, fee management software India, attendance system India, school app India",
    og: "Orbnix Products — School ERP & AI Solutions",
    desc: "School ERP with AI, attendance, fees, exams, transport & more. Built for Indian schools."
  },
  contact: {
    title: "Contact Orbnix — Get a Free Website Quote India | WhatsApp +91 90798 81416",
    description: "Get a free quote for your website, app, or AI project. WhatsApp us at +91 90798 81416 or email hello@orbnix.in. We respond within 24 hours. Serving clients across India and internationally.",
    keywords: "contact web developer India, hire web developer India, get website quote India, free website consultation India, web development inquiry India, WhatsApp web developer India, hire React developer India, outsource web development India"
  }
};

function SeoHead({ page, persona = "default" }) {
  useEffect(() => {
    const m = SEO_META[page] || SEO_META.home;
    document.title = m.title;
    const personaKW = PERSONA_KEYWORDS[persona] || PERSONA_KEYWORDS.default;
    const setMeta = (name, content, prop = false) => {
      const sel = prop ? `meta[property="${name}"]` : `meta[name="${name}"]`;
      let el = document.querySelector(sel);
      if (!el) { el = document.createElement("meta"); prop ? el.setAttribute("property", name) : el.setAttribute("name", name); document.head.appendChild(el); }
      el.setAttribute("content", content);
    };
    setMeta("description", m.desc);
    // Merge page keywords + persona-specific keywords
    setMeta("keywords", `${m.keywords}, ${personaKW}`);
    setMeta("robots", "index, follow");
    setMeta("author", "Orbnix");
    setMeta("og:title", m.og, true);
    setMeta("og:description", m.desc, true);
    setMeta("og:type", "website", true);
    setMeta("og:url", `https://www.orbnix.in/${page === "home" ? "" : page}`, true);
    setMeta("og:image", "https://www.orbnix.in/og-cover.png", true);
    setMeta("og:site_name", "Orbnix", true);
    setMeta("twitter:card", "summary_large_image");
    setMeta("twitter:title", m.og);
    setMeta("twitter:description", m.desc);
    setMeta("twitter:image", "https://www.orbnix.in/og-cover.png");
    setMeta("twitter:site", "@orbnix_in");
    let canon = document.querySelector('link[rel="canonical"]');
    if (!canon) { canon = document.createElement("link"); canon.setAttribute("rel", "canonical"); document.head.appendChild(canon); }
    canon.setAttribute("href", `https://www.orbnix.in/${page === "home" ? "" : page}`);
    // FAQ Rich Snippet Schema (home page)
    let faqLd = document.querySelector('#orbnix-faq-ld');
    if (page === "home") {
      if (!faqLd) { faqLd = document.createElement("script"); faqLd.id="orbnix-faq-ld"; faqLd.type="application/ld+json"; document.head.appendChild(faqLd); }
      faqLd.textContent = JSON.stringify({ "@context":"https://schema.org","@type":"FAQPage","mainEntity":
        FAQ_DATA.slice(0,6).map(f=>({ "@type":"Question","name":f.q,"acceptedAnswer":{"@type":"Answer","text":f.a} }))
      });
    } else if (faqLd) faqLd.remove();
    // Breadcrumb Schema
    let bcLd = document.querySelector('#orbnix-bc-ld');
    if (!bcLd) { bcLd = document.createElement("script"); bcLd.id="orbnix-bc-ld"; bcLd.type="application/ld+json"; document.head.appendChild(bcLd); }
    bcLd.textContent = JSON.stringify({ "@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[
      {"@type":"ListItem","position":1,"name":"Home","item":"https://orbnix.in"},
      ...(page!=="home"?[{"@type":"ListItem","position":2,"name":page.charAt(0).toUpperCase()+page.slice(1),"item":`https://orbnix.in/${page}`}]:[])
    ]});
    // Performance: add preconnect for Google Fonts + WhatsApp
    ["https://fonts.googleapis.com","https://fonts.gstatic.com","https://wa.me"].forEach(href=>{
      if (!document.querySelector(`link[rel="preconnect"][href="${href}"]`)) {
        const el=document.createElement("link"); el.rel="preconnect"; el.href=href; if(href.includes("gstatic")) el.crossOrigin="anonymous"; document.head.appendChild(el);
      }
    });
    let ld = document.querySelector('#orbnix-jsonld');
    if (!ld) { ld = document.createElement("script"); ld.id = "orbnix-jsonld"; ld.type = "application/ld+json"; document.head.appendChild(ld); }
    ld.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": ["ProfessionalService","LocalBusiness"],
      "name": "Orbnix",
      "description": "Full-stack IT agency in India building custom websites, mobile apps, AI agents and SaaS software for startups and SMEs. 100% remote, pan-India.",
      "url": "https://orbnix.in",
      "logo": "https://www.orbnix.in/logo.png",
      "image": "https://www.orbnix.in/og-cover.png",
      "email": "hello@orbnix.in",
      "telephone": "+919079881416",
      "areaServed": ["IN","US","GB","AE","AU"], "serviceArea": [{"@type":"City","name":"Jaipur"},{"@type":"City","name":"Delhi"},{"@type":"City","name":"Mumbai"},{"@type":"City","name":"Bangalore"},{"@type":"City","name":"Hyderabad"},{"@type":"City","name":"Chennai"},{"@type":"City","name":"Pune"},{"@type":"City","name":"Ahmedabad"},{"@type":"City","name":"Kolkata"},{"@type":"City","name":"Surat"}],
      "currenciesAccepted": "INR, USD",
      "paymentAccepted": "UPI, Bank Transfer, Razorpay, PayPal, Stripe",
      "serviceType": ["Web Development","Mobile App Development","AI Agent Development","SEO","E-Commerce Development","UI/UX Design","SaaS Development","WhatsApp Marketing"],
      "priceRange": "₹₹",
      "foundingDate": "2023",
      "numberOfEmployees": { "@type":"QuantitativeValue", "minValue":5, "maxValue":20 },
      "aggregateRating": { "@type":"AggregateRating", "ratingValue":"4.9", "reviewCount":"50", "bestRating":"5", "worstRating":"1" },
      "review": [
        { "@type":"Review","author":{"@type":"Person","name":"Arjun Kapoor"},"reviewRating":{"@type":"Rating","ratingValue":"5"},"reviewBody":"Orbnix transformed our payments dashboard. The new onboarding alone recovered ₹40L in monthly revenue." },
        { "@type":"Review","author":{"@type":"Person","name":"Ravi Meena"},"reviewRating":{"@type":"Rating","ratingValue":"5"},"reviewBody":"From zero online presence to ₹12 lakhs in our very first month. Exceptional work." },
        { "@type":"Review","author":{"@type":"Person","name":"Nikhil Agarwal"},"reviewRating":{"@type":"Rating","ratingValue":"5"},"reviewBody":"Delivered our full SaaS in 14 weeks — zero downtime in 6 months post-launch." }
      ],
      "hasOfferCatalog": { "@type":"OfferCatalog","name":"IT Services","itemListElement":[
        {"@type":"Offer","itemOffered":{"@type":"Service","name":"Website Development"},"price":"25000","priceCurrency":"INR"},
        {"@type":"Offer","itemOffered":{"@type":"Service","name":"Mobile App Development"},"price":"80000","priceCurrency":"INR"},
        {"@type":"Offer","itemOffered":{"@type":"Service","name":"AI Agent Development"},"price":"40000","priceCurrency":"INR"}
      ]},
      "sameAs": ["https://instagram.com/orbnix.in","https://linkedin.com/company/orbnix","https://twitter.com/orbnix_in","https://youtube.com/@OrbnixIndia","https://facebook.com/OrbnixIndia","https://www.google.com/maps"]
    });
  }, [page, persona]);
  return null;
}

// ─── SOCIAL ICONS SVG HELPERS ────────────────────────────────────────────────
const SOCIALS = [
  { id:"ig",   label:"Instagram", url:"https://instagram.com/orbnix.in",           color:"#E1306C", grad:"linear-gradient(135deg,#833AB4,#FD1D1D,#F56040)", icon:(
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width="18" height="18"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r=".6" fill="currentColor" stroke="none"/></svg>
  )},
  { id:"yt",   label:"YouTube",   url:"https://youtube.com/@OrbnixIndia",           color:"#FF0000", grad:"linear-gradient(135deg,#FF0000,#CC0000)", icon:(
    <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18"><path d="M21.8 8s-.2-1.4-.8-2c-.8-.8-1.7-.8-2.1-.9C16.3 5 12 5 12 5s-4.3 0-6.9.1c-.4.1-1.3.1-2.1.9-.6.6-.8 2-.8 2S2 9.6 2 11.2v1.5c0 1.6.2 3.2.2 3.2s.2 1.4.8 2c.8.8 1.8.8 2.3.8C6.8 19 12 19 12 19s4.3 0 6.9-.2c.4-.1 1.3-.1 2.1-.9.6-.6.8-2 .8-2s.2-1.6.2-3.2v-1.5C22 9.6 21.8 8 21.8 8zM10 15V9l5.5 3L10 15z"/></svg>
  )},
  { id:"li",   label:"LinkedIn",  url:"https://linkedin.com/company/orbnix",        color:"#0A66C2", grad:"linear-gradient(135deg,#0A66C2,#00A0DC)", icon:(
    <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18"><path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2zm2-5a2 2 0 110 4 2 2 0 010-4z"/></svg>
  )},
  { id:"x",    label:"X (Twitter)",url:"https://twitter.com/orbnix_in",             color:"#000",    grad:"linear-gradient(135deg,#111,#333)", icon:(
    <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
  )},
  { id:"fb",   label:"Facebook",  url:"https://facebook.com/OrbnixIndia",           color:"#1877F2", grad:"linear-gradient(135deg,#1877F2,#0C63D4)", icon:(
    <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18"><path d="M24 12.07C24 5.41 18.63 0 12 0S0 5.41 0 12.07C0 18.1 4.39 23.1 10.13 24v-8.44H7.08v-3.49h3.04V9.41c0-3.02 1.8-4.7 4.54-4.7 1.31 0 2.68.24 2.68.24v2.97h-1.51c-1.49 0-1.95.93-1.95 1.88v2.26h3.32l-.53 3.5h-2.79V24C19.61 23.1 24 18.1 24 12.07z"/></svg>
  )},
];

// ─── SOCIAL FLOATING BAR (left side desktop) ────────────────────────────────
function SocialSidebar() {
  const [hov, setHov] = useState(null);
  return (
    <div className="social-sidebar" style={{position:"fixed",left:0,top:"50%",transform:"translateY(-50%)",zIndex:900,display:"flex",flexDirection:"column",gap:2}}>
      {SOCIALS.map(s => (
        <a key={s.id} href={s.url} target="_blank" rel="noopener noreferrer"
          onMouseEnter={() => setHov(s.id)} onMouseLeave={() => setHov(null)}
          title={s.label}
          style={{
            display:"flex",alignItems:"center",gap:0,overflow:"hidden",
            height:44,
            background: hov===s.id ? s.grad : "rgba(15,23,42,0.82)",
            color:"#fff",
            borderRadius: hov===s.id ? "0 10px 10px 0" : "0 8px 8px 0",
            backdropFilter:"blur(12px)",
            padding: hov===s.id ? "0 14px 0 14px" : "0 10px",
            width: hov===s.id ? 140 : 40,
            transition:"all .28s cubic-bezier(.4,0,.2,1)",
            textDecoration:"none",
            boxShadow: hov===s.id ? `0 4px 20px ${s.color}55` : "0 2px 8px rgba(0,0,0,.18)",
          }}>
          <span style={{flexShrink:0,display:"flex",alignItems:"center",width:18}}>{s.icon}</span>
          <span style={{
            fontSize:".75rem",fontWeight:700,fontFamily:"'Manrope',sans-serif",
            marginLeft: hov===s.id ? 10 : 0,
            opacity: hov===s.id ? 1 : 0,
            whiteSpace:"nowrap",
            transition:"all .2s",
          }}>{s.label}</span>
        </a>
      ))}
    </div>
  );
}

// ─── SOCIAL FOOTER ROW ────────────────────────────────────────────────────────
function SocialFooterRow() {
  const [hov, setHov] = useState(null);
  return (
    <div style={{display:"flex",gap:".5rem",flexWrap:"wrap"}}>
      {SOCIALS.map(s => (
        <a key={s.id} href={s.url} target="_blank" rel="noopener noreferrer"
          title={s.label}
          onMouseEnter={() => setHov(s.id)} onMouseLeave={() => setHov(null)}
          style={{
            width:36,height:36,borderRadius:9,
            border: hov===s.id ? `1.5px solid ${s.color}` : "1px solid rgba(255,255,255,.1)",
            display:"flex",alignItems:"center",justifyContent:"center",
            color: hov===s.id ? s.color : "rgba(255,255,255,.45)",
            background: hov===s.id ? `${s.color}18` : "transparent",
            transition:"all .22s",
          }}>
          {s.icon}
        </a>
      ))}
    </div>
  );
}

// ─── CHATBOT ──────────────────────────────────────────────────────────────────
const BOT_FLOWS = {
  start: {
    msg: "👋 Hey! I'm Orby, Orbnix's assistant.\n\nWhat can I help you with today?",
    opts: [
      { label:"💻 I need a Website", next:"website" },
      { label:"📱 I need a Mobile App", next:"app" },
      { label:"🤖 I need an AI Bot", next:"ai" },
      { label:"💸 What are your prices?", next:"pricing" },
      { label:"📞 Talk to the team", next:"human" },
    ],
  },
  website: {
    msg: "Great! We build custom websites starting at ₹25,000.\n\nWhat kind of website do you need?",
    opts: [
      { label:"🏢 Business / Portfolio", next:"quote" },
      { label:"🛒 E-Commerce Store", next:"ecomm" },
      { label:"📰 Blog / Content Site", next:"quote" },
      { label:"⚙️ Web Application / SaaS", next:"quote" },
    ],
  },
  app: {
    msg: "Awesome! We build Flutter & React Native apps for iOS + Android.\n\nApp development starts at ₹80,000.\n\nWhat type of app do you have in mind?",
    opts: [
      { label:"🛍️ E-Commerce App", next:"quote" },
      { label:"📅 Booking / Service App", next:"quote" },
      { label:"🎓 Education / LMS App", next:"quote" },
      { label:"🏥 Healthcare App", next:"quote" },
      { label:"💡 Something else", next:"quote" },
    ],
  },
  ai: {
    msg: "Nice! AI agents are one of our specialties. 🤖\n\nWe build WhatsApp bots, lead qualification bots, appointment bots, support bots, and full AI-powered systems.\n\nAI projects start at ₹40,000.\n\nWhat would your bot do?",
    opts: [
      { label:"💬 Answer customer questions", next:"quote" },
      { label:"📅 Book appointments", next:"quote" },
      { label:"🎯 Qualify leads", next:"quote" },
      { label:"🛒 Handle orders", next:"quote" },
    ],
  },
  ecomm: {
    msg: "E-commerce is our most popular service!\n\nWe work with WooCommerce, Shopify, and custom stores.\n\n- WooCommerce starter: ₹40,000\n- Shopify setup: ₹35,000\n- Custom store: ₹1,50,000+\n\nAll include Razorpay/PhonePe, mobile-optimised design, and WhatsApp notifications.",
    opts: [
      { label:"📋 Get a free quote", next:"quote" },
      { label:"🔙 Back to start", next:"start" },
    ],
  },
  pricing: {
    msg: "Here's our pricing at a glance:\n\n🌐 Website Starter — ₹25,000\n(5 pages, 15 days, 100% yours)\n\n🚀 Website Growth — ₹55,000\n(15 pages + CMS, 30 days)\n\n📱 Mobile App — from ₹80,000\n\n🤖 AI Agent — from ₹40,000\n\n💎 Enterprise — custom quote\n\nAll projects: fixed quote, 50% on delivery, full code ownership.",
    opts: [
      { label:"📋 Get my project quoted", next:"quote" },
      { label:"🔙 Back to start", next:"start" },
    ],
  },
  human: {
    msg: "The Orbnix team typically replies within 2 hours ⚡\n\nBest ways to reach us:",
    opts: [
      { label:"💬 WhatsApp +91 90798 81416", next:"wa" },
      { label:"✉️ Email hello@orbnix.in", next:"email" },
      { label:"📋 Fill contact form", next:"form" },
    ],
  },
  quote: {
    msg: "Great choice! To prepare your free, fixed quote within 24 hours, I just need a couple of details.\n\nWhat's your name?",
    isInput: true,
    inputKey: "name",
    placeholder: "Your name...",
    next: "quote2",
  },
  quote2: {
    msg: "Nice to meet you, {name}! 👋\n\nWhat's the best email or WhatsApp to send your quote to?",
    isInput: true,
    inputKey: "contact",
    placeholder: "Email or WhatsApp number...",
    next: "quote3",
  },
  quote3: {
    msg: "Perfect! What's your approximate budget range?",
    opts: [
      { label:"Under ₹30,000", next:"done" },
      { label:"₹30,000 – ₹80,000", next:"done" },
      { label:"₹80,000 – ₹2,00,000", next:"done" },
      { label:"₹2,00,000+", next:"done" },
      { label:"Not sure yet", next:"done" },
    ],
  },
  done: {
    msg: "🎉 Perfect! We have everything we need.\n\nExpect your free quote within 24 hours. The Orbnix team will reach out to {contact} shortly!\n\nMeanwhile, feel free to check out our work or blog.",
    opts: [
      { label:"🔙 Back to start", next:"start" },
    ],
  },
  wa: { msg: "Open WhatsApp now 👉\nhttps://wa.me/919079881416\n\nSay hi and describe your project — we reply fast!", opts:[{label:"🔙 Back",next:"start"}] },
  email: { msg: "Drop us a line at:\nhello@orbnix.in\n\nWe reply within 2 hours during business hours (10am–7pm IST).", opts:[{label:"🔙 Back",next:"start"}] },
  form: { msg: "Fill out our contact form on the Contact page for a detailed inquiry — we'll get back within 24 hours with a proper quote.", opts:[{label:"🔙 Back",next:"start"}] },
};

function Chatbot({ setPage }) {
  const [open, setOpen] = useState(false);
  const [msgs, setMsgs] = useState([]);
  const [flow, setFlow] = useState("start");
  const [inputVal, setInputVal] = useState("");
  const [userData, setUserData] = useState({});
  const [typing, setTyping] = useState(false);
  const [unread, setUnread] = useState(1);
  const [nudge, setNudge] = useState(true);
  const bottomRef = useRef(null);
  const inputRef = useRef(null);

  // resolve template variables
  const resolve = (str) => str.replace(/\{(\w+)\}/g, (_,k) => userData[k] || k);

  const pushBot = (node, uData = userData) => {
    setTyping(true);
    setTimeout(() => {
      setTyping(false);
      setMsgs(m => [...m, { from:"bot", text: resolve(node.msg.replace(/\{(\w+)\}/g, (_,k) => uData[k] || k)), isInput: node.isInput, inputKey: node.inputKey, placeholder: node.placeholder, opts: node.opts }]);
    }, 700);
  };

  useEffect(() => {
    if (open && msgs.length === 0) {
      setNudge(false);
      pushBot(BOT_FLOWS.start);
    }
    if (open) setUnread(0);
  }, [open]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior:"smooth" });
    if (msgs.length > 0) {
      const last = msgs[msgs.length - 1];
      if (last.isInput && inputRef.current) setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [msgs, typing]);

  // nudge bubble after 8 sec
  useEffect(() => {
    const t = setTimeout(() => setNudge(true), 8000);
    return () => clearTimeout(t);
  }, []);

  const handleOpt = (opt) => {
    setMsgs(m => [...m, { from:"user", text: opt.label }]);
    if (opt.next === "form") { setPage("contact"); setOpen(false); return; }
    const nextNode = BOT_FLOWS[opt.next];
    if (nextNode) { setFlow(opt.next); pushBot(nextNode); }
  };

  const handleInput = (currentFlow) => {
    const node = BOT_FLOWS[currentFlow];
    if (!node || !inputVal.trim()) return;
    const val = inputVal.trim();
    const newUD = { ...userData, [node.inputKey]: val };
    setUserData(newUD);
    setMsgs(m => [...m, { from:"user", text: val }]);
    setInputVal("");
    const nextNode = BOT_FLOWS[node.next];
    if (nextNode) { setFlow(node.next); pushBot(nextNode, newUD); }
  };

  const reset = () => { setMsgs([]); setFlow("start"); setUserData({}); setInputVal(""); pushBot(BOT_FLOWS.start); };

  const lastBotMsg = [...msgs].reverse().find(m => m.from === "bot");

  return (
    <>
      {/* Nudge bubble */}
      {nudge && !open && (
        <div onClick={() => setOpen(true)} style={{position:"fixed",bottom:92,right:22,background:"#fff",borderRadius:14,padding:".75rem 1rem",boxShadow:"0 8px 32px rgba(0,0,0,.15)",cursor:"pointer",zIndex:1001,maxWidth:220,animation:"fadeUp .4s ease",border:"1px solid #E2E8F0"}}>
          <div style={{fontSize:".82rem",fontWeight:600,color:"#0F172A",lineHeight:1.5}}>👋 Need a free quote?</div>
          <div style={{fontSize:".75rem",color:"#64748B",marginTop:".2rem"}}>Chat with Orby — reply in 30 sec!</div>
          <div style={{position:"absolute",bottom:-7,right:28,width:14,height:14,background:"#fff",borderRight:"1px solid #E2E8F0",borderBottom:"1px solid #E2E8F0",transform:"rotate(45deg)"}}/>
        </div>
      )}

      {/* Chat window */}
      {open && (
        <div style={{position:"fixed",bottom:84,right:18,width:360,maxWidth:"calc(100vw - 32px)",background:"#fff",borderRadius:20,boxShadow:"0 24px 64px rgba(0,0,0,.18)",zIndex:1002,display:"flex",flexDirection:"column",overflow:"hidden",animation:"slideIn .3s ease",border:"1px solid #E2E8F0",height:520,maxHeight:"calc(100vh - 120px)"}}>
          {/* Header */}
          <div style={{background:"linear-gradient(135deg,#2563EB,#7C3AED)",padding:"1rem 1.2rem",display:"flex",alignItems:"center",gap:".75rem",flexShrink:0}}>
            <div style={{position:"relative"}}>
              <div style={{width:40,height:40,borderRadius:12,background:"rgba(255,255,255,.2)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"1.2rem"}}>🤖</div>
              <div style={{position:"absolute",bottom:1,right:1,width:10,height:10,background:"#10B981",borderRadius:"50%",border:"2px solid #2563EB",animation:"pulse 2s infinite"}}/>
            </div>
            <div style={{flex:1}}>
              <div style={{fontFamily:"'Bricolage Grotesque',sans-serif",fontWeight:800,fontSize:".95rem",color:"#fff"}}>Orby — Orbnix Assistant</div>
              <div style={{fontSize:".7rem",color:"rgba(255,255,255,.7)",display:"flex",alignItems:"center",gap:.4}}>
                <span style={{width:6,height:6,background:"#10B981",borderRadius:"50%",display:"inline-block"}}/>
                Online · Typically replies in seconds
              </div>
            </div>
            <button onClick={reset} title="Restart" style={{background:"rgba(255,255,255,.15)",border:"none",borderRadius:8,width:30,height:30,cursor:"pointer",color:"#fff",fontSize:".75rem",display:"flex",alignItems:"center",justifyContent:"center"}}>↺</button>
            <button onClick={() => setOpen(false)} style={{background:"rgba(255,255,255,.15)",border:"none",borderRadius:8,width:30,height:30,cursor:"pointer",color:"#fff",fontSize:1,display:"flex",alignItems:"center",justifyContent:"center"}}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="14" height="14"><path d="M18 6L6 18M6 6l12 12"/></svg>
            </button>
          </div>

          {/* Messages */}
          <div style={{flex:1,overflowY:"auto",padding:"1rem",display:"flex",flexDirection:"column",gap:".65rem",scrollbarWidth:"thin"}}>
            {msgs.map((m, i) => (
              <div key={i} style={{display:"flex",flexDirection:"column",alignItems:m.from==="user"?"flex-end":"flex-start",gap:".4rem"}}>
                <div style={{
                  maxWidth:"85%",padding:".7rem .95rem",borderRadius:m.from==="user"?"16px 16px 4px 16px":"16px 16px 16px 4px",
                  background:m.from==="user"?"linear-gradient(135deg,#2563EB,#7C3AED)":"#F1F5F9",
                  color:m.from==="user"?"#fff":"#0F172A",
                  fontSize:".84rem",lineHeight:1.65,fontFamily:"'Manrope',sans-serif",
                  whiteSpace:"pre-line",wordBreak:"break-word",
                }}>{m.text}</div>
                {m.isInput && m === lastBotMsg && (
                  <div style={{display:"flex",gap:".5rem",width:"100%",maxWidth:"85%"}}>
                    <input ref={inputRef} value={inputVal} onChange={e=>setInputVal(e.target.value)}
                      onKeyDown={e=>e.key==="Enter"&&handleInput(flow)}
                      placeholder={m.placeholder||"Type here..."} style={{flex:1,padding:".6rem .85rem",borderRadius:10,border:"1.5px solid #E2E8F0",fontFamily:"'Manrope',sans-serif",fontSize:".83rem",outline:"none",color:"#0F172A",background:"#fff"}}/>
                    <button onClick={()=>handleInput(flow)} style={{padding:".6rem .9rem",borderRadius:10,background:"linear-gradient(135deg,#2563EB,#7C3AED)",border:"none",cursor:"pointer",color:"#fff",fontSize:".85rem"}}>→</button>
                  </div>
                )}
                {m.opts && m === lastBotMsg && (
                  <div style={{display:"flex",flexDirection:"column",gap:".35rem",width:"100%",maxWidth:"90%"}}>
                    {m.opts.map((o,oi)=>(
                      <button key={oi} onClick={()=>handleOpt(o)} style={{textAlign:"left",padding:".6rem .9rem",borderRadius:10,border:"1.5px solid #E2E8F0",background:"#fff",cursor:"pointer",fontFamily:"'Manrope',sans-serif",fontSize:".81rem",fontWeight:600,color:"#334155",transition:"all .18s"}}
                        onMouseEnter={e=>{e.target.style.borderColor="#2563EB";e.target.style.color="#2563EB";e.target.style.background="#EFF6FF";}}
                        onMouseLeave={e=>{e.target.style.borderColor="#E2E8F0";e.target.style.color="#334155";e.target.style.background="#fff";}}>
                        {o.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
            {typing && (
              <div style={{display:"flex",gap:4,alignItems:"center",padding:".7rem .95rem",background:"#F1F5F9",borderRadius:"16px 16px 16px 4px",width:"fit-content"}}>
                {[0,1,2].map(i=>(
                  <span key={i} style={{width:7,height:7,background:"#94A3B8",borderRadius:"50%",display:"inline-block",animation:`blink .9s ${i*.2}s infinite`}}/>
                ))}
              </div>
            )}
            <div ref={bottomRef}/>
          </div>

          {/* Footer */}
          <div style={{padding:".65rem 1.2rem",borderTop:"1px solid #F1F5F9",textAlign:"center",flexShrink:0}}>
            <span style={{fontSize:".68rem",color:"#94A3B8",fontFamily:"'JetBrains Mono',monospace"}}>Powered by Orbnix · hello@orbnix.in</span>
          </div>
        </div>
      )}

      {/* FAB Button */}
      <button onClick={() => { setOpen(!open); setNudge(false); }} style={{
        position:"fixed",bottom:18,right:18,width:58,height:58,borderRadius:18,
        background: open ? "#0F172A" : "linear-gradient(135deg,#2563EB,#7C3AED)",
        border:"none",cursor:"pointer",color:"#fff",zIndex:1003,
        boxShadow: open ? "0 4px 20px rgba(0,0,0,.3)" : "0 8px 28px rgba(37,99,235,.45)",
        display:"flex",alignItems:"center",justifyContent:"center",
        transition:"all .25s cubic-bezier(.4,0,.2,1)",
        transform: open ? "scale(1.05) rotate(0deg)" : "scale(1)",
      }}>
        {open
          ? <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" width="22" height="22"><path d="M18 6L6 18M6 6l12 12"/></svg>
          : <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="22" height="22"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>
        }
        {!open && unread > 0 && (
          <div style={{position:"absolute",top:-4,right:-4,width:18,height:18,background:"#EF4444",borderRadius:"50%",border:"2px solid #fff",display:"flex",alignItems:"center",justifyContent:"center",fontSize:".6rem",fontWeight:800}}>{unread}</div>
        )}
      </button>
    </>
  );
}

// ─── APP ROOT ─────────────────────────────────────────────────────────────────
// ─── ROUTER WRAPPER ───────────────────────────────────────────────────────────
const INDIA_LOCATIONS = [
  ["anantapur","Anantapur","Andhra Pradesh"],
  ["chittoor","Chittoor","Andhra Pradesh"],
  ["east-godavari","East Godavari","Andhra Pradesh"],
  ["guntur","Guntur","Andhra Pradesh"],
  ["kadapa","Kadapa","Andhra Pradesh"],
  ["krishna","Krishna","Andhra Pradesh"],
  ["kurnool","Kurnool","Andhra Pradesh"],
  ["nellore","Nellore","Andhra Pradesh"],
  ["prakasam","Prakasam","Andhra Pradesh"],
  ["srikakulam","Srikakulam","Andhra Pradesh"],
  ["visakhapatnam","Visakhapatnam","Andhra Pradesh"],
  ["vizianagaram","Vizianagaram","Andhra Pradesh"],
  ["west-godavari","West Godavari","Andhra Pradesh"],
  ["tirupati","Tirupati","Andhra Pradesh"],
  ["vijayawada","Vijayawada","Andhra Pradesh"],
  ["kakinada","Kakinada","Andhra Pradesh"],
  ["rajahmundry","Rajahmundry","Andhra Pradesh"],
  ["nandyal","Nandyal","Andhra Pradesh"],
  ["ongole","Ongole","Andhra Pradesh"],
  ["eluru","Eluru","Andhra Pradesh"],
  ["bapatla","Bapatla","Andhra Pradesh"],
  ["parvathipuram-manyam","Parvathipuram Manyam","Andhra Pradesh"],
  ["alluri-sitharama-raju","Alluri Sitharama Raju","Andhra Pradesh"],
  ["anakapalli","Anakapalli","Andhra Pradesh"],
  ["konaseema","Konaseema","Andhra Pradesh"],
  ["sri-sathya-sai","Sri Sathya Sai","Andhra Pradesh"],
  ["anjaw","Anjaw","Arunachal Pradesh"],
  ["changlang","Changlang","Arunachal Pradesh"],
  ["dibang-valley","Dibang Valley","Arunachal Pradesh"],
  ["east-kameng","East Kameng","Arunachal Pradesh"],
  ["east-siang","East Siang","Arunachal Pradesh"],
  ["itanagar","Itanagar","Arunachal Pradesh"],
  ["kamle","Kamle","Arunachal Pradesh"],
  ["kra-daadi","Kra Daadi","Arunachal Pradesh"],
  ["kurung-kumey","Kurung Kumey","Arunachal Pradesh"],
  ["lepa-rada","Lepa Rada","Arunachal Pradesh"],
  ["lohit","Lohit","Arunachal Pradesh"],
  ["longding","Longding","Arunachal Pradesh"],
  ["lower-dibang-valley","Lower Dibang Valley","Arunachal Pradesh"],
  ["lower-siang","Lower Siang","Arunachal Pradesh"],
  ["lower-subansiri","Lower Subansiri","Arunachal Pradesh"],
  ["namsai","Namsai","Arunachal Pradesh"],
  ["pakke-kessang","Pakke Kessang","Arunachal Pradesh"],
  ["papum-pare","Papum Pare","Arunachal Pradesh"],
  ["shi-yomi","Shi Yomi","Arunachal Pradesh"],
  ["siang","Siang","Arunachal Pradesh"],
  ["tawang","Tawang","Arunachal Pradesh"],
  ["tirap","Tirap","Arunachal Pradesh"],
  ["upper-dibang-valley","Upper Dibang Valley","Arunachal Pradesh"],
  ["upper-siang","Upper Siang","Arunachal Pradesh"],
  ["upper-subansiri","Upper Subansiri","Arunachal Pradesh"],
  ["west-kameng","West Kameng","Arunachal Pradesh"],
  ["west-siang","West Siang","Arunachal Pradesh"],
  ["baksa","Baksa","Assam"],
  ["barpeta","Barpeta","Assam"],
  ["biswanath","Biswanath","Assam"],
  ["bongaigaon","Bongaigaon","Assam"],
  ["cachar","Cachar","Assam"],
  ["charaideo","Charaideo","Assam"],
  ["chirang","Chirang","Assam"],
  ["darrang","Darrang","Assam"],
  ["dhemaji","Dhemaji","Assam"],
  ["dhubri","Dhubri","Assam"],
  ["dibrugarh","Dibrugarh","Assam"],
  ["dima-hasao","Dima Hasao","Assam"],
  ["goalpara","Goalpara","Assam"],
  ["golaghat","Golaghat","Assam"],
  ["guwahati","Guwahati","Assam"],
  ["hailakandi","Hailakandi","Assam"],
  ["hojai","Hojai","Assam"],
  ["jorhat","Jorhat","Assam"],
  ["kamrup","Kamrup","Assam"],
  ["kamrup-metropolitan","Kamrup Metropolitan","Assam"],
  ["karbi-anglong","Karbi Anglong","Assam"],
  ["karimganj","Karimganj","Assam"],
  ["kokrajhar","Kokrajhar","Assam"],
  ["lakhimpur","Lakhimpur","Assam"],
  ["majuli","Majuli","Assam"],
  ["morigaon","Morigaon","Assam"],
  ["nagaon","Nagaon","Assam"],
  ["nalbari","Nalbari","Assam"],
  ["sivasagar","Sivasagar","Assam"],
  ["silchar","Silchar","Assam"],
  ["sonitpur","Sonitpur","Assam"],
  ["south-salmara-mankachar","South Salmara Mankachar","Assam"],
  ["tinsukia","Tinsukia","Assam"],
  ["udalguri","Udalguri","Assam"],
  ["west-karbi-anglong","West Karbi Anglong","Assam"],
  ["araria","Araria","Bihar"],
  ["arwal","Arwal","Bihar"],
  ["aurangabad","Aurangabad","Bihar"],
  ["banka","Banka","Bihar"],
  ["begusarai","Begusarai","Bihar"],
  ["bhagalpur","Bhagalpur","Bihar"],
  ["bhojpur","Bhojpur","Bihar"],
  ["buxar","Buxar","Bihar"],
  ["darbhanga","Darbhanga","Bihar"],
  ["east-champaran","East Champaran","Bihar"],
  ["gaya","Gaya","Bihar"],
  ["gopalganj","Gopalganj","Bihar"],
  ["jamui","Jamui","Bihar"],
  ["jehanabad","Jehanabad","Bihar"],
  ["kaimur","Kaimur","Bihar"],
  ["katihar","Katihar","Bihar"],
  ["khagaria","Khagaria","Bihar"],
  ["kishanganj","Kishanganj","Bihar"],
  ["lakhisarai","Lakhisarai","Bihar"],
  ["madhepura","Madhepura","Bihar"],
  ["madhubani","Madhubani","Bihar"],
  ["munger","Munger","Bihar"],
  ["muzaffarpur","Muzaffarpur","Bihar"],
  ["nalanda","Nalanda","Bihar"],
  ["nawada","Nawada","Bihar"],
  ["patna","Patna","Bihar"],
  ["purnia","Purnia","Bihar"],
  ["rohtas","Rohtas","Bihar"],
  ["saharsa","Saharsa","Bihar"],
  ["samastipur","Samastipur","Bihar"],
  ["saran","Saran","Bihar"],
  ["sheikhpura","Sheikhpura","Bihar"],
  ["sheohar","Sheohar","Bihar"],
  ["sitamarhi","Sitamarhi","Bihar"],
  ["siwan","Siwan","Bihar"],
  ["supaul","Supaul","Bihar"],
  ["vaishali","Vaishali","Bihar"],
  ["west-champaran","West Champaran","Bihar"],
  ["balod","Balod","Chhattisgarh"],
  ["baloda-bazar","Baloda Bazar","Chhattisgarh"],
  ["balrampur","Balrampur","Chhattisgarh"],
  ["bastar","Bastar","Chhattisgarh"],
  ["bemetara","Bemetara","Chhattisgarh"],
  ["bijapur","Bijapur","Chhattisgarh"],
  ["bilaspur","Bilaspur","Chhattisgarh"],
  ["dantewada","Dantewada","Chhattisgarh"],
  ["dhamtari","Dhamtari","Chhattisgarh"],
  ["durg","Durg","Chhattisgarh"],
  ["gariaband","Gariaband","Chhattisgarh"],
  ["gaurela-pendra-marwahi","Gaurela Pendra Marwahi","Chhattisgarh"],
  ["janjgir-champa","Janjgir Champa","Chhattisgarh"],
  ["jashpur","Jashpur","Chhattisgarh"],
  ["kabirdham","Kabirdham","Chhattisgarh"],
  ["kanker","Kanker","Chhattisgarh"],
  ["khairagarh","Khairagarh","Chhattisgarh"],
  ["kondagaon","Kondagaon","Chhattisgarh"],
  ["korba","Korba","Chhattisgarh"],
  ["koriya","Koriya","Chhattisgarh"],
  ["mahasamund","Mahasamund","Chhattisgarh"],
  ["manendragarh","Manendragarh","Chhattisgarh"],
  ["mohla-manpur","Mohla Manpur","Chhattisgarh"],
  ["mungeli","Mungeli","Chhattisgarh"],
  ["narayanpur","Narayanpur","Chhattisgarh"],
  ["raigarh","Raigarh","Chhattisgarh"],
  ["raipur","Raipur","Chhattisgarh"],
  ["rajnandgaon","Rajnandgaon","Chhattisgarh"],
  ["sakti","Sakti","Chhattisgarh"],
  ["sarangarh-bilaigarh","Sarangarh Bilaigarh","Chhattisgarh"],
  ["sukma","Sukma","Chhattisgarh"],
  ["surajpur","Surajpur","Chhattisgarh"],
  ["surguja","Surguja","Chhattisgarh"],
  ["north-goa","North Goa","Goa"],
  ["south-goa","South Goa","Goa"],
  ["ahmedabad","Ahmedabad","Gujarat"],
  ["amreli","Amreli","Gujarat"],
  ["anand","Anand","Gujarat"],
  ["aravalli","Aravalli","Gujarat"],
  ["banaskantha","Banaskantha","Gujarat"],
  ["bharuch","Bharuch","Gujarat"],
  ["bhavnagar","Bhavnagar","Gujarat"],
  ["botad","Botad","Gujarat"],
  ["chhota-udaipur","Chhota Udaipur","Gujarat"],
  ["dahod","Dahod","Gujarat"],
  ["dang","Dang","Gujarat"],
  ["devbhoomi-dwarka","Devbhoomi Dwarka","Gujarat"],
  ["gandhinagar","Gandhinagar","Gujarat"],
  ["gir-somnath","Gir Somnath","Gujarat"],
  ["jamnagar","Jamnagar","Gujarat"],
  ["junagadh","Junagadh","Gujarat"],
  ["kheda","Kheda","Gujarat"],
  ["kutch","Kutch","Gujarat"],
  ["mahisagar","Mahisagar","Gujarat"],
  ["mehsana","Mehsana","Gujarat"],
  ["morbi","Morbi","Gujarat"],
  ["narmada","Narmada","Gujarat"],
  ["navsari","Navsari","Gujarat"],
  ["panchmahal","Panchmahal","Gujarat"],
  ["patan","Patan","Gujarat"],
  ["porbandar","Porbandar","Gujarat"],
  ["rajkot","Rajkot","Gujarat"],
  ["sabarkantha","Sabarkantha","Gujarat"],
  ["surat","Surat","Gujarat"],
  ["surendranagar","Surendranagar","Gujarat"],
  ["tapi","Tapi","Gujarat"],
  ["vadodara","Vadodara","Gujarat"],
  ["valsad","Valsad","Gujarat"],
  ["ambala","Ambala","Haryana"],
  ["bhiwani","Bhiwani","Haryana"],
  ["charkhi-dadri","Charkhi Dadri","Haryana"],
  ["faridabad","Faridabad","Haryana"],
  ["fatehabad","Fatehabad","Haryana"],
  ["gurugram","Gurugram","Haryana"],
  ["hisar","Hisar","Haryana"],
  ["jhajjar","Jhajjar","Haryana"],
  ["jind","Jind","Haryana"],
  ["kaithal","Kaithal","Haryana"],
  ["karnal","Karnal","Haryana"],
  ["kurukshetra","Kurukshetra","Haryana"],
  ["mahendragarh","Mahendragarh","Haryana"],
  ["nuh","Nuh","Haryana"],
  ["palwal","Palwal","Haryana"],
  ["panchkula","Panchkula","Haryana"],
  ["panipat","Panipat","Haryana"],
  ["rewari","Rewari","Haryana"],
  ["rohtak","Rohtak","Haryana"],
  ["sirsa","Sirsa","Haryana"],
  ["sonipat","Sonipat","Haryana"],
  ["yamunanagar","Yamunanagar","Haryana"],
  ["bilaspur-hp","Bilaspur","Himachal Pradesh"],
  ["chamba","Chamba","Himachal Pradesh"],
  ["hamirpur-hp","Hamirpur","Himachal Pradesh"],
  ["kangra","Kangra","Himachal Pradesh"],
  ["kinnaur","Kinnaur","Himachal Pradesh"],
  ["kullu","Kullu","Himachal Pradesh"],
  ["lahaul-spiti","Lahaul Spiti","Himachal Pradesh"],
  ["mandi","Mandi","Himachal Pradesh"],
  ["shimla","Shimla","Himachal Pradesh"],
  ["sirmaur","Sirmaur","Himachal Pradesh"],
  ["solan","Solan","Himachal Pradesh"],
  ["una","Una","Himachal Pradesh"],
  ["bokaro","Bokaro","Jharkhand"],
  ["chatra","Chatra","Jharkhand"],
  ["deoghar","Deoghar","Jharkhand"],
  ["dhanbad","Dhanbad","Jharkhand"],
  ["dumka","Dumka","Jharkhand"],
  ["east-singhbhum","East Singhbhum","Jharkhand"],
  ["garhwa","Garhwa","Jharkhand"],
  ["giridih","Giridih","Jharkhand"],
  ["godda","Godda","Jharkhand"],
  ["gumla","Gumla","Jharkhand"],
  ["hazaribagh","Hazaribagh","Jharkhand"],
  ["jamtara","Jamtara","Jharkhand"],
  ["jamshedpur","Jamshedpur","Jharkhand"],
  ["khunti","Khunti","Jharkhand"],
  ["koderma","Koderma","Jharkhand"],
  ["latehar","Latehar","Jharkhand"],
  ["lohardaga","Lohardaga","Jharkhand"],
  ["pakur","Pakur","Jharkhand"],
  ["palamu","Palamu","Jharkhand"],
  ["ramgarh","Ramgarh","Jharkhand"],
  ["ranchi","Ranchi","Jharkhand"],
  ["sahebganj","Sahebganj","Jharkhand"],
  ["seraikela-kharsawan","Seraikela Kharsawan","Jharkhand"],
  ["simdega","Simdega","Jharkhand"],
  ["west-singhbhum","West Singhbhum","Jharkhand"],
  ["bagalkot","Bagalkot","Karnataka"],
  ["bangalore-rural","Bangalore Rural","Karnataka"],
  ["bangalore-urban","Bangalore Urban","Karnataka"],
  ["belgaum","Belgaum","Karnataka"],
  ["bellary","Bellary","Karnataka"],
  ["bidar","Bidar","Karnataka"],
  ["chamarajanagar","Chamarajanagar","Karnataka"],
  ["chikballapur","Chikballapur","Karnataka"],
  ["chikkamagaluru","Chikkamagaluru","Karnataka"],
  ["chitradurga","Chitradurga","Karnataka"],
  ["dakshina-kannada","Dakshina Kannada","Karnataka"],
  ["davangere","Davangere","Karnataka"],
  ["dharwad","Dharwad","Karnataka"],
  ["gadag","Gadag","Karnataka"],
  ["gulbarga","Gulbarga","Karnataka"],
  ["hassan","Hassan","Karnataka"],
  ["haveri","Haveri","Karnataka"],
  ["kodagu","Kodagu","Karnataka"],
  ["kolar","Kolar","Karnataka"],
  ["koppal","Koppal","Karnataka"],
  ["mandya","Mandya","Karnataka"],
  ["mangalore","Mangalore","Karnataka"],
  ["mysore","Mysore","Karnataka"],
  ["raichur","Raichur","Karnataka"],
  ["ramanagara","Ramanagara","Karnataka"],
  ["shimoga","Shimoga","Karnataka"],
  ["tumkur","Tumkur","Karnataka"],
  ["udupi","Udupi","Karnataka"],
  ["uttara-kannada","Uttara Kannada","Karnataka"],
  ["vijayapura","Vijayapura","Karnataka"],
  ["yadgir","Yadgir","Karnataka"],
  ["alappuzha","Alappuzha","Kerala"],
  ["ernakulam","Ernakulam","Kerala"],
  ["idukki","Idukki","Kerala"],
  ["kannur","Kannur","Kerala"],
  ["kasaragod","Kasaragod","Kerala"],
  ["kochi","Kochi","Kerala"],
  ["kollam","Kollam","Kerala"],
  ["kottayam","Kottayam","Kerala"],
  ["kozhikode","Kozhikode","Kerala"],
  ["malappuram","Malappuram","Kerala"],
  ["palakkad","Palakkad","Kerala"],
  ["pathanamthitta","Pathanamthitta","Kerala"],
  ["thiruvananthapuram","Thiruvananthapuram","Kerala"],
  ["thrissur","Thrissur","Kerala"],
  ["wayanad","Wayanad","Kerala"],
  ["agar-malwa","Agar Malwa","Madhya Pradesh"],
  ["alirajpur","Alirajpur","Madhya Pradesh"],
  ["anuppur","Anuppur","Madhya Pradesh"],
  ["ashoknagar","Ashoknagar","Madhya Pradesh"],
  ["balaghat","Balaghat","Madhya Pradesh"],
  ["barwani","Barwani","Madhya Pradesh"],
  ["betul","Betul","Madhya Pradesh"],
  ["bhind","Bhind","Madhya Pradesh"],
  ["bhopal","Bhopal","Madhya Pradesh"],
  ["burhanpur","Burhanpur","Madhya Pradesh"],
  ["chhatarpur","Chhatarpur","Madhya Pradesh"],
  ["chhindwara","Chhindwara","Madhya Pradesh"],
  ["damoh","Damoh","Madhya Pradesh"],
  ["datia","Datia","Madhya Pradesh"],
  ["dewas","Dewas","Madhya Pradesh"],
  ["dhar","Dhar","Madhya Pradesh"],
  ["dindori","Dindori","Madhya Pradesh"],
  ["guna","Guna","Madhya Pradesh"],
  ["gwalior","Gwalior","Madhya Pradesh"],
  ["harda","Harda","Madhya Pradesh"],
  ["hoshangabad","Hoshangabad","Madhya Pradesh"],
  ["indore","Indore","Madhya Pradesh"],
  ["jabalpur","Jabalpur","Madhya Pradesh"],
  ["jhabua","Jhabua","Madhya Pradesh"],
  ["katni","Katni","Madhya Pradesh"],
  ["khandwa","Khandwa","Madhya Pradesh"],
  ["khargone","Khargone","Madhya Pradesh"],
  ["mandla","Mandla","Madhya Pradesh"],
  ["mandsaur","Mandsaur","Madhya Pradesh"],
  ["morena","Morena","Madhya Pradesh"],
  ["narsinghpur","Narsinghpur","Madhya Pradesh"],
  ["neemuch","Neemuch","Madhya Pradesh"],
  ["niwari","Niwari","Madhya Pradesh"],
  ["panna","Panna","Madhya Pradesh"],
  ["raisen","Raisen","Madhya Pradesh"],
  ["rajgarh","Rajgarh","Madhya Pradesh"],
  ["ratlam","Ratlam","Madhya Pradesh"],
  ["rewa","Rewa","Madhya Pradesh"],
  ["sagar","Sagar","Madhya Pradesh"],
  ["satna","Satna","Madhya Pradesh"],
  ["sehore","Sehore","Madhya Pradesh"],
  ["seoni","Seoni","Madhya Pradesh"],
  ["shahdol","Shahdol","Madhya Pradesh"],
  ["shajapur","Shajapur","Madhya Pradesh"],
  ["sheopur","Sheopur","Madhya Pradesh"],
  ["shivpuri","Shivpuri","Madhya Pradesh"],
  ["sidhi","Sidhi","Madhya Pradesh"],
  ["singrauli","Singrauli","Madhya Pradesh"],
  ["tikamgarh","Tikamgarh","Madhya Pradesh"],
  ["ujjain","Ujjain","Madhya Pradesh"],
  ["umaria","Umaria","Madhya Pradesh"],
  ["vidisha","Vidisha","Madhya Pradesh"],
  ["ahmednagar","Ahmednagar","Maharashtra"],
  ["akola","Akola","Maharashtra"],
  ["amravati","Amravati","Maharashtra"],
  ["beed","Beed","Maharashtra"],
  ["bhandara","Bhandara","Maharashtra"],
  ["buldhana","Buldhana","Maharashtra"],
  ["chandrapur","Chandrapur","Maharashtra"],
  ["dhule","Dhule","Maharashtra"],
  ["gadchiroli","Gadchiroli","Maharashtra"],
  ["gondia","Gondia","Maharashtra"],
  ["hingoli","Hingoli","Maharashtra"],
  ["jalgaon","Jalgaon","Maharashtra"],
  ["jalna","Jalna","Maharashtra"],
  ["kolhapur","Kolhapur","Maharashtra"],
  ["latur","Latur","Maharashtra"],
  ["mumbai-city","Mumbai City","Maharashtra"],
  ["mumbai-suburban","Mumbai Suburban","Maharashtra"],
  ["nagpur","Nagpur","Maharashtra"],
  ["nanded","Nanded","Maharashtra"],
  ["nandurbar","Nandurbar","Maharashtra"],
  ["nashik","Nashik","Maharashtra"],
  ["osmanabad","Osmanabad","Maharashtra"],
  ["palghar","Palghar","Maharashtra"],
  ["parbhani","Parbhani","Maharashtra"],
  ["pune","Pune","Maharashtra"],
  ["raigad","Raigad","Maharashtra"],
  ["ratnagiri","Ratnagiri","Maharashtra"],
  ["sangli","Sangli","Maharashtra"],
  ["satara","Satara","Maharashtra"],
  ["sindhudurg","Sindhudurg","Maharashtra"],
  ["solapur","Solapur","Maharashtra"],
  ["thane","Thane","Maharashtra"],
  ["wardha","Wardha","Maharashtra"],
  ["washim","Washim","Maharashtra"],
  ["yavatmal","Yavatmal","Maharashtra"],
  ["bishnupur","Bishnupur","Manipur"],
  ["chandel","Chandel","Manipur"],
  ["churachandpur","Churachandpur","Manipur"],
  ["imphal-east","Imphal East","Manipur"],
  ["imphal-west","Imphal West","Manipur"],
  ["jiribam","Jiribam","Manipur"],
  ["kakching","Kakching","Manipur"],
  ["kamjong","Kamjong","Manipur"],
  ["kangpokpi","Kangpokpi","Manipur"],
  ["noney","Noney","Manipur"],
  ["pherzawl","Pherzawl","Manipur"],
  ["senapati","Senapati","Manipur"],
  ["tamenglong","Tamenglong","Manipur"],
  ["tengnoupal","Tengnoupal","Manipur"],
  ["thoubal","Thoubal","Manipur"],
  ["ukhrul","Ukhrul","Manipur"],
  ["east-garo-hills","East Garo Hills","Meghalaya"],
  ["east-jaintia-hills","East Jaintia Hills","Meghalaya"],
  ["east-khasi-hills","East Khasi Hills","Meghalaya"],
  ["eastern-west-khasi-hills","Eastern West Khasi Hills","Meghalaya"],
  ["north-garo-hills","North Garo Hills","Meghalaya"],
  ["ri-bhoi","Ri Bhoi","Meghalaya"],
  ["shillong","Shillong","Meghalaya"],
  ["south-garo-hills","South Garo Hills","Meghalaya"],
  ["south-west-garo-hills","South West Garo Hills","Meghalaya"],
  ["south-west-khasi-hills","South West Khasi Hills","Meghalaya"],
  ["west-garo-hills","West Garo Hills","Meghalaya"],
  ["west-jaintia-hills","West Jaintia Hills","Meghalaya"],
  ["west-khasi-hills","West Khasi Hills","Meghalaya"],
  ["aizawl","Aizawl","Mizoram"],
  ["champhai","Champhai","Mizoram"],
  ["hnahthial","Hnahthial","Mizoram"],
  ["khawzawl","Khawzawl","Mizoram"],
  ["kolasib","Kolasib","Mizoram"],
  ["lawngtlai","Lawngtlai","Mizoram"],
  ["lunglei","Lunglei","Mizoram"],
  ["mamit","Mamit","Mizoram"],
  ["saitual","Saitual","Mizoram"],
  ["serchhip","Serchhip","Mizoram"],
  ["siaha","Siaha","Mizoram"],
  ["chumoukedima","Chumoukedima","Nagaland"],
  ["dimapur","Dimapur","Nagaland"],
  ["kiphire","Kiphire","Nagaland"],
  ["kohima","Kohima","Nagaland"],
  ["longleng","Longleng","Nagaland"],
  ["mokokchung","Mokokchung","Nagaland"],
  ["mon","Mon","Nagaland"],
  ["niuland","Niuland","Nagaland"],
  ["noklak","Noklak","Nagaland"],
  ["peren","Peren","Nagaland"],
  ["phek","Phek","Nagaland"],
  ["shamator","Shamator","Nagaland"],
  ["tseminyu","Tseminyu","Nagaland"],
  ["tuensang","Tuensang","Nagaland"],
  ["wokha","Wokha","Nagaland"],
  ["zunheboto","Zunheboto","Nagaland"],
  ["angul","Angul","Odisha"],
  ["balangir","Balangir","Odisha"],
  ["balasore","Balasore","Odisha"],
  ["bargarh","Bargarh","Odisha"],
  ["bhadrak","Bhadrak","Odisha"],
  ["bhubaneswar","Bhubaneswar","Odisha"],
  ["boudh","Boudh","Odisha"],
  ["cuttack","Cuttack","Odisha"],
  ["deogarh","Deogarh","Odisha"],
  ["dhenkanal","Dhenkanal","Odisha"],
  ["gajapati","Gajapati","Odisha"],
  ["ganjam","Ganjam","Odisha"],
  ["jagatsinghpur","Jagatsinghpur","Odisha"],
  ["jajpur","Jajpur","Odisha"],
  ["jharsuguda","Jharsuguda","Odisha"],
  ["kalahandi","Kalahandi","Odisha"],
  ["kandhamal","Kandhamal","Odisha"],
  ["kendrapara","Kendrapara","Odisha"],
  ["kendujhar","Kendujhar","Odisha"],
  ["khordha","Khordha","Odisha"],
  ["koraput","Koraput","Odisha"],
  ["malkangiri","Malkangiri","Odisha"],
  ["mayurbhanj","Mayurbhanj","Odisha"],
  ["nabarangpur","Nabarangpur","Odisha"],
  ["nayagarh","Nayagarh","Odisha"],
  ["nuapada","Nuapada","Odisha"],
  ["puri","Puri","Odisha"],
  ["rayagada","Rayagada","Odisha"],
  ["sambalpur","Sambalpur","Odisha"],
  ["sonepur","Sonepur","Odisha"],
  ["sundargarh","Sundargarh","Odisha"],
  ["amritsar","Amritsar","Punjab"],
  ["barnala","Barnala","Punjab"],
  ["bathinda","Bathinda","Punjab"],
  ["faridkot","Faridkot","Punjab"],
  ["fatehgarh-sahib","Fatehgarh Sahib","Punjab"],
  ["fazilka","Fazilka","Punjab"],
  ["ferozepur","Ferozepur","Punjab"],
  ["gurdaspur","Gurdaspur","Punjab"],
  ["hoshiarpur","Hoshiarpur","Punjab"],
  ["jalandhar","Jalandhar","Punjab"],
  ["kapurthala","Kapurthala","Punjab"],
  ["ludhiana","Ludhiana","Punjab"],
  ["malerkotla","Malerkotla","Punjab"],
  ["mansa","Mansa","Punjab"],
  ["moga","Moga","Punjab"],
  ["mohali","Mohali","Punjab"],
  ["muktsar","Muktsar","Punjab"],
  ["pathankot","Pathankot","Punjab"],
  ["patiala","Patiala","Punjab"],
  ["rupnagar","Rupnagar","Punjab"],
  ["sangrur","Sangrur","Punjab"],
  ["shahid-bhagat-singh-nagar","Shahid Bhagat Singh Nagar","Punjab"],
  ["tarn-taran","Tarn Taran","Punjab"],
  ["ajmer","Ajmer","Rajasthan"],
  ["alwar","Alwar","Rajasthan"],
  ["anupgarh","Anupgarh","Rajasthan"],
  ["balotra","Balotra","Rajasthan"],
  ["banswara","Banswara","Rajasthan"],
  ["baran","Baran","Rajasthan"],
  ["barmer","Barmer","Rajasthan"],
  ["beawar","Beawar","Rajasthan"],
  ["bharatpur","Bharatpur","Rajasthan"],
  ["bhilwara","Bhilwara","Rajasthan"],
  ["bikaner","Bikaner","Rajasthan"],
  ["bundi","Bundi","Rajasthan"],
  ["chittorgarh","Chittorgarh","Rajasthan"],
  ["churu","Churu","Rajasthan"],
  ["dausa","Dausa","Rajasthan"],
  ["deeg","Deeg","Rajasthan"],
  ["dhaulpur","Dhaulpur","Rajasthan"],
  ["didwana-kuchaman","Didwana Kuchaman","Rajasthan"],
  ["dungarpur","Dungarpur","Rajasthan"],
  ["ganganagar","Ganganagar","Rajasthan"],
  ["hanumangarh","Hanumangarh","Rajasthan"],
  ["jaipur","Jaipur","Rajasthan"],
  ["jaipur-rural","Jaipur Rural","Rajasthan"],
  ["jaisalmer","Jaisalmer","Rajasthan"],
  ["jalore","Jalore","Rajasthan"],
  ["jhalawar","Jhalawar","Rajasthan"],
  ["jhunjhunu","Jhunjhunu","Rajasthan"],
  ["jodhpur","Jodhpur","Rajasthan"],
  ["jodhpur-rural","Jodhpur Rural","Rajasthan"],
  ["karauli","Karauli","Rajasthan"],
  ["kekri","Kekri","Rajasthan"],
  ["kota","Kota","Rajasthan"],
  ["kotputli-behror","Kotputli Behror","Rajasthan"],
  ["nagaur","Nagaur","Rajasthan"],
  ["neem-ka-thana","Neem Ka Thana","Rajasthan"],
  ["pali","Pali","Rajasthan"],
  ["phalodi","Phalodi","Rajasthan"],
  ["pratapgarh","Pratapgarh","Rajasthan"],
  ["rajsamand","Rajsamand","Rajasthan"],
  ["salumbar","Salumbar","Rajasthan"],
  ["sanchore","Sanchore","Rajasthan"],
  ["sawai-madhopur","Sawai Madhopur","Rajasthan"],
  ["shahpura","Shahpura","Rajasthan"],
  ["sikar","Sikar","Rajasthan"],
  ["sirohi","Sirohi","Rajasthan"],
  ["tonk","Tonk","Rajasthan"],
  ["udaipur","Udaipur","Rajasthan"],
  ["east-sikkim","East Sikkim","Sikkim"],
  ["gangtok","Gangtok","Sikkim"],
  ["north-sikkim","North Sikkim","Sikkim"],
  ["pakyong","Pakyong","Sikkim"],
  ["soreng","Soreng","Sikkim"],
  ["west-sikkim","West Sikkim","Sikkim"],
  ["ariyalur","Ariyalur","Tamil Nadu"],
  ["chengalpattu","Chengalpattu","Tamil Nadu"],
  ["chennai","Chennai","Tamil Nadu"],
  ["coimbatore","Coimbatore","Tamil Nadu"],
  ["cuddalore","Cuddalore","Tamil Nadu"],
  ["dharmapuri","Dharmapuri","Tamil Nadu"],
  ["dindigul","Dindigul","Tamil Nadu"],
  ["erode","Erode","Tamil Nadu"],
  ["kallakurichi","Kallakurichi","Tamil Nadu"],
  ["kancheepuram","Kancheepuram","Tamil Nadu"],
  ["kanniyakumari","Kanniyakumari","Tamil Nadu"],
  ["karur","Karur","Tamil Nadu"],
  ["krishnagiri","Krishnagiri","Tamil Nadu"],
  ["madurai","Madurai","Tamil Nadu"],
  ["mayiladuthurai","Mayiladuthurai","Tamil Nadu"],
  ["nagapattinam","Nagapattinam","Tamil Nadu"],
  ["namakkal","Namakkal","Tamil Nadu"],
  ["nilgiris","Nilgiris","Tamil Nadu"],
  ["perambalur","Perambalur","Tamil Nadu"],
  ["pudukkottai","Pudukkottai","Tamil Nadu"],
  ["ramanathapuram","Ramanathapuram","Tamil Nadu"],
  ["ranipet","Ranipet","Tamil Nadu"],
  ["salem","Salem","Tamil Nadu"],
  ["sivaganga","Sivaganga","Tamil Nadu"],
  ["tenkasi","Tenkasi","Tamil Nadu"],
  ["thanjavur","Thanjavur","Tamil Nadu"],
  ["theni","Theni","Tamil Nadu"],
  ["thoothukudi","Thoothukudi","Tamil Nadu"],
  ["tiruchirappalli","Tiruchirappalli","Tamil Nadu"],
  ["tirunelveli","Tirunelveli","Tamil Nadu"],
  ["tirupathur","Tirupathur","Tamil Nadu"],
  ["tiruppur","Tiruppur","Tamil Nadu"],
  ["tiruvallur","Tiruvallur","Tamil Nadu"],
  ["tiruvannamalai","Tiruvannamalai","Tamil Nadu"],
  ["tiruvarur","Tiruvarur","Tamil Nadu"],
  ["vellore","Vellore","Tamil Nadu"],
  ["viluppuram","Viluppuram","Tamil Nadu"],
  ["virudhunagar","Virudhunagar","Tamil Nadu"],
  ["adilabad","Adilabad","Telangana"],
  ["bhadradri-kothagudem","Bhadradri Kothagudem","Telangana"],
  ["hanumakonda","Hanumakonda","Telangana"],
  ["hyderabad","Hyderabad","Telangana"],
  ["jagtial","Jagtial","Telangana"],
  ["jangaon","Jangaon","Telangana"],
  ["jayashankar-bhupalpally","Jayashankar Bhupalpally","Telangana"],
  ["jogulamba-gadwal","Jogulamba Gadwal","Telangana"],
  ["kamareddy","Kamareddy","Telangana"],
  ["karimnagar","Karimnagar","Telangana"],
  ["khammam","Khammam","Telangana"],
  ["komaram-bheem","Komaram Bheem","Telangana"],
  ["mahabubabad","Mahabubabad","Telangana"],
  ["mahabubnagar","Mahabubnagar","Telangana"],
  ["mancherial","Mancherial","Telangana"],
  ["medak","Medak","Telangana"],
  ["medchal-malkajgiri","Medchal Malkajgiri","Telangana"],
  ["mulugu","Mulugu","Telangana"],
  ["nagarkurnool","Nagarkurnool","Telangana"],
  ["nalgonda","Nalgonda","Telangana"],
  ["narayanpet","Narayanpet","Telangana"],
  ["nirmal","Nirmal","Telangana"],
  ["nizamabad","Nizamabad","Telangana"],
  ["peddapalli","Peddapalli","Telangana"],
  ["rajanna-sircilla","Rajanna Sircilla","Telangana"],
  ["rangareddy","Rangareddy","Telangana"],
  ["sangareddy","Sangareddy","Telangana"],
  ["siddipet","Siddipet","Telangana"],
  ["suryapet","Suryapet","Telangana"],
  ["vikarabad","Vikarabad","Telangana"],
  ["wanaparthy","Wanaparthy","Telangana"],
  ["warangal","Warangal","Telangana"],
  ["yadadri-bhuvanagiri","Yadadri Bhuvanagiri","Telangana"],
  ["dhalai","Dhalai","Tripura"],
  ["gomati","Gomati","Tripura"],
  ["khowai","Khowai","Tripura"],
  ["north-tripura","North Tripura","Tripura"],
  ["sepahijala","Sepahijala","Tripura"],
  ["south-tripura","South Tripura","Tripura"],
  ["unakoti","Unakoti","Tripura"],
  ["west-tripura","West Tripura","Tripura"],
  ["agra","Agra","Uttar Pradesh"],
  ["aligarh","Aligarh","Uttar Pradesh"],
  ["prayagraj","Prayagraj","Uttar Pradesh"],
  ["ambedkar-nagar","Ambedkar Nagar","Uttar Pradesh"],
  ["amethi","Amethi","Uttar Pradesh"],
  ["amroha","Amroha","Uttar Pradesh"],
  ["auraiya","Auraiya","Uttar Pradesh"],
  ["ayodhya","Ayodhya","Uttar Pradesh"],
  ["azamgarh","Azamgarh","Uttar Pradesh"],
  ["baghpat","Baghpat","Uttar Pradesh"],
  ["bahraich","Bahraich","Uttar Pradesh"],
  ["ballia","Ballia","Uttar Pradesh"],
  ["banda","Banda","Uttar Pradesh"],
  ["barabanki","Barabanki","Uttar Pradesh"],
  ["bareilly","Bareilly","Uttar Pradesh"],
  ["basti","Basti","Uttar Pradesh"],
  ["bhadohi","Bhadohi","Uttar Pradesh"],
  ["bijnor","Bijnor","Uttar Pradesh"],
  ["budaun","Budaun","Uttar Pradesh"],
  ["bulandshahr","Bulandshahr","Uttar Pradesh"],
  ["chandauli","Chandauli","Uttar Pradesh"],
  ["chitrakoot","Chitrakoot","Uttar Pradesh"],
  ["deoria","Deoria","Uttar Pradesh"],
  ["etah","Etah","Uttar Pradesh"],
  ["etawah","Etawah","Uttar Pradesh"],
  ["farrukhabad","Farrukhabad","Uttar Pradesh"],
  ["fatehpur","Fatehpur","Uttar Pradesh"],
  ["firozabad","Firozabad","Uttar Pradesh"],
  ["gautam-buddha-nagar","Gautam Buddha Nagar","Uttar Pradesh"],
  ["ghaziabad","Ghaziabad","Uttar Pradesh"],
  ["ghazipur","Ghazipur","Uttar Pradesh"],
  ["gonda","Gonda","Uttar Pradesh"],
  ["gorakhpur","Gorakhpur","Uttar Pradesh"],
  ["hamirpur-up","Hamirpur","Uttar Pradesh"],
  ["hapur","Hapur","Uttar Pradesh"],
  ["hardoi","Hardoi","Uttar Pradesh"],
  ["hathras","Hathras","Uttar Pradesh"],
  ["jalaun","Jalaun","Uttar Pradesh"],
  ["jaunpur","Jaunpur","Uttar Pradesh"],
  ["jhansi","Jhansi","Uttar Pradesh"],
  ["kannauj","Kannauj","Uttar Pradesh"],
  ["kanpur-dehat","Kanpur Dehat","Uttar Pradesh"],
  ["kanpur-nagar","Kanpur Nagar","Uttar Pradesh"],
  ["kasganj","Kasganj","Uttar Pradesh"],
  ["kaushambi","Kaushambi","Uttar Pradesh"],
  ["kheri","Kheri","Uttar Pradesh"],
  ["kushinagar","Kushinagar","Uttar Pradesh"],
  ["lalitpur","Lalitpur","Uttar Pradesh"],
  ["lucknow","Lucknow","Uttar Pradesh"],
  ["maharajganj","Maharajganj","Uttar Pradesh"],
  ["mahoba","Mahoba","Uttar Pradesh"],
  ["mainpuri","Mainpuri","Uttar Pradesh"],
  ["mathura","Mathura","Uttar Pradesh"],
  ["mau","Mau","Uttar Pradesh"],
  ["meerut","Meerut","Uttar Pradesh"],
  ["mirzapur","Mirzapur","Uttar Pradesh"],
  ["moradabad","Moradabad","Uttar Pradesh"],
  ["muzaffarnagar","Muzaffarnagar","Uttar Pradesh"],
  ["noida","Noida","Uttar Pradesh"],
  ["pilibhit","Pilibhit","Uttar Pradesh"],
  ["pratapgarh-up","Pratapgarh","Uttar Pradesh"],
  ["raebareli","Raebareli","Uttar Pradesh"],
  ["rampur","Rampur","Uttar Pradesh"],
  ["saharanpur","Saharanpur","Uttar Pradesh"],
  ["sambhal","Sambhal","Uttar Pradesh"],
  ["sant-kabir-nagar","Sant Kabir Nagar","Uttar Pradesh"],
  ["shahjahanpur","Shahjahanpur","Uttar Pradesh"],
  ["shamli","Shamli","Uttar Pradesh"],
  ["shravasti","Shravasti","Uttar Pradesh"],
  ["siddharthnagar","Siddharthnagar","Uttar Pradesh"],
  ["sitapur","Sitapur","Uttar Pradesh"],
  ["sonbhadra","Sonbhadra","Uttar Pradesh"],
  ["sultanpur","Sultanpur","Uttar Pradesh"],
  ["unnao","Unnao","Uttar Pradesh"],
  ["varanasi","Varanasi","Uttar Pradesh"],
  ["almora","Almora","Uttarakhand"],
  ["bageshwar","Bageshwar","Uttarakhand"],
  ["chamoli","Chamoli","Uttarakhand"],
  ["champawat","Champawat","Uttarakhand"],
  ["dehradun","Dehradun","Uttarakhand"],
  ["haridwar","Haridwar","Uttarakhand"],
  ["nainital","Nainital","Uttarakhand"],
  ["pauri-garhwal","Pauri Garhwal","Uttarakhand"],
  ["pithoragarh","Pithoragarh","Uttarakhand"],
  ["rudraprayag","Rudraprayag","Uttarakhand"],
  ["tehri-garhwal","Tehri Garhwal","Uttarakhand"],
  ["udham-singh-nagar","Udham Singh Nagar","Uttarakhand"],
  ["uttarkashi","Uttarkashi","Uttarakhand"],
  ["alipurduar","Alipurduar","West Bengal"],
  ["bankura","Bankura","West Bengal"],
  ["birbhum","Birbhum","West Bengal"],
  ["cooch-behar","Cooch Behar","West Bengal"],
  ["dakshin-dinajpur","Dakshin Dinajpur","West Bengal"],
  ["darjeeling","Darjeeling","West Bengal"],
  ["hooghly","Hooghly","West Bengal"],
  ["howrah","Howrah","West Bengal"],
  ["jalpaiguri","Jalpaiguri","West Bengal"],
  ["jhargram","Jhargram","West Bengal"],
  ["kalimpong","Kalimpong","West Bengal"],
  ["kolkata","Kolkata","West Bengal"],
  ["malda","Malda","West Bengal"],
  ["murshidabad","Murshidabad","West Bengal"],
  ["nadia","Nadia","West Bengal"],
  ["north-24-parganas","North 24 Parganas","West Bengal"],
  ["paschim-bardhaman","Paschim Bardhaman","West Bengal"],
  ["paschim-medinipur","Paschim Medinipur","West Bengal"],
  ["purba-bardhaman","Purba Bardhaman","West Bengal"],
  ["purba-medinipur","Purba Medinipur","West Bengal"],
  ["purulia","Purulia","West Bengal"],
  ["south-24-parganas","South 24 Parganas","West Bengal"],
  ["uttar-dinajpur","Uttar Dinajpur","West Bengal"],
  ["delhi","Delhi","Delhi"],
  ["new-delhi","New Delhi","Delhi"],
  ["chandigarh","Chandigarh","Chandigarh"],
  ["puducherry","Puducherry","Puducherry"],
  ["karaikal","Karaikal","Puducherry"],
  ["mahe","Mahe","Puducherry"],
  ["yanam","Yanam","Puducherry"],
  ["daman","Daman","Dadra & Nagar Haveli and Daman & Diu"],
  ["diu","Diu","Dadra & Nagar Haveli and Daman & Diu"],
  ["dadra","Dadra & Nagar Haveli","Dadra & Nagar Haveli and Daman & Diu"],
  ["lakshadweep","Lakshadweep","Lakshadweep"],
  ["port-blair","Port Blair","Andaman & Nicobar Islands"],
  ["srinagar","Srinagar","Jammu & Kashmir"],
  ["jammu","Jammu","Jammu & Kashmir"],
  ["anantnag","Anantnag","Jammu & Kashmir"],
  ["baramulla","Baramulla","Jammu & Kashmir"],
  ["budgam","Budgam","Jammu & Kashmir"],
  ["bandipora","Bandipora","Jammu & Kashmir"],
  ["ganderbal","Ganderbal","Jammu & Kashmir"],
  ["kulgam","Kulgam","Jammu & Kashmir"],
  ["kupwara","Kupwara","Jammu & Kashmir"],
  ["pulwama","Pulwama","Jammu & Kashmir"],
  ["rajouri","Rajouri","Jammu & Kashmir"],
  ["ramban","Ramban","Jammu & Kashmir"],
  ["reasi","Reasi","Jammu & Kashmir"],
  ["samba","Samba","Jammu & Kashmir"],
  ["shopian","Shopian","Jammu & Kashmir"],
  ["udhampur","Udhampur","Jammu & Kashmir"],
  ["kathua","Kathua","Jammu & Kashmir"],
  ["doda","Doda","Jammu & Kashmir"],
  ["kishtwar","Kishtwar","Jammu & Kashmir"],
  ["poonch","Poonch","Jammu & Kashmir"],
  ["leh","Leh","Ladakh"],
  ["kargil","Kargil","Ladakh"],
];



// ─── CITY LANDING PAGE ────────────────────────────────────────────────────────
function CityPage({ city, slug, state }) {
  useEffect(() => {
    document.title = `Web Development Company in ${city} — Orbnix | Websites, Apps & AI Near You`;
    let desc = document.querySelector('meta[name="description"]');
    if (!desc) { desc = document.createElement('meta'); desc.name = 'description'; document.head.appendChild(desc); }
    desc.content = `Orbnix is a top-rated web development company and software product company serving businesses and institutions in ${city}, ${state}. We build websites, mobile apps, AI chatbots and e-commerce stores. 7–14 day delivery. Starting ₹25,000. Free consultation in 24 hrs.`;
    let canon = document.querySelector('link[rel="canonical"]');
    if (!canon) { canon = document.createElement('link'); canon.rel = 'canonical'; document.head.appendChild(canon); }
    canon.href = `https://www.orbnix.in/cities/${slug}`;
  }, [city, slug, state]);

  const SERVICES = [
    { icon: "🌐", title: "Website Design & Development", desc: `Custom, mobile-first websites for businesses in ${city}. React, Next.js, WordPress. SEO-ready from day one.`, price: "From ₹25,000" },
    { icon: "📱", title: "Mobile App Development", desc: `Flutter & React Native apps for Android and iOS. Built for ${city} businesses expanding digitally.`, price: "From ₹60,000" },
    { icon: "🤖", title: "AI Chatbot & Automation", desc: `Smart chatbots that handle customer queries 24/7. Perfect for clinics, schools and businesses in ${city}.`, price: "From ₹35,000" },
    { icon: "🛒", title: "E-Commerce Store", desc: `Full-featured online stores with payments, inventory and delivery. Sell across ${city} and pan-India.`, price: "From ₹45,000" },
    { icon: "📊", title: "ERP & CRM Systems", desc: `Custom business management software for factories, schools and enterprises in ${city}.`, price: "From ₹80,000" },
    { icon: "🎨", title: "UI/UX Design", desc: `Beautiful, conversion-focused designs that make your ${city} business stand out from the competition.`, price: "From ₹15,000" },
    { icon: "🔍", title: "SEO & Digital Marketing", desc: `Rank on Google for "${city} near me" searches. Local SEO, content and paid campaigns.`, price: "From ₹12,000/mo" },
    { icon: "☁️", title: "Cloud & Hosting Setup", desc: `Vercel, AWS, DigitalOcean setup with SSL, backups and 99.9% uptime for your ${city} business.`, price: "From ₹8,000" },
  ];

  const INDUSTRIES = [
    { icon: "🏥", name: "Clinics & Hospitals" },
    { icon: "🎓", name: "Schools & Colleges" },
    { icon: "🏨", name: "Hotels & Resorts" },
    { icon: "🍽️", name: "Restaurants & Cafes" },
    { icon: "⚖️", name: "CA Firms & Lawyers" },
    { icon: "🏭", name: "Factories & Manufacturers" },
    { icon: "🏠", name: "Real Estate Agents" },
    { icon: "🛍️", name: "Retailers & D2C Brands" },
    { icon: "💊", name: "Pharmacies & Labs" },
    { icon: "🚗", name: "Auto Dealers" },
    { icon: "💪", name: "Gyms & Fitness" },
    { icon: "🎨", name: "Interior Designers" },
  ];

  const PROCESS = [
    { step: "01", title: "Free Consultation", desc: "Tell us about your business in " + city + ". We respond within 24 hours — no cost, no obligation.", icon: "📞" },
    { step: "02", title: "Design & Proposal", desc: "We share a detailed design mockup and fixed-price quote. No hidden costs, ever.", icon: "🎨" },
    { step: "03", title: "Build & Deliver", desc: "We build your project in 7–14 days. You review and approve before we go live.", icon: "⚡" },
    { step: "04", title: "Launch & Support", desc: "We launch your website and provide 30 days of free support after delivery.", icon: "🚀" },
  ];

  const FAQS = [
    { q: `How much does a website cost in ${city}?`, a: `Our websites start from ₹25,000 for a basic business site. E-commerce stores start from ₹45,000 and mobile apps from ₹60,000. All prices are fixed — no surprises.` },
    { q: `How long does it take to build a website?`, a: `Standard websites are delivered in 7–14 days. Mobile apps take 4–8 weeks. We guarantee delivery timelines in writing before starting.` },
    { q: `Do you visit ${city} clients in person?`, a: `We are a remote-first agency serving all of India. All communication is via WhatsApp, Zoom and email — which means no travel costs for you and faster turnaround.` },
    { q: `What is the payment structure?`, a: `We charge 50% advance and 50% only after delivery and your approval. You never pay the full amount upfront.` },
    { q: `Will I own the website code?`, a: `100% yes. We hand over all source code, hosting credentials and domain access on delivery. No lock-in, ever.` },
    { q: `Do you provide SEO for ${city} businesses?`, a: `Yes — every website we build is SEO-optimised from day one. We also offer ongoing local SEO packages to help you rank for "${city} near me" searches.` },
  ];

  const STATS = [
    { num: "7–14", label: "Days delivery", sub: "Guaranteed in writing" },
    { num: "50+", label: "Industries served", sub: "Across all of India" },
    { num: "50%", label: "Pay on delivery", sub: "Risk-free for you" },
    { num: "30", label: "Days free support", sub: "After every launch" },
  ];

  const [openFaq, setOpenFaq] = useState(null);

  const S = {
    font: "'Bricolage Grotesque', sans-serif",
    mono: "'JetBrains Mono', monospace",
    body: "'Manrope', sans-serif",
    blue: "#2563eb",
    navy: "#0f172a",
    orange: "#f97316",
    gray: "#64748b",
    lightbg: "#f8fafc",
    border: "#e2e8f0",
  };

  return (
    <main style={{paddingTop:"4.5rem",minHeight:"100vh",background:"#fff",fontFamily:S.body}}>

      {/* ── HERO ── */}
      <section style={{background:"linear-gradient(135deg,#0f172a 0%,#1e3a8a 60%,#7c3aed 100%)",padding:"5rem 1.5rem 5rem",textAlign:"center",position:"relative",overflow:"hidden"}}>
        {/* Glow blobs */}
        <div style={{position:"absolute",top:-80,right:-80,width:400,height:400,background:"rgba(124,58,237,.15)",borderRadius:"50%",filter:"blur(60px)"}}/>
        <div style={{position:"absolute",bottom:-60,left:-60,width:300,height:300,background:"rgba(37,99,235,.2)",borderRadius:"50%",filter:"blur(50px)"}}/>
        <div style={{position:"relative",zIndex:1}}>
          <div style={{display:"inline-block",background:"rgba(251,191,36,.15)",border:"1.5px solid rgba(251,191,36,.4)",borderRadius:20,padding:".35rem 1.1rem",fontFamily:S.mono,fontSize:".72rem",color:"#fbbf24",marginBottom:"1.4rem",letterSpacing:".1em"}}>
            WEB DEVELOPMENT COMPANY · {city.toUpperCase()} · {state.toUpperCase()}
          </div>
          <h1 style={{fontFamily:S.font,fontSize:"clamp(2rem,5.5vw,3.8rem)",fontWeight:900,color:"#fff",marginBottom:"1rem",lineHeight:1.1,letterSpacing:"-.02em"}}>
            Web Development<br/>Company Near You<br/><span style={{color:"#fbbf24"}}>in {city}</span>
          </h1>
          <p style={{color:"rgba(255,255,255,.8)",fontSize:"clamp(1rem,2vw,1.2rem)",maxWidth:640,margin:"0 auto 2.5rem",lineHeight:1.75}}>
            Orbnix builds professional websites, mobile apps, AI chatbots and e-commerce stores for businesses in {city}, {state}. Fast delivery. Fair pricing. Full code ownership.
          </p>
          <div style={{display:"flex",gap:"1rem",justifyContent:"center",flexWrap:"wrap"}}>
            <a href="/contact" style={{background:S.orange,color:"#fff",padding:".9rem 2.2rem",borderRadius:14,fontWeight:800,textDecoration:"none",fontSize:"1rem",fontFamily:S.font,boxShadow:"0 4px 24px rgba(249,115,22,.4)"}}>Get Free Consultation →</a>
            <a href="https://wa.me/919079881416" target="_blank" rel="noopener noreferrer" style={{background:"rgba(255,255,255,.1)",color:"#fff",padding:".9rem 2.2rem",borderRadius:14,fontWeight:700,textDecoration:"none",fontSize:"1rem",border:"1.5px solid rgba(255,255,255,.25)"}}>💬 WhatsApp Us</a>
          </div>
          {/* Stats row */}
          <div style={{display:"flex",flexWrap:"wrap",justifyContent:"center",gap:"2rem",marginTop:"3.5rem"}}>
            {STATS.map(s => (
              <div key={s.num} style={{textAlign:"center"}}>
                <div style={{fontFamily:S.font,fontSize:"clamp(1.8rem,4vw,2.8rem)",fontWeight:900,color:"#fbbf24",lineHeight:1}}>{s.num}</div>
                <div style={{color:"#fff",fontWeight:700,fontSize:".95rem",marginTop:".2rem"}}>{s.label}</div>
                <div style={{color:"rgba(255,255,255,.55)",fontSize:".75rem"}}>{s.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY ORBNIX ── */}
      <section style={{padding:"5rem 1.5rem",maxWidth:1200,margin:"0 auto"}}>
        <div style={{textAlign:"center",marginBottom:"3.5rem"}}>
          <div style={{display:"inline-block",background:"#eff6ff",color:S.blue,borderRadius:20,padding:".35rem 1.1rem",fontFamily:S.mono,fontSize:".72rem",fontWeight:700,marginBottom:"1rem",letterSpacing:".08em"}}>WHY ORBNIX</div>
          <h2 style={{fontFamily:S.font,fontSize:"clamp(1.8rem,4vw,2.8rem)",fontWeight:900,color:S.navy,marginBottom:".75rem"}}>Why {city} Businesses Choose Us</h2>
          <p style={{color:S.gray,fontSize:"1.05rem",maxWidth:560,margin:"0 auto"}}>We're a remote-first agency — which means no office overheads, no middle-men, and better value for every rupee you spend.</p>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(300px,1fr))",gap:"1.5rem"}}>
          {[
            ["⚡","7–14 Day Delivery","Your website live in under 2 weeks — faster than any local agency in "+city+"."],
            ["💰","50% Pay On Delivery","Pay half upfront, the rest only when you're satisfied. We put our reputation on the line."],
            ["🔓","Full Code Ownership","You own 100% of your code, hosting and domain. No subscriptions, no lock-in, ever."],
            ["📱","Mobile-First Always","Every project is designed for mobile first — because 80% of your "+city+" customers are on phones."],
            ["🔍","SEO From Day One","Your website ranks on Google from launch. We build SEO into the code, not as an afterthought."],
            ["🛡️","30-Day Free Support","Free bug fixes and support for 30 days after launch. We don't disappear after delivery."],
          ].map(([icon, title, desc]) => (
            <div key={title} style={{background:S.lightbg,borderRadius:18,padding:"1.75rem",border:`1.5px solid ${S.border}`,transition:"box-shadow .2s"}}>
              <div style={{fontSize:"2rem",marginBottom:"1rem"}}>{icon}</div>
              <div style={{fontFamily:S.font,fontWeight:800,fontSize:"1.1rem",color:S.navy,marginBottom:".5rem"}}>{title}</div>
              <div style={{color:S.gray,fontSize:".9rem",lineHeight:1.7}}>{desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section style={{background:S.lightbg,padding:"5rem 1.5rem"}}>
        <div style={{maxWidth:1200,margin:"0 auto"}}>
          <div style={{textAlign:"center",marginBottom:"3.5rem"}}>
            <div style={{display:"inline-block",background:"#eff6ff",color:S.blue,borderRadius:20,padding:".35rem 1.1rem",fontFamily:S.mono,fontSize:".72rem",fontWeight:700,marginBottom:"1rem",letterSpacing:".08em"}}>OUR SERVICES</div>
            <h2 style={{fontFamily:S.font,fontSize:"clamp(1.8rem,4vw,2.8rem)",fontWeight:900,color:S.navy,marginBottom:".75rem"}}>What We Build for {city} Businesses</h2>
            <p style={{color:S.gray,fontSize:"1.05rem",maxWidth:540,margin:"0 auto"}}>From simple landing pages to complex enterprise systems — we build it all, fast and affordable.</p>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(280px,1fr))",gap:"1.5rem"}}>
            {SERVICES.map(svc => (
              <div key={svc.title} style={{background:"#fff",borderRadius:18,padding:"1.75rem",border:`1.5px solid ${S.border}`,display:"flex",flexDirection:"column",gap:".75rem"}}>
                <div style={{fontSize:"2.2rem"}}>{svc.icon}</div>
                <div style={{fontFamily:S.font,fontWeight:800,fontSize:"1.05rem",color:S.navy}}>{svc.title}</div>
                <div style={{color:S.gray,fontSize:".88rem",lineHeight:1.7,flex:1}}>{svc.desc}</div>
                <div style={{fontFamily:S.mono,fontSize:".8rem",fontWeight:700,color:S.blue,background:"#eff6ff",borderRadius:8,padding:".35rem .8rem",alignSelf:"flex-start"}}>{svc.price}</div>
              </div>
            ))}
          </div>
          <div style={{textAlign:"center",marginTop:"2.5rem"}}>
            <a href="/pricing" style={{background:S.blue,color:"#fff",padding:".9rem 2.2rem",borderRadius:14,fontWeight:700,textDecoration:"none",fontSize:"1rem",fontFamily:S.font}}>View All Pricing →</a>
          </div>
        </div>
      </section>

      {/* ── INDUSTRIES ── */}
      <section style={{padding:"5rem 1.5rem",maxWidth:1200,margin:"0 auto"}}>
        <div style={{textAlign:"center",marginBottom:"3rem"}}>
          <div style={{display:"inline-block",background:"#eff6ff",color:S.blue,borderRadius:20,padding:".35rem 1.1rem",fontFamily:S.mono,fontSize:".72rem",fontWeight:700,marginBottom:"1rem",letterSpacing:".08em"}}>INDUSTRIES</div>
          <h2 style={{fontFamily:S.font,fontSize:"clamp(1.8rem,4vw,2.8rem)",fontWeight:900,color:S.navy,marginBottom:".75rem"}}>Who We Serve in {city}</h2>
          <p style={{color:S.gray,fontSize:"1.05rem",maxWidth:500,margin:"0 auto"}}>We've built for 50+ industries. If you run a business in {city}, we have experience in your space.</p>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(180px,1fr))",gap:"1rem"}}>
          {INDUSTRIES.map(ind => (
            <div key={ind.name} style={{background:S.lightbg,borderRadius:14,padding:"1.25rem 1rem",border:`1.5px solid ${S.border}`,textAlign:"center"}}>
              <div style={{fontSize:"1.8rem",marginBottom:".5rem"}}>{ind.icon}</div>
              <div style={{fontFamily:S.font,fontWeight:700,fontSize:".9rem",color:S.navy}}>{ind.name}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── SCHOOL ERP PRODUCT SECTION ── */}
      <section style={{padding:"4rem 1.5rem",background:"linear-gradient(135deg,#0F172A 0%,#1E3A5F 100%)",position:"relative",overflow:"hidden"}}>
        <div style={{position:"absolute",top:-80,right:-80,width:350,height:350,background:"radial-gradient(circle,rgba(37,99,235,.2) 0%,transparent 70%)",pointerEvents:"none"}}/>
        <div style={{maxWidth:1100,margin:"0 auto",position:"relative"}}>
          <div style={{display:"inline-flex",alignItems:"center",gap:8,background:"rgba(37,99,235,.2)",border:"1px solid rgba(37,99,235,.4)",borderRadius:20,padding:"5px 14px",marginBottom:20}}>
            <span style={{width:7,height:7,background:"#22c55e",borderRadius:"50%",display:"inline-block"}}/>
            <span style={{color:"#93c5fd",fontSize:".75rem",fontWeight:700,letterSpacing:".06em"}}>🏫 FEATURED PRODUCT — SCHOOL ERP</span>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"3rem",alignItems:"center"}}>
            <div>
              <h2 style={{fontFamily:"'Bricolage Grotesque',sans-serif",fontSize:"clamp(1.6rem,3.5vw,2.5rem)",fontWeight:900,color:"#fff",lineHeight:1.1,marginBottom:16}}>
                School ERP for<br/>
                <span style={{color:"#60a5fa"}}>Schools in {city}</span>
              </h2>
              <p style={{color:"rgba(255,255,255,.65)",lineHeight:1.75,marginBottom:24,fontSize:".95rem"}}>
                Orbnix School ERP is a complete AI-enabled school management system — covering students, attendance, fees, exams, transport, library and parent communication. Built specifically for Indian schools.
              </p>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:28}}>
                {[
                  ["👥","Student Profiles & History"],
                  ["✅","Attendance + SMS Alerts"],
                  ["💰","Fee Collection & Reminders"],
                  ["📝","Online Exams & Report Cards"],
                  ["🚌","Transport & GPS Tracking"],
                  ["✨","AI Studio — Reports & Papers"],
                  ["👨‍👩‍👧","Parent App — Android & iOS"],
                  ["🌐","School Website CMS"],
                ].map(([icon,label])=>(
                  <div key={label} style={{display:"flex",alignItems:"center",gap:8,background:"rgba(255,255,255,.06)",borderRadius:10,padding:"8px 12px",border:"1px solid rgba(255,255,255,.08)"}}>
                    <span style={{fontSize:".9rem"}}>{icon}</span>
                    <span style={{color:"rgba(255,255,255,.8)",fontSize:".78rem",fontWeight:500}}>{label}</span>
                  </div>
                ))}
              </div>
              <div style={{display:"flex",gap:10,flexWrap:"wrap"}}>
                <a href="/products" style={{background:"#2563EB",color:"#fff",padding:"11px 24px",borderRadius:10,fontWeight:700,fontSize:".88rem",textDecoration:"none",boxShadow:"0 6px 20px rgba(37,99,235,.4)"}}>View School ERP →</a>
                <a href="/contact" style={{background:"rgba(255,255,255,.08)",color:"#fff",padding:"11px 24px",borderRadius:10,fontWeight:600,fontSize:".88rem",textDecoration:"none",border:"1.5px solid rgba(255,255,255,.2)"}}>Book Free Demo</a>
              </div>
            </div>
            <div style={{background:"#0F172A",borderRadius:16,overflow:"hidden",border:"1.5px solid rgba(255,255,255,.08)",boxShadow:"0 20px 60px rgba(0,0,0,.4)"}}>
              <div style={{background:"#1e293b",padding:"8px 14px",display:"flex",alignItems:"center",gap:6,borderBottom:"1px solid rgba(255,255,255,.06)"}}>
                {["#ff5f57","#febc2e","#28c840"].map(c=><div key={c} style={{width:10,height:10,borderRadius:"50%",background:c}}/>)}
                <span style={{color:"rgba(255,255,255,.3)",fontSize:".7rem",marginLeft:6}}>erp.school.in — Dashboard</span>
              </div>
              <div style={{display:"flex",minHeight:320}}>
                <div style={{width:140,background:"#1a2744",borderRight:"1px solid rgba(255,255,255,.05)",padding:"12px 0",flexShrink:0}}>
                  {[["👥","Students"],["✅","Attendance"],["💰","Fees"],["📝","Exams"],["🚌","Transport"],["👨‍💼","Staff"],["📢","Notices"],["✨","AI Studio"]].map(([ic,lb],i)=>(
                    <div key={lb} style={{display:"flex",alignItems:"center",gap:8,padding:"7px 12px",background:i===0?"rgba(37,99,235,.2)":"transparent"}}>
                      <span style={{fontSize:".78rem"}}>{ic}</span>
                      <span style={{color:i===0?"#60a5fa":"rgba(255,255,255,.5)",fontSize:".72rem",fontWeight:i===0?700:400}}>{lb}</span>
                    </div>
                  ))}
                </div>
                <div style={{flex:1,padding:14}}>
                  <div style={{color:"rgba(255,255,255,.35)",fontSize:".65rem",marginBottom:4}}>Academic Year 2025–26</div>
                  <div style={{color:"#fff",fontWeight:800,fontSize:".95rem",marginBottom:12}}>🎓 School Dashboard</div>
                  <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginBottom:10}}>
                    {[["👥","1,240","Students","#2563EB"],["✅","94%","Attendance","#10b981"],["💰","23","Defaulters","#f59e0b"],["👨‍💼","86","Staff","#7c3aed"]].map(([ic,val,lb,col])=>(
                      <div key={lb} style={{background:"rgba(255,255,255,.05)",borderRadius:8,padding:10,border:"1px solid rgba(255,255,255,.06)"}}>
                        <div style={{fontSize:".75rem",marginBottom:4}}>{ic}</div>
                        <div style={{fontWeight:900,color:"#fff",fontSize:"1.1rem",lineHeight:1}}>{val}</div>
                        <div style={{color:"rgba(255,255,255,.4)",fontSize:".62rem"}}>{lb}</div>
                      </div>
                    ))}
                  </div>
                  <div style={{background:"rgba(255,255,255,.04)",borderRadius:8,padding:10,border:"1px solid rgba(255,255,255,.06)"}}>
                    <div style={{color:"rgba(255,255,255,.5)",fontSize:".65rem",marginBottom:6}}>Quick Actions</div>
                    <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>
                      {["✅ Attendance","💰 Collect Fee","📢 Notice","📝 Exam"].map(a=>(
                        <div key={a} style={{background:"rgba(37,99,235,.2)",borderRadius:6,padding:"4px 8px",color:"#60a5fa",fontSize:".62rem",fontWeight:600}}>{a}</div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section style={{background:S.navy,padding:"5rem 1.5rem"}}>
        <div style={{maxWidth:1100,margin:"0 auto"}}>
          <div style={{textAlign:"center",marginBottom:"3.5rem"}}>
            <div style={{display:"inline-block",background:"rgba(255,255,255,.1)",color:"rgba(255,255,255,.7)",borderRadius:20,padding:".35rem 1.1rem",fontFamily:S.mono,fontSize:".72rem",fontWeight:700,marginBottom:"1rem",letterSpacing:".08em"}}>PROCESS</div>
            <h2 style={{fontFamily:S.font,fontSize:"clamp(1.8rem,4vw,2.8rem)",fontWeight:900,color:"#fff",marginBottom:".75rem"}}>How It Works</h2>
            <p style={{color:"rgba(255,255,255,.6)",fontSize:"1.05rem"}}>From first WhatsApp to live website — here's exactly what happens.</p>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(240px,1fr))",gap:"1.5rem"}}>
            {PROCESS.map((p, i) => (
              <div key={p.step} style={{background:"rgba(255,255,255,.06)",borderRadius:18,padding:"2rem 1.5rem",border:"1.5px solid rgba(255,255,255,.1)",position:"relative"}}>
                <div style={{fontFamily:S.mono,fontSize:"2.5rem",fontWeight:900,color:"rgba(255,255,255,.08)",position:"absolute",top:"1rem",right:"1.25rem"}}>{p.step}</div>
                <div style={{fontSize:"2rem",marginBottom:"1rem"}}>{p.icon}</div>
                <div style={{fontFamily:S.font,fontWeight:800,fontSize:"1.1rem",color:"#fff",marginBottom:".6rem"}}>{p.title}</div>
                <div style={{color:"rgba(255,255,255,.6)",fontSize:".9rem",lineHeight:1.7}}>{p.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRICING SNAPSHOT ── */}
      <section style={{padding:"5rem 1.5rem",maxWidth:1100,margin:"0 auto"}}>
        <div style={{textAlign:"center",marginBottom:"3.5rem"}}>
          <div style={{display:"inline-block",background:"#eff6ff",color:S.blue,borderRadius:20,padding:".35rem 1.1rem",fontFamily:S.mono,fontSize:".72rem",fontWeight:700,marginBottom:"1rem",letterSpacing:".08em"}}>PRICING</div>
          <h2 style={{fontFamily:S.font,fontSize:"clamp(1.8rem,4vw,2.8rem)",fontWeight:900,color:S.navy,marginBottom:".75rem"}}>Transparent Pricing for {city} Businesses</h2>
          <p style={{color:S.gray,fontSize:"1.05rem"}}>Fixed prices. No hidden fees. No surprises.</p>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(260px,1fr))",gap:"1.5rem"}}>
          {[
            { name:"Landing Page", price:"₹25,000", duration:"7 days", features:["5 sections","Mobile responsive","Contact form","SEO optimised","1 revision round"] },
            { name:"Business Website", price:"₹45,000", duration:"10 days", features:["10+ pages","Blog/CMS","WhatsApp chat","Google Analytics","3 revision rounds"], highlight:true },
            { name:"E-Commerce Store", price:"₹75,000", duration:"14 days", features:["Product catalogue","Payment gateway","Order management","Admin dashboard","30-day support"] },
          ].map(plan => (
            <div key={plan.name} style={{background: plan.highlight ? S.blue : "#fff",borderRadius:20,padding:"2rem 1.5rem",border: plan.highlight ? "none" : `1.5px solid ${S.border}`,boxShadow: plan.highlight ? "0 8px 32px rgba(37,99,235,.25)" : "none"}}>
              {plan.highlight && <div style={{background:"#fbbf24",color:S.navy,borderRadius:8,padding:".2rem .8rem",fontSize:".72rem",fontWeight:800,fontFamily:S.mono,display:"inline-block",marginBottom:"1rem"}}>MOST POPULAR</div>}
              <div style={{fontFamily:S.font,fontWeight:800,fontSize:"1.15rem",color: plan.highlight ? "#fff" : S.navy,marginBottom:".25rem"}}>{plan.name}</div>
              <div style={{fontFamily:S.font,fontSize:"2.2rem",fontWeight:900,color: plan.highlight ? "#fbbf24" : S.blue,marginBottom:".25rem"}}>{plan.price}</div>
              <div style={{fontFamily:S.mono,fontSize:".75rem",color: plan.highlight ? "rgba(255,255,255,.6)" : S.gray,marginBottom:"1.5rem"}}>Delivered in {plan.duration}</div>
              {plan.features.map(f => (
                <div key={f} style={{display:"flex",alignItems:"center",gap:".6rem",marginBottom:".6rem"}}>
                  <span style={{color: plan.highlight ? "#86efac" : "#22c55e",fontWeight:700}}>✓</span>
                  <span style={{color: plan.highlight ? "rgba(255,255,255,.85)" : S.gray,fontSize:".9rem"}}>{f}</span>
                </div>
              ))}
              <a href="/contact" style={{display:"block",textAlign:"center",marginTop:"1.5rem",background: plan.highlight ? "#fff" : S.blue,color: plan.highlight ? S.blue : "#fff",padding:".75rem",borderRadius:12,fontWeight:700,textDecoration:"none",fontSize:".95rem"}}>Get Started →</a>
            </div>
          ))}
        </div>
      </section>

      {/* ── FAQ ── */}
      <section style={{background:S.lightbg,padding:"5rem 1.5rem"}}>
        <div style={{maxWidth:780,margin:"0 auto"}}>
          <div style={{textAlign:"center",marginBottom:"3rem"}}>
            <div style={{display:"inline-block",background:"#eff6ff",color:S.blue,borderRadius:20,padding:".35rem 1.1rem",fontFamily:S.mono,fontSize:".72rem",fontWeight:700,marginBottom:"1rem",letterSpacing:".08em"}}>FAQ</div>
            <h2 style={{fontFamily:S.font,fontSize:"clamp(1.8rem,4vw,2.5rem)",fontWeight:900,color:S.navy}}>Common Questions from {city} Clients</h2>
          </div>
          {FAQS.map((faq, i) => (
            <div key={i} style={{background:"#fff",borderRadius:14,marginBottom:"1rem",border:`1.5px solid ${openFaq===i ? S.blue : S.border}`,overflow:"hidden",transition:"border .2s"}}>
              <div onClick={() => setOpenFaq(openFaq===i ? null : i)} style={{padding:"1.25rem 1.5rem",cursor:"pointer",display:"flex",justifyContent:"space-between",alignItems:"center",gap:"1rem"}}>
                <div style={{fontFamily:S.font,fontWeight:700,fontSize:"1rem",color:S.navy}}>{faq.q}</div>
                <div style={{fontSize:"1.2rem",color:S.blue,flexShrink:0,transition:"transform .2s",transform: openFaq===i ? "rotate(45deg)" : "none"}}>+</div>
              </div>
              {openFaq===i && (
                <div style={{padding:"0 1.5rem 1.25rem",color:S.gray,fontSize:".95rem",lineHeight:1.75}}>{faq.a}</div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section style={{background:"linear-gradient(135deg,#0f172a 0%,#1e3a8a 100%)",padding:"5rem 1.5rem",textAlign:"center",position:"relative",overflow:"hidden"}}>
        <div style={{position:"absolute",top:-100,right:-100,width:400,height:400,background:"rgba(124,58,237,.15)",borderRadius:"50%",filter:"blur(60px)"}}/>
        <div style={{position:"relative",zIndex:1}}>
          <h2 style={{fontFamily:S.font,fontSize:"clamp(1.8rem,4vw,2.8rem)",fontWeight:900,color:"#fff",marginBottom:"1rem"}}>Ready to grow your {city} business online?</h2>
          <p style={{color:"rgba(255,255,255,.7)",marginBottom:"2.5rem",fontSize:"1.05rem",maxWidth:500,margin:"0 auto 2.5rem"}}>Free consultation. Fixed pricing. Delivery in 7–14 days. Reply guaranteed within 24 hours.</p>
          <div style={{display:"flex",gap:"1rem",justifyContent:"center",flexWrap:"wrap"}}>
            <a href="/contact" style={{background:S.orange,color:"#fff",padding:"1rem 2.5rem",borderRadius:14,fontWeight:800,textDecoration:"none",fontSize:"1.05rem",fontFamily:S.font,boxShadow:"0 4px 24px rgba(249,115,22,.35)"}}>Start Your Project →</a>
            <a href="https://wa.me/919079881416" target="_blank" rel="noopener noreferrer" style={{background:"rgba(255,255,255,.1)",color:"#fff",padding:"1rem 2.5rem",borderRadius:14,fontWeight:700,textDecoration:"none",fontSize:"1.05rem",border:"1.5px solid rgba(255,255,255,.2)"}}>💬 WhatsApp Now</a>
          </div>
          <div style={{marginTop:"2.5rem",display:"flex",justifyContent:"center",gap:"2rem",flexWrap:"wrap"}}>
            {["✓ No advance payment pressure","✓ Full code ownership","✓ 30-day free support","✓ Pan-India delivery"].map(t => (
              <span key={t} style={{color:"rgba(255,255,255,.6)",fontSize:".88rem"}}>{t}</span>
            ))}
          </div>
        </div>
      </section>

    </main>
  );
}


// ─── PRODUCTS PAGE ────────────────────────────────────────────────────────────
function Products({ setPage }) {
  useEffect(() => {
    document.title = "Orbnix Products — School ERP, Web Apps & AI Solutions for India";
    const setMeta = (name, val, prop=false) => {
      const sel = prop ? `meta[property="${name}"]` : `meta[name="${name}"]`;
      let el = document.querySelector(sel);
      if (!el) { el = document.createElement("meta"); prop ? el.setAttribute("property",name) : el.setAttribute("name",name); document.head.appendChild(el); }
      el.setAttribute("content", val);
    };
    setMeta("description", "Explore Orbnix products — School ERP with AI, custom web apps, mobile apps and SaaS solutions built for Indian businesses and institutions.");
    setMeta("keywords", "school ERP India, school management software, AI school software, ERP for schools India, student management system, fee management software, school app India");
    setMeta("og:title","Orbnix Products — School ERP & AI Solutions",true);
    setMeta("og:description","School ERP with AI, attendance, fees, exams, transport & more. Built for Indian schools.",true);
    let canon = document.querySelector('link[rel="canonical"]');
    if (!canon) { canon = document.createElement("link"); canon.setAttribute("rel","canonical"); document.head.appendChild(canon); }
    canon.setAttribute("href","https://www.orbnix.in/products");

    // Product schema
    let ld = document.querySelector('#products-ld');
    if (!ld) { ld = document.createElement("script"); ld.type="application/ld+json"; ld.id="products-ld"; document.head.appendChild(ld); }
    ld.textContent = JSON.stringify({
      "@context":"https://schema.org",
      "@type":"SoftwareApplication",
      "name":"Orbnix School ERP",
      "applicationCategory":"EducationalApplication",
      "operatingSystem":"Web, Android, iOS",
      "description":"AI-enabled School ERP system covering students, attendance, fees, exams, timetable, homework, transport, library and more.",
      "offers":{"@type":"Offer","price":"0","priceCurrency":"INR","description":"Contact for pricing"},
      "provider":{"@type":"Organization","name":"Orbnix","url":"https://www.orbnix.in"}
    });
  }, []);

  const modules = [
    { icon:"👥", name:"Students", desc:"Complete student profiles, admission records, documents & history" },
    { icon:"✅", name:"Attendance", desc:"Daily attendance with biometric, app & SMS alerts to parents" },
    { icon:"📝", name:"Examinations", desc:"Online exams, result cards, report generation & analytics" },
    { icon:"📅", name:"Timetable", desc:"Smart timetable builder with teacher & room conflict detection" },
    { icon:"📚", name:"Homework", desc:"Assign, submit and grade homework digitally from anywhere" },
    { icon:"💰", name:"Fee Management", desc:"Collect fees, send reminders, track defaulters & generate receipts" },
    { icon:"📊", name:"Accounting", desc:"Full school accounts, payroll, expenses & financial reports" },
    { icon:"👨‍👩‍👧", name:"Parents Portal", desc:"Parents track attendance, fees, results & communicate with staff" },
    { icon:"🚌", name:"Transport", desc:"Route management, GPS tracking & student bus allocation" },
    { icon:"📖", name:"Library", desc:"Book catalogue, issue/return, fine management & reports" },
    { icon:"📢", name:"Notice Board", desc:"Digital notices, circulars & announcements to all stakeholders" },
    { icon:"🎒", name:"Admissions CRM", desc:"Online enquiries, follow-ups, application forms & conversion tracking" },
    { icon:"🏆", name:"Clubs & Houses", desc:"Manage student clubs, houses, activities & points" },
    { icon:"🌐", name:"Website CMS", desc:"Update school website content without any technical knowledge" },
    { icon:"✨", name:"AI Studio", desc:"AI-powered insights, report writing, question papers & analytics" },
    { icon:"📱", name:"Social Media", desc:"Schedule & post school updates to Instagram, Facebook & WhatsApp" },
  ];

  const highlights = [
    { stat:"16+", label:"Modules Included", icon:"🧩" },
    { stat:"AI", label:"Powered Intelligence", icon:"✨" },
    { stat:"24/7", label:"Parent Access", icon:"👨‍👩‍👧" },
    { stat:"7 Days", label:"Go Live Time", icon:"🚀" },
  ];

  return (
    <div style={{width:"100%",paddingTop:68,minHeight:"100vh",background:C.bg2}}>

      {/* ── HERO ─────────────────────────────────────────────── */}
      <section style={{background:"linear-gradient(135deg,#0F172A 0%,#1E3A5F 50%,#0F172A 100%)",padding:"72px 4% 80px",position:"relative",overflow:"hidden"}}>
        {/* BG grid */}
        <div style={{position:"absolute",inset:0,backgroundImage:"linear-gradient(rgba(37,99,235,.12) 1px,transparent 1px),linear-gradient(90deg,rgba(37,99,235,.12) 1px,transparent 1px)",backgroundSize:"40px 40px",opacity:.4}}/>
        {/* Glow orbs */}
        <div style={{position:"absolute",top:-100,right:-100,width:500,height:500,background:"radial-gradient(circle,rgba(37,99,235,.25) 0%,transparent 70%)",pointerEvents:"none"}}/>
        <div style={{position:"absolute",bottom:-100,left:-100,width:400,height:400,background:"radial-gradient(circle,rgba(124,58,237,.2) 0%,transparent 70%)",pointerEvents:"none"}}/>

        <div style={{maxWidth:1200,margin:"0 auto",position:"relative"}}>
          {/* Breadcrumb */}
          <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:24}}>
            <span onClick={()=>setPage("home")} style={{color:"rgba(255,255,255,.5)",fontSize:".82rem",cursor:"pointer"}}>Home</span>
            <span style={{color:"rgba(255,255,255,.3)"}}>›</span>
            <span style={{color:"rgba(255,255,255,.8)",fontSize:".82rem"}}>Products</span>
          </div>

          <div style={{display:"inline-flex",alignItems:"center",gap:8,background:"rgba(37,99,235,.2)",border:"1px solid rgba(37,99,235,.4)",borderRadius:20,padding:"6px 16px",marginBottom:24}}>
            <span style={{width:8,height:8,background:"#22c55e",borderRadius:"50%",display:"inline-block",boxShadow:"0 0 8px #22c55e"}}/>
            <span style={{color:"#93c5fd",fontSize:".8rem",fontWeight:600,letterSpacing:".06em"}}>NOW LIVE — SCHOOL ERP v2.0</span>
          </div>

          <h1 style={{fontFamily:"'Bricolage Grotesque',sans-serif",fontSize:"clamp(2.2rem,5vw,4rem)",fontWeight:900,color:"#fff",lineHeight:1.08,marginBottom:20,maxWidth:700}}>
            Products Built for<br/>
            <span style={{background:"linear-gradient(90deg,#60a5fa,#818cf8)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}>Indian Institutions</span>
          </h1>
          <p style={{color:"rgba(255,255,255,.65)",fontSize:"1.1rem",maxWidth:580,lineHeight:1.7,marginBottom:36}}>
            Beyond websites — we build full software products. Our flagship School ERP is used by schools across India, with AI baked in from day one.
          </p>
          <div style={{display:"flex",gap:12,flexWrap:"wrap"}}>
            <div onClick={()=>setPage("contact")} style={{background:"#2563EB",color:"#fff",padding:"13px 28px",borderRadius:10,fontWeight:700,fontSize:".95rem",cursor:"pointer",boxShadow:"0 8px 32px rgba(37,99,235,.4)"}}>Request a Demo →</div>
            <div onClick={()=>setPage("contact")} style={{background:"rgba(255,255,255,.08)",color:"#fff",padding:"13px 28px",borderRadius:10,fontWeight:600,fontSize:".95rem",cursor:"pointer",border:"1.5px solid rgba(255,255,255,.2)"}}>Get Pricing</div>
          </div>
        </div>
      </section>

      {/* ── STATS BAR ─────────────────────────────────────────── */}
      <section style={{background:"#fff",borderBottom:`1px solid ${C.border}`,padding:"20px 4%"}}>
        <div style={{maxWidth:1200,margin:"0 auto",display:"flex",justifyContent:"center",gap:"clamp(2rem,5vw,5rem)",flexWrap:"wrap"}}>
          {highlights.map(({stat,label,icon})=>(
            <div key={label} style={{textAlign:"center"}}>
              <div style={{fontSize:"1rem",marginBottom:2}}>{icon}</div>
              <div style={{fontFamily:"'Bricolage Grotesque',sans-serif",fontSize:"1.8rem",fontWeight:900,color:C.blue,lineHeight:1}}>{stat}</div>
              <div style={{fontSize:".78rem",color:C.t3,fontWeight:600}}>{label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── SCHOOL ERP PRODUCT CARD ───────────────────────────── */}
      <section style={{padding:"64px 4%",maxWidth:1200,margin:"0 auto"}}>
        <div style={{display:"inline-flex",alignItems:"center",gap:6,background:"#eff6ff",border:"1px solid #bfdbfe",borderRadius:20,padding:"4px 14px",marginBottom:16}}>
          <span style={{fontSize:".75rem",color:C.blue,fontWeight:700,letterSpacing:".06em"}}>🏫 PRODUCT 01</span>
        </div>
        <h2 style={{fontFamily:"'Bricolage Grotesque',sans-serif",fontSize:"clamp(1.8rem,4vw,3rem)",fontWeight:900,color:C.t,lineHeight:1.1,marginBottom:12}}>
          Orbnix School ERP
          <span style={{display:"block",fontSize:"clamp(1rem,2vw,1.4rem)",color:C.blue,fontWeight:700,marginTop:4}}>AI-Enabled School Management System</span>
        </h2>
        <p style={{color:C.t2,fontSize:"1.05rem",maxWidth:640,lineHeight:1.7,marginBottom:48}}>
          A complete school management ecosystem — students, staff, fees, exams, transport, library and AI-powered insights. One platform. Every stakeholder.
        </p>

        {/* ── DASHBOARD WIREFRAME ── */}
        <div style={{background:"#0F172A",borderRadius:20,overflow:"hidden",boxShadow:"0 32px 80px rgba(0,0,0,.25)",marginBottom:56,border:"1.5px solid rgba(255,255,255,.08)"}}>
          {/* Browser chrome */}
          <div style={{background:"#1e293b",padding:"10px 16px",display:"flex",alignItems:"center",gap:8,borderBottom:"1px solid rgba(255,255,255,.06)"}}>
            <div style={{display:"flex",gap:6}}>
              {["#ff5f57","#febc2e","#28c840"].map(c=><div key={c} style={{width:12,height:12,borderRadius:"50%",background:c}}/>)}
            </div>
            <div style={{flex:1,background:"rgba(255,255,255,.06)",borderRadius:6,padding:"4px 12px",textAlign:"center",maxWidth:320,margin:"0 auto"}}>
              <span style={{color:"rgba(255,255,255,.4)",fontSize:".78rem"}}>erp.yourschool.in</span>
            </div>
          </div>

          {/* Dashboard content */}
          <div style={{display:"flex",minHeight:480}}>
            {/* Sidebar */}
            <div style={{width:200,background:"#1a2744",borderRight:"1px solid rgba(255,255,255,.06)",padding:"20px 0",flexShrink:0}}>
              <div style={{padding:"0 16px 20px",borderBottom:"1px solid rgba(255,255,255,.06)",marginBottom:16}}>
                <div style={{display:"flex",alignItems:"center",gap:10}}>
                  <div style={{width:32,height:32,background:"linear-gradient(135deg,#2563EB,#7c3aed)",borderRadius:8,display:"flex",alignItems:"center",justifyContent:"center",fontSize:".8rem",fontWeight:900,color:"#fff"}}>O</div>
                  <div>
                    <div style={{color:"#fff",fontSize:".82rem",fontWeight:700,lineHeight:1}}>Orbnix ERP</div>
                    <div style={{color:"rgba(255,255,255,.4)",fontSize:".68rem"}}>School Admin</div>
                  </div>
                </div>
              </div>
              {[
                {section:"ACADEMICS",items:[["👥","Students"],["✅","Attendance"],["📝","Examinations"],["📅","Timetable"],["📚","Homework"]]},
                {section:"FINANCE",items:[["💰","Fee Management"],["📊","Accounting"]]},
                {section:"PEOPLE",items:[["👨‍💼","Staff & HR"],["🎒","Admissions CRM"],["👨‍👩‍👧","Parents"]]},
                {section:"OPERATIONS",items:[["🚌","Transport"],["📖","Library"],["📢","Notices"]]},
                {section:"INTELLIGENCE",items:[["✨","AI Studio"],["📱","Social Media"],["🌐","Website CMS"]]},
              ].map(({section,items})=>(
                <div key={section} style={{marginBottom:16}}>
                  <div style={{color:"rgba(255,255,255,.3)",fontSize:".62rem",fontWeight:700,letterSpacing:".1em",padding:"0 16px",marginBottom:6}}>{section}</div>
                  {items.map(([icon,label],j)=>(
                    <div key={label} style={{display:"flex",alignItems:"center",gap:10,padding:"7px 16px",background:label==="Dashboard"?"rgba(37,99,235,.25)":"transparent",cursor:"pointer"}}>
                      <span style={{fontSize:".9rem"}}>{icon}</span>
                      <span style={{color:label==="Dashboard"?"#60a5fa":"rgba(255,255,255,.6)",fontSize:".8rem",fontWeight:label==="Dashboard"?700:400}}>{label}</span>
                    </div>
                  ))}
                </div>
              ))}
            </div>

            {/* Main dashboard */}
            <div style={{flex:1,padding:24,overflow:"hidden"}}>
              {/* Top bar */}
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:20}}>
                <div>
                  <div style={{color:"rgba(255,255,255,.4)",fontSize:".75rem"}}>Sunday, March 29 · Academic Year 2025–26</div>
                  <div style={{fontFamily:"'Bricolage Grotesque',sans-serif",color:"#fff",fontSize:"1.3rem",fontWeight:800}}>🎓 Good morning, Principal!</div>
                </div>
                <div style={{display:"flex",gap:8}}>
                  <div style={{background:"rgba(255,255,255,.06)",border:"1px solid rgba(255,255,255,.1)",borderRadius:8,padding:"6px 14px",color:"rgba(255,255,255,.6)",fontSize:".78rem",cursor:"pointer"}}>🔍 Search</div>
                  <div style={{background:"#2563EB",borderRadius:8,padding:"6px 14px",color:"#fff",fontSize:".78rem",fontWeight:700,cursor:"pointer"}}>+ New</div>
                </div>
              </div>

              {/* KPI Cards */}
              <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:12,marginBottom:20}}>
                {[
                  {label:"Total Students",val:"1,240",change:"+2%",up:true,icon:"👥",color:"#2563EB"},
                  {label:"Today's Attendance",val:"94.2%",change:"↑ Good",up:true,icon:"✅",color:"#10b981"},
                  {label:"Fee Defaulters",val:"23",change:"↓ 5 cleared",up:true,icon:"💰",color:"#f59e0b"},
                  {label:"Total Staff",val:"86",change:"Active",up:true,icon:"👨‍💼",color:"#7c3aed"},
                ].map(({label,val,change,up,icon,color})=>(
                  <div key={label} style={{background:"rgba(255,255,255,.05)",borderRadius:12,padding:16,border:"1px solid rgba(255,255,255,.07)"}}>
                    <div style={{display:"flex",justifyContent:"space-between",marginBottom:10}}>
                      <span style={{fontSize:"1.2rem"}}>{icon}</span>
                      <span style={{background:up?"rgba(16,185,129,.15)":"rgba(239,68,68,.15)",color:up?"#4ade80":"#f87171",borderRadius:6,padding:"2px 8px",fontSize:".7rem",fontWeight:700}}>{change}</span>
                    </div>
                    <div style={{fontFamily:"'Bricolage Grotesque',sans-serif",fontSize:"1.6rem",fontWeight:900,color:"#fff",lineHeight:1}}>{val}</div>
                    <div style={{color:"rgba(255,255,255,.4)",fontSize:".72rem",marginTop:4}}>{label}</div>
                  </div>
                ))}
              </div>

              {/* Middle row */}
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:12}}>
                {/* Attendance chart */}
                <div style={{background:"rgba(255,255,255,.04)",borderRadius:12,padding:16,border:"1px solid rgba(255,255,255,.07)"}}>
                  <div style={{color:"rgba(255,255,255,.7)",fontSize:".8rem",fontWeight:600,marginBottom:12}}>Today's Attendance</div>
                  <div style={{display:"flex",alignItems:"center",justifyContent:"center",marginBottom:12}}>
                    <div style={{width:80,height:80,borderRadius:"50%",background:"conic-gradient(#22c55e 0deg 339deg,rgba(255,255,255,.1) 339deg 360deg)",display:"flex",alignItems:"center",justifyContent:"center"}}>
                      <div style={{width:56,height:56,borderRadius:"50%",background:"#0F172A",display:"flex",alignItems:"center",justifyContent:"center",color:"#fff",fontWeight:800,fontSize:".95rem"}}>94%</div>
                    </div>
                  </div>
                  <div style={{display:"flex",justifyContent:"space-around"}}>
                    {[["1,167","Present","#22c55e"],["48","Absent","#f87171"],["25","Leave","#f59e0b"]].map(([n,l,c])=>(
                      <div key={l} style={{textAlign:"center"}}>
                        <div style={{fontWeight:800,color:c,fontSize:".95rem"}}>{n}</div>
                        <div style={{color:"rgba(255,255,255,.4)",fontSize:".65rem"}}>{l}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Quick actions */}
                <div style={{background:"rgba(255,255,255,.04)",borderRadius:12,padding:16,border:"1px solid rgba(255,255,255,.07)"}}>
                  <div style={{color:"rgba(255,255,255,.7)",fontSize:".8rem",fontWeight:600,marginBottom:12}}>Quick Actions</div>
                  <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>
                    {[["✅","Attendance"],["💰","Collect Fee"],["👥","Add Student"],["📝","Exams"],["🎒","Admissions"],["👨‍💼","Staff"],["📢","Notice"],["✨","AI Studio"]].map(([icon,label])=>(
                      <div key={label} style={{background:"rgba(255,255,255,.06)",borderRadius:8,padding:"8px 6px",textAlign:"center",cursor:"pointer"}}>
                        <div style={{fontSize:".9rem",marginBottom:2}}>{icon}</div>
                        <div style={{color:"rgba(255,255,255,.55)",fontSize:".62rem"}}>{label}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Recent activity */}
                <div style={{background:"rgba(255,255,255,.04)",borderRadius:12,padding:16,border:"1px solid rgba(255,255,255,.07)"}}>
                  <div style={{color:"rgba(255,255,255,.7)",fontSize:".8rem",fontWeight:600,marginBottom:12}}>Recent Activity</div>
                  {[
                    {icon:"✅",text:"Attendance marked — Class X",time:"10 min ago",c:"#22c55e"},
                    {icon:"💰",text:"Fee collected — ₹12,500",time:"25 min ago",c:"#f59e0b"},
                    {icon:"📢",text:"Notice sent to all parents",time:"1 hr ago",c:"#60a5fa"},
                    {icon:"📝",text:"Exam results published",time:"2 hr ago",c:"#a78bfa"},
                    {icon:"🎒",text:"3 new admissions enquiries",time:"3 hr ago",c:"#34d399"},
                  ].map(({icon,text,time,c})=>(
                    <div key={text} style={{display:"flex",gap:10,marginBottom:10,alignItems:"flex-start"}}>
                      <div style={{width:26,height:26,borderRadius:8,background:`${c}22`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:".75rem",flexShrink:0}}>{icon}</div>
                      <div>
                        <div style={{color:"rgba(255,255,255,.75)",fontSize:".72rem",lineHeight:1.3}}>{text}</div>
                        <div style={{color:"rgba(255,255,255,.3)",fontSize:".65rem"}}>{time}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── MOBILE APP WIREFRAME ── */}
        <div style={{marginBottom:56}}>
          <h3 style={{fontFamily:"'Bricolage Grotesque',sans-serif",fontSize:"clamp(1.2rem,2.5vw,1.6rem)",fontWeight:900,color:C.t,marginBottom:8}}>Mobile Apps for Every Stakeholder</h3>
          <p style={{color:C.t3,marginBottom:32}}>Dedicated apps for students, parents and teachers — Android & iOS.</p>

          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(300px,1fr))",gap:24}}>

            {/* ── STUDENT APP ── */}
            <div style={{background:"#0F172A",borderRadius:20,overflow:"hidden",border:"1.5px solid rgba(255,255,255,.08)",boxShadow:"0 24px 60px rgba(0,0,0,.3)"}}>
              <div style={{background:"#1e293b",padding:"10px 16px",display:"flex",alignItems:"center",gap:8,borderBottom:"1px solid rgba(255,255,255,.06)"}}>
                <div style={{display:"flex",gap:5}}>{["#ff5f57","#febc2e","#28c840"].map(c=><div key={c} style={{width:10,height:10,borderRadius:"50%",background:c}}/>)}</div>
                <span style={{color:"rgba(255,255,255,.3)",fontSize:".7rem",marginLeft:4}}>Student App</span>
              </div>
              <div style={{padding:20}}>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:16}}>
                  <div>
                    <div style={{color:"rgba(255,255,255,.45)",fontSize:".72rem"}}>Good morning 👋</div>
                    <div style={{color:"#fff",fontWeight:800,fontSize:"1.1rem"}}>Aryan Sharma</div>
                    <div style={{color:"rgba(255,255,255,.4)",fontSize:".72rem"}}>Class X-A · Roll No. 12</div>
                  </div>
                  <div style={{width:42,height:42,borderRadius:12,background:"linear-gradient(135deg,#2563EB,#7c3aed)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"1.2rem"}}>🎓</div>
                </div>

                {/* Attendance card */}
                <div style={{background:"linear-gradient(135deg,#1d4ed8,#7c3aed)",borderRadius:14,padding:16,marginBottom:12}}>
                  <div style={{color:"rgba(255,255,255,.6)",fontSize:".68rem",fontWeight:700,letterSpacing:".1em",marginBottom:4}}>TODAY'S ATTENDANCE</div>
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                    <div style={{color:"#fff",fontWeight:900,fontSize:"1.4rem"}}>✅ Present</div>
                    <div style={{color:"rgba(255,255,255,.6)",fontSize:".72rem"}}>Marked 8:42 AM</div>
                  </div>
                  <div style={{background:"rgba(255,255,255,.15)",borderRadius:8,height:6,marginTop:10,overflow:"hidden"}}>
                    <div style={{background:"#4ade80",height:"100%",width:"94%",borderRadius:8}}/>
                  </div>
                  <div style={{color:"rgba(255,255,255,.5)",fontSize:".68rem",marginTop:4}}>94% attendance this term</div>
                </div>

                {/* Today's schedule */}
                <div style={{color:"rgba(255,255,255,.5)",fontSize:".72rem",fontWeight:700,marginBottom:8,letterSpacing:".06em"}}>TODAY'S SCHEDULE</div>
                {[
                  {icon:"📐",sub:"Mathematics","time":"8:00–8:45","room":"Room 12"},
                  {icon:"🔬",sub:"Science Lab","time":"9:00–9:45","room":"Lab 3"},
                  {icon:"📖",sub:"English","time":"10:00–10:45","room":"Room 12"},
                ].map(({icon,sub,time,room})=>(
                  <div key={sub} style={{display:"flex",alignItems:"center",gap:10,background:"rgba(255,255,255,.05)",borderRadius:10,padding:"10px 12px",marginBottom:8,border:"1px solid rgba(255,255,255,.06)"}}>
                    <div style={{width:34,height:34,borderRadius:10,background:"rgba(37,99,235,.25)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"1rem",flexShrink:0}}>{icon}</div>
                    <div style={{flex:1}}>
                      <div style={{color:"#fff",fontWeight:600,fontSize:".82rem"}}>{sub}</div>
                      <div style={{color:"rgba(255,255,255,.4)",fontSize:".7rem"}}>{room}</div>
                    </div>
                    <div style={{color:"rgba(255,255,255,.45)",fontSize:".7rem"}}>{time}</div>
                  </div>
                ))}

                {/* Homework due */}
                <div style={{background:"rgba(245,158,11,.1)",border:"1px solid rgba(245,158,11,.25)",borderRadius:10,padding:"10px 12px",marginTop:4}}>
                  <div style={{color:"#fbbf24",fontSize:".7rem",fontWeight:700,marginBottom:4}}>⚠ HOMEWORK DUE TODAY</div>
                  <div style={{color:"rgba(255,255,255,.7)",fontSize:".78rem"}}>📚 Physics — Chapter 5 Questions</div>
                </div>
              </div>
            </div>

            {/* ── PARENT APP ── */}
            <div style={{background:"#0a1628",borderRadius:20,overflow:"hidden",border:"1.5px solid rgba(255,255,255,.08)",boxShadow:"0 24px 60px rgba(0,0,0,.3)"}}>
              <div style={{background:"#0f1f38",padding:"10px 16px",display:"flex",alignItems:"center",gap:8,borderBottom:"1px solid rgba(255,255,255,.06)"}}>
                <div style={{display:"flex",gap:5}}>{["#ff5f57","#febc2e","#28c840"].map(c=><div key={c} style={{width:10,height:10,borderRadius:"50%",background:c}}/>)}</div>
                <span style={{color:"rgba(255,255,255,.3)",fontSize:".7rem",marginLeft:4}}>Parent Portal</span>
              </div>
              <div style={{padding:20}}>
                <div style={{marginBottom:16}}>
                  <div style={{color:"rgba(255,255,255,.45)",fontSize:".72rem"}}>Welcome back</div>
                  <div style={{color:"#fff",fontWeight:800,fontSize:"1.1rem"}}>Ramesh Sharma</div>
                </div>

                {/* Children cards */}
                {[
                  {name:"Aryan Sharma",cls:"Class X-A",att:"94%",status:"Present",fees:"Paid",attColor:"#4ade80"},
                  {name:"Priya Sharma",cls:"Class VII-B",att:"88%",status:"Present",fees:"Due ₹1,500",attColor:"#4ade80"},
                ].map(({name,cls,att,status,fees,attColor})=>(
                  <div key={name} style={{background:"rgba(255,255,255,.05)",borderRadius:14,padding:14,marginBottom:12,border:"1px solid rgba(255,255,255,.08)"}}>
                    <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:10}}>
                      <div>
                        <div style={{color:"#fff",fontWeight:700,fontSize:".88rem"}}>{name}</div>
                        <div style={{color:"rgba(255,255,255,.4)",fontSize:".72rem"}}>{cls}</div>
                      </div>
                      <div style={{background:"rgba(34,197,94,.15)",border:"1px solid rgba(34,197,94,.3)",borderRadius:8,padding:"3px 10px",color:"#4ade80",fontSize:".72rem",fontWeight:700}}>{status}</div>
                    </div>
                    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:8}}>
                      {[["📊",att,"Attendance"],[fees.includes("Due")?"⚠️":"✅",fees,"Fees"],["📝","View","Results"]].map(([ic,val,lbl])=>(
                        <div key={lbl} style={{background:"rgba(255,255,255,.06)",borderRadius:8,padding:"8px 6px",textAlign:"center"}}>
                          <div style={{fontSize:".85rem",marginBottom:2}}>{ic}</div>
                          <div style={{color:fees.includes("Due")&&lbl==="Fees"?"#fbbf24":"rgba(255,255,255,.7)",fontSize:".68rem",fontWeight:600}}>{val}</div>
                          <div style={{color:"rgba(255,255,255,.35)",fontSize:".62rem"}}>{lbl}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}

                {/* Fee payment */}
                <div style={{background:"rgba(245,158,11,.1)",border:"1px solid rgba(245,158,11,.25)",borderRadius:12,padding:14,marginBottom:12}}>
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:8}}>
                    <div style={{color:"#fbbf24",fontSize:".72rem",fontWeight:700}}>⚠ FEE DUE — PRIYA SHARMA</div>
                  </div>
                  <div style={{color:"#fff",fontWeight:900,fontSize:"1.3rem",marginBottom:4}}>₹1,500</div>
                  <div style={{color:"rgba(255,255,255,.5)",fontSize:".72rem",marginBottom:10}}>Q2 Transport Fee · Due 5 Apr</div>
                  <div style={{background:"#2563EB",borderRadius:8,padding:"8px",textAlign:"center",cursor:"pointer"}}>
                    <span style={{color:"#fff",fontWeight:700,fontSize:".82rem"}}>Pay Now →</span>
                  </div>
                </div>

                {/* Notice */}
                <div style={{background:"rgba(255,255,255,.04)",border:"1px solid rgba(255,255,255,.08)",borderRadius:10,padding:12}}>
                  <div style={{color:"rgba(255,255,255,.5)",fontSize:".68rem",fontWeight:700,marginBottom:6}}>📢 LATEST NOTICE</div>
                  <div style={{color:"rgba(255,255,255,.8)",fontSize:".78rem",lineHeight:1.5}}>Annual Sports Day on 5 April. Students to report in sports uniform by 8:00 AM.</div>
                </div>
              </div>
            </div>

            {/* ── TEACHER APP ── */}
            <div style={{background:"#0d1f0d",borderRadius:20,overflow:"hidden",border:"1.5px solid rgba(255,255,255,.08)",boxShadow:"0 24px 60px rgba(0,0,0,.3)"}}>
              <div style={{background:"#122012",padding:"10px 16px",display:"flex",alignItems:"center",gap:8,borderBottom:"1px solid rgba(255,255,255,.06)"}}>
                <div style={{display:"flex",gap:5}}>{["#ff5f57","#febc2e","#28c840"].map(c=><div key={c} style={{width:10,height:10,borderRadius:"50%",background:c}}/>)}</div>
                <span style={{color:"rgba(255,255,255,.3)",fontSize:".7rem",marginLeft:4}}>Teacher Dashboard</span>
              </div>
              <div style={{padding:20}}>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:16}}>
                  <div>
                    <div style={{color:"rgba(255,255,255,.45)",fontSize:".72rem"}}>Class Teacher</div>
                    <div style={{color:"#fff",fontWeight:800,fontSize:"1.1rem"}}>Mrs. Sunita Verma</div>
                    <div style={{color:"rgba(255,255,255,.4)",fontSize:".72rem"}}>Mathematics · Class X</div>
                  </div>
                  <div style={{textAlign:"right"}}>
                    <div style={{color:"#4ade80",fontWeight:700,fontSize:".78rem"}}>● Online</div>
                    <div style={{color:"rgba(255,255,255,.4)",fontSize:".68rem"}}>4 classes today</div>
                  </div>
                </div>

                {/* Attendance marking */}
                <div style={{background:"rgba(34,197,94,.08)",border:"1px solid rgba(34,197,94,.2)",borderRadius:12,padding:14,marginBottom:12}}>
                  <div style={{color:"#4ade80",fontSize:".72rem",fontWeight:700,marginBottom:8}}>📋 MARK ATTENDANCE — CLASS X-A</div>
                  <div style={{display:"flex",justifyContent:"space-between",marginBottom:8}}>
                    <div style={{color:"rgba(255,255,255,.7)",fontSize:".78rem"}}>Period 1 · 8:00–8:45 AM</div>
                    <div style={{color:"rgba(255,255,255,.4)",fontSize:".72rem"}}>42 students</div>
                  </div>
                  <div style={{display:"grid",gridTemplateColumns:"repeat(8,1fr)",gap:4,marginBottom:10}}>
                    {Array.from({length:42},(_,i)=>(
                      <div key={i} style={{width:"100%",aspectRatio:"1",borderRadius:4,background:i<38?"rgba(34,197,94,.3)":i<40?"rgba(239,68,68,.3)":"rgba(245,158,11,.3)",border:i<38?"1px solid rgba(34,197,94,.5)":i<40?"1px solid rgba(239,68,68,.5)":"1px solid rgba(245,158,11,.5)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:".5rem",color:"rgba(255,255,255,.6)"}}>{i+1}</div>
                    ))}
                  </div>
                  <div style={{display:"flex",gap:8,marginBottom:10}}>
                    {[["38","Present","#4ade80"],["2","Absent","#f87171"],["2","Leave","#fbbf24"]].map(([n,l,c])=>(
                      <div key={l} style={{flex:1,textAlign:"center",background:"rgba(255,255,255,.04)",borderRadius:8,padding:"6px 4px"}}>
                        <div style={{color:c,fontWeight:800,fontSize:".88rem"}}>{n}</div>
                        <div style={{color:"rgba(255,255,255,.4)",fontSize:".62rem"}}>{l}</div>
                      </div>
                    ))}
                  </div>
                  <div style={{background:"#16a34a",borderRadius:8,padding:"8px",textAlign:"center"}}>
                    <span style={{color:"#fff",fontWeight:700,fontSize:".82rem"}}>Submit Attendance ✓</span>
                  </div>
                </div>

                {/* Homework assigned */}
                <div style={{color:"rgba(255,255,255,.5)",fontSize:".68rem",fontWeight:700,marginBottom:8}}>📚 HOMEWORK ASSIGNED</div>
                {[
                  {cls:"Class X-A","sub":"Chapter 5 — Quadratic Equations","due":"Due Tomorrow"},
                  {cls:"Class X-B","sub":"Chapter 5 — Practice Set","due":"Due Tomorrow"},
                ].map(({cls,sub,due})=>(
                  <div key={cls} style={{display:"flex",gap:10,background:"rgba(255,255,255,.04)",borderRadius:10,padding:"10px 12px",marginBottom:8,border:"1px solid rgba(255,255,255,.06)"}}>
                    <div style={{width:32,height:32,borderRadius:8,background:"rgba(34,197,94,.2)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:".85rem",flexShrink:0}}>📝</div>
                    <div>
                      <div style={{color:"rgba(255,255,255,.8)",fontSize:".75rem",fontWeight:600}}>{cls} — {sub}</div>
                      <div style={{color:"rgba(255,255,255,.4)",fontSize:".68rem"}}>{due}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>

        {/* ── MODULES GRID ── */}
        <div style={{marginBottom:56}}>
          <h3 style={{fontFamily:"'Bricolage Grotesque',sans-serif",fontSize:"clamp(1.4rem,3vw,2rem)",fontWeight:900,color:C.t,marginBottom:8}}>Every Module You Need</h3>
          <p style={{color:C.t3,marginBottom:32}}>16+ integrated modules — one login, one platform, zero chaos.</p>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(240px,1fr))",gap:16}}>
            {modules.map(({icon,name,desc})=>(
              <div key={name} style={{background:"#fff",borderRadius:14,padding:20,border:`1.5px solid ${C.border}`,boxShadow:"0 2px 12px rgba(0,0,0,.04)",transition:"transform .15s,box-shadow .15s"}}>
                <div style={{width:42,height:42,borderRadius:12,background:C.blueLL,display:"flex",alignItems:"center",justifyContent:"center",fontSize:"1.3rem",marginBottom:12}}>{icon}</div>
                <div style={{fontFamily:"'Bricolage Grotesque',sans-serif",fontWeight:800,fontSize:".98rem",color:C.t,marginBottom:6}}>{name}</div>
                <div style={{color:C.t3,fontSize:".83rem",lineHeight:1.55}}>{desc}</div>
              </div>
            ))}
          </div>
        </div>

        {/* ── WHY ORBNIX ERP ── */}
        <div style={{background:"linear-gradient(135deg,#0F172A,#1E3A5F)",borderRadius:24,padding:"48px 40px",marginBottom:56,position:"relative",overflow:"hidden"}}>
          <div style={{position:"absolute",top:-60,right:-60,width:300,height:300,background:"radial-gradient(circle,rgba(37,99,235,.2) 0%,transparent 70%)"}}/>
          <h3 style={{fontFamily:"'Bricolage Grotesque',sans-serif",fontSize:"clamp(1.4rem,3vw,2rem)",fontWeight:900,color:"#fff",marginBottom:8,position:"relative"}}>Why Schools Choose Orbnix ERP</h3>
          <p style={{color:"rgba(255,255,255,.6)",marginBottom:36,position:"relative"}}>Not just software — a partner in your school's digital journey.</p>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(220px,1fr))",gap:20,position:"relative"}}>
            {[
              {icon:"🤖",title:"AI Built-In",desc:"AI Studio generates report cards, question papers, notice drafts and gives attendance insights automatically."},
              {icon:"📱",title:"Mobile First",desc:"Dedicated apps for students, parents and teachers. Works on Android & iOS."},
              {icon:"🔒",title:"Data Privacy",desc:"Your school's data stays in India. No third-party sharing. DPDP compliant."},
              {icon:"⚡",title:"7-Day Setup",desc:"We onboard your school, import all data and train your staff — live in one week."},
              {icon:"🎓",title:"India-Specific",desc:"Built for CBSE, ICSE, State Board. RTE compliance, TC generation, migration certificates."},
              {icon:"📞",title:"Dedicated Support",desc:"Dedicated account manager. WhatsApp support. On-site training available."},
            ].map(({icon,title,desc})=>(
              <div key={title} style={{background:"rgba(255,255,255,.06)",borderRadius:14,padding:20,border:"1px solid rgba(255,255,255,.1)"}}>
                <div style={{fontSize:"1.5rem",marginBottom:10}}>{icon}</div>
                <div style={{fontWeight:700,color:"#fff",marginBottom:6,fontSize:".95rem"}}>{title}</div>
                <div style={{color:"rgba(255,255,255,.55)",fontSize:".82rem",lineHeight:1.6}}>{desc}</div>
              </div>
            ))}
          </div>
        </div>

        {/* ── CTA ── */}
        <div style={{background:"#fff",borderRadius:20,padding:"48px 40px",border:`2px solid ${C.border}`,textAlign:"center",boxShadow:"0 8px 40px rgba(0,0,0,.06)"}}>
          <div style={{display:"inline-block",background:C.blueLL,borderRadius:20,padding:"4px 14px",marginBottom:16}}>
            <span style={{color:C.blue,fontSize:".78rem",fontWeight:700}}>🚀 GET STARTED</span>
          </div>
          <h3 style={{fontFamily:"'Bricolage Grotesque',sans-serif",fontSize:"clamp(1.4rem,3vw,2rem)",fontWeight:900,color:C.t,marginBottom:12}}>Ready to Transform Your School?</h3>
          <p style={{color:C.t3,maxWidth:480,margin:"0 auto 28px",lineHeight:1.7}}>Book a free 30-minute demo. See the full system live. We'll customise it for your school.</p>
          <div style={{display:"flex",gap:12,justifyContent:"center",flexWrap:"wrap"}}>
            <div onClick={()=>setPage("contact")} style={{background:C.blue,color:"#fff",padding:"13px 32px",borderRadius:10,fontWeight:700,fontSize:".95rem",cursor:"pointer",boxShadow:`0 8px 24px rgba(37,99,235,.35)`}}>Book Free Demo →</div>
            <div onClick={()=>setPage("contact")} style={{background:C.bg2,color:C.t,padding:"13px 32px",borderRadius:10,fontWeight:600,fontSize:".95rem",cursor:"pointer",border:`1.5px solid ${C.border}`}}>Talk to Sales</div>
          </div>
        </div>
      </section>

      {/* ── COMING SOON ─────────────────────────────────────────── */}
      <section style={{padding:"0 4% 72px",maxWidth:1200,margin:"0 auto"}}>
        <h3 style={{fontFamily:"'Bricolage Grotesque',sans-serif",fontSize:"1.5rem",fontWeight:900,color:C.t,marginBottom:8}}>More Products Coming Soon</h3>
        <p style={{color:C.t3,marginBottom:24}}>We're building more. Be the first to know.</p>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(240px,1fr))",gap:16}}>
          {[
            {icon:"🏨",name:"Hotel PMS","desc":"Property management system for hotels, resorts & homestays.",tag:"Q3 2026"},
            {icon:"🏥",name:"Clinic ERP","desc":"Patient management, appointments, billing & prescriptions.",tag:"Q4 2026"},
            {icon:"🏋️",name:"Gym & Fitness","desc":"Member management, attendance, diet plans & billing.",tag:"2027"},
          ].map(({icon,name,desc,tag})=>(
            <div key={name} style={{background:"#fff",borderRadius:14,padding:20,border:`1.5px dashed ${C.border}`,opacity:.8}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:12}}>
                <div style={{width:42,height:42,borderRadius:12,background:C.bg2,display:"flex",alignItems:"center",justifyContent:"center",fontSize:"1.3rem"}}>{icon}</div>
                <div style={{background:C.bg2,borderRadius:8,padding:"3px 10px",fontSize:".7rem",color:C.t3,fontWeight:700}}>{tag}</div>
              </div>
              <div style={{fontFamily:"'Bricolage Grotesque',sans-serif",fontWeight:800,fontSize:".95rem",color:C.t,marginBottom:6}}>{name}</div>
              <div style={{color:C.t3,fontSize:".82rem",lineHeight:1.55}}>{desc}</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}


function AppInner() {
  const navigate = useNavigate();
  const location = useLocation();
  const getPageFromPath = (pathname) => {
    const staticMap = { "/": "home", "/products": "products", "/about": "about", "/work": "work", "/blog": "blog", "/services": "services", "/pricing": "pricing", "/contact": "contact" };
    if (staticMap[pathname]) return staticMap[pathname];
    const cityMatch = pathname.match(/^\/cities\/(.+)$/);
    if (cityMatch) {
      const slug = cityMatch[1];
      const found = INDIA_LOCATIONS.find(([s]) => s === slug);
      if (found) return "city-" + slug;
    }
    return "home";
  };
  const getPathFromPage = (p) => {
    const staticMap = { home: "/", products:"/products", about: "/about", work: "/work", blog: "/blog", services: "/services", pricing: "/pricing", contact: "/contact" };
    if (staticMap[p]) return staticMap[p];
    if (p.startsWith("city-")) return "/cities/" + p.replace("city-","");
    return "/";
  };

  const page = getPageFromPath(location.pathname);
  const setPage = (p) => navigate(getPathFromPage(p));

  const [demo, setDemo] = useState(null);
  const [lastDemo, setLastDemo] = useState(null);
  const [lastBlog, setLastBlog] = useState(null);
  const { profile, persona, trackAction } = useCookiePersona(page, lastDemo, lastBlog);

  useEffect(() => { window.scrollTo(0, 0); }, [location.pathname]);

  const openDemo = (id) => { setDemo(id); setLastDemo(id); trackAction(id); };
  const handleBlogClick = (cat) => { setLastBlog(cat); trackAction(cat); };

  const personaInfo = PERSONAS[persona] || PERSONAS.default;
  const heroCopy = HERO_COPY[persona] || HERO_COPY.default;

  return (
    <div style={{width:"100%",minHeight:"100vh",overflowX:"hidden"}}>
      <GlobalStyles />
      <SeoHead page={page} persona={persona} />
      <Nav page={page} setPage={setPage} />
      <SocialSidebar />

      {/* Persona indicator — subtle, top-right, dismissible */}
      {persona !== "default" && profile && (
        <PersonaBar persona={persona} personaInfo={personaInfo} profile={profile} setPage={setPage} />
      )}

      {page === "home"     && <Home     setPage={setPage} openDemo={openDemo} persona={persona} heroCopy={heroCopy} trackAction={trackAction} />}
      {page === "about"    && <About    setPage={setPage} />}
      {page === "work"     && <Work     setPage={setPage} openDemo={openDemo} />}
      {page === "blog"     && <Blog     setPage={setPage} onCatClick={handleBlogClick} />}
      {page === "products" && <Products setPage={setPage} />}
      {page === "services" && <Services setPage={setPage} />}
      {page === "pricing"  && <Pricing  setPage={setPage} />}
      {page === "contact"  && <Contact />}
      
      {page.startsWith("city-") && (() => {
        const slug = page.replace("city-","");
        const loc = INDIA_LOCATIONS.find(([s]) => s === slug);
        return loc ? <CityPage city={loc[1]} slug={loc[0]} state={loc[2]} /> : null;
      })()}
      {false && <CityPage city="Mumbai" slug="mumbai" />}
      {false && <CityPage city="Bangalore" slug="bangalore" />}
      {false && <CityPage city="Hyderabad" slug="hyderabad" />}
      {false && <CityPage city="Chennai" slug="chennai" />}
      {false && <CityPage city="Pune" slug="pune" />}
      {false && <CityPage city="Ahmedabad" slug="ahmedabad" />}
      {false && <CityPage city="Kolkata" slug="kolkata" />}
      <DemoModal demo={demo} onClose={() => setDemo(null)} />
      <Chatbot setPage={setPage} />
    </div>
  );
}

// ─── PERSONA BAR ──────────────────────────────────────────────────────────────
function PersonaBar({ persona, personaInfo, profile, setPage }) {
  const [visible, setVisible] = useState(true);
  const [expanded, setExpanded] = useState(false);
  if (!visible) return null;

  const topScores = Object.entries(profile.scores || {})
    .sort((a,b) => b[1]-a[1]).slice(0,4);

  return (
    <div style={{
      position:"fixed",bottom:88,left: expanded ? 0 : -8,zIndex:950,
      transition:"left .3s cubic-bezier(.4,0,.2,1)",
    }}>
      <div style={{
        background:"#fff",borderRadius:"0 16px 16px 0",
        boxShadow:"0 8px 32px rgba(0,0,0,.12)",
        border:`1.5px solid ${personaInfo.color}30`,
        borderLeft: expanded ? `3px solid ${personaInfo.color}` : "3px solid transparent",
        overflow:"hidden",
        width: expanded ? 260 : 44,
        transition:"all .3s cubic-bezier(.4,0,.2,1)",
      }}>
        {/* Toggle tab */}
        <div onClick={()=>setExpanded(!expanded)} style={{
          display:"flex",alignItems:"center",gap:".6rem",
          padding:".75rem .85rem",cursor:"pointer",
          borderBottom: expanded ? `1px solid #F1F5F9` : "none",
        }}>
          <div style={{
            width:28,height:28,borderRadius:8,flexShrink:0,
            background:`${personaInfo.color}15`,
            display:"flex",alignItems:"center",justifyContent:"center",
            fontSize:"1rem",
          }}>{personaInfo.emoji}</div>
          {expanded && (
            <div style={{flex:1,minWidth:0}}>
              <div style={{fontSize:".68rem",fontFamily:"'JetBrains Mono',monospace",fontWeight:600,letterSpacing:".1em",textTransform:"uppercase",color:personaInfo.color}}>{personaInfo.label}</div>
              <div style={{fontSize:".72rem",color:"#94A3B8"}}>Your interest profile</div>
            </div>
          )}
          {expanded && (
            <button onClick={e=>{e.stopPropagation();setVisible(false);}} style={{background:"transparent",border:"none",cursor:"pointer",color:"#CBD5E1",fontSize:"1rem",lineHeight:1,padding:0,flexShrink:0}}>×</button>
          )}
        </div>

        {expanded && (
          <div style={{padding:".75rem .85rem 1rem"}}>
            <div style={{fontSize:".7rem",color:"#94A3B8",fontFamily:"'JetBrains Mono',monospace",letterSpacing:".08em",marginBottom:".6rem",textTransform:"uppercase"}}>Interest Signals</div>
            <div style={{display:"flex",flexWrap:"wrap",gap:".3rem",marginBottom:"1rem"}}>
              {topScores.map(([sig,score])=>(
                <span key={sig} style={{
                  display:"inline-flex",alignItems:"center",gap:.3,
                  background:`${personaInfo.color}12`,color:personaInfo.color,
                  borderRadius:99,padding:".18rem .55rem",
                  fontSize:".68rem",fontWeight:700,
                }}>
                  {sig} <span style={{opacity:.6,fontSize:".6rem"}}>×{score}</span>
                </span>
              ))}
            </div>
            <div style={{fontSize:".7rem",color:"#94A3B8",marginBottom:".65rem"}}>
              Visited {profile.visits?.length || 0} pages · Viewed {profile.demos?.length || 0} demos
            </div>
            <button onClick={()=>{setPage("contact");setExpanded(false);}} style={{
              width:"100%",padding:".55rem",borderRadius:9,
              background:`linear-gradient(135deg,${personaInfo.color},${personaInfo.color}cc)`,
              color:"#fff",border:"none",cursor:"pointer",
              fontFamily:"'Manrope',sans-serif",fontSize:".78rem",fontWeight:700,
            }}>Get personalised quote →</button>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── EXPORT ───────────────────────────────────────────────────────────────────
export default function App() {
  return (
    <BrowserRouter>
      <AppInner />
    </BrowserRouter>
  );
}