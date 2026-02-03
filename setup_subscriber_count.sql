-- Create a secure function to get subscriber count
CREATE OR REPLACE FUNCTION get_subscriber_count()
RETURNS INTEGER
LANGUAGE plpgsql
SECURITY DEFINER -- Runs with privileges of the creator (admin), bypassing RLS
AS $$
BEGIN
  RETURN (SELECT count(*) FROM subscribers);
END;
$$;

-- Grant execute permission to public (anon) and authenticated users
GRANT EXECUTE ON FUNCTION get_subscriber_count() TO anon, authenticated, service_role;
