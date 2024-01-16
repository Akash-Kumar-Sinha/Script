import { ReactNode, useState } from "react";
import { Sidebar } from "lucide-react";

import {
  Command,
  // CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  // CommandSeparator,
  // CommandShortcut,
} from "../../../@/components/ui/command";
// import { Button } from "../../../@/components/ui/button";
import { Toggle } from "../../../@/components/ui/toggle";
import DesktopSidebar from "./DesktopSidebar";

const SideBar = ({ children }: { children: ReactNode }) => {
  const [isCommandVisible, setIsCommandVisible] = useState(true);

  const toggleSidebar = () => {
    setIsCommandVisible(!isCommandVisible);
  };
  return (
    <div className="flex flex-row-reverse px-2">
        <Toggle 
        className="bg-gray-300 rounded-xl"  
        onClick={toggleSidebar}
        >
          <Sidebar />
        </Toggle>
        {isCommandVisible && (
      <Command>
        <CommandInput placeholder="Type a command or search..." />

        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Welcome">
            <CommandItem className="text-base flex flex-col items-start">
              <DesktopSidebar/>
              <div className="main">
              {children}
              </div>
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </Command>
      )}
    </div>
  );
};

export default SideBar;
