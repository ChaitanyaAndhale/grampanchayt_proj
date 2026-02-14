import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import { Loader } from "@/components/ui/loader";
import { LanguageProvider } from "./context/LanguageContext";
const Index = lazy(() => import("./pages/Index"));
const Login = lazy(() => import("./pages/Login"));
const Signup = lazy(() => import("./pages/Signup"));
const Diagnostic = lazy(() => import("./pages/Diagnostic"));
const ProtectedRoute = lazy(() => import("./components/admin/ProtectedRoute"));
const AdminLayout = lazy(() => import("./components/admin/AdminLayout"));
const Dashboard = lazy(() => import("./pages/admin/Dashboard"));
const GalleryManager = lazy(() => import("./pages/admin/GalleryManager"));
const GramSabhaManager = lazy(() => import("./pages/admin/GramSabhaManager"));
const MembersManager = lazy(() => import("./pages/admin/MembersManager"));
const VideosManager = lazy(() => import("./pages/admin/VideosManager"));
const VideosDiagnostic = lazy(() => import("./pages/admin/VideosDiagnostic"));
const SuccessStoriesManager = lazy(() => import("./pages/admin/SuccessStoriesManager"));
const SuccessStoriesDiagnostic = lazy(() => import("./pages/admin/SuccessStoriesDiagnostic"));
const AwardsManager = lazy(() => import("./pages/admin/AwardsManager"));
const AnnouncementsManager = lazy(() => import("./pages/admin/AnnouncementsManager"));
const SettingsManager = lazy(() => import("./pages/admin/SettingsManager"));
const NotFound = lazy(() => import("./pages/NotFound"));

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <LanguageProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Suspense fallback={<Loader />}>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/diagnostic" element={<Diagnostic />} />

              {/* Admin Routes */}
              <Route path="/admin" element={<ProtectedRoute />}>
                <Route element={<AdminLayout />}>
                  <Route index element={<Dashboard />} />
                  <Route path="gallery" element={<GalleryManager />} />
                  <Route path="gram-sabha" element={<GramSabhaManager />} />
                  <Route path="members" element={<MembersManager />} />
                  <Route path="videos" element={<VideosManager />} />
                  <Route path="videos-diagnostic" element={<VideosDiagnostic />} />
                  <Route path="success-stories" element={<SuccessStoriesManager />} />
                  <Route path="success-stories-diagnostic" element={<SuccessStoriesDiagnostic />} />
                  <Route path="awards" element={<AwardsManager />} />
                  <Route path="announcements" element={<AnnouncementsManager />} />
                  <Route path="settings" element={<SettingsManager />} />
                </Route>
              </Route>

              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </TooltipProvider>
    </LanguageProvider>
  </QueryClientProvider>
);

export default App;
