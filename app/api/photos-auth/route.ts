import { NextRequest, NextResponse } from 'next/server';

const PASSWORD = process.env.PASSWORD || ''; // Set this in your env
const SECRET_KEY = process.env.PHOTOS_SECRET_KEY || '';

export async function POST(req: NextRequest) {
  const { password } = await req.json();
  if (password === PASSWORD) {
    return NextResponse.json({ success: true, secretKey: SECRET_KEY });
  } else {
    return NextResponse.json({ success: false, error: 'Invalid password' }, { status: 401 });
  }
}
