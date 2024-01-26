import { ReactNode} from "react";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "../../../@/components/ui/command";

const SideBar = ({ children }: { children: ReactNode }) => {
  return (
    <div className="lg:pl-16 lg:w-96 hidden md:pl-8 md:block">
      <Command className="flex h-screen">
        <div className="flex justify-around">
          <CommandSeparator />

          <CommandList>
            {/* <CommandInput placeholder="Type a command or search..." /> */}
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup>
              <CommandItem className="text-base flex flex-col items-start">
                      {children}
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </div>
      </Command>
    </div>
  );
};

export default SideBar;
