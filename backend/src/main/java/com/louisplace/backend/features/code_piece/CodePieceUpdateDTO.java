package com.louisplace.backend.features.code_piece;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.Optional;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CodePieceUpdateDTO {
    private Optional<String> code;
    private Optional<String> title;
    private Optional<Boolean> isSolved;
}
