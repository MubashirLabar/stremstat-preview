import Link from "next/link";

function VerifyEmail() {
  return (
    <div className="flex min-h-screen flex-1">
      <div className="min-h-screen flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
        <div className="mx-auto h-full w-full flex flex-1 flex-col justify-center text-center max-w-sm lg:w-96 gap-8">
          <h2 className="text-2xl font-bold leading-6 tracking-tight text-gray-900">
            Check your email
          </h2>
          <div className="text-base text-gray-700">
            To confirm your email address, please open your email inbox and
            verify the account.
          </div>
          <Link href="/login" className="buttonPrimary">
            I understood
          </Link>
        </div>
      </div>
      <div className="bg-gray-50 relative hidden w-0 flex-1 lg:block">
        <img
          className="absolute inset-0 h-full w-full object-cover"
          src="/login-poster.jpg"
          alt=""
        />
      </div>
    </div>
  );
}

export default VerifyEmail;
