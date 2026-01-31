'use client'

import React from "react"

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Search, Mail, AlertCircle, CheckCircle, Loader2, LogOut } from 'lucide-react'

interface User {
  id: string
  username: string
  email: string
  telegram_id: number
  full_name?: string
  avatar_url?: string
  is_verified: boolean
  is_blocked: boolean
  created_at: string
}

interface BroadcastMessage {
  title: string
  message: string
}

export default function AdminPage() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [users, setUsers] = useState<User[]>([])
  const [filteredUsers, setFilteredUsers] = useState<User[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [loading, setLoading] = useState(true)
  const [broadcasting, setBroadcasting] = useState(false)
  const [showBroadcastForm, setShowBroadcastForm] = useState(false)
  const [broadcastData, setBroadcastData] = useState<BroadcastMessage>({
    title: '',
    message: '',
  })
  const [successMessage, setSuccessMessage] = useState('')

  useEffect(() => {
    const userData = localStorage.getItem('user')
    if (!userData) {
      router.push('/login')
      return
    }

    const parsedUser = JSON.parse(userData)
    if (!parsedUser.isAdmin) {
      router.push('/dashboard')
      return
    }

    setUser(parsedUser)

    // TODO: Fetch users from API
    // Mock data for now
    const mockUsers: User[] = [
      {
        id: '1',
        username: 'john_doe',
        email: 'john@example.com',
        telegram_id: 123456789,
        full_name: 'John Doe',
        is_verified: true,
        is_blocked: false,
        created_at: new Date(Date.now() - 86400000).toISOString(),
      },
      {
        id: '2',
        username: 'jane_smith',
        email: 'jane@example.com',
        telegram_id: 987654321,
        full_name: 'Jane Smith',
        is_verified: true,
        is_blocked: false,
        created_at: new Date(Date.now() - 172800000).toISOString(),
      },
      {
        id: '3',
        username: 'admin',
        email: 'admin@depstore.dev',
        telegram_id: 111111111,
        full_name: 'Admin User',
        is_verified: true,
        is_blocked: false,
        created_at: new Date(Date.now() - 604800000).toISOString(),
      },
    ]

    setUsers(mockUsers)
    setFilteredUsers(mockUsers)
    setLoading(false)
  }, [router])

  const handleSearch = (term: string) => {
    setSearchTerm(term)
    const filtered = users.filter(
      (u) =>
        u.username.toLowerCase().includes(term.toLowerCase()) ||
        u.email.toLowerCase().includes(term.toLowerCase()) ||
        u.full_name?.toLowerCase().includes(term.toLowerCase())
    )
    setFilteredUsers(filtered)
  }

  const handleBlockUser = async (userId: string) => {
    // TODO: Implement block user API
    console.log('Blocking user:', userId)
    setUsers(
      users.map((u) =>
        u.id === userId ? { ...u, is_blocked: !u.is_blocked } : u
      )
    )
    setFilteredUsers(
      filteredUsers.map((u) =>
        u.id === userId ? { ...u, is_blocked: !u.is_blocked } : u
      )
    )
  }

  const handleBroadcast = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!broadcastData.title || !broadcastData.message) {
      alert('Please fill in all fields')
      return
    }

    setBroadcasting(true)
    try {
      // TODO: Implement broadcast API
      console.log('Sending broadcast:', broadcastData)

      // Simulate sending to all users
      await new Promise((resolve) => setTimeout(resolve, 1500))

      setSuccessMessage(`Message sent to ${users.length} users!`)
      setBroadcastData({ title: '', message: '' })
      setShowBroadcastForm(false)

      setTimeout(() => setSuccessMessage(''), 3000)
    } catch (error) {
      console.error('Broadcast failed:', error)
      alert('Failed to send broadcast')
    } finally {
      setBroadcasting(false)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('user')
    router.push('/')
  }

  if (loading || !user) {
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
            <div className="text-right">
              <p className="text-sm font-medium">
                {user.username}
                <span className="text-green-500 ml-2">✓ Admin</span>
              </p>
              <Button variant="ghost" size="sm" onClick={handleLogout} className="mt-1">
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Title */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold">Admin Dashboard</h1>
          <p className="text-muted-foreground mt-2">Manage users and send broadcasts</p>
        </div>

        {/* Success Message */}
        {successMessage && (
          <Alert className="mb-8 border-green-500/50 bg-green-500/5">
            <CheckCircle className="h-4 w-4 text-green-500" />
            <AlertDescription className="text-green-700">{successMessage}</AlertDescription>
          </Alert>
        )}

        {/* Stats */}
        <div className="grid gap-4 md:grid-cols-4 mb-8">
          <Card>
            <CardContent className="pt-6">
              <p className="text-sm text-muted-foreground">Total Users</p>
              <p className="text-3xl font-bold mt-2">{users.length}</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <p className="text-sm text-muted-foreground">Verified</p>
              <p className="text-3xl font-bold mt-2 text-green-500">
                {users.filter((u) => u.is_verified).length}
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <p className="text-sm text-muted-foreground">Blocked</p>
              <p className="text-3xl font-bold mt-2 text-red-500">
                {users.filter((u) => u.is_blocked).length}
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <p className="text-sm text-muted-foreground">Active</p>
              <p className="text-3xl font-bold mt-2 text-blue-500">
                {users.filter((u) => !u.is_blocked).length}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Broadcast Section */}
        <Card className="mb-8">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Send Broadcast</CardTitle>
              <CardDescription>Send a message to all registered users</CardDescription>
            </div>
            <Button
              onClick={() => setShowBroadcastForm(!showBroadcastForm)}
              variant={showBroadcastForm ? 'default' : 'outline'}
            >
              {showBroadcastForm ? 'Cancel' : 'New Broadcast'}
            </Button>
          </CardHeader>
          {showBroadcastForm && (
            <CardContent>
              <form onSubmit={handleBroadcast} className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Title</label>
                  <Input
                    placeholder="Broadcast title"
                    value={broadcastData.title}
                    onChange={(e) =>
                      setBroadcastData({ ...broadcastData, title: e.target.value })
                    }
                    disabled={broadcasting}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Message</label>
                  <textarea
                    className="w-full min-h-24 px-3 py-2 rounded-md border border-input bg-background text-foreground"
                    placeholder="Your broadcast message"
                    value={broadcastData.message}
                    onChange={(e) =>
                      setBroadcastData({ ...broadcastData, message: e.target.value })
                    }
                    disabled={broadcasting}
                  />
                </div>
                <div className="flex gap-2">
                  <Button type="submit" disabled={broadcasting} className="flex-1">
                    {broadcasting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Mail className="mr-2 h-4 w-4" />
                        Send to All Users
                      </>
                    )}
                  </Button>
                  <p className="text-sm text-muted-foreground self-center">
                    Recipients: {users.length}
                  </p>
                </div>
              </form>
            </CardContent>
          )}
        </Card>

        {/* Users List */}
        <Card>
          <CardHeader>
            <CardTitle>Users</CardTitle>
            <CardDescription>Manage all registered users</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mb-6">
              <div className="relative">
                <Search className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                <Input
                  placeholder="Search by username, email, or name..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => handleSearch(e.target.value)}
                />
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                Showing {filteredUsers.length} of {users.length} users
              </p>
            </div>

            {/* Users Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 px-4 font-semibold">User</th>
                    <th className="text-left py-3 px-4 font-semibold">Email</th>
                    <th className="text-left py-3 px-4 font-semibold">Status</th>
                    <th className="text-left py-3 px-4 font-semibold">Joined</th>
                    <th className="text-right py-3 px-4 font-semibold">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.map((u) => (
                    <tr key={u.id} className="border-b border-border hover:bg-muted/50">
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-3">
                          <Avatar className="h-8 w-8">
                            <AvatarFallback>
                              {u.username.substring(0, 2).toUpperCase()}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{u.username}</p>
                            {u.full_name && (
                              <p className="text-xs text-muted-foreground">{u.full_name}</p>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-4 text-muted-foreground">{u.email}</td>
                      <td className="py-4 px-4">
                        <div className="flex gap-2">
                          {u.is_verified && (
                            <span className="text-xs bg-green-500/10 text-green-700 px-2 py-1 rounded">
                              Verified
                            </span>
                          )}
                          {u.is_blocked && (
                            <span className="text-xs bg-red-500/10 text-red-700 px-2 py-1 rounded">
                              Blocked
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="py-4 px-4 text-muted-foreground text-xs">
                        {new Date(u.created_at).toLocaleDateString()}
                      </td>
                      <td className="py-4 px-4 text-right">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleBlockUser(u.id)}
                        >
                          {u.is_blocked ? 'Unblock' : 'Block'}
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {filteredUsers.length === 0 && (
              <div className="text-center py-8">
                <AlertCircle className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
                <p className="text-muted-foreground">No users found</p>
              </div>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
