import { useToast } from '@/components/ui/use-toast'
import { CldUploadWidget } from 'next-cloudinary'

interface MediaUploaderProps {
  onValueChange: (value: string) => void;
  setImage: (image: any) => void;
  image: any;
  publicId: string;
  type: string;
}

const MediaUploader = ({image,setImage,publicId,type,onValueChange}:MediaUploaderProps) => {
  const { toast } = useToast()

  const onUploadSuccessHandler = (result: any) => {

  }
  const onUploadErrorHandler = (error: any) => {

  }

  return (
    <CldUploadWidget
      uploadPreset='dev_canva_ai'
      options={{
        multiple: false,
        resourceType:'image'
      }}
      onSuccess={onUploadSuccessHandler}
      onError={onUploadErrorHandler}
    />
  )
}

export default MediaUploader