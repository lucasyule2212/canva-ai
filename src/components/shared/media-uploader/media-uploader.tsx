'use client'
import { useToast } from '@/components/ui/use-toast'
import { dataUrl, getImageSize } from '@/lib/utils'
import { CldImage, CldUploadWidget } from 'next-cloudinary'
import { PlaceholderValue } from 'next/dist/shared/lib/get-img-props'
import Image from 'next/image'

interface MediaUploaderProps {
  onValueChange: (value: string) => void
  setImage: React.Dispatch<any>
  image: any
  publicId: string
  type: string
}

const MediaUploader = ({
  image,
  setImage,
  publicId,
  type,
  onValueChange,
}: MediaUploaderProps) => {
  const { toast } = useToast()

  const onUploadSuccessHandler = (result: any) => {
    setImage((prevState: any) => ({
      ...prevState,
      publicId: result?.info?.public_id,
      width: result?.info?.width,
      height: result?.info?.height,
      secureURL: result?.info?.secure_url,
    }))
    onValueChange(result?.info?.public_id)
    toast({
      title: 'Image uploaded successfully!',
      description: 'You have used 1 credit',
      duration: 5000,
      variant: 'success',
    })
  }
  const onUploadErrorHandler = () => {
    toast({
      title: 'Error',
      description: 'There was an error uploading the image',
      duration: 5000,
      variant: 'destructive',
    })
  }

  return (
    <CldUploadWidget
      uploadPreset="dev_canva_ai"
      options={{
        multiple: false,
        resourceType: 'image',
      }}
      onSuccess={onUploadSuccessHandler}
      onError={onUploadErrorHandler}
    >
      {({ open }) => (
        <div className="flex-full flex flex-col gap-4">
          <h3 className="h3-bold text-dark-600">Original</h3>
          {publicId ? (
            <div className="cursor-pointer overflow-hidden rounded-[10px]">
              <CldImage
                className="h-fit min-h-72 w-full rounded-[10px] border border-dashed bg-purple-100/20 object-cover p-2"
                width={getImageSize(type, image, 'width')}
                height={getImageSize(type, image, 'width')}
                src={publicId}
                alt="image"
                sizes={'(max-width: 767px) 100vw, 50vw'}
                placeholder={dataUrl as PlaceholderValue}
              />
            </div>
          ) : (
            <div
              className="flex-center flex h-72 cursor-pointer flex-col gap-5 rounded-[16px] border border-dashed bg-purple-100/20 shadow-inner"
              onClick={() => open()}
            >
              <div className="rounded-[16px] bg-white  p-5 shadow-sm shadow-purple-200/50">
                <Image
                  src="/assets/icons/add.svg"
                  alt="Add Image"
                  width={24}
                  height={24}
                />
              </div>
              <p className="p-14-medium">Click here to upload image</p>
            </div>
          )}
        </div>
      )}
    </CldUploadWidget>
  )
}

export default MediaUploader
