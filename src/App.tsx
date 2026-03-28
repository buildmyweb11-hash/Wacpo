/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  Heart, 
  Users, 
  Shield, 
  Target, 
  Eye, 
  MapPin, 
  Phone, 
  Mail, 
  Facebook, 
  MessageCircle, 
  ChevronRight, 
  Menu, 
  X, 
  Award,
  Globe,
  CheckCircle2,
  ArrowRight,
  Briefcase,
  UserCheck,
  User,
  Building2,
  FileText
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

// Utility for tailwind classes
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// --- Constants & Data ---

const LOGO_URL = "https://i.postimg.cc/c4mNnFX0/Screenshot-20260326-184821-Lite.jpg";
const IMAGE_ABOUT = "https://i.postimg.cc/Bvtss2Tr/Screenshot-20260326-185738-Lite.jpg";
const IMAGE_LEADER = "https://i.postimg.cc/HLcYXFSF/Screenshot-20260326-185530-Lite.jpg";
const IMAGE_CREDIBILITY = "https://i.postimg.cc/9MRWPyrC/IMG-20260326-WA0010.jpg";
const IMAGE_FOUNDER_HERO = "https://i.postimg.cc/zXWyYYz0/Screenshot-20260326-185521-Lite.jpg";

const NAV_LINKS = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Mission', href: '#mission' },
  { name: 'Impact', href: '#impact' },
  { name: 'Leadership', href: '#leadership' },
  { name: 'Contact', href: '#contact' },
];

// Placeholder for missing Scale icon from lucide
const Scale = (props: any) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z" />
    <path d="m2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z" />
    <path d="M7 21h10" />
    <path d="M12 3v18" />
    <path d="M3 7h18" />
  </svg>
);

const OBJECTIVES = [
  {
    title: "Protection & Justice",
    description: "To advocate for the rights of women and children and provide protection against GBV and exploitation.",
    icon: Shield
  },
  {
    title: "Education & Awareness",
    description: "Raising community awareness on children's rights and the importance of women's empowerment.",
    icon: Globe
  },
  {
    title: "Legal Support",
    description: "Providing legal aid and counseling for victims of abuse and domestic violence.",
    icon: Scale
  },
  {
    title: "Economic Empowerment",
    description: "Supporting women with vocational training and small business opportunities to gain financial independence.",
    icon: Heart
  },
  {
    title: "Emergency Response",
    description: "Rapid humanitarian assistance for displaced families and children in crisis areas.",
    icon: Target
  },
  {
    title: "Policy Advocacy",
    description: "Working with government bodies to strengthen laws protecting vulnerable groups.",
    icon: CheckCircle2
  }
];

const BENEFICIARIES = [
  {
    name: "Vulnerable Women",
    description: "Survivors of domestic violence, widows, and women in extreme poverty seeking a path to dignity and self-reliance.",
    image: "https://picsum.photos/seed/women-ngo/600/400"
  },
  {
    name: "At-Risk Children",
    description: "Orphans, street children, and those denied education who need a safe environment and access to learning.",
    image: "https://picsum.photos/seed/children-ngo/600/400"
  },
  {
    name: "Displaced Families",
    description: "IDPs and refugees who have lost their homes and livelihoods due to conflict or climate change in the region.",
    image: "https://picsum.photos/seed/family-ngo/600/400"
  }
];

const REGIONS = [
  { name: "Maroodi-Jeex", desc: "The capital region and surrounding areas." },
  { name: "Awdal", desc: "The westernmost region of Somaliland." },
  { name: "Sahil", desc: "Coastal areas and port cities." },
  { name: "Togdheer", desc: "Central agricultural and livestock hub." },
  { name: "Sool", desc: "Eastern regions with significant humanitarian needs." },
  { name: "Sanaag", desc: "The largest and most mountainous region." }
];

const PARTNERS = [
  { name: "UNICEF", logo: "https://picsum.photos/seed/unicef/200/100" },
  { name: "UN Women", logo: "https://picsum.photos/seed/unwomen/200/100" },
  { name: "Ministry of Family Affairs", logo: "https://picsum.photos/seed/ministry/200/100" },
  { name: "Save the Children", logo: "https://picsum.photos/seed/savechildren/200/100" },
  { name: "Oxfam", logo: "https://picsum.photos/seed/oxfam/200/100" },
  { name: "Local Leaders", logo: "https://picsum.photos/seed/local/200/100" }
];

const GOVERNANCE = [
  {
    title: "General Assembly",
    description: "The supreme governing body responsible for high-level policy, constitutional amendments, and long-term vision.",
    icon: Users
  },
  {
    title: "Board of Directors",
    description: "Provides strategic oversight, financial accountability, and ensures the organization stays true to its mission.",
    icon: Briefcase
  },
  {
    title: "Executive Team",
    description: "Led by the Executive Director, responsible for day-to-day operations, program implementation, and staff management.",
    icon: Building2
  }
];

const GALLERY_IMAGES = [
  { url: IMAGE_ABOUT, title: "Community Discussion" },
  { url: IMAGE_FOUNDER_HERO, title: "Leadership in the Field" },
  { url: IMAGE_LEADER, title: "Executive Planning" },
  { url: IMAGE_CREDIBILITY, title: "National Support" },
  { url: "https://picsum.photos/seed/wacpo-act-1/800/600", title: "Field Activities" },
  { url: "https://picsum.photos/seed/wacpo-act-2/800/600", title: "Youth Engagement" },
  { url: "https://picsum.photos/seed/wacpo-act-3/800/600", title: "Legal Support Session" },
  { url: "https://picsum.photos/seed/wacpo-act-4/800/600", title: "Women's Workshop" },
  { url: "https://picsum.photos/seed/wacpo-act-5/800/600", title: "Child Protection Outreach" }
];

const TEAM_MEMBERS = [
  { name: "Muna Hussein Mohamed", role: "Founder & Executive Director" },
  { name: "Ahmed Ali Gedi", role: "Program Manager" },
  { name: "Fardowsa Yusuf", role: "Legal Advocacy Lead" },
  { name: "Sahra Barkhad", role: "Child Protection Officer" },
  { name: "Hassan Omar", role: "Finance & Operations" },
  { name: "Maryan Ismail", role: "Community Outreach" }
];

// --- Components ---

const SectionTitle = ({ subtitle, title, centered = false }: { subtitle: string, title: string, centered?: boolean }) => (
  <div className={cn("mb-16", centered && "text-center")}>
    <span className="text-brand-blue font-bold uppercase tracking-widest text-sm mb-4 block">{subtitle}</span>
    <h2 className="text-4xl md:text-5xl font-bold text-slate-900 leading-tight">{title}</h2>
  </div>
);

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={cn(
      "fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 py-4",
      isScrolled ? "bg-white/95 backdrop-blur-md shadow-md py-3" : "bg-transparent"
    )}>
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <a href="#home" className="flex items-center gap-4 group">
          <img src={LOGO_URL} alt="WACPO Logo" className="h-14 w-auto rounded-full shadow-md transition-transform group-hover:scale-105" />
          <div className="hidden sm:block">
            <span className={cn("text-2xl font-bold tracking-tight block leading-none", isScrolled ? "text-brand-blue" : "text-brand-blue")}>WACPO</span>
            <span className="text-[10px] uppercase tracking-widest text-slate-500 font-bold">Protection Organization</span>
          </div>
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-10">
          {NAV_LINKS.map((link) => (
            <a 
              key={link.name} 
              href={link.href}
              className="text-sm font-bold text-slate-700 hover:text-brand-blue transition-colors uppercase tracking-wide"
            >
              {link.name}
            </a>
          ))}
          <a 
            href="#contact" 
            className="bg-brand-blue text-white px-8 py-3 rounded-full text-sm font-bold hover:bg-blue-700 transition-all shadow-lg hover:shadow-xl"
          >
            Get Involved
          </a>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden text-slate-900"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={32} /> : <Menu size={32} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 right-0 bg-white shadow-2xl border-t border-slate-100 p-8 flex flex-col gap-6 md:hidden"
          >
            {NAV_LINKS.map((link) => (
              <a 
                key={link.name} 
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-xl font-bold text-slate-800 hover:text-brand-blue"
              >
                {link.name}
              </a>
            ))}
            <a 
              href="#contact" 
              onClick={() => setIsMobileMenuOpen(false)}
              className="bg-brand-blue text-white text-center py-4 rounded-2xl font-bold text-lg"
            >
              Get Involved
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = () => {
  return (
    <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src={IMAGE_FOUNDER_HERO} 
          alt="WACPO Founder Hero" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-white/90 via-white/70 to-white/95 backdrop-blur-[2px]" />
      </div>

      <div className="absolute inset-0 logo-pattern pointer-events-none z-0"></div>
      
      {/* Animated Background Shapes */}
      <motion.div 
        animate={{ 
          scale: [1, 1.2, 1],
          rotate: [0, 90, 0],
          x: [0, 100, 0],
          y: [0, 50, 0]
        }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        className="absolute top-1/4 -left-20 w-[500px] h-[500px] bg-blue-100/30 rounded-full blur-[100px] z-0"
      />
      <motion.div 
        animate={{ 
          scale: [1, 1.1, 1],
          rotate: [0, -45, 0],
          x: [0, -50, 0],
          y: [0, 100, 0]
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute bottom-1/4 -right-20 w-[400px] h-[400px] bg-blue-50/40 rounded-full blur-[100px] z-0"
      />

      <div className="max-w-7xl mx-auto px-6 text-center z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="flex flex-col items-center"
        >
          <motion.img 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ 
              opacity: 1, 
              scale: 1,
              y: [0, -15, 0]
            }}
            transition={{ 
              opacity: { duration: 1.2, delay: 0.2 },
              scale: { duration: 1.2, delay: 0.2 },
              y: { duration: 5, repeat: Infinity, ease: "easeInOut" }
            }}
            src={LOGO_URL} 
            alt="WACPO Large Logo" 
            className="h-48 md:h-80 w-auto mb-12 drop-shadow-[0_20px_50px_rgba(0,86,179,0.3)] rounded-full border-8 border-white/40 backdrop-blur-sm"
          />
          
          <span className="inline-block py-2 px-6 rounded-full bg-brand-light-blue text-brand-blue text-sm font-bold uppercase tracking-[0.2em] mb-8">
            Women and Children’s Protection Organization
          </span>
          
          <h1 className="text-6xl md:text-8xl font-bold text-slate-900 mb-10 leading-[1] tracking-tighter">
            A Movement for <br /> <span className="text-brand-blue">Justice</span> and <span className="text-brand-blue">Dignity</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-slate-600 mb-12 max-w-3xl mx-auto leading-relaxed font-medium">
            Founded in 2014 in Hargeisa, WACPO is a women-led humanitarian force dedicated to protecting the most vulnerable members of our society through advocacy, empowerment, and direct support.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <a 
              href="#about" 
              className="w-full sm:w-auto bg-brand-blue text-white px-12 py-5 rounded-full font-bold text-xl hover:bg-blue-700 transition-all shadow-2xl hover:shadow-blue-500/40 flex items-center justify-center gap-3 group"
            >
              Learn More
              <ChevronRight className="group-hover:translate-x-2 transition-transform" />
            </a>
            <a 
              href="#contact" 
              className="w-full sm:w-auto bg-white text-brand-blue border-2 border-brand-blue px-12 py-5 rounded-full font-bold text-xl hover:bg-brand-light-blue transition-all shadow-xl"
            >
              Get Involved
            </a>
          </div>
        </motion.div>
      </div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 text-slate-400"
      >
        <span className="text-xs uppercase tracking-[0.3em] font-bold">Scroll to explore</span>
        <motion.div 
          animate={{ y: [0, 15, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-1 h-10 bg-slate-200 rounded-full relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 right-0 h-1/2 bg-brand-blue rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  );
};

const About = () => {
  return (
    <section id="about" className="section-padding bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="relative"
          >
            <div className="aspect-[4/5] rounded-[60px] overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,0,0,0.15)] relative z-10">
              <img 
                src={IMAGE_ABOUT} 
                alt="WACPO Community Discussion" 
                className="w-full h-full object-cover hover:scale-110 transition-transform duration-1000"
              />
            </div>
            <div className="absolute -bottom-16 -right-16 w-80 h-80 bg-brand-light-blue rounded-[60px] -z-10 hidden md:block" />
            <div className="absolute -top-16 -left-16 w-48 h-48 border-8 border-brand-blue/10 rounded-full -z-10" />
            
            <div className="absolute bottom-12 left-12 glass-card p-8 rounded-[32px] max-w-[300px] hidden md:block">
              <div className="flex items-center gap-5 mb-4">
                <div className="w-14 h-14 rounded-2xl bg-brand-blue flex items-center justify-center text-white shadow-lg shadow-blue-500/30">
                  <Heart size={30} />
                </div>
                <span className="font-bold text-slate-900 text-xl">10+ Years</span>
              </div>
              <p className="text-sm text-slate-600 leading-relaxed font-medium">
                Dedicated service to women and children in Somaliland since 2014.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            <SectionTitle subtitle="Our Story" title="A Legacy of Empowerment and Protection" />
            <div className="space-y-8 text-slate-600 leading-relaxed text-xl font-medium">
              <p>
                Established in 2014 in Hargeisa, the Women and Children’s Protection Organization (WACPO) emerged from a critical need to address the systemic challenges facing vulnerable groups in Somaliland.
              </p>
              <p>
                As a women-led organization, we understand that the protection of women and children is the foundation of a healthy, prosperous society. Over the past decade, we have grown from a small group of activists to a national force for change, tackling issues like Gender-Based Violence (GBV), child exploitation, and lack of educational access.
              </p>
              <p>
                Our approach combines immediate humanitarian relief with long-term advocacy and empowerment programs. We believe in dignity for all, and we work tirelessly to ensure that every woman and child has the opportunity to live a life free from fear and full of potential.
              </p>
              <p>
                From our humble beginnings in Hargeisa, we have expanded our reach to all six regions of Somaliland, impacting thousands of lives through our dedicated field activities and community engagement programs.
              </p>
            </div>
            
            <div className="mt-12 grid grid-cols-2 gap-10">
              <div className="p-8 rounded-[32px] bg-brand-neutral border border-slate-100">
                <h4 className="text-5xl font-bold text-brand-blue mb-2">5000+</h4>
                <p className="text-sm font-bold text-slate-500 uppercase tracking-widest">Impacted Lives</p>
              </div>
              <div className="p-8 rounded-[32px] bg-brand-neutral border border-slate-100">
                <h4 className="text-5xl font-bold text-brand-blue mb-2">6</h4>
                <p className="text-sm font-bold text-slate-500 uppercase tracking-widest">Regions Served</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const MissionVision = () => {
  return (
    <section id="mission" className="section-padding bg-brand-neutral relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <SectionTitle subtitle="Our Foundation" title="Vision & Mission" centered />
          <p className="text-slate-600 max-w-3xl mx-auto text-xl font-medium">The core principles that drive every action we take at WACPO.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          <motion.div 
            whileHover={{ y: -15 }}
            className="bg-white p-16 rounded-[60px] shadow-2xl border border-slate-100 relative overflow-hidden group"
          >
            <div className="absolute top-0 right-0 w-48 h-48 bg-brand-light-blue rounded-bl-[150px] -z-10 transition-transform group-hover:scale-110" />
            <div className="w-20 h-20 bg-brand-blue rounded-3xl flex items-center justify-center text-white mb-10 shadow-2xl shadow-blue-500/30">
              <Eye size={40} />
            </div>
            <h3 className="text-4xl font-bold text-slate-900 mb-8">Our Vision</h3>
            <p className="text-slate-600 text-xl leading-relaxed font-medium">
              To see a society where women and children are fully protected, empowered, and treated with the justice and dignity they deserve, contributing to a peaceful and prosperous Somaliland.
            </p>
          </motion.div>

          <motion.div 
            whileHover={{ y: -15 }}
            className="bg-brand-blue p-16 rounded-[60px] shadow-2xl relative overflow-hidden group"
          >
            <div className="absolute top-0 right-0 w-48 h-48 bg-white/10 rounded-bl-[150px] -z-10 transition-transform group-hover:scale-110" />
            <div className="w-20 h-20 bg-white rounded-3xl flex items-center justify-center text-brand-blue mb-10 shadow-2xl">
              <Target size={40} />
            </div>
            <h3 className="text-4xl font-bold text-white mb-8">Our Mission</h3>
            <p className="text-white/90 text-xl leading-relaxed font-medium">
              To advocate for the rights of women and children through protection programs, legal support, educational awareness, and economic empowerment, ensuring their voices are heard and their rights are upheld.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const ObjectivesGrid = () => {
  return (
    <section id="objectives" className="section-padding bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <SectionTitle subtitle="What We Do" title="Strategic Objectives" centered />
          <p className="text-slate-600 max-w-3xl mx-auto text-xl font-medium">Our roadmap for creating lasting impact in the lives of those we serve.</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
          {OBJECTIVES.map((obj, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.8 }}
              className="p-10 rounded-[48px] border border-slate-100 hover:border-brand-blue/30 hover:shadow-[0_30px_60px_-15px_rgba(0,86,179,0.1)] transition-all group bg-white"
            >
              <div className="w-16 h-16 rounded-2xl bg-brand-light-blue flex items-center justify-center text-brand-blue mb-8 group-hover:bg-brand-blue group-hover:text-white transition-all duration-500">
                <obj.icon size={32} />
              </div>
              <h4 className="text-2xl font-bold text-slate-900 mb-6">{obj.title}</h4>
              <p className="text-slate-600 leading-relaxed text-lg font-medium">
                {obj.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const BeneficiariesSection = () => {
  return (
    <section className="section-padding bg-brand-neutral">
      <div className="max-w-7xl mx-auto">
        <SectionTitle subtitle="Who We Serve" title="Our Beneficiaries" centered />
        <div className="grid md:grid-cols-3 gap-10">
          {BENEFICIARIES.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.2 }}
              className="bg-white rounded-[48px] overflow-hidden shadow-xl group"
            >
              <div className="h-64 overflow-hidden">
                <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
              </div>
              <div className="p-10">
                <h4 className="text-2xl font-bold text-slate-900 mb-4">{item.name}</h4>
                <p className="text-slate-600 leading-relaxed font-medium">{item.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Credibility = () => {
  return (
    <section className="relative py-40 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img 
          src={IMAGE_CREDIBILITY} 
          alt="National Recognition" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-brand-blue/85 backdrop-blur-[4px]" />
      </div>
      
      <div className="max-w-7xl mx-auto px-6 relative z-10 text-center text-white">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          <Award size={80} className="mx-auto mb-10 text-white/90" />
          <h2 className="text-5xl md:text-7xl font-bold mb-10 leading-tight tracking-tight">
            Recognized and Supported <br /> at the National Level
          </h2>
          <p className="text-2xl text-white/90 max-w-4xl mx-auto leading-relaxed mb-16 font-medium">
            Our work is conducted in close partnership with the Somaliland government and international humanitarian agencies, ensuring our programs are aligned with national priorities and global standards.
          </p>
          <div className="flex flex-wrap justify-center gap-16 md:gap-24">
            <div className="flex flex-col items-center">
              <span className="text-6xl font-bold mb-3">100%</span>
              <span className="text-sm uppercase tracking-[0.3em] font-bold text-white/70">Transparency</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-6xl font-bold mb-3">UN</span>
              <span className="text-sm uppercase tracking-[0.3em] font-bold text-white/70">Aligned</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-6xl font-bold mb-3">NGO</span>
              <span className="text-sm uppercase tracking-[0.3em] font-bold text-white/70">Certified</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const Leadership = () => {
  return (
    <section id="leadership" className="section-padding bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <SectionTitle subtitle="Our Leadership" title="Leadership in Action" centered />
          <p className="text-slate-600 max-w-3xl mx-auto text-xl font-medium">Meet the dedicated visionaries leading the charge for justice and dignity.</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="relative"
          >
            <div className="aspect-[3/4] rounded-[40px] lg:rounded-[60px] overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,86,179,0.2)]">
              <img 
                src={IMAGE_LEADER} 
                alt="Muna Hussein Mohamed" 
                className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-1000"
              />
            </div>
            <div className="absolute -bottom-4 -right-2 lg:-bottom-10 lg:-right-10 bg-brand-blue text-white p-4 lg:p-12 rounded-[20px] lg:rounded-[48px] shadow-2xl max-w-[180px] lg:max-w-[350px]">
              <h4 className="text-sm lg:text-3xl font-bold mb-1 lg:mb-2 leading-tight">Muna Hussein Mohamed</h4>
              <p className="text-[8px] lg:text-lg text-white/80 font-bold uppercase tracking-widest">Founder & Executive Director</p>
            </div>
          </motion.div>

          <div className="space-y-10">
            <div className="glass-card p-12 rounded-[48px] border-l-[12px] border-brand-blue shadow-2xl">
              <h3 className="text-3xl font-bold text-slate-900 mb-6">Biography</h3>
              <div className="space-y-6 text-slate-600 leading-relaxed text-xl font-medium">
                <p>
                  Muna Hussein Mohamed is the Founder and Executive Director of WACPO. With over 15 years of dedicated experience in the humanitarian and human rights sector in Somaliland, she has become a leading voice for the protection of women and children.
                </p>
                <p>
                  Her journey began with a deep-seated commitment to social justice, leading her to establish WACPO in 2014. Under her leadership, the organization has successfully implemented numerous programs addressing Gender-Based Violence (GBV), child protection, and women's economic empowerment.
                </p>
                <p>
                  Muna's vision is to create a society where every woman and child lives with dignity and security. Her work has been recognized nationally for its impact and dedication to the most vulnerable.
                </p>
              </div>
              <div className="mt-10 pt-10 border-t border-slate-100">
                <p className="text-2xl text-brand-blue font-bold italic leading-relaxed">
                  "Our work is not just about protection; it's about restoring hope and building a future where every child can dream and every woman can lead."
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Team Grid */}
        <div className="mt-32">
          <h3 className="text-3xl font-bold text-slate-900 mb-16 text-center">Our Executive Team</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
            {TEAM_MEMBERS.map((member, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="group"
              >
                <div className="aspect-square rounded-3xl overflow-hidden mb-6 shadow-lg group-hover:shadow-2xl group-hover:-translate-y-2 transition-all duration-500 bg-brand-light-blue flex items-center justify-center">
                  <User size={64} className="text-brand-blue opacity-50 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700" />
                </div>
                <h5 className="font-bold text-slate-900 text-lg mb-1">{member.name}</h5>
                <p className="text-brand-blue text-sm font-bold uppercase tracking-widest">{member.role}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const GovernanceSection = () => {
  return (
    <section className="section-padding bg-brand-neutral relative overflow-hidden">
      {/* Decorative background lines */}
      <div className="absolute inset-0 pointer-events-none opacity-5">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="100" height="100" patternUnits="userSpaceOnUse">
              <path d="M 100 0 L 0 0 0 100" fill="none" stroke="currentColor" strokeWidth="1"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <SectionTitle subtitle="How We Operate" title="Governance Structure" centered />
        
        <div className="relative">
          {/* Visual Connectors for Desktop */}
          <div className="hidden md:block absolute top-1/2 left-0 right-0 h-0.5 bg-brand-blue/10 -translate-y-1/2 -z-10" />
          
          <div className="grid md:grid-cols-3 gap-10">
            {GOVERNANCE.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.2 }}
                className="bg-white p-12 rounded-[48px] shadow-xl border border-slate-100 text-center group relative"
              >
                {/* Connector dots */}
                <div className="hidden md:block absolute top-1/2 -left-5 w-10 h-10 bg-white border-4 border-brand-light-blue rounded-full -translate-y-1/2 -z-10 group-first:hidden" />
                <div className="hidden md:block absolute top-1/2 -right-5 w-10 h-10 bg-white border-4 border-brand-light-blue rounded-full -translate-y-1/2 -z-10 group-last:hidden" />

                <div className="w-20 h-20 bg-brand-light-blue rounded-3xl flex items-center justify-center text-brand-blue mx-auto mb-8 group-hover:bg-brand-blue group-hover:text-white transition-all duration-500 shadow-inner">
                  <item.icon size={40} />
                </div>
                <h4 className="text-2xl font-bold text-slate-900 mb-6">{item.title}</h4>
                <p className="text-slate-600 leading-relaxed font-medium">{item.description}</p>
                
                <div className="mt-8 pt-8 border-t border-slate-50 opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="text-brand-blue font-bold text-sm uppercase tracking-widest">Core Pillar {idx + 1}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const RegionsSection = () => {
  return (
    <section className="section-padding bg-white">
      <div className="max-w-7xl mx-auto">
        <SectionTitle subtitle="Our Reach" title="Operational Regions" centered />
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {REGIONS.map((region, idx) => (
            <motion.div
              key={idx}
              whileHover={{ y: -10 }}
              className="p-8 rounded-[32px] bg-brand-neutral border border-slate-100 text-center flex flex-col items-center justify-center gap-4 group hover:bg-brand-blue transition-all duration-500"
            >
              <MapPin size={32} className="text-brand-blue group-hover:text-white transition-colors" />
              <h5 className="font-bold text-slate-900 group-hover:text-white transition-colors">{region.name}</h5>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <section id="impact" className="section-padding bg-brand-neutral">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
          <div>
            <SectionTitle subtitle="Our Work in Action" title="Community Engagement & Field Activities" />
          </div>
          <button className="text-brand-blue font-bold text-lg flex items-center gap-3 hover:gap-5 transition-all mb-16">
            View Full Gallery <ArrowRight size={24} />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {GALLERY_IMAGES.map((img, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ y: -10 }}
              onClick={() => setSelectedImage(img.url)}
              className={cn(
                "relative rounded-[48px] overflow-hidden shadow-2xl group cursor-pointer aspect-[4/3]",
                idx === 0 && "md:col-span-2 md:row-span-2 md:aspect-auto"
              )}
            >
              <img src={img.url} alt={img.title} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-12">
                <h5 className="text-white font-bold text-2xl mb-2">{img.title}</h5>
                <p className="text-white/80 font-medium">WACPO Field Mission 2024</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
            className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-xl flex items-center justify-center p-6 md:p-12 cursor-zoom-out"
          >
            <motion.button
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              className="absolute top-10 right-10 text-white hover:text-brand-blue transition-colors"
            >
              <X size={48} />
            </motion.button>
            <motion.img
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              src={selectedImage}
              alt="Gallery Preview"
              className="max-w-full max-h-full rounded-3xl shadow-2xl object-contain"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

const PartnersSection = () => {
  return (
    <section className="section-padding bg-white border-y border-slate-100">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-slate-400 font-bold uppercase tracking-[0.3em] text-xs mb-4 block">Trusted By</span>
          <h3 className="text-2xl font-bold text-slate-900">Our Strategic Partners</h3>
        </div>
        <div className="flex flex-wrap justify-center items-center gap-16 md:gap-24 opacity-60 grayscale hover:grayscale-0 transition-all duration-1000">
          {PARTNERS.map((partner, idx) => (
            <div key={idx} className="flex flex-col items-center gap-4">
              <img src={partner.logo} alt={partner.name} className="h-12 w-auto object-contain" />
              <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">{partner.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Contact = () => {
  return (
    <section id="contact" className="section-padding bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-24">
          <div>
            <SectionTitle subtitle="Get in Touch" title="Connect With WACPO" />
            <p className="text-slate-600 mb-16 text-xl font-medium leading-relaxed">
              Whether you want to volunteer, partner with us, or need support, our team is here to help. Reach out through any of the channels below or visit our office in Hargeisa.
            </p>

            <div className="space-y-10">
              <div className="flex items-start gap-8 group">
                <div className="w-16 h-16 rounded-3xl bg-brand-light-blue flex items-center justify-center text-brand-blue shrink-0 group-hover:bg-brand-blue group-hover:text-white transition-all duration-500">
                  <MapPin size={32} />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 mb-2 text-2xl">Our Office</h4>
                  <p className="text-slate-600 text-lg font-medium">Hargeisa, Somaliland</p>
                </div>
              </div>
              <div className="flex items-start gap-8 group">
                <div className="w-16 h-16 rounded-3xl bg-brand-light-blue flex items-center justify-center text-brand-blue shrink-0 group-hover:bg-brand-blue group-hover:text-white transition-all duration-500">
                  <Phone size={32} />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 mb-2 text-2xl">Phone</h4>
                  <p className="text-slate-600 text-lg font-medium">+252 63 4424524</p>
                </div>
              </div>
              <div className="flex items-start gap-8 group">
                <div className="w-16 h-16 rounded-3xl bg-brand-light-blue flex items-center justify-center text-brand-blue shrink-0 group-hover:bg-brand-blue group-hover:text-white transition-all duration-500">
                  <Mail size={32} />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 mb-2 text-2xl">Email</h4>
                  <div className="space-y-1">
                    <p className="text-slate-600 text-lg font-medium">wacpo.organization@gmail.com</p>
                    <p className="text-slate-500 text-base font-medium">hmuna2020@gmail.com (Personal)</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-16 flex flex-wrap gap-6">
              <a 
                href="https://www.facebook.com/share/p/1C14jFvzW3/?" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-4 bg-[#1877F2] text-white px-10 py-4 rounded-2xl font-bold text-lg hover:opacity-90 transition-all shadow-xl shadow-blue-500/20"
              >
                <Facebook size={24} /> Facebook
              </a>
              <a 
                href="https://wa.me/252634424524" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-4 bg-[#25D366] text-white px-10 py-4 rounded-2xl font-bold text-lg hover:opacity-90 transition-all shadow-xl shadow-green-500/20"
              >
                <MessageCircle size={24} /> WhatsApp
              </a>
            </div>
          </div>

          <div className="space-y-12">
            <div className="bg-brand-neutral p-12 rounded-[60px] border border-slate-100 shadow-2xl">
              <h3 className="text-3xl font-bold text-slate-900 mb-10">Send a Message</h3>
              <form className="space-y-8">
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <label className="text-sm font-bold text-slate-700 uppercase tracking-widest">Full Name</label>
                    <input type="text" className="w-full px-6 py-5 rounded-[24px] border border-slate-200 focus:border-brand-blue focus:ring-4 focus:ring-brand-blue/10 outline-none transition-all font-medium" placeholder="John Doe" />
                  </div>
                  <div className="space-y-3">
                    <label className="text-sm font-bold text-slate-700 uppercase tracking-widest">Email Address</label>
                    <input type="email" className="w-full px-6 py-5 rounded-[24px] border border-slate-200 focus:border-brand-blue focus:ring-4 focus:ring-brand-blue/10 outline-none transition-all font-medium" placeholder="john@example.com" />
                  </div>
                </div>
                <div className="space-y-3">
                  <label className="text-sm font-bold text-slate-700 uppercase tracking-widest">Message</label>
                  <textarea rows={6} className="w-full px-6 py-5 rounded-[24px] border border-slate-200 focus:border-brand-blue focus:ring-4 focus:ring-brand-blue/10 outline-none transition-all font-medium resize-none" placeholder="How can we help?"></textarea>
                </div>
                <button className="w-full bg-brand-blue text-white py-6 rounded-[24px] font-bold text-xl hover:bg-blue-700 transition-all shadow-2xl shadow-blue-500/30">
                  Send Message
                </button>
              </form>
            </div>
            
            <div className="h-[400px] rounded-[60px] overflow-hidden shadow-2xl border-8 border-white">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d125844.75564883908!2d44.00424641640625!3d9.562389000000001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1623237583737583%3A0x1623237583737583!2sHargeisa%2C%20Somaliland!5e0!3m2!1sen!2s!4v1711545600000!5m2!1sen!2s" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen={true} 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-white pt-32 pb-12 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-16 mb-24">
          <div className="space-y-8">
            <div className="flex items-center gap-5">
              <img src={LOGO_URL} alt="WACPO Logo" className="h-16 w-auto rounded-full shadow-xl" />
              <span className="text-3xl font-bold tracking-tighter">WACPO</span>
            </div>
            <p className="text-slate-400 leading-relaxed text-lg font-medium">
              A women-led humanitarian organization dedicated to protecting and empowering women and children in Somaliland since 2014.
            </p>
            <div className="flex gap-6">
              <a href="https://www.facebook.com/share/p/1C14jFvzW3/?" className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center hover:bg-brand-blue transition-all duration-500">
                <Facebook size={24} />
              </a>
              <a href="#" className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center hover:bg-brand-blue transition-all duration-500">
                <Globe size={24} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-xl font-bold mb-10 uppercase tracking-widest text-white/50">Quick Links</h4>
            <ul className="space-y-5 text-slate-400 text-lg font-medium">
              {NAV_LINKS.map(link => (
                <li key={link.name}>
                  <a href={link.href} className="hover:text-white transition-colors flex items-center gap-2 group">
                    <ChevronRight size={16} className="text-brand-blue group-hover:translate-x-1 transition-transform" />
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xl font-bold mb-10 uppercase tracking-widest text-white/50">Our Focus</h4>
            <ul className="space-y-5 text-slate-400 text-lg font-medium">
              <li className="flex items-center gap-2">
                <CheckCircle2 size={16} className="text-brand-blue" />
                GBV Protection
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 size={16} className="text-brand-blue" />
                Child Rights
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 size={16} className="text-brand-blue" />
                Legal Advocacy
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 size={16} className="text-brand-blue" />
                Women Empowerment
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-xl font-bold mb-10 uppercase tracking-widest text-white/50">Newsletter</h4>
            <p className="text-slate-400 mb-8 text-lg font-medium">Stay updated with our latest impact stories and field missions.</p>
            <div className="flex flex-col gap-4">
              <input type="email" placeholder="Your Email" className="bg-white/5 border-none rounded-2xl px-6 py-4 text-lg outline-none focus:ring-2 focus:ring-brand-blue transition-all" />
              <button className="bg-brand-blue px-6 py-4 rounded-2xl font-bold text-lg hover:bg-blue-700 transition-all">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8 text-slate-500 text-sm font-bold uppercase tracking-widest">
          <p>© 2026 WACPO. All rights reserved.</p>
          <div className="flex gap-10">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default function App() {
  return (
    <div className="relative selection:bg-brand-blue selection:text-white">
      <Navbar />
      <main>
        <Hero />
        <About />
        <MissionVision />
        <ObjectivesGrid />
        <BeneficiariesSection />
        <Credibility />
        <Leadership />
        <GovernanceSection />
        <RegionsSection />
        <Gallery />
        <PartnersSection />
        <Contact />
      </main>
      <Footer />
      
      {/* Floating Action Buttons */}
      <div className="fixed bottom-10 right-10 z-40 flex flex-col gap-4">
        <motion.a 
          whileHover={{ scale: 1.1, rotate: 10 }}
          whileTap={{ scale: 0.9 }}
          href="https://wa.me/252634424524"
          target="_blank"
          className="w-16 h-16 bg-[#25D366] text-white rounded-full shadow-[0_20px_40px_-10px_rgba(37,211,102,0.5)] flex items-center justify-center hover:shadow-green-500/40 transition-all"
        >
          <MessageCircle size={36} />
        </motion.a>
      </div>
    </div>
  );
}
