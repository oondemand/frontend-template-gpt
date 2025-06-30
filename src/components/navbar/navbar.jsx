import { Box, Flex, Heading, Link, Text, VStack } from "@chakra-ui/react";

import { NavLink, useLocation } from "react-router-dom";
import { useAuth } from "../../hooks/auth";
import {
  AccordionRoot,
  AccordionItem,
  AccordionItemTrigger,
  AccordionItemContent,
} from "../ui/accordion";

export function Navbar({ title, navItems, children }) {
  const location = useLocation();
  const { user } = useAuth();

  return (
    <Box position="relative" w="11/12" m="auto" py="2" minHeight="vh">
      <VStack justifyContent="space-between" alignItems="center">
        <Heading color="orange.500">{title}</Heading>
        <Flex mt="8" w="full" flexDir="column" gap="4">
          {navItems.map((item, i) => {
            if (item.subItems) {
              return (
                <AccordionRoot collapsible key={`item-${i}`} mb="-2">
                  <AccordionItem cursor="pointer" border="none">
                    <AccordionItemTrigger cursor="pointer" px="4">
                      {item.name}
                    </AccordionItemTrigger>
                    <AccordionItemContent spaceY="2">
                      {item.subItems.map((subItem, i) => {
                        return (
                          subItem.rules.includes(user.tipo) && (
                            <Link
                              asChild
                              w="full"
                              key={`item-${i}`}
                              px="4"
                              rounded="md"
                              to={subItem.path}
                              py="1"
                              outline="none"
                              transition="all 0.3s ease"
                              textDecoration="none"
                              color={
                                location.pathname === subItem.path
                                  ? "white"
                                  : "gray.900"
                              }
                              _hover={{
                                bg: "orange.400",
                                color: "white",
                              }}
                              bg={
                                location.pathname === subItem.path
                                  ? "orange.500"
                                  : "transparent"
                              }
                            >
                              <NavLink to={subItem.path}>
                                {subItem.name}
                              </NavLink>
                            </Link>
                          )
                        );
                      })}
                    </AccordionItemContent>
                  </AccordionItem>
                </AccordionRoot>
              );
            }

            return (
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
            );
          })}
        </Flex>
      </VStack>
      {children}
    </Box>
  );
}
