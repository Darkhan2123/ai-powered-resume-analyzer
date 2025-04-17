import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'http://localhost:8000/api';

// Get all jobs
export const getJobs = createAsyncThunk(
  'job/getJobs',
  async (filters = {}, { rejectWithValue }) => {
    try {
      // Build query string from filters
      const queryParams = new URLSearchParams();
      Object.keys(filters).forEach(key => {
        if (filters[key]) {
          queryParams.append(key, filters[key]);
        }
      });
      
      const response = await axios.get(`${API_URL}/jobs/?${queryParams.toString()}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Get a specific job
export const getJob = createAsyncThunk(
  'job/getJob',
  async (jobId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/jobs/${jobId}/`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Create a new job (for recruiters)
export const createJob = createAsyncThunk(
  'job/createJob',
  async (jobData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/jobs/`, jobData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Update a job (for recruiters)
export const updateJob = createAsyncThunk(
  'job/updateJob',
  async ({ jobId, jobData }, { rejectWithValue }) => {
    try {
      const response = await axios.put(`${API_URL}/jobs/${jobId}/`, jobData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Apply for a job
export const applyForJob = createAsyncThunk(
  'job/applyForJob',
  async ({ jobId, resumeId, coverLetter }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/jobs/applications/`, {
        job_id: jobId,
        resume: resumeId,
        cover_letter: coverLetter
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Get user's job applications
export const getUserApplications = createAsyncThunk(
  'job/getUserApplications',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/jobs/applications/my_applications/`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Get applications for a job (for recruiters)
export const getJobApplications = createAsyncThunk(
  'job/getJobApplications',
  async (jobId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/jobs/applications/?job=${jobId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Match resumes to a job (for recruiters)
export const matchResumesToJob = createAsyncThunk(
  'job/matchResumesToJob',
  async (jobId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/jobs/${jobId}/match_resumes/`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Get job categories
export const getJobCategories = createAsyncThunk(
  'job/getJobCategories',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/jobs/categories/`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Get companies
export const getCompanies = createAsyncThunk(
  'job/getCompanies',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/jobs/companies/`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const initialState = {
  jobs: [],
  currentJob: null,
  applications: [],
  matches: [],
  categories: [],
  companies: [],
  loading: false,
  error: null,
};

const jobSlice = createSlice({
  name: 'job',
  initialState,
  reducers: {
    clearJobError: (state) => {
      state.error = null;
    },
    clearCurrentJob: (state) => {
      state.currentJob = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Get Jobs
      .addCase(getJobs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getJobs.fulfilled, (state, action) => {
        state.loading = false;
        state.jobs = action.payload;
      })
      .addCase(getJobs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Get Job
      .addCase(getJob.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getJob.fulfilled, (state, action) => {
        state.loading = false;
        state.currentJob = action.payload;
      })
      .addCase(getJob.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Create Job
      .addCase(createJob.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createJob.fulfilled, (state, action) => {
        state.loading = false;
        state.jobs.push(action.payload);
        state.currentJob = action.payload;
      })
      .addCase(createJob.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Update Job
      .addCase(updateJob.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateJob.fulfilled, (state, action) => {
        state.loading = false;
        state.jobs = state.jobs.map(job =>
          job.id === action.payload.id ? action.payload : job
        );
        state.currentJob = action.payload;
      })
      .addCase(updateJob.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Apply For Job
      .addCase(applyForJob.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(applyForJob.fulfilled, (state, action) => {
        state.loading = false;
        state.applications.push(action.payload);
      })
      .addCase(applyForJob.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Get User Applications
      .addCase(getUserApplications.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUserApplications.fulfilled, (state, action) => {
        state.loading = false;
        state.applications = action.payload;
      })
      .addCase(getUserApplications.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Get Job Applications
      .addCase(getJobApplications.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getJobApplications.fulfilled, (state, action) => {
        state.loading = false;
        state.applications = action.payload;
      })
      .addCase(getJobApplications.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Match Resumes to Job
      .addCase(matchResumesToJob.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(matchResumesToJob.fulfilled, (state, action) => {
        state.loading = false;
        state.matches = action.payload;
      })
      .addCase(matchResumesToJob.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Get Job Categories
      .addCase(getJobCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getJobCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = action.payload;
      })
      .addCase(getJobCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Get Companies
      .addCase(getCompanies.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCompanies.fulfilled, (state, action) => {
        state.loading = false;
        state.companies = action.payload;
      })
      .addCase(getCompanies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearJobError, clearCurrentJob } = jobSlice.actions;

export default jobSlice.reducer;