import React, { useState } from "react";
import { Box, Button, Container, FormControl, FormLabel, Input, VStack, Textarea, Heading, List, ListItem, ListIcon, useToast, keyframes } from "@chakra-ui/react";
import { FaPlus, FaCheckCircle } from "react-icons/fa";

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const animationStyle = {
  animation: `${fadeIn} 1s ease-in-out`,
};

const Index = () => {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [questions, setQuestions] = useState([]);
  const toast = useToast();

  const handleQuestionChange = (e) => {
    setQuestion(e.target.value);
  };

  const handleAnswerChange = (e) => {
    setAnswer(e.target.value);
  };

  const handleAddQuestion = async () => {
    if (!question || !answer) {
      toast({
        title: "Error",
        description: "Please enter both a question and its answer",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    // Here we would call OpenAI API to generate incorrect answers
    // Since we can't do HTTP requests or use external APIs, let's mock it
    const incorrectAnswers = generateIncorrectAnswers(answer);

    const newQuestion = {
      question,
      correctAnswer: answer,
      incorrectAnswers,
    };

    setQuestions([...questions, newQuestion]);
    setQuestion("");
    setAnswer("");
  };

  // Mock function to generate incorrect but plausible answers
  // This should be replaced by an actual call to the OpenAI API
  const generateIncorrectAnswers = (correctAnswer) => {
    return [`${correctAnswer}X`, `${correctAnswer}Y`, `${correctAnswer}Z`];
  };

  return (
    <Container maxW="container.md" py={10}>
      <Heading mb={5}>Quiz Master Helper</Heading>
      <VStack spacing={4} align="flex-start">
        <FormControl>
          <FormLabel htmlFor="question">Question</FormLabel>
          <Textarea id="question" value={question} onChange={handleQuestionChange} placeholder="Enter your question" />
        </FormControl>
        <FormControl>
          <FormLabel htmlFor="answer">Answer</FormLabel>
          <Input id="answer" value={answer} onChange={handleAnswerChange} placeholder="Enter the correct answer" />
        </FormControl>
        <Button leftIcon={<FaPlus />} colorScheme="teal" onClick={handleAddQuestion}>
          Add Question
        </Button>
      </VStack>

      <Heading size="lg" my={6}>
        Questions
      </Heading>
      <List spacing={5}>
        {questions.map((q, index) => (
          <ListItem key={index} p={5} shadow="md" borderWidth="1px" borderRadius="md" style={animationStyle}>
            <Heading size="md" mb={2}>
              {q.question}
            </Heading>
            <List spacing={2}>
              <ListItem>
                <ListIcon as={FaCheckCircle} color="green.500" />
                {q.correctAnswer}
              </ListItem>
              {q.incorrectAnswers.map((incAns, idx) => (
                <ListItem key={idx}>
                  <ListIcon as={FaCheckCircle} color="red.500" />
                  {incAns}
                </ListItem>
              ))}
            </List>
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

export default Index;
