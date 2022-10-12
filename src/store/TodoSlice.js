import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchTodos = createAsyncThunk(
  "todos/fetchTodos",
  async function (_, { rejectWithValue }) {
    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/todos/?_limit=5"
      );
      if (!response.ok) {
        throw new Error("Message error!!!!");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deletTodo = createAsyncThunk(
  "delete/deleteTodos",
  async function (id, { rejectWithValue, dispatch }) {
    console.log(id);
    try {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/todos/${id}`,
        { method: "DELETE" }
      );
      if (!response.ok) {
        throw new Error("Id is not founded!");
      }
      dispatch(removeTodo({ id }));
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
export const completeTodo = createAsyncThunk(
  "done/completeTodo",
  async function (id, { rejectWithValue, dispatch, getState }) {
    const todo = getState().todos.todos.find((todo) => todo.id === id);
    console.log(id);
    try {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/todos/${id}`,
        {
          method: "PATCH",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({ completed: !todo.completed }),
        }
      );
      if (!response.ok) {
        throw new Error("Server problem");
      }
      dispatch(doneTodo({ id }));
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
export const addMoreTodo = createAsyncThunk(
  "todos/addMoreTodo",
  async function (item, { rejectWithValue, dispatch }) {
    console.log("hello");
    try {
      const todo = {
        title: item,
        userId: 1,
        completed: false,
      };
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/todos/`,
        {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify(todo),
        }
      );

      if (!response.ok) {
        throw new Error("Can't add todo");
      }
      const data = await response.json();
      dispatch(addTodo(data));
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const todoSlice = createSlice({
  name: "todos",
  initialState: {
    todos: [],
    status: null,
    error: null,
  },
  reducers: {
    addTodo(state, action) {
      state.todos.push(action.payload);
    },
    doneTodo(state, action) {
      const todo = state.todos.find((item) => item.id === action.payload.id);
      todo.completed = !todo.completed;
    },
    removeTodo(state, action) {
      state.todos = state.todos.filter((item) => item.id !== action.payload.id);
    },
  },
  extraReducers: {
    [fetchTodos.pending]: (state, action) => {
      state.status = "Loading";
      state.error = null;
    },
    [fetchTodos.fulfilled]: (state, action) => {
      state.status = "resolved";
      state.todos = action.payload;
    },
    [fetchTodos.rejected]: (state, action) => {
      state.status = "Rejected";
      state.error = action.payload;
    },
  },
});

const { addTodo, doneTodo, removeTodo } = todoSlice.actions;
export default todoSlice.reducer;
