'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { AlignJustify, XIcon } from 'lucide-react'
import Link from 'next/link'
import { useEffect, useState } from 'react'

const menuItems = [
   { id: 1, label: 'Demo', href: '/generate' },
]

export function SiteHeader() {
   const [hamburgerMenuIsOpen, setHamburgerMenuIsOpen] = useState(false)

   useEffect(() => {
      const html = document.querySelector('html')
      if (html) html.classList.toggle('overflow-hidden', hamburgerMenuIsOpen)
   }, [hamburgerMenuIsOpen])

   useEffect(() => {
      const closeHamburgerNavigation = () => setHamburgerMenuIsOpen(false)
      window.addEventListener('orientationchange', closeHamburgerNavigation)
      window.addEventListener('resize', closeHamburgerNavigation)

      return () => {
         window.removeEventListener('orientationchange', closeHamburgerNavigation)
         window.removeEventListener('resize', closeHamburgerNavigation)
      }
   }, [])

   return (
      <>
         <header className="fixed left-0 top-0 z-40 w-full border-b bg-background/80 backdrop-blur-md">
            <div className="mx-auto w-full max-w-screen-xl">
               <div className="p-1 px-8">
                  <div className="flex h-14 items-center justify-between">
                     <Link className="text-md flex items-center" href="/">
                        Image3D
                     </Link>

                     <nav className="hidden md:block">
                        <ul className="flex items-center space-x-6">
                           {menuItems.map(item => (
                              <li key={item.id}>
                                 <Link 
                                    href={item.href} 
                                    className="text-sm hover:text-primary transition-colors"
                                 >
                                    {item.label}
                                 </Link>
                              </li>
                           ))}
                        </ul>
                     </nav>

                     <button
                        className="md:hidden"
                        onClick={() => setHamburgerMenuIsOpen(open => !open)}
                     >
                        <span className="sr-only">Toggle menu</span>
                        {hamburgerMenuIsOpen ? <XIcon /> : <AlignJustify />}
                     </button>
                  </div>
               </div>
            </div>
         </header>

         {/* Add a spacer div to prevent content from being hidden under the header */}
         <div className="h-14" />

         <AnimatePresence>
            {hamburgerMenuIsOpen && (
               <motion.nav
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="fixed inset-0 z-50 mt-14 bg-background/80 backdrop-blur-md"
               >
                  <ul className="container mt-4 flex flex-col space-y-4">
                     {menuItems.map(item => (
                        <motion.li
                           key={item.id}
                           initial={{ opacity: 0, y: -10 }}
                           animate={{ opacity: 1, y: 0 }}
                           exit={{ opacity: 0, y: -10 }}
                           transition={{ delay: item.id * 0.1 }}
                        >
                           <Link
                              href={item.href}
                              className="block py-2 text-lg hover:text-primary transition-colors"
                              onClick={() => setHamburgerMenuIsOpen(false)}
                           >
                              {item.label}
                           </Link>
                        </motion.li>
                     ))}
                  </ul>
               </motion.nav>
            )}
         </AnimatePresence>
      </>
   )
}