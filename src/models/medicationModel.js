import { supabase } from "../config/supabaseClient.js";

export const MedicationModel = {
  async getAll(name, page, limit) {
    let query = supabase
      .from("medications")
      .select(
        "id, sku, name, description, price, quantity, category_id, supplier_id"
      );

    // Searching by name (case-insensitive)
    if (name) {
      query = query.ilike("name", `%${name}%`);
    }

    // Pagination
    if (page && limit) {
      const from = (page - 1) * limit;
      const to = from + limit - 1;
      query = query.range(from, to);
    }

    const { data, error } = await query;
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
        suppliers ( id, name, email, phone )
        `
      )
      .eq("id", id)
      .single();
    if (error) throw error;
    return data;
  },

  async create(payload) {
    // Validation for price and quantity
    if (payload.price < 0 || payload.quantity < 0) {
      throw new Error("Price and quantity must be non-negative.");
    }
    const { data, error } = await supabase
      .from("medications")
      .insert([payload])
      .select()
      .single();
    if (error) throw error;
    return data;
  },

  async update(id, payload) {
    // Validation for price and quantity
    if (
      (payload.price !== undefined && payload.price < 0) ||
      (payload.quantity !== undefined && payload.quantity < 0)
    ) {
      throw new Error("Price and quantity must be non-negative.");
    }
    const { data, error } = await supabase
      .from("medications")
      .update(payload)
      .eq("id", id)
      .select()
      .single();
    if (error) throw error;
    return data;
  },

  async remove(id) {
    const { error } = await supabase.from("medications").delete().eq("id", id);
    if (error) throw error;
    return { success: true };
  },
};
