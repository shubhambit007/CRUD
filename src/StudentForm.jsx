import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function StudentForm() {
  const [students, setStudents] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    rollNo: '',
    department: '',
    email: '',
    phone: ''
  });
  const [editIndex, setEditIndex] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editIndex !== null) {
      const updatedStudents = [...students];
      updatedStudents[editIndex] = formData;
      setStudents(updatedStudents);
      setEditIndex(null);
    } else {
      setStudents([...students, formData]);
    }

    setFormData({
      name: '',
      rollNo: '',
      department: '',
      email: '',
      phone: ''
    });
  };

  const handleEdit = (index) => {
    setFormData(students[index]);
    setEditIndex(index);
  };

  const handleDelete = (index) => {
    const updatedStudents = students.filter((_, i) => i !== index);
    setStudents(updatedStudents);
    if (editIndex === index) {
      setFormData({
        name: '',
        rollNo: '',
        department: '',
        email: '',
        phone: ''
      });
      setEditIndex(null);
    }
  };

  return (
    <div className="container py-5">
      <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap" rel="stylesheet" />
      <style>
        {`
          body {
            font-family: 'Poppins', sans-serif;
            background-color: #f8f9fa;
          }
          h2, h3 {
            font-weight: 600;
          }
          .form-label {
            font-weight: 500;
          }
          .btn {
            font-weight: 500;
            letter-spacing: 0.5px;
          }
          table th {
            font-weight: 600;
          }
        `}
      </style>

      <div className="bg-white p-4 rounded shadow-sm">
        <h2 className="mb-4 fw-bold text-primary text-center">Student Entry Form</h2>
        <form onSubmit={handleSubmit} className="row g-3 mb-4">
          {["name", "rollNo", "department", "email", "phone"].map((field, i) => (
            <div className="col-md-6" key={i}>
              <label className="form-label text-capitalize">
                {field.replace("No", " No")}
              </label>
              <input
                type={field === "email" ? "email" : "text"}
                className="form-control"
                name={field}
                value={formData[field]}
                onChange={handleChange}
                required
              />
            </div>
          ))}
          <div className="col-12 text-center">
            <button type="submit" className="btn btn-success px-5">
              {editIndex !== null ? 'Update Student' : 'Add Student'}
            </button>
          </div>
        </form>
      </div>

      <div className="mt-5 bg-white p-4 rounded shadow-sm">
        <h3 className="text-center mb-3">Student List</h3>
        <table className="table table-bordered table-hover table-striped text-center">
          <thead className="table-dark">
            <tr>
              <th>Name</th>
              <th>Roll No</th>
              <th>Department</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {students.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-muted">No students added yet.</td>
              </tr>
            ) : (
              students.map((student, idx) => (
                <tr key={idx}>
                  <td>{student.name}</td>
                  <td>{student.rollNo}</td>
                  <td>{student.department}</td>
                  <td>{student.email}</td>
                  <td>{student.phone}</td>
                  <td>
                    <button
                      className="btn btn-warning btn-sm me-2"
                      onClick={() => handleEdit(idx)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleDelete(idx)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default StudentForm;
