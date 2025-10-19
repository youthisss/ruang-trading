'use client'

import { useState, type FormEvent } from 'react'
import { useAdminModal } from '@/app/(admin)/admin/context/AdminModalContext' 

import { Button } from '@/app/(admin)/admin/components/ui/button'
import { Input } from '@/app/(admin)/admin/components/ui/input'
import { Label } from '@/app/(admin)/admin/components/ui/label'

export default function CreateSubmissionModal() {
  const { closeModal } = useAdminModal()

  const [nama, setNama] = useState('')
  const [email, setEmail] = useState('')
  const [whatsapp, setWhatsapp] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)

    try {
      const response = await fetch('/api/join', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nama, email, whatsapp, status: 'Pending' }),
      })

      if (!response.ok) {
        const result = await response.json()
        throw new Error(result.message || 'Gagal mengirim data')
      }

      alert('Data berhasil ditambahkan!')
      closeModal() 
      window.location.reload()

    } catch (err: unknown) { 
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Terjadi kesalahan yang tidak diketahui');
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 z-50 flex justify-center items-center p-4">
      <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md relative">
        <button 
          onClick={closeModal}
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
          disabled={isSubmitting}
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" /></svg>
        </button>

        <h2 className="text-xl font-bold mb-4">Tambah Pendaftar Baru</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="nama" className='mb-1'>Nama Anda</Label>
            <Input id="nama" type="text" value={nama} onChange={(e) => setNama(e.target.value)} required />
          </div>
          <div>
            <Label htmlFor="email" className='mb-1'>Email Aktif</Label>
            <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div>
            <Label htmlFor="whatsapp" className='mb-1'>No. Whatsapp</Label>
            <Input id="whatsapp" type="tel" value={whatsapp} onChange={(e) => setWhatsapp(e.target.value)} required />
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <div className="flex justify-end gap-2 pt-4">
            <Button type="button" variant="outline" onClick={closeModal} disabled={isSubmitting}>Batal</Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Menyimpan..." : "Simpan"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}