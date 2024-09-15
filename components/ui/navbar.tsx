import { RiMenu4Line } from 'react-icons/ri';
import { Button } from './button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from './card';
import { Menu } from './menu';
import { Sheet, SheetContent, SheetTrigger } from './sheet';
import { UserNav } from './user-nav';

const Navbar = () => {
  return (
    <header className="flex h-14 items-center gap-4 border-b bg-white px-4 lg:h-[60px] lg:px-6">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="shrink-0 md:hidden">
            <RiMenu4Line className="h-5 w-5" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="flex flex-col">
          <div className="flex-1">
            <Menu isOpen />
          </div>
        </SheetContent>
      </Sheet>
      <div className="ml-auto">
        <UserNav />
      </div>
    </header>
  );
};
export default Navbar;
