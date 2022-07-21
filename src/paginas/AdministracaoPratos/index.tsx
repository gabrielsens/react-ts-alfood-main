import { TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, Button } from "@mui/material";
import { useEffect, useState } from "react"
import { Link } from "react-router-dom";
import { http } from "../../http";
import IPrato from "../../interfaces/IPrato"

export default function AdministracaoPratos() {

  const [pratos, setPratos] = useState<IPrato[]>([]);

  useEffect(() => {
    http.get<IPrato[]>('pratos/')
      .then(response => {
        setPratos(response.data);
      })
  }, [])

  const handleDelete = (prato: IPrato) => {
    http.delete(`pratos/${prato.id}/`)
      .then(() => {
        const listaPratos = pratos.filter((p) => prato.id !== p.id);

        setPratos(listaPratos);
      });
  }

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Nome</TableCell>
            <TableCell>Tag</TableCell>
            <TableCell>Imagem</TableCell>
            <TableCell>Editar</TableCell>
            <TableCell>Excluir</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {pratos.map((prato) =>
            <TableRow key={prato.id}>
              <TableCell>{prato.nome}</TableCell>
              <TableCell>{prato.tag}</TableCell>
              <TableCell><a href={prato.imagem} target="_blank" rel="noreferrer">Ver Imagem</a></TableCell>
              <TableCell><Link to={`/admin/pratos/${prato.id}`}>Editar</Link></TableCell>
              <TableCell>
                <Button variant="outlined" color="error" onClick={() => handleDelete(prato)}>
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
