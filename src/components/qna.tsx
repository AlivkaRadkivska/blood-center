'use client';
import { QuestionT } from '@/types/question';
import { Accordion, AccordionItem } from '@szhsin/react-accordion';
import { useEffect, useState } from 'react';

export default function QnA() {
  const [questions, setQuestions] = useState<QuestionT[]>([]);

  useEffect(() => {
    fetch('/api/questions?active=true')
      .then((res) => res.json())
      .then((res) => setQuestions(res));
  }, []);

  return (
    <Accordion className="w-full flex flex-col items-center justify-center gap-3">
      {questions.map((item) => (
        <AccordionItem
          key={item.id.toString()}
          header={`${item.question} ↓`}
          className="w-full text-center ease-in-out duration-300 border-b-gray border-b-2"
        >
          {item.answer}
        </AccordionItem>
      ))}
    </Accordion>
  );
}
