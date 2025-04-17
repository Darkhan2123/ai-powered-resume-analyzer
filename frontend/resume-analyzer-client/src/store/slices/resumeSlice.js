import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'http://localhost:8000/api';

// Get user's resumes
export const getResumes = createAsyncThunk(
  'resume/getResumes',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/resumes/my_resumes/`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Get a specific resume
export const getResume = createAsyncThunk(
  'resume/getResume',
  async (resumeId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/resumes/${resumeId}/`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Upload a new resume
export const uploadResume = createAsyncThunk(
  'resume/uploadResume',
  async (resumeData, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      formData.append('title', resumeData.title);
      formData.append('resume_file', resumeData.file);
      
      const response = await axios.post(`${API_URL}/resumes/`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Process (analyze) a resume
export const processResume = createAsyncThunk(
  'resume/processResume',
  async (resumeId, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/resumes/${resumeId}/process/`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Get resume analysis
export const getResumeAnalysis = createAsyncThunk(
  'resume/getResumeAnalysis',
  async (resumeId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/resumes/${resumeId}/analysis/`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Delete a resume
export const deleteResume = createAsyncThunk(
  'resume/deleteResume',
  async (resumeId, { rejectWithValue }) => {
    try {
      await axios.delete(`${API_URL}/resumes/${resumeId}/`);
      return resumeId;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const initialState = {
  resumes: [],
  currentResume: null,
  analysis: null,
  loading: false,
  error: null,
};

const resumeSlice = createSlice({
  name: 'resume',
  initialState,
  reducers: {
    clearResumeError: (state) => {
      state.error = null;
    },
    clearCurrentResume: (state) => {
      state.currentResume = null;
      state.analysis = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Get Resumes
      .addCase(getResumes.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getResumes.fulfilled, (state, action) => {
        state.loading = false;
        state.resumes = action.payload;
      })
      .addCase(getResumes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Get Resume
      .addCase(getResume.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getResume.fulfilled, (state, action) => {
        state.loading = false;
        state.currentResume = action.payload;
      })
      .addCase(getResume.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Upload Resume
      .addCase(uploadResume.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(uploadResume.fulfilled, (state, action) => {
        state.loading = false;
        state.resumes.push(action.payload);
        state.currentResume = action.payload;
      })
      .addCase(uploadResume.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Process Resume
      .addCase(processResume.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(processResume.fulfilled, (state, action) => {
        state.loading = false;
        state.currentResume = action.payload.data;
      })
      .addCase(processResume.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Get Resume Analysis
      .addCase(getResumeAnalysis.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getResumeAnalysis.fulfilled, (state, action) => {
        state.loading = false;
        state.analysis = action.payload;
      })
      .addCase(getResumeAnalysis.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Delete Resume
      .addCase(deleteResume.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteResume.fulfilled, (state, action) => {
        state.loading = false;
        state.resumes = state.resumes.filter(resume => resume.id !== action.payload);
        if (state.currentResume && state.currentResume.id === action.payload) {
          state.currentResume = null;
          state.analysis = null;
        }
      })
      .addCase(deleteResume.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearResumeError, clearCurrentResume } = resumeSlice.actions;

export default resumeSlice.reducer;