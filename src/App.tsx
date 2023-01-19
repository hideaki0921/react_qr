import React, { FC, useEffect, useRef, useState } from "react"
import { BrowserQRCodeReader, IScannerControls } from "@zxing/browser"
import { Result } from "@zxing/library"
// import {
//   Box,
//   ChakraProvider,
//   Container,
//   Fade,
//   Flex,
//   Heading,
//   Table,
//   Tbody,
//   Td,
//   Tr
// } from "@chakra-ui/react"

const QrCodeReader: FC<{ onReadQRCode: (text: Result) => void }> = ({
  onReadQRCode
}) => {
  const controlsRef = useRef<IScannerControls | null>()
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    if (!videoRef.current) {
      return
    }
    const codeReader = new BrowserQRCodeReader()
    codeReader.decodeFromVideoDevice(
      undefined,
      videoRef.current,
      (result, error, controls) => {
        if (error) {
          return
        }
        if (result) {
          onReadQRCode(result)
        }
        controlsRef.current = controls
      }
    )
    return () => {
      if (!controlsRef.current) {
        return
      }

      controlsRef.current.stop()
      controlsRef.current = null
    }
  }, [onReadQRCode])

  return (
    <video
      style={{ maxWidth: "100%", maxHeight: "100%", height: "100%" }}
      ref={videoRef}
    />
  )
}

// const QrCodeResult: FC<{ qrCodes: string[] }> = ({ qrCodes }) => {
//   return (
//         {qrCodes.map((qr, i) => (
//           <div key={i}>
//               <div>{qr}</div>
//           </div>
//         ))}
//   )
// }

const QrApp = () => {
  const [qrCodes, setQrCodes] = useState<string[]>([])

  return (
    <>
            <QrCodeReader
              onReadQRCode={(result) => {
                setQrCodes((codes) => {
                  return [result.getText(), ...codes]
                })
              }}
            />
            {/* <QrCodeResult qrCodes={qrCodes} /> */}
            <div>{qrCodes}</div>
    </>
  )
}

export default function Home() {
  return (
      <QrApp />
  )
}
