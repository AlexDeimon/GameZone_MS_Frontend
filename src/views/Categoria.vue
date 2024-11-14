<template>
    <div class="container contenedor2">
        <div class="row justify-content-around">
            <button class="btn btn-success btn-crud" data-bs-toggle="modal" data-bs-target="#crearcategoria">
                <span class="text">Nueva</span>
                <span class="icon"><i class="fas fa-plus"></i></span>
            </button>
            <button class="btn btn-danger btn-crud" data-bs-toggle="modal" data-bs-target="#eliminarcategoria" @click="obtenerCategorias('nombres')">
                <span class="text">Eliminar</span>
                <span class="icon"><i class="fas fa-trash"></i></span>
            </button>
            <button class="btn btn-primary btn-crud" @click="obtenerCategorias('todo')">
                <span class="text">Ver Categorias</span>
                <span class="icon"><i class="fas fa-tasks"></i></span>
            </button>
        </div>
        <div class="modal fade" id="crearcategoria" tabindex="-1" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header header-agregar">
                        <h5 class="modal-title">Crear Categoria</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" @:click="limpiarCampos()"></button>
                    </div>
                    <div class="modal-body d-flex justify-content-center">
                        <form @submit.prevent="crearCategoria()">
                            <div class="input-group mb-3">
                                <span class="input-group-text input-group-text-2"><i class="fas fa-tasks"></i></span>
                                <input type="text" class="form-control" placeholder="Nombre Categoria" v-model="categoria.nombre">
                            </div>
                            <button class="btn btn-success" type="submit">Crear</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
        <div class="modal fade" id="eliminarcategoria" tabindex="-1" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header header-eliminar">
                        <h5 class="modal-title">Eliminar Categoria</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" @:click="limpiarCampos"></button>
                    </div>
                    <div class="modal-body d-flex justify-content-center">
                        <form @submit.prevent="eliminarCategoria()">
                            <div class="input-group mb-3">
                                <span class="input-group-text input-group-text-1"><i class="fas fa-tasks"></i></span>
                                <select class="form-select" v-model="categoria.nombre">
                                    <option v-for="categoria in nombres_categorias" v-bind:key="categoria">{{ categoria.nombre }}</option>
                                </select>
                            </div>
                            <div class="form-check form-switch">
                                <input class="form-check-input" type="checkbox" role="switch" id="eliminaProductos" v-model="eliminaProductos">
                                <label class="form-check-label" for="eliminaProductos">¿Eliminar tambien los productos pertenecientes a esta categoria?</label>
                            </div><br>
                            <button class="btn btn-danger" type="submit">Eliminar</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
        <div class="table tabla">
            <table class="table table-striped">
                <tr>
                    <th>ID Categoria</th>
                    <th>Nombre</th>
                    <th>Productos</th>
                </tr>
                <tr v-for="categoria in categorias_list" :key="categoria._id">
                    <td>{{ categoria._id }}</td>
                    <td>{{ categoria.nombre }}</td>
                    <td>
                        <ul class="productos">
                            <li v-for="producto in categoria.productos" :key="producto.producto">{{ producto.producto }}
                            </li>
                        </ul>
                    </td>
                </tr>
            </table>
        </div>
    </div>
</template>
<script>
import { defineComponent } from 'vue';
import { storage } from '../firebase';
import { ref, deleteObject } from 'firebase/storage';
import Swal from 'sweetalert2';
import api from '../ApiConfig';
export default defineComponent({
    // eslint-disable-next-line vue/multi-word-component-names
    name: "Categorias",
    data() {
        return {
            categoria: {
                nombre: ""
            },
            categorias_list: [],
            nombres_categorias: [],
            eliminaProductos: false
        }
    },
    methods: {
        limpiarCampos() {
            this.categoria = {
                nombre: ""
            }
        },
        mostrarAlerta(icon, title) {
            Swal.fire({ icon, title });
        },
        async crearCategoria() {
            try {
                this.categoria.nombre = this.categoria.nombre.trim();
                await api.post("categorias/crear", this.categoria);
                this.mostrarAlerta('success', `Se ha creado la categoria ${this.categoria.nombre}`);
                this.obtenerCategorias('todo');
                this.limpiarCampos();
            } catch (error) {
                console.log(error);
                this.mostrarAlerta('error', error.response.data.message);
                this.limpiarCampos();
            }
        },
        async obtenerCategorias(tipo) {
            try {
                this.vistaActual = 'categorias';
                const response = await api.get("categorias");
                if (tipo === 'todo') {
                    this.categorias_list = response.data;
                } else if (tipo === 'nombres') {
                    this.nombres_categorias = [];
                    response.data.length > 0 ? this.nombres_categorias = response.data : this.nombres_categorias.push({ nombre: "No hay categorías" });
                } else {
                    this.categorias_list = response.data;
                    this.nombres_categorias = response.data;
                }
            } catch (error) {
                console.log(error);
            }
        },
        async eliminarCategoria() {
            try {
                if (!this.categoria.nombre.trim()) {
                    this.mostrarAlerta('warning', 'Seleccione una categoria');
                    this.limpiarCampos();
                    return;
                }
                const url = this.eliminaProductos ?
                    `categorias/eliminar/${this.categoria.nombre}?borrarProductos=true` :
                    `categorias/eliminar/${this.categoria.nombre}`;
                if (this.categoria.nombre === "No hay categorías") {
                    this.mostrarAlerta('error', 'No hay categorías para eliminar');
                    this.limpiarCampos();
                    return;
                }
                if (this.eliminaProductos) {
                    const response = await api.get(`categorias/productos/${this.categoria.nombre}`);
                    let productos_list = response.data;
                    for (let i = 0; i < productos_list.length; i++) {
                        const refImg = ref(storage, 'imagenes/' + productos_list[i]._id);
                        deleteObject(refImg).then(e => console.log(e));
                    }
                    this.productos_list = [];
                }
                const response = await api.delete(url);
                this.mostrarAlerta('success', response.data.message);
                this.obtenerCategorias()
                this.limpiarCampos();
            } catch (error) {
                console.log(error);
                this.mostrarAlerta('error', error.response.data.message);
                this.limpiarCampos();
            }
        }
    }
});
</script>