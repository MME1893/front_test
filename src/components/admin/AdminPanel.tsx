import React, { useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import {
  LayoutDashboard,
  Users,
  BookOpen,
  Layers,
  FileText,
  Settings,
  BarChart3,
  UserPlus,
  Plus,
  Menu
} from 'lucide-react';

export function AdminPanel() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const sidebarItems = [
    {
      title: 'داشبورد',
      url: '/admin',
      icon: LayoutDashboard
    },
    {
      title: 'مدیریت کاربران',
      url: '/admin/users',
      icon: Users
    },
    {
      title: 'مدیریت دروس',
      url: '/admin/courses',
      icon: BookOpen
    },
    {
      title: 'مدیریت ماژول‌ها',
      url: '/admin/modules',
      icon: Layers
    },
    {
      title: 'مدیریت تمرین‌ها',
      url: '/admin/items',
      icon: FileText
    },
    {
      title: 'تنظیمات',
      url: '/admin/settings',
      icon: Settings
    }
  ];

  const AdminDashboard = () => (
    <div className="space-y-6" dir="rtl">
      <h1 className="text-3xl text-right">داشبورد مدیریت</h1>
      
      {/* Statistics Cards */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <Users className="h-4 w-4 text-muted-foreground" />
            <CardTitle className="text-sm text-right">کل کاربران</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl text-right">1,247</div>
            <p className="text-xs text-muted-foreground text-right">
              +12% نسبت به ماه گذشته
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <BookOpen className="h-4 w-4 text-muted-foreground" />
            <CardTitle className="text-sm text-right">دروس فعال</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl text-right">8</div>
            <p className="text-xs text-muted-foreground text-right">
              +2 درس جدید این ماه
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <FileText className="h-4 w-4 text-muted-foreground" />
            <CardTitle className="text-sm text-right">تمرین‌های ارسالی</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl text-right">3,429</div>
            <p className="text-xs text-muted-foreground text-right">
              +8% نسبت به هفته گذشته
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
            <CardTitle className="text-sm text-right">نرخ تکمیل</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl text-right">73%</div>
            <p className="text-xs text-muted-foreground text-right">
              +5% بهبود نسبت به قبل
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="text-right">عملیات سریع</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Button className="h-20 flex-col gap-2" variant="outline">
              <UserPlus className="h-6 w-6" />
              افزودن کاربر
            </Button>
            <Button className="h-20 flex-col gap-2" variant="outline">
              <Plus className="h-6 w-6" />
              ایجاد درس جدید
            </Button>
            <Button className="h-20 flex-col gap-2" variant="outline">
              <Layers className="h-6 w-6" />
              افزودن ماژول
            </Button>
            <Button className="h-20 flex-col gap-2" variant="outline">
              <FileText className="h-6 w-6" />
              ایجاد تمرین
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const PlaceholderPage = ({ title }: { title: string }) => (
    <div className="space-y-6" dir="rtl">
      <h1 className="text-3xl text-right">{title}</h1>
      <Card>
        <CardContent className="p-8 text-center">
          <p className="text-muted-foreground mb-4">
            این بخش در حال توسعه است
          </p>
          <Button>افزودن جدید</Button>
        </CardContent>
      </Card>
    </div>
  );

  return (
    <div className="min-h-screen" dir="rtl">
      <div className="p-4 border-b bg-background">
        <Button
          variant="ghost"
          className="flex items-center gap-2"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <Menu className="h-5 w-5" />
          منو
        </Button>
        {menuOpen && (
          <div className="mt-4 flex flex-col gap-2">
            {sidebarItems.map((item) => (
              <Button
                key={item.title}
                variant="ghost"
                className="justify-between"
                onClick={() => {
                  navigate(item.url);
                  setMenuOpen(false);
                }}
              >
                <span>{item.title}</span>
                <item.icon className="h-4 w-4" />
              </Button>
            ))}
          </div>
        )}
      </div>
      <div className="p-6 md:p-8">
        <Routes>
          <Route path="/" element={<AdminDashboard />} />
          <Route path="/users" element={<PlaceholderPage title="مدیریت کاربران" />} />
          <Route path="/courses" element={<PlaceholderPage title="مدیریت دروس" />} />
          <Route path="/modules" element={<PlaceholderPage title="مدیریت ماژول‌ها" />} />
          <Route path="/items" element={<PlaceholderPage title="مدیریت تمرین‌ها" />} />
          <Route path="/settings" element={<PlaceholderPage title="تنظیمات" />} />
        </Routes>
      </div>
    </div>
  );
}