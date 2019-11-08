<%@page contentType="text/html" pageEncoding="UTF-8" %>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@taglib prefix="func" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@taglib prefix="tp" tagdir="/WEB-INF/tags" %>

<tp:base>

    <jsp:attribute name="navbar">clientes</jsp:attribute>

    <jsp:attribute name="title">
        EZTotem
    </jsp:attribute>
    <jsp:attribute name="subtitle">
        Carrinho e Checkout
    </jsp:attribute>


    <jsp:attribute name="btnToolbar">
        <div class="btn-group mr-2">

            <c:if test="${clientes == null}">
                <a href="/clientes" class="btn btn-sm btn-outline-primary">Voltar Para o Carrinho</a>
            </c:if>
        </div>
    </jsp:attribute>

    <jsp:attribute name="body">
        <c:if test="${editar || criar}">
            <jsp:include page="fragments/cliente/formulario.jsp"/>
        </c:if>


        <c:if test="${listar}">
            <div class="container">
                <div class="row">
                    <div class="col-sm-12 col-md-10 col-md-offset-1">
                        <table class="table table-hover">
                            <thead>
                                <tr>
                                    <th>Product</th>
                                    <th>Quantity</th>
                                    <th class="text-center">Price</th>
                                    <th class="text-center">Total</th>
                                    <th> </th>
                                </tr>
                            </thead>
                            <tbody id="tabela">
                                <script>
                                    cart = JSON.parse(localStorage.getItem("cart"));
                                    cart2 = cart;
                                    console.log('cart',cart);

                                    var total = 0;

                                    $.each(cart2, function (index, array) {
                                    $('#tabela').append('<tr><td class="col-sm-8 col-md-6"><div class="media"> <a class="thumbnail pull-left" href="#"> <img class="media-object" src="http://icons.iconarchive.com/icons/custom-icon-design/flatastic-2/72/product-icon.png" style="width: 72px; height: 72px;"> </a><div class="media-body"><h4 class="media-heading"><a href="#">'+ this.valor +'</a></h4><h5 class="media-heading"></strong></span></div></div></td><td class="col-sm-1 col-md-1" style="text-align: center"> <input type="email" class="form-control" id="exampleInputEmail1" value="3"></td><td class="col-sm-1 col-md-1 text-center"><strong>$4.87</strong></td><td class="col-sm-1 col-md-1 text-center"><strong>$14.61</strong></td><td class="col-sm-1 col-md-1"> <button type="button" class="btn btn-danger"> <span class="glyphicon glyphicon-remove"></span> Remove </button></td></tr>');
                                            total += parseInt(this.descricao);
                                            console.log(total)

                                        });

                                    $('#total').text(toString(total))

                                </script>


                                <tr>
                                    <td>   </td>
                                    <td>   </td>
                                    <td>   </td>
                                    <td><h3>Total</h3></td>
                                    <td class="text-right"><p id="total"></p></td>
                                </tr>
                                <tr>
                                    <td>   </td>
                                    <td>   </td>
                                    <td>   </td>
                                    <td>
                                    <td>
                                    <c:if test="${clientes != null}">
                                        <a href="/cliente" class="btn btn-default btn-outline-primary">Ir Para Checkout</a>
                                    </c:if>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </c:if>

        <jsp:include page="fragments/cliente/cliente_modal.jsp"/>
    </jsp:attribute>

    <jsp:attribute name="jsFooter">
        <script src="/static/js/clientes.js"></script>
    </jsp:attribute>

</tp:base>