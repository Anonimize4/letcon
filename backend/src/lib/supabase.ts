import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'

// Load environment variables
dotenv.config()

// Supabase configuration
const supabaseUrl = process.env.SUPABASE_URL
const supabaseKey = process.env.SUPABASE_KEY

// Validate configuration
if (!supabaseUrl) {
  throw new Error('SUPABASE_URL environment variable is not set')
}

if (!supabaseKey) {
  throw new Error('SUPABASE_KEY environment variable is not set')
}

// Create Supabase client
export const supabase = createClient(supabaseUrl, supabaseKey)

// Export configuration for reference
export const supabaseConfig = {
  url: supabaseUrl,
  key: supabaseKey.substring(0, 10) + '...', // Only log first 10 chars for security
}

