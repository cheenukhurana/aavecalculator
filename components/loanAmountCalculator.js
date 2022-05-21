import { useEffect, useState } from "react"

export default function LoanAmountCalculator(props) {

    const collateralPrice = props.collateralPrice
    const loanItemPrice = props.loanItemPrice
    const loanToValue = props.loanToValue
    const liquidationThreshold = props.liquidationThreshold

    const [collateralAmount, setCollateralAmount] = useState('')
    const [liquidationPrice, setLiquidationPrice] = useState('')
    const [loanAmount, setLoanAmount] = useState(0)

    useEffect(() => {
        const calculateLoanAmount = () => {
            if(collateralAmount && liquidationPrice)
            {
                let lAmount = (liquidationThreshold*collateralAmount*liquidationPrice)/loanItemPrice
                lAmount = (lAmount > loanToValue*collateralAmount*collateralPrice) ? loanToValue*collateralAmount*collateralPrice : lAmount
                setLoanAmount(lAmount)
            }
            else
            {
                setLoanAmount(0)
            }
        }

        calculateLoanAmount()
    }, [collateralPrice, loanItemPrice, loanToValue, liquidationThreshold, collateralAmount, liquidationPrice])


    return (
        <div>
            <p>Enter Collateral Amount</p>
            <input type="number" name="Collateral Amount" placeholder="Collateral Amount" value={collateralAmount} onChange={e => setCollateralAmount(e.target.value)} />
            <p>Enter Liquidation Price</p>
            <input type="number" name="Liquidation Price" placeholder="Liquidation Price" value={liquidationPrice} onChange={e => setLiquidationPrice(e.target.value)} />
            <h2>Max amount you can borrow: {loanAmount}</h2>
        </div>
    )
}