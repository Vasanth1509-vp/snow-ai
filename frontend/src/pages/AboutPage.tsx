import React from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Paper,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Link,
} from '@mui/material';
import {
  Psychology as PsychologyIcon,
  Code as CodeIcon,
  Speed as SpeedIcon,
  Community as CommunityIcon,
  GitHub as GitHubIcon,
  Launch as LaunchIcon,
  CheckCircle as CheckCircleIcon,
} from '@mui/icons-material';
import { motion } from 'framer-motion';

const MotionCard = motion(Card);
const MotionBox = motion(Box);

const features = [
  {
    icon: <PsychologyIcon sx={{ fontSize: 40, color: 'primary.main' }} />,
    title: 'AI-Powered Intelligence',
    description: 'Advanced AI technology trained on ServiceNow community content to provide accurate, context-aware responses.',
  },
  {
    icon: <CommunityIcon sx={{ fontSize: 40, color: 'primary.main' }} />,
    title: 'Community-Driven Content',
    description: 'Curated knowledge from ServiceNow community forums, documentation, and expert contributions.',
  },
  {
    icon: <SpeedIcon sx={{ fontSize: 40, color: 'primary.main' }} />,
    title: 'Fast & Efficient',
    description: 'Get instant answers to your ServiceNow questions without browsing through multiple forum posts.',
  },
  {
    icon: <CodeIcon sx={{ fontSize: 40, color: 'primary.main' }} />,
    title: 'Developer-Focused',
    description: 'Specifically designed for ServiceNow developers, administrators, and technical professionals.',
  },
];

const techStack = [
  'React 18 with TypeScript',
  'Material-UI for modern design',
  'FastAPI backend with Python',
  'PostgreSQL database',
  'OpenAI GPT integration',
  'Docker containerization',
  'Redis for caching',
  'Celery for background tasks',
];

const AboutPage: React.FC = () => {
  return (
    <Box>
      {/* Header */}
      <Paper sx={{ p: 4, mb: 4, background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white' }}>
        <MotionBox
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          sx={{ textAlign: 'center' }}
        >
          <Typography variant="h3" gutterBottom sx={{ fontWeight: 700 }}>
            About ServiceNow AI Assistant
          </Typography>
          <Typography variant="h6" sx={{ opacity: 0.9, maxWidth: '800px', mx: 'auto' }}>
            An intelligent AI-powered platform designed to help ServiceNow developers and administrators
            find solutions faster and learn best practices efficiently.
          </Typography>
        </MotionBox>
      </Paper>

      {/* Mission Statement */}
      <MotionBox
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        sx={{ mb: 6 }}
      >
        <Card sx={{ p: 4 }}>
          <Typography variant="h4" gutterBottom sx={{ fontWeight: 600, textAlign: 'center' }}>
            Our Mission
          </Typography>
          <Typography variant="body1" sx={{ fontSize: '1.1rem', lineHeight: 1.7, textAlign: 'center', maxWidth: '800px', mx: 'auto' }}>
            To democratize ServiceNow knowledge by making expert-level insights and solutions accessible 
            to developers at all skill levels through AI technology. We believe that everyone should have 
            instant access to the collective wisdom of the ServiceNow community.
          </Typography>
        </Card>
      </MotionBox>

      {/* Features */}
      <MotionBox
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        sx={{ mb: 6 }}
      >
        <Typography variant="h4" component="h2" textAlign="center" gutterBottom sx={{ mb: 4, fontWeight: 600 }}>
          Key Features
        </Typography>
        <Grid container spacing={4}>
          {features.map((feature, index) => (
            <Grid item xs={12} md={6} key={index}>
              <MotionCard
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                sx={{
                  height: '100%',
                  p: 3,
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: '0 8px 25px -5px rgba(0, 0, 0, 0.1)',
                  },
                  transition: 'all 0.3s ease-in-out',
                }}
              >
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                    <Box sx={{ flexShrink: 0 }}>{feature.icon}</Box>
                    <Box>
                      <Typography variant="h6" component="h3" gutterBottom sx={{ fontWeight: 600 }}>
                        {feature.title}
                      </Typography>
                      <Typography color="text.secondary">
                        {feature.description}
                      </Typography>
                    </Box>
                  </Box>
                </CardContent>
              </MotionCard>
            </Grid>
          ))}
        </Grid>
      </MotionBox>

      {/* Technology Stack */}
      <Grid container spacing={4} sx={{ mb: 6 }}>
        <Grid item xs={12} md={6}>
          <MotionCard
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            sx={{ height: '100%' }}
          >
            <CardContent sx={{ p: 3 }}>
              <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>
                <CodeIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
                Technology Stack
              </Typography>
              <Typography color="text.secondary" paragraph>
                Built with modern technologies for performance, scalability, and maintainability:
              </Typography>
              <List dense>
                {techStack.map((tech, index) => (
                  <ListItem key={index} sx={{ px: 0 }}>
                    <ListItemIcon sx={{ minWidth: 32 }}>
                      <CheckCircleIcon color="primary" fontSize="small" />
                    </ListItemIcon>
                    <ListItemText primary={tech} />
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </MotionCard>
        </Grid>
        
        <Grid item xs={12} md={6}>
          <MotionCard
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            sx={{ height: '100%' }}
          >
            <CardContent sx={{ p: 3 }}>
              <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>
                <CommunityIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
                How It Works
              </Typography>
              <Typography color="text.secondary" paragraph>
                Our AI assistant combines several technologies to provide accurate answers:
              </Typography>
              <List dense>
                <ListItem sx={{ px: 0 }}>
                  <ListItemIcon sx={{ minWidth: 32 }}>
                    <CheckCircleIcon color="primary" fontSize="small" />
                  </ListItemIcon>
                  <ListItemText primary="Web scraping of ServiceNow community content" />
                </ListItem>
                <ListItem sx={{ px: 0 }}>
                  <ListItemIcon sx={{ minWidth: 32 }}>
                    <CheckCircleIcon color="primary" fontSize="small" />
                  </ListItemIcon>
                  <ListItemText primary="Natural language processing for content analysis" />
                </ListItem>
                <ListItem sx={{ px: 0 }}>
                  <ListItemIcon sx={{ minWidth: 32 }}>
                    <CheckCircleIcon color="primary" fontSize="small" />
                  </ListItemIcon>
                  <ListItemText primary="AI-powered response generation with context" />
                </ListItem>
                <ListItem sx={{ px: 0 }}>
                  <ListItemIcon sx={{ minWidth: 32 }}>
                    <CheckCircleIcon color="primary" fontSize="small" />
                  </ListItemIcon>
                  <ListItemText primary="Continuous learning from user interactions" />
                </ListItem>
              </List>
            </CardContent>
          </MotionCard>
        </Grid>
      </Grid>

      {/* Contributing */}
      <MotionCard
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        sx={{ p: 4, mb: 4, textAlign: 'center' }}
      >
        <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>
          <GitHubIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
          Open Source Project
        </Typography>
        <Typography color="text.secondary" paragraph sx={{ maxWidth: '600px', mx: 'auto' }}>
          This project is open source and welcomes contributions from the ServiceNow community. 
          Help us improve the platform by contributing code, reporting issues, or suggesting features.
        </Typography>
        <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link
            href="https://github.com/servicenow-ai/snow-ai"
            target="_blank"
            rel="noopener noreferrer"
            underline="none"
          >
            <Card sx={{ p: 2, '&:hover': { bgcolor: 'action.hover' }, cursor: 'pointer' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <GitHubIcon />
                <Typography variant="body2" sx={{ fontWeight: 500 }}>
                  View on GitHub
                </Typography>
                <LaunchIcon fontSize="small" />
              </Box>
            </Card>
          </Link>
        </Box>
      </MotionCard>

      {/* Disclaimer */}
      <Paper sx={{ p: 3, bgcolor: 'grey.50' }}>
        <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center' }}>
          <strong>Disclaimer:</strong> This is an independent project and is not affiliated with, endorsed by, 
          or sponsored by ServiceNow, Inc. ServiceNow is a trademark of ServiceNow, Inc. 
          This tool is provided for educational and development purposes.
        </Typography>
      </Paper>
    </Box>
  );
};

export default AboutPage;