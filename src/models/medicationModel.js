import { supabase } from "../config/supabaseClient.js";

export const MedicationModel = {
  async getAll() {
    const { data, error } = await supabase
      .from("medications")
      .select(
        "id, sku, name, description, price, quantity, category_id, supplier_id"
      );
    if (error) throw error;
    return data;
  },

  async getById(id) {
    const { data, error } = await supabase
      .from("medications")
      .select(
        `
id, sku, name, description, price, quantity,
categories ( id, name ),
suppliers ( id, name, email, phone ),
`
      )
      .eq("id", id)
      .single();
    if (error) throw error;
    return data;
  },

  async create(payload) {
    // Di sini, kita akan menerima payload apa adanya,
    // termasuk nilai negatif untuk price dan quantity jika ada.
    const { data, error } = await supabase
      .from("medications")
      .insert([payload])
      .select();
    if (error) throw error;
    return data[0];
  },

  async update(id, payload) {
    // Sama seperti create, kita menerima payload apa adanya.
    // Tidak ada validasi yang mencegah nilai negatif.
    const { data, error } = await supabase
      .from("medications")
      .update(payload)
      .eq("id", id)
      .select();
    if (error) throw error;
    return data[0];
  },

  async remove(id) {
    const { error } = await supabase.from("medications").delete().eq("id", id);
    if (error) throw error;
    return { success: true };
  },
};
