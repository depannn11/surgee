'use client'

import React from "react"

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Search, CheckCircle2, Loader2 } from 'lucide-react'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

interface UserProfile {
  id: string
  username: string
  is_admin: boolean
  bio?: string
}

export default function DiscoverPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [users, setUsers] = useState<UserProfile[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [selectedUser, setSelectedUser] = useState<string | null>(null)
  const [userProjects, setUserProjects] = useState<any[]>([])
  const [loadingProjects, setLoadingProjects] = useState(false)

  // Search users
  const handleSearch = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value
    setSearchQuery(query)
    setError('')

    if (!query.trim()) {
      setUsers([])
      setSelectedUser(null)
      setUserProjects([])
      return
    }

    setLoading(true)

    try {
      const { data, error: queryError } = await supabase
        .from('users')
        .select('id, username, is_admin, bio')
        .ilike('username', `%${query}%`)
        .limit(10)

      if (queryError) throw queryError

      setUsers(data || [])
    } catch (err) {
      setError('Pencarian gagal')
      console.error('[v0] Search error:', err)
    } finally {
      setLoading(false)
    }
  }

  // Get user projects
  const handleSelectUser = async (userId: string) => {
    setSelectedUser(userId)
    setLoadingProjects(true)

    try {
      const { data, error: queryError } = await supabase
        .from('projects')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false })

      if (queryError) throw queryError

      setUserProjects(data || [])
    } catch (err) {
      console.error('[v0] Failed to fetch projects:', err)
      setUserProjects([])
    } finally {
      setLoadingProjects(false)
    }
  }

  return (
    <div className="min-h-screen bg-background py-8">
      <main className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="mb-2 text-3xl font-bold">Temukan User</h1>
          <p className="text-muted-foreground">Cari dan lihat project dari user lain</p>
        </div>

        {/* Search Input */}
        <Card className="mb-8">
          <CardContent className="pt-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Cari username..."
                value={searchQuery}
                onChange={handleSearch}
                className="pl-10"
              />
            </div>
          </CardContent>
        </Card>

        {error && (
          <Alert variant="destructive" className="mb-4">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <div className="grid gap-6 md:grid-cols-3">
          {/* Users List */}
          <div className="md:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">User ({users.length})</CardTitle>
              </CardHeader>
              <CardContent>
                {loading && (
                  <div className="flex justify-center">
                    <Loader2 className="h-5 w-5 animate-spin" />
                  </div>
                )}

                {!loading && users.length === 0 && searchQuery && (
                  <p className="text-sm text-muted-foreground">Tidak ada user ditemukan</p>
                )}

                <div className="space-y-2">
                  {users.map((user) => (
                    <button
                      key={user.id}
                      onClick={() => handleSelectUser(user.id)}
                      className={`w-full rounded-lg border p-3 text-left transition-colors ${
                        selectedUser === user.id
                          ? 'border-primary bg-primary/10'
                          : 'border-muted hover:bg-muted'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <div className="flex-1 truncate">
                          <p className="font-semibold truncate">{user.username}</p>
                          {user.bio && (
                            <p className="truncate text-xs text-muted-foreground">{user.bio}</p>
                          )}
                        </div>
                        {user.is_admin && (
                          <CheckCircle2 className="h-5 w-5 flex-shrink-0 text-blue-500" />
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* User Projects */}
          <div className="md:col-span-2">
            {selectedUser ? (
              <Card>
                <CardHeader>
                  <CardTitle>Project</CardTitle>
                  <CardDescription>Project yang telah di-deploy</CardDescription>
                </CardHeader>
                <CardContent>
                  {loadingProjects && (
                    <div className="flex justify-center py-8">
                      <Loader2 className="h-5 w-5 animate-spin" />
                    </div>
                  )}

                  {!loadingProjects && userProjects.length === 0 && (
                    <p className="text-sm text-muted-foreground">Belum ada project</p>
                  )}

                  <div className="space-y-3">
                    {userProjects.map((project) => (
                      <div
                        key={project.id}
                        className="rounded-lg border border-muted bg-muted/30 p-4"
                      >
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1 truncate">
                            <p className="font-semibold truncate">{project.project_name}</p>
                            <p className="text-sm text-muted-foreground truncate">
                              {project.surge_url || project.domain}
                            </p>
                            <div className="mt-2 flex items-center gap-2">
                              <span
                                className={`inline-block rounded-full px-2 py-1 text-xs font-medium ${
                                  project.status === 'active'
                                    ? 'bg-green-500/20 text-green-700'
                                    : 'bg-yellow-500/20 text-yellow-700'
                                }`}
                              >
                                {project.status === 'active' ? 'Active' : 'Pending'}
                              </span>
                            </div>
                          </div>
                          {project.surge_url && (
                            <Link
                              href={`https://${project.surge_url}`}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <Button size="sm" variant="outline">
                                Buka
                              </Button>
                            </Link>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card>
                <CardContent className="flex h-64 items-center justify-center">
                  <p className="text-muted-foreground">Pilih user untuk lihat project mereka</p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
