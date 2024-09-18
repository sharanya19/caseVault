// pages/login.tsx

import React, { useState } from 'react';
import { Container, Box, TextField, Button, Typography, Alert } from "@mui/material";
import axios from '@/utils/axios'; // Adjust the path if necessary
import { API_PATH } from '@/utils/appRoutes'; // Adjust the path if necessary
import { useRouter } from 'next/router';
import { setToken } from '@/utils/auth';

interface LoginResponse {
    access: string;
    refresh: string;
}

export default function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    const handleLogin = () => {
        setError(null); // Reset error state before login attempt

        if (!username || !password) {
            setError("Username and Password are required");
            return;
        }

        axios.post<LoginResponse>(API_PATH.LOGIN, { username, password })
            .then((response) => {
                setToken(response.data.access);
                router.push('/');
            })
            .catch((error) => {
                console.error('Login failed:', error);
                setError('Invalid username or password');
            });
    };

    return (
        <Container
        maxWidth="md"
        sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '100vh'
        }}
    >
        <Box 
            display="flex" 
            flexDirection="column" 
            alignItems="center" 
            justifyContent="center" 
            padding={4}
            bgcolor="#f5f5f5"
            borderRadius={2}
            boxShadow={3}
            sx={{
                width: '100%',
                maxWidth: 400,
                height: 'auto',
                maxHeight: 500,
                minHeight: 300,
            }}
            >
                <Typography variant="h4" component="h1" gutterBottom sx={{ color: 'black' }}>
                    Login
                </Typography>

                {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

                <TextField
                    label="Username"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    sx={{
                        '& .MuiInputBase-root': {
                            backgroundColor: '#ffffff',
                        },
                    }}
                />
                <TextField
                    label="Password"
                    variant="outlined"
                    type="password"
                    fullWidth
                    margin="normal"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    sx={{
                        '& .MuiInputBase-root': {
                            backgroundColor: '#ffffff',
                        },
                    }}
                />
                <Button 
                    variant="contained" 
                    color="primary" 
                    fullWidth 
                    onClick={handleLogin}
                    sx={{ 
                        mt: 2, 
                        mb: 2,
                        bgcolor: '#1976d2',
                        color: '#fff',
                        '&:hover': {
                            bgcolor: '#1565c0',
                        },
                    }}
                >
                    Login
                </Button>
            </Box>
        </Container>
    );
}
