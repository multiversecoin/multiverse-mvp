"use client"

import { useState } from "react"
import { ArrowRight, MapPin, Clock, Star, Check, ShoppingBag } from "lucide-react"
import { demoMerchants, demoOffers } from "@/lib/data"
import { cn } from "@/lib/utils"
import SecurityGuard from "./SecurityGuard"

interface MerchantDetailProps {
  merchantId: string
  onBack: () => void
  onTransaction: (merchantId: string, amount: number, cashback: number) => void
}

export default function MerchantDetail({ merchantId, onBack, onTransaction }: MerchantDetailProps) {
  const merchant = demoMerchants.find(m => m.id === merchantId)
  const [selectedOffer, setSelectedOffer] = useState<string | null>(null)
  const [showConfirmation, setShowConfirmation] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)

  if (!merchant) return null

  const merchantOffers = demoOffers.filter(o => o.merchantId === merchantId)

  const handleOfferSelect = (offerId: string) => {
    setSelectedOffer(offerId)
    setShowConfirmation(true)
  }

  const handleConfirmTransaction = () => {
    if (!selectedOffer) return

    const offer = merchantOffers.find(o => o.id === selectedOffer)
    if (!offer) return

    setIsProcessing(true)

    // Simulate transaction processing
    setTimeout(() => {
      onTransaction(merchantId, offer.finalPrice, offer.cashback)
      setIsProcessing(false)
      setShowConfirmation(false)
      setSelectedOffer(null)
    }, 1500)
  }

  const handleSecurityApproved = (token: string) => {
    console.log("Security approved with token:", token)
    // Proceed with the original transaction logic
    handleConfirmTransaction()
  }

  const handleSecurityRejected = (reason: string) => {
    console.log("Security rejected:", reason)
    setIsProcessing(false)
    setShowConfirmation(false)
    setSelectedOffer(null)
    alert(`Transação não autorizada: ${reason}`)
  }

  if (showConfirmation && selectedOffer) {
    const offer = merchantOffers.find(o => o.id === selectedOffer)
    if (!offer) return null

    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white pb-20">
        <div className="px-4 py-6">
          <button
            onClick={() => setShowConfirmation(false)}
            className="flex items-center space-x-2 text-gray-600 mb-6 hover:text-gray-900"
          >
            <ArrowRight className="w-5 h-5 rotate-180" />
            <span>Voltar</span>
          </button>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <ShoppingBag className="w-8 h-8 text-blue-600" />
              </div>
              <h2 className="text-xl font-bold text-gray-900 mb-2">Confirmar compra</h2>
              <p className="text-gray-600">Revise os detalhes antes de confirmar</p>
            </div>

            <div className="space-y-4 mb-6">
              <div className="flex justify-between items-center py-3 border-b border-gray-100">
                <span className="text-gray-600">Estabelecimento</span>
                <span className="font-medium text-gray-900">{merchant.name}</span>
              </div>

              <div className="flex justify-between items-center py-3 border-b border-gray-100">
                <span className="text-gray-600">Oferta</span>
                <span className="font-medium text-gray-900">{offer.title}</span>
              </div>

              <div className="flex justify-between items-center py-3 border-b border-gray-100">
                <span className="text-gray-600">Preço original</span>
                <span className="text-gray-500 line-through">
                  R$ {offer.originalPrice.toFixed(2)}
                </span>
              </div>

              <div className="flex justify-between items-center py-3 border-b border-gray-100">
                <span className="text-gray-600">Desconto</span>
                <span className="text-green-600 font-medium">-{offer.discount}%</span>
              </div>

              <div className="flex justify-between items-center py-3 border-b border-gray-100">
                <span className="text-gray-600">Valor final</span>
                <span className="text-xl font-bold text-gray-900">
                  R$ {offer.finalPrice.toFixed(2)}
                </span>
              </div>

              <div className="flex justify-between items-center py-3 border-b border-gray-100">
                <span className="text-gray-600">Cashback</span>
                <span className="text-blue-600 font-medium">
                  {offer.cashback}% ({(offer.finalPrice * offer.cashback / 100).toFixed(2)} MCC)
                </span>
              </div>

              <div className="flex justify-between items-center py-3">
                <span className="text-gray-600">Impacto estimado</span>
                <span className="text-green-600 font-medium">
                  R$ {(offer.finalPrice * 0.01).toFixed(2)}
                </span>
              </div>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 mb-6">
              <p className="text-sm text-yellow-800">
                <strong>Dados demonstrativos do MVP:</strong> Esta é uma transação simulada para fins de demonstração. Nenhum pagamento real será processado.
              </p>
            </div>

            <SecurityGuard
              amount={offer.finalPrice}
              merchantId={merchantId}
              onTransactionApproved={handleSecurityApproved}
              onTransactionRejected={handleSecurityRejected}
            />
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white pb-20">
      {/* Header Image */}
      <div className="relative">
        <img
          src={merchant.image}
          alt={merchant.name}
          className="w-full h-64 object-cover"
        />
        <button
          onClick={onBack}
          className="absolute top-4 left-4 p-2 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-colors"
        >
          <ArrowRight className="w-5 h-5 text-gray-600 rotate-180" />
        </button>
        {merchant.isSupportPoint && (
          <div className="absolute top-4 right-4">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-500 text-white">
              Ponto de Apoio
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="px-4 py-6 -mt-6 relative">
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-6">
          <div className="flex justify-between items-start mb-3">
            <h1 className="text-2xl font-bold text-gray-900">{merchant.name}</h1>
            <div className="flex items-center space-x-1">
              <Star className="w-5 h-5 text-yellow-500 fill-current" />
              <span className="font-medium text-gray-900">4.8</span>
            </div>
          </div>

          <p className="text-gray-500 capitalize mb-4">{merchant.category}</p>

          <p className="text-gray-600 mb-4">{merchant.description}</p>

          <div className="flex items-center space-x-4 text-sm text-gray-500 mb-4">
            <div className="flex items-center space-x-1">
              <MapPin className="w-4 h-4" />
              <span>{merchant.distance}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Clock className="w-4 h-4" />
              <span>{merchant.hours}</span>
            </div>
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-gray-100">
            <span className="text-green-600 font-medium">{merchant.benefit}</span>
            <span className={cn(
              "inline-flex items-center px-3 py-1 rounded-full text-sm font-medium",
              merchant.isOpen ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
            )}>
              {merchant.isOpen ? "Aberto agora" : "Fechado"}
            </span>
          </div>
        </div>

        {/* Offers */}
        {merchantOffers.length > 0 && (
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Ofertas disponíveis</h2>
            <div className="space-y-3">
              {merchantOffers.map((offer) => (
                <div
                  key={offer.id}
                  className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow border border-gray-100 cursor-pointer"
                  onClick={() => handleOfferSelect(offer.id)}
                >
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-medium text-gray-900">{offer.title}</h3>
                    <span className="text-green-600 font-bold">-{offer.discount}%</span>
                  </div>
                  <p className="text-sm text-gray-500 mb-3">{offer.description}</p>
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-gray-400 line-through text-sm">
                        R$ {offer.originalPrice.toFixed(2)}
                      </span>
                      <span className="text-xl font-bold text-gray-900 ml-2">
                        R$ {offer.finalPrice.toFixed(2)}
                      </span>
                    </div>
                    <div className="flex items-center space-x-1 text-blue-600">
                      <span className="text-sm font-medium">{offer.cashback}% cashback</span>
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Regular Purchase */}
        <div className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow border border-gray-100 cursor-pointer">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium text-gray-900">Compra regular</h3>
              <p className="text-sm text-gray-500">Use seu saldo normalmente</p>
            </div>
            <div className="flex items-center space-x-1 text-blue-600">
              <span className="text-sm font-medium">{merchant.cashback}% cashback</span>
              <ArrowRight className="w-4 h-4" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
