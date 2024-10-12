import { getUserEvents } from "@/actions/events";
import EventCard from "@/components/event-card";
import { Suspense } from "react"

export default function EventsPage() {
    return (
        <Suspense fallback={<div>Loading Events...</div>}>
            <Events />
        </Suspense>
    );

}


const Events = async () => {
    const { events, usename } = await getUserEvents();

    if (events.length === 0) {
        return <p>You have not created any events.</p>;
    }

    return (
        <div className="grid gap-4 grid-cols lg:grid-cols-2">
            {events.map((event) => (
                <EventCard
                    key={event.id}
                    event={event}
                    username={usename}
                    isPublic={false}
                />
            ))}
        </div>
    );
}

