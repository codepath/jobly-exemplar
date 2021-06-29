import axios from "axios"
import config from "config"

export default class ApiClient {
  static token

  static async request(endpoint, data = {}, method = "get") {
    console.debug("API Call:", endpoint, data, method)

    const token = this.fetchToken()

    const url = `${config.baseUrl}/${endpoint}`
    const headers = { Authorization: `Bearer ${token}` }
    const params = method === "get" ? data : {}

    try {
      const res = await axios({ url, method, data, params, headers })
      return { data: res.data, error: null }
    } catch (error) {
      if (error?.response?.status === 404) return { data: null, error: "Not found" }
      console.error("API Error:", error.response)
      const message = error?.response?.data?.error?.message
      return { data: null, error: message }
    }
  }

  static storeToken(token, username) {
    ApiClient.token = token
    localStorage.setItem("jobly_token", token)
    if (username) {
      localStorage.setItem("jobly_username", username)
    }
  }

  static fetchToken() {
    if (ApiClient.token) return ApiClient.token
    const token = localStorage.getItem("jobly_token")
    this.storeToken(token)
    return token
  }

  // Individual API routes
  static async fetchCompany(handle) {
    const { data, error } = await this.request(`companies/${handle}/`)
    return { data: data?.company, error }
  }

  static async fetchCompanyList() {
    const { data, error } = await this.request(`companies/`)
    return { data: data?.companies, error }
  }

  static async searchCompanies(nameLike) {
    if (!nameLike) return await this.fetchCompanyList()
    const { data, error } = await this.request(`companies/?name=${nameLike}`)
    return { data: data?.companies, error }
  }

  static async fetchJobsList() {
    const { data, error } = await this.request(`jobs/`)
    return { data: data?.jobs, error }
  }

  static async searchJobs(titleLike) {
    if (!titleLike) return await this.fetchJobsList()
    const { data, error } = await this.request(`jobs/?title=${titleLike}`)
    return { data: data?.jobs, error }
  }

  static async applyForJob(jobId) {
    const validUsername = localStorage.getItem("jobly_username")
    const { data, error } = await this.request(`users/${validUsername}/jobs/${jobId}/`, {}, "post")
    return { data, error }
  }

  static async fetchUserFromToken(username) {
    const validUsername = username || localStorage.getItem("jobly_username")
    const { data, error } = await this.request(`users/${validUsername}/`)
    return { data, error }
  }

  static async signupUser(credentials) {
    const { data, error } = await this.request(`auth/register/`, credentials, `post`)
    if (error) return { data, error }
    if (data?.token) {
      this.storeToken(data.token, credentials.username)
    }
    return await this.fetchUserFromToken(credentials.username)
  }

  static async loginUser(credentials) {
    const { data, error } = await this.request(`auth/token/`, credentials, `post`)
    if (error) return { data, error }
    if (data?.token) {
      this.storeToken(data.token, credentials.username)
    }
    return await this.fetchUserFromToken(credentials.username)
  }

  static async updateUserProfile(profileUpdates) {
    const validUsername = localStorage.getItem("jobly_username")
    const { data, error } = await this.request(`users/${validUsername}/`, profileUpdates, `patch`)
    return { data, error }
  }

  static async logoutUser() {
    localStorage.setItem("jobly_token", null)
    localStorage.setItem("jobly_username", null)
  }
}
