import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const url = req.nextUrl.searchParams.get('url');
  
  if (!url) {
    return new NextResponse('Missing URL parameter', { status: 400 });
  }
  
  try {
    const response = await fetch(url);
    
    if (!response.ok) {
      return new NextResponse(`Failed to fetch PDF: ${response.statusText}`, { status: response.status });
    }
    
    const arrayBuffer = await response.arrayBuffer();
    
    return new NextResponse(arrayBuffer, {
      headers: {
        'Content-Type': 'application/pdf',
        // Force the browser to display it inline instead of downloading
        'Content-Disposition': 'inline; filename="prescribing-information.pdf"',
        // Cache the response since PIs don't change often for a specific setid
        'Cache-Control': 'public, max-age=86400',
      },
    });
  } catch (error) {
    console.error('Error proxying PDF:', error);
    return new NextResponse('Internal Server Error fetching PDF', { status: 500 });
  }
}
