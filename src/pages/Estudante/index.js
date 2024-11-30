import React, { useState } from "react";
import Input from "../../components/Input";
import Button from "../../components/Button";
import * as C from "./styles";
import { useNavigate } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import Sidebar from "../../components/Sidebar";

const Estudante = () => {
  const navigate = useNavigate();
  const [sidebar, setSidebar] = useState(false);

  // Alternar a exibição da Sidebar
  const toggleSidebar = () => setSidebar(!sidebar);

  // Estados para armazenar os dados do estudante e respostas
  const [nome, setNome] = useState("");
  const [idade, setIdade] = useState("");
  const [responsaveis, setResponsaveis] = useState("");
  const [telefone, setTelefone] = useState("");
  const [necessidadesEspeciais, setNecessidadesEspeciais] = useState("");
  const [status, setStatus] = useState("");
  const [estudanteId, setEstudanteId] = useState("");
  const [response, setResponse] = useState(null);
  const [error, setError] = useState("");

  const fetchAllEstudantes = async () => {
    try {
      const response = await fetch("http://localhost:5000/students");
      const data = await response.json();
      setResponse(data);
    } catch (error) {
      setError("Erro ao buscar estudantes: " + error.message);
    }
  };

  // Função para buscar estudante por ID
  const fetchEstudanteById = async () => {
    try {
      const response = await fetch(`http://localhost:5000/students/id/${estudanteId}`);
      const data = await response.json();
      setResponse(data);
    } catch (error) {
      setError("Erro ao buscar estudante: " + error.message);
    }
  };

  const fetchEstudanteByName = async () => {
    try {
      const response = await fetch(`http://localhost:5000/students/name/${nome}`);
      const data = await response.json();
      setResponse(data);
    } catch (error) {
      setError("Erro ao buscar estudante: " + error.message);
    }
  };

  // Função para criar um novo estudante
  const handleCreateEstudante = async () => {
    if (!nome || !idade || !responsaveis || !telefone || !necessidadesEspeciais || !status) {
      setError("Preencha todos os campos");
      return;
    }

    const newEstudante = {
      nome,
      idade,
      parents: responsaveis,
      phone_number: telefone,
      special_needs: necessidadesEspeciais,
      status,
    };

    try {
      const response = await fetch("http://localhost:5000/students", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newEstudante),
      });

      const data = await response.json();
      setResponse(data);
      setError(""); 
    } catch (error) {
      setError("Erro ao criar estudante: " + error.message);
    }
  };

  // Função para atualizar um estudante
  const handleUpdateEstudante = async () => {
    if (!estudanteId || !nome || !idade || !responsaveis || !telefone || !necessidadesEspeciais || !status) {
      setError("Preencha todos os campos");
      return;
    }

    const updatedEstudante = {
      nome,
      idade,
      parents: responsaveis,
      phone_number: telefone,
      special_needs: necessidadesEspeciais,
      status,
    };

    try {
      const response = await fetch(`http://localhost:5000/students/${estudanteId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedEstudante),
      });

      const data = await response.json();
      setResponse(data);
    } catch (error) {
      setError("Erro ao atualizar estudante: " + error.message);
    }
  };

  // Função para deletar um estudante
  const handleDeleteEstudante = async () => {
    if (!estudanteId) {
      setError("Preencha o campo ID do estudante");
      return;
    }

    try {
      const response = await fetch(`http://localhost:5000/students/${estudanteId}`, {
        method: "DELETE",
      });

      const data = await response.json();
      setResponse(data);
    } catch (error) {
      setError("Erro ao deletar estudante: " + error.message);
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
      {/* Formulário para exibir todos os estudantes */}
      <C.Content>
        <C.Label>Exibir Todos os Estudantes</C.Label>
        <Button Text="Buscar Todos os Estudantes" onClick={fetchAllEstudantes} />
      </C.Content>

      {/* Formulário de GET (Buscar estudante por ID) */}
      <C.Content>
        <C.Label>Buscar Estudante por ID</C.Label>
        <Input
          type="text"
          placeholder="Digite o ID do Estudante"
          value={estudanteId}
          onChange={(e) => setEstudanteId(e.target.value)}
        />
        <Button Text="Buscar Estudante" onClick={fetchEstudanteById} />
      </C.Content>

      {/* Formulário de GET (Buscar estudante por nome) */}
      <C.Content>
        <C.Label>Buscar Estudante por Nome</C.Label>
        <Input
          type="text"
          placeholder="Digite o Nome do Estudante"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
        />
        <Button Text="Buscar Estudante" onClick={fetchEstudanteByName} />
      </C.Content>

      {/* Formulário de POST (Criar estudante) */}
      <C.Content>
        <C.Label>Cadastrar Novo Estudante</C.Label>
        <Input
          type="text"
          placeholder="Digite o Nome"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
        />
        <Input
          type="text"
          placeholder="Digite a Idade"
          value={idade}
          onChange={(e) => setIdade(e.target.value)}
        />
        <Input
          type="text"
          placeholder="Digite os Responsáveis"
          value={responsaveis}
          onChange={(e) => setResponsaveis(e.target.value)}
        />
        <Input
          type="text"
          placeholder="Digite o Número de Telefone"
          value={telefone}
          onChange={(e) => setTelefone(e.target.value)}
        />
        <Input
          type="text"
          placeholder="Digite as Necessidades Especiais"
          value={necessidadesEspeciais}
          onChange={(e) => setNecessidadesEspeciais(e.target.value)}
        />
        <Input
          type="text"
          placeholder="Digite o Status"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        />
        <Button Text="Cadastrar Estudante" onClick={handleCreateEstudante} />
      </C.Content>

      {/* Formulário de PUT (Atualizar estudante) */}
      <C.Content>
        <C.Label>Atualizar Estudante</C.Label>
        <Input
          type="text"
          placeholder="Digite o ID do Estudante"
          value={estudanteId}
          onChange={(e) => setEstudanteId(e.target.value)}
        />
        <Input
          type="text"
          placeholder="Digite o Nome"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
        />
        <Input
          type="text"
          placeholder="Digite a Idade"
          value={idade}
          onChange={(e) => setIdade(e.target.value)}
        />
        <Input
          type="text"
          placeholder="Digite os Responsáveis"
          value={responsaveis}
          onChange={(e) => setResponsaveis(e.target.value)}
        />
        <Input
          type="text"
          placeholder="Digite o Número de Telefone"
          value={telefone}
          onChange={(e) => setTelefone(e.target.value)}
        />
        <Input
          type="text"
          placeholder="Digite as Necessidades Especiais"
          value={necessidadesEspeciais}
          onChange={(e) => setNecessidadesEspeciais(e.target.value)}
        />
        <Input
          type="text"
          placeholder="Digite o Status"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        />
        <Button Text="Atualizar Estudante" onClick={handleUpdateEstudante} />
      </C.Content>

      {/* Formulário de DELETE (Deletar estudante) */}
      <C.Content>
        <C.Label>Deletar Estudante</C.Label>
        <Input
          type="text"
          placeholder="Digite o ID do Estudante"
          value={estudanteId}
          onChange={(e) => setEstudanteId(e.target.value)}
        />
        <Button Text="Deletar Estudante" onClick={handleDeleteEstudante} />
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

export default Estudante;
