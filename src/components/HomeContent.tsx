"use client";

import React from "react";
import Image from "next/image";

interface HomeContentProps {
  onNavigate: (tab: string) => void;
}

export default function HomeContent({ onNavigate }: HomeContentProps) {
  const announcements = [
    {
      title: "First Call for Papers: Open for Submissions (Volume 1, Issue 1)",
      date: "June 4, 2026",
      desc: "The Journal of Federated and Distributed AI (JFDAI) is officially launching and open for submissions. We invite original research articles, comprehensive review papers, and AI application articles. Benefit from fast desk reviews and developmental peer review feedback.",
    },

  ];

  return (
    <div className="flex flex-col gap-6">
      {/* Hero Section Banner (Light Blue #BFD4EA) */}
      <div className="bg-[#BFD4EA] border border-gray-300 p-6 md:p-8 flex flex-col md:flex-row gap-6 items-center">
        {/* Left Side: Journal Cover Design (SVG) */}
        <div className="w-[180px] h-[240px] md:w-[200px] md:h-[270px] bg-[#0B4A8F] shadow-lg flex-shrink-0 flex flex-col justify-between p-4 border-2 border-white rounded relative overflow-hidden">
          {/* Cover background pattern */}
          <div className="absolute inset-0 opacity-15">
            <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                  <path d="M 20 0 L 0 0 0 20" fill="none" stroke="white" strokeWidth="1" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>
          </div>

          <div className="z-10 flex flex-col gap-1">
            <div className="text-[9px] font-bold text-[#BFD4EA] uppercase tracking-widest border-b border-[#BFD4EA] pb-1">
              EDAS Platform
            </div>
            <div className="text-white font-serif font-bold text-base leading-tight mt-2">
              Journal of Federated & Distributed AI
            </div>
            <div className="text-[10px] italic text-gray-200">JFDAI</div>
          </div>

          {/* Graphical abstraction / Logo */}
          <div className="z-10 self-center bg-white rounded-full p-2 flex items-center justify-center h-[70px] w-[70px]">
            <Image
              src="/logo.png"
              alt="JFDAI Cover Logo"
              width={70}
              height={70}
              className="object-contain w-[54px] h-[54px]"
            />
          </div>

          <div className="z-10 text-right flex flex-col gap-[2px]">
            <div className="text-[10px] text-white font-bold">Volume 1 • Issue 1</div>
            <div className="text-[8px] text-gray-300">ISSN: Pending</div>
          </div>
        </div>

        {/* Right Side: Hero Text */}
        <div className="flex-1 flex flex-col gap-3 text-left">
          <h2 className="text-2xl md:text-3xl font-serif font-extrabold text-[#0B4A8F] leading-tight">
            Journal of Federated and Distributed AI
          </h2>
          <p className="text-base md:text-lg italic font-semibold text-[#1C5CA4]">
            "Advancing Privacy-Preserving and Decentralized Artificial Intelligence"
          </p>
          <div className="h-[2px] bg-[#0B4A8F] w-20 my-1"></div>
          <p className="text-sm text-gray-700 leading-relaxed max-w-2xl">
            An international peer-reviewed Open Access journal focusing on key breakthroughs in collaborative machine learning models, system scalability, and privacy-preserving algorithms in decentralized ecosystems.
          </p>
          <div className="flex gap-3 mt-2">
            <button
              onClick={() => onNavigate("For Authors")}
              className="px-4 py-2 bg-[#2D6DB5] hover:bg-[#0B4A8F] text-white font-bold text-xs uppercase tracking-wider transition-colors duration-150"
            >
              Author Guidelines
            </button>
            <button
              className="px-4 py-2 border border-[#2D6DB5] text-[#2D6DB5] hover:bg-[#2D6DB5] hover:text-white font-bold text-xs uppercase tracking-wider transition-all duration-150"
            >
              Scope details
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Area: Left = About & Announcements, Right = Sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Left Column (Main Content) */}
        <div className="lg:col-span-3 flex flex-col gap-6">
          {/* ABOUT THE JOURNAL */}
          <section className="bg-white border border-gray-200 p-6 shadow-sm">
            <h3 className="text-lg font-bold text-[#0B4A8F] border-b border-gray-200 pb-2 mb-4 uppercase tracking-wider font-serif">
              About the Journal
            </h3>
            <div className="text-[14px] text-gray-800 leading-relaxed flex flex-col gap-4 font-sans">
              <p>
                The <strong>Journal of Federated and Distributed AI (JFDAI)</strong> is a peer-reviewed, open access journal dedicated to publishing high-quality research in the rapidly evolving fields of federated learning, distributed AI systems, and privacy-preserving machine learning.
              </p>
              <p>
                As artificial intelligence becomes increasingly pervasive, the need for decentralized, privacy-aware, and communication-efficient learning paradigms has never been greater. Traditional centralized AI approaches require aggregating vast amounts of sensitive data into single repositories, creating significant privacy risks, regulatory compliance challenges, and scalability bottlenecks.
              </p>
              <p>
                JFDAI addresses this critical gap by providing a dedicated forum for researchers, practitioners, and industry professionals to share advancements in technologies that enable collaborative intelligence without centralizing data.
              </p>
            </div>
          </section>

          {/* ANNOUNCEMENTS */}
          <section className="bg-white border border-gray-200 p-6 shadow-sm">
            <h3 className="text-lg font-bold text-[#0B4A8F] border-b border-gray-200 pb-2 mb-4 uppercase tracking-wider font-serif">
              Journal Announcements
            </h3>
            <div className="flex flex-col gap-4">
              {announcements.map((ann, idx) => (
                <div key={idx} className="bg-blue-50/50 border border-blue-100 p-4">
                  <div className="flex justify-between items-start gap-2">
                    <h4 className="text-sm font-bold text-[#0B4A8F]">
                      {ann.title}
                    </h4>
                    <span className="text-[10px] text-gray-500 font-bold whitespace-nowrap bg-white px-2 py-0.5 border border-gray-200">
                      {ann.date}
                    </span>
                  </div>
                  <p className="text-xs text-gray-700 mt-2 leading-relaxed">
                    {ann.desc}
                  </p>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Right Column (Sidebar) */}
        <div className="flex flex-col gap-6">
          {/* JOURNAL METRICS */}
          <div className="bg-white border border-gray-200 p-4 shadow-sm">
            <h4 className="text-xs font-extrabold text-[#0B4A8F] border-b-2 border-[#0B4A8F] pb-2 mb-3 uppercase tracking-wider">
              Journal Metrics
            </h4>
            <div className="grid grid-cols-2 gap-2 text-center">
              <div className="bg-gray-50 p-2 border border-gray-100">
                <span className="block text-lg font-extrabold text-[#2D6DB5]">&lt; 7 days</span>
                <span className="text-[10px] text-gray-500 uppercase font-semibold">Desk Review</span>
              </div>
              <div className="bg-gray-50 p-2 border border-gray-100">
                <span className="block text-lg font-extrabold text-[#2D6DB5]">4-8 weeks</span>
                <span className="text-[10px] text-gray-500 uppercase font-semibold">Review Cycle</span>
              </div>
              <div className="bg-gray-50 p-2 border border-gray-100">
                <span className="block text-lg font-extrabold text-[#2D6DB5]">25-30%</span>
                <span className="text-[10px] text-gray-500 uppercase font-semibold">Accept Rate (Est)</span>
              </div>
              <div className="bg-gray-50 p-2 border border-gray-100">
                <span className="block text-lg font-extrabold text-[#2D6DB5]">CC BY 4.0</span>
                <span className="text-[10px] text-gray-500 uppercase font-semibold">Open Access</span>
              </div>
            </div>
          </div>

          {/* QUICK LINKS */}
          <div className="bg-white border border-gray-200 p-4 shadow-sm">
            <h4 className="text-xs font-extrabold text-[#0B4A8F] border-b-2 border-[#0B4A8F] pb-2 mb-3 uppercase tracking-wider">
              Quick Resources
            </h4>
            <div className="flex flex-col gap-2">
              <button
                onClick={() => onNavigate("For Authors")}
                className="w-full text-left p-2 hover:bg-gray-50 text-xs font-bold text-gray-700 hover:text-[#0B4A8F] border border-gray-100 transition-colors"
              >
                📝 Submit Manuscript
              </button>
              <button
                onClick={() => onNavigate("Resources")}
                className="w-full text-left p-2 hover:bg-gray-50 text-xs font-bold text-gray-700 hover:text-[#0B4A8F] border border-gray-100 transition-colors"
              >
                📄 Manuscript Templates
              </button>
              <button
                onClick={() => onNavigate("Ethics & Policies")}
                className="w-full text-left p-2 hover:bg-gray-50 text-xs font-bold text-gray-700 hover:text-[#0B4A8F] border border-gray-100 transition-colors"
              >
                ⚖️ Publication Ethics
              </button>
              <button
                onClick={() => onNavigate("Publication Charges")}
                className="w-full text-left p-2 hover:bg-gray-50 text-xs font-bold text-gray-700 hover:text-[#0B4A8F] border border-gray-100 transition-colors"
              >
                💰 Open Access Fees (APC)
              </button>
            </div>
          </div>

          {/* INDEXING LOGOS */}
          <div className="bg-white border border-gray-200 p-4 shadow-sm">
            <h4 className="text-xs font-extrabold text-[#0B4A8F] border-b-2 border-[#0B4A8F] pb-2 mb-3 uppercase tracking-wider">
              Indexing & Archiving
            </h4>
            <div className="flex flex-wrap gap-2 justify-center py-2 grayscale opacity-75 hover:grayscale-0 hover:opacity-100 transition-all duration-300">
              <div className="bg-gray-100 text-[10px] font-bold px-3 py-2 border border-gray-300 text-gray-700 w-[110px] text-center">
                Google Scholar
              </div>
              <div className="bg-gray-100 text-[10px] font-bold px-3 py-2 border border-gray-300 text-gray-700 w-[110px] text-center">
                Crossref (DOI)
              </div>
              <div className="bg-gray-100 text-[10px] font-bold px-3 py-2 border border-gray-300 text-gray-700 w-[110px] text-center">
                DOAJ
              </div>
              <div className="bg-gray-100 text-[10px] font-bold px-3 py-2 border border-gray-300 text-gray-700 w-[110px] text-center">
                Scopus
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
