import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PenBox } from 'lucide-react';
import { SignedOut, SignedIn, SignInButton } from "@clerk/nextjs";
import UserMenu from "@/components/user-menu";
import { checkUser } from "@/lib/check-user";

const Header = async () => {
    await checkUser();

    return (
        <nav className="mx-auto py-2 px-4 flex justify-between items-center shadow-md border-b-2">
            <Link
                href="/"
                className="flex items-center"
            >
                <Image
                    src='/logo.png'
                    width={150}
                    height={60}
                    alt="Schedullr Logo"
                    className="h-16 w-auto"
                />
            </Link>
            <div className="flex items-center gap-4">
                <Link
                    href='/events?create=true'
                >
                    <Button className="flex items-center gap-2">
                        <PenBox size={18} />
                        Create Event
                    </Button>
                </Link>
                <SignedOut>
                    <SignInButton forceRedirectUrl="/dashboard">
                        <Button variant="outline">
                            Login
                        </Button>
                    </SignInButton>
                </SignedOut>
                <SignedIn>
                    <UserMenu />
                </SignedIn>
            </div>
        </nav>
    );
}

export default Header