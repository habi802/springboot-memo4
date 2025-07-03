import axios from 'axios';
axios.defaults.baseURL = 'http://localhost:8080/api';

class HttpService {
  // save 메소드 구현해주시요.
  async save(jsonBody) {
    const res = await axios.post('/memo', jsonBody);
    return res.data;
  }

  async findAll(params) {
    const res = await axios.get('/memo', { params });
    return res.data;
  }

  async findById(id) {
    const res = await axios.get(`/memo/${id}`);
    return res.data;
  }

  async modify(jsonBody) {
    const res = await axios.put('/memo', jsonBody);
    return res.data;
  }

  async delete(params) {
    const res = await axios.delete('/memo', { params });
    return res.data;
  }
}

export default new HttpService();