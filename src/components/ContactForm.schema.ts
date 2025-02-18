import * as z from "zod"

export const formSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().optional(),
  eventDate: z.preprocess((arg) => {
    if (typeof arg === "string" && arg.trim() !== "") {
      return new Date(arg)
    }
    if (arg instanceof Date) return arg
    return undefined
  }, z.date().optional()),
  eventTime: z.string().optional(),
  guestCount: z.preprocess((val) => {
    if (typeof val === "string" && val.trim() === "") return undefined
    return Number(val)
  }, z.number().optional()),
  eventType: z.enum(["Corporate", "Wedding", "Birthday", "Memorial Service", "Anniversary", "Other"]),
  package: z.enum(["Special Delivery", "Staffed Event", "Venue Reservation"]),
  eventLocation: z.string().optional(),
  message: z.string().optional(),
}) 