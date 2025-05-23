"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { toggleLoginDialog } from "@/store/slice/userSlice";
import { RootState } from "@/store/store";
import {
  BookLock,
  ChevronRight,
  FileTerminal,
  Heart,
  HelpCircle,
  Lock,
  LogOut,
  Menu,
  Package,
  PiggyBank,
  Search,
  ShoppingCart,
  User,
  User2,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

const Header = () => {
  const [isDropdownOpen, setIsDropdownOpen] = React.useState(false);
  const router = useRouter();
  const dispatch = useDispatch();
  const isLoginOpen = useSelector(
    (state: RootState) => state.user.isLoginDialogOpen
  );

  const user = {
    profilePicture: "",
    name: "Mahesh Aryal",
    email: "aryalmahesh775@gmail.com",
  };
  const userPlaceholder = "";

  const handleLoginClick = () => {
    // Handle login logic here
    dispatch(toggleLoginDialog());
    setIsDropdownOpen(false);
  };

  const handleProtectionNavigation = (href: string) => {
    // Handle protected navigation logic here
    if (user) {
      router.push(href);
      setIsDropdownOpen(false);
    } else {
      dispatch(toggleLoginDialog());
      setIsDropdownOpen(false);
    }
  };

  const handleLogout = () => {
    // Handle logout logic here
  };

  const menuItems = [
    ...(user && user
      ? [
          {
            href: "account/profile",
            content: (
              <div className="flex space-x-4 items-center p-2 border-b">
                <Avatar className="w-8 h-8 rounded-full">
                  {user?.profilePicture ? (
                    <AvatarImage alt="user_image"></AvatarImage>
                  ) : (
                    <AvatarFallback>{userPlaceholder}</AvatarFallback>
                  )}
                </Avatar>
                <div className="flex flex-col">
                  <span className="font-semibold text-md">{user.name}</span>
                  <span className="text-xs text-gray-500">{user.email}</span>
                </div>
              </div>
            ),
          },
        ]
      : [
          {
            icon: <Lock className="h-5 w-5" />,
            label: "Login/Sign up",
            onClick: handleLoginClick,
          },
        ]),
    {
      icon: <User className="h-5 w-5" />,
      label: "My Profile",
      onClick: () => {
        handleProtectionNavigation("/account/profile");
      },
    },
    {
      icon: <Package className="h-5 w-5" />,
      label: "My Orders",
      onClick: () => {
        handleProtectionNavigation("/account/orders");
      },
    },
    {
      icon: <PiggyBank className="h-5 w-5" />,
      label: "My Selling Orders",
      onClick: () => {
        handleProtectionNavigation("/account/selling-products");
      },
    },
    {
      icon: <ShoppingCart className="h-5 w-5" />,
      label: "Cart",
      onClick: () => {
        handleProtectionNavigation("/checkout/cart");
      },
    },
    {
      icon: <Heart className="h-5 w-5" />,
      label: "My Wish List",
      onClick: () => {
        handleProtectionNavigation("account/wishlist");
      },
    },
    {
      icon: <User2 className="h-5 w-5" />,
      label: "About Us",
      href: "/about-us",
    },

    {
      icon: <FileTerminal className="h-5 w-5" />,
      label: "Terms & Use",
      href: "/terms-of-use",
    },

    {
      icon: <BookLock className="h-5 w-5" />,
      label: "Privicy Policy",
      href: "/privacy-policy",
    },

    {
      icon: <HelpCircle className="h-5 w-5" />,
      label: "Help",
      href: "/how-it-works",
    },
    ...(user && [
      {
        icon: <LogOut className="h-5 w-5" />,
        label: "Logout",
        onClick: handleLogout,
      },
    ]),
  ];

  const MenuItems = ({ className = "" }) => (
    <div className={className}>
      {menuItems?.map((item, index) =>
        item?.href ? (
          <Link
            key={index}
            href={item.href}
            className="flex items-center gap-3 px-4 py-3 text-sm rounded-lg hover:bg-gray-200"
            onClick={() => setIsDropdownOpen(false)}
          >
            {item?.icon}
            <span className="text-sm font-medium">{item?.label}</span>
            {item?.content && <div className="mt-1">{item.content}</div>}
            <ChevronRight className="h-4 w-4 ml-auto" />
          </Link>
        ) : (
          <button
            key={index}
            className="flex w-full items-center gap-3 px-4 py-3 text-sm rounded-lg hover:bg-gray-200"
            onClick={item.onClick}
          >
            {item?.icon}
            <span className="text-sm font-medium">{item?.label}</span>
            <ChevronRight className="h-4 w-4 ml-auto" />
          </button>
        )
      )}
    </div>
  );

  return (
    <header className="border-b bg-white sticky top-0 z-50">
      {/* Desktop header */}
      <div className="container w-{80%] mx-auto hidden lg:flex items-center justify-between p-4">
        <Link href="/" className="flex items-center">
          <Image
            src="/images/web-logo.png"
            width={450}
            height={100}
            alt="desktop_logo"
            className="h-15 w-auto"
          />
        </Link>
        <div className="flex flex-1 items-center justify-center max-w-xl px-4">
          <div className="relative w-full">
            <Input
              type="text"
              placeholder="Search for books, authors, or genres"
              className="w-full pr-10 rounded-md focus:outline-none"
              //   value={""}
              //   onChange={() => {}}
            />
            <Button
              size={"icon"}
              variant={"ghost"}
              className="absolute right-0 top-1/2 -translate-y-1/2 transform"
            >
              <Search className="h-5 w-5" />
            </Button>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <Link href="/book-sell">
            <Button
              variant={"secondary"}
              className="bg-yellow-400 text-gray-900 hover:bg-yellow-500"
            >
              Sell Used Book
            </Button>
          </Link>

          <DropdownMenu open={isDropdownOpen} onOpenChange={setIsDropdownOpen}>
            <DropdownMenuTrigger asChild>
              <Button variant={"ghost"} className="flex items-center gap-2">
                <Avatar className="w-8 h-8 rounded-full">
                  {user?.profilePicture ? (
                    <AvatarImage alt="user_image"></AvatarImage>
                  ) : userPlaceholder ? (
                    <AvatarFallback>{userPlaceholder}</AvatarFallback>
                  ) : (
                    <User className="ml-2 mt-2" />
                  )}
                </Avatar>
                My Account
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-80 p-2">
              <MenuItems />
            </DropdownMenuContent>
          </DropdownMenu>

          <Link href="/checkout/cart">
            <div className="relative">
              <Button variant={"ghost"} className="relative">
                <ShoppingCart className="h-5 w-5 mr-2" />
                Cart
              </Button>
              {user && (
                <span className="absolute top-2 left-5 transform translate-x-1/2 -translate-y-1/2 bg-red-500 text-white text-xs font-semibold rounded-full px-1">
                  3
                </span>
              )}
            </div>
          </Link>
        </div>
      </div>

      {/* Mobile Header */}
      <div className="container mx-auto flex lg:hidden items-center justify-between p-4">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant={"ghost"} size={"icon"}>
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-80 p-0">
            <SheetHeader>
              <SheetTitle className="sr-only"></SheetTitle>
            </SheetHeader>
            <div className="border-b p-4">
              <Link href="/" className="flex items-center">
                <Image
                  src="/images/web-logo.png"
                  width={150}
                  height={40}
                  alt="mobile_logo"
                  className="h-15 w-auto"
                />
              </Link>
            </div>
            <MenuItems className="py-2" />
          </SheetContent>
        </Sheet>

        <Link href="/" className="flex items-center">
          <Image
            src="/images/web-logo.png"
            width={450}
            height={100}
            alt="desktop_logo"
            className="h-6 md:h-10 w-20 md:w-auto"
          />
        </Link>
        <div className="flex flex-1 items-center justify-center max-w-xl px-4">
          <div className="relative w-full">
            <Input
              type="text"
              placeholder="Search books"
              className="w-full pr-10 rounded-md focus:outline-none"
              //   value={""}
              //   onChange={() => {}}
            />
            <Button
              size={"icon"}
              variant={"ghost"}
              className="absolute right-0 top-1/2 -translate-y-1/2 transform"
            >
              <Search className="h-5 w-5" />
            </Button>
          </div>
        </div>
        <Link href="/checkout/cart">
          <div className="relative">
            <Button variant={"ghost"} className="relative">
              <ShoppingCart className="h-5 w-5 mr-2" />
            </Button>
            {user && (
              <span className="absolute top-2 left-5 transform translate-x-1/2 -translate-y-1/2 bg-red-500 text-white text-xs font-semibold rounded-full px-1">
                3
              </span>
            )}
          </div>
        </Link>
      </div>
    </header>
  );
};

export default Header;
