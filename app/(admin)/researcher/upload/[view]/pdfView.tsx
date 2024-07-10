// components/PdfViewer.tsx
'use client'
import React, { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';

// Make sure to set the workerSrc to use PDF.js's worker
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

interface PdfViewerProps {
    fileUrl: string;
}

const PdfViewer: React.FC<PdfViewerProps> = ({ fileUrl }) => {
    const [numPages, setNumPages] = useState<number | null>(null);
    const [pageNumber, setPageNumber] = useState(1);

    const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
        setNumPages(numPages);
    };

    const goToPrevPage = () => setPageNumber(pageNumber - 1);
    const goToNextPage = () => setPageNumber(pageNumber + 1);

    return (
        <div className="pdf-viewer">
            <Document file={fileUrl} onLoadSuccess={onDocumentLoadSuccess}>
                <Page pageNumber={pageNumber} />
            </Document>
            <div className="navigation">
                <button onClick={goToPrevPage} disabled={pageNumber <= 1}>
                    Previous
                </button>
                <span>
                    Page {pageNumber} of {numPages}
                </span>
                <button onClick={goToNextPage} disabled={pageNumber >= (numPages || 1)}>
                    Next
                </button>
            </div>
            <style jsx>{`
        .pdf-viewer {
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .navigation {
          display: flex;
          justify-content: space-between;
          width: 200px;
          margin-top: 10px;
        }
        button {
          padding: 5px 10px;
          border: none;
          background-color: #007bff;
          color: white;
          cursor: pointer;
        }
        button:disabled {
          background-color: #aaa;
        }
        span {
          margin: 0 10px;
        }
      `}</style>
        </div>
    );
};

export default PdfViewer;
