// pages/meetings.tsx
"use client"
import { useState } from 'react';
import Timeline, { TimelineGroupBase, TimelineItemBase, TimelineItemRendererProps } from 'react-calendar-timeline';
import 'react-calendar-timeline/lib/Timeline.css';
import moment from 'moment';

interface ResearchGroup extends TimelineGroupBase {
    id: number;
    title: string;
    type: 'researcher' | 'supervisor' | 'project' | 'department';
}

interface Meeting extends TimelineItemBase {
    id: number;
    group: number;
    title: string;
    start_time: moment.Moment;
    end_time: moment.Moment;
    color: any
}

const initialMeetings: Meeting[] = [
    {
        id: 1,
        group: 1,  // Dr. Smith
        title: 'Research Progress Meeting with John',
        start_time: moment().add(1, 'days').startOf('day').add(10, 'hours'),
        end_time: moment().add(1, 'days').startOf('day').add(11, 'hours'),
        color: '#FF5733',
    },
    {
        id: 2,
        group: 2,  // John Doe
        title: 'Weekly Sync with Dr. Smith',
        start_time: moment().add(2, 'days').startOf('day').add(14, 'hours'),
        end_time: moment().add(2, 'days').startOf('day').add(15, 'hours'),
        color: '#33FF57',
    },
    {
        id: 3,
        group: 3,  // AI Research Project
        title: 'AI Project Kickoff',
        start_time: moment().add(3, 'days').startOf('day').add(9, 'hours'),
        end_time: moment().add(3, 'days').startOf('day').add(10, 'hours'),
        color: '#3357FF',
    },
    {
        id: 4,
        group: 4,  // Computer Science Department
        title: 'Departmental Meeting',
        start_time: moment().add(4, 'days').startOf('day').add(13, 'hours'),
        end_time: moment().add(4, 'days').startOf('day').add(14, 'hours'),
        color: '#FF33A1',
    },

]



const groups: ResearchGroup[] = [
    { id: 1, title: 'Dr. Smith (Supervisor)', type: 'supervisor' },
    { id: 2, title: 'John Doe (Researcher)', type: 'researcher' },
    { id: 3, title: 'AI Research Project', type: 'project' },
    { id: 4, title: 'Computer Science Department', type: 'department' },
];


// const groups: TimelineGroupBase[] = [{ id: 1, title: 'Meetings' }];
export const MeetingDetail = () => {
    const [meetings, setMeetings] = useState<Meeting[]>(initialMeetings);
    const [title, setTitle] = useState('');
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');

    const addMeeting = () => {
        const [hours, minutes] = time.split(':').map(Number);
        const startDate = moment(date).add(hours, 'hours').add(minutes, 'minutes');
        const endDate = moment(startDate).add(1, 'hour');

        const newMeeting: Meeting = {
            id: meetings.length + 1,
            group: 1,
            title,
            start_time: startDate,
            end_time: endDate,
        };

        setMeetings([...meetings, newMeeting]);
        setTitle('');
        setDate('');
        setTime('');
    };

    return (
        <div className="container mx-auto p-4">
            <h4 className="mb-6">
                Meeting Schedule
            </h4>
            <Timeline
                groups={groups}
                items={meetings}
                defaultTimeStart={moment().add(-12, 'hour')}
                defaultTimeEnd={moment().add(12, 'hour')}
                canMove={false}
                canResize={true}
                resizing={true}
                resizeEdge="right"
                itemRenderer={({ item, itemContext, getItemProps, getResizeProps }: TimelineItemRendererProps<Meeting>) => (
                    <div
                        {...getItemProps({
                            style: {
                                backgroundColor: item.color,
                                color: 'black',
                                borderRadius: 4,
                                border: '1px solid #ddd',
                                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
                                // padding: 10,
                                boxSizing: 'border-box',
                                // marginTop: '2px',
                                cursor: 'pointer',
                                width: "100%"
                            },
                        })}
                    >
                        <span>{item.title}</span>
                    </div>
                )}


            />

        </div>
    );
};
