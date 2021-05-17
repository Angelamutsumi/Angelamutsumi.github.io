function validaDados(){
    validaData();
    validaEmail();
    selecionaCpfCnpj();
}

//Validação da data de nascimento.
function validaData(){
    //1) Define a data de hoje. Extrai as informações do Date() - data de nascimento.
    var hoje = new Date();
    hoje.ano = hoje.getFullYear();
    hoje.mes = hoje.getMonth() + 1;
    hoje.dia = hoje.getDate();
    console.log(hoje);
//2) Define a data de nascimento digitada. Extrai as informações do Date() - data de nascimento.
    nascimento = document.getElementById("nascimento").value;
    data = new Date(nascimento); 
    data.ano = data.getFullYear();
    data.mes = data.getMonth();
    data.dia = data.getDate() + 1;
    console.log(data);
    
//3) Define a idade.
    idade = hoje.ano - data.ano;
    console.log(idade)
    if(idade > 130 || idade <=0){
        alteraCorCampo("nascimento");
        apagaValue("nascimento");
    }

//4) Verifica o mês para confirmar a idade. Se a pessoa já fez aniversário no ano corrente ou não.
    diferençaAnos = hoje.mes - data.mes;
    if(diferençaAnos < 0 || (diferençaAnos === 0 && hoje.dia < data.dia)){
        idade--
    }
    console.log(diferençaAnos);
    console.log(idade);
}

// Validação do email.
function validaEmail() {
    var email = document.getElementById("email").value;
    var usuario = email.substring(0, email.indexOf("@"));
    dominio = email.substring(email.indexOf("@")+ 1, email.length);

    if ((usuario.length >=1) &&
        (dominio.length >=3) &&
        (usuario.search("@")==-1) &&
        (dominio.search("@")==-1) &&
        (usuario.search(" ")==-1) &&
        (dominio.search(" ")==-1) &&
        (dominio.search(".")!=-1) &&
        (dominio.indexOf(".") >=1)&&
        (dominio.lastIndexOf(".") < dominio.length - 1)) {         
    }
    else{
        alert("O email está incorreto. Pode digitar novamente?");
    } 
}

// Função que seleciona o tipo de CFP ou CNPJ.
function selecionaCpfCnpj() {
    var select = document.getElementById('cadastro');
    var value = select.options[select.selectedIndex].value;

    if (value === "cpf") {
        validaCpf();
    } else {
        validaCnpj();
    }
}

// Função de validação de CNPJ.
// 1) Verifica se o input está vazio ou tem mais de 14 caracteres.
function validaCnpj() {
    var cnpj = document.getElementById("cpf/cnpj").value;

    if (cnpj == "") {
        alert("Você não preencheu o CNPJ!")
    };

    if (cnpj.length != 14 && cnpj !== "") {
        alert("O CNPJ está incorreto. Pode digitar novamente?");
    } else {
        verificaErro();
    }
}

// 2) Verifica se o usuário digitou números iguais.
function verificaErro() {
    if (
        cnpj == "00000000000000" ||
        cnpj == "11111111111111" ||
        cnpj == "22222222222222" ||
        cnpj == "33333333333333" ||
        cnpj == "44444444444444" ||
        cnpj == "55555555555555" ||
        cnpj == "66666666666666" ||
        cnpj == "77777777777777" ||
        cnpj == "88888888888888" ||
        cnpj == "99999999999999"
    ) {
        alert("O CNPJ está incorreto. Pode digitar novamente?");
    } else {
        verificaCnpj();
    };
}

// 3) Verifica se o número é aceito pela Receita Federal.
function verificaCnpj() {
    var cnpj = document.getElementById("cpf/cnpj").value;
    var size = cnpj.length - 2;
    var numbers = cnpj.substring(0, size);
    var digits = cnpj.substring(size);
    var sum = 0;
    var pos = size - 7;
    for (var i = size; i >= 1; i--) {
        sum += numbers.charAt(size - i) * pos--;
        if (pos < 2) pos = 9;
    }
    var result = sum % 11 < 2 ? 0 : 11 - (sum % 11);
    if (result != digits.charAt(0)) {
        alert("O CNPJ está incorreto. Pode digitar novamente?")
    };

    size = size + 1;
    numbers = cnpj.substring(0, size);
    sum = 0;
    pos = size - 7;
    for (var i = size; i >= 1; i--) {
        sum += numbers.charAt(size - i) * pos--;
        if (pos < 2) pos = 9;
    }
    result = sum % 11 < 2 ? 0 : 11 - (sum % 11);
    if (result != digits.charAt(1)) {
        alert("O CNPJ está incorreto. Pode digitar novamente?");
    }
    return true;
}

// Função de validação de CPF.
function validaCpf() {
    var cpf = document.getElementById("cpf/cnpj").value;

// 1) Verifica se o input está vazio.
    if (cpf == "") {
        alert("Você esqueceu de preencher o CPF!");
    } else {
        verificaErroCpf();
    }

// 2) Verifica se tem mais de 11 caracteres ou foi preenchido com números iguais.
    function verificaErroCpf() {
        if (cpf.length != 11 ||
            cpf == "00000000000" ||
            cpf == "11111111111" ||
            cpf == "22222222222" ||
            cpf == "33333333333" ||
            cpf == "44444444444" ||
            cpf == "55555555555" ||
            cpf == "66666666666" ||
            cpf == "77777777777" ||
            cpf == "88888888888" ||
            cpf == "99999999999"
        ) {
            alert("O CNPJ está incorreto. Pode digitar novamente?");
            // return false;
        } else {
            verificaCpf();
        }
    }

// 3) Verifica se o CPF é válido pela Receita Federal.
    function verificaCpf() {
        var add = 0;
        for (var i = 0; i < 9; i++) add += parseInt(cpf.charAt(i)) * (10 - i);
        var rev = 11 - (add % 11);
        if (rev == 10 || rev == 11) rev = 0;
        if (rev != parseInt(cpf.charAt(9))) {
            alert("O CPF está incorreto. Pode digitar novamente?")
        };
        
        add = 0;
        for (var i = 0; i < 10; i++) add += parseInt(cpf.charAt(i)) * (11 - i);
        rev = 11 - (add % 11);
        if (rev == 10 || rev == 11) rev = 0;
        if (rev != parseInt(cpf.charAt(10))) {
            alert("O CPF está incorreto. Pode digitar novamente?");
        };
        return true;
    }
}

//Função para fazer aparecer o botão quando o scroll tiver passado dos 400px.
$(window).scroll(function(){
    var posicao = $(window).scrollTop();
    if(posicao >= 400){
        $("#botao").show();
    } else{
        $("#botao").hide();
    }
})

$(function() {
    $('a[href*="#"]:not([href="#"])').click(function() {
      var target = $(this.hash);
      if (target.length) {
        $('html, body').animate({ scrollTop: target.offset().top }, 3000);
        return false;
      }
    });
  });