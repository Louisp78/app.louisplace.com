package com.louisplace.backend.features.code_piece;

import java.util.List;
import java.util.Optional;

public interface ICodePieceService {
    List<CodePieceEntity> getUserCodePieces(String userEmail);

    Optional<CodePieceEntity> createCodePiece(String userEmail, CodePieceCreateDTO createDTO);

    Optional<CodePieceEntity> updateCodePiece(String userEmail, String sourcePostSlug, CodePieceUpdateDTO updateDTO);

    boolean deleteCodePiece(String userEmail, String sourcePostSlug);
}
