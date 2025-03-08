import React from 'react'

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <>
    <div className="mx-6 sm:mx-[100px] h-auto mt-24">
        <div className='flex justify-center items-center h-[80px]'>
            <p className='text-[#B6BCC6] text-xs tracking-widest'>Perancangan sistem pengairan sawah otomatis berbasis IOT | muhammad syarif | {currentYear}</p>
        </div>
    </div>
    </>
  )
}

export default Footer