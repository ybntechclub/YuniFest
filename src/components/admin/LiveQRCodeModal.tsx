import React, { useState, useRef } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { X, Download, Copy, Check, Globe, Sparkles, ExternalLink } from 'lucide-react';

interface LiveQRCodeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LiveQRCodeModal: React.FC<LiveQRCodeModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const defaultUrl = `${window.location.origin}/register`;
  const [targetUrl, setTargetUrl] = useState(defaultUrl);
  const [copied, setCopied] = useState(false);
  const qrContainerRef = useRef<HTMLDivElement>(null);

  const handleCopy = () => {
    navigator.clipboard.writeText(targetUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadSVG = () => {
    const svgElement = qrContainerRef.current?.querySelector('svg');
    if (!svgElement) return;

    const svgData = new XMLSerializer().serializeToString(svgElement);
    const blob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'yunifest-2026-registration-qr.svg';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn">
      <div className="relative w-full max-w-lg bg-[#0D2345] border border-[#F5C451]/40 rounded-2xl shadow-2xl p-6 sm:p-8">
        
        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-lg bg-[#07152F] text-slate-300 hover:text-white border border-slate-700"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-[#F5C451]/20 text-[#F5C451] flex items-center justify-center border border-[#F5C451]/40">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-display font-bold text-white text-lg">
              Live Registration QR Generator
            </h3>
            <p className="text-xs text-slate-300">
              For print posters, banners, and desk promotion
            </p>
          </div>
        </div>

        {/* QR Preview Area */}
        <div className="p-6 rounded-2xl bg-[#07152F] border border-slate-800 flex flex-col items-center justify-center mb-6">
          <div
            ref={qrContainerRef}
            className="p-4 rounded-xl bg-white border-4 border-[#F5C451] shadow-xl"
          >
            <QRCodeSVG
              value={targetUrl}
              size={220}
              level="H"
              includeMargin={false}
            />
          </div>
          <p className="text-xs font-mono font-bold text-[#F5C451] mt-3 uppercase tracking-wider">
            YUNIFEST 2026 • OFFICIAL REGISTRATION
          </p>
        </div>

        {/* Live URL Input / Customizer */}
        <div className="space-y-2 mb-6">
          <label className="block text-xs font-semibold text-slate-300">
            Target Registration Link (Deploy / Production URL):
          </label>
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={targetUrl}
              onChange={(e) => setTargetUrl(e.target.value)}
              className="flex-1 px-3 py-2 rounded-lg bg-[#07152F] border border-slate-700 focus:border-[#F5C451] text-xs font-mono text-white focus:outline-none"
            />
            <button
              type="button"
              onClick={handleCopy}
              className="px-3 py-2 rounded-lg bg-[#112C57] hover:bg-[#1A3660] text-xs font-semibold text-white border border-slate-600 flex items-center gap-1.5 shrink-0"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied' : 'Copy'}</span>
            </button>
          </div>
          <p className="text-[11px] text-slate-400">
            Ensure this reflects your live production URL (e.g. Vercel domain or university domain) before printing brochures.
          </p>
        </div>

        {/* Modal Actions */}
        <div className="flex items-center justify-between gap-3 pt-4 border-t border-slate-800">
          <a
            href={targetUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 text-xs text-cyan-400 hover:text-cyan-300"
          >
            <span>Open Link</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg text-xs font-semibold text-slate-300 bg-[#07152F] hover:bg-slate-800 border border-slate-700"
            >
              Close
            </button>
            <button
              type="button"
              onClick={handleDownloadSVG}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-bold text-[#07152F] bg-gradient-to-r from-[#FDE047] via-[#F5C451] to-[#D4A017] hover:brightness-110 shadow-gold-glow"
            >
              <Download className="w-3.5 h-3.5 text-[#07152F]" />
              <span>Download Vector SVG</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
