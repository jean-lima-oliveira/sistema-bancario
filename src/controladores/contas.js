const bancoDeDados=require("../bancodedados")
const { format } = require('date-fns');

const listarContasBancarias=(req,res)=>{
    return res.json(bancoDeDados.contas)
}

let cont=0
const criarContaBancaria=(req,res)=>{
    cont=cont+1
    const novaConta={
        numero: cont.toString(),
        saldo:0, 
        usuario:req.body
    }

    bancoDeDados.contas.push(novaConta)
    
    
    return res.status(200).json({"mensagem": "Usuário cadastrado com sucesso!"}) 
}

const atualizarDados=(req,res)=>{
    const id=req.params.numeroConta
    const novosValores=req.body
    
    let contaParaAtualizar=bancoDeDados.contas.find((contas)=>{
        return contas.numero==id
    })

    contaParaAtualizar.usuario=novosValores

    
    res.status(200).json({"mensagem": "Conta atualizada com sucesso!"})
}

const deletar=(req,res)=>{
    const id=req.params.numeroConta

    bancoDeDados.contas=bancoDeDados.contas.filter((contas)=>{
        return contas.numero!=id
    })

    res.status(200).json({"mensagem": "Conta excluida com sucesso!"})
}

const depositar=(req,res)=>{
    let {numero_conta , valor}=req.body 

    valor=Number(valor)

    let data= new Date()
    const dataNova = format(data, 'dd/MM/yyyy HH:mm:ss')
   
    
    let contaParaAtualizar=bancoDeDados.contas.find((contas)=>{
        return contas.numero==numero_conta
    })

    contaParaAtualizar.saldo=contaParaAtualizar.saldo+valor

    bancoDeDados.depositos.push({numero_conta , valor, dataNova})

    res.status(200).json({"mensagem": "Deposito realizado com sucesso!"})
}

const sacar=(req,res)=>{
    let {numero_conta , valor}=req.body 

    valor=Number(valor)

    let data= new Date()
    const dataNova = format(data, 'dd/MM/yyyy HH:mm:ss')

    let contaParaAtualizar=bancoDeDados.contas.find((contas)=>{
        return contas.numero==numero_conta
    })

    contaParaAtualizar.saldo=contaParaAtualizar.saldo-valor

    bancoDeDados.saques.push({numero_conta , valor, dataNova})

    res.status(200).json({"mensagem": "Saque realizado com sucesso!"})
}

const transferir=(req,res)=>{

    let data= new Date()
    const dataNova = format(data, 'dd/MM/yyyy HH:mm:ss')
    

    let {numero_conta_origem,numero_conta_destino,valor,senha} = req.body

    let deConta=bancoDeDados.contas.find((contas)=>{
        return contas.numero==numero_conta_origem
    })

    let paraConta=bancoDeDados.contas.find((contas)=>{
        return contas.numero==numero_conta_destino
    })

    deConta.saldo=deConta.saldo-Number(valor)
    paraConta.saldo=paraConta.saldo+Number(valor)

    bancoDeDados.transferencias.push({numero_conta_origem,numero_conta_destino,valor, dataNova})

    res.status(200).json({"mensagem": "Transferencia realizada com sucesso!"})
}

const saldo=(req,res)=>{
    let {numero_conta, senha}=req.query
    
    let deConta=bancoDeDados.contas.find((contas)=>{
        return contas.numero==numero_conta
    })

    if(senha==deConta.usuario.senha){
        res.json(deConta.saldo)
    }
    return res.status(400).json({"mensagem": "Senha errada!"})
}

const extrato=(req,res)=>{
    let {numero_conta, senha}=req.query

    let transferencias=bancoDeDados.transferencias.filter((contas)=>{
        return contas.numero_conta_origem==numero_conta
    })

    let saques=bancoDeDados.saques.filter((contas)=>{
        return contas.numero_conta==numero_conta
    })

    let depositos=bancoDeDados.depositos.filter((contas)=>{
        return contas.numero_conta==numero_conta
    })

    let extrato={transferencias,saques,depositos}

    res.json(extrato)
}

module.exports={
    listarContasBancarias,
    criarContaBancaria,
    atualizarDados,
    deletar,
    depositar,
    sacar,
    transferir,
    saldo,
    extrato
}