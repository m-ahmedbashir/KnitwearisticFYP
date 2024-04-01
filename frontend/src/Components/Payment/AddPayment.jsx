import React, { useState } from 'react'
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js"
import axios from "axios"
import MainNavBar from '../ShareUI/MainNavBar';
import Header from '../ShareUI/Header';
import { useSelector } from "react-redux";
const CARD_OPTIONS = {
    iconStyle: "solid",
    style: {
        base: {
            iconColor: "#c4f0ff",
            color: "#fff",
            fontWeight: 500,
            fontFamily: "Roboto, Open Sans, Segoe UI, sans-serif",
            fontSize: "16px",
            fontSmoothing: "antialiased",
            ":-webkit-autofill": { color: "#fce883" },
            "::placeholder": { color: "#87bbfd" }
        },
        invalid: {
            iconColor: "#ffc7ee",
            color: "#ffc7ee"
        }
    }
}

function AddPayment() {

    const stripe = useStripe();

    const elements = useElements();
    const { user } = useSelector((state) => state.auth);
    const [success, setSuccess] = useState(false);

    const [choosePlan, setChoosePlan] = useState('');
    const [trialExpried, setTrialExpried] = useState('');
    const [amount, setAmount] = useState(0);
    const [error, setError] = useState(null)

    const handleSubmit = async (e) => {
        e.preventDefault()
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: "card",
            card: elements.getElement(CardElement)
        })


        if (!error) {
            try {
                const { id } = paymentMethod
                const response = await axios.post("/addPayment", {
                    amount,
                    id,
                    choosePlan,
                    trialExpried,


                },
                    {
                        headers: {
                            "authorization": user.token
                        }
                    }

                )

                if (response.data.message) {

                    setSuccess(true)
                }

            } catch (error) {
                console.log("Error", error)
            }
        } else {
            console.log(error.message)
        }
    }
    var day = new Date();
    var nextDay = new Date(day);

    React.useEffect(() => {
        if (choosePlan === 'Basic') {
            setAmount(49 * 100)
            nextDay.setDate(day.getDate() + 30);
            setTrialExpried(nextDay)
        }
        if (choosePlan === 'Premium') {
            setAmount(359 * 100)
            nextDay.setDate(day.getDate() + 90);
            setTrialExpried(nextDay)
        }
        if (choosePlan === 'Enterprise') {
            setAmount(899 * 100)
            nextDay.setDate(day.getDate() + 365);
            setTrialExpried(nextDay)
        }

    }, [choosePlan])
    return (
        <>
            <MainNavBar />
            <main id="content" role="main" class="main">
                <Header title={'Upgrade '} />
                <div className='container card border-0 shadow' style={{ marginTop: "-20rem" }}>

                    <div className="row">


                        {!success ?
                            <>
                                <div className="col-lg-6">

                                    <img src="https://firebasestorage.googleapis.com/v0/b/knitwearistic.appspot.com/o/sideImages.jpg?alt=media&token=b34b08b9-59d5-479e-bf8c-7b84c7210f86" alt="" className="img-fluid" />
                                </div>
                                <div className="col-lg-6">
                                    <form onSubmit={handleSubmit}>


                                        <div className="form-group py-2">
                                            <label htmlFor="card-element">
                                                Choose Plan
                                            </label>
                                            <select className="form-control" id="card-element" value={choosePlan} onChange={(e) => setChoosePlan(e.target.value)}>
                                                <option value="">Choose Plan</option>
                                                <option value="Basic">Basic</option>
                                                <option value="Premium">Premium</option>
                                                <option value="Enterprise">Enterprise</option>
                                            </select>
                                        </div>
                                        <div className="form-group py-2">

                                            <input type="hidden" className="form-control" value={trialExpried} id="card-element" placeholder="Trial Expired" onChange={(e) => setTrialExpried(e.target.value)} />
                                        </div>



                                        <fieldset className="FormGroup my-5">
                                            <div className="FormRow ">
                                                <CardElement options={CARD_OPTIONS} />
                                            </div>
                                        </fieldset>
                                        <div className="col-sm-12">
                                            <button className="btn btn-primary" type="submit">Pay</button>
                                        </div>
                                    </form>
                                </div>
                            </>
                            :
                            <div className="text-center">
                                <h2 class="py-5 text-center">Thank You for Your Purchase</h2>
                                <img src="https://firebasestorage.googleapis.com/v0/b/knitwearistic.appspot.com/o/ac2dcc_3ca088e361434dd18e6218c661252462_mv2.gif?alt=media&token=b94ec632-4a3c-409f-bce6-b71388dc0827" alt="" className="img-fluid" />
                            </div>
                        }
                    </div>

                </div>
            </main>


        </>
    )
}

export default AddPayment