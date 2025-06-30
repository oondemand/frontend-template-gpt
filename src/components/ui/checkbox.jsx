import { Checkbox as ChakraCheckbox } from "@chakra-ui/react";
import * as React from "react";

export const Checkbox = React.forwardRef(function Checkbox(props, ref) {
  const { icon, children, inputProps, rootRef, rounded, labelProps, ...rest } =
    props;
  return (
    <ChakraCheckbox.Root ref={rootRef} {...rest}>
      <ChakraCheckbox.HiddenInput ref={ref} {...inputProps} />
      <ChakraCheckbox.Control rounded={rounded}>
        {icon || <ChakraCheckbox.Indicator />}
      </ChakraCheckbox.Control>
      {children != null && (
        <ChakraCheckbox.Label {...labelProps}>{children}</ChakraCheckbox.Label>
      )}
    </ChakraCheckbox.Root>
  );
});
