'use client';
import { QuestionT } from '@/types/question';
import { ChevronDownIcon } from '@heroicons/react/24/solid';
import {
  Accordion,
  AccordionItemProps,
  AccordionItem as Item,
} from '@szhsin/react-accordion';
import { useEffect, useState } from 'react';

function AccordionItem({ header, ...rest }: AccordionItemProps) {
  return (
    <Item
      {...rest}
      header={({ state: { isEnter } }) => (
        <>
          {header}
          <ChevronDownIcon
            className={`size-6 ml-auto transition-transform duration-200 ease-out ${
              isEnter && 'rotate-180'
            }`}
          />
        </>
      )}
      className="border-b-2 border-purple"
      buttonProps={{
        className: ({ isEnter }) =>
          `flex w-full p-3 text-left hover:underline ${isEnter && 'underline'}`,
      }}
      contentProps={{
        className: 'transition-height duration-200 ease-out',
      }}
      panelProps={{ className: 'p-2' }}
    />
  );
}

export default function QnA() {
  const [loading, setLoading] = useState<boolean>(true);
  const [questions, setQuestions] = useState<QuestionT[]>([]);

  useEffect(() => {
    setLoading(true);
    fetch('/api/questions?active=true', { next: { revalidate: 10 } })
      .then((res) => res.json())
      .then((res) => {
        setQuestions(res);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, []);

  return (
    <>
      {loading && <div className="text-center">Питання завантажуються...</div>}
      <Accordion
        className="mx-2 my-4 border-t-2 border-purple w-full md:w-2/3"
        transitionTimeout={200}
      >
        {questions.map((item) => (
          <AccordionItem
            key={item.id.toString()}
            header={item.question.toString()}
          >
            {item.answer}
          </AccordionItem>
        ))}
      </Accordion>
    </>
  );
}
