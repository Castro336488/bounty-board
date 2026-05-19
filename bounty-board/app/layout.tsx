import { Providers } from './providers'
import './globals.css'

export const metadata = {
  title: 'BountyBoard',
  description: 'On-chain bounty board on Arc Testnet',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}