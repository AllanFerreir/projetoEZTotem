package org.ufpr.sistemapedidos.controller.apiv1;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.ufpr.sistemapedidos.controller.apiv1.wrapper.ProdutoDTO;
import org.ufpr.sistemapedidos.domain.Produto;
import org.ufpr.sistemapedidos.repository.ProdutoRepository;
import org.ufpr.sistemapedidos.services.ProdutoService;

import javax.validation.Valid;
import java.util.ArrayList;
import java.util.List;

import static org.springframework.http.HttpStatus.*;


@RestController
@RequestMapping("/api/v1/produtos")
public class ProdutoRestController {
    @Autowired
    ProdutoRepository produtoRepository;

    @Autowired
    ProdutoService produtoService;

    @GetMapping(path = "/", produces = MediaType.APPLICATION_JSON_VALUE)
    public List<Produto> getAllProdutos() {
        return produtoService.listarProdutos();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Produto> getProdutoById(@PathVariable(value = "id") Integer produtoId) {
        Produto produto = produtoRepository.findOne(produtoId);
        if (produto == null) return ResponseEntity.notFound().build();
        return ResponseEntity.ok().body(produto);
    }

   /* @GetMapping("/{categoria}")
    public ResponseEntity<List<Produto>> getProdutosBycategoria(@PathVariable(value = "categoria") String categoria) {
        List<Produto> produtos = produtoRepository.findByCategoria(categoria);
        if (produtos == null) return ResponseEntity.notFound().build();
        return ResponseEntity.ok().body(produtos);
    }*/

    @PostMapping(path = "/", consumes = {MediaType.APPLICATION_JSON_UTF8_VALUE})
    public ResponseEntity<Produto> createProduto(@Valid @RequestBody ProdutoDTO produtoDTO) {

        try {
            Produto produto = new Produto();
            List<Produto> produtos = new ArrayList<Produto>();
            boolean criar = false;
            boolean update = false;

            if (produtoDTO.getId() != null){
                produto = produtoRepository.findOne(produtoDTO.getId());
            }

            if (produtoDTO.getDescricao() != null && !"".equals(produtoDTO.getDescricao())){
                produtos = produtoRepository.findTop1ByDescription(produtoDTO.getDescricao());
            }

            if (produtoDTO.getCategoria() != null && !"".equals(produtoDTO.getCategoria())){
                produtos = produtoRepository.findTop1ByCategoria(produtoDTO.getCategoria());
            }


            if ((produto.getId() != null && produto.getDescricao() != null && produto.getCategoria() != null)  || !produtos.isEmpty()) {
                update = true;
            } else {
                criar = true;
            }

            if (criar) {
                produto.setDescricao(produtoDTO.getDescricao());
                produto.setCategoria(produtoDTO.getCategoria());
                produto.setValue(produtoDTO.getValue());
                return new ResponseEntity<>(produtoRepository.save(produto), CREATED);
            }

            if (update){
                if (!produtos.isEmpty()) produto = produtos.get(0);
                produto.setDescricao(produtoDTO.getDescricao());
                produto.setCategoria(produtoDTO.getCategoria());
                produto.setValue(produtoDTO.getValue());
                return new ResponseEntity<>(produtoRepository.save(produto), OK);
            }
            return new ResponseEntity<>(produtoRepository.save(produto), BAD_REQUEST);

        } catch (DataIntegrityViolationException e) {
            return new ResponseEntity<>((Produto) null, CONFLICT);
        }
    }

    /**
     * Remove um produto.
     *
     * @param produtoId     ID do Produto
     * @param produtoDTO Representação do Produto em JSON
     * @return ResponseEntity
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<?> removerProduto(@PathVariable(value = "id") Integer produtoId,
                                            @Valid @RequestBody ProdutoDTO produtoDTO) {
        try {
            Boolean clienteFoiDeletado = produtoService.deletaProduto(produtoDTO);
            if (clienteFoiDeletado) return ResponseEntity.status(ACCEPTED).build();
            else return ResponseEntity.status(NOT_FOUND).build();
        } catch (Exception ignored) {
            return ResponseEntity.status(BAD_REQUEST).build();
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<Produto> updateProduto(@PathVariable(value = "id") Integer produtoId,
                                                 @Valid @RequestBody Produto produtoDetails) {

        Produto produto = produtoRepository.findOne(produtoId);
        if (produto == null) {
            return ResponseEntity.notFound().build();
        }

        produto.setDescricao(produtoDetails.getDescricao());
        produto.setCategoria(produtoDetails.getCategoria());
        produto.setValue(produtoDetails.getValue());

        Produto updatedProduto = produtoRepository.save(produto);
        return ResponseEntity.ok(updatedProduto);
    }
}
