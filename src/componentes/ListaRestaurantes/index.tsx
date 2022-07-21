import React, { useCallback, useEffect, useState } from 'react';

import Restaurante from './Restaurante';

import SearchIcon from '@mui/icons-material/Search';
import { IconButton, InputBase, Pagination, InputLabel, MenuItem, Select, SelectChangeEvent, FormControl } from '@mui/material';

import style from './ListaRestaurantes.module.scss';

import { IPaginacao } from '../../interfaces/IPaginacao';
import { IParametroBusca } from '../../interfaces/IParametrosBusca';
import IRestaurante from '../../interfaces/IRestaurante';

import { httpV1 } from '../../http';

const ListaRestaurantes = () => {
  const [restaurantes, setRestaurantes] = useState<IRestaurante[]>([]);
  const [page, setPage] = useState(1);
  const [qntPages, setQntPages] = useState(1);
  const [inputSearchRestaurant, setInputSearchRestaurant] = useState('');
  const [searchRestaurant, setSearchRestaurant] = useState('');
  const [selectRestaurantOrdering, setSelectRestaurantOrdering] = useState('id');

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const handleSearchRestaurant = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSearchRestaurant(inputSearchRestaurant);
    loadRestaurant();
  }

  const handleRestaurantOrdering = (event: SelectChangeEvent<string>) => {
    setSelectRestaurantOrdering(event.target.value);
  }

  const loadRestaurant = useCallback(() => {
    const opcoes = {
      params: {
      } as IParametroBusca
    }
    opcoes.params.search = searchRestaurant;

    opcoes.params.ordering = selectRestaurantOrdering;

    httpV1.get<IPaginacao<IRestaurante>>(`restaurantes/?page=${page}`, opcoes)
      .then(response => {
        setRestaurantes(response.data.results);
        const paginas = Math.ceil(response.data.count / 6);
        setQntPages(paginas);
      })
      .catch(erro => {
        console.log(erro);
      })
  }, [page, selectRestaurantOrdering, searchRestaurant])

  useEffect(() => {
      loadRestaurant();
  }, [loadRestaurant])

  return (
    <section className={style.ListaRestaurantes}>
      <h1>Os restaurantes mais <em>bacanas</em>!</h1>
      <form onSubmit={handleSearchRestaurant}>
        <InputBase placeholder='Pesquisar' value={inputSearchRestaurant} onChange={(event) => {setInputSearchRestaurant(event.target.value)}} />
        <IconButton type='submit'>
          <SearchIcon />
        </IconButton>
      </form>
      <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
        <InputLabel id="demo-select-small">Ordenação</InputLabel>
          <Select
            labelId="demo-select-small"
            id="demo-select-small"
            value={selectRestaurantOrdering}
            label="Ordenação"
            onChange={handleRestaurantOrdering}
          >
            <MenuItem value="id">Id</MenuItem>
            <MenuItem value="nome">Nome</MenuItem>
          </Select>
      </FormControl>
      {restaurantes?.map(item => <Restaurante restaurante={item} key={item.id} />)}

      <Pagination count={qntPages} page={page} onChange={handlePageChange} />
    </section>
  )
}

export default ListaRestaurantes
