import { UploodModel } from "./models";

// Sample data
export const UploadDataSample: UploodModel[] = [
    {
        id: 1,
        name: 'Research Paper',
        time: '10:00 AM',
        date: '2024-06-16',
        status: 'active',
        documentType: 'doc'
    },
    {
        id: 2,
        name: 'Project Proposal',
        time: '11:00 AM',
        date: '2024-06-16',
        status: 'inactive',
        documentType: 'pdf'
    },
    {
        id: 3,
        name: 'Meeting Notes',
        time: '12:00 PM',
        date: '2024-06-16',
        status: 'active',
        documentType: 'doc'
    },
    {
        id: 4,
        name: 'Project Image',
        time: '01:00 PM',
        date: '2024-06-16',
        status: 'inactive',
        documentType: 'img'
    },
    {
        id: 5,
        name: 'Design Document',
        time: '02:00 PM',
        date: '2024-06-16',
        status: 'active',
        documentType: 'doc'
    },
    {
        id: 6,
        name: 'Financial Report',
        time: '03:00 PM',
        date: '2024-06-16',
        status: 'inactive',
        documentType: 'pdf'
    },
    {
        id: 7,
        name: 'Logo Design',
        time: '04:00 PM',
        date: '2024-06-16',
        status: 'active',
        documentType: 'img'
    },
    {
        id: 8,
        name: 'Market Analysis',
        time: '05:00 PM',
        date: '2024-06-16',
        status: 'inactive',
        documentType: 'pdf'
    },
    {
        id: 9,
        name: 'User Feedback',
        time: '06:00 PM',
        date: '2024-06-16',
        status: 'active',
        documentType: 'doc'
    },
    {
        id: 10,
        name: 'Presentation Slides',
        time: '07:00 PM',
        date: '2024-06-16',
        status: 'inactive',
        documentType: 'pdf'
    }
];


export const userData = [
    {
        id: 1,
        avatar: './User1.png',
        messages: [
            {
                id: 1,
                avatar: './User1.png',
                name: 'Jane Doe',
                message: 'Hey, Jakob',
            },
            {
                id: 2,
                avatar: './researcher.jpg.jpg',
                name: 'Jakob Hoeg',
                message: 'Hey!',
            },
            {
                id: 3,
                avatar: './User1.png',
                name: 'Jane Doe',
                message: 'How are you?',
            },
            {
                id: 4,
                avatar: './researcher.jpg',
                name: 'Jakob Hoeg',
                message: 'I am good, you?',
            },
            {
                id: 5,
                avatar: './User1.png',
                name: 'Jane Doe',
                message: 'I am good too!',
            },
            {
                id: 6,
                avatar: './researcher.jpg',
                name: 'Jakob Hoeg',
                message: 'That is good to hear!'
            },
            {
                id: 7,
                avatar: '/User1.png',
                name: 'Jane Doe',
                message: 'How has your day been so far?',
            },
            {
                id: 8,
                avatar: './researcher.jpg',
                name: 'Jakob Hoeg',
                message: 'It has been good. I went for a run this morning and then had a nice breakfast. How about you?',
            },
            {
                id: 9,
                avatar: './User1.png',
                name: 'Jane Doe',
                message: 'I had a relaxing day. Just catching up on some reading.',
            }
        ],
        name: 'Jane Doe',
    },
    {
        id: 2,
        avatar: './User1.png',
        name: 'John Doe',
    },
    {
        id: 3,
        avatar: './User1.png',
        name: 'Elizabeth Smith',
    },
    {
        id: 4,
        avatar: './User1.png',
        name: 'John Smith',
    }
];

export type UserData = (typeof userData)[number];

export const loggedInUserData = {
    id: 5,
    avatar: './researcher.jpg',
    name: 'Jakob Hoeg',
};

