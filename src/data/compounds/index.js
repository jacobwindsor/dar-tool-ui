const list = fetch(`${process.env.REACT_APP_API_URL}/compounds`).then(res => res.json());
const get = id => fetch(`${process.env.REACT_APP_API_URL}/compounds/${id}`).then(res => res.json());

export default {
  list,
  get,
};
