import { NextRequest, NextResponse } from 'next/server';
import { readdir, stat } from 'fs/promises';
import path from 'path';

export async function GET() {
  try {
    const pdfsDirectory = path.join(process.cwd(), 'public', 'pdfs');
    const files = await readdir(pdfsDirectory);
    
    const pdfFiles = await Promise.all(
      files
        .filter(file => file.endsWith('.pdf'))
        .map(async (file) => {
          const filePath = path.join(pdfsDirectory, file);
          const stats = await stat(filePath);
          
          return {
            filename: file,
            url: `/pdfs/${file}`,
            size: stats.size,
            uploadedAt: stats.mtime,
            // Extract original name from timestamped filename
            originalName: file.replace(/^\d+-/, '')
          };
        })
    );

    return NextResponse.json({ pdfs: pdfFiles });
    
  } catch (error) {
    console.error('Error fetching PDFs:', error);
    return NextResponse.json(
      { error: 'Failed to fetch PDFs' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const filename = searchParams.get('filename');
    
    if (!filename) {
      return NextResponse.json({ error: 'Filename is required' }, { status: 400 });
    }

    const filepath = path.join(process.cwd(), 'public', 'pdfs', filename);
    
    // Import fs for deletion
    const { unlink } = await import('fs/promises');
    await unlink(filepath);

    return NextResponse.json({ message: 'PDF deleted successfully' });
    
  } catch (error) {
    console.error('Error deleting PDF:', error);
    return NextResponse.json(
      { error: 'Failed to delete PDF' },
      { status: 500 }
    );
  }
}
