import { useEffect, useRef, useState } from 'react'
import type { ReactNode } from 'react'
import { ActionButton } from '../../components/ui/ActionButton'
import { CopyButton } from '../../components/ui/CopyButton'
import { ToolPanel } from '../../components/ui/ToolPanel'

type DetectorResult = {
  rawValue?: string
}

type BarcodeDetectorConstructor = new (options?: {
  formats?: string[]
}) => {
  detect: (source: ImageBitmapSource) => Promise<DetectorResult[]>
}

function getBarcodeDetectorConstructor(): BarcodeDetectorConstructor | null {
  const detector = (
    globalThis as typeof globalThis & {
      BarcodeDetector?: BarcodeDetectorConstructor
    }
  ).BarcodeDetector
  return detector ?? null
}

export function QrScannerPage(): ReactNode {
  const [isRunning, setIsRunning] = useState(false)
  const [result, setResult] = useState('')
  const [error, setError] = useState('')
  const [lastDetectedAt, setLastDetectedAt] = useState('')
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const supported = Boolean(getBarcodeDetectorConstructor())

  useEffect(() => {
    if (!isRunning) {
      return
    }

    let stream: MediaStream | null = null
    let timer: number | null = null
    const videoElement = videoRef.current
    const detectorCtor = getBarcodeDetectorConstructor()

    if (!detectorCtor || !videoElement) {
      return
    }

    const detector = new detectorCtor({ formats: ['qr_code'] })

    const run = async () => {
      try {
        stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: 'environment' },
          audio: false,
        })

        videoElement.srcObject = stream
        await videoElement.play()

        timer = window.setInterval(async () => {
          if (videoElement.readyState < 2) {
            return
          }

          const list = await detector.detect(videoElement)
          const hit = list.find((entry) => entry.rawValue)

          if (hit?.rawValue) {
            setResult(hit.rawValue)
            setLastDetectedAt(new Date().toLocaleString())
            setIsRunning(false)
          }
        }, 380)
      } catch (cause) {
        const message =
          cause instanceof Error ? cause.message : 'Unable to access camera.'
        setError(message)
        setIsRunning(false)
      }
    }

    void run()

    return () => {
      if (timer) {
        window.clearInterval(timer)
      }

      stream?.getTracks().forEach((track) => track.stop())
      videoElement.srcObject = null
    }
  }, [isRunning])

  return (
    <ToolPanel
      title="QR Scanner"
      subtitle="Mobile-style scanner frame with live camera detection for QR payloads."
    >
      <div className="grid gap-6 xl:grid-cols-[340px_1fr]">
        <div className="mx-auto w-[300px] rounded-[2.4rem] border-4 border-stone-700 bg-stone-950 p-3 shadow-2xl shadow-black/40">
          <div className="relative overflow-hidden rounded-[1.8rem] border border-stone-700 bg-black">
            <video
              ref={videoRef}
              className="h-[520px] w-full object-cover"
              muted
              playsInline
            />

            <div className="pointer-events-none absolute inset-0">
              <div className="absolute left-1/2 top-1/2 h-52 w-52 -translate-x-1/2 -translate-y-1/2 rounded-xl border-2 border-brandCta/80">
                <div className="scanner-line" />
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex flex-wrap gap-2">
            <ActionButton
              label={isRunning ? 'Scanning...' : 'Start Scan'}
              onClick={() => {
                if (!supported) {
                  setError('BarcodeDetector is unavailable in this browser.')
                  return
                }
                setError('')
                setResult('')
                setIsRunning(true)
              }}
            />
            <ActionButton
              label="Stop"
              tone="neutral"
              onClick={() => setIsRunning(false)}
            />
          </div>

          <div className="rounded-xl border border-stone-700 bg-stone-950/80 p-4 text-sm text-stone-300">
            <p>
              Scanner support:{' '}
              <span className="font-semibold text-stone-100">
                {supported ? 'Available' : 'Not available'}
              </span>
            </p>
            <p className="mt-1 text-xs text-stone-400">
              Best experience on Chromium browsers with camera permission enabled.
            </p>
          </div>

          {result ? (
            <div className="space-y-3 rounded-xl border border-brandCta/40 bg-brandCta/10 p-4">
              <p className="text-sm font-semibold text-brandText">
                QR detected at {lastDetectedAt}
              </p>
              <code className="block break-all text-xs text-brandText">
                {result}
              </code>
              <CopyButton value={result} />
            </div>
          ) : null}

          {error ? (
            <div className="rounded-xl border border-rose-500/40 bg-rose-500/10 p-3 text-sm text-rose-200">
              {error}
            </div>
          ) : null}
        </div>
      </div>
    </ToolPanel>
  )
}
