import { motion, AnimatePresence } from 'motion/react';
import { X, Copy, Check } from 'lucide-react';
import { Button } from '@/app/components/ui/button';
import { useState } from 'react';
import { toast } from 'sonner';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  url: string;
  text: string;
}

interface ShareOption {
  id: string;
  name: string;
  icon: string;
  color: string;
  getUrl: (url: string, text: string) => string;
}

const shareOptions: ShareOption[] = [
  {
    id: 'whatsapp',
    name: 'WhatsApp',
    icon: '💬',
    color: '#25D366',
    getUrl: (url, text) => `https://wa.me/?text=${encodeURIComponent(text + ' ' + url)}`,
  },
  {
    id: 'facebook',
    name: 'Facebook',
    icon: '📘',
    color: '#1877F2',
    getUrl: (url) => `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
  },
  {
    id: 'x',
    name: 'X',
    icon: '𝕏',
    color: '#000000',
    getUrl: (url, text) => `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`,
  },
  {
    id: 'messenger',
    name: 'Messenger',
    icon: '💬',
    color: '#0084FF',
    getUrl: (url) => `fb-messenger://share/?link=${encodeURIComponent(url)}`,
  },
  {
    id: 'telegram',
    name: 'Telegram',
    icon: '✈️',
    color: '#0088CC',
    getUrl: (url, text) => `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`,
  },
  {
    id: 'linkedin',
    name: 'LinkedIn',
    icon: '💼',
    color: '#0A66C2',
    getUrl: (url) => `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
  },
  {
    id: 'reddit',
    name: 'Reddit',
    icon: '🤖',
    color: '#FF4500',
    getUrl: (url, text) => `https://reddit.com/submit?url=${encodeURIComponent(url)}&title=${encodeURIComponent(text)}`,
  },
  {
    id: 'email',
    name: 'Email',
    icon: '📧',
    color: '#EA4335',
    getUrl: (url, text) => `mailto:?subject=${encodeURIComponent(text)}&body=${encodeURIComponent(url)}`,
  },
];

export function ShareModal({ isOpen, onClose, title, url, text }: ShareModalProps) {
  const [copied, setCopied] = useState(false);

  const handleShare = (option: ShareOption) => {
    const shareUrl = option.getUrl(url, text);
    
    // Voor Messenger op mobile, probeer de app te openen
    if (option.id === 'messenger' && /Android|iPhone|iPad|iPod/i.test(navigator.userAgent)) {
      window.location.href = shareUrl;
    } else {
      window.open(shareUrl, '_blank', 'width=600,height=400');
    }
    
    toast.success(`Delen via ${option.name}`);
  };

  const handleCopyLink = () => {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(url)
        .then(() => {
          setCopied(true);
          toast.success('Link gekopieerd naar clipboard!');
          setTimeout(() => setCopied(false), 2000);
        })
        .catch(() => {
          toast.info('Link: ' + url, { duration: 10000 });
        });
    } else {
      toast.info('Link: ' + url, { duration: 10000 });
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            className="fixed bottom-0 left-0 right-0 z-50 bg-white rounded-t-3xl shadow-2xl max-h-[80vh] overflow-hidden"
          >
            {/* Header */}
            <div className="sticky top-0 bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between">
              <h2 className="text-xl font-bold text-slate-900">Artikel delen</h2>
              <Button variant="ghost" size="icon" onClick={onClose}>
                <X className="w-5 h-5" />
              </Button>
            </div>

            {/* Content */}
            <div className="p-6 overflow-y-auto max-h-[calc(80vh-80px)]">
              {/* Article Preview */}
              <div className="mb-6 p-4 bg-gradient-to-br from-slate-50 to-slate-100 rounded-2xl border border-slate-200">
                <h3 className="font-medium text-slate-900 mb-2 line-clamp-2">{title}</h3>
                <p className="text-sm text-slate-600 break-all">{url}</p>
              </div>

              {/* Copy Link Button */}
              <button
                onClick={handleCopyLink}
                className="w-full mb-6 p-4 bg-gradient-to-r from-[#1DB954] to-[#1ED760] text-white rounded-2xl font-medium flex items-center justify-center gap-2 hover:shadow-lg active:scale-95 transition-all"
              >
                {copied ? (
                  <>
                    <Check className="w-5 h-5" />
                    Gekopieerd!
                  </>
                ) : (
                  <>
                    <Copy className="w-5 h-5" />
                    Kopieer link
                  </>
                )}
              </button>

              {/* Share Options Grid */}
              <div className="grid grid-cols-4 gap-4">
                {shareOptions.map((option, index) => (
                  <motion.button
                    key={option.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    onClick={() => handleShare(option)}
                    className="flex flex-col items-center gap-2 p-3 rounded-2xl hover:bg-slate-50 active:scale-95 transition-all"
                  >
                    <div
                      className="w-14 h-14 rounded-full flex items-center justify-center text-2xl shadow-md"
                      style={{ backgroundColor: option.color + '15', border: `2px solid ${option.color}30` }}
                    >
                      {option.icon}
                    </div>
                    <span className="text-xs font-medium text-slate-700 text-center">
                      {option.name}
                    </span>
                  </motion.button>
                ))}
              </div>

              {/* Native Share (if available) */}
              {navigator.share && (
                <button
                  onClick={() => {
                    navigator.share({
                      title: title,
                      text: text,
                      url: url,
                    }).catch(() => {
                      // User cancelled
                    });
                  }}
                  className="w-full mt-6 p-4 bg-slate-100 text-slate-700 rounded-2xl font-medium hover:bg-slate-200 active:scale-95 transition-all"
                >
                  Meer opties...
                </button>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
