"use client"

import { useState } from "react"
import { Search, MapPin, Clock, Star, ArrowRight } from "lucide-react"
import { demoMerchants } from "@/lib/data"
import { cn } from "@/lib/utils"
import MultiverseLogo from "./MultiverseLogo"

interface ExploreProps {
  onMerchantSelect: (merchantId: string) => void
  onBack: () => void
}

const categories = [
  { id: "all", label: "Todos", icon: "🏪" },
  { id: "cafés", label: "Cafés", icon: "☕" },
  { id: "restaurantes", label: "Restaurantes", icon: "🍽️" },
  { id: "mercados", label: "Mercados", icon: "🛒" },
  { id: "padarias", label: "Padarias", icon: "🥐" },
  { id: "beleza", label: "Beleza", icon: "💇" },
  { id: "academia", label: "Academia", icon: "💪" },
  { id: "pet", label: "Pet", icon: "🐕" },
  { id: "serviços", label: "Serviços", icon: "🔧" },
  { id: "cultura", label: "Cultura", icon: "🎭" },
]

export default function Explore({ onMerchantSelect, onBack }: ExploreProps) {
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")

  const filteredMerchants = demoMerchants.filter((merchant) => {
    const matchesCategory = selectedCategory === "all" || merchant.category === selectedCategory
    const matchesSearch = merchant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          merchant.description.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white pb-20">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="px-4 py-4">
          {/* Logo Header */}
          <div className="flex justify-center mb-4">
            <MultiverseLogo size={40} />
            <h2 className="text-sm font-bold text-center mt-1">MULTIVERSE</h2>
          </div>

          <div className="flex items-center space-x-3 mb-4">
            <button
              onClick={onBack}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <ArrowRight className="w-5 h-5 text-gray-600 rotate-180" />
            </button>
            <h1 className="text-xl font-bold text-gray-900">Explorar</h1>
          </div>

          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar estabelecimentos..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 placeholder-gray-500"
            />
          </div>
        </div>

        {/* Categories */}
        <div className="px-4 pb-4">
          <div className="flex space-x-2 overflow-x-auto pb-2 scrollbar-hide">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={cn(
                  "flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-colors",
                  selectedCategory === category.id
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                )}
              >
                <span className="mr-1">{category.icon}</span>
                {category.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="px-4 py-4">
        <p className="text-sm text-gray-500 mb-4">
          {filteredMerchants.length} estabelecimento{filteredMerchants.length !== 1 ? 's' : ''} encontrado{filteredMerchants.length !== 1 ? 's' : ''}
        </p>

        <div className="space-y-4">
          {filteredMerchants.map((merchant) => (
            <div
              key={merchant.id}
              onClick={() => onMerchantSelect(merchant.id)}
              className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow cursor-pointer border border-gray-100"
            >
              <div className="relative">
                <img
                  src={merchant.image}
                  alt={merchant.name}
                  className="w-full h-48 object-cover"
                />
                {merchant.isSupportPoint && (
                  <div className="absolute top-3 right-3">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-500 text-white">
                      Ponto de Apoio
                    </span>
                  </div>
                )}
                <div className="absolute bottom-3 left-3">
                  <span className={cn(
                    "inline-flex items-center px-3 py-1 rounded-full text-xs font-medium",
                    merchant.isOpen ? "bg-green-500 text-white" : "bg-red-500 text-white"
                  )}>
                    {merchant.isOpen ? "Aberto" : "Fechado"}
                  </span>
                </div>
              </div>

              <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-semibold text-gray-900">{merchant.name}</h3>
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 text-yellow-500 fill-current" />
                    <span className="text-sm text-gray-600">4.8</span>
                  </div>
                </div>

                <p className="text-sm text-gray-500 capitalize mb-3">{merchant.category}</p>

                <p className="text-sm text-gray-600 mb-3 line-clamp-2">{merchant.description}</p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <div className="flex items-center space-x-1">
                      <MapPin className="w-4 h-4" />
                      <span>{merchant.distance}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="w-4 h-4" />
                      <span>{merchant.hours}</span>
                    </div>
                  </div>
                  <span className="text-sm font-medium text-green-600">{merchant.benefit}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredMerchants.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">Nenhum estabelecimento encontrado</p>
          </div>
        )}
      </div>
    </div>
  )
}
