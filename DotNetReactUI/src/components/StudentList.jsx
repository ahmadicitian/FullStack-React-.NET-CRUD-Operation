import React, { useEffect, useState } from 'react';
import { DeleteStudentData, GetSingleStudentData, GetStudentsData } from '../api/StudentApi';
import StudentForm from './StudentForm'; // Import your form component

const StudentList = () => {
    const [data, setData] = useState([]);
    const [showForm, setShowForm] = useState(false); // Track form visibility
    const [stdData, setStdData] = useState({});

    // Get All Student Record
    const GET = async () => {
        try {
            const response = await GetStudentsData();
            setData(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    // Delete Student Record
    const handleDelete = async (id) => {
        try {
            await DeleteStudentData(id);
            setData((prev) => prev.filter((item) => item.id !== id));
            alert("Student Record Deleted Successfully");
        } catch (error) {
            console.error("Error deleting student:", error);
            alert("Failed to delete student record. Please try again.");
        }
    };

    // Handle Edit Button Click
    const handleEdit = async (id) => {
        try {
            const response = await GetSingleStudentData(id);
            setStdData(response.data);
            setShowForm(true); // Open the form when editing
        } catch (error) {
            console.error("Error getting the student record:", error);
        }
    };

    useEffect(() => {
        GET();
    }, []);

    return (
        <div className="container mx-auto p-4">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-semibold text-gray-800">Student List</h1>
                <button
                    onClick={() => setShowForm(!showForm)}
                    className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-all"
                >
                    {showForm ? 'Cancel' : 'Add New Student'}
                </button>
            </div>

            {showForm && (
                <div className="mb-6">
                    <StudentForm
                        initialData={stdData}
                        onSubmitComplete={() => {
                            GET(); // Refresh the list after submitting
                            setShowForm(false); // Close the form after submission
                            setStdData({}); // Clear form data after submission
                        }}
                    />
                </div>
            )}

            <div className="overflow-x-auto">
                <table className="min-w-full bg-white shadow-md rounded-lg">
                    <thead>
                        <tr>
                            <th className="py-3 px-6 text-left text-gray-700">Name</th>
                            <th className="py-3 px-6 text-left text-gray-700">Image</th>
                            <th className="py-3 px-6 text-left text-gray-700">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((item) => (
                            <tr key={item.id} className="border-t hover:bg-gray-100">
                                <td className="py-3 px-6 text-gray-800">{item.name}</td>
                                <td className="py-3 px-6">
                                    <img
                                        src={item.image}
                                        alt="Student"
                                        className="w-12 h-12 rounded-full object-cover"
                                    />
                                </td>
                                <td className="py-3 px-6">
                                    <button
                                        onClick={() => handleEdit(item.id)}
                                        className="bg-yellow-500 text-white py-1 px-4 rounded-lg hover:bg-yellow-600 transition-all mr-2"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDelete(item.id)}
                                        className="bg-red-500 text-white py-1 px-4 rounded-lg hover:bg-red-600 transition-all"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default StudentList;
