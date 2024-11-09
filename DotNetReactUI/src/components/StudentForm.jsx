// import React, { useEffect, useState } from 'react';
// import { SaveStudentData, UpdateStudentData } from '../api/StudentApi';

// const StudentForm = ({ initialData = {}, onSubmitComplete }) => {
//     // Initialize state with proper defaults
//     const [name, setName] = useState(initialData.name || '');
//     const [imageFile, setImageFile] = useState(null);
//     const [previewImage, setPreviewImage] = useState(initialData.image || '');

//     useEffect(() => {
//         // Only set state for editing if initialData has values
//         if (initialData && initialData.name) {
//             setName(initialData.name);
//             setPreviewImage(initialData.image);
//         } else {
//             // Reset form fields if switching from an edit to add mode
//             setName('');
//             setPreviewImage('');
//         }
//     }, [initialData]);

//     const handleFileChange = (e) => {
//         const file = e.target.files[0];
//         setImageFile(file);
//         if (file) {
//             setPreviewImage(URL.createObjectURL(file));
//         }
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         // Make sure to handle name and image data properly
//         const formData = new FormData();
//         formData.append('Name', name);
//         if (initialData && initialData.id) {
//             formData.append('Id', initialData.id);
//         }
//         if (imageFile) {
//             formData.append('ImageFile', imageFile);
//         }

//         try {
//             if (initialData && initialData.id) {
//                 // Update existing student
//                 await UpdateStudentData(initialData.id, formData);
//                 alert('Student updated successfully!');
//             } else {
//                 // Add new student
//                 await SaveStudentData(formData);
//                 alert('Student added successfully!');
//             }
//             onSubmitComplete(); // Callback to refresh the list
//         } catch (error) {
//             console.error('Error submitting student data:', error);
//             alert('Error submitting student data.');
//         }
//     };

//     return (
//         <div className="max-w-md mx-auto bg-white p-6 shadow-lg rounded-lg mt-6">
//             <h2 className="text-2xl font-semibold mb-4 text-center">
//                 {initialData && initialData.id ? 'Update Student' : 'Add New Student'}
//             </h2>
//             <form onSubmit={handleSubmit} className="space-y-4">
//                 <div>
//                     <label className="block text-gray-700 font-medium mb-1">Name:</label>
//                     <input
//                         type="text"
//                         value={name}
//                         onChange={(e) => setName(e.target.value)}
//                         required
//                         className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:border-blue-500"
//                     />
//                 </div>
//                 {previewImage && (
//                     <div className="mb-4">
//                         <label className="block text-gray-700 font-medium mb-1">Current Image:</label>
//                         <img
//                             src={previewImage}
//                             alt="Preview"
//                             className="w-24 h-24 rounded-full object-cover mx-auto"
//                         />
//                     </div>
//                 )}
//                 <div>
//                     <label className="block text-gray-700 font-medium mb-1">Image:</label>
//                     <input
//                         type="file"
//                         accept="image/*"
//                         onChange={handleFileChange}
//                         className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none"
//                     />
//                 </div>
//                 <button
//                     type="submit"
//                     className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors"
//                 >
//                     {initialData && initialData.id ? 'Update' : 'Add'}
//                 </button>
//             </form>
//         </div>
//     );
// };

// export default StudentForm;


import React, { useEffect, useState } from 'react';
import { SaveStudentData, UpdateStudentData } from '../api/StudentApi';

const StudentForm = ({ initialData = {}, onSubmitComplete }) => {
    const [name, setName] = useState(initialData.name || '');
    const [imageFile, setImageFile] = useState(null);
    const [previewImage, setPreviewImage] = useState(initialData.image || '');

    useEffect(() => {
        if (initialData && initialData.name) {
            setName(initialData.name);
            setPreviewImage(initialData.image);
        } else {
            setName('');
            setPreviewImage('');
        }
    }, [initialData]);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setImageFile(file);
        if (file) {
            setPreviewImage(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Ensure that form data includes all necessary fields
        const formData = new FormData();
        formData.append('Name', name);

        // Append image if selected
        if (imageFile) {
            formData.append('ImageFile', imageFile);
        }

        // Include student ID if updating existing student
        if (initialData && initialData.id) {
            formData.append('Id', initialData.id);
        }

        try {
            if (initialData && initialData.id) {
                // Update existing student
                await UpdateStudentData(initialData.id, formData);
                alert('Student updated successfully!');
            } else {
                // Add new student
                await SaveStudentData(formData);
                alert('Student added successfully!');
            }
            onSubmitComplete(); // Callback to refresh the list
        } catch (error) {
            console.error('Error submitting student data:', error);
            alert('Error submitting student data.');
        }
    };

    return (
        <div className="max-w-md mx-auto bg-white p-6 shadow-lg rounded-lg mt-6">
            <h2 className="text-2xl font-semibold mb-4 text-center">
                {initialData && initialData.id ? 'Update Student' : 'Add New Student'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-gray-700 font-medium mb-1">Name:</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:border-blue-500"
                    />
                </div>
                {previewImage && (
                    <div className="mb-4">
                        <label className="block text-gray-700 font-medium mb-1">Current Image:</label>
                        <img
                            src={previewImage}
                            alt="Preview"
                            className="w-24 h-24 rounded-full object-cover mx-auto"
                        />
                    </div>
                )}
                <div>
                    <label className="block text-gray-700 font-medium mb-1">Image:</label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none"
                    />
                </div>
                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors"
                >
                    {initialData && initialData.id ? 'Update' : 'Add'}
                </button>
            </form>
        </div>
    );
};

export default StudentForm;
