import { useEffect, useRef, useState, type ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { useLanguage } from '../lib/language';

type DownloadStatus = 'idle' | 'confirming' | 'downloading' | 'complete' | 'error' | 'cancelled';

type CvDownloadButtonProps = {
  children: ReactNode;
  className: string;
  ariaLabel?: string;
  onOpenChange?: (isOpen: boolean) => void;
  fileUrl?: string;
  fileName?: string;
  title?: string;
  iconLabel?: string;
};

const defaultFileUrl = '/cv/Sann_Siv_CV.pdf';
const defaultFileName = 'Sann_Siv_CV.pdf';

export function CvDownloadButton({
  children,
  className,
  ariaLabel = 'Download CV',
  onOpenChange,
  fileUrl = defaultFileUrl,
  fileName = defaultFileName,
  title,
  iconLabel = 'CV',
}: CvDownloadButtonProps) {
  const { t } = useLanguage();
  const [status, setStatus] = useState<DownloadStatus>('idle');
  const [progress, setProgress] = useState(0);
  const abortControllerRef = useRef<AbortController | null>(null);

  const reset = () => {
    setStatus('idle');
    setProgress(0);
  };

  const cancelDownload = () => {
    if (status === 'downloading') {
      abortControllerRef.current?.abort();
      return;
    }

    reset();
  };

  const saveBlob = (blob: Blob) => {
    const objectUrl = URL.createObjectURL(blob);
    const link = document.createElement('a');

    link.href = objectUrl;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    link.remove();

    URL.revokeObjectURL(objectUrl);
  };

  const downloadFile = async () => {
    if (status === 'downloading') {
      return;
    }

    const controller = new AbortController();
    abortControllerRef.current = controller;
    setStatus('downloading');
    setProgress(0);

    try {
      const response = await fetch(fileUrl, { signal: controller.signal });

      if (!response.ok) {
        throw new Error(`${fileName} could not be downloaded.`);
      }

      const totalBytes = Number(response.headers.get('content-length')) || 0;

      if (!response.body) {
        const blob = await response.blob();
        saveBlob(blob);
        setProgress(100);
        reset();
        return;
      }

      const reader = response.body.getReader();
      const chunks: Uint8Array[] = [];
      let receivedBytes = 0;

      while (true) {
        const { done, value } = await reader.read();

        if (done) {
          break;
        }

        chunks.push(value);
        receivedBytes += value.length;

        if (totalBytes > 0) {
          setProgress(Math.round((receivedBytes / totalBytes) * 100));
        }
      }

      saveBlob(new Blob(chunks, { type: 'application/pdf' }));
      setProgress(100);
      reset();
    } catch (error) {
      setStatus(error instanceof DOMException && error.name === 'AbortError' ? 'cancelled' : 'error');
    } finally {
      abortControllerRef.current = null;
    }
  };

  const showDownloadPage = status === 'confirming' || status === 'downloading' || status === 'complete' || status === 'error' || status === 'cancelled';
  const downloadDialog = showDownloadPage ? (
    <div className="fixed inset-0 z-[9999] flex min-h-dvh items-center justify-center bg-surface/75 px-6 py-10 backdrop-blur-md">
      <div
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="download-dialog-title"
        aria-describedby="download-dialog-description"
        className="w-full max-w-xl rounded-3xl glass-panel bg-surface/95 p-8 text-center shadow-[0_0_80px_rgba(76,215,246,0.24)]"
      >
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full border border-primary/40 bg-primary/10 text-primary">
          <span className="text-2xl font-bold">{iconLabel}</span>
        </div>

        <h2 id="download-dialog-title" className="text-4xl text-on-surface">{title ?? t('download.cvTitle')}</h2>
        <p id="download-dialog-description" className="mx-auto mt-4 max-w-md text-sm leading-6 text-on-surface-variant">
          {t('download.aboutTo')} <span className="font-bold text-on-surface">{fileName}</span>.
        </p>

        <div className="mt-8 rounded-2xl border border-white/10 bg-surface-variant/20 p-4 text-left">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm font-bold text-on-surface">{fileName}</p>
              <p className="mt-1 text-xs text-on-surface-variant">
                {status === 'confirming' && t('download.ready')}
                {status === 'downloading' && (progress > 0 ? `${t('download.downloading')} ${progress}%` : t('download.preparing'))}
                {status === 'complete' && t('download.complete')}
                {status === 'cancelled' && t('download.cancelled')}
                {status === 'error' && t('download.failed')}
              </p>
            </div>
            <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-bold text-primary">{t('common.pdf')}</span>
          </div>

          <div className="mt-4 h-2 overflow-hidden rounded-full bg-surface-bright/40">
            <div
              className="h-full rounded-full bg-primary transition-all duration-300"
              style={{ width: `${status === 'downloading' ? progress : status === 'complete' ? 100 : 0}%` }}
            />
          </div>
        </div>

        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          {status === 'confirming' && (
            <>
              <button
                type="button"
                onClick={downloadFile}
                className="rounded-full bg-primary px-8 py-3 font-bold text-on-primary transition-all hover:scale-105 active:scale-95"
              >
                {t('download.continue')}
              </button>
              <button
                type="button"
                onClick={cancelDownload}
                className="rounded-full border border-error/40 px-8 py-3 font-bold text-error transition-colors hover:bg-error/10"
              >
                {t('download.cancel')}
              </button>
            </>
          )}

          {status === 'downloading' && (
            <button
              type="button"
              onClick={cancelDownload}
              className="rounded-full border border-error/40 px-8 py-3 font-bold text-error transition-colors hover:bg-error/10"
            >
              {t('download.cancelDownload')}
            </button>
          )}

          {(status === 'complete' || status === 'cancelled' || status === 'error') && (
            <>
              {status === 'error' && (
                <button
                  type="button"
                  onClick={downloadFile}
                  className="rounded-full bg-primary px-8 py-3 font-bold text-on-primary transition-all hover:scale-105 active:scale-95"
                >
                  {t('download.tryAgain')}
                </button>
              )}
              {status === 'cancelled' && (
                <button
                  type="button"
                  onClick={() => setStatus('confirming')}
                  className="rounded-full bg-primary px-8 py-3 font-bold text-on-primary transition-all hover:scale-105 active:scale-95"
                >
                  {t('download.back')}
                </button>
              )}
              <button
                type="button"
                onClick={reset}
                className="rounded-full border border-primary/40 px-8 py-3 font-bold text-primary transition-colors hover:bg-primary/10"
              >
                {t('download.close')}
              </button>
            </>
          )}
        </div>

        {status === 'confirming' && (
          <button
            type="button"
            onClick={reset}
            className="mt-5 text-xs font-bold uppercase tracking-wider text-on-surface-variant transition-colors hover:text-primary"
          >
            {t('download.return')}
          </button>
        )}
      </div>
    </div>
  ) : null;

  useEffect(() => {
    document.body.classList.toggle('cv-download-open', showDownloadPage);
    onOpenChange?.(showDownloadPage);

    return () => {
      document.body.classList.remove('cv-download-open');
      onOpenChange?.(false);
    };
  }, [onOpenChange, showDownloadPage]);

  return (
    <>
      <button
        type="button"
        aria-label={ariaLabel}
        disabled={status === 'downloading'}
        onClick={() => setStatus('confirming')}
        className={className}
      >
        {children}
      </button>

      {downloadDialog && createPortal(downloadDialog, document.body)}
    </>
  );
}
