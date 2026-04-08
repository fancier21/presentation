import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { 
  ChevronRight, 
  ChevronLeft, 
  Hospital, 
  Zap, 
  Target, 
  ShieldCheck,
  XCircle
} from 'lucide-react';
import { presentationContent } from './content';
import SlideContainer from './components/SlideContainer';

const BASE = import.meta.env.BASE_URL;
const CROSS_IMAGE = `${BASE}slide1_img.png`;

export default function App() {
  const [[page, direction], setPage] = useState([0, 0]);
  const slides = presentationContent.slides;

  const paginate = (newDirection) => {
    let newPage = page + newDirection;
    if (newPage < 0) newPage = 0;
    if (newPage >= slides.length) newPage = slides.length - 1;
    setPage([newPage, newDirection]);
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight' || e.key === ' ') paginate(1);
      if (e.key === 'ArrowLeft') paginate(-1);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [page]);

  const currentSlide = slides[page];

  return (
    <div className="relative h-screen w-screen bg-brand-black text-brand-white overflow-hidden select-none font-inter uppercase italic font-black">
      {/* Background dot texture */}
      <div className="absolute inset-0 opacity-5 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#D9FF00 1px, transparent 0)', backgroundSize: '40px 40px' }} />
      
      <AnimatePresence initial={false} custom={direction}>
        <SlideContainer key={page} direction={direction}>
          {renderSlide(currentSlide)}
        </SlideContainer>
      </AnimatePresence>

      {/* Navigation */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 md:translate-x-0 md:bottom-10 md:right-10 flex gap-0 z-50">
        <button 
          onClick={() => paginate(-1)}
          className="w-12 h-12 md:w-16 md:h-16 bg-brand-white text-brand-black border-2 md:border-4 border-brand-black flex items-center justify-center hover:bg-brand-lime transition-colors disabled:opacity-20"
          disabled={page === 0}
        >
          <ChevronLeft className="w-6 h-6 md:w-8 md:h-8" strokeWidth={4} />
        </button>
        <div className="h-12 md:h-16 px-4 md:px-8 bg-brand-lime text-brand-black border-y-2 md:border-y-4 border-brand-black flex items-center justify-center text-lg md:text-2xl font-black whitespace-nowrap">
          {page + 1} / {slides.length}
        </div>
        <button 
          onClick={() => paginate(1)}
          className="w-12 h-12 md:w-16 md:h-16 bg-brand-white text-brand-black border-2 md:border-4 border-brand-black flex items-center justify-center hover:bg-brand-lime transition-colors disabled:opacity-20"
          disabled={page === slides.length - 1}
        >
          <ChevronRight className="w-6 h-6 md:w-8 md:h-8" strokeWidth={4} />
        </button>
      </div>

      {/* Branding logo */}
      <div className="absolute top-4 left-4 md:top-8 md:left-8 flex items-center gap-2 md:gap-3 z-50">
        <div className="bg-brand-lime p-2 md:p-3 border-2 md:border-4 border-brand-black shadow-[2px_2px_0px_0px_rgba(255,255,255,1)] md:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)]">
          <Hospital className="w-5 h-5 md:w-7 md:h-7 text-brand-black" strokeWidth={3} />
        </div>
        <div>
          <h1 className="text-lg md:text-3xl font-black tracking-tighter text-brand-lime leading-none">TG-2026</h1>
          <p className="text-[8px] md:text-xs bg-brand-white text-brand-black px-1.5 md:px-2 py-0.5 mt-0.5 md:mt-1">PATIENT HUNTER</p>
        </div>
      </div>
    </div>
  );
}

function renderSlide(slide) {
  switch (slide.id) {
    case 'hero': return <HeroView slide={slide} />;
    case 'situation': return <SituationView slide={slide} />;
    case 'process': return <ProcessView slide={slide} />;
    case 'example': return <ExampleView slide={slide} />;
    case 'stats': return <StatsView slide={slide} />;
    case 'categories': return <CategoryView slide={slide} />;
    case 'benefits': return <BenefitsView slide={slide} />;
    case 'pricing': return <PricingView slide={slide} />;
    case 'cta': return <CTAView slide={slide} />;
    default: return null;
  }
}

// Shared tag + title header used by most slides
function SlideHeader({ tag, title }) {
  return (
    <div className="mb-8 md:mb-12 text-center">
      <span className="text-lg md:text-2xl bg-brand-lime text-brand-black px-4 md:px-6 py-1.5 md:py-2 border-4 border-brand-black inline-block">
        {tag}
      </span>
      <h2 className="text-3xl md:text-[60px] font-black leading-[1.2] mt-4 md:mt-6 tracking-tighter text-brand-lime leading-[0.9] break-words">
        {title}
      </h2>
    </div>
  );
}

// ─── SLIDE 1 ─────────────────────────────────────────────────────────────────
function HeroView({ slide }) {
  return (
    <div className="grid lg:grid-cols-2 gap-12 items-center py-10">
      {/* Left Column: Content */}
      <div className="order-2 lg:order-1">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-xl md:text-2xl bg-brand-lime text-brand-black px-6 py-2 border-4 border-brand-black inline-block mb-10 shadow-brutalist uppercase tracking-tighter">
            MARITIME HOSPITAL
          </span>
          <h2 className="text-5xl md:text-[80px] lg:text-[90px] font-black leading-[1.1] tracking-tighter text-brand-white mb-10">
            {slide.title.split(' ').map((word, i) => (
              <span key={i} className={i === 1 ? "text-brand-lime block" : "block"}>{word}</span>
            ))}
          </h2>
          <div className="mt-10 bg-brand-white text-brand-black p-8 md:p-10 border-l-[16px] md:border-l-[24px] border-brand-lime shadow-brutalist max-w-2xl">
            <p className="text-xl md:text-3xl font-black leading-normal italic uppercase tracking-tight">
              {slide.subtitle}
            </p>
          </div>
          <div className="mt-12 group flex items-center gap-6">
            <div className="text-sm md:text-base font-black text-brand-lime tracking-[0.4em] bg-brand-black border-4 border-brand-lime inline-block px-8 py-4 uppercase">
              {slide.footer}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Right Column: Hero Image Frame */}
      <div className="order-1 lg:order-2 flex justify-center lg:justify-end pr-4 lg:pr-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 0.8, type: "spring" }}
          className="relative"
        >
          {/* Decorative background box */}
          <div className="absolute inset-0 bg-brand-lime border-4 border-brand-black translate-x-6 translate-y-6 -z-10 shadow-brutalist" />
          
          <div className="bg-brand-black border-8 border-brand-white p-2 shadow-[20px_20px_0px_0px_#D9FF00]">
            <div className="relative overflow-hidden bg-brand-black aspect-square w-full max-w-[450px] md:max-w-[550px]">
               <img 
                 src={CROSS_IMAGE} 
                 alt="hero" 
                 className="w-full h-full object-cover animate-float scale-110" 
               />
               
               {/* Overlays */}
               <div className="absolute top-6 left-6 bg-brand-black text-brand-lime text-[10px] font-black px-4 py-2 border-2 border-brand-lime uppercase tracking-[0.3em]">
                 SIGNAL DETECTED
               </div>
               
               <div className="absolute bottom-6 right-6 bg-brand-lime text-brand-black text-xs font-black px-4 py-2 border-4 border-brand-black -rotate-6 shadow-[8px_8px_0px_0px_rgba(255,255,255,1)] uppercase">
                 AI ENGINE
               </div>
            </div>
          </div>
          
          {/* System metadata label */}
          {/* <div className="absolute -bottom-12 right-0 hidden lg:block">
            <p className="text-[10px] tracking-[0.5em] text-brand-white/20 uppercase font-black">STABLE_OS // BTM_REGION_SCAN</p>
          </div> */}
        </motion.div>
      </div>
    </div>
  );
}

// ─── SLIDE 2 ─────────────────────────────────────────────────────────────────
function SituationView({ slide }) {
  return (
    <div>
      <SlideHeader tag={slide.tag} title={slide.title} />
      <div className="grid md:grid-cols-3 gap-0">
        {slide.cards.map((card, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className={`p-8 md:p-12 border-4 border-brand-white ${i % 2 === 0 ? 'bg-brand-white text-brand-black' : 'bg-brand-black text-brand-white border-brand-lime'}`}
          >
            <div className="text-5xl font-black mb-6">{i + 1}.</div>
            <h3 className="text-3xl font-black mb-4 uppercase tracking-tight">{card.title}</h3>
            <p className="text-lg font-black leading-relaxed opacity-80">{card.text}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

// ─── SLIDE 3 ─────────────────────────────────────────────────────────────────
function ProcessView({ slide }) {
  return (
    <div className="relative">
      <SlideHeader tag={slide.tag} title={slide.title} />
      <div className="grid md:grid-cols-4 gap-6">
        {slide.steps.map((step, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1 }}
            className="brutalist-card-dark p-8"
          >
            <div className="text-6xl font-black text-brand-lime mb-3 opacity-50">{step.id}</div>
            <h4 className="text-2xl font-black mb-3 border-b-4 border-brand-lime pb-2">{step.title}</h4>
            <p className="text-base font-black leading-tight text-brand-white/80">{step.text}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

// ─── SLIDE 4 ─────────────────────────────────────────────────────────────────
function ExampleView({ slide }) {
  return (
    <div>
      <SlideHeader tag={slide.tag} title={slide.title} />

      {/* Stacks vertically on mobile, side-by-side on lg+ */}
      <div className="grid lg:grid-cols-2 gap-0 border-8 border-brand-white overflow-hidden shadow-[16px_16px_0px_0px_#D9FF00]">

        {/* Left — source message */}
        <div className="bg-brand-white text-brand-black p-5 md:p-8 lg:p-12 border-b-8 lg:border-b-0 lg:border-r-8 border-brand-black">
           <p className="text-[10px] font-black uppercase tracking-[0.4em] mb-4 bg-brand-black text-brand-white p-2 inline-block">SOURCE GROUP</p>
           <div className="mb-5">
              <p className="text-base md:text-xl font-black text-brand-lime bg-brand-black px-3 py-1.5 inline-block mb-1">{slide.source.author}</p>
              <p className="text-xs font-black text-brand-black/40 tracking-widest block">{slide.source.group}</p>
           </div>
           <p className="text-base md:text-2xl lg:text-3xl font-black leading-snug tracking-tight">
             "{slide.source.text}"
           </p>
        </div>

        {/* Right — lead card */}
        <div className="bg-brand-black text-brand-white p-5 md:p-8 lg:p-12">
           <span className="text-[10px] font-black uppercase tracking-[0.4em] mb-4 bg-brand-lime text-brand-black p-2 inline-block">
             {slide.lead.status}
           </span>
           <div className="space-y-5 mt-2">
              <div>
                  <p className="text-[10px] uppercase font-black text-brand-lime tracking-widest mb-1">PATIENT ID</p>
                  <p className="text-lg md:text-2xl font-black tracking-tight">{slide.lead.who}</p>
              </div>
              <div>
                  <p className="text-[10px] uppercase font-black text-brand-lime tracking-widest mb-1">INTENT DETECTED</p>
                  <p className="text-sm md:text-lg font-black leading-snug">{slide.lead.request}</p>
              </div>
              <div className="p-4 md:p-6 bg-brand-lime text-brand-black border-4 border-brand-white">
                 <p className="text-[10px] font-black uppercase tracking-widest mb-2 opacity-60 flex items-center gap-1">
                   <Target size={12} strokeWidth={4} /> AI RECOMMENDED ACTION
                 </p>
                 <p className="text-sm md:text-lg font-black leading-snug italic">{slide.lead.ai_advice}</p>
              </div>
           </div>
           <div className="mt-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 border-t-4 border-brand-white/10 pt-4">
              <span className="text-[10px] text-brand-white/30 font-black tracking-widest truncate">{slide.lead.link}</span>
              <div className="text-sm md:text-base font-black text-brand-lime whitespace-nowrap">DETECTION: {slide.lead.speed}</div>
           </div>
        </div>
      </div>
    </div>
  );
}


// ─── SLIDE 5 ─────────────────────────────────────────────────────────────────
function StatsView({ slide }) {
  return (
    <div>
      <SlideHeader tag={slide.tag} title={slide.title} />

      {/* Two-column screenshot showcase */}
      <div className="grid md:grid-cols-2 gap-0 border-8 border-brand-white shadow-[16px_16px_0px_0px_#D9FF00]">

        {/* Screenshot 1 — LEADs bot */}
        <div className="flex flex-col border-b-8 md:border-b-0 md:border-r-8 border-brand-white">
          <div className="bg-brand-lime text-brand-black px-6 py-3 border-b-4 border-brand-black">
            <p className="text-xs font-black uppercase tracking-[0.3em]">ლიდების ჯგუფი</p>
            <p className="text-base font-black">(კლინიკა იღებს)</p>
          </div>
          <div className="bg-brand-black flex-1 p-4 flex items-center justify-center">
            <motion.img
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 }}
              src={`${BASE}slide5_img0.jpg`}
              alt="LEADs chat screenshot"
              className="w-full max-w-[320px] border-4 border-brand-lime shadow-[8px_8px_0px_0px_#D9FF00]"
            />
          </div>
        </div>

        {/* Screenshot 2 — Telegram source group */}
        <div className="flex flex-col">
          <div className="bg-brand-black text-brand-lime px-6 py-3 border-b-4 border-brand-lime">
            <p className="text-xs font-black uppercase tracking-[0.3em]">Telegram ჯგუფი</p>
            <p className="text-base font-black">(საიდაც ადამიანი ნერს)</p>
          </div>
          <div className="bg-brand-black flex-1 p-4 flex items-center justify-center">
            <motion.img
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              src={`${BASE}slide5_img1.jpg`}
              alt="БАТУМИ group screenshot"
              className="w-full max-w-[320px] border-4 border-brand-white shadow-[8px_8px_0px_0px_#FFFFFF]"
            />
          </div>
        </div>
      </div>

      {/* Call-out boxes below */}
      <div className="grid md:grid-cols-3 gap-0 mt-0 border-x-8 border-b-8 border-brand-white">
        {slide.boxes.map((text, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * i }}
            className={`p-6 border-r-4 last:border-r-0 border-brand-white/30 ${i === 0 ? 'bg-brand-lime text-brand-black' : 'bg-brand-black text-brand-white'}`}
          >
            <div className={`text-2xl font-black mb-2 ${i === 0 ? 'text-brand-black' : 'text-brand-lime'}`}>{i + 1}.</div>
            <p className="text-base font-black leading-tight">{text}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

// ─── SLIDE 6 ─────────────────────────────────────────────────────────────────
function CategoryView({ slide }) {
  return (
    <div>
      <SlideHeader tag={slide.tag} title={slide.title} />
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-0 border-4 border-brand-white">
        {slide.items.map((item, i) => (
          <motion.div 
            key={i}
            whileHover={{ backgroundColor: '#D9FF00', color: '#000000' }}
            className={`p-8 md:p-10 border-4 border-brand-white transition-all group flex flex-col justify-between min-h-[280px] md:min-h-[320px] ${i % 2 === 0 ? 'bg-brand-black' : 'bg-brand-slate'}`}
          >
            <h4 className="text-3xl font-black leading-none tracking-tighter">{item.title}</h4>
            <p className="text-base font-black leading-tight opacity-60 group-hover:opacity-100 group-hover:text-brand-black transition-opacity border-t-4 border-brand-lime pt-6 mt-8">
               "{item.quote}"
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

// ─── SLIDE 7 ─────────────────────────────────────────────────────────────────
function BenefitsView({ slide }) {
  return (
    <div>
      <SlideHeader tag={slide.tag} title={slide.title} />
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {slide.benefits.map((benefit, i) => (
          <motion.div 
             key={i}
             className="brutalist-card p-8 flex flex-col items-center text-center group"
          >
            <div className="text-5xl font-black text-brand-black mb-6 group-hover:scale-125 transition-transform bg-brand-lime w-16 h-16 flex items-center justify-center border-4 border-brand-black rotate-6">
              {i + 1}
            </div>
            <h3 className="text-2xl font-black mb-4 border-b-4 border-brand-lime pb-2 w-full uppercase">{benefit.title}</h3>
            <p className="text-base font-black leading-tight opacity-80">{benefit.text}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

// ─── SLIDE 8 ─────────────────────────────────────────────────────────────────
function PricingView({ slide }) {
  return (
    <div>
      <SlideHeader tag={slide.tag} title={slide.title} />
      <div className="grid lg:grid-cols-2 gap-0 border-4 md:border-8 border-brand-white shadow-[8px_8px_0px_0px_#FFFFFF] md:shadow-[16px_16px_0px_0px_#FFFFFF]">
        <div className="bg-brand-white text-brand-black p-5 md:p-8 lg:p-12 lg:border-r-8 border-brand-black">
           <h3 className="text-xl md:text-3xl lg:text-5xl font-black mb-6 md:mb-8 bg-brand-black text-brand-white p-3 md:p-4 inline-block -rotate-1 leading-tight">
             {slide.pay_per_lead}
           </h3>
           <div className="space-y-4 md:space-y-5">
             {slide.bullets.map((point, i) => (
                <div key={i} className="flex items-center gap-3 md:gap-4 text-base md:text-xl font-black border-b-2 md:border-b-4 border-brand-black/10 pb-4 md:pb-5">
                   <Zap size={24} strokeWidth={4} className="text-brand-lime shrink-0 hidden md:block" />
                   <div className="md:hidden w-2 h-2 bg-brand-lime shrink-0" />
                   {point}
                </div>
             ))}
           </div>
        </div>
        <div className="bg-brand-black text-brand-white p-5 md:p-8 lg:p-12 flex flex-col justify-between">
           <div>
             <h4 className="text-lg md:text-2xl font-black mb-6 md:mb-8 bg-brand-lime text-brand-black p-2 md:p-3 inline-block rotate-1 uppercase tracking-tighter">LEAD CRITERIA</h4>
             <div className="space-y-3 md:space-y-4">
                {slide.what_counts.map((item, i) => (
                   <div key={i} className={`flex items-center gap-3 md:gap-4 p-3 md:p-4 border-2 md:border-4 transition-all ${
                     item.type === 'check' ? 'bg-brand-lime text-brand-black border-brand-lime' : 'opacity-40 border-brand-white/10'
                   }`}>
                      {item.type === 'check' ? <ShieldCheck size={24} strokeWidth={3} className="shrink-0" /> : <XCircle size={24} strokeWidth={3} className="shrink-0" />}
                      <span className="font-black text-sm md:text-lg uppercase leading-none">{item.text}</span>
                   </div>
                ))}
             </div>
           </div>
           <div className="mt-6 md:mt-8 p-4 md:p-6 border-4 md:border-8 border-brand-lime bg-brand-lime/10">
              <p className="text-xl md:text-3xl font-black text-brand-lime mb-1 tracking-tighter">GUARANTEED QUALITY</p>
              <p className="text-[10px] md:text-base font-black leading-tight opacity-60 italic uppercase tracking-[0.2em] md:tracking-widest">EVERY LEAD IS AI-VERIFIED FOR MEDICAL INTENT</p>
           </div>
        </div>
      </div>
    </div>
  );
}

// ─── SLIDE 9 ─────────────────────────────────────────────────────────────────
function CTAView({ slide }) {
  return (
    <div className="text-center">
       <div className="mb-10">
         <span className="inline-block bg-brand-white text-brand-black px-8 py-4 text-xl md:text-3xl font-black border-4 border-brand-black rotate-1 animate-float">
            {slide.header}
         </span>
       </div>
       <h2 className="text-4xl md:text-[70px] leading-[1.2] font-black leading-[0.8] tracking-tighter mb-14 text-brand-lime break-words">
          {slide.title.toUpperCase()}
       </h2>
       <div className="grid md:grid-cols-2 gap-8 items-center border-y-8 border-brand-white py-12">
          <div className="text-left">
            <p className="text-2xl md:text-4xl font-black leading-tight italic">{slide.description}</p>
          </div>
          <div className="flex flex-col items-center md:items-end">
             <button className="bg-brand-lime text-brand-black px-10 py-6 text-2xl md:text-3xl font-black border-8 border-brand-black shadow-[12px_12px_0px_0px_rgba(255,255,255,1)] hover:translate-x-[-4px] hover:translate-y-[-4px] transition-all active:scale-95 uppercase tracking-tighter">
               {slide.button}
             </button>
          </div>
       </div>
       <div className="mt-10 flex flex-col md:flex-row items-center justify-between text-brand-white/40 gap-4">
          <div className="text-3xl font-black tracking-tighter">{slide.footer.split(' · ')[0]}</div>
          <div className="text-4xl font-black text-brand-lime tracking-tighter">{slide.footer.split(' · ')[1]}</div>
       </div>
    </div>
  );
}
