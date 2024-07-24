import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import axios from 'axios';

export async function GET(request) {
  revalidatePath(request.url);

  try {
    const uri = request.headers.get('uri');
    console.log({ uri });
    const skyTradeApiUrl = `http://dev-api.sky.trade/api/proxy?${Date.now()}`;

    const apiData = await axios.get(skyTradeApiUrl, {
      headers: {
        'Content-Type': 'application/json',
        uri,
        api_key: 'XXX',
      },
    });
    console.log({ apiData }, 'data');
    return NextResponse.json(
      {},
      {
        status: 200,
      }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error },
      {
        status: 500,
      }
    );
  }
}
