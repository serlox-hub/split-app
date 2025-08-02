import { supabaseAdmin } from '@/lib/supabaseServer';

export async function GET(request, { params }) {
  try {
    const { groupId } = await params;

    const { data, error } = await supabaseAdmin
      .from('persons')
      .select()
      .eq('group_id', groupId);

    if (error) {
      return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }

    return new Response(JSON.stringify(data), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}

export async function POST(request, { params }) {
  try {
    const { groupId } = await params;
    const { name } = await request.json();

    if (!name || !groupId) {
      return new Response(JSON.stringify({ error: 'Name and groupId required' }), { status: 400 });
    }

    const { data, error } = await supabaseAdmin
      .from('persons')
      .insert({ name, group_id: groupId })
      .select()
      .single();

    if (error) {
      return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }

    return new Response(JSON.stringify(data), { status: 201 });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}
