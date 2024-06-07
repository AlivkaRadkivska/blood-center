'use client';
import { QuestionT } from '@/types/question';
import { ChevronDownIcon } from '@heroicons/react/24/solid';
import {
  Accordion,
  AccordionItemProps,
  AccordionItem as Item,
} from '@szhsin/react-accordion';
import { useEffect, useState } from 'react';
import Loader from '../ui/loader';

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
      className="border-b-2 border-purple last:border-none"
      buttonProps={{
        className: ({ isEnter }) =>
          `flex w-full p-3 text-left hover:underline font-bold ${
            isEnter && 'underline'
          }`,
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
      {loading && <Loader description="Питання завантажуються" />}
      <Accordion
        className="mx-2 my-4 border-purple w-full md:px-6"
        transitionTimeout={200}
      >
        {questions.length > 0 &&
          questions.map((item) => (
            <AccordionItem key={item.id} header={item.question}>
              {item.answer}
            </AccordionItem>
          ))}
      </Accordion>
    </>
  );
}
