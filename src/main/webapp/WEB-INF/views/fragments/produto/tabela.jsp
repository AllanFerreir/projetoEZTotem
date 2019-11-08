<%@page contentType="text/html" pageEncoding="UTF-8" %>
<%@taglib prefix="tp" tagdir="/WEB-INF/tags" %>

<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@taglib prefix="func" uri="http://java.sun.com/jsp/jstl/functions" %>

<tp:table_dark>
    <jsp:attribute name="content">
        <c:choose>
            <c:when test="${func:length(produtos) gt 0}">
                <c:forEach var="produto" items="${produtos}">
                    <tr id="produto-${produto.id}" style="height: 200px">
                        <td id="cart">
                            <img src="../../images/${produto.id}.jpg" width="200">
                            <c:if test="${func:length(produto.descricao) < 1}"> - </c:if>

                            <button class="btn btn-button float-right" value="${produto.value}/${produto.descricao}" onclick="teste(this.value)" style="width: 115px; height: 40px; margin-top: 70px; padding-right: 20px">ADICIONAR</button>
                            <h2 style="text-align: center; width:500px; float:right; padding-top: 70px;">R$ ${produto.value}0</h2>
                            <h2 style="text-align: center; width:500px; float:right; padding-top: 70px;">${produto.descricao}</h2>

                            <script>

                                function teste(value){
                                    var input = value;

                                    var fields = input.split('/');

                                    var descricao = fields[0];
                                    var valor = fields[1];
                                    var cart = JSON.parse(localStorage.getItem("cart"));
                                    if(cart == null){
                                        var cart=[];
                                        localStorage.setItem("cart",JSON.stringify(cart));
                                    };

                                    var produtoVal = {valor , descricao};
                                    cart.push(produtoVal);



                                    localStorage.setItem("cart",JSON.stringify(cart));

                                    console.log(cart);

                                };

                            </script>
                        </td>

                    </tr>
                </c:forEach>
            </c:when>
            <c:otherwise>
                <th scope="row"> -</th>
                <td> - </td>
            </c:otherwise>
        </c:choose>
    </jsp:attribute>

</tp:table_dark>