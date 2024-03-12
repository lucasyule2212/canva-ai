import Header from '@/components/shared/header/header';
import TransformationForm from '@/components/shared/transformation/transformation-form';
import { transformationTypes } from '@/lib/consts';


const AddTransformationTypePage = ({ params: { type } }: {
  params: {
    type: string
  }
}) => {
  const transformation = transformationTypes[type];
  return (
    <div>
      <Header title={transformation.title} subtitle={transformation.subTitle} />
      <TransformationForm/>
    </div>
  )
}

export default AddTransformationTypePage