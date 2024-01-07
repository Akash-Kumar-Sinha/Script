import { ReactNode } from "react";
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

const UsersBar = ({children}:{
  children: ReactNode;
}) => {
  return (
    <div>
      <Command>
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Welcome">
            <CommandItem>Akash{children}</CommandItem>
          </CommandGroup>
        </CommandList>
      </Command>
    </div>
  );
};

export default UsersBar;
