import { createClient } from "@supabase/supabase-js";
import { Product } from "../components/ProductCard";

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL || "";
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY || "";

const SupabaseClient = createClient(supabaseUrl, supabaseAnonKey);

export const fetchProducts = async (): Promise<Product[]> => {
  const res = await SupabaseClient.from("product").select("*");
  return res.status === 200 ? (res.body as Product[]) : [];
};
