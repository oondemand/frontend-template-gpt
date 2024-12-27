import { useState, useEffect } from "react";

export const useStream = (question) => {
  const [response, setResponse] = useState("");

  useEffect(() => {
    console.log("QUESTION", question);

    if (!question) return;

    const loginAndStream = async () => {
      const token = localStorage.getItem("authToken");

      console.log(token);

      const login = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      console.log(login);

      const eventSource = new EventSource(
        `http://localhost:3000/stream?question=${question}`,
        {
          withCredentials: true,
        }
      );

      eventSource.onmessage = (event) => {
        if (event.data === "[END]") {
          eventSource.close();
          return;
        }
        setResponse((prev) => prev + event.data);
      };

      eventSource.onerror = (error) => {
        console.error("Erro no SSE:", error);
        eventSource.close();
        setResponse("Erro ao receber dados.");
      };

      return () => {
        eventSource.close();
      };
    };

    loginAndStream();
  }, [question]);

  return response;
};
