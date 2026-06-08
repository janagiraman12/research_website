"use client";

import React, { useState } from "react";

interface NavbarProps {
  activeTab: string;
  onNavigate: (tab: string) => void;
}

export default function Navbar({ activeTab, onNavigate }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    "Home",
    "Aims & Scope",
    "Editorial Board",
    "For Authors",
    "For Reviewers",
    "Indexing",
    "Ethics & Policies",
    "Publication Charges",
    "Resources",
    "Contact",
  ];

  return (
    <nav className="w-full bg-[#0B4A8F] text-white sticky top-0 z-50 shadow-md">
      <div className="max-w-[1140px] mx-auto px-4 flex justify-between items-center">
        {/* Desktop Menu */}
        <div className="hidden md:flex flex-row w-full items-stretch">
          {menuItems.map((item, index) => {
            const isActive = activeTab === item;
            return (
              <button
                key={item}
                onClick={() => onNavigate(item)}
                className={`py-3 px-4 text-xs lg:text-[13px] font-bold uppercase tracking-wider transition-colors duration-200 cursor-pointer text-left border-r border-[#083A70] first:border-l ${
                  isActive
                    ? "bg-[#2D6DB5] text-white"
                    : "hover:bg-[#1C5CA4] text-gray-100"
                }`}
              >
                {item}
              </button>
            );
          })}
        </div>

        {/* Mobile Title & Toggle */}
        <div className="flex md:hidden justify-between items-center w-full py-3">
          <span className="font-bold text-xs uppercase tracking-wider text-gray-200">
            Navigation Menu
          </span>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-white hover:text-gray-300 focus:outline-none"
            aria-label="Toggle navigation menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              {isOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-[#0A3C74] border-t border-[#083A70] flex flex-col">
          {menuItems.map((item) => {
            const isActive = activeTab === item;
            return (
              <button
                key={item}
                onClick={() => {
                  onNavigate(item);
                  setIsOpen(false);
                }}
                className={`py-3 px-6 text-xs font-bold uppercase tracking-wider border-b border-[#083A70] text-left transition-colors duration-150 ${
                  isActive ? "bg-[#2D6DB5]" : "hover:bg-[#1C5CA4]"
                }`}
              >
                {item}
              </button>
            );
          })}
        </div>
      )}
    </nav>
  );
}
