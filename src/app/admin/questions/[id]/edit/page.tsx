import { AnswerForm } from '@/components/questions-n-answers/answer-form';
import Title from '@/components/ui/title';
import { QuestionT } from '@/types/question';

interface AdminEditQuestionPageProps {
  params: {
    id: string;
  };
}

export default async function AdminEditQuestionPage({
  params: { id },
}: AdminEditQuestionPageProps) {
  const question: QuestionT = await fetch(
    `${process.env.BACKEND_URL}/api/questions/${id}`,
    { cache: 'no-store' }
  ).then((res) => res.json());

  return (
    <>
      <Title>Редагування відповіді на питання</Title>

      <AnswerForm question={question} />
    </>
  );
}
