"use client"

import { ArrowRight, Wallet, TrendingUp, Clock, ArrowDownLeft, ArrowUpRight } from "lucide-react"
import { demoUser, demoTransactions } from "@/lib/data"
import { cn } from "@/lib/utils"
import MultiverseLogo from "./MultiverseLogo"

interface WalletProps {
  onBack: () => void
}

export default function Wallet({ onBack }: WalletProps) {
  const sortedTransactions = [...demoTransactions].sort((a, b) =>
    new Date(b.date).getTime() - new Date(a.date).getTime()
  )

  const formatDate = (date: Date) => {
    const now = new Date()
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))

    if (diffInHours < 1) return "Agora"
    if (diffInHours < 24) return `Hoje, ${date.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}`
    if (diffInHours < 48) return "Ontem"
    return date.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' })
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white pb-20">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-900 to-blue-800 text-white p-6 rounded-b-3xl">
        {/* Logo Header */}
        <div className="flex justify-center mb-4">
          <MultiverseLogo size={50} />
          <h2 className="text-base font-bold text-center mt-2">MULTIVERSE</h2>
        </div>

        <div className="flex items-center space-x-3 mb-6">
          <button
            onClick={onBack}
            className="p-2 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-colors"
          >
            <ArrowRight className="w-5 h-5 rotate-180" />
          </button>
          <h1 className="text-2xl font-bold">Carteira</h1>
        </div>

        {/* Balance Card */}
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 mb-4">
          <div className="flex items-center space-x-2 mb-2">
            <Wallet className="w-5 h-5 text-blue-200" />
            <span className="text-blue-200 text-sm">Saldo disponível</span>
          </div>
          <div className="flex items-baseline space-x-2 mb-1">
            <span className="text-4xl font-bold">{demoUser.balance.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
            <span className="text-xl">MCC</span>
          </div>
          <p className="text-blue-200 text-sm">≈ R$ {(demoUser.balance * 10).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
            <div className="flex items-center space-x-2 mb-2">
              <TrendingUp className="w-4 h-4 text-green-300" />
              <span className="text-green-200 text-sm">Cashback total</span>
            </div>
            <p className="text-xl font-bold text-white">
              {sortedTransactions.reduce((sum, t) => sum + t.cashback, 0).toFixed(2)} MCC
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
            <div className="flex items-center space-x-2 mb-2">
              <Clock className="w-4 h-4 text-blue-300" />
              <span className="text-blue-200 text-sm">Transações</span>
            </div>
            <p className="text-xl font-bold text-white">{sortedTransactions.length}</p>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="px-4 py-6">
        <div className="grid grid-cols-2 gap-3 mb-6">
          <button className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow border border-gray-100 flex items-center justify-center space-x-2">
            <ArrowDownLeft className="w-5 h-5 text-green-600" />
            <span className="font-medium text-gray-900">Receber</span>
          </button>
          <button className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow border border-gray-100 flex items-center justify-center space-x-2">
            <ArrowUpRight className="w-5 h-5 text-blue-600" />
            <span className="font-medium text-gray-900">Enviar</span>
          </button>
        </div>

        {/* Transaction History */}
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Histórico de transações</h2>
        <div className="space-y-3">
          {sortedTransactions.map((transaction) => (
            <div key={transaction.id} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center space-x-3">
                  <div className={cn(
                    "w-10 h-10 rounded-full flex items-center justify-center",
                    transaction.type === 'purchase' ? "bg-blue-100" :
                    transaction.type === 'cashback' ? "bg-green-100" :
                    "bg-purple-100"
                  )}>
                    {transaction.type === 'purchase' ? (
                      <ArrowUpRight className="w-5 h-5 text-blue-600" />
                    ) : transaction.type === 'cashback' ? (
                      <ArrowDownLeft className="w-5 h-5 text-green-600" />
                    ) : (
                      <TrendingUp className="w-5 h-5 text-purple-600" />
                    )}
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">{transaction.merchantName}</h3>
                    <p className="text-sm text-gray-500">{formatDate(transaction.date)}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className={cn(
                    "font-medium",
                    transaction.type === 'purchase' ? "text-gray-900" :
                    transaction.type === 'cashback' ? "text-green-600" :
                    "text-purple-600"
                  )}>
                    {transaction.type === 'purchase' ? '-' : '+'}
                    {transaction.type === 'purchase' ? transaction.amount.toFixed(2) : transaction.cashback.toFixed(2)} MCC
                  </p>
                  {transaction.type === 'purchase' && (
                    <p className="text-xs text-green-600">+{transaction.cashback.toFixed(2)} cashback</p>
                  )}
                </div>
              </div>

              {transaction.type === 'purchase' && (
                <div className="flex items-center space-x-2 text-xs text-gray-500 pt-2 border-t border-gray-100">
                  <TrendingUp className="w-3 h-3 text-green-600" />
                  <span>Impacto gerado: R$ {transaction.impact.toFixed(2)}</span>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Info */}
        <div className="mt-6 bg-yellow-50 border border-yellow-200 rounded-xl p-4">
          <p className="text-sm text-yellow-800">
            <strong>Dados demonstrativos do MVP:</strong> As transações exibidas são simuladas para demonstrar o funcionamento do sistema. Nenhum valor real está sendo processado.
          </p>
        </div>
      </div>
    </div>
  )
}
