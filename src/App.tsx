import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from './components/ui/sonner';
import { AuthProvider } from './contexts/AuthContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomePage } from './components/HomePage';
import { BrowseItems } from './components/BrowseItems';
import { ItemDetail } from './components/ItemDetail';
import { LoginSignup } from './components/LoginSignup';
import { Dashboard } from './components/Dashboard';
import { ListItem } from './components/ListItem';
import { HowItWorks } from './components/HowItWorks';
import { Contact } from './components/Contact';
import { PrivacyPolicy } from './components/PrivacyPolicy';
import { TermsConditions } from './components/TermsConditions';

export default function App() {
  // Runtime environment check: ensure required Vite env vars are present
  const requiredEnv = [
    'VITE_APPWRITE_ENDPOINT',
    'VITE_APPWRITE_PROJECT',
    'VITE_DATABASE_ID',
    'VITE_COLLECTION_ITEMS_ID',
    'VITE_COLLECTION_BOOKINGS_ID',
    'VITE_BUCKET_IMAGES_ID',
  ];

  const missing = requiredEnv.filter((k) => {
    try {
      return !(import.meta.env as any)[k];
    } catch {
      return true;
    }
  });

  if (missing.length > 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
        <div className="max-w-xl w-full bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-2">Configuration error</h2>
          <p className="text-sm text-gray-600 mb-4">The site is missing required environment variables. Please ensure your deployment includes these Vite environment variables (see <code>.env.example</code> in the repo):</p>
          <ul className="list-disc pl-5 mb-4">
            {missing.map((m) => (
              <li key={m} className="text-sm text-red-600">{m} is not set</li>
            ))}
          </ul>
          <p className="text-sm text-gray-700">If you deployed to Netlify, open your site settings → Build & deploy → Environment and add the missing variables, then redeploy.</p>
        </div>
      </div>
    );
  }

  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen flex flex-col">
          <Navbar />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/browse" element={<BrowseItems />} />
              <Route path="/item/:id" element={<ItemDetail />} />
              <Route path="/login" element={<LoginSignup />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/list-item" element={<ListItem />} />
              <Route path="/how-it-works" element={<HowItWorks />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
              <Route path="/terms-conditions" element={<TermsConditions />} />
            </Routes>
          </main>
          <Footer />
          <Toaster position="top-right" />
        </div>
      </Router>
    </AuthProvider>
  );
}