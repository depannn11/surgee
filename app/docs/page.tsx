'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ArrowLeft, Code2, Zap, Shield, BookOpen } from 'lucide-react'

const docSections = [
  {
    title: 'Getting Started',
    description: 'New to SoraaDeploy ? Start here to learn the basics.',
    icon: BookOpen,
    items: [
      { name: 'What is SoraaDeploy ?', href: '#what' },
      { name: 'Quick Start', href: '/guide' },
      { name: 'Key Concepts', href: '#concepts' },
    ]
  },
  {
    title: 'Deployment',
    description: 'Learn how to deploy and manage your projects.',
    icon: Zap,
    items: [
      { name: 'Deploy Your First Project', href: '#deploy' },
      { name: 'File Requirements', href: '#files' },
      { name: 'Troubleshooting', href: '#troubleshoot' },
    ]
  },
  {
    title: 'Security',
    description: 'Understand security features and best practices.',
    icon: Shield,
    items: [
      { name: 'SSL/TLS Certificates', href: '#ssl' },
      { name: 'Account Security', href: '#account' },
      { name: 'Privacy & Data', href: '/privacy' },
    ]
  },
  {
    title: 'API & Advanced',
    description: 'For developers looking for advanced features.',
    icon: Code2,
    items: [
      { name: 'API Documentation', href: '#api' },
      { name: 'Custom Domains', href: '#domains' },
      { name: 'Advanced Options', href: '#advanced' },
    ]
  }
]

export default function DocsPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border sticky top-0 z-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center gap-4">
            <Button variant="ghost" size="icon" asChild>
              <Link href="/">
                <ArrowLeft className="h-5 w-5" />
              </Link>
            </Button>
            <Link href="/" className="text-2xl font-bold">
              SoraaDeploy 
            </Link>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold mb-2">Documentation</h1>
        <p className="text-muted-foreground mb-12">Complete guide to using SoraaDeploy </p>

        {/* Documentation Grid */}
        <div className="grid gap-6 md:grid-cols-2 mb-12">
          {docSections.map((section) => {
            const Icon = section.icon
            return (
              <Card key={section.title} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start gap-3">
                    <Icon className="h-6 w-6 text-primary mt-0.5" />
                    <div>
                      <CardTitle>{section.title}</CardTitle>
                      <p className="text-sm text-muted-foreground mt-1">{section.description}</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {section.items.map((item) => (
                      <li key={item.name}>
                        <Link
                          href={item.href}
                          className="text-sm text-primary hover:underline"
                        >
                          → {item.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Main Content Sections */}
        <div className="space-y-12">
          {/* What is SoraaDeploy  */}
          <section id="what" className="scroll-mt-20">
            <h2 className="text-3xl font-bold mb-4">What is SoraaDeploy ?</h2>
            <p className="text-muted-foreground mb-4">
              SoraaDeploy  is a modern, user-friendly deployment platform designed for static websites and single-page applications (SPAs). Unlike traditional hosting services that require complex configurations and setup, SoraaDeploy  lets you deploy your projects in just a few clicks.
            </p>
            <div className="grid md:grid-cols-3 gap-4">
              <Card className="p-4">
                <h3 className="font-semibold mb-2">⚡ Lightning Fast</h3>
                <p className="text-sm text-muted-foreground">Deploy in seconds, not hours</p>
              </Card>
              <Card className="p-4">
                <h3 className="font-semibold mb-2">🔒 Secure by Default</h3>
                <p className="text-sm text-muted-foreground">Free SSL certificates included</p>
              </Card>
              <Card className="p-4">
                <h3 className="font-semibold mb-2">📈 Scale Easily</h3>
                <p className="text-sm text-muted-foreground">Handle traffic automatically</p>
              </Card>
            </div>
          </section>

          {/* Key Concepts */}
          <section id="concepts" className="scroll-mt-20">
            <h2 className="text-3xl font-bold mb-4">Key Concepts</h2>
            <div className="space-y-4">
              <Card className="p-6">
                <h3 className="font-semibold mb-2">Projects</h3>
                <p className="text-muted-foreground">
                  A project is your deployed website or application. Each project gets its own domain and deployment history.
                </p>
              </Card>
              <Card className="p-6">
                <h3 className="font-semibold mb-2">Domains</h3>
                <p className="text-muted-foreground">
                  Every project gets a unique domain on surge.sh, or you can use your own custom domain by updating your DNS settings.
                </p>
              </Card>
              <Card className="p-6">
                <h3 className="font-semibold mb-2">Deployments</h3>
                <p className="text-muted-foreground">
                  Each time you upload new files, a new deployment is created. You can view deployment history and logs in your dashboard.
                </p>
              </Card>
            </div>
          </section>

          {/* File Requirements */}
          <section id="files" className="scroll-mt-20">
            <h2 className="text-3xl font-bold mb-4">File Requirements</h2>
            <p className="text-muted-foreground mb-4">
              SoraaDeploy  supports both single HTML files and ZIP archives containing complete websites.
            </p>
            <div className="space-y-4">
              <Card className="p-6">
                <h3 className="font-semibold mb-3">HTML File Format</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Single .html file</li>
                  <li>• Maximum 100MB in size</li>
                  <li>• Include all CSS inline or in head tag</li>
                  <li>• Include all JavaScript inline or in script tags</li>
                </ul>
              </Card>
              <Card className="p-6">
                <h3 className="font-semibold mb-3">ZIP Archive Format</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• index.html must be in root directory</li>
                  <li>• Include all assets (CSS, JS, images)</li>
                  <li>• Maximum 100MB compressed size</li>
                  <li>• Maintain proper folder structure</li>
                </ul>
              </Card>
            </div>
          </section>

          {/* Troubleshooting */}
          <section id="troubleshoot" className="scroll-mt-20">
            <h2 className="text-3xl font-bold mb-4">Troubleshooting</h2>
            <div className="space-y-4">
              <Card className="p-6">
                <h3 className="font-semibold mb-2">Deployment Failed</h3>
                <p className="text-sm text-muted-foreground">
                  Check the deployment logs for error messages. Common issues include invalid file format or missing files. Ensure your HTML file has the .html extension.
                </p>
              </Card>
              <Card className="p-6">
                <h3 className="font-semibold mb-2">Site Not Loading</h3>
                <p className="text-sm text-muted-foreground">
                  Wait a few seconds after deployment for DNS to propagate. Clear your browser cache and try again. Check that all assets (CSS, JS) are properly referenced.
                </p>
              </Card>
              <Card className="p-6">
                <h3 className="font-semibold mb-2">Assets Not Loading</h3>
                <p className="text-sm text-muted-foreground">
                  Ensure all CSS and JavaScript files are included in your ZIP. Use relative paths for file references. Avoid absolute paths.
                </p>
              </Card>
            </div>
          </section>

          {/* Contact Support */}
          <section className="text-center py-12 border-t border-border">
            <h2 className="text-2xl font-bold mb-4">Need Help?</h2>
            <p className="text-muted-foreground mb-6">
              Check our FAQ or contact our support team for assistance.
            </p>
            <div className="flex gap-4 justify-center">
              <Button variant="outline" asChild>
                <Link href="/faq">View FAQ</Link>
              </Button>
              <Button asChild>
                <a href="mailto:depstoreku@gmail.com">Contact Support</a>
              </Button>
            </div>
          </section>
        </div>
      </main>
    </div>
  )
}
