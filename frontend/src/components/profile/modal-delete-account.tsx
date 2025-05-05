"use client"

import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { XCircle, AlertTriangle } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

// Form schema with validation - using string() without refinement for the type
// but still adding validation logic
const deleteAccountSchema = z.object({
  confirmText: z.string()
})

// Type for our form values
type DeleteAccountFormValues = {
  confirmText: string
}

export function DeleteAccountModal() {
  const [isOpen, setIsOpen] = useState(false)
  
  // Required confirmation text
  const requiredConfirmation = "DELETE"
  
  // Setup form with validation
  const form = useForm<DeleteAccountFormValues>({
    resolver: zodResolver(deleteAccountSchema),
    defaultValues: {
      confirmText: "",
    },
    mode: "onChange"
  })

  // Handle the actual account deletion
  const onSubmit = (values: DeleteAccountFormValues) => {
    // Only proceed if the text matches the confirmation
    if (values.confirmText === requiredConfirmation) {
      console.log("Account deletion confirmed with:", values)
      // Reset form and close modal
      form.reset()
      setIsOpen(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => {
      setIsOpen(open)
      if (!open) form.reset()
    }}>
      <DialogTrigger asChild>
        <Button variant="ghost" className="text-destructive hover:bg-transparent p-0 hover:text-destructive flex items-center gap-2">
          <XCircle className="w-5 h-5" />
          Close Account
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-destructive">Delete Your Account</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete your account and all associated data.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <Alert variant="destructive">
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>Warning</AlertTitle>
            <AlertDescription>
              Deleting your account is permanent and cannot be reversed.
            </AlertDescription>
          </Alert>
          
          <div className="text-sm text-muted-foreground">
            <p>You will lose access to:</p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>Matched jobs information</li>
              <li>Followed employers</li>
              <li>Job alerts</li>
              <li>Shortlisted jobs</li>
              <li>Your profile data</li>
            </ul>
          </div>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="confirmText"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Type <span className="font-bold">{requiredConfirmation}</span> to confirm
                    </FormLabel>
                    <FormControl>
                      <Input 
                        placeholder={requiredConfirmation}
                        className="border-destructive focus-visible:ring-destructive"
                        {...field}
                      />
                    </FormControl>
                    {field.value !== requiredConfirmation && field.value && (
                      <FormMessage>
                        Please type DELETE to confirm
                      </FormMessage>
                    )}
                  </FormItem>
                )}
              />
              
              <DialogFooter>
                <Button 
                  type="button"
                  variant="outline" 
                  onClick={() => setIsOpen(false)}
                  className="mr-2"
                >
                  Cancel
                </Button>
                <Button 
                  type="submit"
                  variant="destructive" 
                  disabled={form.watch("confirmText") !== requiredConfirmation}
                >
                  Delete Account
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  )
}
