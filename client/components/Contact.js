import { useForm } from "react-hook-form";
import React from "react";

export default function Contact() {
  const {
    register,
    trigger,
    formState: { errors },
  } = useForm();

  const onSubmit = async (e) => {
    const isValid = await trigger();
    if (!isValid) {
      e.preventDefault();
    }
  };

  return (
    <section className='flex items-center justify-center min-h-[75vh] px-6'>
      <div className='gap-16 mt-5'>
        <div className='basis-1/2'>
          <form
            onSubmit={onSubmit}
            action='https://formsubmit.co/kristinastefanelli@gmail.com'
            method='POST'
          >
            <input
              className='w-full p-2 mb-4 border rounded-lg focus:outline-none focus:border-[#321e1e]'
              type='text'
              placeholder='NAME'
              {...register("name", {
                required: true,
                maxLength: 100,
              })}
            />
            {errors.name && (
              <p className='font-semibold my-1'>
                {errors.name.type === "required" && "This field is required."}
                {errors.name.type === "maxLength" && "Max length is 100 char."}
              </p>
            )}

            <input
              className='w-full p-2 mb-4 border rounded-lg focus:outline-none focus:border-[#321e1e]'
              type='text'
              placeholder='EMAIL'
              {...register("email", {
                required: true,
                pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              })}
            />
            {errors.email && (
              <p className='font-semibold my-1'>
                {errors.email.type === "required" && "This field is required."}
                {errors.email.type === "pattern" && "Invalid email address."}
              </p>
            )}
            <textarea
              className='w-full p-2 mb-4 border rounded-lg focus:outline-none focus:border-[#321e1e]'
              placeholder='MESSAGE'
              rows={7}
              cols={50}
              {...register("message", {
                required: true,
                maxLength: 2000,
              })}
            />
            {errors.message && (
              <p className='font-semibold my-1'>
                {errors.message.type === "required" &&
                  "This field is required."}
                {errors.message.type === "maxLength" &&
                  "Max length is 2000 char."}
              </p>
            )}
            <input
              type='hidden'
              name='_next'
              value='https://pedal-crafter-d29c20011a41.herokuapp.com/thankyou'
            />
            <input
              type='hidden'
              name='_autoresponse'
              value='Thank you for your message!'
            />
            <button
              className='bg-[#321e1e] text-white p-2 rounded-lg hover:opacity-50'
              type='submit'
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
