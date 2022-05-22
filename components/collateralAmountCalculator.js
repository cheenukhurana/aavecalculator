import { useEffect, useState } from "react"

export default function CollateralAmountCalculator(props) {

    const collateralType = props.collateralType
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
        <div className="flex mt-12 justify-between">
            {/* <p>Enter Loan Amount</p>
            <input type="number" name="Loan Amount" placeholder="Loan Amount" value={loanAmount} onChange={e => setLoanAmount(e.target.value)} />
            <p>Enter Liquidation Price</p>
            <input type="number" name="Liquidation Price" placeholder="Liquidation Price" value={liquidationPrice} onChange={e => setLiquidationPrice(e.target.value)} /> */}


            <div className="w-[46%]">
                <div className="text-[#dbe1e8] text-center">Enter Loan Amount</div>
                <input className="mt-2 w-[100%] px-4 py-1.5 text-sm rounded-md" type="number" name="Loan Amount" placeholder="Loan Amount" value={loanAmount} onChange={e => setLoanAmount(e.target.value)} />

                <p className="text-[#dbe1e8] text-center mt-8">Enter Liquidation Price</p>
                <input className="mt-2 w-[100%] px-4 py-1.5 text-sm rounded-md" type="number" name="Liquidation Price" placeholder="Liquidation Price" value={liquidationPrice} onChange={e => setLiquidationPrice(e.target.value)}></input>
                
            </div>

            <div className="w-[46%] text-center">
                <div className="text-[#dbe1e8]">Collateral Needed:</div>
                <div className="mt-4 text-lg font-semibold border-white border rounded-lg w-[100%] h-[70%] mx-auto ">
                    <div className="mt-[10%]">{collateralAmount}</div>
                    <div>{collateralType}</div>
                </div>
            </div>
        </div>
    )
}