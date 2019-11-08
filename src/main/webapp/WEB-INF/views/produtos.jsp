<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@taglib prefix="func" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@taglib prefix="tp" tagdir="/WEB-INF/tags" %>

<tp:base>
    <jsp:attribute name="navbar">produtos</jsp:attribute>

    <jsp:attribute name="title">
        EZTotem
    </jsp:attribute>
    <jsp:attribute name="subtitle">
        Produtos

        <a onclick="limpar();" class="btn btn-sm btn-outline-primary float-right" style="border-color:white;margin-top:7px">Limpar Carrinho</a>

        <script>
        function limpar(){
        cart=[];
        localStorage.setItem("cart",JSON.stringify(cart));
        }
          </script>
    </jsp:attribute>

    <jsp:attribute name="body">
        <c:if test="${editar || criar}">
            <jsp:include page="fragments/produto/formulario.jsp"/>
        </c:if>

        <c:if test="${listar != null}">
            <jsp:include page="fragments/produto/tabela.jsp"/>
        </c:if>

        <jsp:include page="fragments/produto/produto_modal.jsp"/>
    </jsp:attribute>

    <jsp:attribute name="jsFooter">
        <script src="<c:url value="/static/js/produtos.js"/>"></script>
    </jsp:attribute>

</tp:base>