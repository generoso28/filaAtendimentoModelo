 // Crie uma instância da fila
 let minhaFila = new FilaCircular(5);

 // Função para adicionar um elemento à fila
 function adicionarElemento() {
    const txtnovoNome = document.getElementById("txtnovoNome");
    const txtnovoCpf = document.getElementById("txtnovoCpf");
    const novoNome = txtnovoNome.value;
    const novoCpf = txtnovoCpf.value;
    const dataAtual = obterDataAtual();
    const horaAtual = obterHoraAtual();
    const atendimento = new Atendimento(novoNome, novoCpf, dataAtual, horaAtual);
    if(minhaFila.enqueue(atendimento)===true){
      atualizarFila();
      alert("Atendimento adicionado com sucesso")
      txtnovoCpf.value="";
      txtnovoNome.value="";
    }else if(minhaFila.isFull()){
      alert("Fila cheia");
    }else{
      alert("Erro ao adicionar elemento");
    }
 }
//--------------------------------------------------------------------------------------------
 // Função para remover o primeiro elemento da fila
 function removerElemento() {
    if(!minhaFila.isEmpty()){
      let removido = minhaFila.dequeue();
      mostrarMensagemRemocao(removido);
      console.log(minhaFila.toString());
      }else
          alert("Fila vazia");
      atualizarFila();
 
 }
 //--------------------------------------------------------------------------------
 function buscarCpf() {
    const cpf = document.getElementById("txtnovoCpf");
    const cpfBusca = cpf.value;
    let atendimento = null;
    for (let i = 0; i < minhaFila.qtd; i++) {
      if (minhaFila.elementos[i].cpf === cpfBusca) {
        atendimento = minhaFila.elementos[i];
        break;
      }
    }
    if (atendimento !== null) {
      alert(`Atendimento encontrado: ${atendimento.toString()}`);
    } else {
      alert("Atendimento não encontrado");
    }
}
//--------------------------------------------------------------------------------------------
function mostrarMensagemRemocao(pessoaAtendida) {
  document.getElementById("mensagem-remocao").textContent = `Atendimento realizado: ${pessoaAtendida} \n Atendimento realizado às: ${obterHoraAtual()} \n Duração do atendimento: ${calcularDiferencaHoras(pessoaAtendida.hora, obterHoraAtual())}`;
}
//--------------------------------------------------------------------------------------------
 // Função para atualizar a exibição da fila
 function atualizarFila() {
    const listaFila = document.getElementById("listFila");
    listaFila.textContent = minhaFila.toString();
    document.querySelector("#listFila").innerHTML = "";
    for(let item of minhaFila){
      console.log(item.toString());
      document.querySelector("#listFila").innerHTML += `<li>${item.toString()}</li>`;
    }
  }
//--------------------------------------------------------------------------------------------
 // funcao data
 function obterDataAtual() {
    let dataAtual = new Date();
    let dia = dataAtual.getDate();
    let mes = dataAtual.getMonth() + 1; // Adiciona 1 porque o mês inicia do zero
    let ano = dataAtual.getFullYear();
    // Formata a data como "dd/mm/aaaa"
    let dataFormatada = `${dia.toString().padStart(2, '0')}/${mes.toString().padStart(2, '0')}/${ano}`;
    return dataFormatada;
}
//--------------------------------------------------------------------------------------------
function obterHoraAtual() {
  const data = new Date();
  const hora = data.getHours().toString().padStart(2, '0');
  const minuto = data.getMinutes().toString().padStart(2, '0');
  const segundo = data.getSeconds().toString().padStart(2, '0');
  return `${hora}:${minuto}:${segundo}`;
}
//--------------------------------------------------------------------------------------------
function calcularDiferencaHoras(hora1, hora2) {
  const [h1, m1, s1] = hora1.split(':').map(Number);
  const [h2, m2, s2] = hora2.split(':').map(Number);
  
  const diferencaSegundos = (h2 * 3600 + m2 * 60 + s2) - (h1 * 3600 + m1 * 60 + s1);
  
  const horas = Math.floor(diferencaSegundos / 3600);
  const minutos = Math.floor((diferencaSegundos % 3600) / 60);
  const segundos = diferencaSegundos % 60;
  
  return `${horas.toString().padStart(2, '0')}:${minutos.toString().padStart(2, '0')}:${segundos.toString().padStart(2, '0')}`;
}
