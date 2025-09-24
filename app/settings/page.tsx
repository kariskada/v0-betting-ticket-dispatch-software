"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Store, MessageSquare, Bell, Shield, Trash2, Plus } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { useAuth } from "@/contexts/auth-context"

interface Shop {
  id: string
  name: string
  telegramChatId: string
  whatsappNumber: string
  defaultStake: number
  isActive: boolean
}

interface MessageTemplate {
  id: string
  name: string
  content: string
  type: "telegram" | "whatsapp"
}

export default function SettingsPage() {
  const { user } = useAuth()
  const { toast } = useToast()

  const [shops, setShops] = useState<Shop[]>([
    {
      id: "1",
      name: "Shop Milano Centro",
      telegramChatId: "@shop_milano_centro",
      whatsappNumber: "+39 123 456 7890",
      defaultStake: 100,
      isActive: true,
    },
    {
      id: "2",
      name: "Shop Roma Termini",
      telegramChatId: "@shop_roma_termini",
      whatsappNumber: "+39 123 456 7891",
      defaultStake: 150,
      isActive: true,
    },
    {
      id: "3",
      name: "Shop Napoli Centro",
      telegramChatId: "@shop_napoli_centro",
      whatsappNumber: "+39 123 456 7892",
      defaultStake: 75,
      isActive: false,
    },
  ])

  const [messageTemplates, setMessageTemplates] = useState<MessageTemplate[]>([
    {
      id: "1",
      name: "Standard Ticket",
      content:
        "🎯 New Ticket\n\nMatch: {match}\nOdds: {odds}\nStake: €{stake}\nPotential Win: €{potential_win}\n\nTicket ID: {ticket_id}",
      type: "telegram",
    },
    {
      id: "2",
      name: "WhatsApp Ticket",
      content:
        "New betting ticket:\n\n📊 Match: {match}\n💰 Odds: {odds}\n💵 Stake: €{stake}\n🎯 Potential: €{potential_win}\n\nID: {ticket_id}",
      type: "whatsapp",
    },
  ])

  const [notifications, setNotifications] = useState({
    emailAlerts: true,
    systemNotifications: true,
    oddsChanges: false,
    errorAlerts: true,
  })

  const [newShop, setNewShop] = useState({
    name: "",
    telegramChatId: "",
    whatsappNumber: "",
    defaultStake: 100,
  })

  const [newTemplate, setNewTemplate] = useState({
    name: "",
    content: "",
    type: "telegram" as "telegram" | "whatsapp",
  })

  const handleSaveShop = () => {
    if (!newShop.name || !newShop.telegramChatId) {
      toast({
        title: "Error",
        description: "Please fill in required fields",
        variant: "destructive",
      })
      return
    }

    const shop: Shop = {
      id: Date.now().toString(),
      ...newShop,
      isActive: true,
    }

    setShops([...shops, shop])
    setNewShop({ name: "", telegramChatId: "", whatsappNumber: "", defaultStake: 100 })

    toast({
      title: "Shop added",
      description: "New shop configuration saved successfully",
    })
  }

  const handleSaveTemplate = () => {
    if (!newTemplate.name || !newTemplate.content) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      })
      return
    }

    const template: MessageTemplate = {
      id: Date.now().toString(),
      ...newTemplate,
    }

    setMessageTemplates([...messageTemplates, template])
    setNewTemplate({ name: "", content: "", type: "telegram" })

    toast({
      title: "Template saved",
      description: "Message template created successfully",
    })
  }

  const toggleShopStatus = (shopId: string) => {
    setShops(shops.map((shop) => (shop.id === shopId ? { ...shop, isActive: !shop.isActive } : shop)))
    toast({
      title: "Shop status updated",
      description: "Shop configuration has been updated",
    })
  }

  const deleteShop = (shopId: string) => {
    setShops(shops.filter((shop) => shop.id !== shopId))
    toast({
      title: "Shop deleted",
      description: "Shop configuration has been removed",
    })
  }

  const deleteTemplate = (templateId: string) => {
    setMessageTemplates(messageTemplates.filter((template) => template.id !== templateId))
    toast({
      title: "Template deleted",
      description: "Message template has been removed",
    })
  }

  const handleNotificationChange = (key: keyof typeof notifications) => {
    setNotifications({ ...notifications, [key]: !notifications[key] })
    toast({
      title: "Settings updated",
      description: "Notification preferences have been saved",
    })
  }

  return (
    <div className="space-y-6">
      <Tabs defaultValue="shops" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="shops">Shops</TabsTrigger>
          <TabsTrigger value="templates">Templates</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="system">System</TabsTrigger>
        </TabsList>

        {/* Shop Configuration */}
        <TabsContent value="shops" className="space-y-6">
          <Card className="border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Store className="h-5 w-5" />
                Shop Configuration
              </CardTitle>
              <CardDescription>Manage betting shops and their communication settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Existing Shops */}
              <div className="space-y-4">
                {shops.map((shop) => (
                  <div key={shop.id} className="p-4 bg-muted/30 rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <h3 className="font-medium">{shop.name}</h3>
                        <Badge variant={shop.isActive ? "default" : "secondary"}>
                          {shop.isActive ? "Active" : "Inactive"}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-2">
                        <Switch checked={shop.isActive} onCheckedChange={() => toggleShopStatus(shop.id)} />
                        <Button variant="ghost" size="sm" onClick={() => deleteShop(shop.id)}>
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground">Telegram</p>
                        <p className="font-mono">{shop.telegramChatId}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">WhatsApp</p>
                        <p className="font-mono">{shop.whatsappNumber || "Not configured"}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Default Stake</p>
                        <p className="font-mono">€{shop.defaultStake}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Add New Shop */}
              {user?.role === "admin" && (
                <div className="border-t pt-6">
                  <h3 className="font-medium mb-4 flex items-center gap-2">
                    <Plus className="h-4 w-4" />
                    Add New Shop
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="shop-name">Shop Name *</Label>
                      <Input
                        id="shop-name"
                        value={newShop.name}
                        onChange={(e) => setNewShop({ ...newShop, name: e.target.value })}
                        placeholder="Shop Milano Centro"
                        className="bg-input border-border"
                      />
                    </div>
                    <div>
                      <Label htmlFor="telegram-id">Telegram Chat ID *</Label>
                      <Input
                        id="telegram-id"
                        value={newShop.telegramChatId}
                        onChange={(e) => setNewShop({ ...newShop, telegramChatId: e.target.value })}
                        placeholder="@shop_milano_centro"
                        className="bg-input border-border"
                      />
                    </div>
                    <div>
                      <Label htmlFor="whatsapp-number">WhatsApp Number</Label>
                      <Input
                        id="whatsapp-number"
                        value={newShop.whatsappNumber}
                        onChange={(e) => setNewShop({ ...newShop, whatsappNumber: e.target.value })}
                        placeholder="+39 123 456 7890"
                        className="bg-input border-border"
                      />
                    </div>
                    <div>
                      <Label htmlFor="default-stake">Default Stake (€)</Label>
                      <Input
                        id="default-stake"
                        type="number"
                        value={newShop.defaultStake}
                        onChange={(e) => setNewShop({ ...newShop, defaultStake: Number(e.target.value) })}
                        className="bg-input border-border"
                      />
                    </div>
                  </div>
                  <Button onClick={handleSaveShop} className="mt-4">
                    Add Shop
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Message Templates */}
        <TabsContent value="templates" className="space-y-6">
          <Card className="border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5" />
                Message Templates
              </CardTitle>
              <CardDescription>Configure message templates for ticket dispatch</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Existing Templates */}
              <div className="space-y-4">
                {messageTemplates.map((template) => (
                  <div key={template.id} className="p-4 bg-muted/30 rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <h3 className="font-medium">{template.name}</h3>
                        <Badge variant={template.type === "telegram" ? "default" : "secondary"} className="capitalize">
                          {template.type}
                        </Badge>
                      </div>
                      <Button variant="ghost" size="sm" onClick={() => deleteTemplate(template.id)}>
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
                    <div className="bg-muted/50 p-3 rounded font-mono text-sm whitespace-pre-wrap">
                      {template.content}
                    </div>
                  </div>
                ))}
              </div>

              {/* Add New Template */}
              {user?.role === "admin" && (
                <div className="border-t pt-6">
                  <h3 className="font-medium mb-4 flex items-center gap-2">
                    <Plus className="h-4 w-4" />
                    Add New Template
                  </h3>
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="template-name">Template Name</Label>
                        <Input
                          id="template-name"
                          value={newTemplate.name}
                          onChange={(e) => setNewTemplate({ ...newTemplate, name: e.target.value })}
                          placeholder="Standard Ticket"
                          className="bg-input border-border"
                        />
                      </div>
                      <div>
                        <Label htmlFor="template-type">Type</Label>
                        <select
                          id="template-type"
                          value={newTemplate.type}
                          onChange={(e) =>
                            setNewTemplate({ ...newTemplate, type: e.target.value as "telegram" | "whatsapp" })
                          }
                          className="w-full p-2 bg-input border border-border rounded-md"
                        >
                          <option value="telegram">Telegram</option>
                          <option value="whatsapp">WhatsApp</option>
                        </select>
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="template-content">Template Content</Label>
                      <Textarea
                        id="template-content"
                        value={newTemplate.content}
                        onChange={(e) => setNewTemplate({ ...newTemplate, content: e.target.value })}
                        placeholder="Enter template content with variables like {match}, {odds}, {stake}..."
                        rows={6}
                        className="bg-input border-border font-mono"
                      />
                      <p className="text-xs text-muted-foreground mt-2">
                        Available variables: {"{match}, {odds}, {stake}, {potential_win}, {ticket_id}"}
                      </p>
                    </div>
                  </div>
                  <Button onClick={handleSaveTemplate} className="mt-4">
                    Add Template
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notifications */}
        <TabsContent value="notifications" className="space-y-6">
          <Card className="border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5" />
                Notification Settings
              </CardTitle>
              <CardDescription>Configure system alerts and notifications</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Email Alerts</h3>
                    <p className="text-sm text-muted-foreground">Receive important system alerts via email</p>
                  </div>
                  <Switch
                    checked={notifications.emailAlerts}
                    onCheckedChange={() => handleNotificationChange("emailAlerts")}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">System Notifications</h3>
                    <p className="text-sm text-muted-foreground">In-app notifications for system events</p>
                  </div>
                  <Switch
                    checked={notifications.systemNotifications}
                    onCheckedChange={() => handleNotificationChange("systemNotifications")}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Odds Changes</h3>
                    <p className="text-sm text-muted-foreground">Alerts when odds change significantly</p>
                  </div>
                  <Switch
                    checked={notifications.oddsChanges}
                    onCheckedChange={() => handleNotificationChange("oddsChanges")}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Error Alerts</h3>
                    <p className="text-sm text-muted-foreground">Immediate alerts for system errors</p>
                  </div>
                  <Switch
                    checked={notifications.errorAlerts}
                    onCheckedChange={() => handleNotificationChange("errorAlerts")}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* System Settings */}
        <TabsContent value="system" className="space-y-6">
          <Card className="border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                System Settings
              </CardTitle>
              <CardDescription>Advanced system configuration and security settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-medium mb-2">System Information</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Version:</span>
                      <span className="font-mono">1.0.0</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Environment:</span>
                      <Badge variant="secondary">Development</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Last Updated:</span>
                      <span>Sep 24, 2025</span>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="font-medium mb-2">Security</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">2FA Status:</span>
                      <Badge variant="default">Enabled</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Session Timeout:</span>
                      <span>24 hours</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">API Rate Limit:</span>
                      <span>1000/hour</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
