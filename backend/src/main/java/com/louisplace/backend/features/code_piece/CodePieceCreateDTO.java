package com.louisplace.backend.features.code_piece;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CodePieceCreateDTO {
    private String code;
    private String language;
    private String title;
    private String sourcePostSlug;
    private String exerciseContext;
    private String solutionCode;
}
