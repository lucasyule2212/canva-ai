import Header from '@/components/shared/header/header'
import TransformationForm from '@/components/shared/transformation/transformation-form'
import { getUserById } from '@/lib/actions/user.actions'
import { transformationTypes } from '@/lib/consts'
import { auth } from '@clerk/nextjs'
import { redirect } from 'next/navigation'

const AddTransformationTypePage = async ({
  params: { type },
}: {
  params: {
    type: string
  }
}) => {
  const { userId } = auth()

  const transformation = transformationTypes[type]

  if (!userId) redirect('/sign-in')

  const user = await getUserById(userId)
  return (
    <div>
      <Header title={transformation.title} subtitle={transformation.subTitle} />
      <section className="mt-10">
        <TransformationForm
          action="Add"
          userId={user}
          type={transformation.type as TransformationTypeKey}
          creditBalance={user.creditBalance}
        />
      </section>
    </div>
  )
}

export default AddTransformationTypePage
