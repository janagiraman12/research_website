"use client";

import React, { useState } from "react";
import Image from "next/image";

interface HeaderProps {
  onNavigate: (tab: string) => void;
  onSearch: (query: string) => void;
}

export default function Header({ onNavigate, onSearch }: HeaderProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onSearch(searchQuery);
    }
  };

  return (
    <header className="w-full bg-white border-b border-gray-200">
      {/* Top Bar with Thin Line & Search */}
      <div className="w-full bg-[#0B4A8F] h-[4px]"></div>

      {/* Search Bar Row */}
      <div className="max-w-[1140px] mx-auto px-4 py-2 flex justify-end items-center">
        <form onSubmit={handleSearchSubmit} className="flex items-center">
          <input
            type="text"
            placeholder="Search journal..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="px-3 py-1 text-sm border border-gray-300 focus:outline-none focus:ring-1 focus:ring-[#0B4A8F] h-[28px] w-[200px]"
          />
          <button
            type="submit"
            className="bg-[#2D6DB5] text-white px-3 py-1 text-sm font-medium hover:bg-[#0B4A8F] transition-colors duration-200 flex items-center justify-center h-[28px]"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </button>
        </form>
      </div>

      {/* Main Header Content */}
      <div className="max-w-[1140px] mx-auto px-4 pb-6 pt-2 flex flex-col md:flex-row justify-between items-center gap-6">
        {/* Left Side: Logo and Title */}
        <div className="flex items-center gap-4 cursor-pointer" onClick={() => onNavigate("Home")}>
          <div className="flex-shrink-0">
            {/* Elegant SVG Logo representing Federated AI Nodes */}
            <Image
              src="/logo.png"
              alt="JFDAI Logo"
              width={400}
              height={400}
              className="h-[60px] w-auto md:h-[80px] object-contain"
              priority
            />
          </div>
          <div>
            <h1 className="text-[26px] font-bold text-[#0B4A8F] leading-tight font-serif tracking-tight">
              Journal of Federated and Distributed AI
            </h1>
            <p className="text-[15px] font-semibold text-gray-500 tracking-wider">
              JFDAI • ISSN: To be requested
            </p>
          </div>
        </div>

        {/* Right Side: Action Buttons */}
        <div className="flex flex-wrap md:flex-nowrap gap-3">
          <button
            onClick={() => window.open("https://jfdai.jams.pub/login", "_blank", "noopener,noreferrer")}
            className="min-w-[150px] px-4 py-3 bg-[#2D6DB5] hover:bg-[#0B4A8F] text-white font-bold text-sm tracking-wide shadow-sm transition-all duration-200 ease-in-out border border-[#2D6DB5] hover:border-[#0B4A8F] uppercase text-center"
          >
            Submit an Article
          </button>
          <button
            onClick={() => onNavigate("Published Articles")}
            className="min-w-[150px] px-4 py-3 bg-[#2D6DB5] hover:bg-[#0B4A8F] text-white font-bold text-sm tracking-wide shadow-sm transition-all duration-200 ease-in-out border border-[#2D6DB5] hover:border-[#0B4A8F] uppercase text-center"
          >
            Published Articles
          </button>
          <button
            onClick={() => onNavigate("Current Issue")}
            className="min-w-[150px] px-4 py-3 bg-[#2D6DB5] hover:bg-[#0B4A8F] text-white font-bold text-sm tracking-wide shadow-sm transition-all duration-200 ease-in-out border border-[#2D6DB5] hover:border-[#0B4A8F] uppercase text-center"
          >
            Current Issue
          </button>
        </div>
      </div>
    </header>
  );
}
