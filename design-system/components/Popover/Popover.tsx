'use client';

import {
  useCallback,
  useLayoutEffect,
  useRef,
  type KeyboardEvent,
} from 'react';
import {
  useFloating,
  autoUpdate,
  offset,
  flip,
  shift,
  size,
  useDismiss,
  useRole,
  useInteractions,
  FloatingPortal,
  FloatingFocusManager,
} from '@floating-ui/react';
import type { PopoverProps } from './Popover.interfaces';

function getItems(container: HTMLElement | null): HTMLElement[] {
  if (!container) return [];
  return Array.from(
    container.querySelectorAll<HTMLElement>('button, a[href]'),
  ).filter((el) => !el.hasAttribute('disabled') && el.offsetParent !== null);
}

export default function Popover({
  isOpen,
  onClose,
  align = 'right',
  width = 'w-56',
  trigger,
  children,
  ariaLabel = 'Popover',
}: PopoverProps) {
  const floatingRef = useRef<HTMLDivElement | null>(null);
  const typeaheadBuffer = useRef('');
  const typeaheadTimer = useRef<ReturnType<typeof setTimeout>>(undefined);

  const { refs, floatingStyles, context } = useFloating({
    open: isOpen,
    onOpenChange: (open) => {
      if (!open) onClose();
    },
    placement: align === 'right' ? 'bottom-end' : 'bottom-start',
    middleware: [
      offset(8),
      flip(),
      shift({ padding: 16 }),
      size({
        apply({ availableWidth, elements }) {
          const isMobile = availableWidth < 640 || window.innerWidth < 640;
          if (isMobile) {
            Object.assign(elements.floating.style, {
              width: 'calc(100vw - 32px)',
              maxWidth: 'calc(100vw - 32px)',
            });
          } else {
            Object.assign(elements.floating.style, {
              width: '',
              maxWidth: '',
            });
          }
        },
      }),
    ],
    whileElementsMounted: autoUpdate,
  });

  const setReferenceRef = useCallback(
    (node: HTMLDivElement | null) => {
      refs.setReference(node);
    },
    [refs],
  );

  const setFloatingRef = useCallback(
    (node: HTMLDivElement | null) => {
      floatingRef.current = node;
      refs.setFloating(node);
    },
    [refs],
  );

  useLayoutEffect(() => {
    if (!isOpen) return;
    const frame = requestAnimationFrame(() => {
      const items = getItems(floatingRef.current);
      if (items[0]) items[0].focus();
    });
    return () => cancelAnimationFrame(frame);
  }, [isOpen]);

  const handleKeyDown = useCallback((e: KeyboardEvent<HTMLDivElement>) => {
    const items = getItems(floatingRef.current);
    if (items.length === 0) return;

    const active = document.activeElement as HTMLElement;
    const currentIndex = items.indexOf(active);

    switch (e.key) {
      case 'ArrowDown': {
        e.preventDefault();
        const next = currentIndex < items.length - 1 ? currentIndex + 1 : 0;
        items[next]?.focus();
        return;
      }
      case 'ArrowUp': {
        e.preventDefault();
        const prev = currentIndex > 0 ? currentIndex - 1 : items.length - 1;
        items[prev]?.focus();
        return;
      }
      case 'Home': {
        e.preventDefault();
        items[0]?.focus();
        return;
      }
      case 'End': {
        e.preventDefault();
        items[items.length - 1]?.focus();
        return;
      }
      default:
        break;
    }

    if (e.key.length === 1 && !e.ctrlKey && !e.metaKey && !e.altKey) {
      e.preventDefault();
      clearTimeout(typeaheadTimer.current);
      typeaheadBuffer.current += e.key.toLowerCase();
      typeaheadTimer.current = setTimeout(() => {
        typeaheadBuffer.current = '';
      }, 500);

      const match = items.find((item) =>
        (item.textContent ?? '')
          .trim()
          .toLowerCase()
          .startsWith(typeaheadBuffer.current),
      );
      if (match) match.focus();
    }
  }, []);

  const dismiss = useDismiss(context);
  const role = useRole(context, { role: 'dialog' });
  const { getReferenceProps, getFloatingProps } = useInteractions([
    dismiss,
    role,
  ]);

  const referenceProps = getReferenceProps();
  delete referenceProps['aria-expanded'];

  return (
    <>
      <div ref={setReferenceRef} className="inline-block" {...referenceProps}>
        {trigger}
      </div>
      {isOpen && (
        <FloatingPortal>
          <FloatingFocusManager context={context} modal={false}>
            <div
              ref={setFloatingRef}
              style={floatingStyles}
              {...getFloatingProps()}
              onKeyDown={handleKeyDown}
              aria-label={ariaLabel}
              className={`${width} z-50 rounded-xl border border-neutral-200 dark:border-gold/25 bg-white dark:bg-neutral-900 shadow-[0_10px_40px_-8px_rgba(0,0,0,0.12)] dark:shadow-[0_10px_40px_-8px_rgba(0,0,0,0.4)] ring-1 ring-black/[0.03]`}
            >
              {children}
            </div>
          </FloatingFocusManager>
        </FloatingPortal>
      )}
    </>
  );
}
