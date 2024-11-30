import React, { useState } from "react";
import Input from "../../components/Input";
import Button from "../../components/Button";
import * as C from "./styles";
import { useNavigate } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import Sidebar from "../../components/Sidebar";
const Evento = () => {
  const navigate = useNavigate();
  const [sidebar, setSidebar] = useState(false);

  // Alternar a exibição da Sidebar
  const toggleSidebar = () => setSidebar(!sidebar);

  // Estados para armazenar os dados do evento e respostas
  const [descricao, setDescricao] = useState("");
  const [comentarios, setComentarios] = useState("");
  const [data, setData] = useState("");
  const [eventoId, setEventoId] = useState("");
  const [response, setResponse] = useState(null);
  const [error, setError] = useState("");

  // Função para buscar todos os eventos
  const fetchAllEventos = async () => {
    try {
      const response = await fetch("http://localhost:5000/events");
      const data = await response.json();
      setResponse(data);
    } catch (error) {
      setError("Erro ao buscar eventos: " + error.message);
    }
  };

  // Função para buscar evento por ID
  const fetchEventoById = async () => {
    try {
      const response = await fetch(`http://localhost:5000/events/${eventoId}`);
      const data = await response.json();
      setResponse(data);
    } catch (error) {
      setError("Erro ao buscar evento: " + error.message);
    }
  };

  // Função para buscar evento por data
  const fetchEventoByDate = async () => {
    try {
      const response = await fetch(`http://localhost:5000/events/date/${data}`);
      const data = await response.json();
      setResponse(data);
    } catch (error) {
      setError("Erro ao buscar evento: " + error.message);
    }
  };

  // Função para criar um novo evento
  const handleCreateEvento = async () => {
    if (!descricao || !comentarios || !data) {
      setError("Preencha todos os campos");
      return;
    }

    const newEvento = {
      description: descricao,
      comments: comentarios,
      date: data,
    };

    try {
      const response = await fetch("http://localhost:5000/events", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newEvento),
      });

      const data = await response.json();
      setResponse(data);
      setError("");
    } catch (error) {
      setError("Erro ao criar evento: " + error.message);
    }
  };

  // Função para atualizar um evento
  const handleUpdateEvento = async () => {
    if (!eventoId || !descricao || !comentarios || !data) {
      setError("Preencha todos os campos");
      return;
    }

    const updatedEvento = {
      description: descricao,
      comments: comentarios,
      date: data,
    };

    try {
      const response = await fetch(`http://localhost:5000/events/${eventoId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedEvento),
      });

      const data = await response.json();
      setResponse(data);
    } catch (error) {
      setError("Erro ao atualizar evento: " + error.message);
    }
  };

  // Função para deletar um evento
  const handleDeleteEvento = async () => {
    if (!eventoId) {
      setError("Preencha o campo ID do evento");
      return;
    }

    try {
      const response = await fetch(`http://localhost:5000/events/${eventoId}`, {
        method: "DELETE",
      });

      const data = await response.json();
      setResponse(data);
    } catch (error) {
      setError("Erro ao deletar evento: " + error.message);
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
      {/* Formulário para exibir todos os eventos */}
      <C.Content>
        <C.Label>Exibir Todos os Eventos</C.Label>
        <Button Text="Buscar Todos os Eventos" onClick={fetchAllEventos} />
      </C.Content>

      {/* Formulário de GET (Buscar evento por ID) */}
      <C.Content>
        <C.Label>Buscar Evento por ID</C.Label>
        <Input
          type="text"
          placeholder="Digite o ID do Evento"
          value={eventoId}
          onChange={(e) => setEventoId(e.target.value)}
        />
        <Button Text="Buscar Evento" onClick={fetchEventoById} />
      </C.Content>

      {/* Formulário de GET (Buscar evento por data) */}
      <C.Content>
        <C.Label>Buscar Evento por Data</C.Label>
        <Input
          type="text"
          placeholder="Digite a Data do Evento"
          value={data}
          onChange={(e) => setData(e.target.value)}
        />
        <Button Text="Buscar Evento" onClick={fetchEventoByDate} />
      </C.Content>

      {/* Formulário de POST (Criar evento) */}
      <C.Content>
        <C.Label>Cadastrar Novo Evento</C.Label>
        <Input
          type="text"
          placeholder="Digite a Descrição"
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
        />
        <Input
          type="text"
          placeholder="Digite os Comentários"
          value={comentarios}
          onChange={(e) => setComentarios(e.target.value)}
        />
        <Input
          type="text"
          placeholder="Digite a Data do Evento"
          value={data}
          onChange={(e) => setData(e.target.value)}
        />
        <Button Text="Cadastrar Evento" onClick={handleCreateEvento} />
      </C.Content>

      {/* Formulário de PUT (Atualizar evento) */}
      <C.Content>
        <C.Label>Atualizar Evento</C.Label>
        <Input
          type="text"
          placeholder="Digite o ID do Evento"
          value={eventoId}
          onChange={(e) => setEventoId(e.target.value)}
        />
        <Input
          type="text"
          placeholder="Digite a Descrição"
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
        />
        <Input
          type="text"
          placeholder="Digite os Comentários"
          value={comentarios}
          onChange={(e) => setComentarios(e.target.value)}
        />
        <Input
          type="text"
          placeholder="Digite a Data do Evento"
          value={data}
          onChange={(e) => setData(e.target.value)}
        />
        <Button Text="Atualizar Evento" onClick={handleUpdateEvento} />
      </C.Content>

      {/* Formulário de DELETE (Deletar evento) */}
      <C.Content>
        <C.Label>Deletar Evento</C.Label>
        <Input
          type="text"
          placeholder="Digite o ID do Evento"
          value={eventoId}
          onChange={(e) => setEventoId(e.target.value)}
        />
        <Button Text="Deletar Evento" onClick={handleDeleteEvento} />
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

export default Evento;
