"use client";

import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import * as Avatar from "@radix-ui/react-avatar";

const UserDropdown = () => {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const user = {
    name: "Aman",
    email: "aman@gmail.com",
    image: "https://github.com/shadcn.png",
  };

  const handleSignOut = () => {
    router.push("/sign-in");
  };

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      {/* Avatar Trigger */}
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="p-0 hover:bg-transparent focus-visible:ring-0"
          onClick={() => setOpen((prev) => !prev)} // toggle on click
          onMouseEnter={() => setOpen(true)}       // open on hover
        >
          <div className="relative">
            <Avatar.Root className="relative flex h-10 w-10 overflow-hidden rounded-full border border-gray-200 transition-transform duration-200 hover:scale-110 active:scale-95">
              <Avatar.Image
                src={user.image}
                alt={user.name}
                className="h-full w-full object-cover"
              />
              <Avatar.Fallback>AM</Avatar.Fallback>
            </Avatar.Root>

            {/* Online Status Dot */}
            <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 border-2 border-white" />
          </div>
        </Button>
      </DropdownMenuTrigger>

      {/* Dropdown Panel */}
      <DropdownMenuContent
        align="end"
        sideOffset={10}
        className="w-60 rounded-2xl border bg-white/80 backdrop-blur-md shadow-xl"
        onMouseEnter={() => setOpen(true)}   // keep open when hovering menu
        onMouseLeave={() => setOpen(false)}  // close when leaving menu
      >
        <DropdownMenuLabel className="flex items-center gap-3">
          <Avatar.Root className="h-9 w-9 rounded-full overflow-hidden">
            <Avatar.Image
              src={user.image}
              className="h-full w-full object-cover"
            />
            <Avatar.Fallback>AM</Avatar.Fallback>
          </Avatar.Root>

          <div className="flex flex-col leading-tight">
            <span className="font-medium">{user.name}</span>
            <span className="text-xs text-gray-400">{user.email}</span>
          </div>
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        <DropdownMenuGroup>
          <DropdownMenuItem onClick={() => router.push("/profile")}>
            👤 Profile
          </DropdownMenuItem>

          <DropdownMenuItem onClick={() => router.push("/settings")}>
            ⚙️ Settings
          </DropdownMenuItem>

          <DropdownMenuItem onClick={() => router.push("/billing")}>
            💳 Billing
          </DropdownMenuItem>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        <DropdownMenuItem
          className="text-red-500"
          onClick={handleSignOut}
        >
          🚪 Sign Out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserDropdown;