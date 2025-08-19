import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from './ui/button';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './ui/dropdown-menu';
import { User, Settings, LogOut, BookOpen, Shield } from 'lucide-react';

export function Header() {
  const navigate = useNavigate();
  const isLoggedIn = false; // This will come from auth context later
  const isAdmin = true; // This will come from auth context later - set to true for demo

  const handleLogout = () => {
    // Logout logic will be implemented later
    navigate('/');
  };

  return (
    <header className="bg-white border-b border-border shadow-sm" dir="rtl">
      <div className="container mx-auto px-4 h-20 flex items-center justify-between">
        {/* Logo and Brand */}
        <Link to="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
          <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
            <BookOpen className="h-6 w-6 text-white" />
          </div>
          <div className="flex flex-col text-right">
            <span className="text-xl font-bold text-foreground">آزمایان</span>
            <span className="text-sm text-muted-foreground">سامانه آزمایشگاه دانشگاه</span>
          </div>
        </Link>

        {/* Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <Link to="/courses" className="text-foreground hover:text-blue-600 transition-colors">
            دروس
          </Link>
          {isAdmin && (
            <Link to="/admin" className="text-foreground hover:text-blue-600 transition-colors flex items-center gap-2">
              <Shield className="h-4 w-4" />
              پنل مدیریت
            </Link>
          )}
        </nav>

        {/* Auth Section */}
        <div className="flex items-center gap-3">
          {/* Quick Admin Access Button */}
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => navigate('/admin')}
            className="hidden md:flex items-center gap-2"
          >
            <Shield className="h-4 w-4" />
            ادمین
          </Button>

          {isLoggedIn ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src="" alt="کاربر" />
                    <AvatarFallback>
                      <User className="h-5 w-5" />
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end">
                <DropdownMenuItem onClick={() => navigate('/profile')}>
                  <User className="mr-2 h-4 w-4" />
                  پروفایل
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  تنظیمات
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleLogout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  خروج
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="flex items-center gap-2">
              <Button variant="ghost" onClick={() => navigate('/login')}>
                ورود
              </Button>
              <Button onClick={() => navigate('/register')}>
                ثبت‌نام
              </Button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}