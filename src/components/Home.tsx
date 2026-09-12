"use client"

import { MapPin, TrendingUp, ArrowRight, Shield, Bell } from "lucide-react"
import { demoUser, demoMerchants, demoImpactData } from "@/lib/data"
import { cn } from "@/lib/utils"

interface HomeProps {
  onNavigate: (tab: string) => void
}

export default function Home({ onNavigate }: HomeProps) {
  const nearbyMerchants = demoMerchants.slice(0, 3)

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white pb-20">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-900 to-blue-800 text-white p-6 rounded-b-3xl">
        <div className="flex justify-between items-start mb-6">
          <div>
            <p className="text-blue-200 text-sm">Bem-vindo de volta</p>
            <h1 className="text-2xl font-bold">Olá, {demoUser.name}</h1>
          </div>
          <button className="p-2 bg-blue-800 rounded-full hover:bg-blue-700 transition-colors">
            <Bell className="w-5 h-5" />
          </button>
        </div>

        <div className="flex items-center space-x-2 text-blue-200 mb-6">
          <MapPin className="w-4 h-4" />
          <span className="text-sm">{demoUser.territory}</span>
        </div>

        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 mb-4">
          <p className="text-blue-200 text-sm mb-1">Saldo disponível</p>
          <div className="flex items-baseline space-x-2">
            <span className="text-3xl font-bold">{demoUser.balance.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
            <span className="text-lg">MCC</span>
          </div>
          <p className="text-blue-200 text-sm mt-1">≈ R$ {(demoUser.balance * 10).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="bg-green-500/20 backdrop-blur-sm rounded-xl p-4">
            <div className="flex items-center space-x-2 mb-2">
              <TrendingUp className="w-4 h-4 text-green-300" />
              <span className="text-green-200 text-sm">Impacto</span>
            </div>
            <p className="text-xl font-bold text-white">
              R$ {demoUser.impact.toFixed(2)}
            </p>
            <p className="text-green-200 text-xs">gerados</p>
          </div>

          <div className="bg-blue-500/20 backdrop-blur-sm rounded-xl p-4">
            <div className="flex items-center space-x-2 mb-2">
              <Shield className="w-4 h-4 text-blue-300" />
              <span className="text-blue-200 text-sm">Nível</span>
            </div>
            <p className="text-xl font-bold text-white">{demoUser.level}</p>
            <p className="text-blue-200 text-xs">comunidade</p>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="px-4 py-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Ações rápidas</h2>
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => onNavigate('explore')}
            className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow border border-gray-100"
          >
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <MapPin className="w-5 h-5 text-blue-600" />
              </div>
              <div className="text-left">
                <p className="font-medium text-gray-900">Explorar</p>
                <p className="text-xs text-gray-500">Comércio local</p>
              </div>
            </div>
          </button>

          <button
            onClick={() => onNavigate('safety')}
            className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow border border-gray-100"
          >
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                <Shield className="w-5 h-5 text-green-600" />
              </div>
              <div className="text-left">
                <p className="font-medium text-gray-900">Segurança</p>
                <p className="text-xs text-gray-500">Mapa do território</p>
              </div>
            </div>
          </button>
        </div>
      </div>

      {/* Nearby Merchants */}
      <div className="px-4 py-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Próximos a você</h2>
          <button
            onClick={() => onNavigate('explore')}
            className="text-blue-600 text-sm font-medium flex items-center space-x-1 hover:text-blue-700"
          >
            <span>Ver todos</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="space-y-3">
          {nearbyMerchants.map((merchant) => (
            <div
              key={merchant.id}
              className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow border border-gray-100"
            >
              <div className="flex items-start space-x-3">
                <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                  <img
                    src={merchant.image}
                    alt={merchant.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-gray-900 truncate">{merchant.name}</h3>
                  <p className="text-sm text-gray-500 capitalize">{merchant.category}</p>
                  <div className="flex items-center space-x-2 mt-2">
                    <span className="text-xs text-gray-400">{merchant.distance}</span>
                    <span className="text-xs text-green-600 font-medium">{merchant.benefit}</span>
                  </div>
                </div>
                {merchant.isSupportPoint && (
                  <div className="flex-shrink-0">
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      Ponto de Apoio
                    </span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Community Impact Preview */}
      <div className="px-4 py-4">
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-4 border border-green-100">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-semibold text-gray-900">Impacto da comunidade</h2>
            <button
              onClick={() => onNavigate('impact')}
              className="text-green-600 text-sm font-medium hover:text-green-700"
            >
              Ver detalhes
            </button>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-2xl font-bold text-gray-900">
                R$ {demoImpactData.communityImpact.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
              </p>
              <p className="text-sm text-gray-600">total gerado</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{demoImpactData.familiesImpacted}</p>
              <p className="text-sm text-gray-600">famílias impactadas</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
