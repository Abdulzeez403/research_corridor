// import { Badge } from '@/components/ui/badge';
// import { Progress } from '@/components/ui/progress';
// import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
// import React from 'react';




// const headers = ['Martic', 'Topic', 'Progress'];
// const data = [
//     { name: 'John Doe', topic: 'React Basics', progress: '50' },
//     { name: 'Jane Smith', topic: 'Advanced JavaScript', progress: '20' },
//     { name: 'Samuel Green', topic: 'TypeScript', progress: '60' },
//     { name: 'Samuel Green', topic: 'TypeScript', progress: '60' },
//     { name: 'Samuel Green', topic: 'TypeScript', progress: '60' },
//     { name: 'Samuel Green', topic: 'TypeScript', progress: '60' },
//     { name: 'Samuel Green', topic: 'TypeScript', progress: '60' },
// ];

// export const ReatTableComponent = ({ validationRequests }: IProps) => {


//     const getColorForProgress = (progress: any) => {
//         if (progress >= 80) {
//             return 'bg-green-500';
//         } else if (progress >= 50) {
//             return 'bg-yellow-500';
//         } else {
//             return 'bg-red-500';
//         }
//     };
//     return (
//         <Table className='border rounded-lg p-2 my-6'>
//             <TableHeader className="">
//                 <TableRow >
//                     {headers.map((header, index) => (
//                         <TableHead key={index} className={`${header === 'Progress' ? 'text-right' : ''}
//                          bg-customPrimary text-white ` }>
//                             {header}
//                         </TableHead>
//                     ))}
//                 </TableRow>
//             </TableHeader>
//             <TableBody>
//                 {validationRequests.map((item: any, index: number) => (
//                     <TableRow key={index}>
//                         <TableCell>
//                             <div className="font-medium">{item.name}</div>
//                         </TableCell>
//                         <TableCell>{item.topic}</TableCell>
//                         <TableCell className="text-right w-10">
//                             <Progress value={Number(item.progress)} className={getColorForProgress(item.progress)} />
//                         </TableCell>
//                     </TableRow>
//                 ))}
//             </TableBody>
//         </Table>
//     )
// }



