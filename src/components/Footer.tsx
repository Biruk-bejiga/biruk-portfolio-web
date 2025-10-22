import { site } from '../data/site'

export default function Footer() {
  return (
    <footer className="py-6 text-center">
      <p className="text-sm">© {new Date().getFullYear()} {site.name}. All rights reserved.</p>
    </footer>
  )
}
