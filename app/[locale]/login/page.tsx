import { getSession, getUser } from "@/actions/getUser";
import { LoginForm } from "@/components/login-form"
import { title } from "@/constants/title";
import { Metadata } from "next";
import { redirect } from "next/navigation";


export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  // const t = await getDictionary(params.locale); // returns translation object

  const { locale } = await params;

  return {
    metadataBase: new URL(`https://www.copy-to-clipboard.fyi`),

    title: locale === "ar" ? "سجل الدخول" : "Login",

    // title: {
    //   default: locale === "ar" ? "سجل الدخول" : "Login",
    //   template: locale === "ar" ? "%s - سجل الدخول" : "%s - Login",
    // },

    description:
      locale === "ar"
        ? `سجّل الدخول إلى ${title.ar} للوصول إلى جميع الميزات وإدارة المحتوى الخاص بك بسهولة وأمان.`
        : `Log in to ${title.en} to access all features and manage your content securely and easily.`,

    twitter: {
      card: "summary_large_image",
    },

    // title: locale === "ar" ? "نبذة عنا" : "About Us",
  };
}



export default async function Page() {

  const session = await getSession();
  // const jUser = JSON.parse(JSON.stringify(session) || '{}')


  //   console.log(jUser);
  
  
      if (session?.user?.email) {
        redirect('/');
      }

  return (
    <div className="flex min-h-svh w-full items-center justify-center md:px-0 px-1.5 md:p-10">
      <div className="w-full max-w-sm">
        <LoginForm /> 
      </div>
    </div>
  )
}
