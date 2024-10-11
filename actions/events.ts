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