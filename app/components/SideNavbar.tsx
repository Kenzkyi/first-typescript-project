'use client'
import '@/app/styles/sideNavbar.scss'
import Image from 'next/image'
import logo from '@/app/asset/public/logo.svg'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import navBar from '@/app/asset/navBar'

const SideNavbar = () => {
    const pathname = usePathname()

  return (
    <div className='sideNavbar'>
      <div className='sideNavbar-logo'>
        <Image src={logo} width={121.45} height={21.7} alt='finance logo'/>
      </div>
      <div className='sideNavbar-holder'>
        {
            navBar.map((item,index)=>(
                <Link key={index} style={{textDecoration:'none'}} href={item?.path}>
                    {
                        pathname === item?.path ?
                            <main>
                                <Image src={item?.iconActive} height={18} width={18} alt='overview'/>
                                <h6>{item?.name}</h6>
                            </main>
                        :
                            <section>
                                <Image src={item?.icon} height={18} width={18} alt='overview'/>
                                <h6>{item?.name}</h6>
                            </section>
                    }
                </Link>
            ))
        }
        
      </div>
    </div>
  )
}

export default SideNavbar
