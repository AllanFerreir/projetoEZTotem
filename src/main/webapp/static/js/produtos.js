/**
 * Created by luancomputacao on 25/02/18.
 */
$(function () {
    Produto.run();
});


Produto = {

    component: $("<div class='js-produto'></div>").html('\
    \<div>\
    \   <b>ID</b>: <span class="js-produto-id"></span><br> \
    \   <b>Descrição</b>: <span class="js-produto-descricao"></span><br> \
    \   <b>Descrição</b>: <span class="js-produto-categoria"></span><br> \
    \</div> \
    '),

    elements: {
        form: {
            _: $("#produto-form"),
            id: $("#produto-id"),
            descricao: $("#produto-descricao"),
            categoria: $("#produto-categoria"),
        },
        modal: {
            _: $('#produto-modal'),
            title: $('#produto-modal').find('.js-modal-title'),
            body: $('#produto-modal').find('.js-modal-body')

        },
        buttons: {
            deleteProduto: $(".js-btn-delete-produto")
        },
    },

    models: {
        id: null,
        descricao: null,
        categoria: null,
        urls:{
            deleteOne: "/api/v1/produtos/"
        }
    },


    run: function () {
        console.log("Produto started");
        this.init();

        console.log("Calling watchers");
        this.watchers.form();
        this.watchers.table();

        console.log(this.models);
    },

    init: function () {
        this.models.id = this.elements.form.id.val() || this.elements.form.id.data('value') || null;
        this.models.descricao = this.elements.form.descricao.val() || this.elements.form.descricao.data('value');
        this.models.categoria = this.elements.form.categoria.val() || this.elements.form.categoria.data('value');


        this.elements.form.id.val(this.models.id);
        this.elements.form.descricao.val(this.models.descricao);
        this.elements.form.categoria.val(this.models.categoria);
    },

    watchers: {
        form: function () {
            var form = Produto.elements.form;
            form._.submit(function (event) {
                event.preventDefault();
                Produto.methods.save();
            });

            form.descricao.keyup(function (e) {
                Produto.models.descricao = form.descricao.val();
            });

            form.categoria.keyup(function (e) {
                Produto.models.categoria = form.categoria.val();
            });
        },
        table: function () {
            $(Produto.elements.buttons.deleteProduto).on('click', function (e) {
                e.preventDefault();
                Produto.methods.deleteOne(this);
                return false;
            });
        }
    },

    methods: {
        save: function () {
            $.ajax({
                url: Produto.elements.form._.attr('action'),
                method: "POST",
                contentType: "application/json",
                dataType: "json",
                data: JSON.stringify({
                    id: Produto.models.id,
                    descricao: Produto.models.descricao,
                    categoria: Produto.models.categoria,
                }),
                statusCode: {
                    200: function (data) {
                        Produto.methods.fill(data);
                        Produto.methods.updated();
                    },
                    201: function (data) {
                        Produto.methods.fill(data);
                        Produto.methods.created();
                    },
                    404: function (data) {
                        Produto.methods.web404(data);
                    },
                    409: function (data) {
                        Produto.methods.conflict(data);
                    }
                }
            });
        },

        fill: function (dataProduto) {
            Produto.models.id = dataProduto.id;
            Produto.models.descricao = dataProduto.descricao;
            Produto.models.categoria = dataProduto.categoria;
        },

        fillComponent: function () {
            var component = Produto.component;
            component.find('.js-produto-id').text(Produto.models.id);
            component.find('.js-produto-descricao').text(Produto.models.descricao)
            component.find('.js-produto-categoria').text(Produto.models.categoria);
        },

        updated: function () {
            Produto.methods.fillComponent();
            Produto.elements.form.descricao.removeClass('is-invalid');
            Produto.elements.form.categoria.removeClass('is-invalid');

            Produto.elements.modal.title.text("ATUALIZADO COM SUCESSO");
            Produto.elements.modal.body.html(Produto.component);
            Produto.elements.modal._.modal();
        },

        created: function (data) {
            Produto.methods.fillComponent();
            Produto.methods.clearForm();
            Produto.elements.form.descricao.removeClass('is-invalid');
            Produto.elements.form.categoria.removeClass('is-invalid');
            Produto.elements.modal.title.text("CRIADO COM SUCESSO");
            Produto.elements.modal.body.html(Produto.component);
            Produto.elements.modal._.modal();

        },

        conflict: function () {
            Produto.elements.modal.title.text("CONFLITO");
            Produto.elements.modal.body.text("O produto já existe");
            Produto.elements.form.descricao.addClass('is-invalid');
            Produto.elements.form.categoria.addClass('is-invalid');
            Produto.elements.modal._.modal();
        },

        clearForm: function () {
            Produto.elements.form.id.val('');
            Produto.elements.form.descricao.val('');
            Produto.elements.form.categoria.val('');
        },

        web404: function (data) {
            console.log(data);
            Produto.elements.modal.title.text("404: Not Found");
            Produto.elements.modal.body.html("<p>O End Point " + data.responseJSON.path + " não foi encontrado</p>")
            Produto.elements.modal._.modal();

        },

        deleteOne: function (clickedBtn) {
            console.log(clickedBtn);
            Produto.methods.fill({
                "id": $(clickedBtn).data("produto-id"),
                "descricao": $(clickedBtn).data("produto-descricao"),
                "categoria": $(clickedBtn).data("produto-categoria"),
            });


            $.ajax({
                url: Produto.models.urls.deleteOne.concat(Produto.models.id),
                method: "DELETE",
                contentType: "application/json",
                dataType: "json",
                data: JSON.stringify({
                    id: Produto.models.id,
                    cpf: Produto.models.descricao,
                    x: Produto.models.categoria,
                }),
                statusCode:{
                    202: function () {
                        Produto.methods.deteleted();
                    }
                }
            })
        },

        deteleted: function () {
            Produto.methods.fillComponent();
            Produto.elements.modal.title.text("DELETADO COM SUCESSO");
            Produto.elements.modal.body.html(Produto.component);
            Produto.elements.modal._.modal();
            $('#produto-' + Produto.models.id).hide()
        }
    }
};