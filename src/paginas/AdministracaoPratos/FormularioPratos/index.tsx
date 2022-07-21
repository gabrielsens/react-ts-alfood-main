import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { Box, Button, FormControl, InputLabel, MenuItem, Select, TextField, Typography,} from "@mui/material";
import { http } from "../../../http";

import ITag from "../../../interfaces/ITag";
import IRestaurante from "../../../interfaces/IRestaurante";
import IPrato from "../../../interfaces/IPrato";

export default function FormularioPratos() {
  const { id } = useParams();

  const [nomePrato, setNomePrato] = useState('');
  const [descricao, setDescricao] = useState('');
  const [selectedTag, setSelectedTag] = useState('');
  const [selectedRestaurant, setSelectedRestaurant] = useState('');
  const [image, setImage] = useState<File | null>(null);

  const [restaurant, setRestaurant] = useState<IRestaurante[]>([]);
  const [tags, setTags] = useState<ITag[]>([]);

  useEffect(() => {
    if(id) {
      http.get<IPrato>(`pratos/${id}/`)
        .then(response => {
          setNomePrato(response.data.nome);
          setDescricao(response.data.descricao);
          setSelectedTag(response.data.tag);
          setSelectedRestaurant(response.data.restaurante.toString());
        })
    } else {
      setNomePrato('');
      setDescricao('');
      setSelectedTag('');
      setSelectedRestaurant('');
    }

    http.get<{ tags: ITag[] }>('tags/')
      .then(response => setTags(response.data.tags));

    http.get<IRestaurante[]>('restaurantes/')
      .then(response => setRestaurant(response.data));

  }, [id]);

  function handleSelectFile(event: React.ChangeEvent<HTMLInputElement>) {
    if(event.target.files) {
      setImage(event.target.files[0])
    }
    else {
      setImage(null);
    }
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData();

    formData.append('nome', nomePrato);
    formData.append('descricao', descricao);
    formData.append('tag', selectedTag);
    formData.append('restaurante', selectedRestaurant);
    if (image) {
      formData.append('imagem', image);
    }

    http.request({
      url: 'pratos/',
      method: 'post',
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      data: formData
    })
      .then(response => console.log(response))

  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems:'center', flexGrow: 1 }}>
      <Typography component="h1" variant="h6">Formulário de Pratos</Typography>
      <Box component="form" sx={{ width: '90%'}} onSubmit={handleSubmit}>
        <TextField
          label="Nome do Prato"
          variant="standard"
          value={nomePrato}
          required
          fullWidth
          onChange={(event) => setNomePrato(event.target.value)}
        />
        <TextField
          margin="dense"
          label="Descrição"
          variant="standard"
          value={descricao}
          required
          fullWidth
          onChange={(event) => setDescricao(event.target.value)}
        />
        <FormControl
          margin="dense"
          fullWidth
        >
          <InputLabel id="selectTag">Tag</InputLabel>
          <Select
            labelId="selectTag"
            value={selectedTag}
            required
            onChange={e => setSelectedTag(e.target.value)}
          >
            {tags.map(
              tag =>
                <MenuItem
                  key={tag.id}
                  value={tag.value}
                >
                  {tag.value}
                </MenuItem>)}
          </Select>
        </FormControl>
        <FormControl
          margin="dense"
          fullWidth
        >
          <InputLabel id="selectRestaurant">Restaurante</InputLabel>
          <Select
            labelId="selectRestaurant"
            value={selectedRestaurant}
            required
            onChange={e => setSelectedRestaurant(e.target.value)}
          >
            {restaurant.map(
              rest =>
                <MenuItem
                  key={rest.id}
                  value={rest.id}
                >
                  {rest.nome}
                </MenuItem>)}
          </Select>
        </FormControl>

        <input type="file" onChange={handleSelectFile} />

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
