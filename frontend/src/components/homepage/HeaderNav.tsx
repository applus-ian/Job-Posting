"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import clsx from "clsx";
import { usePathname } from "next/navigation";

export default function HeaderNav() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="bg-white border-b w-full">
      <nav className="max-w-7xl mx-auto flex items-center justify-between px-4 py-4 md:px-2">
        <div className="flex items-center">
          {/* Logo */}
          <img src="/Logo.png" alt="Applus Logo" className="h-8 w-auto" />
        </div>

        {/* Desktop nav */}
        <div className="hidden lg:flex lg:gap-x-10 items-center w-[60%]">
          <Link
            href={"/"}
            className={clsx(
              "text-sm font-medium hover:text-orange-600",
              pathname === "/" ? "text-orange-600" : "text-gray-700"
            )}
          >
            Home
          </Link>
          <Link
            href={"/about-us"}
            className={clsx(
              "text-sm font-medium hover:text-orange-600",
              pathname === "/about-us" ? "text-orange-600" : "text-gray-700"
            )}
          >
            About Us
          </Link>
          <Link
            href={"/find-jobs"}
            className={clsx(
              "text-sm font-medium hover:text-orange-600",
              pathname === "/find-jobs" ? "text-orange-600" : "text-gray-700"
            )}
          >
            Find Jobs
          </Link>
        </div>

        <div className="hidden lg:flex gap-x-2">
          {/* Sign In / CTA Button */}
          <Link href="/login" passHref>
            <Button variant="outline">Sign In</Button>
          </Link>

          {/* Sign Up / CTA Button */}
          <Link href="/register" passHref>
            <Button>Sign Up</Button>
          </Link>
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
            <Link
              href={"/"}
              className={clsx(
                "text-sm font-medium hover:text-orange-600",
                pathname === "/" ? "text-orange-600" : "text-gray-700"
              )}
            >
              Home
            </Link>
            <Link
              href={"/about-us"}
              className={clsx(
                "text-sm font-medium hover:text-orange-600",
                pathname === "/about-us" ? "text-orange-600" : "text-gray-700"
              )}
            >
              About Us
            </Link>
            <Link
              href={"/find-jobs"}
              className={clsx(
                "text-sm font-medium hover:text-orange-600",
                pathname === "/find-jobs" ? "text-orange-600" : "text-gray-700"
              )}
            >
              Find Jobs
            </Link>
            <div className="gap-y-2">
              {/* Sign In / CTA Button */}
              <Link href="/login" passHref>
                <Button variant="outline" className="w-full mt-4">
                  Sign In
                </Button>
              </Link>

              {/* Sign Up / CTA Button */}
              <Link href="/register" passHref>
                <Button className="w-full mt-4">Sign Up</Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
