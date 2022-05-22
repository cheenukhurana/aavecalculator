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
            if (loanAmount && collateralAmount) {
                let liqPrice = loanAmount * loanItemPrice / (liquidationThreshold * collateralAmount)
                if (liqPrice > collateralPrice) {
                    setLiquidationPrice(collateralPrice)
                }
                else {
                    setLiquidationPrice(liqPrice)
                }
            }
            else {
                setLiquidationPrice(0)
            }
        }

        calculateLiquidationPrice()
    }, [collateralPrice, loanItemPrice, liquidationThreshold, collateralAmount, loanAmount])


    return (
        <div className="flex mt-12 justify-between">

            <div className="w-[46%]">
                <div className="text-[#dbe1e8] text-center">Enter Collateral Amount</div>
                <input className="mt-2 w-[100%] px-4 py-1.5 text-sm rounded-md" type="number" name="Collateral Amount" placeholder="Collateral Amount" value={collateralAmount} onChange={e => setCollateralAmount(e.target.value)} />

                <p className="text-[#dbe1e8] text-center mt-8">Enter Loan Amount</p>
                <input className="mt-2 w-[100%] px-4 py-1.5 text-sm rounded-md" type="number" name="Loan Amount" placeholder="Loan Amount" value={loanAmount} onChange={e => setLoanAmount(e.target.value)}></input>
                
            </div>

            {/* <div className="w-[46%] text-[#dbe1e8] text-center">
                <div>Liquidation Price</div>
                <div className="mt-2 border border-white rounded-full h-28 w-28 mx-auto">
                    <div>{liquidationPrice}</div>
                    <div>USD</div>
                </div>
            </div> */}

            <div className="w-[46%] text-center">
                <div className="text-[#dbe1e8]">Liquidation Price:</div>
                <div className="mt-4 text-lg font-semibold border-white border rounded-lg w-[100%] h-[70%] mx-auto ">
                    <div className="mt-[10%]">{liquidationPrice}</div>
                    <div>USD</div>
                </div>
            </div>

        </div>
    )
}