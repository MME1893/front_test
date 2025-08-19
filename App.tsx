import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'sonner@2.0.3';
import { Header } from './components/Header';
import { LandingPage } from './components/LandingPage';
import { CoursesPage } from './components/CoursesPage';
import { CourseDetailPage } from './components/CourseDetailPage';
import { ItemPage } from './components/ItemPage';
import { ProfilePage } from './components/ProfilePage';
import { LoginPage } from './components/auth/LoginPage';
import { RegisterPage } from './components/auth/RegisterPage';
import { AdminPanel } from './components/admin/AdminPanel';
import { LoadingSpinner } from './components/LoadingSpinner';

export default function App() {
  return (
    <div className="min-h-screen bg-background" dir="rtl" style={{ fontFamily: '"Vazirmatn", "Tahoma", sans-serif' }}>
      <Router>
        <Header />
        <main>
          <Suspense fallback={<LoadingSpinner />}>
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/courses" element={<CoursesPage />} />
              <Route path="/course/:courseId" element={<CourseDetailPage />} />
              <Route path="/course/:courseId/module/:moduleId/item/:itemId" element={<ItemPage />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/admin/*" element={<AdminPanel />} />
            </Routes>
          </Suspense>
        </main>
        <Toaster position="top-center" richColors />
      </Router>
    </div>
  );
}