'use client';

import React from 'react';
import { Download, FileImage, Presentation } from 'lucide-react';
import { Menu, Transition } from '@headlessui/react';
import { Fragment } from 'react';

interface ExportDropdownProps {
  onExport: (format: 'image' | 'ppt') => void;
}

export function ExportDropdown({ onExport }: ExportDropdownProps) {
  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="p-2 hover:bg-slate-50 rounded-full transition-colors text-slate-500 focus:outline-none focus:ring-2 focus:ring-[var(--color-brand-primary)]" title="Export">
          <Download size={18} />
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
        <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-[var(--color-surface)] shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
          <div className="px-1 py-1">
            <Menu.Item>
              {({ active }) => (
                <button
                  onClick={() => onExport('image')}
                  className={`${
                    active ? 'bg-[#6345ED] text-white' : 'text-gray-900'
                  } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                >
                  <FileImage className="mr-2 h-4 w-4" aria-hidden="true" />
                  Download as Image
                </button>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <button
                  onClick={() => onExport('ppt')}
                  className={`${
                    active ? 'bg-[#6345ED] text-white' : 'text-gray-900'
                  } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                >
                  <Presentation className="mr-2 h-4 w-4" aria-hidden="true" />
                  Download as PowerPoint
                </button>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
