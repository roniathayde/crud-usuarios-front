import { DialogClose } from '@radix-ui/react-dialog'

import { Button } from './ui/button'
import { DialogHeader } from './ui/dialog'
import { Input } from './ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select'
import { Textarea } from './ui/textarea'

export function UserDialogDetails() {
  return (
    <>
      <DialogHeader>#1</DialogHeader>
      <form action="#" className="flex flex-col gap-10">
        <div className=" flex flex-col gap-6">
          <label htmlFor="username" className="sr-only">
            Nome de usuário
          </label>
          <Input
            className="bg-primary-foreground text-foreground font-semibold text-sm placeholder:text-muted-foreground"
            type="text"
            id="username"
            placeholder="Nome de usuário"
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

          <Textarea
            className="resize-none"
            placeholder="Descreva suas melhores habilidades"
          />
        </div>
        <div className="flex gap-4 justify-end">
          <DialogClose>
            <Button variant={'destructive'}>Cancelar</Button>
          </DialogClose>
          <Button variant={'default'}>Adicionar</Button>
        </div>
      </form>
    </>
  )
}
