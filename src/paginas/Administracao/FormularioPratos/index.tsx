import {
    Box,
    Button,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    TextField,
    Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { http } from "../../../http";
import { ITag } from "../../../interfaces/ITag";
import IRestaurante from "../../../interfaces/IRestaurante";
import { useParams } from "react-router-dom";
import IPrato from "../../../interfaces/IPrato";

export const FormularioPrato = () => {

    /*Estados*/
    const [nomePrato, setNomePrato] = useState("");
    const [descricao, setDescricao] = useState("");
    const [tag, setTag] = useState('');
    const [restaurante, setRestaurante] = useState('');
    const [imagem, setImagem] = useState<File | null>(null);
    
    const [tags, setTags] = useState<ITag[]>([]);
    const [restaurantes, setRestaurantes] = useState<IRestaurante[]>([])
    /*Fim estados*/

    const parameters = useParams();

    useEffect(() => {
        http.get<{ tags: ITag[] }>("tags/")
            .then(response => setTags(response.data.tags))

        http.get<IRestaurante[]>("restaurantes/")
            .then(resposta => setRestaurantes(resposta.data))

        if(parameters?.id){
            http.get<IPrato>(`pratos/${parameters.id}/`)
                .then(resposta => {
                    setNomePrato(resposta.data.nome);
                    setDescricao(resposta.data.descricao);
                    setTag(resposta.data.tag);
                    setRestaurante(String(resposta.data.restaurante));
                })
        }

    },[parameters.id])

    const selecionarArquivo = (evento: React.ChangeEvent<HTMLInputElement>) => {
        if (evento.target.files?.length) {
            setImagem(evento.target.files[0])
        } else {
            setImagem(null)
        }
    }

    const aoSubmeterForm = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData();

        formData.append('nome', nomePrato);
        formData.append('descricao', descricao);
        formData.append('tag', tag);
        formData.append('restaurante', restaurante);
        
        if(imagem) {
            formData.append('imagem', imagem);
        }

        const method: string = parameters.id ? 'PUT' : 'POST'
        const url: string = parameters.id ? `pratos/${parameters.id}/` : 'pratos/'

        http.request({
            url,
            method,
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            data: formData
        })
            .then(() => {
                if(!parameters?.id){
                    setNomePrato('');
                    setDescricao('');
                    setTag('');
                    setRestaurante('');
                    setImagem(null);
                }
                alert('Prato salvo com sucesso')
            })
            .catch(erro => console.log(erro));
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
                    Formulario de Pratos
                </Typography>
                <Box component="form" onSubmit={aoSubmeterForm} sx={{ width: "100%" }}>
                    <TextField
                        value={nomePrato}
                        onChange={(evento) => setNomePrato(evento.target.value)}
                        label="Nome do Prato"
                        variant="standard"
                        fullWidth
                        required
                        margin="dense"
                    />
                    <TextField
                        value={descricao}
                        onChange={(evento) => setDescricao(evento.target.value)}
                        label="Descição do Prato"
                        variant="standard"
                        fullWidth
                        required
                        margin="dense"
                    />
                    <FormControl
                        margin="dense"
                        fullWidth

                    >
                        <InputLabel id="select-tag">Tag</InputLabel>
                        <Select 
                            labelId="select-tag"
                            value={tag}
                            onChange={evento => setTag(evento.target.value)}
                        >
                            {tags?.map(tag => (
                                <MenuItem
                                    key={tag.id}
                                    value={tag.value}
                                >
                                    {tag.value}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <FormControl
                        margin="dense"
                        fullWidth

                    >
                        <InputLabel id="select-restaurantes">Restaurante</InputLabel>
                        <Select 
                            labelId="select-restaurantes"
                            value={restaurante}
                            onChange={evento => setRestaurante(evento.target.value)}
                        >
                            {restaurantes?.map(restaurante => (
                                <MenuItem
                                    key={restaurante.id}
                                    value={restaurante.id}
                                >
                                    {restaurante.nome}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <input 
                        type="file"
                        onChange={selecionarArquivo}
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
