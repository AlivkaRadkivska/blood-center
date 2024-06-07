import Image from 'next/image';
import mainPhoto from '@public/images/donation.png';
import { AccentButton } from '@/components/ui/button';
import { Cormorant_Infant } from 'next/font/google';
import Link from 'next/link';
import Title from '@/components/ui/title';
import QnA from '@/components/questions-n-answers/qna';
import BloodNeedsModal from '@/components/blood-needs/blood-needs-modal';
import { ChevronDownIcon } from '@heroicons/react/24/solid';

const accentFont = Cormorant_Infant({
  subsets: ['latin', 'cyrillic'],
  weight: '700',
});

export default async function HomePage() {
  return (
    <>
      <section className="flex flex-col w-full h-screen items-center justify-center p-2 gap-2 text-center">
        <Image
          src={mainPhoto}
          alt="red-heart"
          width={1000}
          height={1000}
          sizes="50vw"
          className="min-w-full w-auto h-screen absolute z-[-1] top-0 left-0 object-cover"
        />
        <p className="text-white -mb-4 mt-auto  drop-shadow-[0_1.3px_1.3px_#8d1e2b]">
          Пам&apos;ятайте, Ваша кров може рятувати життя
        </p>
        <h1
          className={`${accentFont.className} text-6xl text-white mb-3 drop-shadow-[0_1.3px_1.3px_#8d1e2b]`}
        >
          Еритро Центр
        </h1>
        <AccentButton>
          <Link href="/for-donor">Хочу стати донором</Link>
        </AccentButton>
        <ChevronDownIcon className="size-6 mt-auto text-white animate-bounce" />
        <ChevronDownIcon className="size-6 -mt-6 mb-2 text-white animate-bounce" />
      </section>

      <section className="w-full flex flex-col items-center justify-start gap-3 p-2">
        <Title>Це має знати кожен</Title>
        <div className="flex flex-col sm:flex-row w-full items-start justify-start py-1 gap-3 md:px-6">
          <div className="w-full flex flex-col gap-3">
            <p>
              Донорська кров є важливою для лікування багатьох медичних станів
              та проведення операцій. Вона використовується для:
            </p>
            <ul className="gap-2">
              <li>Лікування онкологічних хворих, які проходять хіміотерапію</li>
              <li>
                Підтримки пацієнтів з анемією та іншими захворюваннями крові
              </li>
              <li>Допомоги при тяжких травмах та аваріях</li>
              <li>Проведення складних хірургічних операцій</li>
              <li>Підтримки жінок при ускладнених пологах</li>
            </ul>
          </div>
          <div className="w-full flex flex-col gap-2">
            <p>
              З однієї дози крові можна отримати кілька компонентів, кожен з
              яких має свою функцію та термін придатності:
            </p>
            <ul>
              <li>
                <strong>Еритроцити</strong>: використовуються для
                транспортування кисню, термін придатності – 42 дні
              </li>
              <li>
                <strong>Плазма</strong>: використовується для лікування
                коагулопатій, термін придатності – до 1 року при заморожуванні
              </li>
              <li>
                <strong>Тромбоцити</strong>: необхідні для зупинки кровотеч,
                термін придатності – 5 днів
              </li>
            </ul>
          </div>
        </div>
        <div className="flex flex-wrap items-start justify-around mt-4 gap-3 w-full">
          <div className="flex flex-col items-center justify-center text-center w-28">
            <p className="w-full border-b-2 border-purple mb-2">
              <span className="text-2xl font-bold">8</span>%
            </p>
            <p>загальної маси тіла становить кров</p>
          </div>
          <div className="flex flex-col items-center justify-center text-center w-28">
            <p className="w-full border-b-2 border-purple mb-2">
              &lt;<span className="text-2xl font-bold">450</span> мл
            </p>
            <p>крові збирають за один сеанс донації</p>
          </div>
          <div className="flex flex-col items-center justify-center text-center w-28">
            <p className="w-full border-b-2 border-purple mb-2">
              <span className="text-2xl font-bold">200</span> тис.
            </p>
            <p>пацієнтів в Україні потребують переливання щороку</p>
          </div>
          <div className="flex flex-col items-center justify-center text-center w-28">
            <p className="w-full border-b-2 border-purple mb-2">
              на <span className="text-2xl font-bold">60</span>%
            </p>
            <p>збільшилось навантаження на донорство після повномасштабного</p>
          </div>
        </div>
      </section>

      <section className="flex flex-col w-full items-center justify-center p-2">
        <Title>Популярні питання</Title>
        <QnA />
      </section>

      <BloodNeedsModal />
    </>
  );
}
