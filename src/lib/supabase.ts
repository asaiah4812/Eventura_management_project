import { createClient } from "@supabase/supabase-js";

if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
  throw new Error("Missing env.NEXT_PUBLIC_SUPABASE_URL");
}
if (!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
  throw new Error("Missing env.NEXT_PUBLIC_SUPABASE_ANON_KEY");
}

export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

// Types for our database tables
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

// Event related functions
export async function createEvent(eventData: Omit<Event, "id" | "created_at">) {
  console.log("Creating event with data:", eventData);
  try {
    // First, insert the event
    const { error: insertError } = await supabase
      .from("events")
      .insert([eventData]);

    if (insertError) {
      console.error("Error inserting event:", insertError.message);
      throw new Error(insertError.message);
    }

    // Then fetch the created event
    const { data: createdEvent, error: fetchError } = await supabase
      .from("events")
      .select("*")
      .eq("organizer_wallet", eventData.organizer_wallet)
      .order("created_at", { ascending: false })
      .limit(1)
      .single();

    if (fetchError) {
      console.error("Error fetching created event:", fetchError.message);
      throw new Error(fetchError.message);
    }

    if (!createdEvent) {
      throw new Error("Event was created but could not be fetched");
    }

    console.log("Successfully created event:", createdEvent);
    return createdEvent;
  } catch (err) {
    console.error("Error in createEvent:", err);
    throw err;
  }
}

export async function getEvents() {
  console.log("Fetching all events");
  try {
    const { data, error } = await supabase
      .from("events")
      .select("*")
      .order("date", { ascending: true });

    if (error) {
      console.error("Error fetching events:", error.message);
      throw new Error(error.message);
    }

    return data || [];
  } catch (err) {
    console.error("Error in getEvents:", err);
    throw err;
  }
}

export async function getEventById(id: string) {
  console.log("Fetching event by ID:", id);
  try {
    if (!id) {
      throw new Error("Event ID is required");
    }

    const { data, error } = await supabase
      .from("events")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      console.error("Supabase error fetching event:", error);
      throw new Error(error.message);
    }

    if (!data) {
      console.error("No event found with ID:", id);
      throw new Error("Event not found");
    }

    console.log("Successfully fetched event:", data);
    return data;
  } catch (err) {
    console.error("Error in getEventById:", err);
    throw err;
  }
}

export async function getUserEvents(walletAddress: string) {
  console.log("Fetching user events for wallet:", walletAddress);
  try {
    const { data, error } = await supabase
      .from("events")
      .select("*")
      .eq("organizer_wallet", walletAddress)
      .order("date", { ascending: true });

    if (error) {
      console.error("Error fetching user events:", error.message);
      throw new Error(error.message);
    }

    return data || [];
  } catch (err) {
    console.error("Error in getUserEvents:", err);
    throw err;
  }
}

export async function buyTicket(eventId: string, walletAddress: string) {
  console.log("Buying ticket:", { eventId, walletAddress });
  try {
    // Start a transaction
    const { data: event, error: eventError } = await supabase
      .from("events")
      .select("available_tickets")
      .eq("id", eventId)
      .single();

    if (eventError) {
      console.error("Error checking ticket availability:", eventError.message);
      throw new Error(eventError.message);
    }

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

    if (ticketError) {
      console.error("Error creating ticket:", ticketError.message);
      throw new Error(ticketError.message);
    }

    // Update available tickets
    const { error: updateError } = await supabase
      .from("events")
      .update({ available_tickets: event.available_tickets - 1 })
      .eq("id", eventId);

    if (updateError) {
      console.error("Error updating available tickets:", updateError.message);
      throw new Error(updateError.message);
    }

    return ticket;
  } catch (err) {
    console.error("Error in buyTicket:", err);
    throw err;
  }
}

export async function getUserTickets(walletAddress: string) {
  console.log("Fetching user tickets for wallet:", walletAddress);
  try {
    const { data, error } = await supabase
      .from("tickets")
      .select(
        `
        *,
        events (*)
      `
      )
      .eq("owner_wallet", walletAddress)
      .order("purchase_date", { ascending: false });

    if (error) {
      console.error("Error fetching user tickets:", error.message);
      throw new Error(error.message);
    }

    return data || [];
  } catch (err) {
    console.error("Error in getUserTickets:", err);
    throw err;
  }
}
