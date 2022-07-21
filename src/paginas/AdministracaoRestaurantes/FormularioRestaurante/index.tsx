import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import IRestaurante from "../../../interfaces/IRestaurante";

import { Box, Button, TextField, Typography,} from "@mui/material";
import { http } from "../../../http";

export default function FormularioRestaurante() {
  const { id } = useParams();

  const [nomeRestaurante, setNomeResutaurante] = useState('');

  useEffect(() => {
    if(id) {
      http.get<IRestaurante>(`restaurantes/${id}/`)
        .then(response => setNomeResutaurante(response.data.nome));
    } else{
      setNomeResutaurante('');
    }
  }, [id])


  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if(id) {
      http.put<IRestaurante>(`restaurantes/${id}/`, {
        nome: nomeRestaurante
      })
        .then(resolve => console.log(resolve));
    }
    else {
      http.post('restaurantes/', {
        nome: nomeRestaurante
      })
        .then(resolve => console.log(resolve));
    }
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems:'center', flexGrow: 1 }}>
      <Typography component="h1" variant="h6">Formulário de Restaurantes</Typography>
      <Box component="form" sx={{ width: '90%'}} onSubmit={handleSubmit}>
        <TextField
          label="Nome do Restaurante"
          variant="standard"
          value={nomeRestaurante}
          required
          fullWidth
          onChange={(event) => setNomeResutaurante(event.target.value)}
        />
        <Button
          variant="outlined"
          type="submit"
          fullWidth
          sx={{ marginTop: 1 }}
        >
          Salvar
        </Button>
      </Box>
    </Box>
  )
}
