"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Edit2, X } from "lucide-react";

type Education = {
  id: string;
  school: string;
  degree: string;
  course: string;
  yearRange: string;
};

export function EducationalBackground() {
  const [educationList, setEducationList] = useState<Education[]>([
    {
      id: "1",
      school: "Cebu Technological University - Main Campus",
      degree: "Bachelor's Degree",
      course: "Bachelor Of Science In Information System",
      yearRange: "2024-2025"
    }
  ]);

  const addNewEducation = () => {
    const newId = Date.now().toString();
    setEducationList([
      ...educationList,
      { id: newId, school: "", degree: "", course: "", yearRange: "" }
    ]);
  };

  const removeEducation = (id: string) => {
    setEducationList(educationList.filter(edu => edu.id !== id));
  };

  const updateEducation = (id: string, field: keyof Education, value: string) => {
    setEducationList(
      educationList.map(edu => 
        edu.id === id ? { ...edu, [field]: value } : edu
      )
    );
  };

  const handleSave = () => {
    // Filter out incomplete entries
    const validEntries = educationList.filter(
      edu => edu.school && edu.degree && edu.course && edu.yearRange
    );
    
    if (validEntries.length !== educationList.length) {
      alert("Some entries are incomplete and won't be saved. Please fill all fields.");
    }
    
    // Save only valid entries
    setEducationList(validEntries);
    
    // Here you would typically save to backend
    console.log("Saving education data:", validEntries);
  };

  return (
    <div className="w-full">
      <div className="w-full bg-white p-4 sm:p-6 rounded-md border shadow-sm">
        <div className="flex justify-between items-center mb-4 sm:mb-6">
          <h2 className="text-lg font-medium">Educational Background</h2>
        </div>

        {educationList.map((education, index) => (
          <div 
            key={education.id} 
            className={`p-5 rounded-lg border ${index > 0 ? 'mt-6' : ''}`}
          >
            <div className="flex justify-end">
              {educationList.length > 1 && (
                <button 
                  onClick={() => removeEducation(education.id)}
                  className="text-gray-400 hover:text-red-500"
                >
                  <X size={18} />
                </button>
              )}
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">School</label>
                <Input
                  value={education.school}
                  onChange={(e) => updateEducation(education.id, "school", e.target.value)}
                  placeholder="Enter school name"
                  className="h-10 border-gray-300 rounded-md"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Degree</label>
                <Input
                  value={education.degree}
                  onChange={(e) => updateEducation(education.id, "degree", e.target.value)}
                  placeholder="Enter degree"
                  className="h-10 border-gray-300 rounded-md"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Course</label>
                <Input
                  value={education.course}
                  onChange={(e) => updateEducation(education.id, "course", e.target.value)}
                  placeholder="Enter course/program"
                  className="h-10 border-gray-300 rounded-md"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Start & End Year</label>
                <Input
                  value={education.yearRange}
                  onChange={(e) => updateEducation(education.id, "yearRange", e.target.value)}
                  placeholder="e.g. 2020-2024"
                  className="h-10 border-gray-300 rounded-md"
                />
              </div>
            </div>
          </div>
        ))}
        
        <div className="mt-6 flex justify-center">
          <Button
            onClick={addNewEducation}
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
  