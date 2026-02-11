'use client'

import { useState } from 'react'
import { Calendar } from '@/components/ui/calendar'
import { Button } from '@/components/ui/button'
import { createBooking } from "@/app/actions/bookings"

type Resource = {
    id: string
    name: string
}

export function BookingForm({ resources }: { resources: Resource[] }) {
    const [date, setDate] = useState<Date | undefined>()
    const [resourceId, setResourceId] = useState<string>('')

    async function handleBooking() {
        if (!date || !resourceId) return

        await createBooking(date, resourceId)
    }


    return (
        <div className='space-y-4'>
            <select className='w-full border rounded p-2 cursor-pointer' value={resourceId} onChange={(e) => setResourceId(e.target.value)}>
                <option value=''>Select a service</option>
                {resources.map(r => (
                    <option key={r.id} value={r.id}>
                        {r.name}
                    </option>
                ))}
            </select>

            <Calendar mode='single' selected={date} onSelect={setDate} />

            <Button className='w-full cursor-pointer' onClick={handleBooking}>Book resource</Button>
        </div>
    )
}