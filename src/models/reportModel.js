import { supabase } from "../config/supabaseClient.js";

export const ReportModel = {
  async getTotalMedications() {
    // Get the total count of rows from the 'medications' table
    const { count, error } = await supabase
      .from("medications")
      .select("*", { count: "exact", head: true });

    if (error) {
      throw error;
    }
    return { total: count };
  },
};
