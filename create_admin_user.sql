-- 🔐 CREATE ADMIN USER FOR UNIVERSAL ACCESS
-- This script creates an admin user that can login from ANY device
-- Run this in Supabase SQL Editor

-- =============================================================================
-- STEP 1: Create Admin User Function (Helper)
-- =============================================================================

-- Function to create a user with email and password
CREATE OR REPLACE FUNCTION create_admin_user(
    user_email TEXT,
    user_password TEXT,
    user_name TEXT DEFAULT 'Admin'
)
RETURNS TEXT
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
    new_user_id UUID;
BEGIN
    -- Insert user into auth.users table
    INSERT INTO auth.users (
        instance_id,
        id,
        aud,
        role,
        email,
        encrypted_password,
        email_confirmed_at,
        recovery_sent_at,
        last_sign_in_at,
        raw_app_meta_data,
        raw_user_meta_data,
        created_at,
        updated_at,
        confirmation_token,
        email_change,
        email_change_token_new,
        recovery_token
    ) VALUES (
        '00000000-0000-0000-0000-000000000000',
        gen_random_uuid(),
        'authenticated',
        'authenticated',
        user_email,
        crypt(user_password, gen_salt('bf')),
        NOW(),
        NOW(),
        NOW(),
        '{"provider":"email","providers":["email"]}',
        jsonb_build_object('name', user_name),
        NOW(),
        NOW(),
        '',
        '',
        '',
        ''
    )
    RETURNING id INTO new_user_id;

    RETURN 'Admin user created successfully with ID: ' || new_user_id;
EXCEPTION
    WHEN unique_violation THEN
        RETURN 'User with email ' || user_email || ' already exists!';
    WHEN OTHERS THEN
        RETURN 'Error creating user: ' || SQLERRM;
END;
$$;

-- =============================================================================
-- STEP 2: Create the Default Admin User
-- =============================================================================

-- Create admin user with credentials that work on all devices
SELECT create_admin_user(
    'aplegolegaon@gmail.com',           -- Email
    'Aplegolegaon@1972',                 -- Password
    'Golegaon Admin'                     -- Display Name
);

-- =============================================================================
-- STEP 3: Verify Admin User Created
-- =============================================================================

-- Check if admin user exists
SELECT 
    id,
    email,
    email_confirmed_at IS NOT NULL as is_confirmed,
    created_at,
    last_sign_in_at
FROM auth.users
WHERE email = 'aplegolegaon@gmail.com';

-- =============================================================================
-- ALTERNATIVE: Simple Direct Insert (Use this if above doesn't work)
-- =============================================================================

/*
-- Direct insert method (uncomment if function method fails)

INSERT INTO auth.users (
    instance_id,
    id,
    aud,
    role,
    email,
    encrypted_password,
    email_confirmed_at,
    created_at,
    updated_at,
    raw_app_meta_data,
    raw_user_meta_data,
    confirmation_token,
    recovery_token
) VALUES (
    '00000000-0000-0000-0000-000000000000',
    gen_random_uuid(),
    'authenticated',
    'authenticated',
    'aplegolegaon@gmail.com',
    crypt('Aplegolegaon@1972', gen_salt('bf')),
    NOW(), -- This confirms the user immediately
    NOW(),
    NOW(),
    '{"provider":"email","providers":["email"]}',
    '{"name":"Golegaon Admin"}',
    '',
    ''
)
ON CONFLICT (email) DO NOTHING;
*/

-- =============================================================================
-- BONUS: Functions to Manage Admin Credentials
-- =============================================================================

-- Function to change admin password
CREATE OR REPLACE FUNCTION change_admin_password(
    user_email TEXT,
    new_password TEXT
)
RETURNS TEXT
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
    UPDATE auth.users 
    SET 
        encrypted_password = crypt(new_password, gen_salt('bf')),
        updated_at = NOW()
    WHERE email = user_email;
    
    IF FOUND THEN
        RETURN 'Password updated successfully for ' || user_email;
    ELSE
        RETURN 'User not found: ' || user_email;
    END IF;
END;
$$;

-- Function to confirm a user (make them able to login)
CREATE OR REPLACE FUNCTION confirm_admin_user(
    user_email TEXT
)
RETURNS TEXT
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
    UPDATE auth.users 
    SET 
        email_confirmed_at = NOW(),
        updated_at = NOW()
    WHERE email = user_email;
    
    IF FOUND THEN
        RETURN 'User confirmed successfully: ' || user_email;
    ELSE
        RETURN 'User not found: ' || user_email;
    END IF;
END;
$$;

-- =============================================================================
-- USAGE EXAMPLES
-- =============================================================================

-- Change password for existing admin
-- SELECT change_admin_password('aplegolegaon@gmail.com', 'NewPassword123!');

-- Confirm a user if they're not confirmed
-- SELECT confirm_admin_user('aplegolegaon@gmail.com');

-- Create additional admin users
-- SELECT create_admin_user('admin2@golegaon.com', 'SecurePass456!', 'Second Admin');

-- =============================================================================
-- VERIFICATION QUERIES
-- =============================================================================

-- List all admin users
SELECT 
    email,
    CASE 
        WHEN email_confirmed_at IS NOT NULL THEN 'Confirmed ✅'
        ELSE 'Not Confirmed ❌'
    END as status,
    created_at,
    last_sign_in_at
FROM auth.users
ORDER BY created_at DESC;

-- Check specific admin
SELECT 
    id,
    email,
    email_confirmed_at IS NOT NULL as can_login,
    created_at as registered_on
FROM auth.users
WHERE email = 'aplegolegaon@gmail.com';

-- =============================================================================
-- NOTES
-- =============================================================================

/*
IMPORTANT NOTES:

1. This admin user will work on ALL devices once created
2. No per-device setup needed - credentials are cloud-based
3. The user must be CONFIRMED to login (email_confirmed_at must be set)
4. Password is encrypted using bcrypt for security

CREDENTIALS:
Email: aplegolegaon@gmail.com
Password: Aplegolegaon@1972

LOGIN URL:
https://your-domain.com/login
OR
https://your-vercel-url.vercel.app/login

AFTER RUNNING THIS SCRIPT:
- Test login on desktop computer
- Test login on mobile phone
- Test login on tablet
- All should work with same credentials!

SECURITY:
- Change the password after first successful login
- Don't share credentials publicly
- Use strong, unique passwords
- Keep this file secure

TROUBLESHOOTING:
- If login fails, check if user is confirmed
- Verify email and password are exactly correct
- Check browser console for errors
- Try clearing cache/cookies
*/

-- =============================================================================
-- END OF SCRIPT
-- =============================================================================
