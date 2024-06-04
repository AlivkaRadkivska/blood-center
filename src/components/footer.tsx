import Link from 'next/link';
import {
  PhoneIcon,
  EnvelopeIcon,
  ChatBubbleBottomCenterIcon,
} from '@heroicons/react/24/solid';

export default function Footer({ isSigned }: { isSigned: boolean }) {
  return (
    <footer className="w-full flex flex-col gap-1 p-3 bg-purple text-gray-light md:text-left text-center">
      <div className="w-full flex flex-col md:flex-row gap-3 items-start py-4">
        <div className="w-full flex flex-col gap-1">
          <p className="text-xl ml-2">Еритро Центр</p>
          <p className="text-xs">інформаційний сайт про донорство крові</p>
          <p className="pt-4 w-full">
            Ваша участь у зборі крові дарує надію на продовження життя, адже
            завдяки Вам, серця людей продовжують битися. ♥️
          </p>
          <p className="w-full">
            Дякуємо за Вашу доброту і підтримку, що рятує життя і змінює світ на
            краще.
          </p>
        </div>
        <div className="w-full md:w-[60%] flex flex-col gap-1 mt-3 md:m-auto">
          <p className="text-xl ml-2">Залишились питання?</p>
          <div className="w-full flex flex-col sm:flex-row md:flex-col gap-2 justify-between items-center sm:items-start pt-4">
            <Link
              className="flex items-center gap-2 hover:underline"
              href="tel:0977777777"
              target="_blank"
            >
              <PhoneIcon className="size-4" />
              +38 (097) 777 77 77
            </Link>
            <Link
              className="flex items-center gap-2 hover:underline"
              href="mail:erytrocenter@mail.com"
              target="_blank"
            >
              <EnvelopeIcon className="size-4" />
              erytrocenter@mail.com
            </Link>
            <Link
              className="flex items-center gap-2 hover:underline"
              href="https://www.facebook.com/?locale=uk_UA"
              target="_blank"
            >
              <ChatBubbleBottomCenterIcon className="size-4" />
              @erytrocenter
            </Link>
          </div>
        </div>
      </div>
      <div className="w-full flex items-center justify-between text-sm border-t border-white pt-3">
        <p className="text-grey">
          Created by{' '}
          <Link
            href="https://github.com/AlivkaRadkivska/"
            className="underline hover:underline-offset-4"
            target="_blank"
          >
            Alina Radkivska
          </Link>
        </p>

        {isSigned ? (
          <Link
            href="/sign-in"
            className="underline underline-offset-2 hover:underline-offset-4"
            target="_blank"
          >
            Вхід в адмін кабінет
          </Link>
        ) : (
          <Link
            href="/admin/cities"
            className="underline underline-offset-2"
            target="_blank"
          >
            Адмін кабінет
          </Link>
        )}
      </div>
    </footer>
  );
}
