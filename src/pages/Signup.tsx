import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabaseClient";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";

const Signup = () => {
    const [email, setEmail] = useState("aplegolegaon@gmail.com");
    const [password, setPassword] = useState("Aplegolegaon@1972");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSignup = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const { data, error } = await supabase.auth.signUp({
                email,
                password,
                options: {
                    emailRedirectTo: `${window.location.origin}/login`,
                }
            });

            if (error) throw error;

            if (data.user) {
                toast.success("Account created successfully! Please check your email to confirm.");
                console.log("User created:", data.user);
                // Navigate to login after 2 seconds
                setTimeout(() => navigate("/login"), 2000);
            }
        } catch (error: any) {
            toast.error(error.message || "Failed to create account");
            console.error("Signup error:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
            <Card className="w-full max-w-md">
                <CardHeader className="text-center">
                    <CardTitle className="text-2xl font-bold text-primary">Create Admin Account</CardTitle>
                    <p className="text-sm text-muted-foreground mt-2">
                        Sign up to create your admin account
                    </p>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSignup} className="space-y-4">
                        <div className="space-y-2">
                            <label htmlFor="email" className="text-sm font-medium">
                                Email
                            </label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="admin@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <label htmlFor="password" className="text-sm font-medium">
                                Password
                            </label>
                            <Input
                                id="password"
                                type="password"
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                minLength={6}
                            />
                            <p className="text-xs text-muted-foreground">
                                Password must be at least 6 characters
                            </p>
                        </div>
                        <Button type="submit" className="w-full" disabled={loading}>
                            {loading ? "Creating Account..." : "Create Account"}
                        </Button>
                        <div className="text-center text-sm">
                            <span className="text-muted-foreground">Already have an account? </span>
                            <a href="/login" className="text-primary hover:underline">
                                Login here
                            </a>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
};

export default Signup;
