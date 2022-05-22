import Todo from './Todo';

function TodoList() {
  return (
    <ul className="list-group shadow mt-4">
      {[{ id: 1, title: 'Test', completed: true }].map(el => (
        <Todo
          key={el.id}
          id={el.id}
          title={el.title}
          completed={el.completed}
        />
      ))}
    </ul>
  );
}

export default TodoList;
