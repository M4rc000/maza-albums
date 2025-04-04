'use client'

import { useState } from 'react'
import { Dialog } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { usePathname } from 'next/navigation'
import Link from 'next/link'

const navigation = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Photos", href: "/photos" },
  { name: "Videos", href: "/videos" },
]

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const pathname = usePathname() // Dapatkan path saat ini

  return (
    <header className="fixed top-0 w-full z-50 bg-opacity-80 backdrop-blur-md transition-all duration-300">
      <nav
        aria-label="Global"
        className="flex items-center justify-between p-6 lg:px-8"
      >
        {/* Tombol Menu Mobile */}
        <div className="flex lg:hidden">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon aria-hidden="true" className="h-6 w-6" />
          </button>
        </div>
        {/* Navigasi Desktop (Tengah) */}
        <div className="hidden lg:flex lg:flex-1 lg:justify-center lg:gap-x-5">
          {navigation.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link href={item.href} key={item.name}>
                <span
                  className={`text-sm font-semibold w-18 h-10 flex items-center justify-center rounded-xl cursor-pointer ${
                    isActive
                      ? " bg-gray-900 text-[#EEEEEE]" // Style untuk item aktif
                      : "text-white bg-black"
                  }`}
                >
                  {item.name}
                </span>
              </Link>
            )
          })}
        </div>
      </nav>
      {/* Dialog Menu Mobile */}
      <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="lg:hidden">
        <div className="fixed inset-0 z-50" />
        <Dialog.Panel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon aria-hidden="true" className="h-6 w-6" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                {navigation.map((item) => {
                  const isActive = pathname === item.href
                  return (
                    <Link href={item.href} key={item.name}>
                      <span
                        className={`-mx-3 block rounded-lg px-3 py-2 text-base font-semibold cursor-pointer ${
                          isActive ? "text-blue-500" : "text-gray-900 hover:bg-gray-50"
                        }`}
                      >
                        {item.name}
                      </span>
                    </Link>
                  )
                })}
              </div>
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>
    </header>
  )
}