// pages/review.tsx

import { useEffect, useState } from 'react';
import axiosInstance from '../utils/axios';
import { API_PATH } from '../utils/appRoutes';
import { Document } from '../types/api';
import { Container, Typography, List, ListItem, CircularProgress, Alert, Link } from '@mui/material';

export default function Review() {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDocuments = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await axiosInstance.get(API_PATH.DOCUMENT_LIST); // Use the correct API path
        setDocuments(response.data);
      } catch (error) {
        console.error('Failed to fetch documents', error);
        setError('Failed to fetch documents');
      } finally {
        setLoading(false);
      }
    };

    fetchDocuments();
  }, []);

  return (
    <Container maxWidth="md" sx={{ padding: 3 }}>
      <Typography variant="h1" component="h1" gutterBottom>
        Review Documents
      </Typography>
      {loading ? (
        <CircularProgress />
      ) : (
        <List>
          {documents.map((doc) => (
            <ListItem key={doc.id}>
              <Link href={`/document/${doc.id}`} underline="hover">
                {doc.title}
              </Link>
            </ListItem>
          ))}
          {documents.length === 0 && <Typography>No documents found</Typography>}
        </List>
      )}
      {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
    </Container>
  );
}
