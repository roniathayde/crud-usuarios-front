import { Button } from './ui/button'
import { Input } from './ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select'

export function FilterUsers() {
  return (
    <form action="" className="flex gap-2">
      <label htmlFor="searchByName" className="sr-only">
        Buscar por nome
      </label>
      <Input
        className="bg-primary-foreground text-foreground font-semibold text-sm placeholder:text-muted-foreground"
        type="text"
        id="searchByName"
        placeholder="Buscar por nome..."
      />

      <label htmlFor="searchById" className="sr-only">
        Buscar por ID
      </label>
      <Input
        className="bg-primary-foreground text-foreground font-semibold text-sm placeholder:text-muted-foreground"
        type="text"
        id="searchById"
        placeholder="Buscar por ID..."
      />
      <Select>
        <SelectTrigger className="">
          <SelectValue placeholder="Cargo" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="desenvolvedor">Desenvolvedor</SelectItem>
          <SelectItem value="arquiteto">Arquiteto</SelectItem>
          <SelectItem value="egenheiro">Egenheiro</SelectItem>
        </SelectContent>
      </Select>
      <Button variant={'outline'}>Filtrar</Button>
    </form>
  )
}
