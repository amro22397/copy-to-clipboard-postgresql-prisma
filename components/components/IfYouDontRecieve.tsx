'use client'

import React from 'react'

const IfYouDontRecieve = () => {
  return (
    <div className="bg-red-500 text-white w-full
    hidden justify-center text-lg pb-1">
      If you have not recieved the email, check you spam folder or <span 
      className="ml-1 text-orange-200
      hover:underline cursor-pointer">click here</span>
    </div>
  )
}

export default IfYouDontRecieve
