"use client"

import { ArrowRight, MapPin, Shield, AlertTriangle, CheckCircle } from "lucide-react"
import { demoSafetyAreas, demoSupportPoints } from "@/lib/data"
import { cn } from "@/lib/utils"
import MultiverseLogo from "./MultiverseLogo"

interface SafetyProps {
  onBack: () => void
}

export default function Safety({ onBack }: SafetyProps) {
  const getRiskColor = (level: string) => {
    switch (level) {
      case 'low': return 'bg-green-500'
      case 'medium': return 'bg-yellow-500'
      case 'high': return 'bg-red-500'
      default: return 'bg-gray-500'
    }
  }

  const getRiskLabel = (level: string) => {
    switch (level) {
      case 'low': return 'Baixo risco'
      case 'medium': return 'Atenção'
      case 'high': return 'Risco alto'
      default: return 'Indefinido'
    }
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
          <h1 className="text-2xl font-bold">Segurança no Território</h1>
        </div>

        <div className="flex items-center space-x-2 text-blue-200 mb-4">
          <Shield className="w-5 h-5" />
          <p className="text-sm">Mapa de segurança e pontos de apoio</p>
        </div>

        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
          <p className="text-sm text-yellow-800">
            <strong>Dados demonstrativos do MVP:</strong> As informações apresentadas são simuladas para fins de demonstração. Este sistema não prevê crimes e não afirma que regiões são absolutamente seguras ou perigosas. O objetivo é informar e orientar.
          </p>
        </div>
      </div>

      {/* Stylized Map */}
      <div className="px-4 py-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Mapa do Território</h2>
        <div className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 mb-6">
          <div className="relative h-64 bg-gradient-to-br from-blue-50 to-green-50">
            {/* Stylized map representation */}
            <svg className="w-full h-full" viewBox="0 0 400 256">
              {/* Base map */}
              <rect fill="#f0f9ff" width="400" height="256" />

              {/* Roads */}
              <path d="M 0 128 L 400 128" stroke="#cbd5e1" strokeWidth="3" fill="none" />
              <path d="M 200 0 L 200 256" stroke="#cbd5e1" strokeWidth="3" fill="none" />
              <path d="M 100 0 L 100 256" stroke="#e2e8f0" strokeWidth="2" fill="none" />
              <path d="M 300 0 L 300 256" stroke="#e2e8f0" strokeWidth="2" fill="none" />
              <path d="M 0 64 L 400 64" stroke="#e2e8f0" strokeWidth="2" fill="none" />
              <path d="M 0 192 L 400 192" stroke="#e2e8f0" strokeWidth="2" fill="none" />

              {/* Safety areas */}
              {demoSafetyAreas.map((area, index) => {
                const x = 50 + (index * 120)
                const y = 64 + (index * 40)
                return (
                  <g key={area.id}>
                    <circle
                      cx={x}
                      cy={y}
                      r="30"
                      fill={area.riskLevel === 'low' ? 'rgba(16, 185, 129, 0.3)' :
                            area.riskLevel === 'medium' ? 'rgba(245, 158, 11, 0.3)' :
                            'rgba(239, 68, 68, 0.3)'}
                      stroke={area.riskLevel === 'low' ? '#10B981' :
                              area.riskLevel === 'medium' ? '#F59E0B' :
                              '#EF4444'}
                      strokeWidth="2"
                    />
                    <circle cx={x} cy={y} r="8" fill={area.riskLevel === 'low' ? '#10B981' :
                                                   area.riskLevel === 'medium' ? '#F59E0B' :
                                                   '#EF4444'} />
                  </g>
                )
              })}

              {/* Support points */}
              {demoSupportPoints.map((point, index) => {
                const x = 80 + (index * 70)
                const y = 150 + (index * 20)
                return (
                  <g key={point.id}>
                    <circle
                      cx={x}
                      cy={y}
                      r="12"
                      fill="#3B82F6"
                      stroke="#1E40AF"
                      strokeWidth="2"
                    />
                    <text x={x} y={y + 4} textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">
                      {index + 1}
                    </text>
                  </g>
                )
              })}

              {/* Territory label */}
              <text x="200" y="24" textAnchor="middle" fill="#1E3A5F" fontSize="14" fontWeight="bold">
                MOEMA - SP
              </text>
            </svg>

            {/* Legend */}
            <div className="absolute bottom-2 left-2 right-2 bg-white/90 backdrop-blur-sm rounded-lg p-2">
              <div className="flex justify-around text-xs">
                <div className="flex items-center space-x-1">
                  <div className="w-3 h-3 rounded-full bg-green-500" />
                  <span>Baixo risco</span>
                </div>
                <div className="flex items-center space-x-1">
                  <div className="w-3 h-3 rounded-full bg-yellow-500" />
                  <span>Atenção</span>
                </div>
                <div className="flex items-center space-x-1">
                  <div className="w-3 h-3 rounded-full bg-red-500" />
                  <span>Risco alto</span>
                </div>
                <div className="flex items-center space-x-1">
                  <div className="w-3 h-3 rounded-full bg-blue-500" />
                  <span>Ponto de Apoio</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Safety Areas */}
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Áreas de Atenção</h2>
        <div className="space-y-3 mb-6">
          {demoSafetyAreas.map((area) => (
            <div key={area.id} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <MapPin className="w-5 h-5 text-gray-600" />
                  <span className="font-medium text-gray-900">{area.name}</span>
                </div>
                <span className={cn(
                  "inline-flex items-center px-2 py-1 rounded-full text-xs font-medium",
                  area.riskLevel === 'low' ? "bg-green-100 text-green-800" :
                  area.riskLevel === 'medium' ? "bg-yellow-100 text-yellow-800" :
                  "bg-red-100 text-red-800"
                )}>
                  {getRiskLabel(area.riskLevel)}
                </span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-500">
                <AlertTriangle className="w-4 h-4" />
                <span>{area.incidents} incidentes registrados (últimas 24h)</span>
              </div>
            </div>
          ))}
        </div>

        {/* Support Points */}
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Pontos de Apoio Multiverse</h2>
        <div className="space-y-3">
          {demoSupportPoints.map((point, index) => (
            <div key={point.id} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-blue-600 font-bold text-sm">{index + 1}</span>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">{point.name}</h3>
                    <p className="text-sm text-gray-500">{point.type}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-1 text-green-600">
                  <CheckCircle className="w-4 h-4" />
                  <span className="text-xs font-medium">Ativo</span>
                </div>
              </div>
              <div className="flex items-center justify-between text-sm text-gray-500">
                <div className="flex items-center space-x-1">
                  <MapPin className="w-4 h-4" />
                  <span>{point.distance}</span>
                </div>
                <span>{point.hours}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Safety Information */}
        <div className="mt-6 bg-blue-50 border border-blue-200 rounded-xl p-4">
          <div className="flex items-start space-x-3">
            <Shield className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-medium text-gray-900 mb-1">Sobre a segurança</h3>
              <p className="text-sm text-gray-600">
                O sistema de segurança Multiverse visa informar e orientar moradores sobre o território. Os pontos de apoio são estabelecimentos parceiros que podem oferecer assistência em caso de necessidade.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
