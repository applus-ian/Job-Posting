"use client";

import { CardContent, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Button } from "../ui/button";
import { ArrowRight, Bold, Italic, List, ListOrdered, UnderlineIcon } from "lucide-react";
import { useState } from "react";

export default function CreateJobPostingForm() {
    // Example state for form data
    const [formData, setFormData] = useState({
        title: "",
        tags: "",
        category: "",
        jobRole: "",
        minSalary: "",
        maxSalary: "",
        employmentLevel: "",
        employmentType: "",
        workSetup: "",
        vacancies: "",
        description: "",
        requirements: ""
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log(formData);
        // Here you would typically send the data to your API
    };

    return (
        <form onSubmit={handleSubmit}>
            <CardHeader>
                <CardTitle className="text-xl font-bold">Post a job</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
                {/* Job Title */}
                <div className="space-y-2">
                    <Label htmlFor="jobTitle">Job Title</Label>
                    <Input 
                        id="jobTitle" 
                        placeholder="Add job title, role, vacancies etc" 
                        value={formData.title}
                        onChange={(e) => setFormData({...formData, title: e.target.value})}
                    />
                </div>

                {/* Tags, Category, Job Role */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="tags">Tags</Label>
                        <Input 
                            id="tags" 
                            placeholder="Job keyword, tags etc..." 
                            value={formData.tags}
                            onChange={(e) => setFormData({...formData, tags: e.target.value})}
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="category">Category</Label>
                        <Select 
                            value={formData.category}
                            onValueChange={(value) => setFormData({...formData, category: value})}
                        >
                            <SelectTrigger id="category" className="w-full">
                                <SelectValue placeholder="Select category" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="design">Design</SelectItem>
                                <SelectItem value="development">Development</SelectItem>
                                <SelectItem value="marketing">Marketing</SelectItem>
                                <SelectItem value="management">Management</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="jobRole">Job Role</Label>
                        <Select 
                            value={formData.jobRole}
                            onValueChange={(value) => setFormData({...formData, jobRole: value})}
                        >
                            <SelectTrigger id="jobRole" className="w-full">
                                <SelectValue placeholder="Select job role" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="fullstack">Full Stack Developer</SelectItem>
                                <SelectItem value="frontend">Frontend Developer</SelectItem>
                                <SelectItem value="backend">Backend Developer</SelectItem>
                                <SelectItem value="designer">UI/UX Designer</SelectItem>
                                <SelectItem value="pm">Project Manager</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                {/* Salary Range */}
                <div className="space-y-2">
                    <Label>Salary</Label>
                    <div className="grid grid-cols-4 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="minSalary" className="text-xs text-gray-500">Min Salary</Label>
                            <div className="relative flex items-center">
                                <Input 
                                    id="minSalary" 
                                    placeholder="Minimum Salary..." 
                                    value={formData.minSalary}
                                    onChange={(e) => setFormData({...formData, minSalary: e.target.value})}
                                    className="pr-16"
                                />
                                <span className="absolute inset-y-0 right-0 flex items-center px-4 text-gray-500 bg-gray-200 rounded-r-md">
                                    PHP
                                </span>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="maxSalary" className="text-xs text-gray-500">Max Salary</Label>
                            <div className="relative flex items-center">
                                <Input 
                                    id="maxSalary" 
                                    placeholder="Maximum Salary..." 
                                    value={formData.maxSalary}
                                    onChange={(e) => setFormData({...formData, maxSalary: e.target.value})}
                                    className="pr-14"
                                />
                                <span className="absolute inset-y-0 right-0 flex items-center px-4 text-gray-500 bg-gray-200 rounded-r-md">
                                    PHP
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Advanced Information */}
                <div className="space-y-4">
                    <h3 className="font-medium">Advance Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="employmentLevel">Employment Level</Label>
                            <Select 
                                value={formData.employmentLevel}
                                onValueChange={(value) => setFormData({...formData, employmentLevel: value})}
                            >
                                <SelectTrigger id="employmentLevel" className="w-full">
                                    <SelectValue placeholder="Select level" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="entry">Entry Level</SelectItem>
                                    <SelectItem value="mid">Mid Level</SelectItem>
                                    <SelectItem value="senior">Senior Level</SelectItem>
                                    <SelectItem value="lead">Lead</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="employmentType">Employment Type</Label>
                            <Select 
                                value={formData.employmentType}
                                onValueChange={(value) => setFormData({...formData, employmentType: value})}
                            >
                                <SelectTrigger id="employmentType" className="w-full">
                                    <SelectValue placeholder="Select type" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="fulltime">Full Time</SelectItem>
                                    <SelectItem value="parttime">Part Time</SelectItem>
                                    <SelectItem value="contract">Contract</SelectItem>
                                    <SelectItem value="internship">Internship</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="workSetup">Work Setup</Label>
                            <Select 
                                value={formData.workSetup}
                                onValueChange={(value) => setFormData({...formData, workSetup: value})}
                            >
                                <SelectTrigger id="workSetup" className="w-full">
                                    <SelectValue placeholder="Select setup" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="onsite">On-site</SelectItem>
                                    <SelectItem value="remote">Remote</SelectItem>
                                    <SelectItem value="hybrid">Hybrid</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                </div>

                {/* Vacancies */}
                <div className="space-y-2">
                    <Label htmlFor="vacancies">Vacancies</Label>
                    <Input 
                        id="vacancies"
                        type="number"
                        placeholder="Number of positions available"
                        value={formData.vacancies}
                        onChange={(e) => setFormData({...formData, vacancies: e.target.value})}
                    />
                </div>


                {/* Submit Button */}
                <div className="flex justify-end pt-4">
                    <Button type="submit" className="bg-orange-500 hover:bg-orange-600">
                        Post Job <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                </div>
            </CardContent>
        </form>
    );
}
