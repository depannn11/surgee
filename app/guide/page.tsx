'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ArrowLeft, CheckCircle } from 'lucide-react'

const steps = [
  {
    number: 1,
    title: 'Buat Akun',
    description: 'Daftar di SoraaDeploy dengan username, Telegram ID, dan password yang kuat.',
    details: [
      '🔗 Buka halaman Register (/register)',
      '👤 Masukkan username (unik dan mudah diingat)',
      '🔐 Masukkan Telegram ID Anda (cari di @userinfobot)',
      '🔑 Buat password minimal 6 karakter',
      '✅ Klik "Daftar" - akun langsung aktif!',
      '📝 Notifikasi akan dikirim ke channel admin'
    ]
  },
  {
    number: 2,
    title: 'Login ke Dashboard',
    description: 'Masuk dengan username dan password Anda, akses dashboard untuk mulai deploy.',
    details: [
      '🔗 Buka halaman Login (/login)',
      '👤 Masukkan username dan password',
      '🔑 Klik "Login"',
      '✅ Anda akan diarahkan ke dashboard',
      '📊 Di dashboard bisa lihat semua project dan statistik'
    ]
  },
  {
    number: 3,
    title: 'Siapkan File Website',
    description: 'Persiapkan file HTML dan aset lainnya sebelum upload.',
    details: [
      '📁 Kumpulkan semua file website Anda',
      '📄 Pastikan ada file "index.html" di folder utama',
      '🎨 Sertakan semua file CSS, JavaScript, gambar',
      '📦 Pilihan 1: Upload folder HTML individual',
      '📦 Pilihan 2: Buat ZIP file dari seluruh folder',
      '🧪 Test website di local sebelum upload',
      '⚠️ Max size per file: 100MB'
    ]
  },
  {
    number: 4,
    title: 'Upload Project',
    description: 'Upload file website Anda ke SoraaDeploy melalui halaman Deploy.',
    details: [
      '🚀 Buka halaman Deploy (/deploy)',
      '📂 Klik tombol "Upload File"',
      '📄 Pilih file HTML atau ZIP Anda',
      '⏳ Tunggu file selesai diupload (progress bar akan muncul)',
      '✅ Setelah upload selesai, Anda bisa lihat preview'
    ]
  },
  {
    number: 5,
    title: 'Atur Domain',
    description: 'Pilih domain untuk website Anda - auto-generate atau custom.',
    details: [
      '🌐 Sistem akan auto-suggest domain: [nama-project].surge.sh',
      '✏️ Anda bisa edit nama sesuai keinginan',
      '🔍 Klik "Cek Ketersediaan" untuk memastikan domain belum dipakai',
      '💡 Tips: gunakan nama yang mudah diingat dan relevan',
      '⚠️ Gunakan huruf kecil dan garis hubung, tidak boleh spasi'
    ]
  },
  {
    number: 6,
    title: 'Deploy Website',
    description: 'Deploy website Anda dengan satu klik - website langsung live!',
    details: [
      '🎯 Review semua setting: file, project name, domain',
      '🚀 Klik tombol "Deploy Sekarang"',
      '⏳ Tunggu proses deploy (biasanya 10-30 detik)',
      '✅ Setelah selesai, Anda dapat URL website',
      '📊 Status deployment bisa dilihat di dashboard',
      '🔗 Bagikan URL ke teman atau media sosial'
    ]
  },
  {
    number: 7,
    title: 'Kelola Project',
    description: 'Update, monitor, dan kelola semua project deployment Anda.',
    details: [
      '📊 Dashboard menampilkan semua project yang sudah di-deploy',
      '👁️ Klik project untuk lihat detail dan status',
      '📝 Lihat deployment logs untuk troubleshooting',
      '🔄 Update project: upload ulang file dan deploy ulang',
      '❌ Hapus project jika sudah tidak dibutuhkan',
      '👤 Lihat profil Anda: edit nama, bio, foto profile',
      '🔍 Cari project user lain dan lihat work mereka'
    ]
  },
  {
    number: 8,
    title: 'Tips & Trik',
    description: 'Panduan tambahan untuk hasil maksimal.',
    details: [
      '💡 Gunakan domain yang SEO-friendly dan mudah diingat',
      '📱 Test website di berbagai device (mobile, tablet, desktop)',
      '⚡ Optimalkan gambar agar website loading cepat',
      '🔒 Pastikan semua link di website bekerja dengan baik',
      '📊 Monitor traffic dan performa di analytics',
      '🤝 Share di media sosial untuk dapat lebih banyak pengunjung',
      '🆘 Jika ada error, cek file Anda atau hubungi admin'
    ]
  }
]

export default function GuidePage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border sticky top-0 z-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center gap-4">
            <Button variant="ghost" size="icon" asChild>
              <Link href="/">
                <ArrowLeft className="h-5 w-5" />
              </Link>
            </Button>
            <Link href="/" className="text-2xl font-bold">
              SoraaDeploy 
            </Link>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-12">
          <h1 className="mb-4 text-4xl font-bold">Panduan Lengkap SoraaDeploy</h1>
          <p className="text-lg text-muted-foreground">
            Tutorial step-by-step dari registrasi hingga deploy website. Ikuti panduan ini dan website Anda akan live dalam hitungan menit!
          </p>
        </div>
        <div className="space-y-6">
          {steps.map((step) => (
            <Card key={step.number} className="overflow-hidden hover:shadow-lg transition-shadow">
              <CardHeader className="bg-gradient-to-r from-primary/10 to-primary/5 border-b">
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold flex-shrink-0 text-sm">
                    {step.number}
                  </div>
                  <div className="flex-1">
                    <CardTitle className="text-xl">{step.title}</CardTitle>
                    <p className="mt-1 text-sm text-muted-foreground">{step.description}</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-6 pb-6">
                <ul className="space-y-2">
                  {step.details.map((detail, index) => (
                    <li key={index} className="flex items-start gap-3 text-sm">
                      <span className="text-primary font-semibold mt-0.5">•</span>
                      <span className="text-muted-foreground leading-relaxed">{detail}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Tips Section */}
        <Card className="mt-12 border-blue-500/50 bg-blue-500/5">
          <CardHeader>
            <CardTitle className="text-blue-500">💡 Tips for Success</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-muted-foreground">
            <p>• Keep your files organized in a clear folder structure</p>
            <p>• Test your website locally before uploading</p>
            <p>• Use descriptive project names for easy identification</p>
            <p>• Remember your domain - you'll need it to access your site</p>
            <p>• Monitor deployment logs if something goes wrong</p>
          </CardContent>
        </Card>

        {/* CTA */}
        <div className="mt-12 text-center">
          <p className="text-muted-foreground mb-4">Ready to deploy?</p>
          <Button size="lg" asChild>
            <Link href="/register">Get Started Now</Link>
          </Button>
        </div>
      </main>
    </div>
  )
}
