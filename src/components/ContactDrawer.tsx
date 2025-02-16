import { useState, useEffect } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import type { UseFormReturn } from "react-hook-form"
import * as z from "zod"
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerClose } from "@/components/ui/drawer"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Calendar as CalendarIcon } from "@/lib/icons"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

const formSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(1, "Phone number is required"),
  eventDate: z.string().optional(),
  guestCount: z.string().optional(),
  eventType: z.enum(["Corporate", "Wedding", "Birthday", "Memorial Service", "Other"]),
  package: z.enum(["Special Delivery", "Staffed Event", "Venue Reservation"]),
  venue: z.string().optional(),
  message: z.string().optional(),
})

interface ContactDrawerProps {
  isOpen: boolean
  onClose: () => void
}

export function ContactDrawer({ isOpen: initialIsOpen = false, onClose }: ContactDrawerProps) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(initialIsOpen)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<{ success: boolean; message: string }>({
    success: false,
    message: "",
  })

  useEffect(() => {
    const handleDrawerToggle = (event: Event) => {
      const customEvent = event as CustomEvent<{ isOpen: boolean }>
      setIsDrawerOpen(customEvent.detail.isOpen)
    }

    // Add event listener to window to ensure it catches events from any source
    window.addEventListener('toggleDrawer', handleDrawerToggle)

    // Cleanup
    return () => {
      window.removeEventListener('toggleDrawer', handleDrawerToggle)
    }
  }, []) // Empty dependency array means this only runs once on mount

  const handleClose = () => {
    setIsDrawerOpen(false)
    onClose()
  }

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      eventDate: "",
      guestCount: "",
      eventType: "Corporate",
      package: "Special Delivery",
      venue: "",
      message: "",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (isSubmitting) return
    setIsSubmitting(true)
    
    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      })
      
      const data = await response.json()
      
      if (response.ok) {
        setSubmitStatus({
          success: true,
          message: 'Thank you for your inquiry! We will get back to you shortly.'
        })
        setTimeout(() => {
          handleClose();
          form.reset();
          setSubmitStatus({ success: false, message: "" });
        }, 2000);
      } else {
        throw new Error(data.message || 'Something went wrong')
      }
    } catch (error) {
      setSubmitStatus({
        success: false,
        message: error instanceof Error ? error.message : 'Failed to send message. Please try again.'
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  function DatePickerField({ value, onChange }: { value?: string; onChange: (value: string) => void }) {
    return (
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" className="w-full text-left" tabIndex={0}>
            {value ? value : "Select date"}
            <CalendarIcon className="ml-2 h-4 w-4 text-muted-foreground" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="p-0">
          <Calendar
            mode="single"
            selected={value ? new Date(value) : undefined}
            onSelect={(date) => {
              if (date) {
                onChange(date.toISOString().split('T')[0]);
              }
            }}
          />
        </PopoverContent>
      </Popover>
    );
  }

  return (
    <Drawer open={isDrawerOpen} onClose={handleClose}>
      <DrawerContent className="mt-8 mx-4 flex flex-col h-[calc(100vh-1rem)] bg-white overflow-hidden z-50">
        <DrawerHeader>
          <DrawerTitle>Request a Quote</DrawerTitle>
          <DrawerClose onClick={handleClose} />
        </DrawerHeader>
        <div className="flex-1 min-h-0">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col h-full">
              <div className="flex-1 min-h-0 overflow-y-auto px-4">
                {submitStatus.message && (
                  <div className={`p-4 mb-4 rounded-lg ${
                    submitStatus.success ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                  }`}>
                    {submitStatus.message}
                  </div>
                )}
                <div className="mx-auto w-full max-w-2xl space-y-4">
                  {/* Row: First Name & Last Name */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="firstName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>First Name *</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="lastName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Last Name *</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* Email Field */}
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email *</FormLabel>
                        <FormControl>
                          <Input type="email" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Row: Phone & Number of Guests */}
                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone *</FormLabel>
                          <FormControl>
                            <Input type="tel" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="guestCount"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Number of Guests</FormLabel>
                          <FormControl>
                            <Input type="number" min="1" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* Event Date Field */}
                  <FormField
                    control={form.control}
                    name="eventDate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Event Date</FormLabel>
                        <FormControl>
                          <DatePickerField value={field.value} onChange={field.onChange} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Row: Event Type & Package (Always two columns on mobile and desktop) */}
                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="eventType"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Event Type</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select event type" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="Corporate">Corporate</SelectItem>
                              <SelectItem value="Wedding">Wedding</SelectItem>
                              <SelectItem value="Birthday">Birthday</SelectItem>
                              <SelectItem value="Memorial Service">Memorial Service</SelectItem>
                              <SelectItem value="Other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="package"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Package</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select package" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="Special Delivery">Special Delivery</SelectItem>
                              <SelectItem value="Staffed Event">Staffed Event</SelectItem>
                              <SelectItem value="Venue Reservation">Venue Reservation</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* Venue Field */}
                  <FormField
                    control={form.control}
                    name="venue"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Venue Address (if known)</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Additional Details */}
                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Additional Details</FormLabel>
                        <FormControl>
                          <Textarea rows={4} {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
              <div className="px-4 py-4 bg-white border-t">
                <Button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full bg-orange text-white rounded-full border border-orange hover:bg-gray-500 hover:border-gray-500"
                >
                  {isSubmitting ? 'Sending...' : 'Submit Request'}
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </DrawerContent>
    </Drawer>
  )
} 