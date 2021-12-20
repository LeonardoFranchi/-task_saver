var hh = 0;
var mm  = 0;
var ss = 0;

var tempo = 1000 // 1 seg tem 1000 milésimos
var cron;

let btstart = document.querySelector(".bt-start"); // variável para habilitar e desabilitar botões
let btpause = document.querySelector(".bt-pause");
btpause.disabled = true;

//
function start() {
    cron = setInterval(() => { timer(); }, tempo);
    btstart.disabled = true;
    btpause.disabled = false;
}

//
function pause() {
    clearInterval(cron);
    btstart.disabled = false;
    btpause.disabled = true;
}

//
function stop() {
    clearInterval(cron);
    hh = 0;
    mm  = 0;
    ss = 0;

    salvar(); // Salvar arquivo txt
    document.getElementById('counter').innerText = '00:00:00'; // Zerar cronômetro
    eraseText(); // Limpar texto
    btstart.disabled = false;
    btpause.disabled = true;
}

function timer() {
    ss++

    if(ss == 60){
        ss = 0;
        mm++;
        
        if(mm == 60){
            mm = 0;
            hh++;
        }
    }
    var format = `${hh < 10 ? '0' + hh : hh}:${mm < 10 ? '0' + mm : mm}:${ss < 10 ? '0' + ss : ss}`; // Formatação do cronômetro
    document.getElementById('counter').innerText = format;
}

function eraseText() { // Limpando campos
    document.getElementById("nome").value = "";
    document.getElementById("tarefa").value = "";
}

function salvar() { // Usando Biblioteca FileSaver
    var nome = document.getElementById("nome").value;
    var tarefa = document.getElementById("tarefa").value;
    var tempo = document.getElementById("counter").innerText;

    var  blob  =  new  Blob ( [` Tempo Utilizado: ${tempo} \n Tarefa: ${tarefa}`] ,  { type : "text / plain; charset = utf-8" } ) ; 
    saveAs ( blob ,  nome + ".txt" ) ;
}
