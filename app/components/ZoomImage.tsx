"use client";

import { useCallback, useEffect, useId, useRef } from "react";
import PortfolioImage from "./PortfolioImage";

type ZoomImageProps = {
  src: string;
  alt: string;
  heightClass?: string;
  previewMode?: "contain" | "top" | "cover" | "left";
  variant?: "company" | "ecommerce";
};

export default function ZoomImage({
  src,
  alt,
  heightClass = "h-[360px]",
  previewMode,
  variant = "company",
}: ZoomImageProps) {
  const dialogId = useId();
  const dialog = useRef<HTMLDialogElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const scrollLock = useRef<{ body: HTMLElement; value: string; priority: string } | null>(null);

  const restoreScroll = useCallback(() => {
    const saved = scrollLock.current;
    if (!saved) return;
    saved.body.style.setProperty("overflow", saved.value, saved.priority);
    scrollLock.current = null;
  }, []);

  useEffect(() => restoreScroll, [restoreScroll]);

  const openPreview = () => {
    if (!dialog.current || dialog.current.open) return;
    dialog.current.showModal();
    const body = document.body;
    scrollLock.current = {
      body,
      value: body.style.getPropertyValue("overflow"),
      priority: body.style.getPropertyPriority("overflow"),
    };
    body.style.setProperty("overflow", "hidden");
  };

  const closePreview = () => dialog.current?.close();
  const handleClose = () => {
    restoreScroll();
    trigger.current?.focus({ preventScroll: true });
  };

  const mode = previewMode ?? (variant === "ecommerce" ? "top" : "contain");
  const previewClass =
    mode === "top"
      ? "h-full w-full object-cover object-top"
      : mode === "left"
        ? "h-full w-full object-cover object-[25%_center]"
        : mode === "cover"
          ? "h-full w-full object-cover object-center"
          : "h-full w-full object-contain";

  return (
    <>
      <button
        ref={trigger}
        type="button"
        aria-label={`Expand image: ${alt}`}
        aria-haspopup="dialog"
        aria-controls={dialogId}
        onClick={openPreview}
        className={`group relative flex w-full ${heightClass} items-center justify-center overflow-hidden ${variant === "ecommerce" ? "rounded-2xl" : "rounded-3xl"} border border-gray-200 bg-gray-50 text-left`}
      >
        <PortfolioImage
          src={src}
          alt={alt}
          className={`${previewClass} transition duration-300 group-hover:scale-[1.02]`}
        />
        {variant === "company" && <span className="pointer-events-none absolute inset-0 bg-black/0 transition group-hover:bg-black/5" />}
        <span className={`pointer-events-none absolute right-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-medium text-gray-700 shadow-sm ${variant === "ecommerce" ? "backdrop-blur" : ""}`}>
          Click to expand
        </span>
      </button>

      <dialog
        ref={dialog}
        id={dialogId}
        aria-label={`${alt} — image preview`}
        onClose={handleClose}
        onClick={(event) => {
          if (event.target === event.currentTarget) closePreview();
        }}
        className="fixed inset-0 m-0 h-dvh max-h-none w-screen max-w-none items-center justify-center border-0 bg-transparent p-4 text-white backdrop:bg-black/80 open:flex"
      >
        <button
          type="button"
          onClick={closePreview}
          className="absolute right-4 top-4 z-10 flex h-12 w-12 items-center justify-center rounded-full bg-black/60 text-4xl text-white sm:right-6 sm:top-6"
          aria-label="Close image preview"
        >
          ×
        </button>
        <PortfolioImage
          src={src}
          alt={alt}
          className={variant === "ecommerce"
            ? "max-h-[90vh] max-w-[90vw] rounded-xl bg-white object-contain"
            : "max-h-[92vh] max-w-[94vw] rounded-2xl bg-white object-contain shadow-2xl"}
        />
      </dialog>
    </>
  );
}
