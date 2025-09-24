export interface Match {
  id: string
  homeTeam: string
  awayTeam: string
  league: string
  date: string
  time: string
}

export interface BookmakerOdds {
  id: string
  name: string
  logo: string
  odds: number
  stake: number
  available: boolean
}

export interface Ticket {
  id: string
  matchId: string
  match: string
  bookmaker: string
  odds: number
  stake: number
  status: "pending" | "won" | "lost" | "cancelled"
  sentAt: string
  result?: string
  profit?: number
}

// Mock matches data
export const mockMatches: Match[] = [
  {
    id: "1",
    homeTeam: "Real Madrid",
    awayTeam: "Barcelona",
    league: "La Liga",
    date: "2025-09-25",
    time: "20:00",
  },
  {
    id: "2",
    homeTeam: "Juventus",
    awayTeam: "Inter Milan",
    league: "Serie A",
    date: "2025-09-25",
    time: "18:00",
  },
  {
    id: "3",
    homeTeam: "AC Milan",
    awayTeam: "Napoli",
    league: "Serie A",
    date: "2025-09-26",
    time: "21:00",
  },
  {
    id: "4",
    homeTeam: "Manchester United",
    awayTeam: "Liverpool",
    league: "Premier League",
    date: "2025-09-26",
    time: "16:30",
  },
  {
    id: "5",
    homeTeam: "Bayern Munich",
    awayTeam: "Borussia Dortmund",
    league: "Bundesliga",
    date: "2025-09-27",
    time: "18:30",
  },
  {
    id: "6",
    homeTeam: "Paris Saint-Germain",
    awayTeam: "Olympique Marseille",
    league: "Ligue 1",
    date: "2025-09-27",
    time: "20:45",
  },
  {
    id: "7",
    homeTeam: "Atalanta",
    awayTeam: "AS Roma",
    league: "Serie A",
    date: "2025-09-28",
    time: "15:00",
  },
  {
    id: "8",
    homeTeam: "Chelsea",
    awayTeam: "Arsenal",
    league: "Premier League",
    date: "2025-09-28",
    time: "17:30",
  },
]

// Mock bookmaker odds
export const mockBookmakerOdds: BookmakerOdds[] = [
  {
    id: "eurobet",
    name: "Eurobet",
    logo: "/eurobet-logo.jpg",
    odds: 2.35,
    stake: 100,
    available: true,
  },
  {
    id: "snai",
    name: "Snai",
    logo: "/snai-logo.jpg",
    odds: 2.32,
    stake: 100,
    available: true,
  },
  {
    id: "sisal",
    name: "Sisal",
    logo: "/sisal-logo.jpg",
    odds: 2.3,
    stake: 100,
    available: true,
  },
  {
    id: "goldbet",
    name: "Goldbet",
    logo: "/goldbet-logo.jpg",
    odds: 2.27,
    stake: 100,
    available: false,
  },
  {
    id: "lottomatica",
    name: "Lottomatica",
    logo: "/lottomatica-logo.jpg",
    odds: 2.4,
    stake: 100,
    available: true,
  },
  {
    id: "betflag",
    name: "Betflag",
    logo: "/placeholder-logo.png",
    odds: 2.38,
    stake: 100,
    available: true,
  },
  {
    id: "planetwin365",
    name: "PlanetWin365",
    logo: "/placeholder-logo.png",
    odds: 2.33,
    stake: 100,
    available: true,
  },
  {
    id: "bwin",
    name: "Bwin",
    logo: "/placeholder-logo.png",
    odds: 2.29,
    stake: 100,
    available: false,
  },
]

// Mock ticket history
export const mockTickets: Ticket[] = [
  {
    id: "TKT-001",
    matchId: "1",
    match: "Real Madrid vs Barcelona",
    bookmaker: "Eurobet",
    odds: 2.35,
    stake: 100,
    status: "won",
    sentAt: "2025-09-24T14:30:00Z",
    result: "Real Madrid Win",
    profit: 135,
  },
  {
    id: "TKT-002",
    matchId: "2",
    match: "Juventus vs Inter Milan",
    bookmaker: "Snai",
    odds: 1.85,
    stake: 150,
    status: "lost",
    sentAt: "2025-09-24T16:15:00Z",
    result: "Inter Milan Win",
    profit: -150,
  },
  {
    id: "TKT-003",
    matchId: "3",
    match: "AC Milan vs Napoli",
    bookmaker: "Sisal",
    odds: 2.1,
    stake: 75,
    status: "pending",
    sentAt: "2025-09-24T18:45:00Z",
  },
  {
    id: "TKT-004",
    matchId: "1",
    match: "Real Madrid vs Barcelona",
    bookmaker: "Lottomatica",
    odds: 2.4,
    stake: 100,
    status: "won",
    sentAt: "2025-09-24T14:32:00Z",
    result: "Real Madrid Win",
    profit: 140,
  },
  {
    id: "TKT-005",
    matchId: "4",
    match: "Manchester United vs Liverpool",
    bookmaker: "Eurobet",
    odds: 3.2,
    stake: 50,
    status: "cancelled",
    sentAt: "2025-09-23T20:10:00Z",
    result: "Match Postponed",
  },
  {
    id: "TKT-006",
    matchId: "5",
    match: "Bayern Munich vs Borussia Dortmund",
    bookmaker: "Snai",
    odds: 1.95,
    stake: 200,
    status: "won",
    sentAt: "2025-09-23T19:20:00Z",
    result: "Bayern Munich Win",
    profit: 190,
  },
  {
    id: "TKT-007",
    matchId: "6",
    match: "Paris Saint-Germain vs Olympique Marseille",
    bookmaker: "Sisal",
    odds: 1.65,
    stake: 120,
    status: "won",
    sentAt: "2025-09-23T17:45:00Z",
    result: "PSG Win",
    profit: 78,
  },
  {
    id: "TKT-008",
    matchId: "7",
    match: "Atalanta vs AS Roma",
    bookmaker: "Goldbet",
    odds: 2.8,
    stake: 80,
    status: "lost",
    sentAt: "2025-09-22T16:30:00Z",
    result: "AS Roma Win",
    profit: -80,
  },
  {
    id: "TKT-009",
    matchId: "8",
    match: "Chelsea vs Arsenal",
    bookmaker: "Lottomatica",
    odds: 2.15,
    stake: 90,
    status: "pending",
    sentAt: "2025-09-22T15:15:00Z",
  },
  {
    id: "TKT-010",
    matchId: "2",
    match: "Juventus vs Inter Milan",
    bookmaker: "Eurobet",
    odds: 1.88,
    stake: 110,
    status: "lost",
    sentAt: "2025-09-22T14:00:00Z",
    result: "Inter Milan Win",
    profit: -110,
  },
  {
    id: "TKT-011",
    matchId: "3",
    match: "AC Milan vs Napoli",
    bookmaker: "Betflag",
    odds: 2.12,
    stake: 125,
    status: "won",
    sentAt: "2025-09-21T19:30:00Z",
    result: "AC Milan Win",
    profit: 140,
  },
  {
    id: "TKT-012",
    matchId: "4",
    match: "Manchester United vs Liverpool",
    bookmaker: "PlanetWin365",
    odds: 3.15,
    stake: 60,
    status: "lost",
    sentAt: "2025-09-21T16:45:00Z",
    result: "Liverpool Win",
    profit: -60,
  },
  {
    id: "TKT-013",
    matchId: "5",
    match: "Bayern Munich vs Borussia Dortmund",
    bookmaker: "Sisal",
    odds: 1.92,
    stake: 180,
    status: "won",
    sentAt: "2025-09-21T14:20:00Z",
    result: "Bayern Munich Win",
    profit: 165.6,
  },
  {
    id: "TKT-014",
    matchId: "1",
    match: "Real Madrid vs Barcelona",
    bookmaker: "Snai",
    odds: 2.32,
    stake: 95,
    status: "won",
    sentAt: "2025-09-20T18:15:00Z",
    result: "Real Madrid Win",
    profit: 125.4,
  },
  {
    id: "TKT-015",
    matchId: "6",
    match: "Paris Saint-Germain vs Olympique Marseille",
    bookmaker: "Eurobet",
    odds: 1.68,
    stake: 140,
    status: "won",
    sentAt: "2025-09-20T15:30:00Z",
    result: "PSG Win",
    profit: 95.2,
  },
]

// Utility functions for better data management
export const getTicketsByStatus = (status: Ticket["status"]) => {
  return mockTickets.filter((ticket) => ticket.status === status)
}

export const getTicketsByDateRange = (startDate: string, endDate: string) => {
  return mockTickets.filter((ticket) => {
    const ticketDate = new Date(ticket.sentAt).toISOString().split("T")[0]
    return ticketDate >= startDate && ticketDate <= endDate
  })
}

export const getTotalProfit = () => {
  return mockTickets.reduce((total, ticket) => {
    return total + (ticket.profit || 0)
  }, 0)
}

export const getSuccessRate = () => {
  const completedTickets = mockTickets.filter((ticket) => ticket.status === "won" || ticket.status === "lost")
  const wonTickets = mockTickets.filter((ticket) => ticket.status === "won")

  if (completedTickets.length === 0) return 0
  return (wonTickets.length / completedTickets.length) * 100
}

export const searchMatches = (query: string): Match[] => {
  if (!query) return mockMatches

  const lowercaseQuery = query.toLowerCase()
  return mockMatches.filter(
    (match) =>
      match.homeTeam.toLowerCase().includes(lowercaseQuery) ||
      match.awayTeam.toLowerCase().includes(lowercaseQuery) ||
      match.league.toLowerCase().includes(lowercaseQuery),
  )
}
