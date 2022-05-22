import { useEffect, useState } from "react"

export default function LoanAmountCalculator(props) {

    const loanType = props.loanType
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
        <div className="flex mt-12 justify-between">
            {/* <p>Enter Collateral Amount</p>
            <input type="number" name="Collateral Amount" placeholder="Collateral Amount" value={collateralAmount} onChange={e => setCollateralAmount(e.target.value)} />
            <p>Enter Liquidation Price</p>
            <input type="number" name="Liquidation Price" placeholder="Liquidation Price" value={liquidationPrice} onChange={e => setLiquidationPrice(e.target.value)} /> */}
            
            <div className="w-[46%]">
                <div className="text-[#dbe1e8] text-center">Enter Collateral Amount</div>
                <input className="mt-2 w-[100%] px-4 py-1.5 text-sm rounded-md" type="number" name="Collateral Amount" placeholder="Collateral Amount" value={collateralAmount} onChange={e => setCollateralAmount(e.target.value)} />

                <p className="text-[#dbe1e8] text-center mt-8">Enter Liquidation Price</p>
                <input className="mt-2 w-[100%] px-4 py-1.5 text-sm rounded-md" type="number" name="Liquidation Price" placeholder="Liquidation Price" value={liquidationPrice} onChange={e => setLiquidationPrice(e.target.value)}></input>
                
            </div>

            <div className="w-[46%] text-center">
                <div className="text-[#dbe1e8]">Max amount you can borrow:</div>
                <div className="mt-4 text-lg font-semibold border-white border rounded-lg w-[100%] h-[70%] mx-auto ">
                    <div className="mt-[10%]">{loanAmount}</div>
                    <div>{loanType}</div>
                </div>
            </div>
            
            {/* <h2>Max amount you can borrow: {loanAmount}</h2> */}
        </div>
    )
}