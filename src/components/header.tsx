import { ModeToggle } from './mode-toggle'

export function Header() {
  return (
    <header className="bg-primary-foreground w-full py-4">
      <div className=" flex justify-between w-full max-w-[800px] mx-auto">
        <h1 className="text-xl font-bold tracking-tight text-foreground">
          Users CRUD
        </h1>

        <ModeToggle />
      </div>
    </header>
  )
}
