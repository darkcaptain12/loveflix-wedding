import { NextResponse } from 'next/server';
import { readFile, writeFile } from 'fs/promises';
import { existsSync } from 'fs';

const DATA_FILE = '/tmp/rsvp-data.json';

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
    if (!existsSync(DATA_FILE)) return { total: 0, entries: [] };
    const raw = await readFile(DATA_FILE, 'utf-8');
    return JSON.parse(raw);
  } catch {
    return { total: 0, entries: [] };
  }
}

async function saveData(data: RsvpData) {
  await writeFile(DATA_FILE, JSON.stringify(data, null, 2));
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
  try {
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
  } catch {
    return NextResponse.json({ error: 'server error' }, { status: 500 });
  }
}
