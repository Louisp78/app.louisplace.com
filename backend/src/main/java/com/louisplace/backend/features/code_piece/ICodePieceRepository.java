package com.louisplace.backend.features.code_piece;

import java.util.List;
import java.util.Optional;
import org.springframework.data.repository.Repository;

public interface ICodePieceRepository extends Repository<CodePieceEntity, Long> {
    List<CodePieceEntity> findByUserEmail(String userEmail);

    Optional<CodePieceEntity> findByIdAndUserEmail(Long id, String userEmail);

    CodePieceEntity save(CodePieceEntity codePiece);

    void delete(CodePieceEntity codePiece);
}
