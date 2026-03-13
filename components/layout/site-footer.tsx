import Link from "next/link"
import { Zap, Github, Twitter, Linkedin } from "lucide-react"

export function SiteFooter() {
    return (
        <footer className="border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container mx-auto px-4 md:px-8 py-12 max-w-screen-2xl">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                    <div className="space-y-4">
                        <div className="flex items-center gap-2 font-bold text-xl">
                            <div className="h-6 w-6 rounded-md bg-primary text-primary-foreground flex items-center justify-center">
                                <Zap className="h-4 w-4" />
                            </div>
                            <span>SaaS Boilerplate</span>
                        </div>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                            The ultimate starter kit for your next big idea.
                            Built with Next.js 15, Supabase, and AI.
                        </p>
                        <div className="flex gap-4">
                            <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                                <Github className="h-5 w-5" />
                            </Link>
                            <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                                <Twitter className="h-5 w-5" />
                            </Link>
                            <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                                <Linkedin className="h-5 w-5" />
                            </Link>
                        </div>
                    </div>

                    <div>
                        <h3 className="font-semibold mb-4">Product & Company</h3>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li><Link href="/features" className="hover:text-foreground transition-colors">Features</Link></li>
                            <li><Link href="/pricing" className="hover:text-foreground transition-colors">Pricing</Link></li>
                            <li><Link href="/about" className="hover:text-foreground transition-colors">About Us</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="font-semibold mb-4">Legal</h3>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li><Link href="/legal/privacy" className="hover:text-foreground transition-colors">Privacy Policy</Link></li>
                            <li><Link href="/legal/terms" className="hover:text-foreground transition-colors">Terms of Service</Link></li>
                            <li><Link href="/blog" className="hover:text-foreground transition-colors">Blogs</Link></li>
                        </ul>
                    </div>
                </div>

                <div className="pt-8 border-t flex flex-col items-center justify-center gap-4">
                    <p className="text-xs text-muted-foreground">
                        © {new Date().getFullYear()} SaaS Boilerplate, Inc. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    )
}
