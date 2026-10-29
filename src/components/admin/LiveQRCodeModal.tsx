import React, { useRef, useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { X, Copy, Check, Download, ExternalLink, Sparkles } from 'lucide-react';

interface LiveQRCodeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LiveQRCodeModal: React.FC<LiveQRCodeModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const [copied, setCopied] = useState(false);
  const qrContainerRef = useRef<HTMLDivElement>(null);

  const registrationUrl = `${window.location.origin}/register`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(registrationUrl);
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
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn">
      <div className="relative w-full max-w-lg bg-white border-[1.5px] border-slate-900 rounded-[32px] shadow-solid-pop-lg p-6 sm:p-8 text-slate-950">
        
        <button
          type="button"
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-full bg-white text-slate-700 hover:text-slate-950 border-[1.5px] border-slate-900 shadow-sm"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-[#FEF08A] text-slate-950 flex items-center justify-center border border-slate-900 shadow-sm">
            <Sparkles className="w-5 h-5 text-[#2B59FF]" />
          </div>
          <div>
            <h3 className="font-headline font-black text-xl text-slate-950 uppercase">
              Registration QR Generator
            </h3>
            <p className="text-xs text-slate-600 font-display">
              For print posters, flex banners, and gate check-in promotion
            </p>
          </div>
        </div>

        {/* QR Code Presentation Box */}
        <div className="p-8 rounded-[28px] bg-[#F6F7F9] border-[1.5px] border-slate-900 flex flex-col items-center justify-center mb-6">
          <div
            ref={qrContainerRef}
            className="p-5 rounded-2xl bg-white border border-slate-300 shadow-sm flex flex-col items-center"
          >
            <QRCodeSVG
              value={registrationUrl}
              size={180}
              level="H"
              includeMargin={false}
            />
            <span className="font-mono text-[10px] font-black text-slate-900 mt-2 uppercase">
              YUNIFEST 2026 OFFICIAL REGISTRATION
            </span>
          </div>

          <div className="mt-4 text-center">
            <p className="font-mono text-xs font-bold text-slate-950">
              Scan to open participant portal
            </p>
            <p className="font-mono text-[10px] text-slate-500 mt-0.5">
              Encodes: <span className="text-[#2B59FF] font-bold">{registrationUrl}</span>
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="space-y-3">
          <button
            type="button"
            onClick={handleDownloadSVG}
            className="btn-voltage w-full py-3 text-xs justify-center"
          >
            <Download className="w-4 h-4" />
            <span>Download Vector SVG for Print</span>
          </button>

          <button
            type="button"
            onClick={handleCopyLink}
            className="w-full py-2.5 rounded-full bg-white hover:bg-slate-50 text-slate-900 font-display font-bold text-xs flex items-center justify-center gap-2 border-[1.5px] border-slate-900 transition-colors"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-emerald-600" />
                <span>Link Copied to Clipboard!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                <span>Copy Direct Registration URL</span>
              </>
            )}
          </button>
        </div>

      </div>
    </div>
  );
};
