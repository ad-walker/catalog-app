import { useState, useEffect, ReactNode } from "react";
import {
  Box,
  Heading,
  Text,
  Stack,
  Container,
  Divider,
  SimpleGrid,
  Spinner,
  Center,
} from "@chakra-ui/react";
import ProductCard, { Product } from "./ProductCard";
import { fetchProducts } from "../api/SupabaseClient";

export default function ProductList() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const getProducts = async () => {
      const productList = await fetchProducts();
      setProducts(productList);
    };
    getProducts();
  }, []);

  const renderProducts = (): ReactNode =>
    products.length === 0 ? (
      <Center>
        <Spinner size="xl" />
      </Center>
    ) : (
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing="20px">
        {products.map((product) => (
          <Stack direction="column">
            <ProductCard key={product.id} {...product} />
            <Divider />
          </Stack>
        ))}
      </SimpleGrid>
    );

  return (
    <Box>
      <Container maxW={"7xl"} py={16} as={Stack} spacing={12}>
        <Stack spacing={0} align={"center"}>
          <Heading>Product Catalog</Heading>
          <Text>Put search here</Text>
        </Stack>
        <Divider />
        {renderProducts()}
      </Container>
    </Box>
  );
}
