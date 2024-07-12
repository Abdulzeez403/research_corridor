// components/DocViewerComponent.js

import React from 'react';
import DocViewer, { DocViewerRenderers } from 'react-doc-viewer';

const DocViewerComponent = () => {
    const docs = [
        { uri: 'https://res.cloudinary.com/dhxco7i18/raw/upload/v1720746578/validation_documents/1720746577766-Presentation.docx' },
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
