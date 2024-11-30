import React, { useState } from "react";
import Input from "../../components/Input";
import Button from "../../components/Button";
import * as C from "./styles";
import { useNavigate } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import Sidebar from "../../components/Sidebar";
const Profissional = () => {
  const navigate = useNavigate();
  const [sidebar, setSidebar] = useState(false);

  // Alternar a exibição da Sidebar
  const toggleSidebar = () => setSidebar(!sidebar);

  // Estados para armazenar os dados do profissional e respostas
  const [nome, setNome] = useState("");
  const [especialidade, setEspecialidade] = useState("");
  const [contato, setContato] = useState("");
  const [telefone, setTelefone] = useState("");
  const [status, setStatus] = useState("");
  const [profissionalId, setProfissionalId] = useState("");
  const [response, setResponse] = useState(null);
  const [error, setError] = useState("");

  // Função para buscar todos os profissionais
  const fetchAllProfissionais = async () => {
    try {
      const response = await fetch("http://localhost:5000/professionals");
      const data = await response.json();
      setResponse(data);
    } catch (error) {
      setError("Erro ao buscar profissionais: " + error.message);
    }
  };

  // Função para buscar profissional por ID
  const fetchProfissionalById = async () => {
    try {
      const response = await fetch(`http://localhost:5000/professionals/id/${profissionalId}`);
      const data = await response.json();
      setResponse(data);
    } catch (error) {
      setError("Erro ao buscar profissional: " + error.message);
    }
  };

  // Função para buscar profissional por nome
  const fetchProfissionalByName = async () => {
    try {
      const response = await fetch(`http://localhost:5000/professionals/name/${nome}`);
      const data = await response.json();
      setResponse(data);
    } catch (error) {
      setError("Erro ao buscar profissional: " + error.message);
    }
  };

  // Função para criar um novo profissional
  const handleCreateProfissional = async () => {
    if (!nome || !especialidade || !contato || !telefone || !status) {
      setError("Preencha todos os campos");
      return;
    }

    const newProfissional = {
      name: nome,
      specialty: especialidade,
      contact: contato,
      phone_number: telefone,
      status: status,
    };

    try {
      const response = await fetch("http://localhost:5000/professionals", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newProfissional),
      });

      const data = await response.json();
      setResponse(data);
      setError("");
    } catch (error) {
      setError("Erro ao criar profissional: " + error.message);
    }
  };

  // Função para atualizar um profissional
  const handleUpdateProfissional = async () => {
    if (!profissionalId || !nome || !especialidade || !contato || !telefone || !status) {
      setError("Preencha todos os campos");
      return;
    }

    const updatedProfissional = {
      name: nome,
      specialty: especialidade,
      contact: contato,
      phone_number: telefone,
      status: status,
    };

    try {
      const response = await fetch(`http://localhost:5000/professionals/${profissionalId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedProfissional),
      });

      const data = await response.json();
      setResponse(data);
    } catch (error) {
      setError("Erro ao atualizar profissional: " + error.message);
    }
  };

  // Função para deletar um profissional
  const handleDeleteProfissional = async () => {
    if (!profissionalId) {
      setError("Preencha o campo ID do profissional");
      return;
    }

    try {
      const response = await fetch(`http://localhost:5000/professionals/${profissionalId}`, {
        method: "DELETE",
      });

      const data = await response.json();
      setResponse(data);
    } catch (error) {
      setError("Erro ao deletar profissional: " + error.message);
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
      {/* Formulário para exibir todos os profissionais */}
      <C.Content>
        <C.Label>Exibir Todos os Profissionais</C.Label>
        <Button Text="Buscar Todos os Profissionais" onClick={fetchAllProfissionais} />
      </C.Content>

      {/* Formulário de GET (Buscar profissional por ID) */}
      <C.Content>
        <C.Label>Buscar Profissional por ID</C.Label>
        <Input
          type="text"
          placeholder="Digite o ID do Profissional"
          value={profissionalId}
          onChange={(e) => setProfissionalId(e.target.value)}
        />
        <Button Text="Buscar Profissional" onClick={fetchProfissionalById} />
      </C.Content>

      {/* Formulário de GET (Buscar profissional por nome) */}
      <C.Content>
        <C.Label>Buscar Profissional por Nome</C.Label>
        <Input
          type="text"
          placeholder="Digite o Nome do Profissional"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
        />
        <Button Text="Buscar Profissional" onClick={fetchProfissionalByName} />
      </C.Content>

      {/* Formulário de POST (Criar profissional) */}
      <C.Content>
        <C.Label>Cadastrar Novo Profissional</C.Label>
        <Input
          type="text"
          placeholder="Digite o Nome"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
        />
        <Input
          type="text"
          placeholder="Digite a Especialidade"
          value={especialidade}
          onChange={(e) => setEspecialidade(e.target.value)}
        />
        <Input
          type="text"
          placeholder="Digite o Contato"
          value={contato}
          onChange={(e) => setContato(e.target.value)}
        />
        <Input
          type="text"
          placeholder="Digite o Número de Telefone"
          value={telefone}
          onChange={(e) => setTelefone(e.target.value)}
        />
        <Input
          type="text"
          placeholder="Digite o Status"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        />
        <Button Text="Cadastrar Profissional" onClick={handleCreateProfissional} />
      </C.Content>

      {/* Formulário de PUT (Atualizar profissional) */}
      <C.Content>
        <C.Label>Atualizar Profissional</C.Label>
        <Input
          type="text"
          placeholder="Digite o ID do Profissional"
          value={profissionalId}
          onChange={(e) => setProfissionalId(e.target.value)}
        />
        <Input
          type="text"
          placeholder="Digite o Nome"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
        />
        <Input
          type="text"
          placeholder="Digite a Especialidade"
          value={especialidade}
          onChange={(e) => setEspecialidade(e.target.value)}
        />
        <Input
          type="text"
          placeholder="Digite o Contato"
          value={contato}
          onChange={(e) => setContato(e.target.value)}
        />
        <Input
          type="text"
          placeholder="Digite o Número de Telefone"
          value={telefone}
          onChange={(e) => setTelefone(e.target.value)}
        />
        <Input
          type="text"
          placeholder="Digite o Status"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        />
        <Button Text="Atualizar Profissional" onClick={handleUpdateProfissional} />
      </C.Content>

      {/* Formulário de DELETE (Deletar profissional) */}
      <C.Content>
        <C.Label>Deletar Profissional</C.Label>
        <Input
          type="text"
          placeholder="Digite o ID do Profissional"
          value={profissionalId}
          onChange={(e) => setProfissionalId(e.target.value)}
        />
        <Button Text="Deletar Profissional" onClick={handleDeleteProfissional} />
      </C.Content>
      <C.LabelSignup>
        <strong>Resposta da API:</strong>
      </C.LabelSignup>
      {/* Exibir respostas ou erros */}
      <div>
        {response && <div>{JSON.stringify(response, null, 2)}</div>}
        {error && <div>{error}</div>}
      </div>
    </C.Container>
  );
};

export default Profissional;
