import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "./context/LanguageContext";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Diagnostic from "./pages/Diagnostic";
import ProtectedRoute from "./components/admin/ProtectedRoute";
import AdminLayout from "./components/admin/AdminLayout";
import Dashboard from "./pages/admin/Dashboard";
import GalleryManager from "./pages/admin/GalleryManager";
import GramSabhaManager from "./pages/admin/GramSabhaManager";
import MembersManager from "./pages/admin/MembersManager";
import VideosManager from "./pages/admin/VideosManager";
import VideosDiagnostic from "./pages/admin/VideosDiagnostic";
import SuccessStoriesManager from "./pages/admin/SuccessStoriesManager";
import SuccessStoriesDiagnostic from "./pages/admin/SuccessStoriesDiagnostic";
import AwardsManager from "./pages/admin/AwardsManager";
import AnnouncementsManager from "./pages/admin/AnnouncementsManager";
import SettingsManager from "./pages/admin/SettingsManager";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <LanguageProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
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
        </BrowserRouter>
      </TooltipProvider>
    </LanguageProvider>
  </QueryClientProvider>
);

export default App;
