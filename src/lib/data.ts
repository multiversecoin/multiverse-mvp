import { User, Merchant, Offer, Transaction, ImpactData, SafetyArea, SupportPoint } from "@/types"

export const demoUser: User = {
  id: "1",
  name: "Lucas",
  territory: "Moema, São Paulo",
  balance: 2458.75,
  impact: 18.42,
  level: "Ouro"
}

export const demoMerchants: Merchant[] = [
  {
    id: "1",
    name: "Café Aurora",
    category: "cafés",
    image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&h=300&fit=crop",
    distance: "350 m",
    benefit: "5% cashback",
    cashback: 5,
    hours: "07:00 - 22:30",
    isOpen: true,
    description: "Café especialista em grãos brasileiros com ambiente acolhedor.",
    isSupportPoint: true
  },
  {
    id: "2",
    name: "Restaurante Vila Madalena",
    category: "restaurantes",
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400&h=300&fit=crop",
    distance: "800 m",
    benefit: "3% cashback",
    cashback: 3,
    hours: "11:30 - 23:00",
    isOpen: true,
    description: "Comida contemporânea brasileira com ingredientes locais."
  },
  {
    id: "3",
    name: "Mercado do Bairro",
    category: "mercados",
    image: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=400&h=300&fit=crop",
    distance: "200 m",
    benefit: "2% cashback",
    cashback: 2,
    hours: "08:00 - 20:00",
    isOpen: true,
    description: "Supermercado com produtos frescos e itens de mercearia."
  },
  {
    id: "4",
    name: "Padaria Central",
    category: "padarias",
    image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400&h=300&fit=crop",
    distance: "150 m",
    benefit: "4% cashback",
    cashback: 4,
    hours: "06:00 - 20:00",
    isOpen: true,
    description: "Pães artesanais e doces tradicionais feitos diariamente."
  },
  {
    id: "5",
    name: "Studio Beleza",
    category: "beleza",
    image: "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=400&h=300&fit=crop",
    distance: "600 m",
    benefit: "6% cashback",
    cashback: 6,
    hours: "09:00 - 19:00",
    isOpen: true,
    description: "Salão de beleza completo com serviços de cabelo e estética."
  },
  {
    id: "6",
    name: "Academia Fit",
    category: "academia",
    image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400&h=300&fit=crop",
    distance: "1.2 km",
    benefit: "7% cashback",
    cashback: 7,
    hours: "05:00 - 23:00",
    isOpen: true,
    description: "Academia completa com equipamentos modernos e personal trainers."
  },
  {
    id: "7",
    name: "Pet Shop Amigo",
    category: "pet",
    image: "https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=400&h=300&fit=crop",
    distance: "450 m",
    benefit: "5% cashback",
    cashback: 5,
    hours: "08:00 - 19:00",
    isOpen: true,
    description: "Banho, tosa e produtos para pets."
  },
  {
    id: "8",
    name: "Serviços Rápidos",
    category: "serviços",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&h=300&fit=crop",
    distance: "300 m",
    benefit: "4% cashback",
    cashback: 4,
    hours: "08:00 - 18:00",
    isOpen: true,
    description: "Serviços gerais e manutenção."
  },
  {
    id: "9",
    name: "Cinema Moema",
    category: "cultura",
    image: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=400&h=300&fit=crop",
    distance: "900 m",
    benefit: "8% cashback",
    cashback: 8,
    hours: "13:00 - 23:00",
    isOpen: true,
    description: "Cinema com programação variada e snacks."
  },
  {
    id: "10",
    name: "Livraria Cultura",
    category: "cultura",
    image: "https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=400&h=300&fit=crop",
    distance: "700 m",
    benefit: "6% cashback",
    cashback: 6,
    hours: "10:00 - 22:00",
    isOpen: true,
    description: "Livraria com amplo acervo e espaço para leitura."
  }
]

export const demoOffers: Offer[] = [
  {
    id: "1",
    merchantId: "1",
    title: "Café Expresso + Bolo",
    description: "Combo especial para começar o dia",
    discount: 15,
    cashback: 5,
    originalPrice: 25.00,
    finalPrice: 21.25
  },
  {
    id: "2",
    merchantId: "2",
    title: "Almoço Executivo",
    description: "Prato do dia com bebida inclusa",
    discount: 20,
    cashback: 3,
    originalPrice: 45.00,
    finalPrice: 36.00
  },
  {
    id: "3",
    merchantId: "4",
    title: "Cesta de Pães",
    description: "6 pães artesanais variados",
    discount: 10,
    cashback: 4,
    originalPrice: 30.00,
    finalPrice: 27.00
  },
  {
    id: "4",
    merchantId: "5",
    title: "Corte + Hidratação",
    description: "Combo de cabelo completo",
    discount: 25,
    cashback: 6,
    originalPrice: 120.00,
    finalPrice: 90.00
  },
  {
    id: "5",
    merchantId: "6",
    title: "Mensal + Avaliação",
    description: "Mensalidade com avaliação física",
    discount: 30,
    cashback: 7,
    originalPrice: 150.00,
    finalPrice: 105.00
  }
]

export const demoTransactions: Transaction[] = [
  {
    id: "1",
    merchantId: "1",
    merchantName: "Café Aurora",
    amount: 18.50,
    cashback: 0.93,
    impact: 0.09,
    date: new Date("2026-09-12T09:30:00"),
    type: "purchase"
  },
  {
    id: "2",
    merchantId: "4",
    merchantName: "Padaria Central",
    amount: 12.00,
    cashback: 0.48,
    impact: 0.06,
    date: new Date("2026-09-12T07:15:00"),
    type: "purchase"
  },
  {
    id: "3",
    merchantId: "2",
    merchantName: "Restaurante Vila Madalena",
    amount: 68.00,
    cashback: 2.04,
    impact: 0.34,
    date: new Date("2026-09-11T19:45:00"),
    type: "purchase"
  },
  {
    id: "4",
    merchantId: "3",
    merchantName: "Mercado do Bairro",
    amount: 145.00,
    cashback: 2.90,
    impact: 0.73,
    date: new Date("2026-09-11T16:20:00"),
    type: "purchase"
  },
  {
    id: "5",
    merchantId: "5",
    merchantName: "Studio Beleza",
    amount: 85.00,
    cashback: 5.10,
    impact: 0.43,
    date: new Date("2026-09-10T14:00:00"),
    type: "purchase"
  },
  {
    id: "6",
    merchantId: "7",
    merchantName: "Pet Shop Amigo",
    amount: 45.00,
    cashback: 2.25,
    impact: 0.23,
    date: new Date("2026-09-10T10:30:00"),
    type: "purchase"
  },
  {
    id: "7",
    merchantId: "9",
    merchantName: "Cinema Moema",
    amount: 32.00,
    cashback: 2.56,
    impact: 0.16,
    date: new Date("2026-09-09T20:00:00"),
    type: "purchase"
  },
  {
    id: "8",
    merchantId: "1",
    merchantName: "Café Aurora",
    amount: 22.00,
    cashback: 1.10,
    impact: 0.11,
    date: new Date("2026-09-09T08:00:00"),
    type: "purchase"
  },
  {
    id: "9",
    merchantId: "6",
    merchantName: "Academia Fit",
    amount: 150.00,
    cashback: 10.50,
    impact: 0.75,
    date: new Date("2026-09-08T06:00:00"),
    type: "purchase"
  },
  {
    id: "10",
    merchantId: "10",
    merchantName: "Livraria Cultura",
    amount: 89.00,
    cashback: 5.34,
    impact: 0.45,
    date: new Date("2026-09-07T15:30:00"),
    type: "purchase"
  }
]

export const demoImpactData: ImpactData = {
  myImpact: 18.42,
  communityImpact: 12450.00,
  familiesImpacted: 17,
  categories: [
    { name: "Alimentação", amount: 5.50, percentage: 30 },
    { name: "Educação", amount: 4.20, percentage: 23 },
    { name: "Infância", amount: 3.70, percentage: 20 },
    { name: "Idosos", amount: 2.80, percentage: 15 },
    { name: "Empregabilidade", amount: 2.22, percentage: 12 }
  ]
}

export const demoSafetyAreas: SafetyArea[] = [
  {
    id: "1",
    name: "Rua dos Pinheiros/Moaci",
    riskLevel: "medium",
    incidents: 6,
    coordinates: { lat: -23.5615, lng: -46.6850 }
  },
  {
    id: "2",
    name: "Av. Ibirapuera (trecho norte)",
    riskLevel: "low",
    incidents: 3,
    coordinates: { lat: -23.5620, lng: -46.6880 }
  },
  {
    id: "3",
    name: "Praça Moema/SESC",
    riskLevel: "low",
    incidents: 1,
    coordinates: { lat: -23.5650, lng: -46.6900 }
  }
]

export const demoSupportPoints: SupportPoint[] = [
  {
    id: "1",
    merchantId: "1",
    name: "Café Aurora",
    type: "Ponto de Apoio",
    hours: "07:00 - 22:30",
    distance: "350 m",
    coordinates: { lat: -23.5630, lng: -46.6860 }
  },
  {
    id: "2",
    merchantId: "4",
    name: "Padaria Central",
    type: "Ponto de Apoio",
    hours: "06:00 - 20:00",
    distance: "150 m",
    coordinates: { lat: -23.5640, lng: -46.6870 }
  },
  {
    id: "3",
    merchantId: "9",
    name: "Cinema Moema",
    type: "Ponto de Apoio",
    hours: "13:00 - 23:00",
    distance: "900 m",
    coordinates: { lat: -23.5660, lng: -46.6890 }
  },
  {
    id: "4",
    merchantId: "3",
    name: "Mercado do Bairro",
    type: "Ponto de Apoio",
    hours: "08:00 - 20:00",
    distance: "200 m",
    coordinates: { lat: -23.5625, lng: -46.6845 }
  },
  {
    id: "5",
    merchantId: "2",
    name: "Restaurante Vila Madalena",
    type: "Ponto de Apoio",
    hours: "11:30 - 23:00",
    distance: "800 m",
    coordinates: { lat: -23.5670, lng: -46.6910 }
  }
]
