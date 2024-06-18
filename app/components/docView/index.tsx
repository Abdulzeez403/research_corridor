// components/DocViewerComponent.js

import React from 'react';
import DocViewer, { DocViewerRenderers } from 'react-doc-viewer';

const DocViewerComponent = () => {
    const docs = [
        { uri: 'https://ebookdisc.com/wp-content/uploads/2024/01/The-Disciplined-Trader-PDF.pdf' },
        { uri: 'https://example.com/sample.docx' } // External document URL
    ];


    return (
        <div style={{ height: '100vh', width: '100%', padding: '20px', boxSizing: 'border-box' }}>
            <DocViewer
                documents={docs}
                pluginRenderers={DocViewerRenderers}
                style={{ width: '100%', height: '100%' }}
            />
        </div>
    );
};

export default DocViewerComponent;
