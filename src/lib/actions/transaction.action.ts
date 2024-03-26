'use server'
import { env } from '@/env'
import { redirect } from 'next/navigation'
import Stripe from 'stripe'

export async function checkoutCredits(transaction: CheckoutTransactionParams) {
  const stripe = new Stripe(env.STRIPE_SECRET_KEY)

  const amount = Number(transaction.amount) * 100

  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        price_data: {
          currency: 'usd',
          unit_amount: amount,
          product_data: {
            name: transaction.plan,
          },
        },
        quantity: 1,
      },
    ],
    metadata: {
      plan: transaction.plan,
      credits: transaction.credits,
      buyerId: transaction.buyerId,
    },
    mode: 'payment',
    success_url: `${env.NEXT_PUBLIC_SERVER_URL}/profile`,
    cancel_url: `${env.NEXT_PUBLIC_SERVER_URL}/`,
  })

  redirect(session.url!)
}
