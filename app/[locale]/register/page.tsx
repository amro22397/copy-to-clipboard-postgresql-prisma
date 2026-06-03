
import { getSession, getUser } from "@/actions/getUser";
import { RegisterForm } from "@/components/register-form"
import { title } from "@/constants/title";
import { Metadata } from "next";
import { redirect } from "next/navigation";
// import { useSession } from "next-auth/react"
// import { useRouter } from "next/navigation";
// import { useEffect } from "react";



export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  // const t = await getDictionary(params.locale); // returns translation object

  const { locale } = await params;

  return {
    metadataBase: new URL(`https://www.am-notes.us`),

    title: locale === "ar" ? "سجل الحساب" : "Register",

    // title: {
    //   default: locale === "ar" ? "سجل الحساب" : "Register",
    //   template: locale === "ar" ? "%s - سجل الحساب" : "%s - Register",
    // },

    description:
      locale === "ar"
        ? `سجّل الآن في ${title.ar} لإنشاء حساب مجاني وحفظ النصوص ونسخها إلى الكليبورد بسهولة وسرعة من أي جهاز. `
        : `Register now on ${title.en} to create a free account and easily save and copy text to your clipboard from any device.`,

    twitter: {
      card: "summary_large_image",
    },

    // title: locale === "ar" ? "نبذة عنا" : "About Us",
  };
}



export default async function Page() {

  const session = await getSession();
  // const jUser = JSON.parse(JSON.stringify(session) || '{}')

  //     console.log(jUser);
    
    
        if (session?.user?.email) {
          redirect('/');
        }

        // ss


  return (
    <div className="flex min-h-svh w-full items-center justify-center p-3 sm:p-6 md:p-10">
      <div className="w-full max-w-sm">
        <RegisterForm />
      </div>
    </div>
  )
}
