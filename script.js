var Contatos = { 
    index: window.localStorage.getItem("Contatos:index"),
    $tabela: document.getElementById("tabela"),
    $form: document.getElementById("form"),
    $botao_salvar: document.getElementById("salvar"),
    $botao_excluir: document.getElementById("listar"),

    init: function() {
       
        if (!Contatos.index) {
            window.localStorage.setItem("Contatos:index", Contatos.index = 1);
        }

       
        Contatos.$form.reset();
        Contatos.$botao_excluir.addEventListener("click", function(event) {
            Contatos.$form.reset();
            Contatos.$form.id_numero.value = 0;
        }, true);
        Contatos.$form.addEventListener("submit", function(event) {
            var valor = {
                id: parseInt(this.id_numero.value),
                nome: this.nome.value,
                email: this.email.value,
                telefone: this.telefone.value
                
            };
            if (valor.id == 0) { 
                Contatos.adicionarConteudo(valor);
                Contatos.adicionarTabela(valor);
                alert('Contato adicionado com sucesso!')
            }
            else {
                Contatos.editarConteudo(valor);
                Contatos.editarTabela(valor);
                alert('Contato editado com sucesso!')
            }

            this.reset();
            this.id_numero.value = 0;
            event.preventDefault();
        }, true);

        
        if (window.localStorage.length - 1) {
            var lista_contatos = [], i, key;
            for (i = 0; i < window.localStorage.length; i++) {
                key = window.localStorage.key(i);
                if (/Contatos:\d+/.test(key)) {
                    lista_contatos.push(JSON.parse(window.localStorage.getItem(key)));
                }
            }

            if (lista_contatos.length) {
                lista_contatos
                    .sort(function(a, b) {
                        return a.id < b.id ? -1 : (a.id > b.id ? 1 : 0);
                    })
                    .forEach(Contatos.adicionarTabela);
                    
            }
        }
        Contatos.$tabela.addEventListener("click", function(event) {
            var op = event.target.getAttribute("data-op");
            if (/editar|remove/.test(op)) {
                var valor = JSON.parse(window.localStorage.getItem("Contatos:"+ event.target.getAttribute("data-id")));
                if (op == "editar") {
                    Contatos.$form.nome.value = valor.nome;
                    Contatos.$form.email.value = valor.email;
                    Contatos.$form.telefone.value = valor.telefone;
                    Contatos.$form.id_numero.value = valor.id;
                }
                else if (op == "remove") {
                    if (confirm('Você tem certeza que deseja excluir "'+ valor.nome +' '+ valor.telefone +'" da sua agenda?')) {
                        Contatos.removerConteudo(valor);
                        Contatos.removerTabela(valor);
                        alert('Contato removido com sucesso!')
                    }
                }
                event.preventDefault();
            }
        }, true);
    },

    adicionarConteudo: function(valor) {
        valor.id = Contatos.index;
        window.localStorage.setItem("Contatos:index", ++Contatos.index);
        window.localStorage.setItem("Contatos:"+ valor.id, JSON.stringify(valor));
    },
    editarConteudo: function(valor) {
        window.localStorage.setItem("Contatos:"+ valor.id, JSON.stringify(valor));
    },
    removerConteudo: function(valor) {
        window.localStorage.removeItem("Contatos:"+ valor.id);
    },

    adicionarTabela: function(valor) {
        var $tr = document.createElement("tr"), $td, key;
        for (key in valor) {
            if (valor.hasOwnProperty(key)) {
                $td = document.createElement("td");
                $td.appendChild(document.createTextNode(valor[key]));
                $tr.appendChild($td);
            }
        }
        $td = document.createElement("td");
        $td.innerHTML = '<a data-op="editar" data-id="'+ valor.id +'">Editar</a> | <a data-op="remove" data-id="'+ valor.id +'">Excluir Contato</a>';
        $tr.appendChild($td);
        $tr.setAttribute("id", "valor-"+ valor.id);
        Contatos.$tabela.appendChild($tr);
    },
    editarTabela: function(valor) {
        var $tr = document.getElementById("valor-"+ valor.id), $td, key;
        $tr.innerHTML = "";
        for (key in valor) {
            if (valor.hasOwnProperty(key)) {
                $td = document.createElement("td");
                $td.appendChild(document.createTextNode(valor[key]));
                $tr.appendChild($td);
            }
        }
        $td = document.createElement("td");
        $td.innerHTML = '<a data-op="editar" data-id="'+ valor.id +'">Editar</a> | <a data-op="remove" data-id="'+ valor.id +'">Excluir Contato</a>';
        $tr.appendChild($td);
    },
    removerTabela: function(valor) {
        Contatos.$tabela.removeChild(document.getElementById("valor-"+ valor.id));
    }
};
Contatos.init();


function SomenteNumero(e){
    var tecla=(window.event)?event.keyCode:e.which;   
    if((tecla > 47 && tecla < 58)) return true;
    else{1
    	if (tecla==8 || tecla==0) return true;
	else  return false;
    }
}