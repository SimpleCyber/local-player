"use client";
import { X, AlertTriangle } from "lucide-react";
import { usePlayer } from "../../context/PlayerContext";
import { getColors, ACCENT } from "../../lib/utils";

interface Props {
  title: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  danger?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function ConfirmModal({ title, message, confirmLabel = "Yes, Remove", cancelLabel = "Cancel", danger = true, onConfirm, onCancel }: Props) {
  const { s } = usePlayer();
  const c = getColors(s.theme === "dark");

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" onClick={onCancel}>
      <div style={{ background: c.bg, border: `1px solid ${c.border}` }} className="w-full max-w-sm rounded-2xl shadow-2xl overflow-hidden"
        onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between px-5 pt-5 pb-3">
          <div className="flex items-center gap-3">
            <div style={{ background: danger ? "rgba(239,68,68,0.1)" : `rgba(29,185,84,0.1)` }} className="w-9 h-9 rounded-full flex items-center justify-center">
              <AlertTriangle size={18} style={{ color: danger ? "#ef4444" : ACCENT }} />
            </div>
            <h3 style={{ color: c.txt }} className="font-bold text-base">{title}</h3>
          </div>
          <button onClick={onCancel} style={{ color: c.txt3 }} className="hover:opacity-70 transition-opacity"><X size={18} /></button>
        </div>
        <p style={{ color: c.txt2 }} className="text-sm px-5 pb-5 leading-relaxed">{message}</p>
        <div className="px-5 py-4 flex justify-end gap-3" style={{ borderTop: `1px solid ${c.border}`, background: c.bgSub }}>
          <button style={{ color: c.txt2 }} className="px-4 py-2 text-sm font-semibold hover:opacity-80 transition-opacity" onClick={onCancel}>{cancelLabel}</button>
          <button style={{ background: danger ? "#ef4444" : ACCENT, color: danger ? "#fff" : "#000" }}
            className="px-5 py-2 rounded-full text-sm font-bold hover:brightness-110 active:scale-95 transition-all shadow-md"
            onClick={onConfirm}>{confirmLabel}</button>
        </div>
      </div>
    </div>
  );
}
