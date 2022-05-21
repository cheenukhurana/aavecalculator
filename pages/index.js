import Layout from '../components/layout';
import CollateralAmountCalculator from '../components/collateralAmountCalculator';
import LoanAmountCalculator from '../components/loanAmountCalculator';
import LiquidationPriceCalculator from '../components/liquidationPriceCalculator';
import Assets from '../components/assets';
import { useEffect, useState } from 'react';
import { markets } from '../markets';

function Calculator(props) {
  const collateralType = props.collateralType
  const loanType = props.loanType
  const calculatorType = props.calculatorType
  const liquidationThreshold = props.liquidationThreshold
  const loanToValue = props.loanToValue
  const collateralPrice = props.collateralPrice
  const loanItemPrice = props.loanItemPrice

  if (calculatorType === 'lp') {
    return <LiquidationPriceCalculator collateralType={collateralType} loanType={loanType} collateralPrice={collateralPrice} loanItemPrice={loanItemPrice} liquidationThreshold={liquidationThreshold} />
  }
  else if (calculatorType === 'ca') {
    return <CollateralAmountCalculator collateralType={collateralType} loanType={loanType} collateralPrice={collateralPrice} loanItemPrice={loanItemPrice} loanToValue={loanToValue} liquidationThreshold={liquidationThreshold} />
  }
  else {
    return <LoanAmountCalculator collateralType={collateralType} loanType={loanType} collateralPrice={collateralPrice} loanItemPrice={loanItemPrice} loanToValue={loanToValue} liquidationThreshold={liquidationThreshold} />
  }
}

function NetworkTypes({setNetworkType}) {
  return (
    <div>
      <button onClick={() => { setNetworkType('ETHEREUM') }}>Ethereum</button>
      <button onClick={() => { setNetworkType('POLYGON') }}>Polygon</button>
    </div>
  )
}

export default function Home() {

  const [networkType, setNetworkType] = useState('ETHEREUM')
  const [collateralType, setCollateralType] = useState("")
  const [loanType, setLoanType] = useState("")
  const [calculatorType, setCalculatorType] = useState('lp')
  const [collateralPrice, setCollateralPrice] = useState(40000)
  const [loanItemPrice, setLoanItemPrice] = useState(1)
  const [loanToValue, setLoanToValue] = useState(0)
  const [liquidationThreshold, setLiquidationThreshold] = useState(0)

  useEffect(() => {
    if(collateralType)
    {
      setLoanToValue(markets[networkType][collateralType]["loanToValue"])
      setLiquidationThreshold(markets[networkType][collateralType]["liquidationThreshold"])
    }
  },[networkType, collateralType])

  return (
    <Layout>
      <section>
        <NetworkTypes setNetworkType={setNetworkType} />
        <Assets networkType={networkType} setCollateralType={setCollateralType} setLoanType={setLoanType} setCalculatorType={setCalculatorType} />
        <Calculator collateralType={collateralType} loanType={loanType} calculatorType={calculatorType} collateralPrice={collateralPrice} loanItemPrice={loanItemPrice} loanToValue={loanToValue} liquidationThreshold={liquidationThreshold} />
      </section>
    </Layout>
  )
}
