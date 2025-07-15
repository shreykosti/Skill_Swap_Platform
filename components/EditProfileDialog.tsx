import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Camera, Upload } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface EditProfileDialogProps {
  user: {
    id: string;
    name: string;
    avatar?: string;
    location?: string;
    bio?: string;
    availability: string;
    isPublic: boolean;
  };
  onSave: (userData: any) => void;
  children: React.ReactNode;
}

export function EditProfileDialog({ user, onSave, children }: EditProfileDialogProps) {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: user.name,
    location: user.location || "",
    bio: user.bio || "",
    availability: user.availability,
    isPublic: user.isPublic ?? true,
    avatar: user.avatar
  });
  const { toast } = useToast();

  const handleSave = () => {
    onSave(formData);
    setOpen(false);
    toast({
      title: "Profile Updated!",
      description: "Your profile has been successfully updated.",
    });
  };

  const handleAvatarUpload = () => {
    // In a real app, this would open file picker
    toast({
      title: "Photo Upload",
      description: "Profile photo upload would be implemented with Supabase storage.",
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="max-w-md bg-slate-800 border-slate-700">
        <DialogHeader>
          <DialogTitle className="text-white">Edit Profile</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Profile Photo */}
          <div className="flex flex-col items-center space-y-4">
            <div className="relative">
              <Avatar className="h-24 w-24 border-4 border-green-600/20">
                <AvatarImage src={formData.avatar} alt={formData.name} />
                <AvatarFallback className="bg-green-600/10 text-green-400 text-2xl">
                  {formData.name.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <Button
                onClick={handleAvatarUpload}
                size="sm"
                variant="secondary"
                className="absolute -bottom-2 -right-2 rounded-full w-8 h-8 p-0"
              >
                <Camera className="h-4 w-4" />
              </Button>
            </div>
            <Button onClick={handleAvatarUpload} variant="outline" size="sm">
              <Upload className="h-4 w-4 mr-2" />
              Upload Photo
            </Button>
          </div>

          {/* Basic Info */}
          <div className="space-y-4">
            <div>
              <Label htmlFor="name" className="text-slate-200">Full Name *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Your full name"
                className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-400"
              />
            </div>

            <div>
              <Label htmlFor="location" className="text-slate-200">Location (Optional)</Label>
              <Input
                id="location"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                placeholder="e.g., San Francisco, CA"
                className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-400"
              />
            </div>

            <div>
              <Label htmlFor="bio" className="text-slate-200">Bio (Optional)</Label>
              <Textarea
                id="bio"
                value={formData.bio}
                onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                placeholder="Tell others about yourself and your interests..."
                rows={3}
                className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-400"
              />
            </div>

            <div>
              <Label htmlFor="availability" className="text-slate-200">Availability</Label>
              <Select
                value={formData.availability}
                onValueChange={(value) => setFormData({ ...formData, availability: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Weekends">Weekends</SelectItem>
                  <SelectItem value="Evenings">Evenings</SelectItem>
                  <SelectItem value="Weekdays">Weekdays</SelectItem>
                  <SelectItem value="Flexible">Flexible</SelectItem>
                  <SelectItem value="By Appointment">By Appointment</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Privacy Setting */}
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="public-profile" className="text-slate-200">Public Profile</Label>
                <p className="text-sm text-slate-400">
                  Allow others to find and view your profile
                </p>
              </div>
              <Switch
                id="public-profile"
                checked={formData.isPublic}
                onCheckedChange={(checked) => setFormData({ ...formData, isPublic: checked })}
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex space-x-2">
            <Button onClick={handleSave} className="flex-1 bg-green-600 hover:bg-green-700 text-white">
              Save Changes
            </Button>
            <Button onClick={() => setOpen(false)} variant="outline" className="flex-1 border-slate-600 text-slate-200">
              Cancel
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}