/* 
POST /order: A rota deve receber o pedido do cliente, o nome do cliente e o valor do pedido, essas informações devem ser passadas dentro do corpo(body) da requisição, e com essas informações você deve registrar o novo pedido dentro de um array no seguinte formato: { id: "ac3ebf68-e0ad-4c1d-9822-ff1b849589a8", order: "X- Salada, 2 batatas grandes, 1 coca-cola", clientName:"José", price: 44.50, status:"Em preparação" }. Não se esqueça que o ID deve ser gerado por você, dentro do código utilizando UUID V4, assim que o pedido é criado, você deve sempre colocar o status como "Em preparação".

GET /order: Rota que lista todos os pedidos já feitos.

PUT /order/:id: Essa rota deve alterar um pedido já feito. Pode alterar,um ou todos os dados do pedido.O id do pedido deve ser enviado nos parâmetros da rota.

DELETE /order/:id: Essa rota deve deletar um pedido já feito com o id enviado nos parâmetros da rota.

GET /order/:id: Essa rota recebe o id nos parâmetros e deve retornar um pedido específico.

PATCH /order/:id: Essa rota recebe o id nos parâmetros e assim que ela for chamada, deve alterar o status do pedido recebido pelo id para "Pronto".

Exemplo
Se eu chamar a rota POST /order repassando { order: "X- Salada, 2 batatas grandes, 1 coca-cola", clienteName:"José", price: 44.50 }, o array deve ficar assim: */

const express = require('express')
const uuid = require('uuid')
const port = 3000
const app = express()
app.use(express.json())

const pedidos = []

const checkPedidoId = (req, res, netx) => {
    const { id } = req.params
    const index = pedidos.findIndex(pedido => pedido.id === id)
    if (index < 0) {
        return res.status(404).json({ error: "User not found" })
    }
    req.pedidoIndex = index
    req.pedidoId = id
    netx()
}


app.get('/pedidos', (req, res) => {
    return res.json(pedidos)
})

app.post('/pedidos', (req, res) => {
    const { order, clientName, price, status } = req.body
    const pedido = { id: uuid.v4(), order, clientName, price, status }
    pedidos.push(pedido)
    return res.json(pedido)
})

app.put('/pedidos/:id', checkPedidoId, (req, res) => {
    const { order, clientName, price, status } = req.body
    const id = req.pedidoId 
    const index = req.pedidoIndex
    
    const updatePedido = { id, order, clientName, price, status }
console.log(updatePedido)
    pedidos[index] = updatePedido
    return res.json(updatePedido)

})



app.delete('/pedidos/:id', checkPedidoId, (req, res) => {
    const index = req.pedidoIndex
    pedidos.splice(index, 1)
    return res.status(204).json()
})


app.listen(port, () => {
    console.log(`Staaaaaaaaaaaaaar link ${port}`)
})