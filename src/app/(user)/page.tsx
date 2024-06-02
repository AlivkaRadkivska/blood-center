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

      <section className="flex flex-col w-full items-center justify-center p-2">
        <Title>Як працює донація крові</Title>

        <div>
          <h2>Вступ</h2>
          <p>
            Донація крові — це важлива процедура, яка може врятувати життя
            багатьох людей. Вона є необхідною для хірургічних операцій,
            лікування тяжких захворювань і під час надзвичайних ситуацій.
          </p>

          <h2>Процес донації крові</h2>
          <h3>1. Підготовка до донації</h3>
          <p>
            Перед здачею крові донору потрібно підготуватися. Це включає в себе
            дотримання здорового харчування, уникання алкоголю і важкої фізичної
            активності за кілька днів до процедури. Важливо також добре
            виспатися в ніч перед донацією.
          </p>

          <h3>2. Реєстрація та обстеження</h3>
          <p>
            Коли донор приходить до центру здачі крові, він повинен
            зареєструватися та заповнити анкету про своє здоров&apos;я. Потім
            лікар проводить коротке медичне обстеження, включаючи вимірювання
            артеріального тиску, рівня гемоглобіну та температури.
          </p>

          <h3>3. Процес здачі крові</h3>
          <p>
            Після успішного обстеження донор сідає у спеціальне крісло. Медичний
            працівник вводить голку у вену, зазвичай на руці, і кров починає
            текти у спеціальний мішок. Уся процедура займає близько 10-15 хвилин
            і зазвичай донують близько 450 мл крові.
          </p>

          <h3>4. Після донації</h3>
          <p>
            Після здачі крові донору радять відпочити кілька хвилин, випити
            склянку води чи соку і з&apos;їсти легкий перекус. Бажано уникати
            фізичної активності і пити багато рідини протягом наступних 24
            годин.
          </p>

          <h2>Хто може бути донором</h2>
          <p>
            Донором може стати будь-яка здорова людина віком від 18 до 60 років,
            яка важить більше 50 кг і не має протипоказань до здачі крові.
            Важливо, щоб донор не мав серйозних захворювань і не вживав певні
            медикаменти.
          </p>

          <h2>Користь від донації крові</h2>
          <p>
            Донація крові не лише допомагає тим, хто потребує переливання, але й
            приносить користь самому донору. Вона сприяє оновленню
            кров&apos;яних клітин, покращує кровообіг та зміцнює імунну систему.
            Регулярна здача крові також допомагає контролювати рівень заліза в
            організмі.
          </p>

          <h2>Висновок</h2>
          <p>
            Донація крові — це благородний вчинок, який може врятувати життя.
            Процедура є безпечною і приносить користь як отримувачу, так і
            донору. Кожен з нас може зробити свій внесок у підтримку життя,
            ставши донором крові.
          </p>
        </div>
      </section>

      <section className="flex flex-col w-full items-center justify-center py-2">
        <Title>Популярні питання</Title>
        <QnA />
      </section>

      <BloodNeedsModal />
    </>
  );
}
