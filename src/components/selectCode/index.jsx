import { Box, Text, VStack, List, Input } from "@chakra-ui/react";
import { useEffect, useState, useRef } from "react";

export const SelectCode = ({
  data,
  label = "Codigo",
  w = "sm",
  labelStyles,
  defaultValue,
  onBlur,
  ...rest
}) => {
  const [closeList, setCloseList] = useState(true);
  const [options, setOptions] = useState(data);
  const [selectedValue, setSelectedValue] = useState(defaultValue ?? "");

  const listRef = useRef(null);
  const inputRef = useRef(null);

  const handleInputChange = (value) => {
    setSelectedValue(value);
  };

  const handleOptionClick = (value) => {
    setSelectedValue(value);
    setCloseList(true);
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      const result = data.filter((e) =>
        e?.toLowerCase()?.trim()?.includes(selectedValue?.toLowerCase()?.trim())
      );
      setOptions(result);
    }, 500);

    return () => clearTimeout(timeout);
  }, [selectedValue]);

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
    // <form onBlur={onBlur} defaultValue={defaultValue}>
    <Box position="relative" mt="1" w={w}>
      <Box align="start" mb="1" gap="0">
        {label && (
          <Text color="orange.600" {...labelStyles}>
            {label}
          </Text>
        )}
        <Input
          ref={inputRef}
          w="full"
          placeholder=""
          value={selectedValue}
          onChange={(e) => handleInputChange(e.target.value)}
          autoComplete="off"
          onFocus={() => setCloseList(false)}
          {...rest}
          onBlur={onBlur}
        />
      </Box>
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
          zIndex="999"
          maxHeight="300px"
          overflowY="auto"
          listStyleType="none"
          bg="white"
        >
          {options.map((element, index) => (
            <List.Item
              p={2}
              key={`${element} + ${index}`}
              cursor="pointer"
              _hover={{ bg: "gray.100" }}
              onClick={() => handleOptionClick(element)}
            >
              {element}
            </List.Item>
          ))}
        </List.Root>
      )}
    </Box>
    // </form>
  );
};
