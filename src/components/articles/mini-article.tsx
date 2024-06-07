'use client';
import { ArticleT } from '@/types/article';
import Image from 'next/image';
import Link from 'next/link';

export function MiniArticle({ article }: { article: ArticleT }) {
  return (
    <div className="w-full p-2 flex flex-col sm:flex-row gap-2 text-center sm:text-left">
      <Image
        className="object-cover rounded-sm w-full sm:w-auto"
        src={article.photo}
        alt="article_image"
        width={150}
        height={120}
      />
      <div className="w-full h-full">
        <p className="text-lg text-purple hover:underline hover:text-red">
          {article.title}
        </p>
        <p className="text-xs text-gray-dark">
          {article.author} |{' '}
          {new Date(article.lastUpdate).toLocaleDateString('uk-UA', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
          })}
        </p>
        <p className="my-2 text-s">{article.description}</p>
        <Link href={`/news/article/${article.id}`} className="mt-auto">
          <p className="text-sm italic hover:underline">Детальніше...</p>
        </Link>
      </div>
    </div>
  );
}
