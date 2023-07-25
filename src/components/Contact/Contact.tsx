import emailjs from '@emailjs/browser';
import React, { ChangeEvent, FormEvent, useState } from 'react';
import { IoIosPaperPlane } from 'react-icons/io';

import useToast from '@/hooks/useToast';

type FormValues = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

const initialValues: FormValues = {
  name: '',
  email: '',
  subject: '',
  message: '',
};

export default function Contact(): JSX.Element {
  const { showSuccess, showError } = useToast();
  const [values, setValues] = useState<FormValues>(initialValues);
  const [loading, setLoading] = useState<boolean>(false);

  const validateForm = (): boolean => {
    if (values.name.length < 3) {
      showError('Your name must be at least 3 letters long.');
      return false;
    }
    if (!/^\S+@\S+\.\S+$/.test(values.email)) {
      showError('Invalid email address.');
      return false;
    }
    if (values.subject.length < 4) {
      showError('Subject must be at least 4 letters long.');
      return false;
    }
    if (values.message.length < 20) {
      showError('Message must be at least 20 letters long.');
      return false;
    }
    return true;
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
    const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
    const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;
    if (!serviceId || !templateId || !publicKey) {
      console.error(
        'EmailJS environment variables are not properly configured.'
      );
      return;
    }
    if (!validateForm()) {
      return;
    }
    emailjs
      // .send('service_ae0i36b', 'template_fypyuma', values, 'jokWylvg_MqPIeLMx')
      .send(serviceId, templateId, values, publicKey)
      .then(
        (response) => {
          console.log('SUCCESS!', response);
          setValues({
            name: '',
            email: '',
            subject: '',
            message: '',
          });
          showSuccess('Message was sent successfully!');
        },
        (error) => {
          setLoading(false);
          console.log(error);
          showError('An error occurred. Please try again later.');
        }
      );
    setLoading(false);
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setValues((values) => ({
      ...values,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <section
      id='contact'
      className='font-mont ny-20 relative flex h-auto w-full flex-col items-center justify-center overflow-hidden bg-white'
    >
      <div className='arrow-down blue' />
      <h3 className='font-mont text-primary-blue -left-6 top-[170px] mb-6 mt-[60px] text-xl font-[500] leading-3 tracking-[10px] md:absolute md:mb-0 md:mt-0 md:-rotate-90'>
        CONTACT
      </h3>
      <div
        data-aos='fade-up'
        className='gradient-slow border-primary-blue xsm:w-[450px] my-20 mt-10 flex h-full w-full flex-col items-center gap-3 border-t-2 text-white md:my-20 md:flex-col'
      >
        <IoIosPaperPlane className='text-primary-blue xsm:mt-4 mb-3 mt-5 text-center text-8xl duration-150 hover:cursor-pointer hover:text-white' />
        <form className='xsm:px-6 w-full px-5' onSubmit={handleSubmit}>
          <div className='xsm:flex-row xsm:gap-2 mb-3 flex w-full flex-col justify-between gap-5'>
            <div className='xsm:min-w-[180px] relative h-11 w-full'>
              <input
                className='focus:border-orange border-primary-blue placeholder-shown:border-primary-blue disabled:bg-primary-blue font-mont peer h-full w-full border-b bg-transparent px-2 pb-1.5 pt-4 text-sm font-[500] text-white outline outline-0 transition-all focus:outline-0 disabled:border-0'
                placeholder=' '
                name='name'
                value={values.name}
                onChange={handleChange}
              />
              <label className="after:content[' '] text-primary-blue pointer-events-none absolute -top-1.5 left-0 flex h-full w-full select-none text-[11px] font-normal leading-tight transition-all after:absolute after:-bottom-1.5 after:block after:w-full after:scale-x-0 after:border-b-2 after:border-white after:transition-transform after:duration-300 peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.25] peer-placeholder-shown:text-white peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-white peer-focus:after:scale-x-100 peer-focus:after:border-white peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-white">
                Your name
              </label>
            </div>
            <div className='relative h-11 w-full min-w-[180px]'>
              <input
                className='focus:border-orange border-primary-blue placeholder-shown:border-primary-blue disabled:bg-primary-blue font-mont peer h-full w-full resize-none border-b border-none border-transparent bg-transparent px-2 pb-1.5 pt-4 text-sm font-[500] text-white outline outline-0 transition-all focus:border-transparent focus:shadow-none focus:outline-none focus:outline-0 focus:ring-0 focus:drop-shadow-none disabled:border-0'
                placeholder=' '
                name='email'
                value={values.email}
                onChange={handleChange}
              />
              <div className='bg-primary-blue -mt-[1px] h-[1px] w-full' />
              <label className="after:content[' '] text-primary-blue pointer-events-none absolute -top-1.5 left-0 flex h-full w-full select-none text-[11px] font-normal leading-tight transition-all after:absolute after:-bottom-1.5 after:block after:w-full after:scale-x-0 after:border-b-2 after:border-white after:transition-transform after:duration-300 peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.25] peer-placeholder-shown:text-white peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-white peer-focus:after:scale-x-100 peer-focus:after:border-white peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-white">
                Your mail
              </label>
            </div>
          </div>
          <div className='flex w-full flex-col gap-3'>
            <div className='relative mt-3 h-11 w-full min-w-[180px]'>
              <input
                className='focus:border-orange border-primary-blue placeholder-shown:border-primary-blue disabled:bg-primary-blue font-mont peer h-full w-full border-b bg-transparent px-2 pb-1.5 pt-4 text-sm font-[500] text-white outline outline-0 transition-all focus:outline-0 disabled:border-0'
                placeholder=' '
                name='subject'
                value={values.subject}
                onChange={handleChange}
              />
              <label className="after:content[' '] text-primary-blue pointer-events-none absolute -top-1.5 left-0 flex h-full w-full select-none text-[11px] font-normal leading-tight transition-all after:absolute after:-bottom-1.5 after:block after:w-full after:scale-x-0 after:border-b-2 after:border-white after:transition-transform after:duration-300 peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.25] peer-placeholder-shown:text-white peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-white peer-focus:after:scale-x-100 peer-focus:after:border-white peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-white">
                Subject
              </label>
            </div>
            <div className='relative mt-3 h-[250px] w-full min-w-[180px]'>
              <textarea
                className='font-mont peer h-[240px] w-full resize-none border-none border-transparent bg-transparent px-2 pb-1.5 pt-4 text-sm font-[500] text-white outline-none transition-all focus:border-none focus:border-transparent focus:shadow-none focus:outline-none focus:ring-0 focus:drop-shadow-none disabled:border-0'
                placeholder=' '
                name='message'
                value={values.message}
                onChange={handleChange}
              />
              <div className='bg-primary-blue mt-[6px] h-[1px] w-full' />
              <label className="after:content[' '] text-primary-blue pointer-events-none absolute -top-1.5 left-0 flex h-full w-full select-none text-[11px] font-normal leading-tight transition-all after:absolute after:-bottom-1.5 after:block after:w-full after:scale-x-0 after:border-b-2 after:border-white after:transition-transform after:duration-300 peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.25] peer-placeholder-shown:text-white peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-white peer-focus:after:scale-x-100 peer-focus:after:border-white peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-white">
                Message
              </label>
            </div>
          </div>
          <button
            className='bg-primary-blue hover:text-raspberry xsm:mb-5 mb-6 mt-2 w-full py-3 text-xl tracking-[2px] text-white duration-150 hover:bg-white hover:font-[500] hover:tracking-[6px]'
            type='submit'
          >
            SEND
          </button>
        </form>
      </div>
    </section>
  );
}
