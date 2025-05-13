import * as React from "react";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { X } from "lucide-react";

interface DropdownMenuCheckboxesProps {
  apiEndpoints: string[];
  selectedApis: string[];
  setSelectedApis: React.Dispatch<React.SetStateAction<string[]>>;
}

export function DropdownMenuCheckboxes({
  apiEndpoints,
  selectedApis,
  setSelectedApis,
}: DropdownMenuCheckboxesProps) {
  const [isOpen, setIsOpen] = React.useState(false);

  const toggleApiSelection = (api: string) => {
    setSelectedApis((prevSelected: string[]) => {
      if (prevSelected.includes(api)) {
        return prevSelected.filter((item) => item !== api);
      }
      return prevSelected.length < 10 ? [...prevSelected, api] : prevSelected;
    });
  };

  return (
    <div className="flex justify-center items-start mt-4">
      <DropdownMenu open={isOpen} onOpenChange={setIsOpen} modal={false}>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">Select APIs</Button>
        </DropdownMenuTrigger>

        {isOpen && (
          <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-30 dark:bg-opacity-50">
            <DropdownMenuContent
              className="w-[90vw] max-w-4xl bg-white dark:bg-gray-800 dark:text-white shadow-lg rounded-lg max-h-[60vh] overflow-y-auto relative p-4"
              onCloseAutoFocus={(e) => e.preventDefault()} // Prevents closing when clicking items
            >
              {/* Close button */}
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-2 right-2 text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Dropdown Label */}
              <DropdownMenuLabel className="text-center sticky top-0 bg-white dark:bg-gray-800 dark:text-gray-200 z-10 p-2">
                Select up to 10 APIs
              </DropdownMenuLabel>
              <DropdownMenuSeparator />

              {/* API List */}
              <div className="grid grid-cols-3 gap-2 p-2">
                {apiEndpoints.map((api) => (
                  <DropdownMenuCheckboxItem
                    key={api}
                    checked={selectedApis.includes(api)}
                    onCheckedChange={() => toggleApiSelection(api)}
                    disabled={selectedApis.length >= 10 && !selectedApis.includes(api)}
                    className="hover:bg-gray-100 dark:hover:bg-gray-700 transition"
                  >
                    {api}
                  </DropdownMenuCheckboxItem>
                ))}
              </div>
            </DropdownMenuContent>
          </div>
        )}
      </DropdownMenu>
    </div>
  );
}
