// Replace the entire register page to redirect to the new unified auth page
import { redirect } from "next/navigation"

export default function RegisterPage() {
  redirect("/auth")
}
