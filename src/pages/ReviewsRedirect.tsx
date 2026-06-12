import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function ReviewsRedirect() {
  const navigate = useNavigate();

  useEffect(() => {
    // Navigate to home page with the hash
    navigate('/#reviews', { replace: true });
    
    // Allow React Router to render the home page, then smooth scroll to the reviews section
    setTimeout(() => {
      const el = document.getElementById('reviews');
      if (el) {
        // Adjust scroll position to account for fixed navbar if necessary
        const y = el.getBoundingClientRect().top + window.scrollY - 100;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    }, 150);
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="w-10 h-10 border-4 border-gold/20 border-t-gold rounded-full animate-spin"></div>
    </div>
  );
}
