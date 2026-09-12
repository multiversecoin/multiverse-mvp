"use client"

import { Home, Compass, Heart, Shield, Wallet } from "lucide-react"
import { cn } from "@/lib/utils"

interface NavigationProps {
  activeTab: string
  onTabChange: (tab: string) => void
}

export default function Navigation({ activeTab, onTabChange }: NavigationProps) {
  const tabs = [
    { id: "home", label: "Início", icon: Home },
    { id: "explore", label: "Explorar", icon: Compass },
    { id: "impact", label: "Impacto", icon: Heart },
    { id: "safety", label: "Segurança", icon: Shield },
    { id: "wallet", label: "Carteira", icon: Wallet },
  ]

  return (
    <>
      <nav className="fixed bottom-8 left-0 right-0 bg-white border-t border-gray-200 z-50">
        <div className="max-w-lg mx-auto">
          <div className="flex justify-around items-center h-16">
            {tabs.map((tab) => {
              const Icon = tab.icon
              return (
                <button
                  key={tab.id}
                  onClick={() => onTabChange(tab.id)}
                  className={cn(
                    "flex flex-col items-center justify-center space-y-1 px-3 py-2 transition-colors",
                    activeTab === tab.id
                      ? "text-blue-600"
                      : "text-gray-500 hover:text-gray-700"
                  )}
                >
                  <Icon className="w-5 h-5" />
                  <span className="text-xs">{tab.label}</span>
                </button>
              )
            })}
          </div>
        </div>
      </nav>

      {/* Footer com Logo e Copyright */}
      <div className="fixed bottom-0 left-0 right-0 bg-gray-50 border-t border-gray-100 py-2 px-4 z-40">
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
    </>
  )
}
