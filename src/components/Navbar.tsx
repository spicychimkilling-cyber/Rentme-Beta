import { Link, useLocation } from 'react-router-dom';
import { Menu, X, User, LogOut, Heart, Package } from 'lucide-react';
import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Button } from './ui/button';
import { motion, AnimatePresence } from "framer-motion"; 

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { user, logout, isAuthenticated } = useAuth();

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/browse', label: 'Browse Items' },
    { path: '/how-it-works', label: 'How It Works' },
    { path: '/contact', label: 'Contact' },
  ];

  const isActive = (path: string) => location.pathname === path;
  const isAuthPage = location.pathname === '/login';

  return (
    <nav className="sticky top-0 z-50 bg-white border-b shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center">
              <Package className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl text-blue-600">RentMe</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`relative transition-colors ${
                  isActive(link.path) ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600'
                }`}
              >
                {link.label}
                {isActive(link.path) && (
                  <motion.div
                    layoutId="activeNav"
                    className="absolute -bottom-[21px] left-0 right-0 h-0.5 bg-blue-600"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </Link>
            ))}
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-4">
            {isAuthenticated ? (
              <>
                <Link to="/list-item">
                  <Button>List an Item</Button>
                </Link>
                <Link to="/dashboard">
                  <Button variant="outline" className="gap-2">
                    <User className="w-4 h-4" />
                    {user?.name}
                  </Button>
                </Link>
                <Button variant="ghost" size="icon" onClick={logout} title="Logout">
                  <LogOut className="w-4 h-4" />
                </Button>
              </>
              ) : (
                !isAuthPage && (
                  <Link to="/login">
                    <Button>Login / Sign Up</Button>
                  </Link>
                )
              )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-gray-100"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t bg-white overflow-hidden"
          >
            <div className="px-4 py-4 space-y-3">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={`block px-4 py-2 rounded-lg transition-colors ${
                    isActive(link.path)
                      ? 'bg-blue-50 text-blue-600'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <div className="pt-3 border-t space-y-2">
                {isAuthenticated ? (
                  <>
                    <Link to="/list-item" onClick={() => setIsOpen(false)}>
                      <Button className="w-full">List an Item</Button>
                    </Link>
                    <Link to="/dashboard" onClick={() => setIsOpen(false)}>
                      <Button variant="outline" className="w-full gap-2">
                        <User className="w-4 h-4" />
                        Dashboard
                      </Button>
                    </Link>
                    <Button
                      variant="ghost"
                      className="w-full gap-2"
                      onClick={() => {
                        logout();
                        setIsOpen(false);
                      }}
                    >
                      <LogOut className="w-4 h-4" />
                      Logout
                    </Button>
                  </>
                ) : (
                  <Link to="/login" onClick={() => setIsOpen(false)}>
                    <Button className="w-full">Login / Sign Up</Button>
                  </Link>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
