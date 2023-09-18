const express=require("express")
const controladores=require("./controladores/contas")
const intermediarios= require("./intermediario")

const app=express()

app.use(express.json())

app.get('/contas', intermediarios.validarSenha, controladores.listarContasBancarias)

app.post('/contas', intermediarios.validarNovaConta, controladores.criarContaBancaria)

app.put('/contas/:numeroConta/usuario', intermediarios.validarAtulizacaoConta ,controladores.atualizarDados)

app.delete('/contas/:numeroConta',intermediarios.validarDeletar, controladores.deletar)

app.post('/transacoes/depositar', intermediarios.validarDeposito ,controladores.depositar)

app.post('/transacoes/sacar', intermediarios.validarSacar ,controladores.sacar)

app.post('/transacoes/transferir', intermediarios.validarTransferir ,controladores.transferir)

app.get('/contas/saldo', intermediarios.validarSaldo ,controladores.saldo)

app.get('/contas/extrato', intermediarios.validarExtrato ,controladores.extrato)

module.exports=app
