import { lazy, Suspense } from 'react';
import { BrowserRouter, HashRouter, Route, Routes } from 'react-router-dom';
import { Layout } from './components/Layout';
import Home from './pages/Home';

const Vitamins = lazy(() => import('./pages/Vitamins'));
const VitaminDetail = lazy(() => import('./pages/VitaminDetail'));
const Calculator = lazy(() => import('./pages/Calculator'));
const Assessment = lazy(() => import('./pages/Assessment'));
const Interactions = lazy(() => import('./pages/Interactions'));
const Foods = lazy(() => import('./pages/Foods'));
const Compare = lazy(() => import('./pages/Compare'));
const Standards = lazy(() => import('./pages/Standards'));
const Pro = lazy(() => import('./pages/Pro'));
const Research = lazy(() => import('./pages/Research'));
const About = lazy(() => import('./pages/About'));
const NotFound = lazy(() => import('./pages/NotFound'));
const LearnIndex = lazy(() => import('./pages/Learn').then((m) => ({ default: m.LearnIndex })));
const LearnArticle = lazy(() => import('./pages/Learn').then((m) => ({ default: m.LearnArticle })));

// روی Vercel از BrowserRouter استفاده می‌شود؛ برای میزبان‌های بدون rewrite می‌توان VITE_ROUTER=hash گذاشت.
const Router = import.meta.env.VITE_ROUTER === 'hash' ? HashRouter : BrowserRouter;

export default function App() {
  return (
    <Router>
      <Layout>
        <Suspense fallback={<div className="wrap page muted">در حال بارگذاری…</div>}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/vitamins" element={<Vitamins />} />
            <Route path="/vitamins/:slug" element={<VitaminDetail />} />
            <Route path="/calculator" element={<Calculator />} />
            <Route path="/assessment" element={<Assessment />} />
            <Route path="/interactions" element={<Interactions />} />
            <Route path="/foods" element={<Foods />} />
            <Route path="/compare" element={<Compare />} />
            <Route path="/standards" element={<Standards />} />
            <Route path="/learn" element={<LearnIndex />} />
            <Route path="/learn/:slug" element={<LearnArticle />} />
            <Route path="/pro" element={<Pro />} />
            <Route path="/research" element={<Research />} />
            <Route path="/about" element={<About />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </Layout>
    </Router>
  );
}
