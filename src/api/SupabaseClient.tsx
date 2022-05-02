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
  pagination: number;
}
export interface ProductSearchResults {
  hasMore: boolean;
  data: Product[];
}
const getPagination = (page: number, size: number) => {
  const limit = size ? +size : 3;
  const from = page ? page * limit : 0;
  const to = page ? from + size - 1 : size - 1;

  return { from, to };
};
export const fetchProducts = async (
  props: ProductSearchProps
): Promise<ProductSearchResults> => {
  const { searchTerm, minPrice, maxPrice, inStockOnly, pagination } = props;
  const { from, to } = getPagination(pagination, 6);
  let query = SupabaseClient.from("product")
    .select(
      "product_id, vendor, name, description, unit_cost, image_url, in_stock",
      { count: "exact" }
    )
    .range(from, to);

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
  if (!res.error) {
    return {
      hasMore: to + 1 < (res.count || -1),
      data: res.data as Product[],
    };
  } else return { hasMore: false, data: [] };
};

export const fetchProductDetail = async (
  productId: string
): Promise<Record<string, any>[]> => {
  const res = await SupabaseClient.from("product")
    .select("*")
    .eq("product_id", productId);
  return res.status === 200 ? (res.body as []) : [];
};
