'use client'

import { useEffect, useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ArrowLeft, Copy, ExternalLink, Trash2, AlertCircle } from 'lucide-react'
import { Alert, AlertDescription } from '@/components/ui/alert'

interface Project {
  id: string
  name: string
  domain: string
  status: string
  file_type: string
  created_at: string
  deployed_at?: string
  surge_domain?: string
  error_message?: string
}

interface DeploymentLog {
  id: string
  status: string
  message: string
  created_at: string
}

export default function ProjectDetailPage() {
  const router = useRouter()
  const params = useParams()
  const projectId = params.id as string

  const [user, setUser] = useState<any>(null)
  const [project, setProject] = useState<Project | null>(null)
  const [logs, setLogs] = useState<DeploymentLog[]>([])
  const [loading, setLoading] = useState(true)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    const userData = localStorage.getItem('user')
    if (!userData) {
      router.push('/login')
      return
    }
    setUser(JSON.parse(userData))

    // TODO: Fetch project and logs from API
    // For now, mock data
    const mockProject: Project = {
      id: projectId,
      name: 'My Awesome Website',
      domain: 'my-awesome-website-a1b2c3',
      status: 'active',
      file_type: 'zip',
      created_at: new Date(Date.now() - 86400000).toISOString(),
      deployed_at: new Date().toISOString(),
      surge_domain: 'my-awesome-website-a1b2c3.surge.sh',
    }

    const mockLogs: DeploymentLog[] = [
      {
        id: '1',
        status: 'deployed',
        message: 'Project deployed successfully',
        created_at: new Date().toISOString(),
      },
      {
        id: '2',
        status: 'building',
        message: 'Building project',
        created_at: new Date(Date.now() - 60000).toISOString(),
      },
      {
        id: '3',
        status: 'uploading',
        message: 'File uploaded successfully',
        created_at: new Date(Date.now() - 120000).toISOString(),
      },
    ]

    setProject(mockProject)
    setLogs(mockLogs)
    setLoading(false)
  }, [projectId, router])

  const handleCopyDomain = () => {
    if (project?.surge_domain) {
      navigator.clipboard.writeText(`https://${project.surge_domain}`)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const handleDelete = async () => {
    if (confirm('Are you sure you want to delete this project?')) {
      // TODO: Implement delete API call
      router.push('/dashboard')
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
      case 'deployed':
        return 'bg-green-500/10 text-green-700 border-green-200'
      case 'deploying':
      case 'building':
      case 'uploading':
        return 'bg-blue-500/10 text-blue-700 border-blue-200'
      case 'error':
        return 'bg-red-500/10 text-red-700 border-red-200'
      default:
        return 'bg-gray-500/10 text-gray-700 border-gray-200'
    }
  }

  if (loading || !project) {
    return <div className="min-h-screen bg-background flex items-center justify-center">Loading...</div>
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border sticky top-0 z-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center gap-4">
            <Button variant="ghost" size="icon" onClick={() => router.back()}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <Link href="/" className="text-2xl font-bold">
              SoraaDeploy 
            </Link>
            <div className="ml-auto">
              <Button variant="ghost" onClick={() => router.push('/dashboard')}>
                Back to Dashboard
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Project Header */}
        <div className="mb-8">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold">{project.name}</h1>
              <p className="mt-2 text-muted-foreground">Project ID: {project.id}</p>
            </div>
            <Badge className={`capitalize ${getStatusColor(project.status)}`}>
              {project.status}
            </Badge>
          </div>
        </div>

        {/* Error Message */}
        {project.status === 'error' && project.error_message && (
          <Alert variant="destructive" className="mb-8">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{project.error_message}</AlertDescription>
          </Alert>
        )}

        {/* Project Info Cards */}
        <div className="grid gap-6 md:grid-cols-2 mb-8">
          {/* Domain Card */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Domain</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="break-all">
                <p className="text-sm text-muted-foreground mb-2">Your deployment URL:</p>
                <p className="font-mono text-sm bg-muted p-3 rounded">
                  https://{project.surge_domain}
                </p>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleCopyDomain}
                  className="flex-1 bg-transparent"
                >
                  <Copy className="h-4 w-4 mr-2" />
                  {copied ? 'Copied!' : 'Copy'}
                </Button>
                {project.surge_domain && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => window.open(`https://${project.surge_domain}`, '_blank')}
                  >
                    <ExternalLink className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Details Card */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm text-muted-foreground">File Type</p>
                <p className="font-semibold capitalize">{project.file_type}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Created</p>
                <p className="text-sm">
                  {new Date(project.created_at).toLocaleDateString()} at{' '}
                  {new Date(project.created_at).toLocaleTimeString()}
                </p>
              </div>
              {project.deployed_at && (
                <div>
                  <p className="text-sm text-muted-foreground">Last Deployed</p>
                  <p className="text-sm">
                    {new Date(project.deployed_at).toLocaleDateString()} at{' '}
                    {new Date(project.deployed_at).toLocaleTimeString()}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Actions */}
        <div className="mb-8 flex gap-4">
          <Button onClick={() => router.push(`/deploy?projectId=${project.id}`)}>
            Redeploy Project
          </Button>
          <Button variant="destructive" onClick={handleDelete}>
            <Trash2 className="h-4 w-4 mr-2" />
            Delete Project
          </Button>
        </div>

        {/* Deployment History */}
        <Card>
          <CardHeader>
            <CardTitle>Deployment History</CardTitle>
            <CardDescription>Recent deployment logs</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {logs.length === 0 ? (
                <p className="text-sm text-muted-foreground text-center py-8">
                  No deployment logs yet
                </p>
              ) : (
                logs.map((log) => (
                  <div
                    key={log.id}
                    className="flex items-start gap-4 pb-4 border-b border-border last:border-b-0"
                  >
                    <div className="mt-1">
                      <div
                        className={`h-3 w-3 rounded-full ${
                          log.status === 'deployed' || log.status === 'active'
                            ? 'bg-green-500'
                            : log.status === 'error'
                              ? 'bg-red-500'
                              : 'bg-yellow-500'
                        }`}
                      />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between gap-2 mb-1">
                        <p className="font-medium capitalize text-sm">{log.status}</p>
                        <p className="text-xs text-muted-foreground">
                          {new Date(log.created_at).toLocaleString()}
                        </p>
                      </div>
                      <p className="text-sm text-muted-foreground">{log.message}</p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>

        {/* Settings */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Project Settings</CardTitle>
            <CardDescription>Manage project configuration</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-sm font-medium mb-2">Custom Domain</p>
              <p className="text-sm text-muted-foreground mb-4">
                Point your domain to: <span className="font-mono">{project.surge_domain}</span>
              </p>
              <Button variant="outline" size="sm">
                Configure Custom Domain
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
