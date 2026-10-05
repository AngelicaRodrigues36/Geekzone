const robo = new(window.SpeechRecognition || window.webkitSpeechRecognition)();
robo.lang = 'pt-br';

functino ouvir(){
    document.getElementById("resposta").innerText= "Ouvindo..";
    robor.start();
}
robo.onresult = function(evento){
    const fala = evento.onresult[0][0].transcript.tolowerCase();
    const tela = document.getElementById("resposta");

    if(fala.includes("claro") || fala.includes("luz") || fala.includes("branco")){
        document.body.classList.add("modo-claro");
        tela.inner.Text = "Modo claro ativado";
    } 
    elseif (fala.includes("frete") || fala.includes("entrega")){
        tela.innerText = "Frete Grátis para compras acima de 200,00";
    }
    else{
        tela.innerText = `Comando "${fala}" não reconhecido.`;
    }

}