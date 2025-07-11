'use client';

import { useState, useEffect } from 'react';
import { Upload, FileText, Trash2, Download, Eye } from 'lucide-react';
import { toast } from 'sonner';

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
    } catch (error) {
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
    } catch (error) {
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
    } catch (error) {
      toast.error('Error deleting PDF');
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
    <div className="container mx-auto p-6 max-w-4xl">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">PDF Manager</h1>
        
        {/* Upload Section */}
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 mb-6 text-center">
          <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
          <h3 className="text-lg font-medium text-gray-700 mb-2">Upload PDF Files</h3>
          <p className="text-gray-500 mb-4">Select PDF files to upload to the server</p>
          
          <label className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 cursor-pointer transition-colors">
            <Upload className="mr-2 h-4 w-4" />
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

        {/* Files List */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-800">Uploaded PDFs</h2>
          
          {loading ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
              <p className="mt-2 text-gray-600">Loading PDFs...</p>
            </div>
          ) : files.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <FileText className="mx-auto h-12 w-12 text-gray-300 mb-4" />
              <p>No PDF files uploaded yet</p>
            </div>
          ) : (
            <div className="grid gap-4">
              {files.map((file) => (
                <div key={file.filename} className="bg-gray-50 rounded-lg p-4 flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <FileText className="h-8 w-8 text-red-500" />
                    <div>
                      <h3 className="font-medium text-gray-800">{file.originalName}</h3>
                      <p className="text-sm text-gray-600">
                        {formatFileSize(file.size)} • Uploaded {formatDate(file.uploadedAt)}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <a
                      href={file.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors"
                      title="View PDF"
                    >
                      <Eye className="h-4 w-4" />
                    </a>
                    <a
                      href={file.url}
                      download={file.originalName}
                      className="p-2 text-green-600 hover:bg-green-100 rounded-lg transition-colors"
                      title="Download PDF"
                    >
                      <Download className="h-4 w-4" />
                    </a>
                    <button
                      onClick={() => handleDelete(file.filename)}
                      className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors"
                      title="Delete PDF"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
