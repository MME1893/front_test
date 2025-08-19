import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Search, BookOpen, User, Clock, CheckCircle } from 'lucide-react';
import { LoadingSpinner } from './LoadingSpinner';

interface Course {
  id: string;
  title: string;
  instructor: string;
  semester: string;
  description: string;
  moduleCount: number;
  itemCount: number;
  completedItems: number;
  isEnrolled: boolean;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
}

export function CoursesPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');
  const [selectedSemester, setSelectedSemester] = useState('all');
  const [courses, setCourses] = useState<Course[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Mock data - replace with API call
  const mockCourses: Course[] = [
    {
      id: '1',
      title: 'مبانی پایگاه داده',
      instructor: 'دکتر احمدی',
      semester: 'بهار ۱۴۰۳',
      description: 'آشنایی با مفاهیم پایه‌ای پایگاه داده و SQL',
      moduleCount: 8,
      itemCount: 45,
      completedItems: 23,
      isEnrolled: true,
      difficulty: 'beginner'
    },
    {
      id: '2',
      title: 'پایگاه داده پیشرفته',
      instructor: 'دکتر رضایی',
      semester: 'بهار ۱۴۰۳',
      description: 'موضوعات پیشرفته شامل ایندکس‌گذاری و بهینه‌سازی',
      moduleCount: 12,
      itemCount: 78,
      completedItems: 0,
      isEnrolled: false,
      difficulty: 'advanced'
    },
    {
      id: '3',
      title: 'طراحی سیستم‌های پایگاه داده',
      instructor: 'دکتر محمدی',
      semester: 'پاییز ۱۴۰۲',
      description: 'طراحی و پیاده‌سازی سیستم‌های پایگاه داده مقیاس‌پذیر',
      moduleCount: 10,
      itemCount: 62,
      completedItems: 62,
      isEnrolled: true,
      difficulty: 'intermediate'
    }
  ];

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setCourses(mockCourses);
      setIsLoading(false);
    }, 1000);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams(searchParams);
    if (searchQuery) {
      params.set('search', searchQuery);
    } else {
      params.delete('search');
    }
    setSearchParams(params);
  };

  const filteredCourses = courses.filter(course => {
    const matchesSearch = !searchQuery || 
      course.title.includes(searchQuery) || 
      course.instructor.includes(searchQuery);
    const matchesSemester = selectedSemester === 'all' || course.semester === selectedSemester;
    return matchesSearch && matchesSemester;
  });

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'bg-green-100 text-green-800';
      case 'intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getDifficultyText = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'مقدماتی';
      case 'intermediate': return 'متوسط';
      case 'advanced': return 'پیشرفته';
      default: return difficulty;
    }
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="container mx-auto px-4 py-8" dir="rtl">
      {/* Header */}
      <div className="mb-8 text-right">
        <h1 className="text-4xl mb-4 text-right">دروس آزمایشگاه</h1>
        <p className="text-xl text-muted-foreground text-right">
          دروس پایگاه داده و تمرین‌های عملی
        </p>
      </div>

      {/* Search and Filters */}
      <div className="mb-8 flex flex-col md:flex-row gap-4">
        <form onSubmit={handleSearch} className="flex-1 relative">
          <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            type="text"
            placeholder="جستجوی دروس، استاد..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pr-10 text-right"
            dir="rtl"
          />
        </form>
        
        <Select value={selectedSemester} onValueChange={setSelectedSemester}>
          <SelectTrigger className="w-full md:w-48">
            <SelectValue placeholder="انتخاب ترم" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">همه ترم‌ها</SelectItem>
            <SelectItem value="بهار ۱۴۰۳">بهار ۱۴۰۳</SelectItem>
            <SelectItem value="پاییز ۱۴۰۲">پاییز ۱۴۰۲</SelectItem>
          </SelectContent>
        </Select>

        <Button type="submit" onClick={handleSearch}>
          جستجو
        </Button>
      </div>

      {/* Course Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCourses.map((course) => (
          <Card key={course.id} className="hover:shadow-lg transition-shadow cursor-pointer group">
            <CardHeader>
              <div className="flex items-start justify-between mb-2">
                <BookOpen className="h-6 w-6 text-blue-600" />
                <Badge className={getDifficultyColor(course.difficulty)}>
                  {getDifficultyText(course.difficulty)}
                </Badge>
              </div>
              <CardTitle className="text-xl group-hover:text-blue-600 transition-colors text-right">
                {course.title}
              </CardTitle>
              <div className="flex items-center gap-2 text-muted-foreground justify-end">
                <span>{course.instructor}</span>
                <User className="h-4 w-4" />
              </div>
              <div className="flex items-center gap-2 text-muted-foreground justify-end">
                <span>{course.semester}</span>
                <Clock className="h-4 w-4" />
              </div>
            </CardHeader>
            
            <CardContent>
              <p className="text-muted-foreground mb-4 line-clamp-2 text-right">
                {course.description}
              </p>
              
              <div className="space-y-3 mb-4">
                <div className="flex justify-between text-sm">
                  <span>تمرین‌ها: {course.itemCount}</span>
                  <span>ماژول‌ها: {course.moduleCount}</span>
                </div>
                
                {course.isEnrolled && (
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>{Math.round((course.completedItems / course.itemCount) * 100)}%</span>
                      <span>پیشرفت</span>
                    </div>
                    <Progress 
                      value={(course.completedItems / course.itemCount) * 100} 
                      className="h-2"
                    />
                  </div>
                )}
              </div>
              
              <Button 
                className="w-full"
                variant={course.isEnrolled ? "default" : "outline"}
                onClick={() => navigate(`/course/${course.id}`)}
              >
                {course.completedItems === course.itemCount ? (
                  <>
                    <CheckCircle className="mr-2 h-4 w-4" />
                    تکمیل شده
                  </>
                ) : course.isEnrolled ? (
                  'ادامه درس'
                ) : (
                  'مشاهده درس'
                )}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredCourses.length === 0 && (
        <div className="text-center py-12">
          <BookOpen className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-xl mb-2">هیچ درسی یافت نشد</h3>
          <p className="text-muted-foreground">
            لطفاً کلمات کلیدی مختلفی را امتحان کنید
          </p>
        </div>
      )}
    </div>
  );
}