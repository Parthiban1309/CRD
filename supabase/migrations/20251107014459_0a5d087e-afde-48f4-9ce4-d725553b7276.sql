-- Fix activity_logs RLS policy to prevent forgery
-- Drop the existing permissive INSERT policy
DROP POLICY IF EXISTS "Authenticated users can create activity logs" ON public.activity_logs;

-- Create a new policy that enforces user_id must match auth.uid()
CREATE POLICY "Users can only log their own activities"
ON public.activity_logs
FOR INSERT
TO authenticated
WITH CHECK (user_id = auth.uid());

-- Create a function to auto-populate user_name from profiles
CREATE OR REPLACE FUNCTION public.get_user_name(_user_id uuid)
RETURNS text
LANGUAGE sql
STABLE SECURITY DEFINER
SET search_path = public
AS $$
  SELECT COALESCE(full_name, 'Unknown User')
  FROM public.profiles
  WHERE id = _user_id
  LIMIT 1
$$;

-- Create a trigger to auto-populate user_name on insert
CREATE OR REPLACE FUNCTION public.set_activity_log_user_name()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Always set user_name based on the authenticated user, not user input
  NEW.user_name := public.get_user_name(NEW.user_id);
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS set_activity_log_user_name_trigger ON public.activity_logs;
CREATE TRIGGER set_activity_log_user_name_trigger
  BEFORE INSERT ON public.activity_logs
  FOR EACH ROW
  EXECUTE FUNCTION public.set_activity_log_user_name();