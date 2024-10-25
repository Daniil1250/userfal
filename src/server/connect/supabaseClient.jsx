import { createClient } from '@supabase/supabase-js';



const supabaseUrl = 'https://bbscazghtlmasjlcnwsr.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJic2NhemdodGxtYXNqbGNud3NyIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcyODMxNjc3OCwiZXhwIjoyMDQzODkyNzc4fQ.QscsDcNxx3Oz86wFJVD0uP2mw3H_ml4iqXTGOzbvLsU';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
