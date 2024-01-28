import { LucideIcon, LayoutDashboard, User } from 'lucide-react'

interface MenuItem {
  icon: LucideIcon
  label: string
  route: string
}

const menuItems: MenuItem[] = [
  { icon: LayoutDashboard, label: 'Home', route: '/home' },
  { icon: User, label: 'Perfil', route: '/profile' },
]

const profileNavigation = [
  { label: 'Visão Geral', route: '/profile' },
  { label: 'Teams', route: '/teams' },
  { label: 'Powers', route: '/powers' },
  { label: 'Species', route: '/species' },
  { label: 'Authors', route: '/authors' },
]

export { menuItems, profileNavigation }
