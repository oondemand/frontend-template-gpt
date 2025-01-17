import { Box, Flex, Heading, Link, VStack } from "@chakra-ui/react";

import { NavLink, useLocation } from "react-router-dom";
import { useAuth } from "../../hooks/auth";

export function Navbar({ title, navItems, children }) {
  const location = useLocation();
  const { user } = useAuth();

  console.log(user);

  return (
    <Box position="relative" w="11/12" m="auto" py="2" minHeight="vh">
      <VStack justifyContent="space-between" alignItems="center">
        <Heading color="orange.500">{title}</Heading>
        <Flex mt="8" w="full" flexDir="column" gap="4">
          {navItems.map(
            (item, i) =>
              item.rules.includes(user.tipo) && (
                <Link
                  asChild
                  w="full"
                  key={`item-${i}`}
                  px="4"
                  rounded="md"
                  to={item.path}
                  py="1"
                  outline="none"
                  transition="all 0.3s ease"
                  textDecoration="none"
                  color={location.pathname === item.path ? "white" : "gray.900"}
                  scale={location.pathname === item.path ? "1.05" : "1"}
                  _hover={{ bg: "orange.400", color: "white", scale: "1.05" }}
                  bg={
                    location.pathname === item.path
                      ? "orange.500"
                      : "transparent"
                  }
                >
                  <NavLink to={item.path}>{item.name}</NavLink>
                </Link>
              )
          )}
        </Flex>
      </VStack>
      {children}
    </Box>
  );
}
