import { useState } from "react";

import "../styles/tasklist.scss";

import { FiTrash, FiCheckSquare } from "react-icons/fi";

interface Task {
  id: number;
  title: string;
  isComplete: boolean;
}

export function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState("");

  function handleCreateNewTask() {
    // Crie uma nova task com um id random, não permita criar caso o título seja vazio.

    //O input é um controlled component, eu estou salvando o valor do input em tempo real
    //Se o newTaskTitle for false, eu dou um return e nada acontece
    if (!newTaskTitle) return;

    /*Crio aqui um estado temporário, com um objeto com o mesmo formato que a interface Task
    Gero um id aleatório
    Title vai ser o newTaskTitle vindo do input
    E o estado padrão ao inserir a task é que não está completa, ou seja, false */
    const newTask = {
      id: Math.random(),
      title: newTaskTitle,
      isComplete: false,
    };

    /*Agora preciso setar a newTask
    Posso usar o setState com callback
    Pego o valor antigo, e a task é um array e não quero remover o array antigo, apenas adicionar uma nova task
    Então uso o "..." (spread operator) para pegar os valores anteriores e adiciono a minha nova task. */
    setTasks((oldState) => [...oldState, newTask]);

    //Resetar o input
    setNewTaskTitle("");
  }

  function handleToggleTaskCompletion(id: number) {
    // Altere entre `true` ou `false` o campo `isComplete` de uma task com dado ID

    /*Eu vou ter a id da task, então vou nas tasks e mapeio todas as task
    Pego a task com o id correspondente e seto o estado 
    Se a task.id for igual a id. Então eu faço um if ternário. Se for igual a true, eu retorno um objeto
    Esse objeto é a nova task, a gente pega toda a task, e troca a sua propriedade complete.
    E se não for igual, a gente passa a task com o mesmo estado de complete de antes.*/
    const completed = tasks.map((task) =>
      task.id == id ? { ...task, isComplete: !task.isComplete } : task
    );
    setTasks(completed);
  }

  function handleRemoveTask(id: number) {
    // Remova uma task da listagem pelo ID

    //Vou filtrar todos as tasks que não possuem o id definido, então a task com o id definido não será mantida
    const filteredTasks = tasks.filter((task) => task.id != id);
    //Agora seto o novo state com as tasks que não foram removidas
    setTasks(filteredTasks);
  }

  return (
    <section className="task-list container">
      <header>
        <h2>Minhas tasks</h2>

        <div className="input-group">
          <input
            type="text"
            placeholder="Adicionar novo todo"
            onChange={(e) => setNewTaskTitle(e.target.value)}
            value={newTaskTitle}
          />
          <button
            type="submit"
            data-testid="add-task-button"
            onClick={handleCreateNewTask}
          >
            <FiCheckSquare size={16} color="#fff" />
          </button>
        </div>
      </header>

      <main>
        <ul>
          {tasks.map((task) => (
            <li key={task.id}>
              <div
                className={task.isComplete ? "completed" : ""}
                data-testid="task"
              >
                <label className="checkbox-container">
                  <input
                    type="checkbox"
                    readOnly
                    checked={task.isComplete}
                    onClick={() => handleToggleTaskCompletion(task.id)}
                  />
                  <span className="checkmark"></span>
                </label>
                <p>{task.title}</p>
              </div>

              <button
                type="button"
                data-testid="remove-task-button"
                onClick={() => handleRemoveTask(task.id)}
              >
                <FiTrash size={16} />
              </button>
            </li>
          ))}
        </ul>
      </main>
    </section>
  );
}
