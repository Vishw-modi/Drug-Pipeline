'use client';

import React from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { Loader2 } from 'lucide-react';

interface ExportPreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  previewUrl: string | null;
  isLoading: boolean;
  loadingMessage: string;
  filename: string;
  formatName: string;
}

export function ExportPreviewModal({ 
  isOpen, 
  onClose, 
  onConfirm, 
  previewUrl, 
  isLoading, 
  loadingMessage,
  filename,
  formatName
}: ExportPreviewModalProps) {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={isLoading ? () => {} : onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-4xl transform overflow-hidden rounded-2xl bg-[var(--color-surface)] p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title as="h3" className="text-lg font-bold leading-6 text-gray-900 border-b pb-3">
                  Export Preview
                </Dialog.Title>
                
                <div className="mt-4 flex flex-col items-center justify-center min-h-[300px] bg-slate-50 border border-slate-200 rounded-lg overflow-hidden">
                  {isLoading ? (
                    <div className="flex flex-col items-center text-slate-500">
                      <Loader2 className="h-8 w-8 animate-spin mb-4 text-[#6345ED]" />
                      <p className="font-medium">{loadingMessage}</p>
                    </div>
                  ) : previewUrl ? (
                    <img src={previewUrl} alt="Export Preview" className="max-h-[60vh] object-contain shadow-sm" />
                  ) : (
                    <p className="text-red-500">Failed to generate preview.</p>
                  )}
                </div>

                {!isLoading && previewUrl && (
                  <div className="mt-4 bg-slate-50 p-4 rounded-lg text-sm text-slate-600 border border-slate-200">
                    <div className="flex justify-between items-center">
                      <div>
                        <span className="font-semibold block mb-1">Export Details</span>
                        <p>Format: <span className="font-medium">{formatName}</span></p>
                        <p>File: <span className="font-mono text-xs bg-slate-200 px-1 rounded">{filename}</span></p>
                      </div>
                      <div className="text-right">
                        <span className="font-semibold block mb-1">Timestamp</span>
                        <p>{new Date().toLocaleString()}</p>
                      </div>
                    </div>
                  </div>
                )}

                <div className="mt-6 flex justify-end gap-3">
                  <button
                    type="button"
                    className="inline-flex justify-center rounded-md border border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-2 text-sm font-medium text-[var(--color-muted)] hover:bg-slate-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                    onClick={onClose}
                    disabled={isLoading}
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    className="inline-flex justify-center rounded-md border border-transparent bg-[#6345ED] px-4 py-2 text-sm font-medium text-white hover:bg-[#5235C7] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#6345ED] focus-visible:ring-offset-2 disabled:opacity-50"
                    onClick={onConfirm}
                    disabled={isLoading || !previewUrl}
                  >
                    Confirm Download
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
