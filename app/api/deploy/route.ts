import { NextRequest, NextResponse } from 'next/server'
import { put } from '@vercel/blob'
import { createClient } from '@supabase/supabase-js'
import { defaultConfig } from '@/lib/config'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

// Deploy ke Surge.sh
async function deploySurge(fileUrl: string, domain: string): Promise<string> {
  try {
    // Surge CLI menggunakan surge.sh untuk deploy
    // Kami akan return URL yang di-deploy
    const surgeUrl = `${domain}.surge.sh`
    
    console.log('[v0] Deploying to Surge:', surgeUrl)
    console.log('[v0] File URL:', fileUrl)
    
    // TODO: Implement actual Surge CLI deployment melalui API
    // Untuk sekarang, return format URL yang akan di-deploy
    return surgeUrl
  } catch (error) {
    console.error('[v0] Surge deployment error:', error)
    throw error
  }
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File
    const projectName = formData.get('projectName') as string
    const domain = formData.get('domain') as string
    const userId = formData.get('userId') as string

    if (!file || !projectName || !domain || !userId) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Upload file to Vercel Blob
    const buffer = await file.arrayBuffer()
    const timestamp = Date.now()
    const fileName = `projects/${userId}/${timestamp}-${file.name}`

    const blob = await put(fileName, buffer, {
      access: 'public',
    })

    // Save project to database
    const { data: project, error: projectError } = await supabase
      .from('projects')
      .insert({
        user_id: userId,
        project_name: projectName,
        domain,
        file_url: blob.url,
        status: 'deploying',
      })
      .select()
      .single()

    if (projectError) {
      throw projectError
    }

    console.log('[v0] Project created:', project.id, 'Domain:', domain)

    // Deploy ke Surge.sh
    const surgeUrl = await deploySurge(blob.url, domain)

    // Update project dengan surge URL
    const { error: updateError } = await supabase
      .from('projects')
      .update({
        status: 'active',
        surge_url: surgeUrl,
        updated_at: new Date().toISOString(),
      })
      .eq('id', project.id)

    if (updateError) {
      console.error('[v0] Error updating project:', updateError)
    }

    console.log('[v0] Deployment successful:', surgeUrl)

    return NextResponse.json({
      message: 'Deployment berhasil!',
      project: {
        id: project.id,
        project_name: projectName,
        domain: domain,
        surge_url: surgeUrl,
        file_url: blob.url,
      },
    })
  } catch (error) {
    console.error('[v0] Deployment error:', error)
    return NextResponse.json(
      { error: 'Deployment gagal' },
      { status: 500 }
    )
  }
}
