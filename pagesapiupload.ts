import type { NextApiRequest, NextApiResponse } from 'next';
import formidable from 'formidable';

export const config = {
  api: {
    bodyParser: false, // disable Next.js body parsing for file uploads
  },
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const form = new formidable.IncomingForm();

  form.parse(req, (err, fields, files) => {
    if (err) return res.status(500).json({ error: 'Error parsing form' });

    const file = (files as any)?.file;
    if (!file) return res.status(400).json({ error: 'No file uploaded' });

    const tmpPath = (file as any).filepath || (file as any).path;
    const name = (file as any).originalFilename || (file as any).name || 'unknown.xlsx';

    res.status(200).json({ filename: name, tmpPath });
  });
}
