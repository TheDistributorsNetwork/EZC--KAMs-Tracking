import { useState, ChangeEvent } from 'react';
import Head from 'next/head';

interface UploadResponse {
  filename: string;
  tmpPath: string;
}

export default function Home() {
  const [message, setMessage] = useState('Courtesy Call Tool is running.');
  const [file, setFile] = useState<File | null>(null);
  const [uploadResult, setUploadResult] = useState<UploadResponse | null>(null);
  const [uploading, setUploading] = useState(false);

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
