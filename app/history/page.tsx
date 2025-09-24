"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { History, Download, Search, Filter, TrendingUp, TrendingDown } from "lucide-react"
import { mockTickets, type Ticket } from "@/lib/mock-data"
import { useToast } from "@/hooks/use-toast"
import { EmptyState } from "@/components/ui/empty-state"

export default function HistoryPage() {
  const [tickets] = useState<Ticket[]>(mockTickets)
  const [filteredTickets, setFilteredTickets] = useState<Ticket[]>(mockTickets)
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const { toast } = useToast()

  // Filter tickets based on search and status
  const filterTickets = (search: string, status: string) => {
    let filtered = tickets

    if (search) {
      const lowercaseSearch = search.toLowerCase()
      filtered = filtered.filter(
        (ticket) =>
          ticket.match.toLowerCase().includes(lowercaseSearch) ||
          ticket.bookmaker.toLowerCase().includes(lowercaseSearch) ||
          ticket.id.toLowerCase().includes(lowercaseSearch),
      )
    }

    if (status !== "all") {
      filtered = filtered.filter((ticket) => ticket.status === status)
    }

    setFilteredTickets(filtered)
  }

  const handleSearchChange = (value: string) => {
    setSearchQuery(value)
    filterTickets(value, statusFilter)
  }

  const handleStatusFilterChange = (value: string) => {
    setStatusFilter(value)
    filterTickets(searchQuery, value)
  }

  const handleExport = () => {
    toast({
      title: "Export initiated",
      description: "Ticket history will be exported to CSV (mock functionality)",
    })
  }

  const getStatusBadge = (status: Ticket["status"]) => {
    switch (status) {
      case "won":
        return <Badge className="bg-success text-success-foreground">Won</Badge>
      case "lost":
        return <Badge variant="destructive">Lost</Badge>
      case "pending":
        return <Badge variant="secondary">Pending</Badge>
      case "cancelled":
        return <Badge variant="outline">Cancelled</Badge>
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const totalProfit = filteredTickets.reduce((sum, ticket) => sum + (ticket.profit || 0), 0)
  const winRate =
    filteredTickets.length > 0
      ? (filteredTickets.filter((t) => t.status === "won").length /
          filteredTickets.filter((t) => t.status !== "pending" && t.status !== "cancelled").length) *
        100
      : 0

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="border-border/50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Tickets</CardTitle>
            <History className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{filteredTickets.length}</div>
            <p className="text-xs text-muted-foreground">
              {tickets.length - filteredTickets.length > 0 && `${tickets.length - filteredTickets.length} filtered out`}
            </p>
          </CardContent>
        </Card>

        <Card className="border-border/50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Win Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{winRate.toFixed(1)}%</div>
            <p className="text-xs text-muted-foreground">
              {filteredTickets.filter((t) => t.status === "won").length} wins of{" "}
              {filteredTickets.filter((t) => t.status !== "pending" && t.status !== "cancelled").length} settled
            </p>
          </CardContent>
        </Card>

        <Card className="border-border/50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total P&L</CardTitle>
            {totalProfit >= 0 ? (
              <TrendingUp className="h-4 w-4 text-success" />
            ) : (
              <TrendingDown className="h-4 w-4 text-destructive" />
            )}
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${totalProfit >= 0 ? "text-success" : "text-destructive"}`}>
              €{totalProfit.toFixed(2)}
            </div>
            <p className="text-xs text-muted-foreground">Profit & Loss</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Actions */}
      <Card className="border-border/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Filters & Actions
          </CardTitle>
          <CardDescription>Search and filter your ticket history</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by match, bookmaker, or ticket ID..."
                value={searchQuery}
                onChange={(e) => handleSearchChange(e.target.value)}
                className="pl-10 bg-input border-border"
              />
            </div>
            <Select value={statusFilter} onValueChange={handleStatusFilterChange}>
              <SelectTrigger className="w-full sm:w-48 bg-input border-border">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="won">Won</SelectItem>
                <SelectItem value="lost">Lost</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
            <Button onClick={handleExport} variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Tickets Table */}
      <Card className="border-border/50">
        <CardHeader>
          <CardTitle>Ticket History</CardTitle>
          <CardDescription>Complete history of all dispatched tickets</CardDescription>
        </CardHeader>
        <CardContent>
          {filteredTickets.length > 0 ? (
            <div className="rounded-md border border-border">
              <Table>
                <TableHeader>
                  <TableRow className="border-border">
                    <TableHead>Ticket ID</TableHead>
                    <TableHead>Match</TableHead>
                    <TableHead>Bookmaker</TableHead>
                    <TableHead>Odds</TableHead>
                    <TableHead>Stake</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>P&L</TableHead>
                    <TableHead>Sent At</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredTickets.map((ticket) => (
                    <TableRow key={ticket.id} className="border-border">
                      <TableCell className="font-mono text-sm">{ticket.id}</TableCell>
                      <TableCell className="font-medium">{ticket.match}</TableCell>
                      <TableCell>{ticket.bookmaker}</TableCell>
                      <TableCell className="font-mono">{ticket.odds.toFixed(2)}</TableCell>
                      <TableCell className="font-mono">€{ticket.stake}</TableCell>
                      <TableCell>{getStatusBadge(ticket.status)}</TableCell>
                      <TableCell>
                        {ticket.profit !== undefined ? (
                          <span className={`font-mono ${ticket.profit >= 0 ? "text-success" : "text-destructive"}`}>
                            €{ticket.profit.toFixed(2)}
                          </span>
                        ) : (
                          <span className="text-muted-foreground">-</span>
                        )}
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">{formatDate(ticket.sentAt)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          ) : (
            <EmptyState
              icon={<History className="h-12 w-12" />}
              title="No tickets found"
              description="No tickets match your current search and filter criteria."
            />
          )}
        </CardContent>
      </Card>
    </div>
  )
}
