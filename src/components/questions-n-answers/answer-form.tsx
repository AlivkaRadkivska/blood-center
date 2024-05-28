'use client';
import { useState, FormEvent } from 'react';
import { Button } from '../ui/button';
import Input from '../ui/input';
import { useRouter } from 'next/navigation';
import { QuestionT } from '@/types/question';
import ActiveRadio from '../ui/active-radio';

export function AnswerForm({ question }: { question: QuestionT }) {
  const router = useRouter();
  const [error, setError] = useState<string | null>();

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);

    const formData = new FormData(e.currentTarget);
    const response = await fetch(`/api/questions/${question.id}`, {
      method: 'PATCH',
      body: formData,
    });

    const data = await response.json();
    if ('id' in data) router.push('/admin/questions');
    if ('error' in data) setError(data.error);
  }

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-3 mt-4 w-full max-w-[600px]"
      >
        <p className="text-purple text-lg">{question.question}</p>
        <p className="text-purple mb-2">Автор питання: {question.email}</p>
        <Input
          type="text"
          name="answer"
          label="Відповідь*:"
          placeholder="Відповідь"
          required={true}
          value={question.answer}
        />
        <ActiveRadio
          label="Показувати на сайті?"
          name="active"
          value={question.active ? 'true' : 'false'}
        />

        <p className="text-sm text-red">
          *Обов&apos;язкове поле для заповнення
        </p>
        {error && <p className="text-sm text-red">{error}</p>}

        <Button>
          <input type="submit" name="submit" value="Надіслати" />
        </Button>
      </form>
    </>
  );
}
