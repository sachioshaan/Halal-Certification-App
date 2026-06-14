import Link from "next/link";
import { ShieldCheck, CheckCircle, Zap, Brain, ArrowRight, FileText, Users, BarChart } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Nav */}
      <header className="sticky top-0 z-50 border-b bg-white/90 backdrop-blur">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
              <ShieldCheck className="h-4 w-4 text-white" />
            </div>
            <span className="text-lg font-bold text-gray-900">HalalCert</span>
          </div>
          <nav className="hidden md:flex items-center gap-6 text-sm">
            <a href="#features" className="text-gray-600 hover:text-gray-900 transition-colors">Features</a>
            <a href="#how-it-works" className="text-gray-600 hover:text-gray-900 transition-colors">How It Works</a>
            <a href="#pricing" className="text-gray-600 hover:text-gray-900 transition-colors">Pricing</a>
            <a href="#about" className="text-gray-600 hover:text-gray-900 transition-colors">About</a>
          </nav>
          <div className="flex items-center gap-3">
            <Link href="/login" className="inline-flex items-center justify-center rounded-lg text-sm font-medium h-8 px-2.5 hover:bg-muted transition-colors">Login</Link>
            <Link href="/register" className="inline-flex items-center justify-center rounded-lg text-sm font-medium h-8 px-2.5 bg-primary text-primary-foreground hover:bg-primary/80 transition-colors">Get Started Free</Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="pt-24 pb-20 bg-gradient-to-b from-green-50 to-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <Badge variant="outline" className="mb-4 text-primary border-primary/30 bg-primary/5">
            Trusted by F&B Businesses in Malaysia
          </Badge>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
            Simplify Your Halal<br />
            <span className="text-primary">Certification Journey</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
            Manage your halal compliance data, track requirements, generate tasks, and prepare your JAKIM application — all in one workspace.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/register" className="inline-flex items-center justify-center rounded-lg text-sm font-medium h-9 px-2.5 bg-primary text-primary-foreground hover:bg-primary/80 transition-colors w-full sm:w-auto">
              Get Started Free
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
            <Link href="/dashboard" className="inline-flex items-center justify-center rounded-lg border text-sm font-medium h-9 px-2.5 bg-background hover:bg-muted transition-colors w-full sm:w-auto">
              See How It Works →
            </Link>
          </div>
          <p className="mt-4 text-sm text-gray-500">No credit card required · Free 14-day trial</p>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Everything You Need for Halal Compliance</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">From data management to readiness scoring, HalalCert covers the full certification lifecycle.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="border-2 hover:border-primary/30 transition-colors">
              <CardHeader>
                <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center mb-2">
                  <FileText className="h-5 w-5 text-primary" />
                </div>
                <CardTitle className="text-lg">Compliance Workspace</CardTitle>
                <CardDescription>
                  Maintain all your halal data — suppliers, ingredients, employees, documents — in one organised workspace. Reuse across multiple applications.
                </CardDescription>
              </CardHeader>
            </Card>
            <Card className="border-2 hover:border-primary/30 transition-colors">
              <CardHeader>
                <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center mb-2">
                  <BarChart className="h-5 w-5 text-primary" />
                </div>
                <CardTitle className="text-lg">Requirement Engine</CardTitle>
                <CardDescription>
                  Automatically evaluate your readiness against JAKIM Food Premises and F&B Product requirements. Get a clear readiness score and list of blockers.
                </CardDescription>
              </CardHeader>
            </Card>
            <Card className="border-2 hover:border-primary/30 transition-colors">
              <CardHeader>
                <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center mb-2">
                  <Brain className="h-5 w-5 text-primary" />
                </div>
                <CardTitle className="text-lg">AI Assistant</CardTitle>
                <CardDescription>
                  Get intelligent recommendations, document summaries, ingredient risk analysis, and SOP drafting — all contextually aware of your application status.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>

          <div className="mt-8 grid md:grid-cols-3 gap-6">
            {[
              { icon: Users, title: "Employee Management", desc: "Track Halal PICs, supervisors, food handler certs, and typhoid vaccination status with expiry alerts." },
              { icon: CheckCircle, title: "Document Vault", desc: "Centralised document storage with OCR extraction, expiry tracking, and auto-linking to applications." },
              { icon: Zap, title: "Task Centre", desc: "Auto-generated tasks from the requirement engine. Never miss a deadline or compliance gap." },
            ].map(({ icon: Icon, title, desc }) => (
              <Card key={title} className="border hover:border-primary/20 transition-colors">
                <CardHeader>
                  <div className="h-10 w-10 rounded-lg bg-gray-50 flex items-center justify-center mb-2">
                    <Icon className="h-5 w-5 text-gray-600" />
                  </div>
                  <CardTitle className="text-base">{title}</CardTitle>
                  <CardDescription className="text-sm">{desc}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">How It Works</h2>
            <p className="text-gray-600">Four simple steps from setup to submission-ready</p>
          </div>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { step: "01", title: "Set Up Your Workspace", desc: "Add your company, locations, employees, suppliers, and ingredients once." },
              { step: "02", title: "Create an Application", desc: "Select your certification scheme, location, and scope of menus/products." },
              { step: "03", title: "Fix Readiness Issues", desc: "The Requirement Engine evaluates your data and generates tasks for every gap." },
              { step: "04", title: "Export Your Package", desc: "Download a complete, organised submission package ready for JAKIM." },
            ].map(({ step, title, desc }) => (
              <div key={step} className="text-center">
                <div className="mx-auto h-12 w-12 rounded-full bg-primary text-white flex items-center justify-center text-lg font-bold mb-4">
                  {step}
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{title}</h3>
                <p className="text-sm text-gray-600">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Simple, Transparent Pricing</h2>
            <p className="text-gray-600">Start free, scale as you grow</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                name: "Starter",
                price: "RM 99",
                desc: "Perfect for a single food outlet",
                features: ["1 Location", "3 Users", "Up to 20 Documents", "Basic Requirement Engine", "Email Support"],
                cta: "Start Free Trial",
                highlight: false,
              },
              {
                name: "Pro",
                price: "RM 299",
                desc: "For growing F&B businesses",
                features: ["Up to 5 Locations", "10 Users", "Unlimited Documents", "Full Requirement Engine", "AI Assistant", "Priority Support"],
                cta: "Start Free Trial",
                highlight: true,
              },
              {
                name: "Business",
                price: "RM 699",
                desc: "For multi-branch operations",
                features: ["Unlimited Locations", "Unlimited Users", "Unlimited Documents", "Full AI Features", "Dedicated Support", "Custom Reports"],
                cta: "Contact Sales",
                highlight: false,
              },
            ].map(({ name, price, desc, features, cta, highlight }) => (
              <Card
                key={name}
                className={highlight ? "border-primary border-2 shadow-lg relative" : "border"}
              >
                {highlight && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <Badge className="bg-primary">Most Popular</Badge>
                  </div>
                )}
                <CardHeader>
                  <CardTitle>{name}</CardTitle>
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-bold text-gray-900">{price}</span>
                    <span className="text-gray-500">/month</span>
                  </div>
                  <CardDescription>{desc}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 mb-6">
                    {features.map((f) => (
                      <li key={f} className="flex items-center gap-2 text-sm text-gray-700">
                        <CheckCircle className="h-4 w-4 text-primary shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <Link href="/register" className={`inline-flex w-full items-center justify-center rounded-lg border text-sm font-medium h-8 px-2.5 transition-colors ${highlight ? "bg-primary text-primary-foreground hover:bg-primary/80 border-transparent" : "bg-background hover:bg-muted"}`}>
                    {cta}
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-gray-50 py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary">
                <ShieldCheck className="h-3.5 w-3.5 text-white" />
              </div>
              <span className="font-bold text-gray-900">HalalCert</span>
            </div>
            <p className="text-sm text-gray-500">© 2025 HalalCert. All rights reserved. Not affiliated with JAKIM.</p>
            <div className="flex gap-6 text-sm text-gray-500">
              <a href="#" className="hover:text-gray-900">Terms</a>
              <a href="#" className="hover:text-gray-900">Privacy</a>
              <a href="#" className="hover:text-gray-900">Contact</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
