import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Button } from './ui/button';
import { 
  User, 
  BookOpen, 
  Trophy, 
  Clock, 
  CheckCircle, 
  Star,
  Calendar,
  Target
} from 'lucide-react';

export function ProfilePage() {
  const user = {
    name: 'علی احمدی',
    studentId: '98123456',
    email: 'ali.ahmadi@university.ac.ir',
    joinDate: '۱۴۰۲/۰۸/۱۵',
    totalCourses: 3,
    completedCourses: 1,
    totalItems: 185,
    completedItems: 89,
    totalPoints: 1250,
    badges: ['sql_master', 'fast_learner', 'consistent']
  };

  const enrolledCourses = [
    {
      id: '1',
      title: 'مبانی پایگاه داده',
      progress: 51,
      lastActivity: '۲ روز پیش',
      status: 'در حال انجام'
    },
    {
      id: '2',
      title: 'پایگاه داده پیشرفته',
      progress: 8,
      lastActivity: '۱ هفته پیش',
      status: 'در حال انجام'
    },
    {
      id: '3',
      title: 'طراحی سیستم‌های پایگاه داده',
      progress: 100,
      lastActivity: '۱ ماه پیش',
      status: 'تکمیل شده'
    }
  ];

  const recentActivity = [
    {
      type: 'completed',
      title: 'تکمیل تمرین "دستور JOIN"',
      course: 'مبانی پایگاه داده',
      date: '۲ روز پیش',
      points: 25
    },
    {
      type: 'started',
      title: 'شروع ماژول "SQL پیشرفته"',
      course: 'پایگاه داده پیشرفته',
      date: '۱ هفته پیش',
      points: 0
    },
    {
      type: 'badge',
      title: 'دریافت نشان "استاد SQL"',
      course: '',
      date: '۲ هفته پیش',
      points: 100
    }
  ];

  const getBadgeInfo = (badge: string) => {
    switch (badge) {
      case 'sql_master':
        return { name: 'استاد SQL', color: 'bg-blue-100 text-blue-800' };
      case 'fast_learner':
        return { name: 'یادگیرنده سریع', color: 'bg-green-100 text-green-800' };
      case 'consistent':
        return { name: 'منظم', color: 'bg-purple-100 text-purple-800' };
      default:
        return { name: badge, color: 'bg-gray-100 text-gray-800' };
    }
  };

  const overallProgress = Math.round((user.completedItems / user.totalItems) * 100);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Left Column - Profile Info */}
        <div className="lg:col-span-1 space-y-6">
          {/* Profile Card */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-4">
                <Avatar className="h-20 w-20">
                  <AvatarFallback className="text-2xl">
                    <User className="h-10 w-10" />
                  </AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle className="text-2xl">{user.name}</CardTitle>
                  <p className="text-muted-foreground">شماره دانشجویی: {user.studentId}</p>
                  <p className="text-muted-foreground">{user.email}</p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  <span>عضو از: {user.joinDate}</span>
                </div>
                
                <div className="pt-4 border-t">
                  <h4 className="mb-3">نشان‌های کسب شده</h4>
                  <div className="flex flex-wrap gap-2">
                    {user.badges.map((badge) => {
                      const badgeInfo = getBadgeInfo(badge);
                      return (
                        <Badge key={badge} className={badgeInfo.color}>
                          <Trophy className="ml-1 h-3 w-3" />
                          {badgeInfo.name}
                        </Badge>
                      );
                    })}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Statistics Card */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5" />
                آمار کلی
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="text-center">
                  <div className="text-3xl text-blue-600 mb-2">{overallProgress}%</div>
                  <p className="text-muted-foreground">پیشرفت کلی</p>
                  <Progress value={overallProgress} className="mt-2" />
                </div>
                
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <div className="text-2xl">{user.completedCourses}</div>
                    <p className="text-sm text-muted-foreground">دروس تکمیل شده</p>
                  </div>
                  <div>
                    <div className="text-2xl">{user.totalPoints}</div>
                    <p className="text-sm text-muted-foreground">امتیاز کل</p>
                  </div>
                  <div>
                    <div className="text-2xl">{user.completedItems}</div>
                    <p className="text-sm text-muted-foreground">تمرین‌های حل شده</p>
                  </div>
                  <div>
                    <div className="text-2xl">{user.badges.length}</div>
                    <p className="text-sm text-muted-foreground">نشان‌ها</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Courses and Activity */}
        <div className="lg:col-span-2 space-y-6">
          {/* Enrolled Courses */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5" />
                دروس من
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {enrolledCourses.map((course) => (
                  <div key={course.id} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-semibold">{course.title}</h4>
                      <Badge variant={course.status === 'تکمیل شده' ? 'default' : 'secondary'}>
                        {course.status}
                      </Badge>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="flex justify-between text-sm">
                        <span>پیشرفت: {course.progress}%</span>
                        <span className="text-muted-foreground">
                          آخرین فعالیت: {course.lastActivity}
                        </span>
                      </div>
                      <Progress value={course.progress} className="h-2" />
                    </div>
                    
                    <div className="mt-3 flex justify-end">
                      <Button size="sm" variant="outline">
                        {course.status === 'تکمیل شده' ? 'مرور' : 'ادامه'}
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                فعالیت‌های اخیر
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-start gap-4 pb-4 border-b last:border-b-0">
                    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                      {activity.type === 'completed' && <CheckCircle className="h-4 w-4 text-green-600" />}
                      {activity.type === 'started' && <BookOpen className="h-4 w-4 text-blue-600" />}
                      {activity.type === 'badge' && <Trophy className="h-4 w-4 text-yellow-600" />}
                    </div>
                    
                    <div className="flex-1">
                      <h4 className="font-medium">{activity.title}</h4>
                      {activity.course && (
                        <p className="text-sm text-muted-foreground">{activity.course}</p>
                      )}
                      <div className="flex items-center justify-between mt-1">
                        <span className="text-sm text-muted-foreground">{activity.date}</span>
                        {activity.points > 0 && (
                          <Badge variant="outline">
                            <Star className="ml-1 h-3 w-3" />
                            +{activity.points} امتیاز
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}