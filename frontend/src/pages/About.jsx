import React from 'react'
import { assets } from '../assets/assets'

const About = () => {
  return (
    <div>
      <div className='text-center text-2xl pt-10 text-gray-500'>
        <p>ABOUT <span className='text-gray-700 font-medium'>ME</span></p>
      </div>
      <div className='my-10 flex flex-col md:flex-row gap-12'>
        <img className='w-full md:max-w-[360px]' src={assets.appointment_img} alt="" />
        <div className='flex flex-col justify-center gap-6 md:w-2/4 text-sm text-gray-600'>
          <p>Welcome to Esther Yashar's website.<br/>We take care of you and your health when performing all body and facial treatments.<br/>With us you will find all types of treatments under one roof and thus we will make it easier for you to take care of yourself.</p>
          <p>We at Esther Yashar are committed to giving you the best and most effective care with the correct use of the latest materials and technologies.<br/>Our team is constantly renewing itself and is in constant learning in order to be the best.<br/>We are here to support you every step of the way.</p>
          <b className='text-gray-800'>And For Real</b>
          <p className='hover:bg-primary hover:text-white duration-200'>My name is Esther, I am 24 years old, graduated with a bachelor's degree in Computer Science, and am looking for my job.<br/>I love the field of programming so much and look forward to engaging in it every day under a real framework and not as personal projects.<br/>Graduated with honors and majored in Data Science and Artificial Intelligence.<br/>I would love to hear from you!</p>
        </div>
      </div>
    </div>
  )
}

export default About