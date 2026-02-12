import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle2, XCircle, AlertCircle, Loader2 } from 'lucide-react';

interface DiagnosticResult {
    status: 'success' | 'error' | 'warning' | 'pending';
    message: string;
}

const VideosDiagnostic = () => {
    const [results, setResults] = useState<Record<string, DiagnosticResult>>({
        supabase: { status: 'pending', message: 'Checking...' },
        auth: { status: 'pending', message: 'Checking...' },
        table: { status: 'pending', message: 'Checking...' },
        permissions: { status: 'pending', message: 'Checking...' },
    });
    const [isRunning, setIsRunning] = useState(false);

    const runDiagnostics = async () => {
        setIsRunning(true);
        const newResults: Record<string, DiagnosticResult> = {};

        // 1. Check Supabase Connection
        try {
            const { data, error } = await supabase.from('_test').select('*').limit(1);
            if (!error || error.code === '42P01') {
                newResults.supabase = { status: 'success', message: 'Supabase connection working' };
            } else {
                throw error;
            }
        } catch (error: any) {
            newResults.supabase = { status: 'error', message: `Supabase error: ${error.message}` };
        }

        // 2. Check Authentication
        try {
            const { data: { user } } = await supabase.auth.getUser();
            if (user) {
                newResults.auth = { status: 'success', message: `Logged in as: ${user.email}` };
            } else {
                newResults.auth = { status: 'warning', message: 'Not logged in. Please login to manage videos.' };
            }
        } catch (error: any) {
            newResults.auth = { status: 'error', message: `Auth error: ${error.message}` };
        }

        // 3. Check Videos Table
        try {
            const { data, error } = await supabase.from('videos').select('count').single();
            if (error) {
                if (error.code === '42P01' || error.message?.includes('relation "videos" does not exist')) {
                    newResults.table = {
                        status: 'error',
                        message: '❌ Videos table does not exist! You need to run setup_videos.sql in Supabase.'
                    };
                } else {
                    throw error;
                }
            } else {
                const { count: totalCount } = await supabase.from('videos').select('*', { count: 'exact', head: true });
                newResults.table = {
                    status: 'success',
                    message: `Videos table exists. Total videos: ${totalCount || 0}`
                };
            }
        } catch (error: any) {
            newResults.table = { status: 'error', message: `Table check error: ${error.message}` };
        }

        // 4. Check Permissions (Insert Test)
        try {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) {
                newResults.permissions = {
                    status: 'warning',
                    message: 'Cannot test permissions - not logged in'
                };
            } else {
                // Try to insert and immediately delete a test record
                const testVideo = {
                    youtube_url: 'https://www.youtube.com/watch?v=test',
                    title: 'Test Video (Will be deleted)',
                    description: 'Diagnostic test',
                    display_order: 999,
                    is_active: false
                };

                const { data, error: insertError } = await supabase
                    .from('videos')
                    .insert([testVideo])
                    .select();

                if (insertError) {
                    if (insertError.code === '42501') {
                        newResults.permissions = {
                            status: 'error',
                            message: '❌ Permission denied! Check RLS policies in Supabase.'
                        };
                    } else {
                        throw insertError;
                    }
                } else if (data && data[0]) {
                    // Clean up test record
                    await supabase.from('videos').delete().eq('id', data[0].id);
                    newResults.permissions = {
                        status: 'success',
                        message: '✅ Insert/Delete permissions working correctly'
                    };
                }
            }
        } catch (error: any) {
            newResults.permissions = { status: 'error', message: `Permission error: ${error.message}` };
        }

        setResults(newResults);
        setIsRunning(false);
    };

    useEffect(() => {
        runDiagnostics();
    }, []);

    const getIcon = (status: DiagnosticResult['status']) => {
        switch (status) {
            case 'success':
                return <CheckCircle2 className="w-5 h-5 text-green-600" />;
            case 'error':
                return <XCircle className="w-5 h-5 text-red-600" />;
            case 'warning':
                return <AlertCircle className="w-5 h-5 text-yellow-600" />;
            case 'pending':
                return <Loader2 className="w-5 h-5 text-blue-600 animate-spin" />;
        }
    };

    const hasErrors = Object.values(results).some(r => r.status === 'error');

    return (
        <div className="space-y-6 max-w-3xl mx-auto p-6">
            <div className="space-y-2">
                <h1 className="text-3xl font-bold">Videos Feature Diagnostic</h1>
                <p className="text-muted-foreground">
                    This page checks if the YouTube videos feature is set up correctly.
                </p>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>System Checks</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    {Object.entries(results).map(([key, result]) => (
                        <div key={key} className="flex items-start gap-3 p-3 rounded-lg border">
                            {getIcon(result.status)}
                            <div className="flex-1">
                                <h3 className="font-medium capitalize">{key.replace('_', ' ')}</h3>
                                <p className="text-sm text-muted-foreground mt-1">{result.message}</p>
                            </div>
                        </div>
                    ))}
                </CardContent>
            </Card>

            {hasErrors && (
                <Card className="border-red-200 bg-red-50">
                    <CardHeader>
                        <CardTitle className="text-red-900">⚠️ Setup Required</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4 text-sm">
                        {results.table?.status === 'error' && (
                            <div className="space-y-2">
                                <h4 className="font-semibold text-red-900">Videos Table Missing</h4>
                                <p className="text-red-800">You need to create the videos table in Supabase:</p>
                                <ol className="list-decimal list-inside space-y-1 text-red-800 ml-4">
                                    <li>Go to your Supabase Dashboard</li>
                                    <li>Click on "SQL Editor" in the left sidebar</li>
                                    <li>Click "New Query"</li>
                                    <li>Copy and paste the SQL from <code className="bg-red-100 px-1 rounded">setup_videos.sql</code></li>
                                    <li>Click "Run" or press Ctrl+Enter</li>
                                </ol>
                            </div>
                        )}
                        {results.permissions?.status === 'error' && (
                            <div className="space-y-2">
                                <h4 className="font-semibold text-red-900">Permission Issues</h4>
                                <p className="text-red-800">
                                    Make sure the RLS policies are created correctly. Check the setup_videos.sql file.
                                </p>
                            </div>
                        )}
                        {results.auth?.status === 'warning' && (
                            <div className="space-y-2">
                                <h4 className="font-semibold text-yellow-900">Not Logged In</h4>
                                <p className="text-yellow-800">
                                    You need to <a href="/login" className="underline font-medium">login as admin</a> to manage videos.
                                </p>
                            </div>
                        )}
                    </CardContent>
                </Card>
            )}

            {!hasErrors && !isRunning && (
                <Card className="border-green-200 bg-green-50">
                    <CardHeader>
                        <CardTitle className="text-green-900">✅ All Systems Ready!</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-green-800 mb-4">
                            The videos feature is set up correctly. You can now add YouTube videos!
                        </p>
                        <Button asChild>
                            <a href="/admin/videos">Go to Videos Manager</a>
                        </Button>
                    </CardContent>
                </Card>
            )}

            <div className="flex gap-3">
                <Button onClick={runDiagnostics} disabled={isRunning}>
                    {isRunning ? (
                        <>
                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                            Running Diagnostics...
                        </>
                    ) : (
                        'Run Diagnostics Again'
                    )}
                </Button>
                <Button variant="outline" asChild>
                    <a href="/admin">Back to Admin Panel</a>
                </Button>
            </div>
        </div>
    );
};

export default VideosDiagnostic;
