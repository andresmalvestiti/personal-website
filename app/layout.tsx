import Header from './components/Header'
import './globals.css'
import { Inter, Fira_Code } from 'next/font/google'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const firaCode = Fira_Code({ subsets: ['latin'], variable: '--font-fira-code' });

export const metadata = {
  title: "Andres Malvestiti",
  description: "Andres' portfolio",
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
};


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const isCommingSoon = process.env.ENABLE_COMING_SOON === "true";
  return (
    <html lang="en" className={`${inter.className} dark`}>
      <body className='bg-dark-custom text-foreground scroll-smooth min-h-dvh grid grid-rows-[auto,1fr] items-start'>
        {!isCommingSoon && <Header/>}
        <main className="min-h-0 flex flex-col">{children}</main>
      </body>
    </html>
  )
}