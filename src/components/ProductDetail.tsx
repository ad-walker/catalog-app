import { useState, useEffect, ReactNode } from "react";
import {
  Box,
  Flex,
  Text,
  Link,
  Center,
  Spinner,
  Badge,
  Stat,
  StatGroup,
  StatLabel,
  StatNumber,
  HStack,
} from "@chakra-ui/react";
import { fetchProductDetail } from "../api/SupabaseClient";
export default function ProductDetail(props: Record<string, any>) {
  const [product, setProduct] = useState<Record<string, any>>({});

  useEffect(() => {
    const getProductDetail = async () => {
      const productDetail = await fetchProductDetail(props.productId);
      setProduct(productDetail[0]);
    };
    getProductDetail();
  }, [props]);

  const renderProductDetail = (): ReactNode => {
    return !product.name ? (
      <Center>
        <Spinner size="xl" />
      </Center>
    ) : (
      <>
        <Box w={{ lg: "50%" }}>
          <Box
            h={{ base: 64, lg: "full" }}
            rounded={{ lg: "lg" }}
            bgSize="cover"
            bgPosition="center"
            style={{
              backgroundImage: `url('${product.image_url}')`,
            }}
          ></Box>
        </Box>

        <Box py={12} px={6} maxW={{ base: "xl", lg: "5xl" }} w={{ lg: "50%" }}>
          <Text fontSize={{ base: "2xl", md: "3xl" }} fontWeight="bold">
            {product.name}
          </Text>
          <Text fontSize="2xl">{product.vendor}</Text>
          <Badge>{product.type}</Badge>
          <p>{product.description}</p>
          <Text fontSize="md" pt={2} color="gray.600">
            Dimensions: {product.dimensions}
          </Text>
          <Text fontSize="2xl" fontWeight="bold" pt={2} pb={2}>
            ${product.unit_cost.toFixed(2)}
          </Text>
          <Box borderWidth="1px" borderRadius="lg" p={2}>
            <StatGroup>
              <Stat>
                <StatLabel>Units Sold</StatLabel>
                <StatNumber>{product.units_sold}</StatNumber>
              </Stat>
              <Stat>
                <StatLabel>Gross Sales</StatLabel>
                <StatNumber>${product.gross_sales.toFixed(2)}</StatNumber>
              </Stat>
            </StatGroup>
          </Box>
          <HStack pt={5}>
            <Box>
              <Link
                bg={product.in_stock ? "gray.900" : "gray.500"}
                color="gray.100"
                px={5}
                py={3}
                fontWeight="semibold"
                rounded="lg"
                _hover={{ bg: "gray.700" }}
              >
                {product.in_stock ? "Add to Cart" : "Out of Stock"}
              </Link>
            </Box>
            <Box>
              <Link
                bg={"gray.900"}
                color="gray.100"
                px={5}
                py={3}
                fontWeight="semibold"
                rounded="lg"
                _hover={{ bg: "gray.700" }}
                href="/"
              >
                Back
              </Link>
            </Box>
          </HStack>
        </Box>
      </>
    );
  };
  return (
    <Flex p={50} w="full" alignItems="center" justifyContent="center">
      <Box
        mx={{ lg: 8 }}
        display={{ lg: "flex" }}
        maxW={{ lg: "5xl" }}
        shadow={{ lg: "lg" }}
        rounded={{ lg: "lg" }}
      >
        {renderProductDetail()}
      </Box>
    </Flex>
  );
}
