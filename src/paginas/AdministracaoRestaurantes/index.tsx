import { TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, Button } from "@mui/material";
import { useEffect, useState } from "react"
import { Link } from "react-router-dom";
import { http } from "../../http";
import IRestaurante from "../../interfaces/IRestaurante"

export default function AdministracaoResutaurantes() {

  const [restaurantes, setRestaurantes] = useState<IRestaurante[]>([]);

  useEffect(() => {
    http.get<IRestaurante[]>('restaurantes/')
      .then(response => {
        setRestaurantes(response.data);
      })
  }, [])

  const handleDelete = (rest: IRestaurante) => {
    http.delete(`restaurantes/${rest.id}/`)
      .then(() => {
        const listaRestaurantes = restaurantes.filter((restaurante) => restaurante.id !== rest.id);

        setRestaurantes(listaRestaurantes);
      });
  }

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Nome</TableCell>
            <TableCell>Editar</TableCell>
            <TableCell>Excluir</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {restaurantes.map((rest) =>
            <TableRow key={rest.id}>
              <TableCell>{rest.nome}</TableCell>
              <TableCell><Link to={`/admin/restaurantes/${rest.id}`}>Editar</Link></TableCell>
              <TableCell>
                <Button variant="outlined" color="error" onClick={() => handleDelete(rest)}>
                  Excluir
                </Button>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
