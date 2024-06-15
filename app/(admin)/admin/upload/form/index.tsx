import React, { useRef, ChangeEvent, DragEvent, MouseEvent } from 'react';
import axios from 'axios';
import useFileUpload from 'react-use-file-upload';
import { CloudUpload } from 'lucide-react';
import CustomButton from '@/app/components/button/index';


const CSS: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    margin: '20px',
};

const ListCSS: React.CSSProperties = {
    margin: '20px 0',
};

const DropzoneCSS: React.CSSProperties = {
    border: '2px dashed #E5B671',
    padding: '30px',
    textAlign: 'center',
    margin: '20px 0',
    cursor: 'pointer',
};

const FileUploadForm: React.FC = () => {
    const {
        files,
        fileNames,
        fileTypes,
        totalSize,
        totalSizeInBytes,
        handleDragDropEvent,
        clearAllFiles,
        createFormData,
        setFiles,
        removeFile,
    } = useFileUpload();

    const inputRef = useRef<HTMLInputElement | null>(null);

    const handleSubmit = async (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        const formData = createFormData();

        try {
            await axios.post('https://some-api.com', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log('Files submitted successfully.');
        } catch (error) {
            console.error('Failed to submit files.', error);
        }
    };

    return (
        <div style={CSS}>

            <div className="form-container">
                {/* Display the files to be uploaded */}
                <div style={ListCSS}>
                    <ul>
                        {fileNames.map((name) => (
                            <li key={name}>
                                <span>{name}</span>
                                <span onClick={() => removeFile(name)} style={{ cursor: 'pointer', marginLeft: '10px', color: 'red' }}>
                                    <i className="fa fa-times" />
                                </span>
                            </li>
                        ))}
                    </ul>

                    {files.length > 0 && (
                        <ul>
                            <li>File types found: {fileTypes.join(', ')}</li>
                            <li>Total Size: {totalSize}</li>
                            <li>Total Bytes: {totalSizeInBytes}</li>
                            <li className="clear-all">
                                <button onClick={clearAllFiles}>Clear All</button>
                            </li>
                        </ul>
                    )}
                </div>

                {/* Provide a drop zone and an alternative button inside it to upload files. */}
                <div
                    className="bg-slate-200"
                    style={DropzoneCSS}
                    onDragEnter={handleDragDropEvent as (e: DragEvent<HTMLDivElement>) => void}
                    onDragOver={handleDragDropEvent as (e: DragEvent<HTMLDivElement>) => void}
                    onDrop={(e: DragEvent<HTMLDivElement>) => {
                        handleDragDropEvent(e);
                        setFiles(e, 'a');
                    }}
                >

                    <div className="text-center">
                        <div className='flex justify-center'>
                            <CloudUpload className="h-6 w-6 text-customPrimary" />

                        </div>


                        <button type="button" className='' onClick={() => inputRef.current?.click()}> Drag and drop files here Or select files to upload</button>


                    </div>




                    {/* Hide the default HTML input */}
                    <input
                        ref={inputRef}
                        type="file"
                        multiple
                        style={{ display: 'none' }}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => {
                            setFiles(e, 'a');
                            if (inputRef.current) {
                                inputRef.current.value = '';
                            }
                        }}
                    />
                </div>
            </div>

            <div className="submit">
                <CustomButton type="submit" loading={false}>
                    Upload
                </CustomButton>
                {/* <button type="button" onClick={handleSubmit}>Submit</button> */}
            </div>
        </div>
    );
};

export default FileUploadForm;
