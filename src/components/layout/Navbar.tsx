import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, Menu, X, User, LogOut, Building2, Shield, Calculator, FileText, ChevronDown, Heart, Bell } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { useFavorites } from '@/contexts/FavoritesContext';
import { useNotifications } from '@/contexts/NotificationsContext';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout, switchRole } = useAuth();
  const { favorites } = useFavorites();
  const { unreadCount } = useNotifications();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const getDashboardLink = () => {
    if (!user) return '/login';
    switch (user.role) {
      case 'lender':
        return '/lender/dashboard';
      case 'admin':
        return '/admin/dashboard';
      default:
        return '/dashboard';
    }
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 glass border-b border-border"
    >
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
              <Home className="h-5 w-5 text-primary-foreground" />
            </div>
            <div className="hidden sm:block">
              <span className="font-display text-lg font-bold text-foreground">MortgageNG</span>
              <span className="ml-1 text-xs text-muted-foreground">Marketplace</span>
            </div>
          </Link>

          <div className="hidden md:flex items-center gap-6">
            <Link to="/compare" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              Compare Mortgages
            </Link>
            <Link to="/calculator" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              Calculator
            </Link>
            <Link to="/learn" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              Learn
            </Link>
            <Link to="/for-lenders" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              For Lenders
            </Link>
            <Link to="/favorites" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors relative">
              <Heart className="h-4 w-4 inline-block mr-1" />
              Favorites
              {favorites.length > 0 && (
                <span className="absolute -top-2 -right-3 bg-destructive text-destructive-foreground text-xs rounded-full h-4 w-4 flex items-center justify-center">
                  {favorites.length}
                </span>
              )}
            </Link>
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-3">
            {user && (
              <Button variant="ghost" size="icon" className="relative" onClick={() => navigate('/notifications')}>
                <Bell className="h-5 w-5" />
                {unreadCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 bg-destructive text-destructive-foreground text-xs rounded-full h-4 w-4 flex items-center justify-center">
                    {unreadCount}
                  </span>
                )}
              </Button>
            )}
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-medium">
                      {user.name.charAt(0)}
                    </div>
                    <span className="hidden sm:inline text-sm">{user.name.split(' ')[0]}</span>
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <div className="px-2 py-1.5">
                    <p className="text-sm font-medium">{user.name}</p>
                    <p className="text-xs text-muted-foreground">{user.email}</p>
                    <p className="text-xs text-muted-foreground capitalize mt-1">Role: {user.role}</p>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => navigate(getDashboardLink())}>
                    <User className="mr-2 h-4 w-4" />
                    Dashboard
                  </DropdownMenuItem>
                  {user.role === 'consumer' && (
                    <DropdownMenuItem onClick={() => navigate('/applications')}>
                      <FileText className="mr-2 h-4 w-4" />
                      My Applications
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuSeparator />
                  {/* Demo role switcher */}
                  <div className="px-2 py-1.5">
                    <p className="text-xs text-muted-foreground mb-2">Demo: Switch Role</p>
                    <div className="flex gap-1">
                      <Button
                        size="sm"
                        variant={user.role === 'consumer' ? 'default' : 'outline'}
                        className="text-xs h-7 flex-1"
                        onClick={() => switchRole('consumer')}
                      >
                        <User className="h-3 w-3 mr-1" />
                        User
                      </Button>
                      <Button
                        size="sm"
                        variant={user.role === 'lender' ? 'default' : 'outline'}
                        className="text-xs h-7 flex-1"
                        onClick={() => switchRole('lender')}
                      >
                        <Building2 className="h-3 w-3 mr-1" />
                        Lender
                      </Button>
                      <Button
                        size="sm"
                        variant={user.role === 'admin' ? 'default' : 'outline'}
                        className="text-xs h-7 flex-1"
                        onClick={() => switchRole('admin')}
                      >
                        <Shield className="h-3 w-3 mr-1" />
                        Admin
                      </Button>
                    </div>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout} className="text-destructive">
                    <LogOut className="mr-2 h-4 w-4" />
                    Log out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                <Button variant="ghost" onClick={() => navigate('/login')} className="hidden sm:inline-flex">
                  Sign In
                </Button>
                <Button onClick={() => navigate('/apply')} className="bg-primary hover:bg-primary/90">
                  Apply Now
                </Button>
              </>
            )}

            {/* Mobile Menu Button */}
            <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-border py-4"
          >
            <div className="flex flex-col gap-2">
              <Link
                to="/compare"
                className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted rounded-md transition-colors"
                onClick={() => setIsOpen(false)}
              >
                <Calculator className="inline-block mr-2 h-4 w-4" />
                Compare Mortgages
              </Link>
              <Link
                to="/calculator"
                className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted rounded-md transition-colors"
                onClick={() => setIsOpen(false)}
              >
                <Calculator className="inline-block mr-2 h-4 w-4" />
                Calculator
              </Link>
              <Link
                to="/learn"
                className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted rounded-md transition-colors"
                onClick={() => setIsOpen(false)}
              >
                <FileText className="inline-block mr-2 h-4 w-4" />
                Learn
              </Link>
              <Link
                to="/for-lenders"
                className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted rounded-md transition-colors"
                onClick={() => setIsOpen(false)}
              >
                <Building2 className="inline-block mr-2 h-4 w-4" />
                For Lenders
              </Link>
              <Link
                to="/favorites"
                className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted rounded-md transition-colors"
                onClick={() => setIsOpen(false)}
              >
                <Heart className="inline-block mr-2 h-4 w-4" />
                Favorites {favorites.length > 0 && `(${favorites.length})`}
              </Link>
              {!user && (
                <Button variant="outline" onClick={() => { navigate('/login'); setIsOpen(false); }} className="mx-4 mt-2">
                  Sign In
                </Button>
              )}
            </div>
          </motion.div>
        )}
      </div>
    </motion.nav>
  );
}
