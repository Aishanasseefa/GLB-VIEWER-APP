import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ModelViewer from './ModelViewer';

export default function Dashboard() {
  const [file, setFile] = useState(null);
  const [models, setModels] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch models from backend
  const fetchModels = async () => {
    try {
      const res = await axios.get('https://glb-viewer-app.onrender.com/api/models');
      setModels(res.data);
    } catch (err) {
      console.error('Error fetching models:', err);
    }
  };

  useEffect(() => {
    fetchModels();
  }, []);

  // Upload model
  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) return;
    setLoading(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      await axios.post('https://glb-viewer-app.onrender.com/api/models/upload', formData);
      setFile(null);
      fetchModels();
    } catch (err) {
      console.error('Upload failed:', err);
    } finally {
      setLoading(false);
    }
  };

  // Delete model
  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://glb-viewer-app.onrender.com/api/models/${id}`);
      fetchModels();
    } catch (err) {
      console.error('Delete failed:', err);
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      {/* HEADER */}
      <header style={{ textAlign: 'center', marginBottom: '30px' }}>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '10px' }}>
          GLB Model Viewer Dashboard
        </h1>
        <p style={{ fontSize: '1rem', color: '#555' }}>
          Upload, view, and manage your 3D GLB models easily.
        </p>
      </header>

      {/* UPLOAD SECTION */}
      <section
        style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '10px',
          marginBottom: '40px',
          background: '#f9f9f9',
          padding: '20px',
          borderRadius: '8px',
          boxShadow: '0 4px 8px rgba(0,0,0,0.05)'
        }}
      >
        <input
          type="file"
          accept=".glb"
          onChange={(e) => setFile(e.target.files[0])}
        />
        <button
          onClick={handleUpload}
          disabled={loading}
          style={{
            padding: '10px 20px',
            backgroundColor: '#007bff',
            color: '#fff',
            border: 'none',
            borderRadius: '4px',
            fontSize: '16px',
            cursor: 'pointer'
          }}
        >
          {loading ? 'Uploading...' : 'Upload'}
        </button>
      </section>

      {/* UPLOADED MODELS */}
      <h2 style={{ fontSize: '1.8rem', fontWeight: 'bold', marginBottom: '20px' }}>
        Uploaded Models
      </h2>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '20px'
        }}
      >
        {models.map((model) => (
          <div
            key={model._id}
            style={{
              border: '1px solid #ddd',
              borderRadius: '8px',
              padding: '16px',
              textAlign: 'center',
              boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
              backgroundColor: '#fff'
            }}
          >
            <h3 style={{ marginBottom: '10px' }}>{model.name}</h3>
            <ModelViewer modelUrl={model.fileUrl} />
            <button
              onClick={() => handleDelete(model._id)}
              style={{
                marginTop: '10px',
                padding: '10px 16px',
                backgroundColor: '#dc3545',
                color: '#fff',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '14px'
              }}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
