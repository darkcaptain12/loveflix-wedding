import { NextResponse } from 'next/server';
import { put, list } from '@vercel/blob';

const BLOB_NAME = 'rsvp-data.json';

interface RsvpEntry {
  name: string;
  count: number;
  side: string;
  timestamp: string;
}

interface RsvpData {
  total: number;
  entries: RsvpEntry[];
}

async function getData(): Promise<RsvpData> {
  try {
    const blobs = await list({ prefix: BLOB_NAME });
    if (blobs.blobs.length === 0) return { total: 0, entries: [] };
    const latest = blobs.blobs[blobs.blobs.length - 1];
    const res = await fetch(latest.url);
    return await res.json();
  } catch {
    return { total: 0, entries: [] };
  }
}

async function saveData(data: RsvpData) {
  await put(BLOB_NAME, JSON.stringify(data), {
    access: 'public',
    addRandomSuffix: false,
  });
}

export async function GET() {
  const data = await getData();
  return NextResponse.json({
    total: data.total,
    count: data.entries.length,
    entries: data.entries,
  });
}

export async function POST(request: Request) {
  const body = await request.json();
  const { name, count, side } = body;

  if (!name || !count || !side) {
    return NextResponse.json({ error: 'name, count, side required' }, { status: 400 });
  }

  const data = await getData();
  data.entries.push({
    name: String(name),
    count: Number(count),
    side: String(side),
    timestamp: new Date().toISOString(),
  });
  data.total = data.entries.reduce((sum, e) => sum + e.count, 0);
  await saveData(data);

  return NextResponse.json({ success: true, total: data.total, count: data.entries.length });
}
