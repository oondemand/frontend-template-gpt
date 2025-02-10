import { Flex } from "@chakra-ui/react";
import { useEffect, useRef } from "react";

export function AutoScroll({ children }) {
  const containerRef = useRef(null);

  useEffect(() => {
    if (containerRef.current && children) {
      containerRef.current.scrollTo({
        top: containerRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [children]);

  return (
    <Flex
      ref={containerRef}
      flexDir="column"
      rounded="md"
      px="2"
      maxH="96"
      gap="2"
      overflow="auto"
      scrollbarWidth="thin"
    >
      {children}
    </Flex>
  );
}
