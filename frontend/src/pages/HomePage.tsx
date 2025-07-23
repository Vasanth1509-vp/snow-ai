import React from 'react';
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  Grid,
  Container,
  Chip,
} from '@mui/material';
import {
  Chat as ChatIcon,
  Search as SearchIcon,
  Code as CodeIcon,
  Speed as SpeedIcon,
  Psychology as PsychologyIcon,
  Community as CommunityIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const MotionCard = motion(Card);
const MotionBox = motion(Box);

const features = [
  {
    icon: <PsychologyIcon sx={{ fontSize: 40, color: 'primary.main' }} />,
    title: 'AI-Powered Answers',
    description: 'Get intelligent responses to your ServiceNow questions powered by advanced AI technology.',
  },
  {
    icon: <CommunityIcon sx={{ fontSize: 40, color: 'primary.main' }} />,
    title: 'Community Knowledge',
    description: 'Access curated content from the ServiceNow community, forums, and documentation.',
  },
  {
    icon: <SpeedIcon sx={{ fontSize: 40, color: 'primary.main' }} />,
    title: 'Fast Solutions',
    description: 'Find solutions quickly with our intelligent search and categorization system.',
  },
];

const quickTopics = [
  'Business Rules',
  'Script Includes',
  'Flow Designer',
  'REST APIs',
  'Client Scripts',
  'UI Policies',
  'ACLs',
  'Integrations',
  'Performance',
  'Best Practices',
];

const HomePage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Container maxWidth="lg">
      <MotionBox
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Hero Section */}
        <Box sx={{ textAlign: 'center', mb: 6, py: 4 }}>
          <Typography
            variant="h2"
            component="h1"
            gutterBottom
            sx={{
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              fontWeight: 700,
              mb: 2,
            }}
          >
            ServiceNow AI Assistant
          </Typography>
          <Typography
            variant="h5"
            color="text.secondary"
            paragraph
            sx={{ maxWidth: '600px', mx: 'auto', mb: 4 }}
          >
            Your intelligent companion for ServiceNow development. Get instant answers,
            explore best practices, and accelerate your ServiceNow journey.
          </Typography>
          
          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Button
              variant="contained"
              size="large"
              startIcon={<ChatIcon />}
              onClick={() => navigate('/chat')}
              sx={{
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                px: 4,
                py: 1.5,
                fontSize: '1.1rem',
              }}
            >
              Start AI Chat
            </Button>
            <Button
              variant="outlined"
              size="large"
              startIcon={<SearchIcon />}
              onClick={() => navigate('/browse')}
              sx={{ px: 4, py: 1.5, fontSize: '1.1rem' }}
            >
              Browse Q&A
            </Button>
          </Box>
        </Box>

        {/* Features Section */}
        <Box sx={{ mb: 6 }}>
          <Typography variant="h4" component="h2" textAlign="center" gutterBottom sx={{ mb: 4 }}>
            Why Choose Our AI Assistant?
          </Typography>
          <Grid container spacing={4}>
            {features.map((feature, index) => (
              <Grid item xs={12} md={4} key={index}>
                <MotionCard
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  sx={{
                    height: '100%',
                    textAlign: 'center',
                    p: 3,
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      boxShadow: '0 8px 25px -5px rgba(0, 0, 0, 0.1)',
                    },
                    transition: 'all 0.3s ease-in-out',
                  }}
                >
                  <CardContent>
                    <Box sx={{ mb: 2 }}>{feature.icon}</Box>
                    <Typography variant="h6" component="h3" gutterBottom sx={{ fontWeight: 600 }}>
                      {feature.title}
                    </Typography>
                    <Typography color="text.secondary">
                      {feature.description}
                    </Typography>
                  </CardContent>
                </MotionCard>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Quick Topics Section */}
        <MotionCard
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          sx={{ p: 4, mb: 4 }}
        >
          <Typography variant="h5" component="h3" gutterBottom sx={{ fontWeight: 600 }}>
            <CodeIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
            Popular ServiceNow Topics
          </Typography>
          <Typography color="text.secondary" paragraph>
            Explore these commonly discussed ServiceNow development topics:
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
            {quickTopics.map((topic, index) => (
              <Chip
                key={index}
                label={topic}
                onClick={() => navigate(`/chat?topic=${encodeURIComponent(topic)}`)}
                clickable
                sx={{
                  '&:hover': {
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    color: 'white',
                  },
                }}
              />
            ))}
          </Box>
        </MotionCard>

        {/* Call to Action */}
        <MotionBox
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          sx={{
            textAlign: 'center',
            p: 4,
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            borderRadius: 3,
            color: 'white',
          }}
        >
          <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>
            Ready to enhance your ServiceNow skills?
          </Typography>
          <Typography variant="body1" paragraph sx={{ opacity: 0.9 }}>
            Join thousands of ServiceNow developers who use our AI assistant to solve complex problems
            and learn best practices.
          </Typography>
          <Button
            variant="contained"
            size="large"
            onClick={() => navigate('/chat')}
            sx={{
              bgcolor: 'white',
              color: 'primary.main',
              '&:hover': {
                bgcolor: 'grey.100',
              },
              px: 4,
              py: 1.5,
            }}
          >
            Get Started Now
          </Button>
        </MotionBox>
      </MotionBox>
    </Container>
  );
};

export default HomePage;