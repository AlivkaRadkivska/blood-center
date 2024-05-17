import QnA from '@/components/questions-n-answers/qna';
import QuestionForm from '@/components/questions-n-answers/question-form';
import Title from '@/components/ui/title';

export default async function ForDonorPage() {
  return (
    <>
      <section className="flex flex-col w-full items-center justify-center py-16">
        <Title>
          <h1>Що варто знати донорам</h1>
        </Title>
        <p className="text-green">Text</p>
      </section>

      <section className="flex flex-col w-full items-center justify-center py-2">
        <Title>Популярні питання</Title>
        <QnA />
        <QuestionForm />
      </section>
    </>
  );
}
