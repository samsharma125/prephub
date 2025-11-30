'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import clsx from 'clsx'
import { Menu, X, Bell } from 'lucide-react'

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

export default function Sidebar({
  role,
  auth
}: {
  role: 'student' | 'admin',
  auth: { name: string; email: string }
}) {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const [profileOpen, setProfileOpen] = useState(false)

  const userBtnRef = useRef<HTMLButtonElement | null>(null)

  const [pos, setPos] =
    useState<{ left: number; top: number; width: number } | null>(null)

  const computePosition = () => {
    const btn = userBtnRef.current
    if (!btn) return
    const rect = btn.getBoundingClientRect()
    const menuWidth = 288

    let left = rect.right - menuWidth
    left = Math.max(8, Math.min(left, window.innerWidth - menuWidth - 8))

    setPos({ left, top: rect.bottom + 8, width: menuWidth })
  }

  const toggleProfile = (e?: React.MouseEvent) => {
    e?.stopPropagation()
    if (!profileOpen) {
      computePosition()
      setProfileOpen(true)
    } else {
      setProfileOpen(false)
    }
  }

  useEffect(() => {
    const onDocClick = () => setProfileOpen(false)
    window.addEventListener('click', onDocClick)
    return () => window.removeEventListener('click', onDocClick)
  }, [])

  useEffect(() => {
    if (!profileOpen) return

    const onResize = () => computePosition()
    const onScroll = () => computePosition()

    window.addEventListener('resize', onResize)
    window.addEventListener('scroll', onScroll, { passive: true })

    return () => {
      window.removeEventListener('resize', onResize)
      window.removeEventListener('scroll', onScroll)
    }
  }, [profileOpen])

  return (
    <>
      {/* NAVBAR */}
      <div
        className="flex items-center justify-between bg-white border-b px-4 py-2 fixed top-0 left-0 w-full z-50"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-6">
          <button onClick={(e) => { e.stopPropagation(); setOpen(true) }}>
            <Menu size={21} className="text-black" />
          </button>

          <h1 className="text-xl font-bold text-black">PrepHub</h1>
        </div>

        <div className="flex items-center gap-6">
          <button>
            <Bell size={22} className="text-black" />
          </button>

          <div className="relative" onClick={(e) => e.stopPropagation()}>
            <button
              ref={userBtnRef}
              onClick={toggleProfile}
              className="inline-flex items-center"
            >
              <img
                src="/user.png"
                className="w-10 h-10 rounded-full border shadow"
                alt="User"
              />
            </button>
          </div>
        </div>
      </div>

      <div className="h-[55px]" />

      {/* OVERLAY */}
      {open && (
        <div
          className="fixed inset-0 bg-black/40 z-40"
          onClick={() => setOpen(false)}
        />
      )}

      {/* SIDEBAR */}
      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-white shadow-xl z-50 transform transition-transform duration-300 
          ${open ? 'translate-x-0' : '-translate-x-full'}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-xl font-bold text-black">PrepHub</h2>
          <button onClick={() => setOpen(false)}>
            <X size={26} className="text-black" />
          </button>
        </div>

        <nav className="p-3 space-y-1">
          {links
            .filter((l) => !l.role || l.role === role)
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
      </aside>

      {/* USER DROPDOWN */}
      {profileOpen && pos && (
        <div
          style={{
            position: "fixed",
            top: pos.top,
            left: pos.left,
            width: pos.width,
            zIndex: 9999,
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="
            rounded-xl 
            overflow-hidden 
            shadow-[0_8px_25px_rgba(0,0,0,0.45)] 
            border border-[#415a77]/30 
            bg-[#0d1b2a]/95 
            backdrop-blur-xl
          ">

            {/* USER INFO */}
            <div className="p-4 border-b border-[#415a77]/40">
              <p className="font-semibold text-blue-300 text-[15px] tracking-wide">
                {auth.name}
              </p>
              <p className="text-gray-400 text-xs mt-1 tracking-wide">
                {auth.email}
              </p>
            </div>

            <Link
              href="/profile"
              className="block px-4 py-3 text-gray-200 text-sm hover:bg-[#13203a] hover:text-blue-300 transition-all"
            >
              Profile
            </Link>

            <Link
              href="/settings"
              className="block px-4 py-3 text-gray-200 text-sm hover:bg-[#13203a] hover:text-blue-300 transition-all"
            >
              Account Settings
            </Link>

            <hr className="border-[#415a77]/20" />

            {/* SIGN OUT — FIXED */}
            <button
              onClick={async (e) => {
                e.preventDefault();
                e.stopPropagation();

                const res = await fetch("/api/auth/logout", {
                  method: "POST",
                  credentials: "include",
                });

                if (res.redirected) {
                  window.location.href = res.url;
                }
              }}
              className="
                w-full text-left 
                px-4 py-3 
                text-red-400 text-sm 
                hover:bg-[#3b0f14]/60 
                hover:text-red-300 
                transition-all
              "
            >
              Sign Out
            </button>

          </div>
        </div>
      )}
    </>
  )
}
