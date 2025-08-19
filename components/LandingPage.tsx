import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card, CardContent } from './ui/card';
import { Search, Database, Zap, Users } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

export function LandingPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/courses?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  const features = [
    {
      icon: Database,
      title: 'چالش‌های عملی SQL',
      description: 'تمرین‌های متنوع SQL برای تقویت مهارت‌های پایگاه داده با مثال‌های واقعی'
    },
    {
      icon: Zap,
      title: 'بازخورد فوری',
      description: 'دریافت نتایج و بازخورد آنی برای کوئری‌ها و پاسخ‌های شما'
    },
    {
      icon: Users,
      title: 'مدیریت هوشمند دروس',
      description: 'پیگیری پیشرفت و مدیریت آسان دروس و ماژول‌های آموزشی'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-blue-50 to-white py-20">
        <div className="container mx-auto px-4 text-center">
          {/* Search Bar */}
          <div className="mb-12 max-w-2xl mx-auto">
            <form onSubmit={handleSearch} className="relative">
              <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
              <Input
                type="text"
                placeholder="جستجوی دروس..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pr-12 h-14 text-lg shadow-lg border-0 bg-white/80 backdrop-blur-sm"
              />
              <Button 
                type="submit" 
                className="absolute left-2 top-2 h-10"
                disabled={!searchQuery.trim()}
              >
                جستجو
              </Button>
            </form>
          </div>

          {/* Hero Content */}
          <div className="max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-6xl mb-6 text-gray-900">
              به <span className="text-blue-600">آزمایان</span> خوش آمدید
            </h1>
            <p className="text-xl md:text-2xl text-gray-700 mb-8 leading-relaxed">
              سامانه آموزش عملی پایگاه داده برای دانشجویان
            </p>
            <p className="text-lg text-gray-600 mb-10 max-w-2xl mx-auto">
              با آزمایان، مهارت‌های پایگاه داده خود را با تمرین‌های عملی SQL، 
              بازخورد فوری و سیستم مدیریت پیشرفته توسعه دهید
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="h-12 px-8 text-lg"
                onClick={() => navigate('/courses')}
              >
                مشاهده دروس
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="h-12 px-8 text-lg"
                onClick={() => navigate('/register')}
              >
                شروع یادگیری
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl mb-4 text-gray-900">
              ویژگی‌های کلیدی آزمایان
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              ابزارهای قدرتمند برای یادگیری عملی و مؤثر پایگاه داده
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {features.map((feature, index) => (
              <Card key={index} className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg hover:-translate-y-2">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-blue-600 transition-colors">
                    <feature.icon className="h-8 w-8 text-blue-600 group-hover:text-white transition-colors" />
                  </div>
                  <h3 className="text-xl mb-4 text-gray-900">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl mb-6">
            آماده شروع یادگیری هستید؟
          </h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            همین الان عضو آزمایان شوید و سفر یادگیری پایگاه داده خود را آغاز کنید
          </p>
          <Button 
            size="lg" 
            variant="secondary"
            className="h-12 px-8 text-lg"
            onClick={() => navigate('/register')}
          >
            عضویت رایگان
          </Button>
        </div>
      </section>
    </div>
  );
}