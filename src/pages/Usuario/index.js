import React, { useState } from "react";
import Input from "../../components/Input";
import Button from "../../components/Button";
import * as C from "./styles";
import { useNavigate } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import Sidebar from "../../components/Sidebar";

const Usuario = () => {
  const navigate = useNavigate();
  const [sidebar, setSidebar] = useState(false);

  // Alternar a exibição da Sidebar
  const toggleSidebar = () => setSidebar(!sidebar);

  // Estados para armazenar os dados dos usuários e respostas
  const [email, setEmail] = useState("");
  const [nome, setNome] = useState("");
  const [nivel, setNivel] = useState("");
  const [status, setStatus] = useState("on");
  const [user, setUser] = useState("");
  const [userId, setUserId] = useState("");
  const [userName, setUserName] = useState("");
  const [pwd, setPwd] = useState("");
  const [response, setResponse] = useState(null); // Para armazenar a resposta da API
  const [error, setError] = useState("");

  // Função para buscar todos os usuários
  const fetchUsers = async () => {
    try {
      const response = await fetch("http://localhost:8080/users");
      const data = await response.json();
      setResponse(data); // Exibe resposta na tela
    } catch (error) {
      setError("Erro ao buscar usuários: " + error.message);
    }
  };

  //Função para exibir todos os usuarios
  const fetchAllUsers = async () => {
    try {
      const response = await fetch("http://localhost:8080/users");
      const data = await response.json();
      setResponse(data); // Exibe resposta na tela
    } catch (error) {
      setError("Erro ao buscar usuários: " + error.message);
    }
  };

  // Função para buscar usuário por ID
  const fetchUserById = async () => {
    try {
      const response = await fetch(`http://localhost:8080/users/id/${userId}`, {method: 'GET'});
      const data = await response.json();
      setResponse(data); // Exibe resposta na tela
    } catch (error) {
      setError("Erro ao buscar usuário: " + error.message);
    }
  };

  const fetchUserByName = async () => {
    try {
      const response = await fetch(`http://localhost:8080/users/name/${userName}`);
      const data = await response.json();
      setResponse(data); // Exibe resposta na tela
    } catch (error) {
      setError("Erro ao buscar usuário: " + error.message);
    }
  };

  // Função para criar um novo usuário
  const handleCreateUser = async () => {
    if (!email || !nome || !nivel || !user || !pwd || !status) {
      setError("Preencha todos os campos");
      return;
    }

    const newUser = {
      email,
      name: nome,
      level: nivel,
      status,
      user,
      pwd
    };

    try {
      const response = await fetch("http://localhost:8080/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newUser),
      });

      const data = await response.json();
      setResponse(data); // Exibe resposta na tela
      setError(""); // Limpa o erro
    } catch (error) {
      setError("Erro ao criar usuário: " + error.message);
    }
  };

  // Função para atualizar um usuário
  const handleUpdateUser = async () => {
    if (!email || !nome || !nivel || !user || !pwd || !status) {
      setError("Preencha todos os campos");
      return;
    }

    const updatedUser = {
      email,
      name: nome,
      level: nivel,
      status,
      user,
      pwd
    };

    try {
      const response = await fetch(`http://localhost:8080/users/${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedUser),
      });

      const data = await response.json();
      setResponse(data); // Exibe resposta na tela
    } catch (error) {
      setError("Erro ao atualizar usuário: " + error.message);
    }
  };

  // Função para deletar um usuário
  const handleDeleteUser = async () => {
    if (!userId) {
      setError("Preencha o campo ID do usuário");
      return;
    }

    try {
      const response = await fetch(`http://localhost:8080/users/${userId}`, {
        method: "DELETE",
      });

      const data = await response.json();
      setResponse(data); // Exibe resposta na tela
    } catch (error) {
      setError("Erro ao deletar usuário: " + error.message);
    }
  };

  return (
    <C.Container>
      {/* Botão no canto superior direito */}
      <C.TopLeftButton onClick={toggleSidebar}>
        <FaBars />
      </C.TopLeftButton>

      {/* Sidebar condicional */}
      {sidebar && <Sidebar active={setSidebar} />}
      {/* Formulário para exibir todos os usuários */}
      <C.Content>
        <C.Label>Exibir Todos os Usuários</C.Label>
        <Button Text="Buscar Todos os Usuários" onClick={fetchAllUsers} />
      </C.Content>
      {/* Formulário de GET (Buscar usuário por ID) */}
      <C.Content>
        <C.Label>Buscar Usuário por ID</C.Label>
        <Input
          type="text"
          placeholder="Digite o ID do Usuário"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
        />
        <Button Text="Buscar Usuário" onClick={fetchUserById} />
      </C.Content>
      {/* Formulário de GET (Buscar usuário por nome) */}
      <C.Content>
        <C.Label>Buscar Usuário por Nome</C.Label>
        <Input
          type="text"
          placeholder="Digite o Nome do Usuário"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />
        <Button Text="Buscar Usuário" onClick={fetchUserByName} />
      </C.Content>

      {/* Formulário de POST (Criar usuário) */}
      <C.Content>
        <C.Label>Cadastrar Novo Usuário</C.Label>
        <Input
          type="email"
          placeholder="Digite seu E-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          type="text"
          placeholder="Nome de Usuário"
          value={user}
          onChange={(e) => setUser(e.target.value)}
        />
        <Input
          type="text"
          placeholder="Digite seu Nome"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
        />
        <Input
          type="text"
          placeholder="Digite o Nível"
          value={nivel}
          onChange={(e) => setNivel(e.target.value)}
        />
        <Input
          type="text"
          placeholder="Digite o pwd"
          value={pwd}
          onChange={(e) => setPwd(e.target.value)}
        />
        <Button Text="Cadastrar" onClick={handleCreateUser} />
      </C.Content>

      {/* Formulário de PUT (Atualizar usuário) */}
      <C.Content>
        <C.Label>Atualizar Usuário</C.Label>
        <Input
          type="text"
          placeholder="Digite o ID do Usuário"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
        />
        <Input
          type="email"
          placeholder="Digite seu novo E-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          type="text"
          placeholder="Digite seu novo nome de Usuário"
          value={user}
          onChange={(e) => setUser(e.target.value)}
        />
        <Input
          type="text"
          placeholder="Digite seu novo Nome"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
        />
        <Input
          type="text"
          placeholder="Digite o seu novo Nível"
          value={nivel}
          onChange={(e) => setNivel(e.target.value)}
        />
         <Input
          type="text"
          placeholder="Digite o pwd"
          value={pwd}
          onChange={(e) => setPwd(e.target.value)}
        />
        <Button Text="Atualizar" onClick={handleUpdateUser} />
      </C.Content>

      {/* Formulário de DELETE (Deletar usuário) */}
      <C.Content>
        <C.Label>Deletar Usuário</C.Label>
        <Input
          type="text"
          placeholder="Digite o ID do Usuário"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
        />
        <Button Text="Deletar" onClick={handleDeleteUser} />
      </C.Content>

      {/* Exibição de erros e respostas */}
      <C.labelError>{error}</C.labelError>
      <C.LabelSignup>
        <strong>Resposta da API:</strong>
      </C.LabelSignup>
      <div>{response && <pre>{JSON.stringify(response, null, 2)}</pre>}</div>
    </C.Container>
  );
};

export default Usuario;
