import Footer from '@/components/footer';
import Header from '@/components/header';

export default async function NotFound() {
  return (
    <>
      <Header />

      <main className="flex flex-auto justify-center items-center p-2">
        <p>
          Помилка <span className="text-red font-semibold">404</span> | Сторінку
          не знайдено
        </p>
      </main>

      <Footer />
    </>
  );
}
