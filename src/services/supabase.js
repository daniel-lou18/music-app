import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://ldpwwdgijdcfmuxamxfe.supabase.co";
const supabaseKey = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxkcHd3ZGdpamRjZm11eGFteGZlIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTg0MTM0MDAsImV4cCI6MjAxMzk4OTQwMH0.g16DqD2v-NLBUI3Jqm4dtY56xddz6w1aS57Bk27uEmw`;
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
