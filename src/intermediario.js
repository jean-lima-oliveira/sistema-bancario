const bancoDeDados = require("./bancodedados")

const validarSenha=(req, res, next)=>{
    let {senha_banco}=req.query

    if (!senha_banco) {
        res.status(400).json({"mensagem": "Senha do banco não informada!"})
        
    }

    if (senha_banco!=bancoDeDados.banco.senha) {
        res.status(403).json({"mensagem": "A senha do banco informada é inválida!"})
        
    }

    if (senha_banco==bancoDeDados.banco.senha) {
        next()
    }
}

const validarNovaConta=(req, res, next)=>{
    let {nome,cpf,data_nascimento,telefone,email,senha}=req.body


    const cpfJaCadastrado=bancoDeDados.contas.find((dado)=>{
        return dado.usuario.cpf==cpf
    })

    const emailJaCadastrado=bancoDeDados.contas.find((dado)=>{
        return dado.usuario.email==email
    })

    if (!nome || !cpf || !data_nascimento || !telefone || !email || !senha) {
        res.status(400).json({"mensagem": "Todos os campos são obrigatórios!"})
    }

    if (cpfJaCadastrado && cpfJaCadastrado.usuario.cpf==cpf) {
        return res.status(400).json({"mensagem": "Já existe uma conta com o cpf ou e-mail informado!"})
    }

    if (emailJaCadastrado && emailJaCadastrado.usuario.email==email) {
        return res.status(400).json({"mensagem": "Já existe uma conta com o cpf ou e-mail informado!"})
    }

    next()
}

const validarAtulizacaoConta=(req, res, next)=>{
    const {nome,cpf,data_nascimento,telefone,email,senha}=req.body
    const id=req.params.numeroConta

    if (!nome || !cpf || !data_nascimento || !telefone || !email || !senha) {
        res.status(400).json({"mensagem": "Todos os campos são obrigatórios!"})
    }

    const numeroConta=bancoDeDados.contas.find((dado)=>{
        return dado.numero==id
    })

    if (numeroConta == undefined) {
        return res.status(400).json({"mensagem": "Usuário invalido!"})
    }

    const cpfJaCadastrado=bancoDeDados.contas.find((dado)=>{
        return dado.usuario.cpf==cpf
    })

    const emailJaCadastrado=bancoDeDados.contas.find((dado)=>{
        return dado.usuario.email==email
    })

    if (cpfJaCadastrado && cpfJaCadastrado.usuario.cpf==cpf) {
        return res.status(400).json({"mensagem": "Já existe uma conta com o cpf informado!"})
    }

    if (emailJaCadastrado && emailJaCadastrado.usuario.email==email) {
        return res.status(400).json({"mensagem": "Já existe uma conta com o e-mail informado!"})
    }

    next()
}

const validarDeletar=(req, res, next)=>{
    const id=req.params.numeroConta

    const numeroConta=bancoDeDados.contas.find((dado)=>{
        return dado.numero==id
    })

    if (numeroConta == undefined) {
        return res.status(400).json({"mensagem": "Usuário invalido!"})
    }

    if (numeroConta.saldo!=0) {
        return res.status(400).json({"mensagem": "Verificar o saldo da conta!"})
    }

    next()
}

const validarDeposito=(req, res, next)=>{
    const {numero_conta,valor,senha}=req.body

    if (!numero_conta || !valor || !senha) {
        res.status(400).json({"mensagem": "Todos os campos são obrigatórios!"})
    }

    const numeroConta=bancoDeDados.contas.find((dado)=>{
        return dado.numero==numero_conta
    })

    if (numeroConta == undefined) {
        return res.status(400).json({"mensagem": "Usuário invalido!"})
    }

    if (valor<=0) {
        return res.status(400).json({"mensagem": "Valor de deposito invalido!"})
    }

    if (senha!=numeroConta.usuario.senha) {
        return res.status(400).json({"mensagem": "Senha invalidar!"})
    }
    next()
}

const validarSacar=(req,res,next)=>{
    const {numero_conta,valor,senha}=req.body

    if (!numero_conta || !valor || !senha) {
        res.status(400).json({"mensagem": "Todos os campos são obrigatórios!"})
    }

    const numeroConta=bancoDeDados.contas.find((dado)=>{
        return dado.numero==numero_conta
    })

    if (numeroConta == undefined) {
        return res.status(400).json({"mensagem": "Usuário invalido!"})
    }

    if (senha!=numeroConta.usuario.senha) {
        return res.status(400).json({"mensagem": "Senha invalidar!"})
    }

    if (valor > numeroConta.saldo) {
        return res.status(400).json({"mensagem": "Saldo insuficiente!"})
    }

    if (valor<=0) {
        return res.status(400).json({"mensagem": "O valor não pode ser menor que zero!"})
    }

    next()
}

const validarTransferir=(req, res , next)=>{
    const {numero_conta_origem,numero_conta_destino,valor,senha}=req.body

    if (!numero_conta_origem || !numero_conta_destino || !valor || !senha) {
        res.status(400).json({"mensagem": "Todos os campos são obrigatórios!"})
    }

    const contaOrigem=bancoDeDados.contas.find((dado)=>{
        return dado.numero==numero_conta_origem
    })

    const contaDestino=bancoDeDados.contas.find((dado)=>{
        return dado.numero==numero_conta_destino
    })

    if (contaDestino == undefined || contaOrigem == undefined) {
        return res.status(400).json({"mensagem": "Usuário invalido!"})
    }

    if (senha!=contaOrigem.usuario.senha) {
        return res.status(400).json({"mensagem": "Senha invalidar!"})
    }

    if (valor > contaOrigem.saldo) {
        return res.status(400).json({"mensagem": "Saldo insuficiente!"})
    }

    next()
}

const validarSaldo=(req, res,next)=>{
    const {numero_conta,senha}=req.query

    if (!numero_conta || !senha) {
        res.status(400).json({"mensagem": "Todos os campos são obrigatórios!"})
    }

    const conta=bancoDeDados.contas.find((dado)=>{
        return dado.numero==numero_conta
    })

    if (conta == undefined) {
        return res.status(400).json({"mensagem": "Usuário invalido!"})
    }

    if (senha!=conta.usuario.senha) {
        return res.status(400).json({"mensagem": "Senha invalidar!"})
    }

    next()
}

const validarExtrato=(req,res,next)=>{
    const {numero_conta,senha}=req.query

    if (!numero_conta || !senha) {
        res.status(400).json({"mensagem": "Todos os campos são obrigatórios!"})
    }

    const conta=bancoDeDados.contas.find((dado)=>{
        return dado.numero==numero_conta
    })

    if (conta == undefined) {
        return res.status(400).json({"mensagem": "Usuário invalido!"})
    }

    if (senha!=conta.usuario.senha) {
        return res.status(400).json({"mensagem": "Senha invalidar!"})
    }

    next()
}
module.exports = {
    validarSenha,
    validarNovaConta,
    validarAtulizacaoConta,
    validarDeletar,
    validarDeposito,
    validarSacar,
    validarTransferir,
    validarSaldo,
    validarExtrato
}
