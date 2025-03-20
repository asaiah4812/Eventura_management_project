-- Create events table
CREATE TABLE events (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT,
    date TIMESTAMP WITH TIME ZONE NOT NULL,
    location TEXT NOT NULL,
    ticket_price NUMERIC NOT NULL,
    total_tickets INTEGER NOT NULL,
    available_tickets INTEGER NOT NULL,
    organizer_wallet TEXT NOT NULL,
    image_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create tickets table
CREATE TABLE tickets (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    event_id UUID REFERENCES events(id) ON DELETE CASCADE,
    owner_wallet TEXT NOT NULL,
    purchase_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(event_id, owner_wallet)
);

-- Create indexes for better query performance
CREATE INDEX idx_events_organizer ON events(organizer_wallet);
CREATE INDEX idx_tickets_owner ON tickets(owner_wallet);
CREATE INDEX idx_tickets_event ON tickets(event_id);