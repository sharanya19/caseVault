// pages/index.tsx

import { useState, useEffect } from 'react';
import axiosInstance from '../utils/axios';
import { API_PATH } from '../utils/appRoutes';
import { Document } from '../types/api';
import { Container, Typography, TextField, Button, Box, List, ListItem, CircularProgress, Alert } from '@mui/material';

export default function Dashboard() {
  const [file, setFile] = useState<File | null>(null);
  const [documents, setDocuments] = useState<Document[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    } else {
      setFile(null);
    }
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return;

    setLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append('file', file);
    formData.append('title', 'new');  // Add additional metadata if needed

    try {
      await axiosInstance.post(API_PATH.UPLOAD_DOCUMENT, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',  // Ensure correct content type for file uploads
        },
      });
      fetchDocuments(); // Refresh documents after upload
    } catch (error) {
      console.error('Upload failed:', error);
      setError('Upload failed');
    } finally {
      setLoading(false);
    }
  };

  const fetchDocuments = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await axiosInstance.get(API_PATH.DOCUMENT_LIST); // Ensure correct API path for listing documents
      setDocuments(response.data);
    } catch (error) {
      console.error('Failed to fetch documents', error);
      setError('Failed to fetch documents');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDocuments();
  }, []);

  return (
    <Container maxWidth="md" sx={{ padding: 3 }}>
      <Typography 
        variant="h1" 
        component="h1" 
        gutterBottom 
        sx={{ 
          fontWeight: 'bold', 
          fontSize: '2rem',    
          whiteSpace: 'nowrap',
          overflow: 'hidden',   
          textOverflow: 'ellipsis' 
        }}
      >
        CASE MANAGEMENT SYSTEM
      </Typography>
      
      <Box mb={4}>
        <Typography variant="h4" component="h4" gutterBottom>
          Upload Document
        </Typography>
        <form onSubmit={handleUpload}>
          <TextField
            type="file"
            onChange={handleFileChange}
            fullWidth
            margin="normal"
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} /> : 'Upload'}
          </Button>
          {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
        </form>
      </Box>

      <Box>
        <Typography variant="h4" component="h4" gutterBottom>
          Review Documents
        </Typography>
        {loading ? (
          <CircularProgress />
        ) : (
          <List>
            {documents.map((doc) => (
              <ListItem key={doc.id}>
                {doc.title}
              </ListItem>
            ))}
            {documents.length === 0 && <Typography>No documents found</Typography>}
          </List>
        )}
        {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
      </Box>
    </Container>
  );
}
