"use client";

import React from "react";
import {
  Container,
  Heading,
  Html,
  Link,
  Section,
  Tailwind,
  Text,
} from "@react-email/components";
// import { getLocale, getTranslations } from 'next-intl/server'
// import { useTranslations } from 'next-intl';

// import './VerifyEmailTemplate.css'

const VerifyEmailTemplateArabic = (verificationLink: string) => {
  // const verificationEmail = useTranslations("VerificationEmail");

  // const locale = getLocale();
  // console.log(locale)

  return (
    <Html lang="ar" dir="rtl">
      {/* <Head>
  <style>
    
  </style>
</Head> */}

      <Tailwind
        config={{
          theme: {
            extend: {
              colors: {
                brand: "#007291",
              },
            },
          },
        }}
      >
        <Container
          className="flex justify-center items-center"
          style={{ fontFamily: "Arial" }}
        >
          <Section
            className="max-w-[600px] mx-auto px-[20px] py-2 bg-[#ffffff] rounded-[10px] shadow-md mt-[50px]
          flex flex-col justify-center items-center"
          >
            <Heading
              as="h1"
              className="text-[#333333] text-center text-[22px] font-[600] mx-[0px] my-[10px]"
            >
              التأكد من صحة بريدك الإلكتروني
              {/* {verificationEmail("Verify Your Email Address")} */}
            </Heading>
            <Text
              dir="rtl"
              className="text-[#666666] leading-[1.5] mb-[2px] mx-[12px] text-center"
            >
              شكراً لك على تسجيل حسابك! لإكمال تسجيل الحساب أضغط على الزر التالي
              لتأكيد بريدك الإلكتروني.
              {/* {verificationEmail("ThankYouForSigningUp")} */}
            </Text>
            <Link
              href={verificationLink}
              className="block mx-auto my-[12px] py-[15px] bg-[#61a9f6] text-white
    text-[14px] font-semibold rounded-[5px] text-center w-[170px] hover:bg-[#93c7ff]"
            >
              أكد البريد الإلكتروني
              {/* {verificationEmail("Verify Email")} */}
            </Link>
            <Text className="text-center mt-[10px] text-[#999999] text-[15px]">
              صلاحية هذا الرابط ستنتهي خلال 30 دقيقة.
              {/* {verificationEmail("WillExpireIn")} */}
            </Text>
          </Section>
        </Container>
      </Tailwind>
    </Html>
  );
};

export default VerifyEmailTemplateArabic;
