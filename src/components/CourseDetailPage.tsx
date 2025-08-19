import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './ui/accordion';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { 
  BookOpen, 
  User, 
  Clock, 
  CheckCircle, 
  Circle, 
  Database, 
  FileText, 
  Upload, 
  HelpCircle,
  ChevronRight
} from 'lucide-react';
import { LoadingSpinner } from './LoadingSpinner';

interface Item {
  id: string;
  title: string;
  type: 'sql_query' | 'sql_file_upload' | 'multiple_choice' | 'short_answer' | 'descriptive' | 'true_false';
  isCompleted: boolean;
  points: number;
}

interface Module {
  id: string;
  title: string;
  description: string;
  items: Item[];
  completedItems: number;
}

interface Course {
  id: string;
  title: string;
  description: string;
  instructor: string;
  semester: string;
  difficulty: string;
  modules: Module[];
  isEnrolled: boolean;
}

export function CourseDetailPage() {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState<Course | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Mock data - replace with API call
  const mockCourse: Course = {
    id: courseId || '1',
    title: 'مبانی پایگاه داده',
    description: 'در این درس با مفاهیم پایه‌ای پایگاه داده آشنا می‌شوید و مهارت‌های اولیه SQL را فرا می‌گیرید. این درس شامل تمرین‌های عملی و پروژه‌های کاربردی است.',
    instructor: 'دکتر احمدی',
    semester: 'بهار ۱۴۰۳',
    difficulty: 'مقدماتی',
    isEnrolled: true,
    modules: [
      {
        id: '1',
        title: 'آشنایی با پایگاه داده',
        description: 'مفاهیم پایه و تاریخچه پایگاه داده',
        completedItems: 3,
        items: [
          {
            id: '1',
            title: 'تعریف پایگاه داده',
            type: 'multiple_choice',
            isCompleted: true,
            points: 10
          },
          {
            id: '2',
            title: 'انواع پایگاه داده',
            type: 'descriptive',
            isCompleted: true,
            points: 15
          },
          {
            id: '3',
            title: 'مزایای استفاده از پایگاه داده',
            type: 'true_false',
            isCompleted: true,
            points: 8
          },
          {
            id: '4',
            title: 'تمرین عملی: نصب MySQL',
            type: 'short_answer',
            isCompleted: false,
            points: 20
          }
        ]
      },
      {
        id: '2',
        title: 'SQL پایه',
        description: 'یادگیری دستورات اولیه SQL',
        completedItems: 1,
        items: [
          {
            id: '5',
            title: 'دستور SELECT',
            type: 'sql_query',
            isCompleted: true,
            points: 25
          },
          {
            id: '6',
            title: 'دستور INSERT',
            type: 'sql_query',
            isCompleted: false,
            points: 25
          },
          {
            id: '7',
            title: 'دستور UPDATE',
            type: 'sql_query',
            isCompleted: false,
            points: 25
          },
          {
            id: '8',
            title: 'پروژه عملی: ایجاد جدول',
            type: 'sql_file_upload',
            isCompleted: false,
            points: 50
          }
        ]
      },
      {
        id: '3',
        title: 'Join و روابط',
        description: 'کار با چندین جدول و روابط بین آنها',
        completedItems: 0,
        items: [
          {
            id: '9',
            title: 'انواع Join',
            type: 'multiple_choice',
            isCompleted: false,
            points: 15
          },
          {
            id: '10',
            title: 'Inner Join',
            type: 'sql_query',
            isCompleted: false,
            points: 30
          },
          {
            id: '11',
            title: 'Left و Right Join',
            type: 'sql_query',
            isCompleted: false,
            points: 35
          }
        ]
      }
    ]
  };

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setCourse(mockCourse);
      setIsLoading(false);
    }, 1000);
  }, [courseId]);

  const getItemIcon = (type: string) => {
    switch (type) {
      case 'sql_query':
      case 'sql_file_upload':
        return Database;
      case 'multiple_choice':
      case 'true_false':
        return HelpCircle;
      case 'short_answer':
      case 'descriptive':
        return FileText;
      default:
        return Circle;
    }
  };

  const getItemTypeText = (type: string) => {
    switch (type) {
      case 'sql_query': return 'کوئری SQL';
      case 'sql_file_upload': return 'آپلود فایل SQL';
      case 'multiple_choice': return 'چند گزینه‌ای';
      case 'true_false': return 'درست و غلط';
      case 'short_answer': return 'پاسخ کوتاه';
      case 'descriptive': return 'تشریحی';
      default: return type;
    }
  };

  const handleItemClick = (moduleId: string, itemId: string) => {
    navigate(`/course/${courseId}/module/${moduleId}/item/${itemId}`);
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (!course) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-2xl mb-4">درس یافت نشد</h1>
        <Button onClick={() => navigate('/courses')}>بازگشت به دروس</Button>
      </div>
    );
  }

  const totalItems = course.modules.reduce((sum, module) => sum + module.items.length, 0);
  const completedItems = course.modules.reduce((sum, module) => sum + module.completedItems, 0);
  const progressPercentage = totalItems > 0 ? (completedItems / totalItems) * 100 : 0;

  return (
    <div className="container mx-auto px-4 py-8" dir="rtl">
      {/* Breadcrumb - Always top left for RTL */}
      <div className="mb-6 flex justify-end">
        <Button variant="ghost" onClick={() => navigate('/courses')} className="pl-0 flex items-center gap-2">
          <span>بازگشت به دروس</span>
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>

      {/* Course Header - RTL aligned */}
      <Card className="mb-8">
        <CardHeader>
          <div className="flex flex-col lg:flex-row lg:items-start gap-6">
            <div className="flex-1">
              {/* Course title and icon - right aligned */}
              <div className="flex items-center justify-end gap-4 mb-4">
                <div className="text-right">
                  <CardTitle className="text-3xl text-right">{course.title}</CardTitle>
                  <Badge variant="secondary" className="mt-2">
                    {course.difficulty}
                  </Badge>
                </div>
                <BookOpen className="h-8 w-8 text-blue-600" />
              </div>
              
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed text-right">
                {course.description}
              </p>
              
              {/* Instructor and semester - right aligned */}
              <div className="flex flex-wrap gap-6 text-muted-foreground justify-end">
                <div className="flex items-center gap-2">
                  <span>{course.instructor}</span>
                  <Avatar className="h-8 w-8">
                    <AvatarFallback>
                      <User className="h-4 w-4" />
                    </AvatarFallback>
                  </Avatar>
                </div>
                <div className="flex items-center gap-2">
                  <span>{course.semester}</span>
                  <Clock className="h-4 w-4" />
                </div>
              </div>
            </div>
            
            {course.isEnrolled && (
              <Card className="lg:w-80">
                <CardContent className="p-6">
                  <h3 className="mb-4 text-right">پیشرفت کلی</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span>{completedItems} از {totalItems}</span>
                      <span>تکمیل شده</span>
                    </div>
                    <Progress value={progressPercentage} className="h-3" />
                    <div className="text-center text-2xl text-blue-600">
                      {Math.round(progressPercentage)}%
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </CardHeader>
      </Card>

      {/* Modules */}
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl text-right">ماژول‌های درس</CardTitle>
        </CardHeader>
        <CardContent>
          <Accordion type="multiple" className="w-full">
            {course.modules.map((module) => (
              <AccordionItem key={module.id} value={module.id}>
                <AccordionTrigger className="text-lg hover:no-underline">
                  <div className="flex items-center justify-between w-full mr-4">
                    {/* Module name and icon on right (first in RTL) */}
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                        <BookOpen className="h-5 w-5 text-blue-600" />
                      </div>
                      <div className="text-right">
                        <div className="font-semibold text-right">{module.title}</div>
                        <div className="text-sm text-muted-foreground text-right">
                          {module.description}
                        </div>
                      </div>
                    </div>
                    
                    {/* Progress bar on left (second in RTL) */}
                    <div className="flex items-center gap-3">
                      <Badge variant="outline">
                        {module.completedItems} از {module.items.length}
                      </Badge>
                      <Progress 
                        value={(module.completedItems / module.items.length) * 100} 
                        className="w-20 h-2"
                      />
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="mt-4 space-y-2">
                    {module.items.map((item) => {
                      const ItemIcon = getItemIcon(item.type);
                      return (
                        <div
                          key={item.id}
                          className="flex items-center justify-between p-4 rounded-lg border hover:bg-muted/50 cursor-pointer transition-colors"
                          onClick={() => handleItemClick(module.id, item.id)}
                        >
                          {/* Item status on left */}
                          <div className="flex items-center gap-2">
                            <ChevronRight className="h-4 w-4 text-muted-foreground" />
                            {item.isCompleted ? (
                              <CheckCircle className="h-5 w-5 text-green-600" />
                            ) : (
                              <Circle className="h-5 w-5 text-gray-400" />
                            )}
                          </div>
                          
                          {/* Item name and icon on right */}
                          <div className="flex items-center gap-3">
                            <div className="text-right">
                              <div className="font-medium text-right">{item.title}</div>
                              <div className="text-sm text-muted-foreground text-right">
                                {getItemTypeText(item.type)} • {item.points} امتیاز
                              </div>
                            </div>
                            <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                              <ItemIcon className="h-4 w-4 text-gray-600" />
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </CardContent>
      </Card>
    </div>
  );
}