"use client"
import {
  Form
} from "@/components/ui/form"
import { defaultValues } from "@/lib/consts"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

const formSchema = z.object({
  title: z.string(),
  aspectRatio: z.string().optional(),
  color: z.string().optional(),
  prompt: z.string().optional(),
  publicId: z.string()
})


const TransformationForm = ({action, data=null}:TransformationFormProps) => {
  const initialValues = data && action === 'Update' ? {
    title: data?.title,
    aspectRatio: data?.aspectRatio,
    color: data?.color,
    prompt: data?.prompt,
    publicId: data?.publicId
  } : defaultValues;
  
    const form = useForm<z.infer<typeof formSchema>>({
      resolver: zodResolver(formSchema),
      defaultValues: initialValues
    })
   
    function onSubmit(values: z.infer<typeof formSchema>) {
      console.log(values)
    }
  
    return (
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          
        </form>
      </Form>
    )
}

export default TransformationForm