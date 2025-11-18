-- Step 1: Add new enum values for roles
ALTER TYPE app_role ADD VALUE IF NOT EXISTS 'hostel_admin';
ALTER TYPE app_role ADD VALUE IF NOT EXISTS 'institution_admin';
ALTER TYPE app_role ADD VALUE IF NOT EXISTS 'donor';
ALTER TYPE app_role ADD VALUE IF NOT EXISTS 'super_admin';