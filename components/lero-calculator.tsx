"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { HeartIcon, StarIcon } from "lucide-react"

// Mock data for demonstration
const assets = ["ETH", "BTC", "USDC", "DAI"]
const chains = ["Ethereum", "Arbitrum", "Optimism", "Polygon"]

type Strategy = {
  id: number
  name: string
  expectedYield: number
  risk: number
  wishlisted: boolean
}

export function LeroCalculatorComponent() {
  const [amount, setAmount] = useState("")
  const [asset, setAsset] = useState("")
  const [chain, setChain] = useState("")
  const [riskProfile, setRiskProfile] = useState(2)
  const [strategies, setStrategies] = useState<Strategy[]>([])

  const calculateStrategies = () => {
    // This is a mock calculation. In a real application, this would call an API or perform complex calculations.
    const mockStrategies: Strategy[] = [
      { id: 1, name: "Conservative Staking", expectedYield: 5.2, risk: 1, wishlisted: false },
      { id: 2, name: "Balanced Yield Farming", expectedYield: 8.7, risk: 3, wishlisted: false },
      { id: 3, name: "Aggressive DeFi Lending", expectedYield: 12.5, risk: 4, wishlisted: false },
      { id: 4, name: "High-Risk Liquidity Provision", expectedYield: 18.3, risk: 5, wishlisted: false },
    ]
    setStrategies(mockStrategies)
  }

  const toggleWishlist = (id: number) => {
    setStrategies(strategies.map(strategy => 
      strategy.id === id ? { ...strategy, wishlisted: !strategy.wishlisted } : strategy
    ))
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Lero Yield Calculator</h1>
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Investment Details</CardTitle>
            <CardDescription>Enter your investment parameters</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-1">
                Amount
              </label>
              <Input
                id="amount"
                type="number"
                placeholder="Enter amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="asset" className="block text-sm font-medium text-gray-700 mb-1">
                Asset
              </label>
              <Select value={asset} onValueChange={setAsset}>
                <SelectTrigger>
                  <SelectValue placeholder="Select asset" />
                </SelectTrigger>
                <SelectContent>
                  {assets.map((a) => (
                    <SelectItem key={a} value={a}>
                      {a}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <label htmlFor="chain" className="block text-sm font-medium text-gray-700 mb-1">
                Chain
              </label>
              <Select value={chain} onValueChange={setChain}>
                <SelectTrigger>
                  <SelectValue placeholder="Select chain" />
                </SelectTrigger>
                <SelectContent>
                  {chains.map((c) => (
                    <SelectItem key={c} value={c}>
                      {c}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <label htmlFor="risk-profile" className="block text-sm font-medium text-gray-700 mb-1">
                Risk Profile: {riskProfile}
              </label>
              <Slider
                id="risk-profile"
                min={0}
                max={5}
                step={1}
                value={[riskProfile]}
                onValueChange={(value) => setRiskProfile(value[0])}
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={calculateStrategies}>Calculate Strategies</Button>
          </CardFooter>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Recommended Strategies</CardTitle>
            <CardDescription>Based on your investment parameters</CardDescription>
          </CardHeader>
          <CardContent>
            {strategies.length > 0 ? (
              <ul className="space-y-4">
                {strategies.map((strategy) => (
                  <li key={strategy.id} className="flex items-center justify-between p-4 bg-gray-100 rounded-lg">
                    <div>
                      <h3 className="font-semibold">{strategy.name}</h3>
                      <p className="text-sm text-gray-600">Expected Yield: {strategy.expectedYield}%</p>
                      <p className="text-sm text-gray-600">Risk Level: {strategy.risk}/5</p>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => toggleWishlist(strategy.id)}
                      aria-label={strategy.wishlisted ? "Remove from wishlist" : "Add to wishlist"}
                    >
                      {strategy.wishlisted ? (
                        <HeartIcon className="h-5 w-5 text-red-500" />
                      ) : (
                        <HeartIcon className="h-5 w-5" />
                      )}
                    </Button>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-center text-gray-500">No strategies calculated yet. Enter your details and click "Calculate Strategies".</p>
            )}
          </CardContent>
          <CardFooter className="flex justify-center">
            <Button>Sign Up to Use These Strategies</Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}