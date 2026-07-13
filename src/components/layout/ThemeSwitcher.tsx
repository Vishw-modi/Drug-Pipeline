'use client';

import React, { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import { Menu, Transition } from '@headlessui/react';
import { Palette, Check } from 'lucide-react';
import { Fragment } from 'react';

const themes = [
  { id: 'light', name: 'Default (Teal)' },
  { id: 'dark', name: 'Dark Mode' },
  { id: 'claude', name: 'Sunset (Warm)' },
  { id: 'professional', name: 'Professional (Blue)' },
];

export function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="w-8 h-8 rounded-full border border-slate-200 flex items-center justify-center text-slate-400">
        <Palette size={16} />
      </div>
    );
  }

  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="w-8 h-8 rounded-full border border-slate-200 hover:bg-slate-50 flex items-center justify-center text-slate-600 transition-colors focus:outline-none">
          <Palette size={16} />
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 mt-2 w-48 origin-top-right bg-white divide-y divide-slate-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
          <div className="px-1 py-1">
            <div className="px-3 py-2 text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Select Theme
            </div>
            {themes.map((t) => (
              <Menu.Item key={t.id}>
                {({ active }) => (
                  <button
                    onClick={() => setTheme(t.id)}
                    className={`${
                      active ? 'bg-[var(--color-brand-primary)] text-white' : 'text-slate-700'
                    } group flex w-full items-center rounded-md px-3 py-2 text-sm justify-between`}
                  >
                    {t.name}
                    {theme === t.id && (
                      <Check size={16} className={active ? 'text-white' : 'text-[var(--color-brand-primary)]'} />
                    )}
                  </button>
                )}
              </Menu.Item>
            ))}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
