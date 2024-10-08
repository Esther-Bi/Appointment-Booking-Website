import appointment_img from './appointment_img.png'
import header_img from './header_img.png'
import group_profiles from './group_profiles.png'
import profile_pic from './profile_pic.png'
import contact_image from './contact_image.png'
import about_image from './about_image.png'
import logo from './logo.svg'
import dropdown_icon from './dropdown_icon.svg'
import menu_icon from './menu_icon.svg'
import cross_icon from './cross_icon.png'
import chats_icon from './chats_icon.svg'
import verified_icon from './verified_icon.svg'
import arrow_icon from './arrow_icon.svg'
import info_icon from './info_icon.svg'
import upload_icon from './upload_icon.png'
import stripe_logo from './stripe_logo.png'
import razorpay_logo from './razorpay_logo.png'
import Laser from './Laser.svg'
import Manicure from './Manicure.svg'
import Pedicure from './Pedicure.svg'
import Facial_treatment from './Facial_treatment.svg'
import Waxing from './Waxing.svg'


export const assets = {
    appointment_img,
    header_img,
    group_profiles,
    logo,
    chats_icon,
    verified_icon,
    info_icon,
    profile_pic,
    arrow_icon,
    contact_image,
    about_image,
    menu_icon,
    cross_icon,
    dropdown_icon,
    upload_icon,
    stripe_logo,
    razorpay_logo
}

export const typeData = [
    {
        type: 'Laser',
        image: Laser
    },
    {
        type: 'Manicure',
        image: Manicure
    },
    {
        type: 'Pedicure',
        image: Pedicure
    },
    {
        type: 'Facial Treatment',
        image: Facial_treatment
    },
    {
        type: 'Waxing',
        image: Waxing
    },
]

export const services = [
    {
        _id: 'doc1',
        name: 'Dr. Richard James',
        image: Laser,
        type: 'General physician',
        about: 'Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies. Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.',
        fees: 50,
    },
    {
        _id: 'doc2',
        name: 'Dr. Emily Larson',
        image: Laser,
        type: 'Gynecologist',
        about: 'Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies. Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.',
        fees: 60,
    },
    {
        _id: 'doc3',
        name: 'Dr. Sarah Patel',
        image: Waxing,
        type: 'Dermatologist',
        about: 'Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies. Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.',
        fees: 30,
    },
    {
        _id: 'doc4',
        name: 'Dr. Christopher Lee',
        image: Manicure,
        type: 'Pediatricians',
        about: 'Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies. Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.',
        fees: 40,
    },
    {
        _id: 'doc5',
        name: 'Dr. Jennifer Garcia',
        image: Pedicure,
        type: 'Neurologist',
        about: 'Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies. Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.',
        fees: 50,
    },
    {
        _id: 'doc6',
        name: 'Dr. Andrew Williams',
        image: Pedicure,
        type: 'Neurologist',
        about: 'Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies. Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.',
        fees: 50,
    },
    {
        _id: 'doc7',
        name: 'Dr. Christopher Davis',
        image: Manicure,
        type: 'General physician',
        about: 'Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies. Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.',
        fees: 50,
    },
    {
        _id: 'doc8',
        name: 'Dr. Timothy White',
        image: Facial_treatment,
        type: 'Gynecologist',
        degree: 'MBBS',
        experience: '3 Years',
        about: 'Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies. Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.',
        fees: 60,
    },
    {
        _id: 'doc9',
        name: 'Dr. Ava Mitchell',
        image: Manicure,
        type: 'Dermatologist',
        about: 'Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies. Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.',
        fees: 30,
    },
    {
        _id: 'doc10',
        name: 'Dr. Jeffrey King',
        image: Facial_treatment,
        type: 'Pediatricians',
        about: 'Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies. Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.',
        fees: 40,
    },
    {
        _id: 'doc11',
        name: 'Dr. Zoe Kelly',
        image: Pedicure,
        type: 'Neurologist',
        about: 'Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies. Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.',
        fees: 50,
    },
    {
        _id: 'doc12',
        name: 'Dr. Patrick Harris',
        image: Laser,
        type: 'Neurologist',
        about: 'Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies. Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.',
        fees: 50,
    },
    {
        _id: 'doc13',
        name: 'Dr. Chloe Evans',
        image: Facial_treatment,
        type: 'General physician',
        about: 'Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies. Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.',
        fees: 50,
    },
    {
        _id: 'doc14',
        name: 'Dr. Ryan Martinez',
        image: Facial_treatment,
        type: 'Gynecologist',
        about: 'Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies. Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.',
        fees: 60,
    },
    {
        _id: 'doc15',
        name: 'Dr. Amelia Hill',
        image: Manicure,
        type: 'Dermatologist',
        about: 'Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies. Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.',
        fees: 30,
    },
]