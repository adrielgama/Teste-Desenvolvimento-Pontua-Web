import { LucideIcon, LayoutDashboard, User } from 'lucide-react'

import { teamsList, powersList, speciesList, authorsList } from './fakers'

interface MenuItem {
  icon: LucideIcon
  label: string
  route: string
}

interface CategoryToListItem {
  page: number
  list: string[]
}

const menuItems: MenuItem[] = [
  { icon: LayoutDashboard, label: 'Home', route: '/home' },
  { icon: User, label: 'Perfil', route: '/profile' },
]

const profileNavigation = [
  { label: 'Visão Geral', route: '/profile', page: 1 },
  { label: 'Teams', route: '/teams', page: 2 },
  { label: 'Powers', route: '/powers', page: 3 },
  { label: 'Species', route: '/species', page: 4 },
  { label: 'Authors', route: '/authors', page: 5 },
]

const categoryToListMap: CategoryToListItem[] = [
  { page: 2, list: teamsList },
  { page: 3, list: powersList },
  { page: 4, list: speciesList },
  { page: 5, list: authorsList },
]

export { menuItems, profileNavigation, categoryToListMap }
