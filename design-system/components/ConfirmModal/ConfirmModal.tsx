'use client';

import { useEffect, useRef, useCallback } from 'react';
import type { ConfirmModalProps } from './ConfirmModal.interfaces';

export default function ConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  title,
  description,
  confirmLabel = 'Remove',
  cancelLabel = 'Cancel',
}: ConfirmModalProps) {
  const confirmRef = useRef<HTMLButtonElement>(null);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    },
    [onClose],
  );

  useEffect(() => {
    if (!isOpen) return;
    document.addEventListener('keydown', handleKeyDown);
    confirmRef.current?.focus();
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, handleKeyDown]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-40 flex items-center justify-center"
      role="presentation"
    >
      <div
        className="absolute inset-0 bg-black/25 backdrop-blur-[6px]"
        onClick={onClose}
        aria-hidden="true"
      />

      <div
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="confirm-modal-title"
        aria-describedby={description ? 'confirm-modal-desc' : undefined}
        className="relative z-50 w-full max-w-[360px] mx-4 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-gold/25 rounded-xl p-5 shadow-lg"
      >
        <h2
          id="confirm-modal-title"
          className="text-sm font-semibold text-neutral-900 dark:text-neutral-100"
        >
          {title}
        </h2>
        {description && (
          <p
            id="confirm-modal-desc"
            className="text-sm text-neutral-500 dark:text-neutral-400 mt-1.5"
          >
            {description}
          </p>
        )}

        <div className="flex items-center justify-end gap-2 mt-5">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium rounded-lg text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors cursor-pointer"
          >
            {cancelLabel}
          </button>
          <button
            ref={confirmRef}
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className="px-4 py-2 text-sm font-medium rounded-lg bg-red-500 text-white hover:bg-red-600 active:bg-red-700 transition-colors focus-visible:outline-2 focus-visible:outline-red-500 cursor-pointer"
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
