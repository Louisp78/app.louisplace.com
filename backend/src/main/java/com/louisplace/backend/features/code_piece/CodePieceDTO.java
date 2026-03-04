package com.louisplace.backend.features.code_piece;

import lombok.AllArgsConstructor;
import lombok.Data;
import java.time.LocalDateTime;

@Data
@AllArgsConstructor
public class CodePieceDTO {
    private Long id;
    private String code;
    private String language;
    private String title;
    private String sourcePostSlug;
    private Boolean isSolved;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    public CodePieceDTO(CodePieceEntity entity) {
        this.id = entity.getId();
        this.code = entity.getCode();
        this.language = entity.getLanguage();
        this.title = entity.getTitle();
        this.sourcePostSlug = entity.getSourcePostSlug();
        this.isSolved = entity.getIsSolved();
        this.createdAt = entity.getCreatedAt();
        this.updatedAt = entity.getUpdatedAt();
    }
}
