import './globals.css'
import styles from "./layout.module.css";
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Unethical Jokes',
  description: 'Site about jokes',
  keywords: 'jokes, social, memes'
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} ${styles.content}`}>{children}</body>
    </html>
  )
}
