"use client"

import { useState } from "react"
import Navigation from "./Navigation"
import Home from "./Home"
import Explore from "./Explore"
import MerchantDetail from "./MerchantDetail"
import Impact from "./Impact"
import Safety from "./Safety"
import Wallet from "./Wallet"
import { demoUser, demoTransactions } from "@/lib/data"

type View = 'home' | 'explore' | 'merchant' | 'impact' | 'safety' | 'wallet'

export default function App() {
  const [activeTab, setActiveTab] = useState<View>('home')
  const [selectedMerchant, setSelectedMerchant] = useState<string | null>(null)
  const [user, setUser] = useState(demoUser)
  const [transactions, setTransactions] = useState(demoTransactions)

  const handleTabChange = (tab: string) => {
    setActiveTab(tab as View)
    setSelectedMerchant(null)
  }

  const handleMerchantSelect = (merchantId: string) => {
    setSelectedMerchant(merchantId)
    setActiveTab('merchant')
  }

  const handleTransaction = (merchantId: string, amount: number, cashback: number) => {
    const merchantName = demoTransactions.find(t => t.merchantId === merchantId)?.merchantName || "Estabelecimento"

    const newTransaction = {
      id: Date.now().toString(),
      merchantId,
      merchantName,
      amount,
      cashback: amount * (cashback / 100),
      impact: amount * 0.01,
      date: new Date(),
      type: 'purchase' as const
    }

    setTransactions([newTransaction, ...transactions])
    setUser({
      ...user,
      balance: user.balance - amount + newTransaction.cashback,
      impact: user.impact + newTransaction.impact
    })

    setActiveTab('wallet')
  }

  const renderView = () => {
    switch (activeTab) {
      case 'home':
        return <Home onNavigate={handleTabChange} />
      case 'explore':
        return <Explore onMerchantSelect={handleMerchantSelect} onBack={() => setActiveTab('home')} />
      case 'merchant':
        return selectedMerchant ? (
          <MerchantDetail
            merchantId={selectedMerchant}
            onBack={() => setActiveTab('explore')}
            onTransaction={handleTransaction}
          />
        ) : null
      case 'impact':
        return <Impact onBack={() => setActiveTab('home')} />
      case 'safety':
        return <Safety onBack={() => setActiveTab('home')} />
      case 'wallet':
        return <Wallet onBack={() => setActiveTab('home')} />
      default:
        return <Home onNavigate={handleTabChange} />
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-32">
      {renderView()}
      <Navigation activeTab={activeTab} onTabChange={handleTabChange} />
      {/* Footer com Logo e Copyright */}
      <div className="fixed bottom-0 left-0 right-0 bg-gray-50 border-t border-gray-200 py-2 px-4 z-40">
        <div className="max-w-lg mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center">
              <span className="text-white text-xs font-bold">M</span>
            </div>
            <span className="text-xs text-gray-600 font-medium">MULTIVERSE</span>
          </div>
          <span className="text-xs text-gray-400">© 2026 Todos os direitos reservados.</span>
        </div>
      </div>
    </div>
  )
}
