import * as React from "react";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { X, Check } from "lucide-react";
import { HexColorPicker } from "react-colorful";

interface ApiEndpointData {
  api_endpoint: string;
  classification_color?: string;
}

interface DropdownColorPickerProps {
  apiEndpoints: ApiEndpointData[];
  selectedApiColors: Record<string, string>; // Map of API -> color
  setSelectedApiColors: React.Dispatch<React.SetStateAction<Record<string, string>>>;
  width?: string; // Optional width for the button
}

export function DropdownColorPicker({
  apiEndpoints,
  selectedApiColors,
  setSelectedApiColors,
  width,
}: DropdownColorPickerProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [activeColorPicker, setActiveColorPicker] = React.useState<string | null>(null);

  // Initialize selected colors from provided classification_colors
  React.useEffect(() => {
    const initialColors: Record<string, string> = {};
    
    apiEndpoints.forEach(item => {
      if (item.classification_color) {
        initialColors[item.api_endpoint] = item.classification_color;
      }
    });
    
    if (Object.keys(initialColors).length > 0) {
      // Only update if there are new colors not already in the state
      setSelectedApiColors(prev => {
        const newColors = { ...initialColors };
        let hasChanges = false;
        
        // Only add colors that don't exist or are different
        Object.keys(newColors).forEach(key => {
          if (prev[key] === newColors[key]) {
            delete newColors[key];
          } else {
            hasChanges = true;
          }
        });
        
        return hasChanges ? { ...prev, ...newColors } : prev;
      });
    }
  }, [apiEndpoints, setSelectedApiColors]); // Add setSelectedApiColors to dependencies

  const toggleApiSelection = (api: string, color: string = "#000000") => {
    setSelectedApiColors((prevSelected) => {
      const newSelected = { ...prevSelected };
      
      if (prevSelected[api]) {
        // If already selected, remove it
        delete newSelected[api];
      } else {
        // If not selected and haven't reached limit, add it
        if (Object.keys(prevSelected).length < 10) {
          newSelected[api] = color;
        }
      }
      
      return newSelected;
    });
  };

  const updateApiColor = (api: string, color: string) => {
    setSelectedApiColors((prevSelected) => ({
      ...prevSelected,
      [api]: color,
    }));
  };

  // Function to handle clicks outside the color picker
  React.useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (activeColorPicker && event.target instanceof Node) {
        const pickerElements = document.getElementsByClassName("react-colorful");
        if (pickerElements.length > 0) {
          const picker = pickerElements[0];
          if (!picker.contains(event.target)) {
            setActiveColorPicker(null);
          }
        }
      }
    }
    
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [activeColorPicker]);

  return (
    <div className="flex justify-center items-start mt-4">
      <DropdownMenu open={isOpen} onOpenChange={setIsOpen} modal={false}>
        <DropdownMenuTrigger asChild>
          <Button 
            variant="outline" 
            className={`dark:text-gray-200 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:text-white ${width ? "" : "w-full"}`}
            style={width ? { width } : undefined}
          >
            Select API Colors
          </Button>
        </DropdownMenuTrigger>

        {isOpen && (
          <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-30 dark:bg-opacity-50">
            <DropdownMenuContent
              className="w-[90vw] max-w-6xl bg-white dark:bg-gray-800 dark:text-white shadow-lg rounded-lg max-h-[60vh] overflow-y-auto relative p-4"
              onCloseAutoFocus={(e) => e.preventDefault()}
            >
              {/* Sticky header with label and close button */}
              <div className="sticky top-0 bg-white dark:bg-gray-800 z-10 pb-2 flex items-center justify-center">
                <DropdownMenuLabel className="text-center dark:text-gray-200 p-2">
                  Select up to 10 APIs and choose colors
                </DropdownMenuLabel>
                
                {/* Close button */}
                <button
                  onClick={() => setIsOpen(false)}
                  className="absolute right-2 text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <DropdownMenuSeparator />

              {/* API List */}
              <div className="grid grid-cols-3 gap-2 p-2">
                {apiEndpoints.map((item) => {
                  const api = item.api_endpoint;
                  return (
                  <div 
                    key={api} 
                    className="flex items-center p-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition rounded relative"
                  >
                    <div 
                      className="w-6 h-6 border border-gray-300 cursor-pointer mr-2 flex-shrink-0"
                      style={{ 
                        backgroundColor: selectedApiColors[api] || "#000000",
                        borderRadius: "4px" 
                      }}
                      onClick={() => {
                        if (!selectedApiColors[api]) {
                          // If not selected, select it with black color
                          toggleApiSelection(api);
                        }
                        // Toggle color picker
                        setActiveColorPicker(activeColorPicker === api ? null : api);
                      }}
                    />
                    
                    <span 
                      className="cursor-pointer flex-grow"
                      onClick={() => toggleApiSelection(api, selectedApiColors[api] || "#000000")}
                    >
                      {api}
                    </span>

                    {activeColorPicker === api && (
                      <div className="absolute left-0 top-full z-50 mt-1">
                        <div>
                          <HexColorPicker 
                            color={selectedApiColors[api] || "#000000"} 
                            onChange={(color) => updateApiColor(api, color)} 
                          />
                          <button 
                            className="w-full mt-1 bg-green-500 text-white p-1 rounded flex items-center justify-center"
                            onClick={() => setActiveColorPicker(null)}
                          >
                            <Check className="w-4 h-4 mr-1" /> Done
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                )})}
              </div>
            </DropdownMenuContent>
          </div>
        )}
      </DropdownMenu>
    </div>
  );
}