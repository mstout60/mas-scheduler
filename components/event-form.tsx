/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import React from 'react'
import { z } from 'zod'

import useFetch from "@/hooks/use-fetch";

import { createEvent } from '@/actions/events';

import { useForm } from 'react-hook-form';
import { eventSchema } from '@/app/lib/validators';
import { zodResolver } from '@hookform/resolvers/zod';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useRouter } from 'next/navigation';

type Props = {
  onSubmitForm: () => void;
};

type EventFormValues = z.infer<typeof eventSchema>;

function EventForm({ onSubmitForm }: Props) {
  const router = useRouter();

  const form = useForm<EventFormValues>({
    resolver: zodResolver(eventSchema),
    defaultValues: {
      duration: 30,
      isPrivate: true,
    },
  });

  const { isLoading, hasError, fn: fnCreateEvent } = useFetch(createEvent)

  const onSubmit = async (eventData: EventFormValues) => {

    //await createEvent(eventData)
    await fnCreateEvent(eventData);

    if (!isLoading && !hasError) {
      onSubmitForm();
    }

    router.refresh();
  };

  return (
    <Form {...form}>
      <form className='px-5 flex flex-col gap-4' onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Title
              </FormLabel>
              <FormControl>
                <Input
                  disabled={isLoading}
                  placeholder="e.g. 'Event Title'"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>

          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Description
              </FormLabel>
              <FormControl>
                <Input
                  disabled={isLoading}
                  placeholder="e.g. 'Event Description'"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>

          )}
        />
        <FormField
          control={form.control}
          name="duration"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Duration (minutes)
              </FormLabel>
              <FormControl>
                <Input
                  type="number"
                  disabled={isLoading}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>

          )}
        />
        <FormField
          control={form.control}
          name="isPrivate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Event Privacy
              </FormLabel>
              <FormControl>
                <Select value={field.value ? "true" : "false"}
                  onValueChange={(value) => field.onChange(value === "true")}
                >
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select Privacy" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="true">Private</SelectItem>
                    <SelectItem value="false">Public</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>

          )}
        />

        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Submitting..." : "Create Event"}
        </Button>
      </form>
    </Form>
  );
};

export default EventForm;