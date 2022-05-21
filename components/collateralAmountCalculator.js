import { useEffect, useState } from "react"

export default function CollateralAmountCalculator(props) {

    const collateralPrice = props.collateralPrice
    const loanItemPrice = props.loanItemPrice
    const loanToValue = props.loanToValue
    const liquidationThreshold = props.liquidationThreshold

    const [loanAmount, setLoanAmount] = useState('')
    const [liquidationPrice, setLiquidationPrice] = useState('')
    const [collateralAmount, setCollateralAmount] = useState(0)

    useEffect(() => {

        const calculateCollateralAmount = () => {
            if(loanAmount && liquidationPrice)
            {
                let colAmount = loanAmount*loanItemPrice/(liquidationThreshold*liquidationPrice)
                colAmount = (colAmount*collateralPrice < (loanAmount*loanItemPrice/loanToValue)) ? loanAmount*loanItemPrice/(loanToValue*collateralPrice) : colAmount
                setCollateralAmount(colAmount)
            }
            else
            {
                setCollateralAmount(0)
            }
        }

        calculateCollateralAmount(loanAmount, liquidationPrice)
    }, [collateralPrice, loanItemPrice, loanToValue, liquidationThreshold, loanAmount, liquidationPrice])

    return (
        <div>
            <p>Enter Loan Amount</p>
            <input type="number" name="Loan Amount" placeholder="Loan Amount" value={loanAmount} onChange={e => setLoanAmount(e.target.value)} />
            <p>Enter Liquidation Price</p>
            <input type="number" name="Liquidation Price" placeholder="Liquidation Price" value={liquidationPrice} onChange={e => setLiquidationPrice(e.target.value)} />
            <h2>Collateral Needed: {collateralAmount}</h2>
        </div>
    )
}