import { ChakraProvider } from "@chakra-ui/react";
import ProductList from "./components/ProductList";

export default function App() {
  return (
    <ChakraProvider>
      <ProductList />
    </ChakraProvider>
  );
}
