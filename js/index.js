let secaoprodutos = document.querySelector(".cards")
let divCategorias = document.querySelector('.div_btn')

function filtrarCategorias() {
    divCategorias.addEventListener('click', function (event) {
        let categoria = event.target.innerText
        criarCard(produtos, categoria)

    })
}
filtrarCategorias()


function criarCard(arr, categorias = 'Todos') {

    secaoprodutos.innerHTML = ""

    for (let i = 0; i < arr.length; i++) {
        if (arr[i].tag[0] == categorias || categorias == 'Todos') {

            const card = document.createElement("li")
            const figure = document.createElement("figure")
            const img = document.createElement("img")
            const btn = document.createElement("button")
            const titulo = document.createElement("h3")
            const desc = document.createElement("p")
            const preco = document.createElement("span")
            const div = document.createElement("div")
            const btnAdd = document.createElement("button")
            const promocao = document.createElement("span")


            btnAdd.id = arr[i].id
            
            card.classList.add("products");
            btn.classList.add("btn_card");
            btnAdd.classList.add("link_card");
            promocao.classList.add('promocao_card')


            img.src = arr[i].img
            btn.innerText = arr[i].tag
            titulo.innerText = arr[i].nameItem
            desc.innerText = arr[i].description
            preco.innerHTML = `R$ ${arr[i].value.toFixed(2)}`.replace('.', ',')
            btnAdd.innerText = arr[i].addCart
            promocao.innerText = 'Promoção'


            card.append(figure, btn, titulo, desc, preco, div, promocao)
            figure.appendChild(img)
            div.appendChild(btnAdd)
            
            secaoprodutos.appendChild(card)
        }
        
    }
    if (secaoprodutos.children.length == 0) {
        const titulo = document.createElement('h2')
        titulo.innerText = 'Essa categoria não apresenta produtos no momento ....'
        secaoprodutos.appendChild(titulo)
    }
}

secaoprodutos.addEventListener('click', addCarrinho)
criarCard(produtos)

let carrinho = document.querySelector('.campoCarrinho')

let produtosCarrinho = []

function addCarrinho(event) {
    if(event.target.tagName == 'BUTTON'){

        let idItem = event.target.id
    
        let produto = produtos.find(function (element) {
            if (idItem == element.id) {
                return true
            }
    
        })
        produtosCarrinho.push(produto)
        itensCarrinho(produtosCarrinho)
        somaCarrinho(produtosCarrinho)
    }

}


function itensCarrinho(arr) {
    carrinho.innerHTML = ""
    if(produtosCarrinho.length == 0){
        const tagDiv = document.createElement('div')
        tagDiv.classList.add('info_carrinho')
        const tagH2 = document.createElement('h2')
        const tagP = document.createElement('p')
        tagP.classList.add('add_carrinho')

        tagH2.innerText = 'Carrinho Vazio'
        tagP.innerText = 'Adicione itens ao seu carrinho'

        tagDiv.append(tagH2, tagP)
        carrinho.appendChild(tagDiv)

    }

    for (let i = 0; i < arr.length; i++) {


        const card = document.createElement("li")
        const img = document.createElement("img")
        const titulo = document.createElement("h3")
        const preco = document.createElement("span")
        const remover = document.createElement('button')
        remover.id = i
        
        remover.classList.add('remover')
        card.classList.add("products_carrinho");
        img.classList.add("img_carrinho")
        titulo.classList.add("nomeitem_carrinho")
        preco.classList.add("valor_carrinho")
        
        img.src = arr[i].img
        preco.innerHTML = `R$ ${arr[i].value.toFixed(2)}`.replace('.', ',')
        titulo.innerText = arr[i].nameItem
        remover.innerText = 'X'

        carrinho.appendChild(card)
        card.append(img, titulo, preco, remover)
    }
}

carrinho.addEventListener('click', removerItem)

function removerItem(event) {
    if(event.target.tagName == 'BUTTON'){

        produtosCarrinho.splice(event.target.id, 1)
        itensCarrinho(produtosCarrinho)
        somaCarrinho(produtosCarrinho)
    }
}


let total = document.querySelector('.total')
let quantidade = document.querySelector('.quantidade')

function somaCarrinho(arr) {
    let contador = 0
    for (let i = 0; i < arr.length; i++) {
        contador += arr[i].value
    }

    quantidade.innerText = `Quantidade: ${produtosCarrinho.length}`
    total.innerText = `Total: R$ ${contador.toFixed(2)}`.replace('.', ',')

}