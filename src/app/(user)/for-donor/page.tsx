import BloodNeedsModal from '@/components/blood-needs/blood-needs-modal';
import QuestionForm from '@/components/questions-n-answers/question-form';
import Title from '@/components/ui/title';
import {
  CheckBadgeIcon,
  ClipboardDocumentIcon,
  DocumentCheckIcon,
  HeartIcon,
  FaceSmileIcon,
} from '@heroicons/react/24/solid';

export default async function ForDonorPage() {
  return (
    <>
      <section className="flex flex-col w-full items-center justify-center pt-20">
        <Title>
          <h1>Що варто знати донорам</h1>
        </Title>
        <p className="text-left mt-5 w-full p-2">
          Донорство крові складається з кількох важливих етапів, кожен з яких є
          необхідним для забезпечення безпеки та ефективності процедури.
        </p>

        <div className="text-left p-2 w-full flex flex-col gap-3">
          <div className="mt-2">
            <h3 className="mb-2 font-bold ml-2 text-purple flex gap-2 items-start">
              <CheckBadgeIcon className="size-7" />
              Перевірка
            </h3>
            <p>
              На першому етапі проводиться перевірка потенційного донора. Ви
              повинні відповідати певним критеріям:{' '}
              <strong>
                бути повнолітнім, мати добрий стан здоров&apos;я та важити
                більше 50 кг
              </strong>
              . Це гарантує, що донорство не зашкодить вашому здоров&apos;ю, а
              також забезпечить якісну кров для тих, хто її потребує.
            </p>
          </div>
          <div className="mt-2">
            <h3 className="mb-2 font-bold ml-2 text-purple flex gap-2 items-start">
              <ClipboardDocumentIcon className="size-7" />
              Реєстрація
            </h3>
            <p>
              Після проходження перевірки необхідно зареєструватися. Реєстрація
              включає заповнення анкети та надання необхідних документів. Це
              важливий крок, що допомагає підтримувати базу даних донорів та
              забезпечувати належну організацію процесу донорства.
            </p>
          </div>
          <div className="mt-2">
            <h3 className="mb-2 font-bold ml-2 text-purple flex gap-2 items-start">
              <DocumentCheckIcon className="size-7" />
              Підготовка
            </h3>
            <p>
              Перед здачею крові важливо правильно підготуватися. Донору слід
              <strong>
                добре поснідати, уникаючи жирної їжі, пити достатньо води,
                уникати алкоголю за 48 годин до здачі крові, а також відпочити
                та добре виспатися
              </strong>
              . Ці рекомендації допомагають забезпечити оптимальні умови для
              здачі крові та знижують ризик ускладнень.
            </p>
          </div>
          <div className="mt-2">
            <h3 className="mb-2 font-bold ml-2 text-purple flex gap-2 items-start">
              <HeartIcon className="size-7" />
              Здача крові
            </h3>
            <p>
              Процедура здачі крові триває близько{' '}
              <strong>10-15 хвилин.</strong> Під час цієї процедури у вас беруть
              <strong>від 200 до 450 мл крові</strong>. Уся процедура
              контролюється медичним персоналом, що гарантує безпеку та комфорт
              для донора.
            </p>
          </div>
          <div className="mt-2">
            <h3 className="mb-2 font-bold ml-2 text-purple flex gap-2 items-start">
              <FaceSmileIcon className="size-7" />
              Відновлення
            </h3>
            <p>
              Після здачі крові важливо дати своєму організму час для
              відновлення. Рекомендується відпочити, випити рідину та
              перекусити. Це допомагає швидше відновити сили та зменшити можливі
              неприємні відчуття. Уникайте важкої фізичної активності протягом
              наступних 24 годин, щоб забезпечити своєму організму належний
              відпочинок.
            </p>
          </div>
        </div>
      </section>

      <section className="flex flex-col w-full items-center justify-start py-2">
        <QuestionForm />
      </section>

      <BloodNeedsModal />
    </>
  );
}
