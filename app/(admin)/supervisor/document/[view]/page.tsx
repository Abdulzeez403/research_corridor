"use client"
import { usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { Button } from '@/components/ui/button';
import DocViewer, { DocViewerRenderers } from 'react-doc-viewer';
import Image from 'next/image';
import FileImage from '../../../../../public/pdf.jpg';
import { useSupervisorProfile } from '../../context';
import { useSupervisorDocuments } from '../context';
import { ResponsiveDrawerDialog } from '@/app/components/modals/responsivedrawer';
import CommentForm from '../commentForm';
import { CommentTableComponent } from '../commets';
import { CopyX } from 'lucide-react';
import PdfViewer from './pdfView';
import Link from 'next/link';

function ViewPage() {
    const urlPath = usePathname();
    const id = urlPath.split('/')[3];

    const { getDocumentById, document } = useSupervisorDocuments();
    const { profile } = useSupervisorProfile();

    const [isDrawerOpen, setDrawerOpen] = useState(false);

    const handleClose = () => setDrawerOpen(false);
    const handleOpen = () => setDrawerOpen(true);

    useEffect(() => {
        getDocumentById(id);
    }, [id]);

    const [viewDoc, setViewDoc] = useState(false);

    // Check if the document is a PDF
    const isPDF = document?.document.endsWith('.pdf');

    // Construct the document URL for embedding
    const documentURL = document?.document ? [{ uri: document.document }] : [];

    return (
        <div>
            {/* <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink href="/researcher/upload">Validation</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbLink href="/components">Document</BreadcrumbLink>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb> */}

            {viewDoc ? (
                <div>
                    <div style={{ height: '100vh', width: '100%', padding: '20px', boxSizing: 'border-box' }}>
                        <div className="flex justify-end" onClick={() => setViewDoc(false)}>
                            <CopyX className="h-6 w-6 text-red-500" />
                        </div>

                        <DocViewer
                            documents={documentURL}
                            pluginRenderers={DocViewerRenderers}
                            style={{ width: '100%', height: '100%' }}
                        />
                    </div>
                </div>
            ) : (
                <div className="flex flex-col md:flex-row justify-between pt-5 gap-4">
                    <div className="flex flex-col md:flex-row gap-4">
                        <Image src={FileImage} alt="Document Image" width={300} height={300} className="rounded-lg border-2" />
                        <div>
                            <div>
                                <h4><span className="font-bold text-md">File Name:</span> {document?.title}</h4>
                                <h4><span className="font-bold text-md">Status:</span> {document?.status}</h4>
                                <h4><span className="font-bold text-md">Comments:</span> 5</h4>
                            </div>
                        </div>
                    </div>
                    <div className="flex gap-4">
                        {isPDF ? (
                            <Button className="bg-red-400">
                                <Link href={document?.document as any}>
                                    View
                                </Link>
                            </Button>
                        ) : (
                            <Button className="bg-red-400" onClick={() => setViewDoc(true)}>
                                View
                            </Button>
                        )}

                        <Button className="bg-green-400" onClick={handleOpen}>Comments</Button>
                    </div>
                </div>
            )}

            <div>
                <CommentTableComponent comments={document?.comments as any} />
            </div>

            <ResponsiveDrawerDialog
                title="Create a Comment"
                description="Comment on the progress of the work"
                isOpen={isDrawerOpen}
                onClose={handleClose}
            >
                <CommentForm documentId={document?.id || ''} />
            </ResponsiveDrawerDialog>
        </div>
    );
}

export default ViewPage;
