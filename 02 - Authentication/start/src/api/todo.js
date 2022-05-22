import axios from '../config/axios';

export const getAllTodo = async () => {
  try {
    const res = await axios.get('/todos');
    return res.data.todos;
  } catch (err) {}
};
