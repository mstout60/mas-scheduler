"use server";

//import { eventSchema } from "@/app/lib/validators";
import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

interface EventData {
    title: string;
    description: string;
    duration: number;
    isPrivate: boolean;

};

export async function createEvent({ title, description, duration, isPrivate }: EventData) {
    const { userId } = auth();

    if (!userId) {
        throw new Error("Unauthorized");
    }


    //const validatedData = eventSchema.parse(data);
    const user = await prisma.user.findUnique({
        where: { clerkUserId: userId },
    });

    if (!user) {
        throw new Error("User not found");
    }

    const event = await prisma.event.create({
        data: {
            title,
            description,
            duration,
            isPrivate,
            userId: user.id,
        },
    });

    return event;
}

export async function getUserEvents() {
    const { userId } = auth();

    if (!userId) {
        throw new Error("Unauthorized");
    }

    const user = await prisma.user.findUnique({
        where: { clerkUserId: userId },
    });

    if (!user) {
        throw new Error("User not found");
    }

    const events = await prisma.event.findMany({
        where: { userId: user.id },
        orderBy: { createdAt: "desc" },
        include: {
            _count: {
                select: { bookings: true },
            },
        },
    });

    return { events, usename: user.username }
}

export async function deleteEvent(eventId: string) {
    const { userId } = auth();

    if (!userId) {
        throw new Error("Unauthorized");
    }

    const user = await prisma.user.findUnique({
        where: { clerkUserId: userId },
    });

    if (!user) {
        throw new Error("User not found");
    }

    const event = await prisma.event.findUnique({
        where: { id: eventId },
    });

    if (!event || event.userId !== user.id) {
        throw new Error("Event not found or unauthorized");
    }

    await prisma.event.delete({
        where: { id: eventId },
    });

    return { success: true }
}