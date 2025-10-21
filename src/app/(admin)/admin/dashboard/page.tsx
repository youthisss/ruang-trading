'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAdminModal } from '@/app/(admin)/admin/context/AdminModalContext' 
import { 
  Breadcrumb, 
  BreadcrumbItem, 
  BreadcrumbLink, 
  BreadcrumbList
} from "@/app/(admin)/admin/components/ui/breadcrumb"
import { Separator } from "@/app/(admin)/admin/components/ui/separator"
import { SidebarTrigger } from "@/app/(admin)/admin/components/ui/sidebar"
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from "@/app/(admin)/admin/components/ui/card"
import { Button } from '@/app/(admin)/admin/components/ui/button'
import { LogoutButton } from '@/app/(admin)/admin/components/ui/logoutButton'
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/app/(admin)/admin/components/ui/table"

type Submission = {
  id: string;
  name: string;
  email: string;
  status: "Pending" | "Approved" | "Rejected";
  created_at: string;
  whatsapp?: string;
};

export default function DashboardPage() {
  const { openModal } = useAdminModal() 
  const router = useRouter();

  const [submissions, setSubmissions] = useState<Submission[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null); 

  async function fetchSubmissions() { 
    setIsLoading(true);
    setError(null);
    try {
      console.log('Fetching submissions...');
      
      // Gunakan endpoint yang konsisten - sesuaikan dengan API route Anda
      const response = await fetch('/api/submissions', {
        method: 'GET',
        cache: 'no-store'
      });

      console.log('Response status:', response.status);
      
      if (response.status === 401) {
        router.push('/login');
        return;
      }

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('Fetched data:', data);

      // Sesuaikan dengan struktur response API Anda
      const submissionsData = data.users || data.submissions || data || [];
      setSubmissions(submissionsData);

    } catch (error) {
      console.error('Error fetching submissions:', error);
      setError(error instanceof Error ? error.message : 'Gagal mengambil data');
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => { 
    fetchSubmissions();
  }, []); // router tidak perlu di dependency karena stabil
  
  const handleAddNew = () => { openModal('createSubmission') }

  const handleChangeStatus = async (submission: Submission) => { 
    let nextStatus: Submission['status'];
    if (submission.status === 'Pending') {
      nextStatus = 'Approved';
    } else if (submission.status === 'Approved') {
      nextStatus = 'Rejected';
    } else {
      nextStatus = 'Pending';
    }
    
    setUpdatingId(submission.id);
    try {
      const response = await fetch(`/api/submissions/${submission.id}`, { 
        method: 'PATCH', 
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: nextStatus }), 
      });

      if (!response.ok) { 
        const result = await response.json().catch(() => ({})); 
        throw new Error(result.message || 'Gagal memperbarui status'); 
      }

      await fetchSubmissions(); 
      alert('Status berhasil diubah!');
    } catch (error: unknown) { 
      console.error("Error updating status:", error);
      alert(`Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally { 
      setUpdatingId(null); 
    }
  };

  const handleDelete = async (submissionId: string) => { 
    if (!window.confirm("Apakah Anda yakin ingin menghapus data ini?")) {
      return;
    }

    setDeletingId(submissionId);
    try {
      const response = await fetch(`/api/submissions/${submissionId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        if (response.status !== 204) {
          try { await response.json(); } catch (e) { /* ignore */ }
        }
        await fetchSubmissions();
        alert('Data berhasil dihapus!');
      } else {
        let errorMessage = `Gagal menghapus data (Status: ${response.status})`;
        try {
          const result = await response.json();
          errorMessage = result.message || errorMessage;
        } catch (jsonError) { /* ignore */ }
        throw new Error(errorMessage);
      } 
    } catch (error: unknown) {
      console.error("Error deleting submission:", error);
      alert(`Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="flex flex-col h-full w-full"> 
      <header className="flex h-16 shrink-0 items-center justify-between gap-2 border-b px-8 bg-white sticky top-0 z-10 w-full"> 
        <div className="flex items-center gap-2">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink href="/admin/dashboard" className='font-semibold text-black text-xl'>
                  Dashboard
                </BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
        <div className='flex items-center gap-2'>
          <Button onClick={handleAddNew}>+ Add New</Button>
          <LogoutButton />
        </div>
      </header>

      <div className="flex-1 flex flex-col gap-8 p-8 w-full overflow-y-auto"> 
        <div className="grid auto-rows-min gap-8 md:grid-cols-3 w-full"> 
          <Card> 
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Total Submissions</CardTitle>
            </CardHeader> 
            <CardContent className="pt-2">
              <div className="text-3xl font-bold">{submissions.length}</div>
            </CardContent> 
          </Card>
          <Card> 
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Approved</CardTitle>
            </CardHeader> 
            <CardContent className="pt-2">
              <div className="text-3xl font-bold">
                {submissions.filter((s) => s.status === "Approved").length}
              </div>
            </CardContent> 
          </Card>
          <Card> 
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Pending</CardTitle>
            </CardHeader> 
            <CardContent className="pt-2">
              <div className="text-3xl font-bold">
                {submissions.filter((s) => s.status === "Pending").length}
              </div>
            </CardContent> 
          </Card>
        </div>

        <Card className="w-full">
          <CardHeader>
            <CardTitle>Recent Submissions</CardTitle>
          </CardHeader>
          <CardContent> 
            <div className="overflow-x-auto">
              {error ? (
                <div className="text-center py-4 text-red-600">
                  <p>Error: {error}</p>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="mt-2"
                    onClick={fetchSubmissions}
                  >
                    Retry
                  </Button>
                </div>
              ) : isLoading ? (
                <p className='text-center py-4'>Loading data...</p>
              ) : (
                <Table>
                  <TableHeader> 
                    <TableRow> 
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>WhatsApp</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow> 
                  </TableHeader>
                  <TableBody>
                    {submissions.length === 0 ? ( 
                      <TableRow> 
                        <TableCell colSpan={6} className="text-center py-4">
                          No submissions found.
                        </TableCell> 
                      </TableRow> 
                    ) : ( 
                      submissions.map((submission) => (
                        <TableRow key={submission.id}>
                          <TableCell>{submission.name}</TableCell>
                          <TableCell>{submission.email}</TableCell>
                          <TableCell>{submission.whatsapp || '-'}</TableCell> 
                          <TableCell>
                            <span
                              className={`px-2 py-1 rounded text-xs font-medium ${
                                submission.status === "Approved" 
                                  ? "bg-green-100 text-green-800"
                                  : submission.status === "Pending" 
                                  ? "bg-yellow-100 text-yellow-800"
                                  : "bg-red-100 text-red-800"
                              }`}
                            >
                              {submission.status}
                            </span>
                          </TableCell>
                          <TableCell>
                            {new Date(submission.created_at).toLocaleDateString()}
                          </TableCell>
                          <TableCell className="flex gap-2">
                            <Button 
                              variant="outline" 
                              size="sm" 
                              onClick={() => handleChangeStatus(submission)} 
                              disabled={updatingId === submission.id || deletingId === submission.id}
                            >
                              {updatingId === submission.id ? 'Updating...' : 'Change Status'}
                            </Button>
                            <Button
                              variant="destructive" 
                              size="sm"
                              onClick={() => handleDelete(submission.id)}
                              disabled={deletingId === submission.id || updatingId === submission.id} 
                            >
                              {deletingId === submission.id ? 'Deleting...' : 'Delete'}
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div> 
  )
}