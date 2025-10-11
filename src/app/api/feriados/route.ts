import { NextRequest, NextResponse } from 'next/server';
import { addFeriados, getFeriados } from '@/lib/database';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const year = searchParams.get('year');
    const list = await getFeriados(year ? Number(year) : undefined);
    return NextResponse.json({ ok: true, feriados: list });
  } catch (e) {
    return NextResponse.json({ ok: false, error: String(e) }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const entries: Array<{ fecha: string; descripcion?: string }> = body?.feriados || [];
    if (!Array.isArray(entries) || entries.length === 0) {
      return NextResponse.json({ ok: false, error: 'feriados[] requerido' }, { status: 400 });
    }
    await addFeriados(entries);
    return NextResponse.json({ ok: true, added: entries.length });
  } catch (e) {
    return NextResponse.json({ ok: false, error: String(e) }, { status: 500 });
  }
}


