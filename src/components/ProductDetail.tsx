import { useState, useEffect, ReactNode } from "react";
import { Box, Flex, Text, Link, Center, Spinner } from "@chakra-ui/react";
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
          <p>{product.description}</p>

          <Box mt={8}>
            <Link
              bg="gray.900"
              color="gray.100"
              px={5}
              py={3}
              fontWeight="semibold"
              rounded="lg"
              _hover={{ bg: "gray.800" }}
            >
              Button
            </Link>
          </Box>
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
