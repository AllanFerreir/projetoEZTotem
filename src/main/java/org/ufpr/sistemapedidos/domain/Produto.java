package org.ufpr.sistemapedidos.domain;

import com.fasterxml.jackson.annotation.JsonBackReference;
import org.hibernate.validator.constraints.Length;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Collection;

/**
 * Created by luancomputacao on 24/02/18.
 */
@Entity
@Table(name = "produto")
public class Produto implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "id", length = 11)
    private Integer id;

    @Length(max = 45)
    @Column(name = "descricao", length = 45, nullable = false)
    private String descricao;

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "produto")
    @JsonBackReference
    private Collection<ItemDoPedido> itemDoPedidoCollection;

    @Length(max = 45)
    @Column(name = "categoria", length = 45, nullable = false)
    private String categoria;

    @Length(max = 45)
    @Column(name = "valuer", length = 45, nullable = false)
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

    public Collection<ItemDoPedido> getItemDoPedidoCollection() {
        return itemDoPedidoCollection;
    }

    public void setItemDoPedidoCollection(Collection<ItemDoPedido> itemDoPedidoCollection) {
        this.itemDoPedidoCollection = itemDoPedidoCollection;
    }

    public String getCategoria() {
        return categoria;
    }

    public void setCategoria(String categoria) {
        this.categoria = categoria;
    }

    @Override
    public String toString() {
        return "Produto{" +
                "id=" + id +
                ", descricao='" + descricao +
                ", categoria='" + categoria +
                ", value='" + value + '\'' +
                '}';
    }

    public Double getValue() {
        return value;
    }

    public void setValue(Double value) {
        this.value = value;
    }
}
