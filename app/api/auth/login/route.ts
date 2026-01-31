import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import bcrypt from 'bcrypt'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function POST(request: NextRequest) {
  try {
    const { username, password } = await request.json()

    if (!username || !password) {
      return NextResponse.json(
        { error: 'Username dan password diperlukan' },
        { status: 400 }
      )
    }

    // Query user dari database
    const { data: user, error: queryError } = await supabase
      .from('users')
      .select('*')
      .eq('username', username)
      .single()

    if (queryError || !user) {
      console.log('[v0] Login failed: user not found -', username)
      return NextResponse.json(
        { error: 'Username atau password salah' },
        { status: 401 }
      )
    }

    // Check if user is blocked
    if (user.is_blocked) {
      return NextResponse.json(
        { error: 'Akun Anda telah diblokir' },
        { status: 403 }
      )
    }

    // Verify password dengan bcrypt
    const isPasswordValid = await bcrypt.compare(password, user.password_hash)

    if (!isPasswordValid) {
      console.log('[v0] Login failed: invalid password for', username)
      return NextResponse.json(
        { error: 'Username atau password salah' },
        { status: 401 }
      )
    }

    console.log('[v0] Login successful for user:', username)

    // Login successful
    const response = NextResponse.json({
      message: 'Login berhasil',
      user: {
        id: user.id,
        username: user.username,
        isAdmin: user.is_admin,
        isVerified: user.is_verified,
      },
    })

    // Set secure HTTP-only cookie
    response.cookies.set('session', JSON.stringify({ userId: user.id, isAdmin: user.is_admin }), {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7, // 7 days
    })

    return response
  } catch (error) {
    console.error('[v0] Login error:', error)
    return NextResponse.json(
      { error: 'Login gagal' },
      { status: 500 }
    )
  }
}
