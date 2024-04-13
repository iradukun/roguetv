"use client"

import { signOut } from "next-auth/react"
import { Button } from "./ui/button"

const Logout= ({}) => {
  return <Button onClick={() => void signOut()}>log out</Button>
}

export default Logout
