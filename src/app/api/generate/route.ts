import { NextRequest, NextResponse } from 'next/server';
// @ts-ignore
import { generateWorkflows } from '../../../generator';

export async function POST(req: NextRequest) {
  try {
    const config = await req.json();

    if (!config || !config.projectType || !config.deployTarget) {
      return NextResponse.json(
        { error: 'Missing required config fields: projectType, deployTarget' },
        { status: 400 }
      );
    }

    const files = generateWorkflows(config);
    return NextResponse.json({ success: true, files });
  } catch (err: any) {
    console.error('Generation error:', err);
    return NextResponse.json(
      { error: err.message || 'Internal server error' },
      { status: 500 }
    );
  }
}
