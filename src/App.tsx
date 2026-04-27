import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import FloatingContactButton from './components/FloatingContactButton';
import './App.css';

// Lazy load secondary pages
const About = lazy(() => import('./pages/About'));
const Contact = lazy(() => import('./pages/Contact'));
const Services = lazy(() => import('./pages/Services'));
const CaseStudies = lazy(() => import('./pages/CaseStudies'));
const CaseStudyDetail = lazy(() => import('./pages/CaseStudyDetail'));
const Blog = lazy(() => import('./pages/Blog'));
const BlogDetail = lazy(() => import('./pages/BlogDetail'));
const FirstHomeBuyers = lazy(() => import('./pages/FirstHomeBuyers'));
const PropertyInvestors = lazy(() => import('./pages/PropertyInvestors'));
const SmsfProperty = lazy(() => import('./pages/SmsfProperty'));

// Loading component for Suspense
const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-sky-50">
    <div className="w-16 h-16 border-4 border-sky-200 border-t-sky-600 rounded-full animate-spin"></div>
  </div>
);

function App() {
  return (
    <div className="min-h-screen font-sans selection:bg-gold/30 selection:text-black bg-sky-50 flex flex-col">
      <Navbar />
      <main className="flex-1">
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/services" element={<Services />} />
            <Route path="/services/first-home-buyers" element={<FirstHomeBuyers />} />
            <Route path="/services/property-investors" element={<PropertyInvestors />} />
            <Route path="/services/smsf-property" element={<SmsfProperty />} />
            <Route path="/case-studies" element={<CaseStudies />} />
            <Route path="/case-studies/:id" element={<CaseStudyDetail />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<BlogDetail />} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
      <FloatingContactButton />
    </div>
  );
}

export default App;
