import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const DiagnosticPage = () => {
    const [diagnostics, setDiagnostics] = useState<any>({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const runDiagnostics = async () => {
            const results: any = {
                envVars: {
                    url: import.meta.env.VITE_SUPABASE_URL,
                    keyExists: !!import.meta.env.VITE_SUPABASE_ANON_KEY,
                    keyLength: import.meta.env.VITE_SUPABASE_ANON_KEY?.length || 0,
                },
                connection: null,
                auth: null,
                tables: {},
            };

            // Test connection
            try {
                const { data, error } = await supabase.from('site_settings').select('count');
                results.connection = {
                    success: !error,
                    error: error?.message || null,
                    data: data,
                };
            } catch (err: any) {
                results.connection = {
                    success: false,
                    error: err.message,
                };
            }

            // Test auth
            try {
                const { data: { session }, error } = await supabase.auth.getSession();
                results.auth = {
                    success: !error,
                    error: error?.message || null,
                    hasSession: !!session,
                    userId: session?.user?.id || null,
                };
            } catch (err: any) {
                results.auth = {
                    success: false,
                    error: err.message,
                };
            }

            // Test each table
            const tables = ['site_settings', 'gallery_images', 'members', 'gram_sabha_meetings', 'newsletter_subscribers'];
            for (const table of tables) {
                try {
                    const { data, error } = await supabase.from(table).select('count', { count: 'exact', head: true });
                    results.tables[table] = {
                        exists: !error,
                        error: error?.message || null,
                    };
                } catch (err: any) {
                    results.tables[table] = {
                        exists: false,
                        error: err.message,
                    };
                }
            }

            setDiagnostics(results);
            setLoading(false);
        };

        runDiagnostics();
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-100">
                <Card className="w-full max-w-2xl">
                    <CardHeader>
                        <CardTitle>Running Diagnostics...</CardTitle>
                    </CardHeader>
                </Card>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <Card className="w-full max-w-4xl mx-auto">
                <CardHeader>
                    <CardTitle className="text-2xl">🔍 Supabase Connection Diagnostics</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                    {/* Environment Variables */}
                    <div>
                        <h3 className="text-lg font-semibold mb-2">📋 Environment Variables</h3>
                        <div className="bg-gray-50 p-4 rounded-lg space-y-2 font-mono text-sm">
                            <div>
                                <span className="font-bold">URL:</span> {diagnostics.envVars?.url || '❌ NOT SET'}
                            </div>
                            <div>
                                <span className="font-bold">Anon Key Exists:</span>{' '}
                                {diagnostics.envVars?.keyExists ? '✅ Yes' : '❌ No'}
                            </div>
                            <div>
                                <span className="font-bold">Anon Key Length:</span> {diagnostics.envVars?.keyLength}
                            </div>
                        </div>
                    </div>

                    {/* Connection Test */}
                    <div>
                        <h3 className="text-lg font-semibold mb-2">🌐 Connection Test</h3>
                        <div className={`p-4 rounded-lg ${diagnostics.connection?.success ? 'bg-green-50' : 'bg-red-50'}`}>
                            <div className="font-bold mb-2">
                                {diagnostics.connection?.success ? '✅ Connected' : '❌ Connection Failed'}
                            </div>
                            {diagnostics.connection?.error && (
                                <div className="text-red-600 text-sm font-mono">
                                    Error: {diagnostics.connection.error}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Auth Test */}
                    <div>
                        <h3 className="text-lg font-semibold mb-2">🔐 Authentication Status</h3>
                        <div className={`p-4 rounded-lg ${diagnostics.auth?.success ? 'bg-green-50' : 'bg-yellow-50'}`}>
                            <div className="font-bold mb-2">
                                {diagnostics.auth?.hasSession ? '✅ Logged In' : '⚠️ Not Logged In'}
                            </div>
                            {diagnostics.auth?.userId && (
                                <div className="text-sm font-mono">User ID: {diagnostics.auth.userId}</div>
                            )}
                            {diagnostics.auth?.error && (
                                <div className="text-red-600 text-sm font-mono">Error: {diagnostics.auth.error}</div>
                            )}
                        </div>
                    </div>

                    {/* Tables Test */}
                    <div>
                        <h3 className="text-lg font-semibold mb-2">📊 Database Tables</h3>
                        <div className="space-y-2">
                            {Object.entries(diagnostics.tables || {}).map(([table, info]: [string, any]) => (
                                <div
                                    key={table}
                                    className={`p-3 rounded-lg ${info.exists ? 'bg-green-50' : 'bg-red-50'}`}
                                >
                                    <div className="flex justify-between items-center">
                                        <span className="font-mono">{table}</span>
                                        <span>{info.exists ? '✅ Exists' : '❌ Missing'}</span>
                                    </div>
                                    {info.error && (
                                        <div className="text-red-600 text-xs font-mono mt-1">Error: {info.error}</div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Instructions */}
                    <div className="bg-blue-50 p-4 rounded-lg">
                        <h3 className="text-lg font-semibold mb-2">💡 Next Steps</h3>
                        <ul className="list-disc list-inside space-y-1 text-sm">
                            <li>If environment variables are missing, check your <code>.env.local</code> file</li>
                            <li>If connection fails, verify your Supabase URL and anon key</li>
                            <li>If tables are missing, run the <code>QUICK_SETUP.sql</code> script in Supabase</li>
                            <li>If not logged in, that's normal - go to <code>/login</code> to sign in</li>
                        </ul>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default DiagnosticPage;
