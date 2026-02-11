import { getMyBookings, deleteBooking } from '@/app/actions/bookings';
import { Button } from './ui/button';

export async function MyBookings() {
    const bookings = await getMyBookings()

    if (!bookings.length) {
        return <p>No bookings yet.</p>
    }

    return (
        <ul className='space-y-2'>
            {bookings.map(b => (
                <li
                    key={b.id}
                    className='border rounded p-3 flex items-center justify-between'
                >
                    <div>
                        <div className='font-medium'>{b.resource.name}</div>
                        <div className='text-sm text-muted-foreground'>
                            {b.date.toDateString()}
                        </div>
                    </div>

                    <form action={deleteBooking}>
                        <input type='hidden' name='bookingId' value={b.id} />
                        <Button type='submit' variant='ghost' size='sm' className='text-destructive cursor-pointer'>
                            Cancel
                        </Button>
                    </form>
                </li>
            ))}
        </ul>
    )
}