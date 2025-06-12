import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

interface SponsorFields {
  company: string;
  email: string;
}

const stepSchema = yup.object({
  company: yup.string().required(),
  email: yup.string().email().required(),
});

export function SponsorForm() {
  const { register, handleSubmit, formState: { errors } } = useForm<SponsorFields>({
    resolver: yupResolver(stepSchema),
  });

  const onSubmit = (data: SponsorFields) => {
    console.log('submit', data);
    // TODO: save progress to backend
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-navy" htmlFor="company">Company</label>
        <input id="company" {...register('company')} className="border p-2 w-full" />
        {errors.company && <span className="text-red-500">Required</span>}
      </div>
      <div>
        <label className="block text-sm font-medium text-navy" htmlFor="email">Email</label>
        <input id="email" type="email" {...register('email')} className="border p-2 w-full" />
        {errors.email && <span className="text-red-500">Enter valid email</span>}
      </div>
      <button type="submit" className="bg-muted-green text-white px-4 py-2">Submit</button>
    </form>
  );
}
