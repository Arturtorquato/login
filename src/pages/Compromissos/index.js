import React, { useState } from "react";
import Input from "../../components/Input";
import Button from "../../components/Button";
import * as C from "./styles";
import { useNavigate } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import Sidebar from "../../components/Sidebar";

const Compromisso = () => {
  const navigate = useNavigate();
  const [sidebar, setSidebar] = useState(false);

  const toggleSidebar = () => setSidebar(!sidebar);

  // Estados para armazenar os dados do compromisso e respostas
  const [specialty, setSpecialty] = useState("");  // Especialidade
  const [comments, setComments] = useState("");    // Comentários
  const [date, setDate] = useState("");            // Data
  const [student, setStudent] = useState("");      // Estudante
  const [professional, setProfessional] = useState("");  // Profissional
  const [compromissoId, setCompromissoId] = useState("");  // ID do compromisso
  const [response, setResponse] = useState(null);  // Resposta da API
  const [error, setError] = useState("");         // Erro

  // Função para buscar todos os compromissos
  const fetchAllCompromissos = async () => {
    try {
      const response = await fetch("http://localhost:8080/appointments");
      const data = await response.json();
      setResponse(data);
    } catch (error) {
      setError("Erro ao buscar compromissos: " + error.message);
    }
  };

  // Função para buscar compromisso por ID
  const fetchCompromissoById = async () => {
    try {
      const response = await fetch(`http://localhost:8080/appointments/id/${compromissoId}`);
      const data = await response.json();
      setResponse(data);
    } catch (error) {
      setError("Erro ao buscar compromisso: " + error.message);
    }
  };

  // Função para buscar compromisso por data
  const fetchCompromissoByDate = async () => {
    try {
      const response = await fetch(`http://localhost:8080/appointments/date/${date}`);
      const data = await response.json();
      setResponse(data);
    } catch (error) {
      setError("Erro ao buscar compromisso: " + error.message);
    }
  };

  // Função para buscar compromisso pelo nome do aluno
  const fetchCompromissoByStudent = async () => {
    if (!student) {
      setError("Preencha o nome do aluno");
      return;
    }

    try {
      const response = await fetch(`http://localhost:8080/appointments/student/${student}`);
      const data = await response.json();
      setResponse(data);
    } catch (error) {
      setError("Erro ao buscar compromisso pelo nome do aluno: " + error.message);
    }
  };

  // Função para criar um novo compromisso
  const handleCreateCompromisso = async () => {
    if (!specialty || !comments || !date || !student || !professional) {
      setError("Preencha todos os campos");
      return;
    }

    const newCompromisso = {
      specialty,
      comments,
      date,
      student,
      professional,
    };

    try {
      const response = await fetch("http://localhost:8080/appointments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newCompromisso),
      });

      const data = await response.json();
      setResponse(data);
      setError("");
    } catch (error) {
      setError("Erro ao criar compromisso: " + error.message);
    }
  };

  // Função para atualizar um compromisso
  const handleUpdateCompromisso = async () => {
    if (!compromissoId || !specialty || !comments || !date || !student || !professional) {
      setError("Preencha todos os campos");
      return;
    }

    const updatedCompromisso = {
      specialty,
      comments,
      date,
      student,
      professional,
    };

    try {
      const response = await fetch(`http://localhost:8080/appointments/${compromissoId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedCompromisso),
      });

      const data = await response.json();
      setResponse(data);
    } catch (error) {
      setError("Erro ao atualizar compromisso: " + error.message);
    }
  };

  // Função para deletar um compromisso
  const handleDeleteCompromisso = async () => {
    if (!compromissoId) {
      setError("Preencha o campo ID do compromisso");
      return;
    }

    try {
      const response = await fetch(`http://localhost:8080/appointments/${compromissoId}`, {
        method: "DELETE",
      });

      const data = await response.json();
      setResponse(data);
    } catch (error) {
      setError("Erro ao deletar compromisso: " + error.message);
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
      {/* Formulário para exibir todos os compromissos */}
      <C.Content>
        <C.Label>Exibir Todos os Compromissos</C.Label>
        <Button Text="Buscar Todos os Compromissos" onClick={fetchAllCompromissos} />
      </C.Content>

      {/* Formulário de GET (Buscar compromisso por ID) */}
      <C.Content>
        <C.Label>Buscar Compromisso por ID</C.Label>
        <Input
          type="text"
          placeholder="Digite o ID do Compromisso"
          value={compromissoId}
          onChange={(e) => setCompromissoId(e.target.value)}
        />
        <Button Text="Buscar Compromisso" onClick={fetchCompromissoById} />
      </C.Content>

      {/* Formulário de GET (Buscar compromisso por data) */}
      <C.Content>
        <C.Label>Buscar Compromisso por Data</C.Label>
        <Input
          type="date"
          placeholder="Digite a Data do Compromisso"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <Button Text="Buscar Compromisso" onClick={fetchCompromissoByDate} />
      </C.Content>

      {/* Formulário de GET (Buscar compromisso por nome do aluno) */}
      <C.Content>
        <C.Label>Buscar Compromisso por Nome do Aluno</C.Label>
        <Input
          type="text"
          placeholder="Digite o Nome do Aluno"
          value={student}
          onChange={(e) => setStudent(e.target.value)}
        />
        <Button Text="Buscar Compromisso" onClick={fetchCompromissoByStudent} />
      </C.Content>

      {/* Formulário de POST (Criar compromisso) */}
      <C.Content>
        <C.Label>Cadastrar Novo Compromisso</C.Label>
        <Input
          type="text"
          placeholder="Digite a Especialidade"
          value={specialty}
          onChange={(e) => setSpecialty(e.target.value)}
        />
        <Input
          type="text"
          placeholder="Digite os Comentários"
          value={comments}
          onChange={(e) => setComments(e.target.value)}
        />
        <Input
          type="date"
          placeholder="Digite a Data do Compromisso"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <Input
          type="text"
          placeholder="Digite o Nome do Estudante"
          value={student}
          onChange={(e) => setStudent(e.target.value)}
        />
        <Input
          type="text"
          placeholder="Digite o Nome do Profissional"
          value={professional}
          onChange={(e) => setProfessional(e.target.value)}
        />
        <Button Text="Cadastrar Compromisso" onClick={handleCreateCompromisso} />
      </C.Content>

      {/* Formulário de PUT (Atualizar compromisso) */}
      <C.Content>
        <C.Label>Atualizar Compromisso</C.Label>
        <Input
          type="text"
          placeholder="Digite o ID do Compromisso"
          value={compromissoId}
          onChange={(e) => setCompromissoId(e.target.value)}
        />
        <Input
          type="text"
          placeholder="Digite a Especialidade"
          value={specialty}
          onChange={(e) => setSpecialty(e.target.value)}
        />
        <Input
          type="text"
          placeholder="Digite os Comentários"
          value={comments}
          onChange={(e) => setComments(e.target.value)}
        />
        <Input
          type="date"
          placeholder="Digite a Data do Compromisso"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <Input
          type="text"
          placeholder="Digite o Nome do Estudante"
          value={student}
          onChange={(e) => setStudent(e.target.value)}
        />
        <Input
          type="text"
          placeholder="Digite o Nome do Profissional"
          value={professional}
          onChange={(e) => setProfessional(e.target.value)}
        />
        <Button Text="Atualizar Compromisso" onClick={handleUpdateCompromisso} />
      </C.Content>
      <C.Content>
        <C.Label>Deletar Compromisso</C.Label>
        <Input
          type="text"
          placeholder="Digite o ID do Compromisso"
          value={compromissoId}
          onChange={(e) => setCompromissoId(e.target.value)}
        />
        <Button Text="Deletar Compromisso" onClick={handleDeleteCompromisso} />
      </C.Content>
      <C.LabelSignup>
        <strong>Resposta da API:</strong>
      </C.LabelSignup>
      {/* Exibir respostas ou erros */}
      <div>{response && <pre>{JSON.stringify(response, null, 2)}</pre>}</div>
    </C.Container>
  );
};

export default Compromisso;
