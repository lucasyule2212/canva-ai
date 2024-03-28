import { SignedIn, auth } from '@clerk/nextjs'
import Image from 'next/image'
import { redirect } from 'next/navigation'

import Checkout from '@/components/shared/checkout/checkout'
import Header from '@/components/shared/header/header'
import { Button } from '@/components/ui/button'
import { getUserById } from '@/lib/actions/user.actions'
import { plans } from '@/lib/consts/plans'

const Credits = async () => {
  const { userId } = auth()

  if (!userId) redirect('/sign-in')

  const user = await getUserById(userId)

  return (
    <div className="h-[85vh]">
      <Header
        title="Buy Credits"
        subtitle="Choose a credit package that suits your needs!"
      />
      <section>
        <ul className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 md:gap-9 xl:grid-cols-3">
          {plans.map((plan) => (
            <li
              key={plan.name}
              className="w-full rounded-[16px] border-2 border-purple-200/20 bg-white p-8 shadow-xl shadow-purple-200/20 lg:max-w-none"
            >
              <div className="flex-center flex-col gap-3">
                <Image src={plan.icon} alt="check" width={50} height={50} />
                <p className="p-20-semibold mt-2 text-purple-500">
                  {plan.name}
                </p>
                <p className="h1-semibold text-dark-600">${plan.price}</p>
                <p className="p-16-regular">{plan.credits} Credits</p>
              </div>

              {/* Inclusions */}
              <ul className="flex flex-col gap-5 py-9">
                {plan.inclusions.map((inclusion) => (
                  <li
                    key={plan.name + inclusion.label}
                    className="flex items-center gap-4"
                  >
                    <Image
                      src={`/assets/icons/${
                        inclusion.isIncluded ? 'check.svg' : 'cross.svg'
                      }`}
                      alt="check"
                      width={24}
                      height={24}
                    />
                    <p className="p-16-regular">{inclusion.label}</p>
                  </li>
                ))}
              </ul>

              {plan.name === 'Free' ? (
                <Button
                  variant="outline"
                  className="w-full rounded-full bg-purple-100 bg-cover text-purple-500 hover:text-purple-500"
                >
                  Free Consumable
                </Button>
              ) : (
                <SignedIn>
                  <Checkout
                    plan={plan.name}
                    amount={plan.price}
                    credits={plan.credits}
                    buyerId={user._id}
                  />
                </SignedIn>
              )}
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}

export default Credits
