import { LucideIcon, LayoutDashboard, User } from 'lucide-react'

interface MenuItem {
  icon: LucideIcon
  label: string
  route?: string
}

const menuItems: MenuItem[] = [
  { icon: LayoutDashboard, label: 'Home', route: '/home' },
  { icon: User, label: 'Perfil', route: '/profile' },
]

export { menuItems }
