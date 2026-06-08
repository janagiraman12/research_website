"use client";

import React from "react";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="w-full bg-white border-t border-gray-200 mt-12 py-8 text-gray-600">
      <div className="max-w-[1140px] mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-6 text-center md:text-left">
        
        {/* Left Side: Journal Name & CC License */}
        <div className="flex flex-col gap-2 max-w-xl">
          <div className="flex items-center gap-3 mb-2">
            <Image
              src="/logo.png"
              alt="JFDAI Logo"
              width={60}
              height={60}
              className="h-[40px] w-auto object-contain"
            />
            <h5 className="font-bold text-[#0B4A8F] text-sm">
              Journal of Federated and Distributed AI (JFDAI)
            </h5>
          </div>
          <p className="text-xs text-gray-500 leading-relaxed">
            JFDAI is a peer-reviewed open access journal. All articles are published under the terms of the Creative Commons Attribution 4.0 International License (CC BY 4.0), which permits unrestricted use, distribution, and reproduction in any medium, provided the original work is properly cited.
          </p>
          <div className="text-[11px] text-gray-400 mt-1">
            © {new Date().getFullYear()} Journal of Federated and Distributed AI. All Rights Reserved.
          </div>
        </div>

        {/* Right Side: ISSN & Quick Info */}
        <div className="flex flex-col gap-1 items-center md:items-end text-xs font-semibold text-gray-500">
          <div>
            ISSN: <span className="text-gray-800 font-bold">Pending (To be requested)</span>
          </div>
          <div className="mt-3 text-[10px] text-gray-400 font-normal">
            Designed for Desktop Compatibility (IJCDS inspired layout)
          </div>
        </div>

      </div>
    </footer>
  );
}
