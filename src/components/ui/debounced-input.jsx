import { Input, Box } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { Search } from "lucide-react";

export function DebouncedInput({
  value: initialValue,
  onChange,
  debounce = 500,
  size = "md",
  ...props
}) {
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      onChange(value?.trim());
    }, debounce);

    return () => clearTimeout(timeout);
  }, [value]);

  return (
    <Input
      value={value}
      onChange={(e) => setValue(e.target.value)}
      {...props}
    />
  );
}
