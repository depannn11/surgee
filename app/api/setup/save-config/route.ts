import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function POST(request: NextRequest) {
  try {
    const {
      surgeToken,
      telegramBotToken,
      ownerTelegramId,
      channelId,
      botUsername,
    } = await request.json()

    // For now, store config in a config table or environment
    // In production, you might want to use a settings table

    // Create or update config entry
    const { data: existingConfig } = await supabase
      .from('config')
      .select('id')
      .limit(1)

    if (existingConfig && existingConfig.length > 0) {
      // Update existing
      const { error } = await supabase
        .from('config')
        .update({
          surge_token: surgeToken,
          telegram_bot_token: telegramBotToken,
          owner_telegram_id: ownerTelegramId,
          channel_id: channelId,
          bot_username: botUsername,
          updated_at: new Date().toISOString(),
        })
        .eq('id', existingConfig[0].id)

      if (error) throw error
    } else {
      // Create new
      const { error } = await supabase
        .from('config')
        .insert({
          surge_token: surgeToken,
          telegram_bot_token: telegramBotToken,
          owner_telegram_id: ownerTelegramId,
          channel_id: channelId,
          bot_username: botUsername,
        })

      if (error) throw error
    }

    return NextResponse.json({
      message: 'Configuration saved successfully',
    })
  } catch (error) {
    console.error('Config error:', error)
    return NextResponse.json(
      { error: 'Failed to save configuration' },
      { status: 500 }
    )
  }
}
