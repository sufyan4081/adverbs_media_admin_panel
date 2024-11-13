import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://ocvdmqkvlacwfcknoxlo.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9jdmRtcWt2bGFjd2Zja25veGxvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDI1Mzc0NDEsImV4cCI6MjAxODExMzQ0MX0.col-2A9Jh1sVMjEVpoKkVtLvH8sGFcum-EVoHuRmpqA";
export const supabase = createClient(supabaseUrl, supabaseKey);
