// Platform configuration - Hardcoded credentials

export interface PlatformConfig {
  surgeToken: string
  telegramBotToken: string
  telegramChannelId: string
  telegramOwnerId: string
  telegramBotUsername: string
  telegramBotUrl: string
}
export const defaultConfig: PlatformConfig = {
  surgeToken: '5796d21b55ad39d9167d1964cf47c8a2',
  telegramBotToken: '8213381742:AAFHnE7p7sUpreq0H0vgdpLlzkZ38FOnAj0',
  telegramChannelId: '-1003273545763',
  telegramOwnerId: '8412273544',
  telegramBotUsername: 'SoraaVerifedROBOT',
  telegramBotUrl: 'http://t.me/SoraaVerifedROBOT',
}

export const getPlatformConfig = async (): Promise<PlatformConfig> => {
  return defaultConfig
}

export const updatePlatformConfig = async (config: Partial<PlatformConfig>) => {
  console.log('[v0] Config updated:', config)
}
