import HeaderNav from "@/components/homepage/HeaderNav";
import Footer from "@/components/homepage/Footer";
import { LoginForm } from "@/components/auth/LoginForm";

export default function LoginPage() {
  return (
    <>
      <HeaderNav />
      <div className="bg-muted flex min-h-svh flex-col items-center justify-center gap-6 p-4 md:p-8">
        <div className="flex w-full max-w-lg flex-col gap-6">
          <LoginForm />
          
          
        </div>
      </div>
      <Footer />
    </>
  );
}
