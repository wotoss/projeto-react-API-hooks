import React, { useState, useEffect, useMemo, useCallback } from 'react';

function App() {

  const [tarefas, setTarefas] = useState([]);
  const [input, setInput] = useState('');


  useEffect(()=>{
    const tarefaStorage = localStorage.getItem('tarefas');
      //neste if eu vejo se tem algo ou valor, tendo eu modifico ou atualizo o o array setTarefas linha 5
    if(tarefaStorage){
      //lembrando => como neste momento estamos trazendo lá dos Storage precisamos fazer a conversão para Parse
      setTarefas(JSON.parse(tarefaStorage));
    }
  }, []);

 //toda vez que o tarefa sofrer alteração => o useEffect vai ativar e salvar informação no locaStorage.
  useEffect(()=> {
    localStorage.setItem('tarefas', JSON.stringify(tarefas));
  }, [tarefas])

  const handleAdd = useCallback(()=>{
    setTarefas([...tarefas, input])
    setInput('');
 }, [input, tarefas]);

 //NESTE MOMENTO EU SUBSTITUIR handleAdd PELO => useCallback, DEVIDO A EXECUÇÃO SER MELHOR PARA PERFROMANCE DESTA APP
  /*function handleAdd(){
     setTarefas([...tarefas, input])
     setInput('');
  }*/
 const totalTarefas = useMemo(()=> tarefas.length, [tarefas]);

  return (
    <div>
      <ul>
        {tarefas.map(tarefa => (
           <li key={tarefa}>{tarefa}</li>
        ))}
      </ul> 
      <br/>
      <strong>Você tem {totalTarefas} tarefas!</strong><br/>
      <input type="text" value={input} onChange={(e) => setInput(e.target.value)} />
      <button type="button" onClick={handleAdd}>Adicionar</button>  
    </div>
  );
}

export default App;
