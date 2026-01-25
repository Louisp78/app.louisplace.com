package com.louisplace.backend.features.code_piece;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.louisplace.backend.features.auth.session_service.SessionService;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/code-pieces")
public class CodePieceController {

    private final SessionService sessionService;
    private final ICodePieceService codePieceService;

    public CodePieceController(SessionService sessionService, ICodePieceService codePieceService) {
        this.sessionService = sessionService;
        this.codePieceService = codePieceService;
    }

    @GetMapping("/me")
    public ResponseEntity<List<CodePieceDTO>> getUserCodePieces() {
        String email = sessionService.getPrincipal();
        List<CodePieceEntity> entities = codePieceService.getUserCodePieces(email);
        List<CodePieceDTO> dtos = entities.stream()
            .map(CodePieceDTO::new)
            .collect(Collectors.toList());
        return ResponseEntity.ok(dtos);
    }

    @PostMapping
    public ResponseEntity<CodePieceDTO> createCodePiece(@RequestBody CodePieceCreateDTO createDTO) {
        String email = sessionService.getPrincipal();
        CodePieceEntity entity = codePieceService.createCodePiece(email, createDTO).orElse(null);

        if (entity == null) {
            return ResponseEntity.badRequest().build();
        }

        return ResponseEntity.ok(new CodePieceDTO(entity));
    }

    @PutMapping("/{id}")
    public ResponseEntity<CodePieceDTO> updateCodePiece(
            @PathVariable Long id,
            @RequestBody CodePieceUpdateDTO updateDTO) {
        String email = sessionService.getPrincipal();
        CodePieceEntity entity = codePieceService.updateCodePiece(email, id, updateDTO).orElse(null);

        if (entity == null) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(new CodePieceDTO(entity));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCodePiece(@PathVariable Long id) {
        String email = sessionService.getPrincipal();
        boolean deleted = codePieceService.deleteCodePiece(email, id);

        if (!deleted) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.noContent().build();
    }
}
