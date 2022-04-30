import { Box, Flex, Text, VStack } from "@chakra-ui/react";

export interface Product {
  id: number;
  vendor: string;
  name: string;
  description: string;
  unit_cost: number;
  image_url: string;
  in_stock: boolean;
}
export default function ProductCard(props: Product) {
  return (
    <Flex>
      <Box
        w={"35%"}
        bgSize="cover"
        bgPosition="center"
        style={{
          backgroundImage: `url(${props.image_url})`,
        }}
        borderRadius="10px"
      ></Box>

      <Box w={"65%"} p={{ base: 1, md: 6 }} justifyContent="flex-start">
        <VStack align="stretch">
          <Text fontSize="2xl" fontWeight="bold">
            {props.vendor}
          </Text>
          <Text fontSize="1xl">{props.name}</Text>
          <Text mt={2} fontSize="sm" isTruncated>
            {props.description}
          </Text>
          <Text fontWeight="bold" fontSize="lg">
            ${props.unit_cost.toFixed(2)}
          </Text>
        </VStack>
      </Box>
    </Flex>
  );
}
