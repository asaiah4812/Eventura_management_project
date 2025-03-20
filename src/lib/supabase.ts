import { createClient } from "@supabase/supabase-js";

if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
  throw new Error("Missing env.NEXT_PUBLIC_SUPABASE_URL");
}
if (!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
  throw new Error("Missing env.NEXT_PUBLIC_SUPABASE_ANON_KEY");
}

export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
    },
  }
);

// Types
export interface Event {
  id: string;
  name: string;
  description: string;
  date: string;
  location: string;
  ticket_price: number;
  total_tickets: number;
  available_tickets: number;
  organizer_wallet: string;
  image_url?: string;
  created_at: string;
}

export interface Ticket {
  id: string;
  event_id: string;
  owner_wallet: string;
  purchase_date: string;
}

// Event functions
export async function createEvent(eventData: Omit<Event, "id" | "created_at">) {
  const { data, error } = await supabase
    .from("events")
    .insert([eventData])
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function getEvents() {
  const { data, error } = await supabase
    .from("events")
    .select("*")
    .order("date", { ascending: true });

  if (error) throw error;
  return data;
}

export async function getEventById(id: string) {
  const { data, error } = await supabase
    .from("events")
    .select("*")
    .eq("id", id)
    .single();

  if (error) throw error;
  if (!data) throw new Error("Event not found");
  return data;
}

export async function getUserEvents(walletAddress: string) {
  const { data, error } = await supabase
    .from("events")
    .select("*")
    .eq("organizer_wallet", walletAddress)
    .order("date", { ascending: true });

  if (error) throw error;
  return data;
}

export async function buyTicket(eventId: string, walletAddress: string) {
  // Start a transaction
  const { data: event, error: eventError } = await supabase
    .from("events")
    .select("available_tickets")
    .eq("id", eventId)
    .single();

  if (eventError) throw eventError;
  if (!event || event.available_tickets <= 0) {
    throw new Error("No tickets available");
  }

  // Create ticket
  const { data: ticket, error: ticketError } = await supabase
    .from("tickets")
    .insert([
      {
        event_id: eventId,
        owner_wallet: walletAddress,
        purchase_date: new Date().toISOString(),
      },
    ])
    .select()
    .single();

  if (ticketError) throw ticketError;

  // Update available tickets
  const { error: updateError } = await supabase
    .from("events")
    .update({ available_tickets: event.available_tickets - 1 })
    .eq("id", eventId);

  if (updateError) throw updateError;

  return ticket;
}

export async function getUserTickets(walletAddress: string) {
  const { data, error } = await supabase
    .from("tickets")
    .select(`
      *,
      events (*)
    `)
    .eq("owner_wallet", walletAddress)
    .order("purchase_date", { ascending: false });

  if (error) throw error;
  return data;
}
