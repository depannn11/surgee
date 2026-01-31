'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { ArrowLeft } from 'lucide-react'

const faqs = [
  {
    question: 'What is SoraaDeploy ?',
    answer: 'SoraaDeploy  is a simple deployment platform for static HTML and React applications. Upload your files, get a domain, and your site is live in seconds.',
  },
  {
    question: 'How do I deploy my site?',
    answer: 'Simply log in to your SoraaDeploy  account, click "New Project", upload your HTML file or ZIP archive, choose a domain name, and click deploy. Your site will be live in seconds.',
  },
  {
    question: 'What file formats are supported?',
    answer: 'We support .html files and .zip archives containing your website files. Maximum file size is 100MB.',
  },
  {
    question: 'Can I use a custom domain?',
    answer: 'Yes! You can use your own custom domain by pointing it to your SoraaDeploy  deployment. We provide instructions for this in your project settings.',
  },
  {
    question: 'How much does it cost?',
    answer: 'SoraaDeploy  is free for public deployments. Premium features are coming soon.',
  },
  {
    question: 'Can I delete or update my deployment?',
    answer: 'Yes! You can update your deployment by uploading new files, or delete it entirely from your dashboard. Deleted projects cannot be recovered.',
  },
  {
    question: 'Do you have an API?',
    answer: 'We are currently working on an API. For now, you can deploy through our web interface.',
  },
  {
    question: 'What about SSL certificates?',
    answer: 'All SoraaDeploy  deployments come with free SSL certificates. Your site is always secure.',
  },
  {
    question: 'How reliable is SoraaDeploy ?',
    answer: 'SoraaDeploy  uses enterprise-grade infrastructure with 99.9% uptime guarantee. Your deployments are backed up and monitored 24/7.',
  },
  {
    question: 'Can I contact support?',
    answer: 'Yes! Email us at depstoreku@gmail.com or contact us through Telegram for quick assistance.',
  },
]

export default function FAQPage() {
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
        <h1 className="text-4xl font-bold mb-2">Frequently Asked Questions</h1>
        <p className="text-muted-foreground mb-12">Find answers to common questions about SoraaDeploy </p>

        <Card className="p-6">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-base font-semibold hover:no-underline">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-base text-muted-foreground">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Card>

        <div className="mt-12 text-center">
          <p className="text-muted-foreground mb-4">Still have questions?</p>
          <Button asChild>
            <a href="mailto:depstoreku@gmail.com">Contact Support</a>
          </Button>
        </div>
      </main>
    </div>
  )
}
