'use client'

import { Button } from "@/components/ui/button"
import { authClient } from "@/lib/auth-client"
import { useRouter } from "next/navigation"

export function LogoutButton() {
    const router = useRouter()

    async function handleLogout() {
        await authClient.signOut()
        router.push('/login')
    }

    return (
        <Button variant='outline' size='sm' onClick={handleLogout} className='cursor-pointer'>
            Log out
        </Button>
    )
}