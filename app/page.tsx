'use client'

import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { ArrowRight, Cloud, Zap, Shield, Globe } from 'lucide-react'

export default function Home() {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="text-2xl font-bold">DepStore</div>
            </div>
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                onClick={() => router.push('/login')}
              >
                Login
              </Button>
              <Button onClick={() => router.push('/register')}>
                Register
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-balance text-5xl font-bold tracking-tight sm:text-6xl">
            Deploy Your Static Sites in Seconds
          </h1>
          <p className="mt-6 text-xl text-muted-foreground">
            Simple, fast, and reliable deployment platform for your HTML and React apps.
            No configuration needed.
          </p>
          <div className="mt-10 flex justify-center gap-4">
            <Button
              size="lg"
              onClick={() => router.push('/register')}
              className="gap-2"
            >
              Get Started <ArrowRight className="h-4 w-4" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => router.push('/docs')}
            >
              Learn More
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <h2 className="text-center text-3xl font-bold">Why Choose DepStore?</h2>
        <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {[
            {
              icon: Zap,
              title: 'Lightning Fast',
              description: 'Deploy in seconds, not minutes. Your site goes live instantly.',
            },
            {
              icon: Globe,
              title: 'Easy Domain Setup',
              description: 'Get an auto-generated domain or use your own custom domain.',
            },
            {
              icon: Shield,
              title: 'Secure & Reliable',
              description: 'Enterprise-grade infrastructure with 99.9% uptime.',
            },
            {
              icon: Cloud,
              title: 'Easy Deployment',
              description: 'Just upload your HTML or ZIP file. We handle the rest.',
            },
          ].map((feature, i) => (
            <div key={i} className="rounded-lg border border-border bg-card p-6">
              <feature.icon className="h-8 w-8" />
              <h3 className="mt-4 font-semibold">{feature.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="rounded-lg border border-border bg-card p-12 text-center">
          <h2 className="text-3xl font-bold">Ready to Deploy?</h2>
          <p className="mt-4 text-muted-foreground">
            Join thousands of developers who trust DepStore for their deployments.
          </p>
          <Button
            size="lg"
            onClick={() => router.push('/register')}
            className="mt-8 gap-2"
          >
            Start Deploying Now <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-muted/30 py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 md:grid-cols-3">
            <div>
              <h3 className="font-semibold">DepStore</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                The easiest way to deploy your static sites.
              </p>
            </div>
            <div>
              <h4 className="font-semibold">Resources</h4>
              <ul className="mt-2 space-y-2 text-sm">
                <li><a href="/docs" className="text-muted-foreground hover:text-foreground">Documentation</a></li>
                <li><a href="/faq" className="text-muted-foreground hover:text-foreground">FAQ</a></li>
                <li><a href="/guide" className="text-muted-foreground hover:text-foreground">Getting Started</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold">Legal</h4>
              <ul className="mt-2 space-y-2 text-sm">
                <li><a href="/privacy" className="text-muted-foreground hover:text-foreground">Privacy Policy</a></li>
                <li><a href="/terms" className="text-muted-foreground hover:text-foreground">Terms of Service</a></li>
              </ul>
            </div>
          </div>
          <div className="mt-12 border-t border-border pt-8 text-center text-sm text-muted-foreground">
            <p>&copy; 2024 DepStore. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
