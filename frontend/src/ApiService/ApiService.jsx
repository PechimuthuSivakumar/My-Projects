import axios from "axios";

class API {
  constructor() {
    this.baseUrl = process.env.REACT_APP_API;
    this.apiUrl = process.env.REACT_APP_BASE;
    this.testpressToken = "JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6NjA0NjUsInVzZXJfaWQiOjYwNDY1LCJpbnN0aXR1dGUiOjczOSwiaWQiOjYwNDY1LCJleHAiOjE3MDMwNTQ5MTAsImVtYWlsIjoiIn0.HnfWcdz47UlHqP7idCw0gzi1Mv5sLw54zzyu8eOz4-k";
    axios.defaults.headers.common["Authorization"] = `Bearer ${localStorage.getItem('api_var_token')}`;
  }

  async callAPI(method, url, data, callback) {
    try {
      const res = await method(`${this.baseUrl}${url}`, data);
      if (callback) {
        callback(null, res);
      }
      return res;
    } catch (error) {
      if (callback) {
        callback(error, null);
      }
      return error;
    }
  }

  async getAll(url, params = {}, callback = null) {
    return this.callAPI(axios.get, url, { params }, callback);
  }

  async getSingle(url, params, callback = null) {
    return this.callAPI(axios.get, `${url}/${params}`, {}, callback);
  }

  async create(url, data, callback = null) {
    return this.callAPI(axios.post, url, data, callback);
  }

  async update(url, params, data, callback = null) {
    return this.callAPI(axios.post, `${url}/${params}`, data, callback);
  }

  async remove(url, params, callback = null) {
    return this.callAPI(axios.delete, `${url}/${params}`, {}, callback);
  }

  async removeMany(url, data, callback = null) {
    return this.callAPI(axios.delete, url, { data }, callback);
  }
}

export default API;
