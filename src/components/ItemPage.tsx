import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Progress } from './ui/progress';
import { Badge } from './ui/badge';
import { Textarea } from './ui/textarea';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Label } from './ui/label';
import { Input } from './ui/input';
import { 
  ChevronRight, 
  Play, 
  Upload, 
  CheckCircle, 
  AlertCircle,
  Database,
  FileText,
  Save
} from 'lucide-react';
import { LoadingSpinner } from './LoadingSpinner';
import { toast } from 'sonner';

interface Item {
  id: string;
  title: string;
  type: 'sql_query' | 'sql_file_upload' | 'multiple_choice' | 'short_answer' | 'descriptive' | 'true_false';
  description: string;
  points: number;
  isCompleted: boolean;
  expectedOutput?: any[];
  options?: string[];
  correctAnswer?: string;
}

export function ItemPage() {
  const { courseId, moduleId, itemId } = useParams();
  const navigate = useNavigate();
  const [item, setItem] = useState<Item | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [sqlCode, setSqlCode] = useState('SELECT * FROM users WHERE active = 1;');
  const [queryResult, setQueryResult] = useState<any[] | null>(null);
  const [queryError, setQueryError] = useState<string | null>(null);
  const [isRunning, setIsRunning] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [shortAnswer, setShortAnswer] = useState('');
  const [descriptiveAnswer, setDescriptiveAnswer] = useState('');
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  // Mock item data with different types
  const getItemData = (id: string) => {
    const items: { [key: string]: Item } = {
      '1': {
        id: '1',
        title: 'تعریف پایگاه داده',
        type: 'multiple_choice',
        description: 'پایگاه داده چیست؟ بهترین تعریف را انتخاب کنید.',
        points: 10,
        isCompleted: false,
        options: [
          'مجموعه‌ای از فایل‌های متنی',
          'مجموعه‌ای سازمان‌یافته از داده‌ها که به‌طور منطقی مرتبط هستند',
          'نرم‌افزاری برای ایجاد گزارش',
          'سیستم‌عاملی برای کامپیوتر'
        ],
        correctAnswer: 'مجموعه‌ای سازمان‌یافته از داده‌ها که به‌طور منطقی مرتبط هستند'
      },
      '2': {
        id: '2',
        title: 'انواع پایگاه داده',
        type: 'descriptive',
        description: 'انواع مختلف پایگاه داده را نام ببرید و هر کدام را به‌طور مختصر توضیح دهید. (حداقل ۱۰۰ کلمه)',
        points: 15,
        isCompleted: false
      },
      '3': {
        id: '3',
        title: 'مزایای استفاده از پایگاه داده',
        type: 'true_false',
        description: 'پایگاه داده‌ها از تکرار داده‌ها جلوگیری می‌کنند.',
        points: 8,
        isCompleted: false
      },
      '4': {
        id: '4',
        title: 'نام DBMS',
        type: 'short_answer',
        description: 'نام یک سیستم مدیریت پایگاه داده (DBMS) محبوب بنویسید.',
        points: 20,
        isCompleted: false
      },
      '5': {
        id: '5',
        title: 'دستور SELECT پایه',
        type: 'sql_query',
        description: 'کوئری SQL بنویسید که تمام کاربران فعال (active = 1) را از جدول users بازگرداند. جدول users دارای ستون‌های id, name, email, active است.',
        points: 25,
        isCompleted: false,
        expectedOutput: [
          { id: 1, name: 'علی احمدی', email: 'ali@example.com', active: 1 },
          { id: 3, name: 'سارا رضایی', email: 'sara@example.com', active: 1 }
        ]
      }
    };
    return items[id] || items['5']; // Default to SQL query
  };

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setItem(getItemData(itemId || '1'));
      setIsLoading(false);
    }, 1000);
  }, [itemId]);

  const handleRunQuery = async () => {
    setIsRunning(true);
    setQueryError(null);
    
    // Simulate query execution
    setTimeout(() => {
      try {
        if (sqlCode.toLowerCase().includes('select') && sqlCode.toLowerCase().includes('active = 1')) {
          setQueryResult([
            { id: 1, name: 'علی احمدی', email: 'ali@example.com', active: 1 },
            { id: 3, name: 'سارا رضایی', email: 'sara@example.com', active: 1 }
          ]);
          toast.success('کوئری با موفقیت اجرا شد');
        } else {
          setQueryError('کوئری صحیح نیست. لطفاً شرط active = 1 را اضافه کنید.');
        }
      } catch (error) {
        setQueryError('خطا در اجرای کوئری');
      }
      setIsRunning(false);
    }, 2000);
  };

  const handleSubmit = () => {
    // Handle submission based on item type
    toast.success('پاسخ شما ثبت شد');
    navigate(`/course/${courseId}`);
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.name.endsWith('.sql')) {
      setUploadedFile(file);
      toast.success('فایل با موفقیت انتخاب شد');
    } else {
      toast.error('لطفاً یک فایل SQL انتخاب کنید');
    }
  };

  // SQL syntax highlighting function (basic)
  const highlightSQL = (code: string) => {
    const keywords = ['SELECT', 'FROM', 'WHERE', 'INSERT', 'UPDATE', 'DELETE', 'JOIN', 'INNER', 'LEFT', 'RIGHT', 'ON', 'AND', 'OR', 'ORDER BY', 'GROUP BY', 'HAVING'];
    let highlighted = code;
    
    keywords.forEach(keyword => {
      const regex = new RegExp(`\\b${keyword}\\b`, 'gi');
      highlighted = highlighted.replace(regex, `<span style="color: #0066cc; font-weight: bold;">${keyword}</span>`);
    });
    
    return highlighted;
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (!item) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-2xl mb-4">تمرین یافت نشد</h1>
        <Button onClick={() => navigate(`/course/${courseId}`)}>بازگشت به درس</Button>
      </div>
    );
  }

  const renderSQLQueryItem = () => (
    <div className="grid lg:grid-cols-2 gap-6 h-[calc(100vh-200px)]">
      {/* Left Panel - Code Editor */}
      <Card className="flex flex-col">
        <CardHeader>
          <div className="flex items-center justify-between">
            <Button onClick={handleRunQuery} disabled={isRunning}>
              {isRunning ? (
                <LoadingSpinner size="sm" />
              ) : (
                <Play className="mr-2 h-4 w-4" />
              )}
              اجرا
            </Button>
            <CardTitle className="flex items-center gap-2 text-right">
              ویرایشگر SQL
              <Database className="h-5 w-5" />
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent className="flex-1">
          <Textarea
            value={sqlCode}
            onChange={(e) => setSqlCode(e.target.value)}
            className="h-full font-mono text-sm resize-none"
            placeholder="کوئری SQL خود را اینجا بنویسید..."
            dir="ltr"
            style={{ textAlign: 'left' }}
          />
        </CardContent>
      </Card>

      {/* Right Panel */}
      <div className="flex flex-col gap-4">
        {/* Problem Statement */}
        <Card className="h-1/3">
          <CardHeader>
            <CardTitle className="text-right">صورت مسئله</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="leading-relaxed text-right">{item.description}</p>
          </CardContent>
        </Card>

        {/* Results Tabs */}
        <Card className="flex-1">
          <CardContent className="p-0 h-full">
            <Tabs defaultValue="expected" className="h-full flex flex-col">
              <TabsList className="grid w-full grid-cols-2 rounded-t-lg rounded-b-none">
                <TabsTrigger value="result">نتیجه شما</TabsTrigger>
                <TabsTrigger value="expected">خروجی مورد انتظار</TabsTrigger>
              </TabsList>
              
              <TabsContent value="expected" className="flex-1 p-4 overflow-auto">
                {item.expectedOutput && (
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse border border-border rounded">
                      <thead>
                        <tr className="bg-muted">
                          {Object.keys(item.expectedOutput[0] || {}).map((key) => (
                            <th key={key} className="border border-border p-2 text-center">
                              {key}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {item.expectedOutput.map((row, index) => (
                          <tr key={index}>
                            {Object.values(row).map((value, i) => (
                              <td key={i} className="border border-border p-2 text-center">
                                {value as React.ReactNode}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </TabsContent>
              
              <TabsContent value="result" className="flex-1 p-4 overflow-auto">
                {queryError ? (
                  <div className="flex items-center gap-2 text-red-600 bg-red-50 p-3 rounded">
                    <AlertCircle className="h-4 w-4" />
                    <span>{queryError}</span>
                  </div>
                ) : queryResult ? (
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse border border-border rounded">
                      <thead>
                        <tr className="bg-muted">
                          {Object.keys(queryResult[0] || {}).map((key) => (
                            <th key={key} className="border border-border p-2 text-center">
                              {key}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {queryResult.map((row, index) => (
                          <tr key={index}>
                            {Object.values(row).map((value, i) => (
                              <td key={i} className="border border-border p-2 text-center">
                                {value as React.ReactNode}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="text-center text-muted-foreground py-8">
                    <Database className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>کوئری خود را اجرا کنید تا نتیجه را مشاهده کنید</p>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const renderFileUploadItem = () => (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 justify-end text-right">
          آپلود فایل SQL
          <Upload className="h-5 w-5" />
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="bg-muted p-4 rounded-lg">
          <p className="leading-relaxed text-right">{item.description}</p>
        </div>
        
        <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
          {uploadedFile ? (
            <div className="space-y-4">
              <CheckCircle className="h-12 w-12 text-green-600 mx-auto" />
              <div>
                <p className="font-medium">{uploadedFile.name}</p>
                <p className="text-sm text-muted-foreground">
                  {Math.round(uploadedFile.size / 1024)} KB
                </p>
              </div>
              <Button variant="outline" onClick={() => setUploadedFile(null)}>
                انتخاب فایل دیگر
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              <Upload className="h-12 w-12 text-muted-foreground mx-auto" />
              <div>
                <p className="text-lg mb-2">فایل SQL خود را اینجا بکشید</p>
                <p className="text-muted-foreground">یا کلیک کنید تا فایل انتخاب کنید</p>
              </div>
              <input
                type="file"
                accept=".sql"
                onChange={handleFileUpload}
                className="hidden"
                id="sql-file-upload"
              />
              <Button asChild>
                <label htmlFor="sql-file-upload" className="cursor-pointer">
                  انتخاب فایل
                </label>
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );

  const renderQuizItem = () => (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 justify-end text-right">
          {item.type === 'multiple_choice' ? 'سوال چند گزینه‌ای' :
           item.type === 'true_false' ? 'درست و غلط' :
           item.type === 'short_answer' ? 'پاسخ کوتاه' :
           'سوال تشریحی'}
          <FileText className="h-5 w-5" />
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="bg-muted p-4 rounded-lg">
          <p className="leading-relaxed text-right">{item.description}</p>
        </div>

        {item.type === 'multiple_choice' && item.options && (
          <RadioGroup value={selectedAnswer} onValueChange={setSelectedAnswer}>
            {item.options.map((option, index) => (
              <div key={index} className="flex items-center space-x-2 space-x-reverse justify-end">
                <Label htmlFor={option} className="text-right">{option}</Label>
                <RadioGroupItem value={option} id={option} />
              </div>
            ))}
          </RadioGroup>
        )}

        {item.type === 'true_false' && (
          <RadioGroup value={selectedAnswer} onValueChange={setSelectedAnswer}>
            <div className="flex items-center space-x-2 space-x-reverse justify-end">
              <Label htmlFor="true" className="text-right">درست</Label>
              <RadioGroupItem value="true" id="true" />
            </div>
            <div className="flex items-center space-x-2 space-x-reverse justify-end">
              <Label htmlFor="false" className="text-right">غلط</Label>
              <RadioGroupItem value="false" id="false" />
            </div>
          </RadioGroup>
        )}

        {item.type === 'short_answer' && (
          <Input
            value={shortAnswer}
            onChange={(e) => setShortAnswer(e.target.value)}
            placeholder="پاسخ خود را وارد کنید..."
            className="text-right"
            dir="rtl"
          />
        )}

        {item.type === 'descriptive' && (
          <Textarea
            value={descriptiveAnswer}
            onChange={(e) => setDescriptiveAnswer(e.target.value)}
            placeholder="پاسخ تشریحی خود را وارد کنید..."
            className="min-h-32 text-right"
            dir="rtl"
          />
        )}
      </CardContent>
    </Card>
  );

  return (
    <div className="container mx-auto px-4 py-8" dir="rtl">
      {/* Header - Back button always top left for RTL */}
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Badge>
            {item.points} امتیاز
          </Badge>
          <Badge variant="outline">
            تمرین {itemId} از ماژول {moduleId}
          </Badge>
        </div>
        
        <Button variant="ghost" onClick={() => navigate(`/course/${courseId}`)} className="pl-0 flex items-center gap-2">
          <span>بازگشت به درس</span>
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>

      {/* Progress Bar */}
      <Card className="mb-6">
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-muted-foreground">
              پیشرفت در ماژول: 3 از 10
            </span>
            <h2 className="text-xl text-right">{item.title}</h2>
          </div>
          <Progress value={30} className="h-2" />
        </CardContent>
      </Card>

      {/* Item Content */}
      <div className="mb-6">
        {item.type === 'sql_query' && renderSQLQueryItem()}
        {item.type === 'sql_file_upload' && renderFileUploadItem()}
        {(['multiple_choice', 'true_false', 'short_answer', 'descriptive'] as string[]).includes(item.type) && renderQuizItem()}
      </div>

      {/* Submit Button */}
      <div className="text-center">
        <Button 
          size="lg" 
          onClick={handleSubmit}
          className="px-8"
          disabled={
            (item.type === 'sql_file_upload' && !uploadedFile) ||
            (item.type === 'multiple_choice' && !selectedAnswer) ||
            (item.type === 'true_false' && !selectedAnswer) ||
            (item.type === 'short_answer' && !shortAnswer.trim()) ||
            (item.type === 'descriptive' && !descriptiveAnswer.trim())
          }
        >
          <Save className="mr-2 h-4 w-4" />
          ثبت پاسخ
        </Button>
      </div>
    </div>
  );
}