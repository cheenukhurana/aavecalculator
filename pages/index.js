import Layout from '../components/layout';
import CollateralAmountCalculator from '../components/collateralAmountCalculator';
import LoanAmountCalculator from '../components/loanAmountCalculator';
import LiquidationPriceCalculator from '../components/liquidationPriceCalculator';
import Assets from '../components/assets';
import { useEffect, useState } from 'react';
import { markets } from '../markets';
import { ethers } from 'ethers';

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

function NetworkTypes({ networkType, setNetworkType }) {
  return (
    <div className="flex justify-around mt-6 text-[#dbe1e8] text-sm mt-10">
      {networkType === 'ETHEREUM' ? (
        <button className="border border-white border-b-2 min-w-[25%] bg-black hover:bg-black" onClick={() => { setNetworkType('ETHEREUM') }}>Ethereum</button>
      ) : (
        <button className="border border-white border-b-2 min-w-[25%] hover:bg-black" onClick={() => { setNetworkType('ETHEREUM') }} >ETHEREUM</button>
      )}
      {networkType === 'POLYGON' ? (
        <button className="border border-white border-b-2 min-w-[25%] bg-black hover:bg-black" onClick={() => { setNetworkType('POLYGON') }}>Polygon V3</button>
      ) : (
        <button className="border border-white border-b-2 min-w-[25%] hover:bg-black" onClick={() => { setNetworkType('POLYGON') }}>Polygon V3</button>
      )}
      {networkType === 'ARBITRUM' ? (
        <button className="border border-white border-b-2 min-w-[25%] bg-black hover:bg-black" onClick={() => { setNetworkType('ARBITRUM') }}>Arbitrum V3</button>
      ) : (
        <button className="border border-white border-b-2 min-w-[25%] hover:bg-black" onClick={() => { setNetworkType('ARBITRUM') }}>Arbitrum V3</button>
      )}
    </div>
  )
}

function getChainLinkPrice(networkType, address,  setPrice ) {
  let provider;
  if (networkType === "POLYGON") {
    provider = new ethers.providers.JsonRpcProvider("https://polygon-mainnet.infura.io/v3/646811ce6d7641bc893009e2b67b27f0")
  }
  else if (networkType === "ARBITRUM") {
    provider = new ethers.providers.JsonRpcProvider("https://arbitrum-mainnet.infura.io/v3/646811ce6d7641bc893009e2b67b27f0")
  }
  else {
    provider = new ethers.providers.JsonRpcProvider("https://mainnet.infura.io/v3/646811ce6d7641bc893009e2b67b27f0")
  }

  const aggregatorV3InterfaceABI = [{ "inputs": [], "name": "decimals", "outputs": [{ "internalType": "uint8", "name": "", "type": "uint8" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "description", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint80", "name": "_roundId", "type": "uint80" }], "name": "getRoundData", "outputs": [{ "internalType": "uint80", "name": "roundId", "type": "uint80" }, { "internalType": "int256", "name": "answer", "type": "int256" }, { "internalType": "uint256", "name": "startedAt", "type": "uint256" }, { "internalType": "uint256", "name": "updatedAt", "type": "uint256" }, { "internalType": "uint80", "name": "answeredInRound", "type": "uint80" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "latestRoundData", "outputs": [{ "internalType": "uint80", "name": "roundId", "type": "uint80" }, { "internalType": "int256", "name": "answer", "type": "int256" }, { "internalType": "uint256", "name": "startedAt", "type": "uint256" }, { "internalType": "uint256", "name": "updatedAt", "type": "uint256" }, { "internalType": "uint80", "name": "answeredInRound", "type": "uint80" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "version", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }]
  const addr = address
  const priceFeed = new ethers.Contract(addr, aggregatorV3InterfaceABI, provider)
  priceFeed.decimals()
    .then(decimals => {
      priceFeed.latestRoundData()
        .then((roundData) => {
          const res = Number((roundData.answer.toString() / Math.pow(10, decimals)).toFixed(4))
          setPrice(res)
        })
    })
}

export default function Home() {

  const [networkType, setNetworkType] = useState('ETHEREUM')
  const [collateralType, setCollateralType] = useState("")
  const [loanType, setLoanType] = useState("")
  const [calculatorType, setCalculatorType] = useState('lp')
  const [collateralPrice, setCollateralPrice] = useState(0)
  const [loanItemPrice, setLoanItemPrice] = useState(0)
  const [loanToValue, setLoanToValue] = useState(0)
  const [liquidationThreshold, setLiquidationThreshold] = useState(0)

  useEffect(() => {
    if (collateralType && markets[networkType][collateralType]) {
      setLoanToValue(markets[networkType][collateralType]["loanToValue"])
      setLiquidationThreshold(markets[networkType][collateralType]["liquidationThreshold"])
    }
  }, [networkType, collateralType])

  useEffect(() => {
    if (collateralType && markets[networkType][collateralType]) {
      getChainLinkPrice(networkType, markets[networkType][collateralType]["chainlinkAddress"], setCollateralPrice)
    }
  }, [networkType, collateralType])

  useEffect(() => {
    if (loanType && markets[networkType][loanType]) {
      getChainLinkPrice(networkType, markets[networkType][loanType]["chainlinkAddress"], setLoanItemPrice)
    }
  }, [networkType, loanType])

  return (
    <Layout>
      <NetworkTypes networkType={networkType} setNetworkType={setNetworkType} />
      <section className='mt-10'>
        <Assets networkType={networkType} collateralType={collateralType} loanType={loanType} setCollateralType={setCollateralType} setLoanType={setLoanType} calculatorType={calculatorType} setCalculatorType={setCalculatorType} />
        <Calculator collateralType={collateralType} loanType={loanType} calculatorType={calculatorType} collateralPrice={collateralPrice} loanItemPrice={loanItemPrice} loanToValue={loanToValue} liquidationThreshold={liquidationThreshold} />
      </section>
    </Layout>
  )
}
