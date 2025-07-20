import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Search, Filter, X, MapPin, Star, Clock } from "lucide-react";

interface SearchFilters {
  searchTerm: string;
  skillLevel: string[];
  availability: string[];
  location: string;
  minRating: number;
  onlineOnly: boolean;
}

interface SearchAndFiltersProps {
  filters: SearchFilters;
  onFiltersChange: (filters: SearchFilters) => void;
  onClearFilters: () => void;
}

const skillLevels = ["Beginner", "Intermediate", "Advanced", "Expert"];
const availabilityOptions = [
  "Weekends",
  "Evenings",
  "Weekdays",
  "Flexible",
  "By Appointment",
];

export function SearchAndFilters({
  filters,
  onFiltersChange,
  onClearFilters,
}: SearchAndFiltersProps) {
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const updateFilters = (updates: Partial<SearchFilters>) => {
    onFiltersChange({ ...filters, ...updates });
  };

  const toggleSkillLevel = (level: string) => {
    const newLevels = filters.skillLevel.includes(level)
      ? filters.skillLevel.filter((l) => l !== level)
      : [...filters.skillLevel, level];
    updateFilters({ skillLevel: newLevels });
  };

  const toggleAvailability = (availability: string) => {
    const newAvailability = filters.availability.includes(availability)
      ? filters.availability.filter((a) => a !== availability)
      : [...filters.availability, availability];
    updateFilters({ availability: newAvailability });
  };

  const getActiveFilterCount = () => {
    let count = 0;
    if (filters.skillLevel.length > 0) count++;
    if (filters.availability.length > 0) count++;
    if (filters.location) count++;
    if (filters.minRating > 0) count++;
    if (filters.onlineOnly) count++;
    return count;
  };

  const hasActiveFilters = getActiveFilterCount() > 0;

  return (
    <Card className="bg-slate-800 border-slate-700 rounded-xl">
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search Input */}
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
              <Input
                placeholder="Search by name, skills, or location..."
                value={filters.searchTerm}
                onChange={(e) => updateFilters({ searchTerm: e.target.value })}
                className="pl-10 bg-slate-700 border-slate-600 text-white placeholder:text-slate-400"
              />
            </div>
          </div>

          {/* Filter Button */}
          <Popover open={isFilterOpen} onOpenChange={setIsFilterOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="whitespace-nowrap relative border-slate-600 hover:bg-slate-700 hover:border-slate-500 text-slate-200 hover:text-white transition-all duration-200 rounded-lg"
              >
                <Filter className="h-4 w-4 mr-2" />
                Filters
                {hasActiveFilters && (
                  <Badge className="ml-2 bg-green-600 text-white text-xs rounded-full">
                    {getActiveFilterCount()}
                  </Badge>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent
              className="w-80 bg-slate-800 border-slate-700 rounded-xl"
              align="end"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-white">Filters</h3>
                  {hasActiveFilters && (
                    <Button
                      onClick={onClearFilters}
                      variant="ghost"
                      size="sm"
                      className="text-slate-400"
                    >
                      Clear All
                    </Button>
                  )}
                </div>

                {/* Location Filter */}
                <div>
                  <Label className="text-sm font-medium text-slate-200">
                    Location
                  </Label>
                  <div className="relative mt-1">
                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
                    <Input
                      placeholder="City, State, or Country"
                      value={filters.location}
                      onChange={(e) =>
                        updateFilters({ location: e.target.value })
                      }
                      className="pl-10 bg-slate-700 border-slate-600 text-white placeholder:text-slate-400"
                    />
                  </div>
                </div>

                {/* Skill Level Filter */}
                <div>
                  <Label className="text-sm font-medium text-slate-200">
                    Skill Level
                  </Label>
                  <div className="grid grid-cols-2 gap-2 mt-2">
                    {skillLevels.map((level) => (
                      <div key={level} className="flex items-center space-x-2">
                        <Checkbox
                          id={`level-${level}`}
                          checked={filters.skillLevel.includes(level)}
                          onCheckedChange={() => toggleSkillLevel(level)}
                        />
                        <Label
                          htmlFor={`level-${level}`}
                          className="text-sm text-slate-200 cursor-pointer"
                        >
                          {level}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Availability Filter */}
                <div>
                  <Label className="text-sm font-medium">Availability</Label>
                  <div className="space-y-2 mt-2">
                    {availabilityOptions.map((option) => (
                      <div key={option} className="flex items-center space-x-2">
                        <Checkbox
                          id={`availability-${option}`}
                          checked={filters.availability.includes(option)}
                          onCheckedChange={() => toggleAvailability(option)}
                        />
                        <Label
                          htmlFor={`availability-${option}`}
                          className="text-sm text-foreground cursor-pointer"
                        >
                          {option}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Rating Filter */}
                <div>
                  <Label className="text-sm font-medium">Minimum Rating</Label>
                  <Select
                    value={filters.minRating.toString()}
                    onValueChange={(value) =>
                      updateFilters({ minRating: parseFloat(value) })
                    }
                  >
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Any rating" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="0">Any rating</SelectItem>
                      <SelectItem value="3">3+ stars</SelectItem>
                      <SelectItem value="4">4+ stars</SelectItem>
                      <SelectItem value="4.5">4.5+ stars</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Online Status Filter */}
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="online-only"
                    checked={filters.onlineOnly}
                    onCheckedChange={(checked) =>
                      updateFilters({ onlineOnly: !!checked })
                    }
                  />
                  <Label
                    htmlFor="online-only"
                    className="text-sm text-foreground cursor-pointer"
                  >
                    Show online users only
                  </Label>
                </div>
              </div>
            </PopoverContent>
          </Popover>

          {/* Clear Filters Button */}
          {hasActiveFilters && (
            <Button
              onClick={onClearFilters}
              variant="ghost"
              size="sm"
              className="whitespace-nowrap"
            >
              <X className="h-4 w-4 mr-2" />
              Clears
            </Button>
          )}
        </div>

        {/* Active Filters Display */}
        {hasActiveFilters && (
          <div className="flex flex-wrap gap-2 mt-4">
            {filters.skillLevel.map((level) => (
              <Badge
                key={level}
                variant="secondary"
                className="cursor-pointer"
                onClick={() => toggleSkillLevel(level)}
              >
                {level}
                <X className="h-3 w-3 ml-1" />
              </Badge>
            ))}
            {filters.availability.map((availability) => (
              <Badge
                key={availability}
                variant="secondary"
                className="cursor-pointer"
                onClick={() => toggleAvailability(availability)}
              >
                <Clock className="h-3 w-3 mr-1" />
                {availability}
                <X className="h-3 w-3 ml-1" />
              </Badge>
            ))}
            {filters.location && (
              <Badge
                variant="secondary"
                className="cursor-pointer"
                onClick={() => updateFilters({ location: "" })}
              >
                <MapPin className="h-3 w-3 mr-1" />
                {filters.location}
                <X className="h-3 w-3 ml-1" />
              </Badge>
            )}
            {filters.minRating > 0 && (
              <Badge
                variant="secondary"
                className="cursor-pointer"
                onClick={() => updateFilters({ minRating: 0 })}
              >
                <Star className="h-3 w-3 mr-1" />
                {filters.minRating}+ stars
                <X className="h-3 w-3 ml-1" />
              </Badge>
            )}
            {filters.onlineOnly && (
              <Badge
                variant="secondary"
                className="cursor-pointer"
                onClick={() => updateFilters({ onlineOnly: false })}
              >
                Online Only
                <X className="h-3 w-3 ml-1" />
              </Badge>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
