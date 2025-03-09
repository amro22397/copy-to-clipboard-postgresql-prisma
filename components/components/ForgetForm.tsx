'use client'

import React, { useEffect, useState } from 'react'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
  import { Button } from "@/components/ui/button"
  import { Input } from "@/components/ui/input"
import axios from 'axios'
import { toast } from '@/hooks/use-toast'
import Link from 'next/link'
import { Loader2 } from 'lucide-react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

import { useLocale, useTranslations } from 'next-intl' 


const ForgetForm = () => {

    const [email, setEmail] = useState(""); 
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const router = useRouter();

    const locale = useLocale();


    const handleSubmit = async (e: any) => {
      e.preventDefault();

      setLoading(true)

      try {

        const res = await axios.post("/api/forget-password", { email, locale });


       if (res.data.success) {

        try {
        
          const forgetEmailRes = await axios.post("/api/send-forget-email", {
            email: email,
            subject: 'Reset Password',
            locale: locale,
            // message: VerifyEmailTemplate(),
          })
    
          console.log(forgetEmailRes)
    
          setLoading(false);
    
        } catch (error: any) {
    
          console.log(`Error sending verification email: ${error.message}`)
    
          setLoading(false);
          
          return toast({
            title: `Error sending verification email: ${error.message}`,
          })
    
          
        }
        
       }



        if (!res.data.success) {
          toast({
            variant: "destructive",
            title: res.data.message
          })
        }

        if (res.data.success) {
          toast({
            className: "bg-green-500 text-white",
            title: res.data.message
          })
        }

        setLoading(false);
        
      } catch (error) {
        console.log(error);
        toast({
          variant: "destructive",
          title: `${error}`
        })
        setLoading(false)
      }

      
      setEmail("");
      setLoading(false)
  }

  const forgetPage = useTranslations('ForgetPage');
  

  return (
    <Card className='flex flex-col justify-center items-start w-[400px] mx-auto'>
  <CardHeader>
    <CardTitle className='text-2xl'>{forgetPage('Forgot Password')}</CardTitle>
    <CardDescription className='text-gray-600'>{forgetPage('Enter your email')}<br/> 
    {forgetPage('SendYouReset')}</CardDescription>
  </CardHeader>
  <CardContent className='w-full'>

  <form onSubmit={handleSubmit}
   className="flex flex-row w-full items-center justify-between gap-2 ">

      <Input type="email" placeholder={forgetPage('Email')}
      value={email}
      onChange={e => setEmail(e.target.value)}
      required
      className='placeholder-gray-700' />

      <Button type="submit"
      className='bg-green-500 hover:bg-green-500/95 active:bg-green-500/90 text-white'>{loading ? <Loader2 className="animate-spin" /> : forgetPage('Send')}</Button>

    </form>

    
    {message && (
        <p className="text-sm text-red-500 mt-4">{message}</p>
      )}

  </CardContent>

  <CardFooter>
    <Link href={`/${locale}/login`}
    className='text-sm hover:underline active:text-gray-600' >
    {forgetPage('Back to sign in')}
    </Link>
  </CardFooter>
</Card>
  )
}

export default ForgetForm
