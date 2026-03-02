import Link from "next/link";
import { Copy, AlertCircle, CheckCircle2, Terminal } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function SetupPage() {
    return (
        <div className="min-h-screen bg-background flex items-center justify-center p-4">
            <div className="max-w-xl w-full space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-700">
                <div className="text-center space-y-4">
                    <div className="mx-auto bg-destructive/10 text-destructive h-24 w-24 rounded-full flex items-center justify-center mb-6">
                        <AlertCircle className="h-12 w-12" />
                    </div>
                    <h1 className="text-4xl font-bold tracking-tight">Caught You! 😏</h1>
                    <p className="text-xl text-muted-foreground">
                        You totally skipped the <span className="font-mono bg-muted px-1.5 py-0.5 rounded-md text-foreground">README.md</span>, didn't you?
                    </p>
                </div>

                <div className="bg-card border rounded-xl p-6 shadow-sm space-y-6">
                    <div className="space-y-2">
                        <h2 className="text-lg font-semibold flex items-center gap-2">
                            <Terminal className="h-5 w-5 text-primary" />
                            Here is what you missed:
                        </h2>
                        <p className="text-sm text-muted-foreground">
                            Your <code className="text-primary bg-primary/10 px-1 py-0.5 rounded">.env.local</code> file is currently empty or missing the critical keys needed to start the app.
                        </p>
                    </div>

                    <div className="space-y-3">
                        <div className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg border">
                            <CheckCircle2 className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
                            <div className="space-y-1 text-sm">
                                <p className="font-medium">1. Duplicate the Example File</p>
                                <p className="text-muted-foreground">Run <code className="bg-background border px-1 py-0.5 rounded text-xs">cp .env.local.example .env.local</code> in your terminal.</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg border">
                            <CheckCircle2 className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
                            <div className="space-y-1 text-sm">
                                <p className="font-medium">2. Connect Supabase</p>
                                <p className="text-muted-foreground">Grab your <span className="font-medium text-foreground">URL</span> and <span className="font-medium text-foreground">Anon Key</span> from your new Supabase project settings.</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg border">
                            <CheckCircle2 className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
                            <div className="space-y-1 text-sm">
                                <p className="font-medium">3. Refresh the Page</p>
                                <p className="text-muted-foreground">Once those keys are saved in <code className="text-xs">.env.local</code>, Next.js will auto-reload and this page will disappear!</p>
                            </div>
                        </div>
                    </div>

                    <div className="pt-4 flex flex-col sm:flex-row gap-3">
                        <Button className="w-full" asChild>
                            <Link href="/">I Fixed It! Let me in 🚀</Link>
                        </Button>
                    </div>
                </div>

                <p className="text-center text-sm text-muted-foreground">
                    PS: Don't forget to run the <code className="font-mono bg-muted/50 px-1 rounded">00_init.sql</code> migration too.
                </p>
            </div>
        </div>
    );
}
