
import React, { useState } from 'react';
import './App.css'; 

const App = () => {
  const [students, setStudents] = useState([]);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '' });
  const [editingIndex, setEditingIndex] = useState(null);

  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingIndex !== null) {
      
      const updatedStudents = students.map((student, index) =>
        index === editingIndex ? formData : student
      );
      setStudents(updatedStudents);
      setEditingIndex(null);
    } else {
      
      setStudents([...students, formData]);
    }
    setFormData({ name: '', email: '', phone: '' });
  };

  
  const handleEdit = (index) => {
    setEditingIndex(index);
    setFormData(students[index]);
  };

  
  const handleDelete = (index) => {
    const updatedStudents = students.filter((_, i) => i !== index);
    setStudents(updatedStudents);
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Student Data List</h1>

      
      <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          required
          style={{ marginRight: '10px' }}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
          style={{ marginRight: '10px' }}
        />
        <input
          type="text"
          name="phone"
          placeholder="Phone"
          value={formData.phone}
          onChange={handleChange}
          required
          style={{ marginRight: '10px' }}
        />
        <button type="submit" style={{ padding: '5px 15px' }}>
          {editingIndex !== null ? 'Update' : 'Add'}
        </button>
      </form>

      
      <table border="1" style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.length > 0 ? (
            students.map((student, index) => (
              <tr key={index}>
                <td>{student.name}</td>
                <td>{student.email}</td>
                <td>{student.phone}</td>
                <td>
                  <button
                    className="edit-btn"
                    onClick={() => handleEdit(index)}
                    style={{ marginRight: '10px' }}
                  >
                    Edit
                  </button>
                  <button
                    className="delete-btn"
                    onClick={() => handleDelete(index)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" style={{ textAlign: 'center' }}>
                No Students Found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default App;

