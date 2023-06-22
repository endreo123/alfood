import {
    Box,
    Button,
    TextField,
    Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import IRestaurante from "../../../interfaces/IRestaurante";
import { http } from "../../../http";

export const FormularioRestaurante = () => {
    const parametros = useParams();

    useEffect(() => {
        if (parametros.id) {
            http
                .get<IRestaurante>(`restaurantes/${parametros.id}/`)
                .then((response) => setNomeRestaurante(response.data.nome))
                .catch((error) => console.log(error));
        }
    }, [parametros]);

    const [nomeRestaurante, setNomeRestaurante] = useState("");

    const aoSubmeterForm = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (parametros.id) {
            http
                .put(`restaurantes/${parametros.id}/`, {
                    nome: nomeRestaurante,
                })
                .then(() => alert("Restaurante atualizado com sucesso"));
        } else {
            http
                .post("restaurantes/", {
                    nome: nomeRestaurante,
                })
                .then(() => alert("Restaurante cadastrado com sucesso"));
        }
    };
    return (
        <>
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    flexGrow: 1,
                }}
            >
                <Typography component="h1" variant="h6">
                    Formulario de Restaurantes
                </Typography>
                <Box component="form" onSubmit={aoSubmeterForm} sx={{ width: "100%" }}>
                    <TextField
                        value={nomeRestaurante}
                        onChange={(evento) => setNomeRestaurante(evento.target.value)}
                        label="Nome do Restaurante"
                        variant="standard"
                        fullWidth
                        required
                    />
                    <Button
                        type="submit"
                        variant="outlined"
                        fullWidth
                        sx={{ marginTop: "2px" }}
                    >
                        Salvar
                    </Button>
                </Box>
            </Box>
        </>
    );
};
