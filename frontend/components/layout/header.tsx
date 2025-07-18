"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./Header.module.scss";
import { ThemeToggle } from "@/components/common/ThemeToggle";
import {Button} from "@/components/ui/Button";
import {Avatar} from "@/components/ui/Avatar";

const Header = () => {
  const pathname = usePathname();
  const isAuthPage = pathname?.startsWith("/login") || pathname?.startsWith("/register") || pathname?.startsWith("/change-password");
  const isLoggedIn = false; // placeholder; replace with actual auth state

  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <Link href="/" className={styles.logo}>
          Know<span>Me</span>
        </Link>
        <nav className={styles.nav}>
          <ThemeToggle />
          {!isLoggedIn && !isAuthPage && (
            <>
              <Link href="/login">
                <Button variant="outline">Login</Button>
              </Link>
              <Link href="/register">
                <Button>Get Started</Button>
              </Link>
            </>
          )}
          {isLoggedIn && <Avatar />}
        </nav>
      </div>
    </header>
  );
};

export default Header; 