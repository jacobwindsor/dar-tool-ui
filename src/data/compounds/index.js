const list = fetch(`${process.env.API_URL}/compounds`);
const get = id => fetch(`${process.env.API_URL}/compounds/${id}`);

export default {
  list,
  get,
};
