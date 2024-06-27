'use client'
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { usePathname } from 'next/navigation';
import React, { useState } from 'react'
import FileImage from "../../../../../public/pdf.jpg"
import Image from 'next/image'
import PdfViewer from './pdfView';
import { Button } from '@/components/ui/button';
import DocViewerComponent from '@/app/components/docView';
import { X } from "lucide-react"

function VeiwPage() {
    const urlPath = usePathname();
    const id = urlPath.split('/')[3];
    const fileUrl = ["https://research-corridor.onrender.com/researchDocuments/1719477806738-reciept.pdf"];

    const [viewdoc, setViewdoc] = useState(false)
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

            {
                viewdoc ? (
                    <div>
                        {/* <PdfViewer fileUrl={fileUrl} /> */}
                        <div className="flex-end bg-red-400 border-2 rounded-lg w-6 h-6 " onClick={() => setViewdoc(false)}>
                            <h4 className="text-center">X</h4>
                        </div>

                        <DocViewerComponent />

                    </div>

                ) : (
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
                                        <span className="font-bold text-md gap-x-2 pl-8">Number of Files:</span>5</h4>
                                </div>

                                <div>

                                </div>
                            </div>

                        </div>

                        <div className="flex gap-x-4">
                            <div>
                                <Button className="bg-red-400" onClick={() => setViewdoc(true)}> View</Button>

                            </div>
                            <div>
                                <Button>Approved</Button>

                            </div>
                            <div>
                                <Button className="bg-green-300 text-white">Comments</Button>

                            </div>
                        </div>


                    </div>)
            }

        </div>
    )

}

export default VeiwPage; 