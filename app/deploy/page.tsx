'use client'

import React from "react"

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Loader2, Upload, AlertCircle, CheckCircle } from 'lucide-react'
import Link from 'next/link'

type DeployStep = 'upload' | 'configure' | 'deploying' | 'success' | 'error'

export default function DeployPage() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [step, setStep] = useState<DeployStep>('upload')
  const [file, setFile] = useState<File | null>(null)
  const [projectName, setProjectName] = useState('')
  const [domain, setDomain] = useState('')
  const [error, setError] = useState('')
  const [deploymentStatus, setDeploymentStatus] = useState('')

  useEffect(() => {
    const userData = localStorage.getItem('user')
    if (!userData) {
      router.push('/login')
      return
    }
    setUser(JSON.parse(userData))
  }, [router])

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (selectedFile) {
      if (selectedFile.size > 100 * 1024 * 1024) {
        setError('File size must be less than 100MB')
        return
      }
      if (!selectedFile.name.endsWith('.zip') && !selectedFile.name.endsWith('.html')) {
        setError('Only .zip and .html files are supported')
        return
      }
      setFile(selectedFile)
      setError('')
    }
  }

  const handleDeploy = async () => {
    if (!file || !projectName || !domain) {
      setError('Please fill in all fields')
      return
    }

    setStep('deploying')
    setDeploymentStatus('Uploading file...')

    try {
      // Create FormData to upload file
      const formData = new FormData()
      formData.append('file', file)
      formData.append('projectName', projectName)
      formData.append('domain', domain)
      formData.append('userId', user.id)

      const response = await fetch('/api/deploy', {
        method: 'POST',
        body: formData,
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Deployment failed')
      }

      setDeploymentStatus('Deployment successful!')
      setTimeout(() => {
        setStep('success')
      }, 1000)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Deployment failed')
      setStep('error')
    }
  }

  const generateDomain = () => {
    const random = Math.random().toString(36).substring(2, 8)
    setDomain(`${projectName.toLowerCase().replace(/\s+/g, '-')}-${random}`)
  }

  if (!user) {
    return <div className="min-h-screen bg-background flex items-center justify-center">Loading...</div>
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border sticky top-0 z-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <Link href="/" className="text-2xl font-bold">
              SoraaDeploy 
            </Link>
            <Button variant="ghost" onClick={() => router.push('/dashboard')}>
              Back to Dashboard
            </Button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-2xl px-4 py-12 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold mb-2">Deploy New Project</h1>
        <p className="text-muted-foreground mb-8">Upload your HTML or ZIP file and get it live in seconds</p>

        {step === 'upload' && (
          <Card>
            <CardHeader>
              <CardTitle>Upload Project Files</CardTitle>
              <CardDescription>Upload your HTML file or ZIP archive</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {error && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <div className="border-2 border-dashed border-border rounded-lg p-8">
                <label htmlFor="file-upload" className="cursor-pointer">
                  <div className="flex flex-col items-center gap-2">
                    <Upload className="h-8 w-8 text-muted-foreground" />
                    <span className="font-medium">Click to upload or drag and drop</span>
                    <span className="text-sm text-muted-foreground">HTML or ZIP (max 100MB)</span>
                  </div>
                  <input
                    id="file-upload"
                    type="file"
                    accept=".zip,.html"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                </label>
              </div>

              {file && (
                <div className="rounded-lg bg-muted p-4 flex items-center justify-between">
                  <span className="text-sm font-medium">{file.name}</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setFile(null)}
                  >
                    Remove
                  </Button>
                </div>
              )}

              <div className="space-y-2">
                <label htmlFor="projectName" className="text-sm font-medium">
                  Project Name
                </label>
                <Input
                  id="projectName"
                  placeholder="My Awesome Website"
                  value={projectName}
                  onChange={(e) => setProjectName(e.target.value)}
                />
              </div>

              <Button
                onClick={() => setStep('configure')}
                disabled={!file || !projectName}
                className="w-full"
              >
                Next: Configure Domain
              </Button>
            </CardContent>
          </Card>
        )}

        {step === 'configure' && (
          <Card>
            <CardHeader>
              <CardTitle>Configure Domain</CardTitle>
              <CardDescription>Choose or generate a domain for your project</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="domain" className="text-sm font-medium">
                  Domain
                </label>
                <div className="flex gap-2">
                  <Input
                    id="domain"
                    placeholder="my-project"
                    value={domain}
                    onChange={(e) => setDomain(e.target.value)}
                    suffix=".surge.sh"
                  />
                  <Button variant="outline" onClick={generateDomain}>
                    Generate
                  </Button>
                </div>
                {domain && (
                  <p className="text-sm text-muted-foreground">
                    Your site will be available at: <span className="font-mono font-semibold">{domain}.surge.sh</span>
                  </p>
                )}
              </div>

              <div className="flex gap-2">
                <Button variant="outline" onClick={() => setStep('upload')}>
                  Back
                </Button>
                <Button onClick={handleDeploy} disabled={!domain} className="flex-1">
                  Deploy Now
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {step === 'deploying' && (
          <Card>
            <CardContent className="py-12">
              <div className="text-center space-y-4">
                <Loader2 className="h-12 w-12 animate-spin mx-auto text-primary" />
                <h3 className="text-lg font-semibold">Deploying your project...</h3>
                <p className="text-sm text-muted-foreground">{deploymentStatus}</p>
              </div>
            </CardContent>
          </Card>
        )}

        {step === 'success' && (
          <Card>
            <CardContent className="py-12">
              <div className="text-center space-y-4">
                <CheckCircle className="h-12 w-12 text-green-500 mx-auto" />
                <h3 className="text-lg font-semibold">Deployment successful!</h3>
                <p className="text-sm text-muted-foreground">
                  Your project is now live at: <span className="font-mono font-semibold">{domain}.surge.sh</span>
                </p>
                <div className="flex gap-2 justify-center pt-4">
                  <Button variant="outline" onClick={() => router.push('/dashboard')}>
                    Back to Dashboard
                  </Button>
                  <Button onClick={() => window.open(`https://${domain}.surge.sh`, '_blank')}>
                    View Site
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {step === 'error' && (
          <Card>
            <CardContent className="py-12">
              <div className="text-center space-y-4">
                <AlertCircle className="h-12 w-12 text-destructive mx-auto" />
                <h3 className="text-lg font-semibold">Deployment failed</h3>
                <p className="text-sm text-muted-foreground">{error}</p>
                <Button onClick={() => setStep('upload')}>Try Again</Button>
              </div>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  )
}
