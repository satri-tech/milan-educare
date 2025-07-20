'use client';

import { useState, useEffect } from 'react';
import { Upload, FileText, Trash2, Download, Eye, Copy, Check } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';

interface PDFFile {
  filename: string;
  originalName: string;
  url: string;
  size: number;
  uploadedAt: string;
}

export default function PdfUploader() {
  const [files, setFiles] = useState<PDFFile[]>([]);
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(true);
  const [copiedUrl, setCopiedUrl] = useState<string | null>(null);

  // Fetch existing PDFs on component mount
  useEffect(() => {
    fetchPDFs();
  }, []);

  const fetchPDFs = async () => {
    try {
      const response = await fetch('/api/admin/pdfs');
      const data = await response.json();
      if (response.ok) {
        setFiles(data.pdfs);
      } else {
        toast.error('Failed to fetch PDFs');
      }
    } catch {
      toast.error('Error fetching PDFs');
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.type.includes('pdf')) {
      toast.error('Only PDF files are allowed');
      return;
    }

    setUploading(true);
    const formData = new FormData();
    formData.append('pdf', file);

    try {
      const response = await fetch('/api/admin/pdfs/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        toast.success('PDF uploaded successfully!');
        fetchPDFs(); // Refresh the list
        // Reset file input
        event.target.value = '';
      } else {
        toast.error(data.error || 'Failed to upload PDF');
      }
    } catch {
      toast.error('Error uploading PDF');
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (filename: string) => {
    if (!confirm('Are you sure you want to delete this PDF?')) return;

    try {
      const response = await fetch(`/api/admin/pdfs?filename=${filename}`, {
        method: 'DELETE',
      });

      const data = await response.json();

      if (response.ok) {
        toast.success('PDF deleted successfully!');
        fetchPDFs(); // Refresh the list
      } else {
        toast.error(data.error || 'Failed to delete PDF');
      }
    } catch {
      toast.error('Error deleting PDF');
    }
  };
  const getFullUrl = (url: string) => {
    // If the URL is already absolute, return it as is
    if (url.startsWith('http://') || url.startsWith('https://')) {
      return url;
    }

    // Ensure the filename is properly appended to the /api/admin/files route
    const baseUrl = window.location.origin;
    const filename = url.startsWith('/') ? url.split('/').pop() : url;
    return `${baseUrl}/api/admin/files/${filename}`;
  };


  const handleCopyUrl = async (url: string) => {
    try {
      const fullUrl = getFullUrl(url);
      await navigator.clipboard.writeText(fullUrl);
      setCopiedUrl(url);
      toast.success('Full URL copied to clipboard!');

      // Reset the copied state after 2 seconds
      setTimeout(() => {
        setCopiedUrl(null);
      }, 2000);
    } catch {
      toast.error('Failed to copy URL');
    }
  };

  const formatFileSize = (bytes: number) => {
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    if (bytes === 0) return '0 Bytes';
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return Math.round(bytes / Math.pow(1024, i) * 100) / 100 + ' ' + sizes[i];
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="min-h-screen  py-8">
      <div className=" w-full">
        <div className=" rounded-xl shadow-sm px-4 flex flex-col gap-4">
          {/* Header */}

          <div>
            <h1 className="text-3xl font-bold mb-2">PDF Manager</h1>
            <p className="text-muted-foreground">
              Upload, manage, and share your PDF documents
            </p>
          </div>
          <div >
            {/* Upload Section */}
            <div className="  rounded-xl p-12 mb-8 text-center  border border-dashed bg-secondary">
              <div className="max-w-md mx-auto">
                <Upload className="mx-auto h-10 w-10  mb-4" />
                <h3 className="text-lg font-semibold  mb-2">Upload PDF Files</h3>
                <p className="text-muted-foreground  mb-6">Drag and drop or click to select PDF files</p>

                <label className="inline-flex items-center px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 cursor-pointer transition-all duration-200 shadow-sm hover:shadow-md disabled:opacity-50">
                  <Upload className="mr-2 h-5 w-5" />
                  {uploading ? 'Uploading...' : 'Choose PDF File'}
                  <input
                    type="file"
                    accept=".pdf"
                    onChange={handleFileUpload}
                    disabled={uploading}
                    className="hidden"
                  />
                </label>
              </div>
            </div>

            {/* Files List */}
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold ">Uploaded PDFs</h2>
                <span className="text-sm text-white border  px-3 py-1 rounded-full">
                  {files.length} file{files.length !== 1 ? 's' : ''}
                </span>
              </div>

              {loading ? (
                <div className="text-center py-16">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
                  <p className="mt-4 text-gray-600 text-lg">Loading PDFs...</p>
                </div>
              ) : files.length === 0 ? (
                <div className="text-center py-16 text-gray-500">
                  <FileText className="mx-auto h-12 w-12 text-gray-300 mb-4" />
                  <h3 className="text-lg font-medium text-gray-700 mb-2">No PDF files uploaded yet</h3>
                  <p className="text-gray-500">Upload your first PDF to get started</p>
                </div>
              ) : (
                <div className="grid gap-4">
                  {files.map((file) => (
                    <div key={file.filename} className=" border rounded-xl p-6 hover:shadow-md transition-shadow">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start space-x-4 flex-1">
                          <div className="border p-3 rounded-lg">
                            <FileText className="h-6 w-6 text-primary" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="font-semibold text-secondary-foreground text-base truncate pr-4">
                              {file.originalName}
                            </h3>
                            <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                              <span className="flex items-center gap-1">
                                <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                                {formatFileSize(file.size)}
                              </span>
                              <span>•</span>
                              <span>Uploaded {formatDate(file.uploadedAt)}</span>
                            </div>
                            {/* <div className='flex gap-2 mt-2  items-center  w-full '>
                              <div className=" p-1 pl-3 border rounded-lg w-full">
                                <div className="flex items-center gap-2">
                                  <span className="text-xs text-gray-500 font-medium">URL:</span>
                                  <code className="text-sm font-medium underline text-white px-2 py-1 rounded  flex-1 truncate">
                                    {getFullUrl(file.url)}
                                  </code>
                                </div>

                              </div>
                              <Button
                                onClick={() => handleCopyUrl(file.url)}
                                title="Copy Full URL"
                                variant={'outline'}
                                size={'icon'}
                              >
                                {copiedUrl === file.url ? (
                                  <Check className="h-4 w-4 text-green-600" />
                                ) : (
                                  <Copy className="h-4 w-4" />
                                )}
                              </Button>
                            </div> */}
                          </div>
                        </div>

                        <div className="flex items-center gap-2 ml-4">
                          <Button
                            onClick={() => handleCopyUrl(file.url)}
                            title="Copy Full URL"
                            variant={'outline'}
                            size={'icon'}
                          >
                            {copiedUrl === file.url ? (
                              <Check className="h-4 w-4 text-green-600" />
                            ) : (
                              <Copy className="h-4 w-4" />
                            )}
                          </Button>
                          <Button
                            variant={'outline'}
                            size={'icon'}
                          >
                            <a
                              href={getFullUrl(file.url)}
                              target="_blank"
                              rel="noopener noreferrer"
                              title="View PDF"
                            >
                              <Eye className="h-4 w-4" />
                            </a>
                          </Button>
                          <Button
                            variant={'outline'}
                            size={'icon'}
                          >
                            <a
                              href={getFullUrl(file.url)}
                              download={file.originalName}
                              title="Download PDF"
                            >
                              <Download className="h-4 w-4" />
                            </a>
                          </Button>
                          <Button
                            onClick={() => handleDelete(file.filename)}
                            variant={'outline'}
                            size={'icon'}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>

                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}