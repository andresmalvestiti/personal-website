import Header from './components/Header'
import './globals.css'
import { Inter, Fira_Code } from 'next/font/google'

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const firaCode = Inter({ subsets: ["latin"], variable: "--font-fira-code" });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.className} dark`}>
      <body className='bg-dark-custom text-foreground scroll-smooth'>
        <Header/>
        {children}
      </body>
    </html>
  )
}