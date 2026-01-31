import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import bcrypt from 'bcrypt'
import { defaultConfig } from '@/lib/config'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

// Send notification to Telegram channel
async function notifyChannelNewUser(username: string, telegramId: string) {
  try {
    const message = `🆕 *Pengguna Baru Terdaftar*\n\nUsername: \`${username}\`\nTelegram ID: \`${telegramId}\`\nWaktu: ${new Date().toLocaleString('id-ID')}`
    
    const response = await fetch('https://api.telegram.org/bot' + defaultConfig.telegramBotToken + '/sendMessage', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: defaultConfig.telegramChannelId,
        text: message,
        parse_mode: 'Markdown',
      }),
    })

    if (!response.ok) {
      console.error('[v0] Failed to send Telegram notification:', await response.text())
    } else {
      console.log('[v0] Notification sent to channel for user:', username)
    }
  } catch (error) {
    console.error('[v0] Error sending Telegram notification:', error)
  }
}

export async function POST(request: NextRequest) {
  try {
    const { username, password } = await request.json()

    // Validate input
    if (!username || !password) {
      return NextResponse.json(
        { error: 'Username dan password diperlukan' },
        { status: 400 }
      )
    }

    if (password.length < 6) {
      return NextResponse.json(
        { error: 'Password minimal 6 karakter' },
        { status: 400 }
      )
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10)

    // Create user directly
    const { data: user, error: createError } = await supabase
      .from('users')
      .insert({
        username: username,
        telegram_id: 0, // Default, not required
        password_hash: hashedPassword,
        is_verified: true,
        is_admin: false,
      })
      .select()
      .single()

    if (createError) {
      console.error('[v0] Error creating user:', createError)
      
      if (createError.message.includes('duplicate')) {
        return NextResponse.json(
          { error: 'Username sudah terdaftar' },
          { status: 400 }
        )
      }
      
      return NextResponse.json(
        { error: 'Registrasi gagal: ' + createError.message },
        { status: 400 }
      )
    }

    // Send notification to channel
    await notifyChannelNewUser(username, 'N/A')

    console.log('[v0] User registered successfully:', username)

    // Return success with redirect to login
    return NextResponse.json({
      message: 'Registrasi berhasil! Silakan login.',
      redirectTo: '/login',
    })
  } catch (error) {
    console.error('[v0] Registration error:', error)
    return NextResponse.json(
      { error: 'Registrasi gagal' },
      { status: 500 }
    )
  }
}
