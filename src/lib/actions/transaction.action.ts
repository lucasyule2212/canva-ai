'use server'
import { env } from '@/env'
import { redirect } from 'next/navigation'
import Stripe from 'stripe'
import Transaction from '../database/models/transaction.model'
import { connectToDatabase } from '../database/mongoose'
import { handleError } from '../utils'
import { updateCredits } from './user.actions'

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

export async function createTransaction(transaction: CreateTransactionParams) {
  try {
    await connectToDatabase()

    const newTransaction = await Transaction.create({
      ...transaction,
      buyerId: transaction.buyerId,
    })

    await updateCredits(transaction.buyerId, transaction.credits)

    return JSON.parse(JSON.stringify(newTransaction))
  } catch (error) {
    handleError(error)
  }
}
