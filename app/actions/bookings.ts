'use server'

import prisma from "@/lib/prisma"
import { getSession } from "@/lib/auth-server"
import { revalidatePath } from "next/cache"


export async function createBooking(date: Date, resourceId: string) {
    const session = await getSession()

    if (!session) {
        throw new Error('Unauthorized')
    }

    const booking = await prisma.booking.create({
        data: {
            date,
            resourceId,
            userId: session.user.id,
        },
    })

    revalidatePath('/')

    return booking
}

export async function getMyBookings() {
    const session = await getSession()

    if (!session) return []

    return prisma.booking.findMany({
        where: {
            userId: session.user.id,
        },
        include: {
            resource: true,
        },
        orderBy: {
            date: 'asc',
        },
    })
}

export async function getResources() {
    return prisma.resource.findMany({
        orderBy: { name: 'asc' },
    })
}

export async function deleteBooking(formData: FormData) {
    const session = await getSession()

    if (!session) {
        throw new Error('Unauthorized')
    }

    const bookingId = formData.get('bookingId') as string

    if (!bookingId) {
        throw new Error('Invalid request')
    }

    const booking = await prisma.booking.findUnique({
        where: { id: bookingId },
        select: { userId: true },
    })

    if (!booking || booking.userId !== session.user.id) {
        throw new Error('Forbidden')
    }

    await prisma.booking.delete({ where: { id: bookingId } })
    revalidatePath('/')
}