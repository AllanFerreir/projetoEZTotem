package org.ufpr.sistemapedidos.controller.apiv1.wrapper;

/**
 *
 */
public class ProdutoDTO {
    private Integer id;
    private String descricao;
    private String categoria;
    private Double value;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getDescricao() {
        return descricao;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }

    public String getCategoria() {
        return categoria;
    }

    public void setCategoria(String categoria) {
        this.categoria = categoria;
    }

    public void setValue(Double value) {
        this.value = value;
    }
    public Double getValue() {
        return value;
    }

    @Override
    public String toString() {
        return "ProdutoDTO{" +
                "id=" + id +
                ", descricao=" + descricao +
                ", categoria=" + categoria +
                ", value=" + value +
                '}';
    }



}
