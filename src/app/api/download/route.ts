import { NextRequest } from 'next/server';
import archiver from 'archiver';
// @ts-ignore
import { generateWorkflows } from '../../../generator';

export async function POST(req: NextRequest) {
  try {
    const config = await req.json();

    if (!config || !config.projectType || !config.deployTarget) {
      return new Response('Missing required config fields', { status: 400 });
    }

    const files = generateWorkflows(config);

    // Using a web TransformStream to link Node archiver output to Next.js Response
    const { readable, writable } = new TransformStream();
    const writer = writable.getWriter();

    const archive = archiver('zip', { zlib: { level: 9 } });

    archive.on('data', (chunk) => {
      writer.write(chunk);
    });

    archive.on('end', () => {
      writer.close();
    });

    archive.on('error', (err) => {
      writer.abort(err);
    });

    for (const [filePath, content] of Object.entries(files)) {
      archive.append(content as string, { name: filePath });
    }

    archive.finalize();

    return new Response(readable, {
      headers: {
        'Content-Type': 'application/zip',
        'Content-Disposition': 'attachment; filename="github-workflows.zip"',
      },
    });
  } catch (err: any) {
    console.error('Download error:', err);
    return new Response(err.message || 'Internal server error', { status: 500 });
  }
}
