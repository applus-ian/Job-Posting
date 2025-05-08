"use client"

import * as React from "react"
import { Toast, useToast } from "./use-toast"
import { CheckCircle, XCircle, X } from "lucide-react"

// Toast component to display a single toast notification
export function ToastComponent({ toast }: { toast: Toast }) {
  const { title, description, variant = "default", onDismiss } = toast

  return (
    <div
      className={`fixed top-4 right-4 p-4 rounded-md shadow-lg max-w-md z-50 transform transition-all duration-300 ease-in-out bg-white border 
      ${variant === "destructive" ? "border-red-400" : "border-green-400"}`}
    >
      <div className="flex items-start gap-3">
        {variant === "destructive" ? (
          <XCircle className="h-5 w-5 text-red-500 mt-0.5" />
        ) : (
          <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
        )}
        
        <div className="flex-1">
          {title && (
            <h3 className={`font-medium ${variant === "destructive" ? "text-red-700" : "text-gray-900"}`}>
              {title}
            </h3>
          )}
          {description && (
            <p className="text-sm text-gray-600 mt-1">{description}</p>
          )}
        </div>
        
        <button
          className="rounded-full p-1 hover:bg-gray-100"
          onClick={onDismiss}
        >
          <X className="h-4 w-4 text-gray-500" />
        </button>
      </div>
    </div>
  )
}

// ToastContainer to render all active toasts
export function ToastContainer() {
  const { toasts } = useToast()

  if (toasts.length === 0) {
    return null
  }

  return (
    <div className="fixed top-0 right-0 p-4 z-50 flex flex-col space-y-4">
      {toasts.map((toast) => (
        <ToastComponent key={toast.id} toast={toast} />
      ))}
    </div>
  )
} 