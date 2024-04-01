import { Elements } from "@stripe/react-stripe-js"
import { loadStripe } from "@stripe/stripe-js"
import React from "react"
import AddPayment from "./AddPayment"
const PUBLIC_KEY = "pk_test_51IooZnHWEZ1cnJFqrPWVB7kdn1kGaB9Egl26KbOYs2oElPp9TM0bj7IMGoS0VqcAAoZtS42qtl4XA6PJwJtSbo1C00wp6OAof9"

const stripeTestPromise = loadStripe(PUBLIC_KEY)
function StripContainer() {
  return (
    <Elements stripe={stripeTestPromise}>
      <AddPayment />
    </Elements>
  )
}

export default StripContainer