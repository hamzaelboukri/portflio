import axios from 'axios'

const getApiUrl = () => {
  if (import.meta.env.VITE_BACKEND_URL) {
    return import.meta.env.VITE_BACKEND_URL
  }
  
  if (window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1') {
    return 'http://express-api:5050'
  }
  
  return 'http://localhost:5050'
}

const API_URL = getApiUrl()

console.log('API URL:', API_URL) // Debug log

const client = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // 10 second timeout
})

client.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

client.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error)
    if (error.code === 'ECONNREFUSED') {
      throw new Error('Cannot connect to server. Please make sure the backend is running.')
    }
    throw error
  }
)


export const api = {
  query: async (query, variables = {}) => {
    try {
      const response = await client.post('', {
        query,
        variables,
      })
      if (response.data.errors) {
        throw new Error(response.data.errors[0].message)
      }
      return response.data.data
    } catch (error) {
      throw error
    }
  },

  mutate: async (mutation, variables = {}) => {
    try {
      const response = await client.post('', {
        query: mutation,
        variables,
      })
      if (response.data.errors) {
        throw new Error(response.data.errors[0].message)
      }
      return response.data.data
    } catch (error) {
      throw error
    }
  },
}

export const authService = {
  login: async (username, password) => {
    const mutation = `
      mutation Login($username: String!, $password: String!) {
        login(username: $username, password: $password) {
          token
          admin {
            id
            username
          }
        }
      }
    `
    return await api.mutate(mutation, { username, password })
  },
}

export const portfolioService = {
  getPortfolio: async () => {
    const query = `
      query {
        getPortfolio {
          profiles {
            id
            fullName
            email
            phone
            address
            website
          }
          projects {
            id
            name
            description
            image
            githubLink
            webLink
          }
          competences {
            id
            name
            description
          }
          experiences {
            id
            title
            company
            startDate
            endDate
            description
          }
        }
      }
    `
    return await api.query(query)
  },
}

export const adminService = {
  // Competence
  getCompetences: async () => {
    const query = `
      query {
        getCompetences {
          id
          name
          description
        }
      }
    `
    return await api.query(query)
  },

  createCompetence: async (input) => {
    const mutation = `
      mutation CreateCompetence($input: CompetenceInput!) {
        createCompetence(input: $input) {
          id
          name
          description
        }
      }
    `
    return await api.mutate(mutation, { input })
  },

  updateCompetence: async (id, input) => {
    const mutation = `
      mutation UpdateCompetence($id: ID!, $input: CompetenceInput!) {
        updateCompetence(id: $id, input: $input) {
          id
          name
          description
        }
      }
    `
    return await api.mutate(mutation, { id, input })
  },

  deleteCompetence: async (id) => {
    const mutation = `
      mutation DeleteCompetence($id: ID!) {
        deleteCompetence(id: $id)
      }
    `
    return await api.mutate(mutation, { id })
  },

  // Experience
  getExperiences: async () => {
    const query = `
      query {
        getExperiences {
          id
          title
          company
          startDate
          endDate
          description
        }
      }
    `
    return await api.query(query)
  },

  createExperience: async (input) => {
    const mutation = `
      mutation CreateExperience($input: ExperienceInput!) {
        createExperience(input: $input) {
          id
          title
          company
          startDate
          endDate
          description
        }
      }
    `
    return await api.mutate(mutation, { input })
  },

  updateExperience: async (id, input) => {
    const mutation = `
      mutation UpdateExperience($id: ID!, $input: ExperienceInput!) {
        updateExperience(id: $id, input: $input) {
          id
          title
          company
          startDate
          endDate
          description
        }
      }
    `
    return await api.mutate(mutation, { id, input })
  },

  deleteExperience: async (id) => {
    const mutation = `
      mutation DeleteExperience($id: ID!) {
        deleteExperience(id: $id)
      }
    `
    return await api.mutate(mutation, { id })
  },

  // Profile
  getProfiles: async () => {
    const query = `
      query {
        getProfile {
          id
          fullName
          email
          phone
          address
          website
        }
      }
    `
    return await api.query(query)
  },

  createProfile: async (input) => {
    const mutation = `
      mutation CreateProfile($input: ProfileInput!) {
        createProfile(input: $input) {
          id
          fullName
          email
          phone
          address
          website
        }
      }
    `
    return await api.mutate(mutation, { input })
  },

  updateProfile: async (id, input) => {
    const mutation = `
      mutation UpdateProfile($id: ID!, $input: ProfileInput!) {
        updateProfile(id: $id, input: $input) {
          id
          fullName
          email
          phone
          address
          website
        }
      }
    `
    return await api.mutate(mutation, { id, input })
  },

  deleteProfile: async (id) => {
    const mutation = `
      mutation DeleteProfile($id: ID!) {
        deleteProfile(id: $id)
      }
    `
    return await api.mutate(mutation, { id })
  },

  // Projects
  getProjects: async () => {
    const query = `
      query {
        getProjects {
          id
          name
          description
          image
          githubLink
          webLink
        }
      }
    `
    return await api.query(query)
  },

  createProject: async (input) => {
    const mutation = `
      mutation CreateProject($input: ProjectInput!) {
        createProject(input: $input) {
          id
          name
          description
          image
          githubLink
          webLink
        }
      }
    `
    return await api.mutate(mutation, { input })
  },

  updateProject: async (id, input) => {
    const mutation = `
      mutation UpdateProject($id: ID!, $input: ProjectInput!) {
        updateProject(id: $id, input: $input) {
          id
          name
          description
          image
          githubLink
          webLink
        }
      }
    `
    return await api.mutate(mutation, { id, input })
  },

  deleteProject: async (id) => {
    const mutation = `
      mutation DeleteProject($id: ID!) {
        deleteProject(id: $id)
      }
    `
    return await api.mutate(mutation, { id })
  },
}