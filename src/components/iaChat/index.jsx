import { useState, useRef, useEffect } from "react";

import {
  Box,
  Heading,
  Button,
  Flex,
  Table,
  IconButton,
  Input,
  HStack,
  VStack,
  Center,
  Text,
} from "@chakra-ui/react";

import {
  DrawerActionTrigger,
  DrawerBackdrop,
  DrawerBody,
  DrawerCloseTrigger,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerRoot,
  DrawerTitle,
  DrawerTrigger,
} from "../../components/ui/drawer";

import { Formik, Form, Field, useFormik } from "formik";

import { useStream } from "../../hooks/useStream.jsx";
import { TextInput } from "../input/textInput.jsx";

import { useMutation, useQuery } from "@tanstack/react-query";
import { queryClient } from "../../config/react-query";

import { toast } from "sonner";

import { IntegrationGptService } from "../../services/integration-gpt.js";
import { Typewriter } from "../typewriter/index.jsx";

import { SSE } from "sse.js";

export function IaChat() {
  const { mutateAsync: askQuestionMutation, data: responseData } = useMutation({
    mutationFn: IntegrationGptService.askQuestion,
  });

  // const onSubmit = async (data) => {
  //   try {
  //     const response = await askQuestionMutation({ question: data.question });

  //     if (response) {
  //       toast.success("Succes");
  //     }
  //   } catch (error) {
  //     toast.error("Erro");
  //   }
  // };

  let [prompt, setPrompt] = useState("");
  let [isLoading, setIsLoading] = useState(false);
  let [result, setResult] = useState("");

  const resultRef = useRef();

  useEffect(() => {
    resultRef.current = result;
  }, [result]);

  const onSubmit = async (data) => {
    try {
      const token = localStorage.getItem("authToken");

      const sse = new SSE("http://localhost:3000/create-stream", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        payload: JSON.stringify(data),
        method: "POST",
      });

      sse.addEventListener("message", function (e) {
        console.log(e.data);

        let text = e.data.replaceAll("data:", "");
        if (text != "[END]") {
          if (text != "\n") {
            console.log("Text: " + text.replaceAll("data:", ""));
            resultRef.current = resultRef.current + " " + text;
            setResult(resultRef.current);
          }
        } else {
          console.log("bateu aqui", text);

          sse.close();
        }
      });

      sse.addEventListener("readystatechange", (e) => {
        if (e.readyState >= 2) {
          setIsLoading(false);
        }
      });

      sse.stream();
    } catch (error) {
      console.log(error);
    }
  };

  const formik = useFormik({
    initialValues: { question: "" },
    onSubmit: onSubmit,
  });

  return (
    <Box position="absolute" bottom="8" right="8">
      <DrawerRoot size="md">
        <DrawerBackdrop />
        <DrawerTrigger asChild>
          <Button variant="outline" size="sm">
            Open Drawer
          </Button>
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Template IA</DrawerTitle>
          </DrawerHeader>
          <DrawerBody
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <Flex
              h="full"
              w="full"
              bg="red.50"
              textAlign="justify"
              flexDir="column"
              overflowY="auto"
            >
              <Heading>Chat</Heading>
              {/* {responseData && (
                <Typewriter
                  text={responseData.data.data[0].message.content}
                  speed={10}
                />
              )} */}

              {result != "" && (
                <Box maxW="2xl" m="0 auto">
                  <Heading as="h5" textAlign="left" fontSize="lg" mt="40px">
                    Result:
                  </Heading>
                  <Text fontSize="lg" textAlign="left" mt="20px">
                    {result}
                  </Text>
                </Box>
              )}
            </Flex>
          </DrawerBody>
          <DrawerFooter>
            <form
              onSubmit={(value) => {
                formik.handleSubmit(value);
              }}
              onReset={formik.handleReset}
            >
              <Flex alignItems="end" gap="2">
                <Box>
                  <TextInput
                    h="20"
                    name="question"
                    placeholder="Faça sua pergunta"
                    onChange={formik.handleChange}
                    error={formik.errors.nome}
                    value={formik.values.nome}
                  />
                </Box>
                <Button type="submit">Enviar</Button>
              </Flex>
            </form>

            {/* <DrawerActionTrigger asChild>
              <Button variant="outline">Cancel</Button>
            </DrawerActionTrigger> */}
          </DrawerFooter>
          <DrawerCloseTrigger />
        </DrawerContent>
      </DrawerRoot>
    </Box>
  );
}
