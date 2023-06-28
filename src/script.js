const tagDataEntrega = document.getElementById("data-entrega");
const tagDadosFacultativos = document.getElementById("data-facultativo");
const tagDataEntregaFacultativa = document.getElementById("data-entrega-facultativa");
const tagTextoFacultativo = document.getElementById("texto-facultativo");
const diasUteis = 15;

var dataAtual = new Date();
var feriado = false;
var facultativo = false;
var arrayFacultativo = [];

function eFeriado() {
    feriado = true;
}

function eFacultativo(nome, data) {
    facultativo = true;
    arrayFacultativo.push([nome, data]);
}

async function calculaFeriado(dataAtual) {
    let dia = dataAtual.getDate();
    let mes = dataAtual.getMonth() + 1;
    let ano = dataAtual.getFullYear();
    let dataFormatada = (dia < 10 ? '0' + dia : dia) + '/' + (mes < 10 ? '0' + mes : mes) + '/' + ano;
    let tipo = ["nacional", "municipal", "facultativo"];
    for (const nivel in tipo) {
        const response = await fetch(
            "./src/feriados/" + tipo[nivel] + "/json/" + dataAtual.getFullYear() + ".json"
        );
        const feriados = await response.json();
        feriados.map((diaNaoUtil) => {
            if (diaNaoUtil.data === dataFormatada) {
                if (tipo[nivel] === "facultativo") {
                    eFacultativo(diaNaoUtil.nome, dataFormatada);
                } else {
                    eFeriado();
                }
            }
        });
    }
}

async function main() {
    for (let i = 0; i < diasUteis; i++) {
        dataAtual.setDate(dataAtual.getDate() + 1);
        if (dataAtual.getDay() === 0 || dataAtual.getDay() === 6) {
            i--;
        } else {
            await calculaFeriado(dataAtual);
            if (feriado) {
                i--;
                feriado = false;
            } else if (facultativo) {
                i--;
                facultativo = false;
            }
        }
    }

    let dia = dataAtual.getDate();
    let mes = dataAtual.getMonth() + 1;
    let ano = dataAtual.getFullYear();

    let dataFormatada = (dia < 10 ? '0' + dia : dia) + '/' + (mes < 10 ? '0' + mes : mes) + '/' + ano;
    tagDataEntrega.innerHTML = dataFormatada;

    if (arrayFacultativo.length > 0) {
        for (let i = 0; i < arrayFacultativo.length; i++) {
            tagDadosFacultativos.innerHTML += arrayFacultativo[i][0] + " " + arrayFacultativo[i][1];
            if (i !== arrayFacultativo.length - 1) {
                tagDadosFacultativos.innerHTML += ", ";
            }
        }
        dataAtual.setDate(dataAtual.getDate() - arrayFacultativo.length);
        if (dataAtual.getDay() === 0) {
            dataAtual.setDate(dataAtual.getDate() - 2);
        } else if (dataAtual.getDay() === 6) {
            dataAtual.setDate(dataAtual.getDate() - 1);
        }
        dia = dataAtual.getDate();
        mes = dataAtual.getMonth() + 1;
        let dataFacultativa = (dia < 10 ? '0' + dia : dia) + '/' + (mes < 10 ? '0' + mes : mes) + '/' + ano;
        tagDataEntregaFacultativa.innerHTML = dataFacultativa;
    } else {
        tagTextoFacultativo.innerHTML = "";
    }
}

main();