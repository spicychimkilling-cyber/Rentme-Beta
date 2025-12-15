import { ReactElement } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomePage } from './components/HomePage';
import { BrowseItems } from './components/BrowseItems';
import { ItemDetail } from './components/ItemDetail';
import { ListItem } from './components/ListItem';
import { Dashboard } from './components/Dashboard';
import { LoginSignup } from './components/LoginSignup';
import { HowItWorks } from './components/HowItWorks';
import { Contact } from './components/Contact';
import { TermsConditions } from './components/TermsConditions';
import { PrivacyPolicy } from './components/PrivacyPolicy';
import { useAuth } from './contexts/AuthContext';

function RequireAuth({ children }: { children: ReactElement }) {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return children;
}

function App() {
  return (
    <div className="bg-gray-50 text-foreground min-h-screen">
      <Navbar />
      <main className="min-h-screen">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/browse" element={<BrowseItems />} />
          <Route path="/item/:id" element={<ItemDetail />} />
          <Route
            path="/list-item"
            element={
              <RequireAuth>
                <ListItem />
              </RequireAuth>
            }
          />
          <Route
            path="/dashboard"
            element={
              <RequireAuth>
                <Dashboard />
              </RequireAuth>
            }
          />
          <Route path="/login" element={<LoginSignup />} />
          <Route path="/how-it-works" element={<HowItWorks />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/terms-conditions" element={<TermsConditions />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
