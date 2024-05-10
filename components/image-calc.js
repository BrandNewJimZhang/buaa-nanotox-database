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
        <div>
            <form onSubmit={handleUpload}>
                <input type="file" name="file" id="file" required />
                <button type="submit">Upload</button>
            </form>
            {imageUrl && <img src={imageUrl} alt="Plot" />}  // Render the image if the URL is set
        </div>
    );
}