import {
  SelectRoot,
  SelectTrigger,
  SelectValueText,
  SelectContent,
  SelectItem,
} from "../ui/select";
import { Field, createListCollection } from "@chakra-ui/react";

export function Select({
  label,
  placeholder,
  options,
  name,
  errors,
  ...props
}) {
  const collection = createListCollection({
    items: options ?? [],
  });

  return (
    <Field.Root invalid={!!errors?.[name]} w="md">
      <Field.Label fontSize="xs" color="gray.700">
        {label}
      </Field.Label>

      <SelectRoot
        onValueChange={({ value }) => props?.onChange?.(value)}
        onInteractOutside={() => props?.onBlur?.()}
        collection={collection}
        {...props}
      >
        <SelectTrigger>
          <SelectValueText placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent zIndex={9999}>
          {collection?.items?.map((item) => (
            <SelectItem
              cursor="pointer"
              _hover={{ bg: "gray.100" }}
              item={item}
              key={item.value}
            >
              {item.label}
            </SelectItem>
          ))}
        </SelectContent>
      </SelectRoot>

      {errors?.[name] && (
        <Field.ErrorText>{errors?.[name]?.message}</Field.ErrorText>
      )}
    </Field.Root>
  );
}
