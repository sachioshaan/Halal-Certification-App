import Link from "next/link";
import { ShieldCheck } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-12">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary">
              <ShieldCheck className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900">HalalCert</span>
          </Link>
        </div>

        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Create Your Account</CardTitle>
            <CardDescription>Start your free 14-day trial. No credit card required.</CardDescription>
          </CardHeader>
          <CardContent>
            <form className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="company">Company Name</Label>
                <Input id="company" placeholder="Nasi Lemak Sdn Bhd" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="name">Your Full Name</Label>
                <Input id="name" placeholder="Ahmad Faris bin Abdullah" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Work Email</Label>
                <Input id="email" type="email" placeholder="you@company.com.my" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input id="password" type="password" placeholder="••••••••" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirm">Confirm Password</Label>
                  <Input id="confirm" type="password" placeholder="••••••••" />
                </div>
              </div>

              {/* Plan selector */}
              <div className="space-y-2">
                <Label>Select Plan</Label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { name: "Starter", price: "RM99/mo" },
                    { name: "Pro", price: "RM299/mo", recommended: true },
                    { name: "Business", price: "RM699/mo" },
                  ].map(({ name, price, recommended }) => (
                    <label
                      key={name}
                      className="relative flex flex-col items-center gap-1 rounded-lg border-2 p-3 cursor-pointer hover:border-primary/50 transition-colors data-[selected=true]:border-primary data-[selected=true]:bg-primary/5"
                      data-selected={name === "Pro"}
                    >
                      <input
                        type="radio"
                        name="plan"
                        value={name}
                        defaultChecked={name === "Pro"}
                        className="sr-only"
                      />
                      {recommended && (
                        <Badge className="absolute -top-2.5 left-1/2 -translate-x-1/2 text-[10px] px-1.5 py-0 bg-primary">
                          Popular
                        </Badge>
                      )}
                      <span className="text-sm font-semibold">{name}</span>
                      <span className="text-xs text-muted-foreground">{price}</span>
                    </label>
                  ))}
                </div>
              </div>

              <Link href="/dashboard" className="w-full inline-flex items-center justify-center rounded-lg bg-primary text-primary-foreground hover:bg-primary/80 text-sm font-medium h-8 px-2.5 transition-colors">Create Account & Start Trial</Link>

              <p className="text-xs text-center text-gray-500">
                By creating an account, you agree to our{" "}
                <a href="#" className="text-primary hover:underline">Terms of Service</a>{" "}
                and{" "}
                <a href="#" className="text-primary hover:underline">Privacy Policy</a>.
              </p>
            </form>

            <div className="mt-6 text-center text-sm text-gray-600">
              Already have an account?{" "}
              <Link href="/login" className="font-medium text-primary hover:underline">
                Sign in
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
