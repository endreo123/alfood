import { useEffect, useState } from "react";
import IRestaurante from "../../../interfaces/IRestaurante";
import {
    Button,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from "@mui/material";
import { Link } from "react-router-dom";
import { http } from "../../../http";
import IPrato from "../../../interfaces/IPrato";

export const Pratos = () => {
    const [pratos, setPratos] = useState<IPrato[]>([]);

    useEffect(() => {
        http
            .get<IPrato[]>("pratos/")
            .then((response) => setPratos(response.data))
            .catch((error) => console.log(error));
    }, []);

    const excluir = (pratosAhSerExcluido: IPrato) => {
        http.delete(`restaurantes/${pratosAhSerExcluido.id}/`)
            .then(() => {
                const listaPratos = pratos.filter(pratos => pratos.id !== pratosAhSerExcluido.id);
                setPratos(listaPratos);
            })
            .catch(error => console.log(error));
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
                    {pratos?.map((prato) => (
                        <TableRow key={prato.id}>
                            <TableCell>{prato.nome}</TableCell>
                            <TableCell>{prato.tag}</TableCell>
                            <TableCell>
                                [<a rel="noreferrer" href={prato.imagem} target="_blank"> Ver Imagem </a>]
                            </TableCell>
                            <TableCell>
                                [<Link to={`/admin/prato/${prato.id}`}> Editar </Link>]
                            </TableCell>
                            <TableCell>
                                <Button 
                                    variant="outlined" 
                                    color="error"
                                    onClick={() => excluir(prato)}
                                >
                                    Excluir
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};
