import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Separator } from '../ui/separator';
import { BookOpen, Eye, EyeOff } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

export function LoginPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      if (formData.username && formData.password) {
        toast.success('با موفقیت وارد شدید');
        navigate('/courses');
      } else {
        toast.error('لطفاً تمام فیلدها را پر کنید');
      }
      setIsLoading(false);
    }, 1500);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-[calc(100vh-80px)] flex items-center justify-center bg-gradient-to-b from-blue-50 to-white">
      <div className="container mx-auto px-4">
        <div className="max-w-md mx-auto">
          {/* Logo */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-blue-600 rounded-lg flex items-center justify-center mx-auto mb-4">
              <BookOpen className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-3xl mb-2">ورود به آزمایان</h1>
            <p className="text-muted-foreground">
              به سامانه آموزش پایگاه داده خوش آمدید
            </p>
          </div>

          {/* Login Form */}
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="text-center">ورود</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="username">نام کاربری</Label>
                  <Input
                    id="username"
                    name="username"
                    type="text"
                    value={formData.username}
                    onChange={handleChange}
                    placeholder="نام کاربری یا شماره دانشجویی"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="password">رمز عبور</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      name="password"
                      type={showPassword ? 'text' : 'password'}
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="رمز عبور"
                      required
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute left-0 top-0 h-full px-3 hover:bg-transparent"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </div>

                <div className="text-left">
                  <Link 
                    to="/forgot-password" 
                    className="text-sm text-blue-600 hover:underline"
                  >
                    رمز عبور را فراموش کرده‌اید؟
                  </Link>
                </div>

                <Button 
                  type="submit" 
                  className="w-full h-12"
                  disabled={isLoading}
                >
                  {isLoading ? 'در حال ورود...' : 'ورود'}
                </Button>
              </form>

              <Separator className="my-6" />

              <div className="text-center">
                <p className="text-muted-foreground">
                  حساب کاربری ندارید؟{' '}
                  <Link 
                    to="/register" 
                    className="text-blue-600 hover:underline"
                  >
                    ثبت‌نام کنید
                  </Link>
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Demo Credentials */}
          <Card className="mt-6 bg-blue-50 border-blue-200">
            <CardContent className="p-4">
              <h4 className="font-medium mb-2 text-blue-900">اطلاعات آزمایشی:</h4>
              <div className="text-sm text-blue-800 space-y-1">
                <p>نام کاربری: student123</p>
                <p>رمز عبور: password123</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}