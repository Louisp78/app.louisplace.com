package com.louisplace.backend.features.code_piece;

import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class CodePieceService implements ICodePieceService {

    private final ICodePieceRepository codePieceRepository;

    public CodePieceService(ICodePieceRepository codePieceRepository) {
        this.codePieceRepository = codePieceRepository;
    }

    @Override
    public List<CodePieceEntity> getUserCodePieces(String userEmail) {
        return codePieceRepository.findByUserEmail(userEmail);
    }

    @Override
    public Optional<CodePieceEntity> createCodePiece(String userEmail, CodePieceCreateDTO createDTO) {
        CodePieceEntity entity = new CodePieceEntity();
        entity.setUserEmail(userEmail);
        entity.setCode(createDTO.getCode());
        entity.setLanguage(createDTO.getLanguage());
        entity.setTitle(createDTO.getTitle());
        entity.setSourcePostSlug(createDTO.getSourcePostSlug());
        entity.setExerciseContext(createDTO.getExerciseContext());
        entity.setSolutionCode(createDTO.getSolutionCode());
        entity.setIsSolved(false);

        CodePieceEntity saved = codePieceRepository.save(entity);
        return Optional.of(saved);
    }

    @Override
    public Optional<CodePieceEntity> updateCodePiece(String userEmail, String sourcePostSlug, CodePieceUpdateDTO updateDTO) {
        Optional<CodePieceEntity> optEntity = codePieceRepository.findBySourcePostSlugAndUserEmail(sourcePostSlug, userEmail);

        if (optEntity.isEmpty()) {
            return Optional.empty();
        }

        CodePieceEntity entity = optEntity.get();
        updateDTO.getCode().ifPresent(entity::setCode);
        updateDTO.getTitle().ifPresent(entity::setTitle);
        updateDTO.getIsSolved().ifPresent(entity::setIsSolved);

        CodePieceEntity saved = codePieceRepository.save(entity);
        return Optional.of(saved);
    }

    @Override
    public boolean deleteCodePiece(String userEmail, String sourcePostSlug) {
        Optional<CodePieceEntity> optEntity = codePieceRepository.findBySourcePostSlugAndUserEmail(sourcePostSlug, userEmail);

        if (optEntity.isEmpty()) {
            return false;
        }

        codePieceRepository.delete(optEntity.get());
        return true;
    }
}
