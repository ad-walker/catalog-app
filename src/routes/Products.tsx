import {
  Box,
  Container,
  Stack,
  Heading,
  Divider,
  Switch,
  HStack,
  FormControl,
  FormLabel,
  Input,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Spinner,
  Center,
  Button,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import ProductList from "../components/ProductList";
import { Product } from "../components/ProductCard";
import { fetchProducts } from "../api/SupabaseClient";

export default function Products() {
  const [products, setProducts] = useState<Product[]>();
  // TODO: Move to search bar component
  const [searchTerm, setSearchTerm] = useState("");
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(99999999);
  const [inStockOnly, setInStockOnly] = useState(false);

  const getProducts = async () => {
    setProducts(undefined)
    const productList = await fetchProducts({
      searchTerm,
      minPrice,
      maxPrice,
      inStockOnly,
    });
    setProducts(productList);
  };
  useEffect(() => {
    getProducts();
  }, []);

  // TODO: Move into separate component
  const searchForm = () => {
    return (
      <>
        <Box>
          <FormControl>
            <Stack direction="column">
              <HStack>
                <Input
                  placeholder="Product Name"
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <Button colorScheme="teal" size="md" onClick={getProducts}>
                  Search
                </Button>
              </HStack>
              <HStack justify="center">
                <FormLabel htmlFor="min-price" mb="0">
                  Min Price $
                </FormLabel>
                <NumberInput
                  defaultValue={1.0}
                  precision={2}
                  min={0.01}
                  max={9999999}
                  onChange={(value) => setMinPrice(parseFloat(value))}
                >
                  <NumberInputField />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
                <FormLabel htmlFor="max-price" mb="0">
                  Max Price $
                </FormLabel>
                <NumberInput
                  defaultValue={10000.0}
                  precision={2}
                  min={1}
                  max={9999999}
                  onChange={(value) => setMaxPrice(parseFloat(value))}
                >
                  <NumberInputField />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
                <FormLabel htmlFor="in-stock-only" mb="0">
                  In-Stock Only
                </FormLabel>
                <Switch
                  id="in-stock"
                  onChange={(e) => setInStockOnly(e.target.checked)}
                />
              </HStack>
            </Stack>
          </FormControl>
        </Box>
      </>
    );
  };
  return (
    <>
      <Box>
        <Container maxW={"7xl"} py={16} as={Stack} spacing={12}>
          <Stack spacing={0} align={"center"}>
            <Heading>Product Catalog</Heading>
          </Stack>
          {searchForm()}
          <Divider />
          {products ? (
            <ProductList products={products} />
          ) : (
            <Center>
              <Spinner size="xl" />
            </Center>
          )}
        </Container>
      </Box>
    </>
  );
}
