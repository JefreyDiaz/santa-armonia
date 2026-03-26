"use client";

import { motion, useReducedMotion } from "framer-motion";
import { FaWhatsapp } from "react-icons/fa";

import { getWhatsAppReservaGeneralLink } from "@/lib/whatsapp-link";

export default function WhatsAppFloatingButton() {
  const shouldReduceMotion = useReducedMotion();
  const href = getWhatsAppReservaGeneralLink();

  return (
    <div
      className="fixed z-[9999]"
      style={{
        right: "max(16px, env(safe-area-inset-right))",
        bottom: "max(16px, env(safe-area-inset-bottom))",
      }}
    >
      <motion.a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Abrir WhatsApp para reservar"
        className={[
          "group inline-flex items-center gap-2",
          "rounded-full px-4 py-3",
          "text-white font-semibold",
          "shadow-[0_10px_30px_rgba(0,0,0,0.18)]",
          "bg-[linear-gradient(135deg,#25D366_0%,#128C7E_100%)]",
          "ring-1 ring-white/30",
          "transition-transform duration-200 hover:scale-[1.03] active:scale-[0.99]",
          "focus:outline-none focus-visible:ring-4 focus-visible:ring-emerald-300/50",
        ].join(" ")}
        animate={
          shouldReduceMotion
            ? undefined
            : {
                y: [0, -2, 0],
                scale: [1, 1.04, 1],
              }
        }
        transition={
          shouldReduceMotion
            ? undefined
            : {
                duration: 0.9,
                ease: "easeInOut",
                repeat: Infinity,
                repeatDelay: 4.5,
              }
        }
      >
        <span
          className={[
            "inline-flex items-center justify-center",
            "h-9 w-9 rounded-full",
            "bg-white/15 ring-1 ring-white/25",
            "shadow-[inset_0_0_0_1px_rgba(255,255,255,0.12)]",
          ].join(" ")}
          aria-hidden="true"
        >
          <FaWhatsapp className="h-5 w-5" />
        </span>

        <span className="text-[15px] leading-none tracking-wide">
          Reserva <span className="font-extrabold">Aquí</span>
        </span>
      </motion.a>
    </div>
  );
}

