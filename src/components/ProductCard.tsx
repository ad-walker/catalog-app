import { Box, Flex, Text, VStack } from "@chakra-ui/react";
import { Link } from "react-router-dom";
export interface Product {
  product_id: string;
  vendor: string;
  name: string;
  description: string;
  unit_cost: number;
  image_url: string;
  in_stock: boolean;
}
export default function ProductCard(props: Product) {
  const {
    product_id,
    vendor,
    name,
    description,
    unit_cost,
    image_url,
    in_stock,
  } = props;
  return (
    <Link to={"product/" + product_id}>
      <Flex>
        <Box
          w={"35%"}
          bgSize="cover"
          bgPosition="center"
          style={{
            backgroundImage: `url(${props.image_url})`,
          }}
          borderRadius="10px"
        />
        <Box w={"65%"} p={{ base: 1, md: 6 }} justifyContent="flex-start">
          <VStack align="stretch">
            <Text fontSize="2xl" fontWeight="bold">
              {name}
            </Text>
            <Text fontSize="1xl">{vendor}</Text>
            <Text mt={2} fontSize="sm" isTruncated>
              {description}
            </Text>
            <Text fontWeight="bold" fontSize="lg">
              ${unit_cost.toFixed(2)}
            </Text>
            <Text fontSize="1xl">{in_stock ? "In Stock" : "Out of Stock"}</Text>
          </VStack>
        </Box>
      </Flex>
    </Link>
  );
}
