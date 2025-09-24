export interface User {
  id: string
  email: string
  name: string
  role: "admin" | "operator"
}

export interface AuthState {
  user: User | null
  isAuthenticated: boolean
}

// Mock users for demonstration
const mockUsers: User[] = [
  {
    id: "1",
    email: "admin@bettingdispatch.com",
    name: "Admin User",
    role: "admin",
  },
  {
    id: "2",
    email: "operator@bettingdispatch.com",
    name: "Operator User",
    role: "operator",
  },
]

export const mockLogin = async (email: string, password: string): Promise<User | null> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1000))

  // Mock authentication logic
  const user = mockUsers.find((u) => u.email === email)
  if (user && password === "password123") {
    return user
  }
  return null
}

export const mockLogout = async (): Promise<void> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500))
}
