"use client";

import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import Navbar from "../components/Navbar";
import HomeContent from "../components/HomeContent";
import DynamicContent from "../components/DynamicContent";
import Footer from "../components/Footer";

export default function Home() {
  const [activeTab, setActiveTab] = useState("Home");
  const [searchQuery, setSearchQuery] = useState("");

  // Handle browser document title updates dynamically based on the active tab
  useEffect(() => {
    const baseTitle = "Journal of Federated and Distributed AI (JFDAI)";
    if (activeTab === "Home") {
      document.title = baseTitle;
    } else {
      document.title = `${activeTab} | ${baseTitle}`;
    }
  }, [activeTab]);

  const handleNavigate = (tab: string) => {
    setSearchQuery(""); // Clear search query when explicitly clicking navigation items
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setActiveTab("Search Results");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-[#F3F4F6] text-gray-800 flex flex-col font-sans">
      {/* Header Section */}
      <Header onNavigate={handleNavigate} onSearch={handleSearch} />

      {/* Navigation Bar */}
      <Navbar activeTab={activeTab} onNavigate={handleNavigate} />

      {/* Main Page Layout Container */}
      <main className="max-w-[1140px] w-full mx-auto px-4 py-6 flex-1 flex flex-col gap-6">
        {activeTab === "Home" ? (
          <HomeContent onNavigate={handleNavigate} />
        ) : (
          <DynamicContent
            activeTab={activeTab}
            searchQuery={searchQuery}
            onNavigate={handleNavigate}
          />
        )}
      </main>

      {/* Footer Section */}
      <Footer />
    </div>
  );
}
