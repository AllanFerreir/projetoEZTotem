/**
 * Created by luancomputacao on 25/02/18.
 */
$(function () {
    Pedido.run();
});

$( ())


Pedido = {

    component: $("<div class='js-pedido'></div>").html(''
        .concat(' <div>')
        .concat('    <b>ID</b>: <span class="js-pedido-id"></span><br> ')
        .concat('    <b>Cliente</b>: [<span class="js-pedido-cliente-cpf"></span>] - <span class="js-pedido-cliente-nome"></span><br> ')
        .concat('    <b>Data</b>: <span class="js-pedido-data"></span><br> ')
        .concat(' </div> ')
    ),

    elements: {
        form: {
            _: $("#pedido-form"),
            id: $("#pedido-id"),
            clienteID: $("#pedido-cliente"),
            dataPedido: $("#pedido-data"),
        },
        modal: {
            _: $('#pedido-modal'),
            title: $('#pedido-modal').find('.js-modal-title'),
            body: $('#pedido-modal').find('.js-modal-body')

        },
        buttons: {
            deletePedido: $(".js-btn-delete-pedido"),
            editPedido: $(".js-btn-edit-pedido")
        },
    },

    models: {
        id: null,
        cliente: {id: null, cfp: null, nome: null, sobrenome: null},
        dataPedido: null,
        urls: {
            deleteOne: "/api/v1/pedidos/"
        }
    },

    run: function () {
        console.log("Pedidos started");
        this.init();

        console.log("Calling watchers");
        this.watchers.form();
        this.watchers.table();

        console.log(this.models);
    },

    init: function () {
        this.models.id = this.elements.form.id.val() || this.elements.form.id.data('value') || null;
        this.models.cliente.id = this.elements.form.clienteID.val() || this.elements.form.clienteID.data('value');
        this.models.dataPedido = this.elements.form.dataPedido.val() || this.elements.form.dataPedido.data('value');


        this.elements.form.id.val(this.models.id);
        this.elements.form.clienteID.val(this.models.cliente.id);
        this.elements.form.dataPedido.val(this.models.dataPedido);
    },

    watchers: {
        form: function () {
            var form = Pedido.elements.form;
            form._.submit(function (event) {
                event.preventDefault();
                Pedido.methods.save();
            });

            form.clienteID.on("change", function (e) {
                Pedido.models.cliente.id = form.clienteID.val();
            });
            form.dataPedido.on("change", function (e) {
                Pedido.models.dataPedido = form.dataPedido.val();
            });
        },

        table: function () {
            $(Pedido.elements.buttons.deletePedido).on('click', function (e) {
                e.preventDefault();
                Pedido.methods.deleteOne(this);
                return false;
            });
        }
    },

    methods: {
        save: function () {
            $.ajax({
                url: Pedido.elements.form._.attr('action'),
                method: "POST",
                contentType: "application/json",
                dataType: "json",
                data: JSON.stringify({
                    id: Pedido.models.id,
                    clienteID: Pedido.models.cliente.id,
                    dataPedido: Pedido.models.dataPedido
                }),
                statusCode: {
                    200: function (data) {
                        Pedido.methods.fill(data);
                        Pedido.methods.updated();
                    },
                    201: function (data) {
                        Pedido.methods.fill(data);
                        Pedido.methods.created();
                    },
                    404: function (data) {
                        Pedido.methods.web404(data);
                    },
                    409: function (data) {
                        Pedido.methods.conflict(data);
                    }
                }
            });
        },

        fill: function (dataPedido) {
            Pedido.models.id = dataPedido.id;
            Pedido.models.cliente = dataPedido.cliente;
            Pedido.models.dataPedido = dataPedido.dataPedido;
        },

        fillComponent: function () {
            var component = Pedido.component;
            component.find('.js-pedido-id').text(Pedido.models.id);
            component.find('.js-pedido-cliente-cpf').text(Pedido.models.cliente.cpf);
            component.find('.js-pedido-cliente-nome').text(Pedido.models.cliente.nome + ' ' + Pedido.models.cliente.sobrenome);
            component.find('.js-pedido-data').text(new Date(Pedido.models.dataPedido).toLocaleDateString());
        },

        updated: function () {
            Pedido.methods.fillComponent();
            Pedido.elements.form.clienteID.removeClass('is-invalid');

            Pedido.elements.modal.title.text("ATUALIZADO COM SUCESSO");
            Pedido.elements.modal.body.html(Pedido.component);
            Pedido.elements.modal._.modal();
        },

        created: function (data) {
            Pedido.methods.fillComponent();
            Pedido.methods.clearForm();
            Pedido.elements.form.clienteID.removeClass('is-invalid');
            Pedido.elements.modal.title.text("CRIADO COM SUCESSO");
            Pedido.elements.modal.body.html(Pedido.component);
            Pedido.elements.modal._.modal();

        },

        conflict: function () {
            Pedido.elements.modal.title.text("CONFLITO");
            Pedido.elements.modal.body.text("O pedido já existe");
            Pedido.elements.form.descricao.addClass('is-invalid');
            Pedido.elements.form.categaria.addClass('is-invalid');
            Pedido.elements.modal._.modal();
        },

        clearForm: function () {
            Pedido.elements.form.id.val('');
            Pedido.elements.form.clienteID.val('');
            Pedido.elements.form.dataPedido.val('');
        },

        web404: function (data) {
            console.log(data);
            Pedido.elements.modal.title.text("404: Not Found");
            Pedido.elements.modal.body.html("<p>O End Point " + data.responseJSON.path + " não foi encontrado</p>");
            Pedido.elements.modal._.modal();

        },

        deleteOne: function (clickedBtn) {
            console.log(clickedBtn);
            Pedido.methods.fill({
                "id": $(clickedBtn).data("pedido-id"),
                "cliente": {
                    id: $(clickedBtn).data("pedido-cliente-id"),
                    cfp: $(clickedBtn).data("pedido-cliente-cpf"),
                    nome: $(clickedBtn).data("pedido-cliente-nome"),
                    sobrenome: $(clickedBtn).data("pedido-cliente-sobrenome")
                },
                "dataPedido": $(clickedBtn).data("pedido-data")
            });

            $.ajax({
                url: Pedido.models.urls.deleteOne.concat(Pedido.models.id),
                method: "DELETE",
                contentType: "application/json",
                dataType: "json",
                data: JSON.stringify({
                    id: Pedido.models.id,
                    dataPedido: Pedido.models.dataPedido,
                    clienteID: Pedido.models.cliente.id
                }),
                statusCode: {
                    202: function () {
                        Pedido.methods.deteleted();
                    }
                }
            })
        },

        deteleted: function () {
            Pedido.methods.fillComponent();
            Pedido.elements.modal.title.text("DELETADO COM SUCESSO");
            Pedido.elements.modal.body.html(Pedido.component);
            Pedido.elements.modal._.modal();
            $('#pedido-' + Pedido.models.id).hide()
        }
    }
};