'use client';
import { FormEvent, useState } from 'react';
import { Button } from '../ui/button';
import Input from '../ui/input';

export default function QuestionForm() {
  const [error, setError] = useState<string | undefined>();
  const [submited, setSubmited] = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const response = await fetch('/api/questions', {
      method: 'POST',
      body: formData,
    });

    const data = await response.json();
    if ('error' in data) setError(data.error);
    if ('id' in data) setSubmited(true);
  }

  return (
    <>
      {submited && (
        <p className="my-2 text-xl text-purple">
          Дякуємо за Ваше питання. Очікуйте відповідь на пошті.
        </p>
      )}
      {!submited && (
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-3 mt-4 w-full max-w-[600px]"
        >
          <p className="my-2 text-xl text-purple font-bold">
            Залишилися питання?
          </p>
          <Input
            type="email"
            label="Ваша ел.адреса*:"
            name="email"
            placeholder="address@mail.com"
            required={true}
          />
          <Input
            type="text"
            name="question"
            label="Запитання*:"
            placeholder="Як відновлюватись після здачі крові?"
            required={true}
          />

          <p className="text-sm text-red">
            *Обов&apos;язкове поле для заповнення
          </p>
          {error && <p className="text-sm text-red">{error}</p>}
          <div className="w-full flex items-center justify-center">
            <Button>
              <input type="submit" name="submit" value="Надіслати" />
            </Button>
          </div>
        </form>
      )}
    </>
  );
}
