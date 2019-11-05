<%@page contentType="text/html" pageEncoding="UTF-8" %>
<%@taglib prefix="tp" tagdir="/WEB-INF/tags" %>

<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@taglib prefix="func" uri="http://java.sun.com/jsp/jstl/functions" %>

<tp:table_dark>
    <jsp:attribute name="header">
        <th scope="col">Descrição</th>
    </jsp:attribute>

    <jsp:attribute name="content">
        <c:choose>
            <c:when test="${func:length(produtos) gt 0}">
                <c:forEach var="produto" items="${produtos}">
                    <tr id="produto-${produto.id}" style="height: 200px">
                        <td id="cart">
                            <c:if test="${func:length(produto.descricao) < 1}"> - </c:if>${produto.descricao}
                            <button class="btn btn-button float-rifht" value="${produto.valor}" onclick="teste(this.value)" >testeeeee</button>
                            <script>
                                var cart = 0;

                                function teste(value){
                                    cart += value;
                                    console.log(cart);
                                }
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