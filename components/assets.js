
import { useEffect } from "react"
import { markets } from "../markets"

export default function Assets({ networkType, setCollateralType, setLoanType, calculatorType, setCalculatorType }) {

    useEffect(() => {
        setCollateralType(Object.keys(markets[networkType])[0])
        setLoanType(Object.keys(markets[networkType])[0])
    }, [networkType])

    return (
        <div>
            <div className="flex justify-between">


                <div className="bg-white py-1.5 text-sm rounded-lg min-w-[46%] max-w-max text-center">
                    Select Collateral Type:
                    <select name='Collateral' id='collateral-types' onChange={(e) => { setCollateralType(e.target.value) }}>
                        {
                            Object.keys(markets[networkType]).map((asset) => (
                                <>
                                    {markets[networkType][asset]["collateral"] === "YES" && <option value={asset} key={asset}>{asset}</option>}
                                </>
                            ))
                        }
                    </select>
                </div>

                <div className="bg-white py-1.5 text-sm rounded-md min-w-[46%] max-w-max text-center">
                    Select Loan Type:
                    <select name='LoanType' id='loan-types' onChange={(e) => { setLoanType(e.target.value) }}>
                        {
                            Object.keys(markets[networkType]).map((asset) => (
                                <>
                                    {markets[networkType][asset]["borrowing"] === "YES" && <option value={asset} key={asset}>{asset}</option>}
                                </>
                            ))
                        }
                    </select>
                </div>
            </div>
            <div className="mt-10">
                <div className="text-center text-[#dbe1e8]">
                    What do you want to calculate?
                </div>
                <div className="flex justify-around mt-6 text-[#dbe1e8] text-sm">
                    {calculatorType === 'lp' ? (
                        <button className="border border-white border-b-2 min-w-[25%] bg-black hover:bg-black" onClick={() => { setCalculatorType('lp') }}>Liquidation  Price</button>
                    ) : (
                        <button className="border border-white border-b-2 min-w-[25%] hover:bg-black" onClick={() => { setCalculatorType('lp') }} >Liquidation Price</button>
                    )}
                    {calculatorType === 'ca' ? (
                        <button className="border border-white border-b-2 min-w-[25%] bg-black hover:bg-black" onClick={() => { setCalculatorType('ca') }}>Collateral</button>
                    ) : (
                        <button className="border border-white border-b-2 min-w-[25%] hover:bg-black" onClick={() => { setCalculatorType('ca') }}>Collateral</button>
                    )}
                    {calculatorType === 'la' ? (
                        <button className="border border-white border-b-2 min-w-[25%] bg-black hover:bg-black" onClick={() => { setCalculatorType('la') }}>Loan Amount</button>
                    ) : (
                        <button className="border border-white border-b-2 min-w-[25%] hover:bg-black" onClick={() => { setCalculatorType('la') }}>Loan Amount</button>
                    )}
                </div>
            </div>
        </div>
    )
}