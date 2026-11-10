/*
# Scope club data to signed-in users

1. Summary
- Members and events now belong to the user who created them. Each signed-in user only sees and manages their own roster and calendar.
- The app now requires sign-in, so public (anonymous) access to these tables is removed.

2. Modified tables
- `members`: new `user_id` column that points to the owning account. It defaults to the signed-in user, so new rows are assigned automatically.
- `members`: the global uniqueness rule on email is replaced with one unique per owner, so two different users can each have a member with the same email.
- `events`: new `user_id` column with the same default and ownership rules.

3. Security changes
- Anonymous access is revoked from both tables.
- Signed-in users get select, insert, update, and delete policies on each table, limited to rows where `user_id` matches their own account.

4. Important notes
- Sample rows created before this change have no owner, so they are hidden from every user. They are not deleted and can be removed later if they are no longer needed.
- Existing rows are not modified beyond the new column being empty for them.
*/

ALTER TABLE members ADD COLUMN IF NOT EXISTS user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE;
ALTER TABLE members ALTER COLUMN user_id SET DEFAULT auth.uid();

ALTER TABLE events ADD COLUMN IF NOT EXISTS user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE;
ALTER TABLE events ALTER COLUMN user_id SET DEFAULT auth.uid();

ALTER TABLE members DROP CONSTRAINT IF EXISTS members_email_key;
CREATE UNIQUE INDEX IF NOT EXISTS members_user_email_key ON members (user_id, email);
CREATE INDEX IF NOT EXISTS members_user_id_idx ON members (user_id);
CREATE INDEX IF NOT EXISTS events_user_starts_at_idx ON events (user_id, starts_at);

REVOKE ALL ON members FROM anon;
REVOKE ALL ON events FROM anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON members TO authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON events TO authenticated;

DROP POLICY IF EXISTS "anon_select_members" ON members;
DROP POLICY IF EXISTS "anon_insert_members" ON members;
DROP POLICY IF EXISTS "anon_update_members" ON members;
DROP POLICY IF EXISTS "anon_delete_members" ON members;
DROP POLICY IF EXISTS "select_own_members" ON members;
CREATE POLICY "select_own_members" ON members FOR SELECT
  TO authenticated USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "insert_own_members" ON members;
CREATE POLICY "insert_own_members" ON members FOR INSERT
  TO authenticated WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "update_own_members" ON members;
CREATE POLICY "update_own_members" ON members FOR UPDATE
  TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "delete_own_members" ON members;
CREATE POLICY "delete_own_members" ON members FOR DELETE
  TO authenticated USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "anon_select_events" ON events;
DROP POLICY IF EXISTS "anon_insert_events" ON events;
DROP POLICY IF EXISTS "anon_update_events" ON events;
DROP POLICY IF EXISTS "anon_delete_events" ON events;
DROP POLICY IF EXISTS "select_own_events" ON events;
CREATE POLICY "select_own_events" ON events FOR SELECT
  TO authenticated USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "insert_own_events" ON events;
CREATE POLICY "insert_own_events" ON events FOR INSERT
  TO authenticated WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "update_own_events" ON events;
CREATE POLICY "update_own_events" ON events FOR UPDATE
  TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "delete_own_events" ON events;
CREATE POLICY "delete_own_events" ON events FOR DELETE
  TO authenticated USING (auth.uid() = user_id);
