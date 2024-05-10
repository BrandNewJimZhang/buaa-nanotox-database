import { useState } from 'react';

export default function ImageCalc() {
    const [imageUrl, setImageUrl] = useState('');

    const handleUpload = async (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append('file', event.target.file.files[0]);

        const response = await fetch('/api/upload', {
            method: 'POST',
            body: formData,
        });

        const result = await response.json();
        if (response.ok) {
            setImageUrl(result.imageUrl);  // Set the image URL from the response
        } else {
            console.error('Failed to upload and process the file:', result.error);
        }
    }; 

    return (
        <form onSubmit={handleUpload}>
            {/* Make sure to add "id" for label "htmlFor" */}
            <label htmlFor="fileInput">Choose a file:</label>
            <input type="file" id="fileInput" name="file" className='file-button' required />
            <button type="submit" className='file-button'>Upload</button>
            <div className="image-container">
                {imageUrl && <img src={imageUrl} alt="Plot" />}
            </div>
        </form>
    );
}