import { useState } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabaseClient";
import {
    LayoutDashboard,
    Image,
    Users,
    FileText,
    Settings,
    LogOut,
    Menu,
    X
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const AdminLayout = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();

    const handleLogout = async () => {
        const { error } = await supabase.auth.signOut();
        if (error) {
            toast.error("Failed to logout");
        } else {
            toast.success("Logged out successfully");
            navigate("/login");
        }
    };

    const navItems = [
        { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
        { name: "Gallery", href: "/admin/gallery", icon: Image },
        { name: "Gram Sabha", href: "/admin/gram-sabha", icon: FileText },
        { name: "Members", href: "/admin/members", icon: Users },
        { name: "Settings", href: "/admin/settings", icon: Settings },
    ];

    return (
        <div className="min-h-screen bg-gray-100 flex">
            {/* Mobile Sidebar Overlay */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 md:hidden"
                    onClick={() => setIsSidebarOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside
                className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out md:translate-x-0 md:static md:inset-auto ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"
                    }`}
            >
                <div className="h-full flex flex-col">
                    <div className="p-6 border-b flex items-center justify-between">
                        <h1 className="text-xl font-bold text-primary">Admin Panel</h1>
                        <button
                            onClick={() => setIsSidebarOpen(false)}
                            className="md:hidden text-gray-500 hover:text-gray-700"
                        >
                            <X className="w-6 h-6" />
                        </button>
                    </div>

                    <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
                        {navItems.map((item) => {
                            const Icon = item.icon;
                            const isActive = location.pathname === item.href;
                            return (
                                <Link
                                    key={item.href}
                                    to={item.href}
                                    onClick={() => setIsSidebarOpen(false)}
                                    className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${isActive
                                            ? "bg-primary text-white"
                                            : "text-gray-700 hover:bg-gray-100"
                                        }`}
                                >
                                    <Icon className="w-5 h-5" />
                                    <span className="font-medium">{item.name}</span>
                                </Link>
                            );
                        })}
                    </nav>

                    <div className="p-4 border-t">
                        <Button
                            variant="outline"
                            className="w-full flex items-center gap-2 text-red-600 hover:text-red-700 hover:bg-red-50 border-red-200"
                            onClick={handleLogout}
                        >
                            <LogOut className="w-4 h-4" />
                            Logout
                        </Button>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
                {/* Mobile Header */}
                <header className="bg-white shadow-sm p-4 md:hidden flex items-center justify-between">
                    <h1 className="text-lg font-bold text-gray-800">
                        {navItems.find(item => item.href === location.pathname)?.name || "Admin"}
                    </h1>
                    <button
                        onClick={() => setIsSidebarOpen(true)}
                        className="text-gray-600 hover:text-primary"
                    >
                        <Menu className="w-6 h-6" />
                    </button>
                </header>

                <div className="flex-1 overflow-auto p-4 md:p-8">
                    <Outlet />
                </div>
            </main>
        </div>
    );
};

export default AdminLayout;
