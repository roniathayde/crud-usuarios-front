import { Outlet } from 'react-router-dom'

import icon from '@/assets/icon.png'

import { ModeToggle } from './mode-toggle'

export function Header() {
  return (
    <>
      <header className="bg-primary-foreground w-full py-4">
        <div className=" flex justify-between w-full max-w-[800px] mx-auto">
          <h1 className="text-xl font-bold tracking-tight text-foreground">
            <img src={icon} alt="Logotipo" width={40} height={40} />
          </h1>
          <ModeToggle />
        </div>
      </header>
      <Outlet />
    </>
  )
}
