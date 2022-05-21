import { useEffect, useState } from "react"

export default function LiquidationPriceCalculator(props) {

    const collateralPrice = props.collateralPrice
    const loanItemPrice = props.loanItemPrice
    const liquidationThreshold = props.liquidationThreshold

    const [collateralAmount, setCollateralAmount] = useState('')
    const [loanAmount, setLoanAmount] = useState('')
    const [liquidationPrice, setLiquidationPrice] = useState(0)

    useEffect(() => {
        const calculateLiquidationPrice = () => {
            if(loanAmount && collateralAmount)
            {
                let liqPrice = loanAmount*loanItemPrice/(liquidationThreshold*collateralAmount)
                if(liqPrice > collateralPrice)
                {
                    setLiquidationPrice(collateralPrice)
                }
                else
                {
                    setLiquidationPrice(liqPrice)
                }
            }
            else
            {
                setLiquidationPrice(0)
            }
        }
        
        calculateLiquidationPrice()
    }, [collateralPrice, loanItemPrice, liquidationThreshold, collateralAmount, loanAmount])


    return (
        <div>
            <p>Enter Collateral Amount</p>
            <input type="number" name="Collateral Amount" placeholder="Collateral Amount" value={collateralAmount} onChange={e => setCollateralAmount(e.target.value)} />
            <p>Enter Loan Amount</p>
            <input type="number" name="Loan Amount" placeholder="Loan Amount" value={loanAmount} onChange={e => setLoanAmount(e.target.value)} />
            <h2>Liquidation Price: {liquidationPrice}</h2>
        </div>
    )
}