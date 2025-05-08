// Adapted from shadcn-ui toast component
// https://github.com/shadcn-ui/ui/blob/main/apps/www/registry/default/ui/use-toast.ts

import { useEffect, useState } from "react"

export type ToastProps = {
  title?: string
  description?: string
  variant?: "default" | "destructive"
  duration?: number
}

export type Toast = ToastProps & {
  id: string
  onDismiss: () => void
}

type ToastState = {
  toasts: Toast[]
  addToast: (toast: ToastProps) => void
  dismissToast: (id: string) => void
}

// Simple global state for toasts
let toasts: Toast[] = []
let listeners: ((toasts: Toast[]) => void)[] = []

const notifyListeners = () => {
  listeners.forEach((listener) => listener([...toasts]))
}

// Generate a random ID
const generateId = () => Math.random().toString(36).substring(2, 9)

export function useToast(): ToastState {
  const [state, setState] = useState<Toast[]>([])

  useEffect(() => {
    const listener = (updatedToasts: Toast[]) => {
      setState(updatedToasts)
    }
    
    listeners.push(listener)
    listener([...toasts])
    
    return () => {
      listeners = listeners.filter((l) => l !== listener)
    }
  }, [])

  const addToast = (toast: ToastProps) => {
    const id = generateId()
    
    const newToast: Toast = {
      ...toast,
      id,
      onDismiss: () => dismissToast(id),
    }
    
    toasts = [...toasts, newToast]
    notifyListeners()
    
    // Auto dismiss after duration
    if (toast.duration !== Infinity) {
      setTimeout(() => {
        dismissToast(id)
      }, toast.duration || 5000)
    }
  }

  const dismissToast = (id: string) => {
    toasts = toasts.filter((toast) => toast.id !== id)
    notifyListeners()
  }

  return {
    toasts: state,
    addToast,
    dismissToast,
  }
} 