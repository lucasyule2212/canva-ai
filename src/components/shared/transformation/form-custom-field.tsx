import React from 'react'
import { Control } from 'react-hook-form'
import { z } from 'zod'

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'

import { formSchema } from './transformation-form'

type CustomFieldProps = {
  control: Control<z.infer<typeof formSchema>> | undefined
  render: (props: { field: any }) => React.ReactNode
  name: keyof z.infer<typeof formSchema>
  formLabel?: string
  className?: string
}

export const FormCustomField = ({
  control,
  render,
  name,
  formLabel,
  className,
}: CustomFieldProps) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={className}>
          {formLabel && <FormLabel>{formLabel}</FormLabel>}
          <FormControl>{render({ field })}</FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
