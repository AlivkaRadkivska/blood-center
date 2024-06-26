import { SignIn } from '@clerk/nextjs';

export default function ClerkSigninPage() {
  return (
    <div className="fixed z-50 top-0 w-screen h-screen flex items-center justify-center bg-purple bg-opacity-50">
      <SignIn
        path="/sign-in"
        forceRedirectUrl="/admin/cities"
        appearance={{
          elements: {
            footerAction: { display: 'none' },
          },
        }}
      />
    </div>
  );
}
