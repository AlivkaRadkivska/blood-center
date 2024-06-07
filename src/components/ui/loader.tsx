import Image from 'next/image';
import load from '@public/images/load.png';

export default function Loader({ description }: { description: string }) {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-1 text-italic">
      <Image
        src={load}
        alt="loader"
        width={35}
        height={35}
        className="animate-[spin_2s_linear_infinite]"
      />
      <p>{description}</p>
    </div>
  );
}
