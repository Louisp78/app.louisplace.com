package com.louisplace.backend.features.code_piece;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CodePieceCreateDTO {
    private String code;
    private String language;
    private String title;
    @NotNull
    @NotBlank
    @Pattern(regexp = "^[a-z0-9]+(?:-[a-z0-9]+)*$", message = "sourcePostSlug must be kebab-case")
    private String sourcePostSlug;
}
