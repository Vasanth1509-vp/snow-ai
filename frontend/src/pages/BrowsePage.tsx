import React, { useState, useEffect } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Chip,
  Grid,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Paper,
  InputAdornment,
  CircularProgress,
} from '@mui/material';
import {
  Search as SearchIcon,
  ExpandMore as ExpandMoreIcon,
  ThumbUp as ThumbUpIcon,
  CheckCircle as CheckCircleIcon,
  Category as CategoryIcon,
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import ReactMarkdown from 'react-markdown';

const MotionCard = motion(Card);

interface Question {
  id: number;
  title: string;
  content: string;
  category: string;
  tags: string;
  created_at: string;
  answers: Answer[];
}

interface Answer {
  id: number;
  content: string;
  is_accepted: boolean;
  votes: number;
  created_at: string;
}

const BrowsePage: React.FC = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    fetchQuestions();
    fetchCategories();
  }, [searchTerm, selectedCategory]);

  const fetchQuestions = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (searchTerm) params.append('search', searchTerm);
      if (selectedCategory) params.append('category', selectedCategory);
      
      const response = await fetch(`/api/questions?${params.toString()}`);
      if (response.ok) {
        const data = await response.json();
        setQuestions(data);
      }
    } catch (error) {
      console.error('Failed to fetch questions:', error);
      // Use sample data for demo
      setSampleData();
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await fetch('/api/questions/categories/list');
      if (response.ok) {
        const data = await response.json();
        setCategories(data);
      }
    } catch (error) {
      console.error('Failed to fetch categories:', error);
      setCategories(['Development', 'Administration', 'Integration', 'Best Practices']);
    }
  };

  const setSampleData = () => {
    const sampleQuestions: Question[] = [
      {
        id: 1,
        title: "How to create a Business Rule in ServiceNow?",
        content: "I need to create a business rule that automatically assigns incidents to a specific group based on the category. How can I do this?",
        category: "Development",
        tags: '["business-rule", "incident", "assignment"]',
        created_at: new Date().toISOString(),
        answers: [
          {
            id: 1,
            content: `To create a Business Rule for automatic assignment, follow these steps:

1. Navigate to **System Definition > Business Rules**
2. Click 'New' to create a new business rule
3. Fill in the form:
   - Name: Auto Assignment by Category
   - Table: Incident [incident]
   - When: before (for insert/update)
   - Insert: checked
   - Update: checked
   - Condition: category == 'hardware'
   - Advanced: checked

4. In the Advanced tab, add this script:
\`\`\`javascript
(function executeRule(current, previous /*null when async*/) {
    if (current.category == 'hardware') {
        current.assignment_group = 'Hardware Support Team';
    }
})(current, previous);
\`\`\`

This will automatically assign incidents with hardware category to the Hardware Support Team.`,
            is_accepted: true,
            votes: 15,
            created_at: new Date().toISOString(),
          }
        ]
      },
      {
        id: 2,
        title: "Best practices for ServiceNow Script Include development",
        content: "What are the best practices when developing Script Includes in ServiceNow? I want to ensure my code is maintainable and follows ServiceNow standards.",
        category: "Development",
        tags: '["script-include", "best-practices", "coding-standards"]',
        created_at: new Date().toISOString(),
        answers: [
          {
            id: 2,
            content: `Here are the key best practices for Script Include development:

**1. Naming Conventions:**
- Use PascalCase for Script Include names
- Use descriptive names that indicate functionality
- Avoid abbreviations

**2. Structure:**
\`\`\`javascript
var MyScriptInclude = Class.create();
MyScriptInclude.prototype = {
    initialize: function() {
        // Constructor code
    },
    
    myMethod: function(param1, param2) {
        // Method implementation
        return result;
    },
    
    type: 'MyScriptInclude'
};
\`\`\`

**3. Error Handling:**
- Always include try-catch blocks
- Log errors appropriately using gs.error()
- Return meaningful error messages

**4. Performance:**
- Avoid GlideRecord queries in loops
- Use GlideAggregate for counting
- Cache frequently used data

**5. Security:**
- Validate all inputs
- Use GlideSPScriptable for Service Portal access
- Follow principle of least privilege`,
            is_accepted: true,
            votes: 28,
            created_at: new Date().toISOString(),
          }
        ]
      }
    ];
    setQuestions(sampleQuestions);
  };

  const filteredQuestions = questions.filter(question => {
    const matchesSearch = !searchTerm || 
      question.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      question.content.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !selectedCategory || question.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleCategoryFilter = (category: string) => {
    setSelectedCategory(selectedCategory === category ? '' : category);
  };

  return (
    <Box>
      {/* Header */}
      <Paper sx={{ p: 3, mb: 3, background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white' }}>
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 600 }}>
          Browse ServiceNow Q&A
        </Typography>
        <Typography variant="body1" sx={{ opacity: 0.9 }}>
          Explore curated questions and answers from the ServiceNow community
        </Typography>
      </Paper>

      {/* Search and Filters */}
      <Box sx={{ mb: 3 }}>
        <TextField
          fullWidth
          placeholder="Search questions and answers..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          sx={{ mb: 2 }}
        />
        
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap' }}>
          <CategoryIcon sx={{ color: 'text.secondary' }} />
          <Typography variant="body2" color="text.secondary" sx={{ mr: 1 }}>
            Categories:
          </Typography>
          {categories.map((category) => (
            <Chip
              key={category}
              label={category}
              onClick={() => handleCategoryFilter(category)}
              color={selectedCategory === category ? 'primary' : 'default'}
              clickable
              variant={selectedCategory === category ? 'filled' : 'outlined'}
            />
          ))}
        </Box>
      </Box>

      {/* Questions List */}
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
          <CircularProgress />
        </Box>
      ) : (
        <Grid container spacing={3}>
          {filteredQuestions.map((question, index) => (
            <Grid item xs={12} key={question.id}>
              <MotionCard
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                sx={{ mb: 2 }}
              >
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                    <Typography variant="h6" component="h3" sx={{ fontWeight: 600, flex: 1 }}>
                      {question.title}
                    </Typography>
                    <Chip
                      label={question.category}
                      size="small"
                      color="primary"
                      variant="outlined"
                    />
                  </Box>
                  
                  <Typography color="text.secondary" paragraph>
                    {question.content}
                  </Typography>
                  
                  {/* Tags */}
                  <Box sx={{ mb: 2 }}>
                    {JSON.parse(question.tags || '[]').map((tag: string, tagIndex: number) => (
                      <Chip
                        key={tagIndex}
                        label={tag}
                        size="small"
                        variant="outlined"
                        sx={{ mr: 0.5, mb: 0.5 }}
                      />
                    ))}
                  </Box>

                  {/* Answers */}
                  {question.answers && question.answers.length > 0 && (
                    <Accordion>
                      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
                            {question.answers.length} Answer{question.answers.length !== 1 ? 's' : ''}
                          </Typography>
                          {question.answers.some(a => a.is_accepted) && (
                            <CheckCircleIcon color="success" fontSize="small" />
                          )}
                        </Box>
                      </AccordionSummary>
                      <AccordionDetails>
                        {question.answers.map((answer, answerIndex) => (
                          <Box key={answer.id} sx={{ mb: answerIndex < question.answers.length - 1 ? 2 : 0 }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                              {answer.is_accepted && (
                                <CheckCircleIcon color="success" fontSize="small" />
                              )}
                              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                <ThumbUpIcon fontSize="small" color="action" />
                                <Typography variant="caption" color="text.secondary">
                                  {answer.votes}
                                </Typography>
                              </Box>
                              {answer.is_accepted && (
                                <Typography variant="caption" color="success.main" sx={{ fontWeight: 500 }}>
                                  Accepted Answer
                                </Typography>
                              )}
                            </Box>
                            <ReactMarkdown
                              components={{
                                code({ node, inline, className, children, ...props }) {
                                  return (
                                    <code
                                      style={{
                                        backgroundColor: '#f5f5f5',
                                        padding: inline ? '2px 4px' : '8px 12px',
                                        borderRadius: '4px',
                                        fontFamily: 'Monaco, Menlo, Ubuntu Mono, monospace',
                                        display: inline ? 'inline' : 'block',
                                        whiteSpace: 'pre-wrap',
                                      }}
                                      {...props}
                                    >
                                      {children}
                                    </code>
                                  );
                                },
                              }}
                            >
                              {answer.content}
                            </ReactMarkdown>
                          </Box>
                        ))}
                      </AccordionDetails>
                    </Accordion>
                  )}
                  
                  <Typography variant="caption" color="text.secondary" sx={{ mt: 2, display: 'block' }}>
                    Asked on {new Date(question.created_at).toLocaleDateString()}
                  </Typography>
                </CardContent>
              </MotionCard>
            </Grid>
          ))}
        </Grid>
      )}

      {filteredQuestions.length === 0 && !loading && (
        <Box sx={{ textAlign: 'center', py: 6 }}>
          <SearchIcon sx={{ fontSize: 64, color: 'text.secondary', mb: 2 }} />
          <Typography variant="h6" color="text.secondary" gutterBottom>
            No questions found
          </Typography>
          <Typography color="text.secondary">
            Try adjusting your search terms or category filter
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default BrowsePage;