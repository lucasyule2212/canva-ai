import Header from '@/components/shared/header/header';
import { transformationTypes } from '@/lib/consts';


const AddTransformationTypePage = ({ params: { type } }: {
  params: {
    type: string
  }
}) => {
  const transformation = transformationTypes[type];
  return (
    <div><Header title={transformation.title} subtitle={transformation.subTitle}  /></div>
  )
}

export default AddTransformationTypePage