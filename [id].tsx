// pages/document/[id].tsx

import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import axiosInstance from '../../utils/axios';
import { API_PATH } from '../../utils/appRoutes';
import { Container, Typography, CircularProgress, Alert } from '@mui/material';

export default function DocumentDetail() {
  const router = useRouter();
  const { id } = router.query;
  const [document, setDocument] = useState<any>(null); // Use a type or interface if available
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDocument = async () => {
      if (!id) return;

      setLoading(true);
      setError(null);

      try {
        const response = await axiosInstance.get(`${API_PATH.REVIEW_DOCUMENT}/${id}/`); // Correct API path for document details
        setDocument(response.data);
      } catch (error) {
        console.error('Failed to fetch document', error);
        setError('Failed to fetch document');
      } finally {
        setLoading(false);
      }
    };

    fetchDocument();
  }, [id]);

  return (
    <Container maxWidth="md" sx={{ padding: 3 }}>
      <Typography variant="h1" component="h1" gutterBottom>
        Document Detail
      </Typography>
      {loading ? (
        <CircularProgress />
      ) : (
        <div>
          {/* Display document details or an empty page */}
          <Typography variant="h4" component="h4">
            {document ? `Document ID: ${document.id}` : 'No document details available'}
          </Typography>
        </div>
      )}
      {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
    </Container>
  );
}
