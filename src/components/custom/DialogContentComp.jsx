import React, { useState } from "react";
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import TodoItem from "./TodoItem";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Label } from "../ui/label";

function DialogContentComp({
  task,
  todoList,
  handleTodoCheckBoxChange,
  handleNoteEdit,
}) {
  const [isEdit, setIsEdit] = useState(false);
  const [editedTask, setEditedTask] = useState({
    title: task.title,
    description: task.description,
    body: task.body,
    todoList: task.todoList,
  });

  const activeTodos = todoList.filter((todo) => !todo.isComplete);
  const completedTodos = todoList.filter((todo) => todo.isComplete);

  function handleTodoChange(todoId, field, value) {
    const updatedTodoList = editedTask.todoList.map((todo) =>
      todo._id === todoId ? { ...todo, [field]: value } : todo
    );
    setEditedTask({ ...editedTask, todoList: updatedTodoList });
  }

  function addTodo() {
    setEditedTask({
      ...editedTask,
      todoList: [...editedTask.todoList, { title: "", isComplete: false }],
    });
  }

  function removeTodo(todoId) {
    const updatedTodoList = editedTask.todoList.filter(
      (todo) => todo._id !== todoId
    );
    setEditedTask({ ...editedTask, todoList: updatedTodoList });
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedTask({ ...editedTask, [name]: value });
  };

  const handleSave = () => {
    handleNoteEdit(task._id, editedTask);
    setIsEdit(false);
  };

  const handleCancel = () => {
    setEditedTask({
      title: task.title,
      description: task.description,
      body: task.body,
    });
    setIsEdit(false);
  };

  return (
    <>
      <DialogContent className="p-0">
        {!isEdit ? (
          <div>
            <div className="flex flex-col gap-5 w-full max-w-full bg-white border border-gray-200 rounded-lg shadow p-8 dark:bg-gray-800 dark:border-gray-700">
              {/* Title */}
              <DialogHeader>
                <DialogTitle className="text-3xl font-extrabold tracking-tight">
                  {task.title}
                </DialogTitle>
                <DialogDescription className="mb-4 mt-1 text-xl font-medium text-gray-500 dark:text-gray-400">
                  {task.description}
                </DialogDescription>
              </DialogHeader>
              <DialogDescription className="ms-1 text-lg font-normal text-gray-500 dark:text-gray-400">
                {task.body}
              </DialogDescription>

              {/* Todo list */}
              <ul role="list" className="space-y-4">
                {activeTodos.map((todo) => (
                  <TodoItem
                    key={todo._id}
                    todo={todo}
                    handleTodoCheckBoxChange={handleTodoCheckBoxChange}
                  />
                ))}
                {completedTodos.map((todo) => (
                  <TodoItem
                    key={todo._id}
                    todo={todo}
                    handleTodoCheckBoxChange={handleTodoCheckBoxChange}
                  />
                ))}
              </ul>
              <div className="flex gap-3">
                <DialogClose>
                  <Button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-200 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-900 font-medium rounded-lg text-sm px-5 py-2.5 inline-flex justify-center w-full text-center">
                    Close
                  </Button>
                </DialogClose>
                <Button
                  onClick={() => setIsEdit(true)}
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-200 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-900 font-medium rounded-lg text-sm px-5 py-2.5 inline-flex justify-center w-full text-center"
                >
                  Edit Note
                </Button>
              </div>
            </div>
          </div>
        ) : (
          <div>
            <div className="flex flex-col gap-5 w-full max-w-full bg-white border border-gray-200 rounded-lg shadow p-8 dark:bg-gray-800 dark:border-gray-700">
              {/* Edit form */}
              <DialogHeader>
                <DialogTitle className="text-3xl font-extrabold tracking-tight">
                  Edit Task
                </DialogTitle>
              </DialogHeader>
              <div className="mb-4">
                <label
                  htmlFor="title"
                  className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Title
                </label>
                <Input
                  id="title"
                  name="title"
                  value={editedTask.title}
                  onChange={handleInputChange}
                  placeholder="Title"
                  className="dark:bg-gray-700 dark:text-white"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="description"
                  className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Description
                </label>
                <Input
                  id="description"
                  name="description"
                  value={editedTask.description}
                  onChange={handleInputChange}
                  placeholder="Description"
                  className="dark:bg-gray-700 dark:text-white"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="body"
                  className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Body
                </label>
                <Textarea
                  id="body"
                  name="body"
                  value={editedTask.body}
                  onChange={handleInputChange}
                  placeholder="Body"
                  className="dark:bg-gray-700 dark:text-white"
                />
              </div>
              <div>
                <Label>Todo List</Label>
                {editedTask.todoList.map((todo) => (
                  <div className="flex items-center space-x-1 space-y-2">
                    <Input
                      type="text"
                      placeholder="Todo title..."
                      value={todo.title}
                      onChange={(ev) =>
                        handleTodoChange(todo._id, "title", ev.target.value)
                      }
                    />
                    <Input
                      type="checkbox"
                      checked={todo.isComplete}
                      onChange={(ev) =>
                        handleTodoChange(
                          todo._id,
                          "isComplete",
                          ev.target.checked
                        )
                      }
                    />
                    <Button
                      type="button"
                      onClick={() => removeTodo(todo._id)}
                      className="bg-red-500 hover:bg-red-700 text-white"
                    >
                      Remove
                    </Button>
                  </div>
                ))}
                <Button type="button" onClick={addTodo} className="mt-2">
                  Add Todo
                </Button>
              </div>
              <div className="flex gap-3">
                <Button
                  onClick={handleSave}
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-200 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-900 font-medium rounded-lg text-sm px-5 py-2.5 inline-flex justify-center w-full text-center"
                >
                  Save
                </Button>
                <Button
                  onClick={handleCancel}
                  className="text-white bg-gray-500 hover:bg-gray-600 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:bg-gray-400 dark:hover:bg-gray-500 dark:focus:ring-gray-700 font-medium rounded-lg text-sm px-5 py-2.5 inline-flex justify-center w-full text-center"
                >
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        )}
      </DialogContent>
    </>
  );
}

export default DialogContentComp;
