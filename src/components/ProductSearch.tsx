import {
    Box,
    Container,
    Stack,
    Heading,
    Divider,
    Switch,
    HStack,
    VStack,
    FormLabel,
    Input,
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    NumberIncrementStepper,
    NumberDecrementStepper,
    Button,
    Center,
    Text,
  } from "@chakra-ui/react";
  import { useMediaQuery } from "@chakra-ui/media-query";
  import { useState, useEffect, SyntheticEvent } from "react";
  import ProductList from "../components/ProductList";
  import { Product } from "../components/ProductCard";
  import { fetchProducts } from "../api/SupabaseClient";
  import InfiniteScroll from "react-infinite-scroll-component";

  export default function ProductSearch() {
    const [isSmallScreen] = useMediaQuery("(max-width: 768px)");
    const [products, setProducts] = useState<Product[]>([]);

    // TODO: Move to search bar component
    const [searchTerm, setSearchTerm] = useState("");
    const [minPrice, setMinPrice] = useState("1.00");
    const [maxPrice, setMaxPrice] = useState("10000.00");
    const [inStockOnly, setInStockOnly] = useState(false);
    const [pagination, setPagination] = useState(0);
    const [hasMore, setHasMore] = useState(false);

    const getProducts = async (page: number) => {
      const res = await fetchProducts({
        searchTerm,
        minPrice: parseFloat(minPrice),
        maxPrice: parseFloat(maxPrice),
        inStockOnly,
        pagination: page,
      });
      setHasMore(res.hasMore);
      setProducts(pagination > 0 ? products.concat(res.data) : res.data);
    };
    // This implementation is garbage but it gets me infinite scroll and clearing of search results
    // with a single useEffect.
    const onSearchButtonClick = async (e: SyntheticEvent) => {
      e.preventDefault();
      getProducts(0);
      setPagination(0);
    };
    useEffect(() => {
      getProducts(pagination);
    }, [pagination]);


    // TODO: Separate components
    const searchFilters = () => (
      <>
        <FormLabel htmlFor="min-price" mb="0">
          From
        </FormLabel>
        <NumberInput
          id="min-price"
          precision={2}
          defaultValue={maxPrice}
          onChange={(val) => setMinPrice(val)}
          pattern="\$\d+(?:\.\d+)?"
          value={"$" + minPrice}
        >
          <NumberInputField />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>
        <FormLabel htmlFor="max-price" mb="0">
          To
        </FormLabel>
        <NumberInput
          id="max-price"
          precision={2}
          defaultValue={maxPrice}
          onChange={(val) => setMaxPrice(val)}
          pattern="\$\d+(?:\.\d+)?"
          value={"$" + maxPrice}
        >
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
          <NumberInputField />
        </NumberInput>
        <FormLabel htmlFor="in-stock" mb="0">
          In-Stock
        </FormLabel>
        <Switch
          id="in-stock"
          onChange={(e) => setInStockOnly(e.target.checked)}
        />
        <Button colorScheme="teal" size="md" type="submit">
          Search
        </Button>
      </>
    );

    const searchForm = () => {
      return (
        <form onSubmit={onSearchButtonClick}>
          <Box>
            <Stack direction="column">
              <HStack>
                <Input
                  placeholder="Product Name"
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </HStack>
              {isSmallScreen ? (
                <VStack>{searchFilters()}</VStack>
              ) : (
                <HStack justifyContent="center">{searchFilters()}</HStack>
              )}
            </Stack>
          </Box>
        </form>
      );
    };
    return (
      <Box>
        <Container maxW={"7xl"} py={16} as={Stack} spacing={12}>
          <Stack spacing={0} align={"center"}>
            <Heading>Product Catalog</Heading>
          </Stack>
          {searchForm()}
          <Divider />

          <InfiniteScroll
            dataLength={products.length}
            next={() => {
              setPagination(pagination + 1);
            }}
            hasMore={hasMore}
            loader={
              <Center>
                <Text fontSize="2xl" pt={2} pb={2}>
                  Loading...
                </Text>
              </Center>
            }
          >
            <ProductList products={products} />
          </InfiniteScroll>
        </Container>
      </Box>
    );
  }
