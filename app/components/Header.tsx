"use client";
import { Menu } from "lucide-react";
import { Button } from "./lib/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger
} from "./lib/ui/sheet";
import { useState } from "react";

export function Logo () {
  return <div id="logo" className="flex items-center">
  <div className="w-10 h-10 bg-accent-custom rounded-md flex items-center justify-center">
    <span className="font-code font-bold text-dark-custom text-xl">A</span>
  </div>
</div>;
}

type NaveItemProps = {
  children: React.ReactNode
  href: string
  onClick?: () => void
  className?: string
}

function NavItem({ children, href, onClick, className }: NaveItemProps) {
  return (
    <a
      className={`text-text-primary-custom hover:text-accent-custom cursor-pointer text-xl md:text-sm font-medium transition-colors ${className}`}
      href={href}
      onClick={onClick}
    >
      {children}
    </a>
  );
}

type NavProps = {
  className?: string;
  onItemClick?: () => void; // opcional to close sheet on mobile
};

function Nav({ className, onItemClick }: NavProps) {
  return (
    <nav className={`flex flex-col md:flex-row items-center gap-y-8 md:gap-x-8 ${className}`}>
      <NavItem href="#home" onClick={onItemClick}>Home</NavItem>
      <NavItem href="#experience" onClick={onItemClick}>Experience</NavItem>
      <NavItem href="#recommendations" onClick={onItemClick}>Recommendations</NavItem>
      <NavItem href="#ai-assistant" onClick={onItemClick}>AI Assistant</NavItem>
      <NavItem href="#contact" onClick={onItemClick}>Contact</NavItem>
    </nav>
  );
}

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  return <header className="sticky top-0 flex items-center justify-between py-6 px-8">
    <Logo/>

    {/* Desktop nav */}
    <div className="hidden md:flex">
      <Nav/>
    </div>

    {/* Mobile nav */}
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        {/* <Menu/> */}
        <Button variant="ghost" size="icon" className="md:hidden"><Menu className="size-6"/></Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-full p-8 justify-center bg-dark-custom/85">
        <Nav onItemClick={() => setIsOpen(false)}/>
      </SheetContent>
    </Sheet>
  </header>
}