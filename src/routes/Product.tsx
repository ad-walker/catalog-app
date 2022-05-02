import { useParams } from "react-router-dom";
import ProductDetail from "../components/ProductDetail";

export default function Product() {
  const { productId } = useParams();
  return <ProductDetail productId={productId} />;
}
