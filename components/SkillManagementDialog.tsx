import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Plus, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Skill {
  id: string;
  name: string;
  level: "Beginner" | "Intermediate" | "Advanced" | "Expert";
  description?: string;
}

interface SkillManagementDialogProps {
  type: "offered" | "wanted";
  skills: Skill[];
  onSave: (skills: Skill[]) => void;
  children: React.ReactNode;
}

const skillSuggestions = [
  "React", "Python", "JavaScript", "UI/UX Design", "Node.js", "TypeScript",
  "Figma", "Photoshop", "Excel", "Data Science", "Machine Learning", "Java",
  "CSS", "HTML", "Vue.js", "Angular", "PHP", "Ruby", "Go", "Rust",
  "Adobe Illustrator", "Video Editing", "3D Modeling", "Photography",
  "Digital Marketing", "Content Writing", "SEO", "Social Media Marketing"
];

export function SkillManagementDialog({ type, skills, onSave, children }: SkillManagementDialogProps) {
  const [open, setOpen] = useState(false);
  const [currentSkills, setCurrentSkills] = useState<Skill[]>(skills);
  const [newSkill, setNewSkill] = useState({
    name: "",
    level: "Beginner" as const,
    description: ""
  });
  const { toast } = useToast();

  const handleAddSkill = () => {
    if (!newSkill.name.trim()) return;

    const skill: Skill = {
      id: Date.now().toString(),
      name: newSkill.name.trim(),
      level: newSkill.level,
      description: newSkill.description.trim() || undefined
    };

    setCurrentSkills([...currentSkills, skill]);
    setNewSkill({ name: "", level: "Beginner", description: "" });
  };

  const handleRemoveSkill = (skillId: string) => {
    setCurrentSkills(currentSkills.filter(skill => skill.id !== skillId));
  };

  const handleSave = () => {
    onSave(currentSkills);
    setOpen(false);
    toast({
      title: "Skills Updated!",
      description: `Your ${type} skills have been updated successfully.`,
    });
  };

  const handleSuggestionClick = (suggestion: string) => {
    if (currentSkills.some(skill => skill.name.toLowerCase() === suggestion.toLowerCase())) {
      return; // Skill already exists
    }
    setNewSkill({ ...newSkill, name: suggestion });
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case "Beginner":
        return "bg-blue-500/20 text-blue-300 border-blue-500/30";
      case "Intermediate":
        return "bg-yellow-500/20 text-yellow-300 border-yellow-500/30";
      case "Advanced":
        return "bg-orange-500/20 text-orange-300 border-orange-500/30";
      case "Expert":
        return "bg-red-500/20 text-red-300 border-red-500/30";
      default:
        return "bg-gray-500/20 text-gray-300 border-gray-500/30";
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="max-w-2xl bg-card border-border max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-foreground">
            Manage {type === "offered" ? "Skills I Offer" : "Skills I Want to Learn"}
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Current Skills */}
          <div>
            <h3 className="text-sm font-medium text-foreground mb-3">Current Skills</h3>
            <div className="space-y-2 max-h-48 overflow-y-auto">
              {currentSkills.map((skill) => (
                <div
                  key={skill.id}
                  className="flex items-center justify-between p-3 bg-secondary/30 rounded-lg"
                >
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <span className="font-medium text-foreground">{skill.name}</span>
                      {type === "offered" && (
                        <Badge
                          className={`text-xs border ${getLevelColor(skill.level)}`}
                          variant="outline"
                        >
                          {skill.level}
                        </Badge>
                      )}
                    </div>
                    {skill.description && (
                      <p className="text-sm text-muted-foreground mt-1">{skill.description}</p>
                    )}
                  </div>
                  <Button
                    onClick={() => handleRemoveSkill(skill.id)}
                    variant="ghost"
                    size="sm"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
              {currentSkills.length === 0 && (
                <p className="text-muted-foreground text-center py-4">
                  No skills added yet
                </p>
              )}
            </div>
          </div>

          {/* Add New Skill */}
          <div className="space-y-4 border-t pt-4">
            <h3 className="text-sm font-medium text-foreground">Add New Skill</h3>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="skill-name">Skill Name *</Label>
                <Input
                  id="skill-name"
                  value={newSkill.name}
                  onChange={(e) => setNewSkill({ ...newSkill, name: e.target.value })}
                  placeholder="e.g., React, Python, Design"
                />
              </div>
              
              {type === "offered" && (
                <div>
                  <Label htmlFor="skill-level">Proficiency Level</Label>
                  <Select
                    value={newSkill.level}
                    onValueChange={(value: any) => setNewSkill({ ...newSkill, level: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Beginner">Beginner</SelectItem>
                      <SelectItem value="Intermediate">Intermediate</SelectItem>
                      <SelectItem value="Advanced">Advanced</SelectItem>
                      <SelectItem value="Expert">Expert</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}
            </div>

            <div>
              <Label htmlFor="skill-description">Description (Optional)</Label>
              <Textarea
                id="skill-description"
                value={newSkill.description}
                onChange={(e) => setNewSkill({ ...newSkill, description: e.target.value })}
                placeholder={type === "offered" 
                  ? "Describe your experience and what you can teach..."
                  : "What specific aspects would you like to learn?"
                }
                rows={2}
              />
            </div>

            <Button onClick={handleAddSkill} disabled={!newSkill.name.trim()}>
              <Plus className="h-4 w-4 mr-2" />
              Add Skill
            </Button>
          </div>

          {/* Skill Suggestions */}
          <div>
            <h3 className="text-sm font-medium text-foreground mb-3">Popular Skills</h3>
            <div className="flex flex-wrap gap-2">
              {skillSuggestions.map((suggestion) => {
                const isAdded = currentSkills.some(skill => 
                  skill.name.toLowerCase() === suggestion.toLowerCase()
                );
                return (
                  <Badge
                    key={suggestion}
                    className={`cursor-pointer transition-all ${
                      isAdded 
                        ? "bg-muted text-muted-foreground opacity-50" 
                        : "bg-skill-tag text-skill-tag-foreground hover:scale-105"
                    }`}
                    onClick={() => !isAdded && handleSuggestionClick(suggestion)}
                  >
                    {suggestion}
                    {isAdded && " ✓"}
                  </Badge>
                );
              })}
            </div>
          </div>

          {/* Actions */}
          <div className="flex space-x-2 pt-4 border-t">
            <Button onClick={handleSave} className="flex-1">
              Save Changes
            </Button>
            <Button onClick={() => setOpen(false)} variant="outline" className="flex-1">
              Cancel
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}