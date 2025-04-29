import HeaderNav from "@/components/homepage/HeaderNav";
import Footer from "@/components/homepage/Footer";
import { RegisterForm } from "@/components/auth/RegisterForm";

export default function RegisterPage() {
  return (
    <>
      <HeaderNav />
      <div className="bg-muted flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
        <div className="flex w-full max-w-lg flex-col gap-6">
          <RegisterForm />
        </div>
      </div>
      <Footer />
    </>
  );
}
