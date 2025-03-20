-- Enable RLS
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE tickets ENABLE ROW LEVEL SECURITY;

-- Events policies
CREATE POLICY "Events are viewable by everyone"
ON events FOR SELECT
TO public
USING (true);

CREATE POLICY "Events can be created by anyone"
ON events FOR INSERT
TO public
WITH CHECK (true);

CREATE POLICY "Events can be updated by organizer"
ON events FOR UPDATE
TO public
USING (organizer_wallet = current_user);

-- Tickets policies
CREATE POLICY "Tickets are viewable by owner"
ON tickets FOR SELECT
TO public
USING (owner_wallet = current_user);

CREATE POLICY "Tickets can be created by anyone"
ON tickets FOR INSERT
TO public
WITH CHECK (true);