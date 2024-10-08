"use client"

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { signIn, signOut, useSession, getProviders, ClientSafeProvider } from 'next-auth/react'

type Props = {}

interface IProvidersResponse {
  [provider: string]: ClientSafeProvider;
}

const Navbar = (props: Props) => {
  
  const { data: session } = useSession() || { data: null };

  const [toggleDropDown, setToggleDropDown] = useState<boolean>(false);

  const [providers, setProviders] = useState<IProvidersResponse | null >(null);

  useEffect(() => {
    const fetchProviders = async () => {
      const response = await getProviders();
      setProviders(response);
    };

    fetchProviders();
  }, []);
  

  return (
    <nav className='flex-between w-full mb-16 pt-3'>
      <Link
        href='/'
        className='flex gap-2 flex-center' 
      >
        <Image
          src='/assets/images/logo.svg'
          alt='PrompVerse Logo'
          width={30}
          height={30} 
          className='object-contain'
        />
        <p className="logo_text">PromptVerse</p>
      </Link>

      {/* Desktop Navigation */}
      <div className="sm:flex hidden">
        {session?.user ? (
        <div className='flex gap-3 md:gap-5'>
          <Link 
          href='create-prompt' 
          className='black_btn'>
            Create Prompt
          </Link>
          <button 
            type="button"
            onClick={() => signOut()}
            className='outline_btn'>
              Sign Out
            </button>
            <Link
              href='/profile'>
              <Image
                src={session?.user.image ?? '/assets/images/logo.svg'}
                alt='profile'
                width={37}
                height={37} 
                className='rounded-full'
              />
            </Link>
        </div>
        ) : (
        <>
        { providers && Object.values(providers).map( provider => (
          <button 
            type="button"
            key={provider.name}
            onClick={() => signIn(provider.id)}
            className='black_btn'>
              Sign In
          </button>
        ))}
        </>
        )}
      </div>

      {/* Mobile Navigation */}
      <div className="sm:hidden flex relative">
        {session?.user ? (
        <div className='flex'>
          <Image
            src={session?.user.image ?? '/assets/images/logo.svg'}
            alt='profile'
            width={37}
            height={37} 
            className='rounded-full cursor-pointer'
            onClick={() => setToggleDropDown(prev => !prev)}
          />
          { toggleDropDown && (
            <div className="dropdown">
              <Link 
                href='/profile' 
                className='dropdown_link'
                onClick = {() => setToggleDropDown(false)}
              >
                My Profile
              </Link>
              <Link 
                href='/create-prompt' 
                className='dropdown_link'
                onClick = {() => setToggleDropDown(false)}
              >
                Create Prompt
              </Link>
              <button 
                type="button"
                onClick={() => {
                  setToggleDropDown(false);
                  signOut();
                }}
                className='black_btn mt-5 w-full'
              >
                Sign Out
              </button>
            </div>
          )}  
          {/* <Link 
          href='create-promp' 
          className='black_btn'>
            Create Post
          </Link>
          <button 
            type="button"
            onClick={() => signOut}
            className='outline_btn'>
              Sign Out
          </button> */}
        </div>
        ) : (
        <>
        { providers && Object.values(providers).map( provider => (
          <button 
            type="button"
            key={provider.name}
            onClick={() => signIn(provider.id)}
            className='black_btn'>
              Sign In
          </button>
        ))}
        </>
        )}
      </div>
    </nav>
  )
}

export default Navbar