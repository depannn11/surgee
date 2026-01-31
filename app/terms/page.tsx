'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'

export default function TermsPage() {
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

      <main className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold mb-8">Terms of Service</h1>
        <p className="text-muted-foreground mb-8">Last updated: January 2024</p>

        <div className="space-y-8 text-foreground">
          <section>
            <h2 className="text-2xl font-bold mb-4">1. Acceptance of Terms</h2>
            <p className="text-muted-foreground">
              By accessing and using the SoraaDeploy service, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">2. License</h2>
            <p className="text-muted-foreground">
              SoraaDeploy grants you a limited, non-exclusive, non-transferable license to use the service for your personal or business use, subject to these Terms.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">3. Disclaimer of Warranties</h2>
            <p className="text-muted-foreground">
              The service is provided "as is" without warranty of any kind, express or implied. SoraaDeploy does not warrant that the service will meet your requirements or that it will be uninterrupted, timely, secure, or error-free.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">4. Limitation of Liability</h2>
            <p className="text-muted-foreground">
              In no event shall SoraaDeploy be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation damages for loss of profits, data, or use, incurred by you or any third party, arising from or in connection with your use or inability to use the service.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">5. User Responsibilities</h2>
            <p className="text-muted-foreground mb-4">
              You agree that you will not use the service to:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2">
              <li>Upload malicious or illegal content</li>
              <li>Infringe upon any intellectual property rights</li>
              <li>Engage in harassment or abusive behavior</li>
              <li>Attempt to gain unauthorized access to our systems</li>
              <li>Violate any applicable laws or regulations</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">6. Termination</h2>
            <p className="text-muted-foreground">
              SoraaDeploy may terminate or suspend your account and access to the service immediately, without prior notice or liability, for any reason whatsoever, including if you breach the Terms.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">7. Changes to Terms</h2>
            <p className="text-muted-foreground">
              We reserve the right to modify these Terms at any time. Changes will be effective immediately upon posting to the website. Your continued use of the service constitutes your acceptance of any changes.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">8. Contact Us</h2>
            <p className="text-muted-foreground">
              If you have any questions about these Terms, please contact us at depstoreku@gmail.com
            </p>
          </section>
        </div>
      </main>
    </div>
  )
}
