export interface User {
  id: string
  name: string
  territory: string
  balance: number
  impact: number
  level: string
}

export interface Merchant {
  id: string
  name: string
  category: string
  image: string
  distance: string
  benefit: string
  cashback: number
  hours: string
  isOpen: boolean
  description: string
  isSupportPoint?: boolean
}

export interface Offer {
  id: string
  merchantId: string
  title: string
  description: string
  discount: number
  cashback: number
  originalPrice: number
  finalPrice: number
}

export interface Transaction {
  id: string
  merchantId: string
  merchantName: string
  amount: number
  cashback: number
  impact: number
  date: Date
  type: 'purchase' | 'cashback' | 'donation'
}

export interface ImpactData {
  myImpact: number
  communityImpact: number
  familiesImpacted: number
  categories: {
    name: string
    amount: number
    percentage: number
  }[]
}

export interface SafetyArea {
  id: string
  name: string
  riskLevel: 'low' | 'medium' | 'high'
  incidents: number
  coordinates: { lat: number; lng: number }
}

export interface SupportPoint {
  id: string
  merchantId: string
  name: string
  type: string
  hours: string
  distance: string
  coordinates: { lat: number; lng: number }
}
