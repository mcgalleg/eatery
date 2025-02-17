import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { Button } from "@/components/ui/button"
import { ContactForm } from "./ContactForm"
import { formSchema } from "./ContactForm.schema"

export function ContactDrawer() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState({ success: false, message: "" })
  const [open, setOpen] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      eventDate: undefined,
      guestCount: undefined,
      eventLocation: "",
      eventType: undefined,
      package: undefined,
      message: "",
    },
  })

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsSubmitting(true)
    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      })

      if (!response.ok) {
        throw new Error("Failed to send message")
      }

      const responseData = await response.json();

      setSubmitStatus({
        success: true,
        message: responseData.message || "Your message has been sent successfully!",
      })
      form.reset()
      setTimeout(() => setOpen(false), 3000)
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Failed to send message. Please try again.";
      setSubmitStatus({
        success: false,
        message: errorMessage,
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button
          variant="default"
          className="flex items-center gap-2 px-4 py-2 bg-gray-500 text-white rounded-full hover:bg-orange hover:text-gray-700 transition-opacity"
        >
          📝 <span>Receive Quote</span>
        </Button>
      </DrawerTrigger>
      <DrawerContent
        style={{ backgroundImage: "url('/texture-transparent.webp')" }}
        className="bg-black text-white h-[90vh] md:h-[75vh] bg-cover bg-repeat"
      >
        <div className="w-full h-full flex flex-col overflow-hidden">
          <DrawerHeader className="text-center">
            <DrawerTitle className="text-2xl font-bold text-white">Request a Catering Estimate</DrawerTitle>
            <DrawerDescription className="text-gray-400">
              Fill out the form below and we'll get back to you with a detailed quote.
            </DrawerDescription>
          </DrawerHeader>
          <div className="flex-1 overflow-y-auto">
            <div className="p-4 md:p-6">
              <div className="max-w-7xl mx-auto">
                <ContactForm
                  form={form}
                  onSubmit={onSubmit}
                  isSubmitting={isSubmitting}
                  submitStatus={submitStatus}
                />
              </div>
            </div>
          </div>
          <DrawerFooter>
            <div className="relative flex justify-end">
              {submitStatus.message && (
                <div className={`absolute inset-x-0 bottom-full mb-2 flex items-center justify-center p-2 rounded-md z-10 ${
                  submitStatus.success ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'
                }`}>
                  {submitStatus.message}
                </div>
              )}
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-auto bg-orange text-gray-700 rounded-full px-4 py-2 hover:bg-white hover:text-gray-700 transition-colors relative z-0"
                onClick={form.handleSubmit(onSubmit)}
              >
                {isSubmitting ? "Sending..." : "Send Message"}
              </Button>
            </div>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  )
} 