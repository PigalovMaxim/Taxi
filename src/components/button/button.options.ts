import { ComponentProps } from "react"

export type ButtonProps = Pick<ComponentProps<'button'>, 'onClick'> & {
  className?: string
  title: string
}
