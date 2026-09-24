const daltonismoBtn = document.getElementById("daltonismoBtn");
const contrasteBtn = document.getElementById("contrasteBtn");
const fonteBtn = document.getElementById("fonteBtn");
const leitorBtn = document.getElementById("leitorBtn");
const pararLeitorBtn = document.getElementById("pararLeitorBtn");

const body = document.body;


/* DALTONISMO */

if (daltonismoBtn) {
    daltonismoBtn.addEventListener("click", function () {
        body.classList.toggle("daltonismo");

        const ativado = body.classList.contains("daltonismo");

        daltonismoBtn.classList.toggle("ativo", ativado);

        localStorage.setItem("daltonismo", ativado);
    });
}


/* ALTO CONTRASTE */

if (contrasteBtn) {
    contrasteBtn.addEventListener("click", function () {
        body.classList.toggle("altoContraste");

        const ativado = body.classList.contains("altoContraste");

        contrasteBtn.classList.toggle("ativo", ativado);

        localStorage.setItem("altoContraste", ativado);
    });
}


/* TEXTO MAIOR */

if (fonteBtn) {
    fonteBtn.addEventListener("click", function () {
        body.classList.toggle("textoMaior");

        const ativado = body.classList.contains("textoMaior");

        fonteBtn.classList.toggle("ativo", ativado);

        localStorage.setItem("textoMaior", ativado);
    });
}


/* LEITOR DE TEXTO */

let falaAtual = null;

function lerPagina() {

    if (!("speechSynthesis" in window)) {
        alert("Seu navegador não possui suporte para leitura de texto.");
        return;
    }

    const conteudo = document.querySelector("main");

    if (!conteudo) {
        alert("Não foi possível encontrar o conteúdo da página.");
        return;
    }

    let texto = conteudo.innerText || conteudo.textContent;

    texto = texto
        .replace(/\s+/g, " ")
        .trim();

    if (!texto) {
        alert("Não há texto para ler.");
        return;
    }

    window.speechSynthesis.cancel();

    falaAtual = new SpeechSynthesisUtterance(texto);

    falaAtual.lang = "pt-BR";
    falaAtual.rate = 0.9;
    falaAtual.pitch = 1;
    falaAtual.volume = 1;

    const vozes = window.speechSynthesis.getVoices();

    const vozPortugues = vozes.find(function (voz) {
        return voz.lang.toLowerCase().startsWith("pt-br");
    });

    const vozPortuguesPortugal = vozes.find(function (voz) {
        return voz.lang.toLowerCase().startsWith("pt");
    });

    if (vozPortugues) {
        falaAtual.voice = vozPortugues;
    } else if (vozPortuguesPortugal) {
        falaAtual.voice = vozPortuguesPortugal;
    }

    falaAtual.onstart = function () {
        if (leitorBtn) {
            leitorBtn.classList.add("ativo");
            leitorBtn.textContent = "🔊 Lendo...";
        }
    };

    falaAtual.onend = function () {
        if (leitorBtn) {
            leitorBtn.classList.remove("ativo");
            leitorBtn.textContent = "🔊 Ler página";
        }
    };

    falaAtual.onerror = function (evento) {
        console.log("Erro no leitor:", evento);

        if (leitorBtn) {
            leitorBtn.classList.remove("ativo");
            leitorBtn.textContent = "🔊 Ler página";
        }

        alert("Não foi possível iniciar a leitura. Tente novamente.");
    };

    window.speechSynthesis.speak(falaAtual);
}


/* BOTÃO LER */

if (leitorBtn) {
    leitorBtn.addEventListener("click", function () {

        if (window.speechSynthesis.speaking) {
            window.speechSynthesis.cancel();

            leitorBtn.classList.remove("ativo");
            leitorBtn.textContent = "🔊 Ler página";

            return;
        }

        lerPagina();
    });
}


/* PARAR LEITURA */

if (pararLeitorBtn) {
    pararLeitorBtn.addEventListener("click", function () {

        if ("speechSynthesis" in window) {
            window.speechSynthesis.cancel();
        }

        if (leitorBtn) {
            leitorBtn.classList.remove("ativo");
            leitorBtn.textContent = "🔊 Ler página";
        }
    });
}


/* CARREGAR VOZES */

if ("speechSynthesis" in window) {

    window.speechSynthesis.getVoices();

    window.speechSynthesis.onvoiceschanged = function () {
        window.speechSynthesis.getVoices();
    };
}


/* RECUPERAR CONFIGURAÇÕES */

const daltonismoSalvo =
    localStorage.getItem("daltonismo") === "true";

const contrasteSalvo =
    localStorage.getItem("altoContraste") === "true";

const fonteSalva =
    localStorage.getItem("textoMaior") === "true";


if (daltonismoSalvo && daltonismoBtn) {
    body.classList.add("daltonismo");
    daltonismoBtn.classList.add("ativo");
}


if (contrasteSalvo && contrasteBtn) {
    body.classList.add("altoContraste");
    contrasteBtn.classList.add("ativo");
}


if (fonteSalva && fonteBtn) {
    body.classList.add("textoMaior");
    fonteBtn.classList.add("ativo");
}


/* TECLA ESC */

document.addEventListener("keydown", function (event) {

    if (event.key === "Escape") {

        if ("speechSynthesis" in window) {
            window.speechSynthesis.cancel();
        }

        if (leitorBtn) {
            leitorBtn.classList.remove("ativo");
            leitorBtn.textContent = "🔊 Ler página";
        }
    }
});