import { dataUrl, debounce, getImageSize } from '@/lib/utils'
import { CldImage } from 'next-cloudinary'
import { PlaceholderValue } from 'next/dist/shared/lib/get-img-props'
import Image from 'next/image'

const TransformedImage = ({
  image,
  type,
  // title,
  transformationConfig,
  isTransforming,
  setIsTransforming,
  hasDownload = false,
}: TransformedImageProps) => {
  const downloadHandler = () => {}
  return (
    <div className="flex flex-col gap-4">
      <div className="flex-between">
        <h3 className="h3-bold text-dark-600">Transformed</h3>
        {hasDownload && (
          <button
            className="p-14-medium mt-2 flex items-center gap-2 px-2"
            onClick={downloadHandler}
          >
            <Image
              src="/assets/icons/download.svg"
              alt="Download"
              width={24}
              height={24}
              className="pb-[6px]"
            />
          </button>
        )}
      </div>
      {image?.publicId && transformationConfig ? (
        <div className="relative">
          <CldImage
            className="h-fit min-h-72 w-full rounded-[10px] border border-dashed bg-purple-100/20 object-cover p-2"
            width={getImageSize(type, image, 'width')}
            height={getImageSize(type, image, 'width')}
            src={image?.publicId}
            alt={image.title}
            sizes={'(max-width: 767px) 100vw, 50vw'}
            placeholder={dataUrl as PlaceholderValue}
            onLoad={() => {
              setIsTransforming && setIsTransforming(false)
            }}
            onError={() => {
              debounce(() => {
                setIsTransforming && setIsTransforming(false)
              }, 8000)
            }}
            {...transformationConfig}
          />
          {isTransforming && (
            <div className="flex-center absolute left-[50%] top-[50%] size-full -translate-x-1/2 -translate-y-1/2 flex-col gap-2 rounded-[10px] border bg-dark-700/90">
              <Image
                src="/assets/icons/spinner.svg"
                width={50}
                height={50}
                alt="transforming"
              />
            </div>
          )}
        </div>
      ) : (
        <div className="flex-center p-14-medium h-full min-h-72 flex-col gap-5 rounded-[16px] border border-dashed bg-purple-100/20 shadow-inner">
          Transformed Image
        </div>
      )}
    </div>
  )
}

export default TransformedImage
