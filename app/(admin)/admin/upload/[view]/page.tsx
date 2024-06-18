'use client'
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { usePathname } from 'next/navigation';
import React from 'react'
import FileImage from "../../../../../public/pdf.jpg"
import Image from 'next/image'
import PdfViewer from './pdfView';
import { Button } from '@/components/ui/button';
import DocViewerComponent from '@/app/components/docView';

function VeiwPage() {
    const urlPath = usePathname();
    const id = urlPath.split('/')[3];
    const fileUrl = "../../../../../public/Discplined Trader.pdf"
    return (

        <div>
            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink href="/admin/upload">Validation</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbLink href="/components">Document</BreadcrumbLink>
                    </BreadcrumbItem>

                </BreadcrumbList>
            </Breadcrumb>

            <div className='flex justify-between pt-5'>


                <div className="flex gap-x-10">
                    <Image src={FileImage}
                        alt="UserImage"
                        width={300} height={300}
                        className="rounded-lg border-2" />
                    <div >

                        <div className=''>
                            <h4 >
                                <span className="font-bold text-md">File Name:</span>Background of Study</h4>
                            <h4 >
                                <span className="font-bold text-md">Supervisor:</span> Abdulazeez Sodiq </h4>
                            <h4 >
                                <span className="font-bold text-md">Project Topic:</span>Impact of AI to Education </h4>

                            <h4 >
                                <span className="font-bold text-md gap-x-2">Number of Files:</span>5</h4>
                        </div>

                        <div>

                        </div>
                    </div>

                </div>

                <div className="flex gap-x-4">
                    <div>
                        <Button className="bg-red-400"> View</Button>

                    </div>
                    <div>
                        <Button>Approved</Button>

                    </div>
                </div>


            </div>

            {/* <PdfViewer fileUrl={fileUrl} /> */}

            {/* <DocViewerComponent /> */}



        </div>
    )
}

export default VeiwPage; 