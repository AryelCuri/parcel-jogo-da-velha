const quadro = document.querySelector('.game-container') as HTMLElement;

type Turn = "X" | "O" | "";

let turn: Turn = "X";

function listenBoard(): void {
  quadro.addEventListener('click', comecarJogo);
}

function main(): void {
  criarquadro();
  listenBoard();
}

function comecarJogo(e: Event): void {
    const idCaixa: string | null = (e.target as HTMLElement).id;
    if (!idCaixa) return;
  
    const caixa: HTMLElement | null = document.getElementById(idCaixa);
    if (!caixa || caixa.textContent !== "") return;
  
    caixa.textContent = turn;
  
    const caixas: Array<string> = getCaixas();
    if (checarvenc(caixas)) {
      // Espera 5 segundos antes de recarregar a página
      setTimeout(() => {
        window.location.reload();
      }, 5000); // 5000 milissegundos = 5 segundos
  
      // Nova parte adicionada para exibir o texto do vencedor
      const mensagemVencedor: HTMLElement = document.createElement('p');
      mensagemVencedor.textContent = `O jogador ${turn} venceu!`;
      
      // Adicionando estilos CSS para tornar o texto maior e centralizado
      mensagemVencedor.style.fontSize = '24px';
      mensagemVencedor.style.textAlign = 'center';
      mensagemVencedor.style.marginTop = '50px'; // Ajuste para centralizar verticalmente
      
      document.body.appendChild(mensagemVencedor);
  
      console.log(`O jogador ${turn} venceu!`);
    } else {
      switchPlayer();
    }
  }
  

function checarvenc(caixas: Array<string>): boolean {
  const combinacoesVencedoras: Array<Array<number>> = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8], // Linhas
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8], // Colunas
    [0, 4, 8],
    [2, 4, 6], // Diagonais
  ];

  for (const combinacao of combinacoesVencedoras) {
    const [a, b, c] = combinacao;
    if (caixas[a] && caixas[a] === caixas[b] && caixas[b] === caixas[c]) {
      return true; // Encontrou uma combinação vencedora
    }
  }

  return false; // Não encontrou nenhuma combinação vencedora
}

function getCaixas(): Array<string> {
  const conteudoCaixas: Array<string> = [];
  for (let i = 0; i <= 8; i++) {
    const caixa = document.querySelector(`#caixa-${i}`) as HTMLElement;
    conteudoCaixas.push(caixa ? caixa.textContent || "" : "");
  }
  return conteudoCaixas;
}

function switchPlayer(): void {
  turn = turn === "X" ? "O" : "X";
}

function criarquadro(): void {
  for (let i = 0; i < 9; i++) fazercaixa(i);
}

function fazercaixa(i: number): void {
  const caixa: HTMLDivElement = document.createElement("div");
  caixa.className = "caixa";
  caixa.id = `caixa-${i}`;
  quadro.appendChild(caixa);
}

main();
