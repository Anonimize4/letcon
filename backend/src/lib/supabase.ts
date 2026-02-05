import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'

// Load environment variables
dotenv.config()

// Supabase configuration
const supabaseUrl = process.env.SUPABASE_URL
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

// Validate configuration
if (!supabaseUrl) {
  throw new Error('SUPABASE_URL environment variable is not set')
}

if (!supabaseServiceRoleKey) {
  throw new Error('SUPABASE_SERVICE_ROLE_KEY environment variable is not set')
}

// Create Supabase client with service role key for admin operations
export const supabase = createClient(supabaseUrl, supabaseServiceRoleKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
})

// Export configuration for reference
export const supabaseConfig = {
  url: supabaseUrl,
  key: supabaseServiceRoleKey.substring(0, 10) + '...', // Only log first 10 chars for security
  keyType: 'service_role' // Indicate this is the service role key
}
