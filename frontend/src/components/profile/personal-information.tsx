import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Image from "next/image";
import { FaMapMarkerAlt } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

export function PersonalInformation() {
  return (
    <div className="w-full">
      <div className="w-full bg-white p-4 sm:p-6 rounded-md border shadow-sm">
        <h2 className="text-lg font-medium mb-4 sm:mb-6">Personal Information</h2>
        
        <div className="grid grid-cols-12 gap-x-3 gap-y-4 sm:gap-x-6 sm:gap-y-5">
          {/* Profile Image Section - Centered on mobile */}
          <div className="col-span-12 md:col-span-3 flex justify-center md:justify-start mb-3 md:mb-0">
            <div className="relative w-32 h-32 sm:w-40 sm:h-40">
              <div className="h-32 w-32 sm:h-40 sm:w-40 overflow-hidden rounded-full bg-[#8dd1dc]">
                <Image 
                  src="/cat-with-tie.jpg" 
                  alt="Profile" 
                  width={160} 
                  height={160}
                  className="object-cover"
                />
              </div>
              <div className="absolute bottom-2 right-0 transform translate-x-1/4">
                <button className="rounded-full bg-[#EC7422] p-1.5 sm:p-2 text-white shadow-md">
                  <svg className="h-3 w-3 sm:h-4 sm:w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path d="M3 16.5L12 7.5L21 16.5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M3 7.5H21" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {/* Right Side Form - Full width on mobile */}
          <div className="col-span-12 md:col-span-9">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-4 sm:gap-x-6 sm:gap-y-5">
              <div className="col-span-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                <Input defaultValue="Saydie Marie" className="h-10 border-gray-300 rounded-md" />
              </div>

              <div className="col-span-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                <Input defaultValue="Elegino" className="h-10 border-gray-300 rounded-md" />
              </div>

              <div className="col-span-1 sm:col-span-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">M.I.</label>
                <Input defaultValue="P." className="h-10 border-gray-300 rounded-md" />
              </div>

              <div className="col-span-1 sm:col-span-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">Suffix</label>
                <Select defaultValue="none">
                  <SelectTrigger className="h-10 border-gray-300 rounded-md">
                    <SelectValue placeholder="None" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">None</SelectItem>
                    <SelectItem value="jr">Jr.</SelectItem>
                    <SelectItem value="sr">Sr.</SelectItem>
                    <SelectItem value="iii">III</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="col-span-1 sm:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                <div className="flex gap-2">
                  <div className="w-16 sm:w-20 relative">
                    <Select defaultValue="+63">
                      <SelectTrigger className="h-10 border-gray-300 rounded-md pl-1 sm:pl-2 pr-0 sm:pr-1">
                        <div className="flex items-center">
                          <span className="w-4 sm:w-5 mr-1">🇵🇭</span>
                          <span className="text-xs sm:text-sm">+63</span>
                        </div>
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="+63">
                          <div className="flex items-center">
                            <span className="w-5 mr-1">🇵🇭</span>
                            <span>+63</span>
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Input defaultValue="912 3456 789" className="h-10 border-gray-300 rounded-md flex-1" />
                </div>
              </div>

              <div className="col-span-1 sm:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <div className="relative">
                  <div className="absolute left-3 top-3 text-gray-400">
                    <MdEmail size={16} />
                  </div>
                  <Input 
                    defaultValue="smg@elegino.gmail.com" 
                    className="h-10 border-gray-300 rounded-md pl-9"
                  />
                </div>
              </div>

              <div className="col-span-1 sm:col-span-2 md:col-span-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                <div className="relative">
                  <div className="absolute left-3 top-3 text-[#EC7422]">
                    <FaMapMarkerAlt size={16} />
                  </div>
                  <Input 
                    defaultValue="San Vicente Ferrer Tabuk" 
                    className="h-10 border-gray-300 rounded-md pl-9" 
                  />
                </div>
              </div>

              <div className="col-span-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                <Select defaultValue="mandaue">
                  <SelectTrigger className="h-10 border-gray-300 rounded-md">
                    <SelectValue placeholder="Select city" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="mandaue">Mandaue City</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="col-span-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">Province</label>
                <Select defaultValue="cebu">
                  <SelectTrigger className="h-10 border-gray-300 rounded-md">
                    <SelectValue placeholder="Select province" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="cebu">Cebu</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="col-span-1 sm:col-span-2 md:col-span-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">ZIP Code</label>
                <Select defaultValue="5000">
                  <SelectTrigger className="h-10 border-gray-300 rounded-md">
                    <SelectValue placeholder="Select ZIP" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="5000">5000</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Save Button */}
          <div className="col-span-12 flex justify-end mt-4">
            <Button className="bg-[#EC7422] hover:bg-[#EC7422]/90 text-white px-4 sm:px-6 py-2 rounded-md w-full sm:w-auto">
              Save Changes
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
