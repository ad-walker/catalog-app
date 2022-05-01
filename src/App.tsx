import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Product from "./routes/Product";
import Products from "./routes/Products";

export default function App() {
  return (
    <ChakraProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Products />} />
          <Route path="product/:productId" element={<Product />} />
        </Routes>
      </BrowserRouter>
    </ChakraProvider>
  );
}
