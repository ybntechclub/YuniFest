import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { LenisProvider } from './components/layout/LenisProvider';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';

// Pages
import { HomePage } from './pages/HomePage';
import { EventsPage } from './pages/EventsPage';
import { SchedulePage } from './pages/SchedulePage';
import { RegulationsPage } from './pages/RegulationsPage';
import { LeadershipPage } from './pages/LeadershipPage';
import { RegisterPage } from './pages/RegisterPage';
import { RegisterSuccessPage } from './pages/RegisterSuccessPage';
import { MyPassPage } from './pages/MyPassPage';
import { AdminLoginPage } from './pages/AdminLoginPage';
import { AdminDashboardPage } from './pages/AdminDashboardPage';
import { NotFoundPage } from './pages/NotFoundPage';

// Scroll to top component on route changes
const ScrollToTop = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const id = hash.replace('#', '');
      const el = document.getElementById(id);
      if (el) {
        setTimeout(() => {
          if ((window as any).lenis) {
            (window as any).lenis.scrollTo(el, { offset: -70 });
          } else {
            el.scrollIntoView({ behavior: 'smooth' });
          }
        }, 50);
        return;
      }
    }

    if ((window as any).lenis) {
      (window as any).lenis.scrollTo(0, { immediate: true });
    }
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;

    const timer = setTimeout(() => {
      if (!hash) {
        if ((window as any).lenis) {
          (window as any).lenis.scrollTo(0, { immediate: true });
        }
        window.scrollTo(0, 0);
        document.documentElement.scrollTop = 0;
        document.body.scrollTop = 0;
      }
    }, 30);

    return () => clearTimeout(timer);
  }, [pathname, hash]);

  return null;
};

// Layout wrapper to conditionally show public Navbar & Footer
const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <div className="flex flex-col min-h-screen bg-[#07152F] text-slate-100 selection:bg-[#F5C451] selection:text-[#07152F]">
      {!isAdminRoute && <Navbar />}
      <main className="flex-grow">{children}</main>
      {!isAdminRoute && <Footer />}
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <LenisProvider>
        <ScrollToTop />
        <Layout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/events" element={<EventsPage />} />
            <Route path="/schedule" element={<SchedulePage />} />
            <Route path="/regulations" element={<RegulationsPage />} />
            <Route path="/leadership" element={<LeadershipPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/register/success" element={<RegisterSuccessPage />} />
            <Route path="/my-pass" element={<MyPassPage />} />
            <Route path="/admin/login" element={<AdminLoginPage />} />
            <Route path="/admin" element={<AdminDashboardPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Layout>
      </LenisProvider>
    </BrowserRouter>
  );
};

export default App;
