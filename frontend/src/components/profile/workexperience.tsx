"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Edit2 , X} from "lucide-react";
import { Textarea } from "@/components/ui/textarea";

type WorkExperience = {
  id: string;
  company: string;
  role: string;
  description: string;
  yearRange: string;
};

export function WorkExperience() {
  const [experienceList, setExperienceList] = useState<WorkExperience[]>([
    {
      id: "1",
      company: "Apolus Velosi Phil Inc.",
      role: "Full stack Developer",
      description: "N/A",
      yearRange: "2022-2024"
    }
  ]);

  const addNewExperience = () => {
    const newId = Date.now().toString();
    setExperienceList([
      ...experienceList,
      { id: newId, company: "", role: "", description: "", yearRange: "" }
    ]);
  };

  const removeExperience = (id: string) => {
    setExperienceList(experienceList.filter(exp => exp.id !== id));
  };

  const updateExperience = (id: string, field: keyof WorkExperience, value: string) => {
    setExperienceList(
      experienceList.map(exp => 
        exp.id === id ? { ...exp, [field]: value } : exp
      )
    );
  };

  const handleSave = () => {
    // Filter out incomplete entries
    const validEntries = experienceList.filter(
      exp => exp.company && exp.role && exp.yearRange
    );
    
    if (validEntries.length !== experienceList.length) {
      alert("Some entries are incomplete and won't be saved. Please fill all required fields.");
    }
    
    // Save only valid entries
    setExperienceList(validEntries);
    
    // Here you would typically save to backend
    console.log("Saving work experience data:", validEntries);
  };

  return (
    <div className="w-full">
      <div className="w-full bg-white p-4 sm:p-6 rounded-md border shadow-sm">
        <div className="flex justify-between items-center mb-4 sm:mb-6">
          <h2 className="text-lg font-medium">Work Experience</h2>
        </div>

        {experienceList.map((experience, index) => (
          <div 
            key={experience.id} 
            className={`p-5 rounded-lg border ${index > 0 ? 'mt-6' : ''}`}
          >
            <div className="flex justify-end">
              {experienceList.length > 1 && (
                <button 
                  onClick={() => removeExperience(experience.id)}
                  className="text-gray-400 hover:text-red-500"
                >
                  <X size={18} />
                </button>
              )}
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Company</label>
                <Input
                  value={experience.company}
                  onChange={(e) => updateExperience(experience.id, "company", e.target.value)}
                  placeholder="Enter company name"
                  className="h-10 border-gray-300 rounded-md"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
                <Input
                  value={experience.role}
                  onChange={(e) => updateExperience(experience.id, "role", e.target.value)}
                  placeholder="Enter job title"
                  className="h-10 border-gray-300 rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Start & End Year</label>
                <Input
                  value={experience.yearRange}
                  onChange={(e) => updateExperience(experience.id, "yearRange", e.target.value)}
                  placeholder="e.g. 2020-2024"
                  className="h-10 border-gray-300 rounded-md"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <Textarea
                    value={experience.description}
                    onChange={(e) => updateExperience(experience.id, "description", e.target.value)}
                    placeholder="Enter job description"
                    className="border-gray-300 rounded-md h-10 resize-none"
                />

              </div>
              

            </div>
          </div>
        ))}
        
        <div className="mt-6 flex justify-center border-t pt-4">
          <Button
            onClick={addNewExperience}
            type="button"
            variant="outline"
            className="rounded-full w-10 h-10 p-0 border-gray-300"
          >
            <Plus className="h-5 w-5 text-gray-500" />
          </Button>
        </div>
        
        <div className="flex justify-end mt-4 sm:mt-6">
          <Button 
            onClick={handleSave}
            className="bg-[#EC7422] hover:bg-[#EC7422]/90 text-white px-4 sm:px-6 py-2 rounded-md w-full sm:w-auto"
          >
            Save Changes
          </Button>
        </div>
      </div>
    </div>
  );
}
  