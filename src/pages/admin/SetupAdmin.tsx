import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";

const SetupAdmin = () => {
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<string>("");

    const createAdmin = async () => {
        setLoading(true);
        try {
            const { data, error } = await supabase.auth.signUp({
                email: "aplegolegaon@gmail.com",
                password: "Aplegolegaon@1972",
            });

            if (error) {
                setResult(`Error: ${error.message}`);
                toast.error(`Error: ${error.message}`);
            } else {
                if (data.user) {
                    setResult(`Success! User created with ID: ${data.user.id}.`);
                    toast.success("Admin user created successfully!");
                } else {
                    setResult("User created but no data returned.");
                }
            }
        } catch (err: any) {
            setResult(`Unexpected error: ${err.message}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <Card className="w-[400px]">
                <CardHeader>
                    <CardTitle>Setup Admin User</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="text-sm text-muted-foreground">
                        Click below to create the admin user:
                        <br />
                        <strong>Email:</strong> aplegolegaon@gmail.com
                        <br />
                        <strong>Password:</strong> Aplegolegaon@1972
                    </div>
                    <Button onClick={createAdmin} disabled={loading} className="w-full">
                        {loading ? "Creating..." : "Create Admin User"}
                    </Button>
                    {result && (
                        <div className="p-4 bg-slate-100 rounded text-sm break-words">
                            {result}
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
};

export default SetupAdmin;
