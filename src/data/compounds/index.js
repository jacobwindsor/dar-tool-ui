const list = fetch(`${process.env.REACT_APP_API_URL}/compounds`).then(res => res.json());
const get = id => fetch(`${process.env.REACT_APP_API_URL}/compounds/${id}`).then(res => res.json());
const create = ({ email, name, dataset }) => fetch(`${process.env.REACT_APP_API_URL}/compounds`, {
  method: 'POST',
  body: JSON.stringify({ email, name, dataset }),
  headers: {
    'Content-Type': 'application/json',
  },
}).then(res => res.json());

export default {
  list,
  get,
  create,
};
