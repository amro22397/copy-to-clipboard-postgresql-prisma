import { getSession, getUser } from "@/actions/getUser";
import ForgetForm from "@/components/ForgetForm";
import { redirect } from "next/navigation";
import React from "react";


export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  // const t = await getDictionary(params.locale); // returns translation object

  const { locale } = await params;

  return {
    metadataBase: new URL(`https://www.copy-to-clipboard.fyi`),

    title: locale === "ar" ? "هل نسيت كلمة المرور" : "Forget Password",

    // title: {
    //   default: locale === "ar" ? "هل نسيت كلمة المرور" : "Forget Password",
    //   template:
    //     locale === "ar" ? "%s - هل نسيت كلمة المرور" : "%s - Forget Password",
    // },

    description:
      locale === "ar"
        ? "هل نسيت كلمة المرور؟ يمكنك استعادة الوصول إلى حسابك بسهولة عن طريق إدخال بريدك الإلكتروني واتباع خطوات إعادة التعيين."
        : "Forgot your password? Easily regain access to your account by entering your email and following the password reset steps.",

    twitter: {
      card: "summary_large_image",
    },

    // title: locale === "ar" ? "نبذة عنا" : "About Us",
  };
}


const page = async () => {

    

  const session = await getSession();
  // const jUser = JSON.parse(JSON.stringify(session) || '{}')


  // console.log(jUser);


    if (session?.user?.email) {
      redirect('/');
    }
        

  return (
    <div className="flex min-h-[90vh] w-full items-center justify-center p-6 md:p-10">
          <div className="w-full max-w-sm">
          <ForgetForm />
          </div>
        </div>
  )
}

export default page
