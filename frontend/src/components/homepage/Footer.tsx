import { FacebookIcon, InstagramIcon, TwitterIcon, YoutubeIcon } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#161616] text-white py-10 px-6 md:px-20">
      <div className="flex flex-col-reverse md:flex-row justify-between gap-10">
        {/* Left Section - Logo & Contact Info */}
        <div className="text-center sm:text-left sm:items-start flex flex-col items-center">
          <div className="mb-2">
            <img src="/logo/ApplusLogo.png" alt="Applus Logo" className="h-8" />
          </div>
          <p className="text-sm text-gray-400">
            Call now: <span className="text-white font-semibold">(319) 555-0115</span>
          </p>
          <div className="mt-2 text-sm  text-gray-400 space-y-1">
            <p>14th Floor, Cebu IT Tower 1, Cebu Business Park Ayala, Cebu City, Philippines</p>
          </div>
        </div>

        {/* Right Section - Nav Links */}
        <div className="flex justify-center md:justify-end items-center space-x-4 sm:space-x-8 md:space-x-24 whitespace-nowrap">
          <a href="#" className="hover:underline">
            About
          </a>
          <a href="#" className="hover:underline">
            Contact
          </a>
          <a href="#" className="hover:underline">
            Browse Jobs
          </a>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="mt-10 border-t border-gray-800 pt-6 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500">
        <p>© 2025 Applus - Job Posting. All rights reserved</p>
        <div className="flex gap-4 mt-3 md:mt-0">
          <FacebookIcon className="w-4 h-4 hover:text-white" />
          <YoutubeIcon className="w-4 h-4 hover:text-white" />
          <InstagramIcon className="w-4 h-4 hover:text-white" />
          <TwitterIcon className="w-4 h-4 hover:text-white" />
        </div>
      </div>
    </footer>
  );
}
