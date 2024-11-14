<template>
    <div class="container contenedor2">
        <div class="row justify-content-around">
            <button class="btn btn-success btn-crud" data-bs-toggle="modal" data-bs-target="#agregarproducto" @:click="obtenerCategorias()">
                <span class="text">Agregar</span>
                <span class="icon"><i class="fas fa-plus"></i></span>
            </button>
            <button class="btn btn-warning btn-crud" data-bs-toggle="modal" data-bs-target="#actualizarproducto" @:click="obtenerProductos('nombres')">
                <span class="text">Actualizar</span>
                <span class="icon"><i class="fas fa-edit"></i></span>
            </button>
            <button class="btn btn-danger btn-crud" data-bs-toggle="modal" data-bs-target="#eliminarproducto" @:click="obtenerProductos('nombres')">
                <span class="text">Eliminar</span>
                <span class="icon"><i class="fas fa-trash"></i></span>
            </button>
            <div class="input-group mb-3 input-group-search">
                <input type="search" placeholder="Nombre del producto" required v-model="producto.producto">
                <button class="btn btn-primary" type="button" @:click="obtenerProducto(true)"><i class="fas fa-search"></i></button>
            </div>
            <div class="input-group mb-3 input-group-search">
                <input type="search" placeholder="Productos por categoria" required v-model="producto.categoria">
                <button class="btn btn-primary" @click="obtenerProductosPorCategoria()"><i class="fas fa-search"></i></button>
            </div>
            <button class="btn btn-primary btn-crud" @:click="obtenerProductos('todo')">
                <span class="text">Ver Productos</span>
                <span class="icon"><i class="fas fa-tasks"></i></span>
            </button>
        </div>
        <div class="modal fade" id="obtenerproducto" tabindex="-1" aria-hidden="true" ref="obtenerproductoModal">
            <div class="modal-dialog modal-dialog-centered" >
                <div class="modal-content">
                    <div class="modal-header header-buscar">
                        <h5 class="modal-title">Producto</h5>
                        <button type="button" class="btn-close" @:click="limpiarCampos()" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <div class="input-group mb-3">
                            <span class="input-group-text input-group-text-3"><i class="fas fa-gamepad"></i></span>
                            <input type="text" class="form-control" readonly v-model="producto.producto">
                         </div>
                        <div class="input-group mb-3">
                            <span class="input-group-text input-group-text-3"><i class="fas fa-align-justify"></i></span>
                            <textarea class="form-control" readonly v-model="producto.descripcion"></textarea>
                        </div>
                        <div class="input-group mb-3">
                            <span class="input-group-text input-group-text-3"><i class="fas fa-dollar-sign"></i></span>
                            <input type="text" class="form-control" readonly v-model="producto.precio">
                        </div>
                        <div class="input-group mb-3">
                            <span class="input-group-text input-group-text-3"><i class="fas fa-boxes"></i></span>
                            <input type="text" class="form-control" readonly v-model="producto.stock">
                        </div>
                        <div class="input-group mb-3">
                            <span class="input-group-text input-group-text-3"><i class="fas fa-tasks"></i></span>
                            <input type="text" class="form-control" readonly v-model="producto.categoria">
                        </div>
                        <img id="imgProduct" alt="Imagen producto" :src="imagenDesc">
                    </div>
                </div>
            </div>
        </div>
        <div class="modal fade" id="agregarproducto" tabindex="-1" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered" >
                <div class="modal-content">
                    <div class="modal-header header-agregar">
                        <h5 class="modal-title">Agregar Producto</h5>
                        <button type="button" class="btn-close" @:click="limpiarCampos()" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body d-flex justify-content-center">
                        <form @:submit.prevent="agregarProducto()" enctype="multipart/form-data">
                            <div class="input-group mb-3">
                                <span class="input-group-text input-group-text-2"><i class="fas fa-gamepad"></i></span>
                                <input type="text" class="form-control" placeholder="Nombre producto" v-model="producto.producto" required>
                            </div>
                            <div class="input-group mb-3">
                                <span class="input-group-text input-group-text-2"><i class="fas fa-align-justify"></i></span>
                                <textarea class="form-control" placeholder="Descripción" v-model="producto.descripcion" required></textarea>
                            </div>
                            <div class="input-group mb-3">
                                <span class="input-group-text input-group-text-2"><i class="fas fa-dollar-sign"></i></span>
                                <input type="number" class="form-control" placeholder="Precio" v-model="producto.precio" required step="100">
                            </div>
                            <div class="input-group mb-3">
                                <span class="input-group-text input-group-text-2"><i class="fas fa-boxes"></i></span>
                                <input type="number" class="form-control" placeholder="Cantidad disponible" required v-model="producto.stock">
                            </div>
                            <div class="input-group mb-3">
                                <span class="input-group-text input-group-text-2"><i class="fas fa-tasks"></i></span>
                                <select class="form-select" v-model="producto.categoria">
                                    <option v-for="categoria in categorias_list" v-bind:key="categoria">{{ categoria.nombre }}</option>
                                </select>
                            </div>
                            <div class="input-group mb-3 dropZone2" ref="dropZone">
                                <span class="input-group-text input-group-text-2"><i class="fas fa-file-image"></i></span>
                                <div class="div" @:click="clickDropZone()" @:dragover.prevent="dragOver()" @:dragleave.prevent="dragLeave()" @:drop.prevent="drop($event)">
                                    <input type="file" class="form-control hide" required accept="image/*" @:change="clickImagen($event)" ref="fileInput">
                                    <img src="https://img.icons8.com/ios-glyphs/32/28a745/upload--v1.png" alt="icon file">
                                    <p>Arrastre la imagen o de click para subir la imagen</p>
                                </div>
                            </div>
                            <button class="btn btn-success" type="submit">Agregar</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
        <div class="modal fade" id="actualizarproducto" tabindex="-1" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered" >
                <div class="modal-content">
                    <div class="modal-header header-actualizar">
                        <h5 class="modal-title" >Actualizar Producto</h5>
                        <button type="button" class="btn-close" @:click="limpiarCampos()" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body d-flex justify-content-center ">
                        <form @:submit.prevent="actualizarProducto()">
                            <div class="input-group mb-3">
                                <select class="form-select" v-model="producto.producto" ref="productoActualizar">
                                    <option v-for="producto in nombres_productos" v-bind:key="producto.producto">{{ producto }}</option>
                                </select>
                                <button class="btn btn-warning" type="button"><i class="fas fa-search" @:click="obtenerProducto(false)"></i></button>
                            </div>
                            <div ref="actualizarProductoForm">
                                <div class="input-group mb-3">
                                    <span class="input-group-text input-group-text-4"><i class="fas fa-align-justify"></i></span>
                                    <textarea class="form-control" placeholder="Descripción" v-model="producto.descripcion" required></textarea>
                                </div>
                                <div class="input-group mb-3">
                                    <span class="input-group-text input-group-text-4"><i class="fas fa-dollar-sign"></i></span>
                                    <input type="number" class="form-control" placeholder="Precio" v-model="producto.precio" required step="100">
                                </div>
                                <div class="input-group mb-3">
                                    <span class="input-group-text input-group-text-4"><i class="fas fa-boxes"></i></span>
                                    <input type="number" class="form-control" placeholder="Cantidad disponible" v-model="producto.stock" required>
                                </div>
                                <div class="input-group mb-3">
                                    <span class="input-group-text input-group-text-4"><i class="fas fa-tasks"></i></span>
                                    <select class="form-select" v-model="producto.categoria">
                                        <option v-for="categoria in categorias_list" v-bind:key="categoria">{{ categoria.nombre }}</option>
                                    </select>
                                </div>
                                <button class="btn btn-warning" type="submit">Actualizar</button>    
                            </div>
                            
                        </form>
                    </div>
                </div>
            </div>
        </div>
        <div class="modal fade" id="eliminarproducto" tabindex="-1" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered" >
                <div class="modal-content">
                    <div class="modal-header header-eliminar">
                        <h5 class="modal-title" id="eliminarproductoLabel">Eliminar Producto</h5>
                        <button type="button" class="btn-close" @:click="limpiarCampos()" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body d-flex justify-content-center ">
                        <form @:submit.prevent="eliminarProducto()">
                            <div class="input-group mb-3">
                                <span class="input-group-text input-group-text-1"><i class="fas fa-gamepad"></i></span>
                                <select class="form-select" v-model="producto.producto">
                                    <option v-for="producto in nombres_productos" v-bind:key="producto.producto">{{ producto }}</option>
                                </select>
                            </div>
                            <button class="btn btn-danger" type="submit">Eliminar</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
        <div class="table tabla">
            <table class="table table-striped">
                <tr>
                    <th>ID producto</th>
                    <th>Nombre producto</th>
                    <th>Descripción</th>
                    <th>Precio</th>
                    <th>Cantidad disponible</th>
                    <th>Categoria</th>
                </tr>
                <tr v-for="producto in productos_list" v-bind:key="producto._id">
                    <td>{{ producto._id }}</td>
                    <td>{{ producto.producto }}</td>
                    <td>{{ producto.descripcion }}</td>
                    <td>${{ producto.precio }}</td>
                    <td>{{ producto.stock }}</td>
                    <td>{{ producto.categoria }}</td>
                </tr>
            </table>
        </div>
    </div>
</template>
<script>
import { defineComponent } from 'vue';
import { storage } from '../firebase';
import { ref, uploadBytes, deleteObject, getDownloadURL } from 'firebase/storage';
import { Modal } from 'bootstrap';
import Swal from 'sweetalert2';
import api from '../ApiConfig';
export default defineComponent({
    // eslint-disable-next-line vue/multi-word-component-names
    name: "Productos",
    data: function () {
        return {
            producto: {
                _id: "",
                producto: "",
                descripcion: "",
                precio: 0,
                stock: 0,
                categoria: ""
            },
            productos_list: [],
            categorias_list: [],
            nombres_productos: [],
            imagen: null,
            imagenDesc: null
        }
    },
    methods: {
        limpiarCampos() {
            this.producto = {
                _id: "",
                producto: "",
                descripcion: "",
                precio: 0,
                stock: 0,
                categoria: ""
            }
            this.imagen = null
            this.imagenDesc = null
            this.dragLeave();
            this.$refs.productoActualizar.disabled = false;
        },
        mostrarAlerta(icon, title) {
            Swal.fire({ icon, title });
        },
        clickImagen(e) {
            this.imagen = e.target.files[0];
            this.dragOver();
        },
        clickDropZone() {
            this.$refs.fileInput.click();
        },
        dragOver() {
            this.$refs.dropZone.classList.add('drop-zone--active');
        },
        dragLeave() {
            this.$refs.dropZone.classList.remove('drop-zone--active');
        },
        drop(event) {
            this.$refs.fileInput.files = event.dataTransfer.files;
            this.imagen = this.$refs.fileInput.files[0];
        },
        validarImagen(archivo) {
            const tiposValidos = ['image/jpeg', 'image/png', 'image/webp'];
            if (!archivo) {
                this.mostrarAlerta('warning', 'Debe seleccionar una imagen');
                return false;
            } else if (!tiposValidos.includes(archivo.type)) {
                this.mostrarAlerta('error', 'Solo se permiten imágenes (JPEG, PNG, webp)');
                return false;
            }
            return true;
        },
        async agregarProducto() {
            try {
                if (!this.validarImagen(this.imagen)) {
                    this.imagen = null;
                    return;
                }
                this.producto.producto = this.producto.producto.trim();
                this.producto.descripcion = this.producto.descripcion.trim();
                if (this.producto.categoria === "No hay categorías") {
                    this.mostrarAlerta('error', 'Debe agregar una categoría para poder agregar un producto');
                    this.limpiarCampos();
                    return;
                }
                const response = await api.post("productos/agregar", this.producto);
                const refImg = ref(storage, `imagenes/${response.data._id}`);
                await uploadBytes(refImg, this.imagen);
                this.mostrarAlerta('success', `Se ha agregado el producto ${this.producto.producto}`);
                this.obtenerProductos('todo');
                this.limpiarCampos();
            } catch (error) {
                console.log(error);
                this.limpiarCampos();
                this.mostrarAlerta('error', error.response.data.message);
            }
        },
        async obtenerProductos(tipo) {
            try {
                const response = await api.get("productos");
                if (tipo === 'todo') {
                    this.productos_list = response.data;
                    return;
                } else if (tipo === 'nombres') {
                    this.nombres_productos = [];
                    response.data.length > 0 ? this.nombres_productos = response.data.map(producto => producto.producto) : this.nombres_productos.push("No hay productos");
                    this.$refs.actualizarProductoForm.style.display = "none";
                    this.obtenerCategorias();
                    return;
                } else {
                    this.productos_list = response.data;
                    this.nombres_productos = response.data.map(producto => producto.producto);
                    return;
                }
            } catch (error) {
                console.log(error);
            }
        },
        async obtenerProductosPorCategoria() {
            try {
                if (!this.producto.categoria.trim()) {
                    this.limpiarCampos();
                    this.productos_list = [];
                    this.mostrarAlerta('warning', 'Ingrese una categoria');
                    return;
                }
                const response = await api.get(`categorias/productos/${this.producto.categoria}`);
                this.productos_list = response.data;
                this.limpiarCampos();
            } catch (error) {
                console.log(error);
                this.mostrarAlerta('error', error.response.data.message);
                this.productos_list = [];
                this.limpiarCampos();
            }
        },
        async obtenerProducto(estado) {
            try {
                if (!this.producto.producto.trim()) {
                    this.mostrarAlerta('warning', 'Ingrese un producto');
                    return;
                } else if (this.producto.producto === "No hay productos") {
                    this.mostrarAlerta('error', 'No hay productos en el inventario');
                    return;
                }
                const response = await api.get(`productos/${this.producto.producto}`);
                this.producto = response.data;
                if (estado) {
                    this.imagenDesc = await getDownloadURL(ref(storage, 'imagenes/' + this.producto._id));
                    const modalInstance = new Modal(this.$refs.obtenerproductoModal);
                    modalInstance.show();
                } else {
                    this.$refs.productoActualizar.disabled = true;
                    this.$refs.actualizarProductoForm.style.display = "block";
                }
            } catch (error) {
                console.log(error);
                this.mostrarAlerta('error', error.response.data.message);
                this.limpiarCampos();
            }
        },
        async actualizarProducto() {
            try {
                if (!this.producto._id) {
                    this.mostrarAlerta('error', 'Debe buscar un producto para actualizar');
                    this.limpiarCampos();
                    return;
                }
                this.producto.producto = this.producto.producto.trim();
                this.producto.descripcion = this.producto.descripcion.trim();
                await api.put(`productos/actualizar/${this.producto._id}`, this.producto);
                this.mostrarAlerta('success', `Se ha actualizado el producto ${this.producto.producto}`);
                this.obtenerProductos();
                this.limpiarCampos();
                this.$refs.actualizarProductoForm.style.display = "none";
            } catch (error) {
                console.log(error);
                this.mostrarAlerta('error', error.response.data.message);
            }
        },
        async eliminarProducto() {
            try {
                if (!this.producto.producto.trim()) {
                    this.mostrarAlerta('warning', 'Ingrese un producto');
                    return;
                } else if (this.producto.producto === "No hay productos") {
                    this.mostrarAlerta('error', 'No hay productos para eliminar');
                    return;
                }
                const response = await api.get(`productos/${this.producto.producto}`);
                this.producto = response.data;
                const refImg = ref(storage, 'imagenes/' + this.producto._id);
                deleteObject(refImg).then(e => console.log(e));
                const response2 = await api.delete(`productos/eliminar/${this.producto.producto}`);
                this.mostrarAlerta('success', response2.data.message);
                this.obtenerProductos();
                this.limpiarCampos();
            } catch (error) {
                console.log(error);
                this.mostrarAlerta('error', error.response.data.message);
                this.limpiarCampos();
            }
        },
        async obtenerCategorias() {
            try {
                const response = await api.get("categorias");
                this.categorias_list = [];
                response.data.length > 0 ? this.categorias_list = response.data : this.categorias_list.push({ nombre: "No hay categorías" });
            } catch (error) {
                console.log(error);
            }
        }
    }
});
</script>
<style>
.hide {
    display: block;
    position: absolute;
    z-index: -1;
}
.dropZone2 {
    border: 2px dashed black;
}
.drop-zone--active {
    border: 2px solid #28a745;
    color: #28a745;
}
.dropZone .div {
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: center;
    align-items: center;
    z-index: 10;
}
#imgProduct {
    width: 200px;
    margin-left: auto;
    margin-right: auto;
}
</style>