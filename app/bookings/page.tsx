import { redirect } from 'next/navigation';
import { getSession } from '@/lib/auth-server';
import { getResources } from '@/app/actions/bookings';
import { BookingForm } from '@/components/booking-form';
import { MyBookings } from '@/components/my-bookings';

export default async function BookingsPage() {
    const session = await getSession()

    if (!session) {
        redirect('/login')
    }

    const resources = await getResources()

    return (
        <div className='p-6 space-y-6 max-w-xl'>
            <h1 className='text-xl font-bold'>Book a resource</h1>

            <BookingForm resources={resources} />

            <div>
                <h2 className='font-semibold mb-2'>My bookings</h2>
                <MyBookings />
            </div>
        </div>
    )
}