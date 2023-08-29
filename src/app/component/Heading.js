import React from 'react'
import Link from 'next/link'

const Heading = () => {
  return (
    <header className='header'>
        <div className='container'>
            <div className='logo'>
                <Link href='/'>BITS</Link>
            </div>
        </div>
    </header>
  )
}

export default Heading