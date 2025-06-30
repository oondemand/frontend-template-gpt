import { Badge } from "@chakra-ui/react";

export const BadgeCell = ({ color, ...props }) => {
  return (
    <Badge fontWeight="semibold" fontSize="xs" colorPalette={color}>
      {props.getValue()}
    </Badge>
  );
};
