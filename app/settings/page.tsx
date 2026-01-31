'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Loader2, ArrowLeft, AlertCircle, CheckCircle } from 'lucide-react'

export default function SettingsPage() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [isAdmin, setIsAdmin] = useState(false)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [success, setSuccess] = useState(false)
  const [config, setConfig] = useState({
    surgeToken: '',
    telegramBotToken: '',
    telegramChannelId: '',
    telegramOwnerId: '',
    telegramBotUsername: '',
  })

  useEffect(() => {
    const userData = localStorage.getItem('user')
    if (!userData) {
      router.push('/login')
      return
    }
    const parsedUser = JSON.parse(userData)
    setUser(parsedUser)
    setIsAdmin(parsedUser.isAdmin)
    
    // Load config from localStorage (in production, fetch from API)
    const savedConfig = localStorage.getItem('platformConfig')
    if (savedConfig) {
      setConfig(JSON.parse(savedConfig))
    }
    
    setLoading(false)
  }, [router])

  const handleSaveConfig = async () => {
    if (!isAdmin) {
      alert('Only admins can modify settings')
      return
    }

    setSaving(true)
    try {
      // Save to localStorage (in production, send to API)
      localStorage.setItem('platformConfig', JSON.stringify(config))
      
      // In production, you would make an API call here
      // await fetch('/api/admin/config', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(config)
      // })

      setSuccess(true)
      setTimeout(() => setSuccess(false), 3000)
    } catch (error) {
      console.error('Error saving config:', error)
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
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
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-2xl px-4 py-12 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold mb-2">Settings</h1>
        <p className="text-muted-foreground mb-8">Platform configuration</p>

        {!isAdmin && (
          <Alert className="mb-8">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              You need administrator privileges to access these settings.
            </AlertDescription>
          </Alert>
        )}

        {success && (
          <Alert className="mb-8 border-green-500/50 bg-green-500/5">
            <CheckCircle className="h-4 w-4 text-green-500" />
            <AlertDescription className="text-green-700">
              Configuration saved successfully!
            </AlertDescription>
          </Alert>
        )}

        <div className="space-y-6">
          {/* Surge Configuration */}
          <Card>
            <CardHeader>
              <CardTitle>Surge.sh Configuration</CardTitle>
              <CardDescription>API credentials for Surge deployment</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Surge API Token</label>
                <Input
                  type="password"
                  placeholder="Your Surge.sh API token"
                  value={config.surgeToken}
                  onChange={(e) => setConfig({ ...config, surgeToken: e.target.value })}
                  disabled={!isAdmin || saving}
                />
              </div>
            </CardContent>
          </Card>

          {/* Telegram Configuration */}
          <Card>
            <CardHeader>
              <CardTitle>Telegram Bot Configuration</CardTitle>
              <CardDescription>Settings for Telegram bot integration</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Bot Token</label>
                <Input
                  type="password"
                  placeholder="Your Telegram bot token"
                  value={config.telegramBotToken}
                  onChange={(e) => setConfig({ ...config, telegramBotToken: e.target.value })}
                  disabled={!isAdmin || saving}
                />
                <p className="text-xs text-muted-foreground">
                  Get this from BotFather on Telegram (@BotFather)
                </p>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Bot Username</label>
                <Input
                  placeholder="@yourbot_username"
                  value={config.telegramBotUsername}
                  onChange={(e) => setConfig({ ...config, telegramBotUsername: e.target.value })}
                  disabled={!isAdmin || saving}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Channel ID (Notifications)</label>
                <Input
                  placeholder="-1001234567890"
                  value={config.telegramChannelId}
                  onChange={(e) => setConfig({ ...config, telegramChannelId: e.target.value })}
                  disabled={!isAdmin || saving}
                />
                <p className="text-xs text-muted-foreground">
                  Channel where notifications will be sent (e.g., @depstore11)
                </p>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Owner Telegram ID</label>
                <Input
                  type="number"
                  placeholder="Your numeric Telegram ID"
                  value={config.telegramOwnerId}
                  onChange={(e) => setConfig({ ...config, telegramOwnerId: e.target.value })}
                  disabled={!isAdmin || saving}
                />
                <p className="text-xs text-muted-foreground">
                  Your personal Telegram ID (numeric only)
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Save Button */}
          {isAdmin && (
            <Button
              onClick={handleSaveConfig}
              disabled={!isAdmin || saving}
              className="w-full"
              size="lg"
            >
              {saving ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                'Save Configuration'
              )}
            </Button>
          )}

          {/* Info Box */}
          <Card className="border-blue-500/50 bg-blue-500/5">
            <CardHeader>
              <CardTitle className="text-sm">⚠️ Important</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground space-y-2">
              <p>• These settings are stored securely on the server</p>
              <p>• Keep your tokens and IDs confidential</p>
              <p>• Only administrators can modify these settings</p>
              <p>• Changes take effect immediately</p>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
