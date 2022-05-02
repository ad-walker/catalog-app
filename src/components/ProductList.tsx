import { Box, Stack, Divider, SimpleGrid } from "@chakra-ui/react";
import ProductCard, { Product } from "./ProductCard";

// TODO: Props interface
export default function ProductList(props: Record<string, any>) {
  const { products } = props;
  return (
    <Box>
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing="20px">
        {(products as Product[]).map((product) => (
          <Stack direction="column" key={product.product_id}>
            <ProductCard {...product} />
            <Divider />
          </Stack>
        ))}
      </SimpleGrid>
    </Box>
  );
}
