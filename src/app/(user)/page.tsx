import Image from 'next/image';
import mainPhoto from '@public/images/red-heart.jpg';
import { AccentButton, Button } from '@/components/ui/button';
import { Cormorant_Infant } from 'next/font/google';
import Link from 'next/link';
import Title from '@/components/ui/title';
import QnA from '@/components/questions-n-answers/qna';
import BloodNeedsModal from '@/components/blood-needs/blood-needs-modal';

const accentFont = Cormorant_Infant({
  subsets: ['latin', 'cyrillic'],
  weight: '700',
});

export default async function HomePage() {
  return (
    <>
      <section className="flex flex-col w-full min-h-screen items-center justify-center py-16">
        <div className="flex flex-col w-full items-stretch gap-2 md:flex-row">
          <Image
            src={mainPhoto}
            alt="red-heart"
            width={0}
            height={0}
            sizes="50vw"
            style={{ width: '40%', height: 'auto' }}
            className="rounded-xl"
          />
          <div className="h-auto w-full flex flex-col justify-between py-1">
            <div>
              <h1 className={`${accentFont.className} text-6xl text-purple`}>
                Еритро Центр
              </h1>
              <p className="text-lg my-4">
                Ваша участь у зборі крові дарує надію на продовження життя, адже
                завдяки Вам, серця людей продовжують битися. ♥️
              </p>
              <p className="text-lg">
                Дякуємо за Вашу доброту і підтримку, що рятує життя і змінює
                світ на краще.
              </p>
            </div>
            <div className="w-full flex gap-2">
              <AccentButton>
                <Link href="/for-donor">Детальніше про донорство</Link>
              </AccentButton>
              <Button>
                <Link href="/locations">Здати кров</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="flex flex-col w-full items-center justify-center py-16">
        <Title>Як працює донація крові</Title>
        <p className="text-green">Desc</p>
      </section>

      <section className="flex flex-col w-full items-center justify-center py-2">
        <Title>Популярні питання</Title>
        <QnA />
      </section>

      <BloodNeedsModal />
    </>
  );
}
