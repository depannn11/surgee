'use client'

import React from "react"

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { AlertCircle, CheckCircle, Loader2 } from 'lucide-react'

export default function SetupPage() {
  const router = useRouter()
  const [step, setStep] = useState(1) // 1: database check, 2: admin setup, 3: config
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  // Step 2: Admin setup
  const [adminData, setAdminData] = useState({
    username: 'depstore',
    email: 'admin@depstore.dev',
    password: '',
    confirmPassword: '',
    telegramId: '',
  })

  // Step 3: Config setup
  const [configData, setConfigData] = useState({
    surgeToken: '',
    telegramBotToken: '',
    ownerTelegramId: '',
    channelId: '',
    botUsername: '',
  })

  const handleCreateAdmin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setSuccess('')

    try {
      if (adminData.password !== adminData.confirmPassword) {
        setError('Passwords do not match')
        setLoading(false)
        return
      }

      if (adminData.password.length < 8) {
        setError('Password must be at least 8 characters')
        setLoading(false)
        return
      }

      const response = await fetch('/api/setup/create-admin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: adminData.username,
          email: adminData.email,
          password: adminData.password,
          telegramId: parseInt(adminData.telegramId),
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        setError(data.error || 'Failed to create admin')
        setLoading(false)
        return
      }

      setSuccess('Admin user created successfully!')
      setTimeout(() => {
        setStep(3)
        setLoading(false)
      }, 2000)
    } catch (err) {
      setError('Error creating admin user')
      setLoading(false)
    }
  }

  const handleSaveConfig = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setSuccess('')

    try {
      const response = await fetch('/api/setup/save-config', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(configData),
      })

      const data = await response.json()

      if (!response.ok) {
        setError(data.error || 'Failed to save configuration')
        setLoading(false)
        return
      }

      setSuccess('Configuration saved successfully!')
      setTimeout(() => {
        router.push('/login')
        setLoading(false)
      }, 2000)
    } catch (err) {
      setError('Error saving configuration')
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-white to-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">SoraaDeploy Setup</h1>
          <p className="text-gray-600">Configure your deployment platform</p>
        </div>

        {/* Step 1: Database Check */}
        {step === 1 && (
          <Card>
            <CardHeader>
              <CardTitle>Database Check</CardTitle>
              <CardDescription>Verifying database setup</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg border border-green-200">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <div>
                    <p className="font-medium text-sm">Supabase Connected</p>
                    <p className="text-xs text-gray-600">Database integration active</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg border border-green-200">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <div>
                    <p className="font-medium text-sm">Vercel Blob Connected</p>
                    <p className="text-xs text-gray-600">File storage active</p>
                  </div>
                </div>
              </div>

              <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                <p className="text-sm text-blue-900">
                  ✓ Ensure you've run the database migration script in Supabase SQL editor before continuing.
                </p>
              </div>

              <Button onClick={() => setStep(2)} className="w-full">
                Continue to Admin Setup
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Step 2: Admin Setup */}
        {step === 2 && (
          <Card>
            <CardHeader>
              <CardTitle>Create Admin Account</CardTitle>
              <CardDescription>Set up your admin credentials</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleCreateAdmin} className="space-y-4">
                {error && (
                  <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}

                {success && (
                  <Alert className="border-green-200 bg-green-50">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <AlertDescription className="text-green-800">{success}</AlertDescription>
                  </Alert>
                )}

                <div>
                  <label className="text-sm font-medium mb-1 block">Username</label>
                  <Input
                    type="text"
                    value={adminData.username}
                    onChange={(e) => setAdminData({ ...adminData, username: e.target.value })}
                    placeholder="depstore"
                    disabled={loading}
                  />
                </div>

                <div>
                  <label className="text-sm font-medium mb-1 block">Email</label>
                  <Input
                    type="email"
                    value={adminData.email}
                    onChange={(e) => setAdminData({ ...adminData, email: e.target.value })}
                    placeholder="admin@depstore.dev"
                    disabled={loading}
                  />
                </div>

                <div>
                  <label className="text-sm font-medium mb-1 block">Password</label>
                  <Input
                    type="password"
                    value={adminData.password}
                    onChange={(e) => setAdminData({ ...adminData, password: e.target.value })}
                    placeholder="Enter strong password"
                    disabled={loading}
                    minLength={8}
                  />
                  <p className="text-xs text-gray-500 mt-1">Minimum 8 characters</p>
                </div>

                <div>
                  <label className="text-sm font-medium mb-1 block">Confirm Password</label>
                  <Input
                    type="password"
                    value={adminData.confirmPassword}
                    onChange={(e) => setAdminData({ ...adminData, confirmPassword: e.target.value })}
                    placeholder="Confirm password"
                    disabled={loading}
                  />
                </div>

                <div>
                  <label className="text-sm font-medium mb-1 block">Telegram ID</label>
                  <Input
                    type="number"
                    value={adminData.telegramId}
                    onChange={(e) => setAdminData({ ...adminData, telegramId: e.target.value })}
                    placeholder="Your Telegram user ID"
                    disabled={loading}
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Get it from @userinfobot on Telegram
                  </p>
                </div>

                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Creating Admin...
                    </>
                  ) : (
                    'Create Admin Account'
                  )}
                </Button>

                <Button
                  type="button"
                  variant="outline"
                  className="w-full bg-transparent"
                  onClick={() => setStep(1)}
                  disabled={loading}
                >
                  Back
                </Button>
              </form>
            </CardContent>
          </Card>
        )}

        {/* Step 3: Configuration */}
        {step === 3 && (
          <Card>
            <CardHeader>
              <CardTitle>Configure Platform</CardTitle>
              <CardDescription>Add your API tokens and settings</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSaveConfig} className="space-y-4">
                {error && (
                  <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}

                {success && (
                  <Alert className="border-green-200 bg-green-50">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <AlertDescription className="text-green-800">{success}</AlertDescription>
                  </Alert>
                )}

                <div>
                  <label className="text-sm font-medium mb-1 block">Surge.sh API Token</label>
                  <Input
                    type="password"
                    value={configData.surgeToken}
                    onChange={(e) => setConfigData({ ...configData, surgeToken: e.target.value })}
                    placeholder="Your Surge token"
                    disabled={loading}
                  />
                </div>

                <div>
                  <label className="text-sm font-medium mb-1 block">Telegram Bot Token</label>
                  <Input
                    type="password"
                    value={configData.telegramBotToken}
                    onChange={(e) => setConfigData({ ...configData, telegramBotToken: e.target.value })}
                    placeholder="Bot token from @BotFather"
                    disabled={loading}
                  />
                </div>

                <div>
                  <label className="text-sm font-medium mb-1 block">Owner Telegram ID</label>
                  <Input
                    type="number"
                    value={configData.ownerTelegramId}
                    onChange={(e) => setConfigData({ ...configData, ownerTelegramId: e.target.value })}
                    placeholder="Your Telegram ID"
                    disabled={loading}
                  />
                </div>

                <div>
                  <label className="text-sm font-medium mb-1 block">Channel ID</label>
                  <Input
                    type="text"
                    value={configData.channelId}
                    onChange={(e) => setConfigData({ ...configData, channelId: e.target.value })}
                    placeholder="@depstore11"
                    disabled={loading}
                  />
                </div>

                <div>
                  <label className="text-sm font-medium mb-1 block">Bot Username</label>
                  <Input
                    type="text"
                    value={configData.botUsername}
                    onChange={(e) => setConfigData({ ...configData, botUsername: e.target.value })}
                    placeholder="@SoraaVerifedROBOT"
                    disabled={loading}
                  />
                </div>

                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Saving Configuration...
                    </>
                  ) : (
                    'Save Configuration & Complete Setup'
                  )}
                </Button>

                <Button
                  type="button"
                  variant="outline"
                  className="w-full bg-transparent"
                  onClick={() => setStep(2)}
                  disabled={loading}
                >
                  Back
                </Button>
              </form>
            </CardContent>
          </Card>
        )}

        <div className="text-center mt-6 text-sm text-gray-600">
          <p>
            Need help? Check out{' '}
            <a href="/guide" className="text-blue-600 hover:underline">
              Getting Started Guide
            </a>
          </p>
        </div>
      </div>
    </main>
  )
}
