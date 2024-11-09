import axios from "axios";

const api = axios.create({
    baseURL: "https://localhost:7057/api",
});

//get all students
export const GetStudentsData = () => {
    return api.get("/Student");
}

// save student record
// export const SaveStudentData = (data) => {
//     return api.post("/Student", data);
// }

export const SaveStudentData = (formData) => {
    // Ensure that FormData is correctly received here and not overwritten
    console.log(formData); // Debugging line
    return api.post('/Student', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });

};

//delete student record
export const DeleteStudentData = (id) => {
    return api.delete(`/Student/${id}`);
}

//get single student record
export const GetSingleStudentData = (id) => {
    return api.get(`/Student/StudentGet/${id}`);
}

// update existing student record
export const UpdateStudentData = (id, formData) => {
    return api.put(`/Student/StudentUpdate/${id}`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
};

