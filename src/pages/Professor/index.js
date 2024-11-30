import React, { useState } from "react";
import Input from "../../components/Input";
import Button from "../../components/Button";
import * as C from "./styles";
import { useNavigate } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import Sidebar from "../../components/Sidebar";
const Professor = () => {
  const navigate = useNavigate();
  const [sidebar, setSidebar] = useState(false);

  // Alternar a exibição da Sidebar
  const toggleSidebar = () => setSidebar(!sidebar);

  // Estados para armazenar os dados dos professor e respostas
  const [nome, setNome] = useState("");
  const [materia, setMateria] = useState("");
  const [gmail, setGmail] = useState("");
  const [numeroDeTelefone, setNumeroDeTelefone] = useState("");
  const [cpf, setCpf] = useState("");
  const [cep, setCep] = useState("");
  const [professorId, setProfessorId] = useState("");
  const [response, setResponse] = useState(null);
  const [error, setError] = useState("");

  const fetchAllProfessors = async () => {
    try {
      const response = await fetch("http://localhost:5000/professors");
      const data = await response.json();
      setResponse(data);
    } catch (error) {
      setError("Erro ao buscar professores: " + error.message);
    }
  };
  
  

  // Função para buscar professor por ID
  const fetchProfessorById = async () => {
    try {
      const response = await fetch(`http://localhost:5000/professors/id/${professorId}`);
      const data = await response.json();
      setResponse(data);
    } catch (error) {
      setError("Erro ao buscar professor: " + error.message);
    }
  };
  

  const fetchProfessorByName = async () => {
    try {
      const response = await fetch(`http://localhost:5000/professors/nome/${nome}`); // Alterar professorName para nome
      const data = await response.json();
      setResponse(data);
    } catch (error) {
      setError("Erro ao buscar professor: " + error.message);
    }
  };
  
  

  // Função para criar um novo professor
  const handleCreateProfessor = async () => {
    if (!nome || !materia || !gmail || !numeroDeTelefone || !cpf || !cep) {
      setError("Preencha todos os campos");
      return;
    }
  
    const newProfessor = {
      nome,
      materia,
      gmail,
      numero_de_telefone: numeroDeTelefone,
      cpf,
      cep,
    };
  
    try {
      const response = await fetch("http://localhost:5000/professors", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newProfessor),
      });
  
      const data = await response.json();
      setResponse(data);
      setError(""); 
    } catch (error) {
      setError("Erro ao criar professor: " + error.message);
    }
  };
  

  // Função para atualizar um professor
  const handleUpdateProfessor = async () => {
    if (!professorId || !nome || !materia || !gmail || !numeroDeTelefone || !cpf || !cep) {
      setError("Preencha todos os campos");
      return;
    }
  
    const updatedProfessor = {
      nome,
      materia,
      gmail,
      numero_de_telefone: numeroDeTelefone,
      cpf,
      cep,
    };
  
    try {
      const response = await fetch(`http://localhost:5000/professors/${professorId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedProfessor),
      });
  
      const data = await response.json();
      setResponse(data);
    } catch (error) {
      setError("Erro ao atualizar professor: " + error.message);
    }
  };
  

  // Função para deletar um professor
  const handleDeleteProfessor = async () => {
    if (!professorId) {
      setError("Preencha o campo ID do professor");
      return;
    }
  
    try {
      const response = await fetch(`http://localhost:5000/professors/${professorId}`, {
        method: "DELETE",
      });
  
      const data = await response.json();
      setResponse(data);
    } catch (error) {
      setError("Erro ao deletar professor: " + error.message);
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
      {/* Formulário para exibir todos os professores */}
      <C.Content>
        <C.Label>Exibir Todos os Professores</C.Label>
        <Button Text="Buscar Todos os Professores" onClick={fetchAllProfessors} />
      </C.Content>
  
      {/* Formulário de GET (Buscar professor por ID) */}
      <C.Content>
        <C.Label>Buscar Professor por ID</C.Label>
        <Input
          type="text"
          placeholder="Digite o ID do Professor"
          value={professorId}
          onChange={(e) => setProfessorId(e.target.value)}
        />
        <Button Text="Buscar Professor" onClick={fetchProfessorById} />
      </C.Content>
  
      {/* Formulário de GET (Buscar professor por nome) */}
      <C.Content>
        <C.Label>Buscar Professor por Nome</C.Label>
        <Input
          type="text"
          placeholder="Digite o Nome do Professor"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
        />
        <Button Text="Buscar Professor" onClick={fetchProfessorByName} />
      </C.Content>
  
      {/* Formulário de POST (Criar professor) */}
      <C.Content>
        <C.Label>Cadastrar Novo Professor</C.Label>
        <Input
          type="text"
          placeholder="Digite o Nome"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
        />
        <Input
          type="text"
          placeholder="Digite a Matéria"
          value={materia}
          onChange={(e) => setMateria(e.target.value)}
        />
        <Input
          type="email"
          placeholder="Digite o E-mail"
          value={gmail}
          onChange={(e) => setGmail(e.target.value)}
        />
        <Input
          type="text"
          placeholder="Digite o Número de Telefone"
          value={numeroDeTelefone}
          onChange={(e) => setNumeroDeTelefone(e.target.value)}
        />
        <Input
          type="text"
          placeholder="Digite o CPF"
          value={cpf}
          onChange={(e) => setCpf(e.target.value)}
        />
        <Input
          type="text"
          placeholder="Digite o CEP"
          value={cep}
          onChange={(e) => setCep(e.target.value)}
        />
        <Button Text="Cadastrar Professor" onClick={handleCreateProfessor} />
      </C.Content>
  
      {/* Formulário de PUT (Atualizar professor) */}
      <C.Content>
        <C.Label>Atualizar Professor</C.Label>
        <Input
          type="text"
          placeholder="Digite o ID do Professor"
          value={professorId}
          onChange={(e) => setProfessorId(e.target.value)}
        />
        <Input
          type="text"
          placeholder="Digite o Nome"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
        />
        <Input
          type="text"
          placeholder="Digite a Matéria"
          value={materia}
          onChange={(e) => setMateria(e.target.value)}
        />
        <Input
          type="email"
          placeholder="Digite o E-mail"
          value={gmail}
          onChange={(e) => setGmail(e.target.value)}
        />
        <Input
          type="text"
          placeholder="Digite o Número de Telefone"
          value={numeroDeTelefone}
          onChange={(e) => setNumeroDeTelefone(e.target.value)}
        />
        <Input
          type="text"
          placeholder="Digite o CPF"
          value={cpf}
          onChange={(e) => setCpf(e.target.value)}
        />
        <Input
          type="text"
          placeholder="Digite o CEP"
          value={cep}
          onChange={(e) => setCep(e.target.value)}
        />
        <Button Text="Atualizar Professor" onClick={handleUpdateProfessor} />
      </C.Content>
  
      {/* Formulário de DELETE (Deletar professor) */}
      <C.Content>
        <C.Label>Deletar Professor</C.Label>
        <Input
          type="text"
          placeholder="Digite o ID do Professor"
          value={professorId}
          onChange={(e) => setProfessorId(e.target.value)}
        />
        <Button Text="Deletar Professor" onClick={handleDeleteProfessor} />
      </C.Content>
  
      {/* Exibição de erros e respostas */}
      <C.labelError>{error}</C.labelError>
      <C.LabelSignup>
        <strong>Resposta da API:</strong>
      </C.LabelSignup>
      <div>
        {response && (
          <pre>{JSON.stringify(response, null, 2)}</pre>
        )}
      </div>
    </C.Container>
  );
  
};

export default Professor;
