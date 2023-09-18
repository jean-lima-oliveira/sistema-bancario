# Instruções para Testar a API do sistema-bancario

Este documento fornece instruções sobre como testar a API do sistema-bancario usando o Insomnia. Certifique-se de que o servidor esteja em execução usando `npm run dev` antes de iniciar os testes.

## Pontos da API

### 1. Obter Extrato da Conta

Recupere o extrato da conta.

- **URL:** `http://localhost:3000/contas/extrato?numero_conta=1&senha=123`
- **Método:** GET

### 2. Obter Saldo da Conta

Recupere o saldo da conta.

- **URL:** `http://localhost:3000/contas/saldo?numero_conta=1&senha=123`
- **Método:** GET

### 3. Criar uma Conta

Crie uma nova conta.

- **URL:** `http://localhost:3000/contas?senha_banco=Cubos123Bank`
- **Método:** POST

   Corpo em JSON:
   ```json
   {
     "nome": "nome",
     "cpf": "cpf",
     "data_nascimento": "data",
     "telefone": "telefone",
     "email": "email",
     "senha": "senha"
   }

### 4. Obter informações de conta

- **URL:** `http://http://localhost:3000/contas

### 5. Atualizar informações da conta.

- **URL:** http://localhost:3000/contas/1/usuario

- **Método:** PUT

    Corpo em JSON:
    ```json
    {
        "nome": "novo_nome",
        "cpf": "novo_cpf",
        "data_nascimento": "nova_data",
        "telefone": "novo_telefone",
        "email": "novo_email",
        "senha": "nova_senha"
    }   

### 6. DELETE

- **URL:** http://localhost:3000/contas/0
- **Método:** DELETE

### 7. Transferir

- **URL:** http://localhost:3000/transacoes/transferir

- **Método:** POST

    Corpo em JSON:
    ```json
    {
    "numero_conta_origem": "1",
    "numero_conta_destino": "0",
    "valor": 100,
    "senha": "123"
    }

### 8. Sacar

- **URL:** http://localhost:3000/transacoes/sacar

- **Método:** POST

    Corpo em JSON:
    ```json
    {
    "numero_conta": "0",
    "valor": 100,
    "senha": "123"
    }

### 9. Depositar

- **URL:** http://localhost:3000/transacoes/depositar

- **Método:** POST

    Corpo em JSON:
    ```json
    {
    "numero_conta": "0",
    "valor": 100,
    "senha": "123"
    }


Abra o Insônia.

Importe as rotas


Observações
Substitua os espaços reservados (por exemplo, "nome", "cpf", "data") por dados reais.


