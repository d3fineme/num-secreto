var listaNumSorteados = [];
let numeroLimite = 100;
let NumSecreto = GerarNumeroAleatorio();
let tentativa = 1;

function exibirTextoNaTela(tag,texto){
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate:1.2});
}

function exibirMensagemInicial(){
    exibirTextoNaTela('h1','Jogo do Número Secreto');
    exibirTextoNaTela('p','Escolha um número entre 1 e 100');
}

// teste
exibirMensagemInicial();

function verificarChute(){
    let chute = document.querySelector('input').value;
    if (chute == NumSecreto) {
        exibirTextoNaTela('h1','acertou');
        let palavraTentativa = tentativa > 1 ? 'tentativas' : 'tentativa';
        let mensagemTentativas = `Você descobriu o número secreto com ${tentativa} 
        ${palavraTentativa}`;
        exibirTextoNaTela('p',mensagemTentativas);
        document.getElementById('reiniciar').removeAttribute('disabled');
        
    } else {
        if (chute > NumSecreto){
            exibirTextoNaTela('p','O número secreto é MENOR');
        } else {
            exibirTextoNaTela('p','O número secreto é MAIOR');
        }
        tentativa++;
        limparCampo();
    }
}

function GerarNumeroAleatorio() {
    let numEscolhido = parseInt(Math.random() * numeroLimite + 1);
    let qtdElementosLista = listaNumSorteados.length;

    if(qtdElementosLista == numeroLimite){
        listaNumSorteados = [];
    }

    if(listaNumSorteados.includes(numEscolhido)){
        return GerarNumeroAleatorio();
    }else{
        listaNumSorteados.push(numEscolhido);
        return numEscolhido;
    }
}

function limparCampo() {
    chute = document.querySelector('input');
    chute.value = '';
}

function reiniciarJogo(){
    NumSecreto = GerarNumeroAleatorio();
    limparCampo();
    tentativa = 1;
    exibirMensagemInicial();
    document.getElementById('reiniciar').setAttribute('disabled',true);
}