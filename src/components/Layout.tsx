import { ReactNode } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Shield, Menu, X, LogOut } from "lucide-react";
import { Button } from "./ui/button";
import { useState } from "react";

interface LayoutProps {
  children: ReactNode;
  role?: "investigator" | "admin";
}

const Layout = ({ children, role }: LayoutProps) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    // TODO: Implement actual logout logic in Phase 5
    navigate("/");
  };

  const isLoginPage = location.pathname.includes("login") || location.pathname === "/";

  if (isLoginPage) {
    return <div className="min-h-screen">{children}</div>;
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60">
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <Link to={role === "admin" ? "/admin" : "/investigator"} className="flex items-center gap-3">
              <div className="rounded-lg bg-primary p-2">
                <Shield className="h-6 w-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="font-mono text-xl font-bold tracking-tight text-primary">CRD</h1>
                <p className="text-xs text-muted-foreground">Crime Rate Detector</p>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-6">
              {role === "investigator" && (
                <>
                  <Link
                    to="/investigator"
                    className="text-sm font-medium transition-colors hover:text-primary"
                  >
                    Dashboard
                  </Link>
                  <Link
                    to="/investigator/search"
                    className="text-sm font-medium transition-colors hover:text-primary"
                  >
                    Search
                  </Link>
                  <Link
                    to="/investigator/history"
                    className="text-sm font-medium transition-colors hover:text-primary"
                  >
                    History
                  </Link>
                </>
              )}
              {role === "admin" && (
                <>
                  <Link
                    to="/admin"
                    className="text-sm font-medium transition-colors hover:text-primary"
                  >
                    Dashboard
                  </Link>
                  <Link
                    to="/admin/data"
                    className="text-sm font-medium transition-colors hover:text-primary"
                  >
                    Data Management
                  </Link>
                  <Link
                    to="/admin/users"
                    className="text-sm font-medium transition-colors hover:text-primary"
                  >
                    Users
                  </Link>
                  <Link
                    to="/admin/analytics"
                    className="text-sm font-medium transition-colors hover:text-primary"
                  >
                    Analytics
                  </Link>
                </>
              )}
              <Button variant="ghost" size="sm" onClick={handleLogout} className="gap-2">
                <LogOut className="h-4 w-4" />
                Logout
              </Button>
            </nav>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-border bg-card">
            <nav className="container mx-auto px-4 py-4 flex flex-col gap-2">
              {role === "investigator" && (
                <>
                  <Link
                    to="/investigator"
                    className="px-4 py-2 text-sm font-medium rounded-md hover:bg-accent"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Dashboard
                  </Link>
                  <Link
                    to="/investigator/search"
                    className="px-4 py-2 text-sm font-medium rounded-md hover:bg-accent"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Search
                  </Link>
                  <Link
                    to="/investigator/history"
                    className="px-4 py-2 text-sm font-medium rounded-md hover:bg-accent"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    History
                  </Link>
                </>
              )}
              {role === "admin" && (
                <>
                  <Link
                    to="/admin"
                    className="px-4 py-2 text-sm font-medium rounded-md hover:bg-accent"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Dashboard
                  </Link>
                  <Link
                    to="/admin/data"
                    className="px-4 py-2 text-sm font-medium rounded-md hover:bg-accent"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Data Management
                  </Link>
                  <Link
                    to="/admin/users"
                    className="px-4 py-2 text-sm font-medium rounded-md hover:bg-accent"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Users
                  </Link>
                  <Link
                    to="/admin/analytics"
                    className="px-4 py-2 text-sm font-medium rounded-md hover:bg-accent"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Analytics
                  </Link>
                </>
              )}
              <Button variant="ghost" onClick={handleLogout} className="justify-start gap-2 mt-2">
                <LogOut className="h-4 w-4" />
                Logout
              </Button>
            </nav>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">{children}</main>
    </div>
  );
};

export default Layout;
