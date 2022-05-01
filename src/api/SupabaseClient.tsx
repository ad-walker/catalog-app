import { createClient } from "@supabase/supabase-js";
import { Product } from "../components/ProductCard";

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL || "";
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY || "";

const SupabaseClient = createClient(supabaseUrl, supabaseAnonKey);

export interface ProductSearchProps {
  searchTerm: string;
  minPrice: number;
  maxPrice: number;
  inStockOnly: boolean;
}
export const fetchProducts = async (
  props: ProductSearchProps
): Promise<Product[]> => {
  const { searchTerm, minPrice, maxPrice, inStockOnly } = props;

  console.log(props);
  let query = SupabaseClient.from("product").select(
    "product_id, vendor, name, description, unit_cost, image_url, in_stock"
  );

  // Chain conditionals per Supabase docs
  if (searchTerm !== "") {
    query.textSearch("name", searchTerm);
  }
  if (inStockOnly) {
    query.eq("in_stock", true);
  }
  if (minPrice) {
    query.gte("unit_cost", minPrice);
  }
  if (maxPrice) {
    query.lte("unit_cost", maxPrice);
  }
  const res = await query;
  return res.status === 200 ? (res.body as Product[]) : [];
};

export const fetchProductDetail = async (
  productId: string
): Promise<Record<string, any>[]> => {
  const res = await SupabaseClient.from("product")
    .select("*")
    .eq("product_id", productId);
  return res.status === 200 ? (res.body as []) : [];
};
