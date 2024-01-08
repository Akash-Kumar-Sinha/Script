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

const UsersBar = ({ children }: { children: ReactNode }) => {
  const [isCommandVisible, setIsCommandVisible] = useState(true);

  const toggleSidebar = () => {
    setIsCommandVisible(!isCommandVisible);
  };
  return (
    <div className="flex flex-row-reverse px-2">
        <Toggle 
        className="bg-gray-300 rounded-xl"  
        onClick={toggleSidebar}>
          <Sidebar />
        </Toggle>
        {isCommandVisible && (
      <Command>
        <CommandInput placeholder="Type a command or search..." />

        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Welcome">
            <CommandItem className="text-base">Akash{children}</CommandItem>

            <CommandItem>{children}</CommandItem>
          </CommandGroup>
        </CommandList>
      </Command>
      )}
    </div>
  );
};

export default UsersBar;
