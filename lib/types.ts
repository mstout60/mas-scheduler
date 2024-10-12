import { getUserEvents } from "@/actions/events";
import { Prisma } from "@prisma/client";

export type UserEventsWithBookings = Prisma.PromiseReturnType<typeof getUserEvents>;

export type EventCardType = {
    event: {
        _count: {
            bookings: number;
        };
        id: string;
        title: string;
        description: string | null;
        duration: number;
        userId: string;
        isPrivate: boolean;
        createdAt: Date;
        updatedAt: Date;
    }
    username: string | null;
    isPublic: boolean;
}