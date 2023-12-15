# 20232BSET03P2
Inteli - Engenharia de Software | Avaliação 2023-2B P2


# Prova Prática

Lívia Mattoso Bonotto Cabral

### ENDPOINTS CATS

Registrando Gato:

![Untitled](./assets/registrando_gatos.png)

Inserindo um nome de gato inválido:

![Untitled](./assets/gato_invalido_1.png)

![Untitled](./assets/gato_invalido_2.png)

Gatos registrados:

![Untitled](./assets/gatos_registrados.png)

Votando em um gato:

![Untitled](./assets/votando_gato.png)

Votando em um gato não registrado: 

![Untitled](./assets/votando_gato_nao_registrado.png)

Pegando registro de cats e votos:

![Untitled](./assets/registro_cats_votos.png)

### ENDPOINTS DOGS

Registrando Cachorro:

![Untitled](./assets/registro_dogs_voto.png)

Inserindo um nome de cachorro inválido:

![Untitled](./assets/dog_invalido_1.png)

![Untitled](./assets/dog_invalido_2.png)

Cachorros registrados: 

![Untitled](./assets/dogs_registrados.png)

Votando em um cachorro:

![Untitled](./assets/votando_dog.png)

Votando em um cachorro não registrado: 

![Untitled](/assets/votando_dog_nao_registrado.png)

Pegando registro de dogs e votos:

![Untitled](./assets/registro_dogs_voto.png)

### Votando em outro animal (inválido):

![Untitled](./assets/animal_invalido.png)

### Vulnerabilidades e medidas adotadas

- **SQL Injection**: resolvido usando prepared statements;
- **Validação de entrada**: adicionada validação para tipos de dados e verificação de campos obrigatórios;
- **Verificação de existência de registro**: implementada a verificação antes de adicionar votos;
- **Tratamento de erros**: verificado para evitar vazamento de informações.
