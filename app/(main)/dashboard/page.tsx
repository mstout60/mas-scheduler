"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import { usenameSchema } from '@/app/lib/validators'
import { z } from "zod";
import useFetch from "@/hooks/use-fetch";
import { updateUsername } from "@/actions/users";
import { BarLoader } from "react-spinners";

const DashboardPage = () => {
    const [mounted, setMounted] = useState(false);
    const { isLoaded, user } = useUser();

    const { register, handleSubmit, setValue, formState: { errors } } = useForm<z.infer<typeof usenameSchema>>({
        resolver: zodResolver(usenameSchema),
    });

    useEffect(() => {
        setMounted(true);
        setValue("username", user?.username as string);
    }, [isLoaded, setValue, user?.username]);

    const { isLoading, hasError, fn: fnUpdateUsername } = useFetch(updateUsername)

    if (!mounted) return;

    const origin = typeof window !== "undefined" ? window.location.origin : "";



    const onSubmit = async (data: { username: string }) => {
        fnUpdateUsername(data.username);
    };

    return (
        <div className="space-y-8">
            <Card>
                <CardHeader>
                    <CardTitle>Welcome, {user?.firstName}</CardTitle>
                </CardHeader>
                {/* Latest Updates */}
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Your Unique Link</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        <div>
                            <div className="flex items-center gap-2">
                                <span>{origin}/</span>
                                <Input {...register("username")} placeholder="username" />
                            </div>
                            {errors.username && (
                                <p className="text-red-500 text-sm mt-1">
                                    {errors.username.message}
                                </p>
                            )}
                            {hasError && (
                                <p className="text-red-500 text-sm mt-1">Error has occured on update!</p>
                            )}
                        </div>
                        {isLoading && (
                            <BarLoader className="mb-4" width={"100%"} color="#36d7b7" />
                        )}
                        <Button type="submit">
                            Updae Username
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}

export default DashboardPage