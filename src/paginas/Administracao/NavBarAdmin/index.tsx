import { AppBar, Container, Toolbar, Typography, Box, Button, Link, Paper } from "@mui/material";
import { Outlet, Link as RouterLink } from "react-router-dom";
import { IRotas } from "../../../interfaces/IRotas";

export const NavBarAdmin = () => {

    const rotas: IRotas[] = [{
        nome: 'Restaurantes',
        link: '/admin/restaurantes'
    }, {
        nome: 'Novo Restaurantes',
        link: '/admin/restaurantes/novo'
    }, {
        nome: 'Pratos',
        link: '/admin/pratos'
    }, {
        nome: 'Novo Prato',
        link: '/admin/pratos/novo'
    }]

    return (
        <>
            <AppBar position="static">
                <Container maxWidth="xl">
                    <Toolbar>
                        <Typography variant="h6">
                            Administração
                        </Typography>
                        <Box sx={{
                            display: 'flex',
                            flexGrow: 1
                        }}
                        >
                            {rotas?.map(rota => (
                                <Link 
                                    key={rota.nome}
                                    component={RouterLink} 
                                    to={rota.link} 
                                >
                                    <Button
                                        sx={{
                                            my: 2,
                                            color: 'white'
                                        }}
                                    >
                                        {rota.nome}
                                    </Button>
                                </Link >
                            ))}
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>
            <Box>
                <Container
                    maxWidth="lg"
                    sx={{ mt: 1 }}
                >
                    <Paper sx={{ p: 2 }}>
                        <Outlet />
                    </Paper>
                </Container>
            </Box>
        </>
    )
}