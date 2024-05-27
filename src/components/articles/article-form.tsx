'use client';
import { useState, FormEvent } from 'react';
import { Button } from '../ui/button';
import Input from '../ui/input';
import { useRouter } from 'next/navigation';
import { ArticleT } from '@/types/article';
import ActiveRadio from '../ui/active-radio';
import Image from 'next/image';

interface ArticleFormProps {
  article?: ArticleT;
}

export function ArticleForm({ article }: ArticleFormProps) {
  const router = useRouter();
  const [error, setError] = useState<string | null>();

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);

    const formData = new FormData(e.currentTarget);
    const response = await fetch(
      `/api/articles${article ? '/' + article.id : ''}`,
      {
        method: article ? 'PATCH' : 'POST',
        body: formData,
      }
    );

    const data = await response.json();
    if ('id' in data) router.push('/admin/articles');
    if ('error' in data) setError(data.error);
  }
  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-3 mt-4 w-full max-w-[600px]"
      >
        <Input
          type="file"
          name="photo"
          label="Фото*:"
          placeholder="Фото"
          required={!article}
        />
        {article && (
          <>
            <Image
              className="border-2 rounded border-purple ease-in-out"
              src={`/uploads/articles/${article.photo}`}
              alt="article_image"
              width={150}
              height={120}
            />
            <input
              type="text"
              name="oldPhoto"
              id="oldPhoto"
              value={article.photo}
              hidden
              readOnly
            />
          </>
        )}
        <Input
          type="text"
          name="title"
          label="Заголовок*:"
          placeholder="Заголовок статті"
          required={true}
          value={article ? article.title : undefined}
        />
        <Input
          type="text"
          name="content"
          label="Вміст статті*:"
          placeholder="Текст"
          required={true}
          value={article ? article.content : undefined}
        />
        {/* others */}
        <ActiveRadio
          label="Показувати на сайті?"
          name="active"
          value={article && article.active ? 'true' : 'false'}
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
