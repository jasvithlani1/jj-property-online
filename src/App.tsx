import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Services from './pages/Services';
import CaseStudies from './pages/CaseStudies';
import CaseStudyDetail from './pages/CaseStudyDetail';
import Blog from './pages/Blog';
import BlogDetail from './pages/BlogDetail';
import FirstHomeBuyers from './pages/FirstHomeBuyers';
import PropertyInvestors from './pages/PropertyInvestors';
import SmsfProperty from './pages/SmsfProperty';
import FloatingContactButton from './components/FloatingContactButton';
import './App.css';

function App() {
  return (
    <div className="min-h-screen font-sans selection:bg-sky-500/30 selection:text-black bg-sky-50 flex flex-col">
      <Navbar />
      <main className="flex-1">
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
      </main>
      <Footer />
      <FloatingContactButton />
    </div>
  );
}

export default App;
