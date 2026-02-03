import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Image, Users, FileText, Settings } from "lucide-react";
import { Link } from "react-router-dom";

const Dashboard = () => {
    const stats = [
        { name: "Gallery Images", value: "Manage", icon: Image, href: "/admin/gallery", color: "text-blue-600", bg: "bg-blue-100" },
        { name: "Gram Sabha", value: "Records", icon: FileText, href: "/admin/gram-sabha", color: "text-green-600", bg: "bg-green-100" },
        { name: "Members", value: "Council", icon: Users, href: "/admin/members", color: "text-purple-600", bg: "bg-purple-100" },
        { name: "Settings", value: "Config", icon: Settings, href: "/admin/settings", color: "text-orange-600", bg: "bg-orange-100" },
    ];

    return (
        <div className="space-y-6">
            <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {stats.map((stat) => {
                    const Icon = stat.icon;
                    return (
                        <Link key={stat.name} to={stat.href}>
                            <Card className="hover:shadow-lg transition-shadow cursor-pointer border-none shadow-md">
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium">
                                        {stat.name}
                                    </CardTitle>
                                    <div className={`p-2 rounded-full ${stat.bg}`}>
                                        <Icon className={`h-4 w-4 ${stat.color}`} />
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold">{stat.value}</div>
                                </CardContent>
                            </Card>
                        </Link>
                    );
                })}
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <Card className="col-span-4 border-none shadow-md">
                    <CardHeader>
                        <CardTitle>Welcome to Admin Panel</CardTitle>
                    </CardHeader>
                    <CardContent className="pl-2">
                        <p className="text-muted-foreground px-4">
                            Use the sidebar to navigate between different sections. You can manage gallery images,
                            gram sabha records, panchayat members, and site settings from here.
                        </p>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default Dashboard;
