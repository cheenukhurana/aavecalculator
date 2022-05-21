
import { useEffect } from "react"
import { markets } from "../markets"

export default function Assets({ networkType, setCollateralType, setLoanType, setCalculatorType }) {

    useEffect(() => {
        setCollateralType(Object.keys(markets[networkType])[0])
        setLoanType(Object.keys(markets[networkType])[0])
    },[networkType])

    return (
        <div>
            <div>
                Select Collateral:
                <select name='Collateral' id='collateral-types'  onChange={(e) => { setCollateralType(e.target.value) }}>
                    {
                        Object.keys(markets[networkType]).map((asset) => (
                            <>
                                {markets[networkType][asset]["collateral"] === "YES" && <option value={asset} key={asset}>{asset}</option>}
                            </>
                        ))
                    }
                </select>
            </div>
            <div>
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
            <br />
            <div>
                What do you want to calculate?
                <div style={{ display: 'flex', justify: 'center' }}>
                    <button onClick={() => { setCalculatorType('lp') }}>Liquidation Price</button>
                    <button onClick={() => { setCalculatorType('ca') }}>Collateral</button>
                    <button onClick={() => { setCalculatorType('la') }}>Loan Amount</button>
                </div>
            </div>
        </div>
    )
}