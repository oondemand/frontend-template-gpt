import { Box, Text, VStack, List, Input } from "@chakra-ui/react";
import { useEffect, useState, useRef } from "react";

export const SelectCode = ({ data, onChange, value, w = "sm" }) => {
  const [closeList, setCloseList] = useState(true);
  const [options, setOptions] = useState(data);

  const listRef = useRef(null);
  const inputRef = useRef(null);

  const handleInputChange = (value) => {
    onChange({ value });
  };

  const handleOptionClick = (value) => {
    setCloseList(true);
    onChange({ value });
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      const result = data.filter((e) =>
        e.toLowerCase().trim().includes(value.toLowerCase().trim())
      );
      setOptions(result);
    }, 500);

    return () => clearTimeout(timeout);
  }, [value]);

  const handleClickOutside = (event) => {
    if (
      listRef.current &&
      !listRef.current.contains(event.target) &&
      inputRef.current &&
      !inputRef.current.contains(event.target)
    ) {
      setCloseList(true);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <Box position="relative" mt="1" w={w}>
      <VStack align="start" mb="2" gap="1">
        <Text color="orange.600">Codigo</Text>
        <Input
          ref={inputRef}
          w="full"
          placeholder=""
          value={value}
          onChange={(e) => handleInputChange(e.target.value)}
          autoComplete="email"
          onFocus={() => setCloseList(false)}
        />
      </VStack>
      {!closeList && options.length > 0 && (
        <List.Root
          ref={listRef}
          position="absolute"
          top="100%"
          left="0"
          width="100%"
          border="1px solid #ddd"
          borderRadius="md"
          boxShadow="sm"
          zIndex="10"
          maxHeight="300px"
          overflowY="auto"
          listStyleType="none"
          bg="white"
        >
          {options.map((element, index) => {
            return (
              <List.Item
                p={2}
                key={`${element} + ${index}`}
                cursor="pointer"
                _hover={{ bg: "gray.100" }}
                onClick={() => {
                  handleOptionClick(element);
                }}
              >
                {element}
              </List.Item>
            );
          })}
        </List.Root>
      )}
    </Box>
  );
};
