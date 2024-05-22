'use client';
import { ArticleT } from '@/types/article';
import Image from 'next/image';
import Link from 'next/link';

export function MiniArticle({ article }: { article: ArticleT }) {
  return (
    <div className="w-full p-2 flex gap-2">
      <Image
        className="border-2 rounded border-purple ease-in-out"
        src={`/uploads/articles/img.jpg`}
        alt="article_image"
        width={150}
        height={120}
      />
      <div>
        <Link href={`/news/articles/${article.id}`}>
          <p className="text-lg text-purple hover:underline hover:text-red">
            {article.title}
          </p>
        </Link>
        <p className="text-xs text-gray-dark">10.10.2020</p>
        <p className="my-2">{article.content}</p>
      </div>
    </div>
  );
}
