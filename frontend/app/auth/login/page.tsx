// Replace the entire login page to redirect to the new unified auth page
import { redirect } from "next/navigation"

export default function LoginPage() {
  redirect("/auth")
}
