import { createClient } from '@supabase/supabase-js'

// Hardcoded for quick start; switch to env vars later
const supabaseUrl = 'https://ogjlklpggqxtzcwgxmfc.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9namxrbHBnZ3F4dHpjd2d4bWZjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQ3OTY1MDUsImV4cCI6MjA3MDM3MjUwNX0.5PxYJLWoYBW0LH0VhItQMGzv4yFm2CSg-rBvrDEQoDI'

export const supabase = createClient(supabaseUrl, supabaseKey)
