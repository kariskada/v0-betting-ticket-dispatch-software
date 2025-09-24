"use client"
import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"
import { Search, Send, Clock, TrendingUp, AlertCircle, Zap } from "lucide-react"
import { searchMatches, mockBookmakerOdds, type Match, type BookmakerOdds } from "@/lib/mock-data"
import { EmptyState } from "@/components/ui/empty-state"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

import { LoadingSpinner } from "@/components/ui/loading-spinner"

export default function SearchPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedMatch, setSelectedMatch] = useState<Match | null>(null)
  const [bookmakerOdds, setBookmakerOdds] = useState<BookmakerOdds[]>(mockBookmakerOdds)
  const [isLoadingOdds, setIsLoadingOdds] = useState(false)
  const [confirmDialog, setConfirmDialog] = useState<{
    open: boolean
    bookmaker: BookmakerOdds | null
  }>({ open: false, bookmaker: null })
  const { toast } = useToast()

  const matches = searchMatches(searchQuery)

  const handleMatchSelect = async (match: Match) => {
    setSelectedMatch(match)
    setIsLoadingOdds(true)

    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 800))

    // Simulate odds loading with slight variations
    const updatedOdds = mockBookmakerOdds.map((bookmaker) => ({
      ...bookmaker,
      odds: bookmaker.odds + (Math.random() - 0.5) * 0.1,
    }))
    setBookmakerOdds(updatedOdds)
    setIsLoadingOdds(false)
  }

  const handleStakeChange = (bookmakerId: string, newStake: number) => {
    setBookmakerOdds((prev) =>
      prev.map((bookmaker) => (bookmaker.id === bookmakerId ? { ...bookmaker, stake: newStake } : bookmaker)),
    )
  }

  const handleSendTicket = (bookmaker: BookmakerOdds) => {
    setConfirmDialog({ open: true, bookmaker })
  }

  const confirmSendTicket = () => {
    const { bookmaker } = confirmDialog
    if (!bookmaker || !selectedMatch) return

    // Simulate ticket sending
    toast({
      title: "Ticket sent successfully!",
      description: `Ticket dispatched to ${bookmaker.name} via Telegram`,
    })

    setConfirmDialog({ open: false, bookmaker: null })
  }

  return (
    <div className="space-y-6">
      {/* Search Section */}
      <Card className="border-border/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="h-5 w-5" />
            Match Search
          </CardTitle>
          <CardDescription>Search for matches by team name, league, or event</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search matches (e.g., Real Madrid, Barcelona, Serie A...)"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-input border-border"
            />
          </div>

          {/* Search Results */}
          <div className="mt-4">
            {matches.length > 0 ? (
              <div className="space-y-2 max-h-60 overflow-y-auto">
                {matches.map((match) => (
                  <div
                    key={match.id}
                    className={`p-4 rounded-lg border cursor-pointer transition-colors ${
                      selectedMatch?.id === match.id
                        ? "border-primary bg-primary/5"
                        : "border-border hover:border-border/80 hover:bg-muted/30"
                    }`}
                    onClick={() => handleMatchSelect(match)}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">
                          {match.homeTeam} vs {match.awayTeam}
                        </h3>
                        <p className="text-sm text-muted-foreground">{match.league}</p>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">
                            {match.date} {match.time}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : searchQuery ? (
              <EmptyState
                icon={<Search className="h-12 w-12" />}
                title="No matches found"
                description={`No matches found for "${searchQuery}". Try searching with different terms.`}
              />
            ) : (
              <EmptyState
                icon={<Zap className="h-12 w-12" />}
                title="Start searching"
                description="Enter a team name, league, or match to find betting opportunities."
              />
            )}
          </div>
        </CardContent>
      </Card>

      {/* Bookmaker Odds Section */}
      {selectedMatch && (
        <Card className="border-border/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Bookmaker Odds - {selectedMatch.homeTeam} vs {selectedMatch.awayTeam}
            </CardTitle>
            <CardDescription>Select bookmakers and configure stakes for ticket dispatch</CardDescription>
          </CardHeader>
          <CardContent>
            {isLoadingOdds ? (
              <div className="flex items-center justify-center py-12">
                <div className="flex items-center gap-3">
                  <LoadingSpinner size="md" />
                  <span className="text-muted-foreground">Loading odds from bookmakers...</span>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                {bookmakerOdds.map((bookmaker) => (
                  <div
                    key={bookmaker.id}
                    className={`p-4 rounded-lg border ${
                      bookmaker.available ? "border-border bg-card" : "border-border/50 bg-muted/30 opacity-60"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <img
                          src={bookmaker.logo || "/placeholder.svg"}
                          alt={`${bookmaker.name} logo`}
                          className="w-8 h-8 rounded"
                        />
                        <div>
                          <h3 className="font-medium">{bookmaker.name}</h3>
                          <div className="flex items-center gap-2">
                            <Badge variant={bookmaker.available ? "default" : "secondary"} className="text-xs">
                              {bookmaker.available ? "Available" : "Unavailable"}
                            </Badge>
                            {!bookmaker.available && <AlertCircle className="h-3 w-3 text-muted-foreground" />}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <p className="text-2xl font-bold">{bookmaker.odds.toFixed(2)}</p>
                          <p className="text-xs text-muted-foreground">Odds</p>
                        </div>

                        <div className="flex items-center gap-2">
                          <span className="text-sm text-muted-foreground">€</span>
                          <Input
                            type="number"
                            value={bookmaker.stake}
                            onChange={(e) => handleStakeChange(bookmaker.id, Number(e.target.value))}
                            className="w-20 text-center bg-input border-border"
                            disabled={!bookmaker.available}
                          />
                        </div>

                        <Button
                          onClick={() => handleSendTicket(bookmaker)}
                          disabled={!bookmaker.available}
                          className="min-w-fit"
                        >
                          <Send className="h-4 w-4 mr-2" />
                          SEND
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Confirmation Dialog */}
      <Dialog open={confirmDialog.open} onOpenChange={(open) => setConfirmDialog({ ...confirmDialog, open })}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Ticket Dispatch</DialogTitle>
            <DialogDescription>
              Are you sure you want to send this ticket to {confirmDialog.bookmaker?.name}?
            </DialogDescription>
          </DialogHeader>

          {confirmDialog.bookmaker && selectedMatch && (
            <div className="py-4 space-y-2">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Match:</span>
                <span className="font-medium">
                  {selectedMatch.homeTeam} vs {selectedMatch.awayTeam}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Bookmaker:</span>
                <span className="font-medium">{confirmDialog.bookmaker.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Odds:</span>
                <span className="font-medium">{confirmDialog.bookmaker.odds.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Stake:</span>
                <span className="font-medium">€{confirmDialog.bookmaker.stake}</span>
              </div>
              <div className="flex justify-between border-t pt-2">
                <span className="text-muted-foreground">Potential Win:</span>
                <span className="font-bold text-success">
                  €{(confirmDialog.bookmaker.odds * confirmDialog.bookmaker.stake).toFixed(2)}
                </span>
              </div>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setConfirmDialog({ open: false, bookmaker: null })}>
              Cancel
            </Button>
            <Button onClick={confirmSendTicket}>
              <Send className="h-4 w-4 mr-2" />
              Send Ticket
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
