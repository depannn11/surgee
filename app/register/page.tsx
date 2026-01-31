'use client'

import React from "react"

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Loader2, Eye, EyeOff, AlertCircle, CheckCircle2, Copy } from 'lucide-react'

export default function RegisterPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    confirmPassword: '',
    telegramId: '', // Added telegramId to formData
  })
  const [step, setStep] = useState('form') // Declared step variable
  const [copied, setCopied] = useState(false) // Declared copied variable

  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (formData.password !== formData.confirmPassword) {
      setError('Password tidak cocok')
      return
    }

    if (formData.password.length < 6) {
      setError('Password minimal 6 karakter')
      return
    }

    setLoading(true)

    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: formData.username,
          password: formData.password,
          telegramId: formData.telegramId, // Included telegramId in the request body
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Registrasi gagal')
      }

      // Redirect to login
      router.push('/login')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Registrasi gagal')
    } finally {
      setLoading(false)
    }
  }

  const copyToClipboard = () => {
    // Placeholder for copyToClipboard function
    navigator.clipboard.writeText('Verification Code').then(() => {
      setCopied(true)
    }).catch(err => {
      console.error('Failed to copy text: ', err)
    })
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold">SoraaDeploy</h1>
          <p className="mt-2 text-muted-foreground">Deploy your sites in seconds</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Buat Akun</CardTitle>
            <CardDescription>Daftar dan mulai deploy website</CardDescription>
          </CardHeader>
          <CardContent>
            {step === 'form' ? (
              <form onSubmit={handleRegisterSubmit} className="space-y-4">
                {error && (
                  <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}

                <div className="space-y-2">
                  <label htmlFor="username" className="text-sm font-medium">
                    Username
                  </label>
                  <Input
                    id="username"
                    placeholder="Pilih username"
                    value={formData.username}
                    onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                    disabled={loading}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="password" className="text-sm font-medium">
                    Password
                  </label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Choose a strong password"
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      disabled={loading}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-2.5 text-muted-foreground hover:text-foreground"
                    >
                      {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="confirmPassword" className="text-sm font-medium">
                    Confirm Password
                  </label>
                  <Input
                    id="confirmPassword"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Confirm your password"
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                    disabled={loading}
                  />
                </div>

                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Creating account...
                    </>
                  ) : (
                    'Create Account'
                  )}
                </Button>

                <p className="text-center text-sm">
                  Sudah punya akun?{' '}
                  <Link href="/login" className="font-semibold text-primary hover:underline">
                    Login di sini
                  </Link>
                </p>
              </form>
            ) : (
              <div>
                <p className="text-center text-sm">Verification code sent to your Telegram.</p>
                <div className="flex justify-center">
                  <Button onClick={copyToClipboard} className="mt-4">
                    {copied ? (
                      <>
                        <CheckCircle2 className="mr-2 h-4 w-4" />
                        Copied!
                      </>
                    ) : (
                      <>
                        <Copy className="mr-2 h-4 w-4" />
                        Copy Code
                      </>
                    )}
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
