'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import clsx from 'clsx'
import { Menu, X } from 'lucide-react'

const links = [
  { href: '/dashboard', label: 'Dashboard' },
  { href: '/activity', label: 'Activity' },
  { href: '/mock-test', label: 'Mock Test' },
  { href: '/my-projects', label: 'My Projects' },
  { href: '/resume-builder', label: 'Resume Builder' },
  { href: '/assignments', label: 'Assignments' },
  { href: '/career-hub', label: 'Career Hub' },
  { href: '/calendar', label: 'Calendar' },
  { href: '/ai-assistant', label: 'AI Assistant' },
  { href: '/faculty', label: 'Faculty', role: 'admin' as const },
  { href: '/settings', label: 'Settings' }
]

export default function Sidebar({ role }: { role: 'student' | 'admin' }) {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  return (
    <>
      {/* MOBILE TOP NAV */}
      <div className="md:hidden flex items-center justify-between bg-white shadow px-4 py-3 fixed w-full z-50">
        <button onClick={() => setOpen(true)}>
          <Menu size={28} className="text-black" />
        </button>
        <h1 className="text-xl font-bold text-black">PrepHub</h1>
      </div>

      {/* DESKTOP SIDEBAR */}
      <aside className="hidden md:flex w-64 border-r bg-white flex-col min-h-screen">
        <div className="p-4 font-bold text-xl text-black">PrepHub</div>

        <nav className="space-y-1">
          {links
            .filter((l) => !('role' in l) || l.role === role)
            .map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className={clsx(
                  'block px-4 py-2 hover:bg-blue-50 text-black',
                  pathname === l.href &&
                    'bg-blue-100 text-blue-700 font-semibold'
                )}
              >
                {l.label}
              </Link>
            ))}
        </nav>

        <div className="mt-auto p-4">
          <form action="/api/auth/logout" method="POST">
            <button className="w-full bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded text-black">
              Log out
            </button>
          </form>
        </div>
      </aside>

      {/* MOBILE OVERLAY */}
      {open && (
        <div
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* MOBILE SIDE DRAWER */}
      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg z-50 transform transition-transform duration-300 md:hidden
        ${open ? 'translate-x-0' : '-translate-x-full'}`}
      >
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-xl font-bold text-black">PrepHub</h2>
          <button onClick={() => setOpen(false)}>
            <X size={26} className="text-black" />
          </button>
        </div>

        <nav className="p-3 space-y-1">
          {links
            .filter((l) => !('role' in l) || l.role === role)
            .map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className={clsx(
                  'block px-4 py-2 hover:bg-blue-50 text-black rounded',
                  pathname === l.href &&
                    'bg-blue-100 text-blue-700 font-semibold'
                )}
              >
                {l.label}
              </Link>
            ))}
        </nav>

        <div className="mt-auto p-4">
          <form action="/api/auth/logout" method="POST">
            <button className="w-full bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded text-black">
              Log out
            </button>
          </form>
        </div>
      </aside>
    </>
  )
}
