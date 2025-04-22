"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="bg-white border-b w-full">
      <nav className="max-w-7xl mx-auto flex items-center justify-between px-4 py-4 md:px-2">
        <div className="flex items-center">
          {/* Logo */}
          <img src="/Logo.png" alt="Applus Logo" className="h-8 w-auto" />
        </div>

        {/* Desktop nav */}
        <div className="hidden lg:flex lg:gap-x-10 items-center w-[60%]">
          <a href="#" className="text-sm font-medium text-gray-700 hover:text-orange-600">
            Home
          </a>
          <a href="#" className="text-sm font-medium text-gray-700 hover:text-orange-600">
            About Us
          </a>
          <a href="#" className="text-sm font-medium text-gray-700 hover:text-orange-600">
            Browse Jobs
          </a>
        </div>

        <div className="hidden lg:flex gap-x-2">
          {/* Sign In / CTA Button */}
          <Button variant="outline">Sign In</Button>
          {/* Sign Up / CTA Button */}
          <Button>Sign Up</Button>
        </div>

        {/* Mobile menu button */}
        <div className="lg:hidden">
          <Button variant="ghost" size="icon" onClick={() => setMobileMenuOpen(true)}>
            <Menu className="w-5 h-5" />
          </Button>
        </div>
      </nav>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 bg-white z-50 p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              {/* Logo */}
              <img src="/Logo.png" alt="Applus Logo" className="h-8 w-auto" />
            </div>
            <Button variant="ghost" size="icon" onClick={() => setMobileMenuOpen(false)}>
              <X className="w-5 h-5" />
            </Button>
          </div>

          <div className="flex flex-col space-y-4">
            <a href="#" className="text-sm font-medium text-gray-700 hover:text-orange-600">
              Home
            </a>
            <a href="#" className="text-sm font-medium text-gray-700 hover:text-orange-600">
              About Us
            </a>
            <a href="#" className="text-sm font-medium text-gray-700 hover:text-orange-600">
              Browse Jobs
            </a>
            <div className="gap-y-2">
              <Button variant="outline" className="w-full mt-4">
                Sign In
              </Button>
              <Button className="w-full mt-4">Sign Up</Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
