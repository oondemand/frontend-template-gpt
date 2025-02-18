import React, { useState, useEffect, useRef } from "react";
import { Box, Input, List, ListItem, Flex, Text } from "@chakra-ui/react";

export const AutocompleteInput = ({
  suggestions = [],
  defaultValue = "",
  value,
  onChange,
  onBlur,
  placeholder = "Digite algo...",
  w = "sm",
  name,
  ...props
}) => {
  const [internalValue, setInternalValue] = useState(defaultValue);
  const inputValue = value !== undefined ? value : internalValue;

  const [isOpen, setIsOpen] = useState(false);

  const wrapperRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [wrapperRef]);

  const handleInputChange = (e) => {
    const newValue = e.target.value;

    if (onChange) {
      onChange(e);
    } else {
      setInternalValue(newValue);
    }

    setIsOpen(true);
  };

  const filteredSuggestions = suggestions.filter((item) =>
    item.toLowerCase().includes(inputValue.toLowerCase())
  );

  const handleSelectSuggestion = (suggestion) => {
    if (onChange) {
      onChange({ target: { value: suggestion } });
    } else {
      setInternalValue(suggestion);
    }

    setIsOpen(false);
  };

  const handleBlur = (e) => {
    if (onBlur) onBlur(e);
  };

  return (
    <Box ref={wrapperRef} position="relative" w={w} {...props}>
      <Text fontSize="xs" color="gray.600">
        Código
      </Text>
      <Input
        size="xs"
        variant=""
        placeholder={placeholder}
        value={inputValue}
        onChange={handleInputChange}
        onFocus={() => setIsOpen(true)} // abre a lista ao focar no input
        onBlur={handleBlur}
        name={name}
        borderBottom="1px solid"
        borderColor="gray.200"
      />

      {isOpen && filteredSuggestions.length > 0 && (
        <List.Root
          position="absolute"
          top="100%"
          left={0}
          right={0}
          bg="white"
          border="1px solid"
          borderColor="gray.200"
          borderRadius="md"
          boxShadow="md"
          maxH="200px"
          overflowY="auto"
          zIndex={10}
          mt={1}
        >
          {filteredSuggestions.map((item, index) => (
            <List.Item
              key={index}
              px={3}
              py={2}
              cursor="pointer"
              _hover={{ backgroundColor: "gray.100" }}
              // onMouseDown para evitar perder o foco ao clicar (assim conseguimos
              // manter o clique no item antes do blur do input)
              onMouseDown={() => handleSelectSuggestion(item)}
            >
              {item}
            </List.Item>
          ))}
        </List.Root>
      )}
    </Box>
  );
};
