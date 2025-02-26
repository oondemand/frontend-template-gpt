import { Button, IconButton } from "@chakra-ui/react";
import React from "react";
import { useNavigate } from "react-router-dom";
import { CircleArrowLeft } from "lucide-react";

export const BackButton = () => {
  const navigate = useNavigate();

  return (
    <Button variant="subtle" size="md" onClick={() => navigate(-1)}>
      <CircleArrowLeft />
    </Button>
  );
};
