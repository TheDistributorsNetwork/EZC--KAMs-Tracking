// pages/index.tsx
import { useState, useEffect, ChangeEvent } from 'react';
import Head from 'next/head';

interface UploadResponse {
  filename: string;
  tmpPath: string;
}

export default function Home() {
  const [message, setMessage] = useState('Loading...');
  const [file, setFile] = useState<File | null>(null);
  const [uploadResult, setUploadResult] = useState<UploadResponse | null>(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    setMessage('Courtesy Call Tool is running.');
  }, []);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setUploadResult(null);
    }
  };

  const handleUpload = async () => {
    if (!file) return;
    setUploading(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (!res.ok) throw new Error(`Upload failed: ${res.statusText}`);
      const data: UploadResponse = await res.json();
      setUploadResult(data);
      setMessage(`Uploaded: ${data.filename}`);
    } catch (err: any) {
      setMessage(`Error: ${err.message}`);
    } finally {
      setUploading(false);
    }
  };

  return (
    <>
      <Head>
        <title>Courtesy Call Tool</title>
        <meta name="description" content="Courtesy call tracker web tool" />
      </Head>
      <main style={{ padding: 24, fontFamily: 'Segoe UI, system-ui, Arial' }}>
        <h1>Courtesy Call Tool</h1>
        <p>{message}</p>

        <section style={{ marginTop: 16 }}>
          <input type="file" accept=".xlsx,.xls" onChange={handleFileChange} />
          <button
            onClick={handleUpload}
            disabled={!file || uploading}
            style={{ marginLeft: 8, padding: '4px 12px' }}
          >
            {uploading ? 'Uploading...' : 'Upload'}
          </button>

          {uploadResult && (
            <div style={{ marginTop: 16, color: 'green' }}>
              <p>File uploaded successfully!</p>
              <p>Filename: {uploadResult.filename}</p>
              <p>Temporary Path: {uploadResult.tmpPath}</p>
            </div>
          )}
        </section>
      </main>
    </>
  );
}

// Minimal API handler (Next.js 14+ supports route handlers in the same file for demo purposes)
export const config = { api: { bodyParser: false } };

export async function POST(req: Request) {
  const formData = await req.formData();
  const file = formData.get('file') as File | null;

  if (!file) {
    return new Response(JSON.stringify({ error: 'No file uploaded' }), { status: 400 });
  }

  // Here we just return a placeholder response
  return new Response(
    JSON.stringify({
      filename: file.name,
      tmpPath: `/tmp/${file.name}`,
    }),
    { status: 200 }
  );
}
