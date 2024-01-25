import Search from '@/components/search'
import Sidenav from '@/components/sidenav'

function Home() {
  return (
    <div className="flex flex-1">
      <Sidenav />
      <Search />
    </div>
  )
}

export default Home
