
const produtos = [
    {
        id: 1,
        nome: "Controle DualSense",
        descricao: "Controle para jogos com design moderno.",
        preco: 399.90,
        emoji: "🎮",
        etiqueta: "Destaque"
    },
    {
        id: 2,
        nome: "Funko Pop Naruto",
        descricao: "Colecionável para fãs de anime.",
        preco: 129.90,
        emoji: "🍥",
        etiqueta: "Geek"
    },
    {
        id: 3,
        nome: "Headset HyperX",
        descricao: "Áudio para jogos e comunicação.",
        preco: 299.90,
        emoji: "🎧",
        etiqueta: "Gamer"
    },
    {
        id: 4,
        nome: "Teclado RGB",
        descricao: "Teclado gamer com iluminação colorida.",
        preco: 219.90,
        emoji: "⌨️",
        etiqueta: "Popular"
    },
    {
        id: 5,
        nome: "Mouse Gamer",
        descricao: "Mouse para suas partidas.",
        preco: 149.90,
        emoji: "🖱️",
        etiqueta: "Oferta"
    },
    {
        id: 6,
        nome: "Console Retrô",
        descricao: "Reviva os jogos clássicos.",
        preco: 349.90,
        emoji: "🕹️",
        etiqueta: "Clássico"
    }
];

let carrinho = [];

const formatarDinheiro = valor =>
    valor.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });

function exibirProdutos(lista = produtos) {
    const grade = document.getElementById("gradeProdutos");
    grade.innerHTML = "";

    if (lista.length === 0) {
        grade.innerHTML = "<p>Nenhum produto encontrado.</p>";
        return;
    }

    lista.forEach(produto => {
        const card = document.createElement("article");
        card.className = "produto";

        const etiqueta = document.createElement("span");
        etiqueta.className = "etiqueta";
        etiqueta.textContent = produto.etiqueta;

        const imagem = document.createElement("div");
        imagem.className = "produto-imagem";

        const emoji = document.createElement("span");
        emoji.className = "emoji-produto";
        emoji.textContent = produto.emoji;
        imagem.appendChild(emoji);

        const nome = document.createElement("h3");
        nome.textContent = produto.nome;

        const descricao = document.createElement("p");
        descricao.className = "descricao";
        descricao.textContent = produto.descricao;

        const preco = document.createElement("p");
        preco.className = "preco";
        preco.textContent = formatarDinheiro(produto.preco);

        const botao = document.createElement("button");
        botao.className = "botao-comprar";
        botao.type = "button";
        botao.textContent = "Adicionar ao carrinho";
        botao.addEventListener("click", () => adicionarCarrinho(produto.id));

        card.append(etiqueta, imagem, nome, descricao, preco, botao);
        grade.appendChild(card);
    });
}

function adicionarCarrinho(id) {
    const produto = produtos.find(item => item.id === id);
    const existente = carrinho.find(item => item.id === id);

    if (existente) {
        existente.quantidade++;
    } else {
        carrinho.push({
            ...produto,
            quantidade: 1
        });
    }

    atualizarCarrinho();
}

function atualizarCarrinho() {
    const itens = document.getElementById("itensCarrinho");
    const quantidade = carrinho.reduce(
        (soma, item) => soma + item.quantidade, 0
    );

    const total = carrinho.reduce(
        (soma, item) => soma + item.preco * item.quantidade, 0
    );

    document.getElementById("quantidadeCarrinho").textContent = quantidade;
    document.getElementById("valorTopo").textContent = formatarDinheiro(total);
    document.getElementById("totalCarrinho").textContent = formatarDinheiro(total);

    itens.innerHTML = "";

    if (carrinho.length === 0) {
        itens.innerHTML = '<p class="carrinho-vazio">Seu carrinho está vazio.</p>';
        return;
    }

    carrinho.forEach(item => {
        const linha = document.createElement("div");
        linha.className = "item-carrinho";

        const informacoes = document.createElement("div");

        const nome = document.createElement("h3");
        nome.textContent = item.emoji + " " + item.nome;

        const preco = document.createElement("p");
        preco.textContent = formatarDinheiro(item.preco * item.quantidade);

        const controles = document.createElement("div");
        controles.className = "controles-item";

        const diminuir = document.createElement("button");
        diminuir.type = "button";
        diminuir.textContent = "−";
        diminuir.setAttribute("aria-label", "Diminuir quantidade");
        diminuir.addEventListener("click", () => alterarQuantidade(item.id, -1));

        const numero = document.createElement("span");
        numero.textContent = item.quantidade;

        const aumentar = document.createElement("button");
        aumentar.type = "button";
        aumentar.textContent = "+";
        aumentar.setAttribute("aria-label", "Aumentar quantidade");
        aumentar.addEventListener("click", () => alterarQuantidade(item.id, 1));

        controles.append(diminuir, numero, aumentar);
        informacoes.append(nome, preco, controles);

        const remover = document.createElement("button");
        remover.type = "button";
        remover.className = "remover-item";
        remover.textContent = "✕";
        remover.setAttribute("aria-label", "Remover produto");
        remover.addEventListener("click", () => removerProduto(item.id));

        linha.append(informacoes, remover);
        itens.appendChild(linha);
    });
}

function alterarQuantidade(id, mudanca) {
    const item = carrinho.find(produto => produto.id === id);
    if (!item) return;

    item.quantidade += mudanca;

    if (item.quantidade <= 0) {
        removerProduto(id);
    } else {
        atualizarCarrinho();
    }
}

function removerProduto(id) {
    carrinho = carrinho.filter(item => item.id !== id);
    atualizarCarrinho();
}

const painelCarrinho = document.getElementById("painelCarrinho");
const fundoPainel = document.getElementById("fundoPainel");

function abrirCarrinho() {
    painelCarrinho.classList.add("aberto");
    fundoPainel.classList.add("visivel");
}

function fecharCarrinho() {
    painelCarrinho.classList.remove("aberto");
    fundoPainel.classList.remove("visivel");
}

document.getElementById("abrirCarrinho")
    .addEventListener("click", abrirCarrinho);

document.getElementById("fecharCarrinho")
    .addEventListener("click", fecharCarrinho);

fundoPainel.addEventListener("click", fecharCarrinho);

document.getElementById("limparCarrinho").addEventListener("click", () => {
    carrinho = [];
    atualizarCarrinho();
});

document.getElementById("finalizarCompra").addEventListener("click", () => {
    if (carrinho.length === 0) {
        alert("Adicione pelo menos um produto ao carrinho!");
        return;
    }

    const total = carrinho.reduce(
        (soma, item) => soma + item.preco * item.quantidade, 0
    );

    localStorage.setItem("geekzone-total", total.toFixed(2));
    localStorage.setItem("geekzone-pedido", JSON.stringify(carrinho));

    window.location.href = "pagamento.html";
});

document.getElementById("pesquisa").addEventListener("input", evento => {
    const termo = evento.target.value.trim().toLocaleLowerCase("pt-BR");

    const filtrados = produtos.filter(produto =>
        produto.nome.toLocaleLowerCase("pt-BR").includes(termo) ||
        produto.descricao.toLocaleLowerCase("pt-BR").includes(termo)
    );

    exibirProdutos(filtrados);
});

// MODO CLARO E ESCURO

const botaoTema = document.getElementById("botaoTema");
const textoTema = document.getElementById("textoTema");

function aplicarTema(tema) {
    document.body.classList.toggle("tema-claro", tema === "claro");

    textoTema.textContent =
        tema === "claro" ? "Modo Escuro" : "Modo Claro";

    localStorage.setItem("geekzone-tema", tema);
}

botaoTema.addEventListener("click", () => {
    const temaAtual = document.body.classList.contains("tema-claro")
        ? "claro"
        : "escuro";

    aplicarTema(temaAtual === "claro" ? "escuro" : "claro");
});

// GEEKBOT: CHAT

const abrirRobo = document.getElementById("abrirRobo");
const fecharRobo = document.getElementById("fecharRobo");
const janelaRobo = document.getElementById("janelaRobo");
const mensagensRobo = document.getElementById("mensagensRobo");
const formRobo = document.getElementById("formRobo");
const entradaRobo = document.getElementById("entradaRobo");
const falarRobo = document.getElementById("falarRobo");
const statusRobo = document.getElementById("statusRobo");

abrirRobo.addEventListener("click", () => {
    janelaRobo.classList.toggle("robo-oculto");

    const notificacao = abrirRobo.querySelector(".robo-notificacao");
    if (notificacao) notificacao.style.display = "none";

    if (!janelaRobo.classList.contains("robo-oculto")) {
        entradaRobo.focus();
    }
});

fecharRobo.addEventListener("click", () => {
    janelaRobo.classList.add("robo-oculto");
});

function adicionarMensagem(texto, tipo) {
    const mensagem = document.createElement("div");

    mensagem.className = tipo === "usuario"
        ? "mensagem-usuario"
        : "mensagem-robo";

    mensagem.textContent = texto;
    mensagensRobo.appendChild(mensagem);
    mensagensRobo.scrollTop = mensagensRobo.scrollHeight;
}

function responderRobo(texto) {
    const fala = texto.toLocaleLowerCase("pt-BR").trim();

    if (!fala) {
        return "Digite uma mensagem para eu poder ajudar!";
    }

    if (
        fala.includes("claro") ||
        fala.includes("luz") ||
        fala.includes("branco")
    ) {
        aplicarTema("claro");
        return "☀️ Modo claro ativado!";
    }

    if (fala.includes("escuro") || fala.includes("noite")) {
        aplicarTema("escuro");
        return "🌙 Modo escuro ativado!";
    }

    if (fala.includes("frete") || fala.includes("entrega")) {
        return "🚚 Frete grátis para compras acima de R$ 200,00! Consulte as condições de entrega da loja.";
    }

    if (
        fala.includes("pix") ||
        fala.includes("pagamento") ||
        fala.includes("pagar")
    ) {
        return "💜 Adicione produtos ao carrinho e clique em Finalizar compra. A página mostrará o total e a chave Pix demonstrativa.";
    }

    if (
        fala.includes("produto") ||
        fala.includes("catálogo") ||
        fala.includes("catalogo")
    ) {
        return "🎮 Temos controle DualSense, Funko Pop Naruto, headset, teclado RGB, mouse gamer e console retrô!";
    }

    if (
        fala.includes("preço") ||
        fala.includes("preco") ||
        fala.includes("valor")
    ) {
        return "💰 Os preços estão nos cartões dos produtos. Adicione itens ao carrinho para ver o valor total.";
    }

    if (fala.includes("carrinho") || fala.includes("comprar")) {
        return "🛒 Clique em Adicionar ao carrinho no produto desejado, abra o carrinho e selecione Finalizar compra.";
    }

    if (
        fala.includes("olá") ||
        fala.includes("ola") ||
        fala === "oi" ||
        fala.includes("bom dia") ||
        fala.includes("boa tarde")
    ) {
        return "Olá! 👋 Bem-vindo à GeekZone! Quer saber sobre produtos, frete ou Pix?";
    }

    if (fala.includes("obrigado") || fala.includes("obrigada")) {
        return "💜 Por nada! A GeekZone agradece sua visita!";
    }

    return `Não entendi muito bem "${texto}". Pergunte sobre produtos, frete, Pix ou modo claro.`;
}

function enviarMensagem(texto) {
    if (!texto.trim()) return;

    adicionarMensagem(texto, "usuario");
    adicionarMensagem(responderRobo(texto), "robo");
}

formRobo.addEventListener("submit", evento => {
    evento.preventDefault();

    const texto = entradaRobo.value.trim();
    if (!texto) return;

    entradaRobo.value = "";
    enviarMensagem(texto);
});

document.querySelectorAll(".robo-sugestao").forEach(botao => {
    botao.addEventListener("click", () => {
        enviarMensagem(botao.dataset.pergunta);
    });
});

// RECONHECIMENTO DE VOZ

const ReconhecimentoVoz =
    window.SpeechRecognition || window.webkitSpeechRecognition;

let roboVoz = null;

if (ReconhecimentoVoz) {
    roboVoz = new ReconhecimentoVoz();
    roboVoz.lang = "pt-BR";
    roboVoz.continuous = false;
    roboVoz.interimResults = false;

    falarRobo.addEventListener("click", () => {
        statusRobo.textContent = "🎤 Estou ouvindo...";

        try {
            roboVoz.start();
        } catch (erro) {
            statusRobo.textContent =
                "Aguarde um instante e tente novamente.";
        }
    });

    roboVoz.onresult = evento => {
        const fala = evento.results[0][0].transcript;

        statusRobo.textContent = "Você disse: " + fala;
        enviarMensagem(fala);
    };

    roboVoz.onerror = () => {
        statusRobo.textContent =
            "Não consegui ouvir. Verifique a permissão do microfone.";
    };

    roboVoz.onend = () => {
        if (statusRobo.textContent === "🎤 Estou ouvindo...") {
            statusRobo.textContent = "Pode tentar novamente.";
        }
    };
} else {
    falarRobo.disabled = true;
    falarRobo.title = "Reconhecimento de voz não disponível neste navegador";

    statusRobo.textContent =
        "Voz indisponível neste navegador. Você ainda pode digitar.";
}

// INICIALIZAÇÃO

const temaSalvo = localStorage.getItem("geekzone-tema") || "escuro";

aplicarTema(temaSalvo);
exibirProdutos();
atualizarCarrinho();
