import React, { useState, useEffect, ChangeEvent } from 'react'
import { Container, Typography, TextField, Button, Grid, Box } from "@material-ui/core"
import { useHistory, useParams } from 'react-router-dom'
import './CadastroCategoria.css';
import { buscaId, post, put } from '../../../services/Service';
import Categoria from '../../../models/Categoria';
import { useSelector } from 'react-redux';
import { TokenState } from '../../../store/tokens/tokensReducer';
import { toast } from 'react-toastify';


function CadastroCategoria() {
    let history = useHistory();
    const { id } = useParams<{ id: string }>();
    const token = useSelector<TokenState, TokenState["tokens"]>(
        (state) => state.tokens
    );
    const [categoria, setCategoria] = useState<Categoria>({
        id: 0,
        categoria: '',
        descricao: '',
        palavra_chave: '',
        produto: null
    })

    useEffect(() => {
        if (token == "") {
            toast.error("Você precisa estar logado", {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: false,
                theme: "colored",
                progress: undefined,
            })
            history.push("/login")
        }
    }, [token])

    useEffect(() => {
        if (id !== undefined) {
            findById(id)
        }
    }, [id])

    async function findById(id: string) {
        buscaId(`/categorias/${id}`, setCategoria, {
            headers: {
                'Authorization': token
            }
        })
    }

    function updatedCategoria(e: ChangeEvent<HTMLInputElement>) {

        setCategoria({
            ...categoria,
            [e.target.name]: e.target.value,
            produto: null
        })

    }

    async function onSubmit(e: ChangeEvent<HTMLFormElement>) {
        e.preventDefault()
        console.log("categoria " + JSON.stringify(categoria))

        if (id !== undefined) {
            console.log(categoria)
            put(`/categorias`, categoria, setCategoria, {
                headers: {
                    'Authorization': token
                }
            })
            toast.success("Categoria atualizada com sucesso", {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: false,
                theme: "colored",
                progress: undefined,
            })
        } else {
            post(`/categorias`, categoria, setCategoria, {
                headers: {
                    'Authorization': token
                }
            })
            toast.success("Categoria cadastrada com sucesso", {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: false,
                theme: "colored",
                progress: undefined,
            })
        }
        back()

    }

    function back() {
        history.push('/categorias')
    }

    return (
        
            <Container maxWidth="xs" className='topo'  >
                <form onSubmit={onSubmit}>
                    <Typography variant="h3" color="textSecondary" component="h1" align="center" >Formulário de cadastro de categoria</Typography>
                    <TextField value={categoria.categoria} onChange={(e: ChangeEvent<HTMLInputElement>) => updatedCategoria(e)} id="categoria" label="categoria" variant="outlined" name="categoria" margin="normal" fullWidth />
                    <TextField value={categoria.descricao} onChange={(e: ChangeEvent<HTMLInputElement>) => updatedCategoria(e)} id="descricao" label="descricao" variant="outlined" name="descricao" margin="normal" fullWidth />

                    <Button type="submit" variant="contained" className='finalizar'>
                        Finalizar
                    </Button>
                </form>
            </Container>
      
    )
}

export default CadastroCategoria;