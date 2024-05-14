import QnA from '@/components/qna';
import QuestionForm from '@/components/question-form';
import Title from '@/components/ui/title';

export default async function ForDonorPage() {
  return (
    <>
      <section className="flex flex-col w-full items-center justify-center py-16">
        <Title text="Що варто знати донорам" />
        <p className="text-green">Text</p>
      </section>

      <section className="flex flex-col w-full items-center justify-center py-2">
        <Title text="Популярні питання" />
        <QnA />
        <QuestionForm />
      </section>
    </>
  );
}
