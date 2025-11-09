'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import React from 'react'

const page = () => {

    const searchParams = useSearchParams();
    const router = useRouter();

    const params = new URLSearchParams(searchParams);

    params.set('pageListId', 'All');

    router.push(`?${params.toString()}`)
  return (
    <div>page</div>
  )
}

export default page