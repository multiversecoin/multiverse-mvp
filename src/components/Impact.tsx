"use client"

import { Heart, TrendingUp, Users, ArrowRight } from "lucide-react"
import { demoImpactData } from "@/lib/data"
import { cn } from "@/lib/utils"

interface ImpactProps {
  onBack: () => void
}

export default function Impact({ onBack }: ImpactProps) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white pb-20">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 to-emerald-600 text-white p-6 rounded-b-3xl">
        <div className="flex items-center space-x-3 mb-6">
          <button
            onClick={onBack}
            className="p-2 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-colors"
          >
            <ArrowRight className="w-5 h-5 rotate-180" />
          </button>
          <h1 className="text-2xl font-bold">Impacto Social</h1>
        </div>

        <div className="text-center mb-6">
          <p className="text-green-100 text-sm mb-2">Seu impacto pessoal</p>
          <div className="flex items-baseline justify-center space-x-2">
            <span className="text-4xl font-bold">R$ {demoImpactData.myImpact.toFixed(2)}</span>
          </div>
          <p className="text-green-100 text-sm mt-1">gerados através do consumo local</p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
            <Users className="w-6 h-6 text-green-200 mb-2" />
            <p className="text-2xl font-bold">{demoImpactData.familiesImpacted}</p>
            <p className="text-green-200 text-sm">famílias impactadas</p>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
            <TrendingUp className="w-6 h-6 text-green-200 mb-2" />
            <p className="text-2xl font-bold">Nível 3</p>
            <p className="text-green-200 text-sm">contribuição</p>
          </div>
        </div>
      </div>

      {/* Community Impact */}
      <div className="px-4 py-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Impacto da comunidade</h2>
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mb-6">
          <div className="text-center mb-4">
            <p className="text-3xl font-bold text-gray-900">
              R$ {demoImpactData.communityImpact.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </p>
            <p className="text-gray-500 text-sm">total gerado em Moema</p>
          </div>

          <div className="bg-green-50 border border-green-200 rounded-xl p-4">
            <p className="text-sm text-green-800">
              <strong>Dados demonstrativos do MVP:</strong> Os valores apresentados são simulados para demonstrar o funcionamento do sistema de impacto social.
            </p>
          </div>
        </div>

        {/* Impact Categories */}
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Categorias de impacto</h2>
        <div className="space-y-3">
          {demoImpactData.categories.map((category, index) => (
            <div key={index} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
              <div className="flex justify-between items-center mb-2">
                <span className="font-medium text-gray-900">{category.name}</span>
                <span className="text-sm text-gray-600">R$ {category.amount.toFixed(2)}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-green-500 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${category.percentage}%` }}
                />
              </div>
              <p className="text-xs text-gray-500 mt-1">{category.percentage}% do total</p>
            </div>
          ))}
        </div>

        {/* Impact Information */}
        <div className="mt-6 bg-blue-50 border border-blue-200 rounded-xl p-4">
          <div className="flex items-start space-x-3">
            <Heart className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-medium text-gray-900 mb-1">Como funciona</h3>
              <p className="text-sm text-gray-600">
                Cada compra realizada na rede Multiverse gera impacto social automaticamente. Parte do valor é direcionada para projetos locais nas categorias acima.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
